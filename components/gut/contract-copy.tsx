"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { GUT } from "@/lib/gut-config"

export function ContractCopy() {
  const [copied, setCopied] = useState(false)
  const soon = GUT.contract.trim().toUpperCase() === "SOON"

  if (soon) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <p className="mb-3 text-center font-display text-xs tracking-widest text-neon-cyan uppercase font-bold">
          Contract Address
        </p>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy contract address"
          className="group flex w-full items-center gap-4 rounded-lg border-2 border-neon-green/60 bg-black/80 p-3 pr-5 text-left backdrop-blur transition-all hover:border-neon-green hover:shadow-[0_0_25px_rgba(34,255,0,0.5)]"
        >
          <span
            className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-5 py-3 font-display text-sm tracking-wider uppercase font-bold transition-all ${
              copied ? "bg-neon-cyan text-black" : "bg-neon-green text-black"
            }`}
          >
            {copied ? (
              <>
                <Check className="size-5" /> Copied!
              </>
            ) : (
              <>
                <Copy className="size-5" /> Copy
              </>
            )}
          </span>
          <span className="min-w-0 flex-1 truncate text-center font-display text-3xl tracking-[0.2em] uppercase md:text-5xl font-black">
            <span className="neon-text-glow inline-block">SOON</span>
          </span>
        </button>
        <p className="mt-3 text-center text-xs text-neon-green/70 font-display">
          The Gutlord is loading his plate. Address drops SOON.
        </p>
      </div>
    )
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(GUT.contract)
    } catch {
      // fallback for older browsers
      const ta = document.createElement("textarea")
      ta.value = GUT.contract
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <p className="mb-3 text-center font-display text-xs tracking-widest text-neon-cyan uppercase font-bold">
        Contract Address
      </p>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy contract address"
        className="group flex w-full items-center gap-4 rounded-lg border-2 border-neon-green/60 bg-black/80 p-3 pr-5 text-left backdrop-blur transition-all hover:border-neon-green hover:shadow-[0_0_25px_rgba(34,255,0,0.5)]"
      >
        <span
          className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-5 py-3 font-display text-sm tracking-wider uppercase font-bold transition-all ${
            copied ? "bg-neon-cyan text-black" : "bg-neon-green text-black"
          }`}
        >
          {copied ? (
            <>
              <Check className="size-5" /> Copied!
            </>
          ) : (
            <>
              <Copy className="size-5" /> Copy
            </>
          )}
        </span>
        <span className="min-w-0 flex-1 truncate font-mono text-xs md:text-sm text-neon-green/90 tracking-tighter break-all">
          {GUT.contract}
        </span>
      </button>
      <p className="mt-3 text-center text-xs text-neon-green/70 font-display">
        Tap to copy. The Gutlord rewards loyal feeders.
      </p>
    </div>
  )
}
