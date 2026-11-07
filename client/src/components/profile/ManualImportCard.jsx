/**
 * src/components/profile/ManualImportCard.jsx
 * Layer: Frontend / Components / Profile
 * Responsibility: Fallback file upload UI for importing user-exported data (JSON/CSV)
 *                 from platforms whose Terms of Service restrict automated scraping.
 */

import React, { useState } from 'react';
import Button from '../common/Button';

export default function ManualImportCard({ onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    onUpload(selectedFile);
    setSelectedFile(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
        Manual Data Import Fallback
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        For platforms where automated scraping is prohibited by Terms of Service, upload your
        officially exported JSON or CSV files here.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
          type="file"
          accept=".json,.csv"
          onChange={handleFileChange}
          className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:opacity-90"
        />
        <Button onClick={handleUpload} disabled={!selectedFile} size="sm">
          Import Data
        </Button>
      </div>
    </div>
  );
}

