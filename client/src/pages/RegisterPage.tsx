import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import OAuthButtons from '../components/auth/OAuthButtons';
import { Alert, AlertDescription, AlertTitle } from '../components/primitives/alert';
import { Button } from '../components/primitives/button';
import { Input } from '../components/primitives/input';
import { Label } from '../components/primitives/label';
import { useAuth } from '../context/AuthContext';
import { signupSchema, type SignupInput } from '../schemas/auth.schema';

function detectTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const { register: registerAccount } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      handle: '',
      password: '',
      confirmPassword: '',
      timezone: detectTimezone(),
    },
  });

  const onSubmit = async (values: SignupInput) => {
    setApiError('');
    try {
      await registerAccount(values);
      navigate('/onboarding', { replace: true });
    } catch (error) {
      const message =
        (error as { response?: { data?: { error?: { message?: string } } } })?.response?.data
          ?.error?.message;
      setApiError(message || 'Unable to create your account. Please try again.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-app-bg px-4 py-10">
      <section className="w-full max-w-md space-y-6 rounded-xl border border-app-border bg-white p-6 shadow-card sm:p-8">
        <header className="space-y-2 text-center">
          <Link to="/" className="text-sm font-bold tracking-tight text-ink">
            CodeONE
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Create your account</h1>
          <p className="text-sm text-ink-secondary">One account for your competitive programming journey.</p>
        </header>

        {apiError && (
          <Alert variant="destructive">
            <AlertTitle>Registration failed</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <input type="hidden" {...register('timezone')} />

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              {...register('name')}
            />
            {errors.name?.message && (
              <p className="text-sm text-red-600" role="alert">{errors.name.message}</p>
            )}
          </div>

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
            <Label htmlFor="handle">Username / handle</Label>
            <Input
              id="handle"
              autoComplete="username"
              aria-invalid={Boolean(errors.handle)}
              {...register('handle')}
            />
            {errors.handle?.message && (
              <p className="text-sm text-red-600" role="alert">{errors.handle.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              aria-invalid={Boolean(errors.confirmPassword)}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword?.message && (
              <p className="text-sm text-red-600" role="alert">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <LoaderCircle aria-hidden="true" className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <span className="w-full border-t border-app-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-2 text-xs text-ink-muted">Or sign up with</span>
          </div>
        </div>

        <OAuthButtons />
        <p className="text-center text-sm text-ink-secondary">
          Already have an account?{' '}
          <Link className="font-medium text-accent hover:underline" to="/login">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
