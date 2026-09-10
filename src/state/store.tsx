import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { VOCAB } from "../data/vocabulary";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type Plan = "monthly" | "yearly";
export type SceneId = "bedroom" | "hallway" | "living" | "kitchen";

export type Session = {
  user: string | null;
  plan: Plan | null;
};

export type Progress = {
  playerName: string;
  /** word id -> number of times encountered in the world */
  encounters: Record<string, number>;
  scene: SceneId;
  /** story flags, in the order the chapter reaches them */
  flags: {
    intro: boolean;
    albumFound: boolean;
    albumDone: boolean;
    memoryDone: boolean;
    kitchenDone: boolean;
    chapterComplete: boolean;
  };
  culture: string[];
  memories: string[];
  bestCombo: number;
};

type State = { session: Session; progress: Progress };

type Action =
  | { type: "login"; user: string }
  | { type: "logout" }
  | { type: "subscribe"; plan: Plan }
  | { type: "encounter"; wordId: string }
  | { type: "scene"; scene: SceneId }
  | { type: "flag"; flag: keyof Progress["flags"] }
  | { type: "culture"; item: string }
  | { type: "memory"; item: string }
  | { type: "combo"; combo: number }
  | { type: "restartChapter" }
  | { type: "rename"; name: string };

/* ------------------------------------------------------------------ */
/* Defaults + persistence                                              */
/* ------------------------------------------------------------------ */

const SESSION_KEY = "roots.session.v1";
const PROGRESS_KEY = "roots.progress.v1";

const freshProgress = (): Progress => ({
  playerName: "Maya",
  encounters: {},
  scene: "bedroom",
  flags: { intro: false, albumFound: false, albumDone: false, memoryDone: false, kitchenDone: false, chapterComplete: false },
  culture: [],
  memories: [],
  bestCombo: 0,
});

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...(JSON.parse(raw) as Partial<T>) };
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage may be unavailable — progress just won't persist */
  }
}

/* ------------------------------------------------------------------ */
/* Reducer                                                             */
/* ------------------------------------------------------------------ */

function reducer(state: State, action: Action): State {
  const p = state.progress;
  switch (action.type) {
    case "login":
      return { ...state, session: { ...state.session, user: action.user } };
    case "logout":
      return { ...state, session: { ...state.session, user: null } };
    case "subscribe":
      return { ...state, session: { ...state.session, plan: action.plan } };
    case "encounter":
      return { ...state, progress: { ...p, encounters: { ...p.encounters, [action.wordId]: (p.encounters[action.wordId] ?? 0) + 1 } } };
    case "scene":
      return { ...state, progress: { ...p, scene: action.scene } };
    case "flag":
      return { ...state, progress: { ...p, flags: { ...p.flags, [action.flag]: true } } };
    case "culture":
      return p.culture.includes(action.item) ? state : { ...state, progress: { ...p, culture: [...p.culture, action.item] } };
    case "memory":
      return p.memories.includes(action.item) ? state : { ...state, progress: { ...p, memories: [...p.memories, action.item] } };
    case "combo":
      return { ...state, progress: { ...p, bestCombo: Math.max(p.bestCombo, action.combo) } };
    case "restartChapter":
      return { ...state, progress: { ...freshProgress(), playerName: p.playerName } };
    case "rename":
      return { ...state, progress: { ...p, playerName: action.name } };
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

export function deriveStats(p: Progress) {
  const discovered = Object.keys(p.encounters).filter((id) => VOCAB.some((w) => w.id === id));
  const family = discovered.filter((id) => VOCAB.find((w) => w.id === id)?.group === "family");
  const f = p.flags;
  const milestones = [f.intro, f.albumFound, f.albumDone, f.memoryDone, f.kitchenDone, f.chapterComplete];
  const chapterPct = Math.round((milestones.filter(Boolean).length / milestones.length) * 100);
  const level = 1 + Math.floor(discovered.length / 4);
  const connection = Math.min(100, Math.round(discovered.length * 6 + p.culture.length * 8 + p.memories.length * 12 + (f.chapterComplete ? 10 : 0)));
  return { discovered, family, chapterPct, level, connection, journalUnlocked: f.chapterComplete || f.albumDone };
}

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

type Ctx = State & {
  dispatch: (a: Action) => void;
  stats: ReturnType<typeof deriveStats>;
};

const GameContext = createContext<Ctx | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    session: load<Session>(SESSION_KEY, { user: null, plan: null }),
    progress: load<Progress>(PROGRESS_KEY, freshProgress()),
  }));

  useEffect(() => save(SESSION_KEY, state.session), [state.session]);
  useEffect(() => save(PROGRESS_KEY, state.progress), [state.progress]);

  const stats = useMemo(() => deriveStats(state.progress), [state.progress]);
  const value = useMemo(() => ({ ...state, dispatch, stats }), [state, stats]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside GameProvider");
  return ctx;
}
