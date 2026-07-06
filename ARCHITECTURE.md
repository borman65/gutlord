# $GUT Project Architecture

This document outlines the modernized architecture following Next.js 16 best practices.

## Project Structure

```
/app
  ├── page.tsx              # Home page with Cache Components
  ├── layout.tsx            # Root layout with metadata & fonts
  ├── globals.css           # Tailwind v4 with theme tokens
  ├── actions.ts            # Server Actions for mutations
  └── api/
      ├── metadata/         # Project metadata endpoint
      └── cache-revalidate/ # On-demand cache invalidation

/components/gut
  ├── hero.tsx              # Hero section (RSC)
  ├── marquee.tsx           # Animated marquee (RSC)
  ├── g-tracker.tsx         # Mouse tracking effect (Client)
  ├── meme-generator.tsx    # Interactive meme tool (Client)
  └── [other sections]      # Page sections

/lib
  ├── gut-config.ts         # Configuration constants
  ├── client-utils.ts       # Client-side utilities (clipboard, debounce, etc)
  ├── server-utils.ts       # Server-side utilities (cache, fetch)
  └── utils.ts              # Tailwind cn() helper
```

## Key Architecture Patterns

### 1. React Server Components (RSC) by Default

- **Server Components**: Most components are server-rendered by default for better performance
  - Smaller bundle sizes
  - Faster initial page load
  - Direct database access (if added)
  
- **Client Components**: Only use `'use client'` for interactive features
  - GTracker (mouse tracking)
  - MemeGenerator (form interactions)
  - Any component with event handlers or hooks

### 2. Cache Components (Next.js 16)

- Home page uses `'use cache'` directive for automatic caching
- Pages are cached with the 'max' cacheLife profile for optimal freshness
- Reduces database queries and server load

### 3. Server Actions

- Located in `/app/actions.ts`
- Handle form submissions and mutations securely
- Examples:
  - `submitMeme()` - Save user-generated memes
  - `shareContract()` - Track sharing events
  - `validateAddress()` - Validate Solana addresses
  - `getPriceData()` - Fetch market data

### 4. API Routes

- `/api/metadata` - Serves project metadata (used by OG cards, external APIs)
- `/api/cache-revalidate` - On-demand cache invalidation via webhook

### 5. Styling Strategy

- **Tailwind v4** with custom theme tokens
- **Design tokens** in `globals.css` with oklch color space
- **Responsive design** with mobile-first approach
- **Accessibility** with focus-visible and prefers-reduced-motion

### 6. Performance Optimizations

1. **React Compiler**: Enabled for automatic memoization
2. **Cache Components**: Automatic caching of static pages
3. **Image Optimization**: Unoptimized for external URLs (Vercel Blob)
4. **Event Throttling**: Mouse tracking throttled to 60fps
5. **Memory Management**: GTracker keeps max 20 floating elements

## Environment Variables

```
NEXT_PUBLIC_SITE_URL=https://gutlord.com
REVALIDATE_SECRET=your-secret-for-cache-invalidation
```

## Development

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## Data Fetching

### Server-Side
- Use `fetchWithCache()` from `lib/server-utils.ts`
- Automatic caching with tags for revalidation
- Perfect for APIs, databases, external services

### Client-Side
- Use SWR or React Query for data management
- Or fetch from Server Actions
- Example: `const result = await getPriceData()`

## Caching Strategy

1. **Static Pages**: Cached with `'use cache'` directive
2. **API Routes**: Cache-Control headers set (1 hour default)
3. **On-Demand**: Use `/api/cache-revalidate` endpoint
4. **Revalidation**: `revalidateTag()` for tag-based invalidation

## Adding Features

### New Interactive Component
```tsx
'use client'

import { useState } from 'react'

export function MyComponent() {
  const [state, setState] = useState(false)
  
  return <div>Interactive content</div>
}
```

### New Server Action
```tsx
export async function myAction(formData: FormData) {
  'use server'
  
  // Handle mutation
  return { success: true }
}
```

### New API Route
```tsx
export async function GET() {
  return Response.json({ data: 'value' })
}
```

## Security

- TypeScript enabled for type safety
- Server Actions validate inputs
- API endpoints check authorization headers
- Environment variables for secrets
- No sensitive data in client code

## Monitoring

- Vercel Analytics integrated
- Console logging with `[v0]` prefix for debugging
- Error handling on all critical operations

## SEO & Social

- OpenGraph metadata for social sharing
- Twitter card configuration
- Dynamic metadata generation
- Structured data ready (can add JSON-LD)

## Next Steps

1. Connect to database (Neon, Supabase, etc)
2. Implement user authentication
3. Add real price data from Jupiter API
4. Set up CDN for meme storage
5. Add analytics dashboard
6. Implement admin panel for content management
