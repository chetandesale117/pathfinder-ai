import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Lock,
  CheckCircle,
  Play,
  ArrowLeft,
  Star,
  Brain,
  Calculator,
  Shapes,
  Lightbulb,
  Code,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface CareerQuest {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  levels: Level[];
  suitabilityScore: number;
  isUnlocked: boolean;
}

interface Level {
  id: number;
  title: string;
  description: string;
  gameType: string;
  icon: React.ReactNode;
  xpReward: number;
  isCompleted: boolean;
  isLocked: boolean;
  score?: number;
}

const careerQuests: CareerQuest[] = [
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Analyze data, build models, and derive insights to solve complex problems.",
    icon: <Brain className="w-8 h-8" />,
    color: "from-violet-500 to-purple-600",
    suitabilityScore: 85,
    isUnlocked: true,
    levels: [
      { id: 1, title: "Math & Statistics", description: "Master quantitative analysis", gameType: "mathematical-thinking", icon: <Calculator className="w-5 h-5" />, xpReward: 100, isCompleted: true, isLocked: false, score: 92 },
      { id: 2, title: "Pattern Recognition", description: "Identify trends in data", gameType: "pattern-recognition", icon: <Shapes className="w-5 h-5" />, xpReward: 150, isCompleted: true, isLocked: false, score: 88 },
      { id: 3, title: "Problem Solving", description: "Tackle real-world challenges", gameType: "problem-solving", icon: <Lightbulb className="w-5 h-5" />, xpReward: 200, isCompleted: false, isLocked: false },
      { id: 4, title: "Technical Skills", description: "Apply programming concepts", gameType: "technical-knowledge", icon: <Code className="w-5 h-5" />, xpReward: 250, isCompleted: false, isLocked: true },
    ],
  },
  {
    id: "software-engineer",
    title: "Software Engineer",
    description: "Design, develop, and maintain software systems and applications.",
    icon: <Code className="w-8 h-8" />,
    color: "from-cyan-500 to-blue-600",
    suitabilityScore: 78,
    isUnlocked: true,
    levels: [
      { id: 1, title: "Logical Thinking", description: "Build algorithmic mindset", gameType: "logical-reasoning", icon: <Brain className="w-5 h-5" />, xpReward: 100, isCompleted: true, isLocked: false, score: 85 },
      { id: 2, title: "Problem Decomposition", description: "Break down complex issues", gameType: "problem-solving", icon: <Lightbulb className="w-5 h-5" />, xpReward: 150, isCompleted: false, isLocked: false },
      { id: 3, title: "Technical Mastery", description: "Core programming skills", gameType: "technical-knowledge", icon: <Code className="w-5 h-5" />, xpReward: 200, isCompleted: false, isLocked: true },
      { id: 4, title: "System Design", description: "Architecture patterns", gameType: "pattern-recognition", icon: <Shapes className="w-5 h-5" />, xpReward: 250, isCompleted: false, isLocked: true },
    ],
  },
  {
    id: "product-manager",
    title: "Product Manager",
    description: "Lead product strategy, prioritize features, and drive business outcomes.",
    icon: <Lightbulb className="w-8 h-8" />,
    color: "from-amber-500 to-orange-600",
    suitabilityScore: 72,
    isUnlocked: false,
    levels: [
      { id: 1, title: "Strategic Thinking", description: "Business decision making", gameType: "problem-solving", icon: <Lightbulb className="w-5 h-5" />, xpReward: 100, isCompleted: false, isLocked: true },
      { id: 2, title: "Data Analysis", description: "Metrics interpretation", gameType: "mathematical-thinking", icon: <Calculator className="w-5 h-5" />, xpReward: 150, isCompleted: false, isLocked: true },
      { id: 3, title: "Pattern Insights", description: "Market trend analysis", gameType: "pattern-recognition", icon: <Shapes className="w-5 h-5" />, xpReward: 200, isCompleted: false, isLocked: true },
      { id: 4, title: "Technical Literacy", description: "Understand engineering", gameType: "technical-knowledge", icon: <Code className="w-5 h-5" />, xpReward: 250, isCompleted: false, isLocked: true },
    ],
  },
];

