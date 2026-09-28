import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Choice, GameSpec, Language, Line } from "../../journeys/types";
import { Native, renderSeg, plainSeg } from "../../journeys/render";
import { sfx } from "../../lib/sfx";
import { speak } from "../../lib/speech";

type Spec = Extract<GameSpec, { type: "story" }>;

type Props = { spec: Spec; j: Language; speakers: Language["speakers"]; name: string; onComplete: () => void };

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * StoryTime — an elder tells a story in illustrated panels. The narration is
 * mostly English with the key words in the language, the way heritage
 * stories are often actually told at home. It ends with a question asked in
 * the language.
 */
export function StoryTime({ spec, j, speakers, name, onComplete }: Props) {
  const [i, setI] = useState(0);
  const [reply, setReply] = useState<Line[] | null>(null);
  const [solved, setSolved] = useState(false);
  const [hint, setHint] = useState(false);
  const total = spec.panels.length;
  const asking = i >= total;
  const teller = speakers[spec.teller];
  const finish = useRef(onComplete);
  finish.current = onComplete;

  const next = () => { if (i < total) { setI(i + 1); sfx.flip(); } };
  const prev = () => { if (i > 0 && !asking) { setI(i - 1); sfx.flip(); } };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (asking) return;
      if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " " || e.key === "e" || e.key === "E") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => { if (asking) speak(spec.question.native, j.speech); }, [asking, spec.question.native, j.speech]);

  const choose = (c: Choice) => {
    if (solved) return;
    if (c.right) {
      setSolved(true);
      setReply(null);
      sfx.fanfare();
      setTimeout(() => finish.current(), 1300);
    } else {
      sfx.miss();
      setReply(c.reply ?? [{ who: spec.teller, text: "Listen again." }]);
    }
  };

  const panel = spec.panels[Math.min(i, total - 1)];

  return (
    <div className="mg" role="dialog" aria-labelledby="st-title">
      <div className="mg__panel story">
        <div className="mg__head">
          <div>
            <p className="mg__k">{spec.kicker}</p>
            <h2 className="mg__title" id="st-title">{spec.title}</h2>
            <Native j={j} className="story__native">{spec.native}</Native>
          </div>
          <div className="story__dots" aria-label={asking ? "Question" : `Page ${i + 1} of ${total}`}>
            {spec.panels.map((_, k) => <span key={k} className={k <= i ? "is-on" : ""} />)}
            <span className={`story__dot-q ${asking ? "is-on" : ""}`}>?</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!asking ? (
            <motion.div key={`p${i}`} className="story__page" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.45, ease: EASE }}>
              <div className="story__art">{panel.art}</div>
              <div className="story__text">
                <span className={`dialogue__portrait dialogue__portrait--${teller?.tone ?? "elder"}`} aria-hidden="true">{teller?.glyph}</span>
                <p aria-label={plainSeg(panel.text, name)}>{renderSeg(panel.text, j, name)}</p>
              </div>
              <div className="story__nav">
                <button className="btn btn--ghost" onClick={prev} disabled={i === 0}><span className="btn__label">Back</span></button>
                <button className="btn" onClick={next}>
                  <span className="btn__label">{i === total - 1 ? "And then…" : "Next"}</span>
                  <svg className="btn__arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="q" className="story__question" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
              <p className="mg__k">{teller?.name} asks</p>
              <Native j={j} className="story__ask">{spec.question.native}</Native>
              {j.romanize && <p className="story__roman">{spec.question.roman}</p>}
              <button className={`story__hint ${hint ? "is-open" : ""}`} onClick={() => setHint(true)}>
                {hint ? spec.question.english : "Need a hint?"}
              </button>
              <div className="story__choices">
                {spec.question.choices.map((c) => (
                  <button key={c.native} className={`dialogue__choice ${solved && c.right ? "is-right" : ""}`} onClick={() => choose(c)} disabled={solved}>
                    <Native j={j}>{c.native}</Native>
                    {j.romanize && c.roman !== c.native && <span className="choice__roman">{c.roman}</span>}
                  </button>
                ))}
              </div>
              <div className="story__reply" aria-live="polite">
                {solved && <p className="story__solved">✦ Story kept in your journal.</p>}
                {reply?.map((l, k) => (
                  <p key={k}>
                    <strong>{speakers[l.who]?.name ?? l.who}:</strong> {renderSeg(l.text, j, name)}
                    {l.gloss && <em> — {renderSeg(l.gloss, j, name)}</em>}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
