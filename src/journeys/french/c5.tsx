import type { ChapterContent, StoryPanel } from "../types";
import { Stage, Sky, Stars, Ground, FY } from "../scenes";
import { Walls, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { Panel } from "../kit";
import { Facade } from "./art";

/* FRENCH · Chapter Five — Les Fables. A snowy night in Lyon, and the fable every French child learns by heart. */

function Salon() {
  return (
    <Stage>
      <Walls tint="#e2d4bc" floor="#6a4a32" floorLine="#4a2e1c" shade="#cfc0a4" />
      <rect width="1600" height="900" fill="#1a1020" opacity="0.18" />
      {/* bookshelves floor to ceiling */}
      <rect x={80} y={FY - 560} width="360" height="560" fill={WOOD} />
      {Array.from({ length: 5 }, (_, r) => (
        <g key={r}>
          <rect x={92} y={FY - 540 + r * 108} width="336" height="96" fill="#3a2718" />
          {Array.from({ length: 12 }, (_, i) => <rect key={i} x={98 + i * 27} y={FY - 530 + r * 108 + (i % 3) * 6} width="22" height={80 - (i % 3) * 6} fill={["#8a2a2a", "#2a4a6a", "#6a5a2a", "#3a5a3a", "#8a6a3a"][(i + r) % 5]} />)}
        </g>
      ))}
      {/* the window, snow falling on Lyon */}
      <rect x={1040} y={180} width="320" height="280" fill="#f4efe4" />
      <rect x={1052} y={192} width="296" height="256" fill="#141a36" />
      {Array.from({ length: 20 }, (_, i) => <circle key={i} cx={1060 + ((i * 53) % 280)} cy={200 + ((i * 37) % 240)} r="3" fill="#fff" opacity="0.85" />)}
      <line x1="1200" y1="192" x2="1200" y2="448" stroke="#f4efe4" strokeWidth="8" />
      {/* the armchair and the lamp */}
      <circle cx={760} cy={FY - 380} r="140" fill="url(#lamp-glow)" />
      <rect x={740} y={FY - 300} width="8" height="300" fill="#3a3a3a" />
      <path d={`M700 ${FY - 300}h88l-16 -60h-56Z`} fill="#e8d8b0" />
      <rect x={560} y={FY - 150} width="220" height="150" rx="20" fill="#6a2a2a" />
      <rect x={560} y={FY - 260} width="220" height="130" rx="30" fill="#7a3434" />
      <Figure x={670} y={FY - 10} h={190} color="#1a1210" pose="sit" />
      <Child x={880} y={FY} h={104} color="#1a1210" />
      <rect x={1440} y={FY - 330} width="150" height="330" fill="#f4efe4" opacity="0.2" />
    </Stage>
  );
}

function Balcon() {
  return (
    <Stage>
      <Sky id="fr5" top="#0a0e24" mid="#1a2244" bottom="#3a3a5a" />
      <Stars n={40} seed={19} maxY={300} />
      {/* Fourvière, lit up on its hill across the river */}
      <path d="M640 530q330 -230 660 0Z" fill="#2c3454" />
      <rect x={900} y={300} width="140" height="110" fill="#f4ecd8" />
      <rect x={890} y={260} width="26" height="150" fill="#f4ecd8" />
      <rect x={1024} y={260} width="26" height="150" fill="#f4ecd8" />
      <circle cx={970} cy={290} r="30" fill="#f4ecd8" />
      <circle cx={970} cy={330} r="160" fill="#f4ecd8" opacity="0.06" />
      <rect x="0" y="520" width="1600" height="40" fill="#2a3a5a" />
      <Facade x={-60} w={500} h={500} tint="#6a6070" lit />
      <Facade x={1260} w={420} h={480} tint="#5a5868" lit />
      {Array.from({ length: 70 }, (_, i) => <circle key={i} cx={(i * 97) % 1600} cy={(i * 61) % 700} r={2 + (i % 3)} fill="#fff" opacity="0.8" />)}
      {/* the balcony rail, snow on it */}
      <Ground color="#9a9aa8" line="#7a7a88" kind="snow" />
      <rect x="0" y={FY - 110} width="1600" height="10" fill="#2a2a2e" />
      {Array.from({ length: 40 }, (_, i) => <line key={i} x1={i * 40 + 20} y1={FY - 100} x2={i * 40 + 20} y2={FY} stroke="#2a2a2e" strokeWidth="3" />)}
      <rect x="0" y={FY - 116} width="1600" height="8" fill="#f4f4f8" />
      <Child x={700} y={FY} h={116} color="#0a0810" />
    </Stage>
  );
}

const story: StoryPanel[] = [
  {
    art: (
      <Panel id="fr5p1" sky={["#9ac0d8", "#e8dcc0"]} ground="#6a8a4a">
        <path d="M280 196v-110" stroke="#5a3a22" strokeWidth="12" />
        <path d="M280 120l-70 -20M280 100l60 -24" stroke="#5a3a22" strokeWidth="8" />
        <circle cx="220" cy="80" r="44" fill="#4a7a3e" />
        <circle cx="330" cy="60" r="46" fill="#3f6e3a" />
        <g transform="translate(240 96)">
          <ellipse rx="22" ry="14" fill="#1a1a22" />
          <circle cx="18" cy="-10" r="10" fill="#1a1a22" />
          <path d="M26 -10l14 4l-14 4Z" fill="#e8a040" />
          <path d="M38 -8l12 2l-4 8Z" fill="#f2e2a0" />
        </g>
      </Panel>
    ),
    text: "Papi closes the book — he doesn't need it. “{{Maître Corbeau, sur un arbre perché…}}” A crow sat high in an {{arbre}}, holding a whole {{fromage}} in his {{bec}}.",
  },
  {
    art: (
      <Panel id="fr5p2" sky={["#9ac0d8", "#e8dcc0"]} ground="#6a8a4a">
        <path d="M330 196v-110" stroke="#5a3a22" strokeWidth="12" />
        <circle cx="330" cy="70" r="50" fill="#4a7a3e" />
        <g transform="translate(140 186)">
          <ellipse rx="40" ry="14" fill="#c8602a" />
          <path d="M34 -8l30 -18l-4 20Z" fill="#c8602a" />
          <path d="M40 -22l4 -16l6 14Z" fill="#c8602a" />
          <path d="M-38 -2q-30 -10 -40 10q20 6 40 0Z" fill="#c8602a" />
          <circle cx="52" cy="-16" r="2" fill="#1a1a1a" />
        </g>
      </Panel>
    ),
    text: "“{{Maître Renard, par l'odeur alléché…}}” A {{renard}} — a fox — caught the smell of that cheese from across the whole forest.",
  },
  {
    art: (
      <Panel id="fr5p3" sky={["#9ac0d8", "#e8dcc0"]} ground="#6a8a4a">
        <path d="M300 196v-110" stroke="#5a3a22" strokeWidth="12" />
        <circle cx="300" cy="70" r="50" fill="#4a7a3e" />
        <g transform="translate(270 100)"><ellipse rx="18" ry="11" fill="#1a1a22" /><circle cx="14" cy="-8" r="8" fill="#1a1a22" /><path d="M20 -8l10 3l-10 3Z" fill="#e8a040" /></g>
        <g transform="translate(150 186)"><ellipse rx="36" ry="12" fill="#c8602a" /><path d="M30 -8l26 -24l-2 20Z" fill="#c8602a" /></g>
        <path d="M200 140q20 -20 40 -20" stroke="#8a4a2a" strokeWidth="2" fill="none" strokeDasharray="4 4" />
      </Panel>
    ),
    text: "“{{Hé ! bonjour, Monsieur du Corbeau. Que vous êtes joli !}} If your singing is as fine as your feathers, you're the most magnificent bird in these woods!”",
  },
  {
    art: (
      <Panel id="fr5p4" sky={["#9ac0d8", "#e8dcc0"]} ground="#6a8a4a">
        <path d="M300 196v-110" stroke="#5a3a22" strokeWidth="12" />
        <circle cx="300" cy="70" r="50" fill="#4a7a3e" />
        <g transform="translate(270 100)"><ellipse rx="18" ry="11" fill="#1a1a22" /><circle cx="14" cy="-8" r="8" fill="#1a1a22" /><path d="M20 -10l12 -6M20 -6l12 6" stroke="#e8a040" strokeWidth="3" /></g>
        <path d="M280 130q-20 30 -60 40" stroke="#f2e2a0" strokeWidth="2" strokeDasharray="3 5" fill="none" />
        <path d="M200 176l14 -4l-2 10Z" fill="#f2e2a0" />
        <g transform="translate(170 186)"><ellipse rx="36" ry="12" fill="#c8602a" /><path d="M30 -8l26 -16l-2 20Z" fill="#c8602a" /></g>
      </Panel>
    ),
    text: "Oh, the crow was pleased. He opened his beak wide to {{chanter}} — to sing — and down fell the cheese. The fox caught it before it touched the ground.",
  },
  {
    art: (
      <Panel id="fr5p5" sky={["#e8c890", "#c8a070"]} ground="#6a8a4a">
        <path d="M330 196v-110" stroke="#5a3a22" strokeWidth="12" />
        <circle cx="330" cy="70" r="50" fill="#4a7a3e" />
        <g transform="translate(300 100)"><ellipse rx="18" ry="11" fill="#1a1a22" /><circle cx="14" cy="-8" r="8" fill="#1a1a22" /></g>
        <g transform="translate(110 186)"><ellipse rx="36" ry="12" fill="#c8602a" /><path d="M30 -8l26 -16l-2 20Z" fill="#c8602a" /><path d="M52 -10l12 2l-4 8Z" fill="#f2e2a0" /></g>
      </Panel>
    ),
    text: "“{{Apprenez que tout flatteur vit aux dépens de celui qui l'écoute.}}” Learn this: every {{flatteur}} — every flatterer — lives off whoever listens to him. The crow swore he'd never be fooled again. A little late.",
  },
];

const content: ChapterContent = {
  startRoom: "salon",
  speakers: {
    lea: { name: "Léa", glyph: "L", tone: "guest" },
  },
  rooms: {
    salon: {
      id: "salon",
      name: "Papi's study",
      native: "le salon",
      art: <Salon />,
      spawn: { left: 480, right: 1300 },
      hotspots: [
        { id: "books", x: 260, y: 420, label: "Bookshelves", kind: "word", wordId: "livre" },
        { id: "papi", x: 670, y: 560, label: "Papi", kind: "npc" },
        { id: "lamp", x: 745, y: 420, label: "Reading lamp", kind: "flavor", note: "Papi's reading lamp, older than Maman. He refuses to replace the bulb with anything brighter. “Stories need shadows.”" },
        { id: "window", x: 1200, y: 320, label: "Snowy window", kind: "word", wordId: "neige" },
        { id: "balcon", x: 1515, y: 560, label: "Balcony", kind: "exit", to: "balcon" },
      ],
    },
    balcon: {
      id: "balcon",
      name: "The balcony",
      native: "le balcon",
      art: <Balcon />,
      spawn: { left: 400, right: 1200 },
      hotspots: [
        { id: "salon", x: 100, y: 560, label: "Back inside", kind: "exit", to: "salon" },
        { id: "lea", x: 700, y: 620, label: "Léa", kind: "npc" },
        { id: "fourviere", x: 970, y: 330, label: "Fourvière", kind: "flavor", note: "The basilica on the hill, glowing white through the snow. Mamie says every December 8th, all of Lyon puts candles in its windows for it.", culture: "fourviere" },
        { id: "sky", x: 400, y: 160, label: "Night sky", kind: "word", wordId: "nuit" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Chapitre cinq · French",
      title: "Les",
      em: "Fables",
      text: "The same winter, a week later. Snow has shut half of Lyon, the cousins are staying over, and Papi has been looking for something on his bookshelf for twenty minutes.",
    },
    introLines: [
      { who: "papi", text: "{{Ah ! Le voilà !}} Come here — I found it.", gloss: "There it is! Papi, holding a very old book." },
      { who: "guide", text: "Quest: hear Papi's fable.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "livre",
        quest: { v: "See what Papi found", hint: "He's in his armchair." },
        at: { room: "salon", hotspot: "papi" },
        encounter: ["livre", "fable"],
        lines: [
          { who: "papi", text: "My school {{livre}}, from 1958. Page forty-two: the first {{fable}} I learned by heart.", gloss: "Livre — book. Fable — a fable, a short story with a lesson." },
          { who: "papi", text: "Every child in France learns it. Your Maman did. Go and fetch Léa from the balcony — she'll want to hear it. She'll pretend she doesn't.", gloss: "The balcony door on the right." },
        ],
        culture: ["lafontaine"],
      },
      {
        id: "balcon",
        quest: { v: "Fetch Léa from the balcony", hint: "Through the door on the right." },
        at: { room: "balcon", hotspot: "lea" },
        encounter: ["neige", "nuit"],
        lines: [
          { who: "lea", text: "Look — {{la neige}}, on the whole city. And the {{nuit}} is so quiet.", gloss: "La neige — the snow. La nuit — the night." },
          { who: "lea", text: "Papi's fable? I know it already. But first — I'm testing you. Everything since the summer.", gloss: "She takes this very seriously." },
        ],
        game: { type: "memory", kicker: "Mini-game · Léa's test", title: "Match the word to what it means.", hint: "Words from the village, the market and the galette. Matches in a row build a combo." },
        after: [{ who: "lea", text: "{{Pas mal.}} OK. Let's go — Papi does the voices.", gloss: "Not bad." }],
        memory: "test",
        nudges: { "salon:papi": [{ who: "papi", text: "Léa first! The balcony. She'll catch cold." }] },
      },
      {
        id: "story",
        quest: { v: "Listen to Papi's fable", hint: "Back in his armchair." },
        at: { room: "salon", hotspot: "papi" },
        lines: [{ who: "papi", text: "{{Le Corbeau et le Renard.}} By Jean de La Fontaine, 1668. {{Écoutez.}}", gloss: "The Crow and the Fox. Listen." }],
        game: {
          type: "story",
          kicker: "A fable from Papi",
          title: "The Crow and the Fox",
          native: "Le Corbeau et le Renard",
          teller: "papi",
          panels: story,
          question: {
            native: "Qui a mangé le fromage ?",
            roman: "Qui a mangé le fromage ?",
            english: "Who ate the cheese?",
            choices: [
              { native: "Le renard.", roman: "Le renard.", english: "The fox.", right: true },
              { native: "Le corbeau.", roman: "Le corbeau.", english: "The crow.", reply: [{ who: "lea", text: "The crow DROPPED it! Who caught it?" }] },
              { native: "Papi.", roman: "Papi.", english: "Papi.", reply: [{ who: "papi", text: "I wish! No — who was waiting underneath the tree?" }] },
            ],
          },
        },
        memory: "fable",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Papi", hint: "He has one more question." },
      lines: [{ who: "papi", text: "Papi takes off his glasses and looks at you over the top of the book, the way he must have looked at Maman." }],
      asker: "papi",
      question: {
        native: "Alors… le corbeau, il était malin ?",
        roman: "Alors… le corbeau, il était malin ?",
        english: "So… the crow — was he clever?",
        choices: [
          { native: "Non, le renard était malin !", roman: "Non, le renard était malin !", english: "No, the fox was the clever one!", right: true },
          { native: "Oui, très malin !", roman: "Oui, très malin !", english: "Yes, very clever!", reply: [{ who: "papi", text: "The crow? He lost his whole cheese to a compliment! Think again." }] },
          { native: "C'est moi !", roman: "C'est moi !", english: "It's me!", reply: [{ who: "lea", text: "You found the fève, yes, we KNOW. But the crow?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{Non, le renard était malin !}}", gloss: "“No, the fox was the clever one!”" },
        { who: "papi", text: "{{Exactement.}} And the lesson: when someone flatters you — hold on to your cheese.", gloss: "Exactly." },
        { who: "lea", text: "“{{Maître Corbeau, sur un arbre perché…}}” (She knows it all. Of course she does.)" },
      ],
      encounter: ["malin", "corbeau", "renard", "arbre", "bec", "chanter", "flatteur"],
      memory: "malin",
    },
    gates: [{ room: "salon", hotspot: "balcon", until: "livre", line: { who: "papi", text: "Wait — come and see what I found!", gloss: "Papi waves his old book." } }],
    idle: {
      "balcon:lea": [{ who: "lea", text: "If you stick your tongue out, you can catch snowflakes. Don't tell Mamie." }],
      "salon:papi": [{ who: "papi", text: "Tomorrow: “La Cigale et la Fourmi.” The grasshopper and the ant. You'll like the ant less than you think." }],
    },
    afterwards: {
      "salon:papi": [{ who: "papi", text: "Soon you fly home. Take the book. No — take it. I know it by heart anyway." }],
    },
    complete: {
      title: "Les",
      em: "Fables",
      text: "You found Papi's old schoolbook, beat Léa's word test in the snow, heard La Fontaine's crow and fox — and knew exactly who the clever one was.",
      quest: { v: "Learn the first line by heart", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Salon />,
};

export default content;
