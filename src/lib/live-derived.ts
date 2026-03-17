export type LiveMatchRow = {
  id: string;
  sport: string;
  group_name: string;
  date_label: string;
  time_label: string;
  home: string;
  away: string;
  venue_type: string;
  status: string;
  home_sets: number;
  away_sets: number;
  clock_text: string;
  current_set?: string;
  show_in_recent?: boolean;
};

export type DerivedStandingRow = {
  team: string;
  wins: number;
  losses: number;
  setsWon: number;
  setsLost: number;
  setDiff: number;
};

export function buildStandingsFromFinishedMatches(matches: LiveMatchRow[]): DerivedStandingRow[] {
  const table = new Map<string, DerivedStandingRow>();

  function ensure(team: string) {
    if (!table.has(team)) {
      table.set(team, {
        team,
        wins: 0,
        losses: 0,
        setsWon: 0,
        setsLost: 0,
        setDiff: 0,
      });
    }
    return table.get(team)!;
  }

  for (const match of matches) {
    if ((match.status || "").toUpperCase() !== "FINISHED") continue;

    const home = ensure(match.home);
    const away = ensure(match.away);

    home.setsWon += Number(match.home_sets || 0);
    home.setsLost += Number(match.away_sets || 0);

    away.setsWon += Number(match.away_sets || 0);
    away.setsLost += Number(match.home_sets || 0);

    if ((match.home_sets || 0) > (match.away_sets || 0)) {
      home.wins += 1;
      away.losses += 1;
    } else if ((match.away_sets || 0) > (match.home_sets || 0)) {
      away.wins += 1;
      home.losses += 1;
    }
  }

  return Array.from(table.values())
    .map((row) => ({
      ...row,
      setDiff: row.setsWon - row.setsLost,
    }))
    .sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      if (b.setDiff !== a.setDiff) return b.setDiff - a.setDiff;
      return b.setsWon - a.setsWon;
    });
}

export function visibleRecentMatches(matches: LiveMatchRow[]) {
  return matches
    .filter((m) => (m.show_in_recent ?? true) === true)
    .filter((m) => (m.status || "").toUpperCase() !== "FINISHED");
}
