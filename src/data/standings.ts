export type StandingRow = {
  team: string;
  group: string; // e.g. U15 Boys / U15 Girls / U19 Girls
  played: number;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
};

export const volleyballStandings: StandingRow[] = [
  { team: "Hiba Lions", group: "U19 Girls", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
  { team: "NACIS",      group: "U19 Girls", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
  { team: "KCIS",       group: "U19 Girls", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
  { team: "PingHe",     group: "U19 Girls", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
  { team: "QDHS",       group: "U19 Girls", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
  { team: "WCIS",       group: "U19 Girls", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
  { team: "UCS",        group: "U19 Girls", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
  { team: "SUIS QP*",   group: "U19 Girls", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
];

export const basketballStandings: StandingRow[] = [
  // U15 Boys
  { team: "Hiba Lions", group: "U15 Boys", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
  { team: "SUIS HQ",    group: "U15 Boys", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
  { team: "KCIS",       group: "U15 Boys", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
  { team: "SUIS GB",    group: "U15 Boys", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
  { team: "Pao",        group: "U15 Boys", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
  { team: "SCL",        group: "U15 Boys", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
  { team: "SHSID",      group: "U15 Boys", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },

  // U15 Girls
  { team: "Hiba Lions", group: "U15 Girls", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
  { team: "SHSID",      group: "U15 Girls", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
  { team: "SUIS HQ",    group: "U15 Girls", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
  { team: "SUIS GB",    group: "U15 Girls", played: 0, wins: 0, losses: 0, pointsFor: 0, pointsAgainst: 0 },
];
