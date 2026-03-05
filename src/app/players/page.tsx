"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

type P = {
  key: string;
  name: string;
  sport: "Basketball" | "Volleyball";
  division: string;
  height: number;
  weight: number | null; // null => unknown
};

const players: P[] = [
  { key: "michael", name: "Michael Fang", sport: "Basketball", division: "U19 Boys Basketball Team", height: 185, weight: 69 },
  { key: "andy", name: "Andy Gu", sport: "Basketball", division: "U19 Boys Basketball Team", height: 188, weight: 75 },
  { key: "ariel", name: "Ariel Pan", sport: "Volleyball", division: "U19 Girls Volleyball Team", height: 171, weight: null },
  { key: "michelle", name: "Michelle Xu", sport: "Volleyball", division: "U19 Girls Volleyball Team", height: 170, weight: null },
];

export default function PlayersPage() {
  const sp = useSearchParams();
  const q = (sp.get("q") || "").trim().toLowerCase();

  const result = useMemo(() => {
    if (!q) return players;
    const exact =
      players.find((p) => p.key === q) ||
      players.find((p) => p.name.toLowerCase() === q);
    if (exact) return [exact];

    const fuzzy = players.find((p) => `${p.key} ${p.name}`.toLowerCase().includes(q));
    return fuzzy ? [fuzzy] : [];
  }, [q]);

  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Players</h1>
      {q ? <p className="text-sm text-orange-200">Search: &quot;{q}&quot; • {result.length} result(s)</p> : null}

      <div className="grid gap-3 md:grid-cols-2">
        {result.map((p) => (
          <article key={p.key} className="rounded-xl border border-white/10 bg-black/20 p-4 hover:bg-white/5 transition">
            <p className="text-4 font-semibold">{p.name}</p>
            <p className="text-sm text-slate-400 mt-1">{p.division}</p>
            <p className="text-sm text-slate-300 mt-2">
              Height: {p.height} cm • Weight: {p.weight === null ? "unknown" : `${p.weight} kg`}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
