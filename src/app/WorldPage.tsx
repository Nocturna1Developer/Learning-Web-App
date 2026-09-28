import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Native } from "../journeys/render";
import { roomArt } from "../journeys/types";
import { useGame, journeyStats } from "../state/store";
import { LanguageTabs } from "./LanguageTabs";
import "./app.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export function WorldPage() {
  const { progress, activeJourney: j } = useGame();
  const s = journeyStats(j, progress.journeys[j.id]);
  const rooms = Object.values(j.rooms);

  return (
    <div className="page">
      <motion.div className="page__head" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <p className="page__kicker">The world · {j.language}</p>
        <h1 className="page__title">Six chapters. One <em>world</em>.</h1>
        <p className="page__lede">{j.family} — {j.variety}. The journey starts at home and travels outward.</p>
      </motion.div>

      <LanguageTabs />

      <div className="chapters" key={j.id}>
        {j.chapters.map((c, i) => {
          const inner = (
            <>
              <div className="chapter-row__art">{c.art ?? (c.available ? j.preview : roomArt(rooms[i % rooms.length]))}</div>
              <div className="chapter-row__meta">
                <p className="chapter-row__n">Chapter {c.n} · <Native j={j}>{c.native}</Native></p>
                <p className="chapter-row__name">{c.name}</p>
                <p className="chapter-row__sub">{c.body}</p>
              </div>
              <span className="chapter-row__status">
                {c.available ? (s.complete ? "Complete · replay" : `${s.pct}% · play`) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                    Coming soon
                  </>
                )}
              </span>
            </>
          );
          return (
            <motion.div key={c.n} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 + i * 0.05, ease: EASE }}>
              {c.available ? (
                <Link to={`/app/play/${j.id}`} className="chapter-row chapter-row--live">{inner}</Link>
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
