import { useEffect, useState } from "react";
import { wordById } from "../../data/vocabulary";
import { sfx } from "../../lib/sfx";
import { speakTelugu } from "../../lib/speech";

type Item = { wordId: string; label: string; art: React.ReactNode };

const ITEMS: Item[] = [
  {
    wordId: "neellu", label: "Jug",
    art: <svg viewBox="0 0 80 90"><rect x="16" y="14" width="44" height="66" rx="8" fill="#8fbfd8" opacity="0.9" /><rect x="22" y="40" width="32" height="34" fill="#5a9dc0" opacity="0.7" /><path d="M60 26q18 6 0 30" fill="none" stroke="#8fbfd8" strokeWidth="7" /></svg>,
  },
  {
    wordId: "annam", label: "Pot",
    art: <svg viewBox="0 0 80 90"><path d="M8 80 q6 -50 32 -50 q26 0 32 50Z" fill="#c9cfd4" /><ellipse cx="40" cy="34" rx="32" ry="8" fill="#9aa3aa" /><ellipse cx="40" cy="30" rx="26" ry="6" fill="#f6f1e6" /></svg>,
  },
  {
    wordId: "paalu", label: "Carton",
    art: <svg viewBox="0 0 80 90"><path d="M20 84 v-52 l8 -14 h24 l8 14 v52Z" fill="#f6f1e6" /><rect x="24" y="44" width="32" height="20" fill="#2d4a78" /></svg>,
  },
  {
    wordId: "uppu", label: "Jar",
    art: <svg viewBox="0 0 80 90"><rect x="18" y="26" width="44" height="56" rx="6" fill="#e9e4d8" /><rect x="14" y="16" width="52" height="14" rx="4" fill="#3a2718" /><rect x="26" y="44" width="28" height="24" fill="#c8503f" opacity="0.8" /></svg>,
  },
];

// Amma asks for three things, by ear.
const ASKS = ["neellu", "uppu", "paalu"];

type Props = {
  support: (wordId: string) => number;
  onEncounter: (wordId: string) => void;
  onComplete: () => void;
};

/**
 * Kitchen Quest — Amma asks for an item in Telugu; you hand her the right one.
 * No labels on the items. Meaning has to come from what you've already heard.
 */
export function KitchenQuest({ support, onEncounter, onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<"idle" | "right" | "wrong">("idle");
  const [tried, setTried] = useState<string | null>(null);
  const done = step >= ASKS.length;
  const askId = ASKS[Math.min(step, ASKS.length - 1)];
  const ask = wordById(askId);
  const s = support(askId);

  useEffect(() => { if (!done) speakTelugu(`${ask.telugu} కావాలి`); }, [askId, done, ask.telugu]);

  useEffect(() => {
    if (!done) return;
    sfx.fanfare();
    const t = setTimeout(onComplete, 1500);
    return () => clearTimeout(t);
  }, [done, onComplete]);

  const hand = (wordId: string) => {
    if (done || state === "right") return;
    setTried(wordId);
    if (wordId === askId) {
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
    <div className="mg" role="dialog" aria-labelledby="kq-title">
      <div className="mg__panel">
        <div className="mg__head">
          <div>
            <p className="mg__k">Mini-game · Help in the kitchen</p>
            <h2 className="mg__title" id="kq-title">Hand Amma what she asks for.</h2>
            <p className="mg__hint">She&rsquo;s cooking and her hands are full. Nothing on the counter has a label — listen for the word.</p>
          </div>
          <div className="kq__progress" aria-label={`${Math.min(step, ASKS.length)} of ${ASKS.length}`}>
            {ASKS.map((_, i) => <span key={i} className={i < step ? "is-on" : ""} />)}
          </div>
        </div>

        <div className="kq">
          <div className="kq__ask" aria-live="polite">
            <span className="dialogue__portrait" aria-hidden="true">అ</span>
            <div className="kq__ask-text">
              {done ? (
                <>
                  <span className="kq__telugu">శభాష్!</span>
                  <span className="kq__roman">shabaash! — well done.</span>
                </>
              ) : (
                <>
                  <span className="kq__telugu">{ask.telugu} కావాలి.</span>
                  <span className="kq__roman" style={{ opacity: 0.35 + s * 0.65 }}>{ask.roman} kaavaali.</span>
                  <span className="kq__gloss" style={{ opacity: Math.max(0, s * 1.2 - 0.2) }}>I need {ask.english.split(" · ")[0]}.</span>
                </>
              )}
            </div>
          </div>

          <div className="kq__items">
            {ITEMS.map((it) => {
              const isDone = ASKS.slice(0, step).includes(it.wordId);
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
