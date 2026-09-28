import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Clouds, Ground, Fence, Item, FY } from "../scenes";
import { Figure, Child } from "../../components/scenes/primitives";
import { DachaHouse, Birch, Jar, Samovar } from "./art";

/* RUSSIAN · Chapter Two — Дача. Summer at the family dacha: berries, pickling jars and an invitation into the forest. */

function Sad() {
  return (
    <Stage>
      <Sky id="ru2a" top="#7ab4dc" mid="#b8d8e8" bottom="#eef0e0" />
      <Sun x={1400} y={120} r={46} color="#fbe6b0" />
      <Clouds seed={17} opacity={0.6} y={150} />
      {/* the forest line behind */}
      {Array.from({ length: 22 }, (_, i) => <path key={i} d={`M${i * 76 - 20} 520l38 -${120 + (i % 3) * 30}l38 ${120 + (i % 3) * 30}Z`} fill={i % 2 ? "#2f5a3e" : "#27503a"} />)}
      <DachaHouse x={60} w={400} h={280} />
      <Ground color="#6a8a4a" line="#4a6a3a" kind="grass" />
      <Fence y={FY - 100} color="#8a7a5a" from={480} to={1600} />
      <Birch x={560} h={440} />
      <Birch x={1480} h={400} />
      {/* the greenhouse */}
      <path d="M1180 760v-150q90 -80 180 0v150Z" fill="#dfe8ee" opacity="0.6" stroke="#a8b0b8" strokeWidth="3" />
      {/* berry beds */}
      {[680, 820, 960].map((x, i) => (
        <g key={x}>
          <rect x={x} y={FY - 30} width="110" height="30" fill="#5a3a22" />
          {Array.from({ length: 6 }, (_, k) => <circle key={k} cx={x + 12 + k * 17} cy={FY - 40 - (k % 2) * 8} r="12" fill="#3f7d3a" />)}
          {Array.from({ length: 5 }, (_, k) => <circle key={`b${k}`} cx={x + 18 + k * 20} cy={FY - 36} r="5" fill={["#d8302a", "#e8508a", "#2a1a3a"][i]} />)}
        </g>
      ))}
      <Figure x={880} y={FY} h={200} color="#2a1a12" pose="reach" flip />
      <path d="M852 568q28 -16 56 0" fill="#e8d8b0" />
    </Stage>
  );
}

function Veranda({ done }: { done: ReadonlySet<string> }) {
  const sealed = done.has("jars");
  return (
    <Stage>
      <Sky id="ru2b" top="#e8b8a0" mid="#f0d0b0" bottom="#f4e8d0" />
      <Sun x={1300} y={460} r={40} color="#fbd890" />
      {Array.from({ length: 22 }, (_, i) => <path key={i} d={`M${i * 76 - 20} 560l38 -${110 + (i % 3) * 30}l38 ${110 + (i % 3) * 30}Z`} fill={i % 2 ? "#3a5a44" : "#34503e"} />)}
      <Ground color="#6a8a4a" line="#4a6a3a" kind="grass" />
      {/* the veranda floor and posts */}
      <rect x="0" y={FY - 30} width="1000" height="30" fill="#8a6a44" />
      {[20, 480, 960].map((x) => <rect key={x} x={x} y={FY - 420} width="24" height="390" fill="#e8e0d0" />)}
      <path d="M0 330h1000v-30h-1000Z" fill="#5a7aa8" />
      <rect x={200} y={FY - 170} width="560" height="18" fill="#8a5a34" />
      <rect x={220} y={FY - 152} width="14" height="122" fill="#6b4429" />
      <rect x={726} y={FY - 152} width="14" height="122" fill="#6b4429" />
      {[300, 380, 460, 540].map((x, i) => <Jar key={x} x={x} y={FY - 170} s={0.9} full={sealed || i < 1} />)}
      <Samovar x={660} y={FY - 170} s={0.7} />
      <Figure x={140} y={FY - 30} h={190} color="#2a1a12" pose="sit" />
      {/* the gate to the forest */}
      <rect x={1160} y={FY - 150} width="12" height="150" fill="#8a7a5a" />
      <rect x={1280} y={FY - 150} width="12" height="150" fill="#8a7a5a" />
      <Figure x={1080} y={FY} h={200} color="#2a1a12" flip />
      <Child x={860} y={FY - 30} h={110} color="#3a2a24" />
    </Stage>
  );
}

const cucumber = (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <rect x="8" y="24" width="48" height="18" rx="9" fill="#4f8a3a" transform="rotate(-20 32 33)" />
    {[18, 28, 38, 46].map((x) => <circle key={x} cx={x} cy={34 - (x - 32) * 0.36} r="1.6" fill="#b8d890" />)}
  </svg>
);

