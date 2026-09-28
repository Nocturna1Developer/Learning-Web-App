import type { ChapterContent, StoryPanel } from "../types";
import { Stage, Sky, Stars, Moon, Ground, FY } from "../scenes";
import { Figure, Child } from "../../components/scenes/primitives";
import { Panel } from "../kit";
import { Haveli, Charpai, Parapet, Diya } from "./art";

/* HINDI · Chapter Five — कहानी, Stories. On the roof after Holi: Birbal and the khichdi that never cooked. */

function AanganRaat() {
  return (
    <Stage>
      <Sky id="hi5a" top="#0e1430" bottom="#3a2a4a" />
      <Stars n={40} seed={9} maxY={280} />
      <Haveli x={-60} w={560} h={520} wall="#6a5a6a" lit />
      <Haveli x={1100} w={560} h={520} wall="#5a5a6a" />
      <rect x={500} y={FY - 440} width="600" height="440" fill="#6a6070" />
      {/* the stairs to the roof */}
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={1200 + i * 30} y={FY - 40 - i * 40} width="200" height="40" fill="#8a7a7a" />)}
      <Ground color="#6a5a5a" line="#4a3a3a" kind="stone" />
      <Diya x={620} y={FY - 20} s={1.2} />
      <Figure x={840} y={FY} h={185} color="#120c14" />
      <Child x={740} y={FY} h={108} color="#120c14" />
    </Stage>
  );
}

function Chhat({ done }: { done: ReadonlySet<string> }) {
  const told = done.has("story");
  return (
    <Stage>
      <Sky id="hi5b" top="#060a22" mid="#141a3c" bottom="#2a2a4a" />
      <Stars n={110} seed={27} maxY={560} />
      <Moon x={1240} y={180} r={told ? 70 : 60} />
      {/* the rooftops of Lucknow, and a dome */}
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={i * 210 - 40} y={560 + (i % 3) * 18} width="180" height="80" fill="#1a1a28" />)}
      <path d="M660 560q70 -120 140 0Z" fill="#22222e" />
      <rect x={724} y={430} width="12" height="20" fill="#22222e" />
      <Parapet y={620} color="#8a7a70" />
      <Ground color="#9a8a80" line="#7a6a60" kind="tile" />
      {/* a kite, still caught on the wire from last month */}
      <path d="M0 300 L1600 340" stroke="#4a4a50" strokeWidth="2" />
      <path d="M420 290l24 30l-24 30l-24 -30Z" fill="#e0304a" />
      <Charpai x={440} w={320} />
      <Charpai x={900} w={300} />
      <Diya x={880} y={FY - 4} s={1} />
      <Figure x={600} y={FY - 60} h={170} color="#0a0810" pose="sit" />
      <Child x={1000} y={FY - 60} h={100} color="#0a0810" />
      <Child x={1100} y={FY - 60} h={112} color="#0a0810" flip />
    </Stage>
  );
}

const story: StoryPanel[] = [
  {
    art: (
      <Panel id="hi5p1" sky={["#1a2a4a", "#5a6a8a"]} ground="#3a4a6a">
        <path d="M0 196h400v44H0Z" fill="#a8c0d8" opacity="0.6" />
        <path d="M250 196v-90h120v90Z" fill="#c8a878" />
        <path d="M280 106q30 -50 60 0Z" fill="#d8b888" />
        <Figure x={120} y={196} h={120} color="#4a2a1a" />
        <path d="M100 86h40l-6 -14h-28Z" fill="#e8c25a" />
      </Panel>
    ),
    text: "One freezing winter, the {{बादशाह}} Akbar made an announcement: whoever stands all night in the icy lake by the palace will get a great {{इनाम}}.",
  },
  {
    art: (
      <Panel id="hi5p2" sky={["#060a1a", "#1a2a44"]} ground={null}>
        <rect y="150" width="400" height="90" fill="#3a5a7a" />
        <Figure x={200} y={220} h={110} color="#1a1210" />
        <rect x="150" y="170" width="100" height="70" fill="#3a5a7a" opacity="0.8" />
        <circle cx="360" cy="40" r="6" fill="#ffd07a" />
        <circle cx="360" cy="40" r="20" fill="#ffd07a" opacity="0.2" />
      </Panel>
    ),
    text: "A poor washerman needed the money. He stood in the water all night, shaking with {{ठंड}}, staring at one tiny lamp burning far away in the palace.",
  },
  {
    art: (
      <Panel id="hi5p3" sky={["#e8c890", "#c8a070"]} ground="#8a6a4a">
        <rect x="60" y="120" width="120" height="76" fill="#c0392b" />
        <Figure x={120} y={196} h={96} color="#4a2a1a" pose="sit" />
        <Figure x={290} y={196} h={110} color="#2a1a12" />
      </Panel>
    ),
    text: "In the morning, Akbar asked how he'd survived. “I looked at the lamp in the palace.” “Then the lamp kept you warm,” said Akbar. “No reward.”",
  },
  {
    art: (
      <Panel id="hi5p4" sky={["#9ac0d8", "#e8dcc0"]} ground="#6a8a4a">
        <path d="M300 196v-120" stroke="#5a3a22" strokeWidth="14" />
        <circle cx="300" cy="70" r="60" fill="#3f7d55" />
        <path d="M300 110v40" stroke="#6b4a1e" strokeWidth="2" />
        <path d="M284 150h32l-4 22h-24Z" fill="#8a4a2e" />
        <path d="M290 192q10 -16 20 0" fill="#f0a830" />
        <Figure x={140} y={196} h={112} color="#2a1a12" />
      </Panel>
    ),
    text: "Next day, Birbal didn't come to court. Akbar went looking — and found him in his garden, with a {{हाँडी}} of {{खिचड़ी}} tied high up in a tree, and a tiny fire far, far below it.",
  },
  {
    art: (
      <Panel id="hi5p5" sky={["#9ac0d8", "#e8dcc0"]} ground="#6a8a4a">
        <Figure x={120} y={196} h={112} color="#4a2a1a" />
        <path d="M100 86h40l-6 -14h-28Z" fill="#e8c25a" />
        <Figure x={250} y={196} h={112} color="#2a1a12" />
        <path d="M150 70q30 -20 60 0" stroke="#2a1a12" strokeWidth="2" fill="none" />
      </Panel>
    ),
    text: "“Birbal, that will never cook!” “Huzoor,” said Birbal, “if a lamp far away can warm a man in a lake — surely my fire can cook my khichdi?” Akbar laughed until he cried, and gave the washerman his reward.",
  },
];

