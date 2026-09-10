import type { ReactElement } from "react";

/**
 * Shared vocabulary for ROOTS scene art.
 * Every scene is composed from these so the world stays visually consistent:
 * layered silhouettes, atmospheric depth, warm light.
 */

export const C = {
  dark: "#0f0e0b",
  night: "#0b1020",
  clay: "#c8704a",
  clayDeep: "#7a3a22",
  earth: "#9a4a2a",
  sun: "#d9a441",
  sunSoft: "#f0cf7a",
  leaf: "#1f4d33",
  leafDeep: "#10291b",
  leafLight: "#3f7d55",
  paper: "#f4ecdd",
  silhouette: "#14110c",
};

/* ---------- Palm tree silhouette ---------- */
type PalmProps = { x: number; y: number; h?: number; lean?: number; color?: string; scale?: number };
export function Palm({ x, y, h = 260, lean = 20, color = C.silhouette, scale = 1 }: PalmProps) {
  const tx = x + lean;
  const ty = y - h;
  const fronds = [-165, -140, -115, -90, -65, -40, -15].map((deg, i) => {
    const a = (deg * Math.PI) / 180;
    const L = 95 * scale + (i % 2) * 12;
    const ex = tx + Math.cos(a) * L;
    const ey = ty + Math.sin(a) * L * 0.55 + 46 * scale;
    const mx = (tx + ex) / 2;
    const my = (ty + ey) / 2 - 28 * scale;
    const nx = -(ey - ty) * 0.16;
    const ny = (ex - tx) * 0.16;
    return `M${tx} ${ty} Q${mx + nx} ${my + ny} ${ex} ${ey} Q${mx - nx} ${my - ny} ${tx} ${ty}Z`;
  });
  return (
    <g fill={color}>
      <path
        d={`M${x - 7 * scale} ${y} L${x + 7 * scale} ${y} C${x + 10 * scale} ${y - h * 0.5}, ${tx + 4} ${ty + h * 0.3}, ${tx + 3} ${ty} L${tx - 3} ${ty} C${tx - 6} ${ty + h * 0.3}, ${x - 8 * scale} ${y - h * 0.5}, ${x - 7 * scale} ${y}Z`}
      />
      {fronds.map((d, i) => (
        <path key={i} d={d} />
      ))}
      <circle cx={tx} cy={ty + 6} r={9 * scale} />
    </g>
  );
}

/* ---------- Village house ---------- */
type HouseProps = { x: number; y: number; w?: number; h?: number; wall?: string; roof?: string; lit?: boolean; roofLight?: string };
export function House({ x, y, w = 180, h = 90, wall = "#3b1e13", roof = "#5a2a1a", lit = false, roofLight }: HouseProps) {
  const rh = w * 0.3;
  return (
    <g>
      <rect x={x} y={y - h} width={w} height={h} fill={wall} />
      <polygon points={`${x - w * 0.09},${y - h} ${x + w * 0.5},${y - h - rh} ${x + w * 1.09},${y - h}`} fill={roof} />
      {roofLight && (
        <polygon
          points={`${x + w * 0.5},${y - h - rh} ${x + w * 1.09},${y - h} ${x + w * 0.5},${y - h}`}
          fill={roofLight}
          opacity="0.55"
        />
      )}
      {/* tile lines */}
      {[0.35, 0.6, 0.85].map((t) => (
        <line
          key={t}
          x1={x - w * 0.09 + (w * 0.59) * (1 - t)}
          y1={y - h - rh * t}
          x2={x + w * 1.09 - (w * 0.59) * (1 - t)}
          y2={y - h - rh * t}
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="2"
        />
      ))}
      <rect x={x + w * 0.42} y={y - h * 0.62} width={w * 0.16} height={h * 0.62} fill={lit ? C.sun : "#1a0d08"} opacity={lit ? 0.9 : 1} />
      {lit && <rect x={x + w * 0.12} y={y - h * 0.68} width={w * 0.14} height={h * 0.22} fill={C.sun} opacity="0.7" />}
    </g>
  );
}

