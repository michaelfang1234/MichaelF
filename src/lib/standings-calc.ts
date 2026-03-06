import { MATCHES } from "@/data/matches";
import { LIVE_DATA } from "@/data/live";
import { toDate } from "@/lib/match-status";

type Row = {
  team: string;
  group: string;
  played: number;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
};

function ensure(map: Map<string, Row>, team: string, group: string) {
  const k = `${group}__${team}`;
  if (!map.has(k)) {
    map.set(k, { team, group, played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 });
  }
  return map.get(k)!;
}

export function buildBasketballStandings() {
  const rows = new Map<string, Row>();

  const basketballMatches = MATCHES.filter((m) => m.sport === "Basketball");
  for (const m of basketballMatches) {
    const group = m.group.includes("Girls") ? "U15 Girls" : "U15 Boys";
    ensure(rows, m.home, group);
    ensure(rows, m.away, group);
  }

  for (const m of basketballMatches) {
    const live = LIVE_DATA[m.id];
    if (!live || live.status !== "FINAL") continue; // only finalized

    const group = m.group.includes("Girls") ? "U15 Girls" : "U15 Boys";
    const home = ensure(rows, m.home, group);
    const away = ensure(rows, m.away, group);

    home.played += 1;
    away.played += 1;

    home.pointsFor += live.homeScore;
    home.pointsAgainst += live.awayScore;
    away.pointsFor += live.awayScore;
    away.pointsAgainst += live.homeScore;

    if (live.homeScore > live.awayScore) {
      home.wins += 1; away.losses += 1;
    } else if (live.awayScore > live.homeScore) {
      away.wins += 1; home.losses += 1;
    }
  }

  return Array.from(rows.values()).sort((a,b) => b.wins - a.wins || (b.pointsFor - b.pointsAgainst) - (a.pointsFor - a.pointsAgainst));
}

export function buildVolleyballStandings() {
  const rows = new Map<string, Row>();
  const volleyballMatches = MATCHES.filter((m) => m.sport === "Volleyball");

  for (const m of volleyballMatches) {
    ensure(rows, m.home, "U19 Girls");
    ensure(rows, m.away, "U19 Girls");
  }

  for (const m of volleyballMatches) {
    const live = LIVE_DATA[m.id];
    if (!live || live.status !== "FINAL") continue;

    const home = ensure(rows, m.home, "U19 Girls");
    const away = ensure(rows, m.away, "U19 Girls");

    home.played += 1;
    away.played += 1;

    home.pointsFor += live.homeScore;
    home.pointsAgainst += live.awayScore;
    away.pointsFor += live.awayScore;
    away.pointsAgainst += live.homeScore;

    if (live.homeScore > live.awayScore) {
      home.wins += 1; away.losses += 1;
    } else if (live.awayScore > live.homeScore) {
      away.wins += 1; home.losses += 1;
    }
  }

  return Array.from(rows.values()).sort((a,b) => b.wins - a.wins || (b.pointsFor - b.pointsAgainst) - (a.pointsFor - a.pointsAgainst));
}

