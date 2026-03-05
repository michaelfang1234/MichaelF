"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Player = {
  key: string;
  name: string;
  sport: "Basketball" | "Volleyball";
  teamLabel: string;
  divisionLabel: string; // e.g. U19 Boys Basketball Team
  heightCm: number;
  weightKg: number;
  position: string;
};

const players: Player[] = [
  {
    key: "michael",
    name: "Michael Fang",
    sport: "Basketball",
    teamLabel: "Hiba Lions",
    divisionLabel: "U19 Boys Basketball Team",
    heightCm: 185,
    weightKg: 69,
    position: "Guard",
  },
  {
    key: "andy",
    name: "Andy Gu",
    sport: "Basketball",
    teamLabel: "Hiba Lions",
    divisionLabel: "U19 Boys Basketball Team",
    heightCm: 188,
    weightKg: 75,
    position: "Forward",
  },
  {
    key: "ariel",
    name: "Ariel Pan",
    sport: "Volleyball",
    teamLabel: "Hiba Lions",
    divisionLabel: "U19 Girls Volleyball Team",
    heightCm: 171,
    weightKg: 53,
    position: "Outside Hitter",
  },
  {
    key: "michelle",
    name: "Michelle Xu",
    sport: "Volleyball",
    teamLabel: "Hiba Lions",
    divisionLabel: "U19 Girls Volleyball Team",
    heightCm: 170,
    weightKg: 58,
    position: "Setter",
  },
];

export default function PlayersPage() {
  const sp = useSearchParams();
  const q = (sp.get("q") || "").trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return players;
    return players.filter((p) =>
      `${p.key} ${p.name} ${p.sport} ${p.teamLabel} ${p.divisionLabel}`.toLowerCase().includes(q)
    );
  }, [q]);

  const selected = filtered[0] ?? players[0];

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Players</h1>

      <div className="grid gap-4 lg:grid-cols-12">
        <aside className="rounded-2xl border border-white/10 bg-white/5 p-4 lg:col-span-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-300">Player List</h2>
          <div className="space-y-2">
            {players.map((p) => (
              <Link
                key={p.key}
                href={`/players?q=${encodeURIComponent(p.key)}`}
                className={[
                  "block rounded-lg border px-3 py-2 text-sm transition",
                  selected.key === p.key
                    ? "border-[#F26A3D]/40 bg-[#F26A3D]/15 text-orange-100"
                    : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10",
                ].join(" ")}
              >
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-slate-400">{p.divisionLabel}</div>
              </Link>
            ))}
          </div>
        </aside>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-4xl font-semibold">{selected.name}</h2>
              <p className="mt-2 text-slate-300">{selected.divisionLabel}</p>
              <p className="mt-1 text-sm text-slate-400">{selected.teamLabel} • {selected.position}</p>
            </div>
            <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-200">Active</span>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="text-xs text-slate-400">Height</p>
              <p className="text-xl font-semibold">{selected.heightCm} cm</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="text-xs text-slate-400">Weight</p>
              <p className="text-xl font-semibold">{selected.weightKg} kg</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="text-xs text-slate-400">PTS</p>
              <p className="text-xl font-semibold">0.0</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="text-xs text-slate-400">REB</p>
              <p className="text-xl font-semibold">0.0</p>
            </div>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="text-xs text-slate-400">AST</p>
              <p className="text-xl font-semibold">0.0</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="text-xs text-slate-400">FG%</p>
              <p className="text-xl font-semibold">0.0</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-400">Advanced stats & game logs: Coming soon</p>
        </section>
      </div>
    </main>
  );
}
