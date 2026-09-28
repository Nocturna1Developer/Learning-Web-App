import type { ChapterContent } from "../types";
import { Defs, Walls, Door, PhotoFrame, FLOOR_Y, WOOD, FRAME } from "../../game/rooms";
import { Figure, Child, House, Pot } from "../../components/scenes/primitives";
import { Icon, Panel } from "../kit";
import { Rakweh, Tatreez } from "./art";

/* =====================================================================
   ARABIC · Levantine, as spoken at home · A Levantine family
   Chapter One — أهلا وسهلا, Ahlan wa Sahlan. Sunday lunch at Teta's.
   One Arabic-speaking world among many: Egyptian, Gulf, Maghrebi and
   others would each be their own journey, not a reskin of this one.
   ===================================================================== */

/* ---------------- art ---------------- */

function Mezze({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {/* flat bread */}
      <ellipse cx={x} cy={y} rx="44" ry="10" fill="#e0b878" />
      <ellipse cx={x + 6} cy={y - 5} rx="40" ry="9" fill="#ecc88c" />
      {/* olives */}
      <ellipse cx={x + 100} cy={y + 2} rx="26" ry="8" fill="#f4ecdd" />
      {[-12, 0, 12, -6, 6].map((dx, i) => <ellipse key={i} cx={x + 100 + dx} cy={y - 2 - (i > 2 ? 5 : 0)} rx="5" ry="4" fill={i % 2 ? "#3a4a2a" : "#6b7a3a"} />)}
      {/* hummus with oil */}
      <ellipse cx={x + 180} cy={y + 2} rx="30" ry="9" fill="#f4ecdd" />
      <ellipse cx={x + 180} cy={y - 2} rx="22" ry="6" fill="#e8d4a8" />
      <ellipse cx={x + 180} cy={y - 3} rx="8" ry="2.5" fill="#c9a33a" />
      {/* warak enab platter */}
      <ellipse cx={x + 280} cy={y + 2} rx="52" ry="12" fill="#f4ecdd" stroke="#2d6ab8" strokeWidth="2" />
      {Array.from({ length: 7 }, (_, i) => <rect key={i} x={x + 244 + i * 10} y={y - 8} width="9" height="14" rx="4" fill="#5a6a2a" />)}
      <circle cx={x + 316} cy={y - 4} r="6" fill="#f0cf3a" />
    </g>
  );
}

