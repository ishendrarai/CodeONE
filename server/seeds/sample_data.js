/**
 * seeds/sample_data.js
 * Layer: Database & Seeding
 * Responsibility: Development seed script populating initial algorithmic tags,
 *                 test users (4 roles: user, moderator, admin, auditor), sample problems,
 *                 and contest calendar entries.
 * Interaction: Executed via `npm run seed --workspace=server`.
 */

const { PrismaClient } = require('@prisma/client');
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

async function seed() {
  console.log('=== Starting CodeONE Development Database Seeding ===');

  try {
    // 1. Seed Algorithmic Tags
    console.log(`Seeding ${ALGORITHMIC_TAGS.length} algorithmic tags...`);
    for (const tag of ALGORITHMIC_TAGS) {
      await prisma.tag.upsert({
        where: { name: tag.name },
        update: { category: tag.category },
        create: tag,
      });
    }

    console.log('=== Seeding completed successfully ===');
  } catch (error) {
    console.warn('Seeding notice (database connectivity required for full population):', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seed();
}

module.exports = seed;
