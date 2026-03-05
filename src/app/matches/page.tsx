"use client";

import { useMemo, useState } from "react";

type Status = "UPCOMING" | "TODAY" | "FINISHED";
type Sport = "Volleyball" | "Basketball";

type Match = {
  sport: Sport;
  group: string;
  dateLabel: string;   // e.g. "March 18"
  timeLabel: string;   // e.g. "5:00 PM"
  home: string;
  away: string;
  venueType: "Home" | "Away";
  status: Status;
};

const matches: Match[] = [
  // Volleyball (existing)
  { sport: "Volleyball", group: "U19 Girls League", dateLabel: "March 17", timeLabel: "5:00 PM", home: "Hiba Lions", away: "NACIS", venueType: "Home", status: "UPCOMING" },
  { sport: "Volleyball", group: "U19 Girls League", dateLabel: "March 25", timeLabel: "5:15 PM", home: "Hiba Lions", away: "KCIS", venueType: "Home", status: "UPCOMING" },
  { sport: "Volleyball", group: "U19 Girls League", dateLabel: "April 1",  timeLabel: "5:00 PM", home: "PingHe", away: "Hiba Lions", venueType: "Away", status: "UPCOMING" },
  { sport: "Volleyball", group: "U19 Girls League", dateLabel: "April 7",  timeLabel: "5:00 PM", home: "Hiba Lions", away: "QDHS", venueType: "Home", status: "UPCOMING" },
  { sport: "Volleyball", group: "U19 Girls League", dateLabel: "April 17", timeLabel: "5:00 PM", home: "WCIS", away: "Hiba Lions", venueType: "Away", status: "UPCOMING" },
  { sport: "Volleyball", group: "U19 Girls League", dateLabel: "April 22", timeLabel: "5:00 PM", home: "Hiba Lions", away: "UCS", venueType: "Home", status: "UPCOMING" },
  { sport: "Volleyball", group: "U19 Girls League", dateLabel: "April 28", timeLabel: "5:00 PM", home: "SUIS QP*", away: "Hiba Lions", venueType: "Away", status: "UPCOMING" },

  // Basketball U15 Boys (new)
  { sport: "Basketball", group: "U15 Boys SSSA", dateLabel: "March 18", timeLabel: "5:00 PM", home: "Hiba Lions", away: "SUIS HQ", venueType: "Home", status: "UPCOMING" },
  { sport: "Basketball", group: "U15 Boys SSSA", dateLabel: "March 25", timeLabel: "5:15 PM", home: "Hiba Lions", away: "KCIS", venueType: "Home", status: "UPCOMING" },
  { sport: "Basketball", group: "U15 Boys SSSA", dateLabel: "April 1",  timeLabel: "5:00 PM", home: "Hiba Lions", away: "SUIS GB", venueType: "Home", status: "UPCOMING" },
  { sport: "Basketball", group: "U15 Boys SSSA", dateLabel: "April 15", timeLabel: "5:00 PM", home: "Hiba Lions", away: "Pao", venueType: "Home", status: "UPCOMING" },
  { sport: "Basketball", group: "U15 Boys SSSA", dateLabel: "April 22", timeLabel: "5:00 PM", home: "Hiba Lions", away: "SCL", venueType: "Home", status: "UPCOMING" },
  { sport: "Basketball", group: "U15 Boys SSSA", dateLabel: "April 29", timeLabel: "5:00 PM", home: "Hiba Lions", away: "SHSID", venueType: "Home", status: "UPCOMING" },

  // Basketball U15 Girls (new)
  { sport: "Basketball", group: "U15 Girls SSSA", dateLabel: "March 11", timeLabel: "5:00 PM", home: "SHSID", away: "Hiba Lions", venueType: "Away", status: "UPCOMING" },
  { sport: "Basketball", group: "U15 Girls SSSA", dateLabel: "March 18", timeLabel: "5:00 PM", home: "Hiba Lions", away: "SUIS HQ", venueType: "Home", status: "UPCOMING" },
  { sport: "Basketball", group: "U15 Girls SSSA", dateLabel: "April 1",  timeLabel: "5:00 PM", home: "Hiba Lions", away: "SUIS GB", venueType: "Home", status: "UPCOMING" },
  { sport: "Basketball", group: "U15 Girls SSSA", dateLabel: "April 7",  timeLabel: "5:00 PM", home: "SUIS GB", away: "Hiba Lions", venueType: "Away", status: "UPCOMING" },
  { sport: "Basketball", group: "U15 Girls SSSA", dateLabel: "April 15", timeLabel: "5:00 PM", home: "SUIS HQ", away: "Hiba Lions", venueType: "Away", status: "UPCOMING" },
  { sport: "Basketball", group: "U15 Girls SSSA", dateLabel: "April 29", timeLabel: "5:00 PM", home: "Hiba Lions", away: "SHSID", venueType: "Home", status: "UPCOMING" },
];

const statusTabs: Array<"ALL" | Status> = ["ALL", "UPCOMING", "TODAY", "FINISHED"];

export default function MatchesPage() {
  const [statusFilter, setStatusFilter] = useState<"ALL" | Status>("ALL");

  const filtered = useMemo(() => {
    if (statusFilter === "ALL") return matches;
    return matches.filter((m) => m.status === statusFilter);
  }, [statusFilter]);

  const volleyball = filtered.filter((m) => m.sport === "Volleyball");
  const basketball = filtered.filter((m) => m.sport === "Basketball");

  return (
    <main className="space-y-6">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Matches</h1>
          <p className="mt-1 text-slate-400">By sport + status, ESPN-style structure</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={[
                "rounded-full border px-4 py-1.5 text-sm transition",
                statusFilter === tab
                  ? "border-cyan-400/50 bg-cyan-400/20 text-cyan-100"
                  : "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10",
              ].join(" ")}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      <SportBlock title="Volleyball" items={volleyball} />
      <SportBlock title="Basketball" items={basketball} />
    </main>
  );
}

function SportBlock({ title, items }: { title: string; items: Match[] }) {
  if (items.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-4xl font-semibold">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((m, i) => (
          <article key={`${m.sport}-${m.group}-${m.dateLabel}-${i}`} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-slate-400">{m.group}</span>
              <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-emerald-200">{m.status}</span>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1">
              <span className="text-4 font-medium">{m.home}</span>
              <span className="text-slate-400">VS</span>
              <span className="text-4 font-medium">{m.away}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs ${m.venueType === "Home" ? "bg-cyan-400/15 text-cyan-200" : "bg-violet-400/15 text-violet-200"}`}>
                {m.venueType}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between text-slate-300">
              <span>{m.dateLabel}</span>
              <span>{m.timeLabel}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
