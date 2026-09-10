import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Reveal, RevealLines } from "../components/Reveal";
import {
  VillageScene, MarketScene, KitchenScene, FestivalScene, StoriesScene, FamilyScene,
} from "../components/scenes/Scenes";
import "./World.css";

type Chapter = {
  n: string;
  name: string;
  telugu: string;
  title: string;
  body: string;
  scene: ReactNode;
  learn: string[];
};

const CHAPTERS: Chapter[] = [
  {
    n: "01",
    name: "The Village",
    telugu: "ఊరు",
    title: "Where the journey starts",
    body: "Dirt lanes, tiled roofs, a well that everyone meets at. You arrive knowing nothing and have to find your way by asking.",
    scene: <VillageScene />,
    learn: ["Greetings", "Names & family words", "Directions"],
  },
  {
    n: "02",
    name: "The Market",
    telugu: "సంత",
    title: "Language you can hold",
    body: "Bargain for tamarind. Count change. Learn the difference between what something is called and what it's worth.",
    scene: <MarketScene />,
    learn: ["Numbers", "Food & produce", "Asking for things"],
  },
  {
    n: "03",
    name: "The Kitchen",
    telugu: "వంటిల్లు",
    title: "Every dish is a story",
    body: "Grind, temper, taste, wait. Learn why gongura is sour, why ghee goes in last, and who taught whom.",
    scene: <KitchenScene />,
    learn: ["Ingredients", "Verbs of doing", "Family history"],
  },
  {
    n: "04",
    name: "The Festival",
    telugu: "సంక్రాంతి",
    title: "Sankranti, from the inside",
    body: "Chalk a muggu before dawn, feed the harvest cows, fly a kite until the string cuts your finger. Three days that explain a whole calendar.",
    scene: <FestivalScene />,
    learn: ["Festival vocabulary", "Rituals & meaning", "Seasons"],
  },
  {
    n: "05",
    name: "The Stories",
    telugu: "కథలు",
    title: "Told under the banyan",
    body: "Folk tales that travelled by voice for centuries — Tenali Rama's tricks, village legends, the ones with no written source at all.",
    scene: <StoriesScene />,
    learn: ["Listening", "Storytelling", "Folklore"],
  },
  {
    n: "06",
    name: "The Family",
    telugu: "కుటుంబం",
    title: "Where it stops being a game",
    body: "The last chapter asks the player to use what they've learned on a real call, with real relatives, in real Telugu.",
    scene: <FamilyScene />,
    learn: ["Conversation", "Confidence", "Connection"],
  },
];

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
            <RevealLines className="display display--xl" lines={["Six chapters.", <>One <em>journey</em>.</>]} />
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              Each chapter is a place with its own rules, people and reasons to speak.
              You don&rsquo;t unlock them by finishing lessons — you walk in.
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
