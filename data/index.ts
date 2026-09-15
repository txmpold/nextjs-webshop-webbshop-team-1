/**
 * Beskriver en produkt som ska säljas på sidan.
 * OBS: Kan utökas men inte ändras pga cypress.
 **/


export type SeedCategory = {
  name: string;
  slug: string;
  description: string;
  image: string;
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
};

export const categories: SeedCategory[] = [
  {
    name: "TV-spel",
    slug: "tv-spel",
    description: "Begagnade spel till konsoler från 80- och 90-talet.",
    image: "/assets/images/game-mario.jpg",
  },
  {
    name: "Serietidningar",
    slug: "serietidningar",
    description: "Klassiska serietidningar i varierande skick.",
    image: "/assets/images/comic-daredevil.jpg",
  },
  {
    name: "Posters",
    slug: "posters",
    description: "Filmaffischer och konserttryck i original.",
    image: "/assets/images/poster-starwars.jpg",
  },
  {
    name: "Merch",
    slug: "merch",
    description: "Prylar och samlarobjekt från spel- och seriekulturen.",
    image: "/assets/images/top-speedracer.jpg",
  },
];



/* Lägg till era produkter här */
export const products: SeedProduct[] = [
  {
    articleNumber: "GAME-1001",
    slug: "Super-Mario-Bros",
    title: "Super Mario Bros / Duck Hunt",
    description: "Komplett i kartong med manual. Kartongen har lätt hyllslitage.",
    image: "/assets/images/game-mario.jpg",
    price: 249,
    stock: 1,
    condition: "Bra",
    type: "game",
    releaseYear: 1992,
    platform: "Mega Drive",
    categorySlugs: ["tv-spel"],
  },
  {
    articleNumber: "GAME-1002",
    slug: "mega-man",
    title: "Mega Man",
    description: "Endast kassett. Testad och fungerar. Etiketten är hel.",
    image: "/assets/images/game-megaman.jpg",
    price: 399,
    stock: 1,
    condition: "Mycket bra",
    type: "game",
    releaseYear: 1990,
    platform: "SNES",
    categorySlugs: ["tv-spel"],
  },
  {
    articleNumber: "GAME-1003",
    slug: "metroid",
    title: "Metroid",
    description: "Välanvänd kassett med repor på etiketten. Fungerar felfritt.",
    image: "/assets/images/game-metroid.jpg",
    price: 299,
    stock: 3,
    condition: "Sliten",
    type: "game",
    releaseYear: 1992,
    platform: "SNES",
    categorySlugs: ["tv-spel"],
  },
  {
    articleNumber: "GAME-1004",
    slug: "legend-of-zelda",
    title: "The Legend of Zelda",
    description: "Välanvänd kassett med repor på etiketten. Fungerar felfritt.",
    image: "/assets/images/game-zelda.jpg",
    price: 499,
    stock: 2,
    condition: "Sliten",
    type: "game",
    releaseYear: 1992,
    platform: "SNES",
    categorySlugs: ["tv-spel"],
  },
  {
    articleNumber: "SE-2001",
    slug: "superman-nr-32-1992",
    title: "Superman nr 32, 1992",
    description: "Läst en gång. Rygg utan veck, inga fläckar.",
    image: "/assets/images/comic-superman.jpg",
    price: 199,
    stock: 1,
    condition: "Bra",
    type: "comic",
    releaseYear: 1992,
    issueNumber: "Nr 32, 1992",
    categorySlugs: ["serietidningar"],
  },
  {
    articleNumber: "SE-2002",
    slug: "daredevil-nr-16-1991",
    title: "Daredevil nr 16, 1991",
    description: "Fint skick för sin ålder. Lätt gulnade sidor.",
    image: "/assets/images/comic-daredevil.jpg",
    price: 149,
    stock: 3,
    condition: "Mycket bra",
    type: "comic",
    releaseYear: 1991,
    issueNumber: "Nr 16, 1991",
    categorySlugs: ["serietidningar"],
  },
  {
    articleNumber: "SE-2002",
    slug: "batman-nr-201-1993",
    title: "Batman nr 201, 1993",
    description: "Fint skick för sin ålder. Lätt gulnade sidor.",
    image: "/assets/images/comic-batman.jpg",
    price: 199,
    stock: 3,
    condition: "Mycket bra",
    type: "comic",
    releaseYear: 1993,
    issueNumber: "Nr 201, 1993",
    categorySlugs: ["serietidningar"],
  },
  {
    articleNumber: "PO-3001",
    slug: "star-wars-a-new-hope",
    title: "Star Wars: A New Hope Poster",
    description: "Originalaffisch från biopremiären. Två små nålhål i överkant.",
    image: "/assets/images/poster-starwars.jpg",
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
    slug: "godzilla",
    title: "Godzilla Japanese Movie Poster",
    description: "Tryckt inför turnén. Vikmärken efter förvaring.",
    image: "/assets/images/poster-godzilla.jpg",
    price: 700,
    stock: 1,
    condition: "Sliten",
    type: "poster",
    releaseYear: 1992,
    dimensions: "61 x 91 cm",
    categorySlugs: ["posters"],
  },
  {
    articleNumber: "PO-3003",
    slug: "my-neighbor-totoro",
    title: "My Neighbor Totoro",
    description: "Följde med tidningen 1991. Räknas både som affisch och samlarobjekt.",
    image: "/assets/images/poster-totoro.jpg",
    price: 250,
    stock: 1,
    condition: "Bra",
    type: "poster",
    releaseYear: 1991,
    dimensions: "50 x 70 cm",
    categorySlugs: ["posters", "merch"],
  },
  {
    articleNumber: "ME-4001",
    slug: "speed-racer-t-shirt",
    title: "Rare Vintage Speed Racer T-Shirt",
    description: "Broderad logotyp. Tvättad, inga fläckar.",
    image: "/assets/images/top-speedracer.jpg",
    price: 1150,
    stock: 2,
    condition: "Bra",
    type: "merch",
    categorySlugs: ["merch"],
  },
  {
    articleNumber: "ME-4002",
    slug: "star-wars-t-shirt",
    title: "Vintage Star Wars T-Shirt",
    description: "Broderad logotyp. Tvättad, inga fläckar.",
    image: "/assets/images/top-starwars.jpg",
    price: 1400,
    stock: 2,
    condition: "Bra",
    type: "merch",
    categorySlugs: ["merch"],
  },
  {
    articleNumber: "ME-4003",
    slug: "the-wizard-of-oz-t-shirt",
    title: "Rare The Wizard of Oz T-Shirt",
    description: "Broderad logotyp. Tvättad, inga fläckar.",
    image: "/assets/images/top-wizardofoz.jpg",
    price: 2150,
    stock: 2,
    condition: "Bra",
    type: "merch",
    categorySlugs: ["merch"],
  },
];
