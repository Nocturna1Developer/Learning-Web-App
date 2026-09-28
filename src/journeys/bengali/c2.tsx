import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Clouds, Ground, Item, FY } from "../scenes";
import { Figure, Child, Palm } from "../../components/scenes/primitives";
import { BD, TinHouse, BananaPlant, Nouka, Shapla } from "./art";

/* BENGALI · Chapter Two — গ্রাম. April in Nanu's village by the river: a pond, a storm, and a boat to the other side. */

function Uthon({ done }: { done: ReadonlySet<string> }) {
  const wet = done.has("fish");
  return (
    <Stage>
      <Sky id={wet ? "bn2w" : "bn2a"} top={wet ? "#6a8aa8" : "#7ab8e0"} mid={wet ? "#a8c0d0" : "#b8d8e8"} bottom="#e8e8d8" />
      {!wet && <Sun x={1380} y={120} r={46} color="#fbe6b0" />}
      <Clouds seed={wet ? 31 : 5} opacity={wet ? 0.8 : 0.5} y={150} />
      <Palm x={120} y={FY - 40} h={420} lean={20} color="#3f6a3a" />
      <TinHouse x={200} w={420} h={230} />
      <BananaPlant x={680} h={280} />
      <Ground color="#8a9a4a" line="#6a7a3a" kind="grass" />
      {/* the pond, with water lilies */}
      <ellipse cx={1080} cy={FY + 30} rx="360" ry="70" fill="#4a7a8a" />
      <ellipse cx={1080} cy={FY + 26} rx="340" ry="60" fill="#5a8a9a" />
      <Shapla x={900} y={FY + 10} n={6} />
      {/* the veranda bench, Nana on it */}
      <rect x={320} y={FY - 60} width="200" height="12" fill="#6b4429" />
      <Figure x={420} y={FY} h={190} color="#2a1a12" pose="sit" />
      <path d="M392 560q28 -14 56 0" fill="#f4f0e6" />
      <Child x={780} y={FY} h={112} color="#2a1a12" />
      <Palm x={1500} y={FY - 30} h={380} lean={-24} color="#3f6a3a" />
      {wet && Array.from({ length: 40 }, (_, i) => <line key={i} x1={(i * 43) % 1600} y1={(i * 71) % 700} x2={(i * 43) % 1600 - 12} y2={(i * 71) % 700 + 36} stroke="#dfe8ee" strokeWidth="2" opacity="0.5" />)}
    </Stage>
  );
}

function Ghat() {
  return (
    <Stage>
      <Sky id="bn2b" top="#8ab8d8" mid="#c8dce4" bottom="#f0e8d0" />
      <Sun x={300} y={180} r={50} color="#fbe0a0" />
      {/* the far bank, a thin green line */}
      <rect x="0" y="470" width="1600" height="24" fill="#6a8a4a" />
      {Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${i * 100 + 20} 470q10 -40 20 0`} fill="#4f7a3a" />)}
      {/* the river */}
      <rect x="0" y="494" width="1600" height="200" fill={BD.river} />
      {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${(i * 173) % 1600} ${520 + (i % 4) * 40}q30 -8 60 0`} stroke="#8ab0c8" strokeWidth="3" fill="none" />)}
      <Nouka x={1000} y={600} s={1.1} />
      <Nouka x={420} y={520} s={0.5} />
      {/* the ghat: brick steps down to the water */}
      <Ground color="#b8a080" line="#98805e" kind="dirt" y={FY - 40} />
      {Array.from({ length: 4 }, (_, i) => <rect key={i} x={100 + i * 20} y={FY - 60 + i * 20} width={400 - i * 40} height="20" fill="#a8604a" />)}
      <Figure x={1180} y={560} h={170} color="#2a1a12" />
      <path d="M1188 420l60 -120" stroke="#6b4429" strokeWidth="6" />
      <Figure x={300} y={FY - 40} h={190} color="#2a1a12" />
      <Child x={380} y={FY - 40} h={112} color="#3a2a24" />
    </Stage>
  );
}

const fish = (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M8 32q20 -18 40 0q-20 18 -40 0Z" fill="#9ab0c8" />
    <path d="M46 32l12 -10v20Z" fill="#9ab0c8" />
    <circle cx="18" cy="30" r="2.5" fill="#2a1a12" />
  </svg>
);

