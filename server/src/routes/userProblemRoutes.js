/**
 * src/routes/userProblemRoutes.js
 * Layer: Routes / HTTP Endpoints
 * Responsibility: Mounts /api/v1/user-problems endpoints for caller's problem states, bookmarks, and notes.
 * Interaction: Protected by authMiddleware and validationMiddleware; delegates to userProblemController.
 */

const express = require('express');
const router = express.Router();
const userProblemController = require('../controllers/userProblemController');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');
const { userProblemUpdateSchema } = require('../utils/validators');

router.use(authMiddleware);

router.get('/:problemId', userProblemController.getUserProblem);
router.patch('/:problemId', validate(userProblemUpdateSchema), userProblemController.updateUserProblem);

module.exports = router;

