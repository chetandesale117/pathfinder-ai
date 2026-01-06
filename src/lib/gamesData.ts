/**
 * Local mock game data used as a fallback when the backend API is unavailable.
 * Game pages already embed their own question sets, so this file primarily
 * serves the Games hub and any future centralized question loading.
 */

export type GameMeta = {
  id: string;
  title: string;
  description: string;
  skill: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  estimatedTime: string;
  xpReward: number;
  isLocked?: boolean;
};

export const localGames: GameMeta[] = [
  {
    id: "logical-reasoning",
    title: "Logical Reasoning",
    description:
      "Test your ability to analyze patterns and draw logical conclusions from given information.",
    skill: "Critical Thinking",
    difficulty: "Medium",
    estimatedTime: "15 min",
    xpReward: 150,
  },
  {
    id: "pattern-recognition",
    title: "Pattern Recognition",
    description:
      "Identify and complete visual and numerical patterns to assess cognitive abilities.",
    skill: "Visual Intelligence",
    difficulty: "Easy",
    estimatedTime: "10 min",
    xpReward: 100,
  },
  {
    id: "mathematical-thinking",
    title: "Mathematical Thinking",
    description:
      "Solve numerical puzzles and mathematical problems that test quantitative reasoning.",
    skill: "Quantitative Analysis",
    difficulty: "Hard",
    estimatedTime: "20 min",
    xpReward: 200,
  },
  {
    id: "problem-solving",
    title: "Problem-Solving Scenarios",
    description:
      "Navigate real-world scenarios that require creative problem-solving approaches.",
    skill: "Analytical Skills",
    difficulty: "Medium",
    estimatedTime: "25 min",
    xpReward: 175,
  },
  {
    id: "technical-knowledge",
    title: "Technical Knowledge",
    description:
      "Assess your understanding of technical concepts across various domains.",
    skill: "Domain Expertise",
    difficulty: "Hard",
    estimatedTime: "30 min",
    xpReward: 250,
  },
  {
    id: "career-quest",
    title: "Career Quest Mode",
    description:
      "An immersive journey through career-related challenges and discovery missions.",
    skill: "Career Aptitude",
    difficulty: "Expert",
    estimatedTime: "45 min",
    xpReward: 500,
    isLocked: true,
  },
];

// Optional: local question stubs (kept minimal since each page already contains full sets)
export const localQuestions: Record<string, any[]> = {
  "logical-reasoning": [],
  "mathematical-thinking": [],
  "pattern-recognition": [],
  "problem-solving": [],
  "technical-knowledge": [],
  "career-quest": [],
};

export const getLocalGames = () => localGames;

export const getLocalQuestions = (gameType: string) =>
  localQuestions[gameType] || [];
export type Difficulty = "Easy" | "Medium" | "Hard" | "Expert";

