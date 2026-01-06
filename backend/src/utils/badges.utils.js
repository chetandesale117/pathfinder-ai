// Badge definitions
export const BADGES = {
  QUICK_THINKER: {
    id: 'quick-thinker',
    name: 'Quick Thinker',
    icon: 'zap',
    condition: (game) => game.timeTaken < 120 // Under 2 minutes
  },
  PATTERN_MASTER: {
    id: 'pattern-master',
    name: 'Pattern Master',
    icon: 'target',
    condition: (game) => game.gameType === 'pattern-recognition' && game.accuracy >= 90
  },
  MATH_WIZARD: {
    id: 'math-wizard',
    name: 'Math Wizard',
    icon: 'brain',
    condition: (game) => game.gameType === 'mathematical-thinking' && game.accuracy >= 90
  },
  PROBLEM_SOLVER: {
    id: 'problem-solver',
    name: 'Problem Solver',
    icon: 'trophy',
    condition: (game) => game.gameType === 'problem-solving' && game.accuracy >= 90
  },
  TECH_EXPERT: {
    id: 'tech-expert',
    name: 'Tech Expert',
    icon: 'code',
    condition: (game) => game.gameType === 'technical-knowledge' && game.accuracy >= 90
  },
  PERFECT_SCORE: {
    id: 'perfect-score',
    name: 'Perfect Score',
    icon: 'star',
    condition: (game) => game.accuracy === 100
  },
  STREAK_MASTER: {
    id: 'streak-master',
    name: 'Streak Master',
    icon: 'flame',
    condition: (game) => game.streak >= 10
  },
  SPEED_DEMON: {
    id: 'speed-demon',
    name: 'Speed Demon',
    icon: 'zap',
    condition: (game) => game.avgTimePerQuestion && game.avgTimePerQuestion < 10
  }
};

// Check which badges should be unlocked for a game
export const checkBadges = (game, userBadges) => {
  const unlockedBadges = [];
  const userBadgeIds = userBadges.map(b => b.badgeId);

  for (const [key, badge] of Object.entries(BADGES)) {
    // Skip if user already has this badge
    if (userBadgeIds.includes(badge.id)) continue;

    // Check if condition is met
    if (badge.condition(game)) {
      unlockedBadges.push({
        badgeId: badge.id,
        name: badge.name,
        icon: badge.icon,
        earnedAt: new Date()
      });
    }
  }

  return unlockedBadges;
};

