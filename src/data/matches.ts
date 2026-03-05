export type Sport = "Volleyball" | "Basketball";
export type VenueType = "Home" | "Away";
export type MatchStatus = "UPCOMING" | "TODAY" | "FINISHED";

export type MatchItem = {
  id: string;
  sport: Sport;
  group: string;
  dateLabel: string; // e.g. "March 18"
  timeLabel: string; // e.g. "5:00 PM"
  home: string;
  away: string;
  venueType: VenueType;
};

export const MATCHES: MatchItem[] = [
  // Volleyball U19 Girls
  { id: "vb-1", sport: "Volleyball", group: "U19 Girls SSSA", dateLabel: "March 17", timeLabel: "5:00 PM", home: "Hiba Lions", away: "NACIS", venueType: "Home" },
  { id: "vb-2", sport: "Volleyball", group: "U19 Girls SSSA", dateLabel: "March 25", timeLabel: "5:15 PM", home: "Hiba Lions", away: "KCIS", venueType: "Home" },
  { id: "vb-3", sport: "Volleyball", group: "U19 Girls SSSA", dateLabel: "April 1",  timeLabel: "5:00 PM", home: "PingHe", away: "Hiba Lions", venueType: "Away" },
  { id: "vb-4", sport: "Volleyball", group: "U19 Girls SSSA", dateLabel: "April 7",  timeLabel: "5:00 PM", home: "Hiba Lions", away: "QDHS", venueType: "Home" },
  { id: "vb-5", sport: "Volleyball", group: "U19 Girls SSSA", dateLabel: "April 17", timeLabel: "5:00 PM", home: "WCIS", away: "Hiba Lions", venueType: "Away" },
  { id: "vb-6", sport: "Volleyball", group: "U19 Girls SSSA", dateLabel: "April 22", timeLabel: "5:00 PM", home: "Hiba Lions", away: "UCS", venueType: "Home" },
  { id: "vb-7", sport: "Volleyball", group: "U19 Girls SSSA", dateLabel: "April 28", timeLabel: "5:00 PM", home: "SUIS QP*", away: "Hiba Lions", venueType: "Away" },

  // Basketball U15 Boys
  { id: "bb-b-1", sport: "Basketball", group: "U15 Boys SSSA", dateLabel: "March 18", timeLabel: "5:00 PM",  home: "Hiba Lions", away: "SUIS HQ", venueType: "Home" },
  { id: "bb-b-2", sport: "Basketball", group: "U15 Boys SSSA", dateLabel: "March 25", timeLabel: "5:15 PM",  home: "Hiba Lions", away: "KCIS",    venueType: "Home" },
  { id: "bb-b-3", sport: "Basketball", group: "U15 Boys SSSA", dateLabel: "April 1",  timeLabel: "5:00 PM",  home: "Hiba Lions", away: "SUIS GB", venueType: "Home" },
  { id: "bb-b-4", sport: "Basketball", group: "U15 Boys SSSA", dateLabel: "April 15", timeLabel: "5:00 PM",  home: "Hiba Lions", away: "Pao",     venueType: "Home" },
  { id: "bb-b-5", sport: "Basketball", group: "U15 Boys SSSA", dateLabel: "April 22", timeLabel: "5:00 PM",  home: "Hiba Lions", away: "SCL",     venueType: "Home" },
  { id: "bb-b-6", sport: "Basketball", group: "U15 Boys SSSA", dateLabel: "April 29", timeLabel: "5:00 PM",  home: "Hiba Lions", away: "SHSID",   venueType: "Home" },

  // Basketball U15 Girls
  { id: "bb-g-1", sport: "Basketball", group: "U15 Girls SSSA", dateLabel: "March 11", timeLabel: "5:00 PM", home: "SHSID",    away: "Hiba Lions", venueType: "Away" },
  { id: "bb-g-2", sport: "Basketball", group: "U15 Girls SSSA", dateLabel: "March 18", timeLabel: "5:00 PM", home: "Hiba Lions", away: "SUIS HQ",  venueType: "Home" },
  { id: "bb-g-3", sport: "Basketball", group: "U15 Girls SSSA", dateLabel: "April 1",  timeLabel: "5:00 PM", home: "Hiba Lions", away: "SUIS GB",  venueType: "Home" },
  { id: "bb-g-4", sport: "Basketball", group: "U15 Girls SSSA", dateLabel: "April 7",  timeLabel: "5:00 PM", home: "SUIS GB",  away: "Hiba Lions", venueType: "Away" },
  { id: "bb-g-5", sport: "Basketball", group: "U15 Girls SSSA", dateLabel: "April 15", timeLabel: "5:00 PM", home: "SUIS HQ",  away: "Hiba Lions", venueType: "Away" },
  { id: "bb-g-6", sport: "Basketball", group: "U15 Girls SSSA", dateLabel: "April 29", timeLabel: "5:00 PM", home: "Hiba Lions", away: "SHSID",   venueType: "Home" },
];