// Logical Reasoning
export const logicalReasoningQuestions = [
  {
    id: 1,
    question: "What comes next in the sequence: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "46"],
    correctAnswer: 1,
    explanation: "Each difference increases by 2: +4, +6, +8, +10, +12 = 42",
    difficulty: "Easy",
  },
  {
    id: 2,
    question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies?",
    options: ["True", "False", "Cannot be determined", "Sometimes"],
    correctAnswer: 0,
    explanation: "If A⊂B and B⊂C, then A⊂C.",
    difficulty: "Easy",
  },
  {
    id: 3,
    question: "Which number doesn't belong: 2, 3, 6, 7, 8, 14, 15, 30?",
    options: ["6", "7", "8", "15"],
    correctAnswer: 2,
    explanation: "8 is the only number that doesn't follow the pattern of alternating prime and prime×2.",
    difficulty: "Medium",
  },
  {
    id: 4,
    question: "A is taller than B. C is shorter than A. B is taller than C. Who is the shortest?",
    options: ["A", "B", "C", "Cannot be determined"],
    correctAnswer: 2,
    explanation: "A > B > C, so C is the shortest.",
    difficulty: "Medium",
  },
  {
    id: 5,
    question: "Complete: 1, 1, 2, 3, 5, 8, 13, ?",
    options: ["18", "20", "21", "24"],
    correctAnswer: 2,
    explanation: "Fibonacci sequence: 8 + 13 = 21",
    difficulty: "Easy",
  },
  {
    id: 6,
    question: "If you rearrange 'CIFAIPC', you get the name of a:",
    options: ["City", "Animal", "Ocean", "Country"],
    correctAnswer: 2,
    explanation: "CIFAIPC rearranges to PACIFIC, which is an ocean.",
    difficulty: "Medium",
  },
  {
    id: 7,
    question: "What is the next letter: O, T, T, F, F, S, S, ?",
    options: ["E", "N", "T", "O"],
    correctAnswer: 0,
    explanation: "These are first letters of One, Two, Three, Four, Five, Six, Seven, Eight.",
    difficulty: "Hard",
  },
  {
    id: 8,
    question: "If 5 machines take 5 minutes to make 5 widgets, how long would 100 machines take to make 100 widgets?",
    options: ["100 minutes", "20 minutes", "5 minutes", "1 minute"],
    correctAnswer: 2,
    explanation: "Each machine makes 1 widget in 5 minutes. 100 machines make 100 widgets in 5 minutes.",
    difficulty: "Hard",
  },
  {
    id: 9,
    question: "Which word does NOT belong: Apple, Banana, Carrot, Grape, Orange?",
    options: ["Apple", "Banana", "Carrot", "Grape"],
    correctAnswer: 2,
    explanation: "Carrot is a vegetable; all others are fruits.",
    difficulty: "Easy",
  },
  {
    id: 10,
    question: "If APPLE is coded as 50 and BANANA is coded as 42, what is CHERRY coded as?",
    options: ["60", "63", "72", "81"],
    correctAnswer: 2,
    explanation: "CHERRY = 3+8+5+18+18+25 = 72",
    difficulty: "Expert",
  },
] as const;

// Mathematical Thinking
export const mathematicalThinkingQuestions = [
  {
    id: 1,
    question: "What is 15% of 240?",
    options: ["32", "36", "38", "42"],
    correctAnswer: 1,
    explanation: "15% of 240 = 0.15 × 240 = 36",
    difficulty: "Easy",
  },
  {
    id: 2,
    question: "If x + 5 = 12, what is 2x + 3?",
    options: ["15", "17", "19", "21"],
    correctAnswer: 1,
    explanation: "x = 7, so 2x + 3 = 14 + 3 = 17",
    difficulty: "Easy",
  },
  {
    id: 3,
    question: "What is the square root of 169?",
    options: ["11", "12", "13", "14"],
    correctAnswer: 2,
    explanation: "√169 = 13",
    difficulty: "Easy",
  },
  {
    id: 4,
    question: "A shirt costs $80 after a 20% discount. What was the original price?",
    options: ["$96", "$100", "$104", "$120"],
    correctAnswer: 1,
    explanation: "If 80% = $80, then 100% = $80 ÷ 0.8 = $100",
    difficulty: "Medium",
  },
  {
    id: 5,
    question: "What is 3⁴ + 2³?",
    options: ["81", "85", "89", "91"],
    correctAnswer: 2,
    explanation: "3⁴ = 81 and 2³ = 8, so 81 + 8 = 89",
    difficulty: "Medium",
  },
  {
    id: 6,
    question: "If a train travels at 60 km/h, how long to cover 150 km?",
    options: ["2 hours", "2.5 hours", "3 hours", "3.5 hours"],
    correctAnswer: 1,
    explanation: "150 ÷ 60 = 2.5 hours",
    difficulty: "Medium",
  },
  {
    id: 7,
    question: "Solve: (2/3) × (9/4) = ?",
    options: ["3/2", "6/12", "18/12", "1/2"],
    correctAnswer: 0,
    explanation: "(2×9)/(3×4) = 18/12 = 3/2",
    difficulty: "Medium",
  },
  {
    id: 8,
    question: "If the ratio of boys to girls is 3:5 and there are 24 boys, how many girls?",
    options: ["32", "36", "40", "48"],
    correctAnswer: 2,
    explanation: "(24 × 5) ÷ 3 = 40",
    difficulty: "Hard",
  },
  {
    id: 9,
    question: "What is the area of a triangle with base 12 and height 8?",
    options: ["42", "48", "52", "96"],
    correctAnswer: 1,
    explanation: "(1/2) × 12 × 8 = 48",
    difficulty: "Easy",
  },
  {
    id: 10,
    question: "If f(x) = 2x² - 3x + 1, what is f(3)?",
    options: ["8", "10", "12", "14"],
    correctAnswer: 1,
    explanation: "2(9) - 9 + 1 = 10",
    difficulty: "Hard",
  },
] as const;

