import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { VOCAB } from "../data/vocabulary";
import { useGame, supportFor } from "../state/store";
import "./app.css";

const EASE = [0.16, 1, 0.3, 1] as const;

const CULTURE_NOTES: Record<string, { title: string; telugu?: string; note: string }> = {
  lamp: { title: "The brass lamp", telugu: "దీపం", note: "Ammamma's lamp. Lit every evening, even in a house eleven time zones from where it was made." },
  calendar: { title: "Temple calendar", telugu: "పంచాంగం", note: "From a temple in Guntur. Festival days circled by hand." },
  toran: { title: "Mango-leaf toran", telugu: "తోరణం", note: "Strung over a doorway to welcome. The leaves are changed for festivals." },
  tulasi: { title: "Tulasi plant", telugu: "తులసి", note: "Kept on the windowsill, watered every morning." },
  album: { title: "The family album", telugu: "ఆల్బమ్", note: "Found in the cupboard. Four generations, one shelf." },
};

const MEMORY_NOTES: Record<string, { title: string; note: string }> = {
  album: { title: "Family album assembled", note: "Amma, Nanna, Ammamma and Tatayya — placed by name, in Telugu." },
  kitchen: { title: "Helped Amma cook", note: "Water, rice, milk, salt — fetched by ear, not by label." },
  understood: { title: "\"I actually understood that.\"", note: "Amma asked in Telugu. You answered in Telugu." },
};

type Tab = "language" | "family" | "culture" | "memories";

export function JournalPage() {
  const { progress, stats } = useGame();
  const [tab, setTab] = useState<Tab>("language");

  const words = VOCAB.filter((w) => w.group !== "family");
  const family = VOCAB.filter((w) => w.group === "family");
  const counts = {
    language: words.filter((w) => progress.encounters[w.id]).length,
    family: family.filter((w) => progress.encounters[w.id]).length,
    culture: progress.culture.length,
    memories: progress.memories.length,
  };

  const TABS: { key: Tab; label: string; count: string }[] = [
    { key: "language", label: "Language", count: `${counts.language} / ${words.length} words` },
    { key: "family", label: "Family", count: `${counts.family} / ${family.length} relationships` },
    { key: "culture", label: "Culture", count: `${counts.culture} discoveries` },
    { key: "memories", label: "Memories", count: `${counts.memories} kept` },
  ];

  const wordCard = (w: (typeof VOCAB)[number], i: number) => {
    const n = progress.encounters[w.id] ?? 0;
    const found = n > 0;
    const support = supportFor(n);
    return found ? (
      <article key={w.id} className="jentry" style={{ animationDelay: `${i * 0.05}s` }}>
        <span className="jentry__kind">{w.group === "family" ? "Family" : "Word"}</span>
        <p className="jentry__telugu">{w.telugu}</p>
        <p className="jentry__title">{w.roman}</p>
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
          {stats.discovered.length === 0
            ? "Empty for now. Every word, relative, object and memory you find in the house lands here."
            : `${stats.discovered.length} words, ${counts.culture} cultural discoveries and ${counts.memories} memories, kept.`}
        </p>
      </motion.div>

      <div className="jtabs" role="tablist" aria-label="Journal sections">
        {TABS.map((t) => (
          <button key={t.key} role="tab" aria-selected={tab === t.key} className={`jtab ${tab === t.key ? "is-active" : ""}`} onClick={() => setTab(t.key)}>
            {t.label} <span className="jtab__count">{t.count}</span>
          </button>
        ))}
      </div>

      <div className="jgrid" key={tab}>
        {tab === "language" && words.map(wordCard)}
        {tab === "family" && family.map(wordCard)}
        {tab === "culture" && (progress.culture.length ? progress.culture.map((id, i) => {
          const c = CULTURE_NOTES[id];
          return c ? (
            <article key={id} className="jentry" style={{ animationDelay: `${i * 0.05}s` }}>
              <span className="jentry__kind">Object</span>
              {c.telugu && <p className="jentry__telugu">{c.telugu}</p>}
              <p className="jentry__title">{c.title}</p>
              <p className="jentry__note">{c.note}</p>
            </article>
          ) : null;
        }) : <Empty text="Look closer at the things around the house — the lamp, the calendar, the plant on the sill." />)}
        {tab === "memories" && (progress.memories.length ? progress.memories.map((id, i) => {
          const m = MEMORY_NOTES[id];
          return m ? (
            <article key={id} className="jentry" style={{ animationDelay: `${i * 0.05}s` }}>
              <span className="jentry__kind">Memory</span>
              <p className="jentry__title">{m.title}</p>
              <p className="jentry__note">{m.note}</p>
            </article>
          ) : null;
        }) : <Empty text="Memories are made by finishing things — the album, the kitchen, the chapter." />)}
      </div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="empty" style={{ gridColumn: "1 / -1" }}>
      <p className="empty__title">Nothing here yet.</p>
      <p className="empty__text">{text}</p>
      <Link to="/app/play/chapter-one" className="btn"><span className="btn__label">Back to the house</span></Link>
    </div>
  );
}
