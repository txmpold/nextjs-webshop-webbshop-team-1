import { getSession } from "@/lib/auth-server";
import { db } from "@/prisma/db";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/logout-button";

export default async function ProfilePage() {
	const session = await getSession();

	if (!session?.user) {
		redirect("/login");
	}

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
				<h1 className="text-4xl font-bold text-zinc-900">Welcome back, {user.name}!</h1>
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
							<p className="text-sm text-zinc-600">Member since {user.createdAt.toLocaleDateString("en-GB")}</p>
						</div>
					</div>

					<dl className="space-y-5 pt-6">
						<div>
							<dt className="text-xs font-semibold uppercase text-zinc-500">Name</dt>
							<dd className="mt-1 text-zinc-900">{user.name}</dd>
						</div>
						<div>
							<dt className="text-xs font-semibold uppercase text-zinc-500">Email</dt>
							<dd className="mt-1 break-words text-zinc-900">{user.email}</dd>
						</div>
						<LogoutButton />
					</dl>
				</article>

                <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-bold text-zinc-900">Your Orders</h2>

                    {/* här ska vi lägga till ordrar sen */}

                </article>
			</section>

			
		</main>
	);
}
