import { journeyList } from "../journeys";
import { Native } from "../journeys/render";
import { useGame, journeyStats } from "../state/store";
import { sfx } from "../lib/sfx";

/** Switches which language world the dashboard pages are showing. */
export function LanguageTabs() {
  const { progress, dispatch } = useGame();
  return (
    <div className="ltabs" role="tablist" aria-label="Language">
      {journeyList().map((j) => {
        const s = journeyStats(j, progress.journeys[j.id]);
        const on = progress.active === j.id;
        return (
          <button
            key={j.id}
            role="tab"
            aria-selected={on}
            className={`ltab ${on ? "is-active" : ""}`}
            onClick={() => { dispatch({ type: "activate", j: j.id }); sfx.tick(); }}
          >
            <Native j={j} className="ltab__native">{j.native}</Native>
            <span className="ltab__name">{j.language}</span>
            <span className="ltab__bar" aria-label={`${s.pct}% of Chapter One`}><span style={{ width: `${s.pct}%` }} /></span>
          </button>
        );
      })}
    </div>
  );
}
