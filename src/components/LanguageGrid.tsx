import { Link } from "react-router-dom";
import { LANGUAGES, type Language } from "../data/languages";
import { Reveal } from "./Reveal";
import "./LanguageGrid.css";

type Props = {
  /** where "Play now" goes — the app for members, subscribe for visitors */
  playTo: string;
  /** compact: for the homepage; full: the Languages page with journeys listed */
  variant?: "compact" | "full";
};

export function LanguageGrid({ playTo, variant = "compact" }: Props) {
  return (
    <div className={`langgrid langgrid--${variant}`}>
      {LANGUAGES.map((l, i) => (
        <Reveal key={l.id} delay={i * 0.07} className="langgrid__cell" amount={0.15}>
          <LanguageCard lang={l} playTo={playTo} full={variant === "full"} />
        </Reveal>
      ))}
    </div>
  );
}

function LanguageCard({ lang: l, playTo, full }: { lang: Language; playTo: string; full: boolean }) {
  const available = l.status === "available";
  const inner = (
    <>
      <div className="langcard__art" aria-hidden="true">
        <span className="langcard__glow" />
        <span className="langcard__native" style={{ fontFamily: l.font }} dir={l.dir}>{l.native}</span>
      </div>
      <div className="langcard__body">
        <div className="langcard__head">
          <h3 className="langcard__name">{l.name}</h3>
          <span className={`langcard__status ${available ? "is-live" : ""}`}>
            {available ? "Available now" : "Coming soon"}
          </span>
        </div>
        <p className="langcard__line">{l.line}</p>
        {full && (
          <ul className="langcard__journeys">
            {l.journeys.map((j) => <li key={j}>{j}</li>)}
          </ul>
        )}
        <span className={`langcard__cta ${available ? "" : "is-muted"}`}>
          {available ? (
            <>
              Play now
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </>
          ) : (
            "A future journey"
          )}
        </span>
      </div>
    </>
  );

  const style = { "--la": l.a, "--lb": l.b } as React.CSSProperties;

  return available ? (
    <Link to={playTo} className="langcard langcard--live" style={style} aria-label={`${l.name} — play now`}>{inner}</Link>
  ) : (
    <div className="langcard" style={style} aria-label={`${l.name} — coming soon`}>{inner}</div>
  );
}
