import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { HomeScenePreview } from "../game/rooms";
import { VillageScene, MarketScene, FestivalScene, StoriesScene, FamilyScene } from "../components/scenes/Scenes";
import { CHAPTERS } from "../data/chapters";
import { useGame } from "../state/store";
import { sfx } from "../lib/sfx";
import "./app.css";

const EASE = [0.16, 1, 0.3, 1] as const;
const ART: Record<string, React.ReactNode> = {
  "family-story": <HomeScenePreview />,
  village: <VillageScene />,
  market: <MarketScene />,
  festival: <FestivalScene />,
  stories: <StoriesScene />,
  family: <FamilyScene />,
};

export function Play() {
  const { progress, stats, dispatch } = useGame();
  const navigate = useNavigate();
  const [first, ...rest] = CHAPTERS;
  const started = progress.flags.intro;
  const done = progress.flags.chapterComplete;

  const restart = () => {
    if (!started) return;
    if (!window.confirm("Restart Chapter One? Your journal keeps its name, but discoveries reset.")) return;
    dispatch({ type: "restartChapter" });
    sfx.door();
    navigate("/app/play/chapter-one");
  };

  return (
    <div className="page">
      <motion.div className="page__head" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <p className="page__kicker">Play</p>
        <h1 className="page__title">{started && !done ? <>Continue your <em>journey</em>.</> : <>Your <em>journey</em>.</>}</h1>
      </motion.div>

      <motion.section className="banner" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: EASE }}>
        <div className="banner__art">{ART[first.id]}</div>
        <div className="banner__grade" />
        <div className="banner__content">
          <span className="banner__status">{done ? "Chapter complete" : started ? "Continue journey" : "Available now"}</span>
          <p className="chapter-row__n" style={{ color: "rgba(244,236,221,0.6)" }}>Chapter {first.n}</p>
          <h2 className="banner__title">{first.name}</h2>
          <p className="banner__sub">{first.subtitle}</p>
          <div className="progress" style={{ maxWidth: "22rem" }}>
            <div className="progress__row"><span>Progress</span><strong>{stats.chapterPct}%</strong></div>
            <div className="progress__bar"><div className="progress__fill" style={{ width: `${stats.chapterPct}%` }} /></div>
          </div>
          <div className="btn-row banner__actions">
            <Link to="/app/play/chapter-one" className="btn">
              <span className="btn__label">{done ? "Play again" : started ? "Continue" : "Begin"}</span>
              <svg className="btn__arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            {started && (
              <button className="btn btn--ghost" onClick={restart}><span className="btn__label">Restart chapter</span></button>
            )}
          </div>
        </div>
      </motion.section>

      <motion.section className="block" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}>
        <div className="block__head">
          <h2 className="block__title">Other chapters</h2>
          <Link to="/app/world" className="block__more">The whole world →</Link>
        </div>
        <div className="chapters">
          {rest.map((c) => (
            <article key={c.id} className="chapter-row chapter-row--locked" aria-label={`Chapter ${c.n} — ${c.name}, locked`}>
              <div className="chapter-row__art">{ART[c.id]}</div>
              <div className="chapter-row__meta">
                <p className="chapter-row__n">Chapter {c.n}</p>
                <p className="chapter-row__name">{c.name}</p>
                <p className="chapter-row__sub">{c.subtitle}</p>
              </div>
              <span className="chapter-row__status">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                Locked · Coming soon
              </span>
            </article>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
