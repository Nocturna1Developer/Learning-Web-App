/* The St. Petersburg family's shared pieces: pastel classical façades, a
   wooden dacha with carved window frames, birch trees, a samovar, a
   matryoshka, the New Year yolka and one very large turnip. */

export const RU = {
  facades: ["#e8c870", "#a8c8a8", "#e8b0a0", "#b8c8e0"],
  trim: "#f4f0e6",
  dachaWall: ["#4a7a5a", "#5a7aa8", "#c8a060"],
  carve: "#f4f0e6",
};

/** A classical St. Petersburg façade: pastel wall, white pilasters and window trims. */
export function Facade({ x, w = 440, h = 520, y = 760, tint = RU.facades[0], lit = false }: { x: number; w?: number; h?: number; y?: number; tint?: string; lit?: boolean }) {
  const top = y - h;
  const cols = Math.max(2, Math.floor(w / 110));
  const floors = Math.floor((h - 60) / 120);
  return (
    <g>
      <rect x={x} y={top} width={w} height={h} fill={tint} />
      <rect x={x - 8} y={top - 16} width={w + 16} height="20" fill={RU.trim} />
      <rect x={x} y={y - 60} width={w} height="60" fill="#000" opacity="0.08" />
      {Array.from({ length: cols + 1 }, (_, i) => <rect key={`p${i}`} x={x + i * (w / cols) - 6} y={top} width="12" height={h} fill={RU.trim} opacity="0.7" />)}
      {Array.from({ length: floors * cols }, (_, i) => {
        const cx = x + (i % cols) * (w / cols) + 26;
        const cy = top + 40 + Math.floor(i / cols) * 120;
        const cw = w / cols - 52;
        return (
          <g key={i}>
            <path d={`M${cx - 8} ${cy - 4}h${cw + 16}l-8 -14h${-cw}Z`} fill={RU.trim} />
            <rect x={cx} y={cy} width={cw} height="74" fill={lit && i % 3 !== 1 ? "#ffd98a" : "#3a4a5a"} />
            <rect x={cx - 4} y={cy + 74} width={cw + 8} height="6" fill={RU.trim} />
            <line x1={cx + cw / 2} y1={cy} x2={cx + cw / 2} y2={cy + 74} stroke={RU.trim} strokeWidth="3" />
          </g>
        );
      })}
    </g>
  );
}

/** A wooden dacha: painted planks, a steep roof, carved white window frames. */
export function DachaHouse({ x, w = 420, h = 280, y = 760, wall = RU.dachaWall[0], lit = false }: { x: number; w?: number; h?: number; y?: number; wall?: string; lit?: boolean }) {
  const top = y - h;
  return (
    <g>
      <path d={`M${x - 20} ${top}L${x + w / 2} ${top - w * 0.42}L${x + w + 20} ${top}Z`} fill="#6a5a5a" />
      <path d={`M${x + w / 2 - 34} ${top - 60}h68v-40q-34 -30 -68 0Z`} fill={RU.carve} />
      <rect x={x + w / 2 - 20} y={top - 90} width="40" height="30" fill={lit ? "#ffd98a" : "#3a3a44"} />
      <rect x={x} y={top} width={w} height={h} fill={wall} />
      {Array.from({ length: Math.floor(h / 22) }, (_, i) => <line key={i} x1={x} y1={top + i * 22} x2={x + w} y2={top + i * 22} stroke="#000" strokeWidth="2" opacity="0.12" />)}
      {[0.14, 0.62].map((f) => {
        const wx = x + w * f;
        return (
          <g key={f}>
            <path d={`M${wx - 14} ${top + 60}l${w * 0.12 + 14} -40l${w * 0.12 + 14} 40Z`} fill={RU.carve} />
            <rect x={wx - 10} y={top + 58} width={w * 0.24 + 20} height="120" fill={RU.carve} />
            <rect x={wx} y={top + 66} width={w * 0.24} height="104" fill={lit ? "#ffd98a" : "#3a4a5a"} />
            <line x1={wx + w * 0.12} y1={top + 66} x2={wx + w * 0.12} y2={top + 170} stroke={RU.carve} strokeWidth="4" />
            {[0, 1, 2, 3, 4].map((k) => <circle key={k} cx={wx - 4 + k * ((w * 0.24 + 8) / 4)} cy={top + 186} r="6" fill={RU.carve} />)}
          </g>
        );
      })}
      <rect x={x + w * 0.42} y={y - 150} width={w * 0.16} height="150" fill="#6b4429" />
    </g>
  );
}

/** A birch tree: white trunk with dark marks, a light crown. */
export function Birch({ x, y = 760, h = 420 }: { x: number; y?: number; h?: number }) {
  return (
    <g>
      <rect x={x - 12} y={y - h} width="24" height={h} fill="#f0ece4" />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={x - 12 + (i % 2) * 10} y={y - h + 40 + i * (h / 10)} width={10 + (i % 3) * 4} height="5" fill="#2a2a2a" />)}
      {[[-60, 0.9, 70], [50, 0.82, 80], [-10, 1, 60], [80, 0.68, 50], [-80, 0.7, 50]].map(([dx, f, r], i) => <circle key={i} cx={x + dx} cy={y - h * f} r={r} fill={i % 2 ? "#8ab84a" : "#9ac85a"} opacity="0.95" />)}
    </g>
  );
}

