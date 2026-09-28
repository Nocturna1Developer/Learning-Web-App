import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Native, ChapterArt } from "../journeys/render";
import { useGame, chapterStats, langStats } from "../state/store";
import { sfx } from "../lib/sfx";
import { LanguageTabs } from "./LanguageTabs";
import { ChapterRows } from "./ChapterRows";
import "./app.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Play() {
  const { progress, active: l, dispatch } = useGame();
  const navigate = useNavigate();
  const location = useLocation();
  const lp = progress.journeys[l.id];
  const n = langStats(l, lp).current;
  const meta = l.chapters[n - 1];
  const s = chapterStats(l, lp, n);
  const locked = (location.state as { locked?: string } | null)?.locked;

  const restart = () => {
    if (!s.started) return;
    if (!window.confirm(`Restart ${l.language} Chapter ${n}? Its story starts over; words and journal entries you've found stay.`)) return;
    dispatch({ type: "restart", j: l.id, n });
    sfx.door();
    navigate(`/app/play/${l.id}/${n}`);
  };

  return (
    <div className="page">
      <motion.div className="page__head" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <p className="page__kicker">Play</p>
        <h1 className="page__title">{s.started && !s.complete ? <>Continue your <em>journey</em>.</> : <>Choose your <em>journey</em>.</>}</h1>
        {locked && <p className="page__lede page__notice">That chapter opens when you finish the one before it.</p>}
      </motion.div>

      <LanguageTabs />

      <motion.section key={`${l.id}-${n}`} className="banner" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <div className="banner__art"><ChapterArt l={l} n={n} /></div>
        <div className="banner__grade" />
        <div className="banner__content">
          <span className="banner__status">{s.complete ? "Chapter complete" : s.started ? "Continue" : "Up next"} · {l.family}</span>
          <p className="chapter-row__n banner__n">{l.language} · Chapter {n} of {l.chapters.length}</p>
          <h2 className="banner__title">{meta.name}</h2>
          <p className="banner__sub"><Native j={l}>{meta.native}</Native>{meta.native !== meta.name && <> · </>}{meta.subtitle}</p>
          <div className="progress banner__progress">
            <div className="progress__row"><span>Progress</span><strong>{s.pct}%</strong></div>
            <div className="progress__bar"><div className="progress__fill" style={{ width: `${s.pct}%` }} /></div>
          </div>
          <div className="btn-row banner__actions">
            <Link to={`/app/play/${l.id}/${n}`} className="btn">
              <span className="btn__label">{s.complete ? "Play again" : s.started ? "Continue" : "Begin"}</span>
              <svg className="btn__arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            {s.started && <button className="btn btn--ghost" onClick={restart}><span className="btn__label">Restart chapter</span></button>}
          </div>
        </div>
      </motion.section>

      <section className="block">
        <div className="block__head">
          <h2 className="block__title">All chapters · {l.language}</h2>
          <Link to="/app/world" className="block__more">The whole world →</Link>
        </div>
        <ChapterRows l={l} />
      </section>
    </div>
  );
}
