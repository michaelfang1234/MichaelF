"use client";

import rawMatches from "@/data/matches.json";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";

type Sport = "Football" | "Basketball" | "Volleyball" | "Tennis";
type Status = "UPCOMING" | "TODAY" | "FINISHED";

type Match = {
  id: number;
  sport: Sport;
  league: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  venueType: "Home" | "Away";
};

const MONTHS: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
};

function toDateTime(dateText: string, timeText: string) {
  const [month, dayText] = dateText.split(" ");
  const day = Number(dayText);
  const year = new Date().getFullYear();
  const d = new Date(year, MONTHS[month] ?? 0, day);

  const [t, meridiem] = timeText.split(" ");
  let [h, m] = t.split(":").map(Number);
  if ((meridiem || "").toUpperCase() === "PM" && h !== 12) h += 12;
  if ((meridiem || "").toUpperCase() === "AM" && h === 12) h = 0;
  d.setHours(h || 0, m || 0, 0, 0);
  return d;
}

function getStatus(dt: Date): Status {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrowStart = new Date(todayStart);
  tomorrowStart.setDate(todayStart.getDate() + 1);

  if (dt >= todayStart && dt < tomorrowStart) return "TODAY";
  if (dt >= now) return "UPCOMING";
  return "FINISHED";
}

const statusFilters: Array<"ALL" | Status> = ["ALL", "UPCOMING", "TODAY", "FINISHED"];

export default function MatchesPage() {
  const searchParams = useSearchParams();
  const sportParam = (searchParams.get("sport") ?? "All") as Sport | "All";
  const [statusFilter, setStatusFilter] = useState<"ALL" | Status>("ALL");

  const matches = rawMatches as Match[];

  const enriched = useMemo(() => {
    return [...matches]
      .map((m) => {
        const dt = toDateTime(m.date, m.time);
        const status = getStatus(dt);
        return { ...m, dt, status };
      })
      .sort((a, b) => a.dt.getTime() - b.dt.getTime());
  }, [matches]);

  const filtered = useMemo(() => {
    return enriched.filter((m) => {
      const okSport = sportParam === "All" ? true : m.sport === sportParam;
      const okStatus = statusFilter === "ALL" ? true : m.status === statusFilter;
      return okSport && okStatus;
    });
  }, [enriched, sportParam, statusFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const m of filtered) {
      if (!map.has(m.sport)) map.set(m.sport, []);
      map.get(m.sport)!.push(m);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <main className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Matches</h1>
          <p className="mt-1 text-sm text-slate-400">
            By sport + status, ESPN-style structure
          </p>
        </div>

        <div className="flex gap-2">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={clsx(
                "rounded-full border px-3 py-1 text-sm transition",
                statusFilter === s
                  ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-100"
                  : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {grouped.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
          No matches found for current filters.
        </div>
      ) : (
        grouped.map(([sport, list]) => (
          <section key={sport} className="space-y-3">
            <h2 className="text-xl font-semibold">{sport}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {list.map((m) => (
                <article
                  key={m.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                >
                  <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
                    <span>{m.league}</span>
                    <span
                      className={clsx(
                        "rounded-full px-2 py-0.5",
                        m.status === "TODAY" && "bg-amber-400/15 text-amber-200",
                        m.status === "UPCOMING" && "bg-emerald-400/15 text-emerald-200",
                        m.status === "FINISHED" && "bg-slate-500/20 text-slate-300"
                      )}
                    >
                      {m.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>{m.homeTeam}</span>
                      <span className="text-slate-400">vs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{m.awayTeam}</span>
                      <span
                        className={clsx(
                          "rounded-full px-2 py-0.5 text-xs",
                          m.venueType === "Home"
                            ? "bg-cyan-400/15 text-cyan-200"
                            : "bg-violet-400/15 text-violet-200"
                        )}
                      >
                        {m.venueType}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                    <span>{m.date}</span>
                    <span>{m.time}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  );
}
