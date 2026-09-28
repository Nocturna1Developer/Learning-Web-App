import type { ReactNode } from "react";
import { Figure, Child } from "../components/scenes/primitives";
import { Defs } from "../game/rooms";

/**
 * Scene kit — parametric environments every chapter composes its rooms from:
 * skies, hills, trees, market stalls, shopfronts, crowds, bunting, fires,
 * lanterns, video calls. A shared drawing vocabulary keeps eleven worlds
 * looking like one game; the props and palettes on top make each its own.
 *
 * Stage is 1600 x 900; the floor line is y = 760 (FY).
 */

export const FY = 760;
const INK = "#2a1a12";

/** Deterministic pseudo-random, so art is stable between renders. */
export function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

export function Stage({ children, tone }: { children: ReactNode; tone?: string }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="room-art" aria-hidden="true" style={tone ? { background: tone } : undefined}>
      <defs>
        <radialGradient id="kit-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd07a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffd07a" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* the indoor gradients too, so Walls, Window and lamps work on any stage */}
      <Defs />
      {children}
    </svg>
  );
}

/* ---------------- sky ---------------- */

export function Sky({ id, top, mid, bottom }: { id: string; top: string; mid?: string; bottom: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={top} />
          {mid && <stop offset="55%" stopColor={mid} />}
          <stop offset="100%" stopColor={bottom} />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#sky-${id})`} />
    </>
  );
}

export function Sun({ x, y, r = 60, color = "#f7d08a" }: { x: number; y: number; r?: number; color?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r * 3} fill="url(#kit-glow)" opacity="0.6" />
      <circle cx={x} cy={y} r={r} fill={color} />
    </g>
  );
}

export function Moon({ x, y, r = 60 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r * 2.4} fill="#f4ecdd" opacity="0.08" />
      <circle cx={x} cy={y} r={r} fill="#f4ecdd" />
      <circle cx={x - r * 0.3} cy={y - r * 0.2} r={r * 0.18} fill="#e2d8c4" />
      <circle cx={x + r * 0.28} cy={y + r * 0.25} r={r * 0.12} fill="#e2d8c4" />
      <circle cx={x + r * 0.1} cy={y - r * 0.42} r={r * 0.08} fill="#e2d8c4" />
    </g>
  );
}

export function Stars({ n = 60, seed = 7, maxY = 420 }: { n?: number; seed?: number; maxY?: number }) {
  const r = rng(seed);
  return <g>{Array.from({ length: n }, (_, i) => <circle key={i} cx={r() * 1600} cy={r() * maxY} r={0.8 + r() * 1.8} fill="#f4ecdd" opacity={0.3 + r() * 0.6} />)}</g>;
}

export function Clouds({ seed = 3, color = "#fff", opacity = 0.55, y = 160 }: { seed?: number; color?: string; opacity?: number; y?: number }) {
  const r = rng(seed);
  return (
    <g fill={color} opacity={opacity}>
      {Array.from({ length: 4 }, (_, i) => {
        const cx = 150 + i * 400 + r() * 120;
        const cy = y + r() * 90;
        const w = 120 + r() * 80;
        return <ellipse key={i} cx={cx} cy={cy} rx={w} ry={w * 0.16} />;
      })}
    </g>
  );
}

/* ---------------- land ---------------- */

export function Hills({ y = 520, color = "#6b8a4a", amp = 60, seed = 1, opacity = 1 }: { y?: number; color?: string; amp?: number; seed?: number; opacity?: number }) {
  const r = rng(seed);
  const pts = Array.from({ length: 9 }, (_, i) => [i * 200, y - r() * amp]);
  const d = pts.reduce((acc, [x, py], i) => (i === 0 ? `M0 ${py}` : `${acc} Q${x - 100} ${py - amp * 0.6} ${x} ${py}`), "") + ` V900 H0Z`;
  return <path d={d} fill={color} opacity={opacity} />;
}

