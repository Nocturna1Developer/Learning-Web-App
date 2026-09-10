import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Hero } from "../sections/Hero";
import { Problem } from "../sections/Problem";
import { Solution } from "../sections/Solution";
import { Gameplay } from "../sections/Gameplay";
import { Chapters } from "../sections/Chapters";
import { World } from "../sections/World";
import { Language } from "../sections/Language";
import { MiniGames } from "../sections/MiniGames";
import { Telugu } from "../sections/Telugu";
import { Culture } from "../sections/Culture";
import { Journal } from "../sections/Journal";
import { Family } from "../sections/Family";
import { Pricing } from "../sections/Pricing";
import { Cta } from "../sections/Cta";
import { Footer } from "../sections/Footer";
import { Reveal, RevealLines } from "../components/Reveal";
import { LanguageGrid } from "../components/LanguageGrid";
import { useGame } from "../state/store";

function LanguagesSection() {
  const { session } = useGame();
  return (
    <section className="surface section grain" data-surface="dark" id="languages">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal><span className="eyebrow">Languages</span></Reveal>
            <RevealLines className="display display--xl" lines={["Many languages.", <>One <em>connection</em>.</>]} />
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              Each language is a doorway into a different cultural world — not a translation of the
              same game. Telugu is playable now; four more worlds are in development.{" "}
              <Link to="/languages" className="inline-link">See how we think about it →</Link>
            </p>
          </Reveal>
        </div>
        <LanguageGrid playTo={session.user ? "/app/play" : "/subscribe"} />
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <Solution />
        <Gameplay />
        <Chapters />
        <LanguagesSection />
        <MiniGames />
        <World />
        <Language />
        <Telugu />
        <Culture />
        <Journal />
        <Family />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
