import { Reveal, RevealLines } from "../components/Reveal";
import "./Telugu.css";

const FACTS = [
  { k: "Speakers", v: "~96 million", note: "Among the most spoken languages in the world." },
  { k: "Script", v: "Telugu abugida", note: "Rounded letterforms shaped by centuries of writing on palm leaf." },
  { k: "Age", v: "Inscriptions from ~400 CE", note: "One of India's six classical languages." },
  { k: "Home", v: "Andhra Pradesh & Telangana", note: "And a diaspora on every continent." },
];

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
                  For the first ROOTS adventure we&rsquo;re focusing on Telugu — giving children a playful
                  way to hear, understand and use the language while exploring the culture behind it.
                  Telugu isn&rsquo;t the first entry on a language list. It is the foundation of the
                  playable ROOTS experience, built with Telugu families, writers and artists.
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

    </>
  );
}
