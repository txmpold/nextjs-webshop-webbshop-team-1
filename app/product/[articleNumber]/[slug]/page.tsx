import AddToCartButton from "@/components/add-to-cart-button";
import DetailPageDropdown from "@/components/ui/detail-page-dropdown";
import { db } from "@/prisma/db";
import { cn } from "@/lib/utils";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug } });

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <main className="p-5">
      <section className="grid md:grid-cols-2 md:gap-10">
        <div className="flex items-center justify-center">
          <img
            className="w-3/4 h-auto mb-5 rounded-md"
            src={product.image}
            alt={product.title}
          />
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col gap-4 justify-start md:mt-25 md:w-3/4">
            <h1 className="text-3xl font-bold mb-5" data-cy="product-title">
              {product.title}
            </h1>
            <p className="mb-5" data-cy="product-description">
              {product.description}
            </p>
            <p className="text-xl font-semibold" data-cy="product-price">
              {product.price}kr
            </p>
            <p
              className={cn(
              "text-sm font-medium",
              product.stock > 0 ? "text-gray-600" : "text-red-600"
            )}
            data-cy="product-stock"
>
            {product.stock > 0 ? `${product.stock} left in stock` : "Out of stock"}
          </p>

            <AddToCartButton
              id={product.id}
              title={product.title}
              articleNumber={product.articleNumber}
              imageUrl={product.image}
              price={product.price}
              slug={product.slug}
              buttonText="Add to Cart"
              variant="default"
              className="px-5 py-6 mb-10 mt-2 font-bold bg-[#2f2f2f] text-[#ece4d8] rounded-xl hover:bg-[#ece4d8] hover:text-[#2f2f2f]  transition-all duration-300 cursor-pointer"
            />

            <DetailPageDropdown
              title="Shipping"
              content="We aim to dispatch all orders within 24 business hours. Kassetten offers UPS and Postnord shipping services.\nThe shipping service and cost is based on your selected location. We offer free shipping worldwide on all orders over 500kr."
            />
            <DetailPageDropdown
              title="Returns"
              content="Kassetten has a 14-day return policy: you have 14 days from
              when your order is delivered to ship it back to us for a refund or
              exchange.​ The order must be returned in original condition with
              included original packaging."
            />

            <p className="text-xs text-gray-500" data-cy="product-id">
              Article number: {product.articleNumber}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
