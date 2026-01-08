import User from '../models/User.model.js';
import { generateToken, generateRefreshToken } from '../utils/jwt.utils.js';
import { AppError, handleAsync } from '../utils/errorHandler.utils.js';
import { successResponse, errorResponse } from '../utils/response.utils.js';

/**
 * Register a new user
 */
export const register = handleAsync(async (req, res) => {
  const { email, password, name, age, education } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return errorResponse(res, 'User already exists', 'USER_EXISTS', 409);
  }

  // Create user
  const user = new User({
    email,
    password,
    name,
    age,
    education
  });

  await user.save();

  // Generate tokens
  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  return successResponse(
    res,
    {
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      },
      token,
      refreshToken
    },
    'User registered successfully',
    201
  );
});

/**
 * Login user
 */
export const login = handleAsync(async (req, res) => {
  const { email, password } = req.body;

  // Find user and include password
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return errorResponse(res, 'Invalid email or password', 'INVALID_CREDENTIALS', 401);
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return errorResponse(res, 'Invalid email or password', 'INVALID_CREDENTIALS', 401);
  }

  // Generate tokens
  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  return successResponse(res, {
    user: {
      id: user._id,
      email: user.email,
      name: user.name
    },
    token,
    refreshToken
  }, 'Login successful');
});

/**
 * Get current user
 */
export const getMe = handleAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user) {
    return errorResponse(res, 'User not found', 'USER_NOT_FOUND', 404);
  }

  return successResponse(res, {
    id: user._id,
    email: user.email,
    name: user.name,
    level: user.level,
    totalXP: user.totalXP
  });
});

