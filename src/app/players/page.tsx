"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

type P = {
  key: string;
  name: string;
  sport: "Basketball" | "Volleyball";
  team: string;
  division: string;
  height: number;
  weight: number;
};

const players: P[] = [
  { key: "michael", name: "Michael Fang", sport: "Basketball", team: "Hiba Lions", division: "U19 Boys Basketball Team", height: 185, weight: 69 },
  { key: "andy", name: "Andy Gu", sport: "Basketball", team: "Hiba Lions", division: "U19 Boys Basketball Team", height: 188, weight: 75 },
  { key: "ariel", name: "Ariel Pan", sport: "Volleyball", team: "Hiba Lions", division: "U19 Girls Volleyball Team", height: 171, weight: 53 },
  { key: "michelle", name: "Michelle Xu", sport: "Volleyball", team: "Hiba Lions", division: "U19 Girls Volleyball Team", height: 170, weight: 58 },
];

export default function PlayersPage() {
  const sp = useSearchParams();
  const q = (sp.get("q") || "").trim().toLowerCase();

  const result = useMemo(() => {
    if (!q) return players;
    const exact = players.find(p => p.key === q);
    if (exact) return [exact];
    return players.filter(p => `${p.name} ${p.key}`.toLowerCase().includes(q));
  }, [q]);

  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Players</h1>
      {q ? <p className="text-sm text-orange-200">Search: &quot;{q}&quot; • {result.length} result(s)</p> : null}

      <div className="grid gap-4 md:grid-cols-2">
        {result.map((p) => (
          <article key={p.key} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-2xl font-semibold">{p.name}</h2>
            <p className="mt-1 text-slate-300">{p.division}</p>
            <p className="mt-1 text-sm text-slate-400">Height: {p.height} cm • Weight: {p.weight} kg</p>

            {p.sport === "Basketball" ? (
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg border border-white/10 bg-black/20 p-2">PTS: 0.0</div>
                <div className="rounded-lg border border-white/10 bg-black/20 p-2">REB: 0.0</div>
                <div className="rounded-lg border border-white/10 bg-black/20 p-2">AST: 0.0</div>
                <div className="rounded-lg border border-white/10 bg-black/20 p-2">FG%: 0.0</div>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg border border-white/10 bg-black/20 p-2">Kills: 0.0</div>
                <div className="rounded-lg border border-white/10 bg-black/20 p-2">Blocks: 0.0</div>
                <div className="rounded-lg border border-white/10 bg-black/20 p-2">Aces: 0.0</div>
                <div className="rounded-lg border border-white/10 bg-black/20 p-2">Digs: 0.0</div>
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
