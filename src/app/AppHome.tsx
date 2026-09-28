import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { journeyList } from "../journeys";
import { Native } from "../journeys/render";
import { useGame, journeyStats } from "../state/store";
import { LanguageTabs } from "./LanguageTabs";
import "./app.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AppHome() {
  const { progress, activeJourney: j, overall } = useGame();
  const s = journeyStats(j, progress.journeys[j.id]);
  const recent = s.discovered.slice(-3).reverse().map((id) => j.words.find((w) => w.id === id)!);
  const first = j.chapters[0];

  return (
    <div className="page">
      <motion.div className="page__head" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <p className="page__kicker">ROOTS Home</p>
        <h1 className="page__title">
          {overall.completes > 0 ? <>Welcome back, <em>{progress.playerName}</em>.</> : s.started ? <>Keep going, <em>{progress.playerName}</em>.</> : <>Welcome, <em>{progress.playerName}</em>.</>}
        </h1>
        <p className="page__lede">Five worlds, one journal. Pick a language to see where you are in it.</p>
      </motion.div>

      <LanguageTabs />

      <motion.section key={j.id} className="banner" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} aria-labelledby="ch1">
        <div className="banner__art">{j.preview}</div>
        <div className="banner__grade" />
        <div className="banner__content">
          <span className="banner__status">{j.language} · Chapter {first.n} · {s.complete ? "Complete" : s.started ? `${s.pct}% explored` : "Available now"}</span>
          <h2 className="banner__title" id="ch1">{j.chapterName}</h2>
          <p className="banner__sub"><Native j={j}>{j.chapterNative}</Native>{j.chapterNative !== j.chapterName && <> · </>}{j.subtitle}</p>
          <p className="banner__text">{s.complete ? j.homeLines.done : s.started ? j.homeLines.going : j.homeLines.start}</p>
          <div className="btn-row banner__actions">
            <Link to={`/app/play/${j.id}`} className="btn">
              <span className="btn__label">{s.complete ? "Play again" : s.started ? "Continue journey" : "Begin Chapter One"}</span>
              <svg className="btn__arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <Link to="/app/play" className="btn btn--ghost"><span className="btn__label">All chapters</span></Link>
          </div>
        </div>
      </motion.section>

      <motion.div className="cards" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: EASE }}>
        <div className="card">
          <p className="card__k">{j.language} · Chapter progress</p>
          <p className="card__v card__v--num">{s.pct}%</p>
          <div className="progress__blocks" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => <span key={i} className={`progress__block ${i < s.pct / 10 ? "is-on" : ""}`} />)}
          </div>
        </div>
        <div className="card">
          <p className="card__k">{j.language} · Words</p>
          <p className="card__v card__v--num">{s.discovered.length}<span className="card__of"> / {j.words.length}</span></p>
          <p className="card__note">{recent.length ? <>Latest: {recent.map((w, i) => <span key={w.id}>{i > 0 && ", "}<Native j={j}>{w.native}</Native></span>)}</> : "Interact with things around the house to find them."}</p>
        </div>
        <div className="card">
          <p className="card__k">Level</p>
          <p className="card__v card__v--num">{overall.level}</p>
          <p className="card__note">{overall.words} words across every language you've played.</p>
        </div>
        <div className="card">
          <p className="card__k">Connection</p>
          <p className="card__v card__v--num">{overall.connection}%</p>
          <p className="card__note">Grows with words, culture and family memories.</p>
        </div>
      </motion.div>

      <motion.section className="block" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}>
        <div className="block__head">
          <h2 className="block__title">Your worlds</h2>
          <Link to="/app/languages" className="block__more">About the languages →</Link>
        </div>
        <div className="worlds">
          {journeyList().map((w) => {
            const ws = journeyStats(w, progress.journeys[w.id]);
            return (
              <Link key={w.id} to={`/app/play/${w.id}`} className={`world ${w.id === j.id ? "is-active" : ""}`}>
                <div className="world__art">{w.preview}</div>
                <div className="world__body">
                  <Native j={w} className="world__native">{w.native}</Native>
                  <span className="world__name">{w.chapterName}</span>
                  <span className="world__status">{ws.complete ? "Complete" : ws.started ? `${ws.pct}%` : "Not started"}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.section>

      <motion.section className="block" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}>
        <div className="block__head">
          <h2 className="block__title">Heritage Journal · {j.language}</h2>
          <Link to="/app/journal" className="block__more">Open journal →</Link>
        </div>
        {recent.length ? (
          <div className="cards">
            {recent.map((w) => (
              <Link key={w.id} to="/app/journal" className="card card--link">
                <p className="card__k">Word</p>
                <Native j={j} className="card__native">{w.native}</Native>
                {j.romanize && <p className="card__v card__v--sm">{w.roman}</p>}
                <p className="card__note">{w.english}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty">
            <p className="empty__title">Nothing kept in {j.language} yet.</p>
            <p className="empty__text">The journal fills as you play. Every word, family member and discovery you find lands here.</p>
          </div>
        )}
      </motion.section>
    </div>
  );
}
