import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Table, Item, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { GB, Teapot } from "./art";

/* ENGLISH · Chapter Three — Sunday Roast. Nan's kitchen, Yorkshire puddings from scratch, and what the British mean by pudding. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const tinCard = card(<><rect x="8" y="46" width="64" height="28" rx="4" fill="#4a4a4e" />{[20, 40, 60].map((x) => <ellipse key={x} cx={x} cy={52} rx="8" ry="4" fill="#e8c860" />)}<path d="M20 38q-4 -10 2 -18M40 38q4 -10 -2 -18M60 38q-4 -10 2 -18" stroke="#c8c0b0" strokeWidth="3" fill="none" /></>);
const whiskCard = card(<><path d="M8 50h64q-4 30 -32 30T8 50Z" fill="#dfe8ee" /><ellipse cx="40" cy="50" rx="32" ry="8" fill="#f2e2b0" /><path d="M50 14l-14 36M44 12l-6 38M56 18l-20 32" stroke="#a8b0b8" strokeWidth="2" /></>);
const pourCard = card(<><rect x="8" y="56" width="64" height="22" rx="4" fill="#4a4a4e" />{[20, 40, 60].map((x) => <ellipse key={x} cx={x} cy={62} rx="8" ry="4" fill="#f2e2b0" />)}<path d="M50 20q-10 10 -10 36" stroke="#f2e2b0" strokeWidth="5" fill="none" /></>);
const doorCard = card(<><rect x="10" y="16" width="60" height="64" rx="6" fill="#4a4a4e" /><rect x="18" y="28" width="44" height="36" rx="4" fill="#f0a040" opacity="0.8" /><path d="M6 8l68 76M74 8l-68 76" stroke={GB.red} strokeWidth="6" /></>);
const riseCard = card(<>{[22, 40, 58].map((x) => <path key={x} d={`M${x - 12} 70q-2 -34 12 -40q14 6 12 40Z`} fill="#d8a050" />)}<rect x="6" y="68" width="68" height="10" rx="3" fill="#4a4a4e" /></>);

function Kitchen({ done }: { done: ReadonlySet<string> }) {
  const risen = done.has("puds");
  return (
    <Stage>
      <Walls tint="#efe6d4" floor="#8a6a4a" floorLine="#6a4a2e" shade="#d8ccb4" />
      <Window x={330} y={200} w={260} h={200} />
      <rect x={342} y={212} width="236" height="176" fill="#9ab0c0" />
      {Array.from({ length: 10 }, (_, i) => <line key={i} x1={350 + i * 24} y1={220} x2={344 + i * 24} y2={240} stroke="#dfe8ee" strokeWidth="1.5" />)}
      {/* the big old cooker: oven below, hob on top */}
      <rect x={900} y={FY - 230} width="320" height="230" rx="10" fill="#b8303a" />
      <rect x={890} y={FY - 244} width="340" height="20" rx="6" fill="#2a2a2e" />
      <rect x={930} y={FY - 190} width="120" height="150" rx="8" fill="#8a1a2a" />
      <rect x={1070} y={FY - 190} width="120" height="150" rx="8" fill="#8a1a2a" />
      <rect x={944} y={FY - 170} width="92" height="60" rx="4" fill={risen ? "#f0a040" : "#3a2a2a"} opacity="0.85" />
      {[960, 1060, 1160].map((x) => <rect key={x} x={x - 30} y={FY - 266} width="60" height="22" rx="4" fill="#8a8a8e" />)}
      <path d="M1040 470q-8 -18 4 -34M1170 470q8 -18 -4 -34" stroke="#f4ecdd" strokeWidth="6" fill="none" opacity="0.5" />
      <rect x={560} y={FY - 150} width="280" height="150" fill={WOOD} />
      <rect x={550} y={FY - 164} width="300" height="18" fill="#c8b890" />
      <Teapot x={620} y={FY - 164} s={0.7} color={GB.navy} />
      <Figure x={1300} y={FY} h={190} color="#2a1a12" flip />
      <Door x={40} open />
    </Stage>
  );
}

