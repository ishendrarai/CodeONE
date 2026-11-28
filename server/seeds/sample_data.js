/**
 * seeds/sample_data.js
 * Layer: Database & Seeding
 * Responsibility: Development seed script populating initial algorithmic tags
 *                 and test users (4 roles: user, moderator, admin, auditor).
 * Interaction: Executed via `npm run seed --workspace=server`.
 */

const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('../src/utils/password');

const prisma = new PrismaClient();

const ALGORITHMIC_TAGS = [
  { name: 'array', category: 'Data Structures' },
  { name: 'dp', category: 'Dynamic Programming' },
  { name: 'graph', category: 'Algorithms' },
  { name: 'string', category: 'Data Structures' },
  { name: 'tree', category: 'Data Structures' },
  { name: 'binary-search', category: 'Algorithms' },
  { name: 'greedy', category: 'Algorithms' },
  { name: 'backtracking', category: 'Algorithms' },
  { name: 'sorting', category: 'Algorithms' },
  { name: 'hashing', category: 'Data Structures' },
  { name: 'math', category: 'Mathematics' },
  { name: 'bit-manipulation', category: 'Bit Manipulation' },
  { name: 'two-pointers', category: 'Algorithms' },
  { name: 'sliding-window', category: 'Algorithms' },
  { name: 'recursion', category: 'Algorithms' },
  { name: 'stack', category: 'Data Structures' },
  { name: 'queue', category: 'Data Structures' },
  { name: 'heap', category: 'Data Structures' },
  { name: 'trie', category: 'Data Structures' },
  { name: 'segment-tree', category: 'Advanced Data Structures' },
  { name: 'union-find', category: 'Advanced Data Structures' },
  { name: 'simulation', category: 'Implementation' },
  { name: 'geometry', category: 'Mathematics' },
];

const TEST_USERS = [
  {
    name: 'Test User',
    email: 'user@codeone.local',
    role: 'USER',
    emailVerified: true,
    settings: { timezone: 'Asia/Kolkata', theme: 'dark' },
  },
  {
    name: 'Test Moderator',
    email: 'moderator@codeone.local',
    role: 'MODERATOR',
    emailVerified: true,
    settings: { timezone: 'UTC', theme: 'dark' },
  },
  {
    name: 'Test Admin',
    email: 'admin@codeone.local',
    role: 'ADMIN',
    emailVerified: true,
    settings: { timezone: 'UTC', theme: 'dark' },
  },
  {
    name: 'Test Auditor',
    email: 'auditor@codeone.local',
    role: 'AUDITOR',
    emailVerified: true,
    settings: { timezone: 'UTC', theme: 'light' },
  },
];

async function seed() {
  console.log('=== Starting CodeONE Development Database Seeding ===');

  try {
    // 1. Seed Algorithmic Tags (idempotent)
    console.log(`Seeding ${ALGORITHMIC_TAGS.length} algorithmic tags...`);
    for (const tag of ALGORITHMIC_TAGS) {
      await prisma.tag.upsert({
        where: { name: tag.name },
        update: { category: tag.category },
        create: tag,
      });
    }

    // 2. Seed Test Users across all 4 RBAC roles (idempotent)
    console.log(`Seeding ${TEST_USERS.length} test users...`);
    const defaultPasswordHash = await hashPassword('CodeONE@Test123');
    for (const user of TEST_USERS) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {
          name: user.name,
          role: user.role,
          emailVerified: user.emailVerified,
        },
        create: {
          ...user,
          passwordHash: defaultPasswordHash,
        },
      });
    }

    console.log('=== Seeding completed successfully ===');
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seed();
}

module.exports = seed;
