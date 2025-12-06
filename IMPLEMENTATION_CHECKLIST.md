# Email Enrichment SaaS - Implementation Checklist

## Phase 1: Quick MVP (For Immediate Sales) - TARGET: 1-2 hours

### Project Setup
- [x] Create Next.js 14 project with TypeScript
- [x] Install dependencies (Supabase, React Query, Zustand, Framer Motion, Lucide, Papa Parse)
- [x] Configure dark theme with green accents in globals.css
- [x] Set up environment variables (.env.local)
- [x] Create Supabase client configuration

### Core Utilities
- [x] CSV parser with smart column detection (lib/csv-parser.ts)
- [x] Domain extraction utility
- [x] Column mapping detection (first name, last name, domain)
- [x] CSV validation

### Landing Page
- [ ] Create landing page (app/page.tsx)
  - [ ] Header with logo and navigation
  - [ ] Hero section with CTA
  - [ ] Features section (3 cards)
  - [ ] Stats section
  - [ ] Final CTA section
  - [ ] Footer

### Authentication
- [ ] Create auth context/provider
- [ ] Login page (app/auth/login/page.tsx)
- [ ] Sign up page (app/auth/signup/page.tsx)
- [ ] Supabase Auth integration
- [ ] Protected route middleware

### Dashboard Layout
- [ ] Create dashboard layout (app/dashboard/layout.tsx)
  - [ ] Sidebar navigation
  - [ ] Top bar with user profile
  - [ ] Logout button

### Dashboard Home
- [ ] Create dashboard home (app/dashboard/page.tsx)
  - [ ] Stats cards (total jobs, valid emails, API calls)
  - [ ] Quick action buttons (Upload CSV)
  - [ ] Recent jobs list

### CSV Upload Flow
- [ ] Create upload page (app/dashboard/upload/page.tsx)
  - [ ] Drag & drop zone
  - [ ] File input
  - [ ] File validation feedback
  - [ ] Parse CSV on upload
  - [ ] Display detected columns
  - [ ] Show CSV preview (first 5 rows)

### Column Mapping
- [ ] Create column mapping component
  - [ ] Auto-detect columns (first name, last name, domain)
  - [ ] Dropdown selectors for manual mapping
  - [ ] Required field indicators
  - [ ] Validation before job creation
  - [ ] "Start Enrichment" button

### Job Processing
- [ ] Create job submission logic
  - [ ] Call Supabase batch-enrich endpoint
  - [ ] Store job ID
  - [ ] Redirect to job details page

### Job Details Page
- [ ] Create job details page (app/dashboard/jobs/[id]/page.tsx)
  - [ ] Job status display (pending, processing, completed, failed)
  - [ ] Progress bar with percentage
  - [ ] Stats cards (valid, catch-all, invalid counts)
  - [ ] Real-time updates via polling or Supabase Realtime
  - [ ] Results table when complete
  - [ ] Export buttons (All, Valid Only, Catch-All, Invalid)

### Jobs List Page
- [ ] Create jobs list page (app/dashboard/jobs/page.tsx)
  - [ ] Table with all jobs
  - [ ] Status indicators
  - [ ] Click to view details
  - [ ] Search/filter functionality

### Components Library
- [ ] Button component
- [ ] Card component
- [ ] Table component
- [ ] Progress bar component
- [ ] Status badge component
- [ ] File upload component
- [ ] Loading spinner component
- [ ] Toast notification component

### API Integration
- [ ] Connect to Supabase batch-enrich endpoint
- [ ] Connect to get-job endpoint
- [ ] Handle API errors
- [ ] Add loading states
- [ ] Add error messages

### Testing & Deployment
- [ ] Test CSV upload with sample file
- [ ] Test column detection accuracy
- [ ] Test job creation
- [ ] Test job status updates
- [ ] Test CSV export
- [ ] Deploy to Vercel
- [ ] Configure environment variables in Vercel
- [ ] Test production deployment

---

## Phase 2: Full Production (After Sales Start) - TARGET: 8-12 hours

### Sales Navigator Integration
- [ ] Create Vayne.io API integration
  - [ ] Create Edge Function: import-sales-nav
  - [ ] Accept Sales Navigator URL from frontend
  - [ ] Call Vayne.io API to create scraping order
  - [ ] Poll order status
  - [ ] Download CSV when complete
  - [ ] Parse CSV and extract leads
  - [ ] Create batch enrichment job

- [ ] Frontend: Sales Navigator import page
  - [ ] URL input field with validation
  - [ ] Vayne.io API key input (or stored in backend)
  - [ ] Scraping options (limit, email inference)
  - [ ] Progress indicator during scraping
  - [ ] Display scraped leads preview
  - [ ] "Start Enrichment" button

- [ ] Database additions
  - [ ] vayne_orders table to track scraping orders
  - [ ] Link vayne_orders to enrichment jobs

### Individual Email Lookup
- [ ] Create single lookup page (app/dashboard/lookup/page.tsx)
  - [ ] Form with first name, last name, domain inputs
  - [ ] "Find Email" button
  - [ ] Display result (email, status, confidence)
  - [ ] Save to history

