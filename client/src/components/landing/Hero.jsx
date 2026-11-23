import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Trophy, CheckCircle, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import GridBackground from '../layout/GridBackground';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 px-6 overflow-hidden">
      <GridBackground showHeroCells={true} />

      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Release Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-app-border bg-white text-xs font-mono mb-6 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-ink font-medium">CodeONE 1.0 Demo</span>
          <span className="text-ink-muted">•</span>
          <span className="text-ink-secondary">Unified CP Analytics</span>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink leading-[1.08] max-w-4xl mx-auto"
        >
          One unified profile for your entire competitive programming journey.
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-ink-secondary max-w-2xl mx-auto leading-relaxed"
        >
          Stop switching between 5 different tabs. Track verified streaks, diagnose topic weaknesses,
          manage an upsolve queue, and consult an AI coach—all from one cohesive light-theme workspace.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/dashboard">
            <Button size="lg" variant="primary" rightIcon={<ArrowRight size={16} />}>
              Explore Live Demo
            </Button>
          </Link>
          <Link to="/u/karan_cp">
            <Button size="lg" variant="secondary">
              View Public Card (@karan_cp)
            </Button>
          </Link>
        </motion.div>

        {/* Product Preview Floating Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 max-w-4xl mx-auto"
        >
          <div className="bg-white border border-app-border rounded-2xl shadow-modal p-6 text-left relative overflow-hidden">
            {/* Window Dots */}
            <div className="flex items-center justify-between pb-4 border-b border-app-border mb-5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E0]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E0]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E0]" />
              </div>
              <span className="font-mono text-[11px] text-ink-muted">codeone.io/dashboard</span>
              <div className="flex items-center gap-2">
                <Badge variant="accent" size="xs">Live Telemetry</Badge>
              </div>
            </div>

            {/* Quick Demo Preview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
              <div className="p-3 bg-app-bg border border-app-border rounded-xl">
                <p className="font-mono text-[10px] uppercase text-ink-muted">Current Streak</p>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="font-mono text-xl font-bold text-ink">19 Days</span>
                  <Flame size={14} className="text-amber-500 fill-amber-500" />
                </div>
              </div>
              <div className="p-3 bg-app-bg border border-app-border rounded-xl">
                <p className="font-mono text-[10px] uppercase text-ink-muted">Problems Solved</p>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="font-mono text-xl font-bold text-ink">979</span>
                  <span className="font-mono text-[11px] text-verdict-ac font-medium">+14 this wk</span>
                </div>
              </div>
              <div className="p-3 bg-app-bg border border-app-border rounded-xl">
                <p className="font-mono text-[10px] uppercase text-ink-muted">CF Rating</p>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="font-mono text-xl font-bold text-[#1890FF]">1,782</span>
                  <span className="font-mono text-[11px] text-ink-muted">CM Target</span>
                </div>
              </div>
              <div className="p-3 bg-app-bg border border-app-border rounded-xl">
                <p className="font-mono text-[10px] uppercase text-ink-muted">Next Contest</p>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="font-mono text-sm font-bold text-ink">In 4h 52m</span>
                  <span className="w-2 h-2 rounded-full bg-verdict-ac animate-ping" />
                </div>
              </div>
            </div>

            {/* Mini Heatmap Strip Preview */}
            <div className="p-3 bg-app-bg border border-app-border rounded-xl">
              <div className="flex items-center justify-between text-xs font-mono text-ink-muted mb-2">
                <span>365-Day Combined Heatmap (Codeforces + AtCoder)</span>
                <span className="text-ink font-semibold">214 Active Days</span>
              </div>
              <div className="flex gap-1 overflow-hidden h-7 items-center opacity-90">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 rounded-[2px]"
                    style={{
                      backgroundColor:
                        i % 5 === 0
                          ? '#0052FF'
                          : i % 3 === 0
                          ? '#93BAFF'
                          : i % 2 === 0
                          ? '#D4E2FF'
                          : '#EDEDEA',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
