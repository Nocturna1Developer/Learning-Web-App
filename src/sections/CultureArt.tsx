/**
 * One small piece of art per culture entry — drawn, not decorative gradient,
 * so each card carries the thing it is actually about.
 * All share the same palette and flat-shape language as the world scenes.
 */

const FRAME = { w: 300, h: 400 };

function Plate({ children, a, b }: { children: React.ReactNode; a: string; b: string }) {
  return (
    <svg viewBox={`0 0 ${FRAME.w} ${FRAME.h}`} className="culture__art" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`cg-${a.slice(1)}-${b.slice(1)}`} cx="34%" cy="26%" r="86%">
          <stop offset="0%" stopColor={a} stopOpacity="0.85" />
          <stop offset="55%" stopColor={b} stopOpacity="0.45" />
          <stop offset="100%" stopColor="#150d08" stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect width={FRAME.w} height={FRAME.h} fill="#170f09" />
      <rect width={FRAME.w} height={FRAME.h} fill={`url(#cg-${a.slice(1)}-${b.slice(1)})`} />
      {children}
    </svg>
  );
}

/* Gongura — the sour red-stemmed sorrel leaf */
export function GonguraArt() {
  const leaf = (x: number, y: number, s: number, rot: number) => (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path
        d="M0 0 C-8 -26 -34 -34 -46 -58 C-30 -62 -14 -54 -4 -42 C-8 -62 -2 -84 6 -98 C16 -84 22 -62 18 -42 C30 -56 48 -64 62 -60 C52 -34 24 -26 14 0Z"
        fill="#2f7a4d"
      />
      <path d="M6 -98 C4 -66 4 -32 4 0" stroke="#a8352a" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M4 -70 L-22 -56 M4 -50 L26 -44 M4 -84 L20 -74" stroke="#a8352a" strokeWidth="2.4" opacity="0.8" />
      <path d="M4 0 L2 34" stroke="#a8352a" strokeWidth="6" strokeLinecap="round" />
    </g>
  );
  return (
    <Plate a="#1f6b4f" b="#a8352a">
      {leaf(112, 300, 1.95, -12)}
      {leaf(212, 224, 1.25, 22)}
      {leaf(74, 168, 0.9, -34)}
    </Plate>
  );
}

