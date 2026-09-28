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
    line: "Where ROOTS began: a Telugu family's home in America, and the album that holds four generations.",
    journeys: ["Telugu family life", "Sankranti and the harvest year", "Village, market and kitchen", "Folk stories under the banyan"],
    a: "#d9a441",
    b: "#9a4a2a",
  },
  {
    id: "spanish",
    native: "Español",
    name: "Spanish",
    status: "available",
    font: "var(--font-display)",
    line: "A Mexican-American family's Día de Muertos. One Spanish-speaking world of many still to come.",
    journeys: ["Mexican family experiences", "Mexican-American life across two homes", "Latin American traditions", "Other Spanish-speaking family stories"],
    a: "#c8503f",
    b: "#1f6b4f",
  },
  {
    id: "chinese",
    native: "中文",
    name: "Chinese",
    status: "available",
    font: "var(--font-sc)",
    line: "Lunar New Year's Eve in Mandarin. Built to hold regional worlds, not one flattened picture.",
    journeys: ["Family and the table", "Festivals and the lunar year", "Regional stories and dialects", "Everyday life across generations"],
    a: "#b8452f",
    b: "#d9a441",
  },
  {
    id: "hindi",
    native: "हिन्दी",
    name: "Hindi",
    status: "available",
    font: "var(--font-devanagari)",
    line: "Dadi's summer visit from Lucknow — with room for every region's differences.",
    journeys: ["Family conversations", "Food and festivals", "Music and stories", "Regional traditions"],
    a: "#e07a2f",
    b: "#1f4d33",
  },
  {
    id: "arabic",
    native: "العربية",
    name: "Arabic",
    status: "available",
    font: "var(--font-arabic)",
    dir: "rtl",
    line: "Sunday lunch in Levantine Arabic. Other Arabic-speaking regions will each be their own world.",
    journeys: ["Family and hospitality", "Food and celebration", "Stories and poetry", "Regional customs and everyday language"],
    a: "#3f7d55",
    b: "#c8704a",
  },
];
