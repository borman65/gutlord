// $GUT / GUTLORD — central config. Edit links + contract here.
export const GUT = {
  name: "GUTLORD",
  ticker: "$GUT",
  // Replace with the real mint/contract address when live
  contract: "SOON",
  chain: "SOL",
  links: {
    buy: "https://jup.ag/",
    chart: "https://dexscreener.com/",
    telegram: "https://t.me/GutLord",
    x: "https://x.com/GutLordSol",
  },
}

export type GutLink = keyof typeof GUT.links
