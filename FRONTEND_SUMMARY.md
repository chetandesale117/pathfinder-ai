# Frontend Technical Summary for Backend Integration

## Project Overview
**CareerAI** - An AI-Powered Career Recommendation Platform with a gamified IQ & Knowledge Assessment System. The platform uses game performance data for ML-based career prediction.

---

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 18.3.1 |
| Build Tool | Vite | 5.4.19 |
| Language | TypeScript | 5.8.3 |
| Styling | TailwindCSS | 3.4.17 |
| UI Components | shadcn/ui (Radix UI) | Latest |
| Animations | Framer Motion | 12.23.25 |
| HTTP Client | Axios | 1.13.2 |
| State Management | React Query (@tanstack/react-query) | 5.83.0 |
| Charts | Recharts | 2.15.4 |
| Routing | React Router DOM | 6.30.1 |
| PDF Generation | jsPDF | 3.0.4 |
| Form Handling | React Hook Form + Zod | Latest |

---

## Application Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `Index.tsx` | Landing/Marketing page with features overview |
| `/dashboard` | `Dashboard.tsx` | Student dashboard with progress, badges, leaderboard |
| `/games` | `Games.tsx` | Games hub - grid of 6 game cards for selection |
| `/games/logical-reasoning` | `LogicalReasoning.tsx` | MCQ puzzles, sequences, deductive reasoning |
| `/games/mathematical-thinking` | `MathematicalThinking.tsx` | Timed numerical problems with skip feature |
| `/games/pattern-recognition` | `PatternRecognition.tsx` | Visual pattern matching challenges |
| `/games/problem-solving` | `ProblemSolving.tsx` | Real-life problem-solving scenarios |
| `/games/technical-knowledge` | `TechnicalKnowledge.tsx` | Programming, data, AI/ML concepts quiz |
| `/games/career-quest` | `CareerQuest.tsx` | Multi-level career-specific challenges |
| `/game-results` | `GameResults.tsx` | IQ score, skill breakdown, charts visualization |
| `/skill-quiz` | `SkillQuiz.tsx` | Skills assessment questionnaire (8 questions) |
| `/career-results` | `CareerResults.tsx` | AI-predicted career matches with PDF export |
| `/psychometric-test` | `PsychometricTest.tsx` | Personality assessment (if implemented) |
| `*` | `NotFound.tsx` | 404 error page |

---

## API Endpoints Required

### Base URL Configuration
Currently, all API calls use relative paths (`/api/*`). The frontend expects the backend to be served from the same origin or configured via proxy.

**Recommended Setup:**
- Development: Configure Vite proxy to forward `/api/*` to backend server
- Production: Backend should be at same domain or configure CORS

---

### 1. Game Submission Endpoint

**Endpoint:** `POST /api/game/submit`

**Purpose:** Submit game results after completion

**Request Payload:**
```typescript
{
  gameType: "logical-reasoning" | "mathematical-thinking" | "pattern-recognition" | 
            "problem-solving" | "technical-knowledge" | "career-quest",
  score: number,                    // Total points earned
  accuracy: number,                  // Percentage (0-100)
  timeTaken: number,                 // Total time in seconds
  xpEarned: number,                  // Experience points earned
  difficultyLevel?: string,         // "Easy" | "Medium" | "Hard" | "Expert" | "Mixed"
  skipsUsed?: number,                // For math game (optional)
  totalQuestions?: number,           // Total questions answered
  correctAnswers?: number,           // Number of correct answers
  streak?: number,                   // Longest streak achieved
  avgTimePerQuestion?: number        // Average time per question
}
```

