import { useEffect, useState, type ReactNode } from "react";
import type { ChapterContent, Language, Seg } from "./types";
import { loadChapter, peekChapter } from "./index";

type Scripted = Pick<Language, "script" | "dir" | "lang">;

export const scriptClass = (j: Pick<Language, "script">) => `script script-${j.script}`;

/** A run of text in the language's own script, direction-isolated. */
export function Native({ j, children, className = "" }: { j: Scripted; children: ReactNode; className?: string }) {
  return (
    <span className={`${scriptClass(j)} ${className}`} dir={j.dir ?? "auto"} lang={j.lang}>
      {children}
    </span>
  );
}

/** Render a Seg: {{…}} becomes native script, {name} the player's name. */
export function renderSeg(text: Seg, j: Scripted, name: string): ReactNode {
  const withName = text.replaceAll("{name}", name);
  const parts = withName.split(/\{\{(.+?)\}\}/g);
  return parts.map((p, i) => (i % 2 === 1 ? <Native key={i} j={j}>{p}</Native> : p));
}

/** Plain-text version (for aria labels and speech). */
export function plainSeg(text: Seg, name = ""): string {
  return text.replaceAll("{name}", name).replace(/\{\{(.+?)\}\}/g, "$1");
}

/** Load a chapter module; null until it arrives. */
export function useChapter(lang: string, n: number): ChapterContent | null {
  const [content, setContent] = useState<ChapterContent | null>(() => peekChapter(lang, n) ?? null);
  useEffect(() => {
    let live = true;
    const ready = peekChapter(lang, n);
    if (ready) { setContent(ready); return; }
    setContent(null);
    loadChapter(lang, n).then((c) => { if (live) setContent(c); }).catch(() => {});
    return () => { live = false; };
  }, [lang, n]);
  return content;
}

/**
 * A chapter's preview scene, loaded on demand. Until it arrives, a gradient in
 * the language's colours holds the space so layouts don't jump.
 */
export function ChapterArt({ l, n, className = "" }: { l: Pick<Language, "id" | "a" | "b">; n: number; className?: string }) {
  const content = useChapter(l.id, n);
  return content ? (
    <>{content.preview}</>
  ) : (
    <div
      className={`art-placeholder ${className}`}
      style={{ background: `linear-gradient(160deg, color-mix(in srgb, ${l.a} 45%, #17110c), color-mix(in srgb, ${l.b} 40%, #0f0e0b))` }}
      aria-hidden="true"
    />
  );
}
