import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Logo } from "../components/Logo";
import { CtaScene } from "../components/scenes/Scenes";
import { useGame } from "../state/store";
import { sfx } from "../lib/sfx";
import "./Login.css";

const DEMO = { user: "admin", pass: "1234" };
const EASE = [0.16, 1, 0.3, 1] as const;

export function Login() {
  const { dispatch } = useGame();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/app";

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [entering, setEntering] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (user.trim().toLowerCase() === DEMO.user && pass === DEMO.pass) {
      setError(null);
      setEntering(true);
      sfx.discover();
      dispatch({ type: "login", user: "admin" });
      // Let the door-open transition play before the route changes.
      setTimeout(() => navigate(from, { replace: true }), 900);
    } else {
      setError("That doesn't match the demo account.");
      sfx.miss();
    }
  };

  return (
    <main className={`login ${entering ? "login--entering" : ""}`} id="main">
      <div className="login__scene" aria-hidden="true">
        <CtaScene />
        <div className="login__grade" />
      </div>

      <motion.section
        className="login__panel"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        aria-labelledby="login-title"
      >
        <Link to="/" className="login__logo" aria-label="ROOTS home"><Logo size={26} /></Link>
        <p className="login__kicker">Welcome back.</p>
        <h1 id="login-title" className="display display--md">Your journey is waiting.</h1>

        <form className="login__form" onSubmit={submit} noValidate>
          <label className="field">
            <span className="field__label">Username</span>
            <input
              className="field__input"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="username"
              autoCapitalize="off"
              autoFocus
            />
          </label>
          <label className="field">
            <span className="field__label">Password</span>
            <input
              className="field__input"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="current-password"
            />
          </label>

          {error && <p className="login__error" role="alert">{error}</p>}

          <button type="submit" className="btn login__submit" disabled={entering}>
            <span className="btn__label">{entering ? "Entering…" : "Log in"}</span>
          </button>

          <div className="login__links">
            <span className="login__link login__link--muted" aria-disabled="true">Forgot password?</span>
            <Link to="/subscribe" className="login__link">New to ROOTS? Start your journey →</Link>
          </div>
        </form>

        <aside className="login__demo">
          <span className="login__demo-tag">Demo account</span>
          <p>
            This is a prototype — there's no real sign-in. Use <code>admin</code> / <code>1234</code>.
          </p>
        </aside>
      </motion.section>
    </main>
  );
}
