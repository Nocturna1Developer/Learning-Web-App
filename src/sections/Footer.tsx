import { Logo } from "../components/Logo";
import "./Footer.css";

const COLUMNS = [
  { title: "Studio", links: [{ l: "About", h: "#about" }, { l: "Contact", h: "#join" }] },
  { title: "The Game", links: [{ l: "Gameplay", h: "#game" }, { l: "The World", h: "#world" }, { l: "Language", h: "#language" }] },
  { title: "Families", links: [{ l: "For Parents", h: "#families" }, { l: "Languages", h: "#language" }] },
  { title: "Legal", links: [{ l: "Privacy", h: "#" }, { l: "Terms", h: "#" }] },
];

export function Footer() {
  return (
    <footer className="footer surface" data-surface="dark">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo size={24} />
            <p className="footer__tag">
              Learn the language. Discover the culture. Find your connection.
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            {COLUMNS.map((c) => (
              <div key={c.title} className="footer__col">
                <p className="footer__col-title">{c.title}</p>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.l}><a href={l.h}>{l.l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} ROOTS. In development.</p>
          <p className="footer__telugu telugu">తెలుగు</p>
        </div>
      </div>
    </footer>
  );
}
