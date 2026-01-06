import { gameQuestions } from '../data/games.data.js';
import { handleAsync } from '../utils/errorHandler.utils.js';
import { successResponse, errorResponse } from '../utils/response.utils.js';

/**
 * Get questions for a specific game
 */
export const getGameQuestions = handleAsync(async (req, res) => {
  const { gameType } = req.params;

  // Validate game type
  const validGameTypes = [
    'logical-reasoning',
    'mathematical-thinking',
    'pattern-recognition',
    'problem-solving',
    'technical-knowledge',
    'career-quest'
  ];

  if (!validGameTypes.includes(gameType)) {
    return errorResponse(res, 'Invalid game type', 'INVALID_GAME_TYPE', 400);
  }

  // Get questions for the game type
  const questions = gameQuestions[gameType];

  if (!questions || questions.length === 0) {
    return errorResponse(res, 'No questions available for this game', 'NO_QUESTIONS', 404);
  }

  // Optionally shuffle questions (for variety)
  const shuffle = req.query.shuffle === 'true';
  let questionsToReturn = [...questions];
  
  if (shuffle) {
    questionsToReturn = questionsToReturn.sort(() => Math.random() - 0.5);
  }

  // Optionally limit number of questions
  const limit = parseInt(req.query.limit);
  if (limit && limit > 0) {
    questionsToReturn = questionsToReturn.slice(0, limit);
  }

  return successResponse(res, {
    gameType,
    totalQuestions: questions.length,
    questions: questionsToReturn
  });
});

/**
 * Get all available games
 */
export const getAvailableGames = handleAsync(async (req, res) => {
  const games = [
    {
      id: 'logical-reasoning',
      name: 'Logical Reasoning',
      description: 'Test your ability to analyze patterns and draw logical conclusions',
      difficulty: 'Medium',
      estimatedTime: '15 min',
      questionCount: gameQuestions['logical-reasoning']?.length || 0,
    },
    {
      id: 'mathematical-thinking',
      name: 'Mathematical Thinking',
      description: 'Solve numerical puzzles and mathematical problems',
      difficulty: 'Hard',
      estimatedTime: '20 min',
      questionCount: gameQuestions['mathematical-thinking']?.length || 0,
    },
    {
      id: 'pattern-recognition',
      name: 'Pattern Recognition',
      description: 'Identify and complete visual and numerical patterns',
      difficulty: 'Easy',
      estimatedTime: '10 min',
      questionCount: gameQuestions['pattern-recognition']?.length || 0,
    },
    {
      id: 'problem-solving',
      name: 'Problem-Solving Scenarios',
      description: 'Navigate real-world scenarios requiring creative problem-solving',
      difficulty: 'Medium',
      estimatedTime: '25 min',
      questionCount: gameQuestions['problem-solving']?.length || 0,
    },
    {
      id: 'technical-knowledge',
      name: 'Technical Knowledge',
      description: 'Assess your understanding of technical concepts',
      difficulty: 'Hard',
      estimatedTime: '30 min',
      questionCount: gameQuestions['technical-knowledge']?.length || 0,
    },
    {
      id: 'career-quest',
      name: 'Career Quest Mode',
      description: 'An immersive journey through career-related challenges',
      difficulty: 'Expert',
      estimatedTime: '45 min',
      questionCount: gameQuestions['career-quest']?.length || 0,
    },
  ];

  return successResponse(res, { games });
});

