import User from '../models/User.model.js';
import { handleAsync } from '../utils/errorHandler.utils.js';
import { successResponse } from '../utils/response.utils.js';

/**
 * Get leaderboard
 */
export const getLeaderboard = handleAsync(async (req, res) => {
  const type = req.query.type || 'global';
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  // Calculate date filter based on type
  let dateFilter = {};
  if (type === 'weekly') {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    dateFilter.createdAt = { $gte: weekAgo };
  } else if (type === 'monthly') {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    dateFilter.createdAt = { $gte: monthAgo };
  }

  // Get users sorted by totalXP
  const users = await User.find(dateFilter)
    .sort({ totalXP: -1 })
    .limit(limit)
    .skip(offset)
    .select('name totalXP level badges');

  // Get total count
  const total = await User.countDocuments(dateFilter);

  // Get user's rank
  const currentUser = await User.findById(req.user._id);
  const userRank = await User.countDocuments({
    ...dateFilter,
    totalXP: { $gt: currentUser.totalXP }
  }) + 1;

  // Format leaderboard entries
  const leaderboard = users.map((user, index) => ({
    rank: offset + index + 1,
    userId: user._id.toString(),
    name: user.name,
    totalXP: user.totalXP,
    level: user.level,
    avatar: '👤',
    badges: user.badges.slice(0, 3).map(b => b.badgeId)
  }));

  return successResponse(res, {
    leaderboard,
    userRank: {
      rank: userRank,
      totalXP: currentUser.totalXP,
      level: currentUser.level
    },
    pagination: {
      total,
      limit,
      offset
    }
  });
});

