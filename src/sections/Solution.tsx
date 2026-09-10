import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Reveal, RevealLines } from "../components/Reveal";
import { VillageScene } from "../components/scenes/Scenes";
import "./Solution.css";

const BEATS = [
  {
    n: "01",
    title: "It starts at home",
    body: "Chapter One opens in an ordinary American house — with a family's story quietly everywhere in it. Amma is on the phone, in Telugu, and you catch more than you expect.",
  },
  {
    n: "02",
    title: "You need something, so you ask",
    body: "Find the family album. Help in the kitchen. The word for water isn't a flashcard — it's the thing standing between you and the next step.",
  },
  {
    n: "03",
    title: "What you learn, you keep",
    body: "Every word, recipe, song and story you uncover is saved to your Heritage Journal — a collection that grows with you and can be shared with your family.",
  },
];

export function Solution() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.02, 1.1]);

  return (
    <section className="surface section grain solution" data-surface="leaf" id="game">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal><span className="eyebrow">The idea</span></Reveal>
            <RevealLines
              className="display display--xl"
              lines={["We turned heritage", <>into an <em>adventure</em>.</>]}
            />
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              ROOTS isn&rsquo;t a language app. It&rsquo;s a world a child participates in — they
              explore, talk, play, solve, discover and remember. The language is part of the
              world, not a lesson placed on top of it.
            </p>
          </Reveal>
        </div>

        <div className="solution__grid">
          <Reveal className="solution__frame" amount={0.15}>
            <div className="frame" ref={ref}>
              <motion.div className="frame__media" style={reduce ? undefined : { y: imgY, scale }}>
                <VillageScene />
              </motion.div>
              <div className="frame__grade" />
              <div className="frame__ui">
                <span className="frame__tag">In development · concept art</span>
                <span className="frame__quest">
                  <span className="frame__quest-dot" />
                  Quest — Find the water carrier
                </span>
              </div>
            </div>
          </Reveal>

          <ol className="beats">
            {BEATS.map((b, i) => (
              <Reveal key={b.n} delay={i * 0.1} className="beat">
                <span className="beat__n">{b.n}</span>
                <h3 className="beat__title display display--md">{b.title}</h3>
                <p className="beat__body">{b.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
