import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="page-container">
      <h1 className="text-xl font-semibold text-text-primary mb-4">Profile</h1>
      <div className="card p-5">
        <p className="text-sm text-text-primary font-medium">{user?.name}</p>
        <p className="text-sm text-text-muted">{user?.email}</p>
        <p className="text-xs text-text-muted mt-2">Profile settings coming soon.</p>
      </div>
    </div>
  );
}
