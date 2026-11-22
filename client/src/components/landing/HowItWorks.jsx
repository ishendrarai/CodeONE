import React from 'react';
import Card from '../ui/Card';

const STEPS = [
  {
    step: '01',
    title: 'Create Your CodeONE Account',
    description: 'Quick sign-up with email and handle to establish your unified competitive programming identity.',
  },
  {
    step: '02',
    title: 'Zero-Credential Handle Verification',
    description: 'We generate a unique token. Paste it into your public Codeforces bio once to confirm ownership—no passwords ever required.',
  },
  {
    step: '03',
    title: 'Analyze, Upsolve & Level Up',
    description: 'Watch your global streak update automatically, get notified of upcoming contests, and train on topic weaknesses.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 bg-app-bg border-y border-app-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="mono-label">Simple Onboarding</span>
          <h2 className="text-3xl font-bold tracking-tight text-ink mt-2">
            How CodeONE works in three steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <Card key={s.step} className="p-6 relative bg-white">
              <span className="font-mono text-3xl font-bold text-ink-muted/30 absolute top-5 right-5">
                {s.step}
              </span>
              <div className="h-7 w-7 rounded-lg bg-ink text-white font-mono text-xs flex items-center justify-center font-bold mb-4">
                {s.step}
              </div>
              <h3 className="text-sm font-semibold text-ink mb-2">{s.title}</h3>
              <p className="text-xs text-ink-secondary leading-relaxed">{s.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
