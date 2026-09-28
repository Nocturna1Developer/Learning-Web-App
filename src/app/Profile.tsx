import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { journeyList } from "../journeys";
import { Native, renderSeg } from "../journeys/render";
import { useGame, journeyStats } from "../state/store";
import { sfx } from "../lib/sfx";
import "./app.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Profile() {
  const { progress, overall, session, dispatch } = useGame();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(progress.playerName);

  const saveName = () => {
    const n = name.trim().slice(0, 18) || progress.playerName;
    dispatch({ type: "rename", name: n });
    setName(n);
    setEditing(false);
    sfx.tick();
  };

  const reset = (id: string, language: string) => {
    if (!window.confirm(`Reset ${language}? Its journal empties and Chapter One starts over.`)) return;
    dispatch({ type: "restart", j: id });
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
            <div className="profile__stat"><span className="profile__stat-k">Chapters done</span><span className="profile__stat-v">{overall.completes} / 5</span></div>
          </div>
        </motion.section>

        <motion.section className="block" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}>
          <div className="block__head"><h2 className="block__title">Chapter One, in every language</h2></div>
          {journeyList().map((j) => {
            const jp = progress.journeys[j.id];
            const s = journeyStats(j, jp);
            const done = new Set(jp?.done ?? []);
            return (
              <div key={j.id} className="card profile__journey">
                <div className="profile__journey-head">
                  <div>
                    <p className="card__k"><Native j={j}>{j.native}</Native> · {j.language}</p>
                    <p className="card__v">{j.chapterName}</p>
                  </div>
                  <Link to={`/app/play/${j.id}`} className="block__more">{s.complete ? "Replay" : s.started ? "Continue" : "Begin"} →</Link>
                </div>
                <div className="progress">
                  <div className="progress__row"><span>{s.discovered.length} / {j.words.length} words</span><strong>{s.pct}%</strong></div>
                  <div className="progress__blocks" aria-hidden="true">
                    {Array.from({ length: 10 }, (_, i) => <span key={i} className={`progress__block ${i < s.pct / 10 ? "is-on" : ""}`} />)}
                  </div>
                </div>
                {s.started && (
                  <ul className="profile__steps">
                    {j.chapter.beats.map((b) => (
                      <li key={b.id} className={done.has(b.id) ? "is-done" : ""}>
                        <span aria-hidden="true">{done.has(b.id) ? "✓" : "○"}</span> {renderSeg(b.quest.v, j, progress.playerName)}
                      </li>
                    ))}
                    <li className={s.complete ? "is-done" : ""}><span aria-hidden="true">{s.complete ? "✓" : "○"}</span> {j.chapter.ending.quest.v}</li>
                  </ul>
                )}
                {s.started && <button className="profile__danger" onClick={() => reset(j.id, j.language)}>Reset {j.language}</button>}
              </div>
            );
          })}
        </motion.section>
      </div>
    </div>
  );
}
