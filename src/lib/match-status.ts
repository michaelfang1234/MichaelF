export type MatchStatus = "UPCOMING" | "TODAY" | "LIVE" | "FINAL" | "FINISHED";

export function computeDisplayStatus(matchDateLabel?: string | null, currentStatus?: string | null): MatchStatus {
  const forced = (currentStatus || "").toUpperCase();

  if (forced === "LIVE") return "LIVE";
  if (forced === "FINAL") return "FINAL";
  if (forced === "FINISHED") return "FINISHED";
  if (forced === "TODAY") return "TODAY";

  if (!matchDateLabel) return "UPCOMING";

  const monthMap: Record<string, string> = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  const parts = String(matchDateLabel).trim().split(/\s+/);
  if (parts.length < 2) return "UPCOMING";

  const monthName = parts[0];
  const day = parts[1].replace(",", "").padStart(2, "0");
  const month = monthMap[monthName];

  if (!month) return "UPCOMING";

  const now = new Date();
  const year = now.getFullYear();
  const todayStr = `${year}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const matchStr = `${year}-${month}-${day}`;

  if (matchStr === todayStr) return "TODAY";
  if (matchStr < todayStr) return "FINISHED";
  return "UPCOMING";
}

export function toSortableDate(matchDateLabel?: string | null, timeLabel?: string | null) {
  if (!matchDateLabel) return new Date("2999-12-31T23:59:59");

  const monthMap: Record<string, string> = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  const parts = String(matchDateLabel).trim().split(/\s+/);
  if (parts.length < 2) return new Date("2999-12-31T23:59:59");

  const monthName = parts[0];
  const day = parts[1].replace(",", "").padStart(2, "0");
  const month = monthMap[monthName];
  if (!month) return new Date("2999-12-31T23:59:59");

  const year = new Date().getFullYear();

  let hh = "17";
  let mm = "00";

  if (timeLabel) {
    const m = String(timeLabel).match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (m) {
      let hour = Number(m[1]);
      const minute = m[2];
      const ampm = m[3].toUpperCase();

      if (ampm === "PM" && hour !== 12) hour += 12;
      if (ampm === "AM" && hour === 12) hour = 0;

      hh = String(hour).padStart(2, "0");
      mm = minute;
    }
  }

  return new Date(`${year}-${month}-${day}T${hh}:${mm}:00`);
}

/* backward compatibility for old imports */
export function toDate(match: {
  dateLabel?: string | null;
  timeLabel?: string | null;
}) {
  return toSortableDate(match?.dateLabel, match?.timeLabel);
}
