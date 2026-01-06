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

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
}

const questions: Question[] = [
  {
    id: 1,
    category: "Web Technologies",
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
    correctAnswer: 0,
    explanation: "HTML = Hyper Text Markup Language, the standard markup language for web pages.",
    difficulty: "Easy",
  },
  {
    id: 2,
    category: "Programming",
    question: "Which of these is NOT a programming language?",
    options: ["Python", "Java", "HTML", "C++"],
    correctAnswer: 2,
    explanation: "HTML is a markup language, not a programming language.",
    difficulty: "Easy",
  },
  {
    id: 3,
    category: "Data Structures",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1,
    explanation: "Binary search divides the search space in half each time, giving O(log n).",
    difficulty: "Medium",
  },
  {
    id: 4,
    category: "AI/ML",
    question: "What does 'ML' stand for in AI/ML?",
    options: ["Machine Learning", "Meta Language", "Markup Logic", "Memory Layer"],
    correctAnswer: 0,
    explanation: "ML stands for Machine Learning, a subset of AI.",
    difficulty: "Easy",
  },
  {
    id: 5,
    category: "Databases",
    question: "Which SQL clause is used to filter records?",
    options: ["SELECT", "FROM", "WHERE", "ORDER BY"],
    correctAnswer: 2,
    explanation: "WHERE clause is used to filter records based on conditions.",
    difficulty: "Easy",
  },
  {
    id: 6,
    category: "Web Technologies",
    question: "What is the purpose of CSS?",
    options: ["Server-side scripting", "Styling web pages", "Database management", "Network security"],
    correctAnswer: 1,
    explanation: "CSS (Cascading Style Sheets) is used for styling and layout of web pages.",
    difficulty: "Easy",
  },
  {
    id: 7,
    category: "Programming",
    question: "What is a 'callback' in programming?",
    options: ["A return statement", "A function passed as an argument", "A loop structure", "An error handler"],
    correctAnswer: 1,
    explanation: "A callback is a function passed to another function to be executed later.",
    difficulty: "Medium",
  },
  {
    id: 8,
    category: "AI/ML",
    question: "Which algorithm is commonly used for classification problems?",
    options: ["Linear Regression", "K-Means", "Decision Trees", "PCA"],
    correctAnswer: 2,
    explanation: "Decision Trees are widely used for classification tasks.",
    difficulty: "Medium",
  },
  {
    id: 9,
    category: "Debugging",
    question: "What does this code output? console.log(typeof null)",
    options: ["'null'", "'undefined'", "'object'", "'number'"],
    correctAnswer: 2,
    explanation: "In JavaScript, typeof null returns 'object' - a known quirk of the language.",
    difficulty: "Hard",
  },
  {
    id: 10,
    category: "Data Interpretation",
    question: "In REST APIs, what does the status code 404 indicate?",
    options: ["Success", "Created", "Not Found", "Server Error"],
    correctAnswer: 2,
    explanation: "404 means the requested resource was not found on the server.",
    difficulty: "Easy",
  },
  {
    id: 11,
    category: "Programming",
    question: "What is the output of: [1,2,3].map(x => x * 2)?",
    options: ["[1,2,3]", "[2,4,6]", "[1,4,9]", "6"],
    correctAnswer: 1,
    explanation: "map() applies the function to each element: 1*2=2, 2*2=4, 3*2=6.",
    difficulty: "Medium",
  },
  {
    id: 12,
    category: "AI/ML",
    question: "What is 'overfitting' in machine learning?",
    options: ["Model is too simple", "Model performs well on training but poorly on new data", "Model is too slow", "Model has too few parameters"],
    correctAnswer: 1,
    explanation: "Overfitting occurs when a model learns training data too well, including noise.",
    difficulty: "Hard",
  },
];

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
