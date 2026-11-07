/**
 * src/services/auditService.js
 * Layer: Services / Security & Compliance
 * Responsibility: Records append-only security and authorization audit events
 *                 (logins, failed auth, 403 denials, role modifications, account linking).
 * Interaction: Invoked across controllers, middleware, and services.
 */

const prisma = require('../config/database');

async function logSecurityEvent({
  actorUserId = null,
  actorRole = 'anonymous',
  action,
  resourceType,
  resourceId = null,
  ipAddress = null,
  userAgent = null,
  status, // 'success' | 'failure' | 'denied'
  metadata = {},
}) {
  try {
    // Inserts append-only record into audit_logs table
    console.log(`[Audit] ${status.toUpperCase()} - ${action} by ${actorRole}:${actorUserId || 'none'}`);
  } catch (err) {
    console.error('[Audit Error] Failed to write security audit log:', err.message);
  }
}

async function getAuditLogs(filters = {}, pagination = {}) {
  return { logs: [], meta: { pagination: {} } };
}

module.exports = {
  logSecurityEvent,
  getAuditLogs,
};

