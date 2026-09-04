"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Link
        href={"/login"}
        className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
      >
        Profile
      </Link>
    );
  }

  return (
    <Link
      href={"/login"}
      className="text-zinc-600 hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
    >
      Login
    </Link>
  );
}
