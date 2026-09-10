import type { ReactNode } from "react";
import type { SceneId } from "../state/store";
import { Figure, Pot, Garland } from "../components/scenes/primitives";

/**
 * Chapter One takes place in an ordinary American home — with the family's
 * story quietly present everywhere: a brass lamp beside the game console,
 * a mango-leaf toran over a plain white door, a tulasi pot on the sill.
 *
 * Rooms are side-view SVG stages (1600 x 900). The floor line is y = 760.
 * Hotspot positions live next to the art so the two can't drift apart.
 */

export const FLOOR_Y = 760;
export const STAGE_W = 1600;

export type Hotspot = {
  id: string;
  /** x on the floor the player walks to, and the anchor for the prompt */
  x: number;
  /** anchor y for the prompt ring */
  y: number;
  label: string;
  kind: "word" | "exit" | "npc" | "quest" | "flavor";
  wordId?: string;
  to?: SceneId;
  /** flavour text shown once when interacted with (non-word objects) */
  note?: string;
};

export type RoomDef = {
  id: SceneId;
  name: string;
  telugu: string;
  art: ReactNode;
  hotspots: Hotspot[];
  /** spawn x when entering from the left / right */
  spawn: { left: number; right: number };
};

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

const WALL = "#e7dcc6";
const WALL_SHADE = "#d6c8ae";
const FLOOR = "#8a5c3a";
const FLOOR_DARK = "#6b4429";
const WOOD = "#5a3a22";
const WOOD_LIGHT = "#8c6240";
const FRAME = "#3a2718";

function Walls({ tint = WALL }: { tint?: string }) {
  return (
    <>
      <rect width="1600" height="900" fill={tint} />
      {/* soft daylight falloff */}
      <rect width="1600" height="900" fill="url(#room-light)" />
      {/* skirting + floor */}
      <rect x="0" y={FLOOR_Y - 26} width="1600" height="26" fill={WALL_SHADE} />
      <rect x="0" y={FLOOR_Y} width="1600" height="140" fill={FLOOR} />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={i * 160 + (i % 2) * 40} y1={FLOOR_Y} x2={i * 160 - 120 + (i % 2) * 40} y2="900" stroke={FLOOR_DARK} strokeWidth="2" opacity="0.4" />
      ))}
      <rect x="0" y={FLOOR_Y} width="1600" height="8" fill={FLOOR_DARK} opacity="0.6" />
    </>
  );
}