/* ---------- Human silhouette ---------- */
type FigureProps = { x: number; y: number; h?: number; color?: string; pose?: "walk" | "stand" | "sit" | "reach"; flip?: boolean };
export function Figure({ x, y, h = 160, color = C.silhouette, pose = "stand", flip = false }: FigureProps) {
  const s = h / 160;
  const t = `translate(${x} ${y}) scale(${flip ? -s : s} ${s})`;
  if (pose === "sit") {
    return (
      <g transform={t} fill={color}>
        <circle cx="0" cy="-118" r="15" />
        <path d="M-16 -100 C-22 -80 -22 -60 -18 -40 L22 -40 C26 -60 24 -84 14 -100 Z" />
        <path d="M-18 -42 L-46 -38 C-52 -36 -52 -28 -46 -26 L-8 -26 Z" />
        <path d="M14 -42 L40 -34 C46 -32 46 -24 40 -22 L4 -22 Z" />
        <path d="M-34 -30 L-38 0 L-26 0 L-20 -26 Z" />
        <path d="M22 -28 L30 0 L42 0 L36 -26 Z" />
      </g>
    );
  }
  if (pose === "reach") {
    return (
      <g transform={t} fill={color}>
        <circle cx="0" cy="-142" r="14" />
        <path d="M-14 -126 C-20 -100 -20 -70 -14 -54 L16 -54 C22 -76 20 -104 12 -126 Z" />
        <path d="M10 -120 L36 -156 C40 -160 46 -156 44 -150 L20 -112 Z" />
        <path d="M-12 -118 L-28 -84 C-30 -78 -24 -74 -20 -78 L-2 -108 Z" />
        <path d="M-14 -56 L-20 0 L-8 0 L-2 -50 Z" />
        <path d="M4 -54 L12 0 L24 0 L18 -54 Z" />
      </g>
    );
  }
  if (pose === "walk") {
    return (
      <g transform={t} fill={color}>
        <circle cx="0" cy="-142" r="14" />
        <path d="M-13 -126 C-20 -100 -20 -70 -14 -54 L16 -54 C22 -76 20 -104 12 -126 Z" />
        <path d="M-12 -120 L-34 -90 C-37 -85 -31 -80 -27 -84 L-4 -108 Z" />
        <path d="M12 -120 L30 -96 C34 -91 28 -86 24 -90 L6 -108 Z" />
        <path d="M-14 -56 L-30 -6 L-18 -2 L-2 -50 Z" />
        <path d="M4 -54 L22 -4 L34 -8 L18 -54 Z" />
      </g>
    );
  }
  return (
    <g transform={t} fill={color}>
      <circle cx="0" cy="-142" r="14" />
      <path d="M-14 -126 C-20 -100 -20 -70 -14 -54 L16 -54 C22 -76 20 -104 12 -126 Z" />
      <path d="M-12 -120 L-24 -74 C-26 -68 -18 -66 -16 -72 L-4 -108 Z" />
      <path d="M12 -120 L24 -74 C26 -68 18 -66 16 -72 L4 -108 Z" />
      <path d="M-14 -56 L-16 0 L-4 0 L-2 -50 Z" />
      <path d="M4 -54 L6 0 L18 0 L16 -54 Z" />
    </g>
  );
}

/* ---------- Child ----------
   Deliberately different proportions from Figure: larger head, shorter
   limbs, softer stance. Reads as a kid even at silhouette scale. */
type ChildProps = { x: number; y: number; h?: number; color?: string; pose?: "stand" | "walk" | "point"; flip?: boolean };
export function Child({ x, y, h = 120, color = C.silhouette, pose = "stand", flip = false }: ChildProps) {
  const s = h / 120;
  const t = `translate(${x} ${y}) scale(${flip ? -s : s} ${s})`;
  return (
    <g transform={t} fill={color}>
      {/* head — a third of the body, plus a hint of hair */}
      <circle cx="0" cy="-98" r="17" />
      <path d="M-17 -102 C-16 -118 -6 -124 2 -122 C12 -120 17 -112 17 -100 C12 -110 2 -112 -6 -108 C-11 -106 -14 -104 -17 -102Z" />
      {/* torso */}
      <path d="M-12 -84 C-16 -66 -16 -50 -13 -40 L13 -40 C17 -52 16 -68 12 -84 Z" />
      {pose === "point" ? (
        <>
          <path d="M9 -80 L34 -112 C37 -116 43 -112 41 -107 L18 -74 Z" />
          <path d="M-10 -78 L-22 -54 C-24 -49 -18 -46 -15 -50 L-2 -70 Z" />
        </>
      ) : pose === "walk" ? (
        <>
          <path d="M-10 -80 L-26 -58 C-28 -54 -23 -50 -20 -54 L-2 -70 Z" />
          <path d="M10 -80 L24 -62 C27 -58 22 -54 19 -58 L4 -70 Z" />
        </>
      ) : (
        <>
          <path d="M-10 -80 L-18 -48 C-19 -44 -13 -43 -12 -47 L-3 -70 Z" />
          <path d="M10 -80 L18 -48 C19 -44 13 -43 12 -47 L3 -70 Z" />
        </>
      )}
      {/* legs */}
      {pose === "walk" ? (
        <>
          <path d="M-12 -42 L-23 -3 L-13 0 L-2 -38 Z" />
          <path d="M3 -42 L16 -3 L26 -6 L13 -42 Z" />
        </>
      ) : (
        <>
          <path d="M-12 -42 L-13 0 L-3 0 L-2 -38 Z" />
          <path d="M3 -40 L4 0 L14 0 L12 -42 Z" />
        </>
      )}
    </g>
  );
}

