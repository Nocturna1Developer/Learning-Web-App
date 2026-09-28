import type { ChapterContent, Language } from "./types";

/**
 * Registry. Each language lives in its own folder:
 *   <id>/meta.ts   — always loaded: words, family, chapter list, journal notes
 *   <id>/c<N>.tsx  — one module per playable chapter, loaded on demand
 * A chapter is playable exactly when its module exists.
 */

const metas = import.meta.glob<{ default: Language }>("./*/meta.ts", { eager: true });
const chapterModules = import.meta.glob<{ default: ChapterContent }>("./*/c*.tsx");

/** Telugu first — it's where ROOTS started — then the world's ten most spoken languages. */
export const ORDER = ["telugu", "english", "chinese", "hindi", "spanish", "french", "arabic", "bengali", "portuguese", "russian", "urdu"] as const;

export const LANGUAGES: Record<string, Language> = Object.fromEntries(
  Object.entries(metas).map(([path, m]) => [path.split("/")[1], m.default]),
);

export const languageList = (): Language[] => ORDER.map((id) => LANGUAGES[id]).filter(Boolean);
export const getLanguage = (id: string | undefined): Language | undefined => (id ? LANGUAGES[id] : undefined);
export const wordIn = (l: Language, id: string) => l.words.find((w) => w.id === id)!;

const key = (lang: string, n: number) => `./${lang}/c${n}.tsx`;
export const isPlayable = (lang: string, n: number) => key(lang, n) in chapterModules;
export const playableCount = (lang: string) => (LANGUAGES[lang]?.chapters ?? []).filter((c) => isPlayable(lang, c.n)).length;

const cache = new Map<string, Promise<ChapterContent>>();
const loaded = new Map<string, ChapterContent>();

export function loadChapter(lang: string, n: number): Promise<ChapterContent> {
  const k = key(lang, n);
  if (!cache.has(k)) {
    const load = chapterModules[k];
    if (!load) return Promise.reject(new Error(`No chapter ${n} for ${lang}`));
    cache.set(k, load().then((m) => { loaded.set(k, m.default); return m.default; }));
  }
  return cache.get(k)!;
}

/** Synchronous peek — for components that can render immediately if it's already here. */
export const peekChapter = (lang: string, n: number) => loaded.get(key(lang, n));
