"use client";
import Link from "next/link";

const sports = ["Football","Basketball","Volleyball","Tennis","Badminton","Track & Field"];

export default function SportsBar() {
  return (
    <div className="mt-4 overflow-x-auto">
      <div className="flex min-w-max gap-2">
        <Link href="/matches" className="brand-pill rounded-full px-3 py-1 text-sm whitespace-nowrap">All</Link>
        {sports.map((s) => (
          <Link
            key={s}
            href={`/matches?sport=${encodeURIComponent(s)}`}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200 transition hover:bg-white/10 whitespace-nowrap"
          >
            {s}
          </Link>
        ))}
      </div>
    </div>
  );
}
