/* The Minas Gerais family's shared pieces: colonial row houses with bright
   window frames, a baroque church, the wood-burning stove, pão de queijo,
   a football, and one small trickster in a red cap. */

export const MG = {
  whitewash: "#f4f0e6",
  frames: ["#2d6ab8", "#e8b830", "#2f7d4a", "#c8452f"],
  tile: "#b8603a",
  cobble: "#8a8070",
  cobbleLine: "#6a6050",
};

/** A colonial Minas row house: whitewashed walls, coloured window frames, a terracotta roof. */
export function Casario({ x, w = 360, h = 280, y = 760, frame = MG.frames[0], wall = MG.whitewash, lit = false }: { x: number; w?: number; h?: number; y?: number; frame?: string; wall?: string; lit?: boolean }) {
  const top = y - h;
  const n = Math.max(2, Math.floor(w / 110));
  return (
    <g>
      <path d={`M${x - 24} ${top + 10}L${x + 20} ${top - 50}H${x + w - 20}L${x + w + 24} ${top + 10}Z`} fill={MG.tile} />
      {Array.from({ length: Math.floor((w + 40) / 22) }, (_, i) => <path key={i} d={`M${x - 20 + i * 22} ${top + 8}q11 -8 22 0`} stroke="#8a4020" strokeWidth="2" fill="none" />)}
      <rect x={x} y={top + 10} width={w} height={h - 10} fill={wall} />
      <rect x={x} y={y - 30} width={w} height="30" fill={frame} opacity="0.35" />
      {Array.from({ length: n }, (_, i) => {
        const wx = x + 24 + i * ((w - 48) / n);
        const ww = (w - 48) / n - 28;
        const isDoor = i === Math.floor(n / 2);
        return isDoor ? (
          <g key={i}>
            <rect x={wx - 6} y={y - 170} width={ww + 12} height="170" fill={frame} />
            <rect x={wx} y={y - 162} width={ww} height="162" fill="#6b4429" />
            <line x1={wx + ww / 2} y1={y - 162} x2={wx + ww / 2} y2={y} stroke="#4a2a18" strokeWidth="3" />
          </g>
        ) : (
          <g key={i}>
            <rect x={wx - 6} y={top + 50} width={ww + 12} height="110" fill={frame} />
            <rect x={wx} y={top + 56} width={ww} height="98" fill={lit ? "#ffd98a" : "#3a3a44"} />
            <line x1={wx + ww / 2} y1={top + 56} x2={wx + ww / 2} y2={top + 154} stroke={frame} strokeWidth="4" />
          </g>
        );
      })}
    </g>
  );
}

/** A baroque church: white facade, two bell towers, a curved gable, gold trim. */
export function Igreja({ x, y = 760, s = 1 }: { x: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-170" y="-360" width="340" height="360" fill="#f4f0e6" />
      <path d="M-120 -360q0 -70 60 -80q60 -40 120 0q60 10 60 80Z" fill="#f4f0e6" />
      <path d="M-120 -360q0 -70 60 -80q60 -40 120 0q60 10 60 80" fill="none" stroke="#c9a24a" strokeWidth="5" />
      {[-210, 170].map((tx) => (
        <g key={tx}>
          <rect x={tx} y="-470" width="80" height="470" fill="#f4f0e6" stroke="#8a7a5a" strokeWidth="3" />
          <rect x={tx + 20} y="-440" width="40" height="56" rx="20" fill="#3a3a3a" />
          <path d={`M${tx - 6} -470q46 -70 92 0Z`} fill="#8a7a5a" />
          <rect x={tx + 36} y="-520" width="8" height="30" fill="#c9a24a" />
        </g>
      ))}
      <path d="M-50 0v-160q50 -60 100 0v160Z" fill="#2d6ab8" />
      <path d="M-50 0v-160q50 -60 100 0v160" fill="none" stroke="#c9a24a" strokeWidth="6" />
      <circle cx="0" cy="-250" r="34" fill="#3a3a3a" stroke="#c9a24a" strokeWidth="4" />
      {[-120, 80].map((wx) => <rect key={wx} x={wx} y="-300" width="40" height="70" fill="#3a3a3a" stroke="#2d6ab8" strokeWidth="5" />)}
    </g>
  );
}

/** A wood-burning stove: white-tiled, iron top, a coffee pot on it. */
export function FogaoLenha({ x, y = 760, lit = true }: { x: number; y?: number; lit?: boolean }) {
  return (
    <g>
      <rect x={x} y={y - 170} width="360" height="170" fill="#e8e0d0" />
      {Array.from({ length: 18 }, (_, i) => <rect key={i} x={x + (i % 9) * 40} y={y - 170 + Math.floor(i / 9) * 40} width="38" height="38" fill="none" stroke="#c8c0b0" />)}
      <rect x={x - 10} y={y - 186} width="380" height="18" fill="#2a2a2e" />
      <rect x={x + 40} y={y - 90} width="90" height="60" rx="6" fill={lit ? "#f08a2a" : "#2a2a2e"} />
      {lit && <path d={`M${x + 60} ${y - 34}q10 -30 20 -10q10 -30 20 0`} fill="#fbd060" />}
      <rect x={x + 280} y={y - 420} width="40" height="240" fill="#8a8078" />
      <path d={`M${x + 200} ${y - 186}v-44h50v44Z`} fill="#c8c8cc" />
      <path d={`M${x + 250} ${y - 220}q20 4 16 24`} stroke="#c8c8cc" strokeWidth="5" fill="none" />
      <path d={`M${x + 210} ${y - 240}q-6 -20 6 -36M${x + 236} ${y - 240}q6 -20 -6 -36`} stroke="#f4ecdd" strokeWidth="4" fill="none" opacity="0.5" />
    </g>
  );
}

export function PaoDeQueijo({ x = 0, y = 0, r = 16 }: { x?: number; y?: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#e8c070" />
      <circle cx={-r * 0.3} cy={-r * 0.3} r={r * 0.4} fill="#f4dca0" />
      <circle cx={r * 0.35} cy={r * 0.2} r={r * 0.12} fill="#c89a40" />
    </g>
  );
}

export function Football() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="26" fill="#f4f4f4" stroke="#2a2a2a" strokeWidth="2" />
      <path d="M32 20l10 7l-4 12h-12l-4 -12Z" fill="#2a2a2a" />
      <path d="M32 20v-14M42 27l12 -4M38 39l8 10M26 39l-8 10M22 27l-12 -4" stroke="#2a2a2a" strokeWidth="2" />
    </svg>
  );
}

/** The Saci-Pererê: one leg, a red cap, a pipe, mid-hop. */
export function Saci({ x, y, s = 1, color = "#2a1a12" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-4" y="-50" width="10" height="50" rx="4" fill={color} />
      <path d="M-18 -50q0 -46 20 -46t20 46Z" fill={color} />
      <circle cx="2" cy="-108" r="14" fill={color} />
      <path d="M-12 -114q14 -34 34 -14q-6 4 -8 10Z" fill="#d8302a" />
      <path d="M14 -104h14v-8" stroke="#8a5a34" strokeWidth="3" fill="none" />
      <path d="M-18 -80l-16 -12M20 -80l14 -16" stroke={color} strokeWidth="7" strokeLinecap="round" />
    </g>
  );
}
