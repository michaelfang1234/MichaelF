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
  current_set?: string;
  play_by_play: string;
  player_stats: string;
};

function statusClasses(status: string) {
  const s = (status || "").toUpperCase();

  if (s === "LIVE") return "bg-red-100 text-red-700 border-red-200";
  if (s === "TODAY") return "bg-amber-100 text-amber-700 border-amber-200";
  if (s === "FINISHED") return "bg-slate-200 text-slate-700 border-slate-300";
  return "bg-emerald-100 text-emerald-700 border-emerald-200";
}

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
      <main className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
        <Link href="/matches" className="inline-block text-sm text-slate-600 hover:text-slate-900">
          ← Back to Matches
        </Link>
        <div className="rounded-[28px] border border-black/10 bg-white/75 p-8 shadow-sm">
          <p className="text-lg text-slate-700">No live data found for this match yet.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      <Link href="/matches" className="inline-block text-sm text-slate-600 hover:text-slate-900">
        ← Back to Matches
      </Link>

      <section className="rounded-[32px] border border-black/10 bg-white/75 p-5 shadow-sm md:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-base text-slate-600 md:text-lg">
              {row.sport} • {row.group_name}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full border px-4 py-1 text-sm font-semibold ${statusClasses(
                  row.status
                )}`}
              >
                {row.status}
              </span>
              <span className="text-sm text-slate-500">
                {row.date_label} • {row.time_label} • {row.venue_type}
              </span>
            </div>
          </div>

          <div className="text-sm text-slate-500">
            {row.current_set || ""}
          </div>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-6xl">
          {row.home} <span className="text-slate-400">vs</span> {row.away}
        </h1>

        <div className="mt-8 grid gap-4 md:grid-cols-[1fr_1.1fr_1fr]">
          <div className="rounded-[28px] border border-black/10 bg-white p-5 shadow-sm md:p-6">
            <div className="text-center">
              <div className="text-lg text-slate-700 md:text-xl">{row.home}</div>
              <div className="mt-4 text-6xl font-semibold leading-none text-slate-900 md:text-7xl">
                {row.home_sets}
              </div>
              <div className="mt-3 text-xs uppercase tracking-wider text-slate-500">
                Sets Won
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-black/10 bg-white p-5 text-slate-900 shadow-sm md:p-6">
            <div className="text-center">
              <div className="text-sm uppercase tracking-[0.2em] text-slate-500 md:text-base">
                Current Score
              </div>
              <div className="mt-4 break-words text-4xl font-semibold leading-tight text-slate-900 md:text-6xl">
                {row.clock_text || "-"}
              </div>
              <div className="mt-3 text-sm text-slate-500">
                {row.current_set || "Live update"}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-black/10 bg-white p-5 shadow-sm md:p-6">
            <div className="text-center">
              <div className="text-lg text-slate-700 md:text-xl">{row.away}</div>
              <div className="mt-4 text-6xl font-semibold leading-none text-slate-900 md:text-7xl">
                {row.away_sets}
              </div>
              <div className="mt-3 text-xs uppercase tracking-wider text-slate-500">
                Sets Won
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-black/10 bg-white/75 p-5 shadow-sm md:p-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Play-by-Play</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-wide text-slate-500">
              live feed
            </span>
          </div>

          <div className="rounded-[24px] bg-slate-50/80 p-4 md:p-5">
            <pre className="whitespace-pre-wrap font-sans text-base leading-8 text-slate-700 md:text-lg">
              {row.play_by_play || "No play-by-play yet."}
            </pre>
          </div>
        </div>

        <div className="rounded-[32px] border border-black/10 bg-white/75 p-5 shadow-sm md:p-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">Player Stats</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-wide text-slate-500">
              updated live
            </span>
          </div>

          <div className="rounded-[24px] bg-slate-50/80 p-4 md:p-5">
            <pre className="whitespace-pre-wrap font-sans text-base leading-8 text-slate-700 md:text-lg">
              {row.player_stats || "No player stats yet."}
            </pre>
          </div>
        </div>
      </section>
    </main>
  );
}


