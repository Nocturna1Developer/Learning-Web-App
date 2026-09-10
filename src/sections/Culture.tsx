import { useState, type ReactNode } from "react";
import { Reveal, RevealLines } from "../components/Reveal";
import { GonguraArt, SankrantiArt, KeertanaArt, IkatArt, TenaliArt, PerantamArt } from "./CultureArt";
import "./Culture.css";

type Entry = {
  key: string;
  cat: string;
  telugu: string;
  roman: string;
  title: string;
  story: string;
  art: ReactNode;
};

const ENTRIES: Entry[] = [
  {
    key: "food",
    cat: "Food",
    telugu: "గోంగూర",
    roman: "gongura",
    title: "The leaf that tastes like home",
    story:
      "A sour red-stemmed sorrel that grows through Telangana and Andhra summers. Pounded with garlic and chilli into a pachadi so identified with the region that families abroad grow it in pots on balconies just to have it.",
    art: <GonguraArt />,
  },
  {
    key: "festivals",
    cat: "Festivals",
    telugu: "సంక్రాంతి",
    roman: "Sankranti",
    title: "Four days that turn the year",
    story:
      "The harvest festival that marks the sun's turn north. Doorsteps are chalked before dawn, old things are burnt, cattle are painted and honoured, and the sky fills with kites for as long as the light holds.",
    art: <SankrantiArt />,
  },
  {
    key: "music",
    cat: "Music",
    telugu: "కీర్తన",
    roman: "keertana",
    title: "Devotion set to a beat you can count",
    story:
      "The Telugu keertana shaped much of what became Carnatic music. Annamacharya alone left around thirty-two thousand of them, copper plates of verse found walled up in a temple centuries after his death.",
    art: <KeertanaArt />,
  },
  {
    key: "clothing",
    cat: "Clothing",
    telugu: "పోచంపల్లి",
    roman: "Pochampally",
    title: "A pattern dyed before it is woven",
    story:
      "Ikat from the town of Bhoodan Pochampally: the threads are tied and dyed to the design before a single one goes on the loom, so the finished geometry always carries a soft feathered edge.",
    art: <IkatArt />,
  },
  {
    key: "folklore",
    cat: "Folklore",
    telugu: "తెనాలి రామ",
    roman: "Tenali Rama",
    title: "The court poet who outwitted everyone",
    story:
      "Jester and scholar in the court of Krishnadevaraya, and the hero of hundreds of stories where cleverness beats authority. Most Telugu children meet him long before they meet a history book.",
    art: <TenaliArt />,
  },
  {
    key: "family",
    cat: "Family",
    telugu: "పేరంటం",
    roman: "perantam",
    title: "The invitation that is its own ritual",
    story:
      "Women of the household invite neighbours in for turmeric, kumkum, flowers and small gifts. It looks like hospitality; it functions as the social fabric that holds a street together.",
    art: <PerantamArt />,
  },
];

export function Culture() {
  const [active, setActive] = useState(0);
  const e = ENTRIES[active];

  return (
    <section className="surface section grain" data-surface="paper">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal><span className="eyebrow">Culture</span></Reveal>
            <RevealLines className="display display--xl" lines={["Every tradition", <>has a <em>story</em>.</>]} />
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              Nothing in ROOTS is decoration. Each object, dish and ritual in the world comes with
              the reason it exists — researched, and reviewed with Telugu families.
            </p>
          </Reveal>
        </div>

        <div className="culture">
          <ul className="culture__list" role="tablist" aria-label="Cultural entries">
            {ENTRIES.map((entry, i) => (
              <li key={entry.key}>
                <button
                  role="tab"
                  aria-selected={i === active}
                  className={`culture__item ${i === active ? "is-active" : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="culture__cat">{entry.cat}</span>
                  <span className="culture__name telugu">{entry.telugu}</span>
                  <span className="culture__roman">{entry.roman}</span>
                  <svg className="culture__arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <div className="culture__panel" aria-live="polite">
            <div className="culture__plate" key={e.key}>
              {e.art}
              <div className="culture__plate-veil" />
              <span className="culture__plate-telugu telugu">{e.telugu}</span>
            </div>
            <div className="culture__copy" key={`${e.key}-copy`}>
              <p className="label culture__panel-cat">{e.cat}</p>
              <h3 className="display display--lg">{e.title}</h3>
              <p className="body">{e.story}</p>
              <p className="culture__note">Appears in the Heritage Journal once discovered in-game.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
