import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import type { Word } from "../journeys/types";
import { Native } from "../journeys/render";
import { useGame, supportFor, langStats, freshLang } from "../state/store";
import { LanguageTabs } from "./LanguageTabs";
import "./app.css";

const EASE = [0.16, 1, 0.3, 1] as const;

type Tab = "language" | "family" | "culture" | "memories";

export function JournalPage() {
  const { progress, active: j } = useGame();
  const [tab, setTab] = useState<Tab>("language");
  const jp = progress.journeys[j.id] ?? freshLang();
  const s = langStats(j, jp);

  const words = j.words.filter((w) => w.group !== "family");
  const family = j.words.filter((w) => w.group === "family");
  const counts = {
    language: words.filter((w) => jp.encounters[w.id]).length,
    family: family.filter((w) => jp.encounters[w.id]).length,
    culture: jp.culture.length,
    memories: jp.memories.length,
  };

  const TABS: { key: Tab; label: string; count: string }[] = [
    { key: "language", label: "Language", count: `${counts.language} / ${words.length} words` },
    { key: "family", label: "Family", count: `${counts.family} / ${family.length}` },
    { key: "culture", label: "Culture", count: `${counts.culture} discoveries` },
    { key: "memories", label: "Memories", count: `${counts.memories} kept` },
  ];

  const wordCard = (w: Word, i: number) => {
    const n = jp.encounters[w.id] ?? 0;
    const support = supportFor(n);
    return n > 0 ? (
      <article key={w.id} className="jentry" style={{ animationDelay: `${i * 0.05}s` }}>
        <span className="jentry__kind">{w.group === "family" ? "Family" : "Word"} · Ch. {w.ch}</span>
        <Native j={j} className="jentry__native">{w.native}</Native>
        {j.romanize && <p className="jentry__title">{w.roman}</p>}
        <p className="jentry__sub" style={{ opacity: 0.35 + support * 0.65 }}>{w.english}</p>
        <div className="jentry__fluency" aria-label={`Heard ${n} times`}>
          {[1, 2, 3, 4].map((k) => <span key={k} className={n >= k ? "is-on" : ""} />)}
        </div>
        <p className="jentry__note">Found at {w.where}. Heard {n} {n === 1 ? "time" : "times"}{support === 0 ? " — no translation needed." : "."}</p>
      </article>
    ) : (
      <article key={w.id} className="jentry jentry--locked" style={{ animationDelay: `${i * 0.05}s` }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
        <p className="jentry__title" style={{ fontSize: "var(--text-base)" }}>Not yet discovered</p>
        <p className="jentry__note">Somewhere near {w.where}.</p>
      </article>
    );
  };

  return (
    <div className="page">
      <motion.div className="page__head" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <p className="page__kicker">Heritage Journal · {progress.playerName}</p>
        <h1 className="page__title">Keep what you <em>discover</em>.</h1>
        <p className="page__lede">
          {s.discovered.length === 0
            ? `Nothing in ${j.language} yet. Every word, relative, object and memory you find lands here.`
            : `${j.language}: ${s.discovered.length} words, ${counts.culture} cultural discoveries and ${counts.memories} memories, kept.`}
        </p>
      </motion.div>

      <LanguageTabs />

      <div className="jtabs" role="tablist" aria-label="Journal sections">
        {TABS.map((t) => (
          <button key={t.key} role="tab" aria-selected={tab === t.key} className={`jtab ${tab === t.key ? "is-active" : ""}`} onClick={() => setTab(t.key)}>
            {t.label} <span className="jtab__count">{t.count}</span>
          </button>
        ))}
      </div>

      <div className="jgrid" key={`${j.id}-${tab}`}>
        {tab === "language" && words.map(wordCard)}
        {tab === "family" && family.map(wordCard)}
        {tab === "culture" && (jp.culture.length ? jp.culture.map((id, i) => {
          const c = j.cultureNotes[id];
          return c ? (
            <article key={id} className="jentry" style={{ animationDelay: `${i * 0.05}s` }}>
              <span className="jentry__kind">Culture</span>
              {c.native && <Native j={j} className="jentry__native">{c.native}</Native>}
              <p className="jentry__title">{c.title}</p>
              <p className="jentry__note">{c.note}</p>
            </article>
          ) : null;
        }) : <Empty j={j.id} text="Look closer at the things around the house — every home has objects with a story behind them." />)}
        {tab === "memories" && (jp.memories.length ? jp.memories.map((id, i) => {
          const m = j.memoryNotes[id];
          return m ? (
            <article key={id} className="jentry" style={{ animationDelay: `${i * 0.05}s` }}>
              <span className="jentry__kind">Memory</span>
              <p className="jentry__title">{m.title}</p>
              <p className="jentry__note">{m.note}</p>
            </article>
          ) : null;
        }) : <Empty j={j.id} text="Memories are made by finishing things — helping, listening, answering." />)}
      </div>
    </div>
  );
}

function Empty({ j, text }: { j: string; text: string }) {
  return (
    <div className="empty" style={{ gridColumn: "1 / -1" }}>
      <p className="empty__title">Nothing here yet.</p>
      <p className="empty__text">{text}</p>
      <Link to={`/app/play/${j}`} className="btn"><span className="btn__label">Back to the house</span></Link>
    </div>
  );
}
