import LogoutButton from "@/components/logout-button";
import { getSession } from "@/lib/auth-server";
import { db } from "@/prisma/db";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const orders = await db.order.findMany({
    where: { userId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          orderNumber: true,
          createdAt: true,
          shipped: true,
          items: {
            select: { quantity: true },
          },
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const initials = user.name
    .split(" ")
    .map((part: string) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12 md:px-10">
      <header className="mb-10 border-b border-zinc-200 pb-8">
        <h1 className="text-4xl font-bold text-zinc-900">
          Welcome back, {user.name}!
        </h1>
        <p className="mt-3 text-zinc-600">
          Manage your account details and keep track of your orders.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-[minmax(0,1fr)_1.4fr]">
        <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4 border-b border-zinc-100 pb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-900 text-xl font-bold text-white">
              {initials}
            </div>

            <div>
              <h2 className="text-xl font-bold text-zinc-900">{user.name}</h2>
              <p className="text-sm text-zinc-600">
                Member since {user.createdAt.toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>

          <dl className="space-y-5 pt-6">
            <div>
              <dt className="text-xs font-semibold uppercase text-zinc-500">
                Name
              </dt>
              <dd className="mt-1 text-zinc-900">{user.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-zinc-500">
                Email
              </dt>
              <dd className="mt-1 break-words text-zinc-900">{user.email}</dd>
            </div>
            <LogoutButton />
          </dl>
        </article>

        <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-zinc-900">Your Orders</h2>

          {orders.length === 0 ? (
            <div className="max-w-3xl mx-auto py-10 px-4">
              <h1 className="text-2xl font-bold mb-4">My Orders</h1>
              <p className="text-gray-500">
                You haven't placed any orders yet.
              </p>
            </div>
          ) : (
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
          )}
        </article>
      </section>
    </main>
  );
}
