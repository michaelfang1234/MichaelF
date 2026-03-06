import { NextResponse } from "next/server";
import { LIVE_DATA } from "@/data/live";
import { MATCHES } from "@/data/matches";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const base = MATCHES.find((m) => m.id === id);
  if (!base) return NextResponse.json({ error: "match not found" }, { status: 404 });

  const live = LIVE_DATA[id] ?? {
    id,
    sport: base.sport,
    status: "PRE",
    periodLabel: "Not started",
    clock: "--:--",
    home: base.home,
    away: base.away,
    homeScore: 0,
    awayScore: 0,
    updatedAt: new Date().toISOString(),
    events: [],
    homePlayers: [],
    awayPlayers: [],
  };

  return NextResponse.json(live, { status: 200 });
}
