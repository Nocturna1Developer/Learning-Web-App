import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import "./Nav.css";

const LINKS = [
  { label: "Game", href: "#game" },
  { label: "World", href: "#world" },
  { label: "Language", href: "#language" },
  { label: "For Families", href: "#families" },
  { label: "About", href: "#about" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={`nav ${scrolled ? "nav--scrolled" : ""} ${open ? "nav--open" : ""}`}>
        <div className="nav__inner">
          <a href="#top" className="nav__logo" aria-label="ROOTS — home">
            <Logo size={20} />
          </a>

          <nav className="nav__links" aria-label="Primary">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav__link">
                <span>{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a href="#join" className="nav__cta">
              <span>Play Now</span>
            </a>
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
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${0.12 + i * 0.06}s` : "0s" }}
            >
              <span className="nav-panel__index">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-panel__foot">
          <a href="#join" className="btn" onClick={() => setOpen(false)}>
            <span className="btn__label">Play the Journey</span>
          </a>
        </div>
      </div>
    </>
  );
}
