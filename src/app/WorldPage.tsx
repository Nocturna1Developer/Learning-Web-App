import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { HomeScenePreview } from "../game/rooms";
import { VillageScene, MarketScene, FestivalScene, StoriesScene, FamilyScene } from "../components/scenes/Scenes";
import { CHAPTERS } from "../data/chapters";
import { useGame } from "../state/store";
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

export function WorldPage() {
  const { stats, progress } = useGame();
  return (
    <div className="page">
      <motion.div className="page__head" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <p className="page__kicker">The world · Telugu</p>
        <h1 className="page__title">Six chapters. One <em>world</em>.</h1>
        <p className="page__lede">
          The journey starts at home and travels outward — to the village, the market, a festival, the stories told
          under the banyan, and finally back to the family with everything you&rsquo;ve learned.
        </p>
      </motion.div>

      <div className="chapters">
        {CHAPTERS.map((c, i) => {
          const live = c.status === "available";
          const inner = (
            <>
              <div className="chapter-row__art">{ART[c.id]}</div>
              <div className="chapter-row__meta">
                <p className="chapter-row__n">Chapter {c.n} · <span className="telugu" style={{ letterSpacing: 0, textTransform: "none" }}>{c.telugu}</span></p>
                <p className="chapter-row__name">{c.name}</p>
                <p className="chapter-row__sub">{c.body}</p>
              </div>
              <span className="chapter-row__status">
                {live ? (
                  progress.flags.chapterComplete ? "Complete · replay" : `${stats.chapterPct}% · play`
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                    Coming soon
                  </>
                )}
              </span>
            </>
          );
          return (
            <motion.div key={c.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 + i * 0.06, ease: EASE }}>
              {live ? (
                <Link to="/app/play/chapter-one" className="chapter-row chapter-row--live">{inner}</Link>
              ) : (
                <article className="chapter-row chapter-row--locked">{inner}</article>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
