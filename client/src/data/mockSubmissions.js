import { subDays, format, isSameDay } from 'date-fns';

const TOPICS = [
  'Dynamic Programming',
  'Graphs',
  'Binary Search',
  'Trees',
  'Greedy',
  'Number Theory',
  'Combinatorics',
  'Strings',
  'Bit Manipulation',
  'Disjoint Set Union',
  'Shortest Paths',
];

const LANGUAGES = ['C++20', 'C++17', 'Python 3', 'Java'];
const VERDICTS = ['AC', 'AC', 'AC', 'AC', 'AC', 'WA', 'TLE']; // 71% AC rate
const PLATFORMS = ['codeforces', 'codeforces', 'atcoder'];

// Seeded pseudorandom generator for deterministic, consistent data
function seededRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function generate365Submissions() {
  const submissions = [];
  const now = new Date();
  let subId = 1000;

  // We want an active current streak of ~19 days, meaning every day from (now - 18 days) to now has at least 1-4 AC submissions
  // And throughout the year, ~220 active days out of 365
  for (let daysAgo = 364; daysAgo >= 0; daysAgo--) {
    const date = subDays(now, daysAgo);
    const dayOfWeek = date.getDay(); // 0 is Sun, 6 is Sat
    const seed = daysAgo * 13 + dayOfWeek;
    const rand = seededRandom(seed);

    let count = 0;
    // Guarantee streak for last 19 days
    if (daysAgo <= 18) {
      count = Math.floor(seededRandom(seed * 7) * 4) + 1; // 1 to 4 submissions
    } else if (daysAgo === 19) {
      // Small gap 20 days ago to bound current streak
      count = 0;
    } else {
      // Normal probability throughout the year
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const activeThreshold = isWeekend ? 0.35 : 0.42;
      if (rand > activeThreshold) {
        count = Math.floor(rand * 5) + 1;
      }
    }

    for (let i = 0; i < count; i++) {
      const subRand = seededRandom(seed + i * 101);
      const verdict = VERDICTS[Math.floor(seededRandom(seed + i * 53) * VERDICTS.length)];
      const topic = TOPICS[Math.floor(seededRandom(seed + i * 29) * TOPICS.length)];
      const lang = LANGUAGES[Math.floor(seededRandom(seed + i * 37) * LANGUAGES.length)];
      const platform = PLATFORMS[Math.floor(seededRandom(seed + i * 41) * PLATFORMS.length)];
      
      let difficulty = 'Medium';
      let rating = 1400 + Math.floor(seededRandom(seed + i * 79) * 600);
      if (rating < 1300) difficulty = 'Easy';
      else if (rating >= 1800) difficulty = 'Hard';

      const executionTime = Math.floor(subRand * 250) + 15;
      const memoryKb = Math.floor(subRand * 16384) + 1024;

      submissions.push({
        id: `sub_${subId++}`,
        problemId: `${platform}_${1000 + (subId % 200)}`,
        problemTitle: getProblemName(topic, subId % 200),
        platform,
        verdict,
        topic,
        difficulty,
        rating,
        language: lang,
        executionTimeMs: executionTime,
        memoryKb,
        timestamp: date.toISOString(),
      });
    }
  }

  return submissions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

function getProblemName(topic, index) {
  const titles = [
    'Tree Distances II',
    'Subarray Sums Divisible by K',
    'Flight Routes Check',
    'Removal Game',
    'Counting Towers',
    'Planets Queries I',
    'Array Description',
    'Money Sums',
    'Coin Collector',
    'Hamiltonian Flights',
    'Distinct Routes',
    'Polynomial Queries',
    'Dynamic Range Sum Queries',
    'Subtree Queries',
    'Path Queries II',
    'Distinct Colors',
    'Forest Queries II',
    'Prefix Sum Additions',
    'Bitwise Queries',
    'Shortest Subsequence',
  ];
  return `${titles[index % titles.length]} (${topic.slice(0, 3)})`;
}

export const MOCK_SUBMISSIONS = generate365Submissions();
