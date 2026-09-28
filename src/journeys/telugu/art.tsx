import { FY } from "../scenes";
import { Muggu } from "../../components/scenes/primitives";

/* Ammamma's village near Guntur — the pieces chapters two to five share. */

export const T = {
  wall: "#efe3cc",
  wallShade: "#d9c7a6",
  roof: "#b8562f",
  roofDark: "#8a3a20",
  door: "#2f6b8a",
  pillar: "#f4ecdd",
  earth: "#b8905a",
  earthLine: "#9a7446",
  leaf: "#3f7d55",
};

/** A village house: terracotta tiles, a pillared verandah and the raised arugu in front. */
export function VillageHouse({ x, w = 520, h = 250, wall = T.wall, door = T.door, lit = false }: { x: number; w?: number; h?: number; wall?: string; door?: string; lit?: boolean }) {
  const top = FY - h;
  return (
    <g>
      {/* arugu: the raised platform where everyone sits in the evening */}
      <rect x={x - 20} y={FY - 46} width={w + 40} height="46" fill="#c9b08a" />
      <rect x={x - 20} y={FY - 50} width={w + 40} height="8" fill="#e0caa0" />
      <rect x={x} y={top} width={w} height={h - 46} fill={wall} />
      <rect x={x} y={top} width={w} height="16" fill={T.wallShade} />
      {/* tiled roof with overhang */}
      <polygon points={`${x - 60},${top + 30} ${x + w * 0.5},${top - w * 0.2} ${x + w + 60},${top + 30}`} fill={T.roof} />
      {Array.from({ length: 6 }, (_, i) => {
        const t = (i + 1) / 7;
        const yy = top + 30 - (w * 0.2 + 30) * (1 - t);
        const half = (w / 2 + 60) * t;
        return <line key={i} x1={x + w / 2 - half} y1={yy} x2={x + w / 2 + half} y2={yy} stroke={T.roofDark} strokeWidth="3" opacity="0.6" />;
      })}
      {/* pillars */}
      {[0.04, 0.3, 0.7, 0.96].map((k) => <rect key={k} x={x + w * k - 8} y={top + 16} width="16" height={h - 62} fill={T.pillar} />)}
      {/* door and windows */}
      <rect x={x + w * 0.42} y={FY - 46 - (h - 46) * 0.68} width={w * 0.16} height={(h - 46) * 0.68} fill={lit ? "#ffd07a" : door} />
      <rect x={x + w * 0.42} y={FY - 46 - (h - 46) * 0.68} width={w * 0.16} height="10" fill="#3f7d55" />
      {[0.14, 0.72].map((k) => <rect key={k} x={x + w * k} y={top + 56} width={w * 0.14} height={(h - 46) * 0.3} fill={lit ? "#ffd07a" : "#3a2a24"} stroke={door} strokeWidth="5" />)}
      {/* mango-leaf toran over the door */}
      {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M${x + w * 0.42 + i * (w * 0.16 / 6)} ${FY - 46 - (h - 46) * 0.68 + 10} q-6 12 0 22 q6 -10 0 -22`} fill={T.leaf} />)}
    </g>
  );
}

/** The muggu drawn at the gate every morning, in rice flour. */
export function GateMuggu({ x, s = 0.55, color = "#fbf7ef" }: { x: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(0 ${FY + 60}) scale(1 0.38) translate(0 ${-FY - 60})`}>
      <Muggu x={x} y={FY + 60} size={200 * s * 2} color={color} opacity={0.95} />
    </g>
  );
}

export function TulasiKota({ x }: { x: number }) {
  return (
    <g>
      <rect x={x - 40} y={FY - 120} width="80" height="120" fill="#e6d2b0" />
      <rect x={x - 48} y={FY - 132} width="96" height="16" fill="#d0b88e" />
      <rect x={x - 22} y={FY - 90} width="44" height="44" fill="#c8704a" opacity="0.6" />
      <g stroke="#2f7a4d" strokeWidth="5" fill="none" strokeLinecap="round">
        <path d={`M${x} ${FY - 132} V${FY - 200}`} /><path d={`M${x} ${FY - 160} l-18 -14`} /><path d={`M${x} ${FY - 176} l18 -14`} /><path d={`M${x} ${FY - 190} l-12 -10`} />
      </g>
    </g>
  );
}

export function PaddyField({ y = FY - 120, color = "#7fae4a", dark = "#5a8a36" }: { y?: number; color?: string; dark?: string }) {
  return (
    <g>
      <rect x="0" y={y} width="1600" height={FY - y} fill={color} />
      {Array.from({ length: 7 }, (_, r) => (
        <g key={r}>
          {Array.from({ length: 60 }, (_, i) => <path key={i} d={`M${i * 28 + (r % 2) * 14} ${y + 10 + r * 16} l3 -12 l3 12`} stroke={dark} strokeWidth="2" fill="none" />)}
        </g>
      ))}
      <rect x="0" y={y} width="1600" height="4" fill="#9ac46a" opacity="0.7" />
    </g>
  );
}

export function BullockCart({ x, flip = false }: { x: number; flip?: boolean }) {
  return (
    <g transform={flip ? `translate(${2 * x} 0) scale(-1 1)` : undefined}>
      <rect x={x} y={FY - 150} width="200" height="20" fill="#8a5a2a" />
      <path d={`M${x} ${FY - 150} q100 -70 200 0`} fill="none" stroke="#6b4429" strokeWidth="10" />
      <rect x={x + 200} y={FY - 140} width="150" height="8" fill="#6b4429" />
      <circle cx={x + 100} cy={FY - 60} r="58" fill="none" stroke="#5a3a22" strokeWidth="10" />
      {Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2; return <line key={i} x1={x + 100} y1={FY - 60} x2={x + 100 + Math.cos(a) * 56} y2={FY - 60 + Math.sin(a) * 56} stroke="#5a3a22" strokeWidth="5" />; })}
    </g>
  );
}

export function BrassPots({ x, n = 3 }: { x: number; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <path d={`M${x + i * 54 - 22} ${FY - 50} q-12 -30 8 -44 h28 q20 14 8 44Z`} fill={i % 2 ? "#c99a3e" : "#b8862f"} />
          <rect x={x + i * 54 - 10} y={FY - 102} width="20" height="10" fill="#a8792c" />
          <rect x={x + i * 54 - 26} y={FY - 50} width="52" height="8" rx="3" fill="#8a6520" />
        </g>
      ))}
    </g>
  );
}
