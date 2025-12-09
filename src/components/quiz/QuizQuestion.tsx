import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  selectedOption: string | null;
  onSelect: (optionId: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuizQuestion({
  question,
  options,
  selectedOption,
  onSelect,
  questionNumber,
  totalQuestions,
}: QuizQuestionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={questionNumber}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="mb-6">
          <span className="text-sm font-medium text-primary">
            Question {questionNumber} of {totalQuestions}
          </span>
          <h2 className="text-xl md:text-2xl font-semibold text-card-foreground mt-2">
            {question}
          </h2>
        </div>

        <div className="space-y-3">
          {options.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => onSelect(option.id)}
              className={cn(
                "w-full text-left p-4 rounded-xl border-2 transition-all duration-200",
                selectedOption === option.id
                  ? "border-primary bg-primary/5 shadow-glow"
                  : "border-border hover:border-primary/30 hover:bg-secondary/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                    selectedOption === option.id
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  )}
                >
                  {selectedOption === option.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full bg-primary-foreground"
                    />
                  )}
                </div>
                <span
                  className={cn(
                    "font-medium",
                    selectedOption === option.id ? "text-primary" : "text-card-foreground"
                  )}
                >
                  {option.text}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
