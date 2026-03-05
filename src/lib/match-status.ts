import type { MatchItem, MatchStatus } from "@/data/matches";

const monthMap: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

function parseDateLabelToLocalDate(dateLabel: string): Date {
  const [monthRaw, dayRaw] = dateLabel.trim().split(/\s+/);
  const month = monthMap[(monthRaw || "").toLowerCase()];
  const day = Number(dayRaw);
  const year = new Date().getFullYear();
  return new Date(year, month, day, 0, 0, 0, 0);
}

export function getMatchStatus(match: MatchItem): MatchStatus {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);

  const matchDate = parseDateLabelToLocalDate(match.dateLabel);

  if (matchDate.getTime() < todayStart.getTime()) return "FINISHED";
  if (matchDate.getTime() === todayStart.getTime()) return "TODAY";
  return "UPCOMING";
}
