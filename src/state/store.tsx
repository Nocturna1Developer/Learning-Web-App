import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { LANGUAGES, ORDER, isPlayable } from "../journeys";
import type { Language } from "../journeys/types";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type Plan = "monthly" | "yearly";

export type Session = {
  user: string | null;
  plan: Plan | null;
};

/** Progress through one chapter. */
export type ChapterProgress = {
  scene: string;
  /** completed story beats, plus "intro" and "complete" */
  done: string[];
  /** number of beats in the chapter, recorded when it's first opened */
  total: number;
};

/** Progress in one language. Words, culture and memories carry across its chapters. */
export type LangProgress = {
  /** word id -> number of times encountered, in any chapter */
  encounters: Record<string, number>;
  culture: string[];
  memories: string[];
  bestCombo: number;
  chapters: Record<string, ChapterProgress>;
};

export type Progress = {
  playerName: string;
  /** the language the dashboard is showing */
  active: string;
  journeys: Record<string, LangProgress>;
};

type State = { session: Session; progress: Progress };

type J = { j: string };
type JN = J & { n: number };
type Action =
  | { type: "login"; user: string }
  | { type: "logout" }
  | { type: "subscribe"; plan: Plan }
  | { type: "rename"; name: string }
  | ({ type: "activate" } & J)
  | ({ type: "encounter"; wordId: string } & J)
  | ({ type: "culture"; item: string } & J)
  | ({ type: "memory"; item: string } & J)
  | ({ type: "combo"; combo: number } & J)
  | ({ type: "scene"; scene: string } & JN)
  | ({ type: "done"; beat: string } & JN)
  | ({ type: "total"; total: number; start: string } & JN)
  | ({ type: "restart" } & JN)
  | ({ type: "reset" } & J);

/* ------------------------------------------------------------------ */
/* Defaults + persistence                                              */
/* ------------------------------------------------------------------ */

const SESSION_KEY = "roots.session.v1";
const PROGRESS_KEY = "roots.progress.v3";

export const freshLang = (): LangProgress => ({ encounters: {}, culture: [], memories: [], bestCombo: 0, chapters: {} });
const freshProgress = (): Progress => ({ playerName: "Maya", active: "telugu", journeys: {} });

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage may be unavailable — progress just won't persist */
  }
}

/* ---- migrations: v1 (Telugu only) → v2 (one chapter per language) → v3 ---- */

type V1 = { playerName?: string; encounters?: Record<string, number>; scene?: string; flags?: Record<string, boolean>; culture?: string[]; memories?: string[]; bestCombo?: number };
type V2Journey = { encounters: Record<string, number>; scene: string; done: string[]; culture: string[]; memories: string[]; bestCombo: number };
type V2 = { playerName: string; active: string; journeys: Record<string, V2Journey> };

/** Beat counts of the Chapter Ones that existed in v2 saves. */
const V2_TOTALS: Record<string, number> = { telugu: 3, spanish: 5, chinese: 4, hindi: 6, arabic: 4 };

function v1to2(old: V1): V2 {
  const f = old.flags ?? {};
  const map: [string, string][] = [["intro", "intro"], ["albumDone", "album"], ["memoryDone", "memory"], ["kitchenDone", "kitchen"], ["chapterComplete", "complete"]];
  return {
    playerName: old.playerName ?? "Maya",
    active: "telugu",
    journeys: {
      telugu: {
        encounters: old.encounters ?? {},
        scene: old.scene ?? "bedroom",
        done: map.filter(([k]) => f[k]).map(([, v]) => v),
        culture: old.culture ?? [],
        memories: old.memories ?? [],
        bestCombo: old.bestCombo ?? 0,
      },
    },
  };
}

function v2to3(old: V2): Progress {
  const journeys: Record<string, LangProgress> = {};
  for (const [id, j] of Object.entries(old.journeys ?? {})) {
    journeys[id] = {
      encounters: j.encounters ?? {},
      culture: j.culture ?? [],
      memories: j.memories ?? [],
      bestCombo: j.bestCombo ?? 0,
      chapters: { "1": { scene: j.scene, done: j.done ?? [], total: V2_TOTALS[id] ?? 4 } },
    };
  }
  return { playerName: old.playerName ?? "Maya", active: old.active ?? "telugu", journeys };
}

function loadProgress(): Progress {
  const v3 = read<Progress>(PROGRESS_KEY);
  if (v3?.journeys) return { ...freshProgress(), ...v3 };
  const v2 = read<V2>("roots.progress.v2");
  if (v2?.journeys) return v2to3(v2);
  const v1 = read<V1>("roots.progress.v1");
  if (v1?.flags) return v2to3(v1to2(v1));
  return freshProgress();
}

function loadSession(): Session {
  return { user: null, plan: null, ...(read<Session>(SESSION_KEY) ?? {}) };
}

/* ------------------------------------------------------------------ */
/* Reducer                                                             */
/* ------------------------------------------------------------------ */

function withLang(state: State, j: string, fn: (lp: LangProgress) => LangProgress): State {
  const lp = state.progress.journeys[j] ?? freshLang();
  return { ...state, progress: { ...state.progress, journeys: { ...state.progress.journeys, [j]: fn(lp) } } };
}

function withChapter(state: State, j: string, n: number, fn: (cp: ChapterProgress) => ChapterProgress): State {
  return withLang(state, j, (lp) => {
    const cp = lp.chapters[n] ?? { scene: "", done: [], total: 0 };
    return { ...lp, chapters: { ...lp.chapters, [n]: fn(cp) } };
  });
}

const addOnce = (arr: string[], item: string) => (arr.includes(item) ? arr : [...arr, item]);

