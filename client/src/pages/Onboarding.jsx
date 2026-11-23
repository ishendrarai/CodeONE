import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ShieldCheck, Copy, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';

const PLATFORM_OPTIONS = [
  {
    id: 'codeforces',
    name: 'Codeforces',
    desc: 'Official REST API v1 • Instant contest & submission sync',
    active: true,
    color: '#1890FF',
  },
  {
    id: 'atcoder',
    name: 'AtCoder',
    desc: 'Via AtCoder Problems API • Submissions & rating progression',
    active: true,
    color: '#00C0C0',
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    desc: 'Manual JSON/CSV telemetry upload planned in Phase 2',
    active: false,
    color: '#FFA116',
    statusNote: 'Not connected - manual import planned',
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    desc: 'Manual submission export planned in Phase 2',
    active: false,
    color: '#5B4638',
    statusNote: 'Not connected - manual import planned',
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['codeforces', 'atcoder']);
  const [cfHandle, setCfHandle] = useState('karan_cf');
  const [atcHandle, setAtcHandle] = useState('karan_at');
  const [verificationCode, setVerificationCode] = useState('CODEONE-VERIFY-98A2-CF');
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  const togglePlatform = (id, active) => {
    if (!active) return;
    if (selectedPlatforms.includes(id)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== id));
    } else {
      setSelectedPlatforms([...selectedPlatforms, id]);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(verificationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-app-bg text-ink py-12 px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Progress Header */}
        <div className="mb-8 text-center">
          <span className="mono-label">Account Setup</span>
          <h1 className="text-2xl font-bold tracking-tight text-ink mt-1">Connect Your Platforms</h1>
          <p className="text-xs text-ink-secondary mt-1">
            Step {step} of 3: {step === 1 ? 'Select Platforms' : step === 2 ? 'Enter Handles' : 'Zero-Credential Verification'}
          </p>

          {/* Stepper Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step ? 'w-8 bg-ink' : s < step ? 'w-4 bg-verdict-ac' : 'w-4 bg-app-border-strong'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Select Platforms */}
        {step === 1 && (
          <Card className="p-6 space-y-4 bg-white">
            <h2 className="text-sm font-semibold text-ink">Choose competitive programming platforms</h2>
            <p className="text-xs text-ink-secondary">
              Select which platforms to aggregate into your unified CodeONE dashboard.
            </p>

            <div className="space-y-3 pt-2">
              {PLATFORM_OPTIONS.map((p) => {
                const isSelected = selectedPlatforms.includes(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => togglePlatform(p.id, p.active)}
                    className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                      !p.active
                        ? 'opacity-60 bg-app-bg cursor-not-allowed border-app-border'
                        : isSelected
                        ? 'border-ink bg-app-hover cursor-pointer'
                        : 'border-app-border bg-white hover:border-app-border-strong cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-ink">{p.name}</span>
                          {!p.active && (
                            <Badge variant="warning" size="xs">
                              {p.statusNote}
                            </Badge>
                          )}
                        </div>
                        <p className="text-[11px] text-ink-secondary mt-0.5">{p.desc}</p>
                      </div>
                    </div>

                    {p.active && (
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          isSelected ? 'bg-ink border-ink text-white' : 'border-app-border-strong'
                        }`}
                      >
                        {isSelected && <Check size={12} />}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                variant="primary"
                onClick={() => setStep(2)}
                disabled={selectedPlatforms.length === 0}
                rightIcon={<ArrowRight size={14} />}
              >
                Continue to Handles
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Enter Handles */}
        {step === 2 && (
          <Card className="p-6 space-y-4 bg-white">
            <h2 className="text-sm font-semibold text-ink">Enter your public handles</h2>
            <p className="text-xs text-ink-secondary">
              Provide your usernames. We only read public profiles and submissions.
            </p>

            <div className="space-y-4 pt-2">
              {selectedPlatforms.includes('codeforces') && (
                <div>
                  <label className="block text-xs font-semibold text-ink-secondary mb-1">
                    Codeforces Handle
                  </label>
                  <Input
                    value={cfHandle}
                    onChange={(e) => setCfHandle(e.target.value)}
                    placeholder="e.g. tourist"
                  />
                </div>
              )}

              {selectedPlatforms.includes('atcoder') && (
                <div>
                  <label className="block text-xs font-semibold text-ink-secondary mb-1">
                    AtCoder Username
                  </label>
                  <Input
                    value={atcHandle}
                    onChange={(e) => setAtcHandle(e.target.value)}
                    placeholder="e.g. chokudai"
                  />
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button variant="primary" onClick={() => setStep(3)} rightIcon={<ArrowRight size={14} />}>
                Proceed to Verify
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Zero-Credential Verification */}
        {step === 3 && (
          <Card className="p-6 space-y-4 bg-white">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-accent" />
              <h2 className="text-sm font-semibold text-ink">Verify Handle Ownership</h2>
            </div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              To prove you own handle <span className="font-mono font-bold text-ink">@{cfHandle}</span>,
              copy the one-time code below and paste it into your public profile bio on Codeforces.
            </p>

            {/* Code Box */}
            <div className="p-3 bg-app-bg border border-app-border rounded-xl flex items-center justify-between font-mono text-xs">
              <span className="font-bold text-ink">{verificationCode}</span>
              <Button size="sm" variant="secondary" onClick={handleCopyCode} leftIcon={<Copy size={12} />}>
                {copied ? 'Copied!' : 'Copy Code'}
              </Button>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
              <Sparkles size={14} className="shrink-0 mt-0.5 text-accent" />
              <span>
                Once added, click <strong>"Verify Profile"</strong>. CodeONE will query the official public API to detect this token.
              </span>
            </div>

            {verified && (
              <div className="p-3 bg-verdict-ac-bg border border-verdict-ac-border rounded-xl text-xs text-verdict-ac flex items-center gap-2">
                <Check size={15} />
                <span>Handle verified successfully! Telemetry ready for synchronization.</span>
              </div>
            )}

            <div className="pt-4 flex items-center justify-between">
              <Button variant="ghost" onClick={() => setStep(2)}>
                Back
              </Button>
              <div className="flex items-center gap-2">
                {!verified ? (
                  <Button
                    variant="accent"
                    onClick={handleSimulateVerify}
                    loading={verifying}
                    leftIcon={<RefreshCw size={12} />}
                  >
                    Verify Profile
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => navigate('/dashboard')} rightIcon={<ArrowRight size={14} />}>
                    Enter Dashboard
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
