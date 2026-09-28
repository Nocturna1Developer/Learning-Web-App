import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Clouds, Hills, Ground, Item, RoundTree, FY } from "../scenes";
import { Figure, Child, Palm } from "../../components/scenes/primitives";
import { MG, Casario, Igreja, Football } from "./art";

/* PORTUGUESE · Chapter Two — A Cidade. Summer in Vovó's little gold-rush town in Minas Gerais. */

function Ladeira() {
  return (
    <Stage>
      <Sky id="pt2a" top="#6ab0e0" mid="#a8d0e8" bottom="#f4ead4" />
      <Sun x={180} y={110} r={46} color="#fbe6b0" />
      <Clouds seed={21} opacity={0.6} y={150} />
      <Hills y={430} color="#6a9a4a" amp={80} seed={6} />
      {/* the church at the top of the hill */}
      <Igreja x={760} y={440} s={0.62} />
      {/* the street climbing up to it */}
      <Casario x={-40} w={420} h={300} frame={MG.frames[0]} />
      <Casario x={380} w={300} h={240} y={680} frame={MG.frames[1]} />
      <Casario x={1180} w={460} h={310} frame={MG.frames[2]} />
      <Ground color={MG.cobble} line={MG.cobbleLine} kind="stone" />
      {/* the padaria on the corner */}
      <rect x={880} y={FY - 260} width="300" height="260" fill="#f4f0e6" />
      <rect x={900} y={FY - 170} width="260" height="170" fill="#c8452f" />
      <rect x={916} y={FY - 156} width="160" height="120" fill="#f4e8c8" opacity="0.9" />
      <rect x={880} y={FY - 230} width="300" height="44" fill="#1f5d3a" />
      <text x={1030} y={FY - 200} textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="26" letterSpacing="4" fill="#f4f0e6">PADARIA</text>
      {[940, 980, 1020].map((x) => <ellipse key={x} cx={x} cy={FY - 60} rx="16" ry="10" fill="#d8a050" />)}
      <Figure x={1110} y={FY} h={200} color="#2a1a12" flip />
      <Figure x={520} y={FY} h={195} color="#3a2a24" />
    </Stage>
  );
}

