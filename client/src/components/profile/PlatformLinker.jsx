/**
 * src/components/profile/PlatformLinker.jsx
 * Layer: Frontend / Components / Profile
 * Responsibility: Renders platform accounts list and handle linking forms across Priority 1/2 adapters.
 * Interaction: Invokes useLinkPlatformAccount and opens OwnershipChallengeModal.
 */

import React, { useState } from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Input from '../common/Input';
import OwnershipChallengeModal from './OwnershipChallengeModal';

export default function PlatformLinker({ accounts = [], onLink, onVerify, onUnlink }) {
  const [selectedPlatform, setSelectedPlatform] = useState('codeforces');
  const [username, setUsername] = useState('');
  const [activeChallengeAccount, setActiveChallengeAccount] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    onLink({ platform: selectedPlatform, username: username.trim() });
    setUsername('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
          Link Competitive Programming Account
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="p-2.5 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
          >
            <option value="codeforces">Codeforces (Official P1)</option>
            <option value="atcoder">AtCoder (via AtCoder Problems P2)</option>
            <option value="codewars">Codewars (Official v1 P2)</option>
          </select>
          <Input
            placeholder="Enter public handle / username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Link Account</Button>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
          Linked Accounts
        </h3>
        {accounts.length === 0 ? (
          <p className="text-sm text-gray-400">No accounts linked yet.</p>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {accounts.map((acc) => (
              <div key={acc.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm capitalize dark:text-white">
                      {acc.platformName}
                    </span>
                    <span className="text-xs text-gray-500">(@{acc.username})</span>
                    <Badge variant={acc.verificationStatus === 'verified' ? 'success' : 'warning'}>
                      {acc.verificationStatus}
                    </Badge>
                  </div>
                  {acc.rating && (
                    <span className="text-xs text-gray-400">Rating: {acc.rating}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  {acc.verificationStatus !== 'verified' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setActiveChallengeAccount(acc)}
                    >
                      Verify
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500"
                    onClick={() => onUnlink(acc.id)}
                  >
                    Unlink
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeChallengeAccount && (
        <OwnershipChallengeModal
          isOpen={!!activeChallengeAccount}
          onClose={() => setActiveChallengeAccount(null)}
          account={activeChallengeAccount}
          onVerify={(code) => {
            onVerify(activeChallengeAccount.id, code);
            setActiveChallengeAccount(null);
          }}
        />
      )}
    </div>
  );
}

