"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PLAYERS } from "@/data/players";
import { MATCHES } from "@/data/matches";
import { basketballStandings, volleyballStandings } from "@/data/standings";

export default function TopSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const dataset = useMemo(() => {
    const playerItems = PLAYERS.map((p) => ({
      kind: "player",
      title: p.name,
      sub: `${p.sport} • ${p.division}`,
      href: `/players/${p.id}`,
    }));

    const matchItems = MATCHES.map((m) => ({
      kind: "match",
      title: `${m.home} vs ${m.away}`,
      sub: `${m.sport} • ${m.group} • ${m.dateLabel} • ${m.timeLabel}`,
      href: `/matches/${m.id}`,
    }));

    const standingTeams = [...basketballStandings, ...volleyballStandings].map((s, idx) => ({
      kind: "team",
      title: s.team,
      sub: `Standing • ${s.group}`,
      href: "/",
      key: `${s.team}-${s.group}-${idx}`,
    }));

    return [...playerItems, ...matchItems, ...standingTeams];
  }, []);

  const results = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!k) return [];
    return dataset.filter((item) => `${item.kind} ${item.title} ${item.sub}`.toLowerCase().includes(k)).slice(0, 12);
  }, [q, dataset]);

  return (
    <div className="relative w-[380px] max-w-[55vw]">
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder="Search sport, match, player..."
        className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-white outline-none placeholder:text-slate-400 focus:border-[#F26A3D]/50"
      />

      {open && q.trim() !== "" && (
        <div className="absolute right-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f172a] shadow-2xl">
          {results.length === 0 ? (
            <div className="px-3 py-1.5 text-sm text-slate-400">No results</div>
          ) : (
            results.map((r, i) => (
              <Link key={i} href={r.href} onClick={() => setOpen(false)} className="block border-b border-white/5 px-3 py-1.5 text-sm hover:bg-white/10">
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

