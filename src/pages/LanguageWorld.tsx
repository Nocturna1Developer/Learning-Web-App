import { Link, Navigate, useParams } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Footer } from "../sections/Footer";
import { Reveal, RevealLines } from "../components/Reveal";
import { Button } from "../components/Button";
import { getJourney, journeyList } from "../journeys";
import { roomArt, type GameSpec } from "../journeys/types";
import { Native, renderSeg } from "../journeys/render";
import { LANGUAGES } from "../data/languages";
import { useGame } from "../state/store";
import "./LanguageWorld.css";

export function LanguageWorld() {
  const { id } = useParams();
  const j = getJourney(id);
  const { session, progress } = useGame();
  if (!j) return <Navigate to="/languages" replace />;

  const lang = LANGUAGES.find((l) => l.id === j.id)!;
  const playTo = session.user ? `/app/play/${j.id}` : "/subscribe";
  const allDone = new Set(j.chapter.beats.map((b) => b.id));
  const story = j.chapter.beats.map((b) => b.game).find((g): g is Extract<GameSpec, { type: "story" }> => g?.type === "story");
  const teller = story ? j.speakers[story.teller] : null;
  const games = j.chapter.beats.filter((b) => b.game && b.game.type !== "story").map((b) => b.game!.kicker.replace(/^Mini-game · /, ""));
  const name = progress.playerName;

  return (
    <>
      <Nav />
      <main id="main" className="world-page">
        {/* ---- hero: the world itself ---- */}
        <section className="surface wp-hero grain" data-surface="dark">
          <div className="wp-hero__scene" aria-hidden="true">{j.preview}</div>
          <div className="wp-hero__grade" aria-hidden="true" />
          <div className="container wp-hero__content">
            <Reveal><span className="eyebrow">Languages · {j.variety}</span></Reveal>
            <Reveal delay={0.05}><Native j={j} className="wp-hero__native">{j.native}</Native></Reveal>
            <RevealLines as="h1" className="display display--xl" lines={[j.language, <><em>{j.chapterName}</em></>]} delay={0.1} />
            <Reveal delay={0.2}><p className="lede">{j.synopsis}</p></Reveal>
            <Reveal delay={0.3}>
              <div className="btn-row">
                <Button to={playTo}>Play Chapter One</Button>
                <Button to="/languages" variant="ghost">All languages</Button>
              </div>
            </Reveal>
            <Reveal delay={0.35}><p className="wp-hero__meta">{j.family} · {j.words.length} words · {j.chapter.beats.length} quests · {games.length} mini-games{story ? " · 1 story" : ""}</p></Reveal>
          </div>
        </section>

        {/* ---- the home ---- */}
        <section className="surface section grain" data-surface="paper">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <Reveal><span className="eyebrow">The home</span></Reveal>
                <RevealLines className="display display--lg" lines={["Chapter One happens", <>in <em>{Object.keys(j.rooms).length} rooms</em>.</>]} />
              </div>
              <Reveal delay={0.15}>
                <p className="lede">An ordinary American home, with a family's story in everything — the objects, the food, the way people talk to each other.</p>
              </Reveal>
            </div>
            <div className="wp-rooms">
              {Object.values(j.rooms).map((r, i) => {
                const roomWords = r.hotspots.filter((h) => h.kind === "word").map((h) => j.words.find((w) => w.id === h.wordId)!);
                return (
                  <Reveal key={r.id} delay={i * 0.08} className="wp-room">
                    <div className="wp-room__art">{roomArt(r, allDone)}</div>
                    <div className="wp-room__body">
                      <p className="wp-room__name"><Native j={j} className="wp-room__native">{r.native}</Native> <span>{r.name}</span></p>
                      <p className="wp-room__words">
                        {roomWords.map((w, k) => <span key={w.id}>{k > 0 && " · "}<Native j={j}>{w.native}</Native></span>)}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---- the story ---- */}
        {story && teller && (
          <section className="surface section grain" data-surface="dark">
            <div className="container">
              <div className="section-head section-head--split">
                <div>
                  <Reveal><span className="eyebrow">A story from {teller.name}</span></Reveal>
                  <RevealLines className="display display--lg" lines={[story.title, <Native j={j} key="n">{story.native}</Native>]} />
                </div>
                <Reveal delay={0.15}>
                  <p className="lede">
                    Every first chapter ends with an elder telling a story — mostly in English, with the words that matter in {j.language}, the
                    way these stories really get told at home. Here's how this one starts.
                  </p>
                </Reveal>
              </div>
              <div className="wp-story">
                {story.panels.slice(0, 2).map((p, i) => (
                  <Reveal key={i} delay={i * 0.1} className="wp-story__panel">
                    <div className="wp-story__art">{p.art}</div>
                    <p className="wp-story__text">{renderSeg(p.text, j, name)}</p>
                  </Reveal>
                ))}
                <Reveal delay={0.2} className="wp-story__panel wp-story__more">
                  <p className="display display--md">…and the rest, {teller.name} tells you in the game.</p>
                  <Link to={playTo} className="inline-link">Hear the whole story →</Link>
                </Reveal>
              </div>
            </div>
          </section>
        )}

        {/* ---- words + the moment ---- */}
        <section className="surface section grain" data-surface="leaf">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <Reveal><span className="eyebrow">Words you'll hear</span></Reveal>
                <RevealLines className="display display--lg" lines={[`${j.words.length} words.`, <>No <em>flashcards</em>.</>]} />
              </div>
              <Reveal delay={0.15}>
                <p className="lede">Each one turns up in context — on a shelf, in a question, in someone's hands. The English fades each time you meet it again.</p>
              </Reveal>
            </div>
            <div className="wp-words">
              {j.words.map((w, i) => (
                <Reveal key={w.id} delay={(i % 6) * 0.04} className="wp-word">
                  <Native j={j} className="wp-word__native">{w.native}</Native>
                  {j.romanize && <span className="wp-word__roman">{w.roman}</span>}
                  <span className="wp-word__en">{w.english}</span>
                </Reveal>
              ))}
            </div>
            <Reveal className="wp-moment">
              <p className="eyebrow">The moment</p>
              <Native j={j} className="wp-moment__native">{j.highlight.native}</Native>
              {j.romanize && j.highlight.roman && <p className="wp-moment__roman">{j.highlight.roman}</p>}
              <p className="wp-moment__context">“{j.highlight.english}” — {j.highlight.context}</p>
            </Reveal>
          </div>
        </section>

        {/* ---- the journey ahead ---- */}
        <section className="surface section grain" data-surface="dark">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <Reveal><span className="eyebrow">The journey ahead</span></Reveal>
                <RevealLines className="display display--lg" lines={["Six chapters.", <>One is <em>ready</em>.</>]} />
              </div>
              <Reveal delay={0.15}>
                <p className="lede">Chapter One is playable now. The rest are being built — each a new place with new people and new reasons to speak.</p>
              </Reveal>
            </div>
            <ol className="wp-chapters">
              {j.chapters.map((c, i) => (
                <Reveal key={c.n} delay={i * 0.05} className={`wp-chapter ${c.available ? "is-live" : ""}`}>
                  <span className="wp-chapter__n">{c.n}</span>
                  <div>
                    <p className="wp-chapter__name">{c.name} <Native j={j} className="wp-chapter__native">{c.native !== c.name ? c.native : ""}</Native></p>
                    <p className="wp-chapter__sub">{c.subtitle} — {c.body}</p>
                  </div>
                  <span className="wp-chapter__status">{c.available ? "Available now" : "Coming soon"}</span>
                </Reveal>
              ))}
            </ol>
            <Reveal className="wp-future">
              <p className="eyebrow">More {j.language} worlds to come</p>
              <ul>{lang.journeys.map((x) => <li key={x}>{x}</li>)}</ul>
              <p className="body">{j.family} is one {j.language}-speaking family among many. Future journeys will be their own worlds, not reskins of this one.</p>
            </Reveal>
          </div>
        </section>

        {/* ---- other worlds ---- */}
        <section className="surface section grain" data-surface="paper">
          <div className="container">
            <Reveal><span className="eyebrow">Other worlds</span></Reveal>
            <div className="wp-others">
              {journeyList().filter((o) => o.id !== j.id).map((o) => (
                <Link key={o.id} to={`/languages/${o.id}`} className="wp-other">
                  <div className="wp-other__art">{o.preview}</div>
                  <Native j={o} className="wp-other__native">{o.native}</Native>
                  <span className="wp-other__name">{o.language} · {o.chapterName}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
