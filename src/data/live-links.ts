export type LiveLinkItem = {
  id: string;
  sport: "Football" | "Basketball" | "Volleyball" | "Swimming";
  title: string;
  date: string; // YYYY-MM-DD
  platform: "Douyin" | "Bilibili" | "YouTube" | "Other";
  url: string;
};

export const LIVE_LINKS: LiveLinkItem[] = [
  {
    id: "live-bb-2026-03-06",
    sport: "Basketball",
    title: "U15 Boys SSSA • Hiba Lions vs SUIS HQ",
    date: "2026-03-06",
    platform: "Douyin",
    url: "https://www.douyin.com/",
  },
  {
    id: "live-vb-2026-03-06",
    sport: "Volleyball",
    title: "U19 Girls SSSA • Hiba Lions vs NACIS",
    date: "2026-03-06",
    platform: "Douyin",
    url: "https://www.douyin.com/",
  }
];
