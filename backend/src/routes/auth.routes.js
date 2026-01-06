import express from 'express';
import { body } from 'express-validator';
import { register, login, getMe } from '../controllers/auth.controller.js';
import { validate } from '../utils/validation.utils.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// Register
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().notEmpty(),
  body('age').optional().isInt({ min: 13, max: 100 }),
  body('education').optional().trim()
], validate, register);

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], validate, login);

// Get current user (protected)
router.get('/me', authenticate, getMe);

export default router;
