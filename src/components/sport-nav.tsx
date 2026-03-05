"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";

const sports = ["All", "Football", "Basketball", "Volleyball", "Tennis"];

export default function SportNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSport = searchParams.get("sport") ?? "All";

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {sports.map((s) => {
        const isActive = pathname === "/matches" && currentSport === s;
        const href = s === "All" ? "/matches" : `/matches?sport=${encodeURIComponent(s)}`;
        return (
          <Link
            key={s}
            href={href}
            className={clsx(
              "rounded-full border px-3 py-1 text-sm transition",
              isActive
                ? "border-red-400/50 bg-red-500/15 text-red-100"
                : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
            )}
          >
            {s}
          </Link>
        );
      })}
    </div>
  );
}
