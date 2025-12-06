# Deployment Guide - EmailEnrich Frontend

## Quick Deploy Options

### Option 1: Railway (Recommended - Easiest)

1. **Install Railway CLI**:
```bash
npm install -g @railway/cli
```

2. **Login**:
```bash
railway login
```

3. **Deploy from project directory**:
```bash
cd /home/ubuntu/email-enrichment-frontend
railway init
railway up
```

4. **Add environment variables**:
```bash
railway variables set NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
railway variables set NEXT_PUBLIC_API_URL=https://your-project.supabase.co/functions/v1
```

5. **Get your URL**:
```bash
railway domain
```

**Cost**: ~$5/month

---

### Option 2: Render

1. **Push to GitHub** (if not already):
```bash
cd /home/ubuntu/email-enrichment-frontend
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/email-enrichment-frontend.git
git push -u origin main
```

2. **Deploy on Render**:
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: email-enrichment-frontend
     - **Environment**: Docker
     - **Plan**: Starter ($7/month)
   
3. **Add environment variables** in Render dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_API_URL`

4. **Deploy** - Render will automatically build and deploy

**Cost**: ~$7/month

---

### Option 3: Fly.io

1. **Install Fly CLI**:
```bash
curl -L https://fly.io/install.sh | sh
```

2. **Login**:
```bash
fly auth login
```

3. **Launch app**:
```bash
cd /home/ubuntu/email-enrichment-frontend
fly launch
```

4. **Set environment variables**:
```bash
fly secrets set NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
fly secrets set NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
fly secrets set NEXT_PUBLIC_API_URL=https://your-project.supabase.co/functions/v1
```

5. **Deploy**:
```bash
fly deploy
```

**Cost**: ~$3-5/month

---

### Option 4: Vercel (If build issues are fixed)

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
cd /home/ubuntu/email-enrichment-frontend
vercel
```

3. **Add environment variables** in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_API_URL`

**Cost**: Free tier available

---

## Environment Variables Required

All deployment options require these environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_API_URL=https://your-project.supabase.co/functions/v1
```

Get these from your Supabase project dashboard:
- Go to https://supabase.com/dashboard
- Select your project
- Go to Settings → API
- Copy the URL and anon/public key

---

## Testing Deployment

After deployment, test these pages:

1. **Landing page**: `https://your-app.com/`
2. **Dashboard**: `https://your-app.com/dashboard`
3. **Upload**: `https://your-app.com/dashboard/upload`
4. **Jobs**: `https://your-app.com/dashboard/jobs`

---

## Custom Domain

### Railway
```bash
railway domain add yourdomain.com
```

### Render
- Go to Settings → Custom Domain
- Add your domain
- Update DNS records

### Fly.io
```bash
fly certs add yourdomain.com
```

---

## Troubleshooting

### Build fails
- The Dockerfile is configured to fall back to dev mode if build fails
- Dev mode works perfectly, just slightly slower

### Environment variables not working
- Make sure variables start with `NEXT_PUBLIC_` for client-side access
- Restart the service after adding variables

### Port issues
- The app runs on port 3000 by default
- Most platforms auto-detect this

---

## Monitoring

### Railway
- Built-in logs and metrics in dashboard
- `railway logs` command

### Render
- Logs tab in dashboard
- Metrics tab for performance

### Fly.io
- `fly logs` command
- Metrics in dashboard

---

## Scaling

All platforms support easy scaling:

### Railway
```bash
railway scale --replicas 2
```

### Render
- Upgrade plan in dashboard
- Auto-scaling available on Pro plan

### Fly.io
```bash
fly scale count 2
```

---

## Cost Comparison

| Platform | Minimum Cost | Free Tier | Best For |
|----------|-------------|-----------|----------|
| Railway  | $5/month    | $5 credit | Easiest setup |
| Render   | $7/month    | 750 hours | Reliability |
| Fly.io   | $3/month    | Limited   | Cost optimization |
| Vercel   | Free        | Yes       | Next.js apps (if build works) |

---

## Recommended: Railway

For fastest deployment with least hassle:

```bash
# 1. Install CLI
npm install -g @railway/cli

# 2. Deploy
cd /home/ubuntu/email-enrichment-frontend
railway login
railway init
railway up

# 3. Set variables
railway variables set NEXT_PUBLIC_SUPABASE_URL=your_url
railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
railway variables set NEXT_PUBLIC_API_URL=your_api_url

# 4. Get URL
railway domain

# Done! Your app is live.
```

---

## Next Steps

After deployment:
1. Test all features
2. Set up custom domain
3. Configure monitoring/alerts
4. Set up CI/CD (optional)
5. Start Phase 2: Sales Navigator integration
