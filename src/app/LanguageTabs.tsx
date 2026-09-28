import { languageList } from "../journeys";
import { Native } from "../journeys/render";
import { useGame, langStats } from "../state/store";
import { sfx } from "../lib/sfx";

/** Switches which language world the dashboard pages are showing. */
export function LanguageTabs() {
  const { progress, dispatch } = useGame();
  return (
    <div className="ltabs" role="tablist" aria-label="Language">
      {languageList().map((l) => {
        const s = langStats(l, progress.journeys[l.id]);
        const on = progress.active === l.id;
        return (
          <button
            key={l.id}
            role="tab"
            aria-selected={on}
            className={`ltab ${on ? "is-active" : ""}`}
            onClick={() => { dispatch({ type: "activate", j: l.id }); sfx.tick(); }}
          >
            <Native j={l} className="ltab__native">{l.native}</Native>
            <span className="ltab__name">{l.language}</span>
            <span className="ltab__bar" aria-label={`${s.completes} of ${l.chapters.length} chapters`}>
              {l.chapters.map((c) => <span key={c.n} className={c.n <= s.completes ? "is-on" : ""} />)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
