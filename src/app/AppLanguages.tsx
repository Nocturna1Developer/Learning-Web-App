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
          Each world has its own home, its own family and its own story — not a translation of the others. Chapter One is
          playable in all five; the chapters after it are being built.
        </p>
      </motion.div>
      <LanguageGrid hrefFor={(id) => `/app/play/${id}`} cta="Play" variant="full" />
    </div>
  );
}
