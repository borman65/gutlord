'use client'

import { GUT } from "@/lib/gut-config"
import { useMounted } from "@/hooks/use-mounted"

export function SiteFooter() {
  const isMounted = useMounted()
  const currentYear = isMounted ? new Date().getFullYear() : 2026

  return (
    <footer className="border-t-2 border-neon-green/40 bg-black px-4 py-16 md:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 text-center">
        <p className="max-w-2xl text-sm md:text-base leading-relaxed text-neon-cyan font-display tracking-wide">
          {GUT.ticker} {" "} is a meme coin with no intrinsic value or expectation of financial return. Just memes, a feeding plan, and the Gutlord&apos;s eternal hunger. Do your own research.
        </p>
        <div className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-neon-green to-transparent" />
        <p className="font-display text-sm tracking-widest text-neon-green uppercase font-bold">
          © {currentYear} {GUT.name} · NO FUCKING SELL
        </p>
      </div>
    </footer>
  )
}
