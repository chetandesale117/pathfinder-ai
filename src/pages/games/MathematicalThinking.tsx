import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { GameTimer } from "@/components/games/GameTimer";
import { GameScore } from "@/components/games/GameScore";
import { GameProgress } from "@/components/games/GameProgress";
import { GameResults } from "@/components/games/GameResults";
import { Calculator, ArrowLeft, SkipForward } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is 15% of 240?",
    options: ["32", "36", "38", "42"],
    correctAnswer: 1,
    explanation: "15% of 240 = 0.15 × 240 = 36",
    difficulty: "Easy",
  },
  {
    id: 2,
    question: "If x + 5 = 12, what is 2x + 3?",
    options: ["15", "17", "19", "21"],
    correctAnswer: 1,
    explanation: "x = 7, so 2x + 3 = 14 + 3 = 17",
    difficulty: "Easy",
  },
  {
    id: 3,
    question: "What is the square root of 169?",
    options: ["11", "12", "13", "14"],
    correctAnswer: 2,
    explanation: "√169 = 13 because 13 × 13 = 169",
    difficulty: "Easy",
  },
  {
    id: 4,
    question: "A shirt costs $80 after a 20% discount. What was the original price?",
    options: ["$96", "$100", "$104", "$120"],
    correctAnswer: 1,
    explanation: "If 80% = $80, then 100% = $80 ÷ 0.8 = $100",
    difficulty: "Medium",
  },
  {
    id: 5,
    question: "What is 3⁴ + 2³?",
    options: ["81", "85", "89", "91"],
    correctAnswer: 2,
    explanation: "3⁴ = 81 and 2³ = 8, so 81 + 8 = 89",
    difficulty: "Medium",
  },
  {
    id: 6,
    question: "If a train travels at 60 km/h, how long to cover 150 km?",
    options: ["2 hours", "2.5 hours", "3 hours", "3.5 hours"],
    correctAnswer: 1,
    explanation: "Time = Distance ÷ Speed = 150 ÷ 60 = 2.5 hours",
    difficulty: "Medium",
  },
  {
    id: 7,
    question: "Solve: (2/3) × (9/4) = ?",
    options: ["3/2", "6/12", "18/12", "1/2"],
    correctAnswer: 0,
    explanation: "(2×9)/(3×4) = 18/12 = 3/2",
    difficulty: "Medium",
  },
  {
    id: 8,
    question: "If the ratio of boys to girls is 3:5 and there are 24 boys, how many girls?",
    options: ["32", "36", "40", "48"],
    correctAnswer: 2,
    explanation: "3:5 = 24:x → x = (24 × 5) ÷ 3 = 40",
    difficulty: "Hard",
  },
  {
    id: 9,
    question: "What is the area of a triangle with base 12 and height 8?",
    options: ["42", "48", "52", "96"],
    correctAnswer: 1,
    explanation: "Area = (1/2) × base × height = (1/2) × 12 × 8 = 48",
    difficulty: "Easy",
  },
  {
    id: 10,
    question: "If f(x) = 2x² - 3x + 1, what is f(3)?",
    options: ["8", "10", "12", "14"],
    correctAnswer: 1,
    explanation: "f(3) = 2(9) - 3(3) + 1 = 18 - 9 + 1 = 10",
    difficulty: "Hard",
  },
];

