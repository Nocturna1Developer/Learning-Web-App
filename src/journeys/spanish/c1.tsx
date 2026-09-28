import type { ChapterContent } from "../types";
import { Defs, Walls, Door, Window, PhotoFrame, FLOOR_Y, WOOD, FRAME } from "../../game/rooms";
import { Figure, Child, House, Pot } from "../../components/scenes/primitives";
import { Icon, Panel } from "../kit";
import { PapelPicado, Marigolds, Candle, PanDeMuerto } from "./art";

/* =====================================================================
   SPANISH · A Mexican-American family
   Chapter One — La Ofrenda. October 31st: across the street it's
   Halloween; in this house Abuela is getting ready for Día de Muertos.
   ===================================================================== */

/* ---------------- art ---------------- */

function Ofrenda({ x, filled }: { x: number; filled: boolean }) {
  const y = FLOOR_Y;
  const lace = (lx: number, w: number, ly: number) => (
    <path d={Array.from({ length: Math.floor(w / 14) }, (_, i) => `M${lx + i * 14} ${ly} q7 10 14 0`).join(" ")} fill="none" stroke="#e9dcc2" strokeWidth="2" />
  );
  return (
    <g>
      {/* tiers */}
      <rect x={x} y={y - 150} width="300" height="150" fill="#f7f1e6" />
      {lace(x, 300, y - 150)}
      <rect x={x + 30} y={y - 240} width="240" height="90" fill="#fbf7ef" />
      {lace(x + 30, 240, y - 240)}
      <rect x={x + 70} y={y - 320} width="160" height="80" fill="#fffdf8" />
      {lace(x + 70, 160, y - 320)}
      <rect x={x} y={y - 150} width="300" height="6" fill="#e0d4bf" />
      <PapelPicado x1={x - 50} x2={x + 350} y={y - 470} sag={26} n={8} />
      {filled && (
        <g>
          {/* top: the photo */}
          <g transform={`rotate(-2 ${x + 150} ${y - 380})`}>
            <rect x={x + 112} y={y - 420} width="76" height="92" fill={FRAME} />
            <rect x={x + 118} y={y - 414} width="64" height="80" fill="#e6d7b8" />
            <Figure x={x + 150} y={y - 336} h={62} color="#3a2718" />
          </g>
          <Candle x={x + 88} y={y - 320} h={34} />
          <Candle x={x + 212} y={y - 320} h={34} />
          {/* middle: bread and flowers */}
          <PanDeMuerto x={x + 150} y={y - 240} s={0.9} />
          <Marigolds x={x + 70} y={y - 252} n={3} r={10} />
          <Marigolds x={x + 232} y={y - 252} n={3} r={10} />
          {/* bottom: water, salt, candles */}
          <path d={`M${x + 60} ${y - 196}h24l-3 44h-18Z`} fill="#dfe8ee" opacity="0.9" />
          <path d={`M${x + 62} ${y - 180}h20l-2 28h-16Z`} fill="#8fbfd8" />
          <ellipse cx={x + 240} cy={y - 156} rx="22" ry="7" fill="#f4ecdd" stroke="#c8c0b0" strokeWidth="2" />
          <Candle x={x + 30} y={y - 150} h={30} />
          <Candle x={x + 150} y={y - 150} h={44} />
          <Candle x={x + 272} y={y - 150} h={30} />
          {/* a path of petals leading to it */}
          {Array.from({ length: 22 }, (_, i) => (
            <circle key={i} cx={x - 40 - i * 26 + (i % 3) * 6} cy={y + 30 + (i % 2) * 14} r={5 + (i % 3)} fill={i % 3 ? "#f08a1c" : "#f7b23b"} opacity="0.9" />
          ))}
        </g>
      )}
    </g>
  );
}

function GlassDoor({ x }: { x: number }) {
  return (
    <g>
      <rect x={x - 8} y={FLOOR_Y - 340} width="166" height="340" fill={FRAME} />
      <rect x={x} y={FLOOR_Y - 332} width="150" height="332" fill="#2a3552" />
      <rect x={x} y={FLOOR_Y - 332} width="150" height="332" fill="url(#dusk-glass)" />
      <line x1={x + 75} y1={FLOOR_Y - 332} x2={x + 75} y2={FLOOR_Y} stroke={FRAME} strokeWidth="6" />
      <path d={`M${x + 12} ${FLOOR_Y - 300}l40 -20M${x + 90} ${FLOOR_Y - 250}l40 -20`} stroke="#fff" strokeWidth="4" opacity="0.18" />
      {/* marigolds glimpsed outside */}
      <Marigolds x={x + 40} y={FLOOR_Y - 40} n={3} r={9} />
      <Marigolds x={x + 112} y={FLOOR_Y - 34} n={3} r={9} />
    </g>
  );
}

