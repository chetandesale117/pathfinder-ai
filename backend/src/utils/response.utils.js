/**
 * Standardized response utilities
 */

export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

export const errorResponse = (res, error, code = 'ERROR', statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    error: error.message || error,
    code
  });
};

export const validationErrorResponse = (res, errors) => {
  return res.status(400).json({
    success: false,
    error: 'Validation failed',
    code: 'VALIDATION_ERROR',
    details: errors
  });
};

