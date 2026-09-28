import type { ReactNode } from "react";
import type { Journey, Seg } from "./types";

export const scriptClass = (j: Pick<Journey, "script">) => `script script-${j.script}`;

/** A run of text in the journey's own script, direction-isolated. */
export function Native({ j, children, className = "" }: { j: Pick<Journey, "script" | "dir">; children: ReactNode; className?: string }) {
  return (
    <span className={`${scriptClass(j)} ${className}`} dir={j.dir ?? "auto"} lang={langTag(j.script)}>
      {children}
    </span>
  );
}

export function langTag(script: Journey["script"]) {
  return { te: "te", es: "es", zh: "zh-Hans", hi: "hi", ar: "ar" }[script];
}

/** Render a Seg: {{…}} becomes native script, {name} the player's name. */
export function renderSeg(text: Seg, j: Pick<Journey, "script" | "dir">, name: string): ReactNode {
  const withName = text.replaceAll("{name}", name);
  const parts = withName.split(/\{\{(.+?)\}\}/g);
  return parts.map((p, i) => (i % 2 === 1 ? <Native key={i} j={j}>{p}</Native> : p));
}

/** Plain-text version (for aria labels and speech). */
export function plainSeg(text: Seg, name = ""): string {
  return text.replaceAll("{name}", name).replace(/\{\{(.+?)\}\}/g, "$1");
}
