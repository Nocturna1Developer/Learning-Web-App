import { Link, Navigate, useParams } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Footer } from "../sections/Footer";
import { Reveal, RevealLines } from "../components/Reveal";
import { Button } from "../components/Button";
import { getLanguage, isPlayable, languageList, playableCount } from "../journeys";
import type { GameSpec } from "../journeys/types";
import { Native, renderSeg, useChapter, ChapterArt } from "../journeys/render";
import { useGame } from "../state/store";
import "./LanguageWorld.css";

type StorySpec = Extract<GameSpec, { type: "story" }>;

export function LanguageWorld() {
  const { id } = useParams();
  const l = getLanguage(id);
  const { session, progress } = useGame();
  // The elder's story usually lives in chapter five; chapter one has one in most worlds too.
  const c5 = useChapter(l?.id ?? "", l && isPlayable(l.id, 5) ? 5 : 0);
  const c1 = useChapter(l?.id ?? "", l ? 1 : 0);
  if (!l) return <Navigate to="/languages" replace />;

  const findStory = (c: typeof c1) => c?.script.beats.map((b) => b.game).find((g): g is StorySpec => g?.type === "story");
  const story = findStory(c5) ?? findStory(c1);
  const storyContent = findStory(c5) ? c5 : c1;
  const speakers = { ...l.speakers, ...storyContent?.speakers };
  const teller = story ? speakers[story.teller] : null;
  const playTo = session.user ? `/app/play/${l.id}` : "/subscribe";
  const playable = playableCount(l.id);
  const name = progress.playerName;
  const sample = l.words.filter((_, i) => i % Math.max(1, Math.floor(l.words.length / 18)) === 0).slice(0, 18);

  return (
    <>
      <Nav />
      <main id="main" className="world-page">
        {/* ---- hero: the world itself ---- */}
        <section className="surface wp-hero grain" data-surface="dark">
          <div className="wp-hero__scene" aria-hidden="true"><ChapterArt l={l} n={l.cover ?? 1} /></div>
          <div className="wp-hero__grade" aria-hidden="true" />
          <div className="container wp-hero__content">
            <Reveal><span className="eyebrow">{l.rank ? `#${l.rank} most spoken · ` : ""}{l.variety}</span></Reveal>
            <Reveal delay={0.05}><Native j={l} className="wp-hero__native">{l.native}</Native></Reveal>
            <RevealLines as="h1" className="display display--xl" lines={[l.language, <><em>{l.family}</em></>]} delay={0.1} />
            <Reveal delay={0.2}><p className="lede">{l.line}</p></Reveal>
            <Reveal delay={0.3}>
              <div className="btn-row">
                <Button to={playTo}>Play Chapter One</Button>
                <Button to="/languages" variant="ghost">All languages</Button>
              </div>
            </Reveal>
            <Reveal delay={0.35}><p className="wp-hero__meta">{playable} of {l.chapters.length} chapters playable · {l.words.length} words · every chapter its own place</p></Reveal>
          </div>
        </section>

        {/* ---- the chapters ---- */}
        <section className="surface section grain" data-surface="paper">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <Reveal><span className="eyebrow">The journey</span></Reveal>
                <RevealLines className="display display--lg" lines={["Six chapters.", <>One <em>journey</em>.</>]} />
              </div>
              <Reveal delay={0.15}>
                <p className="lede">It starts in an ordinary American home and travels outward. Each chapter opens when you finish the one before it.</p>
              </Reveal>
            </div>
            <ol className="wp-gallery">
              {l.chapters.map((c, i) => (
                <Reveal key={c.n} delay={(i % 3) * 0.08} className={`wp-ch ${isPlayable(l.id, c.n) ? "is-live" : ""}`}>
                  <div className="wp-ch__art">{isPlayable(l.id, c.n) ? <ChapterArt l={l} n={c.n} /> : <div className="wp-ch__soon">Coming soon</div>}</div>
                  <div className="wp-ch__body">
                    <p className="wp-ch__n">Chapter {c.n} · <Native j={l} className="wp-ch__native">{c.native}</Native></p>
                    <p className="wp-ch__name">{c.name}</p>
                    <p className="wp-ch__sub">{c.subtitle}</p>
                    <p className="wp-ch__syn">{c.synopsis}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ---- the story ---- */}
        {story && teller && (
          <section className="surface section grain" data-surface="dark">
            <div className="container">
              <div className="section-head section-head--split">
                <div>
                  <Reveal><span className="eyebrow">A story from {teller.name}</span></Reveal>
                  <RevealLines className="display display--lg" lines={[story.title, <Native j={l} key="n">{story.native}</Native>]} />
                </div>
                <Reveal delay={0.15}>
                  <p className="lede">
                    Stories are told mostly in English, with the words that matter in {l.language} — the way they really get told at
                    home. Here's how this one starts.
                  </p>
                </Reveal>
              </div>
              <div className="wp-story">
                {story.panels.slice(0, 2).map((p, i) => (
                  <Reveal key={i} delay={i * 0.1} className="wp-story__panel">
                    <div className="wp-story__art">{p.art}</div>
                    <p className="wp-story__text">{renderSeg(p.text, l, name)}</p>
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
                <RevealLines className="display display--lg" lines={[`${l.words.length} words.`, <>No <em>flashcards</em>.</>]} />
              </div>
              <Reveal delay={0.15}>
                <p className="lede">Each one turns up in context — on a shelf, at a market stall, in someone's question. The English fades each time you meet it again. A few of them:</p>
              </Reveal>
            </div>
            <div className="wp-words">
              {sample.map((w, i) => (
                <Reveal key={w.id} delay={(i % 6) * 0.04} className="wp-word">
                  <Native j={l} className="wp-word__native">{w.native}</Native>
                  {l.romanize && <span className="wp-word__roman">{w.roman}</span>}
                  <span className="wp-word__en">{w.english} · ch. {w.ch}</span>
                </Reveal>
              ))}
            </div>
            <Reveal className="wp-moment">
              <p className="eyebrow">The moment</p>
              <Native j={l} className="wp-moment__native">{l.highlight.native}</Native>
              {l.romanize && l.highlight.roman && <p className="wp-moment__roman">{l.highlight.roman}</p>}
              <p className="wp-moment__context">“{l.highlight.english}” — {l.highlight.context}</p>
            </Reveal>
          </div>
        </section>

        {/* ---- future journeys within this language ---- */}
        <section className="surface section grain" data-surface="dark">
          <div className="container">
            <Reveal className="wp-future">
              <p className="eyebrow">More {l.language} worlds to come</p>
              <ul>{l.journeys.map((x) => <li key={x}>{x}</li>)}</ul>
              <p className="body">{l.family} is one {l.language}-speaking family among many. Future journeys will be their own worlds, not reskins of this one.</p>
            </Reveal>
          </div>
        </section>

        {/* ---- other worlds ---- */}
        <section className="surface section grain" data-surface="paper">
          <div className="container">
            <Reveal><span className="eyebrow">Other worlds</span></Reveal>
            <div className="wp-others">
              {languageList().filter((o) => o.id !== l.id).map((o) => (
                <Link key={o.id} to={`/languages/${o.id}`} className="wp-other">
                  <div className="wp-other__art"><ChapterArt l={o} n={o.cover ?? 1} /></div>
                  <Native j={o} className="wp-other__native">{o.native}</Native>
                  <span className="wp-other__name">{o.language}</span>
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
