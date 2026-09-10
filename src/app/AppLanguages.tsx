import { motion } from "motion/react";
import { LanguageGrid } from "../components/LanguageGrid";
import "./app.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AppLanguages() {
  return (
    <div className="page">
      <motion.div className="page__head" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <p className="page__kicker">Languages</p>
        <h1 className="page__title">One platform. Many <em>languages</em>.</h1>
        <p className="page__lede">
          Your journey is Telugu. The other worlds are being built — each with its own places, people and
          stories, not a translation of this one. They&rsquo;ll appear here as they open.
        </p>
      </motion.div>
      <LanguageGrid playTo="/app/play" variant="full" />
    </div>
  );
}
