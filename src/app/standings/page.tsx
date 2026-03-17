"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  buildStandingsFromFinishedMatches,
  type DerivedStandingRow,
  type LiveMatchRow,
} from "@/lib/live-derived";

export default function StandingsPage() {
  const [rows, setRows] = useState<DerivedStandingRow[]>([]);

  async function loadStandings() {
    const { data, error } = await supabase
      .from("matches_live")
      .select("*")
      .eq("status", "FINISHED");

    if (error) {
      console.error(error);
      setRows([]);
      return;
    }

    const standings = buildStandingsFromFinishedMatches((data || []) as LiveMatchRow[]);
    setRows(standings);
  }

  useEffect(() => {
    loadStandings();

    const channel = supabase
      .channel("standings-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "matches_live" },
        () => loadStandings()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Standings</h1>

      {!rows.length ? (
        <div className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm text-slate-700">
          No finished matches yet. Standings will appear automatically after a match is marked FINISHED.
        </div>
      ) : (
        <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white/75 shadow-sm">
          <div className="grid grid-cols-[72px_1.6fr_100px_100px_120px_120px_120px] border-b border-black/10 bg-slate-50 px-5 py-4 text-sm font-semibold uppercase tracking-wide text-slate-600">
            <div>#</div>
            <div>Team</div>
            <div>Wins</div>
            <div>Losses</div>
            <div>Sets Won</div>
            <div>Sets Lost</div>
            <div>Set Diff</div>
          </div>

          {rows.map((row, index) => (
            <div
              key={row.team}
              className="grid grid-cols-[72px_1.6fr_100px_100px_120px_120px_120px] items-center border-b border-black/5 px-5 py-4 text-slate-800 last:border-b-0"
            >
              <div className="font-semibold">{index + 1}</div>
              <div className="font-medium">{row.team}</div>
              <div>{row.wins}</div>
              <div>{row.losses}</div>
              <div>{row.setsWon}</div>
              <div>{row.setsLost}</div>
              <div>{row.setDiff > 0 ? `+${row.setDiff}` : row.setDiff}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
