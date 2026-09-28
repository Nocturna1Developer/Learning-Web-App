import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Native } from "../journeys/render";
import { roomArt } from "../journeys/types";
import { useGame, journeyStats } from "../state/store";
import { sfx } from "../lib/sfx";
import { LanguageTabs } from "./LanguageTabs";
import "./app.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Play() {
  const { progress, activeJourney: j, dispatch } = useGame();
  const navigate = useNavigate();
  const s = journeyStats(j, progress.journeys[j.id]);
  const [first, ...rest] = j.chapters;
  // Chapters without their own art borrow a chapter-one room, dimmed.
  const rooms = Object.values(j.rooms);

  const restart = () => {
    if (!s.started) return;
    if (!window.confirm(`Restart ${j.language} Chapter One? Discoveries in this language reset; your other languages are untouched.`)) return;
    dispatch({ type: "restart", j: j.id });
    sfx.door();
    navigate(`/app/play/${j.id}`);
  };

  return (
    <div className="page">
      <motion.div className="page__head" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <p className="page__kicker">Play</p>
        <h1 className="page__title">{s.started && !s.complete ? <>Continue your <em>journey</em>.</> : <>Choose your <em>journey</em>.</>}</h1>
      </motion.div>

      <LanguageTabs />

      <motion.section key={j.id} className="banner" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <div className="banner__art">{j.preview}</div>
        <div className="banner__grade" />
        <div className="banner__content">
          <span className="banner__status">{s.complete ? "Chapter complete" : s.started ? "Continue journey" : "Available now"} · {j.family}</span>
          <p className="chapter-row__n banner__n">{j.language} · Chapter {first.n}</p>
          <h2 className="banner__title">{j.chapterName}</h2>
          <p className="banner__sub"><Native j={j}>{j.chapterNative}</Native>{j.chapterNative !== j.chapterName && <> · </>}{j.subtitle}</p>
          <div className="progress banner__progress">
            <div className="progress__row"><span>Progress</span><strong>{s.pct}%</strong></div>
            <div className="progress__bar"><div className="progress__fill" style={{ width: `${s.pct}%` }} /></div>
          </div>
          <div className="btn-row banner__actions">
            <Link to={`/app/play/${j.id}`} className="btn">
              <span className="btn__label">{s.complete ? "Play again" : s.started ? "Continue" : "Begin"}</span>
              <svg className="btn__arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            {s.started && <button className="btn btn--ghost" onClick={restart}><span className="btn__label">Restart chapter</span></button>}
          </div>
        </div>
      </motion.section>

      <motion.section className="block" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: EASE }}>
        <div className="block__head">
          <h2 className="block__title">Other chapters · {j.language}</h2>
          <Link to="/app/world" className="block__more">The whole world →</Link>
        </div>
        <div className="chapters">
          {rest.map((c, i) => (
            <article key={c.n} className="chapter-row chapter-row--locked" aria-label={`Chapter ${c.n} — ${c.name}, locked`}>
              <div className="chapter-row__art">{c.art ?? roomArt(rooms[(i + 1) % rooms.length])}</div>
              <div className="chapter-row__meta">
                <p className="chapter-row__n">Chapter {c.n} · <Native j={j}>{c.native}</Native></p>
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
