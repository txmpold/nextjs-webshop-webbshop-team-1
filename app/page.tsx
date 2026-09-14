import { CategoryCard } from "@/components/category-card";
import HomePageCard from "@/components/ui/home-page-card";
import { db } from "@/prisma/db";
import Link from "next/link";

export default async function Home() {
  const [products, categories] = await Promise.all([
    db.product.findMany(),
    db.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <main className="grid gap-8 place-items-center">
      <section className="relative w-full overflow-hidden bg-[#2f2f2f] flex justify-center">
  <video
    src="/assets/videos/gameboy.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="relative aspect-square w-full -translate-y-30 max-w-xl md:h-240 lg:h-240"
  />

  <h1 className="absolute top-75 left-1/2 -translate-x-1/2 text-[#EDE7DA] font-extrabold lg:text-9xl text-center tracking-tight drop-shadow-lg select-none">
    PLAY LIKE IT'S 1989.
  </h1>
  <button className="absolute py-3 px-10 rounded-lg text-white font-bold bg-[#C4302B] lg:bottom-50 left-1/2 -translate-x-1/2 translate-y-1/2 hover:cursor-pointer hover:bg-[#EFA61D] hover:text-black transition-all duration-300">
    <Link href="/product" className="text-lg">
      Shop Now
    </Link>
  </button>
</section>
      <h2 className="text-2xl md:text-4xl md:p-4">Shop by Category</h2>
      <section className="grid w-full grid-cols-1 gap-8 p-2 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            href={`/product?category=${category.slug}`}
            key={category.id}
            className="min-w-0"
          >
            <CategoryCard category={category.name} image={category.image} />
          </Link>
        ))}
      </section>
      <section className="grid gap-8 place-items-center">
        <h2 className="text-xl md:text-3xl font-bold m-4">All Products</h2>
        <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2 mb-4">
          {products.map((product) => (
            <HomePageCard
              key={product.id}
              id={product.id}
              title={product.title}
              articleNumber={product.articleNumber}
              price={product.price}
              imageUrl={product.image}
              slug={product.slug}
            />
          ))}
        </section>
      </section>
    </main>
  );
}
