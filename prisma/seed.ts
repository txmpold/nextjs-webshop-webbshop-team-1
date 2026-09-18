import { categories, products } from "@/data";
import { db } from "./db";
import { auth } from "@/lib/auth";

  const ADMIN_EMAIL = "admin@wornstories.se";
  const ADMIN_PASSWORD = "admin12345";

async function seedAdmin() {
  const existing = await db.user.findUnique({ where: { email: ADMIN_EMAIL } });

  if (existing) {
    console.log("Admin finns rredan");
    return;
  }

  await auth.api.signUpEmail({
    body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: "Admin" },
  });

  await db.user.update({
    where: { email: ADMIN_EMAIL },
    data: { role: "admin" },
  });

  console.log(`Skapade admin: ${ADMIN_EMAIL}`);
}

async function main() {
  await seedAdmin();
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