export function Ground({ color = "#8a6a44", line = "#6b5234", kind = "dirt", y = FY }: { color?: string; line?: string; kind?: "dirt" | "grass" | "stone" | "tile" | "sand" | "snow"; y?: number }) {
  return (
    <g>
      <rect x="0" y={y} width="1600" height={900 - y} fill={color} />
      {kind === "stone" && Array.from({ length: 24 }, (_, i) => <rect key={i} x={(i % 12) * 140 + (Math.floor(i / 12) % 2) * 70} y={y + 14 + Math.floor(i / 12) * 60} width="126" height="48" rx="6" fill={line} opacity="0.35" />)}
      {kind === "tile" && Array.from({ length: 9 }, (_, i) => <line key={i} x1={i * 200} y1={y} x2={i * 200 - 60} y2="900" stroke={line} strokeWidth="2" opacity="0.5" />)}
      {kind === "grass" && Array.from({ length: 70 }, (_, i) => <path key={i} d={`M${i * 23} ${y + 8 + (i % 4) * 26} l4 -12 l4 12`} stroke={line} strokeWidth="2.5" fill="none" opacity="0.6" />)}
      {kind === "dirt" && Array.from({ length: 30 }, (_, i) => <ellipse key={i} cx={(i * 97) % 1600} cy={y + 20 + (i % 5) * 24} rx="10" ry="3" fill={line} opacity="0.4" />)}
      {kind === "snow" && <rect x="0" y={y} width="1600" height="10" fill="#fff" opacity="0.7" />}
      <rect x="0" y={y} width="1600" height="6" fill={line} opacity="0.5" />
    </g>
  );
}

export function RoundTree({ x, y = FY, h = 300, crown = "#3f7d55", dark = "#2f6b45", trunk = "#5a3a22", fruit }: { x: number; y?: number; h?: number; crown?: string; dark?: string; trunk?: string; fruit?: string }) {
  const r = h * 0.34;
  return (
    <g>
      <rect x={x - h * 0.035} y={y - h * 0.55} width={h * 0.07} height={h * 0.55} fill={trunk} />
      <circle cx={x} cy={y - h * 0.72} r={r} fill={dark} />
      <circle cx={x - r * 0.55} cy={y - h * 0.6} r={r * 0.65} fill={crown} />
      <circle cx={x + r * 0.5} cy={y - h * 0.66} r={r * 0.7} fill={crown} />
      {fruit && [[-0.4, -0.7], [0.3, -0.8], [0.55, -0.55], [-0.1, -0.55], [-0.6, -0.5]].map(([dx, dy], i) => <circle key={i} cx={x + dx * r} cy={y + dy * h} r={h * 0.025} fill={fruit} />)}
    </g>
  );
}

export function Pine({ x, y = FY, h = 320, color = "#2f5a3e", trunk = "#4a3020", snow = false }: { x: number; y?: number; h?: number; color?: string; trunk?: string; snow?: boolean }) {
  return (
    <g>
      <rect x={x - h * 0.03} y={y - h * 0.18} width={h * 0.06} height={h * 0.18} fill={trunk} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <polygon points={`${x - h * (0.32 - i * 0.07)},${y - h * (0.18 + i * 0.24)} ${x},${y - h * (0.5 + i * 0.24)} ${x + h * (0.32 - i * 0.07)},${y - h * (0.18 + i * 0.24)}`} fill={color} />
          {snow && <polygon points={`${x - h * (0.12 - i * 0.02)},${y - h * (0.42 + i * 0.24)} ${x},${y - h * (0.5 + i * 0.24)} ${x + h * (0.12 - i * 0.02)},${y - h * (0.42 + i * 0.24)}`} fill="#f4f4f4" />}
        </g>
      ))}
    </g>
  );
}

export function Fence({ y = FY - 110, color = "#8a6a44", from = 0, to = 1600 }: { y?: number; color?: string; from?: number; to?: number }) {
  return (
    <g>
      <rect x={from} y={y + 20} width={to - from} height="8" fill={color} />
      <rect x={from} y={y + 70} width={to - from} height="8" fill={color} />
      {Array.from({ length: Math.floor((to - from) / 60) + 1 }, (_, i) => <rect key={i} x={from + i * 60} y={y} width="10" height={FY - y} fill={color} />)}
    </g>
  );
}

/* ---------------- buildings ---------------- */

