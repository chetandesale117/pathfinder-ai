import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">Progress</span>
        <motion.span
          key={percentage}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-sm font-bold text-primary"
        >
          {percentage}%
        </motion.span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
