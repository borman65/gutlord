/**
 * Data fetching utilities for external APIs
 * Follows Next.js 16 patterns with proper caching
 */

import { cache } from 'react'
import { GUT } from './gut-config'

/**
 * Fetch token price from Jupiter API
 * Wrapped in React cache() for request deduplication
 */
export const getTokenPrice = cache(async () => {
  try {
    // Use contract address for Jupiter API calls
    const response = await fetch(
      `https://price.jup.ag/v4/price?ids=${GUT.contract}`,
      {
        next: {
          revalidate: 300, // Cache for 5 minutes
          tags: ['token-price'],
        },
      }
    )

    if (!response.ok) {
      console.error('[v0] Jupiter API error:', response.statusText)
      return null
    }

    const data = await response.json()
    return data.data?.[GUT.contract] || null
  } catch (error) {
    console.error('[v0] Token price fetch error:', error)
    return null
  }
})

/**
 * Fetch token info from Jupiter
 */
export const getTokenInfo = cache(async () => {
  try {
    const response = await fetch(
      `https://api.jup.ag/api/v6/tokens?search=${GUT.ticker}`,
      {
        next: {
          revalidate: 3600, // Cache for 1 hour
          tags: ['token-info'],
        },
      }
    )

    if (!response.ok) return null

    const data = await response.json()
    return data || null
  } catch (error) {
    console.error('[v0] Token info fetch error:', error)
    return null
  }
})

/**
 * Fetch swap quotes from Jupiter
 */
export const getSwapQuote = cache(async (
  inputMint: string,
  outputMint: string,
  amount: number
) => {
  try {
    const params = new URLSearchParams({
      inputMint,
      outputMint,
      amount: amount.toString(),
      slippageBps: '50',
    })

    const response = await fetch(
      `https://api.jup.ag/api/v6/quote?${params}`,
      {
        next: {
          revalidate: 60, // Cache for 1 minute (quotes are time-sensitive)
          tags: ['swap-quote'],
        },
      }
    )

    if (!response.ok) return null

    const data = await response.json()
    return data || null
  } catch (error) {
    console.error('[v0] Swap quote error:', error)
    return null
  }
})

/**
 * Mock data for development
 * Replace with real API calls in production
 */
export const getMockTokenData = () => ({
  price: 0.0000042,
  priceChange24h: 12.5,
  marketCap: 4200000,
  volume24h: 125000,
  holders: 42069,
  supply: '1000000000',
  decimals: 6,
})
