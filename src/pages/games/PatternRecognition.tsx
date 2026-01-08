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
import { useGameQuestions } from "@/hooks/useGameQuestions";
import { patternRecognitionQuestions } from "@/lib/gamesData";

interface Question {
  id: number;
  pattern: string[];
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
}

export default function PatternRecognition() {
  const navigate = useNavigate();
  const { questions } = useGameQuestions<Question>("pattern-recognition", patternRecognitionQuestions);
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

  if (!questions.length) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-foreground">Loading questions...</p>
        </div>
      </Layout>
    );
  }

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
