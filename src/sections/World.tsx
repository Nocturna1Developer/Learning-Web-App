import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Reveal, RevealLines } from "../components/Reveal";
import { VillageScene, MarketScene, FestivalScene, StoriesScene, FamilyScene } from "../components/scenes/Scenes";
import { HomeScenePreview } from "../game/rooms";
import { CHAPTERS as CHAPTER_DATA } from "../data/chapters";
import "./World.css";

type Chapter = {
  n: string;
  name: string;
  telugu: string;
  title: string;
  body: string;
  scene: ReactNode;
  learn: string[];
  status: "available" | "soon";
};

const ART: Record<string, ReactNode> = {
  "family-story": <HomeScenePreview />,
  village: <VillageScene />,
  market: <MarketScene />,
  festival: <FestivalScene />,
  stories: <StoriesScene />,
  family: <FamilyScene />,
};

const CHAPTERS: Chapter[] = CHAPTER_DATA.map((c) => ({
  n: c.n,
  name: c.name,
  telugu: c.telugu,
  title: c.subtitle,
  body: c.body,
  scene: ART[c.id],
  learn: c.learn,
  status: c.status,
}));

export function World() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref });

  // Horizontal travel: N panels wide, minus one viewport.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((CHAPTERS.length - 1) / CHAPTERS.length) * 100}%`]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="surface world" data-surface="dark" id="world">
      <div className="container world__head">
        <div className="section-head section-head--split">
          <div>
            <Reveal><span className="eyebrow">The world</span></Reveal>
            <RevealLines className="display display--xl" lines={["Six chapters.", <>One <em>world</em>.</>]} />
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              Each chapter is a place with its own rules, people and reasons to speak. Chapter One
              is at home; the journey then travels to the village, the market, the festival and
              beyond. You don&rsquo;t unlock them by finishing lessons — you walk in.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Desktop: pinned horizontal journey */}
      <div className="world__rail" ref={ref}>
        <div className="world__sticky">
          <motion.div className="world__track" style={reduce ? undefined : { x }}>
            {CHAPTERS.map((c) => (
              <ChapterPanel key={c.n} chapter={c} />
            ))}
          </motion.div>
          <div className="world__bar">
            <div className="world__bar-track">
              <motion.div className="world__bar-fill" style={reduce ? undefined : { width: progress }} />
            </div>
            <div className="world__bar-labels">
              {CHAPTERS.map((c) => (
                <span key={c.n}>{c.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked chapters */}
      <div className="world__stack container">
        {CHAPTERS.map((c, i) => (
          <Reveal key={c.n} delay={i * 0.05} className="world__stack-item" amount={0.1}>
            <div className="chapter-card">
              <div className="chapter-card__media">{c.scene}</div>
              <div className="chapter-card__body">
                <div className="chapter__meta">
                  <span className="chapter__n">Chapter {c.n}</span>
                  <span className="chapter__telugu telugu">{c.telugu}</span>
                  <span className={`chapter__status ${c.status === "available" ? "is-live" : ""}`}>
                    {c.status === "available" ? "Available now" : "Coming soon"}
                  </span>
                </div>
                <h3 className="display display--lg">{c.name}</h3>
                <p className="chapter__title">{c.title}</p>
                <p className="chapter__body">{c.body}</p>
                <ul className="chapter__learn">
                  {c.learn.map((l) => <li key={l}>{l}</li>)}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ChapterPanel({ chapter: c }: { chapter: Chapter }) {
  return (
    <article className="panel">
      <div className="panel__media">{c.scene}</div>
      <div className="panel__grade" />
      <span className="panel__numeral" aria-hidden="true">{c.n}</span>
      <div className="panel__content">
        <div className="chapter__meta">
          <span className="chapter__n">Chapter {c.n}</span>
          <span className="chapter__telugu telugu">{c.telugu}</span>
          <span className={`chapter__status ${c.status === "available" ? "is-live" : ""}`}>
            {c.status === "available" ? "Available now" : "Coming soon"}
          </span>
        </div>
        <h3 className="panel__name display">{c.name}</h3>
        <p className="panel__title">{c.title}</p>
        <p className="panel__body">{c.body}</p>
        <ul className="chapter__learn">
          {c.learn.map((l) => <li key={l}>{l}</li>)}
        </ul>
      </div>
    </article>
  );
}
