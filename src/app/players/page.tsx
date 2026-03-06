"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PLAYERS, type PlayerSport } from "@/data/players";

const sportTabs: PlayerSport[] = ["Football", "Basketball", "Volleyball", "Swimming"];

export default function PlayersPage() {
  const sp = useSearchParams();
  const q = (sp.get("q") || "").trim().toLowerCase();
  const sportQ = (sp.get("sport") || "").toLowerCase();

  const [sportFilter, setSportFilter] = useState<PlayerSport | "All">("All");

  useEffect(() => {
    const m: Record<string, PlayerSport> = {
      football: "Football",
      basketball: "Basketball",
      volleyball: "Volleyball",
      swimming: "Swimming",
    };
    if (m[sportQ]) setSportFilter(m[sportQ]);
  }, [sportQ]);

  const result = useMemo(() => {
    let arr = PLAYERS;

    if (sportFilter !== "All") {
      arr = arr.filter((p) => p.sport === sportFilter);
    }

    if (!q) return arr;

    const exact =
      arr.find((p) => p.key === q) ||
      arr.find((p) => p.name.toLowerCase() === q);

    if (exact) return [exact];

    const fuzzy = arr.filter((p) => `${p.key} ${p.name} ${p.sport} ${p.division}`.toLowerCase().includes(q));
    return fuzzy;
  }, [q, sportFilter]);

  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Players</h1>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSportFilter("All")}
          className={`rounded-full border px-3 py-1 text-sm ${sportFilter === "All" ? "border-cyan-400/50 bg-cyan-400/20 text-cyan-100" : "border-white/10 bg-white/5 text-slate-200"}`}
        >
          All
        </button>
        {sportTabs.map((s) => (
          <button
            key={s}
            onClick={() => setSportFilter(s)}
            className={`rounded-full border px-3 py-1 text-sm ${sportFilter === s ? "border-cyan-400/50 bg-cyan-400/20 text-cyan-100" : "border-white/10 bg-white/5 text-slate-200"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {q ? <p className="text-sm text-orange-200">Search: &quot;{q}&quot; • {result.length} result(s)</p> : null}

      <div className="grid gap-3 md:grid-cols-2">
        {result.map((p) => (
          <Link key={p.id} href={`/players/${p.id}`} className="rounded-xl border border-white/10 bg-black/20 p-4 hover:bg-white/5 transition block">
            <p className="text-4 font-semibold">{p.name}</p>
            <p className="text-sm text-slate-400 mt-1">{p.division}</p>
            <p className="text-sm text-slate-300 mt-2">
              Height: {p.height} cm • Weight: {p.weight === null ? "unknown" : `${p.weight} kg`}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
