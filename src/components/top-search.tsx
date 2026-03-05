"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const dataset = [
  { kind: "match", title: "Hiba Lions vs NACIS", sub: "Volleyball • March 17 • 5:00 PM", href: "/matches" },
  { kind: "match", title: "Hiba Lions vs KCIS", sub: "Volleyball • March 25 • 5:15 PM", href: "/matches" },
  { kind: "match", title: "PingHe vs Hiba Lions", sub: "Volleyball • April 1 • 5:00 PM", href: "/matches" },

  { kind: "player", title: "Michael Fang", sub: "U19 Boys Basketball Team • 185cm • 69kg", href: "/players/michael" },
  { kind: "player", title: "Andy Gu", sub: "U19 Boys Basketball Team • 188cm • 75kg", href: "/players/andy" },
  { kind: "player", title: "Ariel Pan", sub: "U19 Girls Volleyball Team • 171cm • Weight unknown", href: "/players/ariel" },
  { kind: "player", title: "Michelle Xu", sub: "U19 Girls Volleyball Team • 170cm • Weight unknown", href: "/players/michelle" },
];

export default function TopSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!k) return [];
    return dataset.filter((item) => `${item.kind} ${item.title} ${item.sub}`.toLowerCase().includes(k));
  }, [q]);

  return (
    <div className="relative w-[320px] max-w-[50vw]">
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
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
              <Link key={i} href={r.href} onClick={() => setOpen(false)} className="block border-b border-white/5 px-3 py-2 text-sm hover:bg-white/10">
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
