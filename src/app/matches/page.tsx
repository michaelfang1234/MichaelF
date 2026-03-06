"use client";

import Link from "next/link";
import { useMemo } from "react";
import { MATCHES } from "@/data/matches";
import { getMatchStatus, toDate } from "@/lib/match-status";

export default function MatchesPage() {
  const recentThree = useMemo(() => {
    const now = new Date();

    const full = MATCHES.map((m) => {
      const start = toDate(m);
      const status = getMatchStatus(m);
      const diff = Math.abs(start.getTime() - now.getTime());
      return { ...m, start, status, diff };
    }).sort((a, b) => a.start.getTime() - b.start.getTime());

    const notFinished = full.filter((m) => m.status !== "FINISHED");
    if (notFinished.length >= 3) return notFinished.slice(0, 3);

    const need = 3 - notFinished.length;
    const finishedRecent = full.filter((m) => m.status === "FINISHED").sort((a, b) => b.start.getTime() - a.start.getTime()).slice(0, need);
    return [...finishedRecent.reverse(), ...notFinished];
  }, []);

  return (
    <main className="space-y-5">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Matches</h1>
        <p className="mt-1 text-slate-400">Unified live match center • auto rolling latest 3</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {recentThree.map((m) => (
          <article key={m.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-slate-400">{m.sport} • {m.group}</span>
              <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-emerald-200">{m.status}</span>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1">
              <span className="font-medium">{m.home}</span><span className="text-slate-400">VS</span>
              <span className="font-medium">{m.away}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs ${m.venueType === "Home" ? "bg-cyan-400/15 text-cyan-200" : "bg-violet-400/15 text-violet-200"}`}>{m.venueType}</span>
            </div>

            <div className="mt-4 flex items-center justify-between text-slate-300">
              <span>{m.dateLabel}</span>
              <span>{m.timeLabel}</span>
            </div>

            <Link href={`/matches/${m.id}`} className="mt-4 inline-block rounded-lg border border-white/15 bg-black/30 px-3 py-1.5 text-sm hover:bg-white/10">
              Open Match
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