export function Shop({ x, w = 300, h = 360, wall = "#e6d2b0", trim = "#6b4429", sign, signFont, signColor = "#f4ecdd", signBg = "#3a2718", awning, window = "#ffe2a0", dir }: { x: number; w?: number; h?: number; wall?: string; trim?: string; sign?: string; signFont?: string; signColor?: string; signBg?: string; awning?: string[]; window?: string; dir?: "rtl" }) {
  return (
    <g>
      <rect x={x} y={FY - h} width={w} height={h} fill={wall} />
      <rect x={x} y={FY - h} width={w} height="14" fill={trim} />
      {sign && (
        <g>
          <rect x={x + w * 0.1} y={FY - h + 28} width={w * 0.8} height="48" rx="4" fill={signBg} />
          <text x={x + w / 2} y={FY - h + 62} textAnchor="middle" fontFamily={signFont ?? "Fraunces, Georgia, serif"} fontSize="26" fill={signColor} direction={dir} letterSpacing={dir ? 0 : 2}>{sign}</text>
        </g>
      )}
      {awning && <Awning x={x - 10} y={FY - h * 0.55} w={w + 20} colors={awning} />}
      <rect x={x + w * 0.1} y={FY - h * 0.42} width={w * 0.45} height={h * 0.3} fill={window} opacity="0.85" />
      <rect x={x + w * 0.1} y={FY - h * 0.42} width={w * 0.45} height={h * 0.3} fill="none" stroke={trim} strokeWidth="6" />
      <rect x={x + w * 0.64} y={FY - h * 0.45} width={w * 0.26} height={h * 0.45} fill={trim} />
      <circle cx={x + w * 0.68} cy={FY - h * 0.22} r="4" fill="#d9a441" />
    </g>
  );
}

export function Awning({ x, y, w, colors, depth = 44 }: { x: number; y: number; w: number; colors: string[]; depth?: number }) {
  const n = Math.max(6, Math.round(w / 40));
  const sw = w / n;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <path key={i} d={`M${x + i * sw} ${y} h${sw} v${depth} q${-sw / 2} 16 ${-sw} 0Z`} fill={colors[i % colors.length]} />
      ))}
    </g>
  );
}

export function Roofline({ y = 560, color = "#3a2a2a", seed = 5, style = "pitched" }: { y?: number; color?: string; seed?: number; style?: "pitched" | "flat" | "dome" }) {
  const r = rng(seed);
  let x = -40;
  const out: ReactNode[] = [];
  while (x < 1640) {
    const w = 110 + r() * 140;
    const h = 80 + r() * 140;
    out.push(<rect key={`b${x}`} x={x} y={y - h} width={w} height={h + 300} fill={color} />);
    if (style === "pitched") out.push(<polygon key={`r${x}`} points={`${x - 8},${y - h} ${x + w / 2},${y - h - w * 0.28} ${x + w + 8},${y - h}`} fill={color} />);
    if (style === "dome" && r() > 0.6) out.push(<path key={`d${x}`} d={`M${x + w * 0.2} ${y - h} q${w * 0.3} ${-w * 0.55} ${w * 0.6} 0Z`} fill={color} />);
    for (let k = 0; k < 3; k++) if (r() > 0.45) out.push(<rect key={`w${x}${k}`} x={x + 14 + k * (w / 3.4)} y={y - h + 26 + (k % 2) * 30} width="14" height="20" fill="#ffd07a" opacity="0.6" />);
    x += w + 6;
  }
  return <g>{out}</g>;
}

/* ---------------- markets ---------------- */

export type Goods = { color: string; kind: "round" | "long" | "leaf" | "fish" | "sack" | "cloth" | "stack" | "bunch" };

