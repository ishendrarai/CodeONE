/**
 * src/routes/goalRoutes.js
 * Layer: Routes / HTTP Endpoints
 * Responsibility: Mounts /api/v1/goals endpoints for managing coding targets.
 * Interaction: Protected by authMiddleware and validationMiddleware; delegates to goalController.
 */

const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');
const { goalSchema } = require('../utils/validators');

router.use(authMiddleware);

router.get('/', goalController.getGoals);
router.post('/', validate(goalSchema), goalController.createGoal);
router.patch('/:id', goalController.updateGoal);
router.delete('/:id', goalController.deleteGoal);

module.exports = router;

