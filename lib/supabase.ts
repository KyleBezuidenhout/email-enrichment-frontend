import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// API client for enrichment endpoints
export const apiClient = {
  async enrichSingle(data: { first_name: string; last_name: string; domain: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enrich`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async enrichBatch(data: { leads: any[]; job_name: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/batch-enrich`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async getJob(jobId: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-job/${jobId}`, {
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
    });
    return response.json();
  },
};
