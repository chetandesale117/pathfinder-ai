import {
  getTopCareers,
  analyzeSkills,
  calculateReadinessScore,
  generateRecommendations
} from '../utils/careerPrediction.utils.js';
import { handleAsync } from '../utils/errorHandler.utils.js';
import { successResponse } from '../utils/response.utils.js';

/**
 * Get career prediction
 */
export const predictCareer = handleAsync(async (req, res) => {
  const {
    gameScores,
    totalXP,
    averageAccuracy = 75,
    skillQuizAnswers,
    personalityTraits
  } = req.body;

  // Get top career matches
  const topCareers = getTopCareers(gameScores, 5);

  // Analyze strengths and weaknesses
  const { strengths, weaknesses } = analyzeSkills(gameScores);

  // Calculate readiness score
  const readinessScore = calculateReadinessScore(
    gameScores,
    totalXP,
    averageAccuracy
  );

  // Generate recommendations
  const recommendations = generateRecommendations(
    topCareers[0],
    strengths,
    weaknesses
  );

  return successResponse(res, {
    topCareers: topCareers.map(career => ({
      title: career.title,
      matchPercentage: career.matchPercentage,
      salary: career.salary,
      growth: career.growth,
      description: career.description,
      requiredSkills: career.requiredSkills,
      education: career.education
    })),
    strengths,
    weaknesses,
    readinessScore,
    recommendations
  });
});