function Pile({ x, y, g, w }: { x: number; y: number; g: Goods; w: number }) {
  const n = Math.max(4, Math.round(w / 22));
  switch (g.kind) {
    case "round":
      return <g>{Array.from({ length: n * 2 }, (_, i) => <circle key={i} cx={x + 12 + (i % n) * (w / n)} cy={y - 10 - Math.floor(i / n) * 16 + (i % 2) * 3} r="11" fill={g.color} stroke="rgba(0,0,0,0.15)" />)}</g>;
    case "long":
      return <g>{Array.from({ length: n }, (_, i) => <rect key={i} x={x + i * (w / n)} y={y - 34} width={w / n - 4} height="30" rx="8" fill={g.color} transform={`rotate(${(i % 3) * 6 - 6} ${x + i * (w / n)} ${y})`} />)}</g>;
    case "leaf":
      return <g>{Array.from({ length: n }, (_, i) => <ellipse key={i} cx={x + 10 + i * (w / n)} cy={y - 16} rx="12" ry="18" fill={g.color} />)}</g>;
    case "fish":
      return <g>{Array.from({ length: Math.ceil(n / 2) }, (_, i) => <path key={i} d={`M${x + i * (w / Math.ceil(n / 2))} ${y - 14 - (i % 2) * 10} q20 -14 40 0 q-20 14 -40 0 l-10 -8 v16Z`} fill={g.color} />)}</g>;
    case "sack":
      return <g>{Array.from({ length: Math.ceil(n / 3) }, (_, i) => (
        <g key={i}>
          <path d={`M${x + i * 46} ${y} q-4 -36 6 -44 h30 q10 8 6 44Z`} fill="#c9a36a" />
          <ellipse cx={x + i * 46 + 21} cy={y - 42} rx="16" ry="5" fill={g.color} />
        </g>
      ))}</g>;
    case "cloth":
      return <g>{Array.from({ length: Math.ceil(n / 2) }, (_, i) => <rect key={i} x={x + i * 30} y={y - 30 + (i % 2) * 4} width="26" height={26 - (i % 2) * 4} rx="2" fill={i % 2 ? g.color : "#f4ecdd"} stroke={g.color} strokeWidth="3" />)}</g>;
    case "stack":
      return <g>{Array.from({ length: 4 }, (_, i) => <ellipse key={i} cx={x + w / 2} cy={y - 6 - i * 9} rx={w / 2.4} ry="7" fill={g.color} stroke="rgba(0,0,0,0.12)" />)}</g>;
    case "bunch":
      return <g>{Array.from({ length: Math.ceil(n / 2) }, (_, i) => <path key={i} d={`M${x + i * 28} ${y - 4} q6 -34 22 -38`} stroke={g.color} strokeWidth="9" fill="none" strokeLinecap="round" />)}</g>;
  }
}

export function Stall({ x, w = 280, colors, goods, sign, signFont, dir, cloth = "#e9dcc2" }: { x: number; w?: number; colors: string[]; goods: Goods[]; sign?: string; signFont?: string; dir?: "rtl"; cloth?: string }) {
  const top = FY - 290;
  return (
    <g>
      <rect x={x + 6} y={top} width="8" height="290" fill="#5a3a22" />
      <rect x={x + w - 14} y={top} width="8" height="290" fill="#5a3a22" />
      <Awning x={x - 10} y={top} w={w + 20} colors={colors} depth={50} />
      {sign && (
        <g>
          <rect x={x + w * 0.2} y={top - 44} width={w * 0.6} height="40" rx="4" fill="#3a2718" />
          <text x={x + w / 2} y={top - 16} textAnchor="middle" fontFamily={signFont ?? "Fraunces, Georgia, serif"} fontSize="22" fill="#f4ecdd" direction={dir}>{sign}</text>
        </g>
      )}
      <rect x={x} y={FY - 110} width={w} height="18" fill="#6b4429" />
      <rect x={x + 6} y={FY - 92} width={w - 12} height="92" fill={cloth} />
      <rect x={x + 6} y={FY - 92} width={w - 12} height="10" fill={colors[0]} opacity="0.7" />
      {goods.map((g, i) => <Pile key={i} x={x + 10 + i * ((w - 20) / goods.length)} y={FY - 110} w={(w - 20) / goods.length - 8} g={g} />)}
    </g>
  );
}

/* ---------------- people ---------------- */

export function Crowd({ x, n = 6, spread = 600, color = "#3a2a24", seed = 11, y = FY, scale = 1 }: { x: number; n?: number; spread?: number; color?: string; seed?: number; y?: number; scale?: number }) {
  const r = rng(seed);
  return (
    <g opacity="0.9">
      {Array.from({ length: n }, (_, i) => {
        const px = x + r() * spread;
        const kid = r() > 0.72;
        const flip = r() > 0.5;
        const pose = (["stand", "walk", "reach"] as const)[Math.floor(r() * 3)];
        return kid
          ? <Child key={i} x={px} y={y} h={120 * scale} color={color} pose={pose === "reach" ? "point" : pose === "walk" ? "walk" : "stand"} flip={flip} />
          : <Figure key={i} x={px} y={y} h={(180 + r() * 40) * scale} color={color} pose={pose} flip={flip} />;
      })}
    </g>
  );
}

