"use client";

import { Customer, customerSchema } from "@/data/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ContactFormFields from "./contact-form-fields";
import { PaymentFormFields } from "./payment-form-fields";
import { Button } from "./ui/button";
import { useCartContext } from "@/app/providers/cart-provider";
import { createOrder } from "@/app/actions/order-actions";

export function Form() {
  const { productsInCart } = useCartContext();
  const [orderError, setOrderError] = useState<string | null>(null);

  const { register, handleSubmit, formState } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
  });

  const saveCustomer = async (customer: Customer) => {
    // Tar bort ett gammalt fel innan ett nytt orderförsök
    setOrderError(null);

    const result = await createOrder({
      name: customer.name,
      email: customer.email,
      address: customer.address,
      postalCode: customer.postalCode,
      city: customer.city,
      phone: customer.phoneNr,
      items: productsInCart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      })),
    });

    // Visar serverns felmeddelande för användaren
    if (!result.success) {
      setOrderError(result.error ?? "Could not create order");
      return;
    }

    localStorage.removeItem("cart");
    window.location.href = `/confirmation/${result.orderNumber}`;
  };

  return (
    <form
      data-cy="customer-form"
      className="grid gap-6 lg:gap-10 w-full p-8 lg:p-15"
      onSubmit={handleSubmit(saveCustomer)}
    >
      <ContactFormFields register={register} formState={formState} />
      <PaymentFormFields register={register} />

      {orderError && (
        <p role="alert" className="text-red-600 font-medium">
          {orderError}
        </p>
      )}

      <Button
        data-cy="product-buy-button"
        type="submit"
        className="bg-black text-white p-2 rounded-lg font-medium cursor-pointer"
      >
        Pay now
      </Button>
    </form>
  );
}
