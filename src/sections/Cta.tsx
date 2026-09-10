import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { CtaScene } from "../components/scenes/Scenes";
import { useGame } from "../state/store";
import "./Cta.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Cta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { session } = useGame();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section className="surface cta grain" data-surface="dark" id="join" ref={ref}>
      <div className="cta__stage" aria-hidden="true">
        <motion.div className="cta__depth" style={reduce ? undefined : { y }}>
          <CtaScene />
        </motion.div>
        <div className="cta__grade" />
      </div>

      <div className="container cta__content">
        <h2 className="display display--xl cta__head">
          {["Wherever you grow up,", "your roots can grow with you."].map((line, i) => (
            <span className="reveal-line" key={line}>
              <motion.span
                className="reveal-line__inner"
                initial={reduce ? false : { y: "112%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.15, delay: i * 0.12, ease: EASE }}
              >
                {i === 1 ? <em>{line}</em> : line}
              </motion.span>
            </span>
          ))}
        </h2>

        <Reveal delay={0.2}>
          <p className="lede cta__lede">
            Begin the first ROOTS journey with Telugu. Learn the language. Discover the culture.
            Hear the stories — and bring what you discover back home.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="btn-row">
            <Button to={session.user ? "/app/play" : "/subscribe"}>Start your journey</Button>
            <Button to="/languages" variant="ghost">Explore languages</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
