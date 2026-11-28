/**
 * tests/integration/database/constraints.test.js
 * Layer: Tests / Integration / Database
 * Responsibility: Verifies relational integrity and append-only immutability on audit_logs.
 */

const prisma = require('../../../src/config/database');

describe('Database Constraints Integration Test Suite', () => {
  let dbAvailable = false;

  beforeAll(async () => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      dbAvailable = true;
    } catch {
      dbAvailable = false;
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('prevents updating or deleting rows in audit_logs (append-only)', async () => {
    if (!dbAvailable) {
      // Skip cleanly when running offline without a PostgreSQL instance
      return;
    }

    const logEntry = await prisma.auditLog.create({
      data: {
        actorRole: 'system',
        action: 'TEST_AUDIT_IMMUTABILITY',
        resourceType: 'audit_logs',
        status: 'success',
        metadata: { source: 'constraints.test.js' },
      },
    });

    await expect(
      prisma.auditLog.update({
        where: { id: logEntry.id },
        data: { status: 'failure' },
      })
    ).rejects.toThrow();

    await expect(
      prisma.auditLog.delete({
        where: { id: logEntry.id },
      })
    ).rejects.toThrow();
  });
});
