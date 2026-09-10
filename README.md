# ROOTS — marketing site

> Learn the language. Discover the culture. Find your connection.

The site for ROOTS, an interactive story-driven web game that helps children of
immigrant families stay connected to their heritage. The first world is Telugu.

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

Vite + React 19 + TypeScript. `motion` (Framer Motion 12) drives scroll and reveal
animation. No CSS framework — the design system lives in plain CSS custom properties.

## How it's put together

```
src/
  styles/
    tokens.css        design system: colour, type scale, spacing, motion easings
    global.css        resets, surfaces, typography classes, buttons
  components/
    Logo.tsx          the ROOTS wordmark + mark
    Nav.tsx           transparent-over-hero nav, compacts on scroll, mobile panel
    Button.tsx        magnetic button
    Reveal.tsx        Reveal (fade+rise) and RevealLines (masked line reveal)
    scenes/
      primitives.tsx  shared art vocabulary — Palm, House, Figure, Child, Kite,
                      Muggu, Garland, Pot, Steam, Banyan, Glow
      Scenes.tsx      full scenes composed from those primitives
  sections/           one file + one stylesheet per page section
```

### Surfaces

Sections set `data-surface="paper" | "leaf"` (dark is the default) on a
`.surface` element. That swaps a small set of semantic tokens — `--bg`, `--fg`,
`--line`, `--accent`, `--card` — so every component inside adapts without
section-specific overrides.

### The artwork

All illustration is hand-authored SVG, drawn from one shared set of primitives so
the village in the hero, the chapter panels, the mini-game cards and the culture
plates all read as the same world. There are no stock photographs and no image
assets to manage. Scene SVGs use `preserveAspectRatio="xMidYMax slice"` so the
ground stays anchored when a container crops them.

### Responsive

Not a shrunk desktop. The two layouts that genuinely change shape:

- **Hero** — a 16:9 world crops to almost nothing in a portrait viewport, so on
  narrow screens the sky stays full-bleed while the rest of the scene letterboxes
  into a band at the foot of the screen, with the copy above it.
- **The World** — a pinned horizontal rail of six chapters on desktop; below
  900px (or under 620px tall) it becomes a stack of chapter cards.

### Motion

Restrained and mostly scroll-linked: layered hero parallax, masked line reveals,
a horizontal chapter rail, a magnetic cursor pull on buttons, and slow
environmental drift (palms sway, kites drift, steam rises). Everything respects
`prefers-reduced-motion`.

## Content status

The site distinguishes what exists from what is planned. ROOTS is described as in
development throughout; the expansion languages are framed as intent, without
dates. There are no invented statistics, testimonials, awards or partner logos —
the only figures on the page are facts about the Telugu language itself.