export default function MathematicalThinking() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timerKey, setTimerKey] = useState(0);
  const [skipsUsed, setSkipsUsed] = useState(0);

  const currentQ = questions[currentQuestion];
  const timePerQuestion = currentQ.difficulty === "Easy" ? 20 : currentQ.difficulty === "Medium" ? 30 : 40;

  const handleTimeUp = useCallback(() => {
    if (!isAnswered) {
      setIsAnswered(true);
      setStreak(0);
      toast({
        title: "Time's up!",
        description: currentQ.explanation,
        variant: "destructive",
      });
      setTimeout(moveToNext, 2000);
    }
  }, [isAnswered, currentQ.explanation]);

  const handleSkip = () => {
    if (skipsUsed >= 2 || isAnswered) return;
    setSkipsUsed((prev) => prev + 1);
    setStreak(0);
    toast({
      title: "Question Skipped",
      description: `${2 - skipsUsed - 1} skips remaining`,
    });
    moveToNext();
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;

    const timeTaken = Math.round((Date.now() - questionStartTime) / 1000);
    setTotalTime((prev) => prev + timeTaken);
    setSelectedAnswer(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctAnswer;

    if (isCorrect) {
      const basePoints = currentQ.difficulty === "Easy" ? 10 : currentQ.difficulty === "Medium" ? 20 : currentQ.difficulty === "Hard" ? 30 : 50;
      const timeBonus = Math.max(0, Math.floor((timePerQuestion - timeTaken) / 2));
      const streakBonus = streak * 5;
      const points = basePoints + timeBonus + streakBonus;

      setScore((prev) => prev + points);
      setXp((prev) => prev + Math.floor(points / 2));
      setStreak((prev) => prev + 1);
      setCorrectAnswers((prev) => prev + 1);

      toast({
        title: "Correct! 🎉",
        description: `+${points} points`,
      });
    } else {
      setStreak(0);
      toast({
        title: "Incorrect",
        description: currentQ.explanation,
        variant: "destructive",
      });
    }

    setTimeout(moveToNext, 2000);
  };

  const moveToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setQuestionStartTime(Date.now());
      setTimerKey((prev) => prev + 1);
    } else {
      submitResults();
    }
  };

  const submitResults = async () => {
    setIsComplete(true);
    try {
      await axios.post("/api/game/submit", {
        gameType: "mathematical-thinking",
        accuracy: (correctAnswers / questions.length) * 100,
        timeTaken: totalTime,
        score,
        xpEarned: xp,
        skipsUsed,
      });
    } catch {
      // Silently handle
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setXp(0);
    setStreak(0);
    setCorrectAnswers(0);
    setIsAnswered(false);
    setIsComplete(false);
    setTotalTime(0);
    setQuestionStartTime(Date.now());
    setTimerKey((prev) => prev + 1);
    setSkipsUsed(0);
  };

  if (isComplete) {
    return (
      <Layout>
        <div className="min-h-screen bg-background py-12">
          <div className="container mx-auto px-4">
            <GameResults
              score={score}
              totalQuestions={questions.length}
              correctAnswers={correctAnswers}
              totalTime={totalTime}
              xpEarned={xp}
              onRetry={handleRetry}
              gameTitle="Mathematical Thinking"
            />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => navigate("/games")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit Game
            </Button>
            <div className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-emerald-400" />
              <h1 className="text-xl font-bold text-foreground">Math Challenge</h1>
            </div>
          </div>

          {/* Score Bar */}
          <div className="bg-card rounded-xl border border-border/50 p-4 mb-6">
            <div className="flex items-center justify-between">
              <GameScore score={score} streak={streak} xp={xp} />
              <Button
                variant="outline"
                size="sm"
                onClick={handleSkip}
                disabled={skipsUsed >= 2 || isAnswered}
              >
                <SkipForward className="w-4 h-4 mr-2" />
                Skip ({2 - skipsUsed})
              </Button>
            </div>
          </div>

          {/* Game Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border/50 p-6 md:p-8 shadow-soft"
          >
            <GameProgress
              current={currentQuestion + 1}
              total={questions.length}
              difficulty={currentQ.difficulty}
            />

            <div className="my-6">
              <GameTimer
                duration={timePerQuestion}
                onTimeUp={handleTimeUp}
                isRunning={!isAnswered}
                resetKey={timerKey}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground text-center">
                    {currentQ.question}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {currentQ.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQ.correctAnswer;
                    const showResult = isAnswered;

                    return (
                      <motion.button
                        key={index}
                        whileHover={!isAnswered ? { scale: 1.02 } : {}}
                        whileTap={!isAnswered ? { scale: 0.98 } : {}}
                        onClick={() => handleAnswer(index)}
                        disabled={isAnswered}
                        className={`p-4 rounded-xl border-2 text-center font-mono text-lg transition-all ${
                          showResult
                            ? isCorrect
                              ? "border-emerald-500 bg-emerald-500/10"
                              : isSelected
                              ? "border-rose-500 bg-rose-500/10"
                              : "border-border/50 opacity-50"
                            : isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border/50 hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        <span className={
                          showResult && isCorrect ? "text-emerald-400 font-bold" : "text-foreground"
                        }>
                          {option}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
