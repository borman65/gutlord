import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * On-demand cache revalidation endpoint
 * Allows external services to trigger cache invalidation
 */
export async function POST(request: NextRequest) {
  const revalidateSecret = process.env.REVALIDATE_SECRET

  // Security check - verify the request has valid authorization
  const authHeader = request.headers.get('authorization')
  if (!revalidateSecret || authHeader !== `Bearer ${revalidateSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { tags } = await request.json() as { tags?: string[] }

    if (!tags || !Array.isArray(tags)) {
      return NextResponse.json(
        { error: 'Invalid tags format' },
        { status: 400 }
      )
    }

    // Revalidate all provided tags
    // Note: Next.js 16+ requires cacheLife profile as second argument
    tags.forEach(tag => {
      revalidateTag(tag, 'max')
    })

    return NextResponse.json(
      { 
        success: true, 
        message: `Revalidated ${tags.length} tag(s)`,
        revalidatedTags: tags 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Revalidation error:', error)
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    )
  }
}
