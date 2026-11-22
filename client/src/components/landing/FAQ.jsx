import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Card from '../ui/Card';

const FAQS = [
  {
    q: 'How does CodeONE verify handle ownership without asking for passwords?',
    a: 'CodeONE operates under a strict Zero-Credential API Policy. When you link a handle (e.g. on Codeforces), we generate a temporary cryptographic challenge token. You paste this string into your public profile bio, click "Verify", and our server queries the public official API to confirm ownership. We never store or ask for third-party passwords.',
  },
  {
    q: 'Which platforms are connected in this demo version?',
    a: 'Codeforces (via official REST API) and AtCoder (via AtCoder Problems API) are fully active in this release. LeetCode and CodeChef are explicitly flagged as "Not connected - manual import planned" in compliance with platform terms of service.',
  },
  {
    q: 'How is the global streak calculated?',
    a: 'Your global streak is computed dynamically across all your verified platform accounts using a timezone-aware sliding window. If you solve at least one Accepted (AC) problem on either Codeforces or AtCoder on a calendar day, your global streak continues.',
  },
  {
    q: 'What is the Contest Upsolve Queue?',
    a: 'Whenever you participate in a contest and receive a Wrong Answer (WA) or Time Limit Exceeded (TLE) or leave a problem unattempted, CodeONE flags that problem in your Upsolve Queue. You can write personal editorial notes and track when you finally achieve an Accepted verdict.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="mono-label">Frequently Asked Questions</span>
        <h2 className="text-3xl font-bold tracking-tight text-ink mt-2">
          Everything you need to know about CodeONE
        </h2>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <Card
              key={idx}
              hover={false}
              className="p-5 cursor-pointer"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-ink">{faq.q}</h3>
                <ChevronDown
                  size={16}
                  className={`text-ink-muted transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-ink' : ''
                  }`}
                />
              </div>
              {isOpen && (
                <p className="mt-3 text-xs text-ink-secondary leading-relaxed pt-3 border-t border-app-border">
                  {faq.a}
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}
