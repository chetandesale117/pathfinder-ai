import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { connectDatabase } from './config/database.js';
import { RATE_LIMIT } from './config/constants.js';
import { handleError } from './utils/errorHandler.utils.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import gameRoutes from './routes/game.routes.js';
import gamesRoutes from './routes/games.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import careerRoutes from './routes/career.routes.js';
import skillQuizRoutes from './routes/skillQuiz.routes.js';
import leaderboardRoutes from './routes/leaderboard.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: RATE_LIMIT.windowMs,
  max: RATE_LIMIT.max,
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'CareerAI Backend API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes); // Game submission routes (protected)
app.use('/api/games', gamesRoutes); // Game questions routes (public)
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/skill-quiz', skillQuizRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Debug: Log all registered routes
console.log('📋 Registered routes:');
console.log('  POST /api/auth/register');
console.log('  POST /api/auth/login');
console.log('  GET  /api/auth/me');
console.log('  POST /api/game/submit');
console.log('  GET  /api/game/history');
console.log('  GET  /api/dashboard');
console.log('  POST /api/career/predict');
console.log('  POST /api/skill-quiz/submit');
console.log('  GET  /api/leaderboard');

// 404 handler (must be before error handler)
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    error: 'Route not found',
    code: 'NOT_FOUND',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handling middleware (must be last)
app.use(handleError);

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDatabase();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}/api`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
