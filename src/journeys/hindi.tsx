import type { Journey, Word } from "./types";
import { Defs, Walls, Door, Window, PhotoFrame, FLOOR_Y, WOOD } from "../game/rooms";
import { Figure, Garland, Pot } from "../components/scenes/primitives";
import { Icon, Panel } from "./kit";

/* =====================================================================
   HINDI · Devanagari · A Hindi-speaking family from Lucknow
   Chapter One — दादी आईं, Dadi's Here. The first day of summer.
   ===================================================================== */

const words: Word[] = [
  { id: "paani", native: "पानी", roman: "paani", english: "water", group: "food", where: "the kitchen tap" },
  { id: "doodh", native: "दूध", roman: "doodh", english: "milk", group: "food", where: "the fridge" },
  { id: "cheeni", native: "चीनी", roman: "cheeni", english: "sugar", group: "food", where: "Maa's jar" },
  { id: "chai", native: "चाय", roman: "chai", english: "tea", group: "food", where: "the kitchen" },
  { id: "adrak", native: "अदरक", roman: "adrak", english: "ginger", group: "food", where: "the kitchen" },
  { id: "ghar", native: "घर", roman: "ghar", english: "home · house", group: "home", where: "the living-room window" },
  { id: "chashma", native: "चश्मा", roman: "chashma", english: "glasses", group: "home", where: "Dadi's room" },
  { id: "kahaani", native: "कहानी", roman: "kahaani", english: "story", group: "home", where: "Dadi's storybook" },
  { id: "maa", native: "माँ", roman: "maa", english: "mom", group: "family", where: "the kitchen" },
  { id: "papa", native: "पापा", roman: "papa", english: "dad", group: "family", where: "his cricket match" },
  { id: "dadi", native: "दादी", roman: "daadi", english: "grandma (dad's mother)", group: "family", where: "the living room" },
  { id: "dada", native: "दादा", roman: "daada", english: "grandpa (dad's father)", group: "family", where: "the photo over the sofa" },
  { id: "parivaar", native: "परिवार", roman: "parivaar", english: "family", group: "family", where: "the photos in Dadi's room" },
];

/* ---------------- art ---------------- */

function Diya({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cy="-26" r="40" fill="url(#lamp-glow)" />
      <path d="M-22 0 q22 14 44 0 q-4 -10 -22 -10 t-22 10Z" fill="#b8862f" />
      <path d="M14 -8 q7 -14 0 -26 q-7 12 0 26Z" fill="#f0a830" />
    </g>
  );
}

function Suitcase({ x }: { x: number }) {
  return (
    <g>
      <rect x={x} y={FLOOR_Y - 150} width="130" height="150" rx="10" fill="#7a2a3a" />
      <rect x={x + 10} y={FLOOR_Y - 140} width="110" height="130" rx="6" fill="none" stroke="#5a1a28" strokeWidth="3" />
      <path d={`M${x + 45} ${FLOOR_Y - 150} v-20 h40 v20`} fill="none" stroke="#3a2718" strokeWidth="6" />
      {/* a bright ribbon so it's easy to spot on the carousel */}
      <path d={`M${x + 64} ${FLOOR_Y - 170} q-18 18 -8 36 M${x + 66} ${FLOOR_Y - 170} q16 16 12 34`} stroke="#e0508a" strokeWidth="5" fill="none" strokeLinecap="round" />
      {[0, 1].map((i) => <circle key={i} cx={x + 20 + i * 90} cy={FLOOR_Y + 4} r="7" fill="#1a1a1e" />)}
    </g>
  );
}

function Cushion({ x, y, c }: { x: number; y: number; c: string }) {
  return (
    <g>
      <rect x={x} y={y} width="70" height="56" rx="10" fill={c} />
      {[0, 1, 2].map((r) => [0, 1, 2].map((k) => <circle key={`${r}${k}`} cx={x + 17 + k * 18} cy={y + 12 + r * 16} r="3.5" fill="#f4ecdd" opacity="0.85" />))}
    </g>
  );
}

