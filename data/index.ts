/**
 * Beskriver en produkt som ska säljas på sidan.
 * OBS: Kan utökas men inte ändras pga cypress.
 **/


export type SeedCategory = {
  name: string;
  slug: string;
  description: string;
};

export type SeedProduct = {
  articleNumber: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  condition: string; 
  type: string;
  releaseYear?: number;
  platform?: string;
  issueNumber?: string;
  dimensions?: string;
  categorySlugs: string[];
}

export const categories: SeedCategory[] = [
  { name: "TV-spel", slug: "tv-spel", description: "Begagnade spel till konsoler från 80- och 90-talet." },
  { name: "Serietidningar", slug: "serietidningar", description: "Klassiska serietidningar i varierande skick." },
  { name: "Posters", slug: "posters", description: "Filmaffischer och konserttryck i original." },
  { name: "Merch", slug: "merch", description: "Prylar och samlarobjekt från spel- och seriekulturen." },
]



/* Lägg till era produkter här */
export const products: SeedProduct[] = [
  {
    articleNumber: "TV-1001",
    slug: "sonic-the-hedgehog-2",
    title: "Sonic the Hedgehog 2",
    description: "Komplett i kartong med manual. Kartongen har lätt hyllslitage.",
    image: "/assets/products/sonic-the-hedgehog-2.jpg",
    price: 249,
    stock: 1,
    condition: "Bra",
    type: "game",
    releaseYear: 1992,
    platform: "Mega Drive",
    categorySlugs: ["tv-spel"],
  },
  {
    articleNumber: "TV-1002",
    slug: "super-mario-world",
    title: "Super Mario World",
    description: "Endast kassett. Testad och fungerar. Etiketten är hel.",
    image: "/assets/products/super-mario-world.jpg",
    price: 399,
    stock: 1,
    condition: "Mycket bra",
    type: "game",
    releaseYear: 1990,
    platform: "SNES",
    categorySlugs: ["tv-spel"],
  },
  {
    articleNumber: "TV-1003",
    slug: "street-fighter-ii",
    title: "Street Fighter II",
    description: "Välanvänd kassett med repor på etiketten. Fungerar felfritt.",
    image: "/assets/products/street-fighter-ii.jpg",
    price: 299,
    stock: 0,
    condition: "Sliten",
    type: "game",
    releaseYear: 1992,
    platform: "SNES",
    categorySlugs: ["tv-spel"],
  },
  {
    articleNumber: "SE-2001",
    slug: "fantomen-nr-4-1992",
    title: "Fantomen nr 4, 1992",
    description: "Läst en gång. Rygg utan veck, inga fläckar.",
    image: "/assets/products/fantomen-nr-4-1992.jpg",
    price: 45,
    stock: 1,
    condition: "Bra",
    type: "comic",
    releaseYear: 1992,
    issueNumber: "Nr 4, 1992",
    categorySlugs: ["serietidningar"],
  },
  {
    articleNumber: "SE-2002",
    slug: "kalle-anka-nr-12-1991",
    title: "Kalle Anka & C:o nr 12, 1991",
    description: "Fint skick för sin ålder. Lätt gulnade sidor.",
    image: "/assets/products/kalle-anka-nr-12-1991.jpg",
    price: 35,
    stock: 3,
    condition: "Mycket bra",
    type: "comic",
    releaseYear: 1991,
    issueNumber: "Nr 12, 1991",
    categorySlugs: ["serietidningar"],
  },
  {
    articleNumber: "PO-3001",
    slug: "jurassic-park-filmaffisch",
    title: "Jurassic Park – filmaffisch",
    description: "Originalaffisch från biopremiären. Två små nålhål i överkant.",
    image: "/assets/products/jurassic-park-filmaffisch.jpg",
    price: 450,
    stock: 1,
    condition: "Bra",
    type: "poster",
    releaseYear: 1993,
    dimensions: "70 x 100 cm",
    categorySlugs: ["posters"],
  },
  {
    articleNumber: "PO-3002",
    slug: "konsertaffisch-1992",
    title: "Konsertaffisch, Europaturné 1992",
    description: "Tryckt inför turnén. Vikmärken efter förvaring.",
    image: "/assets/products/konsertaffisch-1992.jpg",
    price: 380,
    stock: 1,
    condition: "Sliten",
    type: "poster",
    releaseYear: 1992,
    dimensions: "61 x 91 cm",
    categorySlugs: ["posters"],
  },
  {
    articleNumber: "PO-3003",
    slug: "nintendo-power-affisch",
    title: "Nintendo Power-affisch",
    description: "Följde med tidningen 1991. Räknas både som affisch och samlarobjekt.",
    image: "/assets/products/nintendo-power-affisch.jpg",
    price: 220,
    stock: 1,
    condition: "Bra",
    type: "poster",
    releaseYear: 1991,
    dimensions: "50 x 70 cm",
    categorySlugs: ["posters", "merch"],
  },
  {
    articleNumber: "ME-4001",
    slug: "nintendo-keps",
    title: "Nintendo-keps",
    description: "Broderad logotyp. Tvättad, inga fläckar.",
    image: "/assets/products/nintendo-keps.jpg",
    price: 199,
    stock: 2,
    condition: "Bra",
    type: "merch",
    categorySlugs: ["merch"],
  },
];
