import { Crown, Zap } from "lucide-react"
import { ContractCopy } from "./contract-copy"
import { SocialLinks } from "./social-links"
import { FloatingCoins } from "./floating-coins"
import { GUT } from "@/lib/gut-config"

/**
 * Hero section component
 * Server-rendered for optimal performance
 * Contains non-interactive elements and lazy-loaded video
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-8 pb-20 md:pt-24 md:pb-32">
      <FloatingCoins />
      
      {/* Dramatic background glow - neon green with reduced opacity */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 size-[150vw] max-w-[1200px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,#00dd00_0%,#00ff88_30%,transparent_80%)] opacity-15 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center">
        {/* Top badge with energy */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border-2 border-neon-green bg-black/80 px-5 py-2 font-display text-xs tracking-[0.3em] text-white uppercase backdrop-blur">
          <Zap className="size-5 text-neon-green animate-pulse" /> 
          <span>The Fattest King On Chain</span>
        </div>

        {/* MASSIVE HYPE TITLE */}
        <h1 className="font-display text-7xl leading-[0.9] tracking-[0.08em] uppercase sm:text-8xl md:text-9xl lg:text-[12rem]">
          <span className="neon-text-glow gutlord-glitch">GUTLORD</span>
        </h1>

        {/* Subheader with energy */}
        <div className="mt-4 flex flex-col items-center gap-1">
          <p className="font-display text-3xl md:text-5xl tracking-widest text-white uppercase font-bold">
            {GUT.ticker}
          </p>
          <p className="font-display text-lg md:text-2xl tracking-[0.4em] text-neon-green uppercase font-bold">
            Feed Me Profits
          </p>
        </div>

        {/* Hero Image - Maximum Impact */}
        <div className="relative mt-12 w-full max-w-[480px] animate-float-slow group">
          {/* Multiple glow layers for intense effect */}
          <div
            aria-hidden
            className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-neon-green via-cyan-400 to-neon-green blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"
          />
          <div
            aria-hidden
            className="absolute -inset-4 rounded-2xl border-2 border-neon-green/50 animate-pulse"
          />
          
          <div className="relative aspect-square overflow-hidden rounded-full border-2 border-neon-green shadow-[0_0_40px_rgba(34,255,0,0.6)]">
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video_2026-07-04_13-41-43-7Z3S9W85hPk6oddgKITeaTrrXts16M.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Tagline - Bold and impactful */}
        <p className="mt-12 max-w-2xl text-pretty text-lg md:text-xl leading-relaxed text-white font-display tracking-wide uppercase">
          A crowned, cigar-puffing legend who <span className="text-neon-green font-bold">eats charts</span> for breakfast<br/>and <span className="text-neon-green font-bold">burps green candles</span>.
        </p>

        {/* Call to action section */}
        <div className="mt-12 w-full flex flex-col items-center gap-6">
          <ContractCopy />
          <SocialLinks className="!gap-4" />
        </div>
      </div>
    </section>
  )
}
