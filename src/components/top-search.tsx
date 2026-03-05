"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const dataset = [
  { type: "match", sport: "Volleyball", title: "Hiba Lions vs NACIS", date: "March 17", time: "5:00 PM" },
  { type: "match", sport: "Volleyball", title: "Hiba Lions vs KCIS", date: "March 25", time: "5:15 PM" },
  { type: "match", sport: "Volleyball", title: "PingHe vs Hiba Lions", date: "April 1", time: "5:00 PM" },
  { type: "match", sport: "Volleyball", title: "Hiba Lions vs QDHS", date: "April 7", time: "5:00 PM" },
  { type: "match", sport: "Volleyball", title: "WCIS vs Hiba Lions", date: "April 17", time: "5:00 PM" },
  { type: "match", sport: "Volleyball", title: "Hiba Lions vs UCS", date: "April 22", time: "5:00 PM" },
  { type: "match", sport: "Volleyball", title: "SUIS QP* vs Hiba Lions", date: "April 28", time: "5:00 PM" },
];

export default function TopSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!k) return [];
    return dataset.filter((item) =>
      [item.sport, item.title, item.date, item.time].join(" ").toLowerCase().includes(k)
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
        placeholder="Search sport/team/opponent..."
        className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400 focus:border-[#F26A3D]/50"
      />

      {open && q.trim() !== "" && (
        <div className="absolute right-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f172a] shadow-2xl">
          {results.length === 0 ? (
            <div className="px-3 py-2 text-sm text-slate-400">No results</div>
          ) : (
            results.slice(0, 8).map((r, i) => (
              <Link
                key={i}
                href={`/matches?q=${encodeURIComponent(q)}`}
                onClick={() => setOpen(false)}
                className="block border-b border-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                <div className="font-medium">{r.title}</div>
                <div className="text-xs text-slate-400">{r.sport} • {r.date} • {r.time}</div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

