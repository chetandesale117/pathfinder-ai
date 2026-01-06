import SkillQuiz from '../models/SkillQuiz.model.js';
import { handleAsync } from '../utils/errorHandler.utils.js';
import { successResponse } from '../utils/response.utils.js';

/**
 * Calculate personality profile from answers
 */
const calculatePersonalityProfile = (answers) => {
  const profile = {
    analytical: 0,
    detailOriented: 0,
    teamPlayer: 0,
    selfMotivated: 0,
    adaptable: 0
  };

  const answerValues = { a: 4, b: 3, c: 2, d: 1 };

  // Question 1: Data analysis -> analytical, detailOriented
  if (answers['1']) {
    const value = answerValues[answers['1']] || 2;
    profile.analytical += value * 10;
    profile.detailOriented += value * 8;
  }

  // Question 2: Programming -> analytical
  if (answers['2']) {
    const value = answerValues[answers['2']] || 2;
    profile.analytical += value * 8;
  }

  // Question 3: Communication -> teamPlayer
  if (answers['3']) {
    const value = answerValues[answers['3']] || 2;
    profile.teamPlayer += value * 12;
  }

  // Question 4: Project management -> selfMotivated, teamPlayer
  if (answers['4']) {
    const value = answerValues[answers['4']] || 2;
    profile.selfMotivated += value * 10;
    profile.teamPlayer += value * 8;
  }

  // Question 5: Public speaking -> adaptable, teamPlayer
  if (answers['5']) {
    const value = answerValues[answers['5']] || 2;
    profile.adaptable += value * 10;
    profile.teamPlayer += value * 8;
  }

  // Question 6: Design tools -> adaptable, detailOriented
  if (answers['6']) {
    const value = answerValues[answers['6']] || 2;
    profile.adaptable += value * 8;
    profile.detailOriented += value * 10;
  }

  // Question 7: Problem solving -> analytical, selfMotivated
  if (answers['7']) {
    const value = answerValues[answers['7']] || 2;
    profile.analytical += value * 12;
    profile.selfMotivated += value * 10;
  }

  // Question 8: Customer service -> teamPlayer, adaptable
  if (answers['8']) {
    const value = answerValues[answers['8']] || 2;
    profile.teamPlayer += value * 10;
    profile.adaptable += value * 8;
  }

  // Normalize to 0-100
  Object.keys(profile).forEach(key => {
    profile[key] = Math.min(100, Math.max(0, profile[key]));
  });

  return profile;
};

/**
 * Submit skill quiz
 */
export const submitSkillQuiz = handleAsync(async (req, res) => {
  const { answers, completedAt } = req.body;

  // Calculate personality profile from answers
  const personalityProfile = calculatePersonalityProfile(answers);

  // Check if user already has a quiz
  let skillQuiz = await SkillQuiz.findOne({ userId: req.user._id });

  if (skillQuiz) {
    // Update existing quiz
    skillQuiz.answers = new Map(Object.entries(answers));
    skillQuiz.personalityProfile = personalityProfile;
    skillQuiz.completedAt = completedAt ? new Date(completedAt) : new Date();
    await skillQuiz.save();
  } else {
    // Create new quiz
    skillQuiz = new SkillQuiz({
      userId: req.user._id,
      answers: new Map(Object.entries(answers)),
      personalityProfile,
      completedAt: completedAt ? new Date(completedAt) : new Date()
    });
    await skillQuiz.save();
  }

  return successResponse(res, {
    quizId: skillQuiz._id,
    personalityProfile
  }, 'Skill quiz submitted successfully');
});

