import { useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { CtaScene } from "../components/scenes/Scenes";
import "./Cta.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Cta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

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
          {["Your story doesn't", "start with you."].map((line, i) => (
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
            Discover the language, traditions, and stories that came before you — and carry them
            forward. We&rsquo;re building ROOTS now. Join the journey and we&rsquo;ll show you the
            world as it comes together.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="cta__form-wrap">
          {sent ? (
            <p className="cta__thanks" role="status">
              <span className="cta__thanks-mark" aria-hidden="true">✓</span>
              Thank you — we&rsquo;ll be in touch as the first chapters are ready.
            </p>
          ) : (
            <form className="cta__form" onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="cta-email">Email address</label>
              <input
                id="cta-email"
                type="email"
                required
                placeholder="your@email.com"
                autoComplete="email"
                className="cta__input"
              />
              <Button>Join the Journey</Button>
            </form>
          )}
          <p className="cta__fine">
            Early access and development updates. No spam, and we never share your address.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <a className="cta__secondary" href="#about">
            Learn more about what we&rsquo;re building
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
