import type { ChapterContent, StoryPanel } from "../types";
import { Stage, Sky, Stars, Moon, Hills, Ground, Fence, FY } from "../scenes";
import { Walls, Window, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { Panel } from "../kit";
import { FogaoLenha, Saci } from "./art";

/* PORTUGUESE · Chapter Five — O Saci. A night at Vovô's farm: fireflies, the wood stove, and the one-legged trickster. */

function Cozinha() {
  return (
    <Stage>
      <Walls tint="#e8dcc4" floor="#8a6a4a" floorLine="#6a4a2e" shade="#d4c6a8" />
      <rect width="1600" height="900" fill="#1a1020" opacity="0.25" />
      <Window x={320} y={200} w={240} h={190} />
      <rect x={320} y={200} width="240" height="190" fill="#0a0c20" opacity="0.8" />
      {/* hanging pots, strings of garlic */}
      <rect x={640} y={220} width="300" height="10" fill={WOOD} />
      {[670, 730, 800, 870].map((x, i) => <circle key={x} cx={x} cy={262} r={18 + (i % 2) * 6} fill="#8a8a8e" />)}
      <FogaoLenha x={1000} />
      <circle cx={1090} cy={FY - 60} r="120" fill="url(#lamp-glow)" opacity="0.6" />
      {/* the long table and benches */}
      <rect x={440} y={FY - 140} width="460" height="18" fill={WOOD} />
      <rect x={460} y={FY - 122} width="14" height="122" fill={WOOD} />
      <rect x={866} y={FY - 122} width="14" height="122" fill={WOOD} />
      <rect x={440} y={FY - 60} width="460" height="12" fill="#6b4429" />
      <Figure x={560} y={FY} h={185} color="#1a1210" pose="sit" />
      <Figure x={900} y={FY} h={190} color="#1a1210" pose="sit" flip />
      <rect x={60} y={FY - 330} width="150" height="330" fill="#241810" />
    </Stage>
  );
}

function Terreiro() {
  return (
    <Stage>
      <Sky id="pt5" top="#060a1e" mid="#121a38" bottom="#1e2a40" />
      <Stars n={140} seed={61} maxY={500} />
      <Moon x={1300} y={150} r={46} />
      <Hills y={540} color="#10182a" amp={70} seed={12} />
      <Ground color="#3a3428" line="#2a2418" kind="dirt" />
      <Fence y={FY - 110} color="#4a3a2a" from={700} to={1600} />
      {/* a horse in the corral */}
      <g transform={`translate(1100 ${FY})`} fill="#1a1410">
        <ellipse cx="0" cy="-120" rx="90" ry="44" />
        <path d="M70 -140l50 -70l24 10l-30 80Z" />
        {[-60, -30, 40, 64].map((lx) => <rect key={lx} x={lx} y="-100" width="12" height="100" />)}
        <path d="M-88 -130q-30 20 -20 60" stroke="#1a1410" strokeWidth="10" fill="none" />
      </g>
      {/* fireflies */}
      {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={(i * 131) % 1600} cy={300 + ((i * 53) % 380)} r="3.5" fill="#e8f080" opacity={0.5 + (i % 3) * 0.2} />)}
      {/* the farmhouse door, lit */}
      <rect x={40} y={FY - 340} width="220" height="340" fill="#c8b890" />
      <rect x={90} y={FY - 230} width="110" height="230" fill="#ffd98a" opacity="0.8" />
      <Child x={560} y={FY} h={112} color="#0a0810" />
    </Stage>
  );
}