/* ---------- Kite ---------- */
type KiteProps = { x: number; y: number; size?: number; color?: string; accent?: string; rot?: number; tail?: number; className?: string };
export function Kite({ x, y, size = 60, color = C.clay, accent = C.sun, rot = 20, tail = 1, className }: KiteProps) {
  const s = size / 60;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} className={className}>
      <polygon points="0,-40 26,0 0,44 -26,0" fill={color} />
      <polygon points="0,-40 26,0 0,0" fill={accent} opacity="0.85" />
      <polygon points="0,0 0,44 -26,0" fill={accent} opacity="0.55" />
      <line x1="0" y1="-40" x2="0" y2="44" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
      <line x1="-26" y1="0" x2="26" y2="0" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
      <path
        d={`M0 44 C -10 ${60 * tail}, 14 ${80 * tail}, 0 ${100 * tail} C -12 ${118 * tail}, 10 ${132 * tail}, 2 ${150 * tail}`}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  );
}

/* ---------- Lantern glow ---------- */
type GlowProps = { x: number; y: number; r?: number; color?: string; id: string; intensity?: number };
export function Glow({ x, y, r = 60, color = C.sun, id, intensity = 0.9 }: GlowProps) {
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity={intensity} />
          <stop offset="45%" stopColor={color} stopOpacity={intensity * 0.3} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
    </g>
  );
}

/* ---------- Birds ---------- */
export function Birds({ x, y, color = "rgba(20,17,12,0.55)" }: { x: number; y: number; color?: string }) {
  const b = (dx: number, dy: number, s: number) => (
    <path
      key={`${dx}${dy}`}
      d={`M${x + dx} ${y + dy} q ${6 * s} -${7 * s} ${12 * s} 0 q ${6 * s} -${7 * s} ${12 * s} 0`}
      fill="none"
      stroke={color}
      strokeWidth={1.6 * s}
      strokeLinecap="round"
    />
  );
  return <g>{[b(0, 0, 1), b(40, -18, 0.8), b(70, 6, 0.7), b(120, -30, 0.9), b(160, -8, 0.6)]}</g>;
}

/* ---------- Marigold garland ---------- */
export function Garland({ x1, x2, y, sag = 40, count = 14 }: { x1: number; x2: number; y: number; sag?: number; count?: number }) {
  const pts = Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const px = x1 + (x2 - x1) * t;
    const py = y + Math.sin(t * Math.PI) * sag;
    return { px, py, i };
  });
  return (
    <g>
      <path d={`M${x1} ${y} Q${(x1 + x2) / 2} ${y + sag * 2} ${x2} ${y}`} fill="none" stroke={C.leafDeep} strokeWidth="2" />
      {pts.map(({ px, py, i }) => (
        <g key={i}>
          <circle cx={px} cy={py} r={9} fill={i % 3 === 0 ? C.clay : C.sun} />
          <circle cx={px} cy={py} r={4} fill={i % 3 === 0 ? C.sun : C.clay} opacity="0.8" />
        </g>
      ))}
    </g>
  );
}

/* ---------- Muggu (kolam) ----------
   A 5x5 pulli (dot) grid with a continuous line looping around every dot —
   built by rotating one quadrant motif four times, the way kolam actually work. */
