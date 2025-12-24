import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface GameProgressProps {
  current: number;
  total: number;
  difficulty: string;
}

const difficultyColors: Record<string, string> = {
  Easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Hard: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Expert: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

export function GameProgress({ current, total, difficulty }: GameProgressProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Question {current} of {total}
        </span>
        <Badge variant="outline" className={difficultyColors[difficulty] || difficultyColors.Easy}>
          {difficulty}
        </Badge>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
