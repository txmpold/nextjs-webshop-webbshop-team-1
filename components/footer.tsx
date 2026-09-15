"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <main className="bg-[#2f2f2f]">
      <footer className="grid grid-cols-3 text-xs mx-auto items-center justify-between p-4 border-t-26 border-[#b8342a] px-6 py-8 justify-items-center pt-12 pb-12 bg-[#2f2f2f]">
        <section className="grid gap-6">
          <h2 className="text-[#ede7da] font-bold mb-4">"Brand"</h2>
          <Link
            href="/aboutus"
            className="text-[#ede7da] hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            About Us
          </Link>
          <Link
            href="/sustainability"
            className="text-[#ede7da] hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            Sustainability
          </Link>
          <Link
            href="/careers"
            className="text-[#ede7da] hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            Careers
          </Link>
        </section>
        <section className="grid gap-6">
          <h2 className="text-[#ede7da] font-bold mb-4">Discover</h2>
          <Link
            href="/howitworks"
            className="text-[#ede7da] hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            How it works
          </Link>
          <Link
            href="/verification"
            className="text-[#ede7da] hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            Verification
          </Link>
          <Link
            href="/register"
            className="text-[#ede7da] hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            Sign Up
          </Link>
        </section>
        <section className="grid gap-6">
          <h2 className="text-[#ede7da] font-bold mb-4">Help</h2>
          <Link
            href="/delivery"
            className="text-[#ede7da] hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            Delivery
          </Link>
          <Link
            href="/returnpolicy"
            className="text-[#ede7da] hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            Return Policy
          </Link>
          <Link
            href="/contactus"
            className="text-[#ede7da] hover:underline underline-offset-8 decoration-2 decoration-zinc-500"
          >
            Contact Us
          </Link>
        </section>
      </footer>
    </main>
  );
}
