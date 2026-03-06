"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MATCHES, type Sport } from "@/data/matches";
import { getMatchStatus } from "@/lib/match-status";

export default function SportMatchesPage() {
  const sp = useSearchParams();
  const raw = (sp.get("name") || "").toLowerCase();

  const sport: Sport | null =
    raw === "volleyball" ? "Volleyball" :
    raw === "basketball" ? "Basketball" :
    null;

  if (!sport) {
    return (
      <main className="space-y-4">
        <Link href="/" className="text-sm text-slate-400 hover:text-white">← Back</Link>
        <h1 className="text-3xl font-semibold">Sport not found</h1>
        <p className="text-slate-400">Use /matches/sport?name=volleyball or basketball</p>
      </main>
    );
  }

  const all = MATCHES
    .filter((m) => m.sport === sport)
    .map((m) => ({ ...m, status: getMatchStatus(m) }));

  return (
    <main className="space-y-5">
      <Link href="/" className="text-sm text-slate-400 hover:text-white">← Back to Dashboard</Link>

      <div>
        <h1 className="text-4xl font-semibold tracking-tight">{sport} Matches</h1>
        <p className="mt-1 text-slate-400">Full schedule • all matches</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {all.map((m) => (
          <article key={m.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-slate-400">{m.group}</span>
              <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-emerald-200">{m.status}</span>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1">
              <span className="font-medium">{m.home}</span>
              <span className="text-slate-400">VS</span>
              <span className="font-medium">{m.away}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs ${m.venueType === "Home" ? "bg-cyan-400/15 text-cyan-200" : "bg-violet-400/15 text-violet-200"}`}>
                {m.venueType}
              </span>
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
