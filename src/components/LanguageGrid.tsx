import { Link } from "react-router-dom";
import { LANGUAGES, type Language } from "../data/languages";
import { JOURNEYS } from "../journeys";
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
      {LANGUAGES.map((l, i) => (
        <Reveal key={l.id} delay={i * 0.07} className="langgrid__cell" amount={0.15}>
          <LanguageCard lang={l} href={hrefFor(l.id)} cta={cta} full={variant === "full"} />
        </Reveal>
      ))}
    </div>
  );
}

function LanguageCard({ lang: l, href, cta, full }: { lang: Language; href: string; cta: string; full: boolean }) {
  const j = JOURNEYS[l.id];
  const style = { "--la": l.a, "--lb": l.b } as React.CSSProperties;
  return (
    <Link to={href} className="langcard" style={style} aria-label={`${l.name} — ${j.chapterName}. ${cta}`}>
      <div className="langcard__art" aria-hidden="true">
        <div className="langcard__scene">{j.preview}</div>
        <span className="langcard__grade" />
        <span className="langcard__native" style={{ fontFamily: l.font }} dir={l.dir}>{l.native}</span>
      </div>
      <div className="langcard__body">
        <div className="langcard__head">
          <h3 className="langcard__name">{l.name}</h3>
          <span className="langcard__status is-live">Chapter One · {j.chapterName}</span>
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
