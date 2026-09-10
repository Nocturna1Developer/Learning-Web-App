import { motion } from "motion/react";
import { Button } from "../components/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  words: number;
  family: number;
  culture: number;
  memories: number;
  onJournal: () => void;
  onHome: () => void;
};

export function ChapterComplete({ words, family, culture, memories, onJournal, onHome }: Props) {
  return (
    <div className="complete" role="dialog" aria-labelledby="cc-title">
      <div className="complete__inner">
        <motion.p className="cinematic__k" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Chapter complete</motion.p>
        <motion.h2 className="cinematic__title" id="cc-title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: EASE }}>
          A Family <em>Story</em>
        </motion.h2>
        <motion.p className="cinematic__text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}>
          You found the album, helped in the kitchen, and answered Amma in Telugu without thinking about it.
          That last part is the whole game.
        </motion.p>

        <div className="complete__rewards" aria-label="Rewards">
          {[
            { k: "+ Language", v: words, n: `word${words === 1 ? "" : "s"} discovered` },
            { k: "+ Family", v: family, n: `relationship${family === 1 ? "" : "s"}` },
            { k: "+ Culture", v: culture, n: `discover${culture === 1 ? "y" : "ies"}` },
            { k: "+ Connection", v: memories, n: `memor${memories === 1 ? "y" : "ies"} kept` },
          ].map((r, i) => (
            <div key={r.k} className="reward" style={{ animationDelay: `${0.9 + i * 0.12}s` }}>
              <span className="reward__k">{r.k}</span>
              <span className="reward__v">{r.v}</span>
              <span className="reward__n">{r.n}</span>
            </div>
          ))}
        </div>

        <motion.span className="complete__unlock" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, duration: 0.6, ease: EASE }}>
          ✦ Heritage Journal unlocked
        </motion.span>

        <motion.div className="btn-row" style={{ justifyContent: "center" }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.7, ease: EASE }}>
          <Button onClick={onJournal}>Open the journal</Button>
          <Button variant="ghost" onClick={onHome} arrow={false}>Back to ROOTS Home</Button>
        </motion.div>
        <motion.p className="cinematic__text" style={{ fontSize: "var(--text-xs)", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(244,236,221,0.4)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
          Chapter Two — The Village — is being built.
        </motion.p>
      </div>
    </div>
  );
}