function SalaArt({ done }: { done: ReadonlySet<string> }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="room-art" aria-hidden="true">
      <Defs />
      <defs>
        <linearGradient id="dusk-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3a6a" />
          <stop offset="100%" stopColor="#e2a07f" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <Walls tint="#f0dcc0" shade="#dcc4a2" />
      <Door x={40} open />
      <Window x={260} y={220} w={300} h={220} />
      {/* sofa with a striped sarape */}
      <rect x={360} y={FLOOR_Y - 140} width="340" height="140" rx="12" fill="#7a3a22" />
      <rect x={360} y={FLOOR_Y - 200} width="340" height="74" rx="14" fill="#8e4a2c" />
      <g transform={`rotate(-4 540 ${FLOOR_Y - 150})`}>
        {["#d6457a", "#f0cf3a", "#2d6ab8", "#3f7d55", "#e07a2f", "#7a3a8a"].map((c, i) => (
          <rect key={c} x={500} y={FLOOR_Y - 200 + i * 12} width="120" height="12" fill={c} />
        ))}
      </g>
      {/* Papá's guitar */}
      <g transform="rotate(-12 780 400)">
        <rect x={774} y={290} width="12" height="110" fill="#5a3a22" />
        <rect x={768} y={276} width="24" height="22" rx="4" fill="#3a2718" />
        <ellipse cx="780" cy="430" rx="34" ry="30" fill="#b8763a" />
        <ellipse cx="780" cy="470" rx="42" ry="36" fill="#b8763a" />
        <circle cx="780" cy="440" r="10" fill="#3a2718" />
      </g>
      {/* family photos */}
      <PhotoFrame x={840} y={300} w={90} h={110} tint="#d6457a" two />
      <PhotoFrame x={950} y={330} w={70} h={80} tint="#2d6ab8" />
      {/* Abuela's armchair */}
      <rect x={950} y={FLOOR_Y - 160} width="130" height="160" rx="16" fill="#3f7d55" />
      <rect x={940} y={FLOOR_Y - 90} width="150" height="40" rx="10" fill="#2f6242" />
      <Figure x={1012} y={FLOOR_Y - 18} h={170} color="#2a1a12" pose="sit" />
      <Ofrenda x={1110} filled={done.has("ofrenda")} />
      <GlassDoor x={1440} />
      <rect x={380} y={FLOOR_Y + 36} width="620" height="56" rx="4" fill="#b8452f" />
      <rect x={396} y={FLOOR_Y + 46} width="588" height="36" fill="none" stroke="#f0cf7a" strokeWidth="2" strokeDasharray="10 8" opacity="0.7" />
    </svg>
  );
}

