import { categories, products } from "@/data";
import { db } from "./db";

async function main() {
  for (const category of categories) {
    await db.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  for (const { categorySlugs, ...product } of products) {
    const connect = categorySlugs.map((slug) => ({ slug }));

    await db.product.upsert({
      where: { articleNumber: product.articleNumber },
      update: { ...product, categories: { set: connect } },
      create: { ...product, categories: { connect } },
    });
  }

  console.log(
    `Seedade ${categories.length} Kategorier och ${products.length} produkter`,
  );
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
