import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, VideoCall, Table, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure } from "../../components/scenes/primitives";
import { Portrait } from "../kit";
import { PaoDeQueijo, Saci } from "./art";

/* PORTUGUESE · Chapter Six — A Família. Home again, full of saudade, and a call to Minas. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const breadCard = card(<>{[26, 40, 54, 33, 47].map((x, i) => <PaoDeQueijo key={i} x={x} y={i < 3 ? 60 : 44} r={9} />)}</>);
const mangoCard = card(<><ellipse cx="40" cy="54" rx="22" ry="26" fill="#f0a030" /><ellipse cx="34" cy="44" rx="10" ry="14" fill="#c8452f" opacity="0.5" /><path d="M40 28q6 -10 14 -10" stroke="#3f7d55" strokeWidth="4" fill="none" /></>);
const fireCard = card(<><path d="M20 80l40 -8M20 72l40 8" stroke="#6b4429" strokeWidth="6" /><path d="M24 70q-4 -24 16 -40q-2 14 8 18q6 -12 2 -22q18 16 8 44Z" fill="#f08a2a" /><path d="M34 70q0 -14 8 -20q2 10 6 10q2 6 -2 10Z" fill="#fbd060" /></>);
const saciCard = card(<><rect width="80" height="90" fill="#141a36" /><Saci x={40} y={86} s={0.6} color="#0a0810" /></>);

function Sala({ done }: { done: ReadonlySet<string> }) {
  return (
    <Stage>
      <Walls />
      <Door x={40} />
      <Window x={330} y={210} w={280} h={220} />
      <PhotoFrame x={690} y={240} w={140} h={110} tint="#2f7d4a" two />
      {/* the straw hat from the festa, on a hook */}
      <path d="M900 340q50 -34 100 0q-20 -18 -50 -18t-50 18Z" fill="#d8b870" />
      <circle cx={950} cy={318} r="4" fill="#6b4429" />
      <Table x={560} w={460} />
      <VideoCall x={650} y={FY - 150 - 190} w={300} faces={done.has("call") ? 5 : 2} bgs={["#2f7d4a", "#d89a2a", "#2d6ab8", "#c8452f"]} />
      <rect x={1100} y={FY - 140} width="360" height="140" rx="12" fill="#2f5d4a" />
      <rect x={1100} y={FY - 200} width="360" height="74" rx="14" fill="#3f6d5a" />
      <Figure x={1250} y={FY - 20} h={190} color="#2a1a12" pose="sit" />
      <Figure x={1400} y={FY} h={205} color="#3a2a24" flip />
    </Stage>
  );
}

