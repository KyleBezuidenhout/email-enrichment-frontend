'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle, XCircle, AlertCircle, Download, RefreshCw, ArrowLeft } from 'lucide-react';
import { apiClient } from '@/lib/supabase';
import Link from 'next/link';

interface JobData {
  id: string;
  job_name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  total_leads: number;
  valid_count: number;
  catch_all_count: number;
  invalid_count: number;
  created_at: string;
  completed_at?: string;
  error_message?: string;
}

interface Result {
  first_name: string;
  last_name: string;
  domain: string;
  email?: string;
  status?: string;
  confidence?: number;
  [key: string]: any; // For additional columns
}

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;

  const [job, setJob] = useState<JobData | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobData = async () => {
    try {
      const response = await apiClient.getJob(jobId);
      
      if (response.success) {
        setJob(response.data.job);
        if (response.data.results) {
          setResults(response.data.results);
        }
        setError(null);
      } else {
        setError(response.error?.message || 'Failed to fetch job data');
      }
    } catch (err) {
      setError('Failed to fetch job data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobData();

    // Poll for updates if job is still processing
    const interval = setInterval(() => {
      if (job?.status === 'processing' || job?.status === 'pending') {
        fetchJobData();
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [jobId, job?.status]);

  const handleExport = (filter: 'all' | 'valid' | 'catch-all' | 'invalid') => {
    let filteredResults = results;

    if (filter === 'valid') {
      filteredResults = results.filter(r => r.status === 'valid');
    } else if (filter === 'catch-all') {
      filteredResults = results.filter(r => r.status === 'catch-all');
    } else if (filter === 'invalid') {
      filteredResults = results.filter(r => r.status === 'invalid' || !r.email);
    }

    // Convert to CSV
    const headers = Object.keys(filteredResults[0] || {});
    const csvContent = [
      headers.join(','),
      ...filteredResults.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape commas and quotes
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${job?.job_name || 'results'}_${filter}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Error Loading Job</h2>
        <p className="text-muted-foreground mb-6">{error || 'Job not found'}</p>
        <Link href="/dashboard/jobs" className="text-primary hover:underline">
          Back to Jobs
        </Link>
      </div>
    );
  }

  const hitRate = job.total_leads > 0 
    ? Math.round((job.valid_count / job.total_leads) * 100) 
    : 0;

  // Realistic hit rate expectations: 40-60% is good
  const hitRateColor = hitRate >= 50 ? 'text-green-500' : hitRate >= 35 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-1">{job.job_name}</h1>
          <p className="text-muted-foreground">
            Created {new Date(job.created_at).toLocaleString()}
          </p>
        </div>
        {job.status === 'processing' && (
          <button
            onClick={fetchJobData}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Status Banner */}
      {job.status === 'processing' && (
        <div className="bg-blue-500/10 border border-blue-500 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="animate-spin w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full flex-shrink-0"></div>
            <div className="flex-1">
              <h3 className="font-medium text-blue-400 mb-2">Processing...</h3>
              <div className="progress-bar mb-2">
                <div className="progress-fill" style={{ width: `${job.progress}%` }}></div>
              </div>
              <p className="text-sm text-muted-foreground">
                {job.progress}% complete • {job.valid_count + job.catch_all_count + job.invalid_count} / {job.total_leads} leads processed
              </p>
            </div>
          </div>
        </div>
      )}

      {job.status === 'failed' && (
        <div className="bg-destructive/10 border border-destructive rounded-lg p-6">
          <div className="flex items-start gap-4">
            <XCircle className="w-6 h-6 text-destructive flex-shrink-0" />
            <div>
              <h3 className="font-medium text-destructive mb-1">Job Failed</h3>
              <p className="text-sm text-destructive/80">{job.error_message || 'An error occurred during processing'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Total Leads</span>
          </div>
          <div className="text-3xl font-bold">{job.total_leads.toLocaleString()}</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Valid</span>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-500">{job.valid_count.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {job.total_leads > 0 ? Math.round((job.valid_count / job.total_leads) * 100) : 0}%
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Catch-All</span>
            <AlertCircle className="w-4 h-4 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-yellow-500">{job.catch_all_count.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {job.total_leads > 0 ? Math.round((job.catch_all_count / job.total_leads) * 100) : 0}%
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Invalid</span>
            <XCircle className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-red-500">{job.invalid_count.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {job.total_leads > 0 ? Math.round((job.invalid_count / job.total_leads) * 100) : 0}%
          </div>
        </div>
      </div>

      {/* Export Buttons */}
      {job.status === 'completed' && results.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-medium mb-4">Export Results</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleExport('all')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export All
            </button>
            <button
              onClick={() => handleExport('valid')}
              className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Valid Only
            </button>
            <button
              onClick={() => handleExport('catch-all')}
              className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Catch-All
            </button>
            <button
              onClick={() => handleExport('invalid')}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Invalid
            </button>
          </div>
        </div>
      )}

      {/* Results Table */}
      {results.length > 0 && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="font-medium">Results ({results.length.toLocaleString()})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Company</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Email</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {results.slice(0, 100).map((result, i) => (
                  <tr key={i} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="p-4">
                      {result.first_name} {result.last_name}
                    </td>
                    <td className="p-4 text-muted-foreground">{result.domain}</td>
                    <td className="p-4 font-mono text-sm">{result.email || '-'}</td>
                    <td className="p-4">
                      {result.status === 'valid' && <span className="badge-valid">Valid</span>}
                      {result.status === 'catch-all' && <span className="badge-catch-all">Catch-All</span>}
                      {(result.status === 'invalid' || !result.email) && <span className="badge-invalid">Invalid</span>}
                    </td>
                    <td className="p-4 text-muted-foreground">{result.confidence || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {results.length > 100 && (
            <div className="p-4 text-center text-sm text-muted-foreground border-t border-border">
              Showing first 100 results. Export to see all {results.length.toLocaleString()} results.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
