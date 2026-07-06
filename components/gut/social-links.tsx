import { ShoppingCart, CandlestickChart } from "lucide-react"
import { GUT } from "@/lib/gut-config"

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-1.99 1.93c-.23.23-.42.42-.84.42z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const items = [
  { key: "buy", label: "BUY $GUT", href: GUT.links.buy, Icon: ShoppingCart, isPrimary: true },
  { key: "chart", label: "CHART", href: GUT.links.chart, Icon: CandlestickChart, isPrimary: false },
  { key: "telegram", label: "TELEGRAM", href: GUT.links.telegram, Icon: TelegramIcon, isPrimary: false },
  { key: "x", label: "X / TWITTER", href: GUT.links.x, Icon: XIcon, isPrimary: false },
]

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
      {items.map(({ key, label, href, Icon, isPrimary }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group inline-flex items-center gap-2 rounded-lg border-2 px-6 py-3 font-display tracking-wider uppercase font-bold text-sm transition-all duration-150 hover:-translate-y-1 active:translate-y-0 ${
            isPrimary
              ? "border-neon-green bg-neon-green text-black shadow-[0_0_20px_rgba(34,255,0,0.6)] hover:shadow-[0_0_30px_rgba(34,255,0,0.8)]"
              : "border-neon-green/50 bg-black text-neon-green hover:border-neon-green hover:shadow-[0_0_20px_rgba(34,255,0,0.5)]"
          }`}
        >
          <Icon className="size-5" />
          {label}
        </a>
      ))}
    </div>
  )
}