/* ---------------- festival ---------------- */

export function Bunting({ x1 = 0, x2 = 1600, y = 200, sag = 60, colors, n = 22 }: { x1?: number; x2?: number; y?: number; sag?: number; colors: string[]; n?: number }) {
  return (
    <g>
      <path d={`M${x1} ${y} Q${(x1 + x2) / 2} ${y + sag * 2} ${x2} ${y}`} fill="none" stroke="#3a2718" strokeWidth="2" />
      {Array.from({ length: n }, (_, i) => {
        const t = (i + 0.5) / n;
        const px = x1 + (x2 - x1) * t;
        const py = y + Math.sin(t * Math.PI) * sag;
        return <polygon key={i} points={`${px - 16},${py} ${px + 16},${py} ${px},${py + 36}`} fill={colors[i % colors.length]} />;
      })}
    </g>
  );
}

export function StringLights({ x1 = 0, x2 = 1600, y = 220, sag = 50, n = 24, color = "#ffd07a" }: { x1?: number; x2?: number; y?: number; sag?: number; n?: number; color?: string }) {
  return (
    <g>
      <path d={`M${x1} ${y} Q${(x1 + x2) / 2} ${y + sag * 2} ${x2} ${y}`} fill="none" stroke="#2a1a12" strokeWidth="2" />
      {Array.from({ length: n }, (_, i) => {
        const t = (i + 0.5) / n;
        return <circle key={i} cx={x1 + (x2 - x1) * t} cy={y + Math.sin(t * Math.PI) * sag + 8} r="7" fill={color} />;
      })}
    </g>
  );
}

export function Bonfire({ x, s = 1, y = FY }: { x: number; s?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cy="-80" r="200" fill="url(#kit-glow)" opacity="0.8" />
      <path d="M-90 0 l180 -30 M-90 -30 l180 30 M-60 4 l120 -50" stroke="#4a2a18" strokeWidth="16" strokeLinecap="round" />
      <path d="M-70 -20 q20 -120 60 -150 q-10 60 30 90 q20 -60 50 -80 q10 90 -20 140Z" fill="#f08a1c" />
      <path d="M-40 -24 q14 -70 40 -96 q-4 44 20 64 q14 -34 30 -46 q4 56 -16 78Z" fill="#f7c948" />
    </g>
  );
}

export function PaperLantern({ x, y, color = "#c0392b", s = 1, glow = true, hangFrom = 0 }: { x: number; y: number; color?: string; s?: number; glow?: boolean; hangFrom?: number }) {
  return (
    <g>
      <line x1={x} y1={hangFrom} x2={x} y2={y - 60 * s} stroke="#3a2718" strokeWidth="2" />
      {glow && <circle cx={x} cy={y} r={90 * s} fill="url(#kit-glow)" opacity="0.5" />}
      <rect x={x - 24 * s} y={y - 64 * s} width={48 * s} height={10 * s} rx="3" fill="#e8c25a" />
      <ellipse cx={x} cy={y} rx={48 * s} ry={56 * s} fill={color} />
      {[-0.55, -0.2, 0.2, 0.55].map((k) => <path key={k} d={`M${x + k * 48 * s} ${y - 52 * s} Q${x + k * 72 * s} ${y} ${x + k * 48 * s} ${y + 52 * s}`} fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="2" />)}
      <rect x={x - 24 * s} y={y + 52 * s} width={48 * s} height={10 * s} rx="3" fill="#e8c25a" />
    </g>
  );
}

export function Firework({ x, y, r = 70, color = "#f7c948" }: { x: number; y: number; r?: number; color?: string }) {
  return <g>{Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return <line key={i} x1={x + Math.cos(a) * r * 0.25} y1={y + Math.sin(a) * r * 0.25} x2={x + Math.cos(a) * r} y2={y + Math.sin(a) * r} stroke={color} strokeWidth="4" strokeLinecap="round" />; })}</g>;
}

/* ---------------- village ---------------- */

