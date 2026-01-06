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
import { gameAPI } from "@/lib/api";

interface Question {
  id: number;
  scenario: string;
  context: string;
  question: string;
  options: { text: string; score: number; feedback: string }[];
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
}

const questions: Question[] = [
  {
    id: 1,
    scenario: "Team Conflict",
    context: "You're a team lead and two of your best developers are in a heated disagreement about which technology to use for a new project. The deadline is approaching.",
    question: "What's your approach?",
    options: [
      { text: "Make the decision yourself to save time", score: 15, feedback: "Quick but may cause resentment. Sometimes necessary under pressure." },
      { text: "Schedule a meeting to hear both sides and find a compromise", score: 30, feedback: "Excellent! This builds consensus and respects both opinions." },
      { text: "Let them figure it out on their own", score: 5, feedback: "Avoids your leadership responsibility and may delay the project." },
      { text: "Ask a senior architect to decide", score: 20, feedback: "Good for technical decisions, but may undermine your authority." },
    ],
    difficulty: "Medium",
  },
  {
    id: 2,
    scenario: "Client Emergency",
    context: "A major client reports a critical bug in production at 5 PM on Friday. Your team is exhausted after a long week, and it's unclear how long the fix will take.",
    question: "How do you handle this?",
    options: [
      { text: "Tell the client it will be fixed Monday", score: 10, feedback: "May damage client relationship for a critical issue." },
      { text: "Ask for volunteers and offer compensation for overtime", score: 30, feedback: "Respects team while addressing urgency. Great balance!" },
      { text: "Mandate the team to stay and fix it", score: 15, feedback: "Gets it done but hurts morale and work-life balance." },
      { text: "Try to fix it yourself over the weekend", score: 20, feedback: "Admirable but not scalable or sustainable." },
    ],
    difficulty: "Hard",
  },
  {
    id: 3,
    scenario: "Budget Cut",
    context: "Your department's budget has been cut by 20%. You need to reduce costs without significantly impacting productivity.",
    question: "What's your strategy?",
    options: [
      { text: "Lay off the newest team members", score: 10, feedback: "May seem unfair and lose valuable fresh perspectives." },
      { text: "Cut training and development programs", score: 5, feedback: "Short-term saving but hurts long-term growth." },
      { text: "Review all expenses and optimize workflows first", score: 30, feedback: "Smart approach - find inefficiencies before cutting people." },
      { text: "Ask for voluntary reduced hours", score: 20, feedback: "Creative but may not meet the full 20% requirement." },
    ],
    difficulty: "Hard",
  },
  {
    id: 4,
    scenario: "Innovation vs. Stability",
    context: "Your company uses an old but reliable system. A new technology could improve efficiency by 40% but carries implementation risks.",
    question: "What do you recommend?",
    options: [
      { text: "Stick with the current system - if it works, don't fix it", score: 10, feedback: "Safe but may cause the company to fall behind competitors." },
      { text: "Propose a pilot project to test the new technology", score: 30, feedback: "Excellent! Manages risk while exploring innovation." },
      { text: "Push for immediate full migration", score: 15, feedback: "Bold but risky without proper testing." },
      { text: "Wait to see what competitors do first", score: 5, feedback: "Too passive - you might miss the opportunity." },
    ],
    difficulty: "Medium",
  },
  {
    id: 5,
    scenario: "Underperforming Employee",
    context: "A previously high-performing team member has been underperforming for the past two months. You've noticed they seem distracted.",
    question: "How do you address this?",
    options: [
      { text: "Have a private, empathetic conversation to understand the situation", score: 30, feedback: "Perfect approach - shows care while addressing the issue." },
      { text: "Put them on a performance improvement plan immediately", score: 15, feedback: "May be necessary later, but premature without understanding the cause." },
      { text: "Ignore it and hope it improves", score: 5, feedback: "Avoids confrontation but the problem may worsen." },
      { text: "Publicly address their performance in a team meeting", score: 0, feedback: "Never appropriate - damages trust and morale." },
    ],
    difficulty: "Medium",
  },
  {
    id: 6,
    scenario: "Ethical Dilemma",
    context: "You discover that a colleague has been slightly inflating their project hours. They're a single parent struggling financially.",
    question: "What do you do?",
    options: [
      { text: "Report it to HR immediately", score: 20, feedback: "Follows policy but lacks compassion for circumstances." },
      { text: "Talk to them privately first and encourage them to stop", score: 25, feedback: "Balanced approach - gives them a chance to correct course." },
      { text: "Ignore it - it's not your business", score: 5, feedback: "Ignoring ethical issues can enable larger problems." },
      { text: "Help them find legitimate financial resources", score: 30, feedback: "Addresses root cause while maintaining integrity." },
    ],
    difficulty: "Expert",
  },
  {
    id: 7,
    scenario: "Meeting Efficiency",
    context: "Your team spends 15+ hours per week in meetings, leaving little time for actual work. Productivity is suffering.",
    question: "How do you improve this?",
    options: [
      { text: "Cancel all recurring meetings", score: 10, feedback: "Too extreme - some meetings are valuable." },
      { text: "Audit meetings and implement 'no meeting' blocks", score: 30, feedback: "Excellent! Data-driven approach with protected focus time." },
      { text: "Make all meetings optional", score: 15, feedback: "May help but important discussions might be missed." },
      { text: "Shorten all meetings to 15 minutes", score: 20, feedback: "Good idea but may not suit all meeting types." },
    ],
    difficulty: "Easy",
  },
  {
    id: 8,
    scenario: "Knowledge Transfer",
    context: "Your senior developer who holds critical system knowledge is leaving in 2 weeks. Documentation is minimal.",
    question: "What's your priority?",
    options: [
      { text: "Try to convince them to stay longer", score: 10, feedback: "Unlikely to work and delays the real solution." },
      { text: "Pair them with other developers and record knowledge sessions", score: 30, feedback: "Best use of remaining time - captures tacit knowledge." },
      { text: "Ask them to write comprehensive documentation", score: 20, feedback: "Helpful but written docs often miss practical insights." },
      { text: "Plan to reverse-engineer the system after they leave", score: 5, feedback: "Extremely inefficient and risky." },
    ],
    difficulty: "Medium",
  },
];

export default function ProblemSolving() {
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
  const [showFeedback, setShowFeedback] = useState<string | null>(null);

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

  const submitResults = async () => {
    setIsComplete(true);
    try {
      await gameAPI.submit({
        gameType: "problem-solving",
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
