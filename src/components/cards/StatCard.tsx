import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  index?: number;
}

export function StatCard({ icon: Icon, label, value, trend, trendUp, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card rounded-xl p-5 shadow-soft border border-border/50"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {trend && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              trendUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-card-foreground">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </motion.div>
  );
}
