import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireAdmin() {
  const session = await getSession();

  if (!session) redirect("/login");
  if (session.user.role !== "admin") redirect("/");

  return session;
}
