import { useEffect, useRef, useState } from "react";
import type { GameSpec, Journey } from "../../journeys/types";
import { Native } from "../../journeys/render";
import { sfx } from "../../lib/sfx";
import { speak } from "../../lib/speech";

type Spec = Extract<GameSpec, { type: "fetch" }>;

type Props = {
  spec: Spec;
  j: Journey;
  support: (wordId: string) => number;
  onEncounter: (wordId: string) => void;
  onComplete: () => void;
};

/**
 * Fetch — someone with full hands asks for things, in the language. Nothing
 * is labelled with its meaning; the player has to know the word by ear.
 */
export function FetchGame({ spec, j, support, onEncounter, onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const [tried, setTried] = useState<string | null>(null);
  const done = step >= spec.asks.length;
  const ask = spec.asks[Math.min(step, spec.asks.length - 1)];
  const s = support(ask.wordId);
  const npc = j.speakers[spec.npc];

  useEffect(() => { if (!done) speak(ask.native, j.speech); }, [ask.native, done, j.speech]);

  // Hold the latest callback so parent re-renders can't restart the timer.
  const finish = useRef(onComplete);
  finish.current = onComplete;
  useEffect(() => {
    if (!done) return;
    sfx.fanfare();
    const t = setTimeout(() => finish.current(), 1500);
    return () => clearTimeout(t);
  }, [done]);

  const hand = (wordId: string) => {
    if (done || state === "right") return;
    setTried(wordId);
    if (wordId === ask.wordId) {
      setState("right");
      onEncounter(wordId);
      sfx.match(step + 1);
      setTimeout(() => { setState("idle"); setTried(null); setStep((n) => n + 1); }, 900);
    } else {
      setState("wrong");
      sfx.miss();
      setTimeout(() => { setState("idle"); setTried(null); }, 450);
    }
  };

  return (
    <div className="mg" role="dialog" aria-labelledby="fg-title">
      <div className="mg__panel">
        <div className="mg__head">
          <div>
            <p className="mg__k">{spec.kicker}</p>
            <h2 className="mg__title" id="fg-title">{spec.title}</h2>
            <p className="mg__hint">{spec.hint}</p>
          </div>
          <div className="kq__progress" aria-label={`${Math.min(step, spec.asks.length)} of ${spec.asks.length}`}>
            {spec.asks.map((_, i) => <span key={i} className={i < step ? "is-on" : ""} />)}
          </div>
        </div>

        <div className="kq">
          <div className="kq__ask" aria-live="polite">
            <span className={`dialogue__portrait dialogue__portrait--${npc?.tone ?? "parent"}`} aria-hidden="true">{npc?.glyph}</span>
            <div className="kq__ask-text">
              {done ? (
                <>
                  <Native j={j} className="kq__native">{spec.done.native}</Native>
                  <span className="kq__roman">{j.romanize ? `${spec.done.roman} — ` : ""}{spec.done.english}</span>
                </>
              ) : (
                <>
                  <Native j={j} className="kq__native">{ask.native}</Native>
                  {j.romanize && <span className="kq__roman" style={{ opacity: 0.35 + s * 0.65 }}>{ask.roman}</span>}
                  <span className="kq__gloss" style={{ opacity: Math.max(0, s * 1.2 - 0.2) }}>{ask.english}</span>
                </>
              )}
            </div>
          </div>

          <div className="kq__items">
            {spec.items.map((it) => {
              const isDone = spec.asks.slice(0, step).some((a) => a.wordId === it.wordId);
              const cls = tried === it.wordId ? (state === "right" ? "is-right" : state === "wrong" ? "is-wrong" : "") : "";
              return (
                <button key={it.wordId} className={`kitem ${cls} ${isDone ? "is-done" : ""}`} onClick={() => hand(it.wordId)} aria-label={it.label}>
                  {it.art}
                  <span className="kitem__label">{it.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
