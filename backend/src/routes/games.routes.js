import express from 'express';
import { getGameQuestions, getAvailableGames } from '../controllers/games.controller.js';

const router = express.Router();

// Get all available games (public endpoint)
router.get('/', getAvailableGames);

// Get questions for a specific game (public endpoint)
router.get('/:gameType/questions', getGameQuestions);

export default router;

