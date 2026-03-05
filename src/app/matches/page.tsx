"use client";

import { useSearchParams } from "next/navigation";

const schedule = [
  { date: "March 17", match: "Home vs NACIS", time: "5:00 PM" },
  { date: "March 25", match: "Home vs KCIS", time: "5:15 PM" },
  { date: "April 1", match: "Away vs PingHe", time: "5:00 PM" },
  { date: "April 7", match: "Home vs QDHS", time: "5:00 PM" },
  { date: "April 17", match: "Away vs WCIS", time: "5:00 PM" },
  { date: "April 22", match: "Home vs UCS", time: "5:00 PM" },
  { date: "April 28", match: "Away vs SUIS QP*", time: "5:00 PM" },
];

export default function MatchesPage() {
  const sp = useSearchParams();
  const q = (sp.get("q") || "").trim().toLowerCase();

  const filtered = schedule.filter((m) => {
    if (!q) return true;
    return (`volleyball ${m.date} ${m.match} ${m.time}`).toLowerCase().includes(q);
  });

  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Volleyball Matches</h1>
      <p className="text-slate-400 text-sm">U19 Girls • SSSA Volleyball League</p>
      {q ? <p className="text-sm text-orange-200">Search: &quot;{q}&quot; • {filtered.length} result(s)</p> : null}

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((m, i) => (
          <article key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-slate-400">Girls League</span>
              <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-emerald-200">UPCOMING</span>
            </div>
            <div className="text-lg">{m.match}</div>
            <div className="mt-3 flex items-center justify-between text-slate-300">
              <span>{m.date}</span>
              <span>{m.time}</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}


