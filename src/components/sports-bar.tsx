"use client";

import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";

type SportKey = "Football" | "Basketball" | "Volleyball" | "Swimming";
type SectionKey = "Home" | "Matches" | "Standings" | "Teams" | "Players";

const sports: SportKey[] = ["Football", "Basketball", "Volleyball", "Swimming"];
const sections: SectionKey[] = ["Home", "Matches", "Standings", "Teams", "Players"];

const leagueBySport: Record<SportKey, string> = {
  Football: "SSSA Football League",
  Basketball: "SSSA Basketball League",
  Volleyball: "SSSA Volleyball League",
  Swimming: "SSSA Swimming League",
};

export default function SportsBar() {
  const [activeSport, setActiveSport] = useState<SportKey | null>(null);
  const [activeSection, setActiveSection] = useState<SectionKey>("Home");

  function renderContent() {
    if (!activeSport) {
      return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Explore Hiba Lions Sports</h2>
          <p className="mt-2 text-slate-300">Choose a sport above to view Home, Matches, Standings, Teams, and Players.</p>
        </div>
      );
    }

    if (activeSection === "Matches") {
      return (
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="mb-3 text-slate-300">{activeSport} matches are unified in Matches center.</p>
          <Link href={`/matches/sport?name=${activeSport.toLowerCase()}`} className="inline-block rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">
            Open Matches
          </Link>
        </div>
      );
    }

    if (activeSection === "Players") {
      return (
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <Link href="/players" className="inline-block rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">
            Open Players
          </Link>
        </div>
      );
    }

    return <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-slate-300">{activeSport} • {activeSection} coming soon.</div>;
  }

  return (
    <div className="mt-4 space-y-3">
      <div className="flex flex-wrap gap-2">
        {sports.map((s) => (
          <button key={s} onClick={() => { setActiveSport(s); setActiveSection("Home"); }}
            className={clsx("rounded-full border px-3 py-1 text-sm transition", activeSport === s ? "border-[#F26A3D]/50 bg-[#F26A3D]/20 text-orange-100" : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10")}>
            {s}
          </button>
        ))}
      </div>

      {activeSport ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3">
            <span className="rounded-full border border-[#F26A3D]/40 bg-[#F26A3D]/15 px-2 py-0.5 text-xs text-orange-100">{leagueBySport[activeSport]}</span>
          </div>
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="space-y-2 lg:col-span-3">
              {sections.map((item) => (
                <button key={item} onClick={() => setActiveSection(item)}
                  className={clsx("w-full rounded-lg px-3 py-2 text-left text-sm transition", activeSection === item ? "bg-[#F26A3D] text-white" : "bg-white/5 text-slate-200 hover:bg-white/10")}>
                  {item}
                </button>
              ))}
            </div>
            <div className="lg:col-span-9">{renderContent()}</div>
          </div>
        </div>
      ) : renderContent()}
    </div>
  );
}