export function Samovar({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 0h60l-10 -14h-40Z" fill="#b8862f" />
      <path d="M-44 -14q-6 -60 44 -70q50 10 44 70Z" fill="#d8a040" />
      <ellipse cx="-14" cy="-54" rx="8" ry="18" fill="#f4dca0" opacity="0.5" />
      <rect x="-16" y="-104" width="32" height="20" fill="#b8862f" />
      <ellipse cx="0" cy="-114" rx="18" ry="10" fill="#f4f0e6" />
      <path d="M44 -40h18v6" stroke="#b8862f" strokeWidth="5" fill="none" />
      <path d="M-44 -60q-18 0 -18 16M44 -60q18 0 18 16" stroke="#6b4429" strokeWidth="5" fill="none" />
    </g>
  );
}

/** A matryoshka doll. */
export function Matryoshka({ x, y, s = 1, color = "#c8302a" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 0q-10 -40 6 -60q-10 -30 24 -34q34 4 24 34q16 20 6 60Z" fill={color} />
      <ellipse cx="0" cy="-66" rx="16" ry="18" fill="#f4dcc0" />
      <path d="M-16 -70q16 -22 32 0q-2 -22 -16 -24q-14 2 -16 24Z" fill="#6a3a1a" />
      <circle cx="-6" cy="-66" r="2" fill="#2a1a12" />
      <circle cx="6" cy="-66" r="2" fill="#2a1a12" />
      <circle cx="-9" cy="-58" r="3" fill="#e8708a" opacity="0.7" />
      <circle cx="9" cy="-58" r="3" fill="#e8708a" opacity="0.7" />
      <ellipse cx="0" cy="-26" rx="16" ry="18" fill="#f4f0e6" />
      <circle cx="0" cy="-26" r="8" fill="#e8b830" />
    </g>
  );
}

/** The New Year yolka, decorated or bare. */
export function Yolka({ x, y = 760, h = 440, dressed = false, lit = false }: { x: number; y?: number; h?: number; dressed?: boolean; lit?: boolean }) {
  const tiers = 5;
  return (
    <g>
      <rect x={x - 14} y={y - 60} width="28" height="60" fill="#5a3a22" />
      {Array.from({ length: tiers }, (_, i) => {
        const ty = y - 60 - i * (h / tiers) * 0.8;
        const tw = (tiers - i) * (h / tiers) * 0.55;
        return <path key={i} d={`M${x - tw} ${ty}L${x} ${ty - (h / tiers) * 1.3}L${x + tw} ${ty}Z`} fill={i % 2 ? "#2f6a3e" : "#27583a"} />;
      })}
      {dressed && (
        <>
          <path d={`M${x} ${y - 60 - h * 0.98}l10 22h24l-19 14l7 24l-22 -14l-22 14l7 -24l-19 -14h24Z`} fill="#d8302a" />
          {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={x + (((i * 71) % 200) - 100) * (1 - ((i * 37) % 100) / 140)} cy={y - 90 - (((i * 37) % 100) / 100) * h * 0.7} r="11" fill={["#d8302a", "#e8b830", "#2d6ab8", "#f4f0e6"][i % 4]} />)}
        </>
      )}
      {lit && Array.from({ length: 22 }, (_, i) => <circle key={`l${i}`} cx={x + (((i * 53) % 220) - 110) * (1 - ((i * 29) % 100) / 130)} cy={y - 80 - (((i * 29) % 100) / 100) * h * 0.75} r="4" fill="#ffd07a" />)}
    </g>
  );
}

export function Jar({ x, y, s = 1, full = true }: { x: number; y: number; s?: number; full?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-24" y="-70" width="48" height="70" rx="8" fill="#dfe8ee" opacity="0.8" />
      <rect x="-20" y="-80" width="40" height="12" rx="3" fill="#8a8a8e" />
      {full && Array.from({ length: 5 }, (_, i) => <rect key={i} x={-18 + (i % 3) * 12} y={-64 + Math.floor(i / 3) * 30} width="10" height="28" rx="5" fill="#5a8a3a" />)}
      {full && <path d="M-14 -40l6 -10M8 -30l6 -12" stroke="#8ab84a" strokeWidth="2" />}
    </g>
  );
}

export function Turnip({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 30q-44 -10 -40 -44q4 -30 40 -30q36 0 40 30q4 34 -40 44Z" fill="#f0e0a0" />
      <path d="M-38 -24q38 -20 76 0q-6 -20 -38 -20t-38 20Z" fill="#b84a8a" />
      <path d="M0 30v16" stroke="#c8b070" strokeWidth="3" />
      {[-24, -8, 8, 24].map((dx, i) => <path key={dx} d={`M${dx / 3} -42q${dx} -30 ${dx * 1.4} -${50 + (i % 2) * 14}`} stroke="#4f8a3a" strokeWidth="8" fill="none" strokeLinecap="round" />)}
    </g>
  );
}
