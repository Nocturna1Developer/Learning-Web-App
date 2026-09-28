import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { languageList } from "../journeys";
import { Native, ChapterArt } from "../journeys/render";
import { useGame, chapterStats, langStats } from "../state/store";
import { LanguageTabs } from "./LanguageTabs";
import "./app.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AppHome() {
  const { progress, active: l, overall } = useGame();
  const lp = progress.journeys[l.id];
  const ls = langStats(l, lp);
  const n = ls.current;
  const meta = l.chapters[n - 1];
  const s = chapterStats(l, lp, n);
  const recent = ls.discovered.slice(-3).reverse().map((id) => l.words.find((w) => w.id === id)!);

  return (
    <div className="page">
      <motion.div className="page__head" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <p className="page__kicker">ROOTS Home</p>
        <h1 className="page__title">
          {overall.completes > 0 ? <>Welcome back, <em>{progress.playerName}</em>.</> : ls.started ? <>Keep going, <em>{progress.playerName}</em>.</> : <>Welcome, <em>{progress.playerName}</em>.</>}
        </h1>
        <p className="page__lede">Eleven worlds, one journal. Pick a language to see where you are in it.</p>
      </motion.div>

      <LanguageTabs />

      <motion.section key={`${l.id}-${n}`} className="banner" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} aria-labelledby="chx">
        <div className="banner__art"><ChapterArt l={l} n={n} /></div>
        <div className="banner__grade" />
        <div className="banner__content">
          <span className="banner__status">{l.language} · Chapter {n} of {l.chapters.length} · {s.complete ? "Complete" : s.started ? `${s.pct}% explored` : "Ready"}</span>
          <h2 className="banner__title" id="chx">{meta.name}</h2>
          <p className="banner__sub"><Native j={l}>{meta.native}</Native>{meta.native !== meta.name && <> · </>}{meta.subtitle}</p>
          <p className="banner__text">{s.complete ? meta.homeLines.done : s.started ? meta.homeLines.going : meta.homeLines.start}</p>
          <div className="btn-row banner__actions">
            <Link to={`/app/play/${l.id}/${n}`} className="btn">
              <span className="btn__label">{s.complete ? "Play again" : s.started ? "Continue" : `Begin Chapter ${n}`}</span>
              <svg className="btn__arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <Link to="/app/play" className="btn btn--ghost"><span className="btn__label">All chapters</span></Link>
          </div>
        </div>
      </motion.section>

      <motion.div className="cards" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: EASE }}>
        <div className="card">
          <p className="card__k">{l.language} · Chapters</p>
          <p className="card__v card__v--num">{ls.completes}<span className="card__of"> / {l.chapters.length}</span></p>
          <div className="progress__blocks" aria-hidden="true">
            {l.chapters.map((c) => <span key={c.n} className={`progress__block ${c.n <= ls.completes ? "is-on" : ""}`} />)}
          </div>
        </div>
        <div className="card">
          <p className="card__k">{l.language} · Words</p>
          <p className="card__v card__v--num">{ls.discovered.length}<span className="card__of"> / {l.words.length}</span></p>
          <p className="card__note">{recent.length ? <>Latest: {recent.map((w, i) => <span key={w.id}>{i > 0 && ", "}<Native j={l}>{w.native}</Native></span>)}</> : "Interact with things in the world to find them."}</p>
        </div>
        <div className="card">
          <p className="card__k">Level</p>
          <p className="card__v card__v--num">{overall.level}</p>
          <p className="card__note">{overall.words} words across every language you've played.</p>
        </div>
        <div className="card">
          <p className="card__k">Connection</p>
          <p className="card__v card__v--num">{overall.connection}%</p>
          <p className="card__note">{overall.completes} chapter{overall.completes === 1 ? "" : "s"} finished across all worlds.</p>
        </div>
      </motion.div>

      <motion.section className="block" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}>
        <div className="block__head">
          <h2 className="block__title">Your worlds</h2>
          <Link to="/app/languages" className="block__more">About the languages →</Link>
        </div>
        <div className="worlds">
          {languageList().map((w) => {
            const ws = langStats(w, progress.journeys[w.id]);
            return (
              <Link key={w.id} to={`/app/play/${w.id}`} className={`world ${w.id === l.id ? "is-active" : ""}`}>
                <div className="world__art"><ChapterArt l={w} n={ws.current} /></div>
                <div className="world__body">
                  <Native j={w} className="world__native">{w.native}</Native>
                  <span className="world__name">{w.language}</span>
                  <span className="world__status">{ws.completes === w.chapters.length ? "Complete" : ws.started ? `Chapter ${ws.current} of ${w.chapters.length}` : "Not started"}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.section>

      <motion.section className="block" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}>
        <div className="block__head">
          <h2 className="block__title">Heritage Journal · {l.language}</h2>
          <Link to="/app/journal" className="block__more">Open journal →</Link>
        </div>
        {recent.length ? (
          <div className="cards">
            {recent.map((w) => (
              <Link key={w.id} to="/app/journal" className="card card--link">
                <p className="card__k">Word · Chapter {w.ch}</p>
                <Native j={l} className="card__native">{w.native}</Native>
                {l.romanize && <p className="card__v card__v--sm">{w.roman}</p>}
                <p className="card__note">{w.english}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty">
            <p className="empty__title">Nothing kept in {l.language} yet.</p>
            <p className="empty__text">The journal fills as you play. Every word, family member and discovery you find lands here.</p>
          </div>
        )}
      </motion.section>
    </div>
  );
}
