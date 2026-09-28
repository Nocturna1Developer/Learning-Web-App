import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Sky, Stars, Ground, Bunting, Bonfire, Item, StringLights, FY } from "../scenes";
import { Figure, Child } from "../../components/scenes/primitives";
import { MG, Casario, Igreja } from "./art";

/* PORTUGUESE · Chapter Four — Festa Junina. Straw hats, a bonfire, corn in every form, and a caller who lies about the weather. */

const FLAGS = ["#c8452f", "#e8b830", "#2d6ab8", "#2f7d4a", "#e8508a", "#f08a2a"];

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const bowCard = card(<><circle cx="26" cy="30" r="9" fill="#2a1a12" /><path d="M20 40h12v36h-12Z" fill="#c8452f" /><circle cx="54" cy="30" r="9" fill="#2a1a12" /><path d="M46 40q8 30 16 36h-24q4 -20 8 -36Z" fill="#e8b830" /><path d="M32 46l14 4" stroke="#2a1a12" strokeWidth="3" /></>);
const swingCard = card(<><circle cx="40" cy="44" r="30" fill="none" stroke="#c8c0b0" strokeWidth="3" strokeDasharray="4 5" /><circle cx="40" cy="20" r="8" fill="#2a1a12" /><circle cx="40" cy="68" r="8" fill="#2a1a12" /><path d="M64 36l6 8l-9 2" stroke="#c8c0b0" strokeWidth="3" fill="none" /></>);
const roadCard = card(<><path d="M0 76h80" stroke="#8a6a44" strokeWidth="8" />{[14, 34, 54, 74].map((x) => <g key={x}><circle cx={x} cy="38" r="6" fill="#2a1a12" /><rect x={x - 5} y="46" width="10" height="24" fill="#2a1a12" /></g>)}</>);
const tunnelCard = card(<><path d="M10 80q30 -80 60 0" fill="none" stroke="#2a1a12" strokeWidth="6" /><path d="M20 80q20 -56 40 0" fill="none" stroke="#c8452f" strokeWidth="4" /><circle cx="40" cy="64" r="6" fill="#2a1a12" /></>);
const backCard = card(<><path d="M60 46h-40M28 36l-10 10l10 10" stroke="#2a1a12" strokeWidth="6" fill="none" strokeLinecap="round" /><text x="40" y="82" textAnchor="middle" fontSize="11" fill="#6a5a4a">anarriê</text></>);

function Barracas() {
  return (
    <Stage>
      <Sky id="pt4a" top="#141838" mid="#3a2a5a" bottom="#c86a4a" />
      <Stars n={40} seed={24} maxY={260} />
      <Igreja x={800} y={560} s={0.5} />
      <Casario x={-40} w={420} h={300} frame={MG.frames[1]} lit />
      <Casario x={1200} w={440} h={290} frame={MG.frames[0]} lit />
      <Ground color="#8a7a6a" line="#6a5a4a" kind="dirt" />
      <Bunting y={90} sag={50} colors={FLAGS} n={30} />
      <Bunting y={170} sag={40} colors={FLAGS} n={26} />
      {/* wooden stalls with straw roofs */}
      {[140, 520, 900].map((x, i) => (
        <g key={x}>
          <path d={`M${x - 20} ${FY - 250}l180 -60l180 60Z`} fill="#d8b870" />
          <rect x={x} y={FY - 250} width="320" height="250" fill="#8a5a34" />
          <rect x={x + 10} y={FY - 150} width="300" height="20" fill="#6b4429" />
          <rect x={x + 30} y={FY - 240} width="260" height="36" fill="#f4f0e6" />
          <text x={x + 160} y={FY - 214} textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="22" fill="#c8452f">{["MILHO", "DOCES", "PIPOCA"][i]}</text>
          {Array.from({ length: 5 }, (_, k) => <circle key={k} cx={x + 50 + k * 55} cy={FY - 166} r="14" fill={[["#f0d040", "#e8c860"], ["#c8904a", "#f4e8c8"], ["#f8f0d8", "#f4e8c8"]][i][k % 2]} />)}
        </g>
      ))}
      <Figure x={1380} y={FY} h={200} color="#2a1a12" flip />
      <path d="M1352 548q28 -18 56 0q-12 -10 -28 -10t-28 10Z" fill="#d8b870" />
    </Stage>
  );
}

