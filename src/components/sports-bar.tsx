"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

type SportKey = "Football" | "Basketball" | "Volleyball" | "Swimming";
type SectionKey = "Home" | "Scores" | "Schedule" | "Standings" | "Teams";

const sports: SportKey[] = ["Football", "Basketball", "Volleyball", "Swimming"];
const sections: SectionKey[] = ["Home", "Scores", "Schedule", "Standings", "Teams"];

const leagueBySport: Record<SportKey, string> = {
  Football: "SSSA Football League",
  Basketball: "SSSA Basketball League",
  Volleyball: "SSSA Volleyball League",
  Swimming: "SSSA Swimming League",
};

const volleyballU19Girls = [
  { date: "March 17", home: "HSPN", away: "NACIS", venueType: "Home", time: "5:00 PM", status: "UPCOMING" },
  { date: "March 25", home: "HSPN", away: "KCIS", venueType: "Home", time: "5:15 PM", status: "UPCOMING" },
  { date: "April 1", home: "PingHe", away: "HSPN", venueType: "Away", time: "5:00 PM", status: "UPCOMING" },
  { date: "April 7", home: "HSPN", away: "QDHS", venueType: "Home", time: "5:00 PM", status: "UPCOMING" },
  { date: "April 17", home: "WCIS", away: "HSPN", venueType: "Away", time: "5:00 PM", status: "UPCOMING" },
  { date: "April 22", home: "HSPN", away: "UCS", venueType: "Home", time: "5:00 PM", status: "UPCOMING" },
  { date: "April 28", home: "SUIS QP*", away: "HSPN", venueType: "Away", time: "5:00 PM", status: "UPCOMING" },
];

export default function SportsBar() {
  const [activeSport, setActiveSport] = useState<SportKey | null>(null);
  const [activeSection, setActiveSection] = useState<SectionKey>("Home");

  useEffect(() => {
    const handler = () => {
      setActiveSport(null);
      setActiveSection("Home");
    };
    window.addEventListener("hspn:reset-nav", handler);
    return () => window.removeEventListener("hspn:reset-nav", handler);
  }, []);

  const league = useMemo(() => (activeSport ? leagueBySport[activeSport] : ""), [activeSport]);

  function renderVolleyballScheduleCards() {
    return (
      <div className="space-y-3">
        <div className="text-sm text-slate-300">U19 Girls • {league}</div>
        <div className="grid gap-4 md:grid-cols-2">
          {volleyballU19Girls.map((m, i) => (
            <article key={i} className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:bg-white/5">
              <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
                <span>Girls League</span>
                <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-emerald-200">{m.status}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xl">{m.home}</span>
                  <span className="text-slate-400">vs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl">{m.away}</span>
                  <span className={clsx("rounded-full px-2 py-0.5 text-xs", m.venueType === "Home" ? "bg-cyan-400/15 text-cyan-200" : "bg-violet-400/15 text-violet-200")}>
                    {m.venueType}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-slate-300">
                <span>{m.date}</span>
                <span>{m.time}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  function renderContent() {
    if (!activeSport) {
      return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Explore HSPN Sports</h2>
          <p className="mt-2 text-slate-300">Choose a sport above to view Home, Scores, Schedule, Standings, and Teams.</p>
          <p className="mt-4 text-sm text-slate-400">No default sport selected (ESPN-style entry).</p>
        </div>
      );
    }
    if (activeSection === "Schedule" && activeSport === "Volleyball") return renderVolleyballScheduleCards();
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