/* Sankranti — kites over a chalked doorstep */
export function SankrantiArt() {
  const kite = (x: number, y: number, s: number, rot: number, c: string, ac: string) => (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <polygon points="0,-30 20,0 0,34 -20,0" fill={c} />
      <polygon points="0,-30 20,0 0,0" fill={ac} />
      <polygon points="0,0 0,34 -20,0" fill={ac} opacity="0.55" />
      <path d="M0 34 C-8 46 10 58 0 72 C-9 84 6 92 1 104" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
  return (
    <Plate a="#d9a441" b="#c8704a">
      <circle cx="212" cy="84" r="44" fill="#ffe3a4" opacity="0.55" />
      {kite(92, 120, 1, -18, "#b8452f", "#f0cf7a")}
      {kite(206, 178, 0.75, 22, "#1f6b4f", "#ecc873")}
      {kite(148, 252, 0.55, 8, "#7a3a8a", "#e2a07f")}
      {/* sugarcane leaning in the corner */}
      <g stroke="#2f7a4d" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.85">
        <path d="M18 400 C34 330 44 268 40 214" />
        <path d="M46 400 C64 332 76 274 74 226" />
      </g>
      <path d="M40 214 q-26 -18 -34 -42 q28 4 40 30Z" fill="#2f7a4d" opacity="0.85" />
      <path d="M74 226 q24 -20 32 -46 q-28 6 -38 34Z" fill="#2f7a4d" opacity="0.85" />
    </Plate>
  );
}

/* Keertana — a veena neck and notation */
export function KeertanaArt() {
  return (
    <Plate a="#7a3a8a" b="#d9a441">
      {/* resonator */}
      <ellipse cx="96" cy="292" rx="66" ry="58" fill="#8a4a2a" />
      <ellipse cx="96" cy="286" rx="46" ry="40" fill="#6b3220" />
      <circle cx="96" cy="278" r="13" fill="#241610" />
      {/* neck */}
      <path d="M132 254 L242 96 L262 110 L152 268Z" fill="#8a4a2a" />
      <path d="M138 258 L246 104" stroke="#f0cf7a" strokeWidth="2" opacity="0.75" />
      <path d="M146 264 L252 110" stroke="#f0cf7a" strokeWidth="2" opacity="0.5" />
      {/* scroll head */}
      <path d="M242 96 C254 74 282 74 286 94 C290 112 268 122 258 110Z" fill="#6b3220" />
      {/* notes drifting up */}
      <g fill="#f0cf7a" opacity="0.8">
        <circle cx="196" cy="66" r="7" />
        <rect x="201" y="38" width="2.6" height="30" />
        <circle cx="150" cy="112" r="5.5" />
        <rect x="154" y="88" width="2.2" height="26" />
      </g>
    </Plate>
  );
}

/* Pochampally — ikat geometry with its characteristic feathered edge */
export function IkatArt() {
  const band = (y: number, c: string, o: number) => (
    <g opacity={o}>
      {Array.from({ length: 7 }, (_, i) => (
        <g key={i} transform={`translate(${18 + i * 44} ${y})`}>
          <polygon points="0,0 20,-24 40,0 20,24" fill={c} />
          <polygon points="20,-24 26,-16 20,-8 14,-16" fill="#f4ecdd" opacity="0.35" />
        </g>
      ))}
    </g>
  );
  return (
    <Plate a="#1f4d33" b="#e2a07f">
      <rect x="0" y="96" width="300" height="8" fill="#f4ecdd" opacity="0.25" />
      {band(140, "#1f4d33", 0.95)}
      {band(196, "#c8704a", 0.9)}
      {band(252, "#1f4d33", 0.8)}
      {band(308, "#c8704a", 0.6)}
      <rect x="0" y="352" width="300" height="8" fill="#f4ecdd" opacity="0.2" />
    </Plate>
  );
}

/* Tenali Rama — the court poet: palm-leaf manuscript and a jester's turban */
export function TenaliArt() {
  return (
    <Plate a="#9a4a2a" b="#ecc873">
      {/* stacked palm-leaf manuscript, bound through the middle */}
      <g transform="translate(150 268) rotate(-8)">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={-104} y={-6 + i * 15} width="208" height="12" rx="3" fill={i % 2 ? "#cbaa6e" : "#e0c48c"} />
        ))}
        <circle cx="0" cy="24" r="6" fill="#6b3220" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} opacity="0.5">
            <path d={`M-88 ${i * 15} h60`} stroke="#6b3220" strokeWidth="1.6" />
            <path d={`M-16 ${i * 15} h72`} stroke="#6b3220" strokeWidth="1.6" />
          </g>
        ))}
      </g>
      {/* turban above */}
      <g transform="translate(150 130)">
        <path d="M-56 24 C-56 -14 -26 -34 0 -34 C28 -34 56 -14 56 24Z" fill="#b8452f" />
        <path d="M-56 24 C-30 12 30 12 56 24 L56 34 L-56 34Z" fill="#8f3222" />
        <path d="M-40 6 C-14 -6 20 -6 44 4" stroke="#f0cf7a" strokeWidth="3.5" fill="none" />
        <path d="M0 -34 C6 -52 22 -58 32 -50 C20 -46 12 -40 8 -32Z" fill="#f0cf7a" />
      </g>
    </Plate>
  );
}

/* Perantam — turmeric, kumkum and flowers on a brass tray */
export function PerantamArt() {
  return (
    <Plate a="#c8704a" b="#f4ecdd">
      {/* tray */}
      <ellipse cx="150" cy="278" rx="118" ry="52" fill="#a8792c" />
      <ellipse cx="150" cy="268" rx="106" ry="45" fill="#c99a3e" />
      <ellipse cx="150" cy="266" rx="92" ry="37" fill="#8a6520" opacity="0.45" />
      {/* mounds */}
      {[
        { x: 104, c: "#d9a441", cap: "#f0cf7a" },
        { x: 150, c: "#a8352a", cap: "#c8503f" },
        { x: 196, c: "#f4ecdd", cap: "#ffffff" },
      ].map(({ x, c, cap }) => (
        <g key={x}>
          <path d={`M${x - 24} 268 a24 20 0 0 1 48 0Z`} fill={c} />
          <path d={`M${x - 10} 254 a10 8 0 0 1 20 0Z`} fill={cap} opacity="0.6" />
        </g>
      ))}
      {/* marigolds scattered */}
      {[[64, 200], [236, 210], [92, 330], [214, 326], [150, 190]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i % 2 ? 13 : 16} fill="#e0a03a" />
          <circle cx={x} cy={y} r={i % 2 ? 6 : 8} fill="#c8704a" />
        </g>
      ))}
    </Plate>
  );
}