function Quarto() {
  return (
    <Stage>
      <Walls tint="#e6e2d4" />
      <Window x={240} y={220} w={320} h={230} />
      {/* a tiny red cap on the shelf. Nobody knows how it got into the suitcase. */}
      <rect x={640} y={330} width="200" height="12" fill={WOOD} />
      <path d="M710 330q10 -44 50 -30q-10 10 -12 30Z" fill="#d8302a" />
      <rect x={880} y={FY - 170} width="300" height="170" rx="12" fill="#2f7d4a" />
      <path d={`M880 ${FY - 170} l40 -90 h220 l40 90`} fill="#3f8d5a" />
      <ellipse cx={980} cy={FY - 180} rx="40" ry="16" fill="#f8f4e8" />
      <path d={`M1040 ${FY - 196}q30 -20 60 0q-10 -8 -30 -8t-30 8Z`} fill="#d8b870" />
      <rect x={60} y={FY - 150} width="420" height="150" fill="#8c6240" />
      <rect x={60} y={FY - 126} width="420" height="60" fill="#d89a2a" />
      <rect x={1240} y={FY - 420} width="240" height="420" fill={WOOD} />
      {[0, 1, 2, 3].map((r) => <rect key={r} x={1250} y={FY - 400 + r * 100} width="220" height="88" fill="#3a2718" />)}
      <Door x={1500} open />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "quarto",
  speakers: {
    tio: { name: "Tio Marcos", glyph: "M", tone: "guest" },
    tia: { name: "Tia Fernanda", glyph: "F", tone: "guest" },
    davi: { name: "Davi", glyph: "D", tone: "guest" },
    bia: { name: "Bia", glyph: "B", tone: "guest" },
  },
  rooms: {
    quarto: {
      id: "quarto",
      name: "Your room",
      native: "seu quarto",
      art: <Quarto />,
      spawn: { left: 560, right: 1360 },
      hotspots: [
        { id: "window", x: 400, y: 460, label: "Window", kind: "word", wordId: "casa" },
        { id: "cap", x: 740, y: 316, label: "A tiny red cap", kind: "word", wordId: "gorro" },
        { id: "suitcase", x: 1030, y: 620, label: "Suitcase", kind: "quest" },
        { id: "sala", x: 1540, y: 560, label: "Living room", kind: "exit", to: "sala" },
      ],
    },
    sala: {
      id: "sala",
      name: "Living room",
      native: "a sala",
      art: (done) => <Sala done={done} />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "back", x: 130, y: 560, label: "Your room", kind: "exit", to: "quarto" },
        { id: "photo", x: 760, y: 295, label: "New photo", kind: "word", wordId: "familia" },
        { id: "hat", x: 950, y: 330, label: "Straw hat", kind: "word", wordId: "chapeu" },
        { id: "laptop", x: 800, y: 520, label: "Video call", kind: "quest" },
        { id: "mae", x: 1250, y: 560, label: "Mamãe", kind: "npc" },
        { id: "papai", x: 1400, y: 560, label: "Papai", kind: "word", wordId: "papai" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Capítulo seis · Portuguese",
      title: "A",
      em: "Família",
      text: "Home again. The house is quiet, the jet lag is winning, and you've discovered there's a Portuguese word for exactly how you feel: saudade.",
    },
    introLines: [
      { who: "mae", text: "Unpack, then come — Minas is calling. Everyone's at Vovó's for Sunday lunch.", gloss: "Mamãe, from the living room." },
      { who: "guide", text: "Quest: bring Minas home.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "unpack",
        quest: { v: "Unpack your suitcase", hint: "In your room." },
        at: { room: "quarto", hotspot: "suitcase" },
        encounter: ["mala", "lembranca"],
        lines: [
          { who: "guide", text: "A straw hat, squashed flat. Half a queijo minas, wrapped in three layers of plastic. And — somehow — a very small red cap you definitely didn't pack.", gloss: "All in the {{mala}}." },
          { who: "guide", text: "Every one of them a {{lembrança}}.", gloss: "Lembrança — a keepsake, and a memory. The same word." },
          { who: "mae", text: "{{Tão ligando!}} Come, come!", gloss: "They're calling!" },
        ],
        memory: "keepsakes",
      },
      {
        id: "call",
        quest: { v: "Join the video call", hint: "In the living room." },
        at: { room: "sala", hotspot: "laptop" },
        lines: [
          { who: "vovo", text: "{name}! {{Oi, meu amor!}} Can you see us? Marcos, hold the phone STILL!", gloss: "Vovó, on the screen." },
          { who: "tio", text: "I'm holding it still! It's the internet that's shaking!", gloss: "Tio Marcos — Mamãe's brother. Davi and Bia's dad." },
          { who: "guide", text: "Five faces around Vovó's table. Who's who?", gloss: "Put everyone in their place." },
        ],
        game: {
          type: "place",
          board: "album",
          kicker: "Mini-game · A família",
          title: "Who's who on the call?",
          hint: "Pick someone, then the word that fits. Portuguese cousins come in two words.",
          tray: "On the screen",
          done: "Everyone has a name — and a Portuguese one.",
          items: [
            { wordId: "tio", who: "Mamãe's brother", hint: "Marcos. Blames the internet for everything.", art: <Portrait />, tint: "#2f7d4a" },
            { wordId: "tia", who: "Tio Marcos's wife", hint: "Fernanda. Makes the best pé de moleque in town.", art: <Portrait />, tint: "#d89a2a" },
            { wordId: "primo", who: "The boy with the ball", hint: "Davi. Still talking about his last goal.", art: <Portrait child />, tint: "#2d6ab8" },
            { wordId: "prima", who: "The girl with the fireflies", hint: "Bia. Definitely did not tie your shoelaces.", art: <Portrait child />, tint: "#c8452f" },
          ],
        },
        after: [{ who: "tia", text: "Now tell us everything. {{Em português!}}", gloss: "In Portuguese!" }],
        memory: "call",
        nudges: { "quarto:suitcase": [{ who: "guide", text: "The rest can wait. They're calling." }] },
      },
      {
        id: "retell",
        quest: { v: "Tell them about your trip", hint: "On the call." },
        at: { room: "sala", hotspot: "laptop" },
        lines: [{ who: "guide", text: "Tell it in order — the way it happened.", gloss: "Everything you did, in Portuguese." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · Lembranças",
          title: "Tell your trip in order.",
          hint: "From the first morning in the praça to the last night at the sítio.",
          steps: [
            { native: "O pão da padaria", roman: "O pão da padaria", english: "bread from the padaria", wordId: "pao", art: breadCard },
            { native: "As mangas da feira", roman: "As mangas da feira", english: "mangoes at the feira", wordId: "manga", art: mangoCard },
            { native: "A fogueira da festa", roman: "A fogueira da festa", english: "the festa bonfire", wordId: "fogueira", art: fireCard },
            { native: "O Saci no sítio", roman: "O Saci no sítio", english: "the Saci at the farm", wordId: "saci", art: saciCard },
          ],
          done: "The whole trip, in Portuguese. Vovó has stopped talking, which has never happened before.",
        },
        memory: "retold",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Bia", hint: "She's pushed everyone out of the way." },
      lines: [{ who: "bia", text: "Bia climbs onto the table and puts her face right up against the camera." }],
      asker: "bia",
      question: {
        native: "Quando você volta?",
        roman: "Quando você volta?",
        english: "When are you coming back?",
        choices: [
          { native: "Logo, logo!", roman: "Logo, logo!", english: "Very soon!", right: true },
          { native: "Foi o Saci!", roman: "Foi o Saci!", english: "It was the Saci!", reply: [{ who: "davi", text: "Ha! Probably. But when are you coming BACK?" }] },
          { native: "É só isso, valeu!", roman: "É só isso, valeu!", english: "That's all, thanks!", reply: [{ who: "tio", text: "We're not Dona Rosa's flower stall! When are you coming?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{Logo, logo!}}", gloss: "“Very soon!”" },
        { who: "bia", text: "{{Tô com saudade.}}", gloss: "“I miss you.” Saudade — missing someone so much it's almost sweet. Portuguese is famous for this word." },
        { who: "you", text: "{{Eu também tô com saudade!}}", gloss: "“I miss you too!”" },
        { who: "vovo", text: "In this family we don't say goodbye. {{Um beijo, até logo!}}", gloss: "A kiss — and see you soon." },
        { who: "you", text: "{{Beijo! Até logo!}}", gloss: "“Kisses! See you soon!”" },
      ],
      encounter: ["logo", "saudade", "beijo", "atelogo"],
      memory: "atelogo",
    },
    idle: {
      "sala:mae": [{ who: "mae", text: "Go on — Vovó's been sitting in front of the phone since breakfast." }],
      "quarto:suitcase": [{ who: "guide", text: "Everything's out. The red cap stays on the shelf. Where you can see it." }],
    },
    afterwards: {
      "sala:mae": [{ who: "mae", text: "The whole call in Portuguese. Vovó is going to tell the entire padaria tomorrow morning." }],
      "sala:laptop": [{ who: "guide", text: "The call's over. In Minas, someone is putting the coffee on the wood stove." }],
    },
    complete: {
      title: "A",
      em: "Família",
      text: "Keepsakes unpacked, tio, tia, primo and prima all named, your whole trip retold in Portuguese — and a word for missing them that you'll never forget.",
      quest: { v: "Put the straw hat on the hook", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Sala done={new Set(["call"])} />,
};

export default content;
