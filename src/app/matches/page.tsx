const schedule = [
  { date: "March 17", match: "Home vs NACIS", time: "5:00 PM" },
  { date: "March 25", match: "Home vs KCIS", time: "5:15 PM" },
  { date: "April 1", match: "Away vs PingHe", time: "5:00 PM" },
  { date: "April 7", match: "Home vs QDHS", time: "5:00 PM" },
  { date: "April 17", match: "Away vs WCIS", time: "5:00 PM" },
  { date: "April 22", match: "Home vs UCS", time: "5:00 PM" },
  { date: "April 28", match: "Away vs SUIS QP*", time: "5:00 PM" },
];

const MONTHS: Record<string, number> = { January:0, February:1, March:2, April:3, May:4, June:5, July:6, August:7, September:8, October:9, November:10, December:11 };

function toDate(dateText: string, timeText: string) {
  const [month, dayText] = dateText.split(" ");
  const [clock, ap] = timeText.split(" ");
  let [h, m] = clock.split(":").map(Number);
  if (ap === "PM" && h !== 12) h += 12;
  if (ap === "AM" && h === 12) h = 0;
  return new Date(new Date().getFullYear(), MONTHS[month], Number(dayText), h, m || 0, 0, 0);
}

export default function MatchesPage() {
  const now = Date.now();
  const enriched = schedule.map((s) => ({ ...s, ts: toDate(s.date, s.time).getTime() }));
  const nextIndex = enriched.findIndex((s) => s.ts >= now);

  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Volleyball Matches</h1>
      <p className="text-slate-400 text-sm">U19 Girls • SSSA Volleyball League</p>

      <div className="grid gap-4 md:grid-cols-2">
        {enriched.map((m, i) => {
          const isNext = i === nextIndex;
          const isFinished = m.ts < now;
          return (
            <article key={i} className={`rounded-2xl border p-4 transition ${isNext ? "border-emerald-400/40 bg-emerald-500/10" : "border-white/10 bg-white/5 hover:bg-white/10"}`}>
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">Girls League</span>
                <span className={`rounded-full px-2 py-0.5 ${isFinished ? "bg-slate-500/20 text-slate-300" : "bg-emerald-400/15 text-emerald-200"}`}>
                  {isFinished ? "FINISHED" : "UPCOMING"}
                </span>
              </div>
              <div className="text-lg">{m.match}</div>
              <div className="mt-3 flex items-center justify-between text-slate-300">
                <span>{m.date}</span>
                <span>{m.time}</span>
              </div>
              {isNext ? <div className="mt-2 text-xs text-emerald-200">Next Match</div> : null}
            </article>
          );
        })}
      </div>
    </main>
  );
}