**Example Request:**
```json
{
  "gameType": "logical-reasoning",
  "score": 850,
  "accuracy": 80,
  "timeTaken": 180,
  "xpEarned": 150,
  "difficultyLevel": "Mixed",
  "totalQuestions": 10,
  "correctAnswers": 8,
  "streak": 5,
  "avgTimePerQuestion": 18
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Game results saved successfully",
  "data": {
    "gameId": "uuid",
    "totalXP": 2450,
    "level": 12,
    "badgesUnlocked": ["Quick Thinker"]
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid data)
- `401` - Unauthorized (authentication required)
- `500` - Server Error

---

### 2. Game History Endpoint

**Endpoint:** `GET /api/game/history`

**Purpose:** Retrieve user's game history and statistics

**Query Parameters:**
- `limit` (optional): Number of games to return (default: 10)
- `offset` (optional): Pagination offset (default: 0)
- `gameType` (optional): Filter by specific game type

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "games": [
      {
        "id": "uuid",
        "gameType": "logical-reasoning",
        "score": 850,
        "accuracy": 80,
        "xpEarned": 150,
        "completedAt": "2026-01-05T10:30:00Z",
        "difficultyLevel": "Mixed"
      }
    ],
    "statistics": {
      "totalXP": 2450,
      "totalGamesPlayed": 12,
      "averageAccuracy": 78,
      "totalTimeSpent": 3600,
      "currentStreak": 5,
      "longestStreak": 8
    },
    "pagination": {
      "total": 12,
      "limit": 10,
      "offset": 0,
      "hasMore": false
    }
  }
}
```

---

### 3. Dashboard Data Endpoint

**Endpoint:** `GET /api/dashboard`

**Purpose:** Get comprehensive dashboard data for user

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "level": 12,
      "totalXP": 2450,
      "xpToNextLevel": 3000,
      "gamesPlayed": 18,
      "streak": 5,
      "iqScore": 83,
      "careerReadiness": 78
    },
    "skillScores": {
      "logical": 85,
      "mathematical": 78,
      "pattern": 92,
      "problemSolving": 70,
      "technical": 88
    },
    "recommendedCareer": {
      "title": "Data Scientist",
      "matchPercentage": 85,
      "description": "Based on your analytical skills...",
      "icon": "brain"
    },
    "badges": [
      {
        "id": "quick-thinker",
        "name": "Quick Thinker",
        "icon": "zap",
        "earned": true,
        "earnedAt": "2026-01-05T10:30:00Z"
      }
    ],
    "recentGames": [
      {
        "gameType": "pattern-recognition",
        "score": 92,
        "completedAt": "2026-01-05T08:30:00Z",
        "xpEarned": 150
      }
    ],
    "leaderboard": {
      "userRank": 4,
      "topPlayers": [
        {
          "rank": 1,
          "name": "Alex T.",
          "totalXP": 2850,
          "avatar": "🏆"
        }
      ]
    }
  }
}
```

---

### 4. Career Prediction Endpoint

**Endpoint:** `POST /api/career/predict`

**Purpose:** Generate AI-powered career recommendations based on game performance and skill quiz

**Request Payload:**
```json
{
  "gameScores": {
    "logical": 85,
    "mathematical": 78,
    "pattern": 92,
    "problemSolving": 70,
    "technical": 88
  },
  "skillQuizAnswers": [
    {
      "questionId": 1,
      "answerId": "a"
    }
  ],
  "totalXP": 2450,
  "averageAccuracy": 78,
  "personalityTraits": {
    "analytical": 85,
    "detailOriented": 78,
    "teamPlayer": 88
  }
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "topCareers": [
      {
        "title": "Data Scientist",
        "matchPercentage": 92,
        "salary": "$90k - $140k",
        "growth": "+31%",
        "description": "Analyze data to drive business decisions",
        "requiredSkills": ["Python", "Statistics", "Machine Learning"],
        "education": "Bachelor's in Computer Science or related"
      },
      {
        "title": "Software Engineer",
        "matchPercentage": 88,
        "salary": "$95k - $150k",
        "growth": "+25%",
        "description": "Build innovative software solutions"
      }
    ],
    "strengths": [
      {
        "skill": "Pattern Recognition",
        "score": 92,
        "description": "Excellent visual and abstract thinking"
      }
    ],
    "weaknesses": [
      {
        "skill": "Problem Solving",
        "score": 70,
        "description": "Room for improvement in complex scenarios"
      }
    ],
    "readinessScore": 78,
    "recommendations": {
      "courses": [
        "Advanced Data Structures",
        "Machine Learning Fundamentals"
      ],
      "skillsToDevelop": [
        "Public Speaking",
        "Strategic Planning"
      ],
      "nextSteps": [
        "Build portfolio projects",
        "Network with industry professionals"
      ]
    }
  }
}
```

---

### 5. Skill Quiz Submission

**Endpoint:** `POST /api/skill-quiz/submit`

**Purpose:** Submit skill assessment questionnaire answers

**Request Payload:**
```json
{
  "answers": {
    "1": "a",
    "2": "b",
    "3": "a",
    "4": "c",
    "5": "b",
    "6": "a",
    "7": "a",
    "8": "b"
  },
  "completedAt": "2026-01-05T10:30:00Z"
}
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "quizId": "uuid",
    "personalityProfile": {
      "analytical": 85,
      "detailOriented": 78,
      "teamPlayer": 88,
      "selfMotivated": 82,
      "adaptable": 75
    }
  }
}
```

---

### 6. Leaderboard Endpoint

**Endpoint:** `GET /api/leaderboard`

**Purpose:** Get global leaderboard rankings

**Query Parameters:**
- `type` (optional): `"global"` | `"weekly"` | `"monthly"` (default: "global")
- `limit` (optional): Number of entries (default: 10)
- `offset` (optional): Pagination offset

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "userId": "uuid",
        "name": "Alex T.",
        "totalXP": 2850,
        "level": 14,
        "avatar": "🏆",
        "badges": ["Quick Thinker", "Math Wizard"]
      }
    ],
    "userRank": {
      "rank": 4,
      "totalXP": 2450,
      "level": 12
    },
    "pagination": {
      "total": 1000,
      "limit": 10,
      "offset": 0
    }
  }
}
```

