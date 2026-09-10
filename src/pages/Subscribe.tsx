import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Nav } from "../components/Nav";
import { Footer } from "../sections/Footer";
import { Reveal, RevealLines } from "../components/Reveal";
import { Button } from "../components/Button";
import { FestivalScene, KitchenScene } from "../components/scenes/Scenes";
import { useGame, type Plan } from "../state/store";
import { sfx } from "../lib/sfx";
import "./Subscribe.css";

const EASE = [0.16, 1, 0.3, 1] as const;

const PLANS: { id: Plan; name: string; price: string; per: string; note: string; best?: boolean }[] = [
  { id: "monthly", name: "Monthly", price: "$9.99", per: "per month", note: "Cancel any time." },
  { id: "yearly", name: "Yearly", price: "$79.99", per: "per year", note: "Two months free against monthly.", best: true },
];

const INCLUDED = [
  "The ROOTS game — Chapter One now, new chapters as they're released",
  "Contextual language learning woven through the world",
  "Every mini-game: Family Album, Memory Match, the Kitchen Quest and more",
  "The Heritage Journal — words, recipes, stories and family memories, kept",
  "Family activities that carry the game off the screen",
  "Every future language world, as it opens",
];

const UNLOCKS = [
  { k: "Chapters", v: "Six planned. One playable now." },
  { k: "Worlds", v: "Telugu first. Four more languages in development." },
  { k: "Journal", v: "Grows with every discovery, and with what your family adds." },
  { k: "Mini-games", v: "Replayable on their own terms." },
];

type Step = "choose" | "confirm" | "welcome";

export function Subscribe() {
  const { session, dispatch } = useGame();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<Plan>("yearly");
  const [step, setStep] = useState<Step>("choose");

  const choose = (p: Plan) => { setPlan(p); sfx.tick(); };
  const start = (p: Plan) => { setPlan(p); setStep("confirm"); sfx.interact(); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const confirm = () => { dispatch({ type: "subscribe", plan }); setStep("welcome"); sfx.fanfare(); };
  const enter = () => navigate(session.user ? "/app" : "/login", { state: { from: "/app" } });

  const chosen = PLANS.find((p) => p.id === plan)!;

  return (
    <>
      <Nav />
      <main id="main" className="subscribe">
        <AnimatePresence mode="wait">
          {step === "choose" && (
            <motion.div key="choose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5, ease: EASE }}>
              <section className="surface section grain sub-hero" data-surface="dark">
                <div className="sub-hero__scene" aria-hidden="true"><FestivalScene /><div className="sub-hero__grade" /></div>
                <div className="container sub-hero__content">
                  <Reveal><span className="eyebrow">ROOTS membership</span></Reveal>
                  <RevealLines as="h1" className="display display--xl" lines={["A world worth", <>coming <em>back to</em>.</>]} />
                  <Reveal delay={0.15}>
                    <p className="lede">
                      One membership opens the whole of ROOTS — every chapter as it&rsquo;s released, every
                      mini-game, the Heritage Journal, and every language world we build next.
                    </p>
                  </Reveal>
                </div>
              </section>

              <section className="surface section grain" data-surface="paper">
                <div className="container">
                  <div className="plans">
                    {PLANS.map((p, i) => (
                      <Reveal key={p.id} delay={i * 0.08} className="plan-wrap">
                        <article
                          className={`plan ${plan === p.id ? "is-selected" : ""} ${p.best ? "plan--best" : ""}`}
                          onMouseEnter={() => choose(p.id)}
                          onClick={() => choose(p.id)}
                        >
                          {p.best && <span className="plan__badge">Best value</span>}
                          <p className="plan__name">{p.name}</p>
                          <p className="plan__price">
                            <span className="plan__amount display">{p.price}</span>
                            <span className="plan__per">{p.per}</span>
                          </p>
                          <p className="plan__note">{p.note}</p>
                          <ul className="plan__list">
                            {INCLUDED.map((f) => <li key={f}>{f}</li>)}
                          </ul>
                          <Button onClick={() => start(p.id)} className="plan__cta">Start playing</Button>
                        </article>
                      </Reveal>
                    ))}
                  </div>
                  <Reveal delay={0.2}>
                    <p className="sub-fine">Pricing shown is for demonstration purposes. No payment is taken in this prototype.</p>
                  </Reveal>
                </div>
              </section>

              <section className="surface section grain" data-surface="leaf">
                <div className="container">
                  <div className="section-head section-head--split">
                    <div>
                      <Reveal><span className="eyebrow">What membership unlocks</span></Reveal>
                      <RevealLines className="display display--lg" lines={["Not a course.", <>A place that keeps <em>growing</em>.</>]} />
                    </div>
                    <Reveal delay={0.15}>
                      <p className="lede">
                        Members aren&rsquo;t buying lessons. They&rsquo;re joining a world that gets larger,
                        and a journal that only they and their family can fill.
                      </p>
                    </Reveal>
                  </div>
                  <div className="unlocks">
                    {UNLOCKS.map((u, i) => (
                      <Reveal key={u.k} delay={i * 0.07} className="unlock">
                        <p className="unlock__k">{u.k}</p>
                        <p className="unlock__v display display--md">{u.v}</p>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.section
              key="confirm"
              className="surface section grain sub-confirm"
              data-surface="dark"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="container sub-confirm__grid">
                <div className="sub-confirm__scene" aria-hidden="true"><KitchenScene /><div className="sub-confirm__grade" /></div>
                <div className="sub-confirm__card">
                  <span className="eyebrow">Confirm membership</span>
                  <h1 className="display display--lg">ROOTS {chosen.name}</h1>
                  <p className="sub-confirm__price">
                    <span className="display">{chosen.price}</span> <span>{chosen.per}</span>
                  </p>
                  <ul className="sub-confirm__list">
                    <li>Immediate access to Chapter One — <em>A Family Story</em></li>
                    <li>Every chapter and language world as it opens</li>
                    <li>The Heritage Journal, yours to keep</li>
                  </ul>
                  <div className="btn-row">
                    <Button onClick={confirm}>Confirm &amp; begin</Button>
                    <Button variant="ghost" onClick={() => setStep("choose")} arrow={false}>Back</Button>
                  </div>
                  <p className="sub-fine sub-fine--tight">Demo flow — nothing is charged. Pricing shown is for demonstration purposes.</p>
                </div>
              </div>
            </motion.section>
          )}

          {step === "welcome" && (
            <motion.section
              key="welcome"
              className="surface sub-welcome grain"
              data-surface="dark"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="sub-welcome__scene" aria-hidden="true"><FestivalScene /><div className="sub-welcome__grade" /></div>
              <div className="container sub-welcome__content">
                <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  Membership active · {chosen.name}
                </motion.span>
                <RevealLines as="h1" className="display display--xl" lines={["Welcome to", <><em>ROOTS</em>.</>]} delay={0.2} />
                <motion.p className="lede" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8, ease: EASE }}>
                  Your journey begins now. The first chapter is waiting at home — a normal one, with your
                  family&rsquo;s story quietly everywhere in it.
                </motion.p>
                <motion.div className="btn-row" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease: EASE }}>
                  <Button onClick={enter}>Enter ROOTS</Button>
                  <Link to="/" className="btn btn--ghost"><span className="btn__label">Back to site</span></Link>
                </motion.div>
                {!session.user && (
                  <motion.p className="sub-fine" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                    You&rsquo;ll be asked to log in with the demo account first.
                  </motion.p>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
      {step === "choose" && <Footer />}
    </>
  );
}
