import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Table, Item, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { Icon } from "../kit";
import { PaoDeQueijo } from "./art";

/* PORTUGUESE · Chapter One — Pão de Queijo. Vovó has flown in from Minas Gerais with a whole cheese in her suitcase. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const scaldCard = card(<><path d="M6 46h68q-4 32 -34 32T6 46Z" fill="#dfe8ee" /><ellipse cx="40" cy="46" rx="34" ry="8" fill="#f4f0e6" /><path d="M28 20q-6 -10 2 -16M44 20q6 -10 -2 -16" stroke="#f4ecdd" strokeWidth="3" fill="none" opacity="0.8" /><path d="M20 40q20 -30 40 -10" stroke="#f4f4f4" strokeWidth="6" fill="none" /></>);
const eggsCard = card(<><path d="M6 46h68q-4 32 -34 32T6 46Z" fill="#dfe8ee" /><ellipse cx="40" cy="46" rx="34" ry="8" fill="#f4ecd0" /><ellipse cx="34" cy="44" rx="7" ry="4" fill="#f0c030" /><ellipse cx="48" cy="46" rx="7" ry="4" fill="#f0c030" /></>);
const cheeseCard = card(<><path d="M6 46h68q-4 32 -34 32T6 46Z" fill="#dfe8ee" /><ellipse cx="40" cy="46" rx="34" ry="8" fill="#f4ecd0" />{[26, 36, 46, 54].map((x, i) => <rect key={x} x={x} y={36 + (i % 2) * 4} width="8" height="6" fill="#f8f4e8" stroke="#d8d0b8" />)}</>);
const rollCard = card(<>{[24, 40, 56, 32, 48].map((x, i) => <PaoDeQueijo key={i} x={x} y={i < 3 ? 60 : 42} r={9} />)}</>);
const ovenCard = card(<><rect x="8" y="16" width="64" height="64" rx="6" fill="#4a4a4e" /><rect x="16" y="30" width="48" height="38" rx="4" fill="#f0a040" opacity="0.8" />{[26, 40, 54].map((x) => <PaoDeQueijo key={x} x={x} y={56} r={6} />)}</>);

function Entrada({ done }: { done: ReadonlySet<string> }) {
  const open = done.has("mala");
  return (
    <Stage>
      <Walls tint="#efe8da" />
      <Door x={40} open />
      <PhotoFrame x={300} y={240} w={120} h={140} tint="#2f7d4a" />
      <PhotoFrame x={450} y={270} w={150} h={110} tint="#d89a2a" two />
      <Window x={680} y={220} w={260} h={200} />
      {/* Vovó's suitcase, and the box tied with string */}
      <rect x={1150} y={FY - 150} width="200" height="150" rx="12" fill="#2f7d4a" />
      <rect x={1160} y={FY - 140} width="180" height="130" rx="8" fill="none" stroke="#1f5d3a" strokeWidth="3" />
      <rect x={1040} y={FY - 90} width="100" height="90" fill="#c8a870" />
      <path d={`M1040 ${FY - 45}h100M1090 ${FY - 90}v90`} stroke="#6b4a1e" strokeWidth="3" />
      {open && (
        <>
          <path d={`M1150 ${FY - 150}l30 -80h140l30 80`} fill="#3f8d5a" />
          <ellipse cx={1210} cy={FY - 170} rx="40" ry="18" fill="#f8f4e8" />
          <rect x={1260} y={FY - 190} width="60" height="36" rx="4" fill="#8a2a3a" />
        </>
      )}
      <Figure x={880} y={FY} h={195} color="#2a1a12" flip />
      <Figure x={620} y={FY} h={210} color="#3a2a24" />
      <Child x={560} y={FY} h={104} color="#3a2a24" />
      <Door x={1420} open />
    </Stage>
  );
}

