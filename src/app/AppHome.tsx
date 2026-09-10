import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { HomeScenePreview } from "../game/rooms";
import { CHAPTERS } from "../data/chapters";
import { useGame } from "../state/store";
import { VOCAB } from "../data/vocabulary";
import "./app.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AppHome() {
  const { progress, stats } = useGame();
  const first = CHAPTERS[0];
  const done = progress.flags.chapterComplete;
  const started = progress.flags.intro;
  const recent = stats.discovered.slice(-3).reverse().map((id) => VOCAB.find((w) => w.id === id)!);

  return (
    <div className="page">
      <motion.div className="page__head" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <p className="page__kicker">ROOTS Home · Telugu</p>
        <h1 className="page__title">
          {done ? <>Welcome back, <em>{progress.playerName}</em>.</> : started ? <>Keep going, <em>{progress.playerName}</em>.</> : <>Welcome, <em>{progress.playerName}</em>.</>}
        </h1>
        <p className="page__lede">
          {done
            ? "Chapter One is complete. Your journal is open — and the village is being built."
            : started
            ? "Amma is still waiting in the living room. The album hasn't found itself."
            : "Your first journey starts at home. Somewhere in the house is a family album."}
        </p>
      </motion.div>

      <motion.section className="banner" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: EASE }} aria-labelledby="ch1">
        <div className="banner__art"><HomeScenePreview /></div>
        <div className="banner__grade" />
        <div className="banner__content">
          <span className="banner__status">Chapter {first.n} · {done ? "Complete" : started ? `${stats.chapterPct}% explored` : "Available now"}</span>
          <h2 className="banner__title" id="ch1">{first.name}</h2>
          <p className="banner__sub">{first.subtitle}</p>
          <p className="banner__text">{first.body}</p>
          <div className="btn-row banner__actions">
            <Link to="/app/play/chapter-one" className="btn">
              <span className="btn__label">{done ? "Play again" : started ? "Continue journey" : "Begin Chapter One"}</span>
              <svg className="btn__arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <Link to="/app/play" className="btn btn--ghost"><span className="btn__label">All chapters</span></Link>
          </div>
        </div>
      </motion.section>

      <motion.div className="cards" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}>
        <div className="card">
          <p className="card__k">Chapter progress</p>
          <p className="card__v card__v--num">{stats.chapterPct}%</p>
          <div className="progress__blocks" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => <span key={i} className={`progress__block ${i < stats.chapterPct / 10 ? "is-on" : ""}`} />)}
          </div>
        </div>
        <div className="card">
          <p className="card__k">Words discovered</p>
          <p className="card__v card__v--num">{stats.discovered.length}<span style={{ fontSize: "0.5em", color: "rgba(244,236,221,0.4)" }}> / {VOCAB.length}</span></p>
          <p className="card__note">{recent.length ? `Latest: ${recent.map((w) => w.roman).join(", ")}` : "Interact with things in the house to find them."}</p>
        </div>
        <div className="card">
          <p className="card__k">Level</p>
          <p className="card__v card__v--num">{stats.level}</p>
          <p className="card__note">Levels come from words, not from time spent.</p>
        </div>
        <div className="card">
          <p className="card__k">Connection</p>
          <p className="card__v card__v--num">{stats.connection}%</p>
          <p className="card__note">Grows with words, culture and family memories.</p>
        </div>
      </motion.div>

      <motion.section className="block" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}>
        <div className="block__head">
          <h2 className="block__title">Heritage Journal</h2>
          <Link to="/app/journal" className="block__more">Open journal →</Link>
        </div>
        {stats.journalUnlocked || stats.discovered.length > 0 ? (
          <div className="cards">
            {(recent.length ? recent : VOCAB.slice(0, 1)).map((w) => (
              <Link key={w.id} to="/app/journal" className="card card--link">
                <p className="card__k">Word</p>
                <p className="card__telugu">{w.telugu}</p>
                <p className="card__v" style={{ fontSize: "var(--text-lg)" }}>{w.roman}</p>
                <p className="card__note">{w.english}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty">
            <p className="empty__title">Nothing kept yet.</p>
            <p className="empty__text">The journal fills as you play. Every word, family member and discovery you find in Chapter One lands here.</p>
          </div>
        )}
      </motion.section>
    </div>
  );
}
