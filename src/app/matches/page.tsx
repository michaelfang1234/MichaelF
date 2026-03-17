"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { visibleRecentMatches, type LiveMatchRow } from "@/lib/live-derived";
import { toSortableDate } from "@/lib/match-status";

type MatchCard = {
  id: string;
  group: string;
  sport: string;
  home: string;
  away: string;
  venueType: string;
  dateLabel: string;
  timeLabel: string;
  href: string;
  displayStatus: string;
};

function sortRecent(rows: LiveMatchRow[]) {
  const now = new Date();

  return [...rows]
    .sort((a, b) => {
      const da = Math.abs(toSortableDate(a.date_label, a.time_label).getTime() - now.getTime());
      const db = Math.abs(toSortableDate(b.date_label, b.time_label).getTime() - now.getTime());
      return da - db;
    })
    .slice(0, 4);
}

export default function MatchesPage() {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [loaded, setLoaded] = useState(false);

  async function loadLiveMatches() {
    const { data, error } = await supabase
      .from("matches_live")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error(error);
      setCards([]);
      setLoaded(true);
      return;
    }

    const rows = visibleRecentMatches((data || []) as LiveMatchRow[]);
    const nextCards = sortRecent(rows).map((row) => ({
      id: row.id,
      group: row.group_name || "",
      sport: row.sport,
      home: row.home,
      away: row.away,
      venueType: row.venue_type,
      dateLabel: row.date_label,
      timeLabel: row.time_label,
      href: `/matches/${row.id}`,
      displayStatus: row.status || "UPCOMING",
    }));

    setCards(nextCards);
    setLoaded(true);
  }

  useEffect(() => {
    loadLiveMatches();

    const channel = supabase
      .channel("matches-page-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "matches_live" },
        () => loadLiveMatches()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <main className="space-y-6">
      <section>
        <h1 className="text-5xl font-semibold tracking-tight">Matches</h1>
        <p className="mt-2 text-xl text-slate-700">Nearest 4 matches</p>
      </section>

      {!loaded ? (
        <div className="rounded-[28px] border border-black/10 bg-white/70 p-7 shadow-sm text-slate-700">
          Loading matches...
        </div>
      ) : cards.length === 0 ? (
        <div className="rounded-[28px] border border-black/10 bg-white/70 p-7 shadow-sm text-slate-700">
          No upcoming or live matches right now.
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {cards.map((match) => (
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
                  {match.displayStatus}
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto] gap-6">
                <div className="space-y-3 text-[22px] leading-tight text-slate-900">
                  <div>{match.home}</div>
                  <div>{match.away}</div>
                </div>

                <div className="space-y-3 text-right">
                  <div className="text-[22px] leading-tight text-slate-900">vs</div>
                  <span className="rounded-full bg-slate-100 px-4 py-1 text-sm text-slate-700">
                    {match.venueType}
                  </span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-[1fr_auto] items-end gap-6">
                <div>
                  <div className="text-[20px] text-slate-800">{match.dateLabel}</div>
                  <div className="text-[20px] text-slate-800">{match.timeLabel}</div>
                </div>

                <div>
                  <Link
                    href={match.href}
                    className="text-[18px] text-slate-700 hover:text-slate-950"
                  >
                    Open Match
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
