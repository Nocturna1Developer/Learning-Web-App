import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { CHAPTERS } from "../data/chapters";
import { VOCAB } from "../data/vocabulary";
import { useGame } from "../state/store";
import { sfx } from "../lib/sfx";
import "./app.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Profile() {
  const { progress, stats, session, dispatch } = useGame();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(progress.playerName);

  const saveName = () => {
    const n = name.trim().slice(0, 18) || progress.playerName;
    dispatch({ type: "rename", name: n });
    setName(n);
    setEditing(false);
    sfx.tick();
  };

  const reset = () => {
    if (!window.confirm("Reset all progress? The journal empties and Chapter One starts over.")) return;
    dispatch({ type: "restartChapter" });
    sfx.door();
    navigate("/app");
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
          <p className="card__note">Playing as the demo account <code style={{ color: "var(--sun-soft)" }}>{session.user}</code> · {session.plan ? `${session.plan} membership` : "membership pending"}</p>
          <div className="profile__stats">
            <div className="profile__stat"><span className="profile__stat-k">Level</span><span className="profile__stat-v">{stats.level}</span></div>
            <div className="profile__stat"><span className="profile__stat-k">Connection</span><span className="profile__stat-v">{stats.connection}%</span></div>
            <div className="profile__stat"><span className="profile__stat-k">Words</span><span className="profile__stat-v">{stats.discovered.length} / {VOCAB.length}</span></div>
            <div className="profile__stat"><span className="profile__stat-k">Best combo</span><span className="profile__stat-v">×{progress.bestCombo}</span></div>
          </div>
          <button className="profile__danger" onClick={reset}>Reset progress</button>
        </motion.section>

        <motion.section className="block" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}>
          <div className="block__head"><h2 className="block__title">Chapter progress · Telugu</h2></div>
          <div className="card" style={{ gap: "var(--space-4)" }}>
            <div>
              <p className="card__k">Chapter One</p>
              <p className="card__v">{CHAPTERS[0].name}</p>
            </div>
            <div className="progress">
              <div className="progress__row"><span>Progress</span><strong>{stats.chapterPct}%</strong></div>
              <div className="progress__blocks" aria-hidden="true">
                {Array.from({ length: 10 }, (_, i) => <span key={i} className={`progress__block ${i < stats.chapterPct / 10 ? "is-on" : ""}`} />)}
              </div>
            </div>
            <ul style={{ display: "grid", gap: "0.4rem", fontSize: "var(--text-sm)", color: "rgba(244,236,221,0.6)" }}>
              {[
                ["Heard Amma on the phone", progress.flags.intro],
                ["Found the family album", progress.flags.albumFound],
                ["Put the album together", progress.flags.albumDone],
                ["Amma's memory game", progress.flags.memoryDone],
                ["Helped in the kitchen", progress.flags.kitchenDone],
                ["Answered in Telugu", progress.flags.chapterComplete],
              ].map(([label, done]) => (
                <li key={label as string} style={{ display: "flex", gap: "0.7em", alignItems: "center" }}>
                  <span style={{ color: done ? "var(--sun)" : "rgba(244,236,221,0.25)" }}>{done ? "✓" : "○"}</span>
                  <span style={{ color: done ? "var(--paper)" : undefined }}>{label as string}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="chapters">
            {CHAPTERS.slice(1).map((c) => (
              <article key={c.id} className="chapter-row chapter-row--locked" style={{ gridTemplateColumns: "minmax(0,1fr) auto" }}>
                <div className="chapter-row__meta">
                  <p className="chapter-row__n">Chapter {c.n}</p>
                  <p className="chapter-row__name">{c.name}</p>
                </div>
                <span className="chapter-row__status">Coming soon</span>
              </article>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
