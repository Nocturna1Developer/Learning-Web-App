import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Reveal, RevealLines } from "../components/Reveal";
import { VillageScene } from "../components/scenes/Scenes";
import "./Solution.css";

const BEATS = [
  {
    n: "01",
    title: "You wake up somewhere real",
    body: "The journey opens at the edge of a village at first light. Nobody explains anything. You walk, and the world starts talking.",
  },
  {
    n: "02",
    title: "You need something, so you ask",
    body: "The well is dry and the woman at the pump doesn't speak English. The word for water isn't a lesson — it's the thing standing between you and the next step.",
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
              lines={["So we turned heritage", <>into an <em>adventure</em>.</>]}
            />
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              ROOTS is a story-driven world a child actually wants to be inside. The language
              isn&rsquo;t the curriculum — it&rsquo;s the tool they need to get somewhere.
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
