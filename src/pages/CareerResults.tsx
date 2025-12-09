import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SkillsRadar } from "@/components/charts/SkillsRadar";
import { CareerMatch } from "@/components/charts/CareerMatch";
import {
  Download,
  Share2,
  Briefcase,
  GraduationCap,
  Target,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { toast } from "@/hooks/use-toast";

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
  {
    title: "UX Designer",
    matchPercentage: 79,
    salary: "$75k - $120k",
    growth: "+18%",
    description: "Create user-centered digital experiences",
  },
  {
    title: "Cloud Architect",
    matchPercentage: 76,
    salary: "$110k - $180k",
    growth: "+28%",
    description: "Design scalable cloud infrastructure",
  },
];

const personalityTraits = [
  { trait: "Analytical Thinker", score: 85 },
  { trait: "Detail-Oriented", score: 78 },
  { trait: "Team Player", score: 88 },
  { trait: "Self-Motivated", score: 82 },
  { trait: "Adaptable", score: 75 },
];

const recommendations = [
  {
    icon: GraduationCap,
    title: "Recommended Courses",
    items: [
      "Advanced Data Structures",
      "Machine Learning Fundamentals",
      "Product Management Certification",
    ],
  },
  {
    icon: Target,
    title: "Skills to Develop",
    items: ["Public Speaking", "Strategic Planning", "Team Leadership"],
  },
  {
    icon: TrendingUp,
    title: "Next Steps",
    items: [
      "Build portfolio projects",
      "Network with industry professionals",
      "Apply for internships",
    ],
  },
];

export default function CareerResults() {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(24);
    doc.setTextColor(38, 125, 117);
    doc.text("Career Assessment Report", 20, 30);
    
    // Add date
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 40);
    
    // Add personality section
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Personality Profile", 20, 60);
    
    doc.setFontSize(11);
    personalityTraits.forEach((trait, index) => {
      doc.text(`${trait.trait}: ${trait.score}%`, 25, 75 + index * 10);
    });
    
    // Add career matches
    doc.setFontSize(16);
    doc.text("Top Career Matches", 20, 135);
    
    doc.setFontSize(11);
    topCareers.slice(0, 5).forEach((career, index) => {
      doc.text(
        `${index + 1}. ${career.title} - ${career.matchPercentage}% Match`,
        25,
        150 + index * 10
      );
    });
    
    // Add skills section
    doc.setFontSize(16);
    doc.text("Skills Assessment", 20, 210);
    
    doc.setFontSize(11);
    skillsData.forEach((skill, index) => {
      doc.text(`${skill.skill}: ${skill.score}/100`, 25, 225 + index * 10);
    });
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text("CareerAI - Your AI-Powered Career Guide", 20, 285);
    
    doc.save("career-report.pdf");
    
    toast({
      title: "Report Downloaded!",
      description: "Your career report has been saved as PDF.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Share this link with others to show your results.",
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Assessment Complete
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Your Career Analysis Report
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Based on your psychometric assessment and skill evaluation, here are
              your personalized career recommendations.
            </p>
            <div className="flex justify-center gap-3 mt-6">
              <Button variant="hero" onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Career Matches */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-soft border border-border/50"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-card-foreground">
                      Top Career Matches
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Based on your profile analysis
                    </p>
                  </div>
                </div>
                <CareerMatch careers={topCareers} />
              </motion.div>

              {/* Skills Radar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-2xl p-6 shadow-soft border border-border/50"
              >
                <h2 className="text-xl font-semibold text-card-foreground mb-6">
                  Skills Profile Overview
                </h2>
                <SkillsRadar data={skillsData} />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Personality Traits */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-2xl p-6 shadow-soft border border-border/50"
              >
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Personality Profile
                </h3>
                <div className="space-y-4">
                  {personalityTraits.map((item) => (
                    <div key={item.trait}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{item.trait}</span>
                        <span className="font-medium text-card-foreground">
                          {item.score}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.score}%` }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                          className="h-full gradient-primary rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recommendations */}
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-card rounded-2xl p-6 shadow-soft border border-border/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <rec.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground">
                      {rec.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {rec.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