const content: ChapterContent = {
  startRoom: "uthon",
  speakers: {
    majhi: { name: "The boatman", glyph: "মা", tone: "guest" },
    rupa: { name: "Rupa", glyph: "রু", tone: "guest" },
  },
  rooms: {
    uthon: {
      id: "uthon",
      name: "Nanu's courtyard",
      native: "উঠোন",
      art: (done) => <Uthon done={done} />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "house", x: 300, y: 520, label: "Tin-roofed house", kind: "word", wordId: "gram" },
        { id: "nana", x: 420, y: 560, label: "Nana", kind: "npc" },
        { id: "rupa", x: 780, y: 620, label: "Rupa", kind: "flavor", note: "Your cousin Rupa, nine, who has already climbed the coconut palm twice this morning and would like you to know it." },
        { id: "pukur", x: 1080, y: 720, label: "The pond", kind: "quest" },
        { id: "shapla", x: 1000, y: 760, label: "Water lilies", kind: "flavor", note: "White shapla lilies — Bangladesh's national flower — opening on the pond.", culture: "shapla" },
        { id: "ghat", x: 1530, y: 580, label: "To the river", kind: "exit", to: "ghat" },
      ],
    },
    ghat: {
      id: "ghat",
      name: "The river landing",
      native: "ঘাট",
      art: <Ghat />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "uthon", x: 70, y: 540, label: "Back to the village", kind: "exit", to: "uthon" },
        { id: "far", x: 800, y: 470, label: "The far bank", kind: "word", wordId: "nodi" },
        { id: "majhi", x: 1180, y: 460, label: "The boatman", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "দ্বিতীয় অধ্যায় · Bengali",
      title: "The",
      em: "Village",
      text: "April. You've flown across the world with Ammu to Nanu's village, an hour's drive from Dhaka and then a long walk along a raised path between green paddy fields. There's a pond, a river, and a sky that changes its mind every hour.",
    },
    introLines: [
      { who: "nana", text: "{{এসো, এসো!}} Finally! I've been waiting all morning.", gloss: "esho — come! Nana — your grandpa — on the veranda, holding a fishing rod." },
      { who: "guide", text: "Quest: go fishing with Nana.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "nana",
        quest: { v: "Talk to Nana", hint: "On the veranda bench." },
        at: { room: "uthon", hotspot: "nana" },
        encounter: ["nana", "gram"],
        lines: [
          { who: "nana", text: "Welcome to our {{গ্রাম}}. Your Ammu learned to swim in that pond. Now — the fish are waiting. Bring me what I need.", gloss: "gram — village." },
        ],
        game: {
          type: "fetch",
          npc: "nana",
          kicker: "Mini-game · মাছ ধরা",
          title: "Bring Nana what he asks for.",
          hint: "Nothing on the veranda is labelled. Listen.",
          asks: [
            { wordId: "borshi", native: "বড়শিটা দাও।", roman: "borshita dao.", english: "Give me the fishing rod." },
            { wordId: "jal", native: "জালটাও।", roman: "jaltao.", english: "The net too." },
            { wordId: "balti", native: "বালতি — মাছের জন্য।", roman: "balti — macher jonno.", english: "The bucket — for the fish." },
            { wordId: "chhata", native: "আর ছাতা! আকাশ দেখেছ?", roman: "ar chhata! akash dekhecho?", english: "And the umbrella! Have you seen the sky?" },
          ],
          items: [
            { wordId: "borshi", label: "Long, thin", art: <Item kind="long" color="#8a6a3a" /> },
            { wordId: "jal", label: "Knotted", art: <Item kind="flat" color="#c8b890" accent="#a89870" /> },
            { wordId: "balti", label: "Metal", art: <Item kind="cup" color="#a8b0b8" /> },
            { wordId: "chhata", label: "Black", art: <svg viewBox="0 0 80 90" aria-hidden="true"><path d="M8 46q32 -44 64 0Z" fill="#2a2a2e" /><path d="M40 46v30q0 8 -8 8" stroke="#6b4429" strokeWidth="4" fill="none" /></svg> },
          ],
          done: { native: "শাবাশ!", roman: "shabash!", english: "Well done!" },
        },
        memory: "gear",
      },
      {
        id: "fish",
        quest: { v: "Fish in the pond with Nana", hint: "The pond by the house." },
        at: { room: "uthon", hotspot: "pukur" },
        encounter: ["pukur", "mach"],
        lines: [{ who: "nana", text: "Quiet… the {{মাছ}} can hear you. Count every one that goes in the bucket.", gloss: "mach — fish. pukur — pond." }],
        game: {
          type: "count",
          npc: "nana",
          kicker: "Mini-game · পুকুর",
          title: "Count the fish into the bucket.",
          hint: "Tap a fish for each one Nana calls out, then drop them in.",
          unit: "fish",
          coin: fish,
          rounds: [
            { native: "এক! প্রথমটা!", roman: "ek! prothomta!", english: "One! The first one!", answer: 1, wordId: "ek" },
            { native: "দুই!", roman: "dui!", english: "Two!", answer: 2, wordId: "dui" },
            { native: "তিন — বড়টা!", roman: "tin — boro ta!", english: "Three — a big one!", answer: 3, wordId: "tin" },
            { native: "চার! আজ ভালো দিন।", roman: "char! aj bhalo din.", english: "Four! A good day.", answer: 4, wordId: "char" },
          ],
          done: { native: "চারটা মাছ!", roman: "charta mach!", english: "Four fish!" },
        },
        after: [
          { who: "guide", text: "Then the sky goes dark in about a minute. Wind bends the palms sideways, and warm, heavy {{বৃষ্টি}} comes down like a wall.", gloss: "brishti — rain. A kalboishakhi — an April storm." },
          { who: "nana", text: "Under the umbrella! …And wait. It'll pass. It always passes.", gloss: "Twenty minutes later: blue sky, steaming grass. Nana wants to go to the river." },
        ],
        culture: ["kalboishakhi"],
        memory: "fish",
        nudges: { "uthon:nana": [{ who: "nana", text: "The pond! Come, before the fish change their minds." }] },
      },
      {
        id: "ghat",
        quest: { v: "Go down to the river", hint: "Past the palms, to the landing." },
        at: { room: "ghat", hotspot: "majhi" },
        encounter: ["nodi", "nouka", "majhi"],
        lines: [
          { who: "nana", text: "Our {{নদী}}. It's a road, a shop, a bath and a school run. Everyone in this village has a {{নৌকা}}, or knows someone who does.", gloss: "nodi — river. nouka — boat." },
          { who: "guide", text: "The {{মাঝি}} — the boatman — pushes his long pole into the mud and looks at you.", gloss: "majhi — boatman." },
        ],
        culture: ["rivers"],
        nudges: { "uthon:nana": [{ who: "nana", text: "The storm's gone. To the river!" }] },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer the boatman", hint: "He's asking where you're going." },
      lines: [{ who: "majhi", text: "He leans on his pole, water dripping from his hat, and nods at the far bank." }],
      asker: "majhi",
      question: {
        native: "কোথায় যাবে?",
        roman: "kothay jabe?",
        english: "Where are you going?",
        choices: [
          { native: "ওপারে!", roman: "opare!", english: "To the other side!", right: true },
          { native: "মাছ!", roman: "mach!", english: "Fish!", reply: [{ who: "majhi", text: "Fish? This is a boat, not a pond! Where are you going?" }] },
          { native: "হ্যাঁ, খাব!", roman: "hyan, khabo!", english: "Yes, I'll eat!", reply: [{ who: "nana", text: "Ha! There's no food on the boat. Tell him where!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{ওপারে!}}", gloss: "“To the other side!” — opar, the far bank." },
        { who: "majhi", text: "{{ওঠো!}} Hold the side.", gloss: "otho — get in!" },
        { who: "guide", text: "The boat rocks, then glides. Halfway across, the boatman starts singing, and Nana joins in, badly." },
      ],
      encounter: ["opar", "brishti"],
      memory: "opar",
    },
    gates: [{ room: "uthon", hotspot: "ghat", until: "fish", line: { who: "nana", text: "Fish first! The river can wait.", gloss: "Nana waves his rod." } }],
    idle: {
      "uthon:nana": [{ who: "nana", text: "Four fish. Nanu will say they're too small. Nanu is always right." }],
      "uthon:pukur": [{ who: "guide", text: "Ripples where the fish were. A frog, very offended." }],
    },
    afterwards: {
      "ghat:majhi": [{ who: "majhi", text: "Come back tomorrow. I'll take you all the way to the bazaar." }],
      "uthon:nana": [{ who: "nana", text: "Tomorrow, the bazaar. I'm going to teach you how to choose an ilish. It's a serious business." }],
    },
    complete: {
      title: "The",
      em: "Village",
      text: "You fetched Nana's gear by ear, counted fish into the bucket, sat out an April storm — and told the boatman you were going to the other side.",
      quest: { v: "Cross the river", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Ghat />,
};

export default content;
