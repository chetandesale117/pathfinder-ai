import { motion } from "framer-motion";
import { Star, Zap, Trophy } from "lucide-react";

interface GameScoreProps {
  score: number;
  streak: number;
  xp: number;
}

export function GameScore({ score, streak, xp }: GameScoreProps) {
  return (
    <div className="flex items-center gap-6">
      <motion.div
        key={score}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        className="flex items-center gap-2"
      >
        <Trophy className="w-5 h-5 text-amber-400" />
        <span className="font-bold text-foreground">{score}</span>
      </motion.div>

      {streak > 1 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30"
        >
          <Zap className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-bold text-orange-400">{streak}x Streak!</span>
        </motion.div>
      )}

      <motion.div
        key={xp}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        className="flex items-center gap-2"
      >
        <Star className="w-5 h-5 text-primary" />
        <span className="font-bold text-primary">{xp} XP</span>
      </motion.div>
    </div>
  );
}
