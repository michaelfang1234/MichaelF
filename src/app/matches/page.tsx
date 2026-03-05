"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";

type Status = "LIVE" | "FT" | "UPCOMING";

const matches = [
  { id: 1, league: "Premier League", home: "Arsenal", away: "Chelsea", score: "2 - 1", time: "78'", status: "LIVE" as Status },
  { id: 2, league: "La Liga", home: "Barcelona", away: "Valencia", score: "1 - 1", time: "FT", status: "FT" as Status },
  { id: 3, league: "Serie A", home: "Inter", away: "Milan", score: "- : -", time: "21:00", status: "UPCOMING" as Status },
  { id: 4, league: "Bundesliga", home: "Bayern", away: "Dortmund", score: "3 - 2", time: "FT", status: "FT" as Status },
  { id: 5, league: "Ligue 1", home: "PSG", away: "Lyon", score: "0 - 0", time: "34'", status: "LIVE" as Status },
];

const filters: ("ALL" | Status)[] = ["ALL", "LIVE", "FT", "UPCOMING"];

export default function MatchesPage() {
  const [filter, setFilter] = useState<"ALL" | Status>("ALL");

  const list = useMemo(() => {
    if (filter === "ALL") return matches;
    return matches.filter((m) => m.status === filter);
  }, [filter]);

  return (
    <main className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">Matches</h1>

        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                "rounded-full border px-3 py-1 text-sm transition card-hover",
                filter === f
                  ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-100"
                  : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((m) => (
          <article key={m.id} className="glass card-hover rounded-2xl p-5">
            <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
              <span>{m.league}</span>
              <span
                className={clsx(
                  "rounded-full px-2 py-0.5",
                  m.status === "LIVE" && "bg-red-500/20 text-red-300",
                  m.status === "FT" && "bg-slate-500/20 text-slate-300",
                  m.status === "UPCOMING" && "bg-emerald-500/20 text-emerald-300"
                )}
              >
                {m.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>{m.home}</span>
                <span className="font-semibold">{m.score}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>{m.away}</span>
                <span>{m.time}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