function Praca({ done }: { done: ReadonlySet<string> }) {
  const playing = done.has("bread");
  return (
    <Stage>
      <Sky id="pt2b" top="#6ab0e0" bottom="#f4ead4" />
      <Sun x={1420} y={110} r={46} color="#fbe6b0" />
      <Casario x={-40} w={460} h={300} frame={MG.frames[3]} />
      <Casario x={1180} w={460} h={290} frame={MG.frames[1]} />
      <Ground color={MG.cobble} line={MG.cobbleLine} kind="stone" />
      {/* the bandstand */}
      <rect x={560} y={FY - 60} width="300" height="60" fill="#f4f0e6" />
      {[580, 700, 820].map((x) => <rect key={x} x={x} y={FY - 260} width="16" height="200" fill="#f4f0e6" />)}
      <path d={`M540 ${FY - 260}l170 -80l170 80Z`} fill="#2f7d4a" />
      <Palm x={480} y={FY} h={320} lean={-10} color="#3f6a3a" />
      <RoundTree x={980} h={300} crown="#5a8a3a" dark="#3f6e3a" />
      {/* Vovô on his bench */}
      <rect x={130} y={FY - 64} width="180" height="12" fill="#6b4429" />
      <Figure x={220} y={FY} h={190} color="#2a1a12" pose="sit" />
      {/* the pelada: flip-flops for goalposts */}
      {[1060, 1170, 1380, 1490].map((x) => <ellipse key={x} cx={x} cy={FY - 6} rx="14" ry="5" fill={x < 1200 ? "#e8b830" : "#2d6ab8"} />)}
      <Child x={1200} y={FY} h={120} color="#2a1a12" />
      <Child x={1320} y={FY} h={112} color="#3a2a24" flip />
      {playing && <Child x={1420} y={FY} h={116} color="#2a1a12" flip />}
      <circle cx={1260} cy={FY - 14} r="13" fill="#f4f4f4" stroke="#2a2a2a" strokeWidth="2" />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "praca",
  speakers: {
    cida: { name: "Dona Cida", glyph: "C", tone: "guest" },
    davi: { name: "Davi", glyph: "D", tone: "guest" },
  },
  rooms: {
    praca: {
      id: "praca",
      name: "The praça",
      native: "a praça",
      art: (done) => <Praca done={done} />,
      spawn: { left: 360, right: 1200 },
      hotspots: [
        { id: "ladeira", x: 70, y: 560, label: "Up the hill", kind: "exit", to: "ladeira" },
        { id: "avo", x: 220, y: 580, label: "Vovô", kind: "npc" },
        { id: "coreto", x: 710, y: 480, label: "Bandstand", kind: "word", wordId: "praca" },
        { id: "pelada", x: 1260, y: 660, label: "The pelada", kind: "quest" },
        { id: "davi", x: 1200, y: 600, label: "A boy with a ball", kind: "npc" },
      ],
    },
    ladeira: {
      id: "ladeira",
      name: "The steep street",
      native: "a ladeira",
      art: <Ladeira />,
      spawn: { left: 300, right: 1300 },
      hotspots: [
        { id: "houses", x: 200, y: 560, label: "Coloured windows", kind: "word", wordId: "cidade" },
        { id: "neighbour", x: 520, y: 560, label: "A neighbour", kind: "flavor", note: "“Bom dia! Você é o neto da Dona Lurdes? Ou a neta?” Everyone in town seems to know Vovó. They all want to know which grandchild you are." },
        { id: "igreja", x: 760, y: 250, label: "The church", kind: "flavor", note: "White walls, blue doors, and inside, every surface carved and covered in gold leaf — gold from these very hills, three hundred years ago.", culture: "barroco" },
        { id: "padaria", x: 1030, y: 600, label: "Padaria", kind: "npc" },
        { id: "praca", x: 1530, y: 580, label: "Down to the praça", kind: "exit", to: "praca" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Capítulo dois · Portuguese",
      title: "A",
      em: "Cidade",
      text: "June — your summer holidays, and winter in Brazil, which in Minas just means sunny days and cold nights. You've flown with Vovó to her hometown — steep cobbled streets, houses painted white with bright blue and yellow window frames, and a church on the hill with gold inside.",
    },
    introLines: [
      { who: "avo", text: "{{Bom dia!}} Finally awake. Come, sit with your Vovô.", gloss: "Good morning! Vovô — grandpa — on his bench in the praça." },
      { who: "guide", text: "Quest: get the bread — and then find out who's playing football.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "avo",
        quest: { v: "Talk to Vovô", hint: "On his bench in the praça." },
        at: { room: "praca", hotspot: "avo" },
        encounter: ["avo", "cidade", "praca", "igreja"],
        lines: [
          { who: "avo", text: "This whole {{cidade}} fits in one {{praça}}. You'll know everybody by Friday. Everybody already knows you.", gloss: "Cidade — town. Praça — the town square." },
          { who: "avo", text: "Go up the hill to the padaria, just below the {{igreja}}. Dona Cida has the rolls. Tell her they're for Seu Antônio — that's me.", gloss: "Igreja — church. The exit on the left, up the steep street." },
        ],
      },
      {
        id: "bread",
        quest: { v: "Buy bread at the padaria", hint: "Up the steep street." },
        at: { room: "ladeira", hotspot: "padaria" },
        encounter: ["padaria"],
        lines: [{ who: "cida", text: "{{Bom dia!}} Seu Antônio's grandchild! Hold the bag, I know exactly what he wants.", gloss: "Dona Cida, who has run the padaria since before your Mamãe was born." }],
        game: {
          type: "fetch",
          npc: "cida",
          kicker: "Mini-game · A padaria",
          title: "Put what she names in the bag.",
          hint: "Nothing on the counter is labelled. Listen.",
          asks: [
            { wordId: "pao", native: "Dez pãezinhos franceses.", roman: "Dez pãezinhos franceses.", english: "Ten bread rolls." },
            { wordId: "bolo", native: "Um pedaço de bolo de fubá.", roman: "Um pedaço de bolo de fubá.", english: "A slice of cornmeal cake." },
            { wordId: "sonho", native: "E um sonho — pra você!", roman: "E um sonho — pra você!", english: "And a sonho — for you!" },
          ],
          items: [
            { wordId: "pao", label: "Crusty", art: <Item kind="round" color="#d8a050" accent="#f4dca0" /> },
            { wordId: "bolo", label: "Yellow", art: <Item kind="box" color="#e8c050" accent="#f4dca0" /> },
            { wordId: "sonho", label: "Sugary", art: <svg viewBox="0 0 80 90" aria-hidden="true"><ellipse cx="40" cy="56" rx="28" ry="18" fill="#d8a050" /><path d="M16 54q24 -8 48 0" stroke="#f4f0e6" strokeWidth="8" /><circle cx="30" cy="46" r="2" fill="#fff" /><circle cx="46" cy="44" r="2" fill="#fff" /></svg> },
          ],
          done: { native: "Prontinho!", roman: "Prontinho!", english: "All done!" },
        },
        after: [
          { who: "cida", text: "The sonho — “dream” — is filled with cream. It's a present. Don't tell Vovô.", gloss: "It's gone before you're out of the door." },
          { who: "avo", text: "(From the praça, shouting:) Your {{primo}} Davi's here with his ball! Come down!", gloss: "Primo — cousin." },
        ],
        culture: ["padaria"],
        memory: "bread",
        nudges: { "praca:avo": [{ who: "avo", text: "The padaria first! Up the hill." }] },
      },
      {
        id: "pelada",
        quest: { v: "Join the pelada", hint: "The football game in the praça." },
        at: { room: "praca", hotspot: "pelada" },
        encounter: ["primo", "bola"],
        lines: [
          { who: "davi", text: "You're my {{primo}} — or {{prima}}? Whatever! You're on my team. Flip-flops are the goals.", gloss: "Davi, nine, owns the only {{bola}} — ball — in the praça." },
          { who: "davi", text: "I'll shout the score. You keep count, OK?", gloss: "It's twenty minutes of shouting and one very happy dog." },
        ],
        game: {
          type: "count",
          npc: "davi",
          kicker: "Mini-game · A pelada",
          title: "Keep the score.",
          hint: "Tap the ball once for every goal, then call it.",
          unit: "goals",
          coin: <Football />,
          rounds: [
            { native: "Um gol!", roman: "Um gol!", english: "One goal!", answer: 1, wordId: "um" },
            { native: "Dois! Golaço!", roman: "Dois! Golaço!", english: "Two! What a goal!", answer: 2, wordId: "dois" },
            { native: "Três gols!", roman: "Três gols!", english: "Three goals!", answer: 3, wordId: "tres" },
            { native: "Quatro! Ganhamos!", roman: "Quatro! Ganhamos!", english: "Four! We won!", answer: 4, wordId: "quatro" },
          ],
          done: { native: "É campeão!", roman: "É campeão!", english: "Champions!" },
        },
        after: [{ who: "davi", text: "{{Gooool!}} Did you see my last one? Did you SEE it?", gloss: "Everyone in the praça saw it. Everyone in the praça heard it." }],
        culture: ["pelada"],
        memory: "pelada",
        nudges: {
          "praca:davi": [{ who: "davi", text: "Come on, we need one more player!" }],
          "praca:avo": [{ who: "avo", text: "Go and play! I'll hold the bread. And eat some of it." }],
        },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Davi", hint: "He's holding the ball under his arm." },
      lines: [{ who: "davi", text: "Davi wipes his forehead with his whole T-shirt and grins at you." }],
      asker: "davi",
      question: {
        native: "Amanhã tem mais. Vamos?",
        roman: "Amanhã tem mais. Vamos?",
        english: "There's another game tomorrow. Shall we?",
        choices: [
          { native: "Vamos!", roman: "Vamos!", english: "Let's go!", right: true },
          { native: "Um sonho.", roman: "Um sonho.", english: "A cream doughnut.", reply: [{ who: "davi", text: "Ha! After the game, OK? First — are you playing tomorrow?" }] },
          { native: "Quatro.", roman: "Quatro.", english: "Four.", reply: [{ who: "davi", text: "Four goals, yes! We won! But tomorrow — are you in?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{Vamos!}}", gloss: "“Let's go!”" },
        { who: "davi", text: "{{Beleza!}} Same time. Bring the sonho next time.", gloss: "Beleza — great! (literally, “beauty”)" },
        { who: "avo", text: "(From the bench:) Two days, and already a local.", gloss: "He's told three people so far." },
      ],
      encounter: ["vamos", "gol"],
      memory: "vamos",
    },
    idle: {
      "ladeira:padaria": [{ who: "cida", text: "Come back tomorrow — the pão de queijo is hottest at seven." }],
      "praca:avo": [{ who: "avo", text: "When I was your age, the ball was made of rags. We still won." }],
    },
    afterwards: {
      "praca:avo": [{ who: "avo", text: "Sunday is the feira. Vovó will make you carry everything. I'm warning you now." }],
      "praca:davi": [{ who: "davi", text: "Tomorrow. Same flip-flops." }],
    },
    complete: {
      title: "A",
      em: "Cidade",
      text: "You met Vovô in the praça, bought bread at the padaria by ear, kept score at the pelada — and said yes to tomorrow's game, in Portuguese.",
      quest: { v: "Eat the sonho before Vovô sees", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Ladeira />,
};

export default content;
