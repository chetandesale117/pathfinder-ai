import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Clock, Target, RotateCcw, Home, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GameResultsProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  totalTime: number;
  xpEarned: number;
  onRetry: () => void;
  gameTitle: string;
}

export function GameResults({
  score,
  totalQuestions,
  correctAnswers,
  totalTime,
  xpEarned,
  onRetry,
  gameTitle,
}: GameResultsProps) {
  const navigate = useNavigate();
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const avgTime = Math.round(totalTime / totalQuestions);

  const getGrade = () => {
    if (accuracy >= 90) return { grade: "A+", color: "text-emerald-400", message: "Outstanding!" };
    if (accuracy >= 80) return { grade: "A", color: "text-emerald-400", message: "Excellent!" };
    if (accuracy >= 70) return { grade: "B", color: "text-amber-400", message: "Great Job!" };
    if (accuracy >= 60) return { grade: "C", color: "text-orange-400", message: "Good Effort!" };
    return { grade: "D", color: "text-rose-400", message: "Keep Practicing!" };
  };

  const { grade, color, message } = getGrade();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card rounded-2xl border border-border/50 p-8 max-w-lg mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
      >
        <Trophy className="w-12 h-12 text-amber-400" />
      </motion.div>

      <h2 className="text-2xl font-bold text-foreground mb-2">{gameTitle} Complete!</h2>
      <p className="text-muted-foreground mb-6">{message}</p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`text-6xl font-bold ${color} mb-8`}
      >
        {grade}
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-muted/50 rounded-xl p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Accuracy</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
        </div>

        <div className="bg-muted/50 rounded-xl p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="text-sm text-muted-foreground">Score</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{score}</p>
        </div>

        <div className="bg-muted/50 rounded-xl p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-muted-foreground">Avg Time</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{avgTime}s</p>
        </div>

        <div className="bg-muted/50 rounded-xl p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">XP Earned</span>
          </div>
          <p className="text-2xl font-bold text-primary">+{xpEarned}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mb-6 text-sm">
        <CheckCircle className="w-4 h-4 text-emerald-400" />
        <span className="text-emerald-400">{correctAnswers} Correct</span>
        <span className="text-muted-foreground">•</span>
        <XCircle className="w-4 h-4 text-rose-400" />
        <span className="text-rose-400">{totalQuestions - correctAnswers} Wrong</span>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={() => navigate("/games")}>
          <Home className="w-4 h-4 mr-2" />
          Games
        </Button>
        <Button variant="hero" className="flex-1" onClick={onRetry}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Play Again
        </Button>
      </div>
    </motion.div>
  );
}
