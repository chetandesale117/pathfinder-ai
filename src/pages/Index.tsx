import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { Link } from "react-router-dom";
import {
  Brain,
  Target,
  BarChart3,
  Gamepad2,
  Sparkles,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Zap,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Gamepad2,
    title: "Gamified IQ Games",
    description:
      "Challenge yourself with fun, engaging games that assess your cognitive abilities and unlock your potential.",
  },
  {
    icon: Target,
    title: "Skill Evaluation",
    description:
      "Evaluate your technical and soft skills with our comprehensive quiz to identify areas for growth.",
  },
  {
    icon: Sparkles,
    title: "AI Career Prediction",
    description:
      "Our ML model analyzes your game performance to recommend careers that perfectly match your abilities.",
  },
  {
    icon: BarChart3,
    title: "Progress Dashboard",
    description:
      "Track your game scores, XP, levels, and achievements while monitoring your career development journey.",
  },
  {
    icon: Trophy,
    title: "Achievements & Badges",
    description:
      "Earn badges and unlock achievements as you complete games and climb the leaderboard rankings.",
  },
  {
    icon: Brain,
    title: "Cognitive Insights",
    description:
      "Get detailed insights into your logical reasoning, pattern recognition, and problem-solving abilities.",
  },
];

const benefits = [
  "Play games to discover your ideal career",
  "Earn XP and level up as you progress",
  "ML-powered career predictions based on performance",
  "Unlock achievements and compete on leaderboards",
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Career Guidance
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              Discover Your{" "}
              <span className="text-red-500">Perfect Career</span> Path
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Play engaging IQ games, earn XP, and let our AI match you with careers
              that align with your cognitive strengths and interests.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild variant="hero" size="xl">
                <Link to="/games">
                  <Gamepad2 className="w-5 h-5" />
                  Play Games
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/dashboard">
                  <Zap className="w-5 h-5" />
                  View Dashboard
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex flex-wrap justify-center gap-6"
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{benefit}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Everything You Need to Find Your Path
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines psychological science with AI technology to
              provide you with accurate and personalized career guidance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Discover Your Future?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join thousands of students who have found their perfect career path
              with our AI-powered platform.
            </p>
            <Button asChild variant="glass" size="xl">
              <Link to="/dashboard">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Brain className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">CareerAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CareerAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
