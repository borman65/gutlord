import { Crown, Zap } from "lucide-react"

type MarqueeProps = {
  items: string[]
  reverse?: boolean
}

export function Marquee({ items, reverse }: MarqueeProps) {
  const row = [...items, ...items]
  return (
    <div className="relative flex w-full overflow-hidden border-y-2 border-neon-green/60 bg-black py-4 select-none">
      {/* Glow effect */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-green/10 to-transparent pointer-events-none" />
      
      <div
        className={`flex shrink-0 items-center gap-8 pr-8 ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 font-display text-xl tracking-wider text-white uppercase whitespace-nowrap md:text-2xl font-bold"
            style={{
              textShadow: '0 0 10px rgba(0, 221, 0, 0.8), 0 0 20px rgba(0, 255, 255, 0.4)'
            }}
          >
            <Zap aria-hidden className="size-5 text-neon-green animate-pulse" />
            {item}
            <Crown aria-hidden className="size-5 text-neon-cyan" />
          </span>
        ))}
      </div>
    </div>
  )
}
