/**
 * Utility to save game results to localStorage and update user stats
 */

const GAME_HISTORY_KEY = "careerai_game_history";
const USERS_KEY = "careerai_users";
const CURRENT_USER_KEY = "careerai_current_user";

export interface GameResult {
  gameType: string;
  score: number;
  accuracy: number;
  xpEarned: number;
  timeTaken: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
}

const SKILL_MAP: Record<string, keyof { logical: number; mathematical: number; pattern: number; problemSolving: number; technical: number }> = {
  "logical-reasoning": "logical",
  "mathematical-thinking": "mathematical",
  "pattern-recognition": "pattern",
  "problem-solving": "problemSolving",
  "technical-knowledge": "technical",
  "career-quest": "logical",
};

export function saveGameResult(userId: string, result: GameResult) {
  // Save to history
  try {
    const all = JSON.parse(localStorage.getItem(GAME_HISTORY_KEY) || "{}");
    if (!all[userId]) all[userId] = [];
    all[userId].unshift(result); // newest first
    if (all[userId].length > 50) all[userId] = all[userId].slice(0, 50);
    localStorage.setItem(GAME_HISTORY_KEY, JSON.stringify(all));
  } catch {}

  // Update user stats
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
    const user = users[userId];
    if (!user) return;

    // XP and level
    user.totalXP = (user.totalXP || 0) + result.xpEarned;
    user.gamesPlayed = (user.gamesPlayed || 0) + 1;

    // Level up: level = floor(totalXP / 500) + 1 capped at 10
    user.level = Math.min(Math.floor(user.totalXP / 500) + 1, 10);

    // Update skill score (rolling average)
    const skillKey = SKILL_MAP[result.gameType];
    if (skillKey && user.skillScores) {
      const prev = user.skillScores[skillKey] || 0;
      user.skillScores[skillKey] = Math.round((prev + result.accuracy) / 2);
    }

    users[userId] = user;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Update current user session
    const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "null");
    if (currentUser && currentUser.id === userId) {
      const { password: _p, ...rest } = user;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(rest));
    }
  } catch {}
}
