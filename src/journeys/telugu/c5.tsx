import type { ChapterContent } from "../types";
import { Stage, Sky, Moon, Stars, Ground, Well, FY } from "../scenes";
import { Panel } from "../kit";
import { Figure, Child, Banyan, House, Palm } from "../../components/scenes/primitives";
import { VillageHouse } from "./art";

/* TELUGU · Chapter Five — The Stories. Tenali Ramakrishna, told under the banyan. */

function Lantern({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="120" fill="url(#kit-glow)" opacity="0.7" />
      <rect x={x - 14} y={y - 40} width="28" height="8" rx="3" fill="#3a2718" />
      <path d={`M${x - 18} ${y - 32} h36 l6 50 h-48Z`} fill="#ffd07a" opacity="0.9" stroke="#3a2718" strokeWidth="3" />
      <rect x={x - 22} y={y + 18} width="44" height="10" rx="3" fill="#3a2718" />
      <path d={`M${x - 10} ${y - 40} q10 -16 20 0`} stroke="#3a2718" strokeWidth="3" fill="none" />
    </g>
  );
}

function VeedhiEvening() {
  return (
    <Stage>
      <Sky id="t5a" top="#1a2040" mid="#4a3a5a" bottom="#b8707a" />
      <Stars n={40} seed={9} maxY={300} />
      <Ground color="#7a6444" line="#5a4a34" />
      <VillageHouse x={60} w={440} lit />
      <VillageHouse x={1060} w={440} lit wall="#e0d4ea" door="#7a3a8a" />
      <Palm x={780} y={FY - 20} h={360} lean={-20} color="#1a2230" />
      <Child x={880} y={FY} h={116} color="#1a1020" pose="point" flip />
      <Lantern x={640} y={FY - 140} />
      <rect x={620} y={FY - 110} width="40" height="110" fill="#5a3a22" />
    </Stage>
  );
}

function Marri() {
  return (
    <Stage>
      <Sky id="t5b" top="#0f1430" mid="#2a2a4a" bottom="#5a3a4a" />
      <Stars n={90} seed={13} />
      <Moon x={1320} y={170} r={62} />
      <Ground color="#4a3a2a" line="#3a2a1e" kind="grass" />
      <Banyan x={760} y={FY - 20} w={1100} color="#141820" />
      <Lantern x={960} y={FY - 60} />
      <Figure x={1040} y={FY} h={200} color="#140c08" pose="sit" flip />
      {[520, 600, 690, 780].map((x, i) => <Child key={x} x={x} y={FY} h={96 + (i % 2) * 8} color="#1a1020" pose="stand" />)}
      <circle cx={960} cy={FY - 60} r="260" fill="url(#kit-glow)" opacity="0.18" />
    </Stage>
  );
}

/* ---------------- story: Tenali Rama and the thieves ---------------- */

