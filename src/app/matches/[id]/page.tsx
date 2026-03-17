"use client";

import Link from "next/link";
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
};

export default function MatchDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [row, setRow] = useState<MatchLive | null>(null);

  async function loadRow() {
    const { data, error } = await supabase
      .from("matches_live")
      .select("*")
      .eq("id", params.id)
      .maybeSingle();

    if (error) {
      console.error(error);
      return;
    }

    setRow((data as MatchLive | null) || null);
  }

  useEffect(() => {
    loadRow();

    const channel = supabase
      .channel(`match-${params.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "matches_live", filter: `id=eq.${params.id}` },
        () => loadRow()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [params.id]);

  if (!row) {
    return (
      <main className="space-y-6 p-6">
        <Link href="/matches" className="text-sm text-slate-600 hover:text-slate-900">
          ← Back to Matches
        </Link>
        <p>No live data found for this match yet.</p>
      </main>
    );
  }

  return (
    <main className="space-y-6 p-6">
      <Link href="/matches" className="text-sm text-slate-600 hover:text-slate-900">
        ← Back to Matches
      </Link>

      <section className="rounded-[28px] border border-black/10 bg-white/70 p-7 shadow-sm">
        <p className="text-xl text-slate-700">{row.sport} • {row.clock_text || row.status}</p>
        <h1 className="text-5xl font-semibold tracking-tight">{row.home} vs {row.away}</h1>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[24px] border border-black/10 bg-white/60 p-5 text-center">
            <div className="text-2xl">{row.home}</div>
            <div className="text-6xl font-semibold">{row.home_sets}</div>
          </div>

          <div className="rounded-[24px] border border-black/10 bg-white/60 p-5 text-center">
            <div className="text-2xl">Clock</div>
            <div className="text-6xl font-semibold">{row.clock_text || "-"}</div>
          </div>

          <div className="rounded-[24px] border border-black/10 bg-white/60 p-5 text-center">
            <div className="text-2xl">{row.away}</div>
            <div className="text-6xl font-semibold">{row.away_sets}</div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[28px] border border-black/10 bg-white/70 p-7 shadow-sm">
          <h2 className="text-3xl font-semibold">Play-by-Play</h2>
          <pre className="mt-6 whitespace-pre-wrap text-lg text-slate-700">{row.play_by_play}</pre>
        </div>

        <div className="rounded-[28px] border border-black/10 bg-white/70 p-7 shadow-sm">
          <h2 className="text-3xl font-semibold">Player Stats</h2>
          <pre className="mt-6 whitespace-pre-wrap text-lg text-slate-700">{row.player_stats}</pre>
        </div>
      </section>
    </main>
  );
}