function Defs() {
  return (
    <defs>
      <linearGradient id="room-light" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fff6e2" stopOpacity="0.55" />
        <stop offset="60%" stopColor="#fff6e2" stopOpacity="0" />
        <stop offset="100%" stopColor="#3a2a1c" stopOpacity="0.18" />
      </linearGradient>
      <linearGradient id="window-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8fb4d8" />
        <stop offset="100%" stopColor="#e8d6b0" />
      </linearGradient>
      <radialGradient id="lamp-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffd07a" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ffd07a" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function Door({ x, open = false, toran = false }: { x: number; open?: boolean; toran?: boolean }) {
  return (
    <g>
      <rect x={x - 8} y={FLOOR_Y - 340} width="196" height="340" fill={FRAME} />
      <rect x={x} y={FLOOR_Y - 330} width="180" height="330" fill={open ? "#2a1c14" : "#f2ebdc"} />
      {!open && (
        <>
          <rect x={x + 24} y={FLOOR_Y - 300} width="132" height="120" fill="none" stroke={WALL_SHADE} strokeWidth="3" />
          <rect x={x + 24} y={FLOOR_Y - 160} width="132" height="120" fill="none" stroke={WALL_SHADE} strokeWidth="3" />
          <circle cx={x + 150} cy={FLOOR_Y - 170} r="6" fill="#b8912f" />
        </>
      )}
      {open && <rect x={x} y={FLOOR_Y - 330} width="180" height="330" fill="url(#room-light)" opacity="0.5" />}
      {toran && (
        <g>
          <path d={`M${x - 10} ${FLOOR_Y - 336} Q${x + 90} ${FLOOR_Y - 316} ${x + 190} ${FLOOR_Y - 336}`} fill="none" stroke="#6b4a1e" strokeWidth="3" />
          {Array.from({ length: 9 }, (_, i) => {
            const lx = x + 10 + i * 21;
            const ly = FLOOR_Y - 332 + Math.sin((i / 8) * Math.PI) * 10;
            return <path key={i} d={`M${lx} ${ly} q-9 18 0 34 q9 -16 0 -34`} fill="#3f7d55" />;
          })}
        </g>
      )}
    </g>
  );
}

function Window({ x, w = 300, h = 220, y = 250, tulasi = false }: { x: number; w?: number; h?: number; y?: number; tulasi?: boolean }) {
  return (
    <g>
      <rect x={x - 12} y={y - 12} width={w + 24} height={h + 24} fill="#f4efe4" />
      <rect x={x} y={y} width={w} height={h} fill="url(#window-sky)" />
      {/* a suburban street outside: fence, a tree, a rooftop */}
      <rect x={x} y={y + h * 0.62} width={w} height={h * 0.38} fill="#9ab86a" />
      <rect x={x + w * 0.1} y={y + h * 0.42} width={w * 0.34} height={h * 0.22} fill="#e2d6c2" />
      <polygon points={`${x + w * 0.06},${y + h * 0.42} ${x + w * 0.27},${y + h * 0.28} ${x + w * 0.48},${y + h * 0.42}`} fill="#8a5c3a" />
      <circle cx={x + w * 0.75} cy={y + h * 0.4} r={h * 0.18} fill="#3f7d55" />
      <rect x={x + w * 0.73} y={y + h * 0.52} width={w * 0.04} height={h * 0.14} fill="#5a3a22" />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke="#f4efe4" strokeWidth="8" />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke="#f4efe4" strokeWidth="8" />
      <rect x={x - 20} y={y + h + 12} width={w + 40} height="14" fill="#f4efe4" />
      {tulasi && (
        <g transform={`translate(${x + w - 40} ${y + h + 12})`}>
          <path d="M-22 0 L22 0 L16 -30 L-16 -30Z" fill="#b8642f" />
          <g stroke="#2f7a4d" strokeWidth="4" fill="none" strokeLinecap="round">
            <path d="M0 -30 V-70" /><path d="M0 -50 l-14 -10" /><path d="M0 -58 l14 -10" /><path d="M0 -40 l-12 -6" /><path d="M0 -66 l10 -8" />
          </g>
        </g>
      )}
    </g>
  );
}

function BrassLamp({ x, y, lit = true }: { x: number; y: number; lit?: boolean }) {
  return (
    <g>
      {lit && <circle cx={x} cy={y - 40} r="70" fill="url(#lamp-glow)" />}
      <ellipse cx={x} cy={y} rx="20" ry="6" fill="#8a6520" />
      <rect x={x - 5} y={y - 44} width="10" height="44" fill="#c99a3e" />
      <path d={`M${x - 18} ${y - 44} h36 l-8 -12 h-20Z`} fill="#c99a3e" />
      {lit && <path d={`M${x + 12} ${y - 56} q6 -14 0 -22 q-6 8 0 22Z`} fill="#ffb347" />}
    </g>
  );
}

function PhotoFrame({ x, y, w = 110, h = 130, tint = "#c8704a", figure = "stand" as "stand" | "sit", two = false }: { x: number; y: number; w?: number; h?: number; tint?: string; figure?: "stand" | "sit"; two?: boolean }) {
  return (
    <g>
      <rect x={x - 6} y={y - 6} width={w + 12} height={h + 12} fill={FRAME} />
      <rect x={x} y={y} width={w} height={h} fill="#e9dcc2" />
      <rect x={x} y={y} width={w} height={h} fill={tint} opacity="0.35" />
      <rect x={x} y={y + h * 0.66} width={w} height={h * 0.34} fill="#6b4a3a" opacity="0.4" />
      {two ? (
        <>
          <Figure x={x + w * 0.36} y={y + h * 0.92} h={h * 0.62} color="#2a1a12" pose={figure} />
          <Figure x={x + w * 0.66} y={y + h * 0.92} h={h * 0.56} color="#2a1a12" pose={figure} flip />
        </>
      ) : (
        <Figure x={x + w / 2} y={y + h * 0.92} h={h * 0.66} color="#2a1a12" pose={figure} />
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* BEDROOM                                                             */
/* ------------------------------------------------------------------ */

function BedroomArt() {
  return (
    <svg viewBox={`0 0 ${STAGE_W} 900`} preserveAspectRatio="xMidYMax slice" className="room-art" aria-hidden="true">
      <Defs />
      <Walls tint="#e4dcc9" />
      {/* window with tulasi */}
      <Window x={250} y={220} w={320} h={230} tulasi />
      {/* bed */}
      <rect x={40} y={FLOOR_Y - 150} width="24" height="150" fill={WOOD} />
      <rect x={40} y={FLOOR_Y - 150} width="460" height="24" fill={WOOD} />
      <rect x={60} y={FLOOR_Y - 126} width="420" height="70" fill="#c8503f" />
      <rect x={60} y={FLOOR_Y - 126} width="420" height="18" fill="#f0cf7a" opacity="0.8" />
      <rect x={90} y={FLOOR_Y - 150} width="120" height="34" rx="10" fill="#f4ecdd" />
      <rect x={60} y={FLOOR_Y - 56} width="420" height="56" fill={WOOD_LIGHT} />
      {/* rug with a muggu-like pattern */}
      <ellipse cx={560} cy={FLOOR_Y + 40} rx="170" ry="34" fill="#1f4d33" />
      <ellipse cx={560} cy={FLOOR_Y + 40} rx="130" ry="22" fill="none" stroke="#f4ecdd" strokeWidth="3" opacity="0.6" />
      {/* desk */}
      <rect x={640} y={FLOOR_Y - 180} width="380" height="16" fill={WOOD} />
      <rect x={650} y={FLOOR_Y - 164} width="18" height="164" fill={WOOD} />
      <rect x={992} y={FLOOR_Y - 164} width="18" height="164" fill={WOOD} />
      <rect x={880} y={FLOOR_Y - 164} width="130" height="90" fill={WOOD_LIGHT} />
      {/* laptop */}
      <rect x={690} y={FLOOR_Y - 262} width="120" height="80" rx="4" fill="#2a2a2e" />
      <rect x={696} y={FLOOR_Y - 256} width="108" height="66" fill="#5a86b8" opacity="0.8" />
      <rect x={680} y={FLOOR_Y - 186} width="140" height="8" rx="3" fill="#3a3a40" />
      {/* glass of water */}
      <rect x={846} y={FLOOR_Y - 236} width="30" height="56" rx="3" fill="#dfe8ee" opacity="0.85" />
      <rect x={849} y={FLOOR_Y - 216} width="24" height="34" fill="#8fbfd8" opacity="0.7" />
      {/* photo on desk */}
      <g transform="rotate(-6 950 720)">
        <rect x={930} y={FLOOR_Y - 262} width="72" height="86" fill={FRAME} />
        <rect x={936} y={FLOOR_Y - 256} width="60" height="74" fill="#e9dcc2" />
        <Figure x={958} y={FLOOR_Y - 186} h={46} color="#2a1a12" pose="stand" />
        <Figure x={978} y={FLOOR_Y - 186} h={32} color="#2a1a12" pose="stand" flip />
      </g>
      {/* chair */}
      <rect x={760} y={FLOOR_Y - 130} width="90" height="14" fill="#3a2718" />
      <rect x={764} y={FLOOR_Y - 116} width="10" height="116" fill="#3a2718" />
      <rect x={836} y={FLOOR_Y - 116} width="10" height="116" fill="#3a2718" />
      <rect x={836} y={FLOOR_Y - 230} width="12" height="100" fill="#3a2718" />
      {/* bookshelf */}
      <rect x={1080} y={FLOOR_Y - 420} width="240" height="420" fill={WOOD} />
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          <rect x={1090} y={FLOOR_Y - 400 + r * 100} width="220" height="88" fill="#3a2718" />
          {Array.from({ length: 7 }, (_, i) => (
            <rect key={i} x={1096 + i * 30} y={FLOOR_Y - 396 + r * 100 + (i % 3) * 6} width="24" height={82 - (i % 3) * 6} fill={["#b8452f", "#1f6b4f", "#d9a441", "#7a3a8a", "#c8704a", "#2d4a78", "#f4ecdd"][(i + r) % 7]} />
          ))}
        </g>
      ))}
      {/* brass lamp on the shelf top */}
      <BrassLamp x={1130} y={FLOOR_Y - 424} lit={false} />
      {/* backpack by the door */}
      <path d={`M1380 ${FLOOR_Y} l0 -90 q0 -30 30 -30 h50 q30 0 30 30 l0 90Z`} fill="#2d4a78" />
      <rect x={1396} y={FLOOR_Y - 70} width="78" height="40" rx="6" fill="#1e355a" />
      {/* cricket bat leaning */}
      <rect x={1345} y={FLOOR_Y - 190} width="16" height="190" rx="6" fill="#d9b98a" transform="rotate(8 1353 665)" />
      {/* door out */}
      <Door x={1480} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* HALLWAY                                                             */
/* ------------------------------------------------------------------ */

function HallwayArt() {
  return (
    <svg viewBox={`0 0 ${STAGE_W} 900`} preserveAspectRatio="xMidYMax slice" className="room-art" aria-hidden="true">
      <Defs />
      <Walls tint="#ded3bf" />
      {/* picture rail */}
      <rect x={0} y={230} width="1600" height="6" fill={WALL_SHADE} />
      {/* doors either end */}
      <Door x={40} open />
      <Door x={1380} toran />
      {/* the family wall */}
      <PhotoFrame x={380} y={300} tint="#c8704a" />
      <PhotoFrame x={560} y={320} tint="#3f7d55" />
      <PhotoFrame x={740} y={280} w={200} h={150} tint="#d9a441" two />
      <PhotoFrame x={1000} y={330} w={100} h={120} tint="#7a3a8a" figure="sit" />
      <PhotoFrame x={1160} y={290} w={130} h={150} tint="#b8452f" two />
      {/* a framed Telugu calendar */}
      <rect x={1190} y={480} width="90" height="120" fill="#f4ecdd" stroke={FRAME} strokeWidth="6" />
      <rect x={1196} y={486} width="78" height="30" fill="#c8503f" />
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          {[0, 1, 2, 3, 4].map((c) => <rect key={c} x={1200 + c * 15} y={524 + r * 17} width="10" height="10" fill={FRAME} opacity="0.25" />)}
        </g>
      ))}
      {/* console table with brass lamp + keys */}
      <rect x={520} y={FLOOR_Y - 150} width="360" height="14" fill={WOOD} />
      <rect x={532} y={FLOOR_Y - 136} width="14" height="136" fill={WOOD} />
      <rect x={854} y={FLOOR_Y - 136} width="14" height="136" fill={WOOD} />
      <BrassLamp x={600} y={FLOOR_Y - 150} />
      <ellipse cx={780} cy={FLOOR_Y - 156} rx="30" ry="8" fill="#a8792c" />
      {/* shoes by the door — nobody wears them inside */}
      <ellipse cx={1330} cy={FLOOR_Y + 6} rx="26" ry="9" fill="#3a2718" />
      <ellipse cx={1290} cy={FLOOR_Y + 10} rx="22" ry="8" fill="#c8503f" />
      <ellipse cx={1250} cy={FLOOR_Y + 8} rx="18" ry="7" fill="#2d4a78" />
      {/* runner rug */}
      <rect x={200} y={FLOOR_Y + 40} width="1100" height="50" fill="#9a4a2a" />
      <rect x={200} y={FLOOR_Y + 40} width="1100" height="50" fill="none" stroke="#f0cf7a" strokeWidth="3" strokeDasharray="14 10" opacity="0.7" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* LIVING ROOM                                                         */
/* ------------------------------------------------------------------ */

function LivingArt() {
  return (
    <svg viewBox={`0 0 ${STAGE_W} 900`} preserveAspectRatio="xMidYMax slice" className="room-art" aria-hidden="true">
      <Defs />
      <Walls tint="#e6dcc8" />
      <Door x={40} open />
      <Window x={880} y={200} w={340} h={230} />
      {/* TV + console */}
      <rect x={300} y={FLOOR_Y - 380} width="300" height="180" rx="6" fill="#1a1a1e" />
      <rect x={310} y={FLOOR_Y - 370} width="280" height="160" fill="#2a3040" />
      <path d="M340 630 C420 560 500 600 580 540" stroke="#d9a441" strokeWidth="3" fill="none" opacity="0.5" />
      <rect x={340} y={FLOOR_Y - 190} width="220" height="80" fill={WOOD} />
      <rect x={360} y={FLOOR_Y - 176} width="70" height="20" rx="3" fill="#2a2a2e" />
      {/* sofa */}
      <rect x={640} y={FLOOR_Y - 150} width="520" height="150" rx="14" fill="#1f4d33" />
      <rect x={640} y={FLOOR_Y - 210} width="520" height="80" rx="16" fill="#2a6a44" />
      <rect x={660} y={FLOOR_Y - 130} width="150" height="60" rx="8" fill="#2f7a4d" />
      <rect x={830} y={FLOOR_Y - 130} width="150" height="60" rx="8" fill="#2f7a4d" />
      <rect x={1000} y={FLOOR_Y - 130} width="140" height="60" rx="8" fill="#2f7a4d" />
      <rect x={690} y={FLOOR_Y - 180} width="80" height="60" rx="8" fill="#d9a441" transform="rotate(-8 730 730)" />
      {/* Amma on the sofa, phone in hand */}
      <Figure x={900} y={FLOOR_Y - 20} h={190} color="#2a1a12" pose="sit" />
      <rect x={930} y={FLOOR_Y - 150} width="14" height="26" rx="3" fill="#f4ecdd" transform="rotate(-20 937 720)" />
      {/* coffee table with a steel tumbler */}
      <rect x={720} y={FLOOR_Y - 60} width="300" height="12" fill={WOOD} />
      <rect x={740} y={FLOOR_Y - 48} width="12" height="48" fill={WOOD} />
      <rect x={988} y={FLOOR_Y - 48} width="12" height="48" fill={WOOD} />
      <rect x={860} y={FLOOR_Y - 100} width="26" height="40" rx="3" fill="#c9cfd4" />
      {/* the almirah / cupboard where the album lives */}
      <rect x={1240} y={FLOOR_Y - 460} width="260" height="460" fill={WOOD} />
      <rect x={1252} y={FLOOR_Y - 448} width="112" height="300" fill="#6b4a2a" />
      <rect x={1376} y={FLOOR_Y - 448} width="112" height="300" fill="#6b4a2a" />
      <circle cx={1352} cy={FLOOR_Y - 300} r="6" fill="#c99a3e" />
      <circle cx={1388} cy={FLOOR_Y - 300} r="6" fill="#c99a3e" />
      <rect x={1252} y={FLOOR_Y - 136} width="236" height="60" fill="#6b4a2a" />
      <rect x={1252} y={FLOOR_Y - 66} width="236" height="56" fill="#6b4a2a" />
      {/* brass lamp + small ganesha-like idol on top, kept simple */}
      <BrassLamp x={1290} y={FLOOR_Y - 464} />
      <ellipse cx={1440} cy={FLOOR_Y - 470} rx="26" ry="8" fill="#a8792c" />
      <path d={`M1424 ${FLOOR_Y - 470} q16 -46 32 0Z`} fill="#c99a3e" />
      {/* garland over the window */}
      <Garland x1={860} x2={1240} y={184} sag={16} count={14} />
      {/* rug */}
      <rect x={560} y={FLOOR_Y + 30} width="700" height="64" rx="4" fill="#9a4a2a" />
      <rect x={580} y={FLOOR_Y + 40} width="660" height="44" fill="none" stroke="#f0cf7a" strokeWidth="2" opacity="0.6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* KITCHEN                                                             */
/* ------------------------------------------------------------------ */

function KitchenArt() {
  return (
    <svg viewBox={`0 0 ${STAGE_W} 900`} preserveAspectRatio="xMidYMax slice" className="room-art" aria-hidden="true">
      <Defs />
      <Walls tint="#efe6d2" />
      <Door x={40} open toran />
      {/* tiles */}
      <rect x={300} y={330} width="1300" height="200" fill="#f6f1e6" />
      {Array.from({ length: 26 }, (_, i) => <line key={i} x1={300 + i * 50} y1={330} x2={300 + i * 50} y2={530} stroke={WALL_SHADE} strokeWidth="1.5" />)}
      {[0, 1, 2, 3].map((i) => <line key={i} x1={300} y1={330 + i * 50} x2={1600} y2={330 + i * 50} stroke={WALL_SHADE} strokeWidth="1.5" />)}
      {/* upper cabinets */}
      <rect x={300} y={140} width="1300" height="180" fill="#f2ebdc" />
      {Array.from({ length: 6 }, (_, i) => <rect key={i} x={312 + i * 216} y={150} width="200" height="160" fill="#e6dcc8" stroke={WALL_SHADE} strokeWidth="2" />)}
      {/* spice tins on a shelf */}
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={340 + i * 46} y={286} width="34" height="34" rx="4" fill={["#c8503f", "#d9a441", "#3f7d55", "#e07a2f", "#7a3a8a", "#b8912f"][i]} />)}
      {/* counter */}
      <rect x={300} y={FLOOR_Y - 230} width="1300" height="22" fill="#cfc4ad" />
      <rect x={300} y={FLOOR_Y - 208} width="1300" height="208" fill="#e6dcc8" />
      {Array.from({ length: 6 }, (_, i) => <rect key={i} x={312 + i * 216} y={FLOOR_Y - 196} width="200" height="186" fill="#dccfb4" stroke={WALL_SHADE} strokeWidth="2" />)}
      {/* stove with a pot; Amma cooking */}
      <rect x={1180} y={FLOOR_Y - 246} width="260" height="16" fill="#3a3a40" />
      <circle cx={1240} cy={FLOOR_Y - 238} r="22" fill="#1a1a1e" />
      <circle cx={1380} cy={FLOOR_Y - 238} r="22" fill="#1a1a1e" />
      <Pot x={1240} y={FLOOR_Y - 246} w={110} color="#7d4128" rim="#4e2415" />
      <path d="M1220 560 C1208 540 1236 526 1224 500" stroke="#f4ecdd" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.4" className="steam" />
      <Figure x={1520} y={FLOOR_Y} h={230} color="#2a1a12" pose="stand" flip />
      {/* items on the counter — the quest objects */}
      {/* water jug */}
      <rect x={420} y={FLOOR_Y - 330} width="70" height="100" rx="8" fill="#8fbfd8" opacity="0.85" />
      <rect x={430} y={FLOOR_Y - 296} width="50" height="60" fill="#5a9dc0" opacity="0.6" />
      <path d={`M490 ${FLOOR_Y - 316} q28 6 0 40`} fill="none" stroke="#8fbfd8" strokeWidth="8" />
      {/* rice in a steel pot with lid */}
      <path d={`M620 ${FLOOR_Y - 230} q10 -80 100 -80 q90 0 100 80Z`} fill="#c9cfd4" />
      <ellipse cx={720} cy={FLOOR_Y - 306} rx="100" ry="14" fill="#9aa3aa" />
      <ellipse cx={720} cy={FLOOR_Y - 296} rx="86" ry="10" fill="#f6f1e6" />
      {/* milk */}
      <path d={`M880 ${FLOOR_Y - 230} v-90 l14 -22 h44 l14 22 v90Z`} fill="#f6f1e6" />
      <rect x={886} y={FLOOR_Y - 300} width="60" height="34" fill="#2d4a78" />
      {/* salt jar */}
      <rect x={1020} y={FLOOR_Y - 300} width="56" height="70" rx="6" fill="#e9e4d8" />
      <rect x={1016} y={FLOOR_Y - 312} width="64" height="16" rx="4" fill="#3a2718" />
      <rect x={1030} y={FLOOR_Y - 280} width="36" height="30" fill="#c8503f" opacity="0.8" />
      {/* a hanging string of curry leaves + garlic */}
      <path d="M1100 140 v60" stroke="#6b4a1e" strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M1100 ${150 + i * 12} q-14 8 0 18 q14 -10 0 -18`} fill="#3f7d55" />)}
      {/* floor mat with muggu dots */}
      <rect x={340} y={FLOOR_Y + 40} width="520" height="50" rx="4" fill="#dccfb4" />
      {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={370 + i * 42} cy={FLOOR_Y + 65} r="3" fill="#9a4a2a" />)}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Room registry                                                       */
/* ------------------------------------------------------------------ */

export const ROOMS: Record<SceneId, RoomDef> = {
  bedroom: {
    id: "bedroom",
    name: "Your room",
    telugu: "గది",
    art: <BedroomArt />,
    spawn: { left: 560, right: 1380 },
    hotspots: [
      { id: "window", x: 410, y: 470, label: "Window", kind: "word", wordId: "illu" },
      { id: "bed", x: 280, y: 660, label: "Bed", kind: "flavor", note: "Still unmade. Amma will notice." },
      { id: "glass", x: 860, y: 540, label: "Glass of water", kind: "word", wordId: "neellu" },
      { id: "photo", x: 966, y: 520, label: "Photo", kind: "word", wordId: "photo" },
      { id: "shelf", x: 1200, y: 520, label: "Bookshelf", kind: "word", wordId: "pustakam" },
      { id: "bag", x: 1420, y: 690, label: "School bag", kind: "flavor", note: "Homework can wait. Amma called from the hall." },
      { id: "door", x: 1560, y: 560, label: "Hallway", kind: "exit", to: "hallway" },
    ],
  },
  hallway: {
    id: "hallway",
    name: "The hallway",
    telugu: "వరండా",
    art: <HallwayArt />,
    spawn: { left: 240, right: 1300 },
    hotspots: [
      { id: "back", x: 130, y: 560, label: "Your room", kind: "exit", to: "bedroom" },
      { id: "amma-photo", x: 435, y: 370, label: "Photo of Amma", kind: "word", wordId: "amma" },
      { id: "nanna-photo", x: 615, y: 390, label: "Photo of Nanna", kind: "word", wordId: "nanna" },
      { id: "family-photo", x: 840, y: 360, label: "Family photo", kind: "word", wordId: "kutumbam" },
      { id: "lamp", x: 600, y: 600, label: "Brass lamp", kind: "flavor", note: "Ammamma's lamp. It's lit every evening, even here." },
      { id: "calendar", x: 1235, y: 540, label: "Telugu calendar", kind: "flavor", note: "A calendar from a temple in Guntur. The festival days are circled." },
      { id: "living", x: 1470, y: 560, label: "Living room", kind: "exit", to: "living" },
    ],
  },
  living: {
    id: "living",
    name: "Living room",
    telugu: "హాలు",
    art: <LivingArt />,
    spawn: { left: 240, right: 1300 },
    hotspots: [
      { id: "back", x: 130, y: 560, label: "Hallway", kind: "exit", to: "hallway" },
      { id: "tv", x: 450, y: 480, label: "TV", kind: "flavor", note: "Paused on a Telugu film. Nanna fell asleep halfway through." },
      { id: "amma", x: 900, y: 560, label: "Amma", kind: "npc" },
      { id: "tumbler", x: 873, y: 660, label: "Steel tumbler", kind: "word", wordId: "neellu" },
      { id: "cupboard", x: 1370, y: 480, label: "Cupboard", kind: "quest" },
      { id: "kitchen", x: 1560, y: 560, label: "Kitchen", kind: "exit", to: "kitchen" },
    ],
  },
  kitchen: {
    id: "kitchen",
    name: "Kitchen",
    telugu: "వంటిల్లు",
    art: <KitchenArt />,
    spawn: { left: 240, right: 1100 },
    hotspots: [
      { id: "back", x: 130, y: 560, label: "Living room", kind: "exit", to: "living" },
      { id: "jug", x: 455, y: 470, label: "Water jug", kind: "word", wordId: "neellu" },
      { id: "rice", x: 720, y: 460, label: "Pot of rice", kind: "word", wordId: "annam" },
      { id: "milk", x: 916, y: 470, label: "Milk", kind: "word", wordId: "paalu" },
      { id: "salt", x: 1048, y: 470, label: "Salt", kind: "word", wordId: "uppu" },
      { id: "amma", x: 1440, y: 560, label: "Amma", kind: "npc" },
    ],
  },
};

/** Static preview of the home for the marketing site's chapter card. */
export function HomeScenePreview() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="scene-fill" aria-hidden="true">
      <Defs />
      <Walls tint="#e6dcc8" />
      <Window x={880} y={200} w={340} h={230} tulasi />
      <rect x={640} y={FLOOR_Y - 150} width="520" height="150" rx="14" fill="#1f4d33" />
      <rect x={640} y={FLOOR_Y - 210} width="520" height="80" rx="16" fill="#2a6a44" />
      <Figure x={900} y={FLOOR_Y - 20} h={190} color="#2a1a12" pose="sit" />
      <rect x={1240} y={FLOOR_Y - 460} width="260" height="460" fill={WOOD} />
      <rect x={1252} y={FLOOR_Y - 448} width="236" height="300" fill="#6b4a2a" />
      <BrassLamp x={1290} y={FLOOR_Y - 464} />
      <Garland x1={860} x2={1240} y={184} sag={16} count={14} />
      <PhotoFrame x={380} y={300} tint="#c8704a" />
      <PhotoFrame x={540} y={280} w={200} h={150} tint="#d9a441" two />
      <rect x={560} y={FLOOR_Y + 30} width="700" height="64" rx="4" fill="#9a4a2a" />
      {/* the player, walking in */}
      <g transform={`translate(360 ${FLOOR_Y})`}>
        <circle cx="0" cy="-118" r="19" fill="#1a0f09" />
        <path d="M-14 -100 C-18 -80 -18 -60 -15 -46 L15 -46 C19 -60 18 -80 14 -100Z" fill="#1a0f09" />
        <path d="M-14 -48 L-26 -4 L-15 0 L-3 -44Z M4 -48 L18 -4 L29 -7 L15 -48Z" fill="#1a0f09" />
      </g>
    </svg>
  );
}
