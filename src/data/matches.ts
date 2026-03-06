export type Sport = "Volleyball" | "Basketball";
export type VenueType = "Home" | "Away";
export type MatchStatus = "UPCOMING" | "TODAY" | "FINISHED";

export type MatchItem = {
  id: string;
  sport: Sport;
  group: string;
  dateLabel: string;
  timeLabel: string;
  home: string;
  away: string;
  venueType: VenueType;
};

export const MATCHES: MatchItem[] = [
  { id: "vb-1", sport: "Volleyball", group: "U19 Girls SSSA", dateLabel: "March 17", timeLabel: "5:00 PM", home: "Hiba Lions", away: "NACIS", venueType: "Home" },
  { id: "vb-2", sport: "Volleyball", group: "U19 Girls SSSA", dateLabel: "March 25", timeLabel: "5:15 PM", home: "Hiba Lions", away: "KCIS", venueType: "Home" },
  { id: "vb-3", sport: "Volleyball", group: "U19 Girls SSSA", dateLabel: "April 1",  timeLabel: "5:00 PM", home: "PingHe", away: "Hiba Lions", venueType: "Away" },

  { id: "bb-b-1", sport: "Basketball", group: "U15 Boys SSSA", dateLabel: "March 18", timeLabel: "5:00 PM", home: "Hiba Lions", away: "SUIS HQ", venueType: "Home" },
  { id: "bb-b-2", sport: "Basketball", group: "U15 Boys SSSA", dateLabel: "March 25", timeLabel: "5:15 PM", home: "Hiba Lions", away: "KCIS", venueType: "Home" },

  { id: "bb-g-1", sport: "Basketball", group: "U15 Girls SSSA", dateLabel: "March 11", timeLabel: "5:00 PM", home: "SHSID", away: "Hiba Lions", venueType: "Away" },
];