export function Muggu({ x, y, size = 200, color = C.paper, opacity = 0.9, animate = false }: { x: number; y: number; size?: number; color?: string; opacity?: number; animate?: boolean }) {
  const s = size / 200;
  const dots: ReactElement[] = [];
  // diamond-arranged pulli: 1-3-5-3-1, the classic layout
  const rows = [1, 3, 5, 3, 1];
  rows.forEach((count, r) => {
    for (let c = 0; c < count; c++) {
      const cx = (c - (count - 1) / 2) * 42;
      const cy = (r - 2) * 42;
      dots.push(<circle key={`${r}-${c}`} cx={cx} cy={cy} r={3.4} fill={color} opacity={opacity * 0.85} />);
    }
  });

  // One petal-and-loop motif, repeated at four rotations.
  const motif =
    "M0 -84 C22 -84 34 -66 30 -46 C48 -44 62 -28 60 -8 " +
    "C42 -6 28 -18 26 -34 C10 -38 -2 -52 0 -70Z";
  const petal = "M0 -46 C16 -46 26 -34 26 -20 C12 -20 0 -30 0 -46Z";

  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[0, 90, 180, 270].map((deg) => (
        <g key={deg} transform={`rotate(${deg})`}>
          <path d={motif} fill="none" stroke={color} strokeWidth="3.2" strokeLinejoin="round" opacity={opacity} />
          <path d={petal} fill="none" stroke={color} strokeWidth="2.4" strokeLinejoin="round" opacity={opacity * 0.8} />
        </g>
      ))}
      <circle cx="0" cy="0" r="14" fill="none" stroke={color} strokeWidth="3.2" opacity={opacity} className={animate ? "muggu-draw" : undefined} />
      <circle cx="0" cy="0" r="26" fill="none" stroke={color} strokeWidth="2" opacity={opacity * 0.55} strokeDasharray="5 7" />
      {dots}
    </g>
  );
}

/* ---------- Clay pot ---------- */
export function Pot({ x, y, w = 90, color = "#8a4a2e", rim = "#5a2a1a" }: { x: number; y: number; w?: number; color?: string; rim?: string }) {
  const h = w * 0.95;
  return (
    <g>
      <path
        d={`M${x - w * 0.3} ${y - h} L${x + w * 0.3} ${y - h} C${x + w * 0.6} ${y - h * 0.8}, ${x + w * 0.55} ${y - h * 0.15}, ${x + w * 0.28} ${y} L${x - w * 0.28} ${y} C${x - w * 0.55} ${y - h * 0.15}, ${x - w * 0.6} ${y - h * 0.8}, ${x - w * 0.3} ${y - h}Z`}
        fill={color}
      />
      <ellipse cx={x} cy={y - h} rx={w * 0.34} ry={w * 0.09} fill={rim} />
      <path d={`M${x + w * 0.18} ${y - h * 0.85} C${x + w * 0.4} ${y - h * 0.6}, ${x + w * 0.36} ${y - h * 0.3}, ${x + w * 0.2} ${y - h * 0.12}`} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={w * 0.06} strokeLinecap="round" />
    </g>
  );
}

/* ---------- Steam curl ---------- */
export function Steam({ x, y, h = 120, delay = 0, opacity = 0.35 }: { x: number; y: number; h?: number; delay?: number; opacity?: number }) {
  return (
    <path
      d={`M${x} ${y} C${x - 18} ${y - h * 0.3}, ${x + 18} ${y - h * 0.5}, ${x} ${y - h * 0.75} C${x - 12} ${y - h * 0.9}, ${x + 6} ${y - h}, ${x + 2} ${y - h * 1.1}`}
      fill="none"
      stroke="rgba(244,236,221,1)"
      strokeWidth="5"
      strokeLinecap="round"
      opacity={opacity}
      className="steam"
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

/* ---------- Banyan tree ---------- */
export function Banyan({ x, y, w = 600, color = C.silhouette }: { x: number; y: number; w?: number; color?: string }) {
  const s = w / 600;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={color}>
      <path d="M-40 0 L40 0 L36 -120 C60 -160 70 -180 60 -220 L-56 -220 C-70 -180 -60 -150 -36 -120 Z" />
      <path d="M-300 -240 C-320 -330 -200 -400 -100 -370 C-60 -440 60 -450 110 -380 C220 -400 300 -330 280 -250 C330 -200 300 -160 240 -170 C200 -120 100 -130 60 -170 L-60 -170 C-100 -120 -220 -130 -250 -180 C-310 -170 -330 -210 -300 -240Z" />
      {[-210, -150, 130, 200, 250].map((dx, i) => (
        <path key={i} d={`M${dx} -190 C${dx + 4} -120 ${dx - 6} -60 ${dx + 2} ${i % 2 ? 0 : -30}`} fill="none" stroke={color} strokeWidth={i % 2 ? 6 : 4} strokeLinecap="round" />
      ))}
    </g>
  );
}
