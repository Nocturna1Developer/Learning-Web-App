import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, VideoCall, Table, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure } from "../../components/scenes/primitives";
import { Portrait } from "../kit";
import { Nouka, Mukhosh } from "./art";

/* BENGALI · Chapter Six — পরিবার. Home in Queens, a call to Bangladesh, and a goodbye that means “I'll come again.” */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const boatCard = card(<><rect y="54" width="80" height="36" fill="#5a8aa8" /><g transform="translate(40 60) scale(0.2)"><Nouka x={0} y={0} /></g></>);
const ilishCard = card(<g transform="translate(40 50)"><path d="M-30 0q28 -18 56 0q-28 18 -56 0Z" fill="#c8d0dc" /><path d="M24 0l12 -10v20Z" fill="#b8c0cc" /><circle cx="-20" cy="-2" r="2.5" fill="#2a1a12" /></g>);
const maskCard = card(<Mukhosh x={40} y={52} s={0.4} kind="owl" />);
const birdCard = card(<><rect width="80" height="90" fill="#141a36" /><path d="M40 88v-50" stroke="#4a6a3a" strokeWidth="3" /><ellipse cx="30" cy="54" rx="12" ry="6" fill="#5a8a44" /><ellipse cx="50" cy="46" rx="12" ry="6" fill="#5a8a44" /><g transform="translate(42 36)"><ellipse rx="8" ry="5" fill="#8ab04a" /><circle cx="7" cy="-4" r="4" fill="#c86a3a" /></g></>);

function Boshar({ done }: { done: ReadonlySet<string> }) {
  return (
    <Stage>
      <Walls />
      <Door x={40} />
      <Window x={330} y={210} w={280} h={220} />
      <PhotoFrame x={690} y={240} w={140} h={110} tint="#1f6a4a" two />
      {/* the owl mask from the procession, on the wall */}
      <Mukhosh x={960} y={300} s={0.45} kind="owl" />
      <Table x={560} w={460} />
      <VideoCall x={650} y={FY - 150 - 190} w={300} faces={done.has("call") ? 6 : 2} bgs={["#1f6a4a", "#c8302a", "#e8b830", "#2d6ab8"]} />
      <rect x={1100} y={FY - 140} width="360" height="140" rx="12" fill="#1f5a44" />
      <rect x={1100} y={FY - 200} width="360" height="74" rx="14" fill="#2a6a54" />
      <Figure x={1250} y={FY - 20} h={190} color="#2a1a12" pose="sit" />
      <Figure x={1400} y={FY} h={205} color="#3a2a24" flip />
    </Stage>
  );
}

