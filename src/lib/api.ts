import axios from "axios";

// Configure axios base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Types
export interface GameSubmission {
  gameType: "logical-reasoning" | "mathematical-thinking" | "pattern-recognition" | "problem-solving" | "technical-knowledge" | "career-quest";
  score: number;
  accuracy: number;
  timeTaken: number;
  xpEarned: number;
  difficultyLevel?: string;
  skipsUsed?: number;
  totalQuestions?: number;
  correctAnswers?: number;
  streak?: number;
  avgTimePerQuestion?: number;
}

export interface GameHistory {
  games: Array<{
    id: string;
    gameType: string;
    score: number;
    accuracy: number;
    xpEarned: number;
    completedAt: string;
    difficultyLevel?: string;
  }>;
  statistics: {
    totalXP: number;
    totalGamesPlayed: number;
    averageAccuracy: number;
    totalTimeSpent: number;
    currentStreak: number;
    longestStreak: number;
  };
}

export interface DashboardData {
  user: {
    level: number;
    totalXP: number;
    xpToNextLevel: number;
    gamesPlayed: number;
    streak: number;
    iqScore: number;
    careerReadiness: number;
  };
  skillScores: {
    logical: number;
    mathematical: number;
    pattern: number;
    problemSolving: number;
    technical: number;
  };
  recommendedCareer: {
    title: string;
    matchPercentage: number;
    description: string;
  };
  badges: Array<{
    id: string;
    name: string;
    icon: string;
    earned: boolean;
    earnedAt?: string;
  }>;
  recentGames: Array<{
    gameType: string;
    score: number;
    completedAt: string;
    xpEarned: number;
  }>;
  leaderboard: {
    userRank: number;
    topPlayers: Array<{
      rank: number;
      name: string;
      totalXP: number;
      avatar?: string;
    }>;
  };
}

export interface CareerPrediction {
  topCareers: Array<{
    title: string;
    matchPercentage: number;
    salary: string;
    growth: string;
    description: string;
    requiredSkills?: string[];
    education?: string;
  }>;
  strengths: Array<{
    skill: string;
    score: number;
    description: string;
  }>;
  weaknesses: Array<{
    skill: string;
    score: number;
    description: string;
  }>;
  readinessScore: number;
  recommendations: {
    courses: string[];
    skillsToDevelop: string[];
    nextSteps: string[];
  };
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  totalXP: number;
  level: number;
  avatar?: string;
  badges?: string[];
}

export interface LeaderboardData {
  leaderboard: LeaderboardEntry[];
  userRank: {
    rank: number;
    totalXP: number;
    level: number;
  };
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}

// API Functions
export const gameAPI = {
  submit: async (data: GameSubmission) => {
    const response = await api.post("/game/submit", data);
    return response.data;
  },
  getHistory: async (limit = 10, offset = 0, gameType?: string) => {
    const params: any = { limit, offset };
    if (gameType) params.gameType = gameType;
    const response = await api.get<{ success: boolean; data: GameHistory }>("/game/history", { params });
    return response.data.data;
  },
};

export const dashboardAPI = {
  get: async () => {
    const response = await api.get<{ success: boolean; data: DashboardData }>("/dashboard");
    return response.data.data;
  },
};

export const careerAPI = {
  predict: async (data: {
    gameScores: Record<string, number>;
    skillQuizAnswers?: Record<number, string>;
    totalXP: number;
    averageAccuracy: number;
    personalityTraits?: Record<string, number>;
  }) => {
    const response = await api.post<{ success: boolean; data: CareerPrediction }>("/career/predict", data);
    return response.data.data;
  },
};

export const skillQuizAPI = {
  submit: async (answers: Record<number, string>) => {
    const response = await api.post("/skill-quiz/submit", {
      answers,
      completedAt: new Date().toISOString(),
    });
    return response.data;
  },
};

export const leaderboardAPI = {
  get: async (type: "global" | "weekly" | "monthly" = "global", limit = 10, offset = 0) => {
    const response = await api.get<{ success: boolean; data: LeaderboardData }>("/leaderboard", {
      params: { type, limit, offset },
    });
    return response.data.data;
  },
};

export const gamesAPI = {
  getQuestions: async (gameType: string, options?: { shuffle?: boolean; limit?: number }) => {
    try {
      const response = await api.get<{ success: boolean; data: { gameType: string; totalQuestions: number; questions: any[] } }>(
        `/games/${gameType}/questions`,
        { params: options }
      );
      return response.data.data.questions;
    } catch (error) {
      console.warn(`Failed to fetch questions for ${gameType}, using fallback data`);
      throw error; // Will be caught by fallback
    }
  },
  getAvailableGames: async () => {
    try {
      const response = await api.get<{ success: boolean; data: { games: any[] } }>("/games");
      return response.data.data.games;
    } catch (error) {
      console.warn("Failed to fetch available games, using fallback data");
      throw error;
    }
  },
};

export const authAPI = {
  register: async (data: { email: string; password: string; name: string; age?: number; education?: string }) => {
    const response = await api.post<{ success: boolean; data: { user: any; token: string; refreshToken: string } }>("/auth/register", data);
    if (response.data.success) {
      localStorage.setItem("auth_token", response.data.data.token);
      localStorage.setItem("refresh_token", response.data.data.refreshToken);
    }
    return response.data;
  },
  login: async (email: string, password: string) => {
    const response = await api.post<{ success: boolean; data: { user: any; token: string; refreshToken: string } }>("/auth/login", {
      email,
      password,
    });
    if (response.data.success) {
      localStorage.setItem("auth_token", response.data.data.token);
      localStorage.setItem("refresh_token", response.data.data.refreshToken);
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
  },
  getMe: async () => {
    const response = await api.get<{ success: boolean; data: any }>("/auth/me");
    return response.data.data;
  },
};

export default api;