export function Well({ x, y = FY }: { x: number; y?: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y - 90} rx="90" ry="22" fill="#6b6660" />
      <rect x={x - 90} y={y - 90} width="180" height="90" fill="#8a847c" />
      {[0, 1, 2].map((r) => Array.from({ length: 5 }, (_, i) => <rect key={`${r}${i}`} x={x - 88 + i * 36 + (r % 2) * 18} y={y - 86 + r * 28} width="32" height="24" fill="#9c958c" opacity="0.7" />))}
      <ellipse cx={x} cy={y - 90} rx="70" ry="14" fill="#2a3a4a" />
      <rect x={x - 80} y={y - 230} width="10" height="140" fill="#5a3a22" />
      <rect x={x + 70} y={y - 230} width="10" height="140" fill="#5a3a22" />
      <rect x={x - 84} y={y - 236} width="168" height="12" fill="#5a3a22" />
      <line x1={x} y1={y - 224} x2={x} y2={y - 150} stroke="#8a6a44" strokeWidth="3" />
      <path d={`M${x - 16} ${y - 150} h32 l-4 26 h-24Z`} fill="#b87333" />
    </g>
  );
}

export function Cow({ x, y = FY, s = 1, color = "#ece6da", flip = false }: { x: number; y?: number; s?: number; color?: string; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx="0" cy="-70" rx="80" ry="40" fill={color} />
      {[-54, -30, 30, 54].map((dx) => <rect key={dx} x={dx - 7} y="-40" width="14" height="40" fill={color} />)}
      <path d="M68 -92 l40 -10 q18 6 14 26 l-8 22 q-18 8 -34 0Z" fill={color} />
      <path d="M92 -104 q-6 -22 8 -30 M112 -102 q10 -20 26 -22" stroke="#c9b89a" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="108" cy="-84" r="3" fill={INK} />
      <path d="M-80 -74 q-20 20 -12 50" stroke={color} strokeWidth="6" fill="none" />
      <ellipse cx="-20" cy="-84" rx="20" ry="12" fill="#b8a27a" opacity="0.5" />
    </g>
  );
}

/* ---------------- home ---------------- */

/** A laptop or tablet on a video call: a grid of relatives in their own rooms. */
export function VideoCall({ x, y, w = 420, faces = 4, bgs = ["#d9a441", "#3f7d55", "#c8704a", "#2d6ab8"], stand = true }: { x: number; y: number; w?: number; faces?: number; bgs?: string[]; stand?: boolean }) {
  const h = w * 0.62;
  const cols = faces <= 1 ? 1 : faces <= 4 ? 2 : 3;
  const rows = Math.ceil(faces / cols);
  const cw = (w - 24) / cols;
  const chh = (h - 24) / rows;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="12" fill="#1a1a1e" />
      {Array.from({ length: faces }, (_, i) => {
        const cx = x + 12 + (i % cols) * cw;
        const cy = y + 12 + Math.floor(i / cols) * chh;
        return (
          <g key={i}>
            <rect x={cx + 3} y={cy + 3} width={cw - 6} height={chh - 6} rx="6" fill={bgs[i % bgs.length]} opacity="0.85" />
            <circle cx={cx + cw / 2} cy={cy + chh * 0.45} r={Math.min(cw, chh) * 0.16} fill={INK} />
            <path d={`M${cx + cw / 2 - Math.min(cw, chh) * 0.26} ${cy + chh - 3} q${Math.min(cw, chh) * 0.26} ${-chh * 0.42} ${Math.min(cw, chh) * 0.52} 0Z`} fill={INK} />
          </g>
        );
      })}
      <circle cx={x + w / 2} cy={y + 6} r="2.5" fill="#555" />
      {stand && <path d={`M${x + w * 0.1} ${y + h} h${w * 0.8} l${w * 0.06} 16 h${-w * 0.92}Z`} fill="#3a3a40" />}
    </g>
  );
}

