import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Shapes,
  Calculator,
  Lightbulb,
  Code,
  Trophy,
  Clock,
  Zap,
  Star,
  Lock,
  CheckCircle,
  Play,
} from "lucide-react";

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  skill: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  estimatedTime: string;
  icon: React.ReactNode;
  progress: number;
  isCompleted: boolean;
  isLocked: boolean;
  xpReward: number;
  onClick: () => void;
}

const difficultyColors = {
  Easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Hard: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Expert: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

const GameCard = ({
  title,
  description,
  skill,
  difficulty,
  estimatedTime,
  icon,
  progress,
  isCompleted,
  isLocked,
  xpReward,
  onClick,
}: GameCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: isLocked ? 1 : 1.02, y: isLocked ? 0 : -5 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-card rounded-2xl border overflow-hidden group ${
        isLocked
          ? "border-border/30 opacity-60"
          : isCompleted
          ? "border-primary/50 shadow-glow"
          : "border-border/50 hover:border-primary/30"
      }`}
    >
      {/* Glow effect */}
      {!isLocked && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}

      {/* Completed badge */}
      {isCompleted && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-primary rounded-full p-1.5">
            <CheckCircle className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      )}

      {/* Locked overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center">
            <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Complete previous games</p>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${
            isCompleted 
              ? "from-primary/20 to-primary/10" 
              : "from-muted to-muted/50"
          }`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          </div>
        </div>

        {/* Skill badge */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            <Zap className="w-3 h-3 mr-1" />
            {skill}
          </Badge>
          <Badge variant="outline" className={`text-xs ${difficultyColors[difficulty]}`}>
            {difficulty}
          </Badge>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400" />
            <span>{xpReward} XP</span>
          </div>
        </div>

        {/* Progress bar */}
        {progress > 0 && !isCompleted && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Action button */}
        <Button
          variant={isCompleted ? "outline" : "hero"}
          className="w-full"
          onClick={onClick}
          disabled={isLocked}
        >
          {isCompleted ? (
            <>
              <Trophy className="w-4 h-4 mr-2" />
              Play Again
            </>
          ) : progress > 0 ? (
            <>
              <Play className="w-4 h-4 mr-2" />
              Continue
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start Game
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

const games = [
  {
    id: "logical-reasoning",
    title: "Logical Reasoning",
    description: "Test your ability to analyze patterns and draw logical conclusions from given information.",
    skill: "Critical Thinking",
    difficulty: "Medium" as const,
    estimatedTime: "15 min",
    icon: <Brain className="w-6 h-6 text-primary" />,
    progress: 0,
    isCompleted: false,
    isLocked: false,
    xpReward: 150,
  },
  {
    id: "pattern-recognition",
    title: "Pattern Recognition",
    description: "Identify and complete visual and numerical patterns to assess cognitive abilities.",
    skill: "Visual Intelligence",
    difficulty: "Easy" as const,
    estimatedTime: "10 min",
    icon: <Shapes className="w-6 h-6 text-accent" />,
    progress: 45,
    isCompleted: false,
    isLocked: false,
    xpReward: 100,
  },
  {
    id: "mathematical-thinking",
    title: "Mathematical Thinking",
    description: "Solve numerical puzzles and mathematical problems that test quantitative reasoning.",
    skill: "Quantitative Analysis",
    difficulty: "Hard" as const,
    estimatedTime: "20 min",
    icon: <Calculator className="w-6 h-6 text-emerald-400" />,
    progress: 0,
    isCompleted: false,
    isLocked: false,
    xpReward: 200,
  },
  {
    id: "problem-solving",
    title: "Problem-Solving Scenarios",
    description: "Navigate real-world scenarios that require creative problem-solving approaches.",
    skill: "Analytical Skills",
    difficulty: "Medium" as const,
    estimatedTime: "25 min",
    icon: <Lightbulb className="w-6 h-6 text-amber-400" />,
    progress: 100,
    isCompleted: true,
    isLocked: false,
    xpReward: 175,
  },
  {
    id: "technical-knowledge",
    title: "Technical Knowledge",
    description: "Assess your understanding of technical concepts across various domains.",
    skill: "Domain Expertise",
    difficulty: "Hard" as const,
    estimatedTime: "30 min",
    icon: <Code className="w-6 h-6 text-cyan-400" />,
    progress: 0,
    isCompleted: false,
    isLocked: false,
    xpReward: 250,
  },
  {
    id: "career-quest",
    title: "Career Quest Mode",
    description: "An immersive journey through career-related challenges and discovery missions.",
    skill: "Career Aptitude",
    difficulty: "Expert" as const,
    estimatedTime: "45 min",
    icon: <Trophy className="w-6 h-6 text-rose-400" />,
    progress: 0,
    isCompleted: false,
    isLocked: true,
    xpReward: 500,
  },
];

export default function Games() {
  const navigate = useNavigate();
  const [userStats] = useState({
    level: 5,
    totalXP: 1250,
    xpToNextLevel: 2000,
    gamesCompleted: 1,
    totalGames: 6,
  });

  const handleGameClick = (gameId: string) => {
    navigate(`/games/${gameId}`);
  };

  const xpProgress = (userStats.totalXP / userStats.xpToNextLevel) * 100;

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              IQ & Knowledge Games
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Challenge yourself with engaging games designed to assess your cognitive abilities
              and help discover your ideal career path.
            </p>
          </motion.div>

          {/* User Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl border border-border/50 p-4 md:p-6 mb-8 shadow-soft"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Level Badge */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {userStats.level}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Level</p>
                  <p className="font-bold text-foreground">Explorer</p>
                </div>
              </div>

              {/* XP Progress */}
              <div className="flex-1 w-full md:w-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Experience Points</span>
                  <span className="text-foreground font-medium">
                    {userStats.totalXP} / {userStats.xpToNextLevel} XP
                  </span>
                </div>
                <Progress value={xpProgress} className="h-3" />
              </div>

              {/* Games Completed */}
              <div className="text-center md:text-right">
                <p className="text-sm text-muted-foreground">Games Completed</p>
                <p className="text-2xl font-bold text-foreground">
                  {userStats.gamesCompleted}
                  <span className="text-muted-foreground text-lg">/{userStats.totalGames}</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <GameCard {...game} onClick={() => handleGameClick(game.id)} />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 border border-border/50">
              <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">
                Complete All Games to Unlock Career Quest
              </h2>
              <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
                Finish all 5 assessment games to unlock the ultimate Career Quest Mode
                and receive your personalized AI-powered career recommendations.
              </p>
              <Button variant="outline" onClick={() => navigate("/career-results")}>
                View Your Progress
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
