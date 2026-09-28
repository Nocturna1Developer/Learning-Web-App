import type { ChapterContent } from "../types";
import { Stage, Sky, Clouds, Ground, Coin, Item, Bunting, FY } from "../scenes";
import { Figure, Child } from "../../components/scenes/primitives";
import { GB, Terrace, Shopfront, PillarBox, PhoneBox } from "./art";

/* ENGLISH · Chapter Two — The High Street. Autumn in Nan's Yorkshire market town: queues, quid and the chippy. */

function HighStreet() {
  return (
    <Stage>
      <Sky id="en2a" top="#a8b8c8" mid="#c8d0d8" bottom="#e8e6e0" />
      <Clouds seed={71} opacity={0.8} y={120} color="#f4f4f4" />
      <Clouds seed={19} opacity={0.6} y={200} color="#e8e8ec" />
      <Shopfront x={-20} w={320} sign="GREENGROCER" color="#1f5a3a" />
      <Shopfront x={300} w={300} sign="NEWSAGENT" color={GB.navy} />
      <Terrace x={620} n={3} w={180} h={330} />
      <Shopfront x={1160} w={300} sign="BAKERY" color="#8a3a2a" />
      <Ground color="#9a9894" line="#7a7874" kind="stone" />
      <rect x="0" y={FY - 8} width="1600" height="12" fill="#b8b6b0" />
      <Bunting y={90} sag={30} colors={[GB.red, "#f4f0e6", GB.navy]} n={30} />
      {/* crates of veg outside the greengrocer's */}
      {["#6a9a3a", "#5a3a6a", "#c8a860", "#8ab04a"].map((c, i) => (
        <g key={c}>
          <rect x={30 + i * 64} y={FY - 60} width="58" height="60" fill="#8a6a44" />
          {Array.from({ length: 4 }, (_, k) => <ellipse key={k} cx={40 + i * 64 + k * 12} cy={FY - 64} rx="8" ry="6" fill={c} />)}
        </g>
      ))}
      {/* the queue, very orderly */}
      {[340, 390, 440].map((x, i) => <Figure key={x} x={x} y={FY} h={185 + (i % 2) * 12} color="#3a3440" />)}
      <PillarBox x={560} />
      <Figure x={900} y={FY} h={205} color="#2a1a12" />
      <path d="M872 568q28 -18 56 0q-14 -8 -28 -8t-28 8Z" fill="#5a5048" />
      <Child x={980} y={FY} h={112} color="#3a2a24" />
      <PhoneBox x={1510} />
    </Stage>
  );
}

function Chippy() {
  return (
    <Stage>
      <Sky id="en2b" top="#3a4a6a" mid="#8a7a8a" bottom="#e8a878" />
      <Terrace x={-40} n={3} w={190} h={330} lit />
      {/* the chippy: blue tiles, a steamy window, a queue out the door */}
      <rect x={560} y={FY - 380} width="520" height="380" fill="#dfe8ee" />
      {Array.from({ length: 13 * 9 }, (_, i) => <rect key={i} x={560 + (i % 13) * 40} y={FY - 380 + Math.floor(i / 13) * 42} width="38" height="40" fill="none" stroke="#a8c0d0" strokeWidth="1.5" />)}
      <rect x={560} y={FY - 430} width="520" height="54" fill={GB.navy} />
      <text x={820} y={FY - 394} textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="30" letterSpacing="4" fill="#f4ecdd">FISH &amp; CHIPS</text>
      <rect x={600} y={FY - 150} width="440" height="150" fill="#c9cfd4" />
      <rect x={600} y={FY - 170} width="440" height="24" fill="#8a8a90" />
      <rect x={620} y={FY - 330} width="400" height="150" fill="#ffe8b0" opacity="0.5" />
      <Figure x={820} y={FY - 150} h={170} color="#2a1a12" flip />
      <Terrace x={1100} n={3} w={180} h={320} lit />
      <Ground color="#6a6a70" line="#4a4a50" kind="stone" />
      <rect x="0" y={FY - 8} width="1600" height="12" fill="#8a8a90" />
      <Figure x={1180} y={FY} h={205} color="#2a1a12" />
      <Child x={1260} y={FY} h={112} color="#2a1a12" />
    </Stage>
  );
}

const pound = <Coin symbol="£" color="#d9a441" />;

