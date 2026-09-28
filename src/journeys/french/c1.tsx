import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Table, Item, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { Icon } from "../kit";

/* FRENCH · Chapter One — Le Goûter. Mamie has flown in from Lyon, and it's four o'clock. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const mixCard = card(<><path d="M6 46h68q-4 32 -34 32T6 46Z" fill="#dfe8ee" /><ellipse cx="40" cy="46" rx="34" ry="8" fill="#f2e2b0" /><path d="M52 20l-10 30" stroke="#8a8a8e" strokeWidth="4" /><path d="M36 44q6 -8 12 0" stroke="#8a8a8e" strokeWidth="2" fill="none" /></>);
const pourCard = card(<><ellipse cx="40" cy="66" rx="30" ry="8" fill="#2a2a2e" /><rect x="68" y="62" width="12" height="6" fill="#2a2a2e" /><path d="M30 20q10 6 10 30" stroke="#f2e2b0" strokeWidth="6" fill="none" /><ellipse cx="40" cy="62" rx="16" ry="4" fill="#f2e2b0" /></>);
const flipCard = card(<><ellipse cx="40" cy="74" rx="30" ry="8" fill="#2a2a2e" /><ellipse cx="40" cy="30" rx="24" ry="8" fill="#e8c070" transform="rotate(-18 40 30)" /><path d="M20 58q-10 -20 6 -34M60 58q10 -20 -6 -34" stroke="#c8c0b0" strokeWidth="2" fill="none" strokeDasharray="3 4" /></>);
const jamCard = card(<><circle cx="40" cy="52" r="28" fill="#e8c070" /><circle cx="40" cy="52" r="16" fill="#b8253f" opacity="0.85" /></>);
const foldCard = card(<><path d="M14 70L40 22L66 70Z" fill="#e8c070" /><path d="M40 22L40 70" stroke="#c89a50" strokeWidth="2" /><circle cx="44" cy="58" r="3" fill="#b8253f" /></>);

function Entree({ done }: { done: ReadonlySet<string> }) {
  const open = done.has("valise");
  return (
    <Stage>
      <Walls tint="#ece6da" />
      <Door x={40} open />
      <PhotoFrame x={300} y={240} w={120} h={140} tint="#3a5a9a" />
      <PhotoFrame x={450} y={270} w={150} h={110} tint="#b8452f" two />
      <Window x={680} y={220} w={260} h={200} />
      {/* coat hooks with Mamie's scarf */}
      <rect x={1000} y={250} width="200" height="14" fill={WOOD} />
      <path d="M1040 264v120q10 20 20 0v-110" fill="#3a5a9a" />
      <path d="M1140 264q-20 60 10 140" stroke="#b8452f" strokeWidth="16" fill="none" />
      {/* Mamie's suitcase */}
      <rect x={1180} y={FY - 140} width="190" height="140" rx="12" fill="#3a5a9a" />
      <rect x={1190} y={FY - 130} width="170" height="120" rx="8" fill="none" stroke="#2a4a7a" strokeWidth="3" />
      {open && (
        <>
          <path d={`M1180 ${FY - 140}l30 -80h130l30 80`} fill="#4a6aa8" />
          <rect x={1210} y={FY - 170} width="36" height="44" rx="6" fill="#b8253f" />
          <rect x={1206} y={FY - 176} width="44" height="10" fill="#e8dcc8" />
          <ellipse cx={1300} cy={FY - 150} rx="36" ry="14" fill="#e87aa0" />
        </>
      )}
      <Figure x={880} y={FY} h={200} color="#2a1a12" flip />
      <Figure x={620} y={FY} h={210} color="#3a2a24" />
      <Child x={560} y={FY} h={104} color="#3a2a24" />
      <Door x={1420} open />
    </Stage>
  );
}

