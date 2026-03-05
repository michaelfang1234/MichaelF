"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const nav = [
  { label: "Live", href: "/live" },
  { label: "Matches", href: "/matches" },
  { label: "Standings", href: "/standings" },
  { label: "Teams", href: "/teams" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden gap-2 sm:flex">
      {nav.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "rounded-full border px-4 py-1.5 text-sm transition card-hover",
              active
                ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-100"
                : "border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

