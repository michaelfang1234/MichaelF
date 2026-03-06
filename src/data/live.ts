import type { Sport } from "@/data/matches";

export type LiveEvent = {
  t: string;
  team: string;
  text: string;
  type: "score" | "timeout" | "foul" | "substitution" | "serve" | "block";
};

export type LivePlayer = {
  name: string;
  number: string;
  stats: Record<string, string | number>;
};

export type LiveMatch = {
  id: string;
  sport: Sport;
  status: "PRE" | "LIVE" | "FINAL";
  periodLabel: string;   // Q1/Q2/Set 1...
  clock: string;         // 06:21
  home: string;
  away: string;
  homeScore: number;
  awayScore: number;
  updatedAt: string;
  events: LiveEvent[];
  homePlayers: LivePlayer[];
  awayPlayers: LivePlayer[];
};

export const LIVE_DATA: Record<string, LiveMatch> = {
  "bb-b-1": {
    id: "bb-b-1",
    sport: "Basketball",
    status: "LIVE",
    periodLabel: "Q3",
    clock: "06:21",
    home: "Hiba Lions",
    away: "SUIS HQ",
    homeScore: 41,
    awayScore: 37,
    updatedAt: new Date().toISOString(),
    events: [
      { t: "06:21", team: "Hiba Lions", text: "Michael Fang 2PT jump shot made", type: "score" },
      { t: "06:45", team: "SUIS HQ", text: "Timeout", type: "timeout" },
      { t: "07:12", team: "Hiba Lions", text: "Andy Gu defensive rebound", type: "score" },
    ],
    homePlayers: [
      { name: "Michael Fang", number: "7", stats: { PTS: 14, REB: 6, AST: 4, "FG%": "46%" } },
      { name: "Andy Gu", number: "11", stats: { PTS: 9, REB: 8, AST: 2, "FG%": "41%" } },
    ],
    awayPlayers: [
      { name: "Liam Chen", number: "10", stats: { PTS: 12, REB: 4, AST: 3, "FG%": "44%" } },
      { name: "Ryan Yu", number: "23", stats: { PTS: 8, REB: 5, AST: 1, "FG%": "38%" } },
    ],
  },

  "vb-1": {
    id: "vb-1",
    sport: "Volleyball",
    status: "LIVE",
    periodLabel: "Set 2",
    clock: "18-16",
    home: "Hiba Lions",
    away: "NACIS",
    homeScore: 1,
    awayScore: 0,
    updatedAt: new Date().toISOString(),
    events: [
      { t: "Set2 18-16", team: "Hiba Lions", text: "Ariel Pan kill from left side", type: "score" },
      { t: "Set2 17-16", team: "NACIS", text: "Service ace", type: "serve" },
      { t: "Set2 17-15", team: "Hiba Lions", text: "Michelle Xu block point", type: "block" },
    ],
    homePlayers: [
      { name: "Ariel Pan", number: "5", stats: { Kills: 8, Blocks: 2, Aces: 1, Digs: 6 } },
      { name: "Michelle Xu", number: "9", stats: { Kills: 5, Blocks: 3, Aces: 0, Digs: 7 } },
    ],
    awayPlayers: [
      { name: "NACIS #2", number: "2", stats: { Kills: 7, Blocks: 1, Aces: 2, Digs: 5 } },
      { name: "NACIS #11", number: "11", stats: { Kills: 4, Blocks: 2, Aces: 1, Digs: 8 } },
    ],
  },
};
