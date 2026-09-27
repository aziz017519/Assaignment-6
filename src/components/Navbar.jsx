"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved, ready } = usePlan();

  const isActive = (href) =>
    href === "/" ? pathname === "/" || pathname.startsWith("/workouts") : pathname.startsWith(href);

  const navLinks = links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        isActive(link.href) ? "bg-lime-deep text-lime font-semibold" : "text-muted hover:text-white"
      }`}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-ink/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="" width={28} height={28} priority />
          <span className="font-display text-xl font-bold tracking-wide text-white">FITLOG</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">{navLinks}</nav>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/my-plan" className="flex items-center gap-2 text-gray-200 hover:text-white">
            Plan
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1.5 text-[11px] font-bold text-ink">
              {ready ? plan.length : 0}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2 text-muted hover:text-white">
            Saved
            <span className="grid h-5 min-w-5 place-items-center rounded-full border border-[#2d313b] px-1.5 text-[11px] font-bold text-gray-200">
              {ready ? saved.length : 0}
            </span>
          </Link>
        </div>
      </div>

      {/* মোবাইলে লিংকগুলো নিচের সারিতে */}
      <nav className="flex items-center justify-center gap-2 border-t border-line-soft py-2 md:hidden">
        {navLinks}
      </nav>
    </header>
  );
}