function Cozinha({ done }: { done: ReadonlySet<string> }) {
  const baked = done.has("baked");
  return (
    <Stage>
      <Walls tint="#f2ead8" floor="#a88a6a" floorLine="#886a4a" shade="#dcd0b8" />
      <Window x={380} y={200} w={280} h={210} />
      <rect x={80} y={FY - 400} width="200" height="400" rx="10" fill="#e8ecee" />
      <rect x={250} y={FY - 330} width="10" height="80" rx="4" fill="#a8b0b8" />
      {/* counter, oven, the cloth coffee strainer */}
      <rect x={980} y={FY - 170} width="440" height="170" fill={WOOD} />
      <rect x={970} y={FY - 184} width="460" height="18" fill="#8a8078" />
      <rect x={1200} y={FY - 170} width="200" height="170" fill="#4a4a4e" />
      <rect x={1216} y={FY - 150} width="168" height="100" rx="6" fill={baked ? "#f0a040" : "#2a2a2e"} opacity="0.85" />
      <path d={`M1060 ${FY - 184}v-80`} stroke="#8a8078" strokeWidth="4" />
      <path d={`M1030 ${FY - 264}h60l-14 40h-32Z`} fill="#f4f0e6" />
      <path d={`M1044 ${FY - 184}v-30h32v30Z`} fill="#c8c8cc" />
      <Table x={480} w={420} cloth="#f4f0e6" />
      <path d={`M480 ${FY - 150}h420`} stroke="#2f7d4a" strokeWidth="6" strokeDasharray="14 14" />
      {baked && [560, 600, 640, 580, 620].map((x, i) => <PaoDeQueijo key={i} x={x} y={FY - 162 - (i > 2 ? 16 : 0)} r={16} />)}
      {baked && <path d={`M760 ${FY - 150}h30l-4 -34h-22Z`} fill="#f4f0e6" />}
      <Figure x={1130} y={FY} h={195} color="#2a1a12" flip />
      <Figure x={420} y={FY} h={210} color="#3a2a24" />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "entrada",
  rooms: {
    entrada: {
      id: "entrada",
      name: "Front hall",
      native: "a entrada",
      art: (done) => <Entrada done={done} />,
      spawn: { left: 300, right: 1300 },
      hotspots: [
        { id: "door", x: 130, y: 560, label: "Front door", kind: "word", wordId: "casa" },
        { id: "photos", x: 440, y: 320, label: "Family photos", kind: "word", wordId: "familia" },
        { id: "papai", x: 620, y: 560, label: "Papai", kind: "word", wordId: "papai" },
        { id: "vovo", x: 880, y: 560, label: "Vovó", kind: "npc" },
        { id: "box", x: 1090, y: 640, label: "A box tied with string", kind: "flavor", note: "A cardboard box tied with string, “FRÁGIL” written on every side. Inside: two dozen jars of doce de leite. Vovó doesn't trust American shops." },
        { id: "mala", x: 1250, y: 640, label: "Vovó's suitcase", kind: "quest" },
        { id: "cozinha", x: 1510, y: 560, label: "Kitchen", kind: "exit", to: "cozinha" },
      ],
    },
    cozinha: {
      id: "cozinha",
      name: "Kitchen",
      native: "a cozinha",
      art: (done) => <Cozinha done={done} />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "entrada", x: 70, y: 580, label: "Front hall", kind: "exit", to: "entrada" },
        { id: "fridge", x: 180, y: 480, label: "Fridge", kind: "word", wordId: "leite" },
        { id: "mamae", x: 420, y: 560, label: "Mamãe", kind: "word", wordId: "mamae" },
        { id: "coador", x: 1060, y: 470, label: "Coffee strainer", kind: "flavor", note: "A cloth coffee strainer on a wooden stand — Vovó brought it in her suitcase. Coffee through cloth, strong and sweet, in tiny cups.", culture: "cafe" },
        { id: "vovo", x: 1130, y: 560, label: "Vovó", kind: "npc" },
        { id: "forno", x: 1300, y: 620, label: "The oven", kind: "quest" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Capítulo um · Portuguese",
      title: "Pão de",
      em: "Queijo",
      text: "Papai has just come back from the airport. Vovó is here — from Minas Gerais, for a whole month — and she has brought one suitcase of clothes and one of food.",
    },
    introLines: [
      { who: "vovo", text: "{{Oi, meu amor!}} Come here, let me squeeze you!", gloss: "“Oi” — hi. “Meu amor” — my love." },
      { who: "guide", text: "Portuguese has been in this family longer than English has. You know more of it than you think.", gloss: "Listen for it." },
      { who: "guide", text: "Quest: welcome Vovó properly. Start by talking to her.", gloss: "Walk with ← → or A D. Press E near anything that glows. Or just click it." },
    ],
    beats: [
      {
        id: "abraco",
        quest: { v: "Greet Vovó", hint: "She's in the middle of the hall, arms open." },
        at: { room: "entrada", hotspot: "vovo" },
        encounter: ["vovo", "oi"],
        lines: [
          { who: "guide", text: "A huge {{abraço}} — a hug that lifts you off the floor — and one {{beijo}} on the cheek.", gloss: "In Minas, one kiss. In São Paulo, it would be two." },
          { who: "vovo", text: "{{Nossa, como você cresceu!}} Now help me with my {{mala}}. I brought things you can't get here.", gloss: "“Goodness, how you've grown!” Mala — suitcase." },
        ],
        culture: ["abraco"],
        memory: "abraco",
      },
      {
        id: "mala",
        quest: { v: "Open Vovó's suitcase", hint: "By the stairs." },
        at: { room: "entrada", hotspot: "mala" },
        encounter: ["mala", "queijo", "polvilho"],
        lines: [
          { who: "guide", text: "Under two sweaters: a whole round white {{queijo}}, wrapped in a tea towel, and a bag of {{polvilho}}.", gloss: "Queijo — cheese. Polvilho — cassava starch." },
          { who: "vovo", text: "Queijo minas — from the farm next to ours. The polvilho, from my own shop. Now: {{pão de queijo}}! To the kitchen!", gloss: "Cheese bread. The taste of Minas." },
        ],
        culture: ["queijo"],
        nudges: { "entrada:vovo": [{ who: "vovo", text: "The suitcase, meu amor. The good things are inside." }] },
      },
      {
        id: "batter",
        quest: { v: "Help Vovó with the dough", hint: "In the kitchen." },
        at: { room: "cozinha", hotspot: "vovo" },
        lines: [{ who: "vovo", text: "My mother's recipe. Pass me what I ask for — {{rapidinho!}}", gloss: "Rapidinho — quick, quick!" }],
        game: {
          type: "fetch",
          npc: "vovo",
          kicker: "Mini-game · A massa",
          title: "Pass Vovó what she asks for.",
          hint: "Nothing on the counter is labelled. Listen for the word.",
          asks: [
            { wordId: "polvilho", native: "Primeiro, o polvilho.", roman: "Primeiro, o polvilho.", english: "First, the cassava starch." },
            { wordId: "leite", native: "O leite.", roman: "O leite.", english: "The milk." },
            { wordId: "oleo", native: "Um pouquinho de óleo.", roman: "Um pouquinho de óleo.", english: "A little bit of oil." },
            { wordId: "ovos", native: "E os ovos, com cuidado!", roman: "E os ovos, com cuidado!", english: "And the eggs — carefully!" },
          ],
          items: [
            { wordId: "polvilho", label: "White bag", art: <Item kind="bag" color="#f4f4f0" /> },
            { wordId: "leite", label: "Carton", art: Icon.milk },
            { wordId: "oleo", label: "Bottle", art: <Item kind="bottle" color="#e8c860" /> },
            { wordId: "ovos", label: "Fragile", art: <Item kind="round" color="#e8d8b8" /> },
          ],
          done: { native: "Isso mesmo!", roman: "Isso mesmo!", english: "That's it exactly!" },
        },
        after: [{ who: "vovo", text: "Now we make them. Then the {{forno}} — the oven. Come.", gloss: "Forno — oven." }],
        memory: "batter",
        nudges: { "entrada:vovo": [{ who: "vovo", text: "{{Pra cozinha!}} The pão de queijo won't make itself.", gloss: "To the kitchen!" }] },
      },
      {
        id: "baked",
        quest: { v: "Make pão de queijo", hint: "At the oven." },
        at: { room: "cozinha", hotspot: "forno" },
        encounter: ["forno"],
        lines: [{ who: "vovo", text: "Scald the polvilho. Mix in the eggs. The cheese. Roll little balls — {{bolinhas}}. Into the oven. {{Sua vez!}}", gloss: "Sua vez — your turn!" }],
        game: {
          type: "sequence",
          kicker: "Mini-game · Pão de queijo",
          title: "Make pão de queijo, in order.",
          hint: "Tap the steps in the order Vovó showed you.",
          steps: [
            { native: "Escaldar o polvilho", roman: "Escaldar o polvilho", english: "scald the starch with hot milk", wordId: "polvilho", art: scaldCard },
            { native: "Misturar os ovos", roman: "Misturar os ovos", english: "mix in the eggs", wordId: "ovos", art: eggsCard },
            { native: "Colocar o queijo", roman: "Colocar o queijo", english: "add the cheese", wordId: "queijo", art: cheeseCard },
            { native: "Enrolar as bolinhas", roman: "Enrolar as bolinhas", english: "roll little balls", wordId: "paodequeijo", art: rollCard },
            { native: "Assar no forno", roman: "Assar no forno", english: "bake in the oven", wordId: "forno", art: ovenCard },
          ],
          done: "Twenty minutes later: golden, puffed and crackling. The whole house smells like Minas.",
        },
        after: [{ who: "vovo", text: "And with pão de queijo, always a {{cafezinho}}. That's the rule in Minas.", gloss: "A little coffee — strong, sweet, in a tiny cup." }],
        culture: ["paodequeijo"],
        memory: "baked",
        nudges: { "cozinha:vovo": [{ who: "vovo", text: "The oven, meu amor. It's hot." }] },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Vovó", hint: "She's holding the tray." },
      lines: [{ who: "vovo", text: "You've eaten the first one in two bites and burned your tongue. Vovó is already holding out the tray again." }],
      asker: "vovo",
      question: {
        native: "Quer mais um?",
        roman: "Quer mais um?",
        english: "Want another one?",
        choices: [
          { native: "Quero, sim!", roman: "Quero, sim!", english: "Yes, I do!", right: true },
          { native: "Oi!", roman: "Oi!", english: "Hi!", reply: [{ who: "vovo", text: "Oi, oi! But do you want another pão de queijo?" }] },
          { native: "Leite.", roman: "Leite.", english: "Milk.", reply: [{ who: "vovo", text: "Milk? The milk's IN them, meu amor. Another one — yes or no?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{Quero, sim!}}", gloss: "“Yes, I do!” — in Portuguese, you answer with the verb: “I want, yes!”" },
        { who: "vovo", text: "{{Isso!}} Take two. Take three. You're too thin.", gloss: "That's it!" },
        { who: "guide", text: "It's an American kitchen, but for a whole month, it's going to smell like Minas every afternoon." },
      ],
      encounter: ["quero", "paodequeijo", "cafe"],
      memory: "quero",
    },
    gates: [{ room: "entrada", hotspot: "cozinha", until: "mala", line: { who: "vovo", text: "Wait — the suitcase first! I carried that cheese nine thousand kilometres.", gloss: "Vovó points at her suitcase." } }],
    idle: {
      "entrada:mala": [{ who: "guide", text: "The suitcase is empty, except for a smell of cheese that will never leave it." }],
      "cozinha:forno": [{ who: "guide", text: "The oven's still warm. There's dough for another forty." }],
    },
    afterwards: {
      "cozinha:vovo": [{ who: "vovo", text: "This summer, you come to us. To Minas. Vovô will show you the whole town — and every single person in it." }],
    },
    complete: {
      title: "Pão de",
      em: "Queijo",
      text: "You hugged Vovó the Minas way, unpacked a whole cheese, made the dough by ear, baked your first pão de queijo — and said yes to another one, in Portuguese.",
      quest: { v: "Have a cafezinho with Vovó", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Cozinha done={new Set(["baked"])} />,
};

export default content;
