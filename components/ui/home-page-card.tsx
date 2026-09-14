"use client";
import { Card } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "../add-to-cart-button";
import { Button } from "./button";

export interface HomePageCardProps {
  id: string;
  title: string;
  articleNumber: string;
  imageUrl: string;
  price: number;
  slug: string;
}

export default function HomePageCard({
  id,
  title,
  articleNumber,
  imageUrl,
  price,
  slug,
}: HomePageCardProps) {
  return (
    <Card data-cy="product" className="relative gap-0 p-0">
      <Link
        href={`/product/${articleNumber}/${slug}`}
        className="block leading-none"
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="block aspect-[2/3] w-full object-cover"
          />
        )}
      </Link>
      <Link
        href={`/product/${articleNumber}/${slug}`}
        className="absolute bottom-4 left-4 text-md text-stone-600 font-semibold hover:underline"
        data-cy="product-title"
      >
        {title}
      </Link>
      <p
        data-cy="product-price"
        className="absolute bottom-3.5 right-4 text-stone-600 text-md font-semibold"
      >
        {price}kr
      </p>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 p-4.5 sm:p-3 hover:cursor-pointer"
      >
        <PlusIcon />
      </Button>
      <AddToCartButton
        id={id}
        title={title}
        articleNumber={articleNumber}
        imageUrl={imageUrl}
        price={price}
        slug={slug}
        buttonText=""
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 p-4.5 sm:p-3 hover:cursor-pointer"
        data-cy="product-buy-button"
      />
    </Card>
  );
}
