import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/prisma/db";
import { Plus } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth-server";

async function deleteProduct(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  await db.product.deleteMany({ where: { id } });
  revalidatePath("/admin");
}

async function markOrderAsSent(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  await db.order.update({
    where: { id },
    data: { shipped: true },
  });
  revalidatePath("/admin");
}

export default async function AdminPage() {
  await requireAdmin();

  const products = await db.product.findMany({});
  const orders = await db.order.findMany({
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <main className="grid">
      <p className="text-3xl font-bold m-10 text-center">Our products</p>
      <section className="grid gap-4 items-stretch pl-6 pr-6 pb-6 sm:grid-cols-2 xl:grid-cols-3">
        <Link href="/admin/product/new">
          <div className="flex flex-wrap gap-2 px-2 py-2 border rounded-xl w-full hover:bg-muted/50 transition h-full">
            <div className="w-24 h-28 rounded-lg border-2 border-dashed flex items-center justify-center text-sm text-muted-foreground">
              Image
            </div>

            <div className="flex flex-col px-2 py-4 rounded-xl h-full">
              <div className="pl-2 pb-2 pt-2">
                <p
                  data-cy="product-id"
                  className="font-bold text-sm text-stone-600 pb-2"
                >
                  New Product
                </p>
                <p
                  data-cy="product-title"
                  className="font-bold text-sm pb-2 text-stone-600"
                >
                  Title
                </p>
                <p
                  data-cy="product-price"
                  className="text-sm pb-2 text-stone-600"
                >
                  0kr
                </p>
                <p
                  data-cy="product-description"
                  className="text-sm max-w-xs pb-6 text-stone-600"
                >
                  No description
                </p>
              </div>
              <div className="flex gap-2">
                <Button data-cy="admin-add-product" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add new product
                </Button>
              </div>
            </div>
          </div>
        </Link>

        {products.map((product) => (
          <article
            key={product.id}
            data-cy="product"
            className="flex flex-wrap gap-2 px-2 py-2 border h-full rounded-xl"
          >
            {product.image && (
              <img
                className="object-cover rounded-lg w-24 h-28"
                src={product.image}
                alt={product.title}
              />
            )}

            <div className="flex flex-col">
              <div className="pl-2 pb-2">
                <p data-cy="product-id" className="font-bold text-sm pb-2">
                  {product.articleNumber}
                </p>
                <p data-cy="product-title" className="font-bold text-sm pb-2">
                  {product.title}
                </p>
                <p data-cy="product-price" className="text-sm pb-2">
                  {product.price}kr
                </p>
                <p
                  data-cy="product-description"
                  className="text-sm max-w-xs pb-2"
                >
                  {product.description}
                </p>
              </div>

              <Dialog>
                <div className="flex gap-2">
                  <Link href={`/admin/product/${product.articleNumber}`}>
                    <Button variant="outline" data-cy="admin-edit-product">
                      Edit product
                    </Button>
                  </Link>

                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      data-cy="admin-remove-product"
                      className="hover:bg-red-200"
                    >
                      Delete product
                    </Button>
                  </DialogTrigger>
                </div>

                <DialogContent className="sm:max-w-200">
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />

                    <DialogHeader>
                      <DialogTitle className="p-6 whitespace-nowrap">
                        Are you sure you want to delete the product?
                      </DialogTitle>
                    </DialogHeader>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">No</Button>
                      </DialogClose>

                      <Button
                        type="submit"
                        data-cy="confirm-delete-button"
                        className=""
                      >
                        Yes
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </article>
        ))}
      </section>

      <section className="p-6">
        <p className="text-3xl font-bold mb-4 text-center">Orders</p>

        {orders.length === 0 ? (
          <p className="text-center text-muted-foreground">No orders yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {orders.map((order) => {
              const total = order.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0,
              );

              return (
                <article key={order.id} className="border rounded-xl p-4">
                  <p className="font-bold">Order: {order.orderNumber}</p>

                  <p className="text-sm text-muted-foreground">
                    {order.createdAt.toLocaleDateString("sv-SE")}
                  </p>

                  <div className="mt-3">
                    <p className="font-semibold">{order.name}</p>
                    <p>{order.email}</p>
                    <p>{order.phone}</p>
                    <p>{order.address}</p>
                    <p>
                      {order.postalCode} {order.city}
                    </p>
                  </div>

                  <div className="mt-4 border-t pt-4">
                    <p className="font-semibold mb-2">Products</p>

                    {order.items.map((item) => (
                      <div key={item.id} className="mb-2">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm">
                          {item.quantity} x {item.price} kr
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 font-bold">Total: {total} kr</p>

                  {order.shipped ? (
                    <p className="mt-4 font-bold text-green-700">Sent</p>
                  ) : (
                    <form action={markOrderAsSent} className="mt-4">
                      <input type="hidden" name="id" value={order.id} />
                      <Button type="submit" variant="outline">
                        Mark as sent
                      </Button>
                    </form>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
