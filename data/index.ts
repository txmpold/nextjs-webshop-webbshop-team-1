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
    name: "Games",
    slug: "games",
    description: "Vintage game cartridges from the 80s and 90s.",
    image: "/assets/images/game-mario.jpg",
  },
  {
    name: "Comics",
    slug: "comics",
    description: "Classic comics in great condition.",
    image: "/assets/images/comic-daredevil.jpg",
  },
  {
    name: "Posters",
    slug: "posters",
    description: "Original movie and game posters.",
    image: "/assets/images/poster-starwars.jpg",
  },
  {
    name: "Merch",
    slug: "merch",
    description: "Merch and collectibles from movies and games.",
    image: "/assets/images/top-speedracer.jpg",
  },
];

/* Lägg till era produkter här */
export const products: SeedProduct[] = [
  {
    articleNumber: "GAME-1001",
    slug: "Super-Mario-Bros",
    title: "Super Mario Bros / Duck Hunt",
    description:
      "Complete in cardboard with manual. Cardboard has light shelf wear.",
    image: "/assets/images/game-mario.jpg",
    price: 249,
    stock: 1,
    condition: "Good",
    type: "game",
    releaseYear: 1992,
    platform: "Mega Drive",
    categorySlugs: ["games"],
  },
  {
    articleNumber: "GAME-1002",
    slug: "mega-man",
    title: "Mega Man",
    description:
      "Complete in cardboard with manual. Cardboard has light shelf wear.",
    image: "/assets/images/game-megaman.jpg",
    price: 399,
    stock: 1,
    condition: "Good",
    type: "game",
    releaseYear: 1990,
    platform: "SNES",
    categorySlugs: ["games"],
  },
  {
    articleNumber: "GAME-1003",
    slug: "metroid",
    title: "Metroid",
    description:
      "Caassette in great condition apart from some wear on the label. Cardbord has light shelf wear.",
    image: "/assets/images/game-metroid.jpg",
    price: 299,
    stock: 2,
    condition: "Ok",
    type: "game",
    releaseYear: 1992,
    platform: "SNES",
    categorySlugs: ["games"],
  },
  {
    articleNumber: "GAME-1004",
    slug: "legend-of-zelda",
    title: "The Legend of Zelda",
    description:
      "Complete in cardboard with manual. Cardboard has light shelf wear.",
    image: "/assets/images/game-zelda.jpg",
    price: 499,
    stock: 2,
    condition: "Good",
    type: "game",
    releaseYear: 1992,
    platform: "SNES",
    categorySlugs: ["games"],
  },
  {
    articleNumber: "CO-2001",
    slug: "superman-nr-32-1992",
    title: "Superman nr 32, 1992",
    description: "Near mint condition for its age. Slightly yellowed pages.",
    image: "/assets/images/comic-superman.jpg",
    price: 199,
    stock: 1,
    condition: "Very Good",
    type: "comic",
    releaseYear: 1992,
    issueNumber: "Nr 32, 1992",
    categorySlugs: ["comics"],
  },
  {
    articleNumber: "CO-2002",
    slug: "daredevil-nr-16-1991",
    title: "Daredevil nr 16, 1991",
    description: "Great condition for its age. No yellowed pages.",
    image: "/assets/images/comic-daredevil.jpg",
    price: 149,
    stock: 3,
    condition: "Very Good",
    type: "comic",
    releaseYear: 1991,
    issueNumber: "Nr 16, 1991",
    categorySlugs: ["comics"],
  },
  {
    articleNumber: "CO-2003",
    slug: "batman-nr-201-1993",
    title: "Batman nr 201, 1993",
    description: "Decent condition for its age. No yellowed pages.",
    image: "/assets/images/comic-batman.jpg",
    price: 199,
    stock: 3,
    condition: "Good",
    type: "comic",
    releaseYear: 1993,
    issueNumber: "Nr 201, 1993",
    categorySlugs: ["comics"],
  },
  {
    articleNumber: "PO-3001",
    slug: "star-wars-a-new-hope",
    title: "Star Wars: A New Hope Poster",
    description: "Original poster from the premiere.",
    image: "/assets/images/poster-starwars.jpg",
    price: 450,
    stock: 1,
    condition: "Good",
    type: "poster",
    releaseYear: 1993,
    dimensions: "70 x 100 cm",
    categorySlugs: ["posters"],
  },
  {
    articleNumber: "PO-3002",
    slug: "godzilla",
    title: "Godzilla Japanese Movie Poster",
    description: "Rare Japanese original movie poster.",
    image: "/assets/images/poster-godzilla.jpg",
    price: 700,
    stock: 1,
    condition: "Very Good",
    type: "poster",
    releaseYear: 1992,
    dimensions: "61 x 91 cm",
    categorySlugs: ["posters"],
  },
  {
    articleNumber: "PO-3003",
    slug: "my-neighbor-totoro",
    title: "My Neighbor Totoro",
    description: "35th anniversary edition movie poster.",
    image: "/assets/images/poster-totoro.jpg",
    price: 250,
    stock: 1,
    condition: "New",
    type: "poster",
    releaseYear: 1991,
    dimensions: "50 x 70 cm",
    categorySlugs: ["posters", "merch"],
  },
  {
    articleNumber: "ME-4001",
    slug: "speed-racer-t-shirt",
    title: "Rare Vintage Speed Racer T-Shirt",
    description: "Rare vintage t-shirt. Washed, no stains.",
    image: "/assets/images/top-speedracer.jpg",
    price: 1150,
    stock: 2,
    condition: "Good",
    type: "merch",
    categorySlugs: ["merch"],
  },
  {
    articleNumber: "ME-4002",
    slug: "star-wars-t-shirt",
    title: "Vintage Star Wars T-Shirt",
    description: "Rare vintage t-shirt. Washed, no stains.",
    image: "/assets/images/top-starwars.jpg",
    price: 1400,
    stock: 2,
    condition: "Good",
    type: "merch",
    categorySlugs: ["merch"],
  },
  {
    articleNumber: "ME-4003",
    slug: "the-wizard-of-oz-t-shirt",
    title: "Rare The Wizard of Oz T-Shirt",
    description: "Very rare vintage t-shirt. Washed, no stains.",
    image: "/assets/images/top-wizardofoz.jpg",
    price: 2150,
    stock: 2,
    condition: "Very Good",
    type: "merch",
    categorySlugs: ["merch"],
  },
];
