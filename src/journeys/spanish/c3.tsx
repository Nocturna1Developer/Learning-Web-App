import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Ground, Table, Item, FY } from "../scenes";
import { Walls, Window, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { MX, PuebloHouse, Bougainvillea, ClayPot, PapelPicado } from "./art";

/* SPANISH · Chapter Three — La Tamalada. Christmas week: the whole family, one table, six dozen tamales. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const husk = (extra?: ReactNode) => (
  <>
    <path d="M40 10q26 30 16 74h-32q-10 -44 16 -74Z" fill="#e8d6a0" />
    <path d="M40 16v64M32 30l2 46M48 30l-2 46" stroke="#c9b27a" strokeWidth="1.5" />
    {extra}
  </>
);
const soakCard = card(<><rect x="8" y="46" width="64" height="36" rx="8" fill="#2f7fa8" /><path d="M20 50q20 -44 30 -36M34 50q10 -40 26 -30" stroke="#e8d6a0" strokeWidth="7" fill="none" strokeLinecap="round" /><path d="M12 56q28 8 56 0" stroke="#8fc0dc" strokeWidth="4" fill="none" /></>);
const spreadCard = card(husk(<path d="M28 44h24v30h-24Z" fill="#f0cf6a" />));
const salsaCard = card(husk(<><path d="M28 44h24v30h-24Z" fill="#f0cf6a" /><ellipse cx="40" cy="58" rx="8" ry="10" fill="#c0392b" /></>));
const foldCard = card(<><path d="M24 26h32v56h-32Z" fill="#e8d6a0" /><path d="M24 26l16 12l16 -12" fill="#d8c48a" /><path d="M28 82h24" stroke="#c9b27a" strokeWidth="3" /></>);
const potCard = card(<><path d="M12 40q-6 40 28 44q34 -4 28 -44Z" fill="#b8642f" />{[24, 34, 44, 54].map((x) => <path key={x} d={`M${x} 42v-22h8v22`} fill="#e8d6a0" />)}<path d="M26 18q-4 -8 2 -14M50 18q4 -8 -2 -14" stroke="#f4ecdd" strokeWidth="3" fill="none" opacity="0.6" /></>);

function Talavera({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const cols = Math.floor(w / 40);
  const rows = Math.floor(h / 40);
  return (
    <g>
      <rect x={x} y={y} width={cols * 40} height={rows * 40} fill="#f4efe4" />
      {Array.from({ length: cols * rows }, (_, i) => {
        const cx = x + (i % cols) * 40 + 20;
        const cy = y + Math.floor(i / cols) * 40 + 20;
        return (
          <g key={i}>
            <rect x={cx - 20} y={cy - 20} width="40" height="40" fill="none" stroke="#c9c0ae" strokeWidth="1" />
            <circle cx={cx} cy={cy} r="9" fill={i % 2 ? "#2d5ab8" : "#e8a33d"} />
            <path d={`M${cx - 16} ${cy}h32M${cx} ${cy - 16}v32`} stroke="#2d5ab8" strokeWidth="2" opacity="0.5" />
          </g>
        );
      })}
    </g>
  );
}

function Cocina({ done }: { done: ReadonlySet<string> }) {
  const cooked = done.has("steps");
  return (
    <Stage>
      <Walls tint="#efe2c4" floor="#b8642f" floorLine="#8a4a22" />
      <Talavera x={1040} y={380} w={480} h={200} />
      <Window x={360} y={200} w={260} h={200} />
      <PapelPicado x1={60} x2={900} y={90} sag={20} n={10} />
      {/* chiles and garlic hanging */}
      {[120, 170, 220].map((x, i) => (
        <g key={x}>
          <line x1={x} y1={140} x2={x} y2={250} stroke="#6b4a1e" strokeWidth="2" />
          {Array.from({ length: 5 }, (_, k) => <ellipse key={k} cx={x + (k % 2 ? 6 : -6)} cy={160 + k * 20} rx="6" ry="12" fill={i === 1 ? "#f4ecdd" : "#a8211e"} />)}
        </g>
      ))}
      {/* the stove: olla on the fire, champurrado */}
      <rect x={1060} y={FY - 170} width="440" height="170" fill="#8a847c" />
      <rect x={1060} y={FY - 184} width="440" height="20" fill="#6b6660" />
      <ClayPot x={1180} y={FY - 184} s={1.2} steam />
      <ClayPot x={1390} y={FY - 184} s={0.8} steam />
      <Figure x={1300} y={FY} h={200} color="#2a1a12" flip />
      {/* the table */}
      <Table x={420} w={560} cloth="#f4ecdd" />
      <ellipse cx={560} cy={FY - 160} rx="70" ry="18" fill="#f0cf6a" />
      <path d="M490 610q70 30 140 0" fill="#f4ecdd" />
      {[700, 740, 780, 820].map((x, i) => <path key={x} d={`M${x} ${FY - 152}q12 -40 24 0Z`} fill="#e8d6a0" transform={`rotate(${i * 8 - 12} ${x + 12} ${FY - 160})`} />)}
      {cooked && [880, 900, 920].map((x) => <rect key={x} x={x} y={FY - 190} width="16" height="36" rx="4" fill="#e8d6a0" />)}
      <Figure x={930} y={FY} h={200} color="#3a2a24" pose="sit" flip />
      <rect x={60} y={FY - 330} width="170" height="330" fill={WOOD} />
      <rect x={70} y={FY - 320} width="150" height="310" fill="#241812" opacity="0.6" />
    </Stage>
  );
}

