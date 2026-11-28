const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/rbacMiddleware');
const validate = require('../middleware/validationMiddleware');
const Joi = require('joi');

const userRoles = ['USER', 'MODERATOR', 'ADMIN', 'AUDITOR'];

router.use(authenticate, authorizeRoles('ADMIN'));

router.get(
  '/users',
  validate(
    Joi.object({
      role: Joi.string().valid(...userRoles),
      page: Joi.number().integer().min(1),
      limit: Joi.number().integer().min(1).max(100),
    }),
    'query'
  ),
  adminController.listUsers
);
router.patch(
  '/users/:id/role',
  validate(Joi.object({ id: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).required() }), 'params'),
  validate(Joi.object({ role: Joi.string().valid(...userRoles).required() })),
  adminController.changeUserRole
);
router.get('/audit-logs', adminController.listAuditLogs);

module.exports = router;
