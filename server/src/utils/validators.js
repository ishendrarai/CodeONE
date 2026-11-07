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
  username: Joi.string().trim().max(100).required(),
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

module.exports = {
  registerSchema,
  loginSchema,
  platformAccountSchema,
  userProblemUpdateSchema,
  goalSchema,
};
