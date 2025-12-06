'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { parseCSV, detectColumns, validateCSV, prepareLeads, type CSVParseResult, type ColumnMapping } from '@/lib/csv-parser';
import { apiClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [parseResult, setParseResult] = useState<CSVParseResult | null>(null);
  const [columnMapping, setColumnMapping] = useState<ColumnMapping | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (selectedFile: File) => {
    setError(null);
    setFile(selectedFile);

    try {
      // Parse CSV
      const result = await parseCSV(selectedFile);
      
      // Validate
      const validation = validateCSV(result);
      if (!validation.valid) {
        setError(validation.errors.join(', '));
        return;
      }

      setParseResult(result);

      // Auto-detect columns
      const detected = detectColumns(result.columns);
      setColumnMapping(detected);
    } catch (err) {
      setError('Failed to parse CSV file. Please check the format.');
      console.error(err);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      handleFileSelect(droppedFile);
    } else {
      setError('Please drop a valid CSV file');
    }
  };

  const handleStartEnrichment = async () => {
    if (!parseResult || !columnMapping) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Prepare leads data
      const leads = prepareLeads(parseResult.rows, columnMapping);

      // Create batch enrichment job
      const response = await apiClient.enrichBatch({
        leads,
        job_name: file?.name || 'CSV Upload',
      });

      if (response.success) {
        // Redirect to job details page
        router.push(`/dashboard/jobs/${response.data.job_id}`);
      } else {
        setError(response.error?.message || 'Failed to create enrichment job');
      }
    } catch (err) {
      setError('Failed to start enrichment. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Upload CSV</h1>
        <p className="text-muted-foreground">
          Upload your leads CSV file. We'll automatically detect columns and find verified emails.
        </p>
      </div>

      {/* Upload Section */}
      {!parseResult && (
        <div className="bg-card border border-border rounded-lg p-8">
          <div
            className={`dropzone ${isDragging ? 'active' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Drag & drop your CSV file here</h3>
            <p className="text-muted-foreground text-sm mb-4">or</p>
            <label className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-pointer">
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) handleFileSelect(selectedFile);
                }}
              />
              Choose File
            </label>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-destructive">Error</div>
                <div className="text-sm text-destructive/80">{error}</div>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <h4 className="font-medium mb-2">Requirements:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• CSV file with headers</li>
              <li>• First Name column</li>
              <li>• Last Name column</li>
              <li>• Company Domain/Website column</li>
              <li>• Max 10,000 rows per upload</li>
            </ul>
            <p className="text-xs text-muted-foreground mt-3">
              💡 <strong>Catch-all verification:</strong> Coming soon
            </p>
          </div>
        </div>
      )}

      {/* Column Mapping Section */}
      {parseResult && columnMapping && (
        <div className="space-y-6">
          {/* File Info */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">{file?.name}</h3>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{parseResult.totalRows.toLocaleString()} rows</span>
                  <span>{parseResult.columns.length} columns</span>
                  <span>{(file?.size || 0 / 1024).toFixed(2)} KB</span>
                </div>
              </div>
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Column Mapping */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-medium mb-4">Column Mapping</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  First Name <span className="text-destructive">*</span>
                </label>
                <select
                  className="w-full bg-input border border-border rounded-lg px-4 py-2"
                  value={columnMapping.firstName || ''}
                  onChange={(e) => setColumnMapping({ ...columnMapping, firstName: e.target.value })}
                >
                  <option value="">Select column...</option>
                  {parseResult.columns.map((col) => (
                    <option key={col.name} value={col.name}>
                      {col.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Name <span className="text-destructive">*</span>
                </label>
                <select
                  className="w-full bg-input border border-border rounded-lg px-4 py-2"
                  value={columnMapping.lastName || ''}
                  onChange={(e) => setColumnMapping({ ...columnMapping, lastName: e.target.value })}
                >
                  <option value="">Select column...</option>
                  {parseResult.columns.map((col) => (
                    <option key={col.name} value={col.name}>
                      {col.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Company Domain/Website <span className="text-destructive">*</span>
                </label>
                <select
                  className="w-full bg-input border border-border rounded-lg px-4 py-2"
                  value={columnMapping.domain || ''}
                  onChange={(e) => setColumnMapping({ ...columnMapping, domain: e.target.value })}
                >
                  <option value="">Select column...</option>
                  {parseResult.columns.map((col) => (
                    <option key={col.name} value={col.name}>
                      {col.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* CSV Preview */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-medium mb-4">Preview (First 5 Rows)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {parseResult.columns.map((col) => (
                      <th key={col.name} className="text-left p-2 font-medium text-muted-foreground">
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parseResult.rows.slice(0, 5).map((row, i) => (
                    <tr key={i} className="border-b border-border">
                      {parseResult.columns.map((col) => (
                        <td key={col.name} className="p-2 text-muted-foreground">
                          {row[col.name]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                setFile(null);
                setParseResult(null);
                setColumnMapping(null);
                setError(null);
              }}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleStartEnrichment}
              disabled={!columnMapping.firstName || !columnMapping.lastName || !columnMapping.domain || isProcessing}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Starting...' : 'Start Enrichment'}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-destructive">Error</div>
                <div className="text-sm text-destructive/80">{error}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
