import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import {
  Brain,
  Trophy,
  Target,
  Gamepad2,
  Star,
  TrendingUp,
  Medal,
  Crown,
  Zap,
  ChevronRight,
  Play,
  Clock,
  Flame,
} from "lucide-react";

const GAME_HISTORY_KEY = "careerai_game_history";

function getGameHistory(userId: string) {
  try {
    const all = JSON.parse(localStorage.getItem(GAME_HISTORY_KEY) || "{}");
    return (all[userId] || []) as Array<{
      gameType: string;
      score: number;
      xpEarned: number;
      completedAt: string;
    }>;
  } catch {
    return [];
  }
}

const LEVEL_TITLES: Record<number, string> = {
  1: "Newcomer",
  2: "Explorer",
  3: "Strategist",
  4: "Achiever",
  5: "Champion",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">Please log in to view your dashboard.</p>
        </div>
      </Layout>
    );
  }

  const recentGames = getGameHistory(user.id).slice(0, 5);
  const xpToNextLevel = user.level * 500;
  const xpProgress = Math.min((user.totalXP / xpToNextLevel) * 100, 100);
  const levelTitle = LEVEL_TITLES[user.level] || "Expert";

  const skillsData = [
    { skill: "Logical", score: user.skillScores.logical, fullMark: 100 },
    { skill: "Math", score: user.skillScores.mathematical, fullMark: 100 },
    { skill: "Pattern", score: user.skillScores.pattern, fullMark: 100 },
    { skill: "Problem", score: user.skillScores.problemSolving, fullMark: 100 },
    { skill: "Technical", score: user.skillScores.technical, fullMark: 100 },
  ];

  const avgScore = skillsData.reduce((s, d) => s + d.score, 0) / skillsData.length;
  const careerReadiness = Math.round(avgScore);

  const badges = [
    { name: "First Game", icon: <Zap className="w-5 h-5" />, earned: user.gamesPlayed >= 1 },
    { name: "5 Games", icon: <Star className="w-5 h-5" />, earned: user.gamesPlayed >= 5 },
    { name: "Level 2", icon: <Crown className="w-5 h-5" />, earned: user.level >= 2 },
    { name: "100 XP", icon: <Medal className="w-5 h-5" />, earned: user.totalXP >= 100 },
  ];

  const topCareer = avgScore >= 70
    ? { title: "Software Engineer", match: 92 }
    : avgScore >= 50
    ? { title: "Data Analyst", match: 78 }
    : { title: "UX Designer", match: 65 };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome Back, {user.name}! 👋
            </h1>
            <p className="text-muted-foreground">Track your progress and discover your ideal career path</p>
          </motion.div>

          {/* Level & XP Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-primary/20 via-card to-accent/20 rounded-2xl border border-primary/30 p-6 mb-6"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary-foreground">{user.level}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1.5">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Level</p>
                  <p className="text-xl font-bold text-foreground">{levelTitle}</p>
                  <div className="flex items-center gap-1 text-orange-400">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.streak} day streak!</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Experience Points</span>
                  <span className="text-foreground font-medium">{user.totalXP} / {xpToNextLevel} XP</span>
                </div>
                <Progress value={xpProgress} className="h-4" />
                <p className="text-xs text-muted-foreground mt-1">{xpToNextLevel - user.totalXP} XP to next level</p>
              </div>

              <Button variant="hero" onClick={() => navigate("/games")}>
                <Play className="w-4 h-4 mr-2" />
                Play Games
              </Button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Games Played", value: user.gamesPlayed, icon: <Gamepad2 className="w-5 h-5" />, color: "text-violet-400" },
              { label: "Total XP", value: user.totalXP, icon: <Star className="w-5 h-5" />, color: "text-primary" },
              { label: "Career Ready", value: `${careerReadiness}%`, icon: <Target className="w-5 h-5" />, color: "text-amber-400" },
              { label: "Level", value: user.level, icon: <Brain className="w-5 h-5" />, color: "text-emerald-400" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="bg-card rounded-xl border border-border/50 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={stat.color}>{stat.icon}</span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Skills Radar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl border border-border/50 p-6"
            >
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Skill Mastery
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Career Quest Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl border border-border/50 p-6"
            >
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Career Quest Progress
              </h3>
              <div className="text-center mb-4">
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="hsl(var(--muted))" strokeWidth="12" fill="none" />
                    <circle
                      cx="64" cy="64" r="56"
                      stroke="hsl(var(--primary))"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${Math.min((user.gamesPlayed / 6) * 352, 352)} 352`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-foreground">{Math.min(user.gamesPlayed, 6)}</span>
                    <span className="text-xs text-muted-foreground">of 6</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={() => navigate("/games/career-quest")}>
                Continue Quest
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Recommended Career */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl border border-violet-500/30 p-6"
            >
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-violet-400" />
                Top Career Match
              </h3>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-1">{topCareer.title}</h4>
                <Badge variant="outline" className="text-violet-400 border-violet-400/50 mb-3">
                  {topCareer.match}% Match
                </Badge>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on your current skill scores and game performance.
                </p>
                <Button variant="hero" size="sm" onClick={() => navigate("/career-results")}>
                  View Details
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Games */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-2xl border border-border/50 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  Recent Games
                </h3>
                <Button variant="ghost" size="sm" onClick={() => navigate("/games")}>
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {recentGames.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-4">No games played yet. Start playing!</p>
                ) : (
                  recentGames.map((game, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                      <div>
                        <p className="font-medium text-foreground capitalize">
                          {game.gameType.replace(/-/g, " ")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(game.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{game.score}%</p>
                        <p className="text-xs text-primary">+{game.xpEarned} XP</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-card rounded-2xl border border-border/50 p-6"
            >
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Medal className="w-5 h-5 text-amber-400" />
                Badges
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((badge, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl text-center ${
                      badge.earned
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-muted/50 border border-border/30 opacity-50"
                    }`}
                  >
                    <div className={`mx-auto mb-2 w-fit ${badge.earned ? "text-primary" : "text-muted-foreground"}`}>
                      {badge.icon}
                    </div>
                    <p className="text-xs font-medium text-foreground">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.earned ? "✓ Earned" : "Locked"}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
