# Deployment & Development Guide

This guide covers deployment, configuration, and development practices for the modernized $GUT project.

## Environment Variables

### Required for Production
```bash
NEXT_PUBLIC_SITE_URL=https://gutlord.com
REVALIDATE_SECRET=your-secure-random-secret
NODE_ENV=production
```

### Optional for Enhanced Features
```bash
# Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# External APIs
JUPITER_API_KEY=your-jupiter-key  # If using Jupiter directly
DEXSCREENER_API_KEY=your-dexscreener-key
```

## Deployment to Vercel

### Quick Deploy
```bash
# Login to Vercel CLI
vercel login

# Deploy to production
vercel deploy --prod
```

### Configure Environment Variables in Vercel

1. Go to Project Settings → Environment Variables
2. Add the required variables
3. Re-deploy to apply changes

### Custom Domain Setup
```bash
# Add domain in Vercel dashboard
# DNS configuration required (see Vercel docs)
```

## Local Development

### Prerequisites
- Node.js 18+ (recommend 20+)
- pnpm (npm or yarn also work)

### Setup

```bash
# Install dependencies
pnpm install

# Create .env.local
cat > .env.local << EOF
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATE_SECRET=dev-secret-change-in-prod
EOF

# Run dev server
pnpm dev

# Open browser
open http://localhost:3000
```

### Development Server Features
- Hot Module Replacement (HMR) - Files update instantly
- Fast Refresh - Preserves component state
- Turbopack - Faster builds and rebuilds
- TypeScript checking
- ESLint validation

## Building for Production

```bash
# Build optimized bundle
pnpm build

# Test production build locally
pnpm start

# Open in browser
open http://localhost:3000
```

## Performance Optimization

### Enabled Optimizations
1. **React Compiler** - Automatic memoization
2. **Cache Components** - Page-level caching
3. **Image Optimization** - Note: Unoptimized for Vercel Blob URLs
4. **Code Splitting** - Automatic route-based splitting
5. **Tree Shaking** - Removes unused code

### Monitoring Performance

```bash
# Build size analysis
pnpm build --debug

# Check Core Web Vitals
# Use Vercel Analytics dashboard
```

## API Rate Limiting

### Implemented Protection
- Cache-Control headers on all endpoints
- Stale-while-revalidate for fallback
- Request deduplication with React cache()

### Increasing Cache TTL
Edit `/lib/data-fetchers.ts`:
```typescript
next: {
  revalidate: 3600,  // Increase this value
  tags: ['token-price'],
}
```

## Monitoring & Analytics

### Vercel Analytics
- Automatically enabled for all projects
- Monitor Core Web Vitals
- Track user interactions
- View deployment history

### Custom Tracking
Events tracked with `trackEvent()` from `lib/client-utils.ts`:
- `buy_button_clicked`
- `address_copied`
- `meme_submitted`

## Security Headers

Implemented in `proxy.ts`:
- X-Frame-Options: SAMEORIGIN
- Strict-Transport-Security: max-age=31536000
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Cache-Control for API routes

## Database Setup (When Needed)

### Option 1: Neon PostgreSQL
```bash
# Get connection string from Neon dashboard
# Add to .env.local
DATABASE_URL=postgresql://...

# Run migrations
pnpm migrate
```

### Option 2: Supabase
```bash
# Set up in Supabase dashboard
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Continuous Integration/Deployment

### GitHub Integration
1. Connect GitHub repository in Vercel
2. Push to main branch
3. Automatic deployment on merge

### Preview Deployments
- Automatic for all pull requests
- Test changes before merging
- Share preview URL with team

### Staging Environment
```bash
# Deploy to staging before production
vercel deploy --prebuilt
```

## Rollback

### Quick Rollback
```bash
# Revert to previous deployment
vercel rollback
```

## Debugging

### Enable Debug Logging
```typescript
// In any file
console.log('[v0] Debug info:', value)
```

### Check Build Errors
```bash
# Full build log
pnpm build --verbose

# Check TypeScript errors
pnpm tsc --noEmit

# Lint issues
pnpm lint
```

### Monitor Runtime Errors
- Check Vercel Logs: `vercel logs`
- Browser DevTools: F12
- Network tab for API calls

## Maintenance

### Weekly
- Check Vercel Analytics
- Monitor error rates
- Verify cache hit rates

### Monthly
- Update dependencies: `pnpm update`
- Review security advisories
- Test critical flows

### Quarterly
- Performance audit
- SEO review
- Database optimization (if applicable)

## Troubleshooting

### Issue: Deployment fails
```bash
# Check build locally
pnpm build

# Verify environment variables are set
vercel env pull

# Clear cache and rebuild
vercel deploy --prod
```

### Issue: Pages load slowly
```bash
# Check cache headers in proxy.ts
# Verify Cache Components are enabled
# Run Lighthouse: chrome://lighthouse
```

### Issue: API returns stale data
```bash
# Manually revalidate cache
curl -X POST https://your-site.com/api/cache-revalidate \
  -H "Authorization: Bearer $REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"tags": ["token-price"]}'
```

## Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
