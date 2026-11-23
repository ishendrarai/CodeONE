import { DEMO_USER } from './mockUser';
import { MOCK_SUBMISSIONS } from './mockSubmissions';
import { MOCK_PROBLEMS } from './mockProblems';
import { MOCK_CONTESTS } from './mockContests';
import { CANNED_RESPONSES, SUGGESTED_PROMPTS } from './mockCoach';
import { calculateStreakStats, computeYearlyHeatmap, computeTopicMastery, computeDifficultyStats } from '../lib/analytics';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchUserProfile() {
  await sleep(80);
  return { ...DEMO_USER };
}

export async function fetchSubmissions() {
  await sleep(100);
  return [...MOCK_SUBMISSIONS];
}

export async function fetchDashboardSummary() {
  await sleep(120);
  const streak = calculateStreakStats(MOCK_SUBMISSIONS);
  const heatmap = computeYearlyHeatmap(MOCK_SUBMISSIONS);
  const topics = computeTopicMastery(MOCK_SUBMISSIONS);
  const difficulty = computeDifficultyStats(MOCK_SUBMISSIONS);

  return {
    user: DEMO_USER,
    stats: {
      totalSolved: 979,
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      activeDaysYear: streak.activeDaysYear,
      thisWeekSolved: 14,
      globalRank: DEMO_USER.globalRank,
      percentile: DEMO_USER.percentile,
    },
    streak,
    heatmap,
    topics,
    difficulty,
    recentSubmissions: MOCK_SUBMISSIONS.slice(0, 6),
    upcomingContests: MOCK_CONTESTS.filter((c) => c.status === 'upcoming').slice(0, 3),
    platforms: DEMO_USER.platforms,
  };
}

export async function fetchProblems(filter = {}) {
  await sleep(90);
  let results = [...MOCK_PROBLEMS];

  if (filter.tab === 'upsolve') {
    results = results.filter((p) => p.isUpsolve);
  } else if (filter.tab === 'recommended') {
    results = results.filter((p) => p.status === 'unsolved' && p.rating >= 1500 && p.rating <= 1900);
  }

  if (filter.platform && filter.platform !== 'all') {
    results = results.filter((p) => p.platform === filter.platform);
  }

  if (filter.difficulty && filter.difficulty !== 'all') {
    results = results.filter((p) => p.difficulty.toLowerCase() === filter.difficulty.toLowerCase());
  }

  if (filter.search) {
    const q = filter.search.toLowerCase();
    results = results.filter((p) =>
      p.title.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return results;
}

export async function fetchContests() {
  await sleep(80);
  return [...MOCK_CONTESTS];
}

export async function fetchGoals() {
  await sleep(60);
  return [
    {
      id: 'g_daily',
      title: 'Daily Consistency',
      type: 'daily',
      target: 2,
      current: 2,
      period: 'Today',
      unit: 'problems',
      status: 'completed',
    },
    {
      id: 'g_weekly',
      title: 'Weekly Volume',
      type: 'weekly',
      target: 15,
      current: 11,
      period: 'This Week',
      unit: 'problems',
      status: 'active',
    },
    {
      id: 'g_upsolve',
      title: 'Upsolve Backlog',
      type: 'weekly',
      target: 4,
      current: 3,
      period: 'This Week',
      unit: 'contest problems',
      status: 'active',
    },
  ];
}

export async function fetchCoachResponse(promptKey) {
  await sleep(350);
  return CANNED_RESPONSES[promptKey] || CANNED_RESPONSES.solve_today;
}

export async function simulatePlatformVerification(platform, handle, verificationCode) {
  await sleep(600);
  return {
    success: true,
    platform,
    handle,
    verifiedAt: new Date().toISOString(),
    message: `Handle '${handle}' successfully verified on ${platform}!`,
  };
}
