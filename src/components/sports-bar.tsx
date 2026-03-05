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

const volleyballSchedule = [
  { home: "Hiba Lions", away: "NACIS", date: "March 17", time: "5:00 PM", venue: "Home", status: "UPCOMING" },
  { home: "Hiba Lions", away: "KCIS", date: "March 25", time: "5:15 PM", venue: "Home", status: "UPCOMING" },
  { home: "PingHe", away: "Hiba Lions", date: "April 1", time: "5:00 PM", venue: "Away", status: "UPCOMING" },
];

export default function SportsBar() {
  const [activeSport, setActiveSport] = useState<SportKey | null>(null);
  const [activeSection, setActiveSection] = useState<SectionKey>("Home");

  useEffect(() => {
    const resetIfNeeded = () => {
      if (typeof window !== "undefined" && window.location.hash === "#reset") {
        setActiveSport(null);
        setActiveSection("Home");
      }
    };
    resetIfNeeded();
    window.addEventListener("hashchange", resetIfNeeded);
    return () => window.removeEventListener("hashchange", resetIfNeeded);
  }, []);

  const league = useMemo(() => (activeSport ? leagueBySport[activeSport] : ""), [activeSport]);

  function renderPlayers() {
    if (activeSport === "Basketball") {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <Link href="/players?q=michael" className="rounded-xl border border-white/10 bg-black/20 p-4 hover:bg-white/5"><p className="font-semibold">Michael Fang</p><p className="text-sm text-slate-400">U19 Boys Basketball Team</p></Link>
          <Link href="/players?q=andy" className="rounded-xl border border-white/10 bg-black/20 p-4 hover:bg-white/5"><p className="font-semibold">Andy Gu</p><p className="text-sm text-slate-400">U19 Boys Basketball Team</p></Link>
        </div>
      );
    }
    if (activeSport === "Volleyball") {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <Link href="/players?q=ariel" className="rounded-xl border border-white/10 bg-black/20 p-4 hover:bg-white/5"><p className="font-semibold">Ariel Pan</p><p className="text-sm text-slate-400">U19 Girls Volleyball Team</p></Link>
          <Link href="/players?q=michelle" className="rounded-xl border border-white/10 bg-black/20 p-4 hover:bg-white/5"><p className="font-semibold">Michelle Xu</p><p className="text-sm text-slate-400">U19 Girls Volleyball Team</p></Link>
        </div>
      );
    }
    return <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-slate-300">{activeSport} players coming soon.</div>;
  }

  function renderSchedule() {
    if (activeSport === "Volleyball") {
      return (
        <div className="grid gap-3 md:grid-cols-2">
          {volleyballSchedule.map((m, i) => (
            <article key={i} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">Girls League</span>
                <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-emerald-200">{m.status}</span>
              </div>
              <p className="text-lg">{m.home} vs {m.away}</p>
              <p className="mt-1 text-sm text-slate-300">{m.date} • {m.time}</p>
            </article>
          ))}
        </div>
      );
    }
    return <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-slate-300">{activeSport} schedule coming soon.</div>;
  }

  function renderContent() {
    if (!activeSport) {
      return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Explore Hiba Lions Sports</h2>
          <p className="mt-2 text-slate-300">Choose a sport above to view Home, Scores, Schedule, Standings, Teams, and Players.</p>
        </div>
      );
    }

    if (activeSection === "Schedule") return renderSchedule();
    if (activeSection === "Players") return renderPlayers();

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
      ) : (
        renderContent()
      )}
    </div>
  );
}
