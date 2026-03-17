import Link from "next/link";
import { MATCHES } from "@/data/matches";
import { computeDisplayStatus, toSortableDate } from "@/lib/match-status";

export default function MatchesPage() {
  const now = new Date();

  const nearestFour = [...MATCHES]
    .sort((a, b) => {
      const da = Math.abs(toSortableDate(a.dateLabel, a.timeLabel).getTime() - now.getTime());
      const db = Math.abs(toSortableDate(b.dateLabel, b.timeLabel).getTime() - now.getTime());
      return da - db;
    })
    .slice(0, 4);

  return (
    <main className="space-y-6">
      <section>
        <h1 className="text-5xl font-semibold tracking-tight">Matches</h1>
        <p className="mt-2 text-xl text-slate-700">Nearest 4 matches</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {nearestFour.map((match) => {
          const displayStatus = computeDisplayStatus(
            (match as any).dateLabel,
            (match as any).status
          );

          return (
            <article
              key={match.id}
              className="rounded-[28px] border border-black/10 bg-white/70 p-7 shadow-sm"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg text-slate-800">{match.group}</p>
                  <p className="mt-1 text-sm text-slate-600">{match.sport}</p>
                </div>

                <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
                  {displayStatus}
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-6">
                <div className="space-y-3 text-[22px] leading-tight text-slate-900">
                  <div>{match.home}</div>
                  <div>{match.away}</div>
                </div>

                <div className="space-y-3 text-right">
                  <div className="text-[22px] leading-tight text-slate-900">VS</div>
                  <div>
                    <span className="rounded-full bg-sky-100 px-4 py-1 text-sm text-slate-700">
                      {match.venueType}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-[1fr_auto] items-end gap-6">
                <div className="text-[20px] text-slate-800">{match.dateLabel}</div>
                <div className="text-[20px] text-slate-800">{match.timeLabel}</div>
              </div>

              <div className="mt-8">
                <Link
                  href={`/matches/${match.id}`}
                  className="text-[18px] text-slate-700 hover:text-slate-950"
                >
                  Open Match
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

