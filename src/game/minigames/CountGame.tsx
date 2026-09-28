import { useEffect, useRef, useState } from "react";
import type { GameSpec, Language } from "../../journeys/types";
import { Native } from "../../journeys/render";
import { sfx } from "../../lib/sfx";
import { speak } from "../../lib/speech";

type Spec = Extract<GameSpec, { type: "count" }>;

type Props = {
  spec: Spec;
  j: Language;
  speakers: Language["speakers"];
  support: (wordId: string) => number;
  onEncounter: (wordId: string) => void;
  onComplete: () => void;
};

/**
 * Count — a vendor names a price or a quantity out loud; the player counts
 * it out in coins. Numbers are learned by paying, not by reciting.
 */
export function CountGame({ spec, j, speakers, support, onEncounter, onComplete }: Props) {
  const [round, setRound] = useState(0);
  const [count, setCount] = useState(0);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const done = round >= spec.rounds.length;
  const r = spec.rounds[Math.min(round, spec.rounds.length - 1)];
  const s = r.wordId ? support(r.wordId) : 1;
  const npc = speakers[spec.npc];
  const max = Math.max(10, ...spec.rounds.map((x) => x.answer));

  useEffect(() => { if (!done) speak(r.native, j.speech); }, [r.native, done, j.speech]);

  const finish = useRef(onComplete);
  finish.current = onComplete;
  useEffect(() => {
    if (!done) return;
    sfx.fanfare();
    const t = setTimeout(() => finish.current(), 1500);
    return () => clearTimeout(t);
  }, [done]);

  const pick = (k: number) => {
    if (state !== "idle") return;
    setCount((c) => (c === k ? k - 1 : k));
    sfx.tick();
  };

  const pay = () => {
    if (state !== "idle" || count === 0) return;
    if (count === r.answer) {
      setState("right");
      if (r.wordId) onEncounter(r.wordId);
      sfx.match(round + 1);
      setTimeout(() => { setState("idle"); setCount(0); setRound((n) => n + 1); }, 1000);
    } else {
      setState("wrong");
      sfx.miss();
      setTimeout(() => setState("idle"), 600);
    }
  };

  return (
    <div className="mg" role="dialog" aria-labelledby="cg-title">
      <div className="mg__panel">
        <div className="mg__head">
          <div>
            <p className="mg__k">{spec.kicker}</p>
            <h2 className="mg__title" id="cg-title">{spec.title}</h2>
            <p className="mg__hint">{spec.hint}</p>
          </div>
          <div className="kq__progress" aria-label={`${Math.min(round, spec.rounds.length)} of ${spec.rounds.length}`}>
            {spec.rounds.map((_, i) => <span key={i} className={i < round ? "is-on" : ""} />)}
          </div>
        </div>

        <div className="kq__ask" aria-live="polite">
          <span className={`dialogue__portrait dialogue__portrait--${npc?.tone ?? "guest"}`} aria-hidden="true">{npc?.glyph}</span>
          <div className="kq__ask-text">
            {done ? (
              <>
                <Native j={j} className="kq__native">{spec.done.native}</Native>
                <span className="kq__roman">{j.romanize ? `${spec.done.roman} — ` : ""}{spec.done.english}</span>
              </>
            ) : (
              <>
                <Native j={j} className="kq__native">{r.native}</Native>
                {j.romanize && <span className="kq__roman" style={{ opacity: 0.35 + s * 0.65 }}>{r.roman}</span>}
                <span className="kq__gloss" style={{ opacity: Math.max(0, s * 1.2 - 0.2) }}>{r.english}</span>
              </>
            )}
          </div>
        </div>

        <div className={`coins ${state === "wrong" ? "is-wrong" : ""} ${state === "right" ? "is-right" : ""}`} role="group" aria-label={`Count out ${spec.unit}`}>
          {Array.from({ length: max }, (_, i) => (
            <button key={i} className={`coin ${i < count ? "is-on" : ""}`} onClick={() => pick(i + 1)} aria-label={`${i + 1}`} aria-pressed={i < count}>
              {spec.coin}
            </button>
          ))}
        </div>

        <div className="mg__foot">
          <p className="mg__hint">{count ? `${count} ${spec.unit}` : `Tap to count out ${spec.unit}.`}</p>
          <button className="btn" onClick={pay} disabled={done || count === 0}>
            <span className="btn__label">Hand it over</span>
          </button>
        </div>
      </div>
    </div>
  );
}
