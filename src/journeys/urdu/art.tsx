/* The Lahore family's shared pieces: brick havelis with carved wooden
   balconies, the domes and minarets of the old city, a pigeon loft, a
   charpai, a clay ghara, a crow and a stack of glass bangles. */

export const UR = "'Noto Nastaliq Urdu', 'Noto Naskh Arabic', serif";

export const LHR = {
  brick: "#b8604a",
  brickDark: "#98483a",
  wood: "#6a4028",
  sandstone: "#c8704a",
  marble: "#f4f0e6",
  green: "#1f5a3a",
};

/** An old-city haveli: small Lahori bricks, a carved wooden jharokha balcony. */
export function Haveli({ x, w = 380, h = 440, y = 760, lit = false, tint = LHR.brick }: { x: number; w?: number; h?: number; y?: number; lit?: boolean; tint?: string }) {
  const top = y - h;
  return (
    <g>
      <rect x={x} y={top} width={w} height={h} fill={tint} />
      {Array.from({ length: Math.floor(h / 14) }, (_, r) => <line key={r} x1={x} y1={top + r * 14} x2={x + w} y2={top + r * 14} stroke={LHR.brickDark} strokeWidth="1.5" opacity="0.5" />)}
      <rect x={x - 6} y={top - 10} width={w + 12} height="14" fill={LHR.brickDark} />
      {/* the jharokha: a carved wooden box balcony */}
      <g transform={`translate(${x + w * 0.22} ${top + h * 0.18})`}>
        <rect x="-12" y="120" width={w * 0.56 + 24} height="18" fill={LHR.wood} />
        <rect x="0" y="0" width={w * 0.56} height="120" fill={LHR.wood} />
        {Array.from({ length: 4 }, (_, i) => (
          <path key={i} d={`M${8 + i * (w * 0.135)} 110v-70q${w * 0.05} -30 ${w * 0.1} 0v70Z`} fill={lit ? "#ffd98a" : "#3a2418"} />
        ))}
        <path d={`M-12 0l${w * 0.28 + 12} -30l${w * 0.28 + 12} 30Z`} fill={LHR.wood} />
        {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={4 + i * (w * 0.07)} cy="130" r="4" fill="#c9a24a" />)}
      </g>
      <path d={`M${x + w * 0.38} ${y}v-130q${w * 0.12} -50 ${w * 0.24} 0v130Z`} fill={LHR.wood} />
      <circle cx={x + w * 0.56} cy={y - 60} r="5" fill="#c9a24a" />
    </g>
  );
}

/** The old city skyline: a red sandstone mosque with white marble domes and minarets. */
export function Skyline({ y = 520, color = LHR.sandstone, dome = LHR.marble, opacity = 1 }: { y?: number; color?: string; dome?: string; opacity?: number }) {
  return (
    <g opacity={opacity}>
      <rect x="560" y={y - 120} width="480" height="120" fill={color} />
      {[640, 800, 960].map((cx, i) => (
        <g key={cx}>
          <path d={`M${cx - (i === 1 ? 70 : 50)} ${y - 120}q${i === 1 ? 70 : 50} ${i === 1 ? -150 : -110} ${i === 1 ? 140 : 100} 0Z`} fill={dome} />
          <rect x={cx - 3} y={y - (i === 1 ? 290 : 250)} width="6" height="30" fill="#c9a24a" />
        </g>
      ))}
      {[480, 1120].map((mx) => (
        <g key={mx}>
          <rect x={mx - 18} y={y - 330} width="36" height="330" fill={color} />
          <rect x={mx - 26} y={y - 250} width="52" height="10" fill={dome} />
          <rect x={mx - 26} y={y - 170} width="52" height="10" fill={dome} />
          <path d={`M${mx - 26} ${y - 330}q26 -50 52 0Z`} fill={dome} />
        </g>
      ))}
    </g>
  );
}

/** Dada's pigeon loft: a wooden cage on legs, with a bamboo pole and a flag for signalling. */
export function PigeonLoft({ x, y = 760 }: { x: number; y?: number }) {
  return (
    <g>
      {[x, x + 220].map((lx) => <rect key={lx} x={lx} y={y - 160} width="12" height="160" fill={LHR.wood} />)}
      <rect x={x - 10} y={y - 300} width="252" height="150" fill="#8a6040" />
      {Array.from({ length: 10 }, (_, i) => <line key={i} x1={x - 10 + i * 28} y1={y - 300} x2={x - 10 + i * 28} y2={y - 150} stroke="#5a3a22" strokeWidth="3" />)}
      <path d={`M${x - 20} ${y - 300}l136 -40l136 40Z`} fill="#6a4028" />
      <path d={`M${x + 250} ${y - 300}v-260`} stroke="#c8b070" strokeWidth="6" />
      <path d={`M${x + 250} ${y - 560}l70 20l-70 20Z`} fill={LHR.green} />
    </g>
  );
}

export function Pigeon({ x, y, s = 1, flying = false, color = "#8a92a8" }: { x: number; y: number; s?: number; flying?: boolean; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse rx="16" ry="10" fill={color} />
      <circle cx="14" cy="-8" r="7" fill={color} />
      <path d="M20 -8l7 2l-7 2Z" fill="#c8a060" />
      <circle cx="16" cy="-9" r="1.5" fill="#2a1a12" />
      {flying ? <path d="M-6 -6l-14 -22l20 12ZM4 -6l6 -24l6 20Z" fill={color} /> : <path d="M-14 -2l-10 4l10 4Z" fill={color} />}
    </g>
  );
}

/** A charpai: a woven cot. */
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

/** A clay ghara: the round water pot with a narrow neck. */
export function Ghara({ x, y, s = 1, level = 0 }: { x: number; y: number; s?: number; level?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-18 -110h36v14q44 12 44 52q0 44 -62 44q-62 0 -62 -44q0 -40 44 -52Z" fill="#b8642f" />
      <ellipse cx="0" cy="-110" rx="20" ry="6" fill="#8a4a22" />
      {level > 0 && <ellipse cx="0" cy={-110 + (1 - level) * 80} rx="14" ry="4" fill="#5a8aa8" />}
      <path d="M-50 -46q50 18 100 0" stroke="#f4ecdd" strokeWidth="3" fill="none" strokeDasharray="6 6" opacity="0.7" />
    </g>
  );
}

export function Crow({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse rx="22" ry="13" fill="#1a1a22" />
      <path d="M-18 -2l-18 8l18 4Z" fill="#1a1a22" />
      <circle cx="18" cy="-12" r="10" fill="#3a3a44" />
      <path d="M26 -12l14 4l-14 3Z" fill="#2a2a2a" />
      <circle cx="21" cy="-14" r="2" fill="#f4f4f4" />
      <path d="M-4 12v12M6 12v12" stroke="#2a2a2a" strokeWidth="3" />
    </g>
  );
}

/** A stack of glass bangles. */
export function Bangles({ x, y, colors, s = 1 }: { x: number; y: number; colors: string[]; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {colors.map((c, i) => <ellipse key={i} cx="0" cy={-i * 7} rx="26" ry="8" fill="none" stroke={c} strokeWidth="5" />)}
    </g>
  );
}
