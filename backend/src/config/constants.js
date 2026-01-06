/**
 * Application constants
 */

export const GAME_TYPES = [
  'logical-reasoning',
  'mathematical-thinking',
  'pattern-recognition',
  'problem-solving',
  'technical-knowledge',
  'career-quest'
];

export const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard', 'Expert', 'Mixed'];

export const XP_PER_LEVEL = 200;

export const DEFAULT_PAGINATION = {
  limit: 10,
  offset: 0
};

export const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
};

