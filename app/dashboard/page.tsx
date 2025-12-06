'use client';

import Link from 'next/link';
import { Upload, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function DashboardPage() {
  // Mock data - will be replaced with real data from Supabase
  const stats = {
    totalJobs: 12,
    validEmails: 1234,
    processed: 87234567, // 87M+ counter
    hitRate: 54,
  };

  const recentJobs = [
    { id: '1', name: 'Q1 Leads', status: 'completed', leads: 1234, hitRate: 45, createdAt: '2024-12-05' },
    { id: '2', name: 'Tech Startups', status: 'processing', leads: 567, hitRate: 0, createdAt: '2024-12-06' },
    { id: '3', name: 'Enterprise', status: 'completed', leads: 890, hitRate: 52, createdAt: '2024-12-04' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your enrichment overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Total Jobs</span>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold">{stats.totalJobs}</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Valid Emails</span>
            <CheckCircle className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold text-primary">{stats.validEmails.toLocaleString()}</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Total Processed</span>
            <Upload className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold">{stats.processed.toLocaleString()}</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Avg Hit Rate</span>
            <CheckCircle className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-bold text-primary">{stats.hitRate}%</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-8">
        <h2 className="text-xl font-bold mb-4">Start New Enrichment</h2>
        <div className="flex gap-4">
          <Link
            href="/dashboard/upload"
            className="flex-1 bg-primary text-primary-foreground rounded-lg p-6 hover:bg-primary/90 transition-colors"
          >
            <Upload className="w-8 h-8 mb-3" />
            <h3 className="font-bold mb-1">Upload CSV</h3>
            <p className="text-sm opacity-90">Upload your leads and start enriching</p>
          </Link>
        </div>
      </div>

      {/* Recent Jobs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Jobs</h2>
          <Link href="/dashboard/jobs" className="text-primary hover:underline text-sm">
            View All
          </Link>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Job Name</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Leads</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Hit Rate</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentJobs.map((job) => (
                <tr key={job.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="p-4">
                    <Link href={`/dashboard/jobs/${job.id}`} className="font-medium hover:text-primary">
                      {job.name}
                    </Link>
                  </td>
                  <td className="p-4">
                    {job.status === 'completed' && (
                      <span className="badge-valid">Completed</span>
                    )}
                    {job.status === 'processing' && (
                      <span className="badge-processing">Processing</span>
                    )}
                    {job.status === 'failed' && (
                      <span className="badge-invalid">Failed</span>
                    )}
                  </td>
                  <td className="p-4 text-muted-foreground">{job.leads.toLocaleString()}</td>
                  <td className="p-4">
                    {job.hitRate > 0 ? (
                      <span className="text-primary font-medium">{job.hitRate}%</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="p-4 text-muted-foreground">{job.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
