/**
 * src/services/auditService.js
 * Layer: Services / Security & Compliance
 * Responsibility: Records append-only security and authorization audit events
 *                 (logins, failed auth, 403 denials, role modifications, account linking).
 * Interaction: Invoked across controllers, middleware, and services.
 */

const prisma = require('../config/database');

function logAuditEvent({
  userId = null,
  action,
  status = 'success',
  ipAddress = null,
  userAgent = null,
  metadata = {},
}) {
  void Promise.resolve()
    .then(() =>
      prisma.auditLog.create({
        data: {
          userId,
          actorRole: metadata.actorRole || (userId ? 'user' : 'anonymous'),
          action,
          resourceType: metadata.resourceType || 'authentication',
          resourceId: metadata.resourceId || null,
          ipAddress,
          userAgent,
          status,
          metadata,
        },
      })
    )
    .catch((err) => {
      console.error('[Audit Error] Failed to write security audit log:', err.message);
    });
}

async function logSecurityEvent({
  actorUserId = null,
  actorRole = 'anonymous',
  action,
  resourceType,
  resourceId = null,
  ipAddress = null,
  userAgent = null,
  status = 'success',
  metadata = {},
}) {
  const auditMetadata = { ...metadata, actorRole };
  if (resourceType) auditMetadata.resourceType = resourceType;
  if (resourceId) auditMetadata.resourceId = resourceId;
  return logAuditEvent({
    userId: actorUserId,
    action,
    status,
    ipAddress,
    userAgent,
    metadata: auditMetadata,
  });
}

module.exports = {
  logAuditEvent,
  logSecurityEvent,
};

