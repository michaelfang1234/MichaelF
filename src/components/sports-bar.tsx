"use client";

import { useState } from "react";
import clsx from "clsx";

type SportKey = "Football" | "Basketball" | "Volleyball" | "Swimming";
type SectionKey = "Home" | "Scores" | "Schedule" | "Standings" | "Teams";

const sports: SportKey[] = ["Football", "Basketball", "Volleyball", "Swimming"];
const sections: SectionKey[] = ["Home", "Scores", "Schedule", "Standings", "Teams"];

const sportData: Record<SportKey, { league: string; groups: string[]; ages: string[] }> = {
  Football: {
    league: "SSSA Football League",
    groups: ["Boys", "Girls"],
    ages: ["U19", "U15", "U13"],
  },
  Basketball: {
    league: "SSSA Basketball League",
    groups: ["Boys", "Girls"],
    ages: ["U19", "U15", "U13"],
  },
  Volleyball: {
    league: "SSSA Volleyball League",
    groups: ["Boys", "Girls"],
    ages: ["U19", "U15", "U13"],
  },
  Swimming: {
    league: "SSSA Swimming League",
    groups: ["Boys", "Girls"],
    ages: ["U19", "U15", "U13"],
  },
};

const volleyballU19GirlsSchedule = [
  { date: "March 17", match: "Home vs NACIS", time: "5:00 PM" },
  { date: "March 25", match: "Home vs KCIS", time: "5:15 PM" },
  { date: "April 1", match: "Away vs PingHe", time: "5:00 PM" },
  { date: "April 7", match: "Home vs QDHS", time: "5:00 PM" },
  { date: "April 17", match: "Away vs WCIS", time: "5:00 PM" },
  { date: "April 22", match: "Home vs UCS", time: "5:00 PM" },
  { date: "April 28", match: "Away vs SUIS QP*", time: "5:00 PM" },
];

export default function SportsBar() {
  const [activeSport, setActiveSport] = useState<SportKey>("Volleyball");
  const [activeSection, setActiveSection] = useState<SectionKey>("Schedule");
  const info = sportData[activeSport];

  function renderContent() {
    if (activeSection === "Home") {
      return (
        <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-slate-200">
          <div className="text-lg font-semibold">{activeSport} Home</div>
          <p className="mt-2 text-sm text-slate-300">
            {info.league} overview. Select Schedule / Scores / Standings / Teams.
          </p>
        </div>
      );
    }

    if (activeSection === "Schedule") {
      if (activeSport === "Volleyball") {
        return (
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
            <div className="border-b border-white/10 px-4 py-3 text-sm text-slate-300">
              U19 Girls • {info.league}
            </div>
            <table className="w-full border-collapse text-sm">
              <thead className="bg-white/5 text-slate-300">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Match</th>
                  <th className="px-4 py-2 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {volleyballU19GirlsSchedule.map((m, i) => (
                  <tr key={i} className="border-t border-white/10 hover:bg-white/5">
                    <td className="px-4 py-2">{m.date}</td>
                    <td className="px-4 py-2">{m.match}</td>
                    <td className="px-4 py-2">{m.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      return (
        <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-slate-300">
          {activeSport} schedule coming soon.
        </div>
      );
    }

    if (activeSection === "Scores") {
      return (
        <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-slate-300">
          {activeSport} scores coming soon.
        </div>
      );
    }

    if (activeSection === "Standings") {
      return (
        <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-slate-300">
          {activeSport} standings coming soon.
        </div>
      );
    }

    return (
      <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-slate-300">
        {activeSport} teams coming soon.
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      <div className="flex flex-wrap gap-2">
        {sports.map((s) => (
          <button
            key={s}
            onClick={() => setActiveSport(s)}
            className={clsx(
              "rounded-full border px-3 py-1 text-sm transition",
              activeSport === s
                ? "border-[#F26A3D]/50 bg-[#F26A3D]/20 text-orange-100"
                : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-3">
          <span className="rounded-full border border-[#F26A3D]/40 bg-[#F26A3D]/15 px-2 py-0.5 text-xs text-orange-100">
            {info.league}
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <div className="space-y-2 lg:col-span-3">
            {sections.map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className={clsx(
                  "w-full rounded-lg px-3 py-2 text-left text-sm transition",
                  activeSection === item
                    ? "bg-[#F26A3D] text-white"
                    : "bg-white/5 text-slate-200 hover:bg-white/10"
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="lg:col-span-9">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
