import { NextResponse } from 'next/server'

/**
 * Health check endpoint
 * Returns server status and uptime information
 * Useful for monitoring and load balancers
 */
export async function GET() {
  const uptime = process.uptime()

  return NextResponse.json(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: {
        seconds: Math.floor(uptime),
        hours: Math.floor(uptime / 3600),
        days: Math.floor(uptime / 86400),
      },
      environment: process.env.NODE_ENV,
      version: '1.0.0',
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=60',
        'Content-Type': 'application/json',
      },
    }
  )
}