function CocinaArt() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="room-art" aria-hidden="true">
      <Defs />
      <Walls tint="#f3e6cf" floor="#b5623a" floorLine="#8a4528" shade="#e0cfb0" />
      <Door x={40} open />
      {/* talavera tiles */}
      <rect x={300} y={330} width="1300" height="200" fill="#f8f4ea" />
      {Array.from({ length: 26 }, (_, c) =>
        Array.from({ length: 4 }, (_, r) => {
          const tx = 300 + c * 50 + 25;
          const ty = 330 + r * 50 + 25;
          return (
            <g key={`${c}-${r}`}>
              <rect x={tx - 25} y={ty - 25} width="50" height="50" fill="none" stroke="#d9d0bd" strokeWidth="1.5" />
              <path d={`M${tx} ${ty - 14}l14 14l-14 14l-14 -14Z`} fill={(c + r) % 3 ? "#2d6ab8" : "#e0a030"} opacity="0.8" />
              <circle cx={tx} cy={ty} r="4" fill="#f8f4ea" />
            </g>
          );
        }),
      )}
      {/* shelf with jarritos and a painted plate */}
      <rect x={320} y={300} width="560" height="12" fill={WOOD} />
      {[360, 420, 480].map((x, i) => (
        <g key={x}>
          <path d={`M${x - 18} 300 q-2 -40 18 -44 q20 4 18 44Z`} fill={["#b8642f", "#9a4a2a", "#c8704a"][i]} />
          <path d={`M${x + 18} 270 q14 4 0 20`} fill="none" stroke={["#b8642f", "#9a4a2a", "#c8704a"][i]} strokeWidth="5" />
        </g>
      ))}
      <circle cx={620} cy={250} r="44" fill="#f8f4ea" stroke="#2d6ab8" strokeWidth="6" />
      <circle cx={620} cy={250} r="20" fill="none" stroke="#e0a030" strokeWidth="5" />
      {/* counter */}
      <rect x={300} y={FLOOR_Y - 230} width="1300" height="22" fill="#cfc4ad" />
      <rect x={300} y={FLOOR_Y - 208} width="1300" height="208" fill="#8c6240" />
      {Array.from({ length: 6 }, (_, i) => <rect key={i} x={312 + i * 216} y={FLOOR_Y - 196} width="200" height="186" fill="#7a5436" stroke="#5a3a22" strokeWidth="2" />)}
      {/* stove: olla de barro and comal */}
      <rect x={1180} y={FLOOR_Y - 246} width="260" height="16" fill="#3a3a40" />
      <Pot x={1250} y={FLOOR_Y - 246} w={110} color="#9a4a2a" rim="#6b3220" />
      <ellipse cx={1380} cy={FLOOR_Y - 250} rx="48" ry="8" fill="#1a1a1e" />
      <path d="M1230 560 C1218 540 1246 526 1234 500" stroke="#f4ecdd" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.4" className="steam" />
      <Figure x={1500} y={FLOOR_Y} h={230} color="#2a1a12" pose="stand" flip />
      {/* counter items — the fetch game's objects */}
      <rect x={420} y={FLOOR_Y - 330} width="70" height="100" rx="8" fill="#8fbfd8" opacity="0.85" />
      <path d={`M490 ${FLOOR_Y - 316} q28 6 0 40`} fill="none" stroke="#8fbfd8" strokeWidth="8" />
      <path d={`M640 ${FLOOR_Y - 232} l14 -54 h92 l14 54Z`} fill="#b8864a" />
      {[670, 700, 730].map((x, i) => <circle key={x} cx={x} cy={FLOOR_Y - 294} r="18" fill={["#f0cf7a", "#e2a07f", "#c98b4a"][i]} />)}
      <rect x={884} y={FLOOR_Y - 290} width="34" height="58" rx="6" fill="#ece8de" />
      <path d={`M886 ${FLOOR_Y - 290} q15 -20 30 0Z`} fill="#b9b3a6" />
      <rect x={1010} y={FLOOR_Y - 280} width="70" height="48" fill="#e9dcc2" />
      {[1022, 1040, 1058].map((x) => <rect key={x} x={x} y={FLOOR_Y - 300} width="10" height="22" fill="#f4ecdd" />)}
      {/* molcajete */}
      <path d={`M1150 ${FLOOR_Y - 262} q30 34 60 0Z`} fill="#6b6660" />
      <path d={`M1156 ${FLOOR_Y - 248} l-6 16 M1204 ${FLOOR_Y - 248} l6 16`} stroke="#5a5550" strokeWidth="6" />
    </svg>
  );
}

