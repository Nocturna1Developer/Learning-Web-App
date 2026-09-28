import type { ChapterContent } from "../types";
import { Defs, Walls, Door, PhotoFrame, FLOOR_Y, WOOD } from "../../game/rooms";
import { Figure, House } from "../../components/scenes/primitives";
import { Portrait, Icon, Panel } from "../kit";

/* =====================================================================
   CHINESE · Mandarin, simplified characters · A Chinese-American family
   Chapter One — 团圆饭, Reunion Dinner. Lunar New Year's Eve.
   ===================================================================== */

const SC = "'Noto Serif SC', 'Songti SC', 'SimSun', serif";
const RED = "#c0392b";
const GOLD = "#e8c25a";


/* ---------------- art ---------------- */

function Lantern({ x, y, s = 1, glow = true }: { x: number; y: number; s?: number; glow?: boolean }) {
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

function FuDiamond({ x, y, size = 90 }: { x: number; y: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-size / 2} y={-size / 2} width={size} height={size} fill={RED} stroke={GOLD} strokeWidth="4" transform="rotate(45)" />
      {/* upside down, on purpose */}
      <text transform="rotate(180)" textAnchor="middle" dominantBaseline="central" fontFamily={SC} fontSize={size * 0.62} fill={GOLD} fontWeight="700">福</text>
    </g>
  );
}

