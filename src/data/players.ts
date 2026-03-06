export type PlayerSport = "Football" | "Basketball" | "Volleyball" | "Swimming";

export type PlayerItem = {
  id: string;
  key: string;
  name: string;
  sport: PlayerSport;
  division: string;
  height: number;
  weight: number | null;
};

export const PLAYERS: PlayerItem[] = [
  { id: "michael", key: "michael", name: "Michael Fang", sport: "Basketball", division: "U19 Boys Basketball Team", height: 185, weight: 69 },
  { id: "andy", key: "andy", name: "Andy Gu", sport: "Basketball", division: "U19 Boys Basketball Team", height: 188, weight: 75 },
  { id: "ariel", key: "ariel", name: "Ariel Pan", sport: "Volleyball", division: "U19 Girls Volleyball Team", height: 171, weight: null },
  { id: "michelle", key: "michelle", name: "Michelle Xu", sport: "Volleyball", division: "U19 Girls Volleyball Team", height: 170, weight: null },

  { id: "liam-fb", key: "liam", name: "Liam Zhou", sport: "Football", division: "U15 Boys Football Team", height: 176, weight: 64 },
  { id: "emma-sw", key: "emma", name: "Emma Lin", sport: "Swimming", division: "U15 Swimming Team", height: 165, weight: 52 },
];
