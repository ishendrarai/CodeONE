/**
 * src/middleware/validationMiddleware.js
 * Layer: Middleware / Validation
 * Responsibility: Joi schema validation factory for request body, query, and path parameters.
 * Interaction: Applied to route handlers to prevent malformed or invalid payloads.
 */

const { ERROR_CODES } = require('../utils/constants');

function validate(schema, source = 'body') {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((detail) => ({
        field: detail.path.join('.'),
        issue: detail.message.replace(/['"]/g, ''),
      }));

      return res.status(400).json({
        success: false,
        error: {
          code: ERROR_CODES.VALIDATION_ERROR,
          message: 'Invalid request data.',
          details,
        },
      });
    }

    req[source] = value;
    next();
  };
}

module.exports = validate;
