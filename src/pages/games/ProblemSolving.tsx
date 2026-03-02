import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { GameTimer } from "@/components/games/GameTimer";
import { GameScore } from "@/components/games/GameScore";
import { GameProgress } from "@/components/games/GameProgress";
import { GameResults } from "@/components/games/GameResults";
import { Lightbulb, ArrowLeft, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { saveGameResult } from "@/lib/gameStorage";
import { useAuth } from "@/contexts/AuthContext";
import { useGameQuestions } from "@/hooks/useGameQuestions";
import { problemSolvingQuestions } from "@/lib/gamesData";

interface Question {
  id: number;
  scenario: string;
  context: string;
  question: string;
  options: readonly { text: string; score: number; feedback: string }[];
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
}

export default function ProblemSolving() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { questions } = useGameQuestions<Question>("problem-solving", problemSolvingQuestions);
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
  const [showFeedback, setShowFeedback] = useState<string | null>(null);

  if (!questions.length) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-foreground">Loading scenarios...</p>
        </div>
      </Layout>
    );
  }

  const currentQ = questions[currentQuestion];
  const timePerQuestion = 60; // More time for scenarios

  const handleTimeUp = useCallback(() => {
    if (!isAnswered) {
      setIsAnswered(true);
      setStreak(0);
      toast({
        title: "Time's up!",
        description: "Moving to next scenario...",
        variant: "destructive",
      });
      setTimeout(moveToNext, 2000);
    }
  }, [isAnswered]);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;

    const timeTaken = Math.round((Date.now() - questionStartTime) / 1000);
    setTotalTime((prev) => prev + timeTaken);
    setSelectedAnswer(index);
    setIsAnswered(true);

    const option = currentQ.options[index];
    const points = option.score;
    const isOptimal = points === 30;

    setScore((prev) => prev + points);
    setXp((prev) => prev + Math.floor(points / 2));
    setShowFeedback(option.feedback);

    if (isOptimal) {
      setStreak((prev) => prev + 1);
      setCorrectAnswers((prev) => prev + 1);
      toast({
        title: "Optimal Choice! 🎉",
        description: `+${points} points`,
      });
    } else if (points >= 20) {
      toast({
        title: "Good Choice!",
        description: `+${points} points`,
      });
    } else {
      setStreak(0);
      toast({
        title: "Could be better",
        description: `+${points} points`,
        variant: "destructive",
      });
    }

    setTimeout(moveToNext, 4000);
  };

  const moveToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setQuestionStartTime(Date.now());
      setTimerKey((prev) => prev + 1);
      setShowFeedback(null);
    } else {
      submitResults();
    }
  };

  const submitResults = () => {
    setIsComplete(true);
    if (user) {
      saveGameResult(user.id, {
        gameType: "problem-solving",
        accuracy: Math.round((correctAnswers / questions.length) * 100),
        timeTaken: totalTime,
        score,
        xpEarned: xp,
        totalQuestions: questions.length,
        correctAnswers,
        completedAt: new Date().toISOString(),
      });
      updateUser({ totalXP: user.totalXP + xp, gamesPlayed: user.gamesPlayed + 1 });
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
    setShowFeedback(null);
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
              gameTitle="Problem Solving"
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
              <Lightbulb className="w-6 h-6 text-amber-400" />
              <h1 className="text-xl font-bold text-foreground">Problem Solving</h1>
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Scenario */}
                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-5 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">
                      Scenario
                    </span>
                    <span className="text-foreground font-semibold">{currentQ.scenario}</span>
                  </div>
                  <p className="text-muted-foreground">{currentQ.context}</p>
                </div>

                <h2 className="text-lg font-semibold text-foreground mb-4">
                  {currentQ.question}
                </h2>

                {/* Feedback */}
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-4 flex items-start gap-3"
                  >
                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">{showFeedback}</p>
                  </motion.div>
                )}

                <div className="space-y-3">
                  {currentQ.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const showResult = isAnswered;
                    const isOptimal = option.score === 30;

                    return (
                      <motion.button
                        key={index}
                        whileHover={!isAnswered ? { scale: 1.01 } : {}}
                        whileTap={!isAnswered ? { scale: 0.99 } : {}}
                        onClick={() => handleAnswer(index)}
                        disabled={isAnswered}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          showResult
                            ? isOptimal
                              ? "border-emerald-500 bg-emerald-500/10"
                              : isSelected
                              ? option.score >= 20
                                ? "border-amber-500 bg-amber-500/10"
                                : "border-rose-500 bg-rose-500/10"
                              : "border-border/50 opacity-50"
                            : isSelected
                            ? "border-primary bg-primary/10"
                            : "border-border/50 hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        <span className="text-foreground">{option.text}</span>
                        {showResult && (
                          <span className={`ml-2 text-sm font-medium ${
                            option.score >= 25 ? "text-emerald-400" : option.score >= 15 ? "text-amber-400" : "text-rose-400"
                          }`}>
                            +{option.score} pts
                          </span>
                        )}
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
