"use client";

import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      await signIn.email({
        email: result.data.email,
        password: result.data.password,
      });

      router.push("/product");
    } catch (err) {
      console.error("login failed:", err);
      setError("Invalid email or password.");
    }
  };

  return (
    <main className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <h1 className="font-bold">Welcome back!</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="py-3 px-10 rounded-lg text-white font-bold bg-[#8b0836] hover:cursor-pointer hover:bg-[#ddd9cd] hover:text-black transition-all duration-300"
        >
          Log in
        </button>

        <h3 className="text-gray-500">Not a member?</h3>
        <Link href="/sign-up" className="hover:underline font-bold">
          Register
        </Link>
      </form>
    </main>
  );
}
