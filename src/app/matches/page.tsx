export default function MatchesPage() {
  const schedule = [
    { date: "March 17", match: "Hiba Lions vs NACIS", time: "5:00 PM" },
    { date: "March 25", match: "Hiba Lions vs KCIS", time: "5:15 PM" },
    { date: "April 1", match: "PingHe vs Hiba Lions", time: "5:00 PM" },
  ];

  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Volleyball Matches</h1>
      <p className="text-slate-400 text-sm">U19 Girls • SSSA Volleyball League</p>
      <div className="grid gap-4 md:grid-cols-2">
        {schedule.map((m, i) => (
          <article key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-lg">{m.match}</div>
            <div className="mt-2 text-sm text-slate-300">{m.date} • {m.time}</div>
          </article>
        ))}
      </div>
    </main>
  );
}