const story: StoryPanel[] = [
  {
    art: (
      <Panel id="pt5p1" sky={["#1a1a3a", "#3a3050"]} ground="#3a3428">
        <Saci x={200} y={196} s={1.2} />
        <path d="M232 64q4 -12 12 -8" stroke="#c8c0b0" strokeWidth="2" fill="none" opacity="0.7" />
      </Panel>
    ),
    text: "On farms like this one, a long time ago — and maybe still — there lived a boy with only one {{perna}}, a {{gorro vermelho}} and a little clay pipe. The {{Saci}}.",
  },
  {
    art: (
      <Panel id="pt5p2" sky={["#1a1a3a", "#3a3050"]} ground="#3a3428">
        <g transform="translate(250 196)" fill="#2a2018">
          <ellipse cx="0" cy="-60" rx="60" ry="28" />
          <path d="M44 -74l30 -46l16 6l-18 50Z" />
          {[-40, -20, 26, 42].map((lx) => <rect key={lx} x={lx} y="-44" width="8" height="44" />)}
        </g>
        <path d="M300 84q10 10 0 20q10 10 0 20" stroke="#8a6a44" strokeWidth="3" fill="none" />
        <Saci x={140} y={196} s={0.8} />
      </Panel>
    ),
    text: "At night he hops around making mischief. He braids the horses' manes into knots, hides your things, burns the beans on the stove and makes the milk go sour.",
  },
  {
    art: (
      <Panel id="pt5p3" sky={["#c8a878", "#a88858"]} ground="#8a6a44">
        {[0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={200 + (i % 2) * 6} cy={180 - i * 28} rx={20 + i * 12} ry="8" fill="none" stroke="#6a5030" strokeWidth="3" opacity="0.7" />)}
        <path d="M196 60q-6 -10 10 -14" stroke="#d8302a" strokeWidth="6" />
      </Panel>
    ),
    text: "He travels inside a {{redemoinho}} — a little whirlwind of dust that spins across the yard for no reason at all. If you see one, the Saci is inside.",
  },
  {
    art: (
      <Panel id="pt5p4" sky={["#c8a878", "#a88858"]} ground="#8a6a44">
        <ellipse cx="200" cy="170" rx="40" ry="12" fill="none" stroke="#6a5030" strokeWidth="3" />
        <ellipse cx="200" cy="120" rx="50" ry="14" fill="#c8a060" />
        <path d="M150 120q50 30 100 0" fill="none" stroke="#8a6a44" strokeWidth="2" strokeDasharray="4 3" />
        <Child x={320} y={196} h={90} color="#2a1a12" />
      </Panel>
    ),
    text: "Throw a {{peneira}} — a sieve — over the whirlwind and you'll trap him. Grab his red cap, and he has to grant you a wish.",
  },
  {
    art: (
      <Panel id="pt5p5" sky={["#1a1a3a", "#3a3050"]} ground="#3a3428">
        <Saci x={300} y={196} s={0.9} />
        <Child x={120} y={196} h={90} color="#1a1210" />
        <path d="M150 110q70 -30 130 0" stroke="#c8c0b0" strokeWidth="2" strokeDasharray="4 5" fill="none" />
      </Panel>
    ),
    text: "But be careful. He'll whistle and giggle and trick you until you give it back. Nobody — nobody — has ever kept the Saci's cap for long.",
  },
];

