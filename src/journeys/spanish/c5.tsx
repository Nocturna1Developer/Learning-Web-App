import type { ChapterContent, StoryPanel } from "../types";
import { Stage, Sky, Stars, Ground, Item, FY } from "../scenes";
import { Walls, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { Icon, Panel } from "../kit";
import { PuebloHouse, Bougainvillea, Candle } from "./art";

/* SPANISH · Chapter Five — Los Cuentos. The power's out, the candles are lit, and Abuela knows who lives on the moon. */

function MoonRabbit({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r * 2.6} fill="#f4ecdd" opacity="0.07" />
      <circle cx={x} cy={y} r={r} fill="#f4ecdd" />
      {/* the rabbit in the dark patches */}
      <g transform={`translate(${x} ${y}) scale(${r / 100})`} fill="#d6ccb6">
        <ellipse cx="-6" cy="22" rx="42" ry="30" />
        <circle cx="30" cy="-12" r="22" />
        <ellipse cx="28" cy="-52" rx="8" ry="28" transform="rotate(-12 28 -52)" />
        <ellipse cx="44" cy="-48" rx="7" ry="24" transform="rotate(14 44 -48)" />
        <circle cx="-48" cy="30" r="10" />
      </g>
    </g>
  );
}

function Sala({ done }: { done: ReadonlySet<string> }) {
  const lit = done.has("dark");
  const shadow = done.has("sombras");
  return (
    <Stage>
      <Walls tint="#3a3040" floor="#4a3226" floorLine="#2a1c14" shade="#2a2230" />
      <rect width="1600" height="900" fill="#0e0a14" opacity={lit ? 0.25 : 0.6} />
      {/* the cupboard with the drawer */}
      <rect x={160} y={FY - 260} width="220" height="260" fill={WOOD} />
      <rect x={172} y={FY - 120} width="196" height="50" fill="#6b4429" />
      <circle cx={270} cy={FY - 95} r="6" fill="#c9a24a" />
      {/* the big wall, and the shadow on it */}
      {shadow && (
        <g fill="#0e0a14" opacity="0.75">
          <ellipse cx="760" cy="380" rx="90" ry="60" />
          <circle cx="840" cy="320" r="44" />
          <ellipse cx="830" cy="240" rx="14" ry="56" transform="rotate(-10 830 240)" />
          <ellipse cx="862" cy="246" rx="12" ry="50" transform="rotate(12 862 246)" />
        </g>
      )}
      {/* table with candles */}
      <rect x={560} y={FY - 150} width="460" height="20" fill={WOOD} />
      <rect x={580} y={FY - 130} width="16" height="130" fill={WOOD} />
      <rect x={984} y={FY - 130} width="16" height="130" fill={WOOD} />
      {lit && (
        <>
          <Candle x={700} y={FY - 150} h={50} />
          <Candle x={760} y={FY - 150} h={36} />
          <Candle x={880} y={FY - 150} h={44} />
        </>
      )}
      <Figure x={1120} y={FY} h={200} color="#140e10" pose="sit" />
      <Child x={1280} y={FY} h={116} color="#140e10" flip />
      {/* the door to the courtyard: moonlight through the gap */}
      <rect x={1440} y={FY - 330} width="150" height="330" fill="#1c2a44" />
      <rect x={1440} y={FY - 330} width="40" height="330" fill="#c8d4e8" opacity="0.25" />
    </Stage>
  );
}

function PatioNoche() {
  return (
    <Stage>
      <Sky id="es5" top="#0a0c20" mid="#1a2240" bottom="#2a3050" />
      <Stars n={90} seed={5} maxY={480} />
      <MoonRabbit x={820} y={220} r={110} />
      <PuebloHouse x={-40} w={520} h={380} wall="#4a4050" door={false} />
      <PuebloHouse x={1120} w={520} h={380} wall="#3a4050" lit />
      <Bougainvillea x={60} y={330} w={320} />
      <rect width="1600" height="900" fill="#0a0c20" opacity="0.35" />
      <Ground color="#4a4050" line="#2a2430" kind="stone" />
      <Figure x={700} y={FY} h={200} color="#0e0a14" />
      <Child x={600} y={FY} h={118} color="#0e0a14" />
    </Stage>
  );
}

