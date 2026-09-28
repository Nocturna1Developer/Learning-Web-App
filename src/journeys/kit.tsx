import type { ReactNode } from "react";
import { Figure, Child } from "../components/scenes/primitives";

/**
 * Small drawing kit shared by every journey: item icons (80x90), family
 * portraits (100x80) and story-panel frames (400x240). Culture-specific
 * objects live in each journey's own file; these are the common ones.
 */

export const INK = "#2a1a12";

/* ---------------- portraits ---------------- */

export function Portrait({ pose = "stand", child = false }: { pose?: "stand" | "sit"; child?: boolean }) {
  return (
    <svg viewBox="0 0 100 80" aria-hidden="true">
      {child ? <Child x={50} y={80} h={62} color={INK} /> : <Figure x={50} y={80} h={70} color={INK} pose={pose} />}
    </svg>
  );
}

/* ---------------- item icons (80 x 90) ---------------- */

const I = ({ children }: { children: ReactNode }) => <svg viewBox="0 0 80 90" aria-hidden="true">{children}</svg>;

export const Icon = {
  jug: (
    <I>
      <rect x="16" y="14" width="44" height="66" rx="8" fill="#8fbfd8" opacity="0.9" />
      <rect x="22" y="40" width="32" height="34" fill="#5a9dc0" opacity="0.7" />
      <path d="M60 26q18 6 0 30" fill="none" stroke="#8fbfd8" strokeWidth="7" />
    </I>
  ),
  glass: (
    <I>
      <path d="M22 16h36l-5 66H27Z" fill="#dfe8ee" opacity="0.85" />
      <path d="M25 40h30l-3 40H28Z" fill="#8fbfd8" opacity="0.8" />
    </I>
  ),
  salt: (
    <I>
      <rect x="22" y="30" width="36" height="52" rx="6" fill="#ece8de" />
      <path d="M24 30q16 -22 32 0Z" fill="#b9b3a6" />
      {[34, 40, 46].map((x) => <circle key={x} cx={x} cy={22} r="1.6" fill="#7a7266" />)}
    </I>
  ),
  sugar: (
    <I>
      <rect x="18" y="26" width="44" height="56" rx="6" fill="#efeae0" />
      <rect x="14" y="16" width="52" height="14" rx="4" fill="#b8912f" />
      <rect x="26" y="44" width="28" height="22" rx="3" fill="#fff" opacity="0.9" />
    </I>
  ),
  milk: (
    <I>
      <path d="M20 84v-52l8-14h24l8 14v52Z" fill="#f6f1e6" />
      <rect x="24" y="44" width="32" height="20" fill="#2d4a78" />
    </I>
  ),
  bread: (
    <I>
      <path d="M8 62q0-30 32-30t32 30v10H8Z" fill="#c98b4a" />
      <path d="M22 40l6 10M36 36l4 12M50 38l2 12" stroke="#8a5a2a" strokeWidth="3" strokeLinecap="round" />
      <rect x="8" y="66" width="64" height="12" rx="4" fill="#a86d34" />
    </I>
  ),
  candle: (
    <I>
      <rect x="30" y="36" width="20" height="46" rx="3" fill="#f4ecdd" />
      <path d="M40 34q9-12 0-24q-9 12 0 24Z" fill="#f0a830" />
      <path d="M40 30q4-6 0-12q-4 6 0 12Z" fill="#ffe29a" />
    </I>
  ),
  photo: (
    <I>
      <rect x="12" y="14" width="56" height="66" fill="#3a2718" />
      <rect x="18" y="20" width="44" height="54" fill="#e9dcc2" />
      <g transform="translate(40 72) scale(0.3)"><path d="M0 -150a14 14 0 1 0 .1 0Z" fill={INK} /><path d="M-18 -128 C-26 -100 -26 -60 -20 0 L20 0 C26 -60 26 -100 18 -128Z" fill={INK} /></g>
    </I>
  ),
  bowl: (
    <I>
      <path d="M8 44h64q-4 34-32 34T8 44Z" fill="#f4ecdd" />
      <path d="M8 44h64" stroke="#2d6ab8" strokeWidth="4" />
      <path d="M18 56h44" stroke="#2d6ab8" strokeWidth="2" opacity="0.5" />
    </I>
  ),
  teacup: (
    <I>
      <path d="M18 34h40l-4 40H22Z" fill="#dfe8ee" opacity="0.9" />
      <path d="M21 42h34l-3 30H24Z" fill="#b8763a" />
      <path d="M30 26q4-8 0-14M42 26q4-8 0-14" stroke="#c8c0b0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </I>
  ),
  lemon: (
    <I>
      <ellipse cx="40" cy="52" rx="26" ry="20" fill="#f0cf3a" />
      <ellipse cx="32" cy="46" rx="8" ry="5" fill="#fff4a8" opacity="0.6" />
      <path d="M40 32q6-12 18-12q-4 12-18 12Z" fill="#3f7d55" />
    </I>
  ),
};

/* ---------------- story panel frame (400 x 240) ---------------- */

export function Panel({ sky = ["#f0cf7a", "#e2a07f"], ground = "#6b4429", children, id }: { sky?: [string, string]; ground?: string | null; children: ReactNode; id: string }) {
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={sky[0]} />
          <stop offset="100%" stopColor={sky[1]} />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#sky-${id})`} />
      {ground && <rect y="196" width="400" height="44" fill={ground} />}
      {children}
    </svg>
  );
}
