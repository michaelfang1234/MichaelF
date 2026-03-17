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
  current_set?: string;
  play_by_play: string;
  player_stats: string;
  updated_at: string;
};

export default function AdminLivePage() {
  const [rows, setRows] = useState<MatchLive[]>([]);
  const [drafts, setDrafts] = useState<Record<string, MatchLive>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  async function loadRows() {
    const { data, error } = await supabase
      .from("matches_live")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    const list = (data || []) as MatchLive[];
    setRows(list);

    const nextDrafts: Record<string, MatchLive> = {};
    for (const row of list) {
      nextDrafts[row.id] = row;
    }
    setDrafts(nextDrafts);
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

  function updateDraft(id: string, patch: Partial<MatchLive>) {
    setDrafts((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        ...patch,
      },
    }));
  }

  async function saveRow(id: string) {
    const row = drafts[id];
    if (!row) return;

    setSavingId(id);

    const { error } = await supabase
      .from("matches_live")
      .update({
        status: row.status,
        home_sets: row.home_sets,
        away_sets: row.away_sets,
        clock_text: row.clock_text,
        current_set: row.current_set || "",
        play_by_play: row.play_by_play,
        player_stats: row.player_stats,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    setSavingId(null);

    if (error) {
      console.error(error);
      alert("Save failed. Check console.");
      return;
    }

    await loadRows();
    alert("Saved.");
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      <section className="rounded-[28px] border border-black/10 bg-white/75 p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">Live Match Admin</h1>
        <p className="mt-2 text-slate-600">
          Edit first, then click <span className="font-semibold">Save Update</span>.
        </p>
      </section>

      <div className="grid gap-6">
        {rows.map((row) => {
          const draft = drafts[row.id];
          if (!draft) return null;

          return (
            <section
              key={row.id}
              className="rounded-[28px] border border-black/10 bg-white/75 p-5 shadow-sm md:p-6"
            >
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold">{row.home} vs {row.away}</h2>
                  <p className="mt-1 text-slate-600">
                    {row.sport} • {row.group_name} • {row.date_label} • {row.time_label}
                  </p>
                </div>

                <button
                  onClick={() => saveRow(row.id)}
                  disabled={savingId === row.id}
                  className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {savingId === row.id ? "Saving..." : "Save Update"}
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
                  <select
                    className="w-full rounded-2xl border px-4 py-3"
                    value={draft.status}
                    onChange={(e) => updateDraft(row.id, { status: e.target.value })}
                  >
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="TODAY">TODAY</option>
                    <option value="LIVE">LIVE</option>
                    <option value="FINISHED">FINISHED</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Hiba Sets</label>
                  <input
                    className="w-full rounded-2xl border px-4 py-3"
                    type="number"
                    value={draft.home_sets}
                    onChange={(e) => updateDraft(row.id, { home_sets: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Opponent Sets</label>
                  <input
                    className="w-full rounded-2xl border px-4 py-3"
                    type="number"
                    value={draft.away_sets}
                    onChange={(e) => updateDraft(row.id, { away_sets: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Current Score</label>
                  <input
                    className="w-full rounded-2xl border px-4 py-3"
                    value={draft.clock_text}
                    onChange={(e) => updateDraft(row.id, { clock_text: e.target.value })}
                    placeholder="18-16"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Current Set</label>
                  <input
                    className="w-full rounded-2xl border px-4 py-3"
                    value={draft.current_set || ""}
                    onChange={(e) => updateDraft(row.id, { current_set: e.target.value })}
                    placeholder="Set 2"
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Play-by-Play</label>
                  <textarea
                    className="min-h-[260px] w-full rounded-2xl border px-4 py-3"
                    value={draft.play_by_play}
                    onChange={(e) => updateDraft(row.id, { play_by_play: e.target.value })}
                    placeholder="Write live play-by-play here..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Player Stats</label>
                  <textarea
                    className="min-h-[260px] w-full rounded-2xl border px-4 py-3"
                    value={draft.player_stats}
                    onChange={(e) => updateDraft(row.id, { player_stats: e.target.value })}
                    placeholder="Write player stats here..."
                  />
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
