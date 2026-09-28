/* The Chinese-American family's shared pieces: New Year red and gold from
   Chapter One, and Nǎinai's hometown on the Shandong coast. */

export const SC = "'Noto Serif SC', 'Songti SC', 'SimSun', serif";
export const RED = "#c0392b";
export const GOLD = "#e8c25a";

export function Lantern({ x, y, s = 1, glow = true }: { x: number; y: number; s?: number; glow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <line x1="0" y1={-y / s} x2="0" y2="-66" stroke="#3a2718" strokeWidth="2" />
      {glow && <circle r="90" fill="url(#lamp-glow)" opacity="0.6" />}
      <rect x="-26" y="-68" width="52" height="12" rx="3" fill={GOLD} />
      <ellipse rx="52" ry="58" fill={RED} />
      {[-30, -12, 12, 30].map((dx) => <path key={dx} d={`M${dx} -56 Q${dx * 1.5} 0 ${dx} 56`} fill="none" stroke="#8e2418" strokeWidth="2" />)}
      <rect x="-26" y="54" width="52" height="12" rx="3" fill={GOLD} />
      <path d="M0 66v40M-6 72v30M6 72v30" stroke={GOLD} strokeWidth="3" />
    </g>
  );
}

export function FuDiamond({ x, y, size = 90 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-size / 2} y={-size / 2} width={size} height={size} fill={RED} stroke={GOLD} strokeWidth="4" transform="rotate(45)" />
      {/* upside down, on purpose */}
      <text transform="rotate(180)" textAnchor="middle" dominantBaseline="central" fontFamily={SC} fontSize={size * 0.62} fill={GOLD} fontWeight="700">福</text>
    </g>
  );
}

export function Couplet({ x, y, chars, vertical = true }: { x: number; y: number; chars: string; vertical?: boolean }) {
  const n = [...chars].length;
  const w = vertical ? 34 : n * 36 + 10;
  const h = vertical ? n * 38 + 10 : 40;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={RED} />
      {[...chars].map((c, i) => (
        <text key={i} x={vertical ? x + w / 2 : x + 23 + i * 36} y={vertical ? y + 26 + i * 38 : y + 28} textAnchor="middle" fontFamily={SC} fontSize="24" fill="#1a0d08">{c}</text>
      ))}
    </g>
  );
}

/* ---------------- Yantai, on the Shandong coast ---------------- */

/** A six-storey residential block: white tile, blue glass, laundry on the balconies. */
export function Block({ x, w = 360, h = 520, y = 760, tint = "#ece6da", lit = false }: { x: number; w?: number; h?: number; y?: number; tint?: string; lit?: boolean }) {
  const floors = Math.floor(h / 86);
  const cols = Math.max(2, Math.floor(w / 110));
  return (
    <g>
      <rect x={x} y={y - h} width={w} height={h} fill={tint} />
      <rect x={x - 8} y={y - h - 12} width={w + 16} height="14" fill="#b8b0a0" />
      {Array.from({ length: floors * cols }, (_, i) => {
        const fx = x + 20 + (i % cols) * ((w - 40) / cols);
        const fy = y - h + 24 + Math.floor(i / cols) * 86;
        const cw = (w - 40) / cols - 18;
        return (
          <g key={i}>
            <rect x={fx} y={fy} width={cw} height="52" fill={lit && (i * 7) % 3 === 0 ? "#ffd98a" : "#6a8aa8"} opacity="0.9" />
            <rect x={fx - 4} y={fy + 50} width={cw + 8} height="8" fill="#d6ceba" />
            {(i * 5) % 4 === 1 && <path d={`M${fx + 6} ${fy + 8}h${cw - 12}`} stroke="#8a6a4a" strokeWidth="2" />}
            {(i * 5) % 4 === 1 && [0, 1, 2].map((k) => <rect key={k} x={fx + 10 + k * (cw / 3.2)} y={fy + 9} width={cw / 5} height="18" fill={["#c0392b", "#2d6ab8", "#f4ecdd"][k]} />)}
          </g>
        );
      })}
    </g>
  );
}

/** Bamboo steamers, stacked over a pot. */
export function Steamers({ x, y, n = 3, s = 1, steam = true }: { x: number; y: number; n?: number; s?: number; steam?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-70" y="-30" width="140" height="30" rx="6" fill="#6b6660" />
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x="-64" y={-62 - i * 32} width="128" height="32" rx="4" fill="#d6b27a" />
          <path d={`M-64 ${-46 - i * 32}h128`} stroke="#b8904a" strokeWidth="3" />
        </g>
      ))}
      <path d={`M-60 ${-62 - n * 32}q60 -30 120 0Z`} fill="#c9a06a" />
      {steam && <path d={`M-20 ${-80 - n * 32}q-12 -22 4 -44M24 ${-82 - n * 32}q12 -22 -4 -44`} fill="none" stroke="#f4ecdd" strokeWidth="6" opacity="0.5" strokeLinecap="round" />}
    </g>
  );
}

/** Shandong scallions: taller than a child, tied in bundles. */
export function Scallions({ x, y, n = 6, h = 200 }: { x: number; y: number; n?: number; h?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const cx = x + i * 12 - n * 6;
        return (
          <g key={i}>
            <rect x={cx - 4} y={y - h * 0.55} width="9" height={h * 0.55} fill="#f2efe2" />
            <path d={`M${cx} ${y - h * 0.55}q${i % 2 ? -14 : 14} ${-h * 0.25} ${i % 2 ? -8 : 10} ${-h * 0.45}`} stroke="#4f8a3a" strokeWidth="8" fill="none" strokeLinecap="round" />
          </g>
        );
      })}
      <rect x={x - n * 6 - 6} y={y - h * 0.3} width={n * 12 + 4} height="8" fill={RED} />
    </g>
  );
}

/** A round mooncake, top view, with its pressed pattern. */
export function Mooncake({ x = 0, y = 0, r = 30 }: { x?: number; y?: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#b8762e" />
      <circle r={r * 0.82} fill="#c98a3a" />
      {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={Math.cos((i / 12) * Math.PI * 2) * r * 0.9} cy={Math.sin((i / 12) * Math.PI * 2) * r * 0.9} r={r * 0.12} fill="#b8762e" />)}
      <text textAnchor="middle" dominantBaseline="central" fontFamily={SC} fontSize={r * 0.7} fill="#8a4a1e">月</text>
    </g>
  );
}

/** Grey roof tiles along the top of a wall. */
export function TileEave({ x1 = 0, x2 = 1600, y }: { x1?: number; x2?: number; y: number }) {
  return (
    <g>
      <rect x={x1} y={y} width={x2 - x1} height="26" fill="#5a5a5e" />
      {Array.from({ length: Math.ceil((x2 - x1) / 30) }, (_, i) => <path key={i} d={`M${x1 + i * 30} ${y + 26}q15 14 30 0`} fill="#4a4a4e" />)}
    </g>
  );
}

/** A round wooden table, seen from the side, with stools. */
export function RoundTable({ x, y = 760, w = 460, cloth = "#8a3a2a" }: { x: number; y?: number; w?: number; cloth?: string }) {
  return (
    <g>
      <ellipse cx={x} cy={y - 140} rx={w / 2} ry="30" fill={cloth} />
      <rect x={x - w / 2} y={y - 140} width={w} height="16" fill="#5a2a1e" />
      <rect x={x - 14} y={y - 126} width="28" height="126" fill="#4a2a1a" />
      <ellipse cx={x} cy={y - 4} rx="70" ry="10" fill="#3a2016" />
    </g>
  );
}
