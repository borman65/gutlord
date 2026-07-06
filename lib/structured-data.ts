import { GUT } from './gut-config'

/**
 * Generate JSON-LD structured data for SEO
 * Helps search engines understand the content better
 */

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GUTLORD',
    description: 'A meme coin with no intrinsic value but eternal hunger.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gutlord.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://gutlord.com'}/logo.png`,
    sameAs: [GUT.links.x, GUT.links.telegram],
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GUTLORD',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gutlord.com',
    searchAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://gutlord.com'}/search?q={search_term_string}`,
      },
    },
  }
}

export function generateCryptoSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Thing',
    name: GUT.ticker,
    description: 'GUTLORD meme coin on Solana blockchain',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gutlord.com',
    identifier: GUT.contract,
    potentialAction: {
      '@type': 'BuyAction',
      target: {
        '@type': 'EntryPoint',
        url: GUT.links.buy,
      },
    },
  }
}
