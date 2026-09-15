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
import { signIn, signUp } from "@/lib/auth-client";
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
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const router = useRouter();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const parsed = signUpSchema.safeParse({ name, email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setStatus("submitting");

    try {
      await signUp.email({ name, email, password });

      setStatus("success");

      await signIn.email({ email, password });

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      setError("Sign up failed. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <main className="flex justify-center items-center translate-y-[50%] h-auto">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Welcome aboard!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Your account has been created. Logging you in...
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex justify-center py-[10%]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Become a member!</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              className="w-full cursor-pointer bg-[#2f2f2f] text-[#ece4d8] hover:bg-[#ece4d8] hover:text-[#2f2f2f] transition-all duration-300"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Creating account..." : "Register"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <h4 className="text-gray-500">Already a member?</h4>
          <Link href="/login" className="hover:underline font-bold">
            Login
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
