import { NextResponse } from 'next/server'
import { GUT } from '@/lib/gut-config'

/**
 * API endpoint for retrieving $GUT project metadata
 * Used for OpenGraph, Twitter cards, and external integrations
 */
export async function GET() {
  const metadata = {
    project: {
      name: GUT.name,
      ticker: GUT.ticker,
      contract: GUT.contract,
      chain: GUT.chain,
    },
    description: 'GUTLORD ($GUT) — the fattest, fanciest, no-fucking-sell meme king on the chain.',
    tagline: 'Feed Me Profits',
    links: {
      twitter: GUT.links.x,
      telegram: GUT.links.telegram,
      website: process.env.NEXT_PUBLIC_SITE_URL || 'https://gutlord.com',
      buy: GUT.links.buy,
      chart: GUT.links.chart,
    },
    stats: {
      totalSupply: '1000000000',
      decimals: 6,
      launched: '2026-07-04',
    },
    generated: new Date().toISOString(),
  }

  return NextResponse.json(metadata, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
