# ROOTS

> Learn the language. Discover the culture. Find your connection.

ROOTS is a subscription-based, story-driven adventure platform for children growing up
away from their family's home country. The first world is Telugu. This repository holds
the public site, the demo subscription and login flow, the game dashboard, and a playable
Chapter One.

**Live:** https://nocturna1developer.github.io/Learning-Web-App/

## Run it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

Vite + React 19 + TypeScript + React Router 7. `motion` (Framer Motion 12) drives scroll
and reveal animation. No CSS framework — the design system is plain CSS custom properties.
Pushing to `main` builds and publishes to GitHub Pages automatically.

## Try the whole flow

1. Land on the homepage, or open **Languages** to see the five worlds (Telugu playable, the rest coming soon).
2. **Subscribe** → pick a plan → confirm → *Welcome to ROOTS* → **Enter ROOTS**. Nothing is charged; pricing is demonstration only.
3. **Log in** with the demo account: `admin` / `1234`.
4. **ROOTS Home** → **Begin Chapter One**.
5. Walk with ← → (or A/D), press **E** near anything that glows — or just click it. Find the album, put it back together, play Amma's memory game, help in the kitchen, and answer her in Telugu.
6. Finish the chapter, open the **Heritage Journal**, and come back to the dashboard to see the locked chapters and languages waiting.

Progress and the session live in `localStorage` (`roots.progress.v1`, `roots.session.v1`). **Profile → Reset progress** starts over.

## How it's put together

```
src/
  styles/            tokens.css (design system), global.css
  components/        Logo, Nav, Button, Reveal, LanguageGrid, scenes/ (SVG art vocabulary)
  sections/          homepage sections, one file + one stylesheet each
  pages/             Home, LanguagesPage, Subscribe, Login
  app/               AppLayout (rail + tab bar), AppHome, Play, WorldPage, JournalPage, AppLanguages, Profile
  game/
    ChapterOne.tsx   the engine: rooms, walking, hotspots, word popups, dialogue, quest logic
    rooms.tsx        the four rooms as SVG stages, with their hotspot positions
    minigames/       FamilyAlbum, MemoryMatch, KitchenQuest
    ChapterComplete.tsx
  state/store.tsx    session + progress reducer, persisted, with derived stats
  data/              vocabulary, languages, chapters
  lib/               sfx (synthesised sounds), speech (optional Telugu TTS)
```

### Design system

Sections declare `data-surface="paper" | "leaf"` (dark is the default). A small set of
semantic tokens — `--bg`, `--fg`, `--line`, `--accent`, `--card` — swap per surface, so
components adapt without section-specific overrides. Fraunces for display, Manrope for
body, Noto Serif Telugu for Telugu; the other language names load subsetted Noto faces.

### The artwork

Every illustration is hand-authored SVG built from one shared vocabulary
(`components/scenes/primitives.tsx`): palms, houses, adult and child figures, kites,
kolam, garlands, pots, lamps. The hero village, the chapter panels, the culture plates,
the mini-game cards and the four rooms of Chapter One all come from the same pieces, so
they read as one world. No stock photography, no image assets.

### Chapter One

A side-view point-and-click adventure through an ordinary American home with the
family's story quietly everywhere in it. The vocabulary mechanic is contextual: a word
shows its Telugu script, romanisation and meaning the first time; with each encounter
the English recedes until only the script remains. Words, family members, cultural
objects and memories land in the Heritage Journal as they're found. Sound effects are
synthesised with the Web Audio API; if the browser has a Telugu voice installed, words
are spoken aloud.

Under `prefers-reduced-motion`, clicking a hotspot moves the player there at once
instead of walking.

### Languages

Five worlds are defined in `data/languages.ts`. Only Telugu is playable. Spanish, Chinese,
Hindi and Arabic are presented as future journeys, each framed to hold regional and
cultural difference rather than a single flattened picture — Spanish, for example, names
Mexican and Mexican-American journeys alongside other Spanish-speaking family stories.

## Content rules

The site distinguishes what exists from what is planned, and invents no users, reviews,
awards, partners or statistics. The only figures on the page are facts about the Telugu
language itself and clearly-labelled demonstration pricing.
