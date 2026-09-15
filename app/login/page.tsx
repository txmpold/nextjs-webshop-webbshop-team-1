"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const validationResult = loginSchema.safeParse({ email, password });

    if (!validationResult.success) {
      setError(validationResult.error.issues[0].message);
      return;
    }

    try {
      const authResult = await signIn.email({
        email: validationResult.data.email,
        password: validationResult.data.password,
      });

      if (authResult.error) {
        setError(authResult.error.message || "Invalid email or password.");
        return;
      }

      const isAdmin = (authResult.data?.user as any)?.role === "admin";

      router.push(isAdmin ? "/admin" : "/product");
    } catch (err) {
      console.error("login failed:", err);
      setError("Invalid email or password.");
    }
  };

  return (
    <main className="flex justify-center py-[10%]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Welcome Back!</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              className="rounded-lg text-[#ece4d8]  bg-[#2f2f2f] lg:bottom-50  hover:cursor-pointer hover:bg-[#ece4d8] hover:text-[#2f2f2f] transition-all duration-300"
            >
              Login
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with GitHub
            </Button> */}
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <h4 className="text-gray-500">Not a member?</h4>
          <Link href="/register" className="hover:underline font-bold">
            Register
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
