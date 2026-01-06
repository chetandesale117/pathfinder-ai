// Career database with requirements
const CAREERS = [
  {
    title: 'Data Scientist',
    matchPercentage: 0,
    salary: '$90k - $140k',
    growth: '+31%',
    description: 'Analyze data to drive business decisions',
    requiredSkills: ['Python', 'Statistics', 'Machine Learning'],
    education: "Bachelor's in Computer Science or related",
    weights: {
      logical: 0.25,
      mathematical: 0.30,
      pattern: 0.25,
      problemSolving: 0.10,
      technical: 0.10
    }
  },
  {
    title: 'Software Engineer',
    matchPercentage: 0,
    salary: '$95k - $150k',
    growth: '+25%',
    description: 'Build innovative software solutions',
    requiredSkills: ['Programming', 'Problem Solving', 'System Design'],
    education: "Bachelor's in Computer Science",
    weights: {
      logical: 0.20,
      mathematical: 0.15,
      pattern: 0.15,
      problemSolving: 0.30,
      technical: 0.20
    }
  },
  {
    title: 'Product Manager',
    matchPercentage: 0,
    salary: '$100k - $160k',
    growth: '+22%',
    description: 'Lead product development and strategy',
    requiredSkills: ['Communication', 'Strategic Thinking', 'Leadership'],
    education: "Bachelor's in Business or related",
    weights: {
      logical: 0.20,
      mathematical: 0.10,
      pattern: 0.20,
      problemSolving: 0.30,
      technical: 0.20
    }
  },
  {
    title: 'UX Designer',
    matchPercentage: 0,
    salary: '$75k - $120k',
    growth: '+18%',
    description: 'Create user-centered digital experiences',
    requiredSkills: ['Design', 'User Research', 'Prototyping'],
    education: "Bachelor's in Design or related",
    weights: {
      logical: 0.15,
      mathematical: 0.10,
      pattern: 0.35,
      problemSolving: 0.25,
      technical: 0.15
    }
  },
  {
    title: 'Cloud Architect',
    matchPercentage: 0,
    salary: '$110k - $180k',
    growth: '+28%',
    description: 'Design scalable cloud infrastructure',
    requiredSkills: ['Cloud Platforms', 'System Architecture', 'Security'],
    education: "Bachelor's in Computer Science",
    weights: {
      logical: 0.25,
      mathematical: 0.20,
      pattern: 0.15,
      problemSolving: 0.20,
      technical: 0.20
    }
  },
  {
    title: 'AI Engineer',
    matchPercentage: 0,
    salary: '$100k - $160k',
    growth: '+35%',
    description: 'Develop AI and machine learning systems',
    requiredSkills: ['Machine Learning', 'Python', 'Deep Learning'],
    education: "Bachelor's or Master's in Computer Science",
    weights: {
      logical: 0.20,
      mathematical: 0.30,
      pattern: 0.20,
      problemSolving: 0.15,
      technical: 0.15
    }
  },
  {
    title: 'Business Analyst',
    matchPercentage: 0,
    salary: '$70k - $110k',
    growth: '+20%',
    description: 'Analyze business processes and requirements',
    requiredSkills: ['Analytics', 'Communication', 'Problem Solving'],
    education: "Bachelor's in Business or related",
    weights: {
      logical: 0.30,
      mathematical: 0.25,
      pattern: 0.15,
      problemSolving: 0.20,
      technical: 0.10
    }
  },
  {
    title: 'DevOps Engineer',
    matchPercentage: 0,
    salary: '$95k - $145k',
    growth: '+24%',
    description: 'Automate and optimize development workflows',
    requiredSkills: ['CI/CD', 'Cloud Platforms', 'Automation'],
    education: "Bachelor's in Computer Science",
    weights: {
      logical: 0.20,
      mathematical: 0.15,
      pattern: 0.20,
      problemSolving: 0.25,
      technical: 0.20
    }
  }
];

