import Game from '../models/Game.model.js';
import User from '../models/User.model.js';
import { checkBadges } from '../utils/badges.utils.js';
import { handleAsync } from '../utils/errorHandler.utils.js';
import { successResponse, errorResponse } from '../utils/response.utils.js';

/**
 * Submit game results
 */
export const submitGame = handleAsync(async (req, res) => {
  const {
    gameType,
    score,
    accuracy,
    timeTaken,
    xpEarned,
    difficultyLevel,
    totalQuestions,
    correctAnswers,
    streak = 0,
    avgTimePerQuestion,
    skipsUsed = 0
  } = req.body;

  // Create game record
  const game = new Game({
    userId: req.user._id,
    gameType,
    score,
    accuracy,
    timeTaken,
    xpEarned,
    difficultyLevel,
    totalQuestions,
    correctAnswers,
    streak,
    avgTimePerQuestion,
    skipsUsed
  });

  await game.save();

  // Update user XP and level
  const user = await User.findById(req.user._id);
  user.totalXP += xpEarned;
  
  // Update streak
  if (streak > user.currentStreak) {
    user.currentStreak = streak;
  }
  if (streak > user.longestStreak) {
    user.longestStreak = streak;
  }

  // Check for new badges
  const unlockedBadges = checkBadges(game, user.badges);
  if (unlockedBadges.length > 0) {
    user.badges.push(...unlockedBadges);
  }

  await user.save();

  return successResponse(res, {
    gameId: game._id,
    totalXP: user.totalXP,
    level: user.level,
    badgesUnlocked: unlockedBadges.map(b => b.badgeId)
  }, 'Game results saved successfully');
});

/**
 * Get game history
 */
export const getGameHistory = handleAsync(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const gameType = req.query.gameType;

  // Build query
  const query = { userId: req.user._id };
  if (gameType) {
    query.gameType = gameType;
  }

  // Get games
  const games = await Game.find(query)
    .sort({ completedAt: -1 })
    .limit(limit)
    .skip(offset)
    .select('gameType score accuracy xpEarned completedAt difficultyLevel');

  // Get total count
  const total = await Game.countDocuments(query);

  // Calculate statistics
  const allGames = await Game.find({ userId: req.user._id });
  const totalXP = allGames.reduce((sum, g) => sum + g.xpEarned, 0);
  const totalGamesPlayed = allGames.length;
  const averageAccuracy = allGames.length > 0
    ? allGames.reduce((sum, g) => sum + g.accuracy, 0) / allGames.length
    : 0;
  const totalTimeSpent = allGames.reduce((sum, g) => sum + g.timeTaken, 0);
  
  const user = await User.findById(req.user._id);
  const currentStreak = user.currentStreak || 0;
  const longestStreak = user.longestStreak || 0;

  return successResponse(res, {
    games: games.map(g => ({
      id: g._id,
      gameType: g.gameType,
      score: g.score,
      accuracy: g.accuracy,
      xpEarned: g.xpEarned,
      completedAt: g.completedAt,
      difficultyLevel: g.difficultyLevel
    })),
    statistics: {
      totalXP,
      totalGamesPlayed,
      averageAccuracy: Math.round(averageAccuracy * 100) / 100,
      totalTimeSpent,
      currentStreak,
      longestStreak
    },
    pagination: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total
    }
  });
});

