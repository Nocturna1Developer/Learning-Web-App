import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Reveal, RevealLines } from "../components/Reveal";
import "./Problem.css";

const GENERATIONS = [
  {
    who: "Grandparent",
    where: "Born in the village",
    lang: "Speaks Telugu every day",
    telugu: "అమ్మమ్మ",
    roman: "ammamma",
    strength: 1,
  },
  {
    who: "Parent",
    where: "Left at twenty-three",
    lang: "Speaks Telugu at home, English everywhere else",
    telugu: "అమ్మ",
    roman: "amma",
    strength: 0.62,
  },
  {
    who: "Child",
    where: "Born here",
    lang: "Understands a little. Answers in English.",
    telugu: "నేను",
    roman: "nenu",
    strength: 0.22,
  },
];

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="surface section grain" data-surface="paper" id="about">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal><span className="eyebrow">The problem</span></Reveal>
            <RevealLines
              className="display display--xl"
              lines={["Some stories are", <>hard to <em>inherit</em>.</>]}
            />
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              Language is the thread that carries everything else — the jokes, the recipes,
              the reason a festival matters. When the thread thins, it rarely snaps loudly.
              It just goes quiet, one generation at a time.
            </p>
          </Reveal>
        </div>

        <div className="generations" ref={ref}>
          <svg className="generations__thread" viewBox="0 0 1000 6" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="3" x2="1000" y2="3" stroke="currentColor" strokeWidth="1" opacity="0.16" />
            <motion.line
              x1="0" y1="3" x2="1000" y2="3"
              stroke="var(--earth)" strokeWidth="2"
              strokeDasharray="1000"
              style={reduce ? undefined : { pathLength: draw }}
              pathLength={1}
            />
          </svg>

          {GENERATIONS.map((g, i) => (
            <Reveal key={g.who} delay={i * 0.12} className="gen">
              <div className="gen__node" style={{ "--strength": g.strength } as React.CSSProperties}>
                <span className="gen__dot" />
              </div>
              <p className="gen__who">{g.who}</p>
              <p className="gen__telugu telugu" style={{ opacity: 0.25 + g.strength * 0.75 }}>{g.telugu}</p>
              <p className="gen__roman">{g.roman}</p>
              <p className="gen__where">{g.where}</p>
              <p className="gen__lang">{g.lang}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="problem__note">
            <p className="display display--md">
              It isn&rsquo;t that children don&rsquo;t care.
              <br />
              It&rsquo;s that nobody handed them a way in.
            </p>
            <p className="body">
              Weekend classes ask a child to study something their friends never mention.
              Apps hand them vocabulary with nowhere to put it. Meanwhile the actual culture —
              the food, the noise, the family — lives on the other side of a phone call, eleven
              time zones away.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
