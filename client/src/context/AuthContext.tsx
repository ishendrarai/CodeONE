import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getAccessToken, setAccessToken } from '../services/api';
import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../services/authService';
import { getCurrentUserProfile } from '../services/userService';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatarUrl?: string | null;
}

interface AuthCredentials {
  email: string;
  password: string;
}

interface RegistrationData extends AuthCredentials {
  name: string;
  handle?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AuthCredentials) => Promise<AuthUser>;
  register: (registrationData: RegistrationData) => Promise<AuthUser>;
  logout: () => Promise<void>;
  hydrateOAuthSession: () => Promise<AuthUser>;
}

interface SessionResponse {
  accessToken: string;
  user: AuthUser;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

let sessionRestorePromise: Promise<SessionResponse | null> | null = null;
const useMockAuth = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

function createMockSession(email: string, name: string): SessionResponse {
  return {
    accessToken: 'mock-access-token',
    user: {
      id: 'mock-user',
      name,
      email,
      role: 'USER',
      avatarUrl: null,
    },
  };
}

function isAuthUser(value: unknown): value is AuthUser {
  if (!value || typeof value !== 'object') return false;
  const user = value as Record<string, unknown>;
  return (
    typeof user.id === 'string' &&
    typeof user.name === 'string' &&
    typeof user.email === 'string'
  );
}

function parseSession(value: unknown): SessionResponse {
  if (!value || typeof value !== 'object') {
    throw new Error('Authentication response is missing session data.');
  }

  const session = value as Record<string, unknown>;
  if (typeof session.accessToken !== 'string' || !isAuthUser(session.user)) {
    throw new Error('Authentication response is missing a user or access token.');
  }

  return { accessToken: session.accessToken, user: session.user };
}

function restoreSessionOnce() {
  if (!sessionRestorePromise) {
    sessionRestorePromise = (async () => {
      try {
        const refreshed: unknown = await refreshSession();
        if (
          !refreshed ||
          typeof refreshed !== 'object' ||
          typeof (refreshed as Record<string, unknown>).accessToken !== 'string'
        ) {
          throw new Error('Refresh response is missing an access token.');
        }

        const token = (refreshed as { accessToken: string }).accessToken;
        const user: unknown = await getCurrentUserProfile();
        if (!isAuthUser(user)) {
          throw new Error('Current-user response is missing user data.');
        }

        return { accessToken: token, user };
      } catch (error) {
        setAccessToken(null);
        if ((error as { response?: { status?: number } })?.response?.status !== 401) {
          console.error('Unable to restore the CodeONE session.', error);
        }
        return null;
      } finally {
        sessionRestorePromise = null;
      }
    })();
  }

  return sessionRestorePromise;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setTokenState] = useState<string | null>(getAccessToken());
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(() => {
    setAccessToken(null);
    setTokenState(null);
    setUser(null);
  }, []);

  useEffect(() => {
    let active = true;
    const handleSessionExpired = () => clearSession();

    window.addEventListener('auth:session-expired', handleSessionExpired);

    if (useMockAuth) {
      setIsLoading(false);
      return () => {
        active = false;
        window.removeEventListener('auth:session-expired', handleSessionExpired);
      };
    }

    void restoreSessionOnce().then((session) => {
      if (!active) return;
      if (session) {
        setAccessToken(session.accessToken);
        setTokenState(session.accessToken);
        setUser(session.user);
      } else {
        clearSession();
      }
      setIsLoading(false);
    });

    return () => {
      active = false;
      window.removeEventListener('auth:session-expired', handleSessionExpired);
    };
  }, [clearSession]);

  const login = useCallback(async (credentials: AuthCredentials) => {
    try {
      const session = useMockAuth
        ? createMockSession(credentials.email, credentials.email.split('@')[0] || 'CodeONE User')
        : parseSession(await loginUser(credentials));
      setAccessToken(session.accessToken);
      setTokenState(session.accessToken);
      setUser(session.user);
      setIsLoading(false);
      return session.user;
    } catch (error) {
      clearSession();
      throw error;
    }
  }, [clearSession]);

  const register = useCallback(async (registrationData: RegistrationData) => {
    try {
      const session = useMockAuth
        ? createMockSession(registrationData.email, registrationData.name)
        : parseSession(
            await registerUser({
              name: registrationData.name,
              email: registrationData.email,
              password: registrationData.password,
            }),
          );
      setAccessToken(session.accessToken);
      setTokenState(session.accessToken);
      setUser(session.user);
      setIsLoading(false);
      return session.user;
    } catch (error) {
      clearSession();
      throw error;
    }
  }, [clearSession]);

  const logout = useCallback(async () => {
    try {
      if (!useMockAuth) {
        await logoutUser();
      }
    } finally {
      clearSession();
      setIsLoading(false);
    }
  }, [clearSession]);

  const hydrateOAuthSession = useCallback(async () => {
    const session = useMockAuth
      ? createMockSession('demo@codeone.local', 'CodeONE Demo')
      : await restoreSessionOnce();

    if (!session) {
      throw new Error('Unable to restore an authenticated session after OAuth sign-in.');
    }

    setAccessToken(session.accessToken);
    setTokenState(session.accessToken);
    setUser(session.user);
    setIsLoading(false);
    return session.user;
  }, []);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(user && accessToken),
      isLoading,
      login,
      register,
      logout,
      hydrateOAuthSession,
    }),
    [user, accessToken, isLoading, login, register, logout, hydrateOAuthSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