const story: StoryPanel[] = [
  {
    art: (
      <Panel id="es5a" sky={["#f0b86a", "#c86a4a"]} ground="#8a5a3a">
        <path d="M0 196q80 -60 160 -20t240 -30v54H0Z" fill="#6b4429" />
        <Figure x={200} y={200} h={110} color="#2a1a12" pose="walk" />
        <path d="M188 92q12 -30 24 0" fill="#3f8a5a" />
        <path d="M184 96q16 -44 32 0" fill="none" stroke="#2f7fa8" strokeWidth="4" />
      </Panel>
    ),
    text: "Long, long ago, Quetzalcóatl — the great feathered serpent, the wisest of the gods — came down to walk the earth as a man.",
  },
  {
    art: (
      <Panel id="es5b" sky={["#3a2a4a", "#c86a4a"]} ground="#6b4429">
        {Array.from({ length: 5 }, (_, i) => <path key={i} d={`M${20 + i * 80} 196v-50l-16 20M${20 + i * 80} 160l14 -16`} stroke="#3f6b2a" strokeWidth="6" fill="none" />)}
        <Figure x={230} y={200} h={100} color="#2a1a12" pose="sit" />
      </Panel>
    ),
    text: "He walked through forests and deserts for days, and forgot to eat. By nightfall he had such {{hambre}} that he couldn't take another step.",
  },
  {
    art: (
      <Panel id="es5c" sky={["#1a1a3a", "#3a3a5a"]} ground="#3a4a2a">
        <Figure x={120} y={200} h={100} color="#1a1210" pose="sit" />
        <g transform="translate(280 190)" fill="#f4ecdd">
          <ellipse cx="0" cy="0" rx="26" ry="16" />
          <circle cx="22" cy="-14" r="11" />
          <ellipse cx="20" cy="-34" rx="4" ry="14" />
          <ellipse cx="28" cy="-32" rx="4" ry="12" />
        </g>
        {[240, 300, 330].map((x) => <path key={x} d={`M${x} 198l4 -14l4 14`} fill="#6b8a4a" />)}
      </Panel>
    ),
    text: "A little {{conejo}} was eating grass nearby. “Have some of mine,” said the rabbit. “Thank you,” said Quetzalcóatl, “but I can't eat grass.”",
  },
  {
    art: (
      <Panel id="es5d" sky={["#0e0e2a", "#2a2a4a"]} ground="#2a3a22">
        <circle cx="200" cy="120" r="70" fill="#ffd07a" opacity="0.15" />
        <g transform="translate(200 170)" fill="#f4ecdd">
          <ellipse cx="0" cy="0" rx="30" ry="18" />
          <circle cx="24" cy="-16" r="13" />
          <ellipse cx="22" cy="-40" rx="5" ry="16" />
          <ellipse cx="32" cy="-38" rx="5" ry="14" />
        </g>
      </Panel>
    ),
    text: "“Then eat me,” said the rabbit. “I'm only small — but you would live.”",
  },
  {
    art: (
      <Panel id="es5e" sky={["#06081a", "#1a2040"]} ground={null}>
        {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={(i * 97) % 400} cy={(i * 53) % 200} r="1.5" fill="#f4ecdd" opacity="0.7" />)}
        <circle cx="200" cy="110" r="70" fill="#f4ecdd" />
        <g transform="translate(200 110) scale(0.62)" fill="#d6ccb6">
          <ellipse cx="-6" cy="22" rx="42" ry="30" />
          <circle cx="30" cy="-12" r="22" />
          <ellipse cx="28" cy="-52" rx="8" ry="28" />
          <ellipse cx="44" cy="-48" rx="7" ry="24" />
        </g>
      </Panel>
    ),
    text: "Quetzalcóatl was so moved that he lifted the little rabbit high into the {{cielo}}, and pressed its shape onto the {{luna}} — so that everyone, everywhere, would remember how generous it was.",
  },
];