function Ghor() {
  return (
    <Stage>
      <Walls tint="#e6e2d4" />
      <Window x={240} y={220} w={320} h={230} />
      {/* a red-and-white scarf from the new year, pinned up */}
      <path d="M660 260h200l-20 120h-160Z" fill="#f4f0e6" />
      <path d="M660 260h200v24h-200Z" fill="#c8302a" />
      <path d="M680 380v20M720 380v20M760 380v20M800 380v20M840 380v20" stroke="#c8302a" strokeWidth="4" />
      <rect x={880} y={FY - 170} width="300" height="170" rx="12" fill="#1f6a4a" />
      <path d={`M880 ${FY - 170} l40 -90 h220 l40 90`} fill="#2a7a5a" />
      <rect x={930} y={FY - 206} width="44" height="40" rx="4" fill="#6a3a1a" />
      <rect x={60} y={FY - 150} width="420" height="150" fill="#8c6240" />
      <rect x={60} y={FY - 126} width="420" height="60" fill="#c8302a" />
      <rect x={1240} y={FY - 420} width="240" height="420" fill={WOOD} />
      {[0, 1, 2, 3].map((r) => <rect key={r} x={1250} y={FY - 400 + r * 100} width="220" height="88" fill="#3a2718" />)}
      <Door x={1500} open />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "ghor",
  speakers: {
    mama: { name: "Mama", glyph: "মা", tone: "guest" },
    khala: { name: "Khala", glyph: "খা", tone: "guest" },
    rupa: { name: "Rupa", glyph: "রু", tone: "guest" },
  },
  rooms: {
    ghor: {
      id: "ghor",
      name: "Your room",
      native: "তোমার ঘর",
      art: <Ghor />,
      spawn: { left: 560, right: 1360 },
      hotspots: [
        { id: "window", x: 400, y: 460, label: "Window", kind: "word", wordId: "bari" },
        { id: "scarf", x: 760, y: 320, label: "Red-and-white scarf", kind: "word", wordId: "lal" },
        { id: "suitcase", x: 1030, y: 620, label: "Suitcase", kind: "quest" },
        { id: "boshar", x: 1540, y: 560, label: "Living room", kind: "exit", to: "boshar" },
      ],
    },
    boshar: {
      id: "boshar",
      name: "Living room",
      native: "বসার ঘর",
      art: (done) => <Boshar done={done} />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "back", x: 130, y: 560, label: "Your room", kind: "exit", to: "ghor" },
        { id: "photo", x: 760, y: 295, label: "New photo", kind: "word", wordId: "poribar" },
        { id: "mask", x: 960, y: 300, label: "Owl mask", kind: "word", wordId: "mukhosh" },
        { id: "laptop", x: 800, y: 520, label: "Video call", kind: "quest" },
        { id: "ammu", x: 1250, y: 560, label: "Ammu", kind: "npc" },
        { id: "abbu", x: 1400, y: 560, label: "Abbu", kind: "word", wordId: "abbu" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "ষষ্ঠ অধ্যায় · Bengali",
      title: "The",
      em: "Family",
      text: "Home in Queens. The subway rumbles past, the jet lag is winning, and your suitcase still smells of the river.",
    },
    introLines: [
      { who: "ammu", text: "Unpack, then come — Bangladesh is calling. Everyone's at Nanu's.", gloss: "Ammu, from the living room. It's already night there." },
      { who: "guide", text: "Quest: bring Bangladesh home.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "unpack",
        quest: { v: "Unpack your suitcase", hint: "In your room." },
        at: { room: "ghor", hotspot: "suitcase" },
        encounter: ["suitcase", "smriti"],
        lines: [
          { who: "guide", text: "A jar of Nanu's gur. A clay owl mask from the mela. The red-and-white scarf, still smelling of alpona paint.", gloss: "All in the {{সুটকেস}}." },
          { who: "guide", text: "Every one of them a {{স্মৃতি}}.", gloss: "smriti — a memory, a keepsake." },
          { who: "ammu", text: "{{ফোন এসেছে!}} Come, come!", gloss: "phon esheche — they're calling!" },
        ],
        memory: "keepsakes",
      },
      {
        id: "call",
        quest: { v: "Join the video call", hint: "In the living room." },
        at: { room: "boshar", hotspot: "laptop" },
        lines: [
          { who: "nanu", text: "{name}! {{আমার সোনা!}} Can you hear us? The whole family is here!", gloss: "Nanu, on the screen, surrounded." },
          { who: "mama", text: "Move over, Amma, let them see ME! I'm the favourite!", gloss: "Your Mama — Ammu's brother. Rupa's dad." },
          { who: "guide", text: "Six faces on one screen. Bengali has a different word for every aunt and uncle — and it depends which side they're on.", gloss: "Put everyone in their place." },
        ],
        game: {
          type: "place",
          board: "album",
          kicker: "Mini-game · পরিবার",
          title: "Who's who on the call?",
          hint: "Pick someone, then the word that fits. Is it Ammu's side, or Abbu's?",
          tray: "On the screen",
          done: "Everyone has the right word — and the right side of the family.",
          items: [
            { wordId: "mama", who: "Ammu's brother", hint: "Rupa's dad. Claims to be the favourite.", art: <Portrait />, tint: "#1f6a4a" },
            { wordId: "khala", who: "Ammu's sister", hint: "Painted the best alpona on the street.", art: <Portrait />, tint: "#c8302a" },
            { wordId: "chacha", who: "Abbu's brother", hint: "Calling in from Chittagong. Very loud.", art: <Portrait />, tint: "#2d6ab8" },
            { wordId: "fupu", who: "Abbu's sister", hint: "Sent a box of mishti for no reason.", art: <Portrait />, tint: "#e8b830" },
          ],
        },
        after: [{ who: "khala", text: "Now tell us everything. {{বাংলায়!}}", gloss: "banglay — in Bengali!" }],
        memory: "call",
        nudges: { "ghor:suitcase": [{ who: "guide", text: "The rest can wait. They're calling." }] },
      },
      {
        id: "retell",
        quest: { v: "Tell them about your trip", hint: "On the call." },
        at: { room: "boshar", hotspot: "laptop" },
        lines: [{ who: "guide", text: "Tell it in order — the way it happened.", gloss: "Everything you did, in Bengali." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · স্মৃতি",
          title: "Tell your trip in order.",
          hint: "From the first boat to the last story.",
          steps: [
            { native: "নদীতে নৌকা", roman: "nodite nouka", english: "a boat on the river", wordId: "nouka", art: boatCard },
            { native: "বাজারে ইলিশ", roman: "bajare ilish", english: "ilish at the bazaar", wordId: "ilish", art: ilishCard },
            { native: "মেলায় মুখোশ", roman: "melay mukhosh", english: "masks at the mela", wordId: "mela", art: maskCard },
            { native: "টুনটুনির গল্প", roman: "tuntunir golpo", english: "the story of Tuntuni", wordId: "tuntuni", art: birdCard },
          ],
          done: "The whole trip, in Bengali. Nana, somewhere off-screen, says the fish was bigger than that.",
        },
        memory: "retold",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Rupa", hint: "She's pushed everyone out of the way." },
      lines: [{ who: "rupa", text: "Rupa grabs the phone and carries it out to the courtyard, where it's quiet except for the frogs." }],
      asker: "rupa",
      question: {
        native: "আবার কবে আসবে?",
        roman: "abar kobe ashbe?",
        english: "When will you come again?",
        choices: [
          { native: "খুব তাড়াতাড়ি!", roman: "khub taratari!", english: "Very soon!", right: true },
          { native: "খুব চালাক!", roman: "khub chalak!", english: "Very clever!", reply: [{ who: "rupa", text: "Yes, yes, Tuntuni was clever. When are you COMING?" }] },
          { native: "না, ধন্যবাদ।", roman: "na, dhonnobad.", english: "No, thank you.", reply: [{ who: "mama", text: "(Off-screen:) “No thank you”? To us? Ha! Try again!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{খুব তাড়াতাড়ি!}}", gloss: "“Very soon!”" },
        { who: "rupa", text: "{{তোমার কথা মনে পড়বে।}}", gloss: "“I'll think of you” — the Bengali way of saying “I'll miss you.”" },
        { who: "you", text: "{{আমারও মনে পড়বে!}}", gloss: "“I'll miss you too!”" },
        { who: "nanu", text: "(Back on the screen:) We don't say goodbye in Bengali. We say {{আসি}} — “I'll come.” Because you will.", gloss: "ashi." },
        { who: "you", text: "{{আসি!}}", gloss: "“I'll come again!”" },
      ],
      encounter: ["taratari", "monepore", "ashi"],
      memory: "ashi",
    },
    idle: {
      "boshar:ammu": [{ who: "ammu", text: "Go on — Nanu's been holding that phone since after dinner." }],
      "ghor:suitcase": [{ who: "guide", text: "Everything's out. The mask goes on the living-room wall." }],
    },
    afterwards: {
      "boshar:ammu": [{ who: "ammu", text: "The whole call in Bengali. Nanu is going to tell the entire village by morning." }],
      "boshar:laptop": [{ who: "guide", text: "The call's over. In the village it's nearly midnight, and the frogs are still going." }],
    },
    complete: {
      title: "The",
      em: "Family",
      text: "Keepsakes unpacked, mama, khala, chacha and fupu all on the right side of the family, your whole trip retold in Bengali — and a goodbye that promises you'll come again.",
      quest: { v: "Hang the mask on the wall", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Boshar done={new Set(["call"])} />,
};

export default content;
