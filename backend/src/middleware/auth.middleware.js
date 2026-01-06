import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { errorResponse } from '../utils/response.utils.js';
import { handleAsync } from '../utils/errorHandler.utils.js';

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to request
 */
export const authenticate = handleAsync(async (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse(res, 'No token provided', 'NO_TOKEN', 401);
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from database
  const user = await User.findById(decoded.userId).select('-password');
  
  if (!user) {
    return errorResponse(res, 'User not found', 'USER_NOT_FOUND', 401);
  }

  // Attach user to request
  req.user = user;
  next();
});

