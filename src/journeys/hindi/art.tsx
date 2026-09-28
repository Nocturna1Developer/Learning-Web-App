/* The Lucknow family's shared pieces: Dadi's diya from Chapter One, and the
   old city — arched doorways, bazaar carts, Holi colour, rooftops. */

export const DV = "'Noto Serif Devanagari', 'Nirmala UI', serif";

export const LKO = {
  wall: ["#f0c8a0", "#e8d8b0", "#d8a0a8", "#b8d0c0", "#f2dcb0"],
  sandstone: "#d8a878",
  arch: "#8a4a2e",
  green: "#1f4d33",
};

export function Diya({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cy="-26" r="40" fill="url(#lamp-glow)" />
      <path d="M-22 0 q22 14 44 0 q-4 -10 -22 -10 t-22 10Z" fill="#b8862f" />
      <path d="M14 -8 q7 -14 0 -26 q-7 12 0 26Z" fill="#f0a830" />
    </g>
  );
}

/** An old-city house front: pastel wall, a pointed arch door, a jharokha balcony above. */
export function Haveli({ x, w = 360, h = 420, wall = LKO.wall[0], y = 760, lit = false }: { x: number; w?: number; h?: number; wall?: string; y?: number; lit?: boolean }) {
  const top = y - h;
  const dx = x + w * 0.2;
  return (
    <g>
      <rect x={x} y={top} width={w} height={h} fill={wall} />
      <rect x={x} y={top} width={w} height="14" fill="#fff" opacity="0.4" />
      {Array.from({ length: Math.floor(w / 30) }, (_, i) => <rect key={i} x={x + i * 30 + 6} y={top - 16} width="18" height="18" fill={wall} />)}
      {/* pointed arch doorway */}
      <path d={`M${dx} ${y}v-150q0 -60 55 -90q55 30 55 90v150Z`} fill={LKO.arch} />
      <path d={`M${dx + 10} ${y}v-146q0 -52 45 -80q45 28 45 80v146Z`} fill={lit ? "#ffd98a" : "#3a2418"} opacity={lit ? 0.7 : 1} />
      {/* jharokha */}
      <g transform={`translate(${x + w * 0.62} ${top + h * 0.22})`}>
        <rect x="-10" y="80" width={w * 0.3 + 20} height="14" fill={LKO.sandstone} />
        <path d={`M0 80v-60q${w * 0.15} -40 ${w * 0.3} 0v60Z`} fill={LKO.sandstone} />
        <path d={`M10 80v-54q${w * 0.15 - 10} -30 ${w * 0.3 - 20} 0v54Z`} fill={lit ? "#ffd98a" : "#4a3a3a"} />
        {Array.from({ length: 4 }, (_, i) => <line key={i} x1={10 + (i + 1) * ((w * 0.3 - 20) / 5)} y1="30" x2={10 + (i + 1) * ((w * 0.3 - 20) / 5)} y2="80" stroke={LKO.sandstone} strokeWidth="3" />)}
      </g>
    </g>
  );
}

/** A thela: a wooden handcart heaped with goods, on two bicycle wheels. */
export function Thela({ x, y = 760, w = 300, heaps }: { x: number; y?: number; w?: number; heaps: string[] }) {
  return (
    <g>
      <rect x={x} y={y - 120} width={w} height="18" fill="#8a5a34" />
      <rect x={x + 10} y={y - 102} width="10" height="60" fill="#5a3a22" />
      <rect x={x + w - 20} y={y - 102} width="10" height="60" fill="#5a3a22" />
      <circle cx={x + 50} cy={y - 34} r="34" fill="none" stroke="#2a2a2a" strokeWidth="6" />
      <circle cx={x + w - 50} cy={y - 34} r="34" fill="none" stroke="#2a2a2a" strokeWidth="6" />
      {heaps.map((c, i) => {
        const hx = x + 20 + (i + 0.5) * ((w - 40) / heaps.length);
        return (
          <g key={i}>
            {Array.from({ length: 6 }, (_, k) => <circle key={k} cx={hx + ((k % 3) - 1) * 16} cy={y - 132 - Math.floor(k / 3) * 16} r="11" fill={c} />)}
          </g>
        );
      })}
    </g>
  );
}

/** A puff of Holi colour in the air. */
export function Gulaal({ x, y, r = 60, color }: { x: number; y: number; r?: number; color: string }) {
  return (
    <g opacity="0.75">
      {Array.from({ length: 7 }, (_, i) => <circle key={i} cx={x + Math.cos(i * 0.9) * r * 0.55} cy={y + Math.sin(i * 1.3) * r * 0.4} r={r * (0.35 + (i % 3) * 0.12)} fill={color} />)}
    </g>
  );
}

/** A gujiya: a crescent pastry with a crimped edge. */
export function Gujiya({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 6q30 -44 60 0Z" fill="#e8c088" />
      {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={-28 + i * 7} cy={6 - Math.sin((i / 8) * Math.PI) * 4} r="3.4" fill="#d0a060" />)}
    </g>
  );
}

/** A charpai: a woven rope cot, for sleeping on the roof. */
export function Charpai({ x, y = 760, w = 300 }: { x: number; y?: number; w?: number }) {
  return (
    <g>
      <rect x={x} y={y - 70} width={w} height="14" fill="#8a5a34" />
      <rect x={x + 6} y={y - 56} width="12" height="56" fill="#6b4429" />
      <rect x={x + w - 18} y={y - 56} width="12" height="56" fill="#6b4429" />
      {Array.from({ length: Math.floor(w / 14) }, (_, i) => <line key={i} x1={x + 8 + i * 14} y1={y - 70} x2={x + 18 + i * 14} y2={y - 56} stroke="#e8d6a8" strokeWidth="2" />)}
    </g>
  );
}

/** A rooftop parapet with a jaali (lattice) band. */
export function Parapet({ y = 640, color = "#d8b890" }: { y?: number; color?: string }) {
  return (
    <g>
      <rect x="0" y={y} width="1600" height="120" fill={color} />
      <rect x="0" y={y} width="1600" height="12" fill="#fff" opacity="0.25" />
      {Array.from({ length: 40 }, (_, i) => <path key={i} d={`M${i * 40 + 8} ${y + 30}l12 -10l12 10l-12 10Z`} fill="#000" opacity="0.18" />)}
    </g>
  );
}