const content: ChapterContent = {
  startRoom: "aangan",
  speakers: {
    anu: { name: "Anu", glyph: "अ", tone: "guest" },
    rohan: { name: "Rohan bhaiya", glyph: "रो", tone: "guest" },
  },
  rooms: {
    aangan: {
      id: "aangan",
      name: "The courtyard at night",
      native: "आँगन",
      art: <AanganRaat />,
      spawn: { left: 300, right: 1100 },
      hotspots: [
        { id: "diya", x: 620, y: 700, label: "Diya", kind: "flavor", note: "Dadi's evening diya, lit on the courtyard step — here, at home, just as she lights it in America.", culture: "diya" },
        { id: "anu", x: 740, y: 640, label: "Anu", kind: "word", wordId: "behen" },
        { id: "dadi", x: 840, y: 560, label: "Dadi", kind: "npc" },
        { id: "stairs", x: 1400, y: 520, label: "Stairs to the roof", kind: "exit", to: "chhat" },
      ],
    },
    chhat: {
      id: "chhat",
      name: "The roof",
      native: "छत",
      art: (done) => <Chhat done={done} />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "kite", x: 420, y: 320, label: "Stuck kite", kind: "flavor", note: "A red kite, caught on the wire since the kite festival. Rohan says it's his. Rohan says every kite is his." },
        { id: "dadi", x: 600, y: 580, label: "Dadi", kind: "npc" },
        { id: "anu", x: 1000, y: 600, label: "Anu", kind: "npc" },
        { id: "rohan", x: 1100, y: 600, label: "Rohan", kind: "word", wordId: "bhaai" },
        { id: "moon", x: 1240, y: 180, label: "The moon", kind: "word", wordId: "chaand" },
        { id: "down", x: 1520, y: 560, label: "Downstairs", kind: "exit", to: "aangan" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "पाँचवाँ अध्याय · Hindi",
      title: "Stories on",
      em: "the Roof",
      text: "Holi night. Everyone is scrubbed, fed and still slightly pink. The house is too hot for sleeping — so the whole family goes up to the roof.",
    },
    introLines: [
      { who: "dadi", text: "{{चलो, छत पर।}} It's cooler up there, and the stars are better.", gloss: "chalo, chhat par — come, up to the roof." },
      { who: "guide", text: "Quest: go up to the roof with Dadi.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "up",
        quest: { v: "Talk to Dadi", hint: "In the courtyard." },
        at: { room: "aangan", hotspot: "dadi" },
        encounter: ["chhat"],
        lines: [
          { who: "dadi", text: "When your Papa was small, every summer night we slept on the {{छत}}. All of us, in a row, on charpais.", gloss: "chhat — roof." },
          { who: "dadi", text: "Go on up. I'm slower on stairs than I was.", gloss: "The stairs on the right." },
        ],
        culture: ["chhat"],
      },
      {
        id: "stars",
        quest: { v: "Find Anu on the roof", hint: "Up the stairs." },
        at: { room: "chhat", hotspot: "anu" },
        encounter: ["taare", "chaand"],
        lines: [
          { who: "anu", text: "Look — {{तारे}}! And the {{चाँद}}. It's the same moon in America, right?", gloss: "taare — stars. chaand — moon." },
          { who: "anu", text: "While Dadi climbs the stairs — I'm testing you. Everything from this whole trip.", gloss: "She takes this very seriously." },
        ],
        game: { type: "memory", kicker: "Mini-game · Anu's test", title: "Match the word to what it means.", hint: "Words from the bazaar, the kitchen and Holi. Matches in a row build a combo." },
        after: [{ who: "anu", text: "{{ठीक है}}, you're good. Dadi! Tell the Birbal one!", gloss: "theek hai — okay, fine." }],
        nudges: { "chhat:dadi": [{ who: "dadi", text: "Let me catch my breath. Go sit with Anu." }] },
      },
      {
        id: "story",
        quest: { v: "Listen to Dadi's story", hint: "On the charpai." },
        at: { room: "chhat", hotspot: "dadi" },
        encounter: ["baadshaah", "thand", "khichdi", "haandi", "inaam"],
        lines: [{ who: "dadi", text: "{{एक बार की बात है…}} Once upon a time, in the court of the great Akbar…", gloss: "ek baar ki baat hai — how every story begins." }],
        game: {
          type: "story",
          kicker: "A story from Dadi",
          title: "Birbal's Khichdi",
          native: "बीरबल की खिचड़ी",
          teller: "dadi",
          panels: story,
          question: {
            native: "खिचड़ी क्यों नहीं पकी?",
            roman: "khichdi kyon nahin paki?",
            english: "Why didn't the khichdi cook?",
            choices: [
              { native: "आग बहुत दूर थी।", roman: "aag bahut door thi.", english: "The fire was too far away.", right: true },
              { native: "पानी नहीं था।", roman: "paani nahin tha.", english: "There was no water.", reply: [{ who: "dadi", text: "There was plenty of water, beta. Where was the fire?" }] },
              { native: "बहुत ठंड थी।", roman: "bahut thand thi.", english: "It was too cold.", reply: [{ who: "anu", text: "It was cold — but that's not why! Think about the fire." }] },
            ],
          },
        },
        culture: ["birbal"],
        memory: "khichdi",
        nudges: { "chhat:anu": [{ who: "anu", text: "Shh! Dadi's starting." }] },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Dadi", hint: "She wants to know what you thought of Birbal." },
      lines: [{ who: "dadi", text: "Dadi pulls the sheet up over Anu, who is already half asleep, and looks at you." }],
      asker: "dadi",
      question: {
        native: "बीरबल कैसे थे?",
        roman: "Birbal kaise the?",
        english: "What was Birbal like?",
        choices: [
          { native: "बहुत चतुर!", roman: "bahut chatur!", english: "Very clever!", right: true },
          { native: "बहुत महँगा!", roman: "bahut mahanga!", english: "Very expensive!", reply: [{ who: "rohan", text: "Expensive?! He wasn't a kurta! What was he LIKE?" }] },
          { native: "एकदम गोल!", roman: "ekdam gol!", english: "Perfectly round!", reply: [{ who: "dadi", text: "Birbal? Round? Ha! Maybe after all that khichdi. What was he like?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{बहुत चतुर!}}", gloss: "“Very clever!”" },
        { who: "dadi", text: "Clever — and kind. He used his cleverness for the washerman, not for himself. That's the part to remember.", gloss: "{{शाबाश।}} — shaabaash, well done." },
        { who: "guide", text: "The city goes quiet below. Somewhere, someone is still singing Holi songs." },
      ],
      encounter: ["chatur"],
      memory: "chatur",
    },
    gates: [{ room: "aangan", hotspot: "stairs", until: "up", line: { who: "dadi", text: "Wait for me! Talk to me first.", gloss: "Dadi is folding a sheet." } }],
    idle: {
      "chhat:anu": [{ who: "anu", text: "Zzz… I'm not asleep. Zzz…" }],
      "aangan:dadi": [{ who: "dadi", text: "Up you go. I'm right behind you." }],
    },
    afterwards: {
      "chhat:dadi": [{ who: "dadi", text: "Soon you fly home. But you'll take Birbal with you. And your Holi colours, probably, for a week." }],
      "chhat:anu": [{ who: "anu", text: "Will you call? Every week? Promise?" }],
    },
    complete: {
      title: "Stories on",
      em: "the Roof",
      text: "You climbed to the roof, beat Anu's word test, heard the story of Birbal's khichdi under the stars — and told Dadi just how clever he was.",
      quest: { v: "Sleep on the roof", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Chhat done={new Set(["story"])} />,
};

export default content;
