
import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import ProductForm from "../product-form";
import { requireAdmin } from "@/lib/auth-server";
import { productSchema } from "@/data/form";

async function editProduct(formData: FormData) {
  "use server";

  await requireAdmin();

  const result = productSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return;
  }

  const data = result.data;

  if (!data.id) {
    return;
  }

  await db.product.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      image: data.image,
      category: data.category ?? "",
      price: Number(data.price),
      stock: Number(data.stock),
    },
  });

  revalidatePath("/admin");
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const product = await db.product.findUnique({
    where: { articleNumber: id },
  });

  if (!product) return <p>Product not found!</p>;

  return (
    <main className="min-h-screen grid bg-muted/30 md:grid-cols-2">
      <div className="flex flex-col p-4 flex-1 justify-center items-center text-stone-800 bg-white">
        <ProductForm
          action={editProduct}
          initialValues={{
            id: product.id,
            title: product?.title,
            category: product?.category ?? "",
            description: product?.description,
            image: product?.image,
            price: product?.price.toString(),
            stock: product?.stock.toString(),
            articleNumber: product?.articleNumber,
            slug: product?.slug,
          }}
        />
      </div>

      <div className="hidden h-screen md:block">
        <img
          src={product?.image}
          alt="Clothes in store"
          className="object-cover w-full h-full"
        />
      </div>
    </main>
  );
}