// Pattern Recognition
export const patternRecognitionQuestions = [
  {
    id: 1,
    pattern: ["🔴", "🔵", "🔴", "🔵", "🔴", "?"],
    question: "What comes next in the pattern?",
    options: ["🔴", "🔵", "🟢", "🟡"],
    correctAnswer: 1,
    explanation: "Alternates red and blue.",
    difficulty: "Easy",
  },
  {
    id: 2,
    pattern: ["⬛", "⬜", "⬛", "⬜⬜", "⬛", "⬜⬜⬜", "⬛", "?"],
    question: "What comes next?",
    options: ["⬛", "⬜⬜⬜⬜", "⬜", "⬛⬛"],
    correctAnswer: 1,
    explanation: "Black constant, white increases by 1.",
    difficulty: "Medium",
  },
  {
    id: 3,
    pattern: ["2", "4", "8", "16", "?"], question: "Find the next number:",
    options: ["24", "32", "30", "28"],
    correctAnswer: 1,
    explanation: "×2 pattern",
    difficulty: "Easy",
  },
  {
    id: 4,
    pattern: ["🔺", "🔺🔺", "🔺🔺🔺", "🔺🔺🔺🔺", "?"], question: "Continue the sequence:",
    options: ["🔺🔺🔺🔺🔺", "🔺🔺🔺", "🔻🔻🔻🔻🔻", "🔺"],
    correctAnswer: 0,
    explanation: "+1 triangle each step.",
    difficulty: "Easy",
  },
  {
    id: 5,
    pattern: ["A1", "B2", "C3", "D4", "?"], question: "What comes next?",
    options: ["E4", "E5", "F5", "D5"],
    correctAnswer: 1,
    explanation: "Letters increment, numbers increment.",
    difficulty: "Easy",
  },
  {
    id: 6,
    pattern: ["1", "1", "2", "3", "5", "8", "?"], question: "Find the missing number:",
    options: ["11", "12", "13", "15"],
    correctAnswer: 2,
    explanation: "Fibonacci sequence.",
    difficulty: "Medium",
  },
  {
    id: 7,
    pattern: ["○", "●", "○○", "●●", "○○○", "●●●", "?"], question: "What's next?",
    options: ["○○○○", "●●●●", "○●○●", "●○●○"],
    correctAnswer: 0,
    explanation: "Empty circles increase, then filled circles.",
    difficulty: "Hard",
  },
  {
    id: 8,
    pattern: ["3", "6", "12", "24", "48", "?"], question: "Continue the sequence:",
    options: ["72", "96", "84", "90"],
    correctAnswer: 1,
    explanation: "×2 pattern.",
    difficulty: "Medium",
  },
  {
    id: 9,
    pattern: ["▲", "▲▲", "▲▲▲", "▲▲▲▲", "?"], question: "What comes next?",
    options: ["▲▲▲▲▲", "▼", "▲▼", "▲▲"],
    correctAnswer: 0,
    explanation: "+1 triangle each step.",
    difficulty: "Easy",
  },
  {
    id: 10,
    pattern: ["1", "4", "9", "16", "25", "?"], question: "Find the next number:",
    options: ["30", "36", "40", "49"],
    correctAnswer: 1,
    explanation: "Perfect squares; next is 6²=36.",
    difficulty: "Hard",
  },
] as const;

