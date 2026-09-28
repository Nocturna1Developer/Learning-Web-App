import { useEffect, useRef, useState } from "react";
import type { GameSpec, Language } from "../../journeys/types";
import { Native } from "../../journeys/render";
import { sfx } from "../../lib/sfx";

type Spec = Extract<GameSpec, { type: "sequence" }>;

type Props = {
  spec: Spec;
  j: Language;
  support: (wordId: string) => number;
  onEncounter: (wordId: string) => void;
  onComplete: () => void;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const k = Math.floor(Math.random() * (i + 1));
    [a[i], a[k]] = [a[k], a[i]];
  }
  // never hand the player the answer already in order
  return a.every((x, i) => x === arr[i]) && a.length > 1 ? [...a.slice(1), a[0]] : a;
}

/**
 * Sequence — steps in the language, shuffled; tap them in the right order.
 * Recipes, rituals, directions: things families do in a particular order.
 */
export function SequenceGame({ spec, j, support, onEncounter, onComplete }: Props) {
  const [deck] = useState(() => shuffle(spec.steps.map((s, i) => ({ ...s, i }))));
  const [placed, setPlaced] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number | null>(null);
  const done = placed.length === spec.steps.length;

  const finish = useRef(onComplete);
  finish.current = onComplete;
  useEffect(() => {
    if (!done) return;
    sfx.fanfare();
    const t = setTimeout(() => finish.current(), 1600);
    return () => clearTimeout(t);
  }, [done]);

  const tap = (i: number) => {
    if (done || placed.includes(i)) return;
    if (i === placed.length) {
      setPlaced((p) => [...p, i]);
      const w = spec.steps[i].wordId;
      if (w) onEncounter(w);
      sfx.match(placed.length + 1);
    } else {
      setWrong(i);
      sfx.miss();
      setTimeout(() => setWrong(null), 450);
    }
  };

  return (
    <div className="mg" role="dialog" aria-labelledby="sg-title">
      <div className="mg__panel">
        <div className="mg__head">
          <div>
            <p className="mg__k">{spec.kicker}</p>
            <h2 className="mg__title" id="sg-title">{spec.title}</h2>
            <p className="mg__hint">{spec.hint}</p>
          </div>
          <div className="mg__score"><span>Step <strong>{Math.min(placed.length + 1, spec.steps.length)} / {spec.steps.length}</strong></span></div>
        </div>

        <ol className="seq__slots" aria-label="Your order">
          {spec.steps.map((st, k) => (
            <li key={k} className={`seq__slot ${placed[k] !== undefined ? "is-filled" : ""}`}>
              <span className="seq__n">{k + 1}</span>
              {placed[k] !== undefined && <Native j={j} className="seq__slot-native">{st.native}</Native>}
            </li>
          ))}
        </ol>

        <div className="seq__deck">
          {deck.map((st) => {
            const s = st.wordId ? support(st.wordId) : 1;
            const used = placed.includes(st.i);
            return (
              <button key={st.i} className={`seq__card ${used ? "is-used" : ""} ${wrong === st.i ? "is-wrong" : ""}`} onClick={() => tap(st.i)} disabled={used}>
                <span className="seq__art">{st.art}</span>
                <Native j={j} className="seq__native">{st.native}</Native>
                {j.romanize && st.roman !== st.native && <span className="seq__roman">{st.roman}</span>}
                <span className="seq__english" style={{ opacity: 0.25 + s * 0.75 }}>{st.english}</span>
              </button>
            );
          })}
        </div>

        <div className="mg__foot">
          <p className="mg__hint">{done ? spec.done : "What comes first?"}</p>
        </div>
      </div>
    </div>
  );
}
