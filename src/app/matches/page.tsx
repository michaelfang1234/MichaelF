export default function MatchesPage() {
  const matches = [
    { league: "Girls League", home: "Hiba Lions", away: "NACIS", date: "March 17", time: "5:00 PM", venue: "Home", status: "UPCOMING" },
    { league: "Girls League", home: "Hiba Lions", away: "KCIS", date: "March 25", time: "5:15 PM", venue: "Home", status: "UPCOMING" },
    { league: "Girls League", home: "PingHe", away: "Hiba Lions", date: "April 1", time: "5:00 PM", venue: "Away", status: "UPCOMING" },
    { league: "Girls League", home: "Hiba Lions", away: "QDHS", date: "April 7", time: "5:00 PM", venue: "Home", status: "UPCOMING" },
  ];

  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Volleyball Matches</h1>
      <p className="text-slate-400 text-sm">U19 Girls • SSSA Volleyball League</p>

      <div className="grid gap-4 md:grid-cols-2">
        {matches.map((m, i) => (
          <article key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
              <span>{m.league}</span>
              <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-emerald-200">{m.status}</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between"><span className="text-xl">{m.home}</span><span className="text-slate-400">vs</span></div>
              <div className="flex items-center justify-between"><span className="text-xl">{m.away}</span><span className={`rounded-full px-2 py-0.5 text-xs ${m.venue==="Home"?"bg-cyan-400/15 text-cyan-200":"bg-violet-400/15 text-violet-200"}`}>{m.venue}</span></div>
            </div>
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
