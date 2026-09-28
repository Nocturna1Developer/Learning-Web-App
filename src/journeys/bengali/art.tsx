/* The Bangladeshi family's shared pieces: a tin-roofed village house,
   banana plants, a river boat with its bamboo canopy, a pond of water
   lilies, a painted rickshaw, alpona, New Year masks and a lantern. */

export const BN = "'Noto Serif Bengali', 'Nirmala UI', serif";

export const BD = {
  tin: "#8a9aa8",
  mud: "#c8a070",
  green: "#1f6a4a",
  red: "#c8302a",
  river: "#5a8aa8",
};

/** A village house: mud walls, a corrugated tin roof, a blue door. */
export function TinHouse({ x, w = 380, h = 220, y = 760, wall = BD.mud, door = "#2d5a8a", lit = false }: { x: number; w?: number; h?: number; y?: number; wall?: string; door?: string; lit?: boolean }) {
  const top = y - h;
  return (
    <g>
      <path d={`M${x - 30} ${top}L${x + w / 2} ${top - 90}L${x + w + 30} ${top}Z`} fill={BD.tin} />
      {Array.from({ length: Math.floor((w + 60) / 18) }, (_, i) => <line key={i} x1={x - 30 + i * 18} y1={top} x2={x + w / 2} y2={top - 90} stroke="#6a7a88" strokeWidth="1.5" opacity="0.6" />)}
      <rect x={x} y={top} width={w} height={h} fill={wall} />
      <rect x={x} y={y - 26} width={w} height="26" fill="#a88050" />
      <rect x={x + w * 0.4} y={y - 150} width={w * 0.2} height="150" fill={door} />
      <rect x={x + w * 0.1} y={top + 50} width={w * 0.18} height="70" fill={lit ? "#ffd98a" : "#3a3024"} />
      <rect x={x + w * 0.72} y={top + 50} width={w * 0.18} height="70" fill={lit ? "#ffd98a" : "#3a3024"} />
      {[0.1, 0.72].map((f) => Array.from({ length: 3 }, (_, k) => <line key={`${f}${k}`} x1={x + w * f + (k + 1) * (w * 0.045)} y1={top + 50} x2={x + w * f + (k + 1) * (w * 0.045)} y2={top + 120} stroke={door} strokeWidth="3" />))}
    </g>
  );
}

export function BananaPlant({ x, y = 760, h = 260 }: { x: number; y?: number; h?: number }) {
  return (
    <g>
      <rect x={x - 10} y={y - h * 0.6} width="20" height={h * 0.6} fill="#7a8a4a" />
      {[-60, -20, 20, 60].map((a, i) => (
        <path key={a} d={`M${x} ${y - h * 0.6}q${Math.sin((a * Math.PI) / 180) * 140} -${h * 0.3} ${Math.sin((a * Math.PI) / 180) * 180} ${-h * 0.1 + (i % 2) * 40}`} stroke={i % 2 ? "#4f8a3a" : "#5a9a44"} strokeWidth="30" fill="none" strokeLinecap="round" />
      ))}
    </g>
  );
}

/** A river boat: long wooden hull, curved prow, a bamboo canopy (the chhoi). */
export function Nouka({ x, y, s = 1, canopy = true }: { x: number; y: number; s?: number; canopy?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-200 -20q20 30 60 30h280q40 0 60 -30q-40 10 -60 6h-280q-20 4 -60 -6Z" fill="#6b4429" />
      <path d="M-200 -20q-10 -20 -4 -36M200 -20q10 -20 4 -36" stroke="#6b4429" strokeWidth="8" fill="none" />
      {canopy && <path d="M-80 -14q80 -110 160 0Z" fill="#c8a060" />}
      {canopy && Array.from({ length: 7 }, (_, i) => <path key={i} d={`M${-70 + i * 23} -16q${10 - i * 3} -70 ${20 - i * 6} -84`} stroke="#a88040" strokeWidth="2" fill="none" />)}
      <path d="M-4 -14v-150M-4 -160l90 60h-90" stroke="#6b4429" strokeWidth="5" fill="#f4ecdd" />
    </g>
  );
}

/** Water lilies on a pond. */
export function Shapla({ x, y, n = 5 }: { x: number; y: number; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const cx = x + (i * 97) % 300;
        const cy = y + (i * 23) % 40;
        return (
          <g key={i}>
            <ellipse cx={cx} cy={cy + 6} rx="26" ry="8" fill="#3f7d3a" />
            {i % 2 === 0 && [-8, 0, 8].map((dx) => <path key={dx} d={`M${cx + dx} ${cy + 4}q${dx / 2} -20 ${dx} -22q${-dx / 2 + 6} 4 ${-dx + 0} 22Z`} fill="#f8f4f0" />)}
          </g>
        );
      })}
    </g>
  );
}