const content: ChapterContent = {
  startRoom: "cozinha",
  speakers: {
    bia: { name: "Bia", glyph: "B", tone: "guest" },
  },
  rooms: {
    cozinha: {
      id: "cozinha",
      name: "The farm kitchen",
      native: "a cozinha do sítio",
      art: <Cozinha />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "terreiro", x: 135, y: 560, label: "The farmyard", kind: "exit", to: "terreiro" },
        { id: "vovo", x: 560, y: 580, label: "Vovó", kind: "npc" },
        { id: "avo", x: 900, y: 580, label: "Vovô", kind: "npc" },
        { id: "fogao", x: 1180, y: 560, label: "Wood stove", kind: "word", wordId: "fogao" },
        { id: "pots", x: 770, y: 262, label: "Hanging pots", kind: "flavor", note: "Black iron pots, one for every size of family gathering. The biggest one is for Christmas. The second biggest is for Tuesdays." },
      ],
    },
    terreiro: {
      id: "terreiro",
      name: "The farmyard at night",
      native: "o terreiro",
      art: <Terreiro />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "cozinha", x: 150, y: 560, label: "Back inside", kind: "exit", to: "cozinha" },
        { id: "bia", x: 560, y: 620, label: "Bia", kind: "npc" },
        { id: "fireflies", x: 800, y: 420, label: "Fireflies", kind: "word", wordId: "vagalume" },
        { id: "horse", x: 1100, y: 600, label: "The horse", kind: "flavor", note: "Vovô's old horse, Trovão. His mane is in a very neat braid that nobody here remembers doing." },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Capítulo cinco · Portuguese",
      title: "O",
      em: "Saci",
      text: "Vovô's sítio — a little farm outside town, down a red dirt road. No streetlights, no neighbours, a sky full of stars and a kitchen that smells of woodsmoke and coffee.",
    },
    introLines: [
      { who: "avo", text: "{{Chegamos!}} Welcome to the sítio. Sit by the stove — it's cold out there at night.", gloss: "Chegamos — we're here! Vovô, pouring coffee." },
      { who: "guide", text: "Quest: stay up for Vovô's story.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "sitio",
        quest: { v: "Talk to Vovô", hint: "At the long table." },
        at: { room: "cozinha", hotspot: "avo" },
        encounter: ["sitio", "fogao"],
        lines: [
          { who: "avo", text: "My father built this {{sítio}}. And that {{fogão a lenha}} — the wood stove — has never gone out. Not once in sixty years.", gloss: "Sítio — small farm. Fogão a lenha — wood-burning stove." },
          { who: "avo", text: "Go and call Bia — she's out chasing fireflies. Then I'll tell you both a story.", gloss: "Your prima Bia, Davi's little sister. Out in the farmyard." },
        ],
        culture: ["fogao"],
      },
      {
        id: "vagalumes",
        quest: { v: "Call Bia in", hint: "Out in the farmyard." },
        at: { room: "terreiro", hotspot: "bia" },
        encounter: ["vagalume"],
        lines: [
          { who: "bia", text: "Look! {{Vaga-lumes!}} Hundreds! You don't have those in America, do you?", gloss: "Vaga-lume — firefly. Literally, “wandering light.”" },
          { who: "bia", text: "I'll come in — if you pass my test. Words from the whole trip!", gloss: "Bia is eight and extremely fair." },
        ],
        game: { type: "memory", kicker: "Mini-game · Bia's test", title: "Match the word to what it means.", hint: "Words from the town, the feira and the festa. Matches in a row build a combo." },
        after: [{ who: "bia", text: "{{Tá bom}}, you win. Vovô! Tell the Saci story!", gloss: "OK, fine." }],
        memory: "test",
        nudges: { "cozinha:avo": [{ who: "avo", text: "Bia first! She'll stay out there all night." }] },
      },
      {
        id: "story",
        quest: { v: "Listen to Vovô's story", hint: "By the wood stove." },
        at: { room: "cozinha", hotspot: "avo" },
        encounter: ["historia"],
        lines: [{ who: "avo", text: "{{Era uma vez…}} Once upon a time, on a farm just like this one…", gloss: "Era uma vez — once upon a time." }],
        game: {
          type: "story",
          kicker: "A story from Vovô",
          title: "The Saci-Pererê",
          native: "O Saci-Pererê",
          teller: "avo",
          panels: story,
          question: {
            native: "O que o Saci usa na cabeça?",
            roman: "O que o Saci usa na cabeça?",
            english: "What does the Saci wear on his head?",
            choices: [
              { native: "Um gorro vermelho.", roman: "Um gorro vermelho.", english: "A red cap.", right: true },
              { native: "Um chapéu de palha.", roman: "Um chapéu de palha.", english: "A straw hat.", reply: [{ who: "bia", text: "That was YOU, at the festa! What does the Saci wear?" }] },
              { native: "Uma peneira.", roman: "Uma peneira.", english: "A sieve.", reply: [{ who: "avo", text: "The sieve is for catching him! What's on his head?" }] },
            ],
          },
        },
        culture: ["saci"],
        memory: "story",
        nudges: { "cozinha:vovo": [{ who: "vovo", text: "Shh, Vovô's telling it. He tells it best." }] },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Vovô", hint: "Something happened to your shoes." },
      lines: [{ who: "guide", text: "You stand up — and nearly fall flat. Your shoelaces are tied together in a very neat knot. Bia is looking at the ceiling, very hard." }],
      asker: "avo",
      question: {
        native: "Ué! Quem fez isso?",
        roman: "Ué! Quem fez isso?",
        english: "Huh! Who did that?",
        choices: [
          { native: "Foi o Saci!", roman: "Foi o Saci!", english: "It was the Saci!", right: true },
          { native: "É mentira!", roman: "É mentira!", english: "It's a lie!", reply: [{ who: "avo", text: "Ha — that's for the festa! Somebody DID tie those laces. Who?" }] },
          { native: "Vamos!", roman: "Vamos!", english: "Let's go!", reply: [{ who: "bia", text: "You can't go anywhere, your shoes are tied together! Who did it?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{Foi o Saci!}}", gloss: "“It was the Saci!” — what every Brazilian kid says when something mysteriously goes wrong." },
        { who: "bia", text: "(Giggling uncontrollably:) Yes. Definitely the Saci. Not me.", gloss: "It was definitely Bia." },
        { who: "avo", text: "Of course it was. He's been living on this farm longer than I have.", gloss: "Outside, a little whirlwind of dust spins across the yard." },
      ],
      encounter: ["foisaci", "saci", "gorro", "perna", "redemoinho", "peneira"],
      memory: "foisaci",
    },
    gates: [{ room: "cozinha", hotspot: "terreiro", until: "sitio", line: { who: "avo", text: "Sit with me first — the coffee's hot.", gloss: "Vovô pats the bench." } }],
    idle: {
      "terreiro:bia": [{ who: "bia", text: "If you see a whirlwind, throw your hat on it. That's almost like a sieve." }],
      "cozinha:vovo": [{ who: "vovo", text: "When I was little, my mother blamed the Saci for every lost thimble. She was usually right." }],
    },
    afterwards: {
      "cozinha:avo": [{ who: "avo", text: "Soon you fly home. Tie your shoelaces tight. He travels, you know." }],
      "terreiro:bia": [{ who: "bia", text: "I didn't do it. …OK, I did it. Don't tell Vovô." }],
    },
    complete: {
      title: "O",
      em: "Saci",
      text: "You sat by the wood stove, beat Bia's word test among the fireflies, heard the story of the Saci-Pererê — and knew exactly who to blame for your shoelaces.",
      quest: { v: "Check your shoelaces", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Terreiro />,
};

export default content;
