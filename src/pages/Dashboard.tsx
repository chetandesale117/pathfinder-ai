import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/cards/StatCard";
import { ProgressCard } from "@/components/cards/ProgressCard";
import { SkillsRadar } from "@/components/charts/SkillsRadar";
import { CareerMatch } from "@/components/charts/CareerMatch";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Target,
  Award,
  TrendingUp,
  ClipboardList,
  Lightbulb,
  Download,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { icon: ClipboardList, label: "Tests Completed", value: "2/4", trend: "50%", trendUp: true },
  { icon: Brain, label: "Personality Score", value: 78, trend: "+12", trendUp: true },
  { icon: Target, label: "Skill Level", value: "Advanced", trend: "Level 3", trendUp: true },
  { icon: Award, label: "Career Matches", value: 12, trend: "New", trendUp: true },
];

const assessments = [
  {
    icon: Brain,
    title: "Psychometric Test",
    description: "Discover your personality traits and work preferences",
    progress: 100,
    link: "/psychometric-test",
    status: "completed" as const,
  },
  {
    icon: Lightbulb,
    title: "Skill Assessment",
    description: "Evaluate your technical and soft skills",
    progress: 60,
    link: "/skill-quiz",
    status: "in-progress" as const,
  },
  {
    icon: Target,
    title: "Interest Inventory",
    description: "Identify your career interests and passions",
    progress: 0,
    link: "/skill-quiz",
    status: "not-started" as const,
  },
  {
    icon: TrendingUp,
    title: "Career Readiness",
    description: "Assess your readiness for the job market",
    progress: 0,
    link: "/skill-quiz",
    status: "not-started" as const,
  },
];

const skillsData = [
  { skill: "Problem Solving", score: 85, fullMark: 100 },
  { skill: "Communication", score: 78, fullMark: 100 },
  { skill: "Leadership", score: 65, fullMark: 100 },
  { skill: "Technical Skills", score: 90, fullMark: 100 },
  { skill: "Creativity", score: 72, fullMark: 100 },
  { skill: "Teamwork", score: 88, fullMark: 100 },
];

const topCareers = [
  {
    title: "Software Engineer",
    matchPercentage: 92,
    salary: "$95k - $150k",
    growth: "+25%",
    description: "Build innovative software solutions",
  },
  {
    title: "Data Scientist",
    matchPercentage: 87,
    salary: "$90k - $140k",
    growth: "+31%",
    description: "Analyze data to drive business decisions",
  },
  {
    title: "Product Manager",
    matchPercentage: 84,
    salary: "$100k - $160k",
    growth: "+22%",
    description: "Lead product development and strategy",
  },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, Alex! 👋
            </h1>
            <p className="text-muted-foreground">
              Track your progress and discover new career opportunities.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} {...stat} index={index} />
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Assessments */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Your Assessments
                </h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/psychometric-test">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {assessments.map((assessment) => (
                  <ProgressCard key={assessment.title} {...assessment} />
                ))}
              </div>

              {/* Skills Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-xl p-6 shadow-soft border border-border/50"
              >
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Your Skills Profile
                </h3>
                <SkillsRadar data={skillsData} />
              </motion.div>
            </div>

            {/* Right Column - Career Matches */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  Top Career Matches
                </h2>
              </div>

              <CareerMatch careers={topCareers} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-card rounded-xl p-6 shadow-soft border border-border/50"
              >
                <h3 className="text-lg font-semibold text-card-foreground mb-3">
                  Download Report
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get your complete career analysis with personalized
                  recommendations.
                </p>
                <Button variant="hero" className="w-full" asChild>
                  <Link to="/career-results">
                    <Download className="w-4 h-4 mr-2" />
                    Generate PDF Report
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
