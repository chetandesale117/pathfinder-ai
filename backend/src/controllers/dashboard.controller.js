import User from '../models/User.model.js';
import Game from '../models/Game.model.js';
import { getTopCareers } from '../utils/careerPrediction.utils.js';
import { handleAsync } from '../utils/errorHandler.utils.js';
import { successResponse } from '../utils/response.utils.js';

/**
 * Get dashboard data
 */
export const getDashboard = handleAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  // Get all games for this user
  const games = await Game.find({ userId: req.user._id });
  
  // Calculate skill scores from game history
  const skillScores = {
    logical: 0,
    mathematical: 0,
    pattern: 0,
    problemSolving: 0,
    technical: 0
  };

  const gameTypeMap = {
    'logical-reasoning': 'logical',
    'mathematical-thinking': 'mathematical',
    'pattern-recognition': 'pattern',
    'problem-solving': 'problemSolving',
    'technical-knowledge': 'technical'
  };

  // Calculate average accuracy per game type
  const gameTypeCounts = {};
  games.forEach(game => {
    const skillKey = gameTypeMap[game.gameType];
    if (skillKey) {
      if (!gameTypeCounts[skillKey]) {
        gameTypeCounts[skillKey] = { total: 0, count: 0 };
      }
      gameTypeCounts[skillKey].total += game.accuracy;
      gameTypeCounts[skillKey].count += 1;
    }
  });

  // Calculate averages
  Object.keys(gameTypeCounts).forEach(key => {
    skillScores[key] = Math.round(gameTypeCounts[key].total / gameTypeCounts[key].count);
  });

  // If no games played, set default scores
  Object.keys(skillScores).forEach(key => {
    if (skillScores[key] === 0) {
      skillScores[key] = 50; // Default score
    }
  });

  // Get recommended career
  const topCareers = getTopCareers(skillScores, 1);
  const recommendedCareer = topCareers[0] || {
    title: 'General Professional',
    matchPercentage: 0,
    description: 'Complete more games to get personalized recommendations'
  };

  // Format badges
  const badges = user.badges.map(badge => ({
    id: badge.badgeId,
    name: badge.badgeId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    icon: badge.badgeId.split('-')[0],
    earned: true,
    earnedAt: badge.earnedAt
  }));

  // Get recent games (last 3)
  const recentGames = await Game.find({ userId: req.user._id })
    .sort({ completedAt: -1 })
    .limit(3)
    .select('gameType score completedAt xpEarned');

  // Calculate IQ score (average of all skill scores)
  const iqScore = Math.round(
    Object.values(skillScores).reduce((sum, score) => sum + score, 0) / Object.keys(skillScores).length
  );

  // Calculate career readiness (simplified)
  const careerReadiness = Math.round(
    (iqScore * 0.6) + ((user.totalXP / 5000) * 100 * 0.4)
  );

  // Get leaderboard data (top 5 players)
  const topPlayers = await User.find()
    .sort({ totalXP: -1 })
    .limit(5)
    .select('name totalXP level');

  // Find user rank
  const userRank = await User.countDocuments({ totalXP: { $gt: user.totalXP } }) + 1;

  return successResponse(res, {
    user: {
      level: user.level,
      totalXP: user.totalXP,
      xpToNextLevel: (user.level * 200) - user.totalXP,
      gamesPlayed: games.length,
      streak: user.currentStreak,
      iqScore,
      careerReadiness: Math.min(100, careerReadiness)
    },
    skillScores,
    recommendedCareer: {
      title: recommendedCareer.title,
      matchPercentage: recommendedCareer.matchPercentage,
      description: recommendedCareer.description
    },
    badges,
    recentGames: recentGames.map(g => ({
      gameType: g.gameType,
      score: g.accuracy,
      completedAt: g.completedAt,
      xpEarned: g.xpEarned
    })),
    leaderboard: {
      userRank,
      topPlayers: topPlayers.map((p, index) => ({
        rank: index + 1,
        name: p.name,
        totalXP: p.totalXP,
        avatar: '👤'
      }))
    }
  });
});