function Cuisine({ done }: { done: ReadonlySet<string> }) {
  const cooked = done.has("crepes");
  return (
    <Stage>
      <Walls tint="#f2ead8" floor="#9a8a70" floorLine="#7a6a50" shade="#dcd0b8" />
      <Window x={380} y={200} w={280} h={210} />
      {/* fridge, cupboard, stove */}
      <rect x={80} y={FY - 400} width="200" height="400" rx="10" fill="#e8ecee" />
      <rect x={250} y={FY - 330} width="10" height="80" rx="4" fill="#a8b0b8" />
      <rect x={980} y={FY - 170} width="440" height="170" fill={WOOD} />
      <rect x={970} y={FY - 184} width="460" height="18" fill="#8a8078" />
      <rect x={1000} y={FY - 420} width="400" height="150" fill="#8c6240" />
      {[1010, 1210].map((x) => <rect key={x} x={x} y={FY - 410} width="180" height="130" fill="#7a5234" />)}
      <ellipse cx={1150} cy={FY - 192} rx="60" ry="10" fill="#2a2a2e" />
      <rect x={1210} y={FY - 196} width="50" height="8" fill="#2a2a2e" />
      {/* the goûter table */}
      <Table x={480} w={420} cloth="#f4f0e6" />
      <path d={`M480 ${FY - 150}h420`} stroke="#3a5a9a" strokeWidth="6" strokeDasharray="20 20" />
      {cooked && (
        <>
          {[0, 1, 2, 3].map((i) => <ellipse key={i} cx={620} cy={FY - 158 - i * 4} rx="44" ry="8" fill="#e8c070" stroke="#c89a50" />)}
          <rect x={700} y={FY - 190} width="34" height="40" rx="5" fill="#b8253f" />
          <path d={`M770 ${FY - 150}h24l-3 -40h-18Z`} fill="#f4f4f4" />
        </>
      )}
      <Figure x={1300} y={FY} h={200} color="#2a1a12" flip />
      <Figure x={420} y={FY} h={210} color="#3a2a24" />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "entree",
  rooms: {
    entree: {
      id: "entree",
      name: "Front hall",
      native: "l'entrée",
      art: (done) => <Entree done={done} />,
      spawn: { left: 300, right: 1300 },
      hotspots: [
        { id: "door", x: 130, y: 560, label: "Front door", kind: "word", wordId: "maison" },
        { id: "photos", x: 440, y: 320, label: "Family photos", kind: "word", wordId: "famille" },
        { id: "papa", x: 620, y: 560, label: "Papa", kind: "word", wordId: "papa" },
        { id: "mamie", x: 880, y: 560, label: "Mamie", kind: "npc" },
        { id: "scarf", x: 1100, y: 330, label: "Mamie's scarf", kind: "flavor", note: "A silk scarf, blue and red. Lyon was the silk capital of Europe for three hundred years; Mamie's grandmother wove silk on the Croix-Rousse hill." },
        { id: "valise", x: 1275, y: 640, label: "Mamie's suitcase", kind: "quest" },
        { id: "cuisine", x: 1510, y: 560, label: "Kitchen", kind: "exit", to: "cuisine" },
      ],
    },
    cuisine: {
      id: "cuisine",
      name: "Kitchen",
      native: "la cuisine",
      art: (done) => <Cuisine done={done} />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "fridge", x: 180, y: 480, label: "Fridge", kind: "word", wordId: "lait" },
        { id: "maman", x: 420, y: 560, label: "Maman", kind: "word", wordId: "maman" },
        { id: "table", x: 690, y: 560, label: "Goûter table", kind: "flavor", note: "Four o'clock, the table laid with a blue-striped cloth. In France this is le goûter — and nobody skips it.", culture: "gouter" },
        { id: "poele", x: 1150, y: 540, label: "The stove", kind: "quest" },
        { id: "mamie", x: 1300, y: 560, label: "Mamie", kind: "npc" },
        { id: "entree", x: 70, y: 580, label: "Front hall", kind: "exit", to: "entree" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Chapitre un · French",
      title: "Le",
      em: "Goûter",
      text: "Papa has just come back from the airport, and the front hall smells of somebody else's perfume and a long flight. Mamie is here — from Lyon, for a whole month.",
    },
    introLines: [
      { who: "mamie", text: "{{Bonjour, mon cœur !}} Come here, let me look at you!", gloss: "“Bonjour” — hello. “Mon cœur” — my heart, sweetheart." },
      { who: "guide", text: "French has been in this family longer than English has. You know more of it than you think.", gloss: "Listen for it." },
      { who: "guide", text: "Quest: welcome Mamie properly. Start by talking to her.", gloss: "Walk with ← → or A D. Press E near anything that glows. Or just click it." },
    ],
    beats: [
      {
        id: "bise",
        quest: { v: "Greet Mamie", hint: "She's in the middle of the hall." },
        at: { room: "entree", hotspot: "mamie" },
        encounter: ["mamie", "bonjour"],
        lines: [
          { who: "guide", text: "Mamie leans down. Left cheek, then right cheek. {{La bise.}}", gloss: "In Lyon it's two kisses. Somewhere else in France it would be three. Or four." },
          { who: "mamie", text: "{{Bonjour !}} Oh, you've grown. Now — help me with my {{valise}}. I brought presents.", gloss: "Valise — suitcase." },
        ],
        culture: ["bise"],
        memory: "bise",
      },
      {
        id: "valise",
        quest: { v: "Open Mamie's suitcase", hint: "By the stairs." },
        at: { room: "entree", hotspot: "valise" },
        encounter: ["valise", "confiture"],
        lines: [
          { who: "guide", text: "Under the clothes: three jars of apricot {{confiture}} from Mamie's garden, and a paper bag of something bright pink.", gloss: "Confiture — jam." },
          { who: "mamie", text: "{{Pralines roses}} — from Lyon. And the jam is for the crêpes. It's four o'clock — {{l'heure du goûter}}! To the kitchen!", gloss: "L'heure du goûter — snack time." },
        ],
        culture: ["pralines"],
        nudges: { "entree:mamie": [{ who: "mamie", text: "The suitcase, mon cœur. The presents are in there." }] },
      },
      {
        id: "batter",
        quest: { v: "Help Mamie with the batter", hint: "In the kitchen." },
        at: { room: "cuisine", hotspot: "mamie" },
        lines: [{ who: "mamie", text: "Crêpes. My grandmother's recipe. Pass me what I ask for — {{vite, vite !}}", gloss: "Vite — quick!" }],
        game: {
          type: "fetch",
          npc: "mamie",
          kicker: "Mini-game · La pâte",
          title: "Pass Mamie what she asks for.",
          hint: "Nothing on the counter is labelled. Listen for the word.",
          asks: [
            { wordId: "farine", native: "D'abord, la farine.", roman: "D'abord, la farine.", english: "First, the flour." },
            { wordId: "oeufs", native: "Les œufs, doucement !", roman: "Les œufs, doucement !", english: "The eggs — gently!" },
            { wordId: "lait", native: "Le lait.", roman: "Le lait.", english: "The milk." },
            { wordId: "sucre", native: "Et un peu de sucre.", roman: "Et un peu de sucre.", english: "And a little sugar." },
          ],
          items: [
            { wordId: "farine", label: "Paper bag", art: <Item kind="bag" color="#f2ece0" /> },
            { wordId: "oeufs", label: "Fragile", art: <Item kind="round" color="#e8d8b8" /> },
            { wordId: "lait", label: "Carton", art: Icon.milk },
            { wordId: "sucre", label: "Tin", art: Icon.sugar },
          ],
          done: { native: "Parfait !", roman: "Parfait !", english: "Perfect!" },
        },
        after: [{ who: "mamie", text: "Now the {{poêle}} — the pan. Hot, but not too hot. Come to the stove.", gloss: "Poêle — frying pan." }],
        memory: "batter",
        nudges: { "entree:mamie": [{ who: "mamie", text: "{{À la cuisine !}} The crêpes won't make themselves.", gloss: "To the kitchen!" }] },
      },
      {
        id: "crepes",
        quest: { v: "Make a crêpe", hint: "At the stove." },
        at: { room: "cuisine", hotspot: "poele" },
        encounter: ["poele"],
        lines: [{ who: "mamie", text: "Mix. Pour — a thin layer. Flip it. Jam. Fold it in four. {{À toi !}}", gloss: "À toi — your turn!" }],
        game: {
          type: "sequence",
          kicker: "Mini-game · La crêpe",
          title: "Make a crêpe, in order.",
          hint: "Tap the steps in the order Mamie showed you.",
          steps: [
            { native: "Mélanger la pâte", roman: "Mélanger la pâte", english: "mix the batter", wordId: "farine", art: mixCard },
            { native: "Verser dans la poêle", roman: "Verser dans la poêle", english: "pour into the pan", wordId: "poele", art: pourCard },
            { native: "Retourner la crêpe", roman: "Retourner la crêpe", english: "flip the crêpe", wordId: "crepe", art: flipCard },
            { native: "Mettre la confiture", roman: "Mettre la confiture", english: "add the jam", wordId: "confiture", art: jamCard },
            { native: "Plier en quatre", roman: "Plier en quatre", english: "fold it in four", art: foldCard },
          ],
          done: "It flew up, turned over, and landed back in the pan. Mamie applauds. Maman takes a photo.",
        },
        after: [{ who: "mamie", text: "{{Bravo !}} At la Chandeleur you flip them holding a coin, for luck. Next February, you'll do it with me.", gloss: "She slides it onto a plate for you." }],
        culture: ["crepes"],
        memory: "crepes",
        nudges: { "cuisine:mamie": [{ who: "mamie", text: "The stove, mon cœur. The pan's hot." }] },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Mamie", hint: "She's holding the pan." },
      lines: [{ who: "mamie", text: "You've finished the first crêpe in about four bites. Mamie is already pouring the next one, and raises an eyebrow at you." }],
      asker: "mamie",
      question: {
        native: "Tu en veux une autre ?",
        roman: "Tu en veux une autre ?",
        english: "Do you want another one?",
        choices: [
          { native: "Oui, s'il te plaît !", roman: "Oui, s'il te plaît !", english: "Yes, please!", right: true },
          { native: "Bonjour !", roman: "Bonjour !", english: "Hello!", reply: [{ who: "mamie", text: "Bonjour again, mon cœur! But do you want another crêpe?" }] },
          { native: "Du sucre.", roman: "Du sucre.", english: "Some sugar.", reply: [{ who: "mamie", text: "Sugar on its own? No, no. A crêpe — yes or no?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{Oui, s'il te plaît, Mamie !}}", gloss: "“Yes, please, Mamie!”" },
        { who: "mamie", text: "{{Oh, qu'il est poli !}} …{{Qu'elle est polie !}} …Whichever. So polite!", gloss: "French grammar makes you choose. Mamie refuses to." },
        { who: "guide", text: "It's four o'clock in an American kitchen, and for a whole month, it's going to be le goûter every day." },
      ],
      encounter: ["silteplait", "crepe"],
      memory: "silteplait",
    },
    gates: [{ room: "entree", hotspot: "cuisine", until: "valise", line: { who: "mamie", text: "Wait, wait — the presents first!", gloss: "Mamie points at her suitcase." } }],
    idle: {
      "entree:valise": [{ who: "guide", text: "The suitcase is empty, except for a very squashed baguette Mamie refuses to throw away." }],
      "cuisine:poele": [{ who: "guide", text: "The pan's still warm. There's batter for about thirty more." }],
    },
    afterwards: {
      "cuisine:mamie": [{ who: "mamie", text: "This summer, you come to us. To the village. Papi will teach you pétanque — and he'll cheat." }],
    },
    complete: {
      title: "Le",
      em: "Goûter",
      text: "You greeted Mamie with la bise, unpacked jam and pink pralines, made the batter by ear, flipped your first crêpe — and asked for another, politely, in French.",
      quest: { v: "Eat one more crêpe", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Cuisine done={new Set(["crepes"])} />,
};

export default content;