export default function CareerQuest() {
  const navigate = useNavigate();
  const [selectedQuest, setSelectedQuest] = useState<CareerQuest | null>(null);

  const handleLevelClick = (level: Level) => {
    if (!level.isLocked && !level.isCompleted) {
      navigate(`/games/${level.gameType}`);
    }
  };

  const getQuestProgress = (quest: CareerQuest) => {
    const completed = quest.levels.filter((l) => l.isCompleted).length;
    return (completed / quest.levels.length) * 100;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <Button variant="ghost" onClick={() => navigate("/games")} className="mb-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Games
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Career Quest Mode
              </h1>
              <p className="text-muted-foreground mt-1">
                Explore career paths through skill-based challenges
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-foreground">3 Careers Unlocked</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Quest Cards */}
            <div className="lg:col-span-2 space-y-4">
              {careerQuests.map((quest, index) => (
                <motion.div
                  key={quest.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => quest.isUnlocked && setSelectedQuest(quest)}
                  className={`relative bg-card rounded-2xl border overflow-hidden cursor-pointer transition-all ${
                    quest.isUnlocked
                      ? selectedQuest?.id === quest.id
                        ? "border-primary shadow-glow"
                        : "border-border/50 hover:border-primary/50"
                      : "border-border/30 opacity-60 cursor-not-allowed"
                  }`}
                >
                  {!quest.isUnlocked && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex items-center justify-center">
                      <div className="text-center">
                        <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Complete more games to unlock</p>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${quest.color} text-white`}>
                        {quest.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-foreground">{quest.title}</h3>
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                            {quest.suitabilityScore}% Match
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">{quest.description}</p>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>Progress</span>
                              <span>{Math.round(getQuestProgress(quest))}%</span>
                            </div>
                            <Progress value={getQuestProgress(quest)} className="h-2" />
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span className="text-muted-foreground">
                              {quest.levels.filter((l) => l.isCompleted).length}/{quest.levels.length}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Level Details Panel */}
            <div className="lg:col-span-1">
              <AnimatePresence mode="wait">
                {selectedQuest ? (
                  <motion.div
                    key={selectedQuest.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-card rounded-2xl border border-border/50 p-6 sticky top-24"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${selectedQuest.color} text-white`}>
                        {selectedQuest.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{selectedQuest.title}</h3>
                        <p className="text-sm text-muted-foreground">Quest Levels</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {selectedQuest.levels.map((level, idx) => (
                        <motion.div
                          key={level.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          onClick={() => handleLevelClick(level)}
                          className={`relative p-4 rounded-xl border-2 transition-all ${
                            level.isLocked
                              ? "border-border/30 bg-muted/30 opacity-60 cursor-not-allowed"
                              : level.isCompleted
                              ? "border-emerald-500/50 bg-emerald-500/10 cursor-default"
                              : "border-border/50 hover:border-primary/50 cursor-pointer"
                          }`}
                        >
                          {level.isLocked && (
                            <Lock className="absolute top-4 right-4 w-4 h-4 text-muted-foreground" />
                          )}
                          {level.isCompleted && (
                            <CheckCircle className="absolute top-4 right-4 w-5 h-5 text-emerald-400" />
                          )}

                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${
                              level.isCompleted ? "bg-emerald-500/20" : "bg-muted"
                            }`}>
                              {level.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">Level {level.id}</span>
                                {level.score && (
                                  <Badge variant="secondary" className="text-xs">
                                    {level.score}%
                                  </Badge>
                                )}
                              </div>
                              <h4 className="font-semibold text-foreground">{level.title}</h4>
                              <p className="text-xs text-muted-foreground">{level.description}</p>
                              <div className="flex items-center gap-1 mt-2">
                                <Star className="w-3 h-3 text-amber-400" />
                                <span className="text-xs text-muted-foreground">{level.xpReward} XP</span>
                              </div>
                            </div>
                          </div>

                          {!level.isLocked && !level.isCompleted && (
                            <Button variant="hero" size="sm" className="w-full mt-3">
                              <Play className="w-4 h-4 mr-2" />
                              Start Level
                            </Button>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Suitability Score */}
                    <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">Career Suitability</span>
                      </div>
                      <div className="text-3xl font-bold text-primary mb-1">
                        {selectedQuest.suitabilityScore}%
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Based on your game performance and skill profile
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-card rounded-2xl border border-dashed border-border/50 p-8 text-center"
                  >
                    <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">Select a Career Quest</h3>
                    <p className="text-sm text-muted-foreground">
                      Click on a career to view its skill levels and challenges
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
