import { useEffect, useRef, useState } from "react";
import type { GameSpec, Journey } from "../../journeys/types";
import { wordIn } from "../../journeys";
import { Native } from "../../journeys/render";
import { sfx } from "../../lib/sfx";

type Spec = Extract<GameSpec, { type: "place" }>;

type Props = {
  spec: Spec;
  j: Journey;
  support: (wordId: string) => number;
  onDiscover: (wordId: string) => void;
  onComplete: () => void;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const k = Math.floor(Math.random() * (i + 1));
    [a[i], a[k]] = [a[k], a[i]];
  }
  return a;
}

/**
 * Place — things on one side, places labelled in the language on the other.
 * Pick a thing, then its place. A family album in Telugu, an ofrenda in
 * Spanish, a seating plan in Mandarin, a table for guests in Arabic.
 */
export function PlaceGame({ spec, j, support, onDiscover, onComplete }: Props) {
  const [slots] = useState(() => shuffle(spec.items));
  const [tray] = useState(() => shuffle(spec.items));
  const [selected, setSelected] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);
  const done = placed.size === spec.items.length;

  // Hold the latest callback so parent re-renders can't restart the timer.
  const finish = useRef(onComplete);
  finish.current = onComplete;
  useEffect(() => {
    if (!done) return;
    sfx.fanfare();
    const t = setTimeout(() => finish.current(), 1500);
    return () => clearTimeout(t);
  }, [done]);

  const pick = (id: string) => {
    if (placed.has(id)) return;
    setSelected((s) => (s === id ? null : id));
    sfx.flip();
  };

  const drop = (slotId: string) => {
    if (!selected || placed.has(slotId)) return;
    if (selected === slotId) {
      setPlaced((p) => new Set([...p, slotId]));
      onDiscover(slotId);
      sfx.match(placed.size + 1);
      setSelected(null);
    } else {
      sfx.miss();
      setWrong(slotId);
      setTimeout(() => setWrong(null), 450);
    }
  };

  return (
    <div className="mg" role="dialog" aria-labelledby="pg-title">
      <div className="mg__panel">
        <div className="mg__head">
          <div>
            <p className="mg__k">{spec.kicker}</p>
            <h2 className="mg__title" id="pg-title">{spec.title}</h2>
            <p className="mg__hint">{spec.hint}</p>
          </div>
          <div className="mg__score"><span>Placed <strong>{placed.size} / {spec.items.length}</strong></span></div>
        </div>

        <div className="album">
          <div className={`album__book album__book--${spec.board ?? "album"}`} aria-label="Places">
            {slots.map((it) => {
              const w = wordIn(j, it.wordId);
              const s = support(it.wordId);
              const filled = placed.has(it.wordId);
              return (
                <button
                  key={it.wordId}
                  className={`slot ${selected && !filled ? "is-target" : ""} ${filled ? "is-filled" : ""} ${wrong === it.wordId ? "is-wrong" : ""}`}
                  onClick={() => drop(it.wordId)}
                  disabled={filled}
                  aria-label={`Place for ${w.roman}${filled ? ", filled" : ""}`}
                >
                  <div className="slot__photo" style={{ background: filled ? `color-mix(in srgb, ${it.tint} 45%, #d8c9a8)` : undefined }}>
                    {filled && it.art}
                  </div>
                  <Native j={j} className="slot__native">{w.native}</Native>
                  {j.romanize && <span className="slot__roman">{w.roman}</span>}
                  <span className="slot__english" style={{ opacity: filled ? 1 : 0.15 + s * 0.85 }}>{w.english.split(" (")[0]}</span>
                </button>
              );
            })}
          </div>

          <div className="album__tray">
            <p className="album__tray-k">{spec.tray}</p>
            {tray.map((it) => (
              <button
                key={it.wordId}
                className={`photo ${selected === it.wordId ? "is-selected" : ""} ${placed.has(it.wordId) ? "is-placed" : ""}`}
                onClick={() => pick(it.wordId)}
                aria-pressed={selected === it.wordId}
              >
                <span className="photo__thumb" style={{ background: `color-mix(in srgb, ${it.tint} 45%, #d8c9a8)` }}>{it.art}</span>
                <span>
                  <span className="photo__who">{it.who}</span>
                  <br />
                  <span className="photo__hint">{it.hint}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mg__foot">
          <p className="mg__hint">{done ? spec.done : selected ? "Now choose its place." : "Choose one."}</p>
        </div>
      </div>
    </div>
  );
}
