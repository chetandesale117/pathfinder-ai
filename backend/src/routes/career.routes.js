import express from 'express';
import { body } from 'express-validator';
import { predictCareer } from '../controllers/career.controller.js';
import { validate } from '../utils/validation.utils.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// All career routes require authentication
router.use(authenticate);

// Get career prediction
router.post('/predict', [
  body('gameScores').isObject(),
  body('gameScores.logical').optional().isNumeric(),
  body('gameScores.mathematical').optional().isNumeric(),
  body('gameScores.pattern').optional().isNumeric(),
  body('gameScores.problemSolving').optional().isNumeric(),
  body('gameScores.technical').optional().isNumeric(),
  body('totalXP').isNumeric(),
  body('averageAccuracy').optional().isNumeric(),
  body('skillQuizAnswers').optional().isObject(),
  body('personalityTraits').optional().isObject()
], validate, predictCareer);

export default router;
