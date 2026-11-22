export const SUGGESTED_PROMPTS = [
  {
    id: 'solve_today',
    label: 'What should I solve today?',
    summary: 'Personalized 3-problem daily recommendation based on your recent 1600-1900 rated performance.',
  },
  {
    id: 'rating_drop',
    label: 'Why did my rating drop in Div. 2?',
    summary: 'Post-contest telemetry analysis of CF Round #983 highlighting Time-Limit-Exceeded on Problem C.',
  },
  {
    id: 'plan_30_days',
    label: 'Plan my next 30 days to reach Expert / 1900',
    summary: '4-week structured curriculum focused on Rerooting DP, DSU potentials, and contest speed pacing.',
  },
  {
    id: 'weakness_audit',
    label: 'Audit my weakest algorithmic topics',
    summary: 'Statistical scan of 400+ submissions across CF & AtCoder showing sub-40% AC on Tree DP.',
  },
];

export const CANNED_RESPONSES = {
  solve_today: {
    message: `Based on your recent performance (rating 1782, +48 in Round 984) and your current 19-day streak, you are in peak momentum. However, your submission logs show a 38% solve rate on **Tree Dynamic Programming** and **Rerooting DP** over the past month.

Here is your focused 3-problem set for today:

1. **Tree XOR (CF 1882D)** — *Rating 1900*  
   *Focus:* Rerooting DP technique. Practice pushing subtree contributions down to child nodes in O(N).
2. **Klever Permutation (CF 1927E)** — *Rating 1500*  
   *Focus:* Speed drill for Div. 2 Problem B/C parity and constructive math. Target completion under 18 minutes.
3. **Beautiful Path (AtCoder ABC 324F)** — *Rating 1950*  
   *Focus:* Binary search on answer combined with DAG longest path.

💡 **Pacing Tip:** Time yourself on Problem 1. If not solved in 35 minutes, outline the state equations on paper before writing code.`,
    dataUsed: [
      { metric: 'Current Codeforces Rating', value: '1782 (Peak: 1845)' },
      { metric: 'Target Milestone', value: 'Candidate Master (1900)' },
      { metric: 'Identified Weakness', value: 'Tree DP (38% AC rate over 24 submissions)' },
      { metric: 'Recent Momentum', value: '19 active streak days, 23 solved this week' },
      { metric: 'Average Solve Time (1600-1800)', value: '26 mins' },
    ],
  },
  rating_drop: {
    message: `I analyzed your contest logs from **Codeforces Round #983 (Div. 2)** where your rating dipped by **-32 points**:

### Root Cause Breakdown:
1. **Time Sink on Problem C (Trinity)**: You spent **48 minutes** on Problem C before receiving 2 Wrong Answers and a Time Limit Exceeded on test 14. Your initial approach used an $O(N^2)$ brute search over triplets instead of sorting and binary searching the upper bound in $O(N \\log N)$.
2. **Speed Penalty on A & B**: You took 19 minutes on Problem A due to an unnecessary edge-case overcomplication with zero-indexed offsets.
3. **Unattempted Problem D**: Problem D was an interactive query problem with a 41% success rate that matched your strong Bit Manipulation skills, but you had only 8 minutes remaining.

### Corrective Action:
- Implement a strict **25-minute cutoff rule**: if an approach has not produced a passing small-case test within 25 minutes, step back and re-read problem constraints for monotonic properties.
- Add Problem C to your **Upsolve Queue** to solidify the triangle inequality two-pointer scan.`,
    dataUsed: [
      { metric: 'Contest', value: 'Codeforces Round 983 (Div. 2)' },
      { metric: 'Rank in Contest', value: '1,890 / 14,200 participants' },
      { metric: 'Rating Delta', value: '-32 (1766 → 1734)' },
      { metric: 'Time spent on Problem C', value: '48m 12s (Result: TLE)' },
      { metric: 'Penalty Time', value: '84 minutes' },
    ],
  },
  plan_30_days: {
    message: `Here is a high-yield, 4-week roadmap calibrated to bridge your rating from **1782 to 1900+ (Candidate Master)**:

### 🗓️ Week 1: Tree Algorithms Mastery
- **Focus:** Binary Lifting, Subtree Queries, LCA, and Rerooting DP.
- **Quota:** 12 problems (Ratings 1700–1900).
- **Core Problem:** CSES Tree Distances I & II, CF 1882D.

### 🗓️ Week 2: Flow, Matching & Shortest Paths
- **Focus:** Dijkstra with state compression, Bellman-Ford cycle detection, 0-1 BFS.
- **Quota:** 10 problems + 1 Virtual Div. 2 contest under strict timer.

### 🗓️ Week 3: Advanced Data Structures
- **Focus:** Segment Tree with Lazy Propagation, Fenwick 2D, DSU with rollback / potentials.
- **Quota:** 12 problems (Ratings 1800–2000).

### 🗓️ Week 4: Contest Speed Pacing & Upsolving
- **Focus:** Live contest participation (CF Round 985 & Edu 171) + immediate upsolve of Problems C & D within 24 hours.

Target volume: **42 problems over 30 days**. Your daily goal of 2 problems per day will achieve this with 4 buffer rest days.`,
    dataUsed: [
      { metric: 'Starting Rating', value: '1782' },
      { metric: 'Goal Rating', value: '1900 (Candidate Master)' },
      { metric: 'Available Hours/Week', value: '14 hours' },
      { metric: 'Suggested Problem Difficulty', value: '1700 - 2000' },
      { metric: 'Weekly Virtual Contests', value: '1 per weekend' },
    ],
  },
  weakness_audit: {
    message: `According to your 480 verified submissions over the past 365 days, here is your statistical topic breakdown:

| Topic | Attempts | Solved | AC Rate | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Bit Manipulation** | 42 | 37 | **88.1%** | 🟢 Super Strength |
| **Greedy** | 68 | 56 | **82.4%** | 🟢 Very Strong |
| **Binary Search** | 54 | 41 | **75.9%** | 🟢 Strong |
| **Graphs / Shortest Paths** | 62 | 39 | **62.9%** | 🟡 Moderate |
| **Dynamic Programming** | 94 | 49 | **52.1%** | 🟡 Needs Attention |
| **Trees (Rerooting / DP)** | 32 | 12 | **37.5%** | 🔴 Critical Weakness |
| **Combinatorics / Math** | 28 | 10 | **35.7%** | 🔴 Critical Weakness |

### Action Item:
Shift 40% of your weekly practice from Greedy/Bitwise problems (where you are already comfortable) to **Tree DP and Modulo Combinatorics**.`,
    dataUsed: [
      { metric: 'Total Submissions Analyzed', value: '482 submissions' },
      { metric: 'Time Horizon', value: 'Past 365 days' },
      { metric: 'Lowest Success Topic', value: 'Tree DP (37.5%)' },
      { metric: 'Highest Success Topic', value: 'Bit Manipulation (88.1%)' },
    ],
  },
};
