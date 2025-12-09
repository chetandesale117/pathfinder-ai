import { motion } from "framer-motion";
import { Briefcase, TrendingUp, DollarSign } from "lucide-react";

interface Career {
  title: string;
  matchPercentage: number;
  salary: string;
  growth: string;
  description: string;
}

interface CareerMatchProps {
  careers: Career[];
}

export function CareerMatch({ careers }: CareerMatchProps) {
  return (
    <div className="space-y-4">
      {careers.map((career, index) => (
        <motion.div
          key={career.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-card rounded-xl p-5 border border-border/50 shadow-soft card-hover"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">{career.title}</h3>
                <p className="text-sm text-muted-foreground">{career.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold text-primary">{career.matchPercentage}%</span>
              <span className="text-xs text-muted-foreground">match</span>
            </div>
          </div>
          
          <div className="w-full bg-secondary rounded-full h-2 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${career.matchPercentage}%` }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="h-full gradient-primary rounded-full"
            />
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span>{career.salary}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span>{career.growth} growth</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
