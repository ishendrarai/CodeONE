/**
 * src/utils/validators.js
 * Layer: Utilities / Validation
 * Responsibility: Reusable Joi validation schemas for request bodies, queries, and parameters.
 * Interaction: Injected into validationMiddleware to protect route handlers from malformed input.
 */

const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().trim().max(100).required(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(8).max(128).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().required(),
});

const platformAccountSchema = Joi.object({
  platform: Joi.string().valid('codeforces', 'atcoder', 'codewars').required(),
  username: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .pattern(/^[a-zA-Z0-9_.-]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Handle may only contain letters, numbers, underscores, hyphens, and dots.',
    }),
});

const uuidParamSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

const verifyPlatformAccountSchema = Joi.object({
  verificationCode: Joi.string().trim().min(6).max(64).optional(),
  action: Joi.string().valid('initiate', 'verify').optional(),
  regenerate: Joi.boolean().optional(),
});

const syncLogsQuerySchema = Joi.object({
  platformAccountId: Joi.string().uuid().optional(),
  status: Joi.string()
    .valid(
      'pending',
      'running',
      'success',
      'partial',
      'failed',
      'rate_limited',
      'PENDING',
      'RUNNING',
      'COMPLETED',
      'FAILED'
    )
    .optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
});

const userProblemUpdateSchema = Joi.object({
  status: Joi.string().valid('solved', 'in_progress', 'review_later', 'todo'),
  notes: Joi.string().max(2000).allow('', null),
  isBookmarked: Joi.boolean(),
});

const goalSchema = Joi.object({
  type: Joi.string().valid('daily', 'weekly', 'monthly').required(),
  target: Joi.number().integer().positive().required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().min(Joi.ref('startDate')).required(),
});

const userProfileUpdateSchema = Joi.object({
  name: Joi.string().trim().min(1).max(100),
  avatarUrl: Joi.string().uri().allow(null, ''),
  settings: Joi.object({
    timezone: Joi.string().trim().max(64),
    theme: Joi.string().valid('light', 'dark', 'system'),
    dailyGoal: Joi.number().integer().min(1).max(50),
  }).unknown(true),
}).min(1);

module.exports = {
  registerSchema,
  loginSchema,
  platformAccountSchema,
  uuidParamSchema,
  verifyPlatformAccountSchema,
  syncLogsQuerySchema,
  userProblemUpdateSchema,
  goalSchema,
  userProfileUpdateSchema,
};
