import express from 'express';
import { body } from 'express-validator';
import { submitGame, getGameHistory } from '../controllers/game.controller.js';
import { validate } from '../utils/validation.utils.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// All game routes require authentication
router.use(authenticate);

// Submit game results
router.post('/submit', [
  body('gameType').isIn(['logical-reasoning', 'mathematical-thinking', 'pattern-recognition', 'problem-solving', 'technical-knowledge', 'career-quest']),
  body('score').isNumeric(),
  body('accuracy').isNumeric().isFloat({ min: 0, max: 100 }),
  body('timeTaken').isNumeric(),
  body('xpEarned').isNumeric(),
  body('difficultyLevel').optional().isIn(['Easy', 'Medium', 'Hard', 'Expert', 'Mixed']),
  body('totalQuestions').optional().isInt({ min: 1 }),
  body('correctAnswers').optional().isInt({ min: 0 }),
  body('streak').optional().isInt({ min: 0 }),
  body('avgTimePerQuestion').optional().isNumeric(),
  body('skipsUsed').optional().isInt({ min: 0 })
], validate, submitGame);

// Get game history
router.get('/history', getGameHistory);

export default router;
