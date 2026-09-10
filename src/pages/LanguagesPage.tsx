import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Footer } from "../sections/Footer";
import { Reveal, RevealLines } from "../components/Reveal";
import { LanguageGrid } from "../components/LanguageGrid";
import { useGame } from "../state/store";
import "./LanguagesPage.css";

export function LanguagesPage() {
  const { session } = useGame();
  const playTo = session.user ? "/app/play" : "/subscribe";

  return (
    <>
      <Nav />
      <main id="main">
        <section className="surface section grain langs-hero" data-surface="dark">
          <div className="container langs-hero__content">
            <Reveal><span className="eyebrow">Languages</span></Reveal>
            <RevealLines
              as="h1"
              className="display display--xl"
              lines={["One platform.", "Many languages.", <>Countless <em>family stories</em>.</>]}
            />
            <Reveal delay={0.15}>
              <p className="lede">
                Each language in ROOTS is a doorway into a different world — its own places, people,
                food, festivals and stories. They share a platform. They don&rsquo;t share a script.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="surface section grain" data-surface="dark" style={{ paddingTop: 0 }}>
          <div className="container">
            <LanguageGrid playTo={playTo} variant="full" />
          </div>
        </section>

        <section className="surface section grain" data-surface="paper">
          <div className="container langs-principle">
            <div className="section-head">
              <Reveal><span className="eyebrow">How we think about it</span></Reveal>
              <RevealLines className="display display--lg" lines={["A language is not", <>a <em>skin</em>.</>]} />
            </div>
            <div className="langs-principle__grid">
              {[
                { k: "Same platform", v: "Exploration, quests, contextual vocabulary, mini-games and the Heritage Journal are shared by every world." },
                { k: "Different worlds", v: "Characters, homes, architecture, clothing, food, music, folklore and festivals are built for each culture, not translated from one." },
                { k: "Room for difference", v: "Spanish will hold Mexican and Mexican-American journeys alongside other Spanish-speaking family stories. Chinese, Hindi and Arabic are built to carry regional experiences, not one flattened picture." },
                { k: "Telugu first", v: "We'd rather build one world properly than five approximately. Chapter One of the Telugu journey is playable today; the rest are in development." },
              ].map((p, i) => (
                <Reveal key={p.k} delay={i * 0.07} className="langs-principle__item">
                  <p className="langs-principle__k">{p.k}</p>
                  <p className="langs-principle__v">{p.v}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <div className="btn-row langs-principle__cta">
                <Link to={playTo} className="btn">
                  <span className="btn__label">{session.user ? "Play Telugu now" : "Start with Telugu"}</span>
                </Link>
                <Link to="/#game" className="btn btn--ghost"><span className="btn__label">See the game</span></Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