function Patio() {
  return (
    <Stage>
      <Sky id="es3" top="#7ab0d4" bottom="#f4e6c8" />
      <Sun x={1300} y={120} r={46} color="#fbe6a8" />
      <PuebloHouse x={-40} w={520} h={380} wall={MX.adobe[3]} door={false} />
      <PuebloHouse x={1120} w={520} h={380} wall={MX.adobe[4]} />
      <Bougainvillea x={60} y={330} w={320} />
      <Ground color="#c9a67a" line="#a8845a" kind="stone" />
      {/* the clothesline, with the good tablecloths airing */}
      <path d="M120 250 Q800 310 1480 250" stroke="#6b4a1e" strokeWidth="2" fill="none" />
      {[300, 520, 980, 1200].map((x, i) => <rect key={x} x={x} y={272 + (i % 2) * 6} width="120" height="90" fill={["#c84a7a", "#f4ecdd", "#2f7fa8", "#e8a33d"][i]} />)}
      {/* the tub of soaking husks */}
      <rect x={560} y={FY - 90} width="220" height="90" rx="14" fill="#2f7fa8" />
      {[590, 630, 670, 710, 740].map((x, i) => <path key={x} d={`M${x} ${FY - 86}q${i % 2 ? 20 : -10} -70 ${20 + i * 3} -60`} stroke="#e8d6a0" strokeWidth="14" fill="none" strokeLinecap="round" />)}
      {/* sacks of corn */}
      {[920, 1010].map((x) => <path key={x} d={`M${x} ${FY}v-110q40 -30 80 0v110Z`} fill="#c8a870" />)}
      {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={940 + i * 16} cy={FY - 118 + (i % 2) * 6} r="7" fill="#f0c040" />)}
      <Child x={420} y={FY} h={130} color="#2a1a12" />
      <path d="M1480 520 l-30 60" stroke="#6b4a1e" strokeWidth="4" />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "cocina",
  speakers: {
    lupe: { name: "Tía Lupe", glyph: "L", tone: "guest" },
    mateo: { name: "Mateo", glyph: "M", tone: "guest" },
  },
  rooms: {
    cocina: {
      id: "cocina",
      name: "Abuela's kitchen",
      native: "la cocina",
      art: (done) => <Cocina done={done} />,
      spawn: { left: 300, right: 1100 },
      hotspots: [
        { id: "patio", x: 145, y: 560, label: "Courtyard", kind: "exit", to: "patio" },
        { id: "masa", x: 560, y: 560, label: "Bowl of masa", kind: "word", wordId: "masa" },
        { id: "table", x: 760, y: 560, label: "The table", kind: "quest" },
        { id: "lupe", x: 930, y: 560, label: "Tía Lupe", kind: "npc" },
        { id: "olla", x: 1180, y: 470, label: "The big olla", kind: "word", wordId: "olla" },
        { id: "abuela", x: 1300, y: 560, label: "Abuela", kind: "npc" },
        { id: "tiles", x: 1420, y: 460, label: "Talavera tiles", kind: "flavor", note: "Blue and yellow tiles from Puebla, set by Abuelo in 1971. Two are cracked; nobody will replace them." },
      ],
    },
    patio: {
      id: "patio",
      name: "The courtyard",
      native: "el patio",
      art: <Patio />,
      spawn: { left: 300, right: 1300 },
      hotspots: [
        { id: "bougainvillea", x: 220, y: 380, label: "Bugambilia", kind: "flavor", note: "Bugambilia — bougainvillea — over the whole wall. Abuela planted it the year she got married." },
        { id: "mateo", x: 420, y: 600, label: "A boy your age", kind: "npc" },
        { id: "tub", x: 670, y: 640, label: "Tub of husks", kind: "quest" },
        { id: "maiz", x: 1000, y: 620, label: "Sacks of corn", kind: "word", wordId: "maiz" },
        { id: "cocina", x: 1470, y: 560, label: "Kitchen", kind: "exit", to: "cocina" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Capítulo tres · Spanish",
      title: "La",
      em: "Tamalada",
      text: "Christmas week. Tías, tíos and cousins have come from three towns, and every one of them has been handed a job. Tamales take all day — and nobody here minds.",
    },
    introLines: [
      { who: "abuela", text: "{{¡A trabajar!}} Your Tía Lupe is in charge today. Even of me.", gloss: "¡A trabajar! — to work!" },
      { who: "guide", text: "Quest: help make six dozen tamales.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "hello",
        quest: { v: "Report to Tía Lupe", hint: "She's at the kitchen table." },
        at: { room: "cocina", hotspot: "lupe" },
        encounter: ["tia", "tamal", "mesa"],
        lines: [
          { who: "lupe", text: "{{¡Por fin!}} I'm your {{tía}} Lupe — your mamá's big sister. You've grown!", gloss: "¡Por fin! — finally! Tía — aunt." },
          { who: "lupe", text: "Every {{tamal}} starts with an {{hoja}}. They're soaking in the tub outside. Bring me a big stack.", gloss: "Hoja — a corn husk." },
        ],
        nudges: {
          "cocina:abuela": [{ who: "abuela", text: "Tía Lupe is waiting for you. {{Ándale.}}", gloss: "Go on." }],
          "cocina:table": [{ who: "guide", text: "Masa, husks, salsa, and nobody sitting still. Tía Lupe runs this table." }],
        },
      },
      {
        id: "hojas",
        quest: { v: "Fetch the husks", hint: "In the tub in the courtyard." },
        at: { room: "patio", hotspot: "tub" },
        encounter: ["hoja", "primo"],
        lines: [
          { who: "mateo", text: "Careful — they're slippery. {{Soy Mateo. Tu primo.}}", gloss: "“I'm Mateo. Your cousin.” He's already holding half the stack." },
          { who: "mateo", text: "Tía Lupe made me soak them at six in the morning. {{¡Seis!}}", gloss: "Six! He's not over it." },
          { who: "guide", text: "Two armfuls of wet {{hojas}}, back to the kitchen.", gloss: "Mateo takes the other half." },
        ],
        nudges: {
          "cocina:lupe": [{ who: "lupe", text: "{{¡Las hojas!}} In the tub, outside.", gloss: "The husks!" }],
          "patio:mateo": [{ who: "mateo", text: "The tub's right there. Grab the husks!" }],
        },
      },
      {
        id: "fetch",
        quest: { v: "Help at the table", hint: "Tía Lupe needs things passed to her." },
        at: { room: "cocina", hotspot: "lupe" },
        lines: [{ who: "lupe", text: "{{Perfecto.}} Now sit. When I ask for something, pass it — fast.", gloss: "Everyone at the table is already talking at once." }],
        game: {
          type: "fetch",
          npc: "lupe",
          kicker: "Mini-game · La mesa",
          title: "Pass Tía Lupe what she asks for.",
          hint: "Nothing on the table is labelled. Listen for the word.",
          asks: [
            { wordId: "masa", native: "Pásame la masa.", roman: "Pásame la masa.", english: "Pass me the masa." },
            { wordId: "hoja", native: "Una hoja, por favor.", roman: "Una hoja, por favor.", english: "A husk, please." },
            { wordId: "cuchara", native: "¿Dónde está la cuchara?", roman: "¿Dónde está la cuchara?", english: "Where's the spoon?" },
            { wordId: "salsa", native: "¡Y la salsa!", roman: "¡Y la salsa!", english: "And the salsa!" },
          ],
          items: [
            { wordId: "masa", label: "Big bowl", art: <Item kind="bowl" color="#f0cf6a" accent="#f4ecdd" /> },
            { wordId: "hoja", label: "Wet stack", art: <Item kind="leaf" color="#e8d6a0" /> },
            { wordId: "salsa", label: "Stone bowl", art: <Item kind="bowl" color="#a8211e" accent="#5a5650" /> },
            { wordId: "cuchara", label: "Wooden", art: <Item kind="long" color="#b8864a" /> },
          ],
          done: { native: "¡Eso! ¡Qué rapidez!", roman: "¡Eso! ¡Qué rapidez!", english: "That's it! So fast!" },
        },
        after: [
          { who: "lupe", text: "Now you make one. Watch my hands, then do it yourself.", gloss: "She pushes a husk across the table to you." },
          { who: "abuela", text: "Your mamá's first tamal fell apart in the pot. {{Nadie se acuerda.}}", gloss: "“Nobody remembers.” Everybody remembers." },
        ],
        culture: ["champurrado"],
        memory: "hands",
        nudges: { "patio:mateo": [{ who: "mateo", text: "Go! Tía Lupe doesn't like waiting." }] },
      },
      {
        id: "steps",
        quest: { v: "Make your first tamal", hint: "At the kitchen table." },
        at: { room: "cocina", hotspot: "table" },
        encounter: ["salsa"],
        lines: [{ who: "lupe", text: "{{Primero}}, soak. {{Luego}}, spread. Then salsa, then fold. Then into the {{olla}}.", gloss: "Primero — first. Luego — then." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · Un tamal",
          title: "Make a tamal, in order.",
          hint: "Tap the steps in the order Tía Lupe showed you.",
          steps: [
            { native: "Remoja la hoja.", roman: "Remoja la hoja.", english: "Soak the husk.", wordId: "hoja", art: soakCard },
            { native: "Unta la masa.", roman: "Unta la masa.", english: "Spread the masa.", wordId: "masa", art: spreadCard },
            { native: "Pon la salsa.", roman: "Pon la salsa.", english: "Add the salsa.", wordId: "salsa", art: salsaCard },
            { native: "Dobla el tamal.", roman: "Dobla el tamal.", english: "Fold the tamal.", wordId: "tamal", art: foldCard },
            { native: "¡A la olla!", roman: "¡A la olla!", english: "Into the pot!", wordId: "olla", art: potCard },
          ],
          done: "Six dozen, standing up in the olla. Only an hour to wait.",
        },
        after: [
          { who: "guide", text: "An hour of stories. Who married who, who moved to Chicago, the year the rooster got into church.", gloss: "Nobody's hands stop moving." },
          { who: "lupe", text: "{{¡Ya están!}} Taste the first one. You earned it.", gloss: "They're ready!" },
        ],
        culture: ["tamalada"],
        memory: "tamales",
        nudges: {
          "cocina:lupe": [{ who: "lupe", text: "Your turn. {{Ven a la mesa.}}", gloss: "Come to the table." }],
          "cocina:abuela": [{ who: "abuela", text: "Go on — make one. I'll tell you if it's crooked." }],
        },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Tía Lupe", hint: "She wants to know how it tastes." },
      lines: [{ who: "lupe", text: "She peels back the husk for you. Steam, and the smell of corn and chile. The whole table goes quiet to watch." }],
      asker: "lupe",
      question: {
        native: "¿Cómo están?",
        roman: "¿Cómo están?",
        english: "How are they?",
        choices: [
          { native: "¡Están muy ricos!", roman: "¡Están muy ricos!", english: "They're delicious!", right: true },
          { native: "Están en la olla.", roman: "Están en la olla.", english: "They're in the pot.", reply: [{ who: "lupe", text: "Not any more — one's in your hand! How does it taste?" }] },
          { native: "Es mi tía.", roman: "Es mi tía.", english: "She's my aunt.", reply: [{ who: "mateo", text: "Yes, she's your tía. She asked how they taste!", gloss: "Mateo, laughing into his champurrado." }] },
        ],
      },
      right: [
        { who: "you", text: "{{¡Están muy ricos!}}", gloss: "“They're delicious!”" },
        { who: "lupe", text: "{{¡Eso!}} You're coming every year now. That's the rule.", gloss: "That's it!" },
        { who: "abuela", text: "Straighter than your mamá's, too." },
      ],
      encounter: ["rico"],
      memory: "rico",
    },
    gates: [{ room: "cocina", hotspot: "patio", until: "hello", line: { who: "abuela", text: "Say hello to Tía Lupe first. {{Educación.}}", gloss: "Manners." } }],
    idle: {
      "cocina:lupe": [{ who: "lupe", text: "Keep your hands busy and your ears open. That's how you learn everything in this family." }],
      "patio:tub": [{ who: "guide", text: "The tub's empty. Mateo is suspiciously proud of that." }],
      "patio:mateo": [{ who: "mateo", text: "Next week there's the posada. You get to hit the piñata — if Lupita doesn't get it first." }],
    },
    afterwards: {
      "cocina:abuela": [{ who: "abuela", text: "Six dozen. We'll give half away before Christmas. That's what they're for." }],
      "patio:mateo": [{ who: "mateo", text: "I ate four. Don't tell Tía Lupe." }],
    },
    complete: {
      title: "La",
      em: "Tamalada",
      text: "You met your Tía Lupe and your primo Mateo, passed everything by ear, made your first tamal step by step — and told the whole table it was delicious.",
      quest: { v: "Have another tamal", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Cocina done={new Set(["steps"])} />,
};

export default content;
