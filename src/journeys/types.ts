import type { ReactNode } from "react";

/**
 * A Language is one culture's world in ROOTS: its family, its words, its six
 * chapters. It's plain data, always loaded — the dashboard, journal and site
 * need it. Each chapter's rooms, art and script live in their own module and
 * load when that chapter is opened (see ChapterContent).
 *
 * The engine, mini-game mechanics and journal are shared platform; everything
 * in a language's files belongs to one culture and is written for it.
 */

export type WordGroup = "family" | "home" | "food";

export type Word = {
  id: string;
  /** in the language's own script */
  native: string;
  /** romanisation; equal to `native` for Latin-script languages */
  roman: string;
  english: string;
  group: WordGroup;
  /** where the player can first meet it */
  where: string;
  /** the chapter that introduces it */
  ch: number;
};

/**
 * Text with light markup:
 *   {{…}}  a span in the language's own script
 *   {name} the player's name
 */
export type Seg = string;

/** gloss is always shown; hint (English) only when the player asks for it */
export type Line = { who: string; text: Seg; gloss?: Seg; hint?: string };

export type Speaker = { name: string; glyph: string; tone?: "elder" | "parent" | "guide" | "you" | "guest" };

export type Script = "latin" | "te" | "zh" | "hi" | "ar" | "bn" | "ur" | "ru";

export type ChapterMeta = {
  n: number;
  name: string;
  native: string;
  subtitle: string;
  synopsis: string;
  /** one line for dashboards: not started / in progress / done */
  homeLines: { start: string; going: string; done: string };
};

export type Language = {
  id: string;
  /** BCP-47 tag for the lang attribute */
  lang: string;
  /** BCP-47 prefix for the Web Speech API voice */
  speech: string;
  language: string;
  native: string;
  /** whose family this is — kept specific on purpose */
  family: string;
  /** e.g. "Mandarin, simplified characters" */
  variety: string;
  script: Script;
  dir?: "rtl";
  romanize: boolean;
  /** one line for the language card */
  line: string;
  /** cultural journeys this language is built to hold later — plural on purpose */
  journeys: string[];
  /** card colours */
  a: string;
  b: string;
  /** Ethnologue rank by total speakers, if in the top ten */
  rank?: number;
  speakers: Record<string, Speaker>;
  words: Word[];
  cultureNotes: Record<string, { title: string; native?: string; note: string }>;
  memoryNotes: Record<string, { title: string; note: string }>;
  chapters: ChapterMeta[];
  /** a moment from the journey, for the world page */
  highlight: { native: string; roman: string; english: string; context: string };
};

/* ---------------- rooms ---------------- */

export type Hotspot = {
  id: string;
  /** x on the floor the player walks to, and the anchor for the prompt (0–1600) */
  x: number;
  /** anchor y for the prompt ring (0–900) */
  y: number;
  label: string;
  kind: "word" | "exit" | "npc" | "quest" | "flavor";
  wordId?: string;
  to?: string;
  /** flavour text for non-word objects */
  note?: string;
  /** culture-journal entry this object unlocks */
  culture?: string;
  /** only present once this beat is done / until this beat is done */
  after?: string;
  before?: string;
};

export type RoomDef = {
  id: string;
  name: string;
  native: string;
  /** static art, or art that changes as the chapter progresses */
  art: ReactNode | ((done: ReadonlySet<string>) => ReactNode);
  hotspots: Hotspot[];
  /** spawn x when entering from the left / right */
  spawn: { left: number; right: number };
};

/* ---------------- mini-games ---------------- */

export type PlaceItem = { wordId: string; who: string; hint: string; art: ReactNode; tint: string };
export type FetchAsk = { wordId: string; native: string; roman: string; english: string };
export type FetchItem = { wordId: string; label: string; art: ReactNode };
export type Choice = { native: string; roman: string; english: string; right?: boolean; reply?: Line[] };
export type Question = { native: string; roman: string; english: string; choices: Choice[] };
export type StoryPanel = { art: ReactNode; text: Seg };
export type Said = { native: string; roman: string; english: string };
export type CountRound = Said & { answer: number; wordId?: string };
export type Step = Said & { wordId?: string; art: ReactNode };

export type GameSpec =
  | { type: "place"; kicker: string; title: string; hint: string; tray: string; done: string; items: PlaceItem[]; board?: "album" | "table" | "altar" | "case" }
  | { type: "memory"; kicker: string; title: string; hint: string }
  | { type: "fetch"; kicker: string; title: string; hint: string; npc: string; asks: FetchAsk[]; items: FetchItem[]; done: Said }
  | { type: "story"; kicker: string; title: string; native: string; teller: string; panels: StoryPanel[]; question: Question }
  /** a vendor names a price or a quantity; the player counts it out */
  | { type: "count"; kicker: string; title: string; hint: string; npc: string; unit: string; coin: ReactNode; rounds: CountRound[]; done: Said }
  /** put steps in order: a recipe, a ritual, a set of directions */
  | { type: "sequence"; kicker: string; title: string; hint: string; steps: Step[]; done: string };

/* ---------------- chapter script ---------------- */

export type Beat = {
  id: string;
  quest: { v: string; hint: string; hintIn?: Record<string, string> };
  /** interacting with this hotspot runs the beat */
  at: { room: string; hotspot: string };
  lines?: Line[];
  /** words met the moment the beat runs */
  encounter?: string[];
  game?: GameSpec;
  after?: Line[];
  culture?: string[];
  memory?: string;
  /** what other npcs/quest spots say while this is the current beat */
  nudges?: Record<string, Line[]>;
};

export type Ending = {
  at?: { room: string; hotspot: string };
  /** run straight after the last beat instead of waiting to be triggered */
  auto?: boolean;
  quest: { v: string; hint: string };
  lines: Line[];
  asker: string;
  question: Question;
  /** said after the right answer, before Chapter Complete */
  right: Line[];
  encounter?: string[];
  memory: string;
};

export type ChapterScript = {
  intro: { kicker: string; title: string; em: string; text: string };
  introLines: Line[];
  beats: Beat[];
  ending: Ending;
  gates?: { room: string; hotspot: string; until: string; line: Line }[];
  /** fallbacks keyed "room:hotspot" */
  idle?: Record<string, Line[]>;
  /** said by npcs after the chapter is complete */
  afterwards?: Record<string, Line[]>;
  complete: { title: string; em: string; text: string; quest: { v: string; hint: string } };
};

/** One chapter's playable content — its own lazily loaded module. */
export type ChapterContent = {
  rooms: Record<string, RoomDef>;
  startRoom: string;
  /** chapter-only characters (a vendor, a cousin) on top of the language's */
  speakers?: Record<string, Speaker>;
  script: ChapterScript;
  preview: ReactNode;
};

export const roomArt = (room: RoomDef, done: ReadonlySet<string> = new Set()) =>
  typeof room.art === "function" ? room.art(done) : room.art;
