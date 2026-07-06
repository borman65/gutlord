import { NextResponse } from 'next/server'
import { getTokenPrice, getMockTokenData } from '@/lib/data-fetchers'

/**
 * Token stats endpoint
 * Returns price, market cap, volume, and other metrics
 * Implements caching for performance
 */
export async function GET() {
  try {
    // Try to fetch real data from Jupiter
    const jupiterPrice = await getTokenPrice()

    // Fallback to mock data if real API fails
    const mockData = getMockTokenData()

    const stats = {
      success: true,
      data: {
        price: jupiterPrice?.price || mockData.price,
        priceChange24h: jupiterPrice?.price_24h_change || mockData.priceChange24h,
        marketCap: jupiterPrice?.market_cap || mockData.marketCap,
        volume24h: jupiterPrice?.volume_24h || mockData.volume24h,
        holders: mockData.holders,
        supply: mockData.supply,
        decimals: mockData.decimals,
      },
      timestamp: new Date().toISOString(),
      source: jupiterPrice ? 'jupiter' : 'mock',
    }

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('[v0] Token stats error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch token stats',
      },
      { status: 500 }
    )
  }
}
