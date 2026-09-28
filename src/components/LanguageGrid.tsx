import { Link } from "react-router-dom";
import { languageList, playableCount } from "../journeys";
import type { Language } from "../journeys/types";
import { ChapterArt } from "../journeys/render";
import { Reveal } from "./Reveal";
import "./LanguageGrid.css";

type Props = {
  /** where a card leads: the world page on the site, the game in the app */
  hrefFor: (id: string) => string;
  cta: string;
  /** compact: for the homepage; full: with the future journeys listed */
  variant?: "compact" | "full";
};

export function LanguageGrid({ hrefFor, cta, variant = "compact" }: Props) {
  return (
    <div className={`langgrid langgrid--${variant}`}>
      {languageList().map((l, i) => (
        <Reveal key={l.id} delay={(i % 6) * 0.06} className="langgrid__cell" amount={0.15}>
          <LanguageCard l={l} href={hrefFor(l.id)} cta={cta} full={variant === "full"} />
        </Reveal>
      ))}
    </div>
  );
}

function LanguageCard({ l, href, cta, full }: { l: Language; href: string; cta: string; full: boolean }) {
  const style = { "--la": l.a, "--lb": l.b } as React.CSSProperties;
  const playable = playableCount(l.id);
  const fontFamily = `var(--font-${l.script === "latin" ? "display" : l.script === "te" ? "telugu" : l.script === "hi" ? "devanagari" : l.script === "zh" ? "sc" : l.script === "ar" ? "arabic" : l.script === "bn" ? "bengali" : l.script === "ur" ? "urdu" : "cyrillic"})`;
  return (
    <Link to={href} className="langcard" style={style} aria-label={`${l.language} — ${l.family}. ${cta}`}>
      <div className="langcard__art" aria-hidden="true">
        <div className="langcard__scene"><ChapterArt l={l} n={1} /></div>
        <span className="langcard__grade" />
        <span className={`langcard__native langcard__native--${l.script}`} style={{ fontFamily }} dir={l.dir}>{l.native}</span>
        <span className="langcard__rank">{l.rank ? `#${l.rank} most spoken` : "Where ROOTS began"}</span>
      </div>
      <div className="langcard__body">
        <div className="langcard__head">
          <h3 className="langcard__name">{l.language}</h3>
          <span className="langcard__status is-live">{playable === l.chapters.length ? `${playable} chapters` : `${playable} of ${l.chapters.length} chapters`}</span>
        </div>
        <p className="langcard__line">{l.line}</p>
        {full && (
          <>
            <p className="langcard__k">Journeys to come</p>
            <ul className="langcard__journeys">
              {l.journeys.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </>
        )}
        <span className="langcard__cta">
          {cta}
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
    </Link>
  );
}
