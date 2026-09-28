import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Table, Item, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { Icon } from "../kit";

/* BENGALI · Chapter One — পিঠা. Nanu has flown from Dhaka to Queens, and her suitcase smells of date-palm jaggery. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const mixCard = card(<><path d="M6 46h68q-4 32 -34 32T6 46Z" fill="#c9cfd4" /><ellipse cx="40" cy="46" rx="34" ry="8" fill="#f4f0e6" /><path d="M30 40q10 -8 20 0" stroke="#d8d0c0" strokeWidth="3" fill="none" /></>);
const bowlCard = card(<><path d="M20 50h40l-6 22h-28Z" fill="#a8b0b8" /><ellipse cx="40" cy="50" rx="20" ry="5" fill="#f4f0e6" /></>);
const fillCard = card(<><path d="M20 50h40l-6 22h-28Z" fill="#a8b0b8" /><ellipse cx="40" cy="50" rx="20" ry="5" fill="#f4f0e6" /><ellipse cx="40" cy="48" rx="8" ry="3" fill="#6a3a1a" /><circle cx="32" cy="47" r="2" fill="#fff" /><circle cx="48" cy="48" r="2" fill="#fff" /></>);
const clothCard = card(<><path d="M14 64q26 -40 52 0Z" fill="#f4f0e6" stroke="#c8c0b0" /><path d="M20 58q20 -20 40 0" stroke="#c8302a" strokeWidth="2" fill="none" strokeDasharray="4 4" /></>);
const steamCard = card(<><rect x="14" y="54" width="52" height="26" rx="4" fill="#8a8a8e" /><ellipse cx="40" cy="54" rx="26" ry="6" fill="#6a6a6e" /><path d="M30 44q-6 -12 2 -24M48 44q6 -12 -2 -24" stroke="#f4ecdd" strokeWidth="4" fill="none" /></>);

function Boshar({ done }: { done: ReadonlySet<string> }) {
  const open = done.has("suitcase");
  return (
    <Stage>
      <Walls tint="#ece6da" />
      <Door x={40} open />
      <PhotoFrame x={300} y={240} w={120} h={140} tint="#1f6a4a" />
      <PhotoFrame x={450} y={270} w={150} h={110} tint="#c8302a" two />
      {/* the window: snow on a Queens street */}
      <rect x={668} y={208} width="284" height="224" fill="#f4efe4" />
      <rect x={680} y={220} width="260" height="200" fill="#c8d4e0" />
      <path d="M680 380h260v40h-260Z" fill="#f4f4f8" />
      {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={690 + ((i * 47) % 240)} cy={230 + ((i * 29) % 140)} r="3" fill="#fff" />)}
      <line x1="810" y1="220" x2="810" y2="420" stroke="#f4efe4" strokeWidth="8" />
      <rect x={1180} y={FY - 150} width="190" height="150" rx="12" fill="#1f6a4a" />
      <rect x={1190} y={FY - 140} width="170" height="130" rx="8" fill="none" stroke="#154a34" strokeWidth="3" />
      {open && (
        <>
          <path d={`M1180 ${FY - 150}l30 -80h130l30 80`} fill="#2a7a5a" />
          <rect x={1210} y={FY - 190} width="44" height="40" rx="4" fill="#6a3a1a" />
          <path d={`M1270 ${FY - 150}q30 -40 60 0`} fill="#c8302a" />
          <path d={`M1270 ${FY - 150}q30 -40 60 0`} fill="none" stroke="#e8b830" strokeWidth="3" strokeDasharray="4 4" />
        </>
      )}
      <Figure x={880} y={FY} h={190} color="#2a1a12" flip />
      <Figure x={620} y={FY} h={210} color="#3a2a24" />
      <Child x={560} y={FY} h={104} color="#3a2a24" />
      <Door x={1420} open />
    </Stage>
  );
}