function SalonArt({ done }: { done: ReadonlySet<string> }) {
  const set = done.has("table");
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="room-art" aria-hidden="true">
      <Defs />
      <Walls tint="#f0e4d0" shade="#dccdb2" />
      <Door x={40} open />
      {/* photos: the family, Mama as a girl, Teta's old house */}
      <PhotoFrame x={250} y={250} w={110} h={120} tint="#3f7d55" two />
      <PhotoFrame x={380} y={280} w={70} h={86} tint="#c8704a" />
      <rect x={474} y={264} width="170" height="110" fill={FRAME} />
      <rect x={480} y={270} width="158" height="98" fill="#dfe6c8" />
      <path d="M480 340 q40 -20 80 -4 t78 -6 V368 H480Z" fill="#8aa05a" />
      <rect x={520} y={318} width="40" height="30" fill="#e6d8c0" />
      <path d="M514 318 l26 -16 l26 16Z" fill="#b8452f" />
      {[590, 612].map((cx) => <circle key={cx} cx={cx} cy={330} r="12" fill="#6b8a4a" />)}
      {/* sofa with tatreez cushions */}
      <rect x={300} y={FLOOR_Y - 130} width="400" height="130" rx="10" fill="#6b3a2a" />
      <rect x={300} y={FLOOR_Y - 190} width="400" height="72" rx="12" fill="#7a4432" />
      <Tatreez x={330} y={FLOOR_Y - 186} w={72} h={56} />
      <Tatreez x={600} y={FLOOR_Y - 186} w={72} h={56} c="#2d6ab8" />
      {/* Jiddo's armchair */}
      <rect x={730} y={FLOOR_Y - 160} width="130" height="160" rx="16" fill="#2d4a78" />
      <rect x={720} y={FLOOR_Y - 90} width="150" height="40" rx="10" fill="#243d63" />
      <Figure x={795} y={FLOOR_Y - 18} h={170} color="#2a1a12" pose="sit" />
      {/* coffee table with the rakweh and small cups */}
      <rect x={890} y={FLOOR_Y - 80} width="150" height="12" fill={WOOD} />
      <rect x={900} y={FLOOR_Y - 68} width="10" height="68" fill={WOOD} />
      <rect x={1020} y={FLOOR_Y - 68} width="10" height="68" fill={WOOD} />
      <ellipse cx={965} cy={FLOOR_Y - 84} rx="56" ry="8" fill="#c99a3e" />
      <Rakweh x={944} y={FLOOR_Y - 88} s={0.9} />
      {[986, 1006].map((cx) => <path key={cx} d={`M${cx - 7} ${FLOOR_Y - 102} h14 l-2 14 h-10Z`} fill="#f4ecdd" />)}
      {/* a painted plate on the wall */}
      <circle cx={1200} cy={300} r="56" fill="#f4ecdd" stroke="#2d6ab8" strokeWidth="6" />
      <circle cx={1200} cy={300} r="30" fill="none" stroke="#3f7d55" strokeWidth="5" />
      <circle cx={1200} cy={300} r="10" fill="#b8252f" />
      {/* dining table */}
      <rect x={1060} y={FLOOR_Y - 150} width="300" height="16" fill="#f7f1e6" />
      <path d={`M1060 ${FLOOR_Y - 134} h300 v40 q-150 14 -300 0Z`} fill="#fbf7ef" />
      <rect x={1080} y={FLOOR_Y - 94} width="12" height="94" fill={WOOD} />
      <rect x={1328} y={FLOOR_Y - 94} width="12" height="94" fill={WOOD} />
      {set && <Mezze x={1100} y={FLOOR_Y - 158} />}
      {/* glass door to the balcony */}
      <rect x={1432} y={FLOOR_Y - 340} width="166" height="340" fill={FRAME} />
      <rect x={1440} y={FLOOR_Y - 332} width="150" height="332" fill="#bfdcea" />
      <line x1={1515} y1={FLOOR_Y - 332} x2={1515} y2={FLOOR_Y} stroke={FRAME} strokeWidth="6" />
      <circle cx={1480} cy={FLOOR_Y - 200} r="30" fill="#3f7d55" opacity="0.6" />
      {/* rug */}
      <rect x={300} y={FLOOR_Y + 30} width="760" height="64" rx="4" fill="#8e2a2a" />
      {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${340 + i * 58} ${FLOOR_Y + 62} l14 -16 l14 16 l-14 16Z`} fill="#e8c25a" opacity="0.8" />)}
    </svg>
  );
}

function MatbakhArt() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="room-art" aria-hidden="true">
      <Defs />
      <Walls tint="#f3e8d4" floor="#b9a98c" floorLine="#9a8a6c" shade="#e0d2b6" />
      <rect x={0} y={330} width="1600" height="200" fill="#f8f4ea" />
      {Array.from({ length: 32 }, (_, c) => Array.from({ length: 4 }, (_, r) => (
        <path key={`${c}${r}`} d={`M${c * 50 + 25} ${330 + r * 50 + 10} l15 15 l-15 15 l-15 -15Z`} fill="none" stroke="#2d6ab8" strokeWidth="1.5" opacity="0.4" />
      )))}
      {/* open shelf with a jar of za'atar and a string of dried okra */}
      <rect x={560} y={290} width="200" height="10" fill={WOOD} />
      <rect x={612} y={246} width="50" height="44" rx="6" fill="#6b7a3a" />
      <rect x={608} y={238} width="58" height="12" rx="3" fill="#3a2718" />
      <rect x={690} y={256} width="40" height="34" rx="5" fill="#b8452f" />
      {/* counter */}
      <rect x={0} y={FLOOR_Y - 230} width="1400" height="22" fill="#cfc4ad" />
      <rect x={0} y={FLOOR_Y - 208} width="1400" height="208" fill="#e6dcc8" />
      {Array.from({ length: 6 }, (_, i) => <rect key={i} x={12 + i * 230} y={FLOOR_Y - 196} width="214" height="186" fill="#dccfb4" stroke="#cfc4ad" strokeWidth="2" />)}
      {/* bread in a bag */}
      <path d={`M340 ${FLOOR_Y - 232} q-6 -60 10 -70 h96 q16 10 10 70Z`} fill="#dfe8ee" opacity="0.85" />
      {[0, 1, 2].map((i) => <ellipse key={i} cx={398} cy={FLOOR_Y - 250 - i * 14} rx="44" ry="9" fill="#e0b878" />)}
      {/* olives */}
      <rect x={540} y={FLOOR_Y - 300} width="64" height="70" rx="10" fill="#bfdcea" opacity="0.8" />
      {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx={554 + (i % 3) * 18} cy={FLOOR_Y - 250 - Math.floor(i / 3) * 14} rx="7" ry="6" fill={i % 2 ? "#3a4a2a" : "#6b7a3a"} />)}
      <rect x={536} y={FLOOR_Y - 312} width="72" height="14" rx="4" fill="#3a2718" />
      {/* water jug */}
      <rect x={706} y={FLOOR_Y - 330} width="70" height="100" rx="8" fill="#8fbfd8" opacity="0.85" />
      <path d={`M776 ${FLOOR_Y - 316} q28 6 0 40`} fill="none" stroke="#8fbfd8" strokeWidth="8" />
      {/* sugar tin */}
      <rect x={870} y={FLOOR_Y - 296} width="62" height="66" rx="6" fill="#c9cfd4" />
      <rect x={866} y={FLOOR_Y - 306} width="70" height="14" rx="4" fill="#9aa3aa" />
      {/* olive oil tin */}
      <rect x={1004} y={FLOOR_Y - 330} width="70" height="100" fill="#d9b83a" />
      <rect x={1004} y={FLOOR_Y - 300} width="70" height="40" fill="#3f7d55" />
      <rect x={1030} y={FLOOR_Y - 346} width="18" height="16" fill="#9aa3aa" />
      {/* stove: the warak enab pot */}
      <rect x={1120} y={FLOOR_Y - 246} width="260" height="16" fill="#3a3a40" />
      <Pot x={1190} y={FLOOR_Y - 246} w={120} color="#9aa3aa" rim="#6f767c" />
      <path d="M1180 520 C1168 500 1196 486 1184 460" stroke="#f4ecdd" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.4" className="steam" />
      <Figure x={1300} y={FLOOR_Y} h={220} color="#2a1a12" pose="stand" />
      <Door x={1420} open />
    </svg>
  );
}

function Jasmine({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} ${y} q-20 -120 10 -240 q30 -80 -10 -160`} stroke="#3f6a3a" strokeWidth="8" fill="none" />
      {Array.from({ length: 26 }, (_, i) => {
        const t = i / 25;
        const cx = x + Math.sin(t * 9) * 44;
        const cy = y - t * 400;
        return (
          <g key={i}>
            <ellipse cx={cx - 10} cy={cy} rx="16" ry="8" fill="#3f7d55" transform={`rotate(${i * 40} ${cx} ${cy})`} />
            {i % 2 === 0 && (
              <g transform={`translate(${cx + 8} ${cy - 6})`}>
                {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} rx="3" ry="7" fill="#fff" transform={`rotate(${a}) translate(0 -5)`} />)}
                <circle r="2" fill="#f0cf7a" />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}

function BalconArt() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className="room-art" aria-hidden="true">
      <Defs />
      <defs>
        <linearGradient id="noon-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8fbcdc" />
          <stop offset="100%" stopColor="#f2e2c0" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#noon-sky)" />
      {/* the street beyond */}
      <House x={420} y={520} w={220} h={100} wall="#e6d8c0" roof="#8a5c3a" />
      <House x={760} y={520} w={200} h={90} wall="#dccfb4" roof="#6b4429" />
      <House x={1080} y={520} w={240} h={100} wall="#e8dcc6" roof="#8a5c3a" />
      {[300, 700, 1020, 1400].map((x) => <circle key={x} cx={x} cy={470} r="70" fill="#6b8a4a" opacity="0.8" />)}
      {/* balcony floor and railing */}
      <rect x={0} y={FLOOR_Y} width="1600" height="140" fill="#c9b89a" />
      {Array.from({ length: 16 }, (_, i) => <line key={i} x1={i * 100} y1={FLOOR_Y} x2={i * 100 - 40} y2="900" stroke="#b0a080" strokeWidth="2" />)}
      <rect x={0} y={560} width="1600" height="10" fill="#2a2a2e" />
      {Array.from({ length: 40 }, (_, i) => <rect key={i} x={i * 40 + 16} y={570} width="6" height={FLOOR_Y - 570} fill="#2a2a2e" />)}
      {/* glass door back inside */}
      <rect x={32} y={FLOOR_Y - 340} width="166" height="340" fill={FRAME} />
      <rect x={40} y={FLOOR_Y - 332} width="150" height="332" fill="#f0e4d0" opacity="0.9" />
      <line x1={115} y1={FLOOR_Y - 332} x2={115} y2={FLOOR_Y} stroke={FRAME} strokeWidth="6" />
      {/* jasmine climbing a trellis */}
      <rect x={300} y={FLOOR_Y - 60} width="120" height="60" fill="#9a4a2a" />
      <Jasmine x={360} y={FLOOR_Y - 60} />
      {/* lemon tree */}
      <path d={`M700 ${FLOOR_Y} l-14 -90 h130 l-14 90Z`} fill="#b8642f" />
      <rect x={754} y={FLOOR_Y - 240} width="16" height="150" fill="#5a3a22" />
      <circle cx={762} cy={FLOOR_Y - 300} r="110" fill="#2f6b45" />
      <circle cx={710} cy={FLOOR_Y - 270} r="66" fill="#3f7d55" />
      {[[720, 430], [790, 400], [820, 480], [690, 500], [760, 520], [840, 420]].map(([cx, cy]) => <ellipse key={`${cx}${cy}`} cx={cx} cy={cy} rx="13" ry="10" fill="#f0cf3a" />)}
      {/* mint */}
      <path d={`M960 ${FLOOR_Y} l-8 -56 h80 l-8 56Z`} fill="#8a4a2e" />
      {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx={966 + (i % 3) * 22} cy={FLOOR_Y - 70 - Math.floor(i / 3) * 18} rx="13" ry="9" fill="#5aa05a" />)}
      {/* Baba's chair with the newspaper */}
      <rect x={1160} y={FLOOR_Y - 150} width="120" height="10" fill={WOOD} />
      <rect x={1164} y={FLOOR_Y - 140} width="8" height="140" fill={WOOD} />
      <rect x={1268} y={FLOOR_Y - 140} width="8" height="140" fill={WOOD} />
      <rect x={1264} y={FLOOR_Y - 260} width="12" height="120" fill={WOOD} />
      <path d={`M1180 ${FLOOR_Y - 160} l70 -6 l6 -30 l-70 6Z`} fill="#f4ecdd" />
      <path d="M1192 578 h44 M1192 586 h36" stroke="#8a8272" strokeWidth="2" />
      {/* a little table with glasses of tea */}
      <circle cx={1420} cy={FLOOR_Y - 100} r="50" fill="#2a2a2e" opacity="0.9" />
      <rect x={1414} y={FLOOR_Y - 96} width="12" height="96" fill="#2a2a2e" />
      {[1400, 1436].map((x) => <path key={x} d={`M${x - 8} ${FLOOR_Y - 130} h16 l-2 24 h-12Z`} fill="#b8452f" opacity="0.85" />)}
    </svg>
  );
}

/* ---------------- icons ---------------- */

const breadBag = (
  <svg viewBox="0 0 80 90" aria-hidden="true">
    <path d="M10 84q-6-50 8-60h44q14 10 8 60Z" fill="#dfe8ee" opacity="0.9" />
    {[0, 1, 2].map((i) => <ellipse key={i} cx="40" cy={66 - i * 12} rx="26" ry="7" fill="#e0b878" />)}
  </svg>
);
const oliveJar = (
  <svg viewBox="0 0 80 90" aria-hidden="true">
    <rect x="16" y="24" width="48" height="60" rx="10" fill="#bfdcea" opacity="0.85" />
    <rect x="12" y="14" width="56" height="14" rx="4" fill="#3a2718" />
    {Array.from({ length: 9 }, (_, i) => <ellipse key={i} cx={26 + (i % 3) * 14} cy={72 - Math.floor(i / 3) * 14} rx="6" ry="5" fill={i % 2 ? "#3a4a2a" : "#6b7a3a"} />)}
  </svg>
);
const hummusIcon = (
  <svg viewBox="0 0 80 90" aria-hidden="true">
    <ellipse cx="40" cy="60" rx="32" ry="12" fill="#f4ecdd" stroke="#2d6ab8" strokeWidth="2" />
    <ellipse cx="40" cy="56" rx="24" ry="8" fill="#e8d4a8" />
    <ellipse cx="40" cy="55" rx="9" ry="3" fill="#c9a33a" />
    <circle cx="34" cy="54" r="2" fill="#b8452f" />
  </svg>
);
const sugarTin = (
  <svg viewBox="0 0 80 90" aria-hidden="true">
    <rect x="18" y="30" width="44" height="52" rx="6" fill="#c9cfd4" />
    <rect x="14" y="20" width="52" height="14" rx="4" fill="#9aa3aa" />
  </svg>
);

/* ---------------- story panels: جحا والحمار ---------------- */

function Donkey({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="-44" rx="40" ry="20" fill="#8a8580" />
      {[-26, -12, 14, 28].map((dx) => <rect key={dx} x={dx - 4} y="-30" width="8" height="30" fill="#7a7570" />)}
      <path d="M32 -54 l24 -20 l14 6 l-6 16 l-20 8Z" fill="#8a8580" />
      <path d="M52 -74 l-4 -22 l8 20 M60 -72 l2 -22 l4 22" stroke="#7a7570" strokeWidth="5" strokeLinecap="round" />
      <circle cx="60" cy="-66" r="2.5" fill="#1a0d08" />
      <path d="M-40 -48 q-12 10 -8 24" stroke="#6b6660" strokeWidth="4" fill="none" />
    </g>
  );
}
const Road = () => <path d="M0 210 Q200 196 400 210 V240 H0Z" fill="#b8a27a" />;

const story = [
  {
    art: (
      <Panel id="ar1" sky={["#f2e2c0", "#e8b878"]} ground="#c9a86a">
        <Road />
        <Donkey x={170} y={214} s={0.9} />
        <Figure x={176} y={170} h={56} color="#2a1a12" pose="sit" />
        <Child x={260} y={214} h={48} color="#2a1a12" pose="walk" />
      </Panel>
    ),
    text: "{{جحا}} (Juha) and his son set off for the market with their {{حمار}} (ḥmār, donkey). Juha rode; his son walked.",
  },
  {
    art: (
      <Panel id="ar2" sky={["#f2e2c0", "#e8b878"]} ground="#c9a86a">
        <Road />
        <Donkey x={190} y={214} s={0.9} />
        <Child x={196} y={176} h={40} color="#2a1a12" />
        <Figure x={280} y={214} h={62} color="#2a1a12" pose="walk" />
        {[50, 80].map((x) => <Figure key={x} x={x} y={214} h={54} color="#4a3a30" pose="reach" />)}
      </Panel>
    ),
    text: "People said: “Shame! The old man rides while the little boy walks!” So they swapped.",
  },
  {
    art: (
      <Panel id="ar3" sky={["#f2e2c0", "#e8b878"]} ground="#c9a86a">
        <Road />
        <Donkey x={200} y={214} s={0.9} />
        <Figure x={120} y={214} h={62} color="#2a1a12" pose="walk" />
        <Child x={300} y={214} h={48} color="#2a1a12" pose="walk" />
        {[40, 360].map((x) => <Figure key={x} x={x} y={214} h={54} color="#4a3a30" />)}
      </Panel>
    ),
    text: "People said: “Shame! The boy rides while his old father walks!” So they both walked — and people laughed: “Who walks beside a perfectly good donkey?”",
  },
  {
    art: (
      <Panel id="ar4" sky={["#f0b87a", "#b8625a"]} ground="#8a6a4a">
        <circle cx="330" cy="80" r="34" fill="#f7d08a" opacity="0.9" />
        <rect x={96} y={100} width="14" height="100" fill="#3a2a20" />
        <circle cx={103} cy={90} r="60" fill="#3a4a2a" />
        <Donkey x={220} y={206} s={0.8} />
        <Figure x={140} y={206} h={56} color="#2a1a12" pose="sit" />
        <Child x={170} y={206} h={40} color="#2a1a12" />
      </Panel>
    ),
    text: "Juha smiled. “{{رضا الناس غاية لا تُدرك}}.” (riḍā n-nās ghāya lā tudrak) — pleasing everyone is a goal no one reaches.",
  },
];

/* ---------------- the journey ---------------- */

/* ---------------- the chapter ---------------- */

const content: ChapterContent = {
  startRoom: "salon",
  rooms: {
    matbakh: {
      id: "matbakh",
      name: "Kitchen",
      native: "المطبخ",
      art: <MatbakhArt />,
      spawn: { left: 240, right: 1340 },
      hotspots: [
        { id: "khubz", x: 398, y: 470, label: "Bag", kind: "word", wordId: "khubz" },
        { id: "zaytoon", x: 572, y: 470, label: "Jar", kind: "word", wordId: "zaytoon" },
        { id: "zaatar", x: 637, y: 240, label: "Za'atar", kind: "flavor", note: "Wild thyme, sumac and sesame. With olive oil on warm bread, it's breakfast.", culture: "zaatar" },
        { id: "mayy", x: 742, y: 460, label: "Jug", kind: "word", wordId: "mayy" },
        { id: "sukkar", x: 900, y: 480, label: "Tin", kind: "word", wordId: "sukkar" },
        { id: "oil", x: 1040, y: 460, label: "Olive oil", kind: "flavor", note: "A tin of olive oil from the village. Teta won't cook with any other.", culture: "oil" },
        { id: "teta", x: 1300, y: 560, label: "Teta", kind: "npc" },
        { id: "salon", x: 1510, y: 560, label: "Salon", kind: "exit", to: "salon" },
      ],
    },
    salon: {
      id: "salon",
      name: "Salon",
      native: "الصالون",
      art: (done) => <SalonArt done={done} />,
      spawn: { left: 240, right: 1340 },
      hotspots: [
        { id: "matbakh", x: 130, y: 560, label: "Kitchen", kind: "exit", to: "matbakh" },
        { id: "photos", x: 305, y: 330, label: "Family photos", kind: "word", wordId: "ayle" },
        { id: "mama-photo", x: 415, y: 350, label: "Mama as a girl", kind: "word", wordId: "mama" },
        { id: "village", x: 560, y: 330, label: "Teta's old house", kind: "word", wordId: "bayt", culture: "village" },
        { id: "jiddo", x: 795, y: 560, label: "Jiddo", kind: "npc" },
        { id: "coffee", x: 955, y: 620, label: "Coffee pot", kind: "word", wordId: "ahwe", culture: "coffee" },
        { id: "table", x: 1210, y: 580, label: "Table", kind: "quest" },
        { id: "balcon", x: 1515, y: 560, label: "Balcony", kind: "exit", to: "balcon" },
      ],
    },
    balcon: {
      id: "balcon",
      name: "Balcony",
      native: "البلكون",
      art: <BalconArt />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "back", x: 120, y: 560, label: "Salon", kind: "exit", to: "salon" },
        { id: "jasmine", x: 380, y: 420, label: "Jasmine", kind: "word", wordId: "yasmeen" },
        { id: "lemons", x: 762, y: 470, label: "Lemon tree", kind: "quest" },
        { id: "mint", x: 990, y: 640, label: "Mint", kind: "flavor", note: "Fresh mint for the tea after lunch — and the tabbouleh, and the lemonade.", culture: "naana" },
        { id: "chair", x: 1220, y: 580, label: "Baba's chair", kind: "word", wordId: "baba" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "الفصل الأول · Arabic",
      title: "Ahlan wa",
      em: "Sahlan",
      text: "Sunday at Teta and Jiddo's. In an hour the whole family arrives for lunch — and Teta has been cooking since dawn.",
    },
    introLines: [
      { who: "teta", text: "{{يا قلبي!}} Come, come — everyone's coming for lunch!", gloss: "ya albi — my heart. What Teta calls everyone she loves." },
      { who: "guide", text: "Sunday lunch at Teta and Jiddo's. Your aunt, your uncle, four cousins.", gloss: "In an hour, this house will be very loud." },
      { who: "teta", text: "First I need {{ليمون}} from the balcony — for the warak enab.", gloss: "laymoon — lemons." },
      { who: "guide", text: "Quest: get everything ready for the guests.", gloss: "Walk with ← → or A D. Press E near anything that glows. Or just click it." },
    ],
    beats: [
      {
        id: "lemons",
        quest: { v: "Pick lemons for Teta", hint: "On the balcony, through the glass door." },
        at: { room: "balcon", hotspot: "lemons" },
        encounter: ["laymoon"],
        lines: [
          { who: "guide", text: "You pick three {{ليمون}}, heavy and warm from the sun.", gloss: "laymoon — lemons." },
          { who: "guide", text: "Teta's in the kitchen.", gloss: "Through the salon, on the far left." },
        ],
        nudges: {
          "matbakh:teta": [{ who: "teta", text: "{{أول شي الليمون!}}", gloss: "awwal shi il-laymoon — lemons first! On the balcony." }],
          "salon:table": [{ who: "guide", text: "The table comes later." }],
          "salon:jiddo": [{ who: "jiddo", text: "Teta asked you for something, no? The balcony." }],
        },
      },
      {
        id: "kitchen",
        quest: { v: "Help Teta in the kitchen", hint: "Through the salon, on the left." },
        at: { room: "matbakh", hotspot: "teta" },
        encounter: ["teta"],
        lines: [{ who: "teta", text: "{{يسلمو!}} Now help me. I'll ask, you find.", gloss: "yislamo — thank you. (Literally: may they — your hands — be safe.)" }],
        game: {
          type: "fetch",
          npc: "teta",
          kicker: "Mini-game · بالمطبخ",
          title: "Find what Teta asks for.",
          hint: "She's stirring with one hand and pointing with the other. Nothing is labelled — listen for the word.",
          asks: [
            { wordId: "khubz", native: "وين الخبز؟", roman: "wayn il-khubz?", english: "Where's the bread?" },
            { wordId: "zaytoon", native: "وين الزيتون؟", roman: "wayn iz-zaytoon?", english: "Where are the olives?" },
            { wordId: "mayy", native: "وين المي؟", roman: "wayn il-mayy?", english: "Where's the water?" },
            { wordId: "sukkar", native: "وين السكر؟", roman: "wayn is-sukkar?", english: "Where's the sugar?" },
          ],
          items: [
            { wordId: "khubz", label: "Bag", art: breadBag },
            { wordId: "zaytoon", label: "Jar", art: oliveJar },
            { wordId: "mayy", label: "Jug", art: Icon.jug },
            { wordId: "sukkar", label: "Tin", art: sugarTin },
          ],
          done: { native: "برافو!", roman: "bravo!", english: "well done!" },
        },
        after: [{ who: "teta", text: "{{برافو!}} Now — the table. Jiddo will tell you how it's done.", gloss: "bravo — well done." }],
        memory: "kitchen",
        nudges: {
          "salon:jiddo": [{ who: "jiddo", text: "Teta needs you in the kitchen." }],
          "salon:table": [{ who: "guide", text: "The table comes later. Teta first." }],
        },
      },
      {
        id: "table",
        quest: { v: "Set the table for the guests", hint: "The table in the salon." },
        at: { room: "salon", hotspot: "table" },
        lines: [{ who: "jiddo", text: "The guests eat first, and they eat well. That is the rule.", gloss: "In this house, a guest never sees an empty plate." }],
        game: {
          type: "place",
          board: "table",
          kicker: "Mini-game · السفرة",
          title: "Set the table.",
          hint: "Pick a dish, then the place with its name. The names are in Arabic — you've heard most of them already.",
          tray: "From the kitchen",
          done: "A table no guest could leave hungry.",
          items: [
            { wordId: "khubz", who: "Bread", hint: "Flat, warm, in a basket. For scooping everything.", art: breadBag, tint: "#ecd0a8" },
            { wordId: "zaytoon", who: "Olives", hint: "From the village — Jiddo swears by them.", art: oliveJar, tint: "#d6dcc0" },
            { wordId: "hummus", who: "Hummus", hint: "With a pool of olive oil in the middle.", art: hummusIcon, tint: "#f0e4c8" },
            { wordId: "laymoon", who: "Lemons", hint: "The ones you picked. For squeezing over everything.", art: Icon.lemon, tint: "#f4e8a0" },
          ],
        },
        after: [{ who: "jiddo", text: "{{صحتين!}}", gloss: "sahtein — “two healths”: enjoy your meal." }],
        culture: ["hospitality"],
        memory: "table",
        nudges: { "salon:jiddo": [{ who: "jiddo", text: "The table first. Then we talk." }] },
      },
      {
        id: "story",
        quest: { v: "Sit with Jiddo", hint: "While you wait for the guests." },
        at: { room: "salon", hotspot: "jiddo" },
        encounter: ["jiddo"],
        lines: [{ who: "jiddo", text: "While we wait — do you know {{جحا}}?", gloss: "Juha — the wise fool of a thousand stories." }],
        game: {
          type: "story",
          kicker: "A story from Jiddo",
          title: "Juha and his Donkey",
          native: "جحا وابنه والحمار",
          teller: "jiddo",
          panels: story,
          question: {
            native: "شو ركب جحا؟",
            roman: "shu rikib Juha?",
            english: "What did Juha ride?",
            choices: [
              { native: "الحمار", roman: "il-ḥmār", english: "the donkey", right: true },
              { native: "السيارة", roman: "is-sayyara", english: "the car", reply: [{ who: "jiddo", text: "A car? This was a very, very long time ago!" }] },
              { native: "الجمل", roman: "ij-jamal", english: "the camel", reply: [{ who: "jiddo", text: "{{جمل؟}} No — listen again.", gloss: "jamal — camel?" }] },
            ],
          },
        },
        culture: ["juha"],
        memory: "story",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer the door", hint: "Everyone's here." },
      lines: [
        { who: "guide", text: "Ding-dong. The doorbell. Everyone's here." },
        { who: "teta", text: "Go — open it. And say it properly!" },
      ],
      asker: "teta",
      question: {
        native: "شو منقول للضيوف؟",
        roman: "shu min'ool la-d-dyoof?",
        english: "What do we say to guests?",
        choices: [
          { native: "أهلا وسهلا!", roman: "ahlan wa sahlan!", english: "Welcome!", right: true },
          { native: "مع السلامة!", roman: "ma‘ is-salame!", english: "Goodbye!", reply: [{ who: "teta", text: "Not yet — they only just got here!" }] },
          { native: "صباح الخير!", roman: "sabah il-kheir!", english: "Good morning!", reply: [{ who: "jiddo", text: "It's two in the afternoon!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{أهلا وسهلا!}}", gloss: "“Welcome!”" },
        { who: "khalto", text: "{{أهلين!}}", gloss: "ahlein — welcome to you, too. Your aunt, arms already open." },
        { who: "guide", text: "…They answered you in Arabic. And you understood every word." },
      ],
      memory: "welcome",
    },
    idle: {
      "balcon:lemons": [{ who: "guide", text: "Plenty more lemons. Teta has enough for now." }],
      "salon:table": [{ who: "guide", text: "Bread, olives, hummus, lemons, and a mountain of warak enab." }],
      "matbakh:teta": [{ who: "teta", text: "Go, go — sit with Jiddo. I'm fine." }],
    },
    afterwards: {
      "salon:jiddo": [{ who: "jiddo", text: "Your cousins will want a Juha story too. You tell it this time." }],
      "matbakh:teta": [{ who: "teta", text: "{{كلي، كلي!}} Eat, eat!", gloss: "kuli, kuli — the one instruction at Teta's table." }],
    },
    complete: {
      title: "Ahlan wa",
      em: "Sahlan",
      text: "You picked lemons, helped Teta, set the table, and welcomed the whole family at the door — in Arabic.",
      quest: { v: "Eat, eat!", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <SalonArt done={new Set(["table"])} />,
};

export default content;
