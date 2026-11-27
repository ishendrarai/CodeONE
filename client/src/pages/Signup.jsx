import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Code2, ShieldCheck } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({ name, email, password });
      navigate('/onboarding');
    } catch (registrationError) {
      setError(
        registrationError.response?.data?.error?.message ||
          'Unable to create your account. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white text-ink">
      <div className="flex-1 flex flex-col justify-between p-8 sm:p-12 lg:p-16 max-w-xl mx-auto w-full">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-7 h-7 rounded-lg bg-ink flex items-center justify-center text-white">
              <Code2 size={15} />
            </div>
            <span className="font-bold text-sm tracking-tight text-ink">CodeONE</span>
          </Link>

          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-ink">Create your CodeONE account</h1>
            <p className="text-xs text-ink-secondary mt-1">
              Join the unified intelligence layer for competitive programmers.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-3.5">
            {error && (
              <div className="p-2.5 rounded-lg bg-verdict-wa-bg border border-verdict-wa-border text-verdict-wa text-xs">
                {error}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">Full Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Karan Sharma"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">College Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="karan@iiit.ac.in"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-secondary mb-1">Password</label>
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

            <Button type="submit" variant="primary" size="md" className="w-full mt-2" loading={loading}>
              Create Account & Connect Platforms
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-ink-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-accent font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <div className="pt-6 border-t border-app-border flex items-center justify-between text-[11px] font-mono text-ink-muted">
          <span>Secure account registration</span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-verdict-ac" /> Protected session
          </span>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-app-bg border-l border-app-border relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-60" />

        <div className="relative max-w-md w-full bg-white border border-app-border rounded-2xl shadow-modal p-6 space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-bold">Onboarding Flow</span>
          <h3 className="text-base font-bold text-ink">3-Minute Zero-Credential Setup</h3>
          <ul className="space-y-2.5 text-xs text-ink-secondary">
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-ink text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">1</span>
              <span>Pick your competitive programming platforms.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-ink text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">2</span>
              <span>Enter your public handle (e.g. Codeforces, AtCoder).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-ink text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">3</span>
              <span>Paste verification code to your profile bio to authenticate.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