const content: ChapterContent = {
  startRoom: "sad",
  rooms: {
    sad: {
      id: "sad",
      name: "The garden",
      native: "сад",
      art: <Sad />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "house", x: 260, y: 540, label: "The dacha", kind: "word", wordId: "dacha" },
        { id: "birch", x: 560, y: 400, label: "Birch tree", kind: "flavor", note: "A birch — берёза. White bark with black marks, the tree in half the poems and songs of Russia. Dedushka planted this one the year Mama was born." },
        { id: "gryadki", x: 820, y: 700, label: "Berry beds", kind: "quest" },
        { id: "dedushka", x: 880, y: 560, label: "Dedushka", kind: "npc" },
        { id: "greenhouse", x: 1270, y: 660, label: "Greenhouse", kind: "word", wordId: "ogurtsy" },
        { id: "veranda", x: 1530, y: 580, label: "The veranda", kind: "exit", to: "veranda" },
      ],
    },
    veranda: {
      id: "veranda",
      name: "The veranda",
      native: "веранда",
      art: (done) => <Veranda done={done} />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "sad", x: 70, y: 560, label: "The garden", kind: "exit", to: "sad" },
        { id: "babushka", x: 140, y: 560, label: "Babushka", kind: "npc" },
        { id: "jars", x: 420, y: 560, label: "Pickling jars", kind: "quest" },
        { id: "sky", x: 1300, y: 420, label: "Evening sun", kind: "flavor", note: "It's almost eleven at night, and the sun has only just touched the treetops. In June, this far north, it barely gets dark at all.", culture: "whitenights" },
        { id: "dedushka", x: 1080, y: 560, label: "Dedushka", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Глава вторая · Russian",
      title: "The",
      em: "Dacha",
      text: "Summer. You've flown to St. Petersburg, and on the first weekend the whole family drove out to the dacha: a green wooden house, a garden, a greenhouse, and a forest right behind the fence.",
    },
    introLines: [
      { who: "dedushka", text: "{{А, вот и ты!}} Just in time. The strawberries won't pick themselves.", gloss: "“Ah, there you are!” Dedushka — grandpa — in a straw hat, in the berry beds." },
      { who: "guide", text: "Quest: help with the harvest.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "dedushka",
        quest: { v: "Talk to Dedushka", hint: "In the garden." },
        at: { room: "sad", hotspot: "dedushka" },
        encounter: ["dedushka", "dacha", "sad"],
        lines: [
          { who: "dedushka", text: "Welcome to our {{дача}}. I built that house myself — well, the left half. The right half fell down twice.", gloss: "dacha — a summer house outside the city." },
          { who: "dedushka", text: "Everything in this {{сад}} ends up in Babushka's jars. Come — I'll call, you pick.", gloss: "sad — garden." },
        ],
        culture: ["dacha"],
      },
      {
        id: "berries",
        quest: { v: "Pick with Dedushka", hint: "The berry beds." },
        at: { room: "sad", hotspot: "gryadki" },
        lines: [{ who: "dedushka", text: "Basket ready? Listen for the word.", gloss: "He's already eaten more than he's picked." }],
        game: {
          type: "fetch",
          npc: "dedushka",
          kicker: "Mini-game · Урожай",
          title: "Put what he names in the basket.",
          hint: "Nothing is labelled. Listen.",
          asks: [
            { wordId: "klubnika", native: "Клубника!", roman: "klubnika!", english: "Strawberries!" },
            { wordId: "malina", native: "Теперь малина.", roman: "teper' malina.", english: "Now raspberries." },
            { wordId: "smorodina", native: "Смородина, чёрная.", roman: "smorodina, chyornaya.", english: "Currants — the black ones." },
            { wordId: "ogurtsy", native: "И огурцы из теплицы!", roman: "i ogurtsy iz teplitsy!", english: "And cucumbers from the greenhouse!" },
          ],
          items: [
            { wordId: "klubnika", label: "Red", art: <Item kind="round" color="#d8302a" /> },
            { wordId: "malina", label: "Pink", art: <Item kind="round" color="#e8508a" /> },
            { wordId: "smorodina", label: "Tiny, dark", art: <Item kind="round" color="#2a1a3a" /> },
            { wordId: "ogurtsy", label: "Green", art: <Item kind="long" color="#4f8a3a" /> },
          ],
          done: { native: "Отлично!", roman: "otlichno!", english: "Excellent!" },
        },
        after: [{ who: "dedushka", text: "Take the cucumbers to Babushka on the veranda. She's been waiting with the jars since breakfast.", gloss: "The veranda, on the right." }],
        memory: "berries",
        nudges: { "sad:dedushka": [{ who: "dedushka", text: "The berry beds! Come on." }] },
      },
      {
        id: "jars",
        quest: { v: "Pickle the cucumbers with Babushka", hint: "On the veranda." },
        at: { room: "veranda", hotspot: "jars" },
        encounter: ["banka"],
        lines: [
          { who: "babushka", text: "Dill, garlic, a leaf of blackcurrant — and cucumbers. I'll say how many for each {{банка}}.", gloss: "banka — jar. Babushka's recipe is a family secret." },
        ],
        game: {
          type: "count",
          npc: "babushka",
          kicker: "Mini-game · Соленья",
          title: "Count the cucumbers into the jars.",
          hint: "Tap cucumbers to count them, then close the jar.",
          unit: "cucumbers",
          coin: cucumber,
          rounds: [
            { native: "Один — попробовать.", roman: "odin — poprobovat'.", english: "One — to taste.", answer: 1, wordId: "odin" },
            { native: "Два огурца сюда.", roman: "dva ogurtsa syuda.", english: "Two cucumbers here.", answer: 2, wordId: "dva" },
            { native: "Три огурца.", roman: "tri ogurtsa.", english: "Three cucumbers.", answer: 3, wordId: "tri" },
            { native: "И четыре — в большую банку.", roman: "i chetyre — v bol'shuyu banku.", english: "And four — in the big jar.", answer: 4, wordId: "chetyre" },
          ],
          done: { native: "Всё правильно!", roman: "vsyo pravil'no!", english: "All correct!" },
        },
        after: [{ who: "babushka", text: "In January, when there's snow up to the windows, you'll open one of these and taste this afternoon.", gloss: "She screws on the last lid." }],
        culture: ["pickling"],
        memory: "jars",
        nudges: {
          "veranda:babushka": [{ who: "babushka", text: "The cucumbers, солнышко! The jars are waiting." }],
          "veranda:dedushka": [{ who: "dedushka", text: "Help Babushka first. Then I have a question for you." }],
        },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Dedushka", hint: "He's at the gate to the forest." },
      lines: [{ who: "dedushka", text: "Dedushka comes up the steps with two wicker baskets and a small knife, looking very serious." }],
      asker: "dedushka",
      question: {
        native: "Завтра — за грибами. Хочешь пойти?",
        roman: "zavtra — za gribami. khochesh' poyti?",
        english: "Tomorrow — mushroom hunting. Want to come?",
        choices: [
          { native: "Хочу!", roman: "khochu!", english: "I want to!", right: true },
          { native: "Два огурца.", roman: "dva ogurtsa.", english: "Two cucumbers.", reply: [{ who: "dedushka", text: "The cucumbers are done! Mushrooms. Tomorrow. Yes?" }] },
          { native: "Пожалуйста.", roman: "pozhaluysta.", english: "Please.", reply: [{ who: "dedushka", text: "Please… what? Do you want to come or not?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{Хочу!}}", gloss: "“I want to!” — in Russian, you say yes with the verb." },
        { who: "dedushka", text: "{{Молодец.}} Up at six. And my secret spot stays secret — even from Babushka.", gloss: "Well done." },
        { who: "babushka", text: "I know where his secret spot is. Everybody knows.", gloss: "{{грибы}} — griby, mushrooms." },
      ],
      encounter: ["khochu", "griby"],
      memory: "khochu",
    },
    gates: [{ room: "sad", hotspot: "veranda", until: "berries", line: { who: "dedushka", text: "The picking first! Then the veranda.", gloss: "Dedushka holds up an empty basket." } }],
    idle: {
      "sad:dedushka": [{ who: "dedushka", text: "Next week, the potatoes. That's the hard work. Today is the easy work." }],
      "veranda:jars": [{ who: "guide", text: "Four jars in a row, dill pressed against the glass." }],
    },
    afterwards: {
      "veranda:babushka": [{ who: "babushka", text: "Saturday, the market in the city. You'll taste everything. They'll make you." }],
      "veranda:dedushka": [{ who: "dedushka", text: "Six o'clock. Wear boots." }],
    },
    complete: {
      title: "The",
      em: "Dacha",
      text: "You picked berries with Dedushka by ear, counted cucumbers into Babushka's pickling jars — and signed up for a dawn mushroom hunt, in Russian.",
      quest: { v: "Watch the sun not quite set", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Sad />,
};

export default content;
