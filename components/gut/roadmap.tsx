import { Utensils, TrendingUp, Crown, Flame } from "lucide-react"

const phases = [
  {
    icon: Utensils,
    phase: "Phase 1",
    title: "First Bite",
    desc: "Launch $GUT, deploy the contract, and gather the hungriest feeders on the chain.",
  },
  {
    icon: TrendingUp,
    phase: "Phase 2",
    title: "Eat The Chart",
    desc: "Trending everywhere, DEX listings, and the Gutlord burping nothing but green candles.",
  },
  {
    icon: Crown,
    phase: "Phase 3",
    title: "Crown The Belly",
    desc: "CEX listings, viral meme army, and the fattest king ruling every timeline.",
  },
  {
    icon: Flame,
    phase: "Phase 4",
    title: "Never Sell",
    desc: "Eternal hold. The Gutlord feasts forever while paperhands starve. No fucking sell.",
  },
]

export function Roadmap() {
  return (
    <section id="roadmap" className="px-4 py-20 md:py-32 bg-black relative">
      {/* Background glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none bg-gradient-to-b from-neon-cyan/5 via-transparent to-neon-green/5" />
      
      <div className="mx-auto max-w-6xl relative">
        <h2 className="text-center font-display text-5xl md:text-7xl tracking-tighter uppercase font-black mb-4">
          <span className="neon-text-glow">The Feeding Plan</span>
        </h2>
        <p className="mx-auto mt-2 mb-12 max-w-2xl text-center text-white font-display text-lg tracking-wide">
          A roadmap as serious as a king with a cigar. Four courses to infinite glory.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((p) => (
            <div
              key={p.phase}
              className="flex flex-col gap-4 rounded-lg border-2 border-neon-green/40 bg-black p-6 transition-all hover:border-neon-green hover:shadow-[0_0_25px_rgba(0,221,0,0.5)] hover:-translate-y-2 group"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-lg bg-neon-green/10 text-neon-green group-hover:bg-neon-green/20 transition-all">
                <p.icon className="size-6" />
              </span>
              <span className="font-display text-xs tracking-widest text-neon-cyan uppercase font-bold">
                {p.phase}
              </span>
              <h3 className="font-display text-lg tracking-wide text-white uppercase font-bold">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
