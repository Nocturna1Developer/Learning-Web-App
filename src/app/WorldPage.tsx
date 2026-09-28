import { motion } from "motion/react";
import { useGame } from "../state/store";
import { LanguageTabs } from "./LanguageTabs";
import { ChapterRows } from "./ChapterRows";
import "./app.css";

const EASE = [0.16, 1, 0.3, 1] as const;

export function WorldPage() {
  const { active: l } = useGame();
  return (
    <div className="page">
      <motion.div className="page__head" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <p className="page__kicker">The world · {l.language}</p>
        <h1 className="page__title">Six chapters. One <em>world</em>.</h1>
        <p className="page__lede">{l.family} — {l.variety}. The journey starts at home and travels outward; each chapter opens when you finish the one before.</p>
      </motion.div>
      <LanguageTabs />
      <ChapterRows l={l} detail />
    </div>
  );
}
