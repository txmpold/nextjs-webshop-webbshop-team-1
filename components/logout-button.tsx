"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (!confirmed) {
      return;
    }

    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="w-full rounded-lg bg-black px-10 py-3 font-bold text-white transition-all duration-300 hover:cursor-pointer hover:bg-[#C4302B]"
    >
      Log out
    </button>
  );
}