function Couplet({ x, y, chars, vertical = true }: { x: number; y: number; chars: string; vertical?: boolean }) {
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

function HallArt({ done }: { done: ReadonlySet<string> }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="room-art" aria-hidden="true">
      <Defs />
      <Walls tint="#ece2d0" shade="#d8ccb6" />
      <Door x={140} />
      <Couplet x={96} y={FLOOR_Y - 330} chars="一帆风顺年年好" />
      <Couplet x={330} y={FLOOR_Y - 330} chars="万事如意步步高" />
      <Couplet x={160} y={FLOOR_Y - 392} chars="吉星高照" vertical={false} />
      {done.has("fu") && <FuDiamond x={230} y={FLOOR_Y - 220} size={80} />}
      {/* shoes off at the door: a rack of slippers */}
      <rect x={450} y={FLOOR_Y - 70} width="150" height="70" fill={WOOD} />
      <rect x={460} y={FLOOR_Y - 60} width="130" height="24" fill="#3a2718" />
      {[478, 512, 546].map((x, i) => <ellipse key={x} cx={x} cy={FLOOR_Y - 40} rx="14" ry="6" fill={["#c0392b", "#2d6ab8", "#e8c25a"][i]} />)}
      <ellipse cx={500} cy={FLOOR_Y + 8} rx="18" ry="7" fill="#7a3a8a" />
      <ellipse cx={530} cy={FLOOR_Y + 10} rx="18" ry="7" fill="#7a3a8a" />
      {/* lucky bamboo */}
      <rect x={620} y={FLOOR_Y - 160} width="44" height="60" rx="6" fill="#bfe0e6" opacity="0.7" />
      <rect x={612} y={FLOOR_Y - 100} width="60" height="100" fill={WOOD} />
      {[628, 640, 652].map((x, i) => (
        <g key={x}>
          <rect x={x - 3} y={FLOOR_Y - 260 + i * 16} width="6" height={130 - i * 16} fill="#4f8a3c" />
          <path d={`M${x} ${FLOOR_Y - 250 + i * 16} q14 -8 22 -2 M${x} ${FLOOR_Y - 220 + i * 16} q-14 -8 -22 -2`} stroke="#4f8a3c" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      ))}
      <Lantern x={790} y={300} s={0.9} />
      <PhotoFrame x={900} y={300} w={190} h={140} tint={RED} two />
      {/* coat hooks */}
      <rect x={1150} y={340} width="160" height="10" fill={WOOD} />
      <path d="M1180 350v20M1230 350v20M1280 350v20" stroke="#3a2718" strokeWidth="4" />
      <path d="M1170 370h40l6 150h-52Z" fill="#2d4a78" />
      <path d="M1262 370h36l8 120h-52Z" fill="#b8452f" />
      <Door x={1420} open />
      <rect x={380} y={FLOOR_Y + 36} width="820" height="54" fill="#8e2418" />
      <rect x={396} y={FLOOR_Y + 46} width="788" height="34" fill="none" stroke={GOLD} strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

function Dumplings({ x, y, rows = 3, cols = 6 }: { x: number; y: number; rows?: number; cols?: number }) {
  return (
    <g>
      {Array.from({ length: rows * cols }, (_, i) => {
        const cx = x + (i % cols) * 26;
        const cy = y + Math.floor(i / cols) * 16;
        return <path key={i} d={`M${cx - 11} ${cy} q11 -16 22 0 q-11 5 -22 0Z`} fill="#f7f1e6" stroke="#d8ccb6" strokeWidth="1" />;
      })}
    </g>
  );
}

function DiningArt({ done }: { done: ReadonlySet<string> }) {
  const set = done.has("seats");
  const cy = FLOOR_Y - 150;
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="room-art" aria-hidden="true">
      <Defs />
      <Walls tint="#efe4d2" shade="#dccfb6" />
      <Door x={40} open />
      {/* hanging scroll: plum blossom */}
      <rect x={262} y={160} width="112" height="10" rx="4" fill={WOOD} />
      <rect x={270} y={170} width="96" height="300" fill="#f4ecdd" />
      <rect x={262} y={470} width="112" height="10" rx="4" fill={WOOD} />
      <path d="M290 440 Q300 380 330 350 Q345 330 340 280 M330 350 Q350 340 358 320 M318 380 Q300 360 296 330" stroke="#3a2718" strokeWidth="5" fill="none" strokeLinecap="round" />
      {[[340, 280], [358, 318], [296, 330], [330, 350], [312, 300], [346, 300]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="7" fill="#e89aa8" />)}
      <rect x={342} y={430} width="16" height="16" fill={RED} />
      {/* lanterns over the table */}
      <Lantern x={690} y={220} s={0.55} glow={false} />
      <Lantern x={990} y={220} s={0.55} glow={false} />
      {/* chairs behind */}
      {[640, 840, 1040].map((x) => <rect key={x} x={x - 30} y={cy - 110} width="60" height="120" rx="6" fill="#5a3a22" />)}
      {/* round table */}
      <rect x={620} y={cy + 30} width="440" height="110" fill="#6b3220" />
      <rect x={816} y={cy + 40} width="48" height="150" fill="#4a2616" />
      <ellipse cx={840} cy={cy + 30} rx="270" ry="52" fill="#a8321f" />
      <ellipse cx={840} cy={cy + 24} rx="270" ry="50" fill={RED} />
      <ellipse cx={840} cy={cy + 20} rx="110" ry="22" fill="#e8d8d0" opacity="0.35" />
      {/* Nǎinai at the table with her dumpling board */}
      <Figure x={560} y={FLOOR_Y - 18} h={180} color="#2a1a12" pose="sit" />
      <rect x={620} y={cy - 4} width="170" height="26" rx="4" fill="#c9a36a" />
      {done.has("dumplings") ? <Dumplings x={636} y={cy + 4} rows={1} cols={6} /> : (
        <g>
          <ellipse cx={660} cy={cy + 8} rx="30" ry="8" fill="#f4ecdd" />
          {[720, 750].map((x) => <circle key={x} cx={x} cy={cy + 8} r="10" fill="#f7f1e6" stroke="#d8ccb6" />)}
        </g>
      )}
      {set && (
        <g>
          {/* the dishes */}
          <ellipse cx={840} cy={cy + 14} rx="64" ry="16" fill="#f4ecdd" />
          <path d={`M790 ${cy + 12} q50 -22 96 0 l14 -10 v20 l-14 -10 q-46 22 -96 0Z`} fill="#d9892f" />
          <ellipse cx={950} cy={cy + 18} rx="34" ry="10" fill="#f4ecdd" />
          <Dumplings x={934} y={cy + 14} rows={1} cols={2} />
          <ellipse cx={720} cy={cy + 30} rx="30" ry="9" fill="#f4ecdd" />
          <path d={`M700 ${cy + 28} q20 6 40 0`} stroke="#e8c25a" strokeWidth="3" fill="none" />
          {/* bowls and chopsticks at each place */}
          {[680, 780, 900, 1000].map((x) => (
            <g key={x}>
              <path d={`M${x - 16} ${cy + 44} h32 q-2 14 -16 14 t-16 -14Z`} fill="#f4ecdd" />
              <path d={`M${x - 16} ${cy + 44} h32`} stroke="#2d6ab8" strokeWidth="3" />
              <path d={`M${x + 20} ${cy + 36} l14 26 M${x + 26} ${cy + 36} l14 26`} stroke="#3a2718" strokeWidth="2.5" />
            </g>
          ))}
          <path d="M836 530 C826 510 850 496 840 470" stroke="#f4ecdd" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.35" className="steam" />
        </g>
      )}
      {/* sideboard with bowls and chopsticks */}
      <rect x={1100} y={FLOOR_Y - 170} width="220" height="170" fill={WOOD} />
      <rect x={1110} y={FLOOR_Y - 160} width="95" height="150" fill="#6b4a2a" />
      <rect x={1215} y={FLOOR_Y - 160} width="95" height="150" fill="#6b4a2a" />
      {[0, 1, 2].map((i) => <path key={i} d={`M1122 ${FLOOR_Y - 176 - i * 12} h44 q-4 14 -22 14 t-22 -14Z`} fill="#f4ecdd" stroke="#2d6ab8" strokeWidth="2" />)}
      <rect x={1212} y={FLOOR_Y - 220} width="28" height="48" rx="4" fill="#3a6a4a" />
      {[1218, 1224, 1230, 1236].map((x) => <line key={x} x1={x} y1={FLOOR_Y - 250} x2={x} y2={FLOOR_Y - 214} stroke="#3a2718" strokeWidth="3" />)}
      {/* fish tank */}
      <rect x={1270} y={FLOOR_Y - 330} width="130" height="110" fill="#8fbfd8" opacity="0.55" stroke="#3a2718" strokeWidth="4" />
      <path d={`M1300 ${FLOOR_Y - 280} q14 -12 28 0 q-14 12 -28 0 l-10 -8 v16Z`} fill="#e07a2f" />
      <path d={`M1350 ${FLOOR_Y - 250} q10 -8 20 0 q-10 8 -20 0 l-7 -6 v12Z`} fill={RED} />
      <Door x={1420} open />
    </svg>
  );
}

function KitchenArt() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="room-art" aria-hidden="true">
      <Defs />
      <Walls tint="#f0e8da" floor="#9a948a" floorLine="#7e786e" shade="#ddd3c2" />
      <Door x={40} open />
      <rect x={300} y={330} width="1300" height="200" fill="#f8f6f0" />
      {Array.from({ length: 52 }, (_, i) => <line key={i} x1={300 + i * 25} y1={330} x2={300 + i * 25} y2={530} stroke="#e4ded2" />)}
      {Array.from({ length: 8 }, (_, i) => <line key={i} x1={300} y1={330 + i * 25} x2={1600} y2={330 + i * 25} stroke="#e4ded2" />)}
      {/* a paper-cut on the cabinet — a little red window flower */}
      <rect x={300} y={140} width="1300" height="180" fill="#e9e2d4" />
      {Array.from({ length: 6 }, (_, i) => <rect key={i} x={312 + i * 216} y={150} width="200" height="160" fill="#ddd4c2" stroke="#cfc4ad" strokeWidth="2" />)}
      <circle cx={630} cy={230} r="40" fill={RED} />
      <path d="M630 196l8 22h22l-18 14 8 22-20-14-20 14 8-22-18-14h22Z" fill="#ddd4c2" />
      {/* counter */}
      <rect x={300} y={FLOOR_Y - 230} width="1300" height="22" fill="#cfc4ad" />
      <rect x={300} y={FLOOR_Y - 208} width="1300" height="208" fill="#e6dcc8" />
      {Array.from({ length: 6 }, (_, i) => <rect key={i} x={312 + i * 216} y={FLOOR_Y - 196} width="200" height="186" fill="#dccfb4" stroke="#cfc4ad" strokeWidth="2" />)}
      {/* kettle */}
      <path d={`M410 ${FLOOR_Y - 232} v-80 q0 -14 14 -14 h44 q14 0 14 14 v80Z`} fill="#f4f1ea" stroke="#cfc4ad" strokeWidth="2" />
      <rect x={430} y={FLOOR_Y - 300} width="10" height="50" fill="#8fbfd8" />
      <path d={`M482 ${FLOOR_Y - 300} q24 10 0 40`} fill="none" stroke="#cfc4ad" strokeWidth="8" />
      {/* flour sack */}
      <path d={`M600 ${FLOOR_Y - 232} q-8 -70 10 -90 h60 q18 20 10 90Z`} fill="#efe6d2" stroke="#d8ccb6" strokeWidth="2" />
      <text x={640} y={FLOOR_Y - 270} textAnchor="middle" fontFamily={SC} fontSize="22" fill={RED}>面粉</text>
      {/* napa cabbage */}
      <ellipse cx={840} cy={FLOOR_Y - 262} rx="60" ry="30" fill="#dfe9c0" />
      <path d={`M784 ${FLOOR_Y - 262} q56 -44 112 0`} fill="#b6d08a" />
      <path d={`M800 ${FLOOR_Y - 262} h80`} stroke="#f4f7e6" strokeWidth="3" />
      {/* rice cooker */}
      <rect x={1000} y={FLOOR_Y - 300} width="84" height="68" rx="20" fill="#f4f1ea" stroke="#cfc4ad" strokeWidth="2" />
      <ellipse cx={1042} cy={FLOOR_Y - 300} rx="38" ry="10" fill="#e4ded2" />
      <circle cx={1042} cy={FLOOR_Y - 260} r="6" fill="#e07a2f" />
      {/* stove: bamboo steamers and a wok */}
      <rect x={1160} y={FLOOR_Y - 246} width="280" height="16" fill="#3a3a40" />
      {[0, 1, 2].map((i) => <rect key={i} x={1190} y={FLOOR_Y - 290 - i * 36} width="90" height="34" rx="6" fill="#c9a36a" stroke="#9c7a44" strokeWidth="3" />)}
      <path d="M1210 470 C1198 450 1226 436 1214 410" stroke="#f4ecdd" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.4" className="steam" />
      <path d={`M1320 ${FLOOR_Y - 250} q50 34 100 0Z`} fill="#1a1a1e" />
      <rect x={1414} y={FLOOR_Y - 256} width="50" height="8" rx="3" fill="#3a2718" />
      <Figure x={1500} y={FLOOR_Y} h={230} color="#2a1a12" pose="stand" flip />
    </svg>
  );
}