function PatioArt() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="room-art" aria-hidden="true">
      <Defs />
      <defs>
        <linearGradient id="patio-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2a52" />
          <stop offset="60%" stopColor="#7a4a6a" />
          <stop offset="100%" stopColor="#e2a07f" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#patio-sky)" />
      {/* neighbours' roofs and a jack-o'-lantern glow — it's Halloween across the street */}
      <House x={700} y={520} w={220} h={90} wall="#3a2a3a" roof="#2a1a2a" lit />
      <House x={1000} y={520} w={180} h={80} wall="#3a2a3a" roof="#2a1a2a" />
      <circle cx={830} cy={505} r="10" fill="#f08a1c" />
      {/* fence */}
      <rect x={0} y={520} width="1600" height="240" fill="#6b4429" />
      {Array.from({ length: 34 }, (_, i) => <rect key={i} x={i * 48} y={500 + (i % 2) * 6} width="44" height="260" fill={i % 2 ? "#7a5234" : "#734c30"} />)}
      {/* string lights */}
      <path d="M0 250 Q400 330 800 260 T1600 250" fill="none" stroke="#2a1a12" strokeWidth="2" />
      {Array.from({ length: 16 }, (_, i) => {
        const t = i / 15;
        const x = t * 1600;
        const y = 250 + Math.sin(t * Math.PI * 2) * -30 + 40 * Math.sin(t * Math.PI);
        return <circle key={i} cx={x} cy={y + 8} r="7" fill="#ffd07a" opacity="0.95" />;
      })}
      {/* patio floor */}
      <rect x={0} y={FLOOR_Y} width="1600" height="140" fill="#9c8f7e" />
      {Array.from({ length: 9 }, (_, i) => <line key={i} x1={i * 200} y1={FLOOR_Y} x2={i * 200 - 60} y2="900" stroke="#857868" strokeWidth="2" />)}
      {/* glass door back inside */}
      <rect x={32} y={FLOOR_Y - 340} width="166" height="340" fill={FRAME} />
      <rect x={40} y={FLOOR_Y - 332} width="150" height="332" fill="#f0dcc0" opacity="0.85" />
      <line x1={115} y1={FLOOR_Y - 332} x2={115} y2={FLOOR_Y} stroke={FRAME} strokeWidth="6" />
      {/* a single pot */}
      <path d={`M395 ${FLOOR_Y} l-10 -60 h70 l-10 60Z`} fill="#b8642f" />
      <Marigolds x={420} y={FLOOR_Y - 72} n={3} r={13} />
      {/* the cempasúchil — rows of pots */}
      {[640, 760, 880, 1000].map((x, i) => (
        <g key={x}>
          <path d={`M${x - 40} ${FLOOR_Y} l-8 -70 h96 l-8 70Z`} fill={i % 2 ? "#9a4a2a" : "#b8642f"} />
          <Marigolds x={x} y={FLOOR_Y - 84} n={5} r={14} />
          <Marigolds x={x + 4} y={FLOOR_Y - 108} n={3} r={13} />
        </g>
      ))}
      {/* lemon tree */}
      <path d={`M1170 ${FLOOR_Y} l-14 -90 h120 l-14 90Z`} fill="#8a4a2e" />
      <rect x={1210} y={FLOOR_Y - 230} width="16" height="140" fill="#5a3a22" />
      <circle cx={1218} cy={FLOOR_Y - 280} r="100" fill="#2f6b45" />
      <circle cx={1170} cy={FLOOR_Y - 250} r="60" fill="#3f7d55" />
      {[[1180, 470], [1240, 440], [1270, 510], [1150, 520], [1215, 540]].map(([cx, cy]) => <ellipse key={cx} cx={cx} cy={cy} rx="12" ry="9" fill="#f0cf3a" />)}
      {/* a small table with a radio */}
      <rect x={1380} y={FLOOR_Y - 110} width="140" height="10" fill={WOOD} />
      <rect x={1440} y={FLOOR_Y - 100} width="12" height="100" fill={WOOD} />
      <rect x={1400} y={FLOOR_Y - 160} width="90" height="50" rx="8" fill="#b8452f" />
      <circle cx={1425} cy={FLOOR_Y - 135} r="14" fill="#3a2718" />
      <rect x={1450} y={FLOOR_Y - 150} width="30" height="8" fill="#f0cf7a" />
    </svg>
  );
}

/* ---------------- item icons ---------------- */

const marigoldIcon = (
  <svg viewBox="0 0 80 90" aria-hidden="true">
    <path d="M40 86V50M40 66q-12-4-16-14M40 72q12-4 16-14" stroke="#3f7d55" strokeWidth="4" fill="none" />
    <g transform="translate(40 34)">
      {Array.from({ length: 12 }, (_, i) => <ellipse key={i} rx="7" ry="16" fill={i % 2 ? "#f08a1c" : "#f7b23b"} transform={`rotate(${i * 30}) translate(0 -12)`} />)}
      <circle r="9" fill="#b8561a" />
    </g>
  </svg>
);
const panDeMuertoIcon = (
  <svg viewBox="0 0 80 90" aria-hidden="true"><PanDeMuerto x={40} y={70} s={1.05} /></svg>
);
const basketIcon = (
  <svg viewBox="0 0 80 90" aria-hidden="true">
    <path d="M8 50h64l-8 30H16Z" fill="#b8864a" />
    <path d="M14 58h52M18 68h44" stroke="#8a5a2a" strokeWidth="2" />
    {[24, 40, 56].map((x, i) => <circle key={x} cx={x} cy={44} r="12" fill={["#f0cf7a", "#e2a07f", "#c98b4a"][i]} />)}
    <path d="M18 44q6-6 12 0M34 44q6-6 12 0M50 44q6-6 12 0" stroke="#fff" strokeWidth="2" fill="none" opacity="0.5" />
  </svg>
);
const candleBox = (
  <svg viewBox="0 0 80 90" aria-hidden="true">
    <rect x="10" y="44" width="60" height="38" fill="#e9dcc2" />
    {[22, 34, 46, 58].map((x) => <rect key={x} x={x - 4} y="18" width="8" height="30" fill="#f4ecdd" stroke="#d6c8ae" />)}
  </svg>
);

