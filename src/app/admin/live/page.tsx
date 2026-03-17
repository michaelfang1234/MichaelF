"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type MatchLive = {
  id: string;
  sport: string;
  group_name: string;
  date_label: string;
  time_label: string;
  home: string;
  away: string;
  venue_type: string;
  status: string;
  home_sets: number;
  away_sets: number;
  clock_text: string;
  play_by_play: string;
  player_stats: string;
  updated_at: string;
};

export default function AdminLivePage() {
  const [rows, setRows] = useState<MatchLive[]>([]);

  async function loadRows() {
    const { data, error } = await supabase
      .from("matches_live")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setRows((data || []) as MatchLive[]);
  }

  useEffect(() => {
    loadRows();

    const channel = supabase
      .channel("matches-live-admin")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "matches_live" },
        () => loadRows()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function saveRow(id: string, patch: Partial<MatchLive>) {
    const { error } = await supabase
      .from("matches_live")
      .update({
        ...patch,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Save failed. Check console.");
      return;
    }

    await loadRows();
  }

  return (
    <main className="space-y-4 p-6">
      <h1 className="text-3xl font-semibold">Live Score Admin</h1>

      <div className="grid gap-4">
        {rows.map((row) => (
          <div key={row.id} className="rounded-2xl border bg-white/80 p-4">
            <div className="mb-3">
              <div className="text-lg font-semibold">{row.home} vs {row.away}</div>
              <div className="text-sm text-slate-600">
                {row.sport} · {row.group_name} · {row.date_label} · {row.time_label}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              <select
                className="rounded border px-3 py-2"
                value={row.status}
                onChange={(e) => saveRow(row.id, { status: e.target.value })}
              >
                <option value="UPCOMING">UPCOMING</option>
                <option value="TODAY">TODAY</option>
                <option value="LIVE">LIVE</option>
                <option value="FINISHED">FINISHED</option>
              </select>

              <input
                className="rounded border px-3 py-2"
                type="number"
                value={row.home_sets}
                onChange={(e) => saveRow(row.id, { home_sets: Number(e.target.value) })}
              />

              <input
                className="rounded border px-3 py-2"
                type="number"
                value={row.away_sets}
                onChange={(e) => saveRow(row.id, { away_sets: Number(e.target.value) })}
              />

              <input
                className="rounded border px-3 py-2"
                value={row.clock_text}
                onChange={(e) => saveRow(row.id, { clock_text: e.target.value })}
                placeholder="18-16 / FT / Set 2"
              />
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <textarea
                className="min-h-[220px] rounded border px-3 py-2"
                value={row.play_by_play}
                onChange={(e) => saveRow(row.id, { play_by_play: e.target.value })}
                placeholder="Play-by-play"
              />

              <textarea
                className="min-h-[220px] rounded border px-3 py-2"
                value={row.player_stats}
                onChange={(e) => saveRow(row.id, { player_stats: e.target.value })}
                placeholder="Player stats"
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
