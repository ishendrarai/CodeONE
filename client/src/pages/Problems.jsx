import { useState, useMemo } from 'react';
import { Plus, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import ProblemFilter from '../components/problems/ProblemFilter';
import ProblemList   from '../components/problems/ProblemList';
import ProblemCard   from '../components/problems/ProblemCard';
import Button from '../components/common/Button';

// ─── Mock dataset ─────────────────────────────────────────────
const MOCK_PROBLEMS = [
  { id:1,  name:'Two Sum',                     platform:'leetcode',   difficulty:'easy',   status:'solved',    tags:['Array','Hash Map'],           lastSolved:'Nov 2, 2026'  },
  { id:2,  name:'Longest Palindromic Substring',platform:'leetcode',  difficulty:'medium', status:'solved',    tags:['String','DP'],                lastSolved:'Nov 1, 2026'  },
  { id:3,  name:'Trapping Rain Water',         platform:'leetcode',   difficulty:'hard',   status:'solved',    tags:['Array','Two Pointers','Stack'],lastSolved:'Oct 30, 2026' },
  { id:4,  name:'Codeforces 1900A',            platform:'codeforces', difficulty:'easy',   status:'solved',    tags:['Math','Greedy'],              lastSolved:'Oct 29, 2026' },
  { id:5,  name:'Codeforces 1900C',            platform:'codeforces', difficulty:'medium', status:'attempted', tags:['DP','Graphs'],                lastSolved:'Oct 28, 2026' },
  { id:6,  name:'Binary Tree Level Order',     platform:'leetcode',   difficulty:'medium', status:'solved',    tags:['Tree','BFS'],                 lastSolved:'Oct 27, 2026' },
  { id:7,  name:'Maximum Subarray',            platform:'codechef',   difficulty:'easy',   status:'solved',    tags:['Array','Kadane'],             lastSolved:'Oct 25, 2026' },
  { id:8,  name:'Edit Distance',               platform:'leetcode',   difficulty:'hard',   status:'unsolved',  tags:['String','DP'],                lastSolved:null           },
  { id:9,  name:'Merge K Sorted Lists',        platform:'leetcode',   difficulty:'hard',   status:'attempted', tags:['Linked List','Heap'],         lastSolved:'Oct 20, 2026' },
  { id:10, name:'Longest Common Subsequence',  platform:'codeforces', difficulty:'medium', status:'solved',    tags:['DP','String'],                lastSolved:'Oct 18, 2026' },
  { id:11, name:'Valid Parentheses',           platform:'leetcode',   difficulty:'easy',   status:'solved',    tags:['Stack','String'],             lastSolved:'Oct 15, 2026' },
  { id:12, name:'Number of Islands',           platform:'codechef',   difficulty:'medium', status:'solved',    tags:['DFS','BFS','Graph'],          lastSolved:'Oct 12, 2026' },
  { id:13, name:'Word Break',                  platform:'leetcode',   difficulty:'medium', status:'unsolved',  tags:['DP','Trie'],                  lastSolved:null           },
  { id:14, name:'Coin Change',                 platform:'codeforces', difficulty:'medium', status:'solved',    tags:['DP','BFS'],                   lastSolved:'Oct 10, 2026' },
  { id:15, name:'N-Queens',                    platform:'leetcode',   difficulty:'hard',   status:'unsolved',  tags:['Backtracking'],               lastSolved:null           },
];

const PAGE_SIZE = 10;

export default function Problems() {
  const [filters, setFilters] = useState({
    search: '', platform: 'All Platforms', difficulty: 'all', status: 'all', sort: 'Recent',
  });
  const [page, setPage]           = useState(1);
  const [notesProblem, setNotes]  = useState(null);

  const filtered = useMemo(() => {
    let list = [...MOCK_PROBLEMS];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (filters.platform !== 'All Platforms') {
      list = list.filter((p) => p.platform === filters.platform.toLowerCase().replace(' ', ''));
    }
    if (filters.difficulty !== 'all') {
      list = list.filter((p) => p.difficulty === filters.difficulty);
    }
    if (filters.status !== 'all') {
      list = list.filter((p) => p.status === filters.status);
    }
    return list;
  }, [filters]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (f) => { setFilters(f); setPage(1); };

  return (
    <div className="page-container">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">Problem Tracker</h1>
          <p className="text-sm text-text-secondary mt-0.5">
            Track, review, and annotate your solved problems
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" leftIcon={<RefreshCw size={13} />}>Sync</Button>
          <Button variant="primary" size="sm" leftIcon={<Plus size={13} />}>Add Problem</Button>
        </div>
      </div>

      {/* ── Filters ── */}
      <ProblemFilter
        filters={filters}
        onChange={handleFilter}
        totalCount={filtered.length}
      />

      {/* ── Table ── */}
      <ProblemList problems={paginated} onNotes={setNotes} />

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-text-muted">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="secondary" size="sm"
              leftIcon={<ChevronLeft size={13} />}
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >Prev</Button>
            <span className="px-3 text-sm text-text-secondary">
              {page} / {totalPages}
            </span>
            <Button
              variant="secondary" size="sm"
              rightIcon={<ChevronRight size={13} />}
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >Next</Button>
          </div>
        </div>
      )}

      {/* ── Notes drawer ── */}
      {notesProblem && (
        <ProblemCard problem={notesProblem} onClose={() => setNotes(null)} />
      )}
    </div>
  );
}
