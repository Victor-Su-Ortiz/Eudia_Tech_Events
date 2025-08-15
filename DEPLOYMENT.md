# 🚀 Vercel Deployment Guide

## Prerequisites

- Vercel account (free tier works)
- GitHub/GitLab/Bitbucket repository connected
- pnpm installed locally for testing

## 📋 Step-by-Step Deployment

### 1. Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Select the `Eudia_Tech_Events` repository

### 2. Configure Build Settings

Vercel will auto-detect Next.js, but ensure these settings:

- **Framework Preset**: `Next.js`
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`
- **Node.js Version**: `18.x`

### 3. Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```bash
# Required
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# Optional Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-analytics-id

# Optional API Configuration
API_BASE_URL=https://api.eudia.com
```

### 4. Domain Configuration

For custom domain (e.g., events.eudia.com):

1. Go to Settings → Domains
2. Add `events.eudia.com`
3. Configure DNS records:
   - CNAME: `cname.vercel-dns.com`
   - Or A record: `76.76.21.21`

## 🔧 Configuration Files

### vercel.json (Already configured)
- ✅ Security headers
- ✅ Caching strategies
- ✅ Function configurations
- ✅ pnpm build commands

### package.json Scripts
- ✅ `build`: Next.js production build
- ✅ `start`: Production server
- ✅ Compatible with pnpm

## 📊 Performance Optimizations

The project includes:
- Image optimization (Next.js Image component)
- Static asset caching (31 days)
- Security headers (XSS, Content-Type, Frame Options)
- API route optimization (10s max duration)

## 🔍 Deployment Checklist

Before deploying:
- [ ] Run `pnpm build` locally to test
- [ ] Check `pnpm lint` passes
- [ ] Verify `pnpm typecheck` has no errors
- [ ] Test with `pnpm start` locally
- [ ] Update environment variables in Vercel
- [ ] Configure custom domain (if applicable)

## 🚦 Deployment Commands

### Via Vercel CLI
```bash
# Install Vercel CLI
pnpm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Via Git Push
```bash
# Automatic deployment on push to main
git push origin main

# Preview deployment on PR
git push origin feature-branch
```

## 🔄 Continuous Deployment

Every push to `main` branch triggers:
1. Automatic build
2. Preview deployment for PRs
3. Production deployment for main branch

## 🎯 Post-Deployment

1. **Verify deployment**: Check https://your-project.vercel.app
2. **Monitor**: Use Vercel Analytics dashboard
3. **Check logs**: Vercel Dashboard → Functions → Logs
4. **Test API routes**: `/api/healthz`, `/api/og`, `/api/ics/[slug]`

## 🆘 Troubleshooting

### Build Failures
- Check Node version (should be 18.x)
- Verify pnpm-lock.yaml is committed
- Check build logs in Vercel dashboard

### Runtime Errors
- Check environment variables are set
- Verify API routes are accessible
- Check function logs for errors

### Performance Issues
- Enable Vercel Analytics
- Check Core Web Vitals
- Optimize images and assets

## 📱 Features Enabled

- ✅ Server-Side Rendering (SSR)
- ✅ Static Site Generation (SSG)
- ✅ API Routes
- ✅ Image Optimization
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview Deployments

## 🔐 Security

Already configured:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Automatic HTTPS enforcement

## 📈 Monitoring

Vercel provides:
- Real-time analytics
- Performance metrics
- Error tracking
- Function logs
- Deployment history

---

## Quick Deploy Button

Add this to your README for one-click deployment:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/eudia-tech-events)
```
