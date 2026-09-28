/* The Lyon family's shared pieces: golden-stone village houses, Lyon
   façades with zinc roofs and iron balconies, plane trees, a fountain,
   pétanque boules, the galette and its crown. */

export const FR = {
  doree: ["#e0b870", "#d8a860", "#e8c888"],
  lyon: ["#f0dcc0", "#e8c8a8", "#f2e4c8", "#e0b8a0"],
  zinc: "#6a7280",
  shutter: ["#5a7a6a", "#7a8aa8", "#4a6a8a"],
  tile: "#b8603a",
};

/** A pierres-dorées village house: golden stone, terracotta roof, shutters. */
export function StoneCottage({ x, w = 360, h = 300, y = 760, stone = FR.doree[0], shutter = FR.shutter[0], lit = false }: { x: number; w?: number; h?: number; y?: number; stone?: string; shutter?: string; lit?: boolean }) {
  const top = y - h;
  return (
    <g>
      <path d={`M${x - 20} ${top}L${x + w * 0.2} ${top - 70}H${x + w * 0.8}L${x + w + 20} ${top}Z`} fill={FR.tile} />
      {Array.from({ length: Math.floor(w / 26) }, (_, i) => <path key={i} d={`M${x - 10 + i * 26} ${top}l12 -8`} stroke="#8a4020" strokeWidth="2" opacity="0.6" />)}
      <rect x={x} y={top} width={w} height={h} fill={stone} />
      {Array.from({ length: 18 }, (_, i) => <rect key={i} x={x + ((i * 53) % (w - 30))} y={top + 20 + ((i * 37) % (h - 40))} width={22 + (i % 3) * 8} height="12" rx="3" fill="#000" opacity="0.06" />)}
      {[0.18, 0.62].map((f) => (
        <g key={f}>
          <rect x={x + w * f} y={top + h * 0.18} width={w * 0.2} height={h * 0.26} fill={lit ? "#ffd98a" : "#3a3a3a"} />
          <rect x={x + w * f - w * 0.1} y={top + h * 0.18} width={w * 0.1} height={h * 0.26} fill={shutter} />
          <rect x={x + w * f + w * 0.2} y={top + h * 0.18} width={w * 0.1} height={h * 0.26} fill={shutter} />
        </g>
      ))}
      <path d={`M${x + w * 0.4} ${y}v-120q${w * 0.1} -30 ${w * 0.2} 0v120Z`} fill="#6b4429" />
      <circle cx={x + w * 0.56} cy={y - 60} r="4" fill="#c9a24a" />
    </g>
  );
}

/** A Lyon façade: tall pale building, mansard zinc roof with dormers, French windows, iron balconies. */
export function Facade({ x, w = 420, h = 560, y = 760, tint = FR.lyon[0], lit = false, shop }: { x: number; w?: number; h?: number; y?: number; tint?: string; lit?: boolean; shop?: string }) {
  const top = y - h;
  const cols = Math.max(2, Math.floor(w / 120));
  const floors = Math.floor((h - 140) / 110);
  return (
    <g>
      <path d={`M${x} ${top}l24 -70h${w - 48}l24 70Z`} fill={FR.zinc} />
      {Array.from({ length: cols }, (_, i) => <rect key={i} x={x + 40 + i * ((w - 80) / cols) + 10} y={top - 60} width="36" height="44" rx="14" fill="#8a929e" />)}
      <rect x={x} y={top} width={w} height={h} fill={tint} />
      <rect x={x} y={top} width={w} height="12" fill="#fff" opacity="0.3" />
      {Array.from({ length: floors * cols }, (_, i) => {
        const cx = x + 30 + (i % cols) * ((w - 60) / cols);
        const cy = top + 30 + Math.floor(i / cols) * 110;
        const cw = (w - 60) / cols - 30;
        return (
          <g key={i}>
            <rect x={cx} y={cy} width={cw} height="80" fill={lit && i % 3 === 0 ? "#ffd98a" : "#4a5a6a"} />
            <line x1={cx + cw / 2} y1={cy} x2={cx + cw / 2} y2={cy + 80} stroke={tint} strokeWidth="4" />
            <rect x={cx - 6} y={cy + 58} width={cw + 12} height="24" fill="none" stroke="#2a2a2e" strokeWidth="3" />
            {Array.from({ length: 5 }, (_, k) => <line key={k} x1={cx - 6 + (k + 1) * ((cw + 12) / 6)} y1={cy + 58} x2={cx - 6 + (k + 1) * ((cw + 12) / 6)} y2={cy + 82} stroke="#2a2a2e" strokeWidth="2" />)}
          </g>
        );
      })}
      {shop && (
        <g>
          <rect x={x + 20} y={y - 130} width={w - 40} height="130" fill="#2a3a5a" />
          <rect x={x + 36} y={y - 110} width={w - 72} height="110" fill="#f2e8d0" opacity="0.85" />
          <rect x={x + 20} y={y - 170} width={w - 40} height="40" fill="#1e2a44" />
          <text x={x + w / 2} y={y - 142} textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="24" letterSpacing="4" fill="#e8c25a">{shop}</text>
        </g>
      )}
    </g>
  );
}

