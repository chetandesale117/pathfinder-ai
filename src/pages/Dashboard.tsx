import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
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
  CheckCircle,
  Clock,
  Flame,
} from "lucide-react";

const skillsData = [
  { skill: "Logical", score: 85, fullMark: 100 },
  { skill: "Math", score: 78, fullMark: 100 },
  { skill: "Pattern", score: 92, fullMark: 100 },
  { skill: "Problem", score: 70, fullMark: 100 },
  { skill: "Technical", score: 88, fullMark: 100 },
];

const recentGames = [
  { name: "Pattern Recognition", score: 92, time: "2 hours ago", xp: 150 },
  { name: "Logical Reasoning", score: 85, time: "Yesterday", xp: 120 },
  { name: "Mathematical Thinking", score: 78, time: "2 days ago", xp: 100 },
];

const badges = [
  { name: "Quick Thinker", icon: <Zap className="w-5 h-5" />, earned: true },
  { name: "Pattern Master", icon: <Target className="w-5 h-5" />, earned: true },
  { name: "Math Wizard", icon: <Brain className="w-5 h-5" />, earned: false },
  { name: "Problem Solver", icon: <Trophy className="w-5 h-5" />, earned: false },
];

const leaderboard = [
  { rank: 1, name: "Alex T.", score: 2850, avatar: "🏆" },
  { rank: 2, name: "Sarah M.", score: 2720, avatar: "🥈" },
  { rank: 3, name: "John D.", score: 2680, avatar: "🥉" },
  { rank: 4, name: "You", score: 2450, avatar: "⭐", isUser: true },
  { rank: 5, name: "Mike R.", score: 2380, avatar: "👤" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const userStats = {
    level: 12,
    totalXP: 2450,
    xpToNextLevel: 3000,
    gamesPlayed: 18,
    streak: 5,
    iqScore: 83,
    careerReadiness: 78,
  };

  const xpProgress = (userStats.totalXP / userStats.xpToNextLevel) * 100;
  const completedGames = 4;
  const totalGames = 6;

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome Back, Explorer! 👋
            </h1>
            <p className="text-muted-foreground">
              Track your progress and discover your ideal career path
            </p>
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
                    <span className="text-3xl font-bold text-primary-foreground">
                      {userStats.level}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1.5">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Level</p>
                  <p className="text-xl font-bold text-foreground">Strategist</p>
                  <div className="flex items-center gap-1 text-orange-400">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm font-medium">{userStats.streak} day streak!</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Experience Points</span>
                  <span className="text-foreground font-medium">
                    {userStats.totalXP} / {userStats.xpToNextLevel} XP
                  </span>
                </div>
                <Progress value={xpProgress} className="h-4" />
                <p className="text-xs text-muted-foreground mt-1">
                  {userStats.xpToNextLevel - userStats.totalXP} XP to next level
                </p>
              </div>

              <Button variant="hero" onClick={() => navigate("/games")}>
                <Play className="w-4 h-4 mr-2" />
                Play Games
              </Button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Stats Cards */}
            {[
              { label: "Games Played", value: userStats.gamesPlayed, icon: <Gamepad2 className="w-5 h-5" />, color: "text-violet-400" },
              { label: "IQ Score", value: userStats.iqScore, icon: <Brain className="w-5 h-5" />, color: "text-emerald-400" },
              { label: "Career Ready", value: `${userStats.careerReadiness}%`, icon: <Target className="w-5 h-5" />, color: "text-amber-400" },
              { label: "Total XP", value: userStats.totalXP, icon: <Star className="w-5 h-5" />, color: "text-primary" },
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
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="hsl(var(--muted))"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="hsl(var(--primary))"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${(completedGames / totalGames) * 352} 352`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-foreground">{completedGames}</span>
                    <span className="text-xs text-muted-foreground">of {totalGames}</span>
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
                <h4 className="text-xl font-bold text-foreground mb-1">Data Scientist</h4>
                <Badge variant="outline" className="text-violet-400 border-violet-400/50 mb-3">
                  85% Match
                </Badge>
                <p className="text-sm text-muted-foreground mb-4">
                  Your analytical and pattern recognition skills make you perfect for this role
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
                {recentGames.map((game, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="font-medium text-foreground">{game.name}</p>
                        <p className="text-xs text-muted-foreground">{game.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">{game.score}%</p>
                      <p className="text-xs text-primary">+{game.xp} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Badges & Leaderboard */}
            <div className="space-y-6">
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
                <div className="flex gap-3">
                  {badges.map((badge, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 p-3 rounded-xl text-center ${
                        badge.earned
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-muted/50 border border-border/30 opacity-50"
                      }`}
                    >
                      <div className={`mx-auto mb-1 ${badge.earned ? "text-primary" : "text-muted-foreground"}`}>
                        {badge.icon}
                      </div>
                      <p className="text-xs text-muted-foreground">{badge.name}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Mini Leaderboard */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-card rounded-2xl border border-border/50 p-6"
              >
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  Leaderboard
                </h3>
                <div className="space-y-2">
                  {leaderboard.map((player) => (
                    <div
                      key={player.rank}
                      className={`flex items-center justify-between p-2 rounded-lg ${
                        player.isUser ? "bg-primary/10 border border-primary/30" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{player.avatar}</span>
                        <span className={`font-medium ${player.isUser ? "text-primary" : "text-foreground"}`}>
                          {player.name}
                        </span>
                      </div>
                      <span className="font-bold text-muted-foreground">{player.score}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
