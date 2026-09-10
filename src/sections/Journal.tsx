import { useState } from "react";
import { Reveal, RevealLines } from "../components/Reveal";
import "./Journal.css";

type Card = { title: string; sub: string; telugu?: string; note: string; kind: string };

const TABS: { key: string; label: string; count: string; cards: Card[] }[] = [
  {
    key: "language",
    label: "Language",
    count: "147 words",
    cards: [
      { kind: "Word", telugu: "నీళ్ళు", title: "neellu", sub: "water", note: "First heard at the village well, chapter one." },
      { kind: "Phrase", telugu: "ఎలా ఉన్నావు?", title: "elaa unnaavu?", sub: "how are you?", note: "Used 23 times. No translation needed any more." },
      { kind: "Word", telugu: "అమ్మమ్మ", title: "ammamma", sub: "mother's mother", note: "Unlocked the family tree." },
    ],
  },
  {
    key: "culture",
    label: "Culture",
    count: "38 traditions",
    cards: [
      { kind: "Tradition", telugu: "ముగ్గు", title: "Muggu", sub: "doorstep drawing", note: "Drawn before sunrise so the day starts welcomed." },
      { kind: "Object", telugu: "గంగాళం", title: "Gangaalam", sub: "brass vessel", note: "Found in the kitchen. Belonged to three generations." },
      { kind: "Festival", telugu: "బోగి", title: "Bhogi", sub: "day one of Sankranti", note: "The bonfire for what the year is done with." },
    ],
  },
  {
    key: "stories",
    label: "Stories",
    count: "12 tales",
    cards: [
      { kind: "Folk tale", title: "The Cat and the Cream", sub: "Tenali Rama", note: "Heard under the banyan tree, told by the storyteller." },
      { kind: "Legend", title: "Why the crow is fed first", sub: "village belief", note: "Collected in chapter five." },
      { kind: "Song", telugu: "జోల పాట", title: "Jola paata", sub: "lullaby", note: "Recorded by a family member." },
    ],
  },
  {
    key: "memories",
    label: "Memories",
    count: "9 from family",
    cards: [
      { kind: "Voice note", title: "Ammamma's gongura", sub: "3:42 · recorded by family", note: "\"Don't add the garlic until the very end.\"" },
      { kind: "Photograph", title: "The house in Guntur", sub: "1974 · added by Dad", note: "The doorway is the one in chapter one." },
      { kind: "Recipe", title: "Pulihora, our way", sub: "written by Amma", note: "Now playable as a cooking level." },
    ],
  },
];

export function Journal() {
  const [tab, setTab] = useState(0);
  const t = TABS[tab];

  return (
    <section className="surface section grain" data-surface="leaf">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal><span className="eyebrow">Heritage Journal</span></Reveal>
            <RevealLines className="display display--xl" lines={["Build a collection of", <>where you <em>come from</em>.</>]} />
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              Everything a player finds is kept. The journal grows into something a child can
              scroll back through years later — part save file, part family archive.
            </p>
          </Reveal>
        </div>

        <Reveal amount={0.1}>
          <div className="journal">
            <div className="journal__chrome">
              <div className="journal__tabs" role="tablist" aria-label="Journal categories">
                {TABS.map((tb, i) => (
                  <button
                    key={tb.key}
                    role="tab"
                    aria-selected={i === tab}
                    className={`journal__tab ${i === tab ? "is-active" : ""}`}
                    onClick={() => setTab(i)}
                  >
                    {tb.label}
                    <span className="journal__tab-count">{tb.count}</span>
                  </button>
                ))}
              </div>
              <span className="journal__owner">Maya&rsquo;s journal · Chapter 4</span>
            </div>

            <div className="journal__grid" key={t.key}>
              {t.cards.map((c, i) => (
                <article className="jcard" key={c.title} style={{ animationDelay: `${i * 0.08}s` }}>
                  <span className="jcard__kind">{c.kind}</span>
                  {c.telugu && <p className="jcard__telugu telugu">{c.telugu}</p>}
                  <p className="jcard__title">{c.title}</p>
                  <p className="jcard__sub">{c.sub}</p>
                  <p className="jcard__note">{c.note}</p>
                </article>
              ))}
              <article className="jcard jcard--locked" style={{ animationDelay: `${t.cards.length * 0.08}s` }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>
                <p className="jcard__title">Not yet discovered</p>
                <p className="jcard__note">Keep going.</p>
              </article>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