function BaithakArt({ done }: { done: ReadonlySet<string> }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="room-art" aria-hidden="true">
      <Defs />
      <Walls tint="#f2e3cc" shade="#dfcaa8" />
      <Door x={40} open />
      <Window x={250} y={210} w={260} h={220} />
      <Suitcase x={300} />
      {/* Dada's photo, garlanded */}
      <PhotoFrame x={620} y={250} w={120} h={140} tint="#7a6a5a" />
      <Garland x1={612} x2={748} y={384} sag={14} count={11} />
      {/* sofa with mirror-work cushions */}
      <rect x={540} y={FLOOR_Y - 140} width="360" height="140" rx="12" fill="#c9962f" />
      <rect x={540} y={FLOOR_Y - 200} width="360" height="74" rx="14" fill="#d9a441" />
      <Cushion x={570} y={FLOOR_Y - 196} c="#b8452f" />
      <Cushion x={790} y={FLOOR_Y - 196} c="#2d6ab8" />
      {/* Dadi, just arrived — until she goes to lie down */}
      {!done.has("chai") && <Figure x={990} y={FLOOR_Y} h={200} color="#2a1a12" pose="stand" />}
      {/* side table with a brass lota */}
      <rect x={1070} y={FLOOR_Y - 110} width="90" height="10" fill={WOOD} />
      <rect x={1108} y={FLOOR_Y - 100} width="14" height="100" fill={WOOD} />
      <path d={`M1100 ${FLOOR_Y - 110} q-16 -30 8 -44 h14 q24 14 8 44Z`} fill="#c99a3e" />
      <rect x={1106} y={FLOOR_Y - 164} width="18" height="12" fill="#b8862f" />
      {/* TV with the cricket on */}
      <rect x={1190} y={FLOOR_Y - 380} width="220" height="140" rx="6" fill="#1a1a1e" />
      <rect x={1198} y={FLOOR_Y - 372} width="204" height="124" fill="#4f8a3c" />
      <ellipse cx={1300} cy={FLOOR_Y - 300} rx="60" ry="30" fill="#6aa04e" />
      <rect x={1296} y={FLOOR_Y - 330} width="8" height="40" fill="#e6d8b8" />
      <circle cx={1300} cy={FLOOR_Y - 336} r="7" fill="#f4ecdd" />
      <rect x={1210} y={FLOOR_Y - 262} width="80" height="12" fill="#1a3a6a" />
      <rect x={1210} y={FLOOR_Y - 230} width="200" height="100" fill={WOOD} />
      <Door x={1420} open />
      <rect x={520} y={FLOOR_Y + 30} width="620" height="62" rx="4" fill="#1f4d33" />
      <rect x={536} y={FLOOR_Y + 40} width="588" height="42" fill="none" stroke="#d9a441" strokeWidth="2" strokeDasharray="3 6" opacity="0.8" />
    </svg>
  );
}

function RasoiArt() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="room-art" aria-hidden="true">
      <Defs />
      <Walls tint="#f4e9d6" floor="#c9b89a" floorLine="#a8977a" shade="#e2d4ba" />
      <Door x={40} open />
      {/* steel utensil rack */}
      <rect x={320} y={170} width="620" height="10" fill="#8a8f96" />
      {Array.from({ length: 7 }, (_, i) => <circle key={i} cx={360 + i * 82} cy={240} r="36" fill="#c9cfd4" stroke="#9aa3aa" strokeWidth="3" />)}
      {[1000, 1040, 1080].map((x) => <path key={x} d={`M${x} 180 v90 q0 20 14 20`} stroke="#9aa3aa" strokeWidth="6" fill="none" strokeLinecap="round" />)}
      {/* counter */}
      <rect x={300} y={FLOOR_Y - 230} width="1300" height="22" fill="#3a3a40" />
      <rect x={300} y={FLOOR_Y - 208} width="1300" height="208" fill="#e6dcc8" />
      {Array.from({ length: 6 }, (_, i) => <rect key={i} x={312 + i * 216} y={FLOOR_Y - 196} width="200" height="186" fill="#dccfb4" stroke="#cfc4ad" strokeWidth="2" />)}
      {/* sink + tap */}
      <rect x={380} y={FLOOR_Y - 236} width="130" height="10" fill="#9aa3aa" />
      <path d={`M445 ${FLOOR_Y - 236} v-70 q0 -14 16 -14 h22`} stroke="#9aa3aa" strokeWidth="8" fill="none" />
      {/* masala dabba */}
      <ellipse cx={700} cy={FLOOR_Y - 246} rx="64" ry="18" fill="#c9cfd4" stroke="#9aa3aa" strokeWidth="3" />
      {[["#e8b83a", 670, -250], ["#c0392b", 700, -256], ["#7a4a2a", 730, -250], ["#2a2a2a", 690, -240], ["#c9a36a", 714, -240], ["#4f8a3c", 700, -246]].map(([c, x, dy]) => (
        <ellipse key={`${x}${dy}`} cx={x as number} cy={FLOOR_Y + (dy as number)} rx="11" ry="5" fill={c as string} />
      ))}
      {/* fridge */}
      <rect x={850} y={FLOOR_Y - 420} width="150" height="420" rx="8" fill="#f4f1ea" stroke="#cfc4ad" strokeWidth="3" />
      <line x1={850} y1={FLOOR_Y - 280} x2={1000} y2={FLOOR_Y - 280} stroke="#cfc4ad" strokeWidth="3" />
      <rect x={980} y={FLOOR_Y - 380} width="6" height="70" rx="3" fill="#9aa3aa" />
      {[[880, -380, "#e0508a"], [920, -350, "#e8b83a"], [890, -320, "#2d6ab8"]].map(([x, dy, c]) => <rect key={`${x}`} x={x as number} y={FLOOR_Y + (dy as number)} width="22" height="16" rx="3" fill={c as string} />)}
      {/* stove: pressure cooker and the chai pan */}
      <rect x={1100} y={FLOOR_Y - 246} width="300" height="16" fill="#1a1a1e" />
      <path d={`M1130 ${FLOOR_Y - 246} v-60 q0 -10 10 -10 h80 q10 0 10 10 v60Z`} fill="#c9cfd4" />
      <rect x={1172} y={FLOOR_Y - 334} width="16" height="18" fill="#3a3a40" />
      <rect x={1230} y={FLOOR_Y - 296} width="60" height="10" rx="4" fill="#3a2718" />
      <Pot x={1330} y={FLOOR_Y - 246} w={80} color="#9aa3aa" rim="#6f767c" />
      <path d="M1320 540 C1308 520 1336 506 1324 480" stroke="#f4ecdd" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.4" className="steam" />
      <Figure x={1500} y={FLOOR_Y} h={230} color="#2a1a12" pose="stand" flip />
    </svg>
  );
}

