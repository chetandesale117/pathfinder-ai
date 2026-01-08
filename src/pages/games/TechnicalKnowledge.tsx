import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GameTimer } from "@/components/games/GameTimer";
import { GameScore } from "@/components/games/GameScore";
import { GameProgress } from "@/components/games/GameProgress";
import { GameResults } from "@/components/games/GameResults";
import { Code, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { gameAPI } from "@/lib/api";
import { useGameQuestions } from "@/hooks/useGameQuestions";
import { technicalKnowledgeQuestions } from "@/lib/gamesData";

interface Question {
  id: number;
  category: string;
  question: string;
  options: readonly string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
}

const categoryColors: Record<string, string> = {
  "Web Technologies": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "Programming": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  "Data Structures": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "AI/ML": "bg-rose-500/20 text-rose-400 border-rose-500/30",
  "Databases": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Debugging": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Data Interpretation": "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export default function TechnicalKnowledge() {
  const navigate = useNavigate();
  const { questions } = useGameQuestions<Question>("technical-knowledge", technicalKnowledgeQuestions);
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
  const [categoryScores, setCategoryScores] = useState<Record<string, { correct: number; total: number }>>({});

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
  const timePerQuestion = currentQ.difficulty === "Easy" ? 20 : currentQ.difficulty === "Medium" ? 30 : 40;

  const handleTimeUp = useCallback(() => {
    if (!isAnswered) {
      setIsAnswered(true);
      setStreak(0);
      updateCategoryScore(currentQ.category, false);
      toast({
        title: "Time's up!",
        description: currentQ.explanation,
        variant: "destructive",
      });
      setTimeout(moveToNext, 2000);
    }
  }, [isAnswered, currentQ]);

  const updateCategoryScore = (category: string, isCorrect: boolean) => {
    setCategoryScores((prev) => ({
      ...prev,
      [category]: {
        correct: (prev[category]?.correct || 0) + (isCorrect ? 1 : 0),
        total: (prev[category]?.total || 0) + 1,
      },
    }));
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;

    const timeTaken = Math.round((Date.now() - questionStartTime) / 1000);
    setTotalTime((prev) => prev + timeTaken);
    setSelectedAnswer(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctAnswer;
    updateCategoryScore(currentQ.category, isCorrect);

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
        gameType: "technical-knowledge",
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
    setCategoryScores({});
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
              gameTitle="Technical Knowledge"
            />
            
            {/* Skill Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-card rounded-2xl border border-border/50 p-6 max-w-lg mx-auto"
            >
              <h3 className="font-bold text-foreground mb-4 text-center">Skill Breakdown</h3>
              <div className="space-y-3">
                {Object.entries(categoryScores).map(([category, { correct, total }]) => (
                  <div key={category} className="flex items-center justify-between">
                    <Badge variant="outline" className={categoryColors[category]}>
                      {category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {correct}/{total} ({Math.round((correct / total) * 100)}%)
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
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
              <Code className="w-6 h-6 text-cyan-400" />
              <h1 className="text-xl font-bold text-foreground">Technical Knowledge</h1>
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
            <div className="flex items-center justify-between mb-4">
              <GameProgress
                current={currentQuestion + 1}
                total={questions.length}
                difficulty={currentQ.difficulty}
              />
            </div>

            <div className="mb-4">
              <Badge variant="outline" className={categoryColors[currentQ.category]}>
                {currentQ.category}
              </Badge>
            </div>

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
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
                  {currentQ.question}
                </h2>

                <div className="space-y-3">
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
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
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
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-mono ${
                            showResult
                              ? isCorrect
                                ? "bg-emerald-500 text-white"
                                : isSelected
                                ? "bg-rose-500 text-white"
                                : "bg-muted text-muted-foreground"
                              : "bg-muted text-foreground"
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className={`flex-1 ${
                            showResult && isCorrect ? "text-emerald-400 font-medium" : "text-foreground"
                          }`}>
                            {option}
                          </span>
                        </div>
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
