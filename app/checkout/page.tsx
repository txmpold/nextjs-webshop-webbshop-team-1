import { Form } from "@/components/form";
import ShoppingCartList from "@/components/shopping-cart";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/auth-server";
import Link from "next/link";

export default async function DeliveryPage() {
  const session = await getSession();

  return (
    <div className="flex flex-col justify-between lg:px-25 lg:py-10 md:gap-10 md:flex-row">
      <ShoppingCartList />
      <Separator orientation="vertical" className="w-full" />

      {session ? (
        <Form />
      ) : (
        <div>
          Please{" "}
          <Link href={"/login"} className="font-bold hover:underline">
            Login
          </Link>{" "}
          to proceed with checkout
        </div>
      )}
    </div>
  );
}
