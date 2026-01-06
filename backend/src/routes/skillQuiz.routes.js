import express from 'express';
import { body } from 'express-validator';
import { submitSkillQuiz } from '../controllers/skillQuiz.controller.js';
import { validate } from '../utils/validation.utils.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// All skill quiz routes require authentication
router.use(authenticate);

// Submit skill quiz
router.post('/submit', [
  body('answers').isObject(),
  body('completedAt').optional().isISO8601()
], validate, submitSkillQuiz);

export default router;