const content: ChapterContent = {
  startRoom: "sala",
  speakers: {
    lupita: { name: "Lupita", glyph: "L", tone: "guest" },
  },
  rooms: {
    sala: {
      id: "sala",
      name: "Abuela's front room",
      native: "la sala",
      art: (done) => <Sala done={done} />,
      spawn: { left: 480, right: 1300 },
      hotspots: [
        { id: "drawer", x: 270, y: 620, label: "The drawer", kind: "quest" },
        { id: "wall", x: 800, y: 330, label: "The bare wall", kind: "quest" },
        { id: "table", x: 780, y: 560, label: "Candles", kind: "word", wordId: "vela" },
        { id: "abuela", x: 1120, y: 560, label: "Abuela", kind: "npc" },
        { id: "lupita", x: 1280, y: 620, label: "Lupita", kind: "npc" },
        { id: "patio", x: 1515, y: 560, label: "Courtyard", kind: "exit", to: "patio" },
      ],
    },
    patio: {
      id: "patio",
      name: "The courtyard at night",
      native: "el patio",
      art: <PatioNoche />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "sala", x: 1470, y: 560, label: "Front room", kind: "exit", to: "sala" },
        { id: "stars", x: 300, y: 200, label: "Stars", kind: "word", wordId: "estrella" },
        { id: "moon", x: 820, y: 240, label: "The full moon", kind: "quest" },
        { id: "abuela", x: 700, y: 560, label: "Abuela", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Capítulo cinco · Spanish",
      title: "Los",
      em: "Cuentos",
      text: "Christmas night. The whole pueblo has its lights on — and then, with a pop, nobody does.",
    },
    introLines: [
      { who: "lupita", text: "{{¡Se fue la luz!}}", gloss: "“The light's gone!” — what everyone says when the power cuts out." },
      { who: "abuela", text: "{{Tranquilos.}} It happens every Christmas. Come here.", gloss: "Stay calm." },
      { who: "guide", text: "Quest: find some light — and wait for Abuela's story.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "dark",
        quest: { v: "Find Abuela in the dark", hint: "She's sitting by the table." },
        at: { room: "sala", hotspot: "abuela" },
        encounter: ["luz", "oscuro"],
        lines: [
          { who: "abuela", text: "{{Está muy oscuro.}} In the drawer — the cupboard by the wall. I'll tell you what to bring.", gloss: "It's very dark." },
        ],
        nudges: { "sala:lupita": [{ who: "lupita", text: "I'm not scared. Abuela's by the table. Go." }] },
      },
      {
        id: "drawer",
        quest: { v: "Find things in the drawer", hint: "The cupboard on the left." },
        at: { room: "sala", hotspot: "drawer" },
        lines: [{ who: "abuela", text: "Feel for them. I'll call them out.", gloss: "You can't see a thing. Listen." }],
        game: {
          type: "fetch",
          npc: "abuela",
          kicker: "Mini-game · En lo oscuro",
          title: "Find what Abuela asks for — by feel.",
          hint: "It's dark. Only the words will help.",
          asks: [
            { wordId: "cerillos", native: "Primero, los cerillos.", roman: "Primero, los cerillos.", english: "First, the matches." },
            { wordId: "vela", native: "Las velas.", roman: "Las velas.", english: "The candles." },
            { wordId: "linterna", native: "La linterna también.", roman: "La linterna también.", english: "The flashlight too." },
            { wordId: "agua", native: "Y agua, por si acaso.", roman: "Y agua, por si acaso.", english: "And water, just in case." },
          ],
          items: [
            { wordId: "cerillos", label: "Small box", art: <Item kind="box" color="#c0392b" accent="#f0cf3a" /> },
            { wordId: "vela", label: "Waxy", art: Icon.candle },
            { wordId: "linterna", label: "Heavy", art: <Item kind="bottle" color="#3a4a5a" /> },
            { wordId: "agua", label: "Sloshy", art: Icon.jug },
          ],
          done: { native: "¡Ya hay luz!", roman: "¡Ya hay luz!", english: "Now there's light!" },
        },
        after: [
          { who: "guide", text: "Three candles on the table. Everyone's face goes gold.", gloss: "The dark is suddenly cozy." },
          { who: "lupita", text: "Abuela, do the rabbit! With the {{linterna}}! On the wall!", gloss: "Linterna — flashlight." },
        ],
        memory: "dark",
        nudges: { "sala:abuela": [{ who: "abuela", text: "The drawer, {{cariño}}. In the cupboard." }] },
      },
      {
        id: "sombras",
        quest: { v: "Make shadows on the wall", hint: "The big bare wall." },
        at: { room: "sala", hotspot: "wall" },
        encounter: ["sombra", "conejo"],
        lines: [
          { who: "guide", text: "Abuela folds her hands in front of the flashlight. On the wall: two long ears. A twitching nose.", gloss: "A {{sombra}} — a shadow." },
          { who: "abuela", text: "{{¿Qué es?}}", gloss: "What is it?" },
          { who: "lupita", text: "{{¡Un conejo!}} Now tell the story. The one about the moon.", gloss: "A rabbit!" },
        ],
        culture: ["sombras"],
        nudges: { "sala:lupita": [{ who: "lupita", text: "The wall! Shine it on the wall!" }] },
      },
      {
        id: "story",
        quest: { v: "Listen to Abuela's story", hint: "She's settling into her chair." },
        at: { room: "sala", hotspot: "abuela" },
        encounter: ["cuento", "hambre"],
        lines: [{ who: "abuela", text: "{{Un cuento}} my abuela told me, in this same room, with the same candles. {{Escucha.}}", gloss: "A story. Listen." }],
        game: {
          type: "story",
          kicker: "A story from Abuela",
          title: "The Rabbit in the Moon",
          native: "El conejo en la luna",
          teller: "abuela",
          panels: story,
          question: {
            native: "¿Quién está en la luna?",
            roman: "¿Quién está en la luna?",
            english: "Who is on the moon?",
            choices: [
              { native: "Un conejo.", roman: "Un conejo.", english: "A rabbit.", right: true },
              { native: "Un tamal.", roman: "Un tamal.", english: "A tamale.", reply: [{ who: "lupita", text: "A tamal on the moon! Ha! No — who gave himself away?" }] },
              { native: "Abuela.", roman: "Abuela.", english: "Abuela.", reply: [{ who: "abuela", text: "Me? I'm right here, {{cariño}}. Who did Quetzalcóatl lift up?" }] },
            ],
          },
        },
        after: [{ who: "abuela", text: "Come outside. It's a full moon tonight. {{Vamos a ver.}}", gloss: "Let's go and see." }],
        culture: ["luna"],
        memory: "moonstory",
        nudges: { "sala:lupita": [{ who: "lupita", text: "Shh! Abuela's going to tell it." }] },
      },
    ],
    ending: {
      at: { room: "patio", hotspot: "moon" },
      quest: { v: "Look at the moon with Abuela", hint: "In the courtyard." },
      lines: [
        { who: "guide", text: "With the whole pueblo dark, the {{luna}} is enormous. The {{cielo}} is full of stars you've never seen from home.", gloss: "Luna — moon. Cielo — sky." },
        { who: "abuela", text: "She points up, and tilts her head, waiting." },
      ],
      asker: "abuela",
      question: {
        native: "¿Lo ves?",
        roman: "¿Lo ves?",
        english: "Do you see him?",
        choices: [
          { native: "Sí, veo el conejo.", roman: "Sí, veo el conejo.", english: "Yes, I see the rabbit.", right: true },
          { native: "Tengo hambre.", roman: "Tengo hambre.", english: "I'm hungry.", reply: [{ who: "abuela", text: "After six dozen tamales? Look up, not at the kitchen!" }] },
          { native: "Está oscuro.", roman: "Está oscuro.", english: "It's dark.", reply: [{ who: "abuela", text: "Down here, yes. Up there? Look again." }] },
        ],
      },
      right: [
        { who: "you", text: "{{Sí, veo el conejo.}}", gloss: "“Yes, I see the rabbit.”" },
        { who: "abuela", text: "Now you'll see him every full moon, wherever you are. {{Y te vas a acordar de mí.}}", gloss: "“And you'll remember me.”" },
        { who: "guide", text: "The lights come back on all over the pueblo. Nobody goes inside." },
      ],
      encounter: ["luna", "cielo"],
      memory: "conejo",
    },
    gates: [{ room: "sala", hotspot: "patio", until: "story", line: { who: "abuela", text: "Not in the dark, {{cariño}}. Stay by the candles.", gloss: "The courtyard can wait." } }],
    idle: {
      "sala:drawer": [{ who: "guide", text: "The drawer's empty except for a very old pack of cards." }],
      "sala:wall": [{ who: "lupita", text: "Now do a dog! …That's a bird, Abuela." }],
      "sala:lupita": [{ who: "lupita", text: "I knew the rabbit story already. Obviously." }],
    },
    afterwards: {
      "patio:abuela": [{ who: "abuela", text: "Tomorrow we pack. But the moon comes with you — it's the same one over your house." }],
      "sala:lupita": [{ who: "lupita", text: "Will you call us? From home? Promise?" }],
    },
    complete: {
      title: "Los",
      em: "Cuentos",
      text: "You found light in the dark by ear, watched a shadow rabbit on the wall, heard the legend of the rabbit in the moon — and saw him yourself.",
      quest: { v: "Stay out under the moon", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <PatioNoche />,
};

export default content;
