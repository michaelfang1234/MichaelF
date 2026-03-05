"use client";

import { useState } from "react";
import clsx from "clsx";

type SportKey = "Football" | "Basketball" | "Volleyball" | "Swimming";

const sports: SportKey[] = ["Football", "Basketball", "Volleyball", "Swimming"];
const sections = ["Home", "Scores", "Schedule", "Standings", "Teams"];

const sportData: Record<SportKey, { league: string; groups: string[]; ages: string[] }> = {
  Football: {
    league: "SSSA Football League",
    groups: ["Boys", "Girls"],
    ages: ["U19", "U15", "U13"],
  },
  Basketball: {
    league: "SSSA Basketball Men's League",
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

export default function SportsBar() {
  const [activeSport, setActiveSport] = useState<SportKey>("Football");
  const [activeSection, setActiveSection] = useState("Home");
  const info = sportData[activeSport];

  return (
    <div className="mt-4 space-y-3">
      <div className="flex flex-wrap gap-2">
        {sports.map((s) => (
          <button
            key={s}
            onClick={() => {
              setActiveSport(s);
              setActiveSection("Home");
            }}
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
        <div className="mb-3 text-sm text-slate-300">
          <span className="rounded-full border border-[#F26A3D]/40 bg-[#F26A3D]/15 px-2 py-0.5 text-xs text-orange-100">
            {info.league}
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-3 space-y-2">
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

          <div className="lg:col-span-9 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <h3 className="mb-2 text-sm font-semibold text-slate-200">Groups</h3>
              <ul className="space-y-1 text-sm text-slate-300">
                {info.groups.map((g) => <li key={g}>{g}</li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <h3 className="mb-2 text-sm font-semibold text-slate-200">Age Divisions</h3>
              <ul className="space-y-1 text-sm text-slate-300">
                {info.ages.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
