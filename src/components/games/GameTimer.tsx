import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface GameTimerProps {
  duration: number;
  onTimeUp: () => void;
  isRunning: boolean;
  resetKey?: number;
}

export function GameTimer({ duration, onTimeUp, isRunning, resetKey }: GameTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, resetKey]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onTimeUp, resetKey]);

  const percentage = (timeLeft / duration) * 100;
  const isLow = timeLeft <= 10;

  return (
    <div className="flex items-center gap-3">
      <Clock className={`w-5 h-5 ${isLow ? "text-destructive" : "text-muted-foreground"}`} />
      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            isLow ? "bg-destructive" : "bg-primary"
          }`}
          initial={{ width: "100%" }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <span className={`font-mono font-bold min-w-[3rem] text-right ${
        isLow ? "text-destructive" : "text-foreground"
      }`}>
        {timeLeft}s
      </span>
    </div>
  );
}
