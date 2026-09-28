import type { ChapterContent } from "../types";
import { Stage, Sky, Stars, Moon, Ground, Bonfire, Firework, Item, Crowd, FY } from "../scenes";
import { Walls, Door, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { GB, Terrace, Wellies } from "./art";

/* ENGLISH · Chapter Four — Bonfire Night. November 5th: wellies, parkin, sparklers and a very old rhyme. */

function BackDoor() {
  return (
    <Stage>
      <Walls tint="#e6ddcc" floor="#7a6a5a" floorLine="#5a4a3a" shade="#d0c4ae" />
      {/* coat hooks crammed with coats, hats and scarves */}
      <rect x={220} y={240} width="460" height="14" fill={WOOD} />
      {[260, 340, 420, 500, 580, 640].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 254v150q16 20 32 0v-140`} fill={["#2a3a6a", "#b8303a", "#4a6a4a", "#8a6a44", "#3a3a3a", "#6a3a6a"][i]} />
          {i % 2 === 0 && <ellipse cx={x + 16} cy={250} rx="20" ry="16" fill={["#e8b830", "#b8303a", "#2a5aa8"][i / 2]} />}
        </g>
      ))}
      <Wellies x={260} color="#1f5a3a" />
      <Wellies x={360} color="#b8303a" />
      <Wellies x={460} color="#e8b830" />
      {/* Nan's cake tin on the side */}
      <rect x={820} y={FY - 150} width="300" height="150" fill={WOOD} />
      <rect x={880} y={FY - 200} width="100" height="50" rx="8" fill={GB.red} />
      <ellipse cx={930} cy={FY - 200} rx="50" ry="10" fill="#d8404a" />
      <Figure x={1200} y={FY} h={190} color="#2a1a12" flip />
      <Door x={1420} open />
    </Stage>
  );
}

function Park({ done }: { done: ReadonlySet<string> }) {
  const lit = done.has("bonfire");
  return (
    <Stage>
      <Sky id="en4" top="#060a1e" mid="#141a36" bottom="#2a2a44" />
      <Stars n={50} seed={55} maxY={360} />
      <Moon x={1400} y={120} r={34} />
      {lit && (
        <>
          <Firework x={420} y={180} r={80} color="#e8b830" />
          <Firework x={760} y={130} r={60} color="#d8404a" />
          <Firework x={1100} y={200} r={90} color="#6ab0e8" />
        </>
      )}
      <Terrace x={-40} n={4} w={180} h={260} y={FY - 150} lit />
      <Terrace x={1000} n={4} w={180} h={250} y={FY - 150} lit />
      <Ground color="#2a3424" line="#1a2418" kind="grass" />
      <Crowd x={800} n={8} spread={1100} seed={61} color="#140e14" y={FY - 30} scale={0.8} />
      {lit ? <Bonfire x={800} s={2.2} /> : <path d={`M680 ${FY}l120 -160l120 160Z`} fill="#4a3a28" />}
      {/* the toffee apple stall */}
      <rect x={1180} y={FY - 110} width="200" height="110" fill="#6b4429" />
      {[1210, 1250, 1290, 1330].map((x) => (
        <g key={x}>
          <circle cx={x} cy={FY - 124} r="14" fill="#b8202a" />
          <line x1={x} y1={FY - 138} x2={x} y2={FY - 160} stroke="#c8a870" strokeWidth="3" />
        </g>
      ))}
      <Figure x={520} y={FY} h={200} color="#0e0a10" />
      <Child x={600} y={FY} h={112} color="#0e0a10" />
    </Stage>
  );
}

const parkinCoin = (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <rect x="12" y="18" width="40" height="28" rx="4" fill="#6a3a1a" />
    <rect x="12" y="18" width="40" height="8" rx="4" fill="#8a4a22" />
    {[20, 32, 44].map((x) => <circle key={x} cx={x} cy={34} r="2" fill="#a86a3a" />)}
  </svg>
);

const content: ChapterContent = {
  startRoom: "backdoor",
  speakers: {
    ellie: { name: "Ellie", glyph: "E", tone: "guest" },
  },
  rooms: {
    backdoor: {
      id: "backdoor",
      name: "The back door",
      native: "the back door",
      art: <BackDoor />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "coats", x: 440, y: 320, label: "Coat hooks", kind: "word", wordId: "woollyhat" },
        { id: "wellies", x: 380, y: 700, label: "Wellies", kind: "word", wordId: "wellies" },
        { id: "tin", x: 930, y: 560, label: "Nan's cake tin", kind: "word", wordId: "parkin" },
        { id: "nan", x: 1200, y: 560, label: "Nan", kind: "npc" },
        { id: "park", x: 1510, y: 560, label: "Out to the park", kind: "exit", to: "park" },
      ],
    },
    park: {
      id: "park",
      name: "The park",
      native: "the park",
      art: (done) => <Park done={done} />,
      spawn: { left: 300, right: 1100 },
      hotspots: [
        { id: "backdoor", x: 70, y: 560, label: "Back home", kind: "exit", to: "backdoor" },
        { id: "grandad", x: 520, y: 560, label: "Grandad", kind: "npc" },
        { id: "bonfire", x: 800, y: 600, label: "The bonfire", kind: "quest" },
        { id: "toffee", x: 1280, y: 600, label: "Toffee apples", kind: "word", wordId: "toffeeapple" },
        { id: "sparkler", x: 600, y: 600, label: "Ellie, with sparklers", kind: "quest", after: "parkin" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Chapter Four · English",
      title: "Bonfire",
      em: "Night",
      text: "November the fifth. It's dark by half past four, it's freezing, and the whole town is heading to the park with torches, flasks and small children wrapped up like parcels.",
    },
    introLines: [
      { who: "nan", text: "You're not going out like that, love. It's nithering. Come here.", gloss: "Nithering — Yorkshire for absolutely freezing." },
      { who: "guide", text: "Quest: get to the bonfire — warm.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "wrap",
        quest: { v: "Get wrapped up with Nan", hint: "By the back door." },
        at: { room: "backdoor", hotspot: "nan" },
        encounter: ["bonfirenight"],
        lines: [{ who: "nan", text: "It's {{Bonfire Night}} — you'll be stood in a field for three hours. Pass me what I say.", gloss: "Bonfire Night — November 5th." }],
        game: {
          type: "fetch",
          npc: "nan",
          kicker: "Mini-game · Wrap up warm",
          title: "Pass Nan what she asks for.",
          hint: "British words for American things. Listen.",
          asks: [
            { wordId: "wellies", native: "Wellies on — the field's a bog.", roman: "Wellies on — the field's a bog.", english: "Rain boots on — the field's all mud." },
            { wordId: "woollyhat", native: "Your woolly hat.", roman: "Your woolly hat.", english: "Your beanie." },
            { wordId: "jumper", native: "Another jumper, over that one.", roman: "Another jumper, over that one.", english: "Another sweater, over that one." },
            { wordId: "parkin", native: "And carry the parkin — careful!", roman: "And carry the parkin — careful!", english: "And carry the ginger cake — careful!" },
          ],
          items: [
            { wordId: "wellies", label: "Rubber, tall", art: <svg viewBox="0 0 80 90" aria-hidden="true"><path d="M18 84v-60h22v44h12v16Z" fill="#1f5a3a" /><path d="M44 84v-50h16v36h10v14Z" fill="#1f5a3a" opacity="0.8" /></svg> },
            { wordId: "woollyhat", label: "Bobble on top", art: <svg viewBox="0 0 80 90" aria-hidden="true"><path d="M14 66q0 -40 26 -40t26 40Z" fill="#b8303a" /><rect x="12" y="60" width="56" height="14" rx="4" fill="#8a1a2a" /><circle cx="40" cy="22" r="8" fill="#f4f0e6" /></svg> },
            { wordId: "jumper", label: "Knitted", art: <svg viewBox="0 0 80 90" aria-hidden="true"><path d="M22 20h36l14 18l-10 6v40h-40v-40l-10 -6Z" fill="#2a3a6a" /><path d="M22 40h36M22 52h36" stroke="#1a2a5a" strokeWidth="3" /></svg> },
            { wordId: "parkin", label: "Sticky tin", art: <Item kind="box" color="#b8303a" accent="#6a3a1a" /> },
          ],
          done: { native: "There. Snug as a bug.", roman: "There. Snug as a bug.", english: "There. Nice and warm." },
        },
        culture: ["bonfirenight"],
        memory: "wrapped",
      },
      {
        id: "bonfire",
        quest: { v: "Find the bonfire", hint: "Out in the park." },
        at: { room: "park", hotspot: "bonfire" },
        encounter: ["bonfire", "fireworks"],
        lines: [
          { who: "guide", text: "A man with a torch touches it to the base. The {{bonfire}} goes up with a roar, taller than the houses. You can feel it on your face from thirty steps back.", gloss: "Then the first {{fireworks}} go up — BANG — and the whole park says “ooooh.”" },
          { who: "grandad", text: "Since 1605, this. A man called Guy Fawkes tried to blow up Parliament, got caught, and we've been lighting bonfires about it ever since.", gloss: "Grandad has a flask of tea and very strong opinions about the fireworks." },
        ],
        nudges: { "park:grandad": [{ who: "grandad", text: "The bonfire, love! They're lighting it!" }] },
      },
      {
        id: "parkin",
        quest: { v: "Share out Nan's parkin", hint: "Grandad has the tin." },
        at: { room: "park", hotspot: "grandad" },
        lines: [{ who: "grandad", text: "Your Nan's {{parkin}}. Sticky ginger cake — Bonfire Night isn't Bonfire Night without it. Hand it round — I'll say how many.", gloss: "Everybody you've met this month seems to be in this park." }],
        game: {
          type: "count",
          npc: "grandad",
          kicker: "Mini-game · Parkin",
          title: "Hand out the parkin.",
          hint: "Tap slices to count them out, then hand them over.",
          unit: "slices",
          coin: parkinCoin,
          rounds: [
            { native: "Two for Mr Patel.", roman: "Two for Mr Patel.", english: "Two for the greengrocer.", answer: 2 },
            { native: "Three for Sandra from the chippy.", roman: "Three for Sandra from the chippy.", english: "Three for the lady from the fish-and-chip shop.", answer: 3 },
            { native: "Five for Ellie's lot.", roman: "Five for Ellie's lot.", english: "Five for Ellie's family.", answer: 5 },
            { native: "And ten for the lads by the fire!", roman: "And ten for the lads by the fire!", english: "And ten for the boys by the fire!", answer: 10 },
          ],
          done: { native: "Every crumb gone. Champion!", roman: "Every crumb gone. Champion!", english: "All gone. Excellent!" },
        },
        after: [{ who: "ellie", text: "Oi! Come here — Grandad's got sparklers!", gloss: "Ellie, bouncing." }],
        culture: ["parkin"],
        memory: "parkin",
        nudges: { "park:bonfire": [{ who: "guide", text: "Grandad is waving the parkin tin at you." }] },
      },
      {
        id: "sparkler",
        quest: { v: "Write your name with a sparkler", hint: "With Ellie." },
        at: { room: "park", hotspot: "sparkler" },
        encounter: ["sparkler"],
        lines: [
          { who: "ellie", text: "Hold it out at arm's length. Gloves on! Now write your name — fast, before it goes out.", gloss: "A {{sparkler}} fizzes in your hand. Your name hangs in the air for a second, in light." },
          { who: "grandad", text: "Now then. Every child in Britain knows this one. I'll start — you finish it.", gloss: "Grandad clears his throat, very grandly." },
        ],
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Finish Grandad's rhyme", hint: "Every British child knows it." },
      lines: [{ who: "grandad", text: "“Remember, remember…”" }],
      asker: "grandad",
      question: {
        native: "Remember, remember…?",
        roman: "Remember, remember…?",
        english: "(Finish the rhyme!)",
        choices: [
          { native: "…the fifth of November!", roman: "…the fifth of November!", english: "…the fifth of November!", right: true },
          { native: "…the chippy on Friday!", roman: "…the chippy on Friday!", english: "…the chippy on Friday!", reply: [{ who: "ellie", text: "Ha! Close — but no. What's today's date?" }] },
          { native: "…go on, then!", roman: "…go on, then!", english: "…yes, please!", reply: [{ who: "grandad", text: "That's for cups of tea, love. Remember, remember…" }] },
        ],
      },
      right: [
        { who: "you", text: "{{…the fifth of November!}}", gloss: "The rhyme goes: “Remember, remember, the fifth of November — gunpowder, treason and plot.”" },
        { who: "grandad", text: "{{Gunpowder, treason and plot!}} Ha! That's my grandchild.", gloss: "The biggest firework of the night goes up, right on cue." },
        { who: "ellie", text: "He planned that. He definitely planned that.", gloss: "He didn't. He'll say he did, forever." },
      ],
      encounter: ["remember", "toffeeapple"],
      memory: "remember",
    },
    gates: [{ room: "backdoor", hotspot: "park", until: "wrap", line: { who: "nan", text: "Not out there dressed like THAT! Come here.", gloss: "Nan holds up a woolly hat." } }],
    idle: {
      "backdoor:nan": [{ who: "nan", text: "Bring me back a toffee apple. And don't let Grandad eat all the parkin." }],
      "park:bonfire": [{ who: "guide", text: "Your front is roasting and your back is frozen. That's how you know it's Bonfire Night." }],
    },
    afterwards: {
      "park:grandad": [{ who: "grandad", text: "Next month — the panto. Dick Whittington. Your Nan's already bought the tickets. And a very loud whistle." }],
      "park:sparkler": [{ who: "ellie", text: "Next year I'm writing my WHOLE name. Including the middle one." }],
    },
    complete: {
      title: "Bonfire",
      em: "Night",
      text: "You wrapped up in wellies and a woolly hat, watched the bonfire go up, shared Nan's parkin with half the town, wrote your name in sparkler light — and finished Grandad's rhyme.",
      quest: { v: "Eat a toffee apple", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Park done={new Set(["bonfire"])} />,
};

export default content;
