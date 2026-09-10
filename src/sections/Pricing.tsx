import { Link } from "react-router-dom";
import { Reveal, RevealLines } from "../components/Reveal";
import "./Pricing.css";

const PLANS = [
  { id: "monthly", name: "Monthly", price: "$9.99", per: "/ month", note: "Cancel any time." },
  { id: "yearly", name: "Yearly", price: "$79.99", per: "/ year", note: "Two months free.", best: true },
];

const INCLUDED = ["The ROOTS game", "Every available chapter", "Contextual language learning", "All mini-games", "The Heritage Journal", "New content as it's released"];

export function Pricing() {
  return (
    <section className="surface section grain" data-surface="paper" id="membership">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal><span className="eyebrow">Membership</span></Reveal>
            <RevealLines className="display display--xl" lines={["A world worth", <>coming <em>back to</em>.</>]} />
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              One membership, the whole platform — every chapter and language world as it opens.
              Simple on purpose.
            </p>
          </Reveal>
        </div>

        <div className="pricing">
          {PLANS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="price-wrap">
              <article className={`price ${p.best ? "price--best" : ""}`}>
                {p.best && <span className="price__badge">Best value</span>}
                <p className="price__name">{p.name}</p>
                <p className="price__amount">
                  <span className="display">{p.price}</span>
                  <span className="price__per">{p.per}</span>
                </p>
                <p className="price__note">{p.note}</p>
                <ul className="price__list">
                  {INCLUDED.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <Link to="/subscribe" className={`btn ${p.best ? "" : "btn--ghost"}`}>
                  <span className="btn__label">Start playing</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="pricing__fine">Pricing shown is for demonstration purposes.</p>
        </Reveal>
      </div>
    </section>
  );
}