export function Table({ x, w = 420, cloth = "#f7f1e6", y = FY - 150, legs = "#5a3a22" }: { x: number; w?: number; cloth?: string; y?: number; legs?: string }) {
  return (
    <g>
      <rect x={x + 20} y={y + 20} width="14" height={FY - y - 20} fill={legs} />
      <rect x={x + w - 34} y={y + 20} width="14" height={FY - y - 20} fill={legs} />
      <rect x={x} y={y} width={w} height="16" fill={cloth} />
      <path d={`M${x} ${y + 16} h${w} v40 q${-w / 2} 16 ${-w} 0Z`} fill={cloth} opacity="0.92" />
    </g>
  );
}

/* ---------------- items ---------------- */

/** A coin for the count game: a currency symbol on gold or silver. */
export function Coin({ symbol, color = "#d9a441", ink = "#6b4a1e" }: { symbol: string; color?: string; ink?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill={color} />
      <circle cx="32" cy="32" r="24" fill="none" stroke={ink} strokeWidth="2" opacity="0.5" />
      <text x="32" y="41" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize={symbol.length > 2 ? 16 : 24} fontWeight="600" fill={ink}>{symbol}</text>
    </svg>
  );
}

/** A wrapped sweet, for count games that share things out instead of paying. */
export function Candy({ color = "#e0508a", wrap = "#f4ecdd" }: { color?: string; wrap?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M6 20l14 12l-14 12Z" fill={wrap} />
      <path d="M58 20l-14 12l14 12Z" fill={wrap} />
      <circle cx="32" cy="32" r="16" fill={color} />
      <path d="M22 26q10 -8 20 0" stroke="#fff" strokeWidth="3" fill="none" opacity="0.5" />
    </svg>
  );
}

/** Generic item icon — a coloured shape with an optional label drawn in. */
export function Item({ kind, color, accent = "#f4ecdd" }: { kind: "round" | "jar" | "bottle" | "bag" | "box" | "bowl" | "leaf" | "long" | "flat" | "cup"; color: string; accent?: string }) {
  const body: Record<string, ReactNode> = {
    round: <><circle cx="40" cy="54" r="26" fill={color} /><ellipse cx="32" cy="46" rx="8" ry="5" fill="#fff" opacity="0.35" /><path d="M40 28q4-10 12-12" stroke="#3f7d55" strokeWidth="4" fill="none" /></>,
    jar: <><rect x="18" y="28" width="44" height="54" rx="8" fill={color} /><rect x="14" y="18" width="52" height="14" rx="4" fill="#3a2718" /><rect x="26" y="44" width="28" height="22" rx="3" fill={accent} opacity="0.85" /></>,
    bottle: <><path d="M32 12h16v14q10 8 10 22v34H22V48q0-14 10-22Z" fill={color} /><rect x="30" y="8" width="20" height="8" rx="2" fill="#3a2718" /></>,
    bag: <><path d="M14 84q-6-50 8-60h36q14 10 8 60Z" fill={color} /><path d="M28 24q12-14 24 0" stroke="#3a2718" strokeWidth="4" fill="none" /></>,
    box: <><rect x="12" y="34" width="56" height="48" fill={color} /><path d="M12 34l10-12h36l10 12" fill={accent} opacity="0.7" /></>,
    bowl: <><path d="M8 46h64q-4 34-32 34T8 46Z" fill={color} /><ellipse cx="40" cy="46" rx="32" ry="8" fill={accent} /></>,
    leaf: <><path d="M40 84V40" stroke="#3f7d55" strokeWidth="4" /><ellipse cx="40" cy="38" rx="20" ry="30" fill={color} /><path d="M40 12v56" stroke="#fff" strokeWidth="2" opacity="0.4" /></>,
    long: <><rect x="16" y="44" width="48" height="22" rx="11" fill={color} transform="rotate(-20 40 55)" /></>,
    flat: <><ellipse cx="40" cy="62" rx="32" ry="12" fill={color} /><ellipse cx="40" cy="58" rx="28" ry="9" fill={accent} opacity="0.6" /></>,
    cup: <><path d="M18 34h40l-4 44H22Z" fill={color} /><path d="M58 42q14 4 0 22" stroke={color} strokeWidth="5" fill="none" /><path d="M30 24q4-8 0-14M42 24q4-8 0-14" stroke="#c8c0b0" strokeWidth="2.5" fill="none" strokeLinecap="round" /></>,
  };
  return <svg viewBox="0 0 80 90" aria-hidden="true">{body[kind]}</svg>;
}
