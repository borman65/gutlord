const stats = [
  { value: "1B", label: "Total Belly Supply" },
  { value: "0%", label: "Tax (pure feast)" },
  { value: "100%", label: "Liquidity Burned" },
  { value: "∞", label: "Servings Per Day" },
]

const laws = [
  { title: "Feed Me Profits", desc: "The only mandate. Green candles are dinner, red candles are a snack." },
  { title: "No Fucking Sell", desc: "The Gutlord does not paperhand. Diamond gut, diamond hands." },
  { title: "Community Owned", desc: "Renounced, locked, and ruled by the people who feed the king." },
]

export function Gutonomics() {
  return (
    <section id="gutonomics" className="px-4 py-20 md:py-32 bg-black">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-display text-5xl md:text-7xl tracking-tighter uppercase font-black mb-4">
          <span className="neon-text-glow">Gutonomics</span>
        </h2>
        <p className="text-center text-white font-display text-lg tracking-wide mb-12">
          The laws of the belly. Scientific. Undeniable. BASED.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border-2 border-neon-green/50 bg-black p-6 text-center transition-all hover:border-neon-green hover:shadow-[0_0_30px_rgba(0,221,0,0.5)] hover:-translate-y-1 group"
            >
              <div className="font-display text-5xl md:text-6xl text-white font-black group-hover:text-neon-green transition-colors">{s.value}</div>
              <div className="mt-3 text-xs md:text-sm text-neon-cyan uppercase tracking-wider font-bold">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {laws.map((l) => (
            <div
              key={l.title}
              className="rounded-lg border-2 border-neon-green/40 bg-black p-6 hover:border-neon-green transition-all hover:shadow-[0_0_20px_rgba(0,221,0,0.4)]"
            >
              <h3 className="font-display text-lg tracking-wider text-neon-green uppercase font-bold">
                {l.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-300">{l.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
