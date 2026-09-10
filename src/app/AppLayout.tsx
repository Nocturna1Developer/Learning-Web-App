import { useEffect } from "react";
import { NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useGame } from "../state/store";
import { sfx } from "../lib/sfx";
import "./AppLayout.css";

const NAV = [
  { to: "/app", label: "Home", end: true, icon: <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1Z" /> },
  { to: "/app/play", label: "Play", icon: <path d="M7 5.5v13l11-6.5z" /> },
  { to: "/app/world", label: "World", icon: <><circle cx="12" cy="12" r="8" /><path d="M4 12h16M12 4c3 3 3 13 0 16M12 4c-3 3-3 13 0 16" /></> },
  { to: "/app/journal", label: "Journal", icon: <><path d="M5 5h9a4 4 0 0 1 4 4v10H9a4 4 0 0 1-4-4Z" /><path d="M9 9h6M9 13h6" /></> },
  { to: "/app/languages", label: "Languages", icon: <><path d="M4 7h10M9 4v3M12 7c-1 4-4 8-8 10M7 12c1 3 4 5 7 6" /><path d="M14 20l3-8 3 8M15.5 17h3" /></> },
  { to: "/app/profile", label: "Profile", icon: <><circle cx="12" cy="8" r="4" /><path d="M4 20c1-4 4-6 8-6s7 2 8 6" /></> },
];

/**
 * The authenticated shell. Looks like a game launcher, not an admin panel:
 * a slim rail on desktop, a tab bar on mobile, the world always behind it.
 */
export function AppLayout() {
  const { session, progress, stats, dispatch } = useGame();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo({ top: 0 }); }, [location.pathname]);

  if (!session.user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Playing a chapter takes over the whole viewport.
  const immersive = location.pathname.startsWith("/app/play/");
  if (immersive) return <Outlet />;

  const logout = () => { dispatch({ type: "logout" }); sfx.door(); navigate("/"); };

  return (
    <div className="app">
      <aside className="app__rail">
        <NavLink to="/app" end className="app__logo" aria-label="ROOTS home"><Logo size={22} /></NavLink>
        <nav className="app__nav" aria-label="Game">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `app__link ${isActive ? "is-active" : ""}`} onClick={() => sfx.tick()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{n.icon}</svg>
              <span>{n.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="app__player">
          <span className="app__avatar" aria-hidden="true">{progress.playerName.slice(0, 1)}</span>
          <div className="app__player-meta">
            <span className="app__player-name">{progress.playerName}</span>
            <span className="app__player-level">Level {stats.level} · {stats.connection}%</span>
          </div>
          <button className="app__logout" onClick={logout} aria-label="Log out" title="Log out">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M14 16l4-4-4-4M18 12H9" /></svg>
          </button>
        </div>
      </aside>

      <main className="app__main" id="main">
        <Outlet />
      </main>

      <nav className="app__tabs" aria-label="Game (mobile)">
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `app__tab ${isActive ? "is-active" : ""}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{n.icon}</svg>
            <span>{n.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
