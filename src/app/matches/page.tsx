"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MATCHES, type MatchStatus } from "@/data/matches";
import { getMatchStatus } from "@/lib/match-status";

const statusTabs: Array<"ALL" | MatchStatus> = ["ALL", "UPCOMING", "TODAY", "FINISHED"];

export default function MatchesPage() {
  const [statusFilter, setStatusFilter] = useState<"ALL" | MatchStatus>("ALL");

  const hydrated = useMemo(() => MATCHES.map((m) => ({ ...m, status: getMatchStatus(m) })), []);
  const filtered = useMemo(() => statusFilter === "ALL" ? hydrated : hydrated.filter((m) => m.status === statusFilter), [hydrated, statusFilter]);

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
            <button key={tab} onClick={() => setStatusFilter(tab)}
              className={["rounded-full border px-4 py-1.5 text-sm transition", statusFilter === tab ? "border-cyan-400/50 bg-cyan-400/20 text-cyan-100" : "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"].join(" ")}>
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

function SportBlock({ title, items }: { title: string; items: any[] }) {
  if (!items.length) return null;
  return (
    <section className="space-y-3">
      <h2 className="text-4xl font-semibold">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((m) => (
          <article key={m.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-slate-400">{m.group}</span>
              <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-emerald-200">{m.status}</span>
            </div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1">
              <span className="font-medium">{m.home}</span><span className="text-slate-400">VS</span>
              <span className="font-medium">{m.away}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs ${m.venueType === "Home" ? "bg-cyan-400/15 text-cyan-200" : "bg-violet-400/15 text-violet-200"}`}>{m.venueType}</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-slate-300">
              <span>{m.dateLabel}</span>
              <span>{m.timeLabel}</span>
            </div>
            <Link href={`/matches/${m.id}`} className="mt-4 inline-block rounded-lg border border-white/15 bg-black/30 px-3 py-1.5 text-sm hover:bg-white/10">
              View Live
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