---

### 7. User Authentication Endpoints

**Note:** Authentication is not yet implemented in the frontend. The following endpoints are recommended:

#### 7.1 Register
**Endpoint:** `POST /api/auth/register`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "age": 22,
  "education": "Bachelor's"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt_token_here",
    "refreshToken": "refresh_token_here"
  }
}
```

#### 7.2 Login
**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt_token_here",
    "refreshToken": "refresh_token_here"
  }
}
```

#### 7.3 Get Current User
**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "level": 12,
    "totalXP": 2450
  }
}
```

---

## Game Data Collected (ML Features)

The following metrics are collected from each game session for ML model training:

| Metric | Type | Description | Used For |
|--------|------|-------------|----------|
| `accuracy` | number (0-100) | Correct answers / Total questions | Skill level assessment |
| `timeTaken` | number (seconds) | Total time spent on game | Processing speed |
| `avgTimePerQuestion` | number (seconds) | Average time per question | Cognitive speed |
| `difficultyLevel` | string | Easy/Medium/Hard/Expert | Adaptive difficulty |
| `streak` | number | Consecutive correct answers | Consistency measure |
| `retryCount` | number | Number of retries (Math game) | Persistence indicator |
| `skipsUsed` | number | Questions skipped (Math game) | Decision-making pattern |
| `xpEarned` | number | Experience points | Engagement metric |
| `score` | number | Calculated game score | Overall performance |
| `gameType` | string | Type of game played | Skill category mapping |

---

## Gamification System

### XP & Leveling
- **XP Calculation:** Base points vary by difficulty:
  - Easy: 10 points base
  - Medium: 20 points base
  - Hard: 30 points base
  - Expert: 50 points base
- **Time Bonus:** `Math.max(0, (timePerQuestion - timeTaken) / 2)`
- **Streak Bonus:** `streak * 5`
- **XP Earned:** `Math.floor(points / 2)`
- **Level Calculation:** `Level = Math.floor(totalXP / 200)`

### Badges System
Badges are unlocked based on achievements:
- **Quick Thinker:** Complete game in under 2 minutes
- **Pattern Master:** Score 90+ in Pattern Recognition
- **Math Wizard:** Score 90+ in Mathematical Thinking
- **Problem Solver:** Score 90+ in Problem Solving
- **Tech Expert:** Score 90+ in Technical Knowledge
- **Perfect Score:** 100% accuracy in any game
- **Streak Master:** Achieve 10+ streak
- **Speed Demon:** Average < 10s per question

### Streaks
- Streak increments on correct answers
- Streak resets on incorrect answer or timeout
- Streak bonus applies to score calculation

---

## UI Components Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx          # Page wrapper with Navbar
│   │   └── Navbar.tsx           # Navigation header
│   ├── games/
│   │   ├── GameTimer.tsx        # Countdown timer component
│   │   ├── GameScore.tsx        # Live score display
│   │   ├── GameProgress.tsx     # Question progress bar
│   │   └── GameResults.tsx      # End-game results display
│   ├── cards/
│   │   ├── FeatureCard.tsx      # Feature showcase cards
│   │   ├── StatCard.tsx         # Statistics display
│   │   └── ProgressCard.tsx     # Progress tracking cards
│   ├── charts/
│   │   ├── SkillsRadar.tsx      # Radar chart for skills
│   │   └── CareerMatch.tsx      # Career match visualization
│   ├── quiz/
│   │   ├── QuizQuestion.tsx     # Quiz question component
│   │   └── QuizProgress.tsx     # Quiz progress indicator
│   └── ui/                      # shadcn/ui components (50+ components)
└── pages/
    ├── games/
    │   ├── LogicalReasoning.tsx
    │   ├── MathematicalThinking.tsx
    │   ├── PatternRecognition.tsx
    │   ├── ProblemSolving.tsx
    │   ├── TechnicalKnowledge.tsx
    │   └── CareerQuest.tsx
    └── [Other pages...]
```

