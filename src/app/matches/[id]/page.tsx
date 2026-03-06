"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type LiveData = {
  id: string;
  sport: "Basketball" | "Volleyball";
  status: "PRE" | "LIVE" | "FINAL";
  periodLabel: string;
  clock: string;
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  updatedAt: string;
  events: Array<{ t: string; team: string; text: string }>;
  homePlayers: Array<{ name: string; number: string; stats: Record<string, string | number> }>;
  awayPlayers: Array<{ name: string; number: string; stats: Record<string, string | number> }>;
};

export default function MatchLivePage() {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";
  const [data, setData] = useState<LiveData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let alive = true;

    const load = async () => {
      try {
        const r = await fetch(`/api/live/${id}`, { cache: "no-store" });
        if (!r.ok) return;
        const j = await r.json();
        if (alive) {
          setData(j);
          setLoading(false);
        }
      } catch {}
    };

    load();
    const t = setInterval(load, 5000);
    return () => { alive = false; clearInterval(t); };
  }, [id]);

  if (loading) return <main className="p-4">Loading...</main>;
  if (!data) return <main className="p-4">No data</main>;

  return (
    <main className="space-y-5">
      <Link href="/matches" className="text-sm text-slate-400 hover:text-white">← Back to Matches</Link>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm text-slate-400">{data.sport} • {data.periodLabel}</p>
        <h1 className="text-3xl font-semibold">{data.home} vs {data.away}</h1>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-center"><p>{data.home}</p><p className="text-4xl font-bold">{data.homeScore}</p></div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-center"><p>Clock</p><p className="text-3xl font-semibold">{data.clock}</p></div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-center"><p>{data.away}</p><p className="text-4xl font-bold">{data.awayScore}</p></div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="mb-3 text-xl font-semibold">Play-by-Play</h2>
          <div className="space-y-2">
            {data.events?.map((e, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-black/20 p-3">
                <p className="text-xs text-slate-400">{e.t} • {e.team}</p>
                <p className="text-sm">{e.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="mb-3 text-xl font-semibold">Player Stats</h2>
          <p className="text-sm text-slate-300 mb-2">{data.home}</p>
          <div className="space-y-2">
            {data.homePlayers?.map((p, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-black/20 p-2 text-sm">
                <p className="font-medium">{p.number} • {p.name}</p>
                <p className="text-slate-300">{Object.entries(p.stats).map(([k,v]) => `${k}: ${v}`).join(" • ")}</p>
              </div>
            ))}
          </div>

          <div className="my-3 border-t border-white/10" />

          <p className="text-sm text-slate-300 mb-2">{data.away}</p>
          <div className="space-y-2">
            {data.awayPlayers?.map((p, i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-black/20 p-2 text-sm">
                <p className="font-medium">{p.number} • {p.name}</p>
                <p className="text-slate-300">{Object.entries(p.stats).map(([k,v]) => `${k}: ${v}`).join(" • ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
