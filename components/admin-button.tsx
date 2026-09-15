"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function AdminButton() {
  const { data: session } = useSession();
  const user = session?.user as { role?: string } | undefined;

  if (user?.role === "admin") {
    return (
      <Link
        href={"/admin"}
        className="text-[#ece4d8] hover:underline underline-offset-3 decoration-2 decoration-[#ece4d8]"
      >
        Admin
      </Link>
    );
  }

  return;
}
