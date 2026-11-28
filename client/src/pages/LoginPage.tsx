import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OAuthButtons from '../components/auth/OAuthButtons';
import { Alert, AlertDescription, AlertTitle } from '../components/primitives/alert';
import { Button } from '../components/primitives/button';
import { Input } from '../components/primitives/input';
import { Label } from '../components/primitives/label';
import { useAuth } from '../context/AuthContext';
import { loginSchema, type LoginInput } from '../schemas/auth.schema';

export default function LoginPage() {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(location.state?.authError || '');
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginInput) => {
    setApiError('');
    try {
      await login(values);
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (error) {
      const message =
        (error as { response?: { data?: { error?: { message?: string } } } })?.response?.data
          ?.error?.message;
      setApiError(message || 'Unable to sign in. Check your credentials and try again.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-app-bg px-4 py-10">
      <section className="w-full max-w-md space-y-6 rounded-xl border border-app-border bg-white p-6 shadow-card sm:p-8">
        <header className="space-y-2 text-center">
          <Link to="/" className="text-sm font-bold tracking-tight text-ink">
            CodeONE
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Welcome back</h1>
          <p className="text-sm text-ink-secondary">Sign in to your CodeONE account.</p>
        </header>

        {apiError && (
          <Alert variant="destructive">
            <AlertTitle>Sign-in failed</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              {...register('email')}
            />
            {errors.email?.message && (
              <p className="text-sm text-red-600" role="alert">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                className="pr-10"
                {...register('password')}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-ink-muted hover:text-ink"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password?.message && (
              <p className="text-sm text-red-600" role="alert">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <LoaderCircle aria-hidden="true" className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <span className="w-full border-t border-app-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-xs text-ink-muted">Or continue with</span>
          </div>
        </div>

        <OAuthButtons />
        <p className="text-center text-sm text-ink-secondary">
          New to CodeONE?{' '}
          <Link className="font-medium text-accent hover:underline" to="/register">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
