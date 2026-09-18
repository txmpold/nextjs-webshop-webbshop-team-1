import ProductForm from "../product-form";
import { db } from "@/prisma/db";
import { requireAdmin } from "@/lib/auth-server";
import { productSchema } from "@/data/form";

async function createNewProduct(formData: FormData) {
  "use server";

  await requireAdmin();

  const result = productSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return;
  }

  const data = result.data;

  const price = Number(data.price);
  const stock = Number(data.stock);

  const articleNumber =
    data.articleNumber && data.articleNumber.trim() !== ""
      ? data.articleNumber.trim()
      : Math.floor(Math.random() * 10000).toString();

  const slug = `${data.title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;

  await db.product.create({
    data: {
      title: data.title,
      description: data.description,
      image: data.image,
      price,
      stock,
      slug,
      articleNumber,
    },
  });
}

export default async function NewProductPage() {
  await requireAdmin();

  return (
    <main className="min-h-screen grid bg-muted/30 md:grid-cols-2">
      <div className="flex justify-center w-full items-center space-y-4 text-stone-800 bg-white">
        <ProductForm action={createNewProduct} />
      </div>

      <div className="hidden h-screen md:block">
        <img
          src="/assets/images/image-new-productpage.jpg"
          alt="Clothes in store"
          className="object-cover w-full h-full"
        />
      </div>
    </main>
  );
}
