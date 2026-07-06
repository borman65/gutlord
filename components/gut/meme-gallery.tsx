import Image from "next/image"

const memes = [
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hesinberg%20gut.png-wnAVp1CBRO5Ioswomp2ww3Jhcgf4Fg.jpeg", alt: "Breaking Gut - Heisenberg with RV in desert", caption: "Breaking Gut", span: "" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%204%20Tem%202026%2020_14_10-IXNr1SQbz9VB5YvszuKL8pL4a68QgK.png", alt: "GUT Kingdom - The One They Feed", caption: "The One They Feed", span: "" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%204%20Tem%202026%2019_59_46-uu6gt9LOGlU8Gpy4YZebLvJtFcOrPU.png", alt: "GUT 100 Dollar Bill", caption: "GUT Dollar", span: "" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%204%20Tem%202026%2019_59_51-TXl0AygMCvrcNkx4YvyCMNdOk9ngi7.png", alt: "3 GUT Kings on couch", caption: "Kings of GUT", span: "" },
  { src: "/gut/goku.jpg", alt: "Super Saiyan Gutlord lounging next to a mountain of cash", caption: "Super Saiyan Gains", span: "md:col-span-2" },
  { src: "/gut/panda.jpg", alt: "Kung Fu Gutlord panda guarding a NO SELL scroll on a cliff", caption: "No Sell Master", span: "" },
  { src: "/gut/godfather.jpg", alt: "Gutlord in a tuxedo holding a cat like the Godfather", caption: "The Gutfather", span: "" },
  { src: "/gut/throne.jpg", alt: "Shredded Gutlord smoking a cigar on a throne", caption: "Built Different", span: "" },
  { src: "/gut/vandamme.jpg", alt: "Gutlord doing the splits between two chairs", caption: "Diamond Hands Split", span: "" },
  { src: "/gut/elon.jpg", alt: "Crowned beach Gutlord", caption: "Beach Billionaire", span: "" },
  { src: "/gut/fatthor.jpg", alt: "Fat Gutlord eating from a bowl with a FEED ME PROFITS tattoo", caption: "Feed Me Profits", span: "" },
  { src: "/gut/money-bros.jpg", alt: "Two Gutlords resting on a bed of money", caption: "Sleeping On Bags", span: "md:col-span-2" },
  { src: "/gut/swing.jpg", alt: "Gutlord relaxing on a park swing in a royal robe", caption: "Chillin' & Pumpin'", span: "" },
  { src: "/gut/courtroom.jpg", alt: "Tattooed Gutlord on trial with a GUTLORD nameplate and FEED ME PROFITS tattoo", caption: "On Trial For Gains", span: "" },
]

export function MemeGallery() {
  return (
    <section id="memes" className="px-4 py-20 md:py-32 bg-black relative">
      {/* Background glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none bg-gradient-to-b from-neon-green/5 via-transparent to-neon-cyan/5" />
      
      <div className="mx-auto max-w-7xl relative">
        <h2 className="text-center font-display text-5xl md:text-7xl tracking-tighter uppercase font-black mb-2">
          <span className="neon-text-glow">Hall of Gut</span>
        </h2>
        <p className="mx-auto mt-4 mb-12 max-w-2xl text-center text-lg text-white font-display tracking-wide">
          Every legend bows to the belly. Behold the many forms of the GUTLORD.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {memes.map((m) => (
            <figure
              key={m.src}
              className={`group relative overflow-hidden rounded-lg border-2 border-neon-green/40 bg-black transition-all duration-300 hover:-translate-y-2 hover:border-neon-green hover:shadow-[0_0_30px_rgba(0,221,0,0.6)] cursor-pointer ${m.span}`}
            >
              <Image
                src={m.src || "/placeholder.svg"}
                alt={m.alt}
                width={640}
                height={640}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 brightness-90 group-hover:brightness-100"
              />
              {/* Overlay glow on hover */}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-neon-green/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black to-black/60 p-4 pt-12">
                <span className="font-display text-sm md:text-base tracking-wider text-white uppercase font-bold">
                  {m.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
