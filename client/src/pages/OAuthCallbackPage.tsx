import { useEffect, useRef } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const useMockAuth = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

export default function OAuthCallbackPage() {
  const { hydrateOAuthSession } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const query = new URLSearchParams(location.search);
    const hash = new URLSearchParams(location.hash.replace(/^#/, ''));
    const authError = query.get('error') || hash.get('error');
    const authorizationCode = query.get('code');
    const hashAccessToken = hash.get('access_token');

    if (authError) {
      navigate('/login', {
        replace: true,
        state: { authError: query.get('error_description') || authError },
      });
      return;
    }

    if (!useMockAuth && !authorizationCode && !hashAccessToken && !query.has('state')) {
      navigate('/login', {
        replace: true,
        state: { authError: 'The identity provider returned an incomplete sign-in response.' },
      });
      return;
    }

    void hydrateOAuthSession()
      .then(() => navigate('/dashboard', { replace: true }))
      .catch(() =>
        navigate('/login', {
          replace: true,
          state: { authError: 'Unable to complete sign-in. Please try again.' },
        }),
      );
  }, [hydrateOAuthSession, location.hash, location.search, navigate]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-app-bg text-ink">
      <LoaderCircle aria-hidden="true" className="h-8 w-8 animate-spin text-accent" />
      <p className="text-sm text-ink-secondary" role="status">Completing sign-in…</p>
    </main>
  );
}
