import { SiteHeader } from "@/components/gut/site-header"
import { Hero } from "@/components/gut/hero"
import { Marquee } from "@/components/gut/marquee"
import { VideoShowcase } from "@/components/gut/video-showcase"
import { MemeGallery } from "@/components/gut/meme-gallery"
import { MemeGenerator } from "@/components/gut/meme-generator"
import { Gutonomics } from "@/components/gut/gutonomics"
import { HowToFeed } from "@/components/gut/how-to-feed"
import { Roadmap } from "@/components/gut/roadmap"
import { SiteFooter } from "@/components/gut/site-footer"

// Marquee data extracted for consistency and reusability
const MARQUEE_DATA = {
  top: ["FEED ME PROFITS", "NO FUCKING SELL", "GUTLORD RULES", "$GUT", "DIAMOND GUT"],
  bottom: ["BUY $GUT", "HOLD FOREVER", "FEED THE KING", "GUTLORD", "EAT THE CHART"],
}

/**
 * Home page with Next.js 16 optimizations
 * Server-rendered by default for optimal performance
 * Caching is automatically handled by Next.js 16 Cache Components
 */
export default function Page() {
  return (
    <main id="top" className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <Marquee items={MARQUEE_DATA.top} />
      <VideoShowcase />
      <MemeGallery />
      <MemeGenerator />
      <Marquee reverse items={MARQUEE_DATA.bottom} />
      <Gutonomics />
      <Roadmap />
      <HowToFeed />
      <SiteFooter />
    </main>
  )
}
