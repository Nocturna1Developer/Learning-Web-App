import { Link } from "react-router-dom";
import { Reveal, RevealLines } from "../components/Reveal";
import { CHAPTERS } from "../data/chapters";
import { HomeScenePreview } from "../game/rooms";
import { MarketScene, VillageScene, FestivalScene, StoriesScene, FamilyScene } from "../components/scenes/Scenes";
import { useGame } from "../state/store";
import "./Chapters.css";

const ART: Record<string, React.ReactNode> = {
  "family-story": <HomeScenePreview />,
  village: <VillageScene />,
  market: <MarketScene />,
  festival: <FestivalScene />,
  stories: <StoriesScene />,
  family: <FamilyScene />,
};

export function Chapters() {
  const { session } = useGame();
  const playTo = session.user ? "/app/play" : "/subscribe";
  const [first, ...rest] = CHAPTERS;

  return (
    <section className="surface section grain" data-surface="dark" id="chapters">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal><span className="eyebrow">Chapters</span></Reveal>
            <RevealLines className="display display--xl" lines={["Your journey", <>starts <em>here</em>.</>]} />
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              ROOTS unfolds in chapters, each one a place with its own people and reasons to speak.
              All six are playable now — in Telugu, and in ten more languages.
            </p>
          </Reveal>
        </div>

        <Reveal className="chapter-feature" amount={0.15}>
          <div className="chapter-feature__art">
            {ART[first.id]}
            <div className="chapter-feature__grade" />
            <span className="chapter-feature__status">
              <span className="chapter-feature__dot" /> Available now · Telugu
            </span>
          </div>
          <div className="chapter-feature__body">
            <p className="chapter-feature__n">Chapter {first.n}</p>
            <h3 className="display display--lg">{first.name}</h3>
            <p className="chapter-feature__sub">{first.subtitle}</p>
            <p className="chapter-feature__text">{first.body}</p>
            <ul className="chapter__learn">
              {first.learn.map((l) => <li key={l}>{l}</li>)}
            </ul>
            <Link to={playTo} className="btn chapter-feature__cta">
              <span className="btn__label">Play Chapter One</span>
              <svg className="btn__arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </Reveal>

        <div className="chapter-track">
          {rest.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06} className="chapter-tile-wrap" amount={0.1}>
              <Link to={playTo} className="chapter-tile" aria-label={`Chapter ${c.n} — ${c.name}, playable now`}>
                <div className="chapter-tile__art">
                  {ART[c.id]}
                  <div className="chapter-tile__grade" />
                </div>
                <div className="chapter-tile__body">
                  <p className="chapter-tile__n">Chapter {c.n}</p>
                  <h4 className="chapter-tile__name display">{c.name}</h4>
                  <p className="chapter-tile__soon">{c.subtitle}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
