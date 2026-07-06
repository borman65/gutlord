// Decorative animated $GUT coins raining down. Purely cosmetic.
const coins = [
  { left: "6%", delay: "0s", dur: "6.5s", size: 34 },
  { left: "18%", delay: "1.8s", dur: "8s", size: 26 },
  { left: "30%", delay: "3.2s", dur: "7s", size: 44 },
  { left: "44%", delay: "0.9s", dur: "9s", size: 30 },
  { left: "57%", delay: "2.4s", dur: "6s", size: 38 },
  { left: "69%", delay: "4s", dur: "8.5s", size: 24 },
  { left: "80%", delay: "1.2s", dur: "7.5s", size: 40 },
  { left: "91%", delay: "3.6s", dur: "6.8s", size: 28 },
]

function Coin({ size }: { size: number }) {
  return (
    <span
      className="grid place-items-center rounded-full border-2 border-[oklch(0.62_0.13_70)] bg-gradient-to-br from-gold-soft to-gold font-display text-primary-foreground shadow-[0_0_18px_oklch(0.82_0.15_85_/_0.5)]"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      G
    </span>
  )
}

export function FloatingCoins() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {coins.map((c, i) => (
        <div
          key={i}
          className="absolute top-0 animate-rain"
          style={{ left: c.left, animationDelay: c.delay, animationDuration: c.dur }}
        >
          <Coin size={c.size} />
        </div>
      ))}
    </div>
  )
}