function Ranna({ done }: { done: ReadonlySet<string> }) {
  const steamed = done.has("pitha");
  return (
    <Stage>
      <Walls tint="#f0e8d8" floor="#9a8a70" floorLine="#7a6a50" shade="#dcd0b8" />
      <Window x={380} y={200} w={280} h={210} />
      <rect x={80} y={FY - 400} width="200" height="400" rx="10" fill="#e8ecee" />
      <rect x={250} y={FY - 330} width="10" height="80" rx="4" fill="#a8b0b8" />
      <rect x={980} y={FY - 170} width="440" height="170" fill={WOOD} />
      <rect x={970} y={FY - 184} width="460" height="18" fill="#8a8078" />
      {/* the pot with a cloth-covered lid for steaming */}
      <rect x={1100} y={FY - 250} width="120" height="66" rx="8" fill="#8a8a8e" />
      <ellipse cx={1160} cy={FY - 250} rx="60" ry="10" fill="#6a6a6e" />
      <path d="M1130 480q-8 -18 4 -34M1180 480q8 -18 -4 -34" stroke="#f4ecdd" strokeWidth="6" fill="none" opacity="0.5" />
      <Table x={480} w={420} cloth="#f4f0e6" />
      <path d={`M480 ${FY - 150}h420`} stroke="#1f6a4a" strokeWidth="6" strokeDasharray="12 10" />
      {steamed && [560, 610, 660, 585, 635].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy={FY - 164 - (i > 2 ? 16 : 0)} rx="22" ry="14" fill="#f4f0e6" />
          <ellipse cx={x} cy={FY - 168 - (i > 2 ? 16 : 0)} rx="8" ry="4" fill="#6a3a1a" />
        </g>
      ))}
      {steamed && <path d={`M760 ${FY - 150}h26l-4 -30h-18Z`} fill="#c8a070" />}
      <Figure x={1300} y={FY} h={190} color="#2a1a12" flip />
      <Figure x={420} y={FY} h={210} color="#3a2a24" />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "boshar",
  rooms: {
    boshar: {
      id: "boshar",
      name: "Front room",
      native: "বসার ঘর",
      art: (done) => <Boshar done={done} />,
      spawn: { left: 300, right: 1300 },
      hotspots: [
        { id: "door", x: 130, y: 560, label: "Front door", kind: "word", wordId: "bari" },
        { id: "photos", x: 440, y: 320, label: "Family photos", kind: "word", wordId: "poribar" },
        { id: "abbu", x: 620, y: 560, label: "Abbu", kind: "word", wordId: "abbu" },
        { id: "window", x: 810, y: 320, label: "Snowy window", kind: "flavor", note: "Snow on the street in Queens. Nanu has never seen snow before tonight. She stood at this window for ten minutes before she took her coat off." },
        { id: "nanu", x: 880, y: 560, label: "Nanu", kind: "npc" },
        { id: "suitcase", x: 1275, y: 640, label: "Nanu's suitcase", kind: "quest" },
        { id: "ranna", x: 1510, y: 560, label: "Kitchen", kind: "exit", to: "ranna" },
      ],
    },
    ranna: {
      id: "ranna",
      name: "Kitchen",
      native: "রান্নাঘর",
      art: (done) => <Ranna done={done} />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "boshar", x: 70, y: 580, label: "Front room", kind: "exit", to: "boshar" },
        { id: "tap", x: 180, y: 480, label: "Fridge", kind: "word", wordId: "pani" },
        { id: "ammu", x: 420, y: 560, label: "Ammu", kind: "word", wordId: "ammu" },
        { id: "cha", x: 770, y: 570, label: "A cup of cha", kind: "flavor", note: "Milky, sweet cha, boiled with the tea leaves in the pan — the way it's made at every roadside stall in Bangladesh.", culture: "cha" },
        { id: "pot", x: 1160, y: 520, label: "The steaming pot", kind: "quest" },
        { id: "nanu", x: 1300, y: 560, label: "Nanu", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "প্রথম অধ্যায় · Bengali",
      title: "Nanu's",
      em: "Pitha",
      text: "January in Queens, and the first snow of the year. Abbu has just come back from the airport. Nanu is here — from Dhaka, for the whole winter — in a shawl and three cardigans.",
    },
    introLines: [
      { who: "nanu", text: "{{আমার সোনা!}} Come here, let me look at you!", gloss: "amar sona — my gold, my darling." },
      { who: "guide", text: "Bengali has been in this family longer than English has. You know more of it than you think.", gloss: "Listen for it." },
      { who: "guide", text: "Quest: welcome Nanu properly. Start by talking to her.", gloss: "Walk with ← → or A D. Press E near anything that glows. Or just click it." },
    ],
    beats: [
      {
        id: "salam",
        quest: { v: "Greet Nanu", hint: "She's by the window." },
        at: { room: "boshar", hotspot: "nanu" },
        encounter: ["nanu", "salam"],
        lines: [
          { who: "you", text: "{{আসসালামু আলাইকুম, নানু!}}", gloss: "“Peace be upon you, Nanu” — the greeting Ammu taught you. That's your {{সালাম}}." },
          { who: "nanu", text: "{{ওয়ালাইকুম আসসালাম!}} She holds your face in both hands. Now — my {{সুটকেস}}. I brought winter with me.", gloss: "“And peace be upon you.” Suitkes — suitcase." },
        ],
        culture: ["salam"],
        memory: "salam",
      },
      {
        id: "suitcase",
        quest: { v: "Open Nanu's suitcase", hint: "By the stairs." },
        at: { room: "boshar", hotspot: "suitcase" },
        encounter: ["suitcase", "chalergura", "gur"],
        lines: [
          { who: "guide", text: "Under the cardigans: a bag of {{চালের গুঁড়া}} and a dark, sticky block of {{গুড়}} wrapped in newspaper.", gloss: "chaler gunra — rice flour. gur — jaggery, palm sugar." },
          { who: "nanu", text: "Khejur gur — from the date palms. It only exists in winter. So in winter, we make {{পিঠা}}. To the kitchen!", gloss: "pitha — rice cakes." },
        ],
        culture: ["khejurgur"],
        nudges: { "boshar:nanu": [{ who: "nanu", text: "The suitcase, sona. The good things are inside." }] },
      },
      {
        id: "dough",
        quest: { v: "Help Nanu with the dough", hint: "In the kitchen." },
        at: { room: "ranna", hotspot: "nanu" },
        lines: [{ who: "nanu", text: "Bhapa pitha — steamed. My mother's way. Pass me what I ask for — {{তাড়াতাড়ি!}}", gloss: "taratari — quickly!" }],
        game: {
          type: "fetch",
          npc: "nanu",
          kicker: "Mini-game · পিঠা",
          title: "Pass Nanu what she asks for.",
          hint: "Nothing on the counter is labelled. Listen for the word.",
          asks: [
            { wordId: "chalergura", native: "চালের গুঁড়া দাও।", roman: "chaler gunra dao.", english: "Give me the rice flour." },
            { wordId: "pani", native: "একটু পানি।", roman: "ektu pani.", english: "A little water." },
            { wordId: "lobon", native: "এক চিমটি লবণ।", roman: "ek chimti lobon.", english: "A pinch of salt." },
            { wordId: "narkel", native: "আর নারকেল!", roman: "ar narkel!", english: "And the coconut!" },
          ],
          items: [
            { wordId: "chalergura", label: "White bag", art: <Item kind="bag" color="#f4f4f0" /> },
            { wordId: "pani", label: "Jug", art: Icon.jug },
            { wordId: "lobon", label: "Shaker", art: Icon.salt },
            { wordId: "narkel", label: "Hairy", art: <Item kind="round" color="#8a5a34" accent="#f4f0e6" /> },
          ],
          done: { native: "বাহ্!", roman: "bah!", english: "Wonderful!" },
        },
        after: [{ who: "nanu", text: "Now the {{ভাপ}} — the steam. Come to the pot.", gloss: "bhap — steam." }],
        memory: "dough",
        nudges: { "boshar:nanu": [{ who: "nanu", text: "{{রান্নাঘরে চলো!}} The pitha won't make itself.", gloss: "rannaghore cholo — to the kitchen!" }] },
      },
      {
        id: "pitha",
        quest: { v: "Steam the pitha", hint: "At the pot on the stove." },
        at: { room: "ranna", hotspot: "pot" },
        encounter: ["bhap"],
        lines: [{ who: "nanu", text: "Flour in the little bowl. Gur and coconut in the middle. More flour on top. Cover with a cloth. Into the steam. {{এবার তুমি!}}", gloss: "ebar tumi — now you!" }],
        game: {
          type: "sequence",
          kicker: "Mini-game · ভাপা পিঠা",
          title: "Make bhapa pitha, in order.",
          hint: "Tap the steps in the order Nanu showed you.",
          steps: [
            { native: "গুঁড়া মাখো", roman: "gunra makho", english: "dampen the rice flour", wordId: "chalergura", art: mixCard },
            { native: "বাটিতে দাও", roman: "batite dao", english: "press it into the little bowl", art: bowlCard },
            { native: "গুড় আর নারকেল", roman: "gur ar narkel", english: "jaggery and coconut in the middle", wordId: "gur", art: fillCard },
            { native: "কাপড়ে ঢাকো", roman: "kapore dhako", english: "wrap it in a cloth", art: clothCard },
            { native: "ভাপে দাও", roman: "bhape dao", english: "into the steam", wordId: "bhap", art: steamCard },
          ],
          done: "Two minutes later: a soft white cake with a melted, dark-gold middle. The whole kitchen smells of winter in Bangladesh.",
        },
        after: [{ who: "nanu", text: "In Dhaka, on winter mornings, there's a pitha stall on every corner. The steam in the cold air — you'd love it.", gloss: "She blows on one to cool it for you." }],
        culture: ["pitha"],
        memory: "pitha",
        nudges: { "ranna:nanu": [{ who: "nanu", text: "The pot, sona. The water's boiling." }] },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Nanu", hint: "She's holding out the plate." },
      lines: [{ who: "nanu", text: "You've finished the first one in three bites, with gur on your chin. Nanu is already holding out the plate." }],
      asker: "nanu",
      question: {
        native: "আরেকটা খাবে?",
        roman: "arekta khabe?",
        english: "Will you have another?",
        choices: [
          { native: "হ্যাঁ, খাব!", roman: "hyan, khabo!", english: "Yes, I will!", right: true },
          { native: "সালাম!", roman: "salam!", english: "Salam!", reply: [{ who: "nanu", text: "Salam again! Such manners. But — another pitha?" }] },
          { native: "পানি।", roman: "pani.", english: "Water.", reply: [{ who: "nanu", text: "Water? After pitha, we drink cha! Another one — yes or no?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{হ্যাঁ, খাব!}}", gloss: "“Yes, I will!”" },
        { who: "nanu", text: "{{লক্ষ্মী সোনা!}} Take two. You're too thin.", gloss: "lokkhi sona — good darling!" },
        { who: "guide", text: "Snow outside, steam inside, and a whole winter of pitha ahead." },
      ],
      encounter: ["haan", "pitha", "cha"],
      memory: "haan",
    },
    gates: [{ room: "boshar", hotspot: "ranna", until: "suitcase", line: { who: "nanu", text: "Wait — the suitcase first! I carried that gur halfway around the world.", gloss: "Nanu points at her suitcase." } }],
    idle: {
      "boshar:suitcase": [{ who: "guide", text: "The suitcase is empty, except for a smell of jaggery that will never leave it." }],
      "ranna:pot": [{ who: "guide", text: "The pot's still steaming. There's dough for about thirty more." }],
    },
    afterwards: {
      "ranna:nanu": [{ who: "nanu", text: "In April, you come to us. To the village. Nana will take you fishing — and he'll tell you the fish was bigger." }],
    },
    complete: {
      title: "Nanu's",
      em: "Pitha",
      text: "You gave Nanu your salam, unpacked rice flour and winter jaggery, made the dough by ear, steamed your first bhapa pitha — and said yes to another, in Bengali.",
      quest: { v: "Have cha with Nanu", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Ranna done={new Set(["pitha"])} />,
};

export default content;
