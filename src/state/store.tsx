import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { JOURNEYS, JOURNEY_ORDER } from "../journeys";
import type { Journey } from "../journeys/types";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type Plan = "monthly" | "yearly";

export type Session = {
  user: string | null;
  plan: Plan | null;
};

/** Progress through one language's Chapter One. */
export type JourneyProgress = {
  /** word id -> number of times encountered */
  encounters: Record<string, number>;
  scene: string;
  /** completed story beats, plus "intro" and "complete" */
  done: string[];
  culture: string[];
  memories: string[];
  bestCombo: number;
};

export type Progress = {
  playerName: string;
  /** the journey the dashboard is showing */
  active: string;
  journeys: Record<string, JourneyProgress>;
};

type State = { session: Session; progress: Progress };

type J = { j: string };
type Action =
  | { type: "login"; user: string }
  | { type: "logout" }
  | { type: "subscribe"; plan: Plan }
  | { type: "rename"; name: string }
  | ({ type: "activate" } & J)
  | ({ type: "encounter"; wordId: string } & J)
  | ({ type: "scene"; scene: string } & J)
  | ({ type: "done"; beat: string } & J)
  | ({ type: "culture"; item: string } & J)
  | ({ type: "memory"; item: string } & J)
  | ({ type: "combo"; combo: number } & J)
  | ({ type: "restart" } & J);

/* ------------------------------------------------------------------ */
/* Defaults + persistence                                              */
/* ------------------------------------------------------------------ */

const SESSION_KEY = "roots.session.v1";
const PROGRESS_KEY = "roots.progress.v2";
const LEGACY_PROGRESS_KEY = "roots.progress.v1";

export const freshJourney = (j: string): JourneyProgress => ({
  encounters: {},
  scene: JOURNEYS[j]?.startRoom ?? "",
  done: [],
  culture: [],
  memories: [],
  bestCombo: 0,
});

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

/** Saves from before there was more than one language. */
type LegacyProgress = {
  playerName?: string;
  encounters?: Record<string, number>;
  scene?: string;
  flags?: Record<string, boolean>;
  culture?: string[];
  memories?: string[];
  bestCombo?: number;
};

function migrate(old: LegacyProgress): Progress {
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

function loadProgress(): Progress {
  const current = read<Progress>(PROGRESS_KEY);
  if (current?.journeys) return { ...freshProgress(), ...current };
  const legacy = read<LegacyProgress>(LEGACY_PROGRESS_KEY);
  if (legacy?.flags) return migrate(legacy);
  return freshProgress();
}

function loadSession(): Session {
  return { user: null, plan: null, ...(read<Session>(SESSION_KEY) ?? {}) };
}

/* ------------------------------------------------------------------ */
/* Reducer                                                             */
/* ------------------------------------------------------------------ */

function withJourney(state: State, j: string, fn: (jp: JourneyProgress) => JourneyProgress): State {
  const jp = state.progress.journeys[j] ?? freshJourney(j);
  return { ...state, progress: { ...state.progress, journeys: { ...state.progress.journeys, [j]: fn(jp) } } };
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
      return withJourney(state, a.j, (jp) => ({ ...jp, encounters: { ...jp.encounters, [a.wordId]: (jp.encounters[a.wordId] ?? 0) + 1 } }));
    case "scene":
      return withJourney(state, a.j, (jp) => ({ ...jp, scene: a.scene }));
    case "done":
      return withJourney(state, a.j, (jp) => ({ ...jp, done: addOnce(jp.done, a.beat) }));
    case "culture":
      return withJourney(state, a.j, (jp) => ({ ...jp, culture: addOnce(jp.culture, a.item) }));
    case "memory":
      return withJourney(state, a.j, (jp) => ({ ...jp, memories: addOnce(jp.memories, a.item) }));
    case "combo":
      return withJourney(state, a.j, (jp) => ({ ...jp, bestCombo: Math.max(jp.bestCombo, a.combo) }));
    case "restart":
      return withJourney(state, a.j, () => freshJourney(a.j));
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

export function journeyStats(journey: Journey, jp: JourneyProgress | undefined) {
  const p = jp ?? freshJourney(journey.id);
  const done = new Set(p.done);
  const discovered = journey.words.filter((w) => p.encounters[w.id]).map((w) => w.id);
  const family = journey.words.filter((w) => w.group === "family" && p.encounters[w.id]).map((w) => w.id);
  const steps = ["intro", ...journey.chapter.beats.map((b) => b.id), "complete"];
  const pct = Math.round((steps.filter((s) => done.has(s)).length / steps.length) * 100);
  return {
    discovered,
    family,
    pct,
    started: done.has("intro"),
    complete: done.has("complete"),
    journalUnlocked: done.has("complete") || discovered.length > 0,
  };
}

export function overallStats(progress: Progress) {
  let words = 0;
  let culture = 0;
  let memories = 0;
  let completes = 0;
  for (const id of JOURNEY_ORDER) {
    const jp = progress.journeys[id];
    if (!jp) continue;
    words += JOURNEYS[id].words.filter((w) => jp.encounters[w.id]).length;
    culture += jp.culture.length;
    memories += jp.memories.length;
    if (jp.done.includes("complete")) completes += 1;
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
  /** the dashboard's current journey */
  activeJourney: Journey;
};

const GameContext = createContext<Ctx | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({ session: loadSession(), progress: loadProgress() }));

  useEffect(() => save(SESSION_KEY, state.session), [state.session]);
  useEffect(() => save(PROGRESS_KEY, state.progress), [state.progress]);

  const overall = useMemo(() => overallStats(state.progress), [state.progress]);
  const activeJourney = JOURNEYS[state.progress.active] ?? JOURNEYS.telugu;
  const value = useMemo(() => ({ ...state, dispatch, overall, activeJourney }), [state, overall, activeJourney]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
}