/** A plane tree: mottled trunk, broad crown — the shade over every French square. */
export function Platane({ x, y = 760, h = 380 }: { x: number; y?: number; h?: number }) {
  return (
    <g>
      <path d={`M${x - 16} ${y}q-6 -${h * 0.4} 4 -${h * 0.6}h24q10 ${h * 0.2} 4 ${h * 0.6}Z`} fill="#b8b09a" />
      {[0.2, 0.35, 0.5].map((f, i) => <ellipse key={f} cx={x + (i % 2 ? 6 : -4)} cy={y - h * f} rx="9" ry="14" fill={i % 2 ? "#e8e0c8" : "#8a8470"} />)}
      {[[-90, 0.72, 110], [60, 0.78, 120], [-10, 0.92, 100], [120, 0.64, 80]].map(([dx, f, r], i) => (
        <circle key={i} cx={x + dx} cy={y - h * f} r={r} fill={i % 2 ? "#5a8a4a" : "#4a7a3e"} />
      ))}
    </g>
  );
}

export function Fontaine({ x, y = 760 }: { x: number; y?: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y - 10} rx="130" ry="24" fill="#a89a80" />
      <rect x={x - 130} y={y - 60} width="260" height="50" fill="#c8b890" />
      <ellipse cx={x} cy={y - 60} rx="130" ry="20" fill="#8ab0c8" />
      <rect x={x - 14} y={y - 180} width="28" height="120" fill="#c8b890" />
      <ellipse cx={x} cy={y - 180} rx="46" ry="10" fill="#c8b890" />
      <path d={`M${x - 8} ${y - 186}q-40 20 -50 110M${x + 8} ${y - 186}q40 20 50 110`} stroke="#bcd8e8" strokeWidth="4" fill="none" opacity="0.8" />
    </g>
  );
}

/** Pétanque boules on the gravel, and the little cochonnet. */
export function Boules({ x, y = 760, n = 4 }: { x: number; y?: number; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => <circle key={i} cx={x + ((i * 47) % 160) - 80} cy={y - 10 - (i % 2) * 6} r="12" fill="#9aa0a8" stroke="#6a7078" strokeWidth="2" />)}
      <circle cx={x} cy={y - 8} r="5" fill="#d8a040" />
    </g>
  );
}

export function Boule() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="26" fill="#9aa0a8" />
      <path d="M10 26q22 10 44 0M10 40q22 -10 44 0" stroke="#6a7078" strokeWidth="2.5" fill="none" />
      <ellipse cx="24" cy="22" rx="8" ry="5" fill="#fff" opacity="0.4" />
    </svg>
  );
}

/** A galette des rois: golden, scored in arcs, with its paper crown. */
export function Galette({ x = 0, y = 0, r = 60, cut = false }: { x?: number; y?: number; r?: number; cut?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse rx={r} ry={r * 0.32} fill="#b8762e" />
      <ellipse cy={-r * 0.08} rx={r * 0.96} ry={r * 0.28} fill="#e0a850" />
      {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M0 ${-r * 0.08}q${r * 0.4} ${-r * 0.1 + i * 3} ${r * 0.8 * Math.cos((i / 6) * Math.PI * 2)} ${r * 0.22 * Math.sin((i / 6) * Math.PI * 2)}`} stroke="#b8762e" strokeWidth="2" fill="none" />)}
      {cut && [0, 1, 2].map((i) => <line key={i} x1={-r * Math.cos((i / 3) * Math.PI)} y1={-r * 0.3 * Math.sin((i / 3) * Math.PI) - r * 0.08} x2={r * Math.cos((i / 3) * Math.PI)} y2={r * 0.3 * Math.sin((i / 3) * Math.PI) - r * 0.08} stroke="#8a5220" strokeWidth="3" />)}
    </g>
  );
}

export function Crown({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-40 0v-30l14 14l12 -24l14 24l14 -24l12 24l14 -14v30Z" fill="#e8c25a" />
      <rect x="-40" y="-6" width="80" height="8" fill="#c8a03a" />
      {[-20, 0, 20].map((dx) => <circle key={dx} cx={dx} cy="-12" r="3.5" fill="#b8452f" />)}
    </g>
  );
}

export function Baguette({ x, y, s = 1, rot = -20 }: { x: number; y: number; s?: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <rect x="-70" y="-10" width="140" height="20" rx="10" fill="#d8a050" />
      {[-40, -10, 20, 50].map((dx) => <path key={dx} d={`M${dx - 10} -6l16 10`} stroke="#b87830" strokeWidth="3" />)}
    </g>
  );
}
