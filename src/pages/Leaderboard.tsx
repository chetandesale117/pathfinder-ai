import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { leaderboardAPI } from "@/lib/api";
import { Crown, Trophy, Medal, Star, TrendingUp } from "lucide-react";
import { useState } from "react";

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Trophy className="w-6 h-6 text-amber-400" />;
  if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
  if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
  return <Star className="w-5 h-5 text-muted-foreground" />;
};

const getRankColor = (rank: number) => {
  if (rank === 1) return "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-500/30";
  if (rank === 2) return "bg-gradient-to-r from-gray-400/20 to-slate-400/20 border-gray-400/30";
  if (rank === 3) return "bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/30";
  return "bg-card border-border/50";
};

export default function Leaderboard() {
  const [type, setType] = useState<"global" | "weekly" | "monthly">("global");
  const { data, isLoading, error } = useQuery({
    queryKey: ["leaderboard", type],
    queryFn: () => leaderboardAPI.get(type, 50, 0),
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-background py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading leaderboard...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-background py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-destructive">Failed to load leaderboard</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const leaderboard = data?.leaderboard || [];
  const userRank = data?.userRank;

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Crown className="w-4 h-4" />
              Global Rankings
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Leaderboard
            </h1>
            <p className="text-muted-foreground">
              Compete with players worldwide and climb the ranks
            </p>
          </motion.div>

          {/* Time Period Tabs */}
          <Tabs value={type} onValueChange={(v) => setType(v as "global" | "weekly" | "monthly")} className="mb-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="global">All Time</TabsTrigger>
              <TabsTrigger value="weekly">This Week</TabsTrigger>
              <TabsTrigger value="monthly">This Month</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* User Rank Card */}
          {userRank && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Card className="bg-gradient-to-r from-primary/20 via-card to-accent/20 border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">{userRank.rank}</span>
                      </div>
                      <div>
                        <p className="font-bold text-foreground">Your Rank</p>
                        <p className="text-sm text-muted-foreground">Level {userRank.level} • {userRank.totalXP.toLocaleString()} XP</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-lg px-4 py-2">
                      #{userRank.rank}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Leaderboard List */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Top Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No players yet. Be the first!</p>
                  </div>
                ) : (
                  leaderboard.map((player, index) => (
                    <motion.div
                      key={player.userId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-xl border-2 transition-all ${getRankColor(player.rank)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 flex items-center justify-center">
                              {getRankIcon(player.rank)}
                            </div>
                            <div className="text-2xl font-bold text-muted-foreground min-w-[3rem]">
                              #{player.rank}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                              {player.avatar || "👤"}
                            </div>
                            <div>
                              <p className="font-bold text-foreground">{player.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Level {player.level} • {player.totalXP.toLocaleString()} XP
                              </p>
                            </div>
                          </div>
                        </div>
                        {player.badges && player.badges.length > 0 && (
                          <div className="flex gap-1">
                            {player.badges.slice(0, 3).map((badge, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          {data?.pagination && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center text-sm text-muted-foreground"
            >
              Showing top {leaderboard.length} of {data.pagination.total} players
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}