// Problem Solving (with feedback)
export const problemSolvingQuestions = [
  {
    id: 1,
    scenario: "Team Conflict",
    context: "You're a team lead and two of your best developers are in a heated disagreement about which technology to use for a new project. The deadline is approaching.",
    question: "What's your approach?",
    options: [
      { text: "Make the decision yourself to save time", score: 15, feedback: "Quick but may cause resentment. Sometimes necessary under pressure." },
      { text: "Schedule a meeting to hear both sides and find a compromise", score: 30, feedback: "Excellent! This builds consensus and respects both opinions." },
      { text: "Let them figure it out on their own", score: 5, feedback: "Avoids leadership responsibility and may delay the project." },
      { text: "Ask a senior architect to decide", score: 20, feedback: "Good for technical decisions, but may undermine your authority." },
    ],
    difficulty: "Medium",
  },
  {
    id: 2,
    scenario: "Client Emergency",
    context: "A major client reports a critical bug in production at 5 PM on Friday. Your team is exhausted after a long week, and it's unclear how long the fix will take.",
    question: "How do you handle this?",
    options: [
      { text: "Tell the client it will be fixed Monday", score: 10, feedback: "May damage client relationship for a critical issue." },
      { text: "Ask for volunteers and offer compensation for overtime", score: 30, feedback: "Respects team while addressing urgency. Great balance!" },
      { text: "Mandate the team to stay and fix it", score: 15, feedback: "Gets it done but hurts morale and work-life balance." },
      { text: "Try to fix it yourself over the weekend", score: 20, feedback: "Admirable but not scalable or sustainable." },
    ],
    difficulty: "Hard",
  },
  {
    id: 3,
    scenario: "Budget Cut",
    context: "Your department's budget has been cut by 20%. You need to reduce costs without significantly impacting productivity.",
    question: "What's your strategy?",
    options: [
      { text: "Lay off the newest team members", score: 10, feedback: "May seem unfair and lose valuable perspectives." },
      { text: "Cut training and development programs", score: 5, feedback: "Short-term saving but hurts long-term growth." },
      { text: "Review all expenses and optimize workflows first", score: 30, feedback: "Smart approach - find inefficiencies before cutting people." },
      { text: "Ask for voluntary reduced hours", score: 20, feedback: "Creative but may not meet the full reduction." },
    ],
    difficulty: "Hard",
  },
  {
    id: 4,
    scenario: "Innovation vs. Stability",
    context: "Your company uses an old but reliable system. A new technology could improve efficiency by 40% but carries implementation risks.",
    question: "What do you recommend?",
    options: [
      { text: "Stick with the current system", score: 10, feedback: "Safe but may cause the company to fall behind competitors." },
      { text: "Propose a pilot project to test the new technology", score: 30, feedback: "Manages risk while exploring innovation." },
      { text: "Push for immediate full migration", score: 15, feedback: "Bold but risky without proper testing." },
      { text: "Wait to see what competitors do first", score: 5, feedback: "Too passive; you might miss the opportunity." },
    ],
    difficulty: "Medium",
  },
  {
    id: 5,
    scenario: "Underperforming Employee",
    context: "A previously high-performing team member has been underperforming for the past two months.",
    question: "How do you address this?",
    options: [
      { text: "Have a private, empathetic conversation to understand the situation", score: 30, feedback: "Shows care while addressing the issue." },
      { text: "Put them on a performance improvement plan immediately", score: 15, feedback: "May be necessary later, but premature without understanding the cause." },
      { text: "Ignore it and hope it improves", score: 5, feedback: "Problem may worsen." },
      { text: "Publicly address their performance in a team meeting", score: 0, feedback: "Damages trust and morale." },
    ],
    difficulty: "Medium",
  },
  {
    id: 6,
    scenario: "Ethical Dilemma",
    context: "You discover that a colleague has been slightly inflating their project hours.",
    question: "What do you do?",
    options: [
      { text: "Report it to HR immediately", score: 20, feedback: "Follows policy but lacks compassion." },
      { text: "Talk to them privately first and encourage them to stop", score: 25, feedback: "Balanced approach - gives a chance to correct course." },
      { text: "Ignore it - it's not your business", score: 5, feedback: "Ignoring ethical issues can enable larger problems." },
      { text: "Help them find legitimate financial resources", score: 30, feedback: "Addresses root cause while maintaining integrity." },
    ],
    difficulty: "Expert",
  },
  {
    id: 7,
    scenario: "Meeting Efficiency",
    context: "Your team spends 15+ hours per week in meetings.",
    question: "How do you improve this?",
    options: [
      { text: "Cancel all recurring meetings", score: 10, feedback: "Too extreme - some meetings are valuable." },
      { text: "Audit meetings and implement 'no meeting' blocks", score: 30, feedback: "Data-driven approach with protected focus time." },
      { text: "Make all meetings optional", score: 15, feedback: "Important discussions might be missed." },
      { text: "Shorten all meetings to 15 minutes", score: 20, feedback: "May not suit all meeting types." },
    ],
    difficulty: "Easy",
  },
  {
    id: 8,
    scenario: "Knowledge Transfer",
    context: "Your senior developer who holds critical system knowledge is leaving in 2 weeks.",
    question: "What's your priority?",
    options: [
      { text: "Try to convince them to stay longer", score: 10, feedback: "Unlikely to work and delays the real solution." },
      { text: "Pair them with other developers and record sessions", score: 30, feedback: "Captures tacit knowledge efficiently." },
      { text: "Ask them to write comprehensive documentation", score: 20, feedback: "Helpful but may miss practical insights." },
      { text: "Plan to reverse-engineer the system after they leave", score: 5, feedback: "Extremely inefficient and risky." },
    ],
    difficulty: "Medium",
  },
] as const;

