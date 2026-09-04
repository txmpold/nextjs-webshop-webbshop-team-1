import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex justify-center">
      <form>
        <h1>Log in</h1>

        <input type="email" placeholder="Email" />

        <input type="password" placeholder="Password" />

        <button className="absolute py-3 px-10 rounded-lg text-white font-bold bg-[#8b0836] lg:bottom-50 left-1/2 -translate-x-1/2 translate-y-1/2 hover:cursor-pointer hover:bg-[#ddd9cd] hover:text-black transition-all duration-300">
          <Link href="/product" className="text-lg">
            Shop Now
          </Link>
        </button>
      </form>
    </main>
  );
}
