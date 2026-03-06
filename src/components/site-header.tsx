"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import TopSearch from "@/components/top-search";
import { LIVE_LINKS } from "@/data/live-links";

export default function SiteHeader() {
  const [openLive, setOpenLive] = useState(false);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  const todayLives = useMemo(
    () => LIVE_LINKS.filter((x) => x.date === todayStr),
    [todayStr]
  );

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-md border border-white/15 bg-[#F26A3D]/20" />
        <div>
          <h1 className="text-4 font-semibold">Hiba Lions</h1>
          <p className="text-sm text-slate-400">Huili Sports Network</p>
        </div>
      </div>

      <div className="relative flex items-center gap-5">
        <button onClick={() => setOpenLive((v) => !v)} className="text-slate-300 hover:text-white">
          Live
        </button>
        <span className="text-slate-500">•</span>
        <Link href="/matches" className="text-slate-300 hover:text-white">Scores</Link>
        <span className="text-slate-500">•</span>
        <span className="text-slate-300">News</span>

        {openLive && (
          <div className="absolute right-[260px] top-8 z-50 w-[380px] rounded-xl border border-white/10 bg-[#0f172a] p-3 shadow-2xl">
            <p className="mb-2 text-sm font-medium text-white">Today’s live streams</p>
            {todayLives.length === 0 ? (
              <p className="text-xs text-slate-400">No live stream today.</p>
            ) : (
              <div className="space-y-2">
                {todayLives.map((x) => (
                  <a
                    key={x.id}
                    href={x.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-lg border border-white/10 bg-black/20 px-3 py-2 hover:bg-white/10"
                  >
                    <p className="text-sm">{x.sport} • {x.title}</p>
                    <p className="text-xs text-slate-400">{x.platform}</p>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <TopSearch />
    </header>
  );
}
