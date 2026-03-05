type Match = {
  date: string;
  opponent: string;
  venue: "Home" | "Away";
  time: string;
};

const volleyballSchedule: Match[] = [
  { date: "March 17", opponent: "NACIS", venue: "Home", time: "5:00 PM" },
  { date: "March 25", opponent: "KCIS", venue: "Home", time: "5:15 PM" },
  { date: "April 1", opponent: "PingHe", venue: "Away", time: "5:00 PM" },
  { date: "April 7", opponent: "QDHS", venue: "Home", time: "5:00 PM" },
  { date: "April 17", opponent: "WCIS", venue: "Away", time: "5:00 PM" },
  { date: "April 22", opponent: "UCS", venue: "Home", time: "5:00 PM" },
  { date: "April 28", opponent: "SUIS QP*", venue: "Away", time: "5:00 PM" },
];

const MONTHS: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
};

function toDate(dateText: string) {
  const [month, dayText] = dateText.split(" ");
  const day = Number(dayText);
  const year = new Date().getFullYear();
  return new Date(year, MONTHS[month] ?? 0, day, 0, 0, 0, 0);
}

function toDateTime(dateText: string, timeText: string) {
  const d = toDate(dateText);

  // "5:15 PM" / "5:00 PM"
  const [t, meridiem] = timeText.split(" ");
  let [h, m] = t.split(":").map(Number);

  if (meridiem?.toUpperCase() === "PM" && h !== 12) h += 12;
  if (meridiem?.toUpperCase() === "AM" && h === 12) h = 0;

  d.setHours(h || 0, m || 0, 0, 0);
  return d;
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
}

function statusOf(matchDateTime: Date): "UPCOMING" | "TODAY" | "FINISHED" {
  const now = new Date();
  const today = startOfToday();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (matchDateTime >= today && matchDateTime < tomorrow) return "TODAY";
  if (matchDateTime >= now) return "UPCOMING";
  return "FINISHED";
}

export default function MatchesPage() {
  const sorted = [...volleyballSchedule].sort(
    (a, b) => toDateTime(a.date, a.time).getTime() - toDateTime(b.date, b.time).getTime()
  );

  const nextMatchIndex = sorted.findIndex((m) => toDateTime(m.date, m.time).getTime() >= Date.now());

  return (
    <main className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Girls Volleyball Schedule</h1>
          <p className="mt-1 text-sm text-slate-400">Auto-sorted fixtures with live status</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          {sorted.length} matches
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full border-collapse">
          <thead className="bg-white/5 text-left text-sm text-slate-300">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Match</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((m, idx) => {
              const dt = toDateTime(m.date, m.time);
              const status = statusOf(dt);
              const isNext = idx === nextMatchIndex && status !== "FINISHED";

              return (
                <tr
                  key={idx}
                  className={[
                    "border-t border-white/10 transition hover:bg-white/10",
                    isNext ? "bg-cyan-500/10" : "",
                  ].join(" ")}
                >
                  <td className="px-4 py-3 font-medium">{m.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        m.venue === "Home"
                          ? "mr-2 rounded-full bg-cyan-400/15 px-2 py-0.5 text-xs text-cyan-200"
                          : "mr-2 rounded-full bg-violet-400/15 px-2 py-0.5 text-xs text-violet-200"
                      }
                    >
                      {m.venue}
                    </span>
                    vs {m.opponent}
                    {isNext ? (
                      <span className="ml-2 rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs text-emerald-200">
                        Next Match
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-slate-300">{m.time}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        status === "TODAY"
                          ? "rounded-full bg-amber-400/15 px-2 py-0.5 text-xs text-amber-200"
                          : status === "UPCOMING"
                          ? "rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs text-emerald-200"
                          : "rounded-full bg-slate-500/20 px-2 py-0.5 text-xs text-slate-300"
                      }
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
