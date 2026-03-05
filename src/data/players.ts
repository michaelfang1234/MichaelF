export type Player = {
  slug: string;
  name: string;
  sport: "Basketball" | "Volleyball";
  team: string;
  ageGroup: "U19";
  genderGroup: "Boys" | "Girls";
  heightCm: number;
  weightKg: number;
  position: string;
  status: "Active";
};

export const players: Player[] = [
  {
    slug: "michael-fang",
    name: "Michael Fang",
    sport: "Basketball",
    team: "Hiba Lions",
    ageGroup: "U19",
    genderGroup: "Boys",
    heightCm: 185,
    weightKg: 69,
    position: "Guard",
    status: "Active",
  },
  {
    slug: "andy-gu",
    name: "Andy Gu",
    sport: "Basketball",
    team: "Hiba Lions",
    ageGroup: "U19",
    genderGroup: "Boys",
    heightCm: 188,
    weightKg: 75,
    position: "Forward",
    status: "Active",
  },
  {
    slug: "ariel-pan",
    name: "Ariel Pan",
    sport: "Volleyball",
    team: "Hiba Lions",
    ageGroup: "U19",
    genderGroup: "Girls",
    heightCm: 171,
    weightKg: 53,
    position: "Outside Hitter",
    status: "Active",
  },
  {
    slug: "michelle-xu",
    name: "Michelle Xu",
    sport: "Volleyball",
    team: "Hiba Lions",
    ageGroup: "U19",
    genderGroup: "Girls",
    heightCm: 170,
    weightKg: 58,
    position: "Setter",
    status: "Active",
  },
];