// Calculate match percentage for a career based on game scores
export const calculateCareerMatch = (career, gameScores) => {
  let matchScore = 0;
  const weights = career.weights;

  // Calculate weighted score
  matchScore += (gameScores.logical || 0) * weights.logical;
  matchScore += (gameScores.mathematical || 0) * weights.mathematical;
  matchScore += (gameScores.pattern || 0) * weights.pattern;
  matchScore += (gameScores.problemSolving || 0) * weights.problemSolving;
  matchScore += (gameScores.technical || 0) * weights.technical;

  // Normalize to 0-100
  return Math.round(matchScore);
};

// Get top career matches
export const getTopCareers = (gameScores, limit = 5) => {
  const careersWithScores = CAREERS.map(career => ({
    ...career,
    matchPercentage: calculateCareerMatch(career, gameScores)
  }));

  // Sort by match percentage (descending)
  careersWithScores.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return careersWithScores.slice(0, limit);
};

// Calculate strengths and weaknesses
export const analyzeSkills = (gameScores) => {
  const skills = [
    { skill: 'Pattern Recognition', score: gameScores.pattern || 0 },
    { skill: 'Technical Knowledge', score: gameScores.technical || 0 },
    { skill: 'Logical Reasoning', score: gameScores.logical || 0 },
    { skill: 'Mathematical Thinking', score: gameScores.mathematical || 0 },
    { skill: 'Problem Solving', score: gameScores.problemSolving || 0 }
  ];

  // Sort by score
  skills.sort((a, b) => b.score - a.score);

  const strengths = skills.slice(0, 3).map(s => ({
    skill: s.skill,
    score: s.score,
    description: getSkillDescription(s.skill, s.score, true)
  }));

  const weaknesses = skills.slice(-2).map(s => ({
    skill: s.skill,
    score: s.score,
    description: getSkillDescription(s.skill, s.score, false)
  }));

  return { strengths, weaknesses };
};

const getSkillDescription = (skill, score, isStrength) => {
  if (isStrength) {
    if (score >= 90) return `Excellent ${skill.toLowerCase()} capabilities`;
    if (score >= 80) return `Strong ${skill.toLowerCase()} skills`;
    return `Good ${skill.toLowerCase()} abilities`;
  } else {
    if (score < 60) return `Needs significant improvement in ${skill.toLowerCase()}`;
    if (score < 70) return `Room for improvement in ${skill.toLowerCase()}`;
    return `Consider practicing ${skill.toLowerCase()} more`;
  }
};

// Calculate readiness score
export const calculateReadinessScore = (gameScores, totalXP, averageAccuracy) => {
  // Average of all skill scores (40%)
  const avgSkillScore = (
    (gameScores.logical || 0) +
    (gameScores.mathematical || 0) +
    (gameScores.pattern || 0) +
    (gameScores.problemSolving || 0) +
    (gameScores.technical || 0)
  ) / 5;

  // XP contribution (30%) - normalized to 0-100
  const xpScore = Math.min(100, (totalXP / 5000) * 100);

  // Accuracy contribution (30%)
  const accuracyScore = averageAccuracy || 0;

  return Math.round(avgSkillScore * 0.4 + xpScore * 0.3 + accuracyScore * 0.3);
};

// Generate recommendations
export const generateRecommendations = (topCareer, strengths, weaknesses) => {
  const courses = [
    `Advanced ${topCareer.title} Fundamentals`,
    `${topCareer.requiredSkills[0]} Mastery`,
    'Professional Development Certification'
  ];

  const skillsToDevelop = weaknesses.map(w => w.skill.split(' ')[0] + ' Skills');
  skillsToDevelop.push('Communication', 'Leadership');

  const nextSteps = [
    'Build portfolio projects',
    'Network with industry professionals',
    'Apply for internships or entry-level positions',
    `Take courses in ${topCareer.requiredSkills.join(', ')}`
  ];

  return {
    courses: courses.slice(0, 3),
    skillsToDevelop: skillsToDevelop.slice(0, 3),
    nextSteps: nextSteps.slice(0, 3)
  };
};

