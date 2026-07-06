import { Home } from "lucide-react"
import { GUT } from "@/lib/gut-config"

const nav = [
  { label: "Memes", href: "#memes" },
  { label: "Meme Maker", href: "#meme-generator" },
  { label: "Gutonomics", href: "#gutonomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "How To Feed", href: "#how-to-feed" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-neon-green/50 bg-black/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <a href="/" className="flex items-center gap-3 group">
          <span className="grid size-10 place-items-center rounded-full border-2 border-neon-green bg-black text-neon-green group-hover:shadow-[0_0_15px_rgba(0,221,0,0.6)] transition-all">
            <Home className="size-5" />
          </span>
          <span className="font-display text-2xl tracking-wider text-white uppercase font-black">
            {GUT.ticker}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-display text-xs tracking-widest text-white uppercase transition-all hover:text-neon-green hover:shadow-[0_0_10px_rgba(0,221,0,0.5)]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href={GUT.links.buy}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border-2 border-neon-green bg-neon-green px-5 py-2.5 font-display text-sm tracking-wider text-black uppercase font-bold transition-all hover:shadow-[0_0_20px_rgba(0,221,0,0.8)] hover:-translate-y-0.5"
        >
          Buy {GUT.ticker}
        </a>
      </div>
    </header>
  )
}
