const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting CodeONE Database Seed...');

  // Create Demo User
  const passwordHash = await bcrypt.hash('DemoPass123!', 10);
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@codeone.com' },
    update: {},
    create: {
      name: 'Felix Rivera',
      email: 'demo@codeone.com',
      passwordHash,
      handle: 'felix_dev',
      bio: 'Full-stack developer | Competitive programmer | Codeforces Candidate Master candidate',
      role: 'USER',
      emailVerified: true,
    },
  });

  console.log('✅ Created Demo User:', demoUser.email);

  // Link Platform Accounts
  await prisma.platformAccount.upsert({
    where: {
      userId_platformName: {
        userId: demoUser.id,
        platformName: 'leetcode',
      },
    },
    update: {},
    create: {
      userId: demoUser.id,
      platformName: 'leetcode',
      username: 'felix_dev',
      rating: 2150,
      rank: 'Guardian (Top 1%)',
      solvedCount: 842,
      lastSynced: new Date(),
    },
  });

  await prisma.platformAccount.upsert({
    where: {
      userId_platformName: {
        userId: demoUser.id,
        platformName: 'codeforces',
      },
    },
    update: {},
    create: {
      userId: demoUser.id,
      platformName: 'codeforces',
      username: 'felix_cf',
      rating: 1842,
      rank: 'Expert',
      solvedCount: 312,
      lastSynced: new Date(),
    },
  });

  console.log('✅ Created Linked Platform Accounts');

  // Create Problems
  const prob1 = await prisma.problem.upsert({
    where: {
      platform_problemId: {
        platform: 'leetcode',
        problemId: '5',
      },
    },
    update: {},
    create: {
      platform: 'leetcode',
      problemId: '5',
      title: 'Longest Palindromic Substring',
      difficulty: 'MEDIUM',
      url: 'https://leetcode.com/problems/longest-palindromic-substring/',
      acceptanceRate: 32.4,
    },
  });

  const prob2 = await prisma.problem.upsert({
    where: {
      platform_problemId: {
        platform: 'leetcode',
        problemId: '1',
      },
    },
    update: {},
    create: {
      platform: 'leetcode',
      problemId: '1',
      title: 'Two Sum',
      difficulty: 'EASY',
      url: 'https://leetcode.com/problems/two-sum/',
      acceptanceRate: 51.2,
    },
  });

  console.log('✅ Created Canonical Problems');

  // Create UserProblem record
  await prisma.userProblem.upsert({
    where: {
      userId_problemId: {
        userId: demoUser.id,
        problemId: prob1.id,
      },
    },
    update: {},
    create: {
      userId: demoUser.id,
      problemId: prob1.id,
      status: 'SOLVED',
      attempts: 2,
      solvedAt: new Date(),
      runtimeMs: 38,
      notes: "Expanded from center with two pointers. Time O(N^2), Space O(1).",
      keyInsight: "A palindrome can be expanded from its center. For a string of length N, there are 2N-1 centers.",
      algorithmNotes: "Iterate through each character as potential center; expand outwards.",
      personalTags: ['Must-Review', 'Interview-Prep', 'FAANG'],
    },
  });

  // Create Upcoming Contests
  const startTime = new Date(Date.now() + 2 * 3600 * 1000 + 14 * 60 * 1000); // 2 hours from now
  await prisma.contest.createMany({
    data: [
      {
        platform: 'leetcode',
        name: 'Weekly Contest 412',
        startTime,
        durationSeconds: 5400,
        url: 'https://leetcode.com/contest/',
      },
      {
        platform: 'codeforces',
        name: 'Codeforces Round #965 (Div. 2)',
        startTime,
        durationSeconds: 7200,
        url: 'https://codeforces.com/contests',
      },
      {
        platform: 'atcoder',
        name: 'AtCoder Beginner Contest 367',
        startTime,
        durationSeconds: 6000,
        url: 'https://atcoder.jp/contests',
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Created Contests');
  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

