/**
 * src/config/database.js
 * Layer: Configuration / Persistence
 * Responsibility: Centralized singleton PrismaClient instance for PostgreSQL 15+.
 * Interaction: Exported for database queries across all domain services.
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

module.exports = prisma;
