/**
 * src/routes/authRoutes.js
 * Layer: Routes / HTTP Endpoints
 * Responsibility: Mounts /api/v1/auth endpoints for registration, login, refresh, logout, and OAuth.
 * Interaction: Binds authLimiter, validationMiddleware, and delegates to authController.
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authLimiter } = require('../middleware/rateLimiter');
const validate = require('../middleware/validationMiddleware');
const { registerSchema, loginSchema } = require('../utils/validators');
const configurePassport = require('../config/passport');
const { createOAuthState, validateOAuthState } = require('../middleware/oauthState');

const passport = configurePassport();

function requireOAuthConfiguration(provider) {
  return (req, res, next) => {
    const prefix = provider.toUpperCase();
    if (!process.env[`${prefix}_CLIENT_ID`] || !process.env[`${prefix}_CLIENT_SECRET`]) {
      return res.status(503).json({
        success: false,
        error: {
          code: 'OAUTH_NOT_CONFIGURED',
          message: `${provider} sign-in is not configured.`,
        },
      });
    }
    return next();
  };
}

router.post('/signup', authLimiter, validate(registerSchema), authController.signup);
router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/refresh', authLimiter, authController.refresh);
router.post('/logout', authLimiter, authController.logout);

router.get(
  '/google',
  authLimiter,
  requireOAuthConfiguration('google'),
  createOAuthState('google'),
  (req, res, next) =>
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      state: req.oauthState,
      session: false,
    })(req, res, next)
);
router.get(
  '/google/callback',
  authLimiter,
  requireOAuthConfiguration('google'),
  validateOAuthState('google'),
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL || process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=oauth`,
  }),
  authController.oauthComplete
);
router.get(
  '/github',
  authLimiter,
  requireOAuthConfiguration('github'),
  createOAuthState('github'),
  (req, res, next) =>
    passport.authenticate('github', {
      scope: ['user:email'],
      state: req.oauthState,
      session: false,
    })(req, res, next)
);
router.get(
  '/github/callback',
  authLimiter,
  requireOAuthConfiguration('github'),
  validateOAuthState('github'),
  passport.authenticate('github', {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL || process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=oauth`,
  }),
  authController.oauthComplete
);

module.exports = router;
