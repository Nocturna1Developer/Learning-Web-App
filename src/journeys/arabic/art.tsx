/* The Levantine family's shared pieces: Jiddo's rakweh and Teta's tatreez
   from Chapter One, and the town and village in the mountains. */

export const AR = "'Noto Naskh Arabic', 'Segoe UI', serif";

export const LV = {
  stone: "#e6d6b8",
  stoneDark: "#c8b490",
  tile: "#b8452f",
  olive: "#7a8a5a",
  oliveDark: "#5a6a42",
  shutter: "#3f7d8a",
};

export function Rakweh({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-18 0 q-6 -34 8 -42 h20 q14 8 8 42Z" fill="#b87333" />
      <path d="M-10 -42 l-4 -10 h28 l-4 10Z" fill="#9a5a24" />
      <path d="M18 -30 q30 -4 50 -24" stroke="#5a3a22" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M-14 -34 l-14 -8" stroke="#9a5a24" strokeWidth="4" />
    </g>
  );
}

export function Tatreez({ x, y, w, h, c = "#b8252f" }: { x: number; y: number; w: number; h: number; c?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill="#1a1a2a" />
      {Array.from({ length: Math.floor(w / 18) }, (_, i) => Array.from({ length: Math.floor(h / 18) }, (_, r) => (
        (i + r) % 2 === 0 ? <path key={`${i}${r}`} d={`M${x + 9 + i * 18} ${y + 3 + r * 18} l6 6 l-6 6 l-6 -6Z`} fill={r % 2 ? "#e8c25a" : c} /> : null
      )))}
    </g>
  );
}

/** A mountain-town house: pale limestone, a pyramid of red tile, three arched windows. */
export function StoneHouse({ x, w = 380, h = 340, y = 760, lit = false, shutter = LV.shutter }: { x: number; w?: number; h?: number; y?: number; lit?: boolean; shutter?: string }) {
  const top = y - h;
  const aw = w / 5;
  return (
    <g>
      <path d={`M${x - 16} ${top}L${x + w / 2} ${top - w * 0.28}L${x + w + 16} ${top}Z`} fill={LV.tile} />
      <rect x={x} y={top} width={w} height={h} fill={LV.stone} />
      {Array.from({ length: Math.floor(h / 34) }, (_, r) => <line key={r} x1={x} y1={top + r * 34} x2={x + w} y2={top + r * 34} stroke={LV.stoneDark} strokeWidth="2" opacity="0.6" />)}
      {[0, 1, 2].map((i) => {
        const wx = x + aw * (1 + i * 1.1) - aw / 2 + 10;
        return (
          <g key={i}>
            <path d={`M${wx} ${top + h * 0.55}v-${h * 0.22}q${aw * 0.4} -${aw * 0.5} ${aw * 0.8} 0v${h * 0.22}Z`} fill={lit ? "#ffd98a" : "#2a3a44"} />
            <path d={`M${wx} ${top + h * 0.55}v-${h * 0.22}q${aw * 0.4} -${aw * 0.5} ${aw * 0.8} 0v${h * 0.22}`} fill="none" stroke={LV.stoneDark} strokeWidth="5" />
          </g>
        );
      })}
      <rect x={x + w * 0.72} y={y - 150} width="70" height="150" fill={shutter} />
      <rect x={x + w * 0.12} y={top + h * 0.6} width="44" height="60" fill={shutter} opacity="0.85" />
    </g>
  );
}

/** A gnarled olive tree: twisted trunk, silver-green crown. */
export function OliveTree({ x, y = 760, h = 300, fruit = true }: { x: number; y?: number; h?: number; fruit?: boolean }) {
  const s = h / 300;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 0q10 -60 -10 -110q30 10 30 -40q10 50 40 30q-30 50 -10 120Z" fill="#6b5a44" />
      {[[-80, -190, 90], [30, -220, 100], [110, -170, 80], [-10, -260, 70]].map(([cx, cy, r], i) => (
        <g key={i}>
          <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.62} fill={i % 2 ? LV.olive : LV.oliveDark} />
          <ellipse cx={cx - r * 0.3} cy={cy - r * 0.2} rx={r * 0.5} ry={r * 0.22} fill="#a8b88a" opacity="0.4" />
        </g>
      ))}
      {fruit && Array.from({ length: 16 }, (_, i) => <ellipse key={i} cx={-130 + ((i * 47) % 260)} cy={-150 - ((i * 31) % 120)} rx="5" ry="7" fill={i % 3 ? "#3a3a2a" : "#6b7a3a"} />)}
    </g>
  );
}

/** A covered souk lane: stone arches and a vine overhead. */
export function SoukArches({ y = 760, h = 460 }: { y?: number; h?: number }) {
  return (
    <g>
      <rect x="0" y={y - h} width="1600" height={h} fill={LV.stoneDark} />
      {Array.from({ length: 5 }, (_, i) => (
        <path key={i} d={`M${i * 330 + 30} ${y}v-${h - 140}q140 -120 280 0v${h - 140}Z`} fill={LV.stone} />
      ))}
      <rect x="0" y={y - h - 30} width="1600" height="40" fill="#8a7a5a" />
      {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={i * 42} cy={y - h - 10 + (i % 3) * 8} r="16" fill={i % 2 ? "#5a7a3a" : "#4a6a2e"} />)}
    </g>
  );
}

/** A ma'amoul cookie, side view, with its pressed pattern. */
export function Maamoul({ x = 0, y = 0, s = 1, shape = "dome" }: { x?: number; y?: number; s?: number; shape?: "dome" | "flat" | "oval" }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {shape === "dome" && <path d="M-26 0q0 -40 26 -40t26 40Z" fill="#e8d0a0" />}
      {shape === "flat" && <ellipse cx="0" cy="-10" rx="30" ry="12" fill="#e8d0a0" />}
      {shape === "oval" && <path d="M-34 0q34 -36 68 0Z" fill="#e8d0a0" />}
      <path d={shape === "flat" ? "M-20 -10h40M-14 -16h28" : "M-14 -8l6 -18M0 -8v-26M14 -8l-6 -18"} stroke="#c8a870" strokeWidth="2.5" />
    </g>
  );
}

/** A carved wooden ma'amoul mould with a long handle. */
export function Mould({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-80" y="-10" width="70" height="20" rx="8" fill="#8a5a34" />
      <circle cx="20" cy="0" r="32" fill="#a8703e" />
      <circle cx="20" cy="0" r="22" fill="#8a5a34" />
      {Array.from({ length: 8 }, (_, i) => <line key={i} x1={20} y1={0} x2={20 + Math.cos((i / 8) * Math.PI * 2) * 20} y2={Math.sin((i / 8) * Math.PI * 2) * 20} stroke="#6b4429" strokeWidth="2" />)}
    </g>
  );
}

/** A jute sack, tied at the top. */
export function Sack({ x = 0, y = 0, s = 1, color = "#c8a870" }: { x?: number; y?: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-26 0q-6 -44 10 -56h32q16 12 10 56Z" fill={color} />
      <path d="M-14 -56q14 -10 28 0" stroke="#8a6a44" strokeWidth="4" fill="none" />
      <path d="M-18 -30h36M-20 -16h40" stroke="#a88858" strokeWidth="2" opacity="0.7" />
    </g>
  );
}
