/**
 * src/components/profile/OwnershipChallengeModal.jsx
 * Layer: Frontend / Components / Profile
 * Responsibility: Modal presenting one-time verification challenge token for public-handle ownership verification.
 * Zero-Credential Policy: Never asks for third-party passwords or session cookies.
 */

import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

export default function OwnershipChallengeModal({
  isOpen,
  onClose,
  account,
  challengeCode = 'CODEONE-VERIFY-9F3A',
  onVerify,
  isVerifying,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(challengeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Verify Handle - ${account?.username || ''}`}>
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          To verify that you own this {account?.platform} profile without sharing credentials, place
          this verification code in your public profile field:
        </p>

        <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg font-mono text-sm">
          <span>{challengeCode}</span>
          <button
            onClick={handleCopy}
            className="text-xs text-primary font-semibold hover:underline"
          >
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Once updated on {account?.platform}, click confirm below to verify ownership.
        </p>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onVerify(challengeCode)} disabled={isVerifying}>
            {isVerifying ? 'Verifying...' : 'Confirm Verification'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

