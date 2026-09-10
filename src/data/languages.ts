export type LanguageStatus = "available" | "soon";

export type Language = {
  id: string;
  /** name in its own script */
  native: string;
  name: string;
  status: LanguageStatus;
  /** CSS font stack for the native name */
  font: string;
  /** direction of the native script */
  dir?: "rtl";
  /** one line about the world, not the grammar */
  line: string;
  /** cultural journeys the platform is designed to hold — plural on purpose */
  journeys: string[];
  /** palette accents for the card */
  a: string;
  b: string;
};

export const LANGUAGES: Language[] = [
  {
    id: "telugu",
    native: "తెలుగు",
    name: "Telugu",
    status: "available",
    font: "var(--font-telugu)",
    line: "The first ROOTS journey. Chapter One is playable now.",
    journeys: ["Telugu family life", "Sankranti and the harvest year", "Village, market and kitchen", "Folk stories under the banyan"],
    a: "#d9a441",
    b: "#9a4a2a",
  },
  {
    id: "spanish",
    native: "Español",
    name: "Spanish",
    status: "soon",
    font: "var(--font-display)",
    line: "One language, many homes. Each journey will be its own.",
    journeys: ["Mexican family experiences", "Mexican-American life across two homes", "Latin American traditions", "Other Spanish-speaking family stories"],
    a: "#c8503f",
    b: "#1f6b4f",
  },
  {
    id: "chinese",
    native: "中文",
    name: "Chinese",
    status: "soon",
    font: "var(--font-sc)",
    line: "Built to hold regional worlds, not one flattened picture.",
    journeys: ["Family and the table", "Festivals and the lunar year", "Regional stories and dialects", "Everyday life across generations"],
    a: "#b8452f",
    b: "#d9a441",
  },
  {
    id: "hindi",
    native: "हिन्दी",
    name: "Hindi",
    status: "soon",
    font: "var(--font-devanagari)",
    line: "A doorway to Hindi-speaking families, with room for their differences.",
    journeys: ["Family conversations", "Food and festivals", "Music and stories", "Regional traditions"],
    a: "#e07a2f",
    b: "#1f4d33",
  },
  {
    id: "arabic",
    native: "العربية",
    name: "Arabic",
    status: "soon",
    font: "var(--font-arabic)",
    dir: "rtl",
    line: "Designed so different Arabic-speaking regions can each be themselves.",
    journeys: ["Family and hospitality", "Food and celebration", "Stories and poetry", "Regional customs and everyday language"],
    a: "#3f7d55",
    b: "#c8704a",
  },
];
