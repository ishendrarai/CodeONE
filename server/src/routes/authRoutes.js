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
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;
