import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Code2, ShieldCheck } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (loginError) {
      setError(
        loginError.response?.data?.error?.message ||
          'Unable to sign in. Check your credentials and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white text-ink">
      {/* Left Form Column */}
      <div className="flex-1 flex flex-col justify-between p-8 sm:p-12 lg:p-16 max-w-xl mx-auto w-full">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-7 h-7 rounded-lg bg-ink flex items-center justify-center text-white">
              <Code2 size={15} />
            </div>
            <span className="font-bold text-sm tracking-tight text-ink">CodeONE</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-ink">Sign in to your account</h1>
            <p className="text-xs text-ink-secondary mt-1">
              Enter your credentials to access your unified competitive programming profile.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-2.5 rounded-lg bg-verdict-wa-bg border border-verdict-wa-border text-verdict-wa text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">Email address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@example.com"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-ink-secondary">Password</label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-accent hover:underline">
                  Forgot?
                </a>
              </div>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-ink-muted hover:text-ink"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                }
              />
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full" loading={loading}>
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-ink-secondary">
            Don't have an account?{' '}
            <Link to="/signup" className="text-accent font-semibold hover:underline">
              Create account
            </Link>
          </p>
        </div>

        <div className="pt-6 border-t border-app-border flex items-center justify-between text-[11px] font-mono text-ink-muted">
          <span>Secure sign-in</span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-verdict-ac" /> Zero Credential Sync
          </span>
        </div>
      </div>

      {/* Right Checked Grid Showcase Panel */}
      <div className="hidden lg:flex flex-1 bg-app-bg border-l border-app-border relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-60" />

        <div className="relative max-w-md w-full bg-white border border-app-border rounded-2xl shadow-modal p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-app-border pb-3">
            <span className="font-mono text-xs font-semibold text-ink">Global CP Radar</span>
            <span className="font-mono text-[10px] text-accent bg-accent-subtle px-1.5 py-0.5 rounded font-bold">
              Active
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-ink-secondary">Current Active Streak</span>
              <span className="font-bold text-ink">19 Days</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-ink-secondary">Verified Solved Volume</span>
              <span className="font-bold text-ink">979 Problems</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-ink-secondary">Peak Codeforces Rating</span>
              <span className="font-bold text-[#1890FF]">1,845</span>
            </div>
          </div>

          <div className="p-3 bg-app-bg rounded-lg border border-app-border text-[11px] text-ink-secondary leading-relaxed">
            "CodeONE automatically harmonized my Codeforces and AtCoder telemetry so I never lose streak momentum on rest days."
          </div>
        </div>
      </div>
    </div>
  );
}
