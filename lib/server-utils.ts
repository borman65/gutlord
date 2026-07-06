'use server'

/**
 * Server-side utilities for caching and data operations
 * Follows Next.js 16 best practices
 */

import { revalidateTag, updateTag } from 'next/cache'

/**
 * Invalidates cache for a specific tag
 * Used when data needs to be refreshed immediately
 * Next.js 16+ requires cacheLife profile ('max', 'hours', 'days', or custom)
 */
export async function invalidateCache(tag: string) {
  try {
    revalidateTag(tag, 'max')
  } catch (error) {
    console.error('[v0] Cache invalidation error:', error)
  }
}

/**
 * Updates cache for a specific tag with read-your-writes semantics
 * Perfect for mutations that need immediate reflection
 */
export async function updateCachedData(tag: string) {
  try {
    updateTag(tag)
  } catch (error) {
    console.error('[v0] Cache update error:', error)
  }
}

/**
 * Fetches data with proper error handling and caching
 */
export async function fetchWithCache<T>(
  url: string,
  tag: string,
  options?: RequestInit
): Promise<T | null> {
  try {
    const response = await fetch(url, {
      ...options,
      next: { tags: [tag], revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    return (await response.json()) as T
  } catch (error) {
    console.error('[v0] Fetch error:', error)
    return null
  }
}