// Technical Knowledge
export const technicalKnowledgeQuestions = [
  {
    id: 1,
    category: "Web Technologies",
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
    correctAnswer: 0,
    explanation: "HTML = Hyper Text Markup Language.",
    difficulty: "Easy",
  },
  {
    id: 2,
    category: "Programming",
    question: "Which of these is NOT a programming language?",
    options: ["Python", "Java", "HTML", "C++"],
    correctAnswer: 2,
    explanation: "HTML is a markup language, not programming.",
    difficulty: "Easy",
  },
  {
    id: 3,
    category: "Data Structures",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1,
    explanation: "Binary search halves the search space: O(log n).",
    difficulty: "Medium",
  },
  {
    id: 4,
    category: "AI/ML",
    question: "What does 'ML' stand for in AI/ML?",
    options: ["Machine Learning", "Meta Language", "Markup Logic", "Memory Layer"],
    correctAnswer: 0,
    explanation: "ML = Machine Learning.",
    difficulty: "Easy",
  },
  {
    id: 5,
    category: "Databases",
    question: "Which SQL clause is used to filter records?",
    options: ["SELECT", "FROM", "WHERE", "ORDER BY"],
    correctAnswer: 2,
    explanation: "WHERE filters records.",
    difficulty: "Easy",
  },
  {
    id: 6,
    category: "Web Technologies",
    question: "What is the purpose of CSS?",
    options: ["Server-side scripting", "Styling web pages", "Database management", "Network security"],
    correctAnswer: 1,
    explanation: "CSS styles web pages.",
    difficulty: "Easy",
  },
  {
    id: 7,
    category: "Programming",
    question: "What is the output of: console.log(typeof null) in JavaScript?",
    options: ["null", "undefined", "object", "boolean"],
    correctAnswer: 2,
    explanation: "JS quirk: typeof null === 'object'.",
    difficulty: "Medium",
  },
  {
    id: 8,
    category: "Data Structures",
    question: "Which data structure follows LIFO principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: 1,
    explanation: "Stack is LIFO.",
    difficulty: "Easy",
  },
  {
    id: 9,
    category: "AI/ML",
    question: "Primary purpose of a neural network?",
    options: ["Data storage", "Pattern recognition and learning", "Network routing", "File compression"],
    correctAnswer: 1,
    explanation: "Pattern recognition and learning.",
    difficulty: "Medium",
  },
  {
    id: 10,
    category: "Databases",
    question: "What does ACID stand for?",
    options: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Integrity, Data", "Analysis, Code, Input, Design", "Application, Client, Interface, Database"],
    correctAnswer: 0,
    explanation: "ACID properties of transactions.",
    difficulty: "Hard",
  },
] as const;

