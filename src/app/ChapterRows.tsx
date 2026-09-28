import { Link } from "react-router-dom";
import { motion } from "motion/react";
import type { Language } from "../journeys/types";
import { Native, ChapterArt } from "../journeys/render";
import { useGame, chapterStats } from "../state/store";

const EASE = [0.16, 1, 0.3, 1] as const;

const Lock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);

/** A language's six chapters as rows — playable ones link into the game. */
export function ChapterRows({ l, detail = false }: { l: Language; detail?: boolean }) {
  const { progress } = useGame();
  const lp = progress.journeys[l.id];
  return (
    <div className="chapters" key={l.id}>
      {l.chapters.map((c, i) => {
        const s = chapterStats(l, lp, c.n);
        const status = !s.playable
          ? <><Lock /> Coming soon</>
          : !s.unlocked
          ? <><Lock /> Finish Chapter {c.n - 1}</>
          : s.complete
          ? "✓ Complete · replay"
          : s.started
          ? `${s.pct}% · continue`
          : "Play";
        const inner = (
          <>
            <div className="chapter-row__art"><ChapterArt l={l} n={s.playable ? c.n : 1} /></div>
            <div className="chapter-row__meta">
              <p className="chapter-row__n">Chapter {c.n} · <Native j={l}>{c.native}</Native></p>
              <p className="chapter-row__name">{c.name}</p>
              <p className="chapter-row__sub">{detail ? c.synopsis : c.subtitle}</p>
            </div>
            <span className="chapter-row__status">{status}</span>
          </>
        );
        return (
          <motion.div key={c.n} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.04 + i * 0.05, ease: EASE }}>
            {s.unlocked ? (
              <Link to={`/app/play/${l.id}/${c.n}`} className={`chapter-row chapter-row--live ${s.complete ? "is-complete" : ""}`}>{inner}</Link>
            ) : (
              <article className="chapter-row chapter-row--locked" aria-label={`Chapter ${c.n} — ${c.name}, locked`}>{inner}</article>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
