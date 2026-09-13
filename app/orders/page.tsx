import { getSession } from "@/lib/auth-server";
import { db } from "@/prisma/db";
import { redirect } from "next/navigation";

export default async function OrderHistoryPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const orders = await db.order.findMany({
    where: { userId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  if (orders.length === 0) {
    return (
      <main className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <p className="text-gray-500">You haven&apos;t placed any orders yet.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="grid gap-4">
        {orders.map((order) => {
          const total = order.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
          );

          return (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">
                  Order #{order.orderNumber}
                </span>
                <span className="text-sm text-gray-500">
                  {order.createdAt.toLocaleDateString()}
                </span>
              </div>

              <ul className="text-sm text-gray-700 mb-2">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.quantity} × {item.title} — {item.price} kr
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center">
                <span className="text-sm">
                  Status: {order.shipped ? "Shipped" : "Processing"}
                </span>
                <span className="font-semibold">{total} kr</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}