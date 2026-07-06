/**
 * Video showcase section
 * Server-rendered with lazy-loaded video for better performance
 */
export function VideoShowcase() {
  return (
    <section className="px-4 py-20 md:py-32 bg-black relative">
      {/* Background glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-neon-green/5 to-transparent" />
      
      <div className="mx-auto max-w-4xl relative">
        <div className="relative group">
          {/* Outer glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-2xl bg-gradient-to-r from-neon-green via-neon-cyan to-neon-green blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"
          />
          
          {/* Video container with lazy loading */}
          <div className="relative overflow-hidden rounded-xl border-2 border-neon-green shadow-[0_0_40px_rgba(34,255,0,0.5)]">
            <video
              className="h-auto w-full"
              src="/gut/sumo-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
            />
          </div>
          
          {/* Label badge */}
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border-2 border-neon-green bg-black px-5 py-2 font-display text-xs tracking-widest text-neon-green uppercase font-bold">
            GUTLORD IN MOTION
          </span>
        </div>
      </div>
    </section>
  )
}
