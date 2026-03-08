export type ThemePreset = "midnight" | "ocean" | "forest" | "sunset";

export const themeClassByPreset: Record<ThemePreset, string> = {
  midnight: "theme-midnight",
  ocean: "theme-ocean",
  forest: "theme-forest",
  sunset: "theme-sunset",
};
