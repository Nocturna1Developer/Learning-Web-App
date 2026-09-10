import { useEffect, useMemo, useState } from "react";
import type { Word } from "../../data/vocabulary";
import { sfx } from "../../lib/sfx";

type Card = { key: string; wordId: string; face: "telugu" | "english"; word: Word };

type Props = {
  words: Word[];
  /** 0..1 — how much English to show on the English faces (roman + meaning vs meaning only) */
  support: (wordId: string) => number;
  onComplete: (bestCombo: number, moves: number) => void;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Memory Match — pairs of Telugu script ↔ meaning. Six pairs, twelve cards.
 * Matching runs a combo; the combo is the reward, not a grade.
 */
export function MemoryMatch({ words, support, onComplete }: Props) {
  const cards = useMemo<Card[]>(() => {
    const picked = words.slice(0, 6);
    return shuffle(picked.flatMap((w) => [
      { key: `${w.id}-t`, wordId: w.id, face: "telugu" as const, word: w },
      { key: `${w.id}-e`, wordId: w.id, face: "english" as const, word: w },
    ]));
  }, [words]);

  const [up, setUp] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string[]>([]);
  const [combo, setCombo] = useState(0);
  const [best, setBest] = useState(0);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const done = matched.size === cards.length;

  useEffect(() => {
    if (!done) return;
    sfx.fanfare();
    const t = setTimeout(() => onComplete(best, moves), 1400);
    return () => clearTimeout(t);
  }, [done, best, moves, onComplete]);

  const flip = (card: Card) => {
    if (lock || matched.has(card.key) || up.includes(card.key)) return;
    sfx.flip();
    const next = [...up, card.key];
    setUp(next);
    if (next.length < 2) return;

    setMoves((m) => m + 1);
    const [a, b] = next.map((k) => cards.find((c) => c.key === k)!);
    if (a.wordId === b.wordId) {
      const c = combo + 1;
      setCombo(c);
      setBest((bst) => Math.max(bst, c));
      sfx.match(c);
      setMatched((m) => new Set([...m, a.key, b.key]));
      setUp([]);
    } else {
      setLock(true);
      setCombo(0);
      setTimeout(() => {
        sfx.miss();
        setWrong(next);
        setTimeout(() => { setWrong([]); setUp([]); setLock(false); }, 420);
      }, 500);
    }
  };

  return (
    <div className="mg" role="dialog" aria-labelledby="mm-title">
      <div className="mg__panel">
        <div className="mg__head">
          <div>
            <p className="mg__k">Mini-game · Amma&rsquo;s memory game</p>
            <h2 className="mg__title" id="mm-title">Match the word to what it means.</h2>
            <p className="mg__hint">Turn two cards. A Telugu word and its meaning belong together. Matches in a row build a combo.</p>
          </div>
          <div className="mg__score">
            <span>Moves <strong>{moves}</strong></span>
            <span>Combo <strong className={combo > 1 ? "mg__combo" : ""} key={combo}>×{combo}</strong></span>
            <span>Best <strong>×{best}</strong></span>
          </div>
        </div>

        <div className="mcards">
          {cards.map((c) => {
            const isUp = up.includes(c.key) || matched.has(c.key);
            const s = support(c.wordId);
            return (
              <button
                key={c.key}
                className={`mcard ${isUp ? "is-up" : ""} ${matched.has(c.key) ? "is-matched" : ""} ${wrong.includes(c.key) ? "is-wrong" : ""}`}
                onClick={() => flip(c)}
                aria-label={isUp ? (c.face === "telugu" ? c.word.roman : c.word.english) : "Face-down card"}
                aria-pressed={isUp}
              >
                <div className="mcard__inner">
                  <div className="mcard__face mcard__back" />
                  <div className={`mcard__face mcard__front ${c.face === "telugu" ? "mcard__front--telugu" : "mcard__front--english"}`}>
                    {c.face === "telugu" ? (
                      <span>{c.word.telugu}</span>
                    ) : (
                      <span>
                        {c.word.english.split(" · ")[0]}
                        {s > 0.4 && <small>{c.word.roman}</small>}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mg__foot">
          <p className="mg__hint">{done ? "All matched. Amma is impressed." : `${matched.size / 2} of ${cards.length / 2} pairs`}</p>
        </div>
      </div>
    </div>
  );
}