function Dining({ done }: { done: ReadonlySet<string> }) {
  const laid = done.has("table");
  return (
    <Stage>
      <Walls tint="#e2d8c4" floor="#6a4a32" floorLine="#4a2e1c" shade="#cfc2a8" />
      <PhotoFrame x={300} y={220} w={140} h={110} tint="#4a6a8a" two />
      {/* the dresser with the best plates */}
      <rect x={1180} y={FY - 400} width="300" height="400" fill={WOOD} />
      {[0, 1, 2].map((r) => <rect key={r} x={1192} y={FY - 390 + r * 80} width="276" height="10" fill="#4a2a1a" />)}
      {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={1216 + (i % 3) * 90 + 20} cy={FY - 350 + Math.floor(i / 3) * 80} r="22" fill="#f4f0e6" stroke="#2a5aa8" strokeWidth="3" />)}
      <Table x={500} w={600} cloth="#f4f0e6" />
      {laid && (
        <>
          <ellipse cx={800} cy={FY - 164} rx="70" ry="16" fill="#b8763a" />
          <path d={`M620 ${FY - 150}q20 -24 50 -16l14 16Z`} fill="#8a5a2a" />
          {[560, 900, 980].map((x) => <ellipse key={x} cx={x} cy={FY - 154} rx="30" ry="8" fill="#f4f0e6" />)}
          {[920, 950, 975].map((x) => <circle key={x} cx={x} cy={FY - 160} r="8" fill="#e8b860" />)}
          <path d={`M1040 ${FY - 150}q10 -30 30 -20v20Z`} fill="#8a5a2a" />
        </>
      )}
      <Figure x={440} y={FY} h={190} color="#2a1a12" pose="sit" />
      <Figure x={1140} y={FY} h={195} color="#3a2a24" pose="sit" flip />
      <Child x={720} y={FY - 30} h={100} color="#2a1a12" />
      <Door x={40} open />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "kitchen",
  speakers: {
    ellie: { name: "Ellie", glyph: "E", tone: "guest" },
  },
  rooms: {
    kitchen: {
      id: "kitchen",
      name: "Nan's kitchen",
      native: "the kitchen",
      art: (done) => <Kitchen done={done} />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "dining", x: 130, y: 560, label: "Dining room", kind: "exit", to: "dining" },
        { id: "window", x: 460, y: 300, label: "Rainy window", kind: "flavor", note: "It's raining. Grandad says it isn't raining, it's “just spitting.” It is definitely raining." },
        { id: "teapot", x: 620, y: 540, label: "Teapot", kind: "word", wordId: "cuppa" },
        { id: "oven", x: 990, y: 620, label: "The oven", kind: "quest" },
        { id: "hob", x: 1060, y: 490, label: "The hob", kind: "word", wordId: "hob" },
        { id: "nan", x: 1300, y: 560, label: "Nan", kind: "npc" },
      ],
    },
    dining: {
      id: "dining",
      name: "Dining room",
      native: "the dining room",
      art: (done) => <Dining done={done} />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "kitchen", x: 130, y: 560, label: "Kitchen", kind: "exit", to: "kitchen" },
        { id: "grandad", x: 440, y: 580, label: "Grandad", kind: "npc" },
        { id: "ellie", x: 720, y: 620, label: "Ellie", kind: "flavor", note: "Your cousin Ellie, ten, already sitting at the table with her knife and fork held upright, like a cartoon." },
        { id: "table", x: 800, y: 580, label: "The table", kind: "quest" },
        { id: "dresser", x: 1330, y: 460, label: "The best plates", kind: "flavor", note: "Blue-and-white plates that only come down on Sundays and at Christmas. One has a chip Nan has never forgiven Grandad for." },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Chapter Three · English",
      title: "Sunday",
      em: "Roast",
      text: "Sunday. The whole house has smelled of roast chicken since ten o'clock, the windows are steamed up, and Nan has been in the kitchen with the radio on since before anyone else was awake.",
    },
    introLines: [
      { who: "nan", text: "There you are, love! Wash your hands — you're on Yorkshire pudding duty.", gloss: "Nan, in an apron, at the hob." },
      { who: "guide", text: "Quest: help with Sunday dinner.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "roast",
        quest: { v: "Talk to Nan", hint: "By the cooker." },
        at: { room: "kitchen", hotspot: "nan" },
        encounter: ["roast", "hob", "veg"],
        lines: [
          { who: "nan", text: "Every Sunday since I was your age: a {{Sunday roast}}. Chicken's in, {{veg}} is on the {{hob}}.", gloss: "Veg — vegetables. Hob — stovetop." },
          { who: "nan", text: "First, go and help Grandad lay the table. He'll put the gravy in the wrong place.", gloss: "The dining room, through the door." },
        ],
        culture: ["sundayroast"],
      },
      {
        id: "table",
        quest: { v: "Lay the table with Grandad", hint: "In the dining room." },
        at: { room: "dining", hotspot: "grandad" },
        lines: [{ who: "grandad", text: "Right. Your Nan's bringing it all through. Take what she hands you and put it down — I'll say what's what.", gloss: "Grandad is reading the newspaper and helping at the same time. Mostly reading." }],
        game: {
          type: "fetch",
          npc: "grandad",
          kicker: "Mini-game · Laying the table",
          title: "Put down what Grandad names.",
          hint: "Listen for the British word.",
          asks: [
            { wordId: "gravy", native: "Gravy boat — in the middle, where I can reach it.", roman: "Gravy boat — in the middle, where I can reach it.", english: "The gravy jug — in the middle, near me." },
            { wordId: "roasties", native: "Roasties.", roman: "Roasties.", english: "Roast potatoes." },
            { wordId: "veg", native: "The veg.", roman: "The veg.", english: "The vegetables." },
            { wordId: "custard", native: "And the custard jug — for later.", roman: "And the custard jug — for later.", english: "And the custard jug — for dessert." },
          ],
          items: [
            { wordId: "gravy", label: "Brown, pours", art: <Item kind="cup" color="#8a5a2a" /> },
            { wordId: "roasties", label: "Golden, crispy", art: <Item kind="bowl" color="#f4f0e6" accent="#e8b860" /> },
            { wordId: "veg", label: "Green and orange", art: <Item kind="bowl" color="#f4f0e6" accent="#6a9a3a" /> },
            { wordId: "custard", label: "Yellow jug", art: <Item kind="cup" color="#f0d060" /> },
          ],
          done: { native: "Champion!", roman: "Champion!", english: "Excellent!" },
        },
        after: [{ who: "nan", text: "(From the kitchen:) Now — the Yorkshire puddings! Quick, the fat's nearly smoking!", gloss: "Back to the kitchen." }],
        memory: "table",
        nudges: { "kitchen:nan": [{ who: "nan", text: "Table first, love. Grandad needs supervising." }] },
      },
      {
        id: "puds",
        quest: { v: "Make Yorkshire puddings", hint: "At the oven in the kitchen." },
        at: { room: "kitchen", hotspot: "oven" },
        encounter: ["tin"],
        lines: [
          { who: "nan", text: "The fat in the {{tin}} has to be smoking hot. Batter in — quick. Then the golden rule.", gloss: "Tin — baking pan." },
          { who: "nan", text: "{{Never. Open. The oven door.}}", gloss: "She says it like a curse." },
        ],
        game: {
          type: "sequence",
          kicker: "Mini-game · Yorkshire puds",
          title: "Make Yorkshire puddings, in order.",
          hint: "Tap the steps in the order Nan said.",
          steps: [
            { native: "Heat the fat in the tin", roman: "Heat the fat in the tin", english: "heat the oil till it smokes", wordId: "tin", art: tinCard },
            { native: "Whisk the batter", roman: "Whisk the batter", english: "whisk eggs, flour and milk", art: whiskCard },
            { native: "Pour it in, quick", roman: "Pour it in, quick", english: "pour the batter into the hot tin", art: pourCard },
            { native: "Don't open the door!", roman: "Don't open the door!", english: "keep the oven shut", art: doorCard },
            { native: "Out they come", roman: "Out they come", english: "tall, golden, hollow", wordId: "yorkshirepud", art: riseCard },
          ],
          done: "They've puffed up taller than the tin, golden and crackling. Nan looks at them like proud grandchildren.",
        },
        culture: ["yorkshirepud"],
        memory: "puds",
      },
      {
        id: "dinner",
        quest: { v: "Sit down for Sunday dinner", hint: "The dining-room table." },
        at: { room: "dining", hotspot: "table" },
        encounter: ["stuffed"],
        lines: [
          { who: "grandad", text: "Gravy on everything. Everything. That's the law in this house.", gloss: "He means it. There is gravy on his peas." },
          { who: "ellie", text: "In Yorkshire, lunch is “dinner” and dinner is “tea.” So this is Sunday dinner, at lunchtime. Keep up.", gloss: "Ellie, your cousin, very helpfully." },
          { who: "guide", text: "Twenty minutes later you are {{stuffed}}. Completely. You couldn't eat another thing.", gloss: "Stuffed — totally full." },
        ],
        culture: ["tea3"],
        nudges: { "kitchen:nan": [{ who: "nan", text: "It's on the table! Go and sit down before it gets cold." }] },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Nan", hint: "She's carrying something from the kitchen." },
      lines: [{ who: "nan", text: "Nan comes in carrying a steaming dish and the custard jug, and looks around the table." }],
      asker: "nan",
      question: {
        native: "Right! Who's for pudding?",
        roman: "Right! Who's for pudding?",
        english: "OK! Who wants dessert?",
        choices: [
          { native: "Me, please!", roman: "Me, please!", english: "Me, please!", right: true },
          { native: "Isn't pudding a snack cup?", roman: "Isn't pudding a snack cup?", english: "Isn't pudding a snack cup?", reply: [{ who: "nan", text: "A snack cup?! Pudding is DESSERT, love. This is sticky toffee pudding. With custard." }] },
          { native: "Another Yorkshire pudding?", roman: "Another Yorkshire pudding?", english: "Another Yorkshire pudding?", reply: [{ who: "ellie", text: "No! That was DINNER. Pudding means dessert. Obviously." }] },
        ],
      },
      right: [
        { who: "you", text: "{{Me, please!}}", gloss: "You're stuffed. It doesn't matter. There's always room for pudding." },
        { who: "nan", text: "Sticky toffee pudding and {{custard}}. My mother's recipe. Grandad, pass the jug.", gloss: "Custard — a warm, sweet vanilla sauce." },
        { who: "grandad", text: "Best day of the week, Sunday.", gloss: "He's asleep in his armchair twenty minutes later." },
      ],
      encounter: ["pudding", "custard"],
      memory: "pudding",
    },
    gates: [{ room: "kitchen", hotspot: "dining", until: "roast", line: { who: "nan", text: "Come here first, love — I need you.", gloss: "Nan waves a wooden spoon." } }],
    idle: {
      "dining:grandad": [{ who: "grandad", text: "When I was a lad, we had a roast every Sunday and bread and dripping the rest of the week." }],
      "kitchen:oven": [{ who: "guide", text: "The oven's off. Nobody opened the door. Nan checked." }],
    },
    afterwards: {
      "kitchen:nan": [{ who: "nan", text: "Next week's Bonfire Night. I'll make parkin. Get your wellies ready." }],
      "dining:grandad": [{ who: "grandad", text: "Zzz… just resting my eyes…" }],
    },
    complete: {
      title: "Sunday",
      em: "Roast",
      text: "You laid the table with Grandad, made Yorkshire puddings without opening the door, ate Sunday dinner at lunchtime — and knew exactly what Nan meant by pudding.",
      quest: { v: "Have seconds of pudding", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Dining done={new Set(["table"])} />,
};

export default content;