function Arraial({ done }: { done: ReadonlySet<string> }) {
  const dancing = done.has("dance");
  return (
    <Stage>
      <Sky id="pt4b" top="#0e1230" bottom="#3a2a5a" />
      <Stars n={70} seed={42} maxY={380} />
      <Ground color="#8a7a6a" line="#6a5a4a" kind="dirt" />
      <StringLights y={120} sag={60} />
      <Bunting y={200} sag={40} colors={FLAGS} n={26} />
      <Bonfire x={260} s={1.4} />
      {/* the caller on his little stage */}
      <rect x={1260} y={FY - 90} width="260" height="90" fill="#6b4429" />
      <Figure x={1390} y={FY - 90} h={190} color="#2a1a12" pose="reach" flip />
      <path d="M1362 458q28 -18 56 0q-12 -10 -28 -10t-28 10Z" fill="#d8b870" />
      {/* the dancers in pairs */}
      {[560, 660, 760, 860, 960, 1060].map((x, i) => (
        <g key={x}>
          <Figure x={x} y={FY} h={dancing ? 190 : 180} color={i % 2 ? "#3a2a24" : "#2a1a12"} flip={i % 2 === 1} />
          <path d={`M${x - 28} ${FY - 172}q28 -18 56 0q-12 -10 -28 -10t-28 10Z`} fill="#d8b870" />
        </g>
      ))}
      <Child x={460} y={FY} h={116} color="#2a1a12" />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "barracas",
  speakers: {
    neide: { name: "Dona Neide", glyph: "N", tone: "guest" },
    ze: { name: "Seu Zé, the caller", glyph: "Z", tone: "guest" },
    davi: { name: "Davi", glyph: "D", tone: "guest" },
  },
  rooms: {
    barracas: {
      id: "barracas",
      name: "The stalls",
      native: "as barracas",
      art: <Barracas />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "milho", x: 300, y: 560, label: "Corn stall", kind: "word", wordId: "milho" },
        { id: "neide", x: 680, y: 560, label: "Sweets stall", kind: "npc" },
        { id: "flags", x: 800, y: 120, label: "Paper flags", kind: "word", wordId: "bandeirinhas" },
        { id: "pipoca", x: 1060, y: 560, label: "Popcorn stall", kind: "flavor", note: "Popcorn in paper cones — sweet or salty. Davi gets both and mixes them. He says it's the only correct way." },
        { id: "vovo", x: 1380, y: 560, label: "Vovó", kind: "npc" },
        { id: "arraial", x: 1530, y: 580, label: "To the bonfire", kind: "exit", to: "arraial" },
      ],
    },
    arraial: {
      id: "arraial",
      name: "The bonfire and the dance",
      native: "o arraial",
      art: (done) => <Arraial done={done} />,
      spawn: { left: 360, right: 1200 },
      hotspots: [
        { id: "barracas", x: 70, y: 580, label: "Back to the stalls", kind: "exit", to: "barracas" },
        { id: "fogueira", x: 260, y: 600, label: "Bonfire", kind: "quest" },
        { id: "davi", x: 460, y: 620, label: "Davi", kind: "npc" },
        { id: "dancers", x: 810, y: 560, label: "The dancers", kind: "word", wordId: "quadrilha" },
        { id: "ze", x: 1390, y: 480, label: "Seu Zé, the caller", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Capítulo quatro · Portuguese",
      title: "Festa",
      em: "Junina",
      text: "A cold June night, and the whole town is in the praça: straw hats, checked shirts, painted-on freckles, paper flags zigzagging over everybody's head. It smells of woodsmoke and cinnamon.",
    },
    introLines: [
      { who: "vovo", text: "{{Chegou a festa!}} Come here — you can't go in like that.", gloss: "“The festa's here!”" },
      { who: "guide", text: "Quest: eat, dance, and don't get fooled.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "arrive",
        quest: { v: "Get ready with Vovó", hint: "She's by the stalls." },
        at: { room: "barracas", hotspot: "vovo" },
        encounter: ["festajunina", "chapeu"],
        lines: [
          { who: "guide", text: "Vovó jams a {{chapéu de palha}} on your head and draws freckles on your cheeks with her eyeliner.", gloss: "A straw hat — everyone dresses as a country farmer for the {{festa junina}}." },
          { who: "vovo", text: "{{Pronto!}} Now you're a proper little caipira. Go get us something to eat — Dona Neide's stall.", gloss: "Pronto — done! Caipira — someone from the countryside." },
        ],
        culture: ["festajunina"],
      },
      {
        id: "stalls",
        quest: { v: "Fill a plate at Dona Neide's stall", hint: "The middle stall." },
        at: { room: "barracas", hotspot: "neide" },
        lines: [{ who: "neide", text: "{{Boa noite!}} Plate out — I'll tell you what to take.", gloss: "Good evening! Dona Neide has made everything on this table herself." }],
        game: {
          type: "fetch",
          npc: "neide",
          kicker: "Mini-game · As comidas",
          title: "Take what she names.",
          hint: "Nothing is labelled. Listen.",
          asks: [
            { wordId: "milho", native: "Milho cozido, com manteiga.", roman: "Milho cozido, com manteiga.", english: "Boiled corn, with butter." },
            { wordId: "pamonha", native: "Uma pamonha, quentinha.", roman: "Uma pamonha, quentinha.", english: "A pamonha, nice and warm." },
            { wordId: "pedemoleque", native: "Pé de moleque!", roman: "Pé de moleque!", english: "Peanut brittle!" },
            { wordId: "pipoca", native: "E pipoca, claro.", roman: "E pipoca, claro.", english: "And popcorn, of course." },
          ],
          items: [
            { wordId: "milho", label: "On the cob", art: <Item kind="long" color="#f0d040" /> },
            { wordId: "pamonha", label: "In a husk", art: <Item kind="leaf" color="#c8d080" /> },
            { wordId: "pedemoleque", label: "Crunchy", art: <Item kind="flat" color="#c8904a" accent="#e8b870" /> },
            { wordId: "pipoca", label: "Paper cone", art: <svg viewBox="0 0 80 90" aria-hidden="true"><path d="M24 40h32l-16 46Z" fill="#c8452f" />{[28, 38, 48, 34, 44].map((x, i) => <circle key={i} cx={x} cy={i < 3 ? 36 : 26} r="7" fill="#f8f0d8" />)}</svg> },
          ],
          done: { native: "Bom apetite!", roman: "Bom apetite!", english: "Enjoy!" },
        },
        after: [{ who: "vovo", text: "Now, the bonfire — Davi's there. The quadrilha starts soon!", gloss: "Through to the arraial on the right." }],
        memory: "stalls",
        nudges: { "barracas:vovo": [{ who: "vovo", text: "Food first! Dona Neide's stall." }] },
      },
      {
        id: "fogueira",
        quest: { v: "Warm up by the bonfire", hint: "In the arraial." },
        at: { room: "arraial", hotspot: "fogueira" },
        encounter: ["fogueira"],
        lines: [
          { who: "guide", text: "The {{fogueira}} is taller than Vovô. Sparks go up into the cold sky, and everybody holds out their hands.", gloss: "Fogueira — bonfire." },
          { who: "davi", text: "Quick — the quadrilha! Seu Zé calls the moves. You just do what everyone else does.", gloss: "Davi, in a hat three sizes too big." },
        ],
        nudges: { "arraial:davi": [{ who: "davi", text: "Warm your hands first! It's freezing!" }] },
      },
      {
        id: "dance",
        quest: { v: "Dance the quadrilha", hint: "Seu Zé is calling the moves." },
        at: { room: "arraial", hotspot: "ze" },
        encounter: ["quadrilha"],
        lines: [
          { who: "ze", text: "{{Atenção, pessoal!}} Take your partners! Here we go!", gloss: "Attention, everyone! Seu Zé, into a crackly microphone." },
          { who: "guide", text: "The {{quadrilha}} came from French court dances two hundred years ago — some of the calls are still half-French.", gloss: "“Anarriê!” comes from “en arrière” — back!" },
        ],
        game: {
          type: "sequence",
          kicker: "Mini-game · A quadrilha",
          title: "Dance the moves, in order.",
          hint: "Tap the moves in the order Seu Zé calls them.",
          steps: [
            { native: "Cumprimenta o par!", roman: "Cumprimenta o par!", english: "Bow to your partner!", art: bowCard },
            { native: "Balancê!", roman: "Balancê!", english: "Swing around!", art: swingCard },
            { native: "Caminho da roça!", roman: "Caminho da roça!", english: "The road to the farm — march!", art: roadCard },
            { native: "Olha o túnel!", roman: "Olha o túnel!", english: "Here's the tunnel!", art: tunnelCard },
            { native: "Anarriê!", roman: "Anarriê!", english: "Back to your places!", art: backCard },
          ],
          done: "You got the tunnel wrong and bumped into Davi. Nobody minded. Everybody's laughing.",
        },
        culture: ["quadrilha"],
        memory: "dance",
        nudges: { "arraial:davi": [{ who: "davi", text: "Go! Seu Zé's starting!" }] },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer the caller", hint: "Seu Zé is shouting something." },
      lines: [{ who: "ze", text: "Seu Zé stops the music. He points at the sky. Everybody freezes, grinning — they know what's coming." }],
      asker: "ze",
      question: {
        native: "Olha a chuva!",
        roman: "Olha a chuva!",
        english: "Look out, rain!",
        choices: [
          { native: "É mentira!", roman: "É mentira!", english: "It's a lie!", right: true },
          { native: "Vamos!", roman: "Vamos!", english: "Let's go!", reply: [{ who: "davi", text: "No, no! There's no rain! What do we SHOUT?" }] },
          { native: "É só isso, valeu!", roman: "É só isso, valeu!", english: "That's all, thanks!", reply: [{ who: "davi", text: "It's a dance, not the feira! Shout the answer!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{É mentira!}}", gloss: "“It's a lie!” — shouted by two hundred people at once." },
        { who: "ze", text: "{{Olha a cobra!}}", gloss: "“Look out, a snake!” Everyone jumps." },
        { who: "davi", text: "{{É mentira!}} Ha! You're a real caipira now.", gloss: "The music starts again, faster." },
      ],
      encounter: ["chuva", "mentira"],
      memory: "mentira",
    },
    gates: [{ room: "barracas", hotspot: "arraial", until: "arrive", line: { who: "vovo", text: "Not like that! Come here — hat first.", gloss: "Vovó is holding a straw hat and an eyeliner pencil." } }],
    idle: {
      "barracas:neide": [{ who: "neide", text: "There's quentão for the grown-ups and hot chocolate for you. Don't mix them up." }],
      "arraial:ze": [{ who: "ze", text: "Next dance in ten minutes! Grab a partner!" }],
      "arraial:fogueira": [{ who: "guide", text: "Your front is warm and your back is freezing. That's how you know it's a festa junina." }],
    },
    afterwards: {
      "barracas:vovo": [{ who: "vovo", text: "Tomorrow, Vovô takes you to the sítio. At night, if you're lucky, he'll tell you about the Saci." }],
      "arraial:davi": [{ who: "davi", text: "Olha a chuva! …Ha. Just checking." }],
    },
    complete: {
      title: "Festa",
      em: "Junina",
      text: "You put on a straw hat and painted freckles, filled a plate by ear, danced every move of the quadrilha — and nobody fooled you about the rain.",
      quest: { v: "Dance one more quadrilha", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Arraial done={new Set()} />,
};

export default content;
