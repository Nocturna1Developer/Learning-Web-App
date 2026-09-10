import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Button } from "../components/Button";
import { HeroSky, HeroHills, HeroVillage, HeroTrees, HeroForeground } from "../components/scenes/Scenes";
import { useGame } from "../state/store";
import "./Hero.css";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Drifting dust motes caught in the low sun. */
function Motes() {
  const motes = Array.from({ length: 22 }, (_, i) => ({
    left: `${(i * 41) % 100}%`,
    size: 1.5 + (i % 4) * 1.1,
    delay: -(i * 1.7),
    dur: 16 + (i % 6) * 4,
    drift: `${((i % 5) - 2) * 40}px`,
    op: 0.18 + (i % 4) * 0.14,
  }));
  return (
    <div className="hero__motes" aria-hidden="true">
      {motes.map((m, i) => (
        <span
          key={i}
          style={{
            left: m.left,
            width: m.size,
            height: m.size,
            opacity: m.op,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.dur}s`,
            "--drift": m.drift,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { session } = useGame();
  const playTo = session.user ? "/app/play" : "/subscribe";
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const ySky = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const yHills = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const yVillage = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const yTrees = useTransform(scrollYProgress, [0, 1], ["0%", "48%"]);
  const yFore = useTransform(scrollYProgress, [0, 1], ["0%", "62%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0px", "90px"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const s = (v: unknown) => (reduce ? undefined : (v as never));

  return (
    <section className="hero grain" id="top" ref={ref}>
      {/* The sky is always full-bleed; the rest of the world sits in the stage,
          which becomes a band at the foot of the screen on narrow viewports. */}
      <motion.div className="hero__sky" style={{ y: s(ySky) }} aria-hidden="true">
        <HeroSky />
      </motion.div>

      <div className="hero__stage" aria-hidden="true">
        <motion.div className="hero__depth" style={{ y: s(yHills) }}><HeroHills /></motion.div>
        <motion.div className="hero__depth" style={{ y: s(yVillage) }}><HeroVillage /></motion.div>
        <motion.div className="hero__depth" style={{ y: s(yTrees) }}><HeroTrees /></motion.div>
        {/* Haze sits between mid-ground and foreground so the child stays crisp */}
        <div className="hero__haze" />
        <motion.div className="hero__depth" style={{ y: s(yFore) }}><HeroForeground /></motion.div>
      </div>

      {/* Vignette and motes sit above the stage so they cover the whole hero,
          not just the art band the stage shrinks to on mobile. */}
      <div className="hero__vignette" aria-hidden="true" />
      <Motes />

      <motion.div className="hero__content container" style={{ y: s(copyY), opacity: s(copyOpacity) }}>
        <motion.p
          className="hero__kicker"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
        >
          Telugu · Chapter One available now
        </motion.p>

        <h1 className="hero__headline display display--hero">
          <span className="sr-only">ROOTS — Learn the language. Discover the culture. Find your connection.</span>
          {["Learn the language.", "Discover the culture.", "Find your connection."].map((line, i) => (
            <span className="reveal-line" key={line} aria-hidden="true">
              <motion.span
                className="reveal-line__inner"
                initial={reduce ? false : { y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.25, delay: 0.45 + i * 0.13, ease: EASE }}
              >
                {i === 2 ? <em>{line}</em> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="hero__lede"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.95, ease: EASE }}
        >
          A story-driven adventure for children growing up away from their family&rsquo;s home
          country — helping them reconnect with the language, traditions, stories, and people that
          shaped their family.
        </motion.p>

        <motion.div
          className="hero__actions btn-row"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: EASE }}
        >
          <Button to={playTo}>Start your journey</Button>
          <Button href="#game" variant="ghost">Explore the game</Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__meta container"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4, ease: EASE }}
      >
        <span className="hero__scroll">
          <span className="hero__scroll-line" />
          Scroll
        </span>
        <span className="hero__chapter">
          <span className="telugu">తెలుగు</span> · Chapter One · A Family Story
        </span>
      </motion.div>
    </section>
  );
}
