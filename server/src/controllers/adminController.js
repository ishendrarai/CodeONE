const prisma = require('../config/database');
const { logAuditEvent } = require('../services/auditService');

function pagination(query) {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(query.limit, 10) || 20));
  return { page, limit, skip: (page - 1) * limit };
}

function maskEmail(email) {
  const [name, domain] = email.split('@');
  if (!domain) return '***';
  return `${name.slice(0, Math.min(2, name.length))}***@${domain}`;
}

function adminError(message, statusCode, code) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  return error;
}

async function listUsers(req, res, next) {
  try {
    const { page, limit, skip } = pagination(req.query);
    const where = req.query.role ? { role: req.query.role } : {};
    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, role: true, createdAt: true, lastLogin: true },
      }),
      prisma.user.count({ where }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        users: users.map((user) => ({ ...user, email: maskEmail(user.email) })),
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      },
    });
  } catch (err) {
    return next(err);
  }
}

async function changeUserRole(req, res, next) {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const result = await prisma.$transaction(
      async (tx) => {
        const target = await tx.user.findUnique({ where: { id } });
        if (!target) throw adminError('User not found.', 404, 'NOT_FOUND');

        if (target.role === 'ADMIN' && role !== 'ADMIN') {
          const adminCount = await tx.user.count({ where: { role: 'ADMIN' } });
          if (adminCount <= 1) {
            throw adminError('The last administrator cannot be demoted.', 409, 'LAST_ADMIN');
          }
        }

        const updatedUser = await tx.user.update({ where: { id }, data: { role } });
        return { updatedUser, previousRole: target.role };
      },
      { isolationLevel: 'Serializable' }
    );
    const { updatedUser, previousRole } = result;

    void logAuditEvent({
      userId: req.user.id,
      action: 'ADMIN_ROLE_CHANGE',
      status: 'success',
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      metadata: {
        actorRole: req.user.role,
        resourceType: 'user',
        resourceId: updatedUser.id,
        targetUserId: updatedUser.id,
        previousRole,
        newRole: role,
      },
    });

    return res.status(200).json({
      success: true,
      data: { id: updatedUser.id, email: maskEmail(updatedUser.email), role: updatedUser.role },
    });
  } catch (err) {
    return next(err);
  }
}

async function listAuditLogs(req, res, next) {
  try {
    const { page, limit, skip } = pagination(req.query);
    const where = {
      ...(req.query.action ? { action: req.query.action } : {}),
      ...(req.query.status ? { status: req.query.status } : {}),
      ...(req.query.userId ? { userId: req.query.userId } : {}),
    };
    const [logs, total] = await prisma.$transaction([
      prisma.auditLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.auditLog.count({ where }),
    ]);
    return res.status(200).json({
      success: true,
      data: { logs, pagination: { page, limit, total, pages: Math.ceil(total / limit) } },
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { listUsers, changeUserRole, listAuditLogs };
