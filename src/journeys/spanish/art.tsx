/* The Mexican-American family's shared pieces: papel picado, cempasúchil,
   candles and pan de muerto from Chapter One, and the pueblo in Michoacán. */

export const PICADO = ["#d6457a", "#e07a2f", "#7a3a8a", "#3f7d55", "#2d6ab8", "#f0cf3a"];

export function PapelPicado({ x1, x2, y, sag = 18, n = 9 }: { x1: number; x2: number; y: number; sag?: number; n?: number }) {
  const w = (x2 - x1) / n;
  return (
    <g>
      <path d={`M${x1} ${y} Q${(x1 + x2) / 2} ${y + sag * 2} ${x2} ${y}`} fill="none" stroke="#6b4a1e" strokeWidth="2" />
      {Array.from({ length: n }, (_, i) => {
        const t = (i + 0.5) / n;
        const cx = x1 + w * (i + 0.5);
        const cy = y + Math.sin(t * Math.PI) * sag;
        const fw = w * 0.86;
        return (
          <g key={i} transform={`translate(${cx - fw / 2} ${cy})`}>
            <path d={`M0 0h${fw}v${fw * 0.9}l-${fw / 8} -${fw / 10}l-${fw / 8} ${fw / 10}l-${fw / 8} -${fw / 10}l-${fw / 8} ${fw / 10}l-${fw / 8} -${fw / 10}l-${fw / 8} ${fw / 10}l-${fw / 8} -${fw / 10}l-${fw / 8} ${fw / 10}Z`} fill={PICADO[i % PICADO.length]} />
            <circle cx={fw / 2} cy={fw * 0.35} r={fw * 0.14} fill="#fff" opacity="0.35" />
            <path d={`M${fw * 0.2} ${fw * 0.62}h${fw * 0.6}`} stroke="#fff" strokeWidth="2" strokeDasharray="3 4" opacity="0.4" />
          </g>
        );
      })}
    </g>
  );
}

export function Marigolds({ x, y, n = 5, r = 11 }: { x: number; y: number; n?: number; r?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const cx = x + (i - (n - 1) / 2) * r * 1.5 + (i % 2) * 3;
        const cy = y - (i % 2) * r * 0.9;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill="#f08a1c" />
            <circle cx={cx - r * 0.25} cy={cy - r * 0.25} r={r * 0.55} fill="#f7b23b" />
            <circle cx={cx} cy={cy} r={r * 0.22} fill="#b8561a" />
          </g>
        );
      })}
    </g>
  );
}

export function Candle({ x, y, h = 40, lit = true }: { x: number; y: number; h?: number; lit?: boolean }) {
  return (
    <g>
      {lit && <circle cx={x} cy={y - h - 10} r="22" fill="url(#lamp-glow)" />}
      <rect x={x - 7} y={y - h} width="14" height={h} rx="2" fill="#f4ecdd" />
      {lit && <path d={`M${x} ${y - h - 2} q7 -10 0 -20 q-7 10 0 20Z`} fill="#f0a830" />}
    </g>
  );
}

export function PanDeMuerto({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-34 0q0-30 34-30t34 30Z" fill="#c98b4a" />
      <path d="M-26 -10q13 -18 26 -4q13 -18 26 4M-4 -24q4 -10 8 0" fill="none" stroke="#a86d34" strokeWidth="5" strokeLinecap="round" />
      <circle cx="0" cy="-28" r="5" fill="#a86d34" />
      <path d="M-30 -4q30 -22 60 0" fill="none" stroke="#f0cf7a" strokeWidth="2" strokeDasharray="1 5" opacity="0.8" />
    </g>
  );
}

/* ---------------- the pueblo in Michoacán ---------------- */

export const MX = {
  adobe: ["#e8a33d", "#d2553f", "#2f7fa8", "#f2d9a6", "#3f8a5a", "#c84a7a"],
  tile: "#a8472e",
  cobble: "#9a8a74",
  cobbleLine: "#7a6a56",
  wood: "#5a3a22",
  magenta: "#c8337a",
};

/** A flat-roofed pueblo house: bright wall, a band of red tile, a wooden door, a barred window. */
export function PuebloHouse({ x, w = 320, h = 300, wall = MX.adobe[0], door = true, lit = false, y = 760 }: { x: number; w?: number; h?: number; wall?: string; door?: boolean; lit?: boolean; y?: number }) {
  const top = y - h;
  return (
    <g>
      <rect x={x} y={top} width={w} height={h} fill={wall} />
      <rect x={x} y={y - 40} width={w} height="40" fill="#000" opacity="0.08" />
      <rect x={x - 10} y={top - 18} width={w + 20} height="22" fill={MX.tile} />
      {Array.from({ length: Math.floor((w + 20) / 22) }, (_, i) => <path key={i} d={`M${x - 10 + i * 22} ${top + 4}q11 10 22 0`} fill="none" stroke="#7a2f1e" strokeWidth="3" />)}
      {door && (
        <g>
          <rect x={x + w * 0.12} y={y - 190} width="96" height="190" fill={MX.wood} />
          <rect x={x + w * 0.12 + 8} y={y - 182} width="38" height="80" fill="#6b4429" />
          <rect x={x + w * 0.12 + 50} y={y - 182} width="38" height="80" fill="#6b4429" />
          <circle cx={x + w * 0.12 + 82} cy={y - 96} r="4" fill="#c9a24a" />
          {lit && <rect x={x + w * 0.12} y={y - 190} width="96" height="190" fill="#ffd07a" opacity="0.35" />}
        </g>
      )}
      <rect x={x + w * 0.58} y={top + h * 0.28} width={w * 0.28} height={h * 0.3} fill={lit ? "#ffd07a" : "#2a3240"} />
      {Array.from({ length: 4 }, (_, i) => <line key={i} x1={x + w * 0.58 + (i + 1) * (w * 0.28) / 5} y1={top + h * 0.28} x2={x + w * 0.58 + (i + 1) * (w * 0.28) / 5} y2={top + h * 0.58} stroke="#2a1a12" strokeWidth="3" />)}
      <rect x={x + w * 0.56} y={top + h * 0.58} width={w * 0.32} height="10" fill="#f4ecdd" />
      <circle cx={x + w * 0.64} cy={top + h * 0.58 - 8} r="10" fill={MX.magenta} />
      <circle cx={x + w * 0.8} cy={top + h * 0.58 - 8} r="10" fill="#e8a33d" />
    </g>
  );
}