/* ---------------- icons ---------------- */

const flourIcon = (
  <svg viewBox="0 0 80 90" aria-hidden="true">
    <path d="M16 84q-8-50 8-66h32q16 16 8 66Z" fill="#efe6d2" stroke="#d8ccb6" strokeWidth="2" />
    <path d="M24 18q16 8 32 0" stroke="#b8a27a" strokeWidth="3" fill="none" />
  </svg>
);
const cabbageIcon = (
  <svg viewBox="0 0 80 90" aria-hidden="true">
    <ellipse cx="40" cy="56" rx="22" ry="30" fill="#dfe9c0" />
    <path d="M18 56q22-50 44 0" fill="#b6d08a" />
    <path d="M40 30v52" stroke="#f4f7e6" strokeWidth="3" />
  </svg>
);
const kettleIcon = (
  <svg viewBox="0 0 80 90" aria-hidden="true">
    <path d="M14 84v-50q0-12 12-12h28q12 0 12 12v50Z" fill="#f4f1ea" stroke="#cfc4ad" strokeWidth="2" />
    <rect x="22" y="40" width="8" height="36" fill="#8fbfd8" />
    <path d="M66 36q16 8 0 32" fill="none" stroke="#cfc4ad" strokeWidth="6" />
  </svg>
);

