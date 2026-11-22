import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PlatformLinker from '../components/profile/PlatformLinker';
import ManualImportCard from '../components/profile/ManualImportCard';
import Badge from '../components/common/Badge';
import { User, Mail, Shield, Award } from 'lucide-react';

const INITIAL_DEMO_ACCOUNTS = [
  { id: '1', platform: 'leetcode', username: 'felix_dev', status: 'verified', rating: 2150, rank: 'Guardian' },
  { id: '2', platform: 'codeforces', username: 'felix_cf', status: 'verified', rating: 1842, rank: 'Candidate Master' },
  { id: '3', platform: 'atcoder', username: 'felix_at', status: 'unverified', rating: null, rank: null },
];

export default function Profile() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState(INITIAL_DEMO_ACCOUNTS);

  const handleLink = ({ platform, username }) => {
    const newAcc = {
      id: Date.now().toString(),
      platform,
      username,
      status: 'unverified',
      rating: null,
      rank: null,
    };
    setAccounts((prev) => [...prev, newAcc]);
  };

  const handleVerify = (accountId) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === accountId ? { ...acc, status: 'verified' } : acc))
    );
  };

  const handleUnlink = (accountId) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== accountId));
  };

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-text-primary">User Profile & Accounts</h1>
        <p className="text-sm text-text-secondary mt-0.5">
          Manage your personal identity, verified handles, and platform connections
        </p>
      </div>

      {/* Profile Card */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-accent text-white flex items-center justify-center text-xl font-bold">
              {user?.name?.slice(0, 2).toUpperCase() || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-text-primary">{user?.name || 'Developer'}</h2>
                <Badge variant="success">Active</Badge>
              </div>
              <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1.5">
                <Mail size={13} /> {user?.email || 'user@codeone.app'}
              </p>
              <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1.5">
                <Shield size={13} /> Role: {user?.role || 'User'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="accent">
              <Award size={12} className="inline mr-1" />
              {accounts.filter((a) => a.status === 'verified').length} Platforms Connected
            </Badge>
          </div>
        </div>
      </div>

      {/* Platform Linker */}
      <PlatformLinker
        accounts={accounts}
        onLink={handleLink}
        onVerify={handleVerify}
        onUnlink={handleUnlink}
      />

      {/* Manual Import Card */}
      <ManualImportCard
        onUpload={(file) => {
          alert(`File "${file.name}" uploaded successfully for offline parsing.`);
        }}
      />
    </div>
  );
}