export function Bougainvillea({ x, y, w = 200 }: { x: number; y: number; w?: number }) {
  return (
    <g>
      {Array.from({ length: Math.round(w / 12) }, (_, i) => (
        <circle key={i} cx={x + (i * 37) % w} cy={y + ((i * 53) % 90) - (i % 3) * 8} r={10 + (i % 4) * 3} fill={i % 5 ? MX.magenta : "#e05a9a"} opacity="0.92" />
      ))}
      {Array.from({ length: Math.round(w / 40) }, (_, i) => <circle key={`l${i}`} cx={x + (i * 61) % w} cy={y + 30 + ((i * 29) % 50)} r="9" fill="#3f7d55" />)}
    </g>
  );
}

/** The parroquia: a pale stone facade, one bell tower, a tiled dome. */
export function Parroquia({ x, y = 760, s = 1 }: { x: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-150" y="-330" width="300" height="330" fill="#e6d2b0" />
      <path d="M-150 -330 q150 -90 300 0Z" fill="#d8c29c" />
      <rect x="150" y="-470" width="90" height="470" fill="#dcc6a0" />
      <rect x="170" y="-440" width="50" height="70" rx="25" fill="#3a2a1c" />
      <path d="M150 -470 l45 -60 l45 60Z" fill="#c9b08a" />
      <path d="M-40 -400 q40 -110 80 0Z" fill="#2f7fa8" />
      <rect x="-6" y="-440" width="12" height="40" fill="#c9a24a" />
      <path d="M-50 0v-150q50 -70 100 0v150Z" fill={MX.wood} />
      <circle cx="0" cy="-230" r="34" fill="#3a2a1c" opacity="0.8" />
    </g>
  );
}

export function ClayPot({ x, y, s = 1, steam = false }: { x: number; y: number; s?: number; steam?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-50 -90q-40 40 -10 86h120q30 -46 -10 -86Z" fill="#b8642f" />
      <ellipse cx="0" cy="-90" rx="46" ry="12" fill="#8a4a22" />
      <path d="M-46 -60q46 18 92 0" fill="none" stroke="#f4ecdd" strokeWidth="3" strokeDasharray="6 6" opacity="0.7" />
      <path d="M-50 -84q-20 6 -14 22M50 -84q20 6 14 22" fill="none" stroke="#8a4a22" strokeWidth="6" />
      {steam && <path d="M-14 -110q-10 -20 6 -40M14 -112q10 -20 -4 -40" fill="none" stroke="#f4ecdd" strokeWidth="5" opacity="0.45" strokeLinecap="round" />}
    </g>
  );
}

/** The seven-point star piñata. */
export function Pinata({ x, y, s = 1, broken = false }: { x: number; y: number; s?: number; broken?: boolean }) {
  const pts = Array.from({ length: 7 }, (_, i) => (i / 7) * Math.PI * 2 - Math.PI / 2);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <line x1="0" y1="-60" x2="0" y2="-400" stroke="#6b4a1e" strokeWidth="3" />
      {!broken && pts.map((a, i) => (
        <g key={i}>
          <path d={`M${Math.cos(a - 0.2) * 44} ${Math.sin(a - 0.2) * 44}L${Math.cos(a) * 110} ${Math.sin(a) * 110}L${Math.cos(a + 0.2) * 44} ${Math.sin(a + 0.2) * 44}Z`} fill={PICADO[i % PICADO.length]} />
          <path d={`M${Math.cos(a) * 110} ${Math.sin(a) * 110}l${Math.cos(a) * 16} ${Math.sin(a) * 16 + 18}`} stroke={PICADO[(i + 2) % PICADO.length]} strokeWidth="5" />
        </g>
      ))}
      {broken ? (
        <g>
          <path d="M-40 -40q40 30 80 0l-10 40h-60Z" fill="#b8642f" />
          {[-80, -40, 10, 60, 100].map((dx, i) => <path key={dx} d={`M${dx} ${360 + (i % 2) * 20}l20 -30l12 34Z`} fill={PICADO[i]} />)}
        </g>
      ) : (
        <circle r="50" fill="#b8642f" stroke="#f0cf3a" strokeWidth="6" />
      )}
    </g>
  );
}
