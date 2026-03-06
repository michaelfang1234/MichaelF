"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { volleyballStandings, basketballStandings } from "@/data/standings";

type SportKey = "Football" | "Basketball" | "Volleyball" | "Swimming";
type SectionKey = "Home" | "Matches" | "Standings" | "Teams" | "Players";
type BFilter = "All" | "U15 Boys" | "U15 Girls";

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
  const [bFilter, setBFilter] = useState<BFilter>("All");

  const filteredBasketball = useMemo(() => {
    if (bFilter === "All") return basketballStandings;
    return basketballStandings.filter((r) => r.group === bFilter);
  }, [bFilter]);

  function renderStandings() {
    if (activeSport === "Volleyball") {
      return (
        <TableBlock title="Volleyball Standings (U19 Girls)" rows={volleyballStandings} />
      );
    }

    if (activeSport === "Basketball") {
      return (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {(["All", "U15 Boys", "U15 Girls"] as BFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setBFilter(f)}
                className={clsx(
                  "rounded-full border px-3 py-1 text-xs transition",
                  bFilter === f ? "border-cyan-400/50 bg-cyan-400/20 text-cyan-100" : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <TableBlock title="Basketball Standings" rows={filteredBasketball} />
        </div>
      );
    }

    return (
      <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-slate-300">
        {activeSport} standings coming soon.
      </div>
    );
  }

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
          <p className="mb-3 text-slate-300">{activeSport} matches page</p>
          <Link href={`/matches/sport?name=${activeSport.toLowerCase()}`} className="inline-block rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">
            Open Matches
          </Link>
        </div>
      );
    }

    if (activeSection === "Standings") return renderStandings();

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

function TableBlock({ title, rows }: { title: string; rows: any[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-slate-400">
            <tr className="border-b border-white/10">
              <th className="py-2 text-left">Team</th>
              <th className="py-2 text-left">Group</th>
              <th className="py-2 text-left">P</th>
              <th className="py-2 text-left">W</th>
              <th className="py-2 text-left">L</th>
              <th className="py-2 text-left">PF</th>
              <th className="py-2 text-left">PA</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={`${r.team}-${r.group}-${i}`} className="border-b border-white/5">
                <td className="py-2">{r.team}</td>
                <td className="py-2">{r.group}</td>
                <td className="py-2">{r.played}</td>
                <td className="py-2">{r.wins}</td>
                <td className="py-2">{r.losses}</td>
                <td className="py-2">{r.pointsFor}</td>
                <td className="py-2">{r.pointsAgainst}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
