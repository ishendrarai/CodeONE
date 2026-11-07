/**
 * src/components/problems/ProblemNoteModal.jsx
 * Layer: Frontend / Components / Problems
 * Responsibility: Modal allowing users to author and save personal notes (max 2000 chars) per problem.
 * Interaction: Invokes useUpdateUserProblem mutation on save.
 */

import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

export default function ProblemNoteModal({ isOpen, onClose, problem, initialNote = '', onSave }) {
  const [noteText, setNoteText] = useState(initialNote);

  const handleSave = () => {
    onSave(noteText);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Personal Notes - ${problem?.title || 'Problem'}`}>
      <div className="space-y-4">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          maxLength={2000}
          rows={6}
          placeholder="Document algorithm key insights, edge cases, or complexity proofs..."
          className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
        />
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>{noteText.length} / 2000 characters</span>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Notes</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

