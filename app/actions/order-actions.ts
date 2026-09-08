"use server";

import { randomUUID } from "crypto";
import { z } from "zod";
import { db } from "@/prisma/db";
import { getSession } from "@/lib/auth-server";

// Validerar datan som kommer från checkout
const createOrderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  address: z.string().min(1, "Address is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  city: z.string().min(1, "City is required"),
  phone: z.string().min(1, "Phone is required"),

  // En order måste innehålla minst en produkt
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
  // Hämtar användaren som är inloggad
  const session = await getSession();

  // Stoppar ordern om användaren inte är inloggad
  if (!session?.user) {
    return {
      success: false,
      error: "You must be logged in to place an order",
    };
  }

  // Validerar datan från checkout
  const result = createOrderSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: "Invalid order data",
      issues: result.error.flatten(),
    };
  }

  const data = result.data;

  // Hämtar alla produkt-id från kundvagnen
  const productIds = data.items.map((item) => item.productId);

  // Hämtar de riktiga produkterna från databasen
  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  // Stoppar om någon produkt inte finns
  if (products.length !== data.items.length) {
    return {
      success: false,
      error: "One or more products could not be found",
    };
  }

  // Kontrollerar att det finns tillräckligt många produkter i lager
  for (const item of data.items) {
    const product = products.find(
      (product: (typeof products)[number]) => product.id === item.productId,
    );

    if (!product) {
      return {
        success: false,
        error: "Product could not be found",
      };
    }

    if (product.stock < item.quantity) {
      return {
        success: false,
        error: `Not enough stock for ${product.title}`,
      };
    }
  }

  // Skapar ett unikt ordernummer
  const orderNumber = `ORD-${randomUUID().slice(0, 8).toUpperCase()}`;

  try {
    // Transaction gör att lager och order sparas tillsammans
    // Om något går fel rullas allt tillbaka
    const order = await db.$transaction(async (tx) => {
      // Minskar lagret för varje produkt i ordern
      for (const item of data.items) {
        const stockUpdate = await tx.product.updateMany({
          where: {
            id: item.productId,
            stock: {
              gte: item.quantity,
            },
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

        // Stoppar om lagret inte längre räcker
        if (stockUpdate.count !== 1) {
          throw new Error("NOT_ENOUGH_STOCK");
        }
      }

      // Skapar ordern och alla orderrader
      return tx.order.create({
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
    });

    // Skickar tillbaka ordernumret till checkout
    return {
      success: true,
      orderNumber: order.orderNumber,
    };
  } catch (error) {
    // Fel om lagret tog slut innan ordern kunde skapas
    if (error instanceof Error && error.message === "NOT_ENOUGH_STOCK") {
      return {
        success: false,
        error: "One or more products do not have enough stock",
      };
    }

    console.error("Failed to create order:", error);

    return {
      success: false,
      error: "Could not create order",
    };
  }
}
