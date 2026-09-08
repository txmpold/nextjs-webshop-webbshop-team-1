"use client";

import { signUp } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await signUp.email({ name, email, password });
      router.push("/");
    } catch (err) {
      setError("Sign up failed. Please try again.");
    }
  };

  return (
    <main className="flex justify-center">
      <form onSubmit={handleLogin}>
        <h1 className="font-bold">Welcome!</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          className="absolute py-3 px-10 rounded-lg text-white font-bold bg-[#8b0836] hover:cursor-pointer hover:bg-[#ddd9cd] hover:text-black transition-all duration-300"
        >
          Register
        </button>

        <h3 className="text-gray-500">Already a member?</h3>
        <Link href={"/login"} className="hover:underline font-bold">
          Login
        </Link>
      </form>
    </main>
  );
}
