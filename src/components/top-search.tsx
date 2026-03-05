"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const dataset = [
  // matches
  { kind: "match", sport: "Volleyball", title: "Hiba Lions vs NACIS", sub: "Volleyball • March 17 • 5:00 PM", href: "/matches?q=nacis" },
  { kind: "match", sport: "Volleyball", title: "Hiba Lions vs KCIS", sub: "Volleyball • March 25 • 5:15 PM", href: "/matches?q=kcis" },
  { kind: "match", sport: "Volleyball", title: "PingHe vs Hiba Lions", sub: "Volleyball • April 1 • 5:00 PM", href: "/matches?q=pinghe" },
  { kind: "match", sport: "Volleyball", title: "Hiba Lions vs QDHS", sub: "Volleyball • April 7 • 5:00 PM", href: "/matches?q=qdhs" },
  { kind: "match", sport: "Volleyball", title: "WCIS vs Hiba Lions", sub: "Volleyball • April 17 • 5:00 PM", href: "/matches?q=wcis" },
  { kind: "match", sport: "Volleyball", title: "Hiba Lions vs UCS", sub: "Volleyball • April 22 • 5:00 PM", href: "/matches?q=ucs" },
  { kind: "match", sport: "Volleyball", title: "SUIS QP* vs Hiba Lions", sub: "Volleyball • April 28 • 5:00 PM", href: "/matches?q=suis" },

  // players
  { kind: "player", sport: "Basketball", title: "Michael Fang", sub: "U19 Boys Basketball • 185cm • 69kg", href: "/players?q=michael" },
  { kind: "player", sport: "Basketball", title: "Andy Gu", sub: "U19 Boys Basketball • 188cm • 75kg", href: "/players?q=andy" },
  { kind: "player", sport: "Volleyball", title: "Ariel Pan", sub: "U19 Girls Volleyball • 171cm • 53kg", href: "/players?q=ariel" },
  { kind: "player", sport: "Volleyball", title: "Michelle Xu", sub: "U19 Girls Volleyball • 170cm • 58kg", href: "/players?q=michelle" },
];

export default function TopSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!k) return [];
    return dataset.filter((item) =>
      `${item.kind} ${item.sport} ${item.title} ${item.sub}`.toLowerCase().includes(k)
    );
  }, [q]);

  return (
    <div className="relative w-[320px] max-w-[50vw]">
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search sport, match, player..."
        className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400 focus:border-[#F26A3D]/50"
      />

      {open && q.trim() !== "" && (
        <div className="absolute right-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f172a] shadow-2xl">
          {results.length === 0 ? (
            <div className="px-3 py-2 text-sm text-slate-400">No results</div>
          ) : (
            results.slice(0, 10).map((r, i) => (
              <Link
                key={i}
                href={r.href}
                onClick={() => setOpen(false)}
                className="block border-b border-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                <div className="font-medium">{r.title}</div>
                <div className="text-xs text-slate-400">{r.sub}</div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
