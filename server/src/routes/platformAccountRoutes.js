/**
 * src/routes/platformAccountRoutes.js
 * Layer: Routes / HTTP Endpoints
 * Responsibility: Mounts /api/v1/platform-accounts endpoints for linking,
 *                 ownership challenge verification, and unlinking.
 * Interaction: Protected by authMiddleware and validationMiddleware; delegates to platformAccountController.
 */

const express = require('express');
const router = express.Router();
const platformAccountController = require('../controllers/platformAccountController');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');
const { platformAccountSchema } = require('../utils/validators');

router.use(authMiddleware);

router.get('/', platformAccountController.getAccounts);
router.post('/', validate(platformAccountSchema), platformAccountController.linkAccount);
router.post('/:id/verify', platformAccountController.verifyAccount);
router.delete('/:id', platformAccountController.unlinkAccount);

module.exports = router;

