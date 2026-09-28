import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Clouds, Ground, Bunting, Candy, FY } from "../scenes";
import { Figure, Child, Palm } from "../../components/scenes/primitives";
import { BN, TinHouse, BananaPlant, Alpona, Mukhosh } from "./art";

/* BENGALI · Chapter Four — পহেলা বৈশাখ. The first day of the Bengali year: red and white, alpona, masks and sweets. */

const pot = (c: string): ReactNode => (
  <svg viewBox="0 0 80 90" aria-hidden="true">
    <path d="M20 40q-8 36 20 42q28 -6 20 -42Z" fill="#b8642f" />
    <ellipse cx="40" cy="40" rx="20" ry="6" fill={c} />
    <path d="M52 20l-8 22" stroke="#6b4429" strokeWidth="3" />
  </svg>
);

function Uthon({ done }: { done: ReadonlySet<string> }) {
  const painted = done.has("alpona");
  return (
    <Stage>
      <Sky id="bn4a" top="#f0b890" mid="#f4d8b0" bottom="#f8ecd8" />
      <Sun x={1300} y={260} r={56} color="#fbd890" />
      <Palm x={120} y={FY - 40} h={400} lean={20} color="#3f6a3a" />
      <TinHouse x={220} w={460} h={240} />
      <BananaPlant x={1420} h={300} />
      <Ground color="#c8a070" line="#a88050" kind="dirt" />
      {painted && <Alpona x={880} y={FY + 30} r={200} />}
      {/* breakfast on a mat: panta and fried ilish */}
      <rect x={300} y={FY - 10} width="300" height="20" fill="#d8b870" />
      {[360, 460, 540].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={FY - 12} rx="28" ry="8" fill="#c9cfd4" />
          <ellipse cx={x} cy={FY - 16} rx="18" ry="5" fill="#f4f4f0" />
        </g>
      ))}
      <Figure x={760} y={FY} h={190} color="#c8302a" />
      <Child x={1040} y={FY} h={116} color="#c8302a" flip />
      <Figure x={1180} y={FY} h={205} color="#2a1a12" flip />
    </Stage>
  );
}

function Mela({ done }: { done: ReadonlySet<string> }) {
  const passing = !done.has("procession");
  return (
    <Stage>
      <Sky id="bn4b" top="#8ac0e0" bottom="#f4e8d0" />
      <Sun x={200} y={110} r={44} color="#fbe0a0" />
      <Clouds seed={41} opacity={0.5} y={140} />
      <Ground color="#b8a080" line="#98805e" kind="dirt" />
      <Bunting y={100} sag={40} colors={["#c8302a", "#f4f0e6", "#e8b830", "#1f6a4a"]} n={28} />
      {/* the procession: giant masks on poles */}
      <Mukhosh x={320} y={passing ? 330 : 360} s={1.3} kind="owl" />
      <Mukhosh x={560} y={passing ? 300 : 340} s={1.2} kind="tiger" />
      <Mukhosh x={780} y={passing ? 340 : 360} s={1.1} kind="fish" />
      {[320, 560, 780].map((x) => <rect key={x} x={x - 4} y={380} width="8" height={FY - 560} fill="#6b4429" />)}
      {[260, 380, 500, 620, 740, 840].map((x, i) => <Figure key={x} x={x} y={FY} h={185 + (i % 3) * 10} color={i % 2 ? "#c8302a" : "#f4f0e6"} />)}
      {/* the dhol */}
      <ellipse cx={900} cy={FY - 90} rx="30" ry="40" fill="#b8642f" />
      {/* the sweet shop, red ledger on the counter */}
      <rect x={1020} y={FY - 300} width="480" height="300" fill="#f4e0c0" />
      <rect x={1040} y={FY - 160} width="440" height="20" fill="#8c6240" />
      <rect x={1060} y={FY - 260} width="400" height="40" fill="#c8302a" />
      <text x={1260} y={FY - 230} textAnchor="middle" fontFamily={BN} fontSize="28" fill="#f4f0e6">মিষ্টান্ন ভাণ্ডার</text>
      {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={1080 + i * 40} cy={FY - 176} r="14" fill={["#f4f0e6", "#e8b830", "#c86a4a"][i % 3]} />)}
      <rect x={1400} y={FY - 200} width="44" height="30" fill="#c8302a" />
      <Figure x={1260} y={FY} h={195} color="#2a1a12" />
    </Stage>
  );
}

const sweet = <Candy color="#f4f0e6" wrap="#e8b830" />;