function reducer(state: State, a: Action): State {
  switch (a.type) {
    case "login":
      return { ...state, session: { ...state.session, user: a.user } };
    case "logout":
      return { ...state, session: { ...state.session, user: null } };
    case "subscribe":
      return { ...state, session: { ...state.session, plan: a.plan } };
    case "rename":
      return { ...state, progress: { ...state.progress, playerName: a.name } };
    case "activate":
      return state.progress.active === a.j ? state : { ...state, progress: { ...state.progress, active: a.j } };
    case "encounter":
      return withLang(state, a.j, (lp) => ({ ...lp, encounters: { ...lp.encounters, [a.wordId]: (lp.encounters[a.wordId] ?? 0) + 1 } }));
    case "culture":
      return withLang(state, a.j, (lp) => ({ ...lp, culture: addOnce(lp.culture, a.item) }));
    case "memory":
      return withLang(state, a.j, (lp) => ({ ...lp, memories: addOnce(lp.memories, a.item) }));
    case "combo":
      return withLang(state, a.j, (lp) => ({ ...lp, bestCombo: Math.max(lp.bestCombo, a.combo) }));
    case "scene":
      return withChapter(state, a.j, a.n, (cp) => ({ ...cp, scene: a.scene }));
    case "done":
      return withChapter(state, a.j, a.n, (cp) => ({ ...cp, done: addOnce(cp.done, a.beat) }));
    case "total":
      return withChapter(state, a.j, a.n, (cp) => (cp.total === a.total && cp.scene ? cp : { ...cp, total: a.total, scene: cp.scene || a.start }));
    case "restart":
      return withChapter(state, a.j, a.n, (cp) => ({ ...cp, scene: "", done: [] }));
    case "reset":
      return withLang(state, a.j, () => freshLang());
    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/* Derived values                                                      */
/* ------------------------------------------------------------------ */

/** How much English support a word still needs: 1 = full, 0 = none. */
export function supportFor(encounters: number): number {
  if (encounters <= 1) return 1;
  if (encounters === 2) return 0.66;
  if (encounters === 3) return 0.33;
  return 0;
}

export const isComplete = (lp: LangProgress | undefined, n: number) => !!lp?.chapters[n]?.done.includes("complete");

/** A chapter opens when the one before it is finished — and only if it's been built. */
export const isUnlocked = (l: Language, lp: LangProgress | undefined, n: number) =>
  isPlayable(l.id, n) && (n === 1 || isComplete(lp, n - 1));

export function chapterStats(l: Language, lp: LangProgress | undefined, n: number) {
  const cp = lp?.chapters[n];
  const complete = isComplete(lp, n);
  const started = !!cp?.done.includes("intro");
  const pct = complete ? 100 : cp && cp.total ? Math.round((cp.done.length / (cp.total + 2)) * 100) : 0;
  const words = l.words.filter((w) => w.ch === n);
  const discovered = words.filter((w) => lp?.encounters[w.id]);
  return { pct, started, complete, unlocked: isUnlocked(l, lp, n), playable: isPlayable(l.id, n), words, discovered };
}

export function langStats(l: Language, lp: LangProgress | undefined) {
  const discovered = l.words.filter((w) => lp?.encounters[w.id]).map((w) => w.id);
  const family = l.words.filter((w) => w.group === "family" && lp?.encounters[w.id]).map((w) => w.id);
  const completes = l.chapters.filter((c) => isComplete(lp, c.n)).length;
  const playable = l.chapters.filter((c) => isPlayable(l.id, c.n)).length;
  // The chapter to show on dashboards: the first unlocked one that isn't finished.
  const current = l.chapters.find((c) => isUnlocked(l, lp, c.n) && !isComplete(lp, c.n))?.n ?? (completes ? Math.min(completes, playable) : 1);
  const started = !!lp && Object.values(lp.chapters).some((c) => c.done.includes("intro"));
  const pct = playable ? Math.round((l.chapters.reduce((s, c) => s + (isPlayable(l.id, c.n) ? chapterStats(l, lp, c.n).pct : 0), 0) / (playable * 100)) * 100) : 0;
  return { discovered, family, completes, playable, current, started, pct };
}

export function overallStats(progress: Progress) {
  let words = 0;
  let culture = 0;
  let memories = 0;
  let completes = 0;
  for (const id of ORDER) {
    const lp = progress.journeys[id];
    const l = LANGUAGES[id];
    if (!lp || !l) continue;
    words += l.words.filter((w) => lp.encounters[w.id]).length;
    culture += lp.culture.length;
    memories += lp.memories.length;
    completes += l.chapters.filter((c) => isComplete(lp, c.n)).length;
  }
  const level = 1 + Math.floor(words / 4);
  // One chapter's worth of discovery is roughly 100%; beyond that, connection stays full.
  const connection = Math.min(100, Math.round(words * 6 + culture * 8 + memories * 12 + completes * 10));
  return { words, culture, memories, completes, level, connection };
}

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

type Ctx = State & {
  dispatch: (a: Action) => void;
  overall: ReturnType<typeof overallStats>;
  /** the dashboard's current language */
  active: Language;
};

const GameContext = createContext<Ctx | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({ session: loadSession(), progress: loadProgress() }));

  useEffect(() => save(SESSION_KEY, state.session), [state.session]);
  useEffect(() => save(PROGRESS_KEY, state.progress), [state.progress]);

  const overall = useMemo(() => overallStats(state.progress), [state.progress]);
  const active = LANGUAGES[state.progress.active] ?? LANGUAGES.telugu;
  const value = useMemo(() => ({ ...state, dispatch, overall, active }), [state, overall, active]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
}
