# EmailEnrich - Email Enrichment SaaS Frontend

A modern, dark-themed Next.js frontend for email enrichment and verification at scale.

## Features

### Phase 1 (Quick MVP) ✅
- **Dark Theme** with green accents matching your Manus MVP style
- **Smart CSV Upload** with automatic column detection
- **Drag & Drop** file upload interface
- **Column Mapping** with intelligent auto-detection
- **Real-time Job Tracking** with progress updates
- **Results Dashboard** with filtering and export
- **CSV Export** (All, Valid Only, Catch-All, Invalid)
- **Responsive Design** optimized for desktop and mobile

### Phase 2 (Full Production) 🚧
- Sales Navigator integration via Vayne.io API
- Individual email lookup
- Webhook management
- API key generation
- Advanced analytics
- Admin dashboard
- And more...

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **State Management**: React Query + Zustand
- **CSV Parsing**: PapaParse
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Supabase project (see `/home/ubuntu/email-enrichment-saas/`)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Configure environment variables:
```bash
cp .env.local .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_API_URL=https://your-project.supabase.co/functions/v1
```

3. Run development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── page.tsx                    # Landing page
├── layout.tsx                  # Root layout
├── globals.css                 # Global styles (dark theme)
└── dashboard/
    ├── layout.tsx              # Dashboard layout with sidebar
    ├── page.tsx                # Dashboard home
    ├── upload/
    │   └── page.tsx            # CSV upload page
    ├── jobs/
    │   ├── page.tsx            # Jobs list
    │   └── [id]/
    │       └── page.tsx        # Job details
    └── settings/
        └── page.tsx            # Settings page

lib/
├── supabase.ts                 # Supabase client
└── csv-parser.ts               # CSV parsing utilities

components/
└── (reusable UI components)
```

## Key Features

### Smart Column Detection

The CSV parser automatically detects:
- First Name columns (matches: "first name", "fname", "first", etc.)
- Last Name columns (matches: "last name", "lname", "surname", etc.)
- Domain columns (matches: "domain", "website", "company domain", etc.)

Supports fuzzy matching based on sample data when exact matches aren't found.

### Real-time Job Updates

Job details page polls the backend every 5 seconds to show:
- Progress percentage
- Live status updates
- Results as they're processed

### CSV Export

Export results in multiple formats:
- **All**: Complete dataset with all columns
- **Valid Only**: Only verified valid emails
- **Catch-All**: Emails from catch-all domains
- **Invalid**: Failed verifications

All exports preserve original CSV columns and add:
- `email` - Found email address
- `status` - Verification status
- `confidence` - Confidence score

## API Integration

### Batch Enrichment

```typescript
import { apiClient } from '@/lib/supabase';

const response = await apiClient.enrichBatch({
  leads: [
    { first_name: 'John', last_name: 'Doe', domain: 'example.com' },
    // ...
  ],
  job_name: 'My Job',
});

// Returns: { success: true, data: { job_id: '...' } }
```

### Get Job Status

```typescript
const response = await apiClient.getJob(jobId);

// Returns job data + results if completed
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables (Production)

Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_API_URL`

## Development

### Run Tests
```bash
pnpm test
```

### Build for Production
```bash
pnpm build
```

### Start Production Server
```bash
pnpm start
```

## Roadmap

### Phase 1 (Quick MVP) - CURRENT
- [x] Landing page
- [x] Dashboard layout
- [x] CSV upload with smart detection
- [x] Job tracking
- [x] Results view
- [x] Export functionality
- [ ] Authentication
- [ ] Deploy to Vercel

### Phase 2 (Full Production)
- [ ] Sales Navigator integration
- [ ] Individual email lookup
- [ ] Webhook management
- [ ] API keys
- [ ] Advanced analytics
- [ ] Admin dashboard
- [ ] Billing integration

## Support

For issues or questions, contact support or open an issue.

## License

Proprietary - All rights reserved
