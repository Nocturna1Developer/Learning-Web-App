import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { useGame } from "../state/store";
import "./Nav.css";

const LINKS = [
  { label: "Game", to: "/#game" },
  { label: "World", to: "/#world" },
  { label: "Languages", to: "/languages" },
  { label: "For Families", to: "/#families" },
  { label: "About", to: "/#about" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { session } = useGame();
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close the panel on any navigation.
  useEffect(() => { setOpen(false); }, [pathname]);

  const solid = scrolled || !onHome;

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={`nav ${solid ? "nav--scrolled" : ""} ${open ? "nav--open" : ""}`}>
        <div className="nav__inner">
          <Link to="/" className="nav__logo" aria-label="ROOTS — home">
            <Logo size={20} />
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} className={`nav__link ${pathname === l.to ? "is-active" : ""}`}>
                <span>{l.label}</span>
              </Link>
            ))}
          </nav>

          <div className="nav__actions">
            {session.user ? (
              <Link to="/app" className="nav__cta nav__cta--solid"><span>Enter ROOTS</span></Link>
            ) : (
              <>
                <Link to="/login" className="nav__login">Log in</Link>
                <Link to="/subscribe" className="nav__cta"><span>Subscribe</span></Link>
              </>
            )}
            <button
              className="nav__burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`nav-panel ${open ? "nav-panel--open" : ""}`} aria-hidden={!open}>
        <nav className="nav-panel__links" aria-label="Mobile">
          {LINKS.map((l, i) => (
            <Link key={l.to} to={l.to} style={{ transitionDelay: open ? `${0.12 + i * 0.06}s` : "0s" }}>
              <span className="nav-panel__index">0{i + 1}</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-panel__foot btn-row">
          {session.user ? (
            <Link to="/app" className="btn"><span className="btn__label">Enter ROOTS</span></Link>
          ) : (
            <>
              <Link to="/subscribe" className="btn"><span className="btn__label">Subscribe</span></Link>
              <Link to="/login" className="btn btn--ghost"><span className="btn__label">Log in</span></Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
