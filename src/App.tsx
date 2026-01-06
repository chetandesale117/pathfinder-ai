import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games"
              element={
                <ProtectedRoute>
                  <Games />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games/logical-reasoning"
              element={
                <ProtectedRoute>
                  <LogicalReasoning />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games/mathematical-thinking"
              element={
                <ProtectedRoute>
                  <MathematicalThinking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games/pattern-recognition"
              element={
                <ProtectedRoute>
                  <PatternRecognition />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games/problem-solving"
              element={
                <ProtectedRoute>
                  <ProblemSolving />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games/technical-knowledge"
              element={
                <ProtectedRoute>
                  <TechnicalKnowledge />
                </ProtectedRoute>
              }
            />
            <Route
              path="/games/career-quest"
              element={
                <ProtectedRoute>
                  <CareerQuest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/game-results"
              element={
                <ProtectedRoute>
                  <GameResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/skill-quiz"
              element={
                <ProtectedRoute>
                  <SkillQuiz />
                </ProtectedRoute>
              }
            />
            <Route
              path="/career-results"
              element={
                <ProtectedRoute>
                  <CareerResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
