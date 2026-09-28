import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Ground, Bonfire, Crowd, Cow, Item, Clouds, FY } from "../scenes";
import { Walls, Door } from "../../game/rooms";
import { Figure, Child, Kite, Palm, Pot } from "../../components/scenes/primitives";
import { T, VillageHouse, GateMuggu } from "./art";

/* TELUGU · Chapter Four — Sankranti. Three days of the harvest festival. */

const step = (children: React.ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{children}</svg>;
const dots = step(<>{Array.from({ length: 9 }, (_, i) => <circle key={i} cx={20 + (i % 3) * 20} cy={26 + Math.floor(i / 3) * 20} r="3.5" fill="#f4ecdd" />)}<rect width="80" height="90" fill="none" /></>);
const lines = step(<><path d="M20 46c0-20 20-20 20 0s20 20 20 0-20-20-20 0-20 20-20 0" stroke="#f4ecdd" strokeWidth="3" fill="none" /></>);
const colours = step(<><circle cx="28" cy="36" r="12" fill="#c0392b" /><circle cx="52" cy="36" r="12" fill="#d9a441" /><circle cx="40" cy="58" r="12" fill="#3f7d55" /></>);
const gobbemma = step(<><ellipse cx="40" cy="60" rx="20" ry="16" fill="#8a7a4a" /><circle cx="40" cy="44" r="8" fill="#f08a1c" /><circle cx="32" cy="48" r="5" fill="#f7c948" /><circle cx="48" cy="48" r="5" fill="#f7c948" /></>);

function Vaakili({ done }: { done: ReadonlySet<string> }) {
  const muggu = done.has("muggu");
  return (
    <Stage>
      <Sky id="t4a" top="#3a3a6a" mid="#b8708a" bottom="#f2c08a" />
      <Palm x={100} y={FY - 30} h={360} lean={24} color="#2a3a3a" />
      <Ground color={T.earth} line={T.earthLine} />
      <VillageHouse x={360} w={520} lit />
      {/* the whole house front is garlanded for the festival */}
      <path d="M340 480 q280 60 560 0" stroke="#f08a1c" strokeWidth="10" fill="none" strokeDasharray="2 12" strokeLinecap="round" />
      {muggu ? (
        <g>
          <GateMuggu x={640} s={0.75} color="#fbf7ef" />
          {[[560, 822], [640, 836], [720, 822]].map(([x, y]) => (
            <g key={x}><ellipse cx={x} cy={y} rx="16" ry="10" fill="#7a6a3a" /><circle cx={x} cy={y - 8} r="7" fill="#f08a1c" /></g>
          ))}
          <ellipse cx={640} cy={830} rx="180" ry="44" fill="none" stroke="#c0392b" strokeWidth="6" opacity="0.8" />
          <ellipse cx={640} cy={830} rx="200" ry="50" fill="none" stroke="#d9a441" strokeWidth="5" opacity="0.8" />
        </g>
      ) : (
        <g>{Array.from({ length: 25 }, (_, i) => <circle key={i} cx={560 + (i % 5) * 40} cy={806 + Math.floor(i / 5) * 12} r="3" fill="#fbf7ef" />)}</g>
      )}
      {/* the Bhogi fire in the lane */}
      <Bonfire x={1200} s={0.9} />
      <Crowd x={1000} n={3} spread={120} seed={41} scale={0.9} color="#2a1a24" />
      <Crowd x={1330} n={3} spread={180} seed={43} scale={0.9} color="#2a1a24" />
      {/* the Gangireddu — the decorated festival bull */}
      <Cow x={180} s={0.85} />
      <path d="M130 660 h110 v40 q-55 16 -110 0Z" fill="#c0392b" />
      <path d="M130 664 h110" stroke="#d9a441" strokeWidth="6" strokeDasharray="10 6" />
      <Figure x={310} y={FY} h={200} color="#2a1a12" pose="stand" />
    </Stage>
  );
}

function Vantillu() {
  return (
    <Stage>
      <Walls tint="#e9d8bc" floor="#b8905a" floorLine="#9a7446" shade="#d6c19c" />
      <Door x={40} open />
      {/* smoke-darkened wall above the wood stove */}
      <rect x={820} y={200} width="420" height="330" fill="#3a2a20" opacity="0.18" />
      {/* the mud stove */}
      <path d={`M880 ${FY} v-90 q0 -20 20 -20 h300 q20 0 20 20 v90Z`} fill="#b87a4a" />
      <ellipse cx={960} cy={FY - 106} rx="46" ry="12" fill="#2a1a12" />
      <ellipse cx={1140} cy={FY - 106} rx="46" ry="12" fill="#2a1a12" />
      <path d="M930 740 q30 -40 60 0" fill="#f08a1c" />
      <path d={`M1090 ${FY - 110} q50 34 100 0Z`} fill="#1a1a1e" />
      <Pot x={960} y={FY - 110} w={96} color="#3a2a24" rim="#1a1a1e" />
      {/* brass plates on a shelf */}
      <rect x={300} y={300} width="400" height="10" fill="#5a3a22" />
      {[340, 420, 500, 580, 660].map((x) => <circle key={x} cx={x} cy={270} r="30" fill="#c99a3e" stroke="#a8792c" strokeWidth="3" />)}
      {/* ariselu drying on a plate */}
      <ellipse cx={560} cy={FY - 30} rx="120" ry="22" fill="#c99a3e" />
      {Array.from({ length: 7 }, (_, i) => <ellipse key={i} cx={470 + (i % 4) * 58} cy={FY - 36 - Math.floor(i / 4) * 12} rx="24" ry="9" fill="#8a5a2a" />)}
      <Figure x={1360} y={FY - 10} h={190} color="#2a1a12" pose="sit" flip />
    </Stage>
  );
}

function Meda() {
  return (
    <Stage>
      <Sky id="t4c" top="#6aaede" mid="#b8dcef" bottom="#f2e6c8" />
      <Sun x={1420} y={150} r={50} />
      <Clouds seed={21} />
      {/* rooftops of the village all around */}
      {[0, 260, 1180, 1400].map((x, i) => <rect key={x} x={x} y={560 + (i % 2) * 30} width={220} height={400} fill={i % 2 ? "#d9c7a6" : "#e6d2b0"} />)}
      <Kite x={380} y={220} size={70} color="#c0392b" accent="#d9a441" rot={-14} />
      <Kite x={1240} y={180} size={60} color="#2d6ab8" accent="#f4ecdd" rot={18} />
      <Kite x={900} y={120} size={50} color="#3f7d55" accent="#f0cf7a" rot={8} />
      <Kite x={1500} y={300} size={44} color="#7a3a8a" accent="#f4ecdd" rot={-20} />
      {/* the terrace */}
      <rect x={0} y={FY - 20} width="1600" height="160" fill="#c9b89a" />
      <rect x={0} y={FY - 60} width="1600" height="40" fill="#d9c7a6" />
      <Figure x={1100} y={FY - 20} h={210} color="#2a1a12" pose="reach" flip />
      <Child x={430} y={FY - 20} h={110} color="#2a1a12" pose="point" />
      <line x1={1130} y1={FY - 180} x2={1240} y2={240} stroke="#f4ecdd" strokeWidth="1.5" />
      <ellipse cx={1060} cy={FY - 30} rx="26" ry="12" fill="#8a5a2a" />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "vaakili",
  rooms: {
    vaakili: {
      id: "vaakili",
      name: "The gate, at dawn",
      native: "వాకిలి",
      art: (done) => <Vaakili done={done} />,
      spawn: { left: 420, right: 1300 },
      hotspots: [
        { id: "gangireddu", x: 200, y: 600, label: "Gangireddu", kind: "flavor", note: "The Gangireddu — a bull dressed in silk, led from house to house with music. He nods when you say his name.", culture: "gangireddu" },
        { id: "muggu", x: 640, y: 800, label: "The muggu", kind: "quest" },
        { id: "vantillu", x: 790, y: 560, label: "Kitchen", kind: "exit", to: "vantillu" },
        { id: "bhogi", x: 1200, y: 600, label: "Bhogi fire", kind: "quest" },
        { id: "meda", x: 1520, y: 560, label: "Up to the terrace", kind: "exit", to: "meda" },
      ],
    },
    vantillu: {
      id: "vantillu",
      name: "Ammamma's kitchen",
      native: "వంటిల్లు",
      art: <Vantillu />,
      spawn: { left: 240, right: 1200 },
      hotspots: [
        { id: "back", x: 130, y: 560, label: "The gate", kind: "exit", to: "vaakili" },
        { id: "plates", x: 500, y: 300, label: "Brass plates", kind: "flavor", note: "Ammamma's wedding plates. They only come down for festivals." },
        { id: "ariselu", x: 560, y: 690, label: "Ariselu", kind: "word", wordId: "ariselu" },
        { id: "stove", x: 1040, y: 620, label: "Wood stove", kind: "flavor", note: "A mud stove fed with firewood. Ammamma says food tastes different on it. She's right." },
        { id: "ammamma", x: 1360, y: 560, label: "Ammamma", kind: "npc" },
      ],
    },
    meda: {
      id: "meda",
      name: "The terrace",
      native: "మేడ",
      art: <Meda />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "back", x: 110, y: 560, label: "Down to the gate", kind: "exit", to: "vaakili" },
        { id: "sky", x: 640, y: 200, label: "Kites everywhere", kind: "word", wordId: "gaali" },
        { id: "tatayya", x: 1100, y: 560, label: "Tatayya", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Chapter Four · Telugu",
      title: "Sankranti,",
      em: "from the inside",
      text: "Bhogi morning — the first of Sankranti's three days. It's still dark, the whole lane is awake, and somewhere a fire is already crackling.",
    },
    introLines: [
      { who: "ammamma", text: "Get up, get up! It's {{భోగి}}!", gloss: "bhogi — the first day of Sankranti." },
      { who: "guide", text: "Three days of {{పండుగ}}. Today's the fire.", gloss: "panduga — festival. Quest: celebrate Sankranti." },
    ],
    beats: [
      {
        id: "bhogi",
        quest: { v: "Go to the Bhogi fire", hint: "In the lane, where everyone's gathering." },
        at: { room: "vaakili", hotspot: "bhogi" },
        encounter: ["bhogi", "manta"],
        lines: [
          { who: "guide", text: "The {{భోగి మంట}}. Everyone brings something old to throw in.", gloss: "bhogi manta — the Bhogi bonfire." },
          { who: "guide", text: "Out with what the year is finished with; in with the harvest.", gloss: "Now — the muggu. Ammamma's waiting at the gate." },
        ],
        culture: ["bhogi"],
        nudges: { "vaakili:muggu": [{ who: "guide", text: "The fire first — everyone's at the Bhogi fire." }] },
      },
      {
        id: "muggu",
        quest: { v: "Draw the Sankranti muggu", hint: "At the gate — the dots are already there." },
        at: { room: "vaakili", hotspot: "muggu" },
        encounter: ["muggu"],
        lines: [{ who: "ammamma", text: "The biggest {{ముగ్గు}} of the year. I've put the dots. You do the rest.", gloss: "muggu — the drawing at the gate." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · ముగ్గు",
          title: "Draw the muggu, in order.",
          hint: "A muggu is always made the same way. What comes first?",
          steps: [
            { native: "చుక్కలు పెట్టు", roman: "chukkalu pettu", english: "set out the dots", wordId: "chukkalu", art: dots },
            { native: "గీతలు గీయి", roman: "geethalu geeyi", english: "draw the lines around them", art: lines },
            { native: "రంగులు వెయ్యి", roman: "rangulu veyyi", english: "fill in the colours", wordId: "rangulu", art: colours },
            { native: "గొబ్బెమ్మలు పెట్టు", roman: "gobbemmalu pettu", english: "place the gobbemmalu", wordId: "gobbemma", art: gobbemma },
          ],
          done: "The whole lane has stopped to look at it.",
        },
        after: [{ who: "ammamma", text: "{{చాలా బాగుంది!}} Now come inside — {{అరిసెలు}}.", gloss: "chaalaa baagundi — really beautiful! Ariselu — the Sankranti sweet." }],
        culture: ["gobbemma"],
        memory: "muggu",
      },
      {
        id: "ariselu",
        quest: { v: "Make ariselu with Ammamma", hint: "In the kitchen." },
        at: { room: "vantillu", hotspot: "ammamma" },
        lines: [{ who: "ammamma", text: "Pass me what I ask for. My hands are sticky with {{బెల్లం}}.", gloss: "bellam — jaggery." }],
        game: {
          type: "fetch",
          npc: "ammamma",
          kicker: "Mini-game · అరిసెలు",
          title: "Hand Ammamma what she asks for.",
          hint: "Listen for the word. Nothing is labelled.",
          asks: [
            { wordId: "pindi", native: "బియ్యం పిండి ఇవ్వు.", roman: "biyyam pindi ivvu.", english: "Give me the rice flour." },
            { wordId: "bellam", native: "బెల్లం ఇవ్వు.", roman: "bellam ivvu.", english: "Give me the jaggery." },
            { wordId: "nuvvulu", native: "ఇప్పుడు నువ్వులు.", roman: "ippudu nuvvulu.", english: "Now the sesame." },
            { wordId: "nune", native: "నూనె జాగ్రత్త!", roman: "noone jaagratta!", english: "Careful with the oil!" },
          ],
          items: [
            { wordId: "pindi", label: "Bag", art: <Item kind="bag" color="#f4ecdd" /> },
            { wordId: "bellam", label: "Brown", art: <Item kind="box" color="#8a5a2a" accent="#b8864a" /> },
            { wordId: "nuvvulu", label: "Seeds", art: <Item kind="bowl" color="#c9a36a" accent="#f4ecdd" /> },
            { wordId: "nune", label: "Tin", art: <Item kind="bottle" color="#d9b83a" /> },
          ],
          done: { native: "శభాష్!", roman: "shabaash!", english: "well done!" },
        },
        after: [{ who: "ammamma", text: "Ariselu for everyone who comes to the door today. Now — Tatayya's on the terrace with the kites.", gloss: "Up the stairs from the gate." }],
        memory: "ariselu",
        nudges: { "vaakili:muggu": [{ who: "guide", text: "Beautiful. Now — Ammamma's calling from the kitchen." }] },
      },
      {
        id: "kites",
        quest: { v: "Fly kites with Tatayya", hint: "On the terrace." },
        at: { room: "meda", hotspot: "tatayya" },
        encounter: ["gaalipatam", "daaram"],
        lines: [
          { who: "tatayya", text: "Hold the {{దారం}}. When the {{గాలి}} comes — let it go.", gloss: "daaram — the string; gaali — the wind." },
          { who: "guide", text: "The {{గాలిపటం}} catches, climbs, and suddenly it's the highest one on the street.", gloss: "gaalipatam — kite." },
          { who: "tatayya", text: "{{భలే!}} Now, it's Sankranti. What do we say to each other today?", gloss: "bhale — wonderful!" },
        ],
        memory: "kite",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Tatayya", hint: "What do people say today?" },
      lines: [],
      asker: "tatayya",
      question: {
        native: "ఈ రోజు ఏమంటాం?",
        roman: "ee roju emantaam?",
        english: "What do we say today?",
        choices: [
          { native: "సంక్రాంతి శుభాకాంక్షలు!", roman: "sankraanti shubhaakaankshalu!", english: "Happy Sankranti!", right: true },
          { native: "పుట్టినరోజు శుభాకాంక్షలు!", roman: "puttinaroju shubhaakaankshalu!", english: "Happy birthday!", reply: [{ who: "tatayya", text: "Whose birthday? It's Sankranti!" }] },
          { native: "తిన్నాను", roman: "tinnaanu", english: "I've eaten", reply: [{ who: "tatayya", text: "Good — ariselu, I hope. But today there's a special greeting." }] },
        ],
      },
      right: [
        { who: "you", text: "{{సంక్రాంతి శుభాకాంక్షలు, తాతయ్యా!}}", gloss: "“Happy Sankranti, Tatayya!”" },
        { who: "tatayya", text: "{{సంక్రాంతి శుభాకాంక్షలు!}} Now hold on — yours is winning.", gloss: "Every roof on the street is shouting it back." },
      ],
      encounter: ["panduga"],
      memory: "sankranti",
    },
    idle: {
      "vaakili:bhogi": [{ who: "guide", text: "The fire's burning down. The harvest can begin." }],
      "vaakili:muggu": [{ who: "guide", text: "The best muggu on the lane. Ammamma says so, and she's not biased at all." }],
      "vantillu:ammamma": [{ who: "ammamma", text: "Go, go — the kites!" }],
    },
    afterwards: {
      "meda:tatayya": [{ who: "tatayya", text: "Tomorrow is Kanuma — we thank the cattle. Your Ammamma will make them look like brides." }],
      "vantillu:ammamma": [{ who: "ammamma", text: "Take ariselu to Chinni's house. And one for yourself. Two." }],
    },
    complete: {
      title: "Sankranti,",
      em: "from the inside",
      text: "The Bhogi fire, a muggu the whole lane stopped to see, ariselu from the kitchen, a kite over every roof — and the greeting, in Telugu, shouted from yours.",
      quest: { v: "Keep your kite up", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Vaakili done={new Set(["muggu"])} />,
};

export default content;
