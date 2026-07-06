import { SocialLinks } from "./social-links"
import { ShaderAnimation } from "@/components/ui/shader-animation"

const steps = [
  { n: "01", title: "Get a Wallet", desc: "Grab Phantom or any Solana wallet and load it with some SOL." },
  { n: "02", title: "Copy the Address", desc: "Snatch the $GUT contract from the top of this page." },
  { n: "03", title: "Swap for $GUT", desc: "Hit BUY, paste the address, and feed the king your SOL." },
  { n: "04", title: "Never Sell", desc: "Hold like a true feeder. The Gutlord does not forgive paperhands." },
]

export function HowToFeed() {
  return (
    <section id="how-to-feed" className="px-4 py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Shader Animation Background - Continues to footer */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-50">
        <ShaderAnimation />
      </div>
      
      {/* Background glow overlay for readability */}
      <div aria-hidden className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-black/40 to-black/30" />
      
      <div className="mx-auto max-w-6xl relative z-10">
        <h2 className="text-center font-display text-5xl md:text-7xl tracking-tighter uppercase font-black mb-4">
          <span className="neon-text-glow">How To Feed The King</span>
        </h2>
        <p className="text-center text-white font-display text-lg tracking-wide mb-12">
          Four simple steps. One legendary outcome. ETERNAL HOLD.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {steps.map((s) => (
            <div
              key={s.n}
              className="flex gap-5 rounded-lg border-2 border-neon-green/40 bg-black p-6 transition-all hover:border-neon-green hover:shadow-[0_0_25px_rgba(0,221,0,0.4)] hover:-translate-y-2 group"
            >
              <span className="font-display text-6xl text-gray-600 group-hover:text-neon-green transition-colors font-black">{s.n}</span>
              <div className="flex-1">
                <h3 className="font-display text-lg tracking-wide text-white uppercase font-bold">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <SocialLinks className="mt-12 flex flex-wrap justify-center gap-3" />
      </div>
    </section>
  )
}