/** A painted cycle-rickshaw, the hood covered in flowers and birds. */
export function Rickshaw({ x, y = 760, s = 1 }: { x: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="-70" cy="-36" r="36" fill="none" stroke="#2a2a2a" strokeWidth="5" />
      <circle cx="70" cy="-36" r="36" fill="none" stroke="#2a2a2a" strokeWidth="5" />
      <circle cx="-190" cy="-30" r="30" fill="none" stroke="#2a2a2a" strokeWidth="5" />
      <path d="M-190 -30l60 -60h60M-130 -90l-10 -30" stroke="#2a2a2a" strokeWidth="5" fill="none" />
      <rect x="-100" y="-110" width="170" height="40" rx="6" fill={BD.red} />
      <path d="M-110 -110q80 -150 190 -10v10h-190Z" fill="#2d6ab8" />
      <path d="M-100 -130q70 -110 170 -10" stroke="#e8b830" strokeWidth="6" fill="none" />
      {[-60, -20, 20].map((dx, i) => <circle key={dx} cx={dx} cy={-170 + i * 10} r="10" fill={["#e8508a", "#f0c030", "#3f9a4a"][i]} />)}
      <rect x="-80" y="-70" width="130" height="22" fill="#e8b830" />
    </g>
  );
}

/** An alpona pattern: concentric petals in rice-paste white and colour. */
export function Alpona({ x, y, r = 120, colours = ["#f4f0e6", "#c8302a", "#e8b830"] }: { x: number; y: number; r?: number; colours?: string[] }) {
  return (
    <g transform={`translate(${x} ${y}) scale(1 0.32)`}>
      <circle r={r} fill="none" stroke={colours[0]} strokeWidth="8" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <ellipse key={i} cx={Math.cos(a) * r * 0.62} cy={Math.sin(a) * r * 0.62} rx={r * 0.18} ry={r * 0.08} transform={`rotate(${(a * 180) / Math.PI} ${Math.cos(a) * r * 0.62} ${Math.sin(a) * r * 0.62})`} fill={colours[1 + (i % 2)] ?? colours[1]} />;
      })}
      <circle r={r * 0.28} fill={colours[1]} />
      <circle r={r * 0.14} fill={colours[0]} />
    </g>
  );
}

/** A giant New Year procession mask: an owl, a tiger or a fish. */
export function Mukhosh({ x, y, s = 1, kind = "owl" }: { x: number; y: number; s?: number; kind?: "owl" | "tiger" | "fish" }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {kind === "owl" && (
        <>
          <path d="M-60 40q-20 -90 60 -110q80 20 60 110Z" fill="#e8b830" />
          <circle cx="-24" cy="-20" r="22" fill="#f4f0e6" /><circle cx="24" cy="-20" r="22" fill="#f4f0e6" />
          <circle cx="-24" cy="-20" r="10" fill="#2a1a12" /><circle cx="24" cy="-20" r="10" fill="#2a1a12" />
          <path d="M-8 2l8 16l8 -16Z" fill={BD.red} />
          <path d="M-60 -60l-10 -30l30 16M60 -60l10 -30l-30 16" fill="#e8b830" />
        </>
      )}
      {kind === "tiger" && (
        <>
          <circle r="70" fill="#f08a2a" />
          {[-40, -14, 14, 40].map((dx) => <path key={dx} d={`M${dx} -70q6 20 0 34`} stroke="#2a1a12" strokeWidth="7" fill="none" />)}
          <circle cx="-26" cy="-8" r="10" fill="#f4f0e6" /><circle cx="26" cy="-8" r="10" fill="#f4f0e6" />
          <circle cx="-26" cy="-8" r="5" fill="#2a1a12" /><circle cx="26" cy="-8" r="5" fill="#2a1a12" />
          <path d="M-20 30q20 20 40 0" stroke="#2a1a12" strokeWidth="5" fill="none" />
          <ellipse cy="14" rx="10" ry="7" fill="#2a1a12" />
        </>
      )}
      {kind === "fish" && (
        <>
          <path d="M-80 0q60 -60 130 0q-70 60 -130 0Z" fill="#9ab0c8" />
          <path d="M50 0l40 -30v60Z" fill="#9ab0c8" />
          <circle cx="-44" cy="-6" r="7" fill="#2a1a12" />
          {[-20, 0, 20].map((dx) => <path key={dx} d={`M${dx} -24q8 24 0 48`} stroke={BD.red} strokeWidth="4" fill="none" />)}
        </>
      )}
    </g>
  );
}

/** A hurricane lantern. */
export function Lantern({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cy="-40" r="110" fill="url(#lamp-glow)" />
      <rect x="-22" y="-8" width="44" height="10" fill="#6a2a2a" />
      <path d="M-16 -8q-8 -30 16 -50q24 20 16 50Z" fill="#fff4d0" opacity="0.8" />
      <path d="M0 -20q6 -12 0 -22q-6 10 0 22Z" fill="#f0a830" />
      <rect x="-14" y="-66" width="28" height="8" fill="#6a2a2a" />
      <path d="M-14 -70q14 -24 28 0" stroke="#3a3a3a" strokeWidth="3" fill="none" />
    </g>
  );
}