function KamraArt({ done }: { done: ReadonlySet<string> }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="room-art" aria-hidden="true">
      <Defs />
      <Walls tint="#e9dcc8" shade="#d6c6a8" />
      {/* family photos Dadi brought */}
      <PhotoFrame x={440} y={240} w={100} h={120} tint="#c8704a" two />
      <PhotoFrame x={560} y={270} w={80} h={90} tint="#3f7d55" />
      <PhotoFrame x={660} y={250} w={110} h={110} tint="#7a3a8a" two />
      {/* bed with a block-print spread */}
      <rect x={300} y={FLOOR_Y - 190} width="24" height="190" fill={WOOD} />
      <rect x={300} y={FLOOR_Y - 130} width="500" height="70" fill="#2a3a6a" />
      {Array.from({ length: 10 }, (_, i) => Array.from({ length: 2 }, (_, r) => (
        <g key={`${i}${r}`} transform={`translate(${330 + i * 46} ${FLOOR_Y - 112 + r * 32})`}>
          <path d="M0 -10 l10 10 l-10 10 l-10 -10Z" fill="#f4ecdd" opacity="0.8" />
          <circle r="3" fill="#c0392b" />
        </g>
      )))}
      <rect x={330} y={FLOOR_Y - 160} width="120" height="34" rx="10" fill="#f4ecdd" />
      <rect x={300} y={FLOOR_Y - 60} width="500" height="60" fill={WOOD} />
      {/* a storybook on the bed */}
      <g transform={`rotate(-8 660 ${FLOOR_Y - 140})`}>
        <rect x={630} y={FLOOR_Y - 152} width="64" height="44" fill="#b8452f" />
        <rect x={634} y={FLOOR_Y - 148} width="56" height="36" fill="none" stroke="#e8c25a" strokeWidth="2" />
      </g>
      {/* nightstand with radio */}
      <rect x={820} y={FLOOR_Y - 130} width="100" height="130" fill={WOOD} />
      <rect x={830} y={FLOOR_Y - 184} width="80" height="54" rx="6" fill="#6b3220" />
      <circle cx={852} cy={FLOOR_Y - 157} r="14" fill="#3a2718" />
      <rect x={874} y={FLOOR_Y - 170} width="28" height="8" fill="#e8c25a" />
      <line x1={900} y1={FLOOR_Y - 184} x2={930} y2={FLOOR_Y - 240} stroke="#3a3a40" strokeWidth="3" />
      {done.has("chai") && <Figure x={1010} y={FLOOR_Y} h={200} color="#2a1a12" pose="stand" />}
      {/* dressing table with mirror */}
      <rect x={1110} y={FLOOR_Y - 150} width="160" height="150" fill={WOOD} />
      <ellipse cx={1190} cy={FLOOR_Y - 280} rx="64" ry="90" fill="#bcd6e0" stroke="#8a6240" strokeWidth="10" />
      <path d="M1160 400 l30 -40 M1180 430 l30 -40" stroke="#fff" strokeWidth="5" opacity="0.4" />
      {/* a small brass diya on a shelf */}
      <rect x={1300} y={FLOOR_Y - 240} width="90" height="8" fill={WOOD} />
      <Diya x={1345} y={FLOOR_Y - 240} s={0.9} />
      <Door x={1420} open />
      <rect x={380} y={FLOOR_Y + 36} width="560" height="54" rx="4" fill="#c0392b" />
      <rect x={396} y={FLOOR_Y + 46} width="528" height="34" fill="none" stroke="#f0cf7a" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

/* ---------------- icons ---------------- */

const gingerIcon = (
  <svg viewBox="0 0 80 90" aria-hidden="true">
    <path d="M14 60q4-18 20-16q4-16 18-12q14 2 12 18q10 6 4 18q-8 12-24 6q-12 8-22-2q-12-2-8-12Z" fill="#d8b27a" stroke="#a8824a" strokeWidth="2" />
    <path d="M30 56q6 4 12 0M48 50q4 4 10 2" stroke="#a8824a" strokeWidth="2" fill="none" />
  </svg>
);

/* ---------------- story panels: बंदर और मगरमच्छ ---------------- */

function Monkey({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M12 0 q30 -4 24 -30 q-4 -14 -14 -8" stroke="#6b4429" strokeWidth="5" fill="none" strokeLinecap="round" />
      <ellipse cx="0" cy="-16" rx="14" ry="18" fill="#6b4429" />
      <circle cx="0" cy="-42" r="13" fill="#6b4429" />
      <ellipse cx="0" cy="-39" rx="8" ry="7" fill="#d8b27a" />
      <circle cx="-3" cy="-44" r="2" fill="#1a0d08" />
      <circle cx="4" cy="-44" r="2" fill="#1a0d08" />
    </g>
  );
}
function Croc({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-90 0 q20 -26 70 -24 h60 q30 0 40 10 l-40 8 l40 6 q-10 10 -40 10 h-90 q-30 0 -40 -10Z" fill="#3f6a3a" />
      {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M${-60 + i * 16} -22 l6 -8 l6 8`} fill="#2f5230" />)}
      <circle cx="20" cy="-18" r="5" fill="#f4ecdd" />
      <circle cx="21" cy="-18" r="2.4" fill="#1a0d08" />
    </g>
  );
}
function JamunTree({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 8} y={y - 110} width="16" height="110" fill="#5a3a22" />
      <circle cx={x} cy={y - 140} r="60" fill="#2f6b45" />
      <circle cx={x - 44} cy={y - 116} r="36" fill="#3f7d55" />
      <circle cx={x + 44} cy={y - 120} r="36" fill="#3f7d55" />
      {[[-20, -150], [14, -130], [30, -160], [-40, -120], [48, -110]].map(([dx, dy]) => <circle key={`${dx}${dy}`} cx={x + dx} cy={y + dy} r="5" fill="#4a2a5a" />)}
    </g>
  );
}

const River = () => (
  <g>
    <rect y="170" width="400" height="70" fill="#3a6a8a" />
    {[190, 212, 230].map((y) => <path key={y} d={`M0 ${y} q50 -6 100 0 t100 0 t100 0 t100 0`} stroke="#8fbfd8" strokeWidth="2" fill="none" opacity="0.5" />)}
  </g>
);

const story = [
  {
    art: (
      <Panel id="hi1" sky={["#f0cf7a", "#e8a86a"]} ground="#6b8a3a">
        <River />
        <JamunTree x={110} y={176} />
        <Monkey x={140} y={70} s={0.9} />
        <Croc x={290} y={200} s={0.75} />
      </Panel>
    ),
    text: "A {{बंदर}} (bandar, monkey) lived in a jamun tree by the river. Every day he shared its sweet fruit with his friend, a {{मगरमच्छ}} (magarmachh, crocodile).",
  },
  {
    art: (
      <Panel id="hi2" sky={["#e2a07f", "#8a6a8a"]} ground={null}>
        <River />
        <rect y="130" width="400" height="44" fill="#6b8a3a" />
        <Croc x={150} y={210} s={0.7} />
        <g transform="translate(290 0) scale(-1 1)"><Croc x={0} y={214} s={0.6} /></g>
        <path d="M200 110 q10 -20 30 -10 q20 -10 30 10 q0 20 -30 36 q-30 -16 -30 -36Z" fill="#e0508a" opacity="0.85" />
      </Panel>
    ),
    text: "The crocodile's wife had an idea. “If the fruit is that sweet, imagine how sweet the monkey's heart must be!”",
  },
  {
    art: (
      <Panel id="hi3" sky={["#9fc0d8", "#f0d7a8"]} ground={null}>
        <rect y="150" width="400" height="90" fill="#3a6a8a" />
        {[170, 196, 222].map((y) => <path key={y} d={`M0 ${y} q50 -6 100 0 t100 0 t100 0 t100 0`} stroke="#8fbfd8" strokeWidth="2" fill="none" opacity="0.5" />)}
        <Croc x={200} y={180} s={0.9} />
        <Monkey x={190} y={158} s={0.8} />
      </Panel>
    ),
    text: "So the crocodile invited the monkey home — and halfway across the river, he told him why.",
  },
  {
    art: (
      <Panel id="hi4" sky={["#f0cf7a", "#e2a07f"]} ground="#6b8a3a">
        <River />
        <JamunTree x={200} y={176} />
        <Monkey x={236} y={64} s={0.9} />
        <Croc x={110} y={206} s={0.6} />
      </Panel>
    ),
    text: "“Oh!” said the monkey. “I left my heart up in the tree. Take me back and I'll fetch it.” Once he was home, he stayed there. {{होशियारी}} (hoshiyaari) — cleverness.",
  },
];

/* ---------------- the journey ---------------- */

export const hindi: Journey = {
  id: "hindi",
  language: "Hindi",
  native: "हिन्दी",
  family: "A Hindi-speaking family from Lucknow",
  variety: "Hindi · Devanagari script",
  script: "hi",
  romanize: true,
  speech: "hi",
  chapterName: "Dadi's Here",
  chapterNative: "दादी आईं",
  subtitle: "The first day of summer",
  synopsis:
    "Dadi has flown in from Lucknow for the whole summer. Greet her the way she was greeted as a girl, make her chai the way she likes it, find the glasses she's lost again — and settle in for her story about a monkey, a crocodile and a very sweet heart.",
  homeLines: {
    start: "Dadi's just arrived from Lucknow. She's waiting in the living room.",
    going: "Dadi's still waiting — for chai, for her glasses, for a story.",
    done: "Dadi's story is told, and she's promised another tomorrow. The Bazaar is being built.",
  },
  words,
  startRoom: "baithak",
  rooms: {
    kamra: {
      id: "kamra",
      name: "Dadi's room",
      native: "दादी का कमरा",
      art: (done) => <KamraArt done={done} />,
      spawn: { left: 240, right: 1320 },
      hotspots: [
        { id: "bed", x: 420, y: 640, label: "Bedspread", kind: "flavor", note: "Printed by hand with carved wooden blocks, in Jaipur. Dadi brought it so this room would feel like hers.", culture: "blockprint" },
        { id: "photos", x: 600, y: 330, label: "Family photos", kind: "word", wordId: "parivaar" },
        { id: "book", x: 668, y: 600, label: "Storybook", kind: "word", wordId: "kahaani" },
        { id: "radio", x: 870, y: 540, label: "Radio", kind: "flavor", note: "Dadi's radio. Old film songs only — and Lata Mangeshkar, she says, is the only singer." },
        { id: "dadi", x: 1010, y: 560, label: "Dadi", kind: "npc", after: "chai" },
        { id: "mirror", x: 1190, y: 470, label: "Mirror", kind: "quest" },
        { id: "diya", x: 1345, y: 480, label: "Diya", kind: "flavor", note: "A little brass diya. Dadi lights it every evening, wherever in the world she is.", culture: "diya" },
        { id: "baithak", x: 1510, y: 560, label: "Living room", kind: "exit", to: "baithak" },
      ],
    },
    baithak: {
      id: "baithak",
      name: "Living room",
      native: "बैठक",
      art: (done) => <BaithakArt done={done} />,
      spawn: { left: 230, right: 1320 },
      hotspots: [
        { id: "kamra", x: 130, y: 560, label: "Dadi's room", kind: "exit", to: "kamra" },
        { id: "window", x: 380, y: 430, label: "Window", kind: "word", wordId: "ghar" },
        { id: "suitcase", x: 365, y: 640, label: "Suitcase", kind: "flavor", note: "Dadi's suitcase from Lucknow. Heavier than it looks — at least half of it is mithai.", culture: "mithai" },
        { id: "photo", x: 680, y: 320, label: "Dada's photo", kind: "word", wordId: "dada" },
        { id: "dadi", x: 990, y: 560, label: "Dadi", kind: "npc", before: "chai" },
        { id: "tv", x: 1300, y: 460, label: "Papa's cricket", kind: "word", wordId: "papa" },
        { id: "rasoi", x: 1510, y: 560, label: "Kitchen", kind: "exit", to: "rasoi" },
      ],
    },
    rasoi: {
      id: "rasoi",
      name: "Kitchen",
      native: "रसोई",
      art: <RasoiArt />,
      spawn: { left: 240, right: 1100 },
      hotspots: [
        { id: "back", x: 130, y: 560, label: "Living room", kind: "exit", to: "baithak" },
        { id: "tap", x: 450, y: 470, label: "Tap", kind: "word", wordId: "paani" },
        { id: "dabba", x: 700, y: 480, label: "Spice tin", kind: "flavor", note: "The masala dabba — seven spices in one round steel tin. Maa can find any of them with her eyes shut.", culture: "dabba" },
        { id: "fridge", x: 925, y: 440, label: "Fridge", kind: "word", wordId: "doodh" },
        { id: "cooker", x: 1180, y: 470, label: "Pressure cooker", kind: "flavor", note: "It whistles three times for dal. Everyone in the house counts along." },
        { id: "maa", x: 1460, y: 560, label: "Maa", kind: "npc" },
      ],
    },
  },
  speakers: {
    dadi: { name: "Dadi", glyph: "दा", tone: "elder" },
    maa: { name: "Maa", glyph: "माँ", tone: "parent" },
    guide: { name: "Your journal", glyph: "✦", tone: "guide" },
    you: { name: "{name}", glyph: "", tone: "you" },
  },
  chapter: {
    intro: {
      kicker: "पहला अध्याय · Hindi",
      title: "Dadi's",
      em: "Here",
      text: "The first Saturday of summer. Dadi has flown in from Lucknow — twenty hours of travel, and the first thing she'll ask for is chai.",
    },
    introLines: [
      { who: "dadi", text: "{{बेटा, इधर आओ!}}", gloss: "beta, idhar aao — come here, dear! Dadi, from the living room." },
      { who: "guide", text: "Dadi's here — for the whole summer.", gloss: "Hindi is about to get a lot louder in this house." },
      { who: "maa", text: "Say hello to Dadi properly, then help me make her {{चाय}}.", gloss: "chai — tea." },
      { who: "guide", text: "Quest: welcome Dadi home.", gloss: "Walk with ← → or A D. Press E near anything that glows. Or just click it." },
    ],
    beats: [
      {
        id: "greet",
        quest: { v: "Greet Dadi", hint: "She's in the living room, by the sofa." },
        at: { room: "baithak", hotspot: "dadi" },
        encounter: ["dadi"],
        lines: [
          { who: "guide", text: "In many families, you greet an elder by bending to touch their feet.", gloss: "Dadi rests her hand on your head." },
          { who: "dadi", text: "{{जीते रहो, बेटा।}}", gloss: "jeete raho — live long, dear. A blessing." },
          { who: "dadi", text: "Look how tall! Now — where's my {{चाय}}?", gloss: "chai. Maa's in the kitchen, on the right." },
        ],
        culture: ["pranam"],
        nudges: { "rasoi:maa": [{ who: "maa", text: "Say hello to Dadi first!", gloss: "She's in the living room." }] },
      },
      {
        id: "chai",
        quest: { v: "Make chai for Dadi", hint: "Maa is in the kitchen." },
        at: { room: "rasoi", hotspot: "maa" },
        encounter: ["chai", "maa"],
        lines: [{ who: "maa", text: "Dadi likes it strong, with {{अदरक}}. I'll tell you what goes in, in order.", gloss: "adrak — ginger." }],
        game: {
          type: "fetch",
          npc: "maa",
          kicker: "Mini-game · चाय",
          title: "Make chai the way Dadi likes it.",
          hint: "Maa says what goes in next. Nothing is labelled — listen for the word.",
          asks: [
            { wordId: "paani", native: "पहले पानी डालो।", roman: "pehle paani daalo.", english: "First, put in the water." },
            { wordId: "adrak", native: "अब अदरक।", roman: "ab adrak.", english: "Now the ginger." },
            { wordId: "doodh", native: "दूध डालो।", roman: "doodh daalo.", english: "Put in the milk." },
            { wordId: "cheeni", native: "और थोड़ी चीनी।", roman: "aur thodi cheeni.", english: "And a little sugar." },
          ],
          items: [
            { wordId: "paani", label: "Jug", art: Icon.jug },
            { wordId: "adrak", label: "Root", art: gingerIcon },
            { wordId: "doodh", label: "Carton", art: Icon.milk },
            { wordId: "cheeni", label: "Jar", art: Icon.sugar },
          ],
          done: { native: "वाह!", roman: "waah!", english: "wonderful!" },
        },
        after: [
          { who: "maa", text: "{{वाह!}} Just how she likes it. Take it to her.", gloss: "waah — wonderful!" },
          { who: "guide", text: "Dadi's gone to lie down in her room.", gloss: "Through the living room, on the left." },
        ],
        culture: ["chai"],
        memory: "chai",
        nudges: { "baithak:dadi": [{ who: "dadi", text: "{{चाय}}, beta? Maa is in the kitchen.", gloss: "chai" }] },
      },
      {
        id: "ask",
        quest: { v: "Take Dadi her chai", hint: "She's resting in her room." },
        at: { room: "kamra", hotspot: "dadi" },
        lines: [
          { who: "dadi", text: "{{शुक्रिया, बेटा।}} Mm — perfect.", gloss: "shukriya — thank you." },
          { who: "dadi", text: "But I can't read my letters. Where's my {{चश्मा}}?", gloss: "chashma — glasses." },
          { who: "guide", text: "Quest: find Dadi's glasses.", gloss: "Somewhere in this room." },
        ],
      },
      {
        id: "glasses",
        quest: { v: "Find Dadi's glasses", hint: "Somewhere in her room. Look carefully." },
        at: { room: "kamra", hotspot: "mirror" },
        encounter: ["chashma"],
        lines: [
          { who: "guide", text: "In the mirror you see Dadi — with her {{चश्मा}} on top of her head.", gloss: "They were there the whole time." },
          { who: "dadi", text: "{{अरे!}} Every single time!", gloss: "arre — oh!" },
        ],
        memory: "glasses",
        nudges: { "kamra:dadi": [{ who: "dadi", text: "{{मेरा चश्मा कहाँ है?}}", gloss: "mera chashma kahaan hai? — where are my glasses?" }] },
      },
      {
        id: "quiz",
        quest: { v: "Sit with Dadi", hint: "She wants to see how much Hindi you know." },
        at: { room: "kamra", hotspot: "dadi" },
        lines: [{ who: "dadi", text: "Now. Let's see how much Hindi you have. Dadi's test!", gloss: "She's been waiting all year to do this." }],
        game: { type: "memory", kicker: "Mini-game · Dadi's test", title: "Match the word to what it means.", hint: "Turn two cards. A Hindi word and its meaning belong together. Matches in a row build a combo." },
        after: [{ who: "dadi", text: "{{शाबाश!}} Now, sit. I have a story.", gloss: "shaabaash — well done!" }],
      },
      {
        id: "story",
        quest: { v: "Listen to Dadi", hint: "She has a story for you." },
        at: { room: "kamra", hotspot: "dadi" },
        encounter: ["kahaani"],
        lines: [{ who: "dadi", text: "{{एक कहानी सुनोगे?}}", gloss: "ek kahaani sunoge? — want to hear a story?" }],
        game: {
          type: "story",
          kicker: "A story from Dadi",
          title: "The Monkey and the Crocodile",
          native: "बंदर और मगरमच्छ",
          teller: "dadi",
          panels: story,
          question: {
            native: "बंदर कहाँ रहता था?",
            roman: "bandar kahaan rehta tha?",
            english: "Where did the monkey live?",
            choices: [
              { native: "पेड़ पर", roman: "ped par", english: "in the tree", right: true },
              { native: "नदी में", roman: "nadi mein", english: "in the river", reply: [{ who: "dadi", text: "No, no — that's the crocodile, beta!" }] },
              { native: "घर में", roman: "ghar mein", english: "in a house", reply: [{ who: "dadi", text: "A house? He's a monkey!" }] },
            ],
          },
        },
        culture: ["panchatantra"],
        memory: "story",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Dadi", hint: "She wants to know what you thought." },
      lines: [{ who: "guide", text: "Dadi takes her glasses off and looks at you over the top of them." }],
      asker: "dadi",
      question: {
        native: "कहानी कैसी लगी?",
        roman: "kahaani kaisi lagi?",
        english: "How did you like the story?",
        choices: [
          { native: "बहुत अच्छी, दादी!", roman: "bahut achchhi, Dadi!", english: "Really good, Dadi!", right: true },
          { native: "बहुत लंबी!", roman: "bahut lambi!", english: "Very long!", reply: [{ who: "dadi", text: "{{अच्छा?}} Then tomorrow, a shorter one. But did you like it?", gloss: "achchha — oh really?" }] },
          { native: "पानी", roman: "paani", english: "water", reply: [{ who: "dadi", text: "{{पानी?}} The story, beta — the story!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{बहुत अच्छी, दादी!}}", gloss: "“Really good, Dadi!”" },
        { who: "dadi", text: "{{कल एक और।}}", gloss: "kal ek aur — another one tomorrow." },
        { who: "guide", text: "…You answered her in Hindi. She noticed." },
      ],
      memory: "answered",
    },
    idle: {
      "kamra:mirror": [{ who: "guide", text: "Just you in the mirror now. And Dadi, glasses on." }],
      "rasoi:maa": [{ who: "maa", text: "Go on, sit with Dadi. She's missed you all year." }],
    },
    afterwards: {
      "kamra:dadi": [{ who: "dadi", text: "Tomorrow, we go to the shop — and you'll ask for the samosas. In Hindi!" }],
      "rasoi:maa": [{ who: "maa", text: "She told me you answered her in Hindi. She's been on the phone to Lucknow about it." }],
    },
    complete: {
      title: "Dadi's",
      em: "Here",
      text: "You greeted Dadi, made her chai, found her glasses, and told her what you thought of her story — in Hindi.",
      next: "दूसरा अध्याय — The Bazaar — is being built.",
      quest: { v: "Stay with Dadi a while", hint: "Or head back to ROOTS Home." },
    },
  },
  cultureNotes: {
    pranam: { title: "Touching an elder's feet", native: "पैर छूना", note: "A greeting of respect in many North Indian families. The elder answers with a blessing — जीते रहो, live long." },
    mithai: { title: "Mithai from Lucknow", native: "मिठाई", note: "Sweets carried across an ocean in a suitcase. Every visiting grandparent's first priority." },
    chai: { title: "Masala chai", native: "चाय", note: "Boiled, not steeped: water, ginger, tea, milk, sugar. Every family does it slightly differently, and every family is right." },
    dabba: { title: "Masala dabba", native: "मसालेदानी", note: "A round steel tin with seven small cups of spice inside." },
    blockprint: { title: "Block-print bedspread", note: "Printed by hand with carved wooden blocks in Jaipur." },
    diya: { title: "The diya", native: "दिया", note: "A small brass lamp Dadi lights every evening, wherever she is." },
    panchatantra: { title: "The Panchatantra", native: "पंचतंत्र", note: "A collection of animal fables around two thousand years old. The monkey and the crocodile is one of the best known." },
  },
  memoryNotes: {
    chai: { title: "Made chai for Dadi", note: "Water, ginger, milk, sugar — added in Hindi, in the right order." },
    glasses: { title: "Found Dadi's glasses", note: "On top of her head. Every single time." },
    story: { title: "The monkey and the crocodile", note: "Dadi's story — a clever monkey and a very hungry river." },
    answered: { title: "“बहुत अच्छी, दादी!”", note: "Dadi asked how you liked her story. You told her — in Hindi." },
  },
  chapters: [
    { n: "01", name: "Dadi's Here", native: "दादी आईं", subtitle: "The first day of summer", body: "Greet Dadi, make her chai, find her glasses and hear her story.", available: true },
    { n: "02", name: "The Bazaar", native: "बाज़ार", subtitle: "Chaat and bargaining", body: "Follow Dadi through a Lucknow market — count rupees, taste chaat, and learn how to say “too expensive”.", available: false },
    { n: "03", name: "The Kitchen", native: "रसोई", subtitle: "Round rotis, eventually", body: "Roll rotis with Dadi until one of them is actually round.", available: false },
    { n: "04", name: "Holi", native: "होली", subtitle: "The festival of colours", body: "Gulal, water balloons and gujiya — and why nobody minds going home a little pink.", available: false },
    { n: "05", name: "Stories", native: "कहानियाँ", subtitle: "Akbar and Birbal", body: "More Panchatantra, and the clever minister Birbal outwitting everyone at court.", available: false },
    { n: "06", name: "Family", native: "परिवार", subtitle: "The call home", body: "A video call to Lucknow. Chachi, cousins, and one very loud uncle.", available: false },
  ],
  highlight: { native: "कहानी कैसी लगी?", roman: "kahaani kaisi lagi?", english: "How did you like the story?", context: "Dadi asks after her story. You answer without looking anything up." },
  preview: <BaithakArt done={new Set()} />,
};

