import type { MatchItem, MatchStatus } from "@/data/matches";

const monthMap: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

export function toDate(match: MatchItem): Date {
  const [monthRaw, dayRaw] = match.dateLabel.trim().split(/\s+/);
  const month = monthMap[(monthRaw || "").toLowerCase()];
  const day = Number(dayRaw);
  const [time, ampm] = match.timeLabel.split(" ");
  const [hh, mm] = time.split(":").map(Number);
  let hour = hh % 12;
  if ((ampm || "").toUpperCase() === "PM") hour += 12;
  const year = new Date().getFullYear();
  return new Date(year, month, day, hour, mm || 0, 0, 0);
}

export function getMatchStatus(match: MatchItem): MatchStatus {
  const now = new Date();
  const start = toDate(match);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 默认2小时
  if (now < start) return "UPCOMING";
  if (now >= start && now <= end) return "TODAY";
  return "FINISHED";
}