- [ ] Backend: Single enrichment endpoint
  - [ ] Already exists in Supabase (enrich endpoint)
  - [ ] Just need to connect frontend

### Advanced Features
- [ ] Webhook management
  - [ ] Register webhook page
  - [ ] Webhook settings (events, URL, secret)
  - [ ] Webhook delivery logs

- [ ] API Keys management
  - [ ] Generate customer API keys
  - [ ] API keys list page
  - [ ] Copy to clipboard
  - [ ] Revoke keys
  - [ ] Usage stats per key

- [ ] Settings page
  - [ ] Profile settings
  - [ ] Vayne.io API key configuration
  - [ ] Notification preferences
  - [ ] Billing information
  - [ ] Plan upgrade options

- [ ] Admin dashboard (if multi-tenant)
  - [ ] View all users
  - [ ] View all jobs
  - [ ] Usage statistics
  - [ ] Revenue tracking

### UI/UX Enhancements
- [ ] Add loading skeletons
- [ ] Add empty states
- [ ] Add error boundaries
- [ ] Improve mobile responsiveness
- [ ] Add keyboard shortcuts
- [ ] Add tooltips for complex features
- [ ] Add onboarding tour for new users

### Performance Optimizations
- [ ] Implement React Query for caching
- [ ] Add optimistic updates for mutations
- [ ] Lazy load heavy components
- [ ] Optimize images with Next.js Image
- [ ] Add service worker for offline support
- [ ] Implement virtual scrolling for large tables

### Analytics & Monitoring
- [ ] Add analytics tracking (PostHog, Mixpanel, or GA4)
- [ ] Track key events (uploads, job completions, exports)
- [ ] Add error tracking (Sentry)
- [ ] Add performance monitoring
- [ ] Create analytics dashboard

### Documentation
- [ ] API documentation
- [ ] User guide
- [ ] Video tutorials
- [ ] FAQ page
- [ ] Changelog

### Testing
- [ ] Unit tests for utilities
- [ ] Integration tests for API calls
- [ ] E2E tests for critical flows
- [ ] Load testing for batch processing

### Security
- [ ] Add rate limiting
- [ ] Add CSRF protection
- [ ] Add input sanitization
- [ ] Add API key validation
- [ ] Add webhook signature verification
- [ ] Security audit

### Billing & Payments (if needed)
- [ ] Integrate Stripe
- [ ] Create pricing plans
- [ ] Add subscription management
- [ ] Add usage-based billing
- [ ] Add invoicing

---

## Current Progress

### Completed ✅
- [x] Project setup
- [x] Dependencies installed
- [x] Dark theme configured
- [x] CSV parser with smart column detection
- [x] Supabase client setup
- [x] Domain extraction utility

### In Progress 🔄
- [ ] Landing page
- [ ] Dashboard pages
- [ ] CSV upload flow
- [ ] Job tracking

### Not Started ⏳
- [ ] Authentication
- [ ] Real-time updates
- [ ] Export functionality
- [ ] Deployment

---

## Deployment Checklist

### Vercel Deployment
- [ ] Connect GitHub repository
- [ ] Configure build settings
- [ ] Add environment variables
  - [ ] NEXT_PUBLIC_SUPABASE_URL
  - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
  - [ ] NEXT_PUBLIC_API_URL
- [ ] Deploy to production
- [ ] Test production URL
- [ ] Configure custom domain (if available)

### Supabase Configuration
- [ ] Verify Edge Functions are deployed
- [ ] Verify database migrations are applied
- [ ] Verify RLS policies are active
- [ ] Add Mail Tester API keys to secrets
- [ ] Configure CORS for frontend domain

### Post-Deployment
- [ ] Test end-to-end workflow in production
- [ ] Monitor error logs
- [ ] Set up uptime monitoring
- [ ] Create backup strategy

---

## Success Criteria

### Phase 1 (Quick MVP)
- ✅ User can upload CSV
- ✅ Smart column detection works
- ✅ Job is created and processed
- ✅ Results are displayed
- ✅ CSV can be exported
- ✅ Dark theme with green accents
- ✅ Deployed and accessible

### Phase 2 (Full Production)
- ✅ Sales Navigator integration works
- ✅ Individual lookup works
- ✅ Webhook system functional
- ✅ API keys can be generated
- ✅ Admin dashboard operational
- ✅ Analytics tracking active
- ✅ All tests passing
- ✅ Documentation complete

---

## Notes

- **Phase 1 Priority**: Get to market fast with core features
- **Phase 2 Priority**: Add differentiating features and polish
- **Tech Debt**: Document any shortcuts taken in Phase 1 for Phase 2 cleanup
- **User Feedback**: Collect feedback during Phase 1 to inform Phase 2 priorities

---

**Last Updated**: 2024-12-06
**Status**: Phase 1 In Progress
**Next Milestone**: Complete landing page and dashboard
