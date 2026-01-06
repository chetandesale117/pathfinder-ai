# CareerAI Backend API

Backend API server for CareerAI - AI-Powered Career Recommendation Platform.

## Features

- ✅ User Authentication (JWT)
- ✅ Game Results Submission & History
- ✅ Dashboard Data Aggregation
- ✅ Career Prediction Algorithm
- ✅ Skill Quiz Assessment
- ✅ Leaderboard System
- ✅ Badge System
- ✅ XP & Leveling System

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (with Mongoose)
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn

## Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `MONGODB_URI` - MongoDB connection string
   - `JWT_SECRET` - Secret key for JWT tokens
   - `JWT_REFRESH_SECRET` - Secret key for refresh tokens
   - `PORT` - Server port (default: 3000)
   - `FRONTEND_URL` - Frontend URL for CORS

3. **Start MongoDB:**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env
   ```

4. **Run the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Games
- `POST /api/game/submit` - Submit game results (requires auth)
- `GET /api/game/history` - Get game history (requires auth)

### Dashboard
- `GET /api/dashboard` - Get dashboard data (requires auth)

### Career
- `POST /api/career/predict` - Get career predictions (requires auth)

### Skill Quiz
- `POST /api/skill-quiz/submit` - Submit skill quiz (requires auth)

### Leaderboard
- `GET /api/leaderboard` - Get leaderboard (requires auth)

## API Documentation

All endpoints follow the structure defined in `FRONTEND_SUMMARY.md`. See that file for detailed request/response formats.

## Database Schema

### User
- `name`, `email`, `password`
- `totalXP`, `level`
- `currentStreak`, `longestStreak`
- `badges[]` - Array of earned badges
- `age`, `education` (optional)

### Game
- `userId`, `gameType`
- `score`, `accuracy`, `timeTaken`
- `xpEarned`, `streak`
- `difficultyLevel`, `totalQuestions`, `correctAnswers`
- `completedAt`

### SkillQuiz
- `userId` (unique)
- `answers` - Map of question IDs to answers
- `personalityProfile` - Calculated traits
- `completedAt`

## Badge System

Badges are automatically unlocked based on game performance:
- **Quick Thinker** - Complete game in under 2 minutes
- **Pattern Master** - Score 90+ in Pattern Recognition
- **Math Wizard** - Score 90+ in Mathematical Thinking
- **Problem Solver** - Score 90+ in Problem Solving
- **Tech Expert** - Score 90+ in Technical Knowledge
- **Perfect Score** - 100% accuracy in any game
- **Streak Master** - Achieve 10+ streak
- **Speed Demon** - Average < 10s per question

## XP & Leveling

- **Level Calculation:** `Level = floor(totalXP / 200) + 1`
- **XP per Game:** Based on difficulty and performance
- **XP to Next Level:** `(level * 200) - totalXP`

## Career Prediction Algorithm

The career prediction uses weighted scoring:
1. Calculates match percentage for each career based on game scores
2. Analyzes strengths and weaknesses
3. Generates personalized recommendations
4. Calculates career readiness score

## Development

### Project Structure
```
backend/
├── src/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
├── .env.example         # Environment variables template
├── package.json
└── README.md
```

### Adding New Features

1. Create model in `src/models/`
2. Create routes in `src/routes/`
3. Add middleware if needed
4. Update this README

## Testing

Test endpoints using:
- **Postman** - API testing tool
- **curl** - Command line
- **Frontend** - Integrated with React app

Example:
```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Environment Variables

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/careerai
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:8080
```

## Security

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Rate limiting
- ✅ Input validation
- ✅ CORS configuration
- ✅ Error handling

## License

ISC

## Support

For issues or questions, refer to `FRONTEND_SUMMARY.md` for API specifications.

