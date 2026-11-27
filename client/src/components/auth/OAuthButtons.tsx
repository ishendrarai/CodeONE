import { Chrome, Github } from 'lucide-react';
import { getApiUrl } from '../../services/api';

export default function OAuthButtons() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <a
        href={getApiUrl('/auth/google')}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-app-border bg-white px-4 text-sm font-medium text-ink transition-colors hover:bg-app-hover"
      >
        <Chrome aria-hidden="true" className="h-4 w-4" />
        Continue with Google
      </a>
      <a
        href={getApiUrl('/auth/github')}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-app-border bg-white px-4 text-sm font-medium text-ink transition-colors hover:bg-app-hover"
      >
        <Github aria-hidden="true" className="h-4 w-4" />
        Continue with GitHub
      </a>
    </div>
  );
}
