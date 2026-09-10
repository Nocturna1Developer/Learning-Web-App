import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { LanguagesPage } from "./pages/LanguagesPage";
import { Subscribe } from "./pages/Subscribe";
import { Login } from "./pages/Login";
import { AppLayout } from "./app/AppLayout";
import { AppHome } from "./app/AppHome";
import { Play } from "./app/Play";
import { WorldPage } from "./app/WorldPage";
import { JournalPage } from "./app/JournalPage";
import { AppLanguages } from "./app/AppLanguages";
import { Profile } from "./app/Profile";

// The game is its own chunk — visitors to the marketing site never download it.
const ChapterOneLazy = lazy(() => import("./game/ChapterOne").then((m) => ({ default: m.ChapterOne })));
const ChapterOne = () => (
  <Suspense fallback={<div style={{ position: "fixed", inset: 0, background: "#0f0e0b" }} />}>
    <ChapterOneLazy />
  </Suspense>
);

/** Scroll to the top on route change, or to the hash target if there is one. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        // Let the page mount before scrolling to the anchor.
        requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/languages" element={<LanguagesPage />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/login" element={<Login />} />

        <Route path="/app" element={<AppLayout />}>
          <Route index element={<AppHome />} />
          <Route path="play" element={<Play />} />
          <Route path="play/chapter-one" element={<ChapterOne />} />
          <Route path="world" element={<WorldPage />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="languages" element={<AppLanguages />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
