"use client";

import Link from "next/link";

const sports = ["All", "Football", "Basketball", "Volleyball", "Tennis"];

export default function SportNav() {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {sports.map((s) => {
        const href = s === "All" ? "/matches" : `/matches?sport=${encodeURIComponent(s)}`;
        return (
          <Link
            key={s}
            href={href}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200 transition hover:bg-white/10"
          >
            {s}
          </Link>
        );
      })}
    </div>
  );
}
