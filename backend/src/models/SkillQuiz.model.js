import mongoose from 'mongoose';

const skillQuizSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // One quiz per user
    index: true
  },
  answers: {
    type: Map,
    of: String,
    required: true
  },
  personalityProfile: {
    analytical: { type: Number, default: 0 },
    detailOriented: { type: Number, default: 0 },
    teamPlayer: { type: Number, default: 0 },
    selfMotivated: { type: Number, default: 0 },
    adaptable: { type: Number, default: 0 }
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('SkillQuiz', skillQuizSchema);

