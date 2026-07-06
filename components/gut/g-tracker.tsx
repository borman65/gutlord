'use client'

import { useEffect, useRef, useState } from 'react'

interface FloatingG {
  id: number
  x: number
  y: number
  life: number
}

const MAX_GS = 20
const FADE_RATE = 0.05
const ANIMATION_FRAME = 50

export function GTracker() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [floatingGs, setFloatingGs] = useState<FloatingG[]>([])
  const idRef = useRef(0)
  const floatingGsRef = useRef<FloatingG[]>([])
  const lastUpdateRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      // Throttle to ~60fps (16ms)
      if (now - lastUpdateRef.current < 16) return
      lastUpdateRef.current = now

      const newG: FloatingG = {
        id: idRef.current++,
        x: e.clientX,
        y: e.clientY,
        life: 1,
      }

      floatingGsRef.current = [...floatingGsRef.current, newG].slice(-MAX_GS)
      setFloatingGs(floatingGsRef.current)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Animation loop to fade out Gs
    const interval = setInterval(() => {
      floatingGsRef.current = floatingGsRef.current
        .map((g) => ({ ...g, life: g.life - FADE_RATE }))
        .filter((g) => g.life > 0)

      if (floatingGsRef.current.length > 0) {
        setFloatingGs([...floatingGsRef.current])
      }
    }, ANIMATION_FRAME)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
      {floatingGs.map((g) => (
        <div
          key={g.id}
          className="absolute text-4xl font-bold"
          style={{
            left: `${g.x}px`,
            top: `${g.y}px`,
            transform: 'translate(-50%, -50%)',
            opacity: g.life,
            color: '#00ffff',
            textShadow: '0 0 10px #00ffff, 0 0 20px #00ff00',
            pointerEvents: 'none',
            fontFamily: 'monospace',
            animation: `float-up 1s ease-out forwards`,
          }}
        >
          G
        </div>
      ))}

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translate(-50%, -50%) translateY(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translateY(-60px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