const story = [
  {
    art: (
      <Panel id="te5a" sky={["#f2c878", "#e8a86a"]} ground="#a8845a">
        <House x={60} y={196} w={150} h={80} wall="#e6d2b0" roof="#b8562f" />
        {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${240 + i * 16} 196 l4 -18 l4 18`} stroke="#8a7a4a" strokeWidth="3" fill="none" />)}
        <circle cx={340} cy={50} r="28" fill="#fbe3a0" />
        <Figure x={210} y={200} h={60} color="#2a1a12" />
      </Panel>
    ),
    text: "One summer the rain didn't come, and {{తెనాలి రామకృష్ణుడు}}'s garden — his {{తోట}} — was drying up.",
  },
  {
    art: (
      <Panel id="te5b" sky={["#101830", "#2a2a4a"]} ground="#3a2e24">
        <rect x={40} y={140} width="200" height="56" fill="#5a4a3a" />
        <Figure x={140} y={200} h={56} color="#0a0808" />
        <Figure x={290} y={200} h={60} color="#0a0808" pose="walk" />
        <Figure x={330} y={200} h={56} color="#0a0808" pose="walk" flip />
        <circle cx={80} cy={40} r="16" fill="#f4ecdd" />
      </Panel>
    ),
    text: "One night he saw {{దొంగలు}} (dongalu, thieves) hiding by his wall. So he said, loudly, to his wife: “Let's hide our {{బంగారం}} (gold) in the {{బావి}}!”",
  },
  {
    art: (
      <Panel id="te5c" sky={["#101830", "#2a3050"]} ground="#3a2e24">
        <g transform="translate(-440 -560) scale(0.55)"><Well x={1200} y={1400} /></g>
        {[180, 260].map((x) => <Figure key={x} x={x} y={200} h={60} color="#0a0808" pose="reach" />)}
        <path d="M100 200 q60 -10 120 0 q60 10 120 0" stroke="#8fbfd8" strokeWidth="4" fill="none" opacity="0.8" />
      </Panel>
    ),
    text: "All night the thieves pulled up bucket after bucket of {{నీళ్ళు}} — and every bucket ran straight into the garden.",
  },
  {
    art: (
      <Panel id="te5d" sky={["#bfe0f0", "#f2e6c8"]} ground="#6b8a3a">
        {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={30 + i * 32} cy={186 - (i % 3) * 8} r="18" fill={i % 2 ? "#4f8a3c" : "#3f7d55"} />)}
        <Figure x={260} y={200} h={62} color="#2a1a12" pose="reach" />
        <circle cx={60} cy={50} r="26" fill="#f7d08a" />
      </Panel>
    ),
    text: "By morning the garden was green. There was no gold in the well, of course — and Tenali Rama thanked the thieves for all their hard work.",
  },
];

const content: ChapterContent = {
  startRoom: "veedhi",
  speakers: {
    chinni: { name: "Chinni", glyph: "చి", tone: "guest" },
  },
  rooms: {
    veedhi: {
      id: "veedhi",
      name: "The lane, at dusk",
      native: "వీధి",
      art: <VeedhiEvening />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "house", x: 280, y: 560, label: "Ammamma's house", kind: "flavor", note: "Every house on the lane has its lamps lit. It's the hour everyone sits out on the arugu." },
        { id: "lantern", x: 640, y: 600, label: "Lantern", kind: "quest" },
        { id: "chinni", x: 880, y: 600, label: "Chinni", kind: "npc" },
        { id: "sky", x: 1100, y: 160, label: "Night sky", kind: "word", wordId: "raatri" },
        { id: "marri", x: 1520, y: 580, label: "To the banyan", kind: "exit", to: "marri" },
      ],
    },
    marri: {
      id: "marri",
      name: "Under the banyan",
      native: "మర్రి చెట్టు",
      art: <Marri />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "back", x: 110, y: 580, label: "Back to the lane", kind: "exit", to: "veedhi" },
        { id: "roots", x: 330, y: 560, label: "Hanging roots", kind: "word", wordId: "marri" },
        { id: "kids", x: 650, y: 640, label: "The village kids", kind: "word", wordId: "pillalu" },
        { id: "tatayya", x: 1040, y: 580, label: "Tatayya", kind: "npc" },
        { id: "moon", x: 1320, y: 170, label: "The moon", kind: "word", wordId: "chandamaama" },
        { id: "stars", x: 400, y: 120, label: "Stars", kind: "word", wordId: "nakshatraalu" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Chapter Five · Telugu",
      title: "Told under",
      em: "the banyan",
      text: "The evening after Sankranti. The lamps are lit, the day's heat has gone, and every child in the village is heading to the same tree.",
    },
    introLines: [
      { who: "chinni", text: "{name}! {{కథ}} time! Come on!", gloss: "katha — story. Chinni, running past the gate." },
      { who: "guide", text: "Quest: find your way to Tatayya's story.", gloss: "He tells one under the banyan every night of the holidays." },
    ],
    beats: [
      {
        id: "gather",
        quest: { v: "Talk to Chinni", hint: "She's in the lane." },
        at: { room: "veedhi", hotspot: "chinni" },
        encounter: ["katha"],
        lines: [
          { who: "chinni", text: "Tatayya's under the {{మర్రి చెట్టు}}. But it's dark — bring the {{లాంతరు}}.", gloss: "marri chettu — the banyan; laantaru — lantern." },
        ],
      },
      {
        id: "lantern",
        quest: { v: "Bring the lantern", hint: "On the post in the lane." },
        at: { room: "veedhi", hotspot: "lantern" },
        encounter: ["laantaru"],
        lines: [{ who: "guide", text: "The {{లాంతరు}} is warm and smells of kerosene. The whole lane is golden in its light.", gloss: "Now: the banyan, at the end of the lane." }],
        nudges: { "veedhi:chinni": [{ who: "chinni", text: "The {{లాంతరు}}! It's right there!", gloss: "The lantern, on the post." }] },
      },
      {
        id: "quiz",
        quest: { v: "Sit with Tatayya", hint: "Under the banyan." },
        at: { room: "marri", hotspot: "tatayya" },
        lines: [
          { who: "tatayya", text: "Before the story — a test. Let's see how much Telugu you've picked up in the village.", gloss: "Tatayya never gives anything away for free." },
        ],
        game: { type: "memory", kicker: "Mini-game · Tatayya's test", title: "Match the word to what it means.", hint: "Words from the village, the santha and Sankranti. Matches in a row build a combo." },
        after: [{ who: "tatayya", text: "{{శభాష్!}} Now — sit. Have you heard of Tenali Ramakrishna?", gloss: "The cleverest man in the king's court." }],
        nudges: { "veedhi:lantern": [{ who: "guide", text: "You have the lantern. The banyan is at the end of the lane." }] },
      },
      {
        id: "story",
        quest: { v: "Listen to Tatayya", hint: "The story is starting." },
        at: { room: "marri", hotspot: "tatayya" },
        game: {
          type: "story",
          kicker: "A story from Tatayya",
          title: "Tenali Rama and the Thieves",
          native: "తెనాలి రామకృష్ణుడు, దొంగలు",
          teller: "tatayya",
          panels: story,
          question: {
            native: "దొంగలు బావి నుంచి ఏమి తోడారు?",
            roman: "dongalu baavi nunchi emi thodaaru?",
            english: "What did the thieves draw up from the well?",
            choices: [
              { native: "నీళ్ళు", roman: "neellu", english: "water", right: true },
              { native: "బంగారం", roman: "bangaaram", english: "gold", reply: [{ who: "tatayya", text: "They hoped for gold! But what came up, bucket after bucket?" }] },
              { native: "పాలు", roman: "paalu", english: "milk", reply: [{ who: "tatayya", text: "Milk, from a well? That would be a very strange village." }] },
            ],
          },
        },
        culture: ["tenali"],
        memory: "story",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Tatayya", hint: "He wants to know what you thought." },
      lines: [{ who: "guide", text: "The kids are laughing. Tatayya turns to you." }],
      asker: "tatayya",
      question: {
        native: "కథ నచ్చిందా?",
        roman: "katha nachchindaa?",
        english: "Did you like the story?",
        choices: [
          { native: "చాలా నచ్చింది!", roman: "chaalaa nachchindi!", english: "I loved it!", right: true },
          { native: "చాలు", roman: "chaalu", english: "enough", reply: [{ who: "tatayya", text: "Enough already? I haven't told the second one yet!" }] },
          { native: "ఎంత?", roman: "entha?", english: "how much?", reply: [{ who: "tatayya", text: "How much? Stories are free, under the banyan." }] },
        ],
      },
      right: [
        { who: "you", text: "{{చాలా నచ్చింది, తాతయ్యా!}}", gloss: "“I loved it, Tatayya!”" },
        { who: "tatayya", text: "Then tomorrow, Tenali Rama and the king's cat.", gloss: "The kids groan. They've heard it. They want it anyway." },
      ],
      memory: "nachchindi",
    },
    idle: {
      "veedhi:chinni": [{ who: "chinni", text: "Hurry! He never waits!" }],
      "marri:tatayya": [{ who: "tatayya", text: "Sit, sit. The story's coming." }],
    },
    afterwards: {
      "marri:tatayya": [{ who: "tatayya", text: "Next week you fly home. But the stories go with you — that's what they're for." }],
      "veedhi:chinni": [{ who: "chinni", text: "Will you call me from America? Promise?" }],
    },
    complete: {
      title: "Told under",
      em: "the banyan",
      text: "You carried the lantern, passed Tatayya's test, heard how Tenali Rama outwitted the thieves — and told him, in Telugu, that you loved it.",
      quest: { v: "Stay for the second story", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Marri />,
};

export default content;
