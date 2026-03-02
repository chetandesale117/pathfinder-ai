import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  education?: string;
  level: number;
  totalXP: number;
  gamesPlayed: number;
  streak: number;
  skillScores: {
    logical: number;
    mathematical: number;
    pattern: number;
    problemSolving: number;
    technical: number;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; name: string; age?: number; education?: string }) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "careerai_users";
const CURRENT_USER_KEY = "careerai_current_user";

function getUsers(): Record<string, User & { password: string }> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, User & { password: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const users = getUsers();
    const found = Object.values(users).find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!found) {
      throw new Error("No account found with this email. Please register first.");
    }
    if (found.password !== password) {
      throw new Error("Invalid email or password.");
    }

    const { password: _pwd, ...userData } = found;
    setUser(userData);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
    navigate("/dashboard");
  };

  const register = async (data: { email: string; password: string; name: string; age?: number; education?: string }) => {
    const users = getUsers();
    const exists = Object.values(users).find(
      (u) => u.email.toLowerCase() === data.email.toLowerCase()
    );

    if (exists) {
      throw new Error("An account with this email already exists.");
    }

    const newUser: User & { password: string } = {
      id: `user_${Date.now()}`,
      email: data.email,
      name: data.name,
      age: data.age,
      education: data.education,
      password: data.password,
      level: 1,
      totalXP: 0,
      gamesPlayed: 0,
      streak: 0,
      skillScores: {
        logical: 0,
        mathematical: 0,
        pattern: 0,
        problemSolving: 0,
        technical: 0,
      },
    };

    users[newUser.id] = newUser;
    saveUsers(users);

    const { password: _pwd, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
    navigate("/");
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updated));

    // Also update in users store
    const users = getUsers();
    if (users[user.id]) {
      users[user.id] = { ...users[user.id], ...updates };
      saveUsers(users);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
