'use client';

import { Settings as SettingsIcon, Key, Bell, User } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Profile</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              defaultValue="user@example.com"
              className="w-full px-4 py-2 bg-input border border-border rounded-lg"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              defaultValue="User"
              className="w-full px-4 py-2 bg-input border border-border rounded-lg"
            />
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      {/* API Keys Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Key className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">API Keys</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          Generate API keys to integrate with your applications
        </p>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          Generate New Key
        </button>
      </div>

      {/* Notifications Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Notifications</h2>
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Email notifications for completed jobs</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Email notifications for failed jobs</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4" />
            <span>Weekly usage reports</span>
          </label>
        </div>
      </div>
    </div>
  );
}
