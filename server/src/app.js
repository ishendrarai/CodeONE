/**
 * src/app.js
 * Layer: Application Core / Express Bootstrap
 * Responsibility: Configures Express middleware pipeline in deterministic security order:
 *                 helmet -> cors -> express.json -> requestLogger -> generalLimiter -> /api/v1 -> errorHandler.
 * Interaction: Exported for runtime server startup and Supertest integration test suites.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const requestLogger = require('./middleware/logger');
const { generalLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const configurePassport = require('./config/passport');

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS allowlist configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Body and Cookie parsers
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Observability and Rate limiting
app.use(requestLogger);
app.use('/api', generalLimiter);

// Passport OAuth initialization
const passport = configurePassport();
app.use(passport.initialize());

// Mount modular API under /api/v1
app.use('/api/v1', routes);

// Global centralized error handler (must be registered last)
app.use(errorHandler);

module.exports = app;