---

## State Management

### React Query
Used for server state management:
- Automatic caching
- Background refetching
- Optimistic updates
- Error handling

### Local State
- Game state (current question, score, timer)
- Form state (quiz answers)
- UI state (modals, toasts)

---

## Authentication Requirements

**Current Status:** Not implemented

**Recommended Implementation:**
1. **JWT Token-based Authentication**
   - Access token (short-lived, 15 minutes)
   - Refresh token (long-lived, 7 days)
   - Token stored in `localStorage` or `httpOnly` cookies

2. **Protected Routes**
   - Dashboard, Games, Results pages require authentication
   - Redirect to login if not authenticated

3. **API Request Headers**
   ```
   Authorization: Bearer <jwt_token>
   ```

4. **Token Refresh**
   - Automatic refresh before expiration
   - Handle refresh token rotation

---

## Error Handling

### API Error Responses
All API endpoints should return consistent error format:

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {} // Optional additional details
}
```

### Frontend Error Handling
- Network errors: Toast notification
- 401 Unauthorized: Redirect to login
- 400 Bad Request: Show validation errors
- 500 Server Error: Show generic error message

---

## CORS Configuration

If backend is on different domain, configure CORS:

```
Access-Control-Allow-Origin: <frontend-domain>
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

---

## Development Setup

### Frontend Development Server
```bash
npm install
npm run dev
# Server runs on http://localhost:8080
```

### Vite Proxy Configuration (for local development)
Add to `vite.config.ts`:
```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000', // Backend URL
      changeOrigin: true,
    }
  }
}
```

---

## Environment Variables

Create `.env` file:
```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=CareerAI
```

---

## Testing Considerations

### Test Data Requirements
- Mock game results for testing
- Sample user profiles
- Test career predictions
- Leaderboard test data

### API Mocking
Frontend currently handles API failures gracefully (silent catch). For testing:
- Use MSW (Mock Service Worker) for API mocking
- Or provide test backend endpoints

---

## Performance Considerations

1. **Game Data:** Games use local state, no API calls during gameplay
2. **Results Submission:** Async submission, doesn't block UI
3. **Charts:** Recharts components are optimized for performance
4. **Images:** Lazy loading for game assets
5. **Code Splitting:** React Router handles route-based code splitting

---

## Security Considerations

1. **Input Validation:** Validate all user inputs on backend
2. **Rate Limiting:** Implement rate limiting for game submissions
3. **XSS Protection:** React automatically escapes content
4. **CSRF Protection:** Use CSRF tokens for state-changing operations
5. **Data Sanitization:** Sanitize all user-generated content

---

## Future Enhancements

1. **Real-time Leaderboard:** WebSocket support for live updates
2. **Social Features:** Share results, compare with friends
3. **Achievement System:** More badges and milestones
4. **Adaptive Difficulty:** ML-based difficulty adjustment
5. **Multiplayer Mode:** Competitive game sessions
6. **Analytics Dashboard:** Admin panel for insights

---

## Contact & Support

For questions or clarifications about the frontend implementation, please refer to:
- Component source code in `src/components/`
- Page implementations in `src/pages/`
- Type definitions in TypeScript files

---

**Document Version:** 1.0  
**Last Updated:** January 2026  
**Frontend Framework:** React 18 + Vite + TypeScript

