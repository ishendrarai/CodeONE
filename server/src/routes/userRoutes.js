/**
 * src/routes/userRoutes.js
 * Layer: Routes / HTTP Endpoints
 * Responsibility: Mounts /api/v1/users endpoints for user profile and settings.
 * Interaction: Protected by authMiddleware; delegates to userController.
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/me', userController.getMe);
router.patch('/me', userController.updateMe);

module.exports = router;
