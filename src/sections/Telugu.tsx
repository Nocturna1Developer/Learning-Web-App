import { Reveal, RevealLines } from "../components/Reveal";
import "./Telugu.css";

const FACTS = [
  { k: "Speakers", v: "~96 million", note: "Among the most spoken languages in the world." },
  { k: "Script", v: "Telugu abugida", note: "Rounded letterforms shaped by centuries of writing on palm leaf." },
  { k: "Age", v: "Inscriptions from ~400 CE", note: "One of India's six classical languages." },
  { k: "Home", v: "Andhra Pradesh & Telangana", note: "And a diaspora on every continent." },
];

const FUTURE = ["Tamil", "Bengali", "Punjabi", "Gujarati", "Marathi", "Malayalam", "Kannada", "Urdu"];

export function Telugu() {
  return (
    <>
      <section className="surface section grain telugu-sec" data-surface="paper">
        <div className="container">
          <div className="telugu-hero">
            <Reveal className="telugu-hero__mark">
              <span className="telugu-hero__script telugu">తెలుగు</span>
              <span className="telugu-hero__roman">Telugu</span>
            </Reveal>
            <div className="telugu-hero__copy">
              <Reveal><span className="eyebrow">Launch culture</span></Reveal>
              <RevealLines className="display display--xl" lines={["Our first journey", <>begins with <em>Telugu</em>.</>]} />
              <Reveal delay={0.15}>
                <p className="lede">
                  Not as a sample of &ldquo;Indian culture,&rdquo; but as itself — a specific language, a specific
                  coastline, specific festivals and a specific way of cooking a sour leaf. We&rsquo;re building
                  the first world with Telugu families, writers and artists, and we&rsquo;d rather do one
                  properly than six approximately.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="facts">
            {FACTS.map((f, i) => (
              <Reveal key={f.k} delay={i * 0.07} className="fact">
                <p className="fact__k">{f.k}</p>
                <p className="fact__v display display--md">{f.v}</p>
                <p className="fact__note">{f.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="surface section grain future" data-surface="dark">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <Reveal><span className="eyebrow">The platform</span></Reveal>
              <RevealLines className="display display--xl" lines={["One world.", <>Many <em>roots</em>.</>]} />
            </div>
            <Reveal delay={0.15}>
              <p className="lede">
                Our vision is for ROOTS to become a platform other heritage languages can live in.
                Each one would get its own world — its own stories, food, music and history — not a
                reskin of this one. We&rsquo;re not announcing dates for any of them yet.
              </p>
            </Reveal>
          </div>

          <div className="expansion">
            <Reveal className="expansion__now">
              <span className="expansion__status">In development</span>
              <span className="expansion__lang telugu">తెలుగు</span>
              <span className="expansion__name">Telugu</span>
              <span className="expansion__meta">Six chapters · first world</span>
            </Reveal>

            <div className="expansion__branches" aria-hidden="true">
              <svg viewBox="0 0 220 140" fill="none">
                <path d="M110 0 V44" stroke="var(--sun)" strokeWidth="1.6" />
                <path
                  d="M110 44 C110 78 62 74 40 112 M110 44 C110 78 158 74 180 112 M110 44 V140 M110 92 C110 108 84 108 72 128 M110 92 C110 108 136 108 148 128"
                  stroke="var(--line-strong)"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                />
                <circle cx="110" cy="44" r="2.6" fill="var(--sun)" />
              </svg>
            </div>

            <Reveal delay={0.1} className="expansion__future">
              <p className="expansion__future-label">Languages we hope to build next</p>
              <ul className="expansion__list">
                {FUTURE.map((l, i) => (
                  <li key={l} style={{ animationDelay: `${i * 0.06}s` }}>{l}</li>
                ))}
                <li className="expansion__more">and the ones families ask us for</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
