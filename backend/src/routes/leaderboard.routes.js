import express from 'express';
import { getLeaderboard } from '../controllers/leaderboard.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// All leaderboard routes require authentication
router.use(authenticate);

// Get leaderboard
router.get('/', getLeaderboard);

export default router;