/* ---------------- story panels: 年 Nián ---------------- */

function Nian({ x, y, s = 1, flee = false }: { x: number; y: number; s?: number; flee?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flee ? -s : s} ${s})`}>
      <ellipse cx="0" cy="-40" rx="56" ry="40" fill="#3a5a4a" />
      <circle cx="46" cy="-66" r="30" fill="#3a5a4a" />
      <path d="M52 -94 l10 -30 l6 32Z" fill="#e8c25a" />
      <circle cx="56" cy="-70" r="8" fill="#f4ecdd" />
      <circle cx="58" cy="-70" r="4" fill="#1a0d08" />
      <path d="M62 -52 l6 8 l6 -8 l6 8" stroke="#f4ecdd" strokeWidth="3" fill="none" />
      {[-40, -14, 14, 36].map((dx) => <rect key={dx} x={dx - 7} y="-6" width="14" height="10" rx="3" fill="#2a4236" />)}
      {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M${-50 + i * 14} -76 l6 -12 l6 12`} fill="#2a4236" />)}
    </g>
  );
}

const story = [
  {
    art: (
      <Panel id="zh1" sky={["#1a2440", "#4a3a5a"]} ground="#2a2a30">
        <circle cx="320" cy="50" r="22" fill="#f4ecdd" opacity="0.9" />
        <path d="M0 170 L70 90 L140 150 L220 70 L300 140 L400 100 V200 H0Z" fill="#2e3a4a" />
        <Nian x={170} y={200} s={0.8} />
      </Panel>
    ),
    text: "Long ago, a monster called {{年}} (nián) came down from the mountains every New Year's Eve.",
  },
  {
    art: (
      <Panel id="zh2" sky={["#2a2440", "#5a3a4a"]} ground="#3a2e28">
        <House x={40} y={196} w={110} h={70} wall="#d8c8a8" roof="#3a2a2a" />
        <House x={230} y={196} w={120} h={74} wall="#d8c8a8" roof="#3a2a2a" />
        <rect x={82} y={148} width="26" height="44" fill={RED} />
        <rect x={276} y={144} width="28" height="48" fill={RED} />
        <Figure x={190} y={200} h={60} color="#1a0d08" pose="reach" />
      </Panel>
    ),
    text: "The villagers hid. But one year an old man stayed — and pasted {{红纸}} (hóng zhǐ, red paper) on every door.",
  },
  {
    art: (
      <Panel id="zh3" sky={["#2a1a30", "#6a2a2a"]} ground="#2a2020">
        {[[80, 70], [150, 40], [300, 60], [340, 110], [60, 130]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            {Array.from({ length: 8 }, (_, k) => <line key={k} x1="0" y1="0" x2={Math.cos((k * Math.PI) / 4) * 18} y2={Math.sin((k * Math.PI) / 4) * 18} stroke={k % 2 ? GOLD : "#f08a1c"} strokeWidth="3" />)}
          </g>
        ))}
        <Nian x={250} y={200} s={0.7} flee />
        <path d="M120 196 v-40" stroke={RED} strokeWidth="8" />
        <path d="M112 160 h16" stroke={GOLD} strokeWidth="3" />
      </Panel>
    ),
    text: "When Nián saw the red and heard the {{鞭炮}} (biānpào, firecrackers), it turned around and ran.",
  },
  {
    art: (
      <Panel id="zh4" sky={["#1a1a30", "#3a2a40"]} ground="#3a2a24">
        <House x={120} y={196} w={160} h={90} wall="#e6d8c0" roof="#5a2a1a" lit />
        {[110, 290].map((x) => (
          <g key={x}>
            <circle cx={x} cy={110} r="30" fill="#ffd07a" opacity="0.25" />
            <ellipse cx={x} cy={110} rx="16" ry="18" fill={RED} />
          </g>
        ))}
        <g transform="translate(200 150) rotate(45)"><rect x="-12" y="-12" width="24" height="24" fill={RED} stroke={GOLD} strokeWidth="2" /></g>
      </Panel>
    ),
    text: "That's why we hang red and light up the night. We call it {{过年}} (guònián) — getting past Nián.",
  },
];