const content: ChapterContent = {
  startRoom: "highstreet",
  speakers: {
    grocer: { name: "Mr Patel, the greengrocer", glyph: "P", tone: "guest" },
    chippy: { name: "Sandra at the chippy", glyph: "S", tone: "guest" },
  },
  rooms: {
    highstreet: {
      id: "highstreet",
      name: "The high street",
      native: "the high street",
      art: <HighStreet />,
      spawn: { left: 300, right: 1300 },
      hotspots: [
        { id: "greengrocer", x: 150, y: 600, label: "The greengrocer's", kind: "npc" },
        { id: "queue", x: 390, y: 560, label: "The queue", kind: "word", wordId: "queue" },
        { id: "postbox", x: 560, y: 620, label: "Pillar box", kind: "flavor", note: "A red pillar box with a crown on it. Grandad posts one letter a week, to the council, about the potholes." },
        { id: "grandad", x: 900, y: 560, label: "Grandad", kind: "npc" },
        { id: "pavement", x: 1100, y: 740, label: "The pavement", kind: "word", wordId: "pavement" },
        { id: "phonebox", x: 1510, y: 560, label: "Past the phone box, to the chippy", kind: "exit", to: "chippy" },
      ],
    },
    chippy: {
      id: "chippy",
      name: "The chippy",
      native: "the chippy",
      art: <Chippy />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "highstreet", x: 70, y: 560, label: "Back up the high street", kind: "exit", to: "highstreet" },
        { id: "terrace", x: 250, y: 500, label: "Terraced houses", kind: "flavor", note: "Red-brick terraced houses, every front door a different colour, every chimney smoking. Nan grew up in the blue door." },
        { id: "counter", x: 820, y: 560, label: "The counter", kind: "npc" },
        { id: "grandad", x: 1180, y: 560, label: "Grandad", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Chapter Two · English",
      title: "The High",
      em: "Street",
      text: "October. Mum's work has brought the whole family to England for the autumn, and you're staying with Nan and Grandad in their little Yorkshire market town. It's drizzling. It is, apparently, always drizzling.",
    },
    introLines: [
      { who: "grandad", text: "Right then. Coat on — we're off down the {{high street}}. Your Nan's given me a list as long as my arm.", gloss: "Grandad, in a flat cap. High street — main street." },
      { who: "guide", text: "Quest: help Grandad with the shopping.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "grandad",
        quest: { v: "Talk to Grandad", hint: "In the middle of the high street." },
        at: { room: "highstreet", hotspot: "grandad" },
        encounter: ["grandad", "highstreet", "pavement"],
        lines: [
          { who: "grandad", text: "Stay on the {{pavement}}, mind. The buses round here drive like they're late for their tea.", gloss: "Pavement — sidewalk." },
          { who: "grandad", text: "Greengrocer's first. Mr Patel. And we'll have to queue — it's Saturday.", gloss: "The green shop on the far left." },
        ],
        culture: ["highstreet"],
      },
      {
        id: "queue",
        quest: { v: "Join the queue at the greengrocer's", hint: "The green shop on the left." },
        at: { room: "highstreet", hotspot: "greengrocer" },
        encounter: ["queue", "greengrocer"],
        lines: [
          { who: "grandad", text: "Back of the {{queue}}, love. Never, ever push in. They'd never forget it.", gloss: "Queue — line. Queuing is taken very seriously." },
          { who: "grocer", text: "Morning, Ken! And this must be the American grandchild. Right — what's on the list?", gloss: "Mr Patel, the {{greengrocer}} — the produce seller." },
        ],
        culture: ["queue"],
        nudges: { "highstreet:grandad": [{ who: "grandad", text: "Greengrocer's! Before the queue gets longer." }] },
      },
      {
        id: "veg",
        quest: { v: "Buy the veg", hint: "Mr Patel is reading Nan's list." },
        at: { room: "highstreet", hotspot: "greengrocer" },
        lines: [{ who: "grocer", text: "I'll read, you pick. Nothing's labelled — use your ears.", gloss: "None of these are called what you'd call them." }],
        game: {
          type: "fetch",
          npc: "grocer",
          kicker: "Mini-game · The greengrocer's",
          title: "Pick what he reads out.",
          hint: "The British name, not the American one. Listen.",
          asks: [
            { wordId: "courgette", native: "Two courgettes.", roman: "Two courgettes.", english: "Two zucchini." },
            { wordId: "aubergine", native: "An aubergine.", roman: "An aubergine.", english: "An eggplant." },
            { wordId: "swede", native: "One swede — for the stew.", roman: "One swede — for the stew.", english: "One rutabaga — for the stew." },
            { wordId: "springonions", native: "And a bunch of spring onions.", roman: "And a bunch of spring onions.", english: "And a bunch of scallions." },
          ],
          items: [
            { wordId: "courgette", label: "Long, green", art: <Item kind="long" color="#4a8a3a" /> },
            { wordId: "aubergine", label: "Purple", art: <Item kind="round" color="#5a3a6a" /> },
            { wordId: "swede", label: "Big, lumpy", art: <Item kind="round" color="#c8a860" accent="#9a6aa0" /> },
            { wordId: "springonions", label: "Thin, bunched", art: <Item kind="leaf" color="#8ab04a" /> },
          ],
          done: { native: "Spot on!", roman: "Spot on!", english: "Exactly right!" },
        },
        after: [{ who: "grocer", text: "That'll be… let me add it up. In {{quid}}, mind — not dollars!", gloss: "Quid — pounds, in money slang. The coins say £." }],
        memory: "veg",
      },
      {
        id: "pay",
        quest: { v: "Pay Mr Patel", hint: "Count out the pounds." },
        at: { room: "highstreet", hotspot: "greengrocer" },
        encounter: ["quid"],
        lines: [{ who: "grocer", text: "One thing at a time. Count them into my hand.", gloss: "Pound coins are thick and heavy. Grandad says they used to be paper." }],
        game: {
          type: "count",
          npc: "grocer",
          kicker: "Mini-game · Quid",
          title: "Count out what he asks for.",
          hint: "Tap coins to count them out, then hand them over.",
          unit: "pounds",
          coin: pound,
          rounds: [
            { native: "Spring onions — two quid.", roman: "Spring onions — two quid.", english: "Scallions: two pounds.", answer: 2, wordId: "quid" },
            { native: "Courgettes — three quid.", roman: "Courgettes — three quid.", english: "Zucchini: three pounds.", answer: 3 },
            { native: "Aubergine and swede — five quid.", roman: "Aubergine and swede — five quid.", english: "Eggplant and rutabaga: five pounds.", answer: 5 },
            { native: "And a tenner for the apples.", roman: "And a tenner for the apples.", english: "And ten pounds for the apples.", answer: 10 },
          ],
          done: { native: "Cheers, love!", roman: "Cheers, love!", english: "Thanks, sweetie!" },
        },
        after: [{ who: "grandad", text: "And now — the best bit. The {{chippy}}. Your Nan doesn't need to know.", gloss: "Chippy — the fish-and-chip shop. Past the red phone box." }],
        memory: "quid",
      },
    ],
    ending: {
      at: { room: "chippy", hotspot: "counter" },
      quest: { v: "Order at the chippy", hint: "Past the red phone box." },
      lines: [
        { who: "chippy", text: "Two fish and {{chips}}, open, salt and vinegar — I know what Ken has, I've known for thirty years.", gloss: "Chips — French fries. Open — eaten out of the paper, straight away." },
        { who: "chippy", text: "She wraps them in paper, hot enough to warm your hands through it, and looks at you." },
      ],
      asker: "chippy",
      question: {
        native: "Anything else, love?",
        roman: "Anything else, love?",
        english: "Anything else, sweetie?",
        choices: [
          { native: "That's everything, ta!", roman: "That's everything, ta!", english: "That's everything, thanks!", right: true },
          { native: "Can I get fries?", roman: "Can I get fries?", english: "Can I get fries?", reply: [{ who: "chippy", text: "Fries? Oh — chips! You've GOT chips, love. They're in your hand." }] },
          { native: "Two quid.", roman: "Two quid.", english: "Two pounds.", reply: [{ who: "grandad", text: "Ha! She's not asking what it costs. Anything else to eat?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{That's everything, ta!}}", gloss: "“Ta” — thanks. Short, friendly and very northern." },
        { who: "chippy", text: "Listen to that! “Ta!” Ken, they're a proper Yorkshire kid!", gloss: "Grandad looks extremely pleased with himself." },
        { who: "guide", text: "You eat them walking home up the hill in the drizzle, with a tiny wooden fork. It's the best meal you've ever had." },
      ],
      encounter: ["chippy", "chips", "ta"],
      memory: "ta",
    },
    gates: [{ room: "highstreet", hotspot: "phonebox", until: "pay", line: { who: "grandad", text: "Shopping first, then chips. That's the deal. Your Nan's orders.", gloss: "Grandad taps the list." } }],
    idle: {
      "highstreet:greengrocer": [{ who: "grocer", text: "See you Saturday, Ken! Bring the grandchild." }],
      "chippy:grandad": [{ who: "grandad", text: "Not a word to your Nan. She thinks we had soup." }],
    },
    afterwards: {
      "chippy:grandad": [{ who: "grandad", text: "Sunday, it's a roast. Your Nan's Yorkshire puddings. You've not lived till you've had one." }],
      "chippy:counter": [{ who: "chippy", text: "Ta-ra, love! Come back Friday!" }],
    },
    complete: {
      title: "The High",
      em: "Street",
      text: "You stayed on the pavement, joined the queue, bought courgettes and a swede by ear, paid in quid — and thanked the chippy lady the Yorkshire way.",
      quest: { v: "Eat your chips in the drizzle", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <HighStreet />,
};

export default content;
