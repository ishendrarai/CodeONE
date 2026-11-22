import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function TopicBars({ topics = [] }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      {topics.slice(0, 7).map((item) => (
        <div
          key={item.topic}
          className="p-3 rounded-lg border border-app-border bg-white hover:border-app-border-strong transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          {/* Left Info */}
          <div className="space-y-1 min-w-[200px]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-ink">{item.topic}</span>
              {item.isWeak && (
                <Badge variant="danger" size="xs">
                  Weak (sub-50%)
                </Badge>
              )}
              {item.isStrong && (
                <Badge variant="success" size="xs">
                  Strong
                </Badge>
              )}
            </div>
            <div className="text-[11px] font-mono text-ink-muted">
              {item.solvedCount} solved of {item.totalAttempts} attempts ({item.accuracy}% AC)
            </div>
          </div>

          {/* Right Progress bar & action */}
          <div className="flex items-center gap-4 flex-1 max-w-sm">
            <div className="w-full h-2 bg-app-bg border border-app-border rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  item.isWeak
                    ? 'bg-verdict-wa'
                    : item.isStrong
                    ? 'bg-verdict-ac'
                    : 'bg-accent'
                }`}
                style={{ width: `${item.accuracy}%` }}
              />
            </div>

            {item.isWeak && (
              <Button
                size="sm"
                variant="subtle"
                onClick={() => navigate(`/problems?search=${encodeURIComponent(item.topic)}`)}
                className="shrink-0 text-[11px] h-6 px-2"
              >
                Practice
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