/* ---------------- the journey ---------------- */

/* ---------------- the chapter ---------------- */

const content: ChapterContent = {
  startRoom: "menkou",
  rooms: {
    menkou: {
      id: "menkou",
      name: "Front hall",
      native: "门口",
      art: (done) => <HallArt done={done} />,
      spawn: { left: 420, right: 1340 },
      hotspots: [
        { id: "door", x: 230, y: 500, label: "Front door", kind: "quest" },
        { id: "couplets", x: 355, y: 400, label: "Spring couplets", kind: "flavor", note: "Chūnlián — spring couplets either side of the door. Nǎinai wrote these herself, with a brush.", culture: "couplets" },
        { id: "slippers", x: 525, y: 680, label: "Slippers", kind: "flavor", note: "Shoes off at the door, slippers on. Nǎinai checks." },
        { id: "bamboo", x: 640, y: 560, label: "Lucky bamboo", kind: "flavor", note: "Lucky bamboo in a glass vase. Nǎinai counts the stalks — never four. 四 (sì) sounds too much like 死 (sǐ), death.", culture: "bamboo" },
        { id: "lantern", x: 790, y: 300, label: "Lantern", kind: "word", wordId: "denglong" },
        { id: "photo", x: 995, y: 380, label: "Family photo", kind: "word", wordId: "jia" },
        { id: "canting", x: 1510, y: 560, label: "Dining room", kind: "exit", to: "canting" },
      ],
    },
    canting: {
      id: "canting",
      name: "Dining room",
      native: "餐厅",
      art: (done) => <DiningArt done={done} />,
      spawn: { left: 220, right: 1300 },
      hotspots: [
        { id: "back", x: 120, y: 560, label: "Front hall", kind: "exit", to: "menkou" },
        { id: "scroll", x: 318, y: 330, label: "Scroll", kind: "flavor", note: "Plum blossoms. They flower in the coldest part of winter — Yéye says that's the whole point.", culture: "plum" },
        { id: "nainai", x: 560, y: 560, label: "Nǎinai", kind: "npc" },
        { id: "table", x: 840, y: 600, label: "Round table", kind: "quest" },
        { id: "bowls", x: 1144, y: 560, label: "Bowls", kind: "word", wordId: "wan" },
        { id: "chopsticks", x: 1226, y: 520, label: "Chopsticks", kind: "word", wordId: "kuaizi" },
        { id: "fish", x: 1335, y: 440, label: "Fish tank", kind: "flavor", note: "Fish — 鱼 (yú) — sounds like 余, “surplus”. At New Year: 年年有余, plenty every year.", culture: "fish" },
        { id: "chufang", x: 1510, y: 560, label: "Kitchen", kind: "exit", to: "chufang" },
      ],
    },
    chufang: {
      id: "chufang",
      name: "Kitchen",
      native: "厨房",
      art: <KitchenArt />,
      spawn: { left: 240, right: 1100 },
      hotspots: [
        { id: "back", x: 130, y: 560, label: "Dining room", kind: "exit", to: "canting" },
        { id: "kettle", x: 446, y: 470, label: "Kettle", kind: "word", wordId: "shui" },
        { id: "flour", x: 640, y: 470, label: "Sack", kind: "word", wordId: "mianfen" },
        { id: "cabbage", x: 840, y: 480, label: "Cabbage", kind: "word", wordId: "baicai" },
        { id: "ricecooker", x: 1042, y: 470, label: "Rice cooker", kind: "flavor", note: "It plays a little song when the rice is done. Everyone in this house can hum it." },
        { id: "steamer", x: 1235, y: 430, label: "Steamers", kind: "flavor", note: "Bamboo steamers, three high. Buns on top, fish at the bottom.", culture: "steamer" },
        { id: "mama", x: 1460, y: 560, label: "Māma", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "第一章 · Chinese",
      title: "Reunion",
      em: "Dinner",
      text: "Lunar New Year's Eve. It's a school night — but tonight the whole family eats together, and Nǎinai has been cooking since noon.",
    },
    introLines: [
      { who: "nainai", text: "{{来来来！}}", gloss: "lái lái lái — come, come, come! Nǎinai, from the dining room." },
      { who: "guide", text: "Tonight is {{除夕}} — New Year's Eve.", gloss: "chúxī. The biggest dinner of the year." },
      { who: "mama", text: "Can you put the {{福}} on the front door? Nǎinai brought it from home.", gloss: "fú — good fortune." },
      { who: "guide", text: "Quest: get the house ready for the reunion dinner.", gloss: "Walk with ← → or A D. Press E near anything that glows. Or just click it." },
    ],
    beats: [
      {
        id: "fu",
        quest: { v: "Put up the 福", hint: "On the front door.", hintIn: { canting: "Back in the front hall.", chufang: "In the front hall, two rooms back." } },
        at: { room: "menkou", hotspot: "door" },
        encounter: ["fu"],
        lines: [
          { who: "guide", text: "The {{福}} goes on the door — upside down.", gloss: "Upside down is 倒 (dào). It sounds exactly like 到 (dào), “arrive”: good fortune has arrived." },
          { who: "guide", text: "Nǎinai is calling from the dining room.", gloss: "Through the doorway on the right." },
        ],
        culture: ["fu"],
        nudges: {
          "canting:nainai": [{ who: "nainai", text: "{{先贴福！}}", gloss: "xiān tiē fú — put up the fú first!" }],
          "chufang:mama": [{ who: "mama", text: "{{宝贝}}, the {{福}}! Front door.", gloss: "bǎobèi — darling." }],
          "canting:table": [{ who: "guide", text: "Not yet. The house isn't ready." }],
        },
      },
      {
        id: "dumplings",
        quest: { v: "Make dumplings with Nǎinai", hint: "She's at the dining table." },
        at: { room: "canting", hotspot: "nainai" },
        encounter: ["jiaozi"],
        lines: [
          { who: "nainai", text: "{{包饺子！}} Every family makes them tonight.", gloss: "bāo jiǎozi — wrap dumplings." },
          { who: "nainai", text: "Shaped like old silver ingots — so the year brings plenty. Now, help me.", gloss: "She'll ask; you hand it to her." },
        ],
        game: {
          type: "fetch",
          npc: "nainai",
          kicker: "Mini-game · 包饺子",
          title: "Hand Nǎinai what she asks for.",
          hint: "Her hands are covered in flour. Nothing has a label — listen for the word.",
          asks: [
            { wordId: "mianfen", native: "把面粉给我。", roman: "bǎ miànfěn gěi wǒ.", english: "Hand me the flour." },
            { wordId: "shui", native: "还要水。", roman: "hái yào shuǐ.", english: "And some water." },
            { wordId: "baicai", native: "把白菜给我。", roman: "bǎ báicài gěi wǒ.", english: "Hand me the cabbage." },
            { wordId: "wan", native: "再拿一个碗。", roman: "zài ná yí ge wǎn.", english: "And bring a bowl." },
          ],
          items: [
            { wordId: "mianfen", label: "Sack", art: flourIcon },
            { wordId: "baicai", label: "Veg", art: cabbageIcon },
            { wordId: "shui", label: "Kettle", art: kettleIcon },
            { wordId: "wan", label: "Dish", art: Icon.bowl },
          ],
          done: { native: "好！", roman: "hǎo!", english: "good!" },
        },
        after: [
          { who: "nainai", text: "{{好！}} Now we fold. Pinch, pinch, pinch.", gloss: "hǎo — good!" },
          { who: "guide", text: "Forty dumplings in rows, like little boats.", gloss: "Everyone is arriving. Time to set the table." },
        ],
        culture: ["jiaozi"],
        memory: "dumplings",
        nudges: {
          "canting:table": [{ who: "guide", text: "The table comes later. Dumplings first." }],
          "chufang:mama": [{ who: "mama", text: "Nǎinai needs you — {{包饺子}}!", gloss: "bāo jiǎozi" }],
        },
      },
      {
        id: "seats",
        quest: { v: "Set the table", hint: "The round table. Who sits where?" },
        at: { room: "canting", hotspot: "table" },
        lines: [
          { who: "mama", text: "Everyone's here! Help me seat them.", gloss: "Māma, from the kitchen doorway." },
          { who: "guide", text: "Even at a round table, there's a seat of honour.", gloss: "Facing the door, for the eldest." },
        ],
        game: {
          type: "place",
          board: "table",
          kicker: "Mini-game · 团圆",
          title: "Seat the family.",
          hint: "Pick someone, then the seat with their name. The place cards are in Chinese.",
          tray: "Arriving",
          done: "Everyone's in their place. 开饭 — let's eat!",
          items: [
            { wordId: "yeye", who: "Yéye", hint: "The eldest. He sits facing the door.", art: <Portrait pose="sit" />, tint: "#d9a441" },
            { wordId: "nainai", who: "Nǎinai", hint: "Beside Yéye. She'll keep filling your bowl.", art: <Portrait pose="sit" />, tint: "#c0392b" },
            { wordId: "baba", who: "Bàba", hint: "Your dad. Next to his parents.", art: <Portrait />, tint: "#2d6ab8" },
            { wordId: "mama", who: "Māma", hint: "Nearest the kitchen — up and down all night.", art: <Portrait />, tint: "#3f7d55" },
          ],
        },
        after: [
          { who: "nainai", text: "{{对了！}}", gloss: "duì le — that's right!" },
          { who: "guide", text: "Twelve dishes. One very full table.", gloss: "Fish for plenty, noodles for long life, and the forty dumplings." },
        ],
        culture: ["seating"],
        memory: "table",
        nudges: { "canting:nainai": [{ who: "nainai", text: "Set the table — everyone's hungry!" }] },
      },
      {
        id: "story",
        quest: { v: "Listen to Nǎinai", hint: "After dinner, she has a story." },
        at: { room: "canting", hotspot: "nainai" },
        lines: [{ who: "nainai", text: "Do you know why everything is red tonight? Listen.", gloss: "A story her own grandmother told her." }],
        game: {
          type: "story",
          kicker: "A story from Nǎinai",
          title: "The monster called Nián",
          native: "年的故事",
          teller: "nainai",
          panels: story,
          question: {
            native: "年怕什么？",
            roman: "nián pà shénme?",
            english: "What is Nián afraid of?",
            choices: [
              { native: "红色", roman: "hóngsè", english: "red", right: true },
              { native: "饺子", roman: "jiǎozi", english: "dumplings", reply: [{ who: "nainai", text: "Dumplings? Then it would never leave!" }] },
              { native: "猫", roman: "māo", english: "cats", reply: [{ who: "nainai", text: "{{猫}}? No — think about the doors.", gloss: "māo — cat." }] },
            ],
          },
        },
        culture: ["nian"],
        memory: "story",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Nǎinai", hint: "She's holding out a red envelope." },
      lines: [
        { who: "guide", text: "Nǎinai takes a red envelope out of her sleeve." },
        { who: "nainai", text: "{{来，给你红包。}}", gloss: "lái, gěi nǐ hóngbāo — here, a red envelope for you." },
      ],
      asker: "nainai",
      question: {
        native: "你要说什么？",
        roman: "nǐ yào shuō shénme?",
        english: "What do you say?",
        choices: [
          { native: "新年快乐！", roman: "xīnnián kuàilè!", english: "Happy New Year!", right: true },
          { native: "生日快乐！", roman: "shēngrì kuàilè!", english: "Happy birthday!", reply: [{ who: "nainai", text: "{{哈哈}} — it's not your birthday! It's New Year.", gloss: "hāhā" }] },
          { native: "再见！", roman: "zàijiàn!", english: "Goodbye!", reply: [{ who: "nainai", text: "Leaving already? Try again." }] },
        ],
      },
      right: [
        { who: "you", text: "{{新年快乐，奶奶！}}", gloss: "xīnnián kuàilè, nǎinai — Happy New Year, Grandma!" },
        { who: "nainai", text: "{{新年快乐！}} Look at you.", gloss: "xīnnián kuàilè" },
        { who: "guide", text: "…You said it before you'd even thought about it." },
      ],
      encounter: ["hongbao"],
      memory: "newyear",
    },
    idle: {
      "menkou:door": [{ who: "guide", text: "福到了. Fortune has arrived — upside down." }],
      "canting:table": [{ who: "guide", text: "Twelve dishes. Nobody is going to finish them. That's the point." }],
      "chufang:mama": [{ who: "mama", text: "Go sit with Nǎinai — I've got this." }],
    },
    afterwards: {
      "canting:nainai": [{ who: "nainai", text: "At midnight we'll watch the fireworks on TV. {{好不好？}}", gloss: "hǎo bu hǎo — okay?" }],
      "chufang:mama": [{ who: "mama", text: "Tomorrow we eat the leftovers — for plenty. That's the rule." }],
    },
    complete: {
      title: "Reunion",
      em: "Dinner",
      text: "You put up the fú, wrapped dumplings, seated the family and wished Nǎinai a happy New Year — in Mandarin.",
      quest: { v: "Wait up for midnight", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <DiningArt done={new Set(["dumplings", "seats"])} />,
};

export default content;
