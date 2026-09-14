"use client";
import { useCartContext } from "@/app/providers/cart-provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LoginButton from "./login-button";

export default function Header() {
  const { productsInCart, isLoaded } = useCartContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalQuantity = productsInCart.reduce(
    (sum, product) => sum + (product.quantity || 1),
    0,
  );

  return (
    <header
  className={`relative z-50 transition-all duration-300 ${
    isHomePage ? "sticky top-0" : ""
  }`}
>
  <div className="flex flex-col">
    <div className="bg-[#b8342a] text-[#ece4d8] text-xs tracking-widest py-1.5 px-4 font-mono uppercase">

    </div>
    <div className="h-2 bg-[#d9622b]" />
    <div className="h-2 bg-[#e8a13a]" />
  </div>

  <div
    className={`flex flex-wrap items-center bg-[#2f2f2f] transition-all duration-300 ${
      isScrolled ? "justify-center px-4 py-6" : "justify-between px-8 py-10"
    }`}
  >
    <Link href="/">
      <h1 className={`font-black tracking-tight text-[#ece4d8] leading-none transition-all duration-300 ${
        isScrolled ? "text-3xl" : "text-6xl md:text-7xl "
      }`}>
        KASSETTEN
      </h1>
      {!isScrolled && (
        <p className="font-mono text-xs tracking-widest text-[#ece4d8] mt-2">
          RETRO GAMES · SINCE 2002
        </p>
      )}
    </Link>

    <nav className="flex flex-1 justify-center gap-8 text-sm md:text-lg md:justify-end">
      <Link href="/product" className="text-[#ece4d8] hover:underline underline-offset-8 decoration-2 decoration-[#ece4d8]">
        Products
      </Link>
      <Link href="/admin" data-cy="admin-link" className="text-[#ece4d8] hover:underline underline-offset-8 decoration-2 decoration-[#ece4d8]">
        Admin
      </Link>
      <Link href="/checkout" data-cy="cart-link" className="text-[#ece4d8] hover:underline underline-offset-8 decoration-2 decoration-[#ece4d8]">
        Cart (<span data-cy="cart-items-count-badge">{isLoaded ? totalQuantity : 0}</span>)
      </Link>
      <LoginButton />
    </nav>
  </div>
</header>
  );
}
