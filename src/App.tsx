import { Nav } from "./components/Nav";
import { Hero } from "./sections/Hero";
import { Problem } from "./sections/Problem";
import { Solution } from "./sections/Solution";
import { Gameplay } from "./sections/Gameplay";
import { World } from "./sections/World";
import { Language } from "./sections/Language";
import { MiniGames } from "./sections/MiniGames";
import { Culture } from "./sections/Culture";
import { Journal } from "./sections/Journal";
import { Family } from "./sections/Family";
import { Telugu } from "./sections/Telugu";
import { Cta } from "./sections/Cta";
import { Footer } from "./sections/Footer";

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <Solution />
        <Gameplay />
        <World />
        <Language />
        <MiniGames />
        <Culture />
        <Journal />
        <Family />
        <Telugu />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
