import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { languageList } from "../journeys";
import { Native } from "../journeys/render";
import { useGame, langStats, chapterStats } from "../state/store";
import { sfx } from "../lib/sfx";
import "./app.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Profile() {
  const { progress, overall, session, dispatch } = useGame();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(progress.playerName);
  const total = languageList().reduce((s, l) => s + l.chapters.length, 0);

  const saveName = () => {
    const n = name.trim().slice(0, 18) || progress.playerName;
    dispatch({ type: "rename", name: n });
    setName(n);
    setEditing(false);
    sfx.tick();
  };

  const reset = (id: string, language: string) => {
    if (!window.confirm(`Reset ${language}? Its journal empties and every chapter starts over.`)) return;
    dispatch({ type: "reset", j: id });
    sfx.door();
  };

  return (
    <div className="page">
      <motion.div className="page__head" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <p className="page__kicker">Profile</p>
        <h1 className="page__title">Player <em>profile</em>.</h1>
      </motion.div>

      <div className="profile">
        <motion.section className="profile__card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: EASE }}>
          <span className="profile__avatar" aria-hidden="true">{progress.playerName.slice(0, 1)}</span>
          {editing ? (
            <form onSubmit={(e) => { e.preventDefault(); saveName(); }} style={{ width: "100%" }}>
              <label className="sr-only" htmlFor="player-name">Player name</label>
              <input id="player-name" className="profile__name-input" value={name} onChange={(e) => setName(e.target.value)} maxLength={18} autoFocus onBlur={saveName} />
            </form>
          ) : (
            <button className="profile__name" onClick={() => setEditing(true)} title="Rename">{progress.playerName}</button>
          )}
          <p className="card__note">Playing as the demo account <code className="profile__code">{session.user}</code> · {session.plan ? `${session.plan} membership` : "membership pending"}</p>
          <div className="profile__stats">
            <div className="profile__stat"><span className="profile__stat-k">Level</span><span className="profile__stat-v">{overall.level}</span></div>
            <div className="profile__stat"><span className="profile__stat-k">Connection</span><span className="profile__stat-v">{overall.connection}%</span></div>
            <div className="profile__stat"><span className="profile__stat-k">Words</span><span className="profile__stat-v">{overall.words}</span></div>
            <div className="profile__stat"><span className="profile__stat-k">Chapters</span><span className="profile__stat-v">{overall.completes} / {total}</span></div>
          </div>
        </motion.section>

        <motion.section className="block" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}>
          <div className="block__head"><h2 className="block__title">Every language</h2></div>
          {languageList().map((l) => {
            const lp = progress.journeys[l.id];
            const s = langStats(l, lp);
            return (
              <div key={l.id} className="card profile__journey">
                <div className="profile__journey-head">
                  <div>
                    <p className="card__k"><Native j={l}>{l.native}</Native> · {l.language}</p>
                    <p className="card__v">{s.completes} of {l.chapters.length} chapters</p>
                  </div>
                  <Link to={`/app/play/${l.id}`} className="block__more">{s.started ? "Continue" : "Begin"} →</Link>
                </div>
                <div className="progress">
                  <div className="progress__row"><span>{s.discovered.length} / {l.words.length} words</span><strong>{s.pct}%</strong></div>
                  <div className="progress__blocks" aria-hidden="true">
                    {l.chapters.map((c) => <span key={c.n} className={`progress__block ${chapterStats(l, lp, c.n).complete ? "is-on" : ""}`} />)}
                  </div>
                </div>
                {s.started && (
                  <ul className="profile__steps">
                    {l.chapters.map((c) => {
                      const cs = chapterStats(l, lp, c.n);
                      return (
                        <li key={c.n} className={cs.complete ? "is-done" : ""}>
                          <span aria-hidden="true">{cs.complete ? "✓" : cs.started ? "◐" : "○"}</span> {c.n}. {c.name}
                        </li>
                      );
                    })}
                  </ul>
                )}
                {s.started && <button className="profile__danger" onClick={() => reset(l.id, l.language)}>Reset {l.language}</button>}
              </div>
            );
          })}
        </motion.section>
      </div>
    </div>
  );
}
