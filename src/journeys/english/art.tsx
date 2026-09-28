/* The Yorkshire family's shared pieces: red-brick terraces with chimney
   pots, a red pillar box and phone box, a teapot and kettle, wellies,
   and a theatre with a red velvet curtain. */

export const GB = {
  brick: "#a8503a",
  brickDark: "#884030",
  stone: "#c8b898",
  navy: "#2a3a6a",
  red: "#b8303a",
  doors: ["#2a3a6a", "#1f5a3a", "#b8303a", "#e8b830"],
};

/** A row of red-brick terraced houses: bay windows, coloured doors, chimney pots. */
export function Terrace({ x, n = 3, w = 180, h = 320, y = 760, lit = false }: { x: number; n?: number; w?: number; h?: number; y?: number; lit?: boolean }) {
  const top = y - h;
  return (
    <g>
      <path d={`M${x - 10} ${top}l30 -70h${n * w - 40}l30 70Z`} fill="#4a4a54" />
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={x + i * w + w * 0.4} y={top - 110} width="40" height="50" fill={GB.brickDark} />
          {[0, 1].map((k) => <rect key={k} x={x + i * w + w * 0.4 + 4 + k * 18} y={top - 128} width="14" height="20" fill="#b86a4a" />)}
        </g>
      ))}
      <rect x={x} y={top} width={n * w} height={h} fill={GB.brick} />
      {Array.from({ length: Math.floor(h / 16) }, (_, r) => <line key={r} x1={x} y1={top + r * 16} x2={x + n * w} y2={top + r * 16} stroke={GB.brickDark} strokeWidth="1.2" opacity="0.4" />)}
      {Array.from({ length: n }, (_, i) => {
        const hx = x + i * w;
        return (
          <g key={i}>
            <rect x={hx + 20} y={top + 40} width={w * 0.5} height="80" fill={lit ? "#ffd98a" : "#4a5a6a"} stroke="#f4f0e6" strokeWidth="6" />
            <path d={`M${hx + 14} ${y}v-150h${w * 0.5 + 12}v150Z`} fill="#f4f0e6" opacity="0.9" />
            <rect x={hx + 22} y={y - 140} width={w * 0.5 - 4} height="96" fill={lit ? "#ffd98a" : "#4a5a6a"} />
            <rect x={hx + w * 0.66} y={y - 140} width={w * 0.26} height="140" fill={GB.doors[i % GB.doors.length]} />
            <circle cx={hx + w * 0.7} cy={y - 70} r="3" fill="#c9a24a" />
            <rect x={hx + w * 0.66} y={y - 150} width={w * 0.26} height="8" fill="#f4f0e6" />
          </g>
        );
      })}
    </g>
  );
}

/** A shopfront on the high street: painted fascia, big window, awning. */
export function Shopfront({ x, w = 300, h = 360, y = 760, sign, color = GB.navy, lit = false }: { x: number; w?: number; h?: number; y?: number; sign: string; color?: string; lit?: boolean }) {
  const top = y - h;
  return (
    <g>
      <rect x={x} y={top} width={w} height={h} fill={GB.stone} />
      <rect x={x + 30} y={top + 30} width={w * 0.3} height="80" fill={lit ? "#ffd98a" : "#4a5a6a"} stroke="#f4f0e6" strokeWidth="5" />
      <rect x={x + w * 0.6} y={top + 30} width={w * 0.3} height="80" fill={lit ? "#ffd98a" : "#4a5a6a"} stroke="#f4f0e6" strokeWidth="5" />
      <rect x={x} y={y - 210} width={w} height="46" fill={color} />
      <text x={x + w / 2} y={y - 178} textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="24" letterSpacing="3" fill="#f4ecdd">{sign}</text>
      <rect x={x + 12} y={y - 164} width={w * 0.62} height="164" fill={lit ? "#ffe8b0" : "#dfe8ee"} opacity="0.85" />
      <rect x={x + w * 0.7} y={y - 164} width={w * 0.24} height="164" fill={color} />
    </g>
  );
}

export function PillarBox({ x, y = 760 }: { x: number; y?: number }) {
  return (
    <g>
      <rect x={x - 24} y={y - 130} width="48" height="130" rx="6" fill={GB.red} />
      <path d={`M${x - 28} ${y - 130}q28 -30 56 0Z`} fill={GB.red} />
      <rect x={x - 14} y={y - 100} width="28" height="6" fill="#2a1a12" />
      <rect x={x - 26} y={y - 10} width="52" height="10" fill="#2a1a12" />
    </g>
  );
}

export function PhoneBox({ x, y = 760 }: { x: number; y?: number }) {
  return (
    <g>
      <rect x={x - 40} y={y - 260} width="80" height="260" fill={GB.red} />
      <path d={`M${x - 44} ${y - 260}q44 -30 88 0Z`} fill={GB.red} />
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={x - 30 + (i % 2) * 32} y={y - 220 + Math.floor(i / 2) * 44} width="28" height="38" fill="#dfe8ee" opacity="0.8" />)}
      <rect x={x - 30} y={y - 250} width="60" height="14" fill="#1a1a1a" />
    </g>
  );
}

export function Teapot({ x, y, s = 1, color = "#2a3a6a" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="-30" rx="40" ry="30" fill={color} />
      <path d="M38 -34q30 -10 28 -32" stroke={color} strokeWidth="8" fill="none" />
      <path d="M-40 -40q-24 4 -18 26" stroke={color} strokeWidth="7" fill="none" />
      <ellipse cx="0" cy="-58" rx="16" ry="6" fill={color} />
      <circle cx="0" cy="-66" r="5" fill={color} />
      <path d="M-24 -30q24 10 48 0" stroke="#f4f0e6" strokeWidth="3" fill="none" opacity="0.6" />
    </g>
  );
}

export function Wellies({ x, y = 760, color = "#1f5a3a" }: { x: number; y?: number; color?: string }) {
  return (
    <g>
      {[0, 36].map((dx) => <path key={dx} d={`M${x + dx} ${y}v-80h28v58h14v22Z`} fill={color} />)}
    </g>
  );
}

/** A theatre stage: proscenium arch, red velvet curtains, footlights. */
export function Proscenium({ open = true }: { open?: boolean }) {
  return (
    <g>
      <rect x="180" y="140" width="1240" height="560" fill="#1a1020" />
      {open ? (
        <>
          <path d="M180 140h260q-40 280 0 560h-260Z" fill="#8a1a2a" />
          <path d="M1420 140h-260q40 280 0 560h260Z" fill="#8a1a2a" />
        </>
      ) : (
        <rect x="180" y="140" width="1240" height="560" fill="#8a1a2a" />
      )}
      {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${200 + i * 20} 150v540`} stroke="#6a1020" strokeWidth="3" opacity={open && i > 10 ? 0 : 0.5} />)}
      <path d="M140 100h1320v60q-660 60 -1320 0Z" fill="#8a1a2a" />
      <path d="M140 100h1320" stroke="#c9a24a" strokeWidth="12" />
      <rect x="120" y="100" width="40" height="660" fill="#c9a24a" />
      <rect x="1440" y="100" width="40" height="660" fill="#c9a24a" />
      <rect x="160" y="700" width="1280" height="40" fill="#5a3a22" />
      {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={220 + i * 76} cy="706" r="6" fill="#ffd98a" />)}
    </g>
  );
}
