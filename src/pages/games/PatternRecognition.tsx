import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { GameTimer } from "@/components/games/GameTimer";
import { GameScore } from "@/components/games/GameScore";
import { GameProgress } from "@/components/games/GameProgress";
import { GameResults } from "@/components/games/GameResults";
import { Shapes, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { gameAPI } from "@/lib/api";

interface Question {
  id: number;
  pattern: string[];
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
}

const questions: Question[] = [
  {
    id: 1,
    pattern: ["🔴", "🔵", "🔴", "🔵", "🔴", "?"],
    question: "What comes next in the pattern?",
    options: ["🔴", "🔵", "🟢", "🟡"],
    correctAnswer: 1,
    explanation: "The pattern alternates between red and blue circles.",
    difficulty: "Easy",
  },
  {
    id: 2,
    pattern: ["⬛", "⬜", "⬛", "⬜⬜", "⬛", "⬜⬜⬜", "⬛", "?"],
    question: "What comes next?",
    options: ["⬛", "⬜⬜⬜⬜", "⬜", "⬛⬛"],
    correctAnswer: 1,
    explanation: "Black stays constant, white squares increase by 1 each time.",
    difficulty: "Medium",
  },
  {
    id: 3,
    pattern: ["2", "4", "8", "16", "?"],
    question: "Find the next number:",
    options: ["24", "32", "30", "28"],
    correctAnswer: 1,
    explanation: "Each number is doubled: ×2 pattern",
    difficulty: "Easy",
  },
  {
    id: 4,
    pattern: ["🔺", "🔺🔺", "🔺🔺🔺", "🔺🔺🔺🔺", "?"],
    question: "Continue the sequence:",
    options: ["🔺🔺🔺🔺🔺", "🔺🔺🔺", "🔻🔻🔻🔻🔻", "🔺"],
    correctAnswer: 0,
    explanation: "The triangles increase by 1 each step.",
    difficulty: "Easy",
  },
  {
    id: 5,
    pattern: ["A1", "B2", "C3", "D4", "?"],
    question: "What comes next?",
    options: ["E4", "E5", "F5", "D5"],
    correctAnswer: 1,
    explanation: "Letters go A-E, numbers go 1-5.",
    difficulty: "Easy",
  },
  {
    id: 6,
    pattern: ["1", "1", "2", "3", "5", "8", "?"],
    question: "Find the missing number:",
    options: ["11", "12", "13", "15"],
    correctAnswer: 2,
    explanation: "Fibonacci: each number is the sum of the previous two (5+8=13).",
    difficulty: "Medium",
  },
  {
    id: 7,
    pattern: ["🌑", "🌒", "🌓", "🌔", "?"],
    question: "What moon phase comes next?",
    options: ["🌕", "🌑", "🌖", "🌘"],
    correctAnswer: 0,
    explanation: "Moon phases in order lead to full moon 🌕.",
    difficulty: "Easy",
  },
  {
    id: 8,
    pattern: ["3", "6", "11", "18", "27", "?"],
    question: "Find the pattern:",
    options: ["36", "38", "40", "42"],
    correctAnswer: 1,
    explanation: "Differences increase: +3, +5, +7, +9, +11 = 38",
    difficulty: "Hard",
  },
  {
    id: 9,
    pattern: ["🔲🔲🔲", "🔲🔳🔲", "🔲🔳🔳", "🔳🔳🔳", "?"],
    question: "What's the next step?",
    options: ["🔲🔲🔲", "🔳🔳🔲", "All white", "🔲🔳🔲"],
    correctAnswer: 0,
    explanation: "The pattern cycles back to the beginning.",
    difficulty: "Hard",
  },
  {
    id: 10,
    pattern: ["1", "4", "9", "16", "25", "?"],
    question: "Complete the sequence:",
    options: ["30", "32", "36", "49"],
    correctAnswer: 2,
    explanation: "Perfect squares: 1², 2², 3², 4², 5², 6² = 36",
    difficulty: "Medium",
  },
];

export default function PatternRecognition() {
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

  const currentQ = questions[currentQuestion];
  const timePerQuestion = currentQ.difficulty === "Easy" ? 25 : currentQ.difficulty === "Medium" ? 30 : 40;

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
      await gameAPI.submit({
        gameType: "pattern-recognition",
        accuracy: (correctAnswers / questions.length) * 100,
        timeTaken: totalTime,
        score,
        xpEarned: xp,
        totalQuestions: questions.length,
        correctAnswers,
        streak,
        avgTimePerQuestion: totalTime / questions.length,
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
              gameTitle="Pattern Recognition"
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
              <Shapes className="w-6 h-6 text-accent" />
              <h1 className="text-xl font-bold text-foreground">Pattern Recognition</h1>
            </div>
          </div>

          {/* Score Bar */}
          <div className="bg-card rounded-xl border border-border/50 p-4 mb-6">
            <GameScore score={score} streak={streak} xp={xp} />
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {/* Pattern Display */}
                <div className="bg-gradient-to-br from-muted to-muted/50 rounded-xl p-6 mb-6">
                  <div className="flex flex-wrap items-center justify-center gap-3 text-3xl md:text-4xl">
                    {currentQ.pattern.map((item, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={item === "?" ? "w-12 h-12 rounded-lg border-2 border-dashed border-primary flex items-center justify-center text-primary" : ""}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <h2 className="text-lg font-medium text-foreground mb-4 text-center">
                  {currentQ.question}
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  {currentQ.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQ.correctAnswer;
                    const showResult = isAnswered;

                    return (
                      <motion.button
                        key={index}
                        whileHover={!isAnswered ? { scale: 1.05 } : {}}
                        whileTap={!isAnswered ? { scale: 0.95 } : {}}
                        onClick={() => handleAnswer(index)}
                        disabled={isAnswered}
                        className={`p-6 rounded-xl border-2 text-center text-2xl transition-all ${
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
                        {option}
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
