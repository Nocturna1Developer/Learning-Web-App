import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Ground, Stall, Crowd, Item, FY } from "../scenes";
import { Figure, Child } from "../../components/scenes/primitives";
import { AR, LV, StoneHouse, SoukArches, Sack } from "./art";

/* ARABIC · Chapter Two — السوق, The Souk. A summer morning in Teta's town in the mountains. */

function KaakRing({ x = 0, y = 0, r = 26 }: { x?: number; y?: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse rx={r} ry={r * 0.8} fill="none" stroke="#c8883e" strokeWidth={r * 0.42} />
      {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={Math.cos(i * 0.45) * r} cy={Math.sin(i * 0.45) * r * 0.8} r="1.6" fill="#f4ecdd" />)}
    </g>
  );
}

function Souk({ deeper = false }: { deeper?: boolean }) {
  return (
    <Stage>
      <Sky id={deeper ? "ar2b" : "ar2a"} top="#8ab8d8" bottom="#f2e8d4" />
      <Sun x={deeper ? 1420 : 180} y={100} r={40} color="#fbe6b0" />
      {deeper ? (
        <SoukArches h={480} />
      ) : (
        <>
          <StoneHouse x={-40} w={420} h={380} />
          <StoneHouse x={1180} w={460} h={360} shutter="#2d6a5a" />
          <rect x={380} y={FY - 420} width="800" height="420" fill={LV.stone} />
          <path d="M380 340h800" stroke="#5a7a3a" strokeWidth="26" strokeDasharray="30 12" />
        </>
      )}
      <Ground color="#b8a888" line="#98886a" kind="stone" />
      {deeper ? (
        <>
          {/* Abu Fadi's za'atar and spice sacks */}
          {[
            ["#6a7a3a", 180],
            ["#8a2a2a", 280],
            ["#c8883e", 380],
            ["#5a6a2a", 480],
          ].map(([c, x]) => (
            <g key={x as number}>
              <Sack x={x as number} y={FY} s={1.5} color="#c8a870" />
              <ellipse cx={x as number} cy={FY - 84} rx="30" ry="10" fill={c as string} />
            </g>
          ))}
          <rect x={260} y={FY - 330} width="200" height="44" fill="#3a2a1a" />
          <text x={360} y={FY - 298} textAnchor="middle" fontFamily={AR} fontSize="28" fill="#e8c25a">زعتر وبهارات</text>
          <Figure x={620} y={FY} h={205} color="#2a1a12" flip />
          {/* the juice stall, oranges piled high */}
          <rect x={860} y={FY - 150} width="220" height="150" fill="#3f7d55" />
          {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={880 + (i % 5) * 42} cy={FY - 164 - Math.floor(i / 5) * 26} r="16" fill="#f08a1c" />)}
          <Figure x={1280} y={FY} h={205} color="#2a1a12" flip />
          <Crowd x={1450} n={2} spread={160} seed={71} scale={0.9} />
        </>
      ) : (
        <>
          {/* Abu Samir's ka'ak cart */}
          <rect x={120} y={FY - 150} width="280" height="110" fill="#8a5a34" />
          <circle cx={170} cy={FY - 30} r="30" fill="#2a2a2a" />
          <circle cx={350} cy={FY - 30} r="30" fill="#2a2a2a" />
          {Array.from({ length: 8 }, (_, i) => <KaakRing key={i} x={160 + (i % 4) * 64} y={FY - 170 - Math.floor(i / 4) * 34} r={24} />)}
          <Figure x={450} y={FY} h={200} color="#3a2a24" flip />
          {/* Imm Khalil's vegetables */}
          <Stall x={620} w={360} colors={["#3f7d55", "#f4ecdd"]} goods={[{ color: "#c0392b", kind: "round" }, { color: "#5a8a3a", kind: "long" }, { color: "#f0a040", kind: "round" }, { color: "#6a3a5a", kind: "round" }]} />
          <Figure x={1020} y={FY} h={190} color="#2a1a12" pose="sit" flip />
          <Figure x={1200} y={FY} h={205} color="#2a1a12" />
          <Child x={1270} y={FY} h={116} color="#3a2a24" />
          <Crowd x={1460} n={2} spread={160} seed={43} scale={0.9} />
        </>
      )}
    </Stage>
  );
}

const kaakCoin = <svg viewBox="0 0 64 64" aria-hidden="true"><KaakRing x={32} y={32} r={20} /></svg>;

