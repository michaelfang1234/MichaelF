"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

type SportKey = "Football" | "Basketball" | "Volleyball" | "Swimming";
type SectionKey = "Home" | "Scores" | "Schedule" | "Standings" | "Teams" | "Players";

const sports: SportKey[] = ["Football", "Basketball", "Volleyball", "Swimming"];
const sections: SectionKey[] = ["Home", "Scores", "Schedule", "Standings", "Teams", "Players"];

const leagueBySport: Record<SportKey, string> = {
  Football: "SSSA Football League",
  Basketball: "SSSA Basketball League",
  Volleyball: "SSSA Volleyball League",
  Swimming: "SSSA Swimming League",
};

export default function SportsBar() {
  const [activeSport, setActiveSport] = useState<SportKey | null>(null);
  const [activeSection, setActiveSection] = useState<SectionKey>("Home");

  useEffect(() => {
    const handler = () => { setActiveSport(null); setActiveSection("Home"); };
    window.addEventListener("hspn:reset-nav", handler);
    return () => window.removeEventListener("hspn:reset-nav", handler);
  }, []);

  const league = useMemo(() => (activeSport ? leagueBySport[activeSport] : ""), [activeSport]);

  function renderContent() {
    if (!activeSport) {
      return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Explore Hiba Lions Sports</h2>
          <p className="mt-2 text-slate-300">Choose a sport above to explore sections.</p>
        </div>
      );
    }
    return <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-slate-300">{activeSport} • {activeSection} coming soon.</div>;
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
            <span className="rounded-full border border-[#F26A3D]/40 bg-[#F26A3D]/15 px-2 py-0.5 text-xs text-orange-100">{league}</span>
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
