// Topic mastery horizontal bar chart component

export default function ProgressChart({ data = [] }) {
  const maxVal = Math.max(...data.map((d) => d.total || 1), 1);

  return (
    <div className="flex flex-col gap-2.5">
      {data.map(({ topic, solved, total }) => {
        const pct = Math.round((solved / total) * 100);
        const barW = Math.round((solved / maxVal) * 100);
        return (
          <div key={topic}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-text-primary">{topic}</span>
              <span className="text-xs text-text-muted">{solved}/{total}</span>
            </div>
            <div className="h-1.5 bg-surface-overlay rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${barW}%`,
                  background: pct >= 70 ? '#5145E5' : pct >= 40 ? '#8B83F0' : '#C5BFFB',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
