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
  const worldTo = (id: string) => `/languages/${id}`;

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
            <LanguageGrid hrefFor={worldTo} cta="Explore this world" variant="full" />
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
                { k: "Room for difference", v: "Spanish starts with one Mexican-American family and is built to hold other Spanish-speaking family stories beside it. Chinese, Hindi and Arabic are built for regional worlds, not one flattened picture — the first Arabic journey is Levantine on purpose." },
                { k: "Five first chapters", v: "Each was written for its own family — a Telugu home, a Mexican-American ofrenda, a Mandarin New Year's Eve, a grandmother's visit from Lucknow, a Levantine Sunday lunch. Every Chapter One is playable today; the chapters after them are being built." },
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
                  <span className="btn__label">{session.user ? "Choose a journey" : "Start your journey"}</span>
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