/* ---------------- story panels ---------------- */

const story = [
  {
    art: (
      <Panel id="es1" sky={["#f0cf7a", "#e8a86a"]} ground="#6b5a2a">
        <path d="M0 170 Q100 110 200 150 T400 130 V200 H0Z" fill="#8a7a3a" />
        <path d="M0 190 Q120 150 260 180 T400 170 V200 H0Z" fill="#6b6a2a" />
        {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={(i * 37) % 400} cy={196 + (i % 4) * 10} r={4 + (i % 3)} fill={i % 2 ? "#f08a1c" : "#f7b23b"} />)}
        <House x={150} y={170} w={60} h={32} wall="#e6d2b0" roof="#b8452f" />
        <House x={230} y={176} w={50} h={28} wall="#e8d8bc" roof="#9a4a2a" />
        <Child x={90} y={206} h={46} color="#2a1a12" pose="walk" />
      </Panel>
    ),
    text: "Your bisabuelo Ramón grew up in a little {{pueblo}} in Michoacán, where the {{cempasúchil}} turns whole hillsides gold in November.",
  },
  {
    art: (
      <Panel id="es2" sky={["#9fc0d8", "#f0d7a8"]} ground="#b8a27a">
        <path d="M0 150 L80 110 L160 140 L260 100 L400 140 V200 H0Z" fill="#8a9aa8" opacity="0.7" />
        <path d="M170 240 L195 150 H205 L230 240Z" fill="#8c8272" />
        <Figure x={200} y={200} h={64} color="#2a1a12" pose="walk" />
        <rect x={214} y={176} width="16" height="12" fill="#6b3220" />
      </Panel>
    ),
    text: "When he was young he came north with one suitcase — and a recipe for {{pan}}.",
  },
  {
    art: (
      <Panel id="es3" sky={["#2a2a52", "#7a4a6a"]} ground="#3a3030">
        <rect x={90} y={70} width="220" height="130" fill="#e6d2b0" />
        {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M${90 + i * 27.5} 70h27.5l-6 22h-15.5Z`} fill={i % 2 ? "#d6457a" : "#f4ecdd"} />)}
        <rect x={110} y={110} width="110" height="70" fill="#ffd07a" opacity="0.9" />
        {[130, 160, 190].map((x) => <circle key={x} cx={x} cy={162} r="10" fill="#c98b4a" />)}
        <rect x={240} y={110} width="50" height="90" fill="#6b4429" />
        <text x={200} y={62} textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="18" fill="#f0cf7a" letterSpacing="3">PANADERÍA</text>
        <Figure x={265} y={200} h={60} color="#2a1a12" />
      </Panel>
    ),
    text: "He opened a little {{panadería}}. Every Día de Muertos he baked pan de muerto for the whole street.",
  },
  {
    art: (
      <Panel id="es4" sky={["#1a1420", "#3a2430"]} ground="#2a1e1a">
        <rect x={130} y={130} width="140" height="70" fill="#f7f1e6" opacity="0.9" />
        <rect x={155} y={96} width="90" height="34" fill="#fbf7ef" opacity="0.9" />
        <rect x={184} y={60} width="32" height="36" fill="#3a2718" />
        {[140, 200, 260].map((x) => <g key={x}><circle cx={x} cy={118} r="20" fill="#ffd07a" opacity="0.35" /><rect x={x - 3} y={116} width="6" height="14" fill="#f4ecdd" /></g>)}
        {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={120 - i * 9} cy={210 + (i % 2) * 8} r="4" fill="#f08a1c" />)}
      </Panel>
    ),
    text: "Now we bake it for him. The flowers and the candles help him find his way home — {{a casa}}.",
  },
];

/* ---------------- the journey ---------------- */

/* ---------------- the chapter ---------------- */

const content: ChapterContent = {
  startRoom: "sala",
  rooms: {
    sala: {
      id: "sala",
      name: "Living room",
      native: "la sala",
      art: (done) => <SalaArt done={done} />,
      spawn: { left: 240, right: 1340 },
      hotspots: [
        { id: "cocina", x: 130, y: 560, label: "Kitchen", kind: "exit", to: "cocina" },
        { id: "window", x: 410, y: 470, label: "Window", kind: "word", wordId: "casa" },
        { id: "sofa", x: 560, y: 640, label: "Rebozo", kind: "flavor", note: "Abuela's rebozo, folded over the sofa arm. It came from Michoacán with her.", culture: "rebozo" },
        { id: "guitar", x: 780, y: 430, label: "Papá's guitar", kind: "word", wordId: "papa" },
        { id: "photos", x: 890, y: 370, label: "Family photos", kind: "word", wordId: "familia" },
        { id: "abuela", x: 1012, y: 560, label: "Abuela", kind: "npc" },
        { id: "ofrenda", x: 1260, y: 540, label: "Ofrenda", kind: "quest" },
        { id: "patio", x: 1515, y: 560, label: "Patio", kind: "exit", to: "patio" },
      ],
    },
    cocina: {
      id: "cocina",
      name: "Kitchen",
      native: "la cocina",
      art: <CocinaArt />,
      spawn: { left: 240, right: 1100 },
      hotspots: [
        { id: "back", x: 130, y: 560, label: "Living room", kind: "exit", to: "sala" },
        { id: "jarra", x: 455, y: 470, label: "Pitcher", kind: "word", wordId: "agua" },
        { id: "pan", x: 700, y: 470, label: "Pan dulce", kind: "word", wordId: "pan" },
        { id: "sal", x: 900, y: 480, label: "Salt", kind: "word", wordId: "sal" },
        { id: "velas", x: 1045, y: 470, label: "Box of candles", kind: "word", wordId: "vela" },
        { id: "molcajete", x: 1180, y: 480, label: "Molcajete", kind: "flavor", note: "Abuela's molcajete — a stone bowl for grinding salsa. It's older than Mamá.", culture: "molcajete" },
        { id: "mama", x: 1450, y: 560, label: "Mamá", kind: "npc" },
      ],
    },
    patio: {
      id: "patio",
      name: "Patio",
      native: "el patio",
      art: <PatioArt />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "back", x: 120, y: 560, label: "Living room", kind: "exit", to: "sala" },
        { id: "flor", x: 420, y: 610, label: "A single pot", kind: "word", wordId: "flor" },
        { id: "flores", x: 820, y: 600, label: "Cempasúchil", kind: "quest" },
        { id: "lemon", x: 1218, y: 470, label: "Lemon tree", kind: "flavor", note: "Abuela planted it the year they moved in. It gives more lemons than anyone can use." },
        { id: "radio", x: 1445, y: 560, label: "Radio", kind: "flavor", note: "Rancheras, turned low. Abuela turns it right up when her favourite comes on." },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Capítulo uno · Spanish",
      title: "La",
      em: "Ofrenda",
      text: "October 31st. Across the street, kids are trick-or-treating. In this house, Abuela is getting ready for someone else.",
    },
    introLines: [
      { who: "abuela", text: "{{¡{name}, ven acá!}}", gloss: "“Ven acá” — come here. Abuela, from the living room." },
      { who: "guide", text: "Spanish has been in this house your whole life.", gloss: "You know more of it than you think. Listen for it." },
      { who: "abuela", text: "{{Mañana es Día de Muertos}}, and your bisabuelo's ofrenda is still empty.", gloss: "Tomorrow is the Day of the Dead." },
      { who: "guide", text: "Quest: help Abuela build the ofrenda. Start by talking to her.", gloss: "Walk with ← → or A D. Press E near anything that glows. Or just click it." },
    ],
    beats: [
      {
        id: "list",
        quest: { v: "Talk to Abuela", hint: "She's in the armchair by the ofrenda." },
        at: { room: "sala", hotspot: "abuela" },
        encounter: ["abuela"],
        lines: [
          { who: "abuela", text: "We need {{flores}}, {{pan}}, {{agua}}, {{sal}} and {{velas}}.", gloss: "Flowers, bread, water, salt and candles." },
          { who: "abuela", text: "The {{cempasúchil}} first — out on the patio. I've been growing them all year.", gloss: "Cempasúchil — marigolds." },
        ],
        nudges: {
          "sala:ofrenda": [{ who: "guide", text: "The ofrenda is empty. Abuela knows what it needs." }],
          "cocina:mama": [{ who: "mama", text: "{{¡Hola, cariño!}} Abuela's looking for you.", gloss: "Hi, sweetheart!" }],
        },
      },
      {
        id: "flowers",
        quest: { v: "Pick the cempasúchil", hint: "On the patio, through the glass door." },
        at: { room: "patio", hotspot: "flores" },
        encounter: ["flor"],
        lines: [
          { who: "guide", text: "An armful of {{cempasúchil}}. They smell like pepper and honey.", gloss: "Families say their colour and scent help guide the dead home." },
          { who: "guide", text: "Next: Mamá, in the kitchen.", gloss: "Through the door on the left of the living room." },
        ],
        culture: ["cempasuchil"],
        nudges: {
          "cocina:mama": [{ who: "mama", text: "{{Primero las flores.}} Abuela's orders.", gloss: "Flowers first." }],
          "sala:abuela": [{ who: "abuela", text: "{{Las flores, cariño.}} On the patio.", gloss: "The flowers, sweetheart." }],
          "sala:ofrenda": [{ who: "guide", text: "Flowers first. The patio is through the glass door." }],
        },
      },
      {
        id: "kitchen",
        quest: { v: "Help Mamá in the kitchen", hint: "Through the door on the left of the living room." },
        at: { room: "cocina", hotspot: "mama" },
        encounter: ["mama"],
        lines: [{ who: "mama", text: "{{¡Ahí estás!}} I need hands. Pass me what I ask for.", gloss: "“¡Ahí estás!” — there you are!" }],
        game: {
          type: "fetch",
          npc: "mama",
          kicker: "Mini-game · En la cocina",
          title: "Pass Mamá what she asks for.",
          hint: "Nothing on the counter is labelled. Listen for the word.",
          asks: [
            { wordId: "pan", native: "Pásame el pan.", roman: "Pásame el pan.", english: "Pass me the bread." },
            { wordId: "agua", native: "Pásame el agua, por favor.", roman: "Pásame el agua, por favor.", english: "Pass me the water, please." },
            { wordId: "vela", native: "Pásame las velas.", roman: "Pásame las velas.", english: "Pass me the candles." },
            { wordId: "sal", native: "Y la sal.", roman: "Y la sal.", english: "And the salt." },
          ],
          items: [
            { wordId: "agua", label: "Pitcher", art: Icon.jug },
            { wordId: "pan", label: "Basket", art: basketIcon },
            { wordId: "sal", label: "Shaker", art: Icon.salt },
            { wordId: "vela", label: "Box", art: candleBox },
          ],
          done: { native: "¡Gracias, cariño!", roman: "¡Gracias, cariño!", english: "Thank you, sweetheart!" },
        },
        after: [{ who: "mama", text: "{{¡Gracias!}} Take it all to Abuela.", gloss: "Everything's on the tray." }],
        memory: "kitchen",
        nudges: {
          "sala:abuela": [{ who: "abuela", text: "Mamá has the pan de muerto. {{La cocina.}}", gloss: "The kitchen." }],
          "sala:ofrenda": [{ who: "guide", text: "Still missing the bread, water, salt and candles. Mamá has them." }],
        },
      },
      {
        id: "ofrenda",
        quest: { v: "Build the ofrenda", hint: "Back in the living room." },
        at: { room: "sala", hotspot: "ofrenda" },
        lines: [{ who: "guide", text: "Everything's here. Now it goes on the ofrenda.", gloss: "Three tiers under a white cloth, papel picado above." }],
        game: {
          type: "place",
          board: "altar",
          kicker: "Mini-game · La ofrenda",
          title: "Build the ofrenda.",
          hint: "Pick something from the tray, then the place labelled for it. The labels are in Spanish — you've heard every one of them tonight.",
          tray: "On the tray",
          done: "The ofrenda is ready. The candles are lit.",
          items: [
            { wordId: "foto", who: "His photo", hint: "At the top, where he can see everyone.", art: Icon.photo, tint: "#e6d7b8" },
            { wordId: "vela", who: "Candles", hint: "Light, so he can find the way.", art: Icon.candle, tint: "#f7f1e6" },
            { wordId: "flor", who: "Marigolds", hint: "Colour and scent, to guide him home.", art: marigoldIcon, tint: "#f7d9a8" },
            { wordId: "pan", who: "Pan de muerto", hint: "His favourite. He used to bake it himself.", art: panDeMuertoIcon, tint: "#ecd0a8" },
          ],
        },
        after: [{ who: "abuela", text: "{{Qué bonita.}} Now he can find his way home.", gloss: "“Qué bonita” — how beautiful." }],
        culture: ["ofrenda", "papel"],
        memory: "ofrenda",
        nudges: { "sala:abuela": [{ who: "abuela", text: "{{La ofrenda}}, cariño. Put it all on.", gloss: "The ofrenda." }] },
      },
      {
        id: "story",
        quest: { v: "Sit with Abuela", hint: "She has a story about the man in the photo." },
        at: { room: "sala", hotspot: "abuela" },
        lines: [{ who: "abuela", text: "{{Siéntate.}} Let me tell you about him.", gloss: "“Siéntate” — sit down." }],
        game: {
          type: "story",
          kicker: "A story from Abuela",
          title: "Bisabuelo Ramón",
          native: "La historia del bisabuelo",
          teller: "abuela",
          panels: story,
          question: {
            native: "¿Qué hacía el bisabuelo?",
            roman: "¿Qué hacía el bisabuelo?",
            english: "What did Bisabuelo make?",
            choices: [
              { native: "Pan", roman: "Pan", english: "Bread", right: true },
              { native: "Zapatos", roman: "Zapatos", english: "Shoes", reply: [{ who: "abuela", text: "{{¿Zapatos?}} No, no — think of the panadería.", gloss: "Shoes?" }] },
              { native: "Música", roman: "Música", english: "Music", reply: [{ who: "abuela", text: "He sang terribly, cariño. What did he bake?" }] },
            ],
          },
        },
        memory: "story",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Abuela", hint: "She's pointing at the photo." },
      lines: [{ who: "guide", text: "Abuela taps the photo at the top of the ofrenda." }],
      asker: "abuela",
      question: {
        native: "¿Y quién es él?",
        roman: "¿Y quién es él?",
        english: "And who is he?",
        choices: [
          { native: "Es mi bisabuelo.", roman: "Es mi bisabuelo.", english: "He's my great-grandfather.", right: true },
          { native: "Es mi abuelo.", roman: "Es mi abuelo.", english: "He's my grandfather.", reply: [{ who: "abuela", text: "Casi — he's {{mi}} papá. So to you, he's your…?", gloss: "Almost — he's my dad." }] },
          { native: "No sé.", roman: "No sé.", english: "I don't know.", reply: [{ who: "abuela", text: "{{Sí sabes.}} You just heard his whole story.", gloss: "You do know." }] },
        ],
      },
      right: [
        { who: "you", text: "{{Es mi bisabuelo.}}", gloss: "“He's my great-grandfather.”" },
        { who: "abuela", text: "{{¡Eso!}} And now you'll remember him too.", gloss: "“¡Eso!” — that's it!" },
        { who: "guide", text: "…He isn't just a photo any more." },
      ],
      encounter: ["bisabuelo"],
      memory: "remember",
    },
    idle: {
      "sala:ofrenda": [{ who: "guide", text: "The ofrenda glows. Bisabuelo would like it." }],
      "patio:flores": [{ who: "guide", text: "The rest of the cempasúchil stays in the pots until tomorrow." }],
      "cocina:mama": [{ who: "mama", text: "Go on — Abuela's waiting for you." }],
    },
    afterwards: {
      "sala:abuela": [{ who: "abuela", text: "{{Mañana}} we'll take the rest of the flowers to the cemetery.", gloss: "Mañana — tomorrow." }],
      "cocina:mama": [{ who: "mama", text: "Abuela says the kitchen smells like his panadería tonight." }],
    },
    complete: {
      title: "La",
      em: "Ofrenda",
      text: "You built the ofrenda, heard your bisabuelo's story, and told Abuela who he was — in Spanish.",
      quest: { v: "Stay with Abuela a while", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <SalaArt done={new Set(["ofrenda"])} />,
};

export default content;
