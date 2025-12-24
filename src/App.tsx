import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import LogicalReasoning from "./pages/games/LogicalReasoning";
import MathematicalThinking from "./pages/games/MathematicalThinking";
import PatternRecognition from "./pages/games/PatternRecognition";
import ProblemSolving from "./pages/games/ProblemSolving";
import TechnicalKnowledge from "./pages/games/TechnicalKnowledge";
import CareerQuest from "./pages/games/CareerQuest";
import GameResults from "./pages/GameResults";
import SkillQuiz from "./pages/SkillQuiz";
import CareerResults from "./pages/CareerResults";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/logical-reasoning" element={<LogicalReasoning />} />
          <Route path="/games/mathematical-thinking" element={<MathematicalThinking />} />
          <Route path="/games/pattern-recognition" element={<PatternRecognition />} />
          <Route path="/games/problem-solving" element={<ProblemSolving />} />
          <Route path="/games/technical-knowledge" element={<TechnicalKnowledge />} />
          <Route path="/games/career-quest" element={<CareerQuest />} />
          <Route path="/game-results" element={<GameResults />} />
          <Route path="/skill-quiz" element={<SkillQuiz />} />
          <Route path="/career-results" element={<CareerResults />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
