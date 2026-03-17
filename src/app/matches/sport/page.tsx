"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MATCHES } from "@/data/matches";
import { computeDisplayStatus } from "@/lib/match-status";

type LiveMatchRow = {
  id: string;
  sport: string;
  group_name: string;
  date_label: string;
  time_label: string;
  home: string;
  away: string;
  venue_type: string;
  status: string;
};

type SportCard = {
  id: string;
  sport: string;
  group: string;
  home: string;
  away: string;
  venueType: string;
  dateLabel: string;
  timeLabel: string;
  status: string;
};

function normalizeStaticMatches() {
  return MATCHES.map((m: any) => ({
    id: String(m.id),
    sport: m.sport,
    group: m.group || m.league || "",
    home: m.home,
    away: m.away,
    venueType: m.venueType,
    dateLabel: m.dateLabel,
    timeLabel: m.timeLabel,
    status: computeDisplayStatus(m.dateLabel, m.timeLabel),
  }));
}

export default function SportMatchesPage() {
  const [liveRows, setLiveRows] = useState<SportCard[]>([]);

  async function loadLiveRows() {
    const { data, error } = await supabase
      .from("matches_live")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error(error);
      setLiveRows([]);
      return;
    }

    const mapped = ((data || []) as LiveMatchRow[]).map((row) => ({
      id: row.id,
      sport: row.sport,
      group: row.group_name || "",
      home: row.home,
      away: row.away,
      venueType: row.venue_type,
      dateLabel: row.date_label,
      timeLabel: row.time_label,
      status: row.status || "UPCOMING",
    }));

    setLiveRows(mapped);
  }

  useEffect(() => {
    loadLiveRows();

    const channel = supabase
      .channel("matches-sport-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "matches_live" },
        () => loadLiveRows()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const volleyballMatches = useMemo(() => {
    const liveVolleyball = liveRows.filter(
      (m) => (m.sport || "").toLowerCase() === "volleyball"
    );

    if (liveVolleyball.length > 0) return liveVolleyball;

    return normalizeStaticMatches().filter(
      (m) => (m.sport || "").toLowerCase() === "volleyball"
    );
  }, [liveRows]);

  return (
    <main className="space-y-6">
      <Link href="/" className="inline-block text-sm text-slate-700 hover:text-slate-950">
        ← Back to Dashboard
      </Link>

      <section>
        <h1 className="text-5xl font-semibold tracking-tight">Volleyball Matches</h1>
        <p className="mt-2 text-xl text-slate-700">Full schedule • all matches</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {volleyballMatches.map((match) => (
          <article
            key={match.id}
            className="rounded-[28px] border border-black/10 bg-white/70 p-7 shadow-sm"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-lg text-slate-800">{match.group}</p>
              </div>

              <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
                {match.status}
              </span>
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-6">
              <div className="space-y-3 text-[22px] leading-tight text-slate-900">
                <div>{match.home}</div>
                <div>{match.away}</div>
              </div>

              <div className="space-y-3 text-right">
                <div className="text-[22px] leading-tight text-slate-900">vs</div>
                <span className="rounded-full bg-sky-100 px-4 py-1 text-sm text-slate-700">
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
                  href={`/matches/${match.id}`}
                  className="text-[18px] text-slate-700 hover:text-slate-950"
                >
                  Open Match
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
