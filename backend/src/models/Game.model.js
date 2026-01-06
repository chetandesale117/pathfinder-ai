import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  gameType: {
    type: String,
    required: true,
    enum: ['logical-reasoning', 'mathematical-thinking', 'pattern-recognition', 'problem-solving', 'technical-knowledge', 'career-quest']
  },
  score: {
    type: Number,
    required: true
  },
  accuracy: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  timeTaken: {
    type: Number, // in seconds
    required: true
  },
  xpEarned: {
    type: Number,
    required: true
  },
  difficultyLevel: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard', 'Expert', 'Mixed']
  },
  totalQuestions: {
    type: Number
  },
  correctAnswers: {
    type: Number
  },
  streak: {
    type: Number,
    default: 0
  },
  avgTimePerQuestion: {
    type: Number
  },
  skipsUsed: {
    type: Number,
    default: 0
  },
  completedAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Indexes for performance
gameSchema.index({ userId: 1, completedAt: -1 });
gameSchema.index({ gameType: 1, completedAt: -1 });

export default mongoose.model('Game', gameSchema);

