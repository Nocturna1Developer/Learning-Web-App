import { useEffect, useState } from "react";
import { Figure } from "../../components/scenes/primitives";
import { wordById } from "../../data/vocabulary";
import { sfx } from "../../lib/sfx";

type Member = { wordId: string; who: string; hint: string; pose: "stand" | "sit"; tint: string };

const MEMBERS: Member[] = [
  { wordId: "amma", who: "Amma", hint: "Mother. On the phone in the living room right now.", pose: "stand", tint: "#c8704a" },
  { wordId: "nanna", who: "Nanna", hint: "Father. Asleep in front of a film, most Sundays.", pose: "stand", tint: "#3f7d55" },
  { wordId: "ammamma", who: "Ammamma", hint: "Amma's mother. Her lamp is in the hallway.", pose: "sit", tint: "#d9a441" },
  { wordId: "tatayya", who: "Tatayya", hint: "Grandfather. Circled every festival on the calendar.", pose: "sit", tint: "#7a3a8a" },
];

type Props = {
  support: (wordId: string) => number;
  onDiscover: (wordId: string) => void;
  onComplete: () => void;
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
 * Family Album — four loose photographs, four labelled slots. Pick a photo,
 * then the slot whose Telugu name it belongs under. Every correct placement
 * lands that family word in the journal.
 */
export function FamilyAlbum({ support, onDiscover, onComplete }: Props) {
  const [slots] = useState(() => shuffle(MEMBERS));
  const [photos] = useState(() => shuffle(MEMBERS));
  const [selected, setSelected] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);
  const done = placed.size === MEMBERS.length;

  useEffect(() => {
    if (!done) return;
    sfx.fanfare();
    const t = setTimeout(onComplete, 1500);
    return () => clearTimeout(t);
  }, [done, onComplete]);

  const pick = (id: string) => {
    if (placed.has(id)) return;
    setSelected((s) => (s === id ? null : id));
    sfx.flip();
  };

  const drop = (slotId: string) => {
    if (!selected || placed.has(slotId)) return;
    if (selected === slotId) {
      setPlaced((p) => new Set([...p, slotId]));
      onDiscover(slotId);
      sfx.match(placed.size + 1);
      setSelected(null);
    } else {
      sfx.miss();
      setWrong(slotId);
      setTimeout(() => setWrong(null), 450);
    }
  };

  return (
    <div className="mg" role="dialog" aria-labelledby="fa-title">
      <div className="mg__panel">
        <div className="mg__head">
          <div>
            <p className="mg__k">Mini-game · The family album</p>
            <h2 className="mg__title" id="fa-title">Put everyone back where they belong.</h2>
            <p className="mg__hint">
              The photos fell out. Pick one, then the page it belongs on. The pages are labelled in Telugu —
              you&rsquo;ve met two of these words in the hallway already.
            </p>
          </div>
          <div className="mg__score"><span>Placed <strong>{placed.size} / {MEMBERS.length}</strong></span></div>
        </div>

        <div className="album">
          <div className="album__book" aria-label="Album pages">
            {slots.map((m) => {
              const w = wordById(m.wordId);
              const s = support(m.wordId);
              const filled = placed.has(m.wordId);
              return (
                <button
                  key={m.wordId}
                  className={`slot ${selected && !filled ? "is-target" : ""} ${filled ? "is-filled" : ""} ${wrong === m.wordId ? "is-wrong" : ""}`}
                  onClick={() => drop(m.wordId)}
                  disabled={filled}
                  aria-label={`Page for ${w.roman}${filled ? ", filled" : ""}`}
                >
                  <div className="slot__photo" style={{ background: filled ? `color-mix(in srgb, ${m.tint} 35%, #d8c9a8)` : undefined }}>
                    {filled && (
                      <svg viewBox="0 0 100 80" aria-hidden="true">
                        <Figure x={50} y={80} h={70} color="#2a1a12" pose={m.pose} />
                      </svg>
                    )}
                  </div>
                  <span className="slot__telugu">{w.telugu}</span>
                  <span className="slot__roman">{w.roman}</span>
                  <span className="slot__english" style={{ opacity: filled ? 1 : 0.15 + s * 0.85 }}>{w.english.split(" (")[0]}</span>
                </button>
              );
            })}
          </div>

          <div className="album__tray">
            <p className="album__tray-k">Loose photographs</p>
            {photos.map((m) => (
              <button
                key={m.wordId}
                className={`photo ${selected === m.wordId ? "is-selected" : ""} ${placed.has(m.wordId) ? "is-placed" : ""}`}
                onClick={() => pick(m.wordId)}
                aria-pressed={selected === m.wordId}
              >
                <span className="photo__thumb" style={{ background: `color-mix(in srgb, ${m.tint} 35%, #d8c9a8)` }}>
                  <svg viewBox="0 0 100 80" aria-hidden="true"><Figure x={50} y={80} h={70} color="#2a1a12" pose={m.pose} /></svg>
                </span>
                <span>
                  <span className="photo__who">{m.who}</span>
                  <br />
                  <span className="photo__hint">{m.hint}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mg__foot">
          <p className="mg__hint">{done ? "Four generations, one shelf. The album is whole again." : selected ? "Now choose the page." : "Choose a photograph."}</p>
        </div>
      </div>
    </div>
  );
}
