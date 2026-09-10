import { Reveal, RevealLines } from "../components/Reveal";
import { FamilyScene } from "../components/scenes/Scenes";
import "./Family.css";

const LOOP = [
  {
    n: "01",
    who: "The child",
    title: "Finds a recipe in the game",
    body: "Chapter three ends in a kitchen. The player cooks pulihora the way the game teaches it, and the recipe lands in their journal.",
  },
  {
    n: "02",
    who: "The grandmother",
    title: "Records how she actually makes it",
    body: "A private invite link opens a simple page — no account, no app. She talks for four minutes in Telugu about what her mother did differently.",
  },
  {
    n: "03",
    who: "The child",
    title: "Finds her version inside ROOTS",
    body: "Her voice appears in the game's kitchen, beside the original. The recipe now has two authors, and one of them is family.",
  },
];

export function Family() {
  return (
    <section className="surface section grain family" data-surface="dark" id="families">
      <div className="container">
        <div className="section-head">
          <Reveal><span className="eyebrow">Families</span></Reveal>
          <RevealLines className="display display--xl family__head" lines={["The game doesn't end", <>when the <em>screen does</em>.</>]} />
          <Reveal delay={0.15}>
            <p className="lede">
              ROOTS is a bridge between generations. When a child discovers a Telugu word, the game
              says: <em>ask someone in your family how they say it.</em> When they find a recipe:
              <em>ask who makes this at home.</em> Parents and grandparents can add their own voice,
              photographs and versions of a story — and what they add becomes part of the game.
            </p>
          </Reveal>
        </div>

        <div className="family__body">
          <Reveal className="family__visual" amount={0.15}>
            <div className="frame family__frame">
              <div className="frame__media"><FamilyScene /></div>
              <div className="frame__grade" />
              <div className="family__player">
                <span className="family__player-play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
                </span>
                <span className="family__player-meta">
                  <span className="family__player-title">Ammamma — gongura pachadi</span>
                  <span className="family__player-sub">Voice note · 3:42 · added by family</span>
                </span>
                <span className="family__wave" aria-hidden="true">
                  {Array.from({ length: 26 }, (_, i) => (
                    <span key={i} style={{ animationDelay: `${i * 0.07}s`, height: `${18 + ((i * 37) % 60)}%` }} />
                  ))}
                </span>
              </div>
            </div>
          </Reveal>

          <ol className="loop">
            {LOOP.map((l, i) => (
              <Reveal key={l.n} delay={i * 0.1} className="loop__item">
                <div className="loop__rail" aria-hidden="true"><span /></div>
                <div className="loop__content">
                  <p className="loop__who">{l.who}</p>
                  <h3 className="loop__title display display--md">{l.title}</h3>
                  <p className="loop__text">{l.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.1}>
          <p className="family__close display display--lg">
            It stops being a game about a culture,
            <br />
            and becomes a record of <em>one family&rsquo;s</em>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