const content: ChapterContent = {
  startRoom: "souq",
  speakers: {
    abusamir: { name: "Abu Samir", glyph: "س", tone: "guest" },
    immkhalil: { name: "Imm Khalil", glyph: "خ", tone: "guest" },
    abufadi: { name: "Abu Fadi", glyph: "ف", tone: "guest" },
  },
  rooms: {
    souq: {
      id: "souq",
      name: "The square",
      native: "الساحة",
      art: <Souk />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "cart", x: 260, y: 560, label: "Ka‘ak cart", kind: "word", wordId: "kaak" },
        { id: "abusamir", x: 450, y: 560, label: "Abu Samir", kind: "npc" },
        { id: "veg", x: 800, y: 600, label: "Vegetables", kind: "word", wordId: "bandora" },
        { id: "immkhalil", x: 1020, y: 580, label: "Imm Khalil", kind: "npc" },
        { id: "teta", x: 1200, y: 560, label: "Teta", kind: "npc" },
        { id: "next", x: 1530, y: 580, label: "Into the souk", kind: "exit", to: "attarin" },
      ],
    },
    attarin: {
      id: "attarin",
      name: "The covered souk",
      native: "السوق",
      art: <Souk deeper />,
      spawn: { left: 240, right: 1200 },
      hotspots: [
        { id: "back", x: 70, y: 580, label: "Back", kind: "exit", to: "souq" },
        { id: "sacks", x: 330, y: 620, label: "Za‘tar sacks", kind: "npc" },
        { id: "juice", x: 970, y: 580, label: "Juice stall", kind: "flavor", note: "Oranges squeezed in a big iron press while you wait. The man adds a splash of rose water without asking. He's right to." },
        { id: "arches", x: 1150, y: 360, label: "Stone arches", kind: "word", wordId: "souq" },
        { id: "teta", x: 1280, y: 560, label: "Teta", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "الفصل الثاني · Arabic",
      title: "The",
      em: "Souk",
      text: "Summer. You've come with Teta and Jiddo to her town in the mountains. At eight in the morning the square already smells of sesame and hot bread.",
    },
    introLines: [
      { who: "teta", text: "{{يلا، عالسوق!}} Bring the basket.", gloss: "yalla, ‘as-sū’ — come on, to the souk!" },
      { who: "guide", text: "Quest: help Teta with her shopping.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "list",
        quest: { v: "Ask Teta what she needs", hint: "She's by the vegetable stall." },
        at: { room: "souq", hotspot: "teta" },
        encounter: ["souq"],
        lines: [
          { who: "teta", text: "First, {{كعك}} for everybody — from Abu Samir. Then vegetables from Imm Khalil. Then {{زعتر}}, inside the {{سوق}}.", gloss: "ka‘ak — sesame bread rings. za‘tar. sū’ — the souk." },
          { who: "teta", text: "Abu Samir sold me ka‘ak when I was your age. His father did, I mean. Go!", gloss: "The cart on the left." },
        ],
        culture: ["souq"],
      },
      {
        id: "kaak",
        quest: { v: "Buy ka‘ak from Abu Samir", hint: "The cart on the left." },
        at: { room: "souq", hotspot: "abusamir" },
        encounter: ["kaak"],
        lines: [{ who: "abusamir", text: "{{أهلا أهلا!}} Imm Nabil's grandchild! How many {{كعك}}? Tell me — no, I'll tell you. Count them out.", gloss: "Imm Nabil is Teta. Everyone here calls her that." }],
        game: {
          type: "count",
          npc: "abusamir",
          kicker: "Mini-game · الكعك",
          title: "Count out the ka‘ak.",
          hint: "Tap ka‘ak to count them out, then put them in the basket.",
          unit: "ka‘ak",
          coin: kaakCoin,
          rounds: [
            { native: "تنين لجدو.", roman: "tnēn la-jiddo.", english: "Two for Jiddo.", answer: 2, wordId: "tnen" },
            { native: "تلاتة لخالتو.", roman: "tlēte la-khālto.", english: "Three for Khalto.", answer: 3, wordId: "tlete" },
            { native: "خمسة للجيران.", roman: "khamse lal-jīrān.", english: "Five for the neighbours.", answer: 5, wordId: "khamse" },
            { native: "وعشرة للعيلة كلها!", roman: "w ‘ashra lal-‘ayle kella!", english: "And ten for the whole family!", answer: 10, wordId: "ashra" },
          ],
          done: { native: "برافو!", roman: "brāvo!", english: "Bravo!" },
        },
        after: [{ who: "abusamir", text: "He tears one open, shakes za‘tar inside, and hands it to you. {{صحتين!}}", gloss: "ṣaḥtēn — “double health” — enjoy!" }],
        culture: ["kaak"],
        memory: "counted",
        nudges: { "souq:teta": [{ who: "teta", text: "Abu Samir first. The ka‘ak." }] },
      },
      {
        id: "veg",
        quest: { v: "Buy vegetables from Imm Khalil", hint: "The stall in the middle." },
        at: { room: "souq", hotspot: "immkhalil" },
        lines: [{ who: "immkhalil", text: "{{تعا، تعا.}} Hold the bag, I'll tell you what goes in.", gloss: "ta‘a — come here." }],
        game: {
          type: "fetch",
          npc: "immkhalil",
          kicker: "Mini-game · الخضرة",
          title: "Put what she names in the bag.",
          hint: "Nothing on the stall is labelled. Listen.",
          asks: [
            { wordId: "bandora", native: "بندورة، كيلو.", roman: "bandōra, kīlo.", english: "Tomatoes, a kilo." },
            { wordId: "khyar", native: "خيار للسلطة.", roman: "khyār las-salata.", english: "Cucumbers for the salad." },
            { wordId: "mishmish", native: "مشمش، هلق طالع!", roman: "mishmish, halla’ ṭāle‘!", english: "Apricots — just in season!" },
            { wordId: "tiin", native: "وتين.", roman: "w tīn.", english: "And figs." },
          ],
          items: [
            { wordId: "bandora", label: "Red", art: <Item kind="round" color="#c0392b" /> },
            { wordId: "khyar", label: "Long", art: <Item kind="long" color="#5a8a3a" /> },
            { wordId: "mishmish", label: "Orange", art: <Item kind="round" color="#f0a040" /> },
            { wordId: "tiin", label: "Purple", art: <Item kind="round" color="#6a3a5a" /> },
          ],
          done: { native: "يسلمو هالإيدين!", roman: "yislamo hal-idēn!", english: "Bless these hands!" },
        },
        after: [
          { who: "immkhalil", text: "Here — an apricot, for you. Free.", gloss: "She holds it out." },
          { who: "teta", text: "(Say no first. {{لا، تسلمي}} — no, bless you. She'll insist. Then you take it.)", gloss: "The polite refusal. Everyone knows the steps." },
          { who: "immkhalil", text: "No? {{ولو!}} Take it, take it!", gloss: "walaw! — of course, it's nothing! You take it." },
          { who: "teta", text: "Now za‘tar — inside the souk. Let me do the talking.", gloss: "Through the arch on the right." },
        ],
        culture: ["refusal"],
        nudges: { "souq:teta": [{ who: "teta", text: "Imm Khalil, the vegetables. {{روح.}}", gloss: "rūḥ — go." }] },
      },
      {
        id: "haggle",
        quest: { v: "Buy za‘tar with Teta", hint: "Inside the covered souk." },
        at: { room: "attarin", hotspot: "sacks" },
        encounter: ["addesh", "ghali"],
        lines: [
          { who: "teta", text: "{{قديش الزعتر؟}}", gloss: "addēsh az-za‘tar? — how much is the za‘tar?" },
          { who: "abufadi", text: "For you, Imm Nabil? The best in the mountains. Twelve a kilo.", gloss: "Abu Fadi, the spice man." },
          { who: "teta", text: "{{غالي كتير!}} Abu Fadi, I knew you when you were stealing sumac from your father's sacks.", gloss: "ghāli ktīr — much too expensive!" },
          { who: "abufadi", text: "…Ten. And a bag of sumac, for free. Please don't tell anyone that story.", gloss: "Teta wins. Teta always wins." },
        ],
        culture: ["zaatar"],
        memory: "haggle",
        nudges: {
          "attarin:teta": [{ who: "teta", text: "The za‘tar first. {{تعا.}}", gloss: "ta‘a — come." }],
          "souq:teta": [{ who: "teta", text: "Into the souk! The za‘tar." }],
        },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Abu Fadi", hint: "He's asking if you want anything else." },
      lines: [{ who: "abufadi", text: "He folds the paper bag shut, then leans over the sacks towards you." }],
      asker: "abufadi",
      question: {
        native: "في شي تاني؟",
        roman: "fī shi tēni?",
        english: "Anything else?",
        choices: [
          { native: "بس هيك، شكراً!", roman: "bass hēk, shukran!", english: "That's all, thank you!", right: true },
          { native: "عشرة", roman: "‘ashra", english: "ten", reply: [{ who: "abufadi", text: "Ten more kilos? Your Teta would carry them, too." }] },
          { native: "قديش؟", roman: "addēsh?", english: "how much?", reply: [{ who: "abufadi", text: "How much for what? I asked if you want anything else!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{بس هيك، شكراً!}}", gloss: "“That's all, thank you!”" },
        { who: "abufadi", text: "{{يا سلام!}} Imm Nabil, the grandchild speaks like one of us!", gloss: "yā salām! — wonderful!" },
        { who: "guide", text: "…Teta says “of course” as if she hadn't been practising with you on the plane." },
      ],
      encounter: ["shukran"],
      memory: "shukran",
    },
    idle: {
      "souq:abusamir": [{ who: "abusamir", text: "Come back tomorrow — the ka‘ak is hottest at seven." }],
      "souq:immkhalil": [{ who: "immkhalil", text: "Say hello to Jiddo. Tell him the figs are sweet this year." }],
      "attarin:teta": [{ who: "teta", text: "Everything's in the basket. Home — before it gets hot." }],
    },
    afterwards: {
      "attarin:teta": [{ who: "teta", text: "Next week is the feast. We'll need semolina. A lot of semolina." }],
      "attarin:sacks": [{ who: "abufadi", text: "Ten. Don't tell anyone." }],
    },
    complete: {
      title: "The",
      em: "Souk",
      text: "You counted out ka‘ak for the whole family, filled the bag by ear, learned the polite refusal, watched Teta bargain — and told Abu Fadi “bass hēk, shukran.”",
      quest: { v: "Eat your ka‘ak on the way home", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Souk />,
};

export default content;
