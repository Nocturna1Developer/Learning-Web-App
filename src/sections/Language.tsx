import { useEffect, useRef, useState } from "react";
import { Reveal, RevealLines } from "../components/Reveal";
import "./Language.css";

/** The same exchange, four encounters apart. Support falls away as fluency grows. */
const STAGES = [
  {
    label: "First encounter",
    caption: "Everything is given. The player just has to notice.",
    support: 1,
  },
  {
    label: "Fourth encounter",
    caption: "The English drops to a whisper. The sound leads.",
    support: 0.66,
  },
  {
    label: "Twelfth encounter",
    caption: "Only the script and the sound. Meaning is already there.",
    support: 0.33,
  },
  {
    label: "Later",
    caption: "The player asks for water in Telugu without thinking about it.",
    support: 0,
  },
];

const WORD = { telugu: "నీళ్ళు", roman: "neellu", english: "water" };

const SENTENCE = [
  { telugu: "నాకు", roman: "naaku", english: "to me" },
  { telugu: "నీళ్ళు", roman: "neellu", english: "water" },
  { telugu: "కావాలి", roman: "kaavaali", english: "is needed" },
];

export function Language() {
  const [stage, setStage] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView) return;
    const t = setInterval(() => setStage((s) => (s + 1) % STAGES.length), 3200);
    return () => clearInterval(t);
  }, [auto, inView]);

  const s = STAGES[stage];
  const romanOp = Math.min(1, s.support * 1.5);
  const engOp = Math.max(0, s.support * 1.35 - 0.35);

  return (
    <section className="surface section grain" data-surface="paper" id="language">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal><span className="eyebrow">Language</span></Reveal>
            <RevealLines
              className="display display--xl"
              lines={["You don't memorize a language.", <>You <em>live in it</em>.</>]}
            />
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              No flashcards, no scores, no streak to protect. A word shows up because the player
              needs it — then keeps showing up until it stops needing a translation.
            </p>
          </Reveal>
        </div>

        <div className="lang" ref={ref}>
          <div className="lang__demo">
            <div className="lang__screen">
              <div className="lang__screen-top">
                <span className="lang__scene-label">Village well · morning</span>
                <span className="lang__stage-label">{s.label}</span>
              </div>

              <div className="lang__word">
                <span className="lang__word-telugu telugu">{WORD.telugu}</span>
                <span className="lang__word-roman" style={{ opacity: romanOp }}>{WORD.roman}</span>
                <span className="lang__word-english" style={{ opacity: engOp }}>{WORD.english}</span>
              </div>

              <div className="lang__line">
                <p className="lang__sentence telugu">
                  {SENTENCE.map((w) => (
                    <span key={w.telugu} className="lang__chunk">
                      <span className="lang__chunk-telugu">{w.telugu}</span>
                      <span className="lang__chunk-gloss" style={{ opacity: engOp }}>{w.english}</span>
                    </span>
                  ))}
                </p>
                <p className="lang__roman" style={{ opacity: romanOp }}>&ldquo;Naaku neellu kaavaali.&rdquo;</p>
                <p className="lang__gloss" style={{ opacity: engOp }}>I need water.</p>
              </div>

              <p className="lang__caption">{s.caption}</p>
            </div>

            <div className="lang__ctrl" role="tablist" aria-label="Language exposure over time">
              {STAGES.map((st, i) => (
                <button
                  key={st.label}
                  role="tab"
                  aria-selected={i === stage}
                  className={`lang__tab ${i === stage ? "is-active" : ""}`}
                  onClick={() => { setStage(i); setAuto(false); }}
                >
                  <span className="lang__tab-bar"><span className="lang__tab-fill" /></span>
                  <span className="lang__tab-label">{st.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Reveal delay={0.15} className="lang__method">
            <p className="label lang__method-title">How it works</p>
            <ol className="method">
              {[
                { k: "Context", v: "The word appears where it's needed — at the well, in the pan, on the kite string." },
                { k: "Repetition", v: "It returns in different mouths, different sentences, without ever being drilled." },
                { k: "Interaction", v: "The player has to use it to move forward. Using it is the test." },
                { k: "Understanding", v: "The scaffolding recedes on its own, and nobody announces it." },
              ].map((m, i) => (
                <li key={m.k} className="method__step">
                  <span className="method__n">{i + 1}</span>
                  <div>
                    <p className="method__k">{m.k}</p>
                    <p className="method__v">{m.v}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
