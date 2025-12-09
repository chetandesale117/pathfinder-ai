import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const skillQuestions = [
  {
    id: 1,
    question: "How would you rate your proficiency in data analysis and interpretation?",
    options: [
      { id: "a", text: "Expert - I can perform complex statistical analysis" },
      { id: "b", text: "Intermediate - I can work with spreadsheets and basic analysis" },
      { id: "c", text: "Beginner - I understand basic concepts" },
      { id: "d", text: "No experience" },
    ],
  },
  {
    id: 2,
    question: "Which programming languages or tools are you comfortable with?",
    options: [
      { id: "a", text: "Multiple languages (Python, JavaScript, Java, etc.)" },
      { id: "b", text: "One or two languages proficiently" },
      { id: "c", text: "Basic understanding of programming concepts" },
      { id: "d", text: "No programming experience" },
    ],
  },
  {
    id: 3,
    question: "How do you rate your written communication skills?",
    options: [
      { id: "a", text: "Excellent - I can write professional reports and proposals" },
      { id: "b", text: "Good - I can write clear emails and documents" },
      { id: "c", text: "Average - I can communicate basic ideas" },
      { id: "d", text: "Needs improvement" },
    ],
  },
  {
    id: 4,
    question: "What is your experience with project management?",
    options: [
      { id: "a", text: "Led multiple complex projects successfully" },
      { id: "b", text: "Managed small to medium projects" },
      { id: "c", text: "Participated as a team member in projects" },
      { id: "d", text: "No formal project management experience" },
    ],
  },
  {
    id: 5,
    question: "How comfortable are you with public speaking and presentations?",
    options: [
      { id: "a", text: "Very comfortable - I enjoy presenting to large audiences" },
      { id: "b", text: "Comfortable with smaller groups" },
      { id: "c", text: "Can do it but prefer to avoid it" },
      { id: "d", text: "Very uncomfortable with public speaking" },
    ],
  },
  {
    id: 6,
    question: "What is your experience with design tools and creative software?",
    options: [
      { id: "a", text: "Professional experience with Adobe Suite or similar" },
      { id: "b", text: "Comfortable with tools like Canva or Figma" },
      { id: "c", text: "Basic editing and design skills" },
      { id: "d", text: "No design experience" },
    ],
  },
  {
    id: 7,
    question: "How would you describe your problem-solving abilities?",
    options: [
      { id: "a", text: "Strong - I excel at complex problem-solving" },
      { id: "b", text: "Good - I can solve most problems with effort" },
      { id: "c", text: "Average - I can handle straightforward problems" },
      { id: "d", text: "Prefer guided solutions" },
    ],
  },
  {
    id: 8,
    question: "What is your experience with customer service or client relations?",
    options: [
      { id: "a", text: "Extensive experience managing client relationships" },
      { id: "b", text: "Regular customer interaction experience" },
      { id: "c", text: "Some experience with customer service" },
      { id: "d", text: "No customer-facing experience" },
    ],
  },
];

export default function SkillQuiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [skillQuestions[currentQuestion].id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < skillQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Skills Assessment Complete!",
      description: "Your skill evaluation has been submitted successfully.",
    });
    
    navigate("/career-results");
  };

  const currentQ = skillQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === skillQuestions.length - 1;
  const hasAnswer = answers[currentQ.id];
  const answeredCount = Object.keys(answers).length;

  return (
    <Layout>
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Skills Assessment
            </h1>
            <p className="text-muted-foreground">
              Help us understand your current skill levels and expertise.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border/50"
          >
            <QuizProgress
              current={answeredCount}
              total={skillQuestions.length}
            />

            <QuizQuestion
              question={currentQ.question}
              options={currentQ.options}
              selectedOption={answers[currentQ.id] || null}
              onSelect={handleSelect}
              questionNumber={currentQuestion + 1}
              totalQuestions={skillQuestions.length}
            />

            <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {isLastQuestion ? (
                <Button
                  variant="hero"
                  onClick={handleSubmit}
                  disabled={answeredCount < skillQuestions.length || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-pulse">Submitting...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Assessment
                    </>
                  )}
                </Button>
              ) : (
                <Button variant="hero" onClick={handleNext} disabled={!hasAnswer}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
