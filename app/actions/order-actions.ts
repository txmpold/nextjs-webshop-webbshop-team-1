"use server";

import { randomUUID } from "crypto";
import { z } from "zod";
import { db } from "@/prisma/db";
import { getSession } from "@/lib/auth-server";

const createOrderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  address: z.string().min(1, "Address is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  city: z.string().min(1, "City is required"),
  phone: z.string().min(1, "Phone is required"),

  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1),
      }),
    )
    .min(1, "Order must contain at least one item"),
});

export async function createOrder(input: unknown) {
  const session = await getSession();

  if (!session?.user) {
    return {
      success: false,
      error: "You must be logged in to place an order",
    };
  }

  const result = createOrderSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: "Invalid order data",
      issues: result.error.flatten(),
    };
  }

  const data = result.data;

  const productIds = data.items.map((item) => item.productId);

  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  if (products.length !== data.items.length) {
    return {
      success: false,
      error: "One or more products could not be found",
    };
  }

  const orderNumber = `ORD-${randomUUID().slice(0, 8).toUpperCase()}`;

  const order = await db.order.create({
    data: {
      orderNumber,
      userId: session.user.id,
      name: data.name,
      email: data.email,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      phone: data.phone,

      items: {
        create: data.items.map((item) => {
          const product = products.find(
            (product: (typeof products)[number]) =>
              product.id === item.productId,
          )!;

          return {
            productId: product.id,
            title: product.title,
            price: product.price,
            quantity: item.quantity,
          };
        }),
      },
    },

    include: {
      items: true,
    },
  });

  return {
    success: true,
    orderNumber: order.orderNumber,
  };
}