const content: ChapterContent = {
  startRoom: "uthon",
  speakers: {
    rupa: { name: "Rupa", glyph: "রু", tone: "guest" },
    moyra: { name: "Rashid chacha", glyph: "র", tone: "guest" },
    neighbour: { name: "Old Majid saheb", glyph: "ম", tone: "guest" },
  },
  rooms: {
    uthon: {
      id: "uthon",
      name: "The courtyard at dawn",
      native: "উঠোন",
      art: (done) => <Uthon done={done} />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "breakfast", x: 450, y: 700, label: "Breakfast mat", kind: "word", wordId: "panta" },
        { id: "nanu", x: 760, y: 560, label: "Nanu", kind: "npc" },
        { id: "floor", x: 900, y: 740, label: "The bare floor", kind: "quest" },
        { id: "rupa", x: 1040, y: 620, label: "Rupa", kind: "npc" },
        { id: "mela", x: 1530, y: 560, label: "To the mela", kind: "exit", to: "mela" },
      ],
    },
    mela: {
      id: "mela",
      name: "The New Year fair",
      native: "মেলা",
      art: (done) => <Mela done={done} />,
      spawn: { left: 300, right: 1100 },
      hotspots: [
        { id: "uthon", x: 70, y: 560, label: "Back home", kind: "exit", to: "uthon" },
        { id: "procession", x: 560, y: 330, label: "The procession", kind: "quest" },
        { id: "dhol", x: 900, y: 640, label: "Drum", kind: "word", wordId: "dhol" },
        { id: "moyra", x: 1260, y: 560, label: "The sweet shop", kind: "npc" },
        { id: "neighbour", x: 1450, y: 560, label: "An old man in white", kind: "npc", after: "sweets" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "চতুর্থ অধ্যায় · Bengali",
      title: "Pohela",
      em: "Boishakh",
      text: "April 14th — the first morning of the Bengali year. Everyone is up before the sun, dressed in red and white. Somewhere, a flute is playing.",
    },
    introLines: [
      { who: "nanu", text: "{{শুভ নববর্ষ, সোনা!}} Come — breakfast first. A special one.", gloss: "shubho noboborsho — Happy New Year!" },
      { who: "guide", text: "Quest: welcome in the new year.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "panta",
        quest: { v: "Have breakfast with Nanu", hint: "She's in the courtyard." },
        at: { room: "uthon", hotspot: "nanu" },
        encounter: ["pohela", "panta"],
        lines: [
          { who: "nanu", text: "On {{পহেলা বৈশাখ}}, we eat {{পান্তা ভাত}} — rice soaked in water overnight — with fried ilish, green chilli and onion.", gloss: "pohela boishakh — the first of Boishakh, New Year's Day. The ilish Nana chose at the bazaar." },
          { who: "nanu", text: "Then the floor. Every house paints an alpona for the new year. Rupa has the paints.", gloss: "Cold rice, hot fish. It shouldn't work. It really works." },
        ],
        culture: ["pohela"],
      },
      {
        id: "alpona",
        quest: { v: "Paint the alpona with Rupa", hint: "On the courtyard floor." },
        at: { room: "uthon", hotspot: "floor" },
        encounter: ["alpona"],
        lines: [{ who: "rupa", text: "An {{আলপনা}} — flower in the middle, petals all round. I paint, you pass me the colours. Fast!", gloss: "alpona — a painted floor pattern, for luck." }],
        game: {
          type: "fetch",
          npc: "rupa",
          kicker: "Mini-game · আলপনা",
          title: "Pass Rupa the colour she calls.",
          hint: "The pots aren't labelled. Listen.",
          asks: [
            { wordId: "sada", native: "সাদা — চালের গুঁড়ার রং।", roman: "sada — chaler gunrar rong.", english: "White — the rice-flour colour." },
            { wordId: "lal", native: "এবার লাল!", roman: "ebar lal!", english: "Now red!" },
            { wordId: "holud", native: "হলুদ দাও।", roman: "holud dao.", english: "Give me yellow." },
            { wordId: "sobuj", native: "আর সবুজ — পাতার জন্য।", roman: "ar sobuj — patar jonno.", english: "And green — for the leaves." },
          ],
          items: [
            { wordId: "sada", label: "", art: pot("#f4f0e6") },
            { wordId: "lal", label: "", art: pot("#c8302a") },
            { wordId: "holud", label: "", art: pot("#e8b830") },
            { wordId: "sobuj", label: "", art: pot("#1f6a4a") },
          ],
          done: { native: "কী সুন্দর!", roman: "ki shundor!", english: "How beautiful!" },
        },
        after: [{ who: "rupa", text: "The mela's starting! The procession's coming — the masks! {{চলো!}}", gloss: "cholo — let's go!" }],
        memory: "alpona",
        nudges: { "uthon:rupa": [{ who: "rupa", text: "The floor! Come paint!" }] },
      },
      {
        id: "procession",
        quest: { v: "Watch the procession", hint: "At the mela." },
        at: { room: "mela", hotspot: "procession" },
        encounter: ["mela", "mukhosh", "dhol"],
        lines: [
          { who: "guide", text: "Giant {{মুখোশ}} bob above the crowd on poles — an owl, a tiger, a fish taller than Nana. A {{ঢোল}} booms so loud you feel it in your chest.", gloss: "mukhosh — mask. dhol — drum." },
          { who: "nanu", text: "In Dhaka the procession is a mile long. Here, it's the whole village — so, about as long as the road.", gloss: "{{মেলা}} — mela, the fair." },
        ],
        culture: ["shobhajatra"],
        nudges: { "mela:moyra": [{ who: "moyra", text: "Watch the procession first! Then come for sweets." }] },
      },
      {
        id: "sweets",
        quest: { v: "Visit the sweet shop", hint: "The shop with the red ledger." },
        at: { room: "mela", hotspot: "moyra" },
        encounter: ["mishti"],
        lines: [
          { who: "moyra", text: "{{শুভ নববর্ষ!}} Today I open a new red ledger — the haalkhata — and everybody gets {{মিষ্টি}}. Help me fill the boxes.", gloss: "mishti — sweets. Rashid chacha, who runs the sweet shop." },
        ],
        game: {
          type: "count",
          npc: "moyra",
          kicker: "Mini-game · হালখাতা",
          title: "Fill the sweet boxes.",
          hint: "Tap sweets to count them into the box, then hand it over.",
          unit: "sweets",
          coin: sweet,
          rounds: [
            { native: "রুপার জন্য দুই।", roman: "rupar jonno dui.", english: "Two for Rupa.", answer: 2, wordId: "dui" },
            { native: "নানার জন্য চার।", roman: "nanar jonno char.", english: "Four for Nana.", answer: 4, wordId: "char" },
            { native: "নানুর জন্য পাঁচ।", roman: "nanur jonno panch.", english: "Five for Nanu.", answer: 5, wordId: "panch" },
            { native: "আর তোমার জন্য — দশ!", roman: "ar tomar jonno — dosh!", english: "And for you — ten!", answer: 10, wordId: "dosh" },
          ],
          done: { native: "মিষ্টিমুখ!", roman: "mishtimukh!", english: "A sweet start!" },
        },
        after: [{ who: "guide", text: "An old man in a white panjabi is making his way through the crowd towards you, beaming.", gloss: "Everyone in the village seems to know who you are." }],
        culture: ["haalkhata"],
        memory: "sweets",
      },
    ],
    ending: {
      at: { room: "mela", hotspot: "neighbour" },
      quest: { v: "Greet the old man", hint: "He's by the sweet shop." },
      lines: [{ who: "neighbour", text: "He puts both hands on your shoulders and smiles right into your face." }],
      asker: "neighbour",
      question: {
        native: "শুভ নববর্ষ!",
        roman: "shubho noboborsho!",
        english: "Happy New Year!",
        choices: [
          { native: "শুভ নববর্ষ!", roman: "shubho noboborsho!", english: "Happy New Year!", right: true },
          { native: "না, ধন্যবাদ!", roman: "na, dhonnobad!", english: "No, thank you!", reply: [{ who: "rupa", text: "“No thanks” to the NEW YEAR? Say it back!" }] },
          { native: "ওপারে!", roman: "opare!", english: "To the other side!", reply: [{ who: "neighbour", text: "Ha! No boats today, child. Happy New Year!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{শুভ নববর্ষ!}}", gloss: "“Happy New Year!” — the same words, right back." },
        { who: "neighbour", text: "{{বেঁচে থাকো!}} I carried your Nanu on my shoulders at the mela when she was your age.", gloss: "benche thako — “live long!” — a blessing." },
        { who: "nanu", text: "He did. He dropped me in the pond.", gloss: "Everybody laughs. The dhol starts up again." },
      ],
      encounter: ["shubho", "lal", "sada"],
      memory: "shubho",
    },
    gates: [{ room: "uthon", hotspot: "mela", until: "alpona", line: { who: "nanu", text: "The alpona first! The house has to be ready for the new year.", gloss: "Nanu points at the bare floor." } }],
    idle: {
      "uthon:nanu": [{ who: "nanu", text: "Red and white — for the new year. Red for life, white for peace. That's what my mother said." }],
      "uthon:rupa": [{ who: "rupa", text: "Our alpona is better than next door's. Don't tell them." }],
    },
    afterwards: {
      "uthon:nanu": [{ who: "nanu", text: "Tonight, on the mat, I'll tell you about Tuntuni. The smallest, cleverest bird in Bengal." }],
      "mela:moyra": [{ who: "moyra", text: "Come back next year! The ledger will be waiting." }],
    },
    complete: {
      title: "Pohela",
      em: "Boishakh",
      text: "You ate panta and ilish at dawn, painted the alpona by ear, watched the masks go by, filled the haalkhata sweet boxes — and wished the whole village শুভ নববর্ষ.",
      quest: { v: "Eat one more mishti", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Mela done={new Set()} />,
};

export default content;
