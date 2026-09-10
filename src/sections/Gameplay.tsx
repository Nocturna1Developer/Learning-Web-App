import { Reveal, RevealLines } from "../components/Reveal";
import "./Gameplay.css";

const PILLARS = [
  {
    key: "explore",
    title: "Explore",
    line: "Villages, markets, kitchens, festivals — and the things hidden between them.",
    body: "The world is built to be wandered. Follow a sound down an alley, open the wrong door, find the courtyard nobody sent you to. Discovery is the reward.",
    icon: (
      <>
        <circle cx="24" cy="24" r="17" />
        <path d="M31 17 27.5 27.5 17 31 20.5 20.5Z" />
      </>
    ),
  },
  {
    key: "play",
    title: "Play",
    line: "Mini-games, puzzles, cooking, festivals and quests carry the learning.",
    body: "Grind a spice mix by hand. Chalk a muggu before sunrise. Cut a rival's kite loose. Each one is a real mechanic first, and a lesson only afterwards.",
    icon: (
      <>
        <rect x="7" y="15" width="34" height="20" rx="9" />
        <path d="M16 21v8M12 25h8M31 23h.01M35 28h.01" />
      </>
    ),
  },
  {
    key: "speak",
    title: "Speak",
    line: "Language arrives through conversation, not through lists.",
    body: "Characters speak Telugu at natural pace. Meaning comes from context, gesture and repetition — the way it does at a grandmother's table, and the translations recede as you grow.",
    icon: (
      <>
        <path d="M8 13a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H21l-9 8v-8a4 4 0 0 1-4-4Z" />
        <path d="M17 20h.01M24 20h.01M31 20h.01" />
      </>
    ),
  },
  {
    key: "discover",
    title: "Discover",
    line: "Stories, traditions, recipes, music and family memories, collected as you go.",
    body: "Everything you uncover lands in your Heritage Journal — and the journal is where your own family can add their version of the same story.",
    icon: (
      <>
        <path d="M10 10h12a6 6 0 0 1 6 6v22a5 5 0 0 0-5-4H10Z" />
        <path d="M38 10H26a6 6 0 0 0-6 6v22a5 5 0 0 1 5-4h13Z" />
      </>
    ),
  },
];

export function Gameplay() {
  return (
    <section className="surface section grain" data-surface="dark">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal><span className="eyebrow">Gameplay</span></Reveal>
            <RevealLines className="display display--xl" lines={["This isn't a lesson.", <>It&rsquo;s a <em>world</em>.</>]} />
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              Four things a player does, over and over, across every chapter. Everything the game
              teaches rides on top of them.
            </p>
          </Reveal>
        </div>

        <div className="pillars">
          {PILLARS.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.08} className="pillar-wrap" amount={0.1}>
              <article className="pillar">
                <div className="pillar__top">
                  <svg className="pillar__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {p.icon}
                  </svg>
                  <span className="pillar__n">0{i + 1}</span>
                </div>
                <h3 className="pillar__title display display--md">{p.title}</h3>
                <p className="pillar__line">{p.line}</p>
                <p className="pillar__body">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
