import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import {
  Brain,
  Trophy,
  Target,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Download,
  Share2,
  Sparkles,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const skillsData = [
  { skill: "Logical", score: 85, fullMark: 100 },
  { skill: "Mathematical", score: 78, fullMark: 100 },
  { skill: "Pattern", score: 92, fullMark: 100 },
  { skill: "Problem Solving", score: 70, fullMark: 100 },
  { skill: "Technical", score: 88, fullMark: 100 },
];

const gameScores = [
  { name: "Logical", score: 85, color: "#8b5cf6" },
  { name: "Math", score: 78, color: "#10b981" },
  { name: "Pattern", score: 92, color: "#f59e0b" },
  { name: "Problem", score: 70, color: "#ef4444" },
  { name: "Technical", score: 88, color: "#06b6d4" },
];

const strengths = [
  { skill: "Pattern Recognition", score: 92, description: "Excellent visual and abstract thinking" },
  { skill: "Technical Knowledge", score: 88, description: "Strong understanding of tech concepts" },
  { skill: "Logical Reasoning", score: 85, description: "Good analytical capabilities" },
];

const weaknesses = [
  { skill: "Problem Solving", score: 70, description: "Room for improvement in complex scenarios" },
  { skill: "Mathematical Thinking", score: 78, description: "Consider practicing quantitative skills" },
];

export default function GameResults() {
  const navigate = useNavigate();
  
  // Calculate overall IQ score (weighted average)
  const overallScore = Math.round(
    skillsData.reduce((acc, s) => acc + s.score, 0) / skillsData.length
  );

  const getIQRange = (score: number) => {
    if (score >= 90) return { label: "Superior", color: "text-emerald-400" };
    if (score >= 80) return { label: "Above Average", color: "text-primary" };
    if (score >= 70) return { label: "Average", color: "text-amber-400" };
    return { label: "Below Average", color: "text-rose-400" };
  };

  const iqRange = getIQRange(overallScore);

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Badge variant="secondary" className="mb-4">
              <Trophy className="w-4 h-4 mr-2" />
              Assessment Complete
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Your IQ & Knowledge Results
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Based on your performance across all cognitive games
            </p>
          </motion.div>

          {/* Overall Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-primary/20 via-card to-accent/20 rounded-3xl border border-primary/30 p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  Overall Cognitive Score
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl md:text-7xl font-bold text-foreground">{overallScore}</span>
                  <span className="text-2xl text-muted-foreground">/100</span>
                </div>
                <Badge variant="outline" className={`mt-3 ${iqRange.color} border-current`}>
                  <Brain className="w-4 h-4 mr-2" />
                  {iqRange.label} Performance
                </Badge>
              </div>

              <div className="flex-1 max-w-xs">
                <div className="space-y-3">
                  {skillsData.map((skill, idx) => (
                    <div key={skill.skill}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{skill.skill}</span>
                        <span className="font-medium text-foreground">{skill.score}%</span>
                      </div>
                      <Progress value={skill.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3">
                  <div className="w-28 h-28 rounded-full bg-card flex flex-col items-center justify-center">
                    <Target className="w-6 h-6 text-primary mb-1" />
                    <span className="text-sm text-muted-foreground">Readiness</span>
                    <span className="text-2xl font-bold text-foreground">82%</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Career Readiness</p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Skills Radar Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl border border-border/50 p-6"
            >
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Skill Profile
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Game Scores Bar Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl border border-border/50 p-6"
            >
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Game Performance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gameScores} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis dataKey="name" type="category" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} width={70} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                    {gameScores.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl border border-border/50 p-6"
            >
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Your Strengths
              </h3>
              <div className="space-y-4">
                {strengths.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{item.skill}</span>
                        <Badge variant="secondary" className="text-xs">{item.score}%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Areas for Improvement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-2xl border border-border/50 p-6"
            >
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-amber-400" />
                Areas for Growth
              </h3>
              <div className="space-y-4">
                {weaknesses.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{item.skill}</span>
                        <Badge variant="secondary" className="text-xs">{item.score}%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-primary/20 via-card to-accent/20 rounded-2xl border border-primary/30 p-8 text-center"
          >
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Ready for Your Career Prediction?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Use your assessment results to get AI-powered career recommendations
              tailored to your unique cognitive profile.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="hero" size="lg" onClick={() => navigate("/career-results")}>
                Get Career Prediction
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                <Download className="w-5 h-5 mr-2" />
                Download Report
              </Button>
              <Button variant="ghost" size="lg">
                <Share2 className="w-5 h-5 mr-2" />
                Share Results
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
