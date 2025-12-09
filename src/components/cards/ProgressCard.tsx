import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProgressCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  progress: number;
  link: string;
  status: "not-started" | "in-progress" | "completed";
}

export function ProgressCard({
  icon: Icon,
  title,
  description,
  progress,
  link,
  status,
}: ProgressCardProps) {
  const statusStyles = {
    "not-started": "bg-muted text-muted-foreground",
    "in-progress": "bg-accent/10 text-accent",
    completed: "bg-green-100 text-green-700",
  };

  const statusLabels = {
    "not-started": "Not Started",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl p-5 shadow-soft border border-border/50 card-hover"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-semibold text-card-foreground truncate">{title}</h3>
            <span className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${statusStyles[status]}`}>
              {statusLabels[status]}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          <div className="flex items-center gap-3">
            <Progress value={progress} className="flex-1 h-2" />
            <span className="text-xs font-medium text-muted-foreground w-10">{progress}%</span>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border/50">
        <Button asChild variant="ghost" size="sm" className="w-full justify-between">
          <Link to={link}>
            {status === "completed" ? "View Results" : status === "in-progress" ? "Continue" : "Start Now"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
