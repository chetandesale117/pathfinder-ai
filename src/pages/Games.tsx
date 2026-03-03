import { useMemo } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Shapes,
  Calculator,
  Lightbulb,
  Code,
  Trophy,
  Clock,
  Zap,
  Star,
  Lock,
  CheckCircle,
  Play,
} from "lucide-react";
import { getLocalGames, GameMeta } from "@/lib/gamesData";
import { useAuth } from "@/contexts/AuthContext";

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  skill: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  estimatedTime: string;
  icon: React.ReactNode;
  progress: number;
  isCompleted: boolean;
  isLocked: boolean;
  xpReward: number;
}

const difficultyColors = {
  Easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Hard: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Expert: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

const gameIcons: Record<string, React.ReactNode> = {
  "logical-reasoning": <Brain className="w-6 h-6 text-primary" />,
  "pattern-recognition": <Shapes className="w-6 h-6 text-accent" />,
  "mathematical-thinking": <Calculator className="w-6 h-6 text-emerald-400" />,
  "problem-solving": <Lightbulb className="w-6 h-6 text-amber-400" />,
  "technical-knowledge": <Code className="w-6 h-6 text-cyan-400" />,
  "career-quest": <Trophy className="w-6 h-6 text-rose-400" />,
};

const GameCard = ({
  id,
  title,
  description,
  skill,
  difficulty,
  estimatedTime,
  icon,
  progress,
  isCompleted,
  isLocked,
  xpReward,
}: GameCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-card rounded-2xl border overflow-hidden group ${
        isLocked
          ? "border-border/30 opacity-60"
          : isCompleted
          ? "border-primary/50 shadow-glow"
          : "border-border/50 hover:border-primary/30"
      }`}
    >
      {!isLocked && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}

      {isCompleted && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-primary rounded-full p-1.5">
            <CheckCircle className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      )}

      {isLocked && (
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center">
            <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Complete previous games
            </p>
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${
              isCompleted
                ? "from-primary/20 to-primary/10"
                : "from-muted to-muted/50"
            }`}
          >
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-xs">
            <Zap className="w-3 h-3 mr-1" />
            {skill}
          </Badge>
          <Badge
            variant="outline"
            className={`text-xs ${difficultyColors[difficulty]}`}
          >
            {difficulty}
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400" />
            <span>{xpReward} XP</span>
          </div>
        </div>

        {progress > 0 && !isCompleted && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <Button
          variant={isCompleted ? "outline" : "hero"}
          className="w-full"
          disabled={isLocked}
          onClick={() => navigate(`/games/${id}`)}
        >
          {isCompleted ? (
            <>
              <Trophy className="w-4 h-4 mr-2" />
              Play Again
            </>
          ) : progress > 0 ? (
            <>
              <Play className="w-4 h-4 mr-2" />
              Continue
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start Game
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

const CORE_GAMES = [
  "logical-reasoning",
  "pattern-recognition",
  "mathematical-thinking",
  "problem-solving",
  "technical-knowledge",
];

export default function Games() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const playedGameIds = useMemo(() => {
    if (!user) return new Set<string>();
    try {
      const all = JSON.parse(
        localStorage.getItem("careerai_game_history") || "{}"
      );
      const history: { gameType: string }[] = all[user.id] || [];
      return new Set(history.map((h) => h.gameType));
    } catch {
      return new Set<string>();
    }
  }, [user]);

  const allCoreCompleted = useMemo(
    () => CORE_GAMES.every((id) => playedGameIds.has(id)),
    [playedGameIds]
  );

  const games = useMemo(
    () =>
      getLocalGames().map((g) => ({
        ...g,
        progress: 0,
        isCompleted: playedGameIds.has(g.id),
        isLocked: g.id === "career-quest" ? !allCoreCompleted : false,
      })),
    [playedGameIds, allCoreCompleted]
  );

  const xpToNextLevel = (user?.level ?? 1) * 500;
  const xpProgress = Math.min(((user?.totalXP ?? 0) / xpToNextLevel) * 100, 100);
  const gamesCompleted = games.filter((g) => g.isCompleted && g.id !== "career-quest").length;

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8 md:py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              IQ & Knowledge Games
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Challenge yourself with engaging games designed to assess your
              cognitive abilities and help discover your ideal career path.
            </p>
          </motion.div>

          {/* XP CARD */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 mb-8 shadow-soft">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {user?.level ?? 1}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Level</p>
                  <p className="font-bold text-foreground">Explorer</p>
                </div>
              </div>

              <div className="flex-1 w-full md:w-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    Experience Points
                  </span>
                  <span className="text-foreground font-medium">
                    {user?.totalXP ?? 0} / {xpToNextLevel} XP
                  </span>
                </div>
                <Progress value={xpProgress} className="h-3" />
              </div>

              <div className="text-center md:text-right">
                <p className="text-sm text-muted-foreground">Games Completed</p>
                <p className="text-2xl font-bold text-foreground">
                  {gamesCompleted}
                  <span className="text-muted-foreground text-lg">
                    /{CORE_GAMES.length}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* GAME GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard
                key={game.id}
                {...game}
                icon={gameIcons[game.id] ?? <Trophy className="w-6 h-6 text-rose-400" />}
              />
            ))}
          </div>

          {/* CAREER QUEST SECTION */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 border border-border/50">
              <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">
                {allCoreCompleted
                  ? "Career Quest Unlocked! 🎉"
                  : "Complete All Games to Unlock Career Quest"}
              </h2>
              <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
                {allCoreCompleted
                  ? "All games completed! Start Career Quest to get personalized AI-powered career recommendations."
                  : "Finish all assessment games to unlock Career Quest Mode and receive personalized AI-powered career recommendations."}
              </p>
              <Button
                variant={allCoreCompleted ? "hero" : "outline"}
                onClick={() =>
                  allCoreCompleted
                    ? navigate("/games/career-quest")
                    : navigate("/career-results")
                }
              >
                {allCoreCompleted ? (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Career Quest
                  </>
                ) : (
                  "View Your Progress"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
