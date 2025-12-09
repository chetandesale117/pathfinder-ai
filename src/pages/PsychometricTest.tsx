import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const psychometricQuestions = [
  {
    id: 1,
    question: "When faced with a problem, how do you usually approach it?",
    options: [
      { id: "a", text: "I analyze all the data before making a decision" },
      { id: "b", text: "I trust my intuition and go with my gut feeling" },
      { id: "c", text: "I consult with others and seek different perspectives" },
      { id: "d", text: "I take immediate action and adjust as I go" },
    ],
  },
  {
    id: 2,
    question: "In a team setting, what role do you naturally gravitate towards?",
    options: [
      { id: "a", text: "The leader who organizes and delegates tasks" },
      { id: "b", text: "The creative who comes up with innovative ideas" },
      { id: "c", text: "The mediator who ensures everyone works well together" },
      { id: "d", text: "The executor who focuses on getting things done" },
    ],
  },
  {
    id: 3,
    question: "How do you prefer to learn new skills?",
    options: [
      { id: "a", text: "Reading books and documentation" },
      { id: "b", text: "Watching tutorials and demonstrations" },
      { id: "c", text: "Hands-on practice and experimentation" },
      { id: "d", text: "Learning from a mentor or instructor" },
    ],
  },
  {
    id: 4,
    question: "What type of work environment helps you thrive?",
    options: [
      { id: "a", text: "Quiet, focused individual work" },
      { id: "b", text: "Dynamic, fast-paced collaborative spaces" },
      { id: "c", text: "Flexible mix of both remote and office work" },
      { id: "d", text: "Structured environment with clear guidelines" },
    ],
  },
  {
    id: 5,
    question: "When working on a long-term project, what keeps you motivated?",
    options: [
      { id: "a", text: "Clear milestones and measurable progress" },
      { id: "b", text: "The impact and meaning of the final outcome" },
      { id: "c", text: "Recognition and appreciation from others" },
      { id: "d", text: "Learning new things along the way" },
    ],
  },
  {
    id: 6,
    question: "How do you handle stress and pressure at work?",
    options: [
      { id: "a", text: "I stay calm and break problems into smaller parts" },
      { id: "b", text: "I seek support from colleagues or friends" },
      { id: "c", text: "I push through with determination" },
      { id: "d", text: "I take breaks to recharge and refocus" },
    ],
  },
  {
    id: 7,
    question: "What aspect of a job is most important to you?",
    options: [
      { id: "a", text: "Financial stability and career growth" },
      { id: "b", text: "Work-life balance and flexibility" },
      { id: "c", text: "Purpose and positive impact on society" },
      { id: "d", text: "Continuous learning and challenges" },
    ],
  },
  {
    id: 8,
    question: "How would your friends describe your communication style?",
    options: [
      { id: "a", text: "Direct and to the point" },
      { id: "b", text: "Thoughtful and empathetic" },
      { id: "c", text: "Enthusiastic and expressive" },
      { id: "d", text: "Analytical and detailed" },
    ],
  },
];

export default function PsychometricTest() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [psychometricQuestions[currentQuestion].id]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < psychometricQuestions.length - 1) {
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
      title: "Assessment Complete!",
      description: "Your psychometric test has been submitted successfully.",
    });
    
    navigate("/career-results");
  };

  const currentQ = psychometricQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === psychometricQuestions.length - 1;
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
              Psychometric Assessment
            </h1>
            <p className="text-muted-foreground">
              Answer honestly to get the most accurate career recommendations.
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
              total={psychometricQuestions.length}
            />

            <QuizQuestion
              question={currentQ.question}
              options={currentQ.options}
              selectedOption={answers[currentQ.id] || null}
              onSelect={handleSelect}
              questionNumber={currentQuestion + 1}
              totalQuestions={psychometricQuestions.length}
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
                  disabled={answeredCount < psychometricQuestions.length || isSubmitting}
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