// Career Quest
export const careerQuestQuestions = [
  {
    id: 1,
    level: 1,
    career: "Software Engineer",
    question: "You're debugging a complex issue reported by multiple users. Where do you start?",
    options: [
      "Check the error logs and stack traces",
      "Ask users for more details",
      "Restart the server",
      "Blame the frontend team"
    ],
    correctAnswer: 0,
    explanation: "Logs and stack traces provide the most technical info.",
    difficulty: "Medium",
  },
  {
    id: 2,
    level: 1,
    career: "Data Scientist",
    question: "You need to analyze a large dataset to find patterns. What's your first step?",
    options: [
      "Start building models immediately",
      "Explore and clean the data",
      "Visualize everything",
      "Ask for more data"
    ],
    correctAnswer: 1,
    explanation: "Data exploration and cleaning is crucial before modeling.",
    difficulty: "Medium",
  },
  {
    id: 3,
    level: 2,
    career: "Product Manager",
    question: "Stakeholders want features A, B, and C, but resources allow only one. How do you decide?",
    options: [
      "Build the easiest one",
      "Analyze user impact and business value",
      "Ask the CEO to decide",
      "Build all three poorly"
    ],
    correctAnswer: 1,
    explanation: "Decisions should be data-driven with user/business value.",
    difficulty: "Hard",
  },
  {
    id: 4,
    level: 2,
    career: "UX Designer",
    question: "Users are complaining about a confusing interface. What's your approach?",
    options: [
      "Redesign everything",
      "Conduct user research to understand pain points",
      "Add more features",
      "Make it prettier"
    ],
    correctAnswer: 1,
    explanation: "User research identifies specific problems before changes.",
    difficulty: "Medium",
  },
  {
    id: 5,
    level: 3,
    career: "Cloud Architect",
    question: "Design a scalable system for 1 million users. What's your priority?",
    options: [
      "Use the latest technology",
      "Design for scalability, reliability, and cost",
      "Copy what Google does",
      "Start small and hope it scales"
    ],
    correctAnswer: 1,
    explanation: "Focus on scalability, reliability, and cost.",
    difficulty: "Expert",
  },
] as const;

// Fallback games list
export const fallbackGamesList = [
  { id: "logical-reasoning", title: "Logical Reasoning", difficulty: "Medium", estimatedTime: "15 min", xpReward: 150 },
  { id: "pattern-recognition", title: "Pattern Recognition", difficulty: "Easy", estimatedTime: "10 min", xpReward: 100 },
  { id: "mathematical-thinking", title: "Mathematical Thinking", difficulty: "Hard", estimatedTime: "20 min", xpReward: 200 },
  { id: "problem-solving", title: "Problem Solving", difficulty: "Medium", estimatedTime: "25 min", xpReward: 175 },
  { id: "technical-knowledge", title: "Technical Knowledge", difficulty: "Hard", estimatedTime: "30 min", xpReward: 250 },
  { id: "career-quest", title: "Career Quest", difficulty: "Expert", estimatedTime: "45 min", xpReward: 500 },
] as const;

export const gameQuestionFallbacks = {
  "logical-reasoning": logicalReasoningQuestions,
  "mathematical-thinking": mathematicalThinkingQuestions,
  "pattern-recognition": patternRecognitionQuestions,
  "problem-solving": problemSolvingQuestions,
  "technical-knowledge": technicalKnowledgeQuestions,
  "career-quest": careerQuestQuestions,
} as const;

