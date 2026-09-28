import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Clouds, Ground, Stall, Crowd, Coin, Item, Bunting, FY } from "../scenes";
import { Figure, Child } from "../../components/scenes/primitives";
import { MX, PuebloHouse, Bougainvillea, Parroquia, ClayPot, PICADO } from "./art";

/* SPANISH · Chapter Two — El Mercado. December in Abuela's pueblo in Michoacán: the Sunday tianguis. */

function Plaza({ deeper = false }: { deeper?: boolean }) {
  return (
    <Stage>
      <Sky id={deeper ? "es2b" : "es2a"} top="#6fb0d8" mid="#bcdcea" bottom="#f4e6c8" />
      <Sun x={deeper ? 1380 : 240} y={130} r={50} color="#fbe6a8" />
      <Clouds seed={deeper ? 9 : 4} opacity={0.6} y={150} />
      {deeper ? (
        <>
          <PuebloHouse x={-20} w={380} h={330} wall={MX.adobe[2]} door={false} />
          <PuebloHouse x={1180} w={440} h={310} wall={MX.adobe[5]} />
          <Bougainvillea x={1200} y={400} w={260} />
        </>
      ) : (
        <>
          <Parroquia x={800} y={FY - 70} s={0.9} />
          <PuebloHouse x={-30} w={340} h={320} wall={MX.adobe[0]} door={false} />
          <PuebloHouse x={1260} w={380} h={300} wall={MX.adobe[1]} />
          <Bougainvillea x={1280} y={420} w={220} />
        </>
      )}
      <Ground color={MX.cobble} line={MX.cobbleLine} kind="stone" />
      <Bunting y={110} sag={46} colors={PICADO} />
      {deeper ? (
        <>
          {/* Don Beto's pottery: clay pots stacked on a blanket */}
          <Stall x={140} w={360} colors={["#2f7fa8", "#f4ecdd"]} goods={[{ color: "#b8642f", kind: "stack" }, { color: "#8a4a22", kind: "round" }]} sign="BARRO" />
          <ClayPot x={560} y={FY} s={1.1} />
          <ClayPot x={660} y={FY} s={0.8} />
          <ClayPot x={610} y={FY - 96} s={0.7} />
          <Figure x={440} y={FY} h={200} color="#2a1a12" pose="sit" />
          {/* tortillas on the comal */}
          <rect x={860} y={FY - 110} width="240" height="110" fill="#6b4429" />
          <ellipse cx={980} cy={FY - 118} rx="120" ry="16" fill="#2a2a2a" />
          {[930, 990, 1040].map((x) => <ellipse key={x} cx={x} cy={FY - 124} rx="26" ry="7" fill="#efd9a0" />)}
          <path d="M960 590q-10 -24 6 -40M1010 590q10 -24 -6 -40" stroke="#f4ecdd" strokeWidth="5" fill="none" opacity="0.4" />
          <Figure x={1320} y={FY} h={205} color="#2a1a12" flip />
          <Crowd x={1480} n={2} spread={140} seed={41} scale={0.9} />
        </>
      ) : (
        <>
          {/* Doña Chela's fruit, piled in pyramids */}
          <Stall x={120} w={380} colors={["#e8a33d", "#f4ecdd"]} goods={[{ color: "#f08a1c", kind: "round" }, { color: "#3f6b2a", kind: "round" }, { color: "#c0392b", kind: "round" }, { color: "#7fb03a", kind: "round" }]} sign="FRUTAS" />
          <Figure x={450} y={FY} h={200} color="#3a2a24" pose="sit" />
          {/* aguas frescas in glass barrels */}
          {[
            ["#b8174a", 590],
            ["#f4ecdd", 650],
            ["#8a5a2a", 710],
          ].map(([c, x]) => (
            <g key={x as number}>
              <rect x={(x as number) - 24} y={FY - 170} width="48" height="70" rx="10" fill={c as string} opacity="0.85" />
              <rect x={(x as number) - 24} y={FY - 170} width="48" height="70" rx="10" fill="none" stroke="#dfe8ee" strokeWidth="4" />
            </g>
          ))}
          <rect x={560} y={FY - 100} width="180" height="100" fill="#3f8a5a" />
          <Figure x={1080} y={FY} h={205} color="#2a1a12" flip />
          <Child x={1150} y={FY} h={120} color="#3a2a24" />
          <Crowd x={1360} n={3} spread={260} seed={23} scale={0.92} />
        </>
      )}
    </Stage>
  );
}

const peso = <Coin symbol="$" color="#c9cfd4" ink="#4a4a4a" />;

const content: ChapterContent = {
  startRoom: "plaza",
  speakers: {
    chela: { name: "Doña Chela", glyph: "C", tone: "guest" },
    beto: { name: "Don Beto", glyph: "B", tone: "guest" },
  },
  rooms: {
    plaza: {
      id: "plaza",
      name: "The plaza",
      native: "la plaza",
      art: <Plaza />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "fruit", x: 250, y: 600, label: "Fruit", kind: "word", wordId: "naranja" },
        { id: "chela", x: 450, y: 530, label: "Doña Chela", kind: "npc" },
        { id: "aguas", x: 650, y: 560, label: "Aguas frescas", kind: "flavor", note: "Jamaica, horchata, tamarindo — ladled into a bag with a straw. Abuela gets you a horchata.", culture: "aguas" },
        { id: "church", x: 800, y: 330, label: "The parroquia", kind: "word", wordId: "pueblo" },
        { id: "abuela", x: 1080, y: 560, label: "Abuela", kind: "npc" },
        { id: "crowd", x: 1350, y: 560, label: "The crowd", kind: "word", wordId: "tianguis" },
        { id: "next", x: 1530, y: 580, label: "Further in", kind: "exit", to: "puestos" },
      ],
    },
    puestos: {
      id: "puestos",
      name: "Deeper in",
      native: "los puestos",
      art: <Plaza deeper />,
      spawn: { left: 260, right: 1200 },
      hotspots: [
        { id: "back", x: 70, y: 580, label: "Back", kind: "exit", to: "plaza" },
        { id: "pots", x: 600, y: 600, label: "Clay pots", kind: "npc" },
        { id: "comal", x: 980, y: 580, label: "Tortillas", kind: "flavor", note: "Tortillas puffing up on a black comal. The woman hands you one, hot, with a pinch of salt — for free.", culture: "comal" },
        { id: "abuela", x: 1320, y: 560, label: "Abuela", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Capítulo dos · Spanish",
      title: "El",
      em: "Mercado",
      text: "December. For the first time, you've come with Abuela to her pueblo in Michoacán. On Sundays the plaza fills with stalls before the church bells have finished ringing.",
    },
    introLines: [
      { who: "abuela", text: "{{Este es mi pueblo.}} I bought my first shoes in this plaza.", gloss: "This is my town." },
      { who: "guide", text: "The Sunday {{tianguis}} — the open-air market. Everyone here seems to know her.", gloss: "Quest: help Abuela with her shopping." },
    ],
    beats: [
      {
        id: "list",
        quest: { v: "Ask Abuela what she needs", hint: "She's in the middle of the plaza." },
        at: { room: "plaza", hotspot: "abuela" },
        encounter: ["pueblo", "tianguis"],
        lines: [
          { who: "abuela", text: "We need {{naranjas}}, {{aguacates}}, {{jitomates}} and {{limones}}.", gloss: "Oranges, avocados, tomatoes and limes." },
          { who: "abuela", text: "Doña Chela sells the best fruit in Michoacán. Tell her you're my grandchild.", gloss: "The fruit stall on the left." },
        ],
        culture: ["tianguis"],
      },
      {
        id: "pick",
        quest: { v: "Pick fruit with Doña Chela", hint: "The fruit stall on the left." },
        at: { room: "plaza", hotspot: "chela" },
        lines: [{ who: "chela", text: "{{¡Tú eres de la familia de Carmen!}} {{Ven}}, hold the bag.", gloss: "“You're Carmen's family!” Carmen is Abuela. Ven — come." }],
        game: {
          type: "fetch",
          npc: "chela",
          kicker: "Mini-game · El tianguis",
          title: "Put what she names in the bag.",
          hint: "Nothing on the stall is labelled. Listen.",
          asks: [
            { wordId: "naranja", native: "Primero, las naranjas.", roman: "Primero, las naranjas.", english: "First, the oranges." },
            { wordId: "aguacate", native: "Ahora los aguacates.", roman: "Ahora los aguacates.", english: "Now the avocados." },
            { wordId: "limon", native: "Unos limones.", roman: "Unos limones.", english: "Some limes." },
            { wordId: "jitomate", native: "¡Y los jitomates!", roman: "¡Y los jitomates!", english: "And the tomatoes!" },
          ],
          items: [
            { wordId: "naranja", label: "Orange", art: <Item kind="round" color="#f08a1c" /> },
            { wordId: "aguacate", label: "Dark green", art: <Item kind="round" color="#3f6b2a" accent="#c9d88a" /> },
            { wordId: "jitomate", label: "Red", art: <Item kind="round" color="#c0392b" /> },
            { wordId: "limon", label: "Small green", art: <Item kind="round" color="#7fb03a" /> },
          ],
          done: { native: "¡Muy bien!", roman: "¡Muy bien!", english: "Very good!" },
        },
        after: [{ who: "chela", text: "Now pay me — in {{pesos}}, not dollars!", gloss: "She laughs and holds out her hand." }],
        nudges: { "plaza:abuela": [{ who: "abuela", text: "Doña Chela. The fruit. {{Ándale.}}", gloss: "Ándale — go on." }] },
      },
      {
        id: "pay",
        quest: { v: "Pay Doña Chela", hint: "Count out the pesos she asks for." },
        at: { room: "plaza", hotspot: "chela" },
        encounter: ["peso"],
        lines: [{ who: "chela", text: "I'll tell you how many {{pesos}} for each. Count them into my hand.", gloss: "The coins say $ — that's pesos here." }],
        game: {
          type: "count",
          npc: "chela",
          kicker: "Mini-game · Los pesos",
          title: "Count out what she asks for.",
          hint: "Tap coins to count them out, then hand them over.",
          unit: "pesos",
          coin: peso,
          rounds: [
            { native: "Los limones: dos pesos.", roman: "Los limones: dos pesos.", english: "The limes: two pesos.", answer: 2, wordId: "dos" },
            { native: "Los jitomates: tres pesos.", roman: "Los jitomates: tres pesos.", english: "The tomatoes: three pesos.", answer: 3, wordId: "tres" },
            { native: "Las naranjas: cinco pesos.", roman: "Las naranjas: cinco pesos.", english: "The oranges: five pesos.", answer: 5, wordId: "cinco" },
            { native: "Los aguacates: diez pesos.", roman: "Los aguacates: diez pesos.", english: "The avocados: ten pesos.", answer: 10, wordId: "diez" },
          ],
          done: { native: "¡Exacto! Y aquí está tu pilón.", roman: "¡Exacto! Y aquí está tu pilón.", english: "Exactly! And here's your pilón." },
        },
        after: [
          { who: "chela", text: "She drops one more orange in the bag and winks. {{El pilón.}}", gloss: "A little extra, for a regular." },
          { who: "abuela", text: "Now — a new {{olla de barro}} for the ponche. Further in. Let me do the talking.", gloss: "A clay pot. Christmas is coming." },
        ],
        culture: ["pilon"],
        memory: "pesos",
      },
      {
        id: "haggle",
        quest: { v: "Buy a clay pot with Abuela", hint: "Further into the tianguis." },
        at: { room: "puestos", hotspot: "pots" },
        encounter: ["cuanto", "caro"],
        lines: [
          { who: "abuela", text: "{{¿Cuánto?}}", gloss: "How much?" },
          { who: "beto", text: "For you, Doña Carmen? Three hundred pesos.", gloss: "Don Beto, the potter." },
          { who: "abuela", text: "{{¡Muy caro!}} Beto, I knew your mother.", gloss: "Much too expensive!" },
          { who: "beto", text: "…Two hundred and fifty. And I'll wrap it in newspaper.", gloss: "Abuela wins. Abuela always wins." },
        ],
        culture: ["barro"],
        memory: "haggle",
        nudges: {
          "puestos:abuela": [{ who: "abuela", text: "The pots first. {{Ven.}}", gloss: "Come." }],
          "plaza:abuela": [{ who: "abuela", text: "Further in! Don Beto's pots." }],
        },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Don Beto", hint: "He's asking if you need anything else." },
      lines: [{ who: "beto", text: "He ties the newspaper with string, then looks past Abuela, at you." }],
      asker: "beto",
      question: {
        native: "¿Algo más, joven?",
        roman: "¿Algo más, joven?",
        english: "Anything else, young one?",
        choices: [
          { native: "Nada más, gracias.", roman: "Nada más, gracias.", english: "Nothing else, thank you.", right: true },
          { native: "Diez.", roman: "Diez.", english: "Ten.", reply: [{ who: "beto", text: "¿Diez? Ten more pots? Your abuela would never let me forget it." }] },
          { native: "¿Cuánto?", roman: "¿Cuánto?", english: "How much?", reply: [{ who: "beto", text: "How much for what? I asked if you want anything else!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{Nada más, gracias.}}", gloss: "“Nothing else, thank you.”" },
        { who: "beto", text: "{{¡Qué bien!}} Doña Carmen, this one speaks Spanish.", gloss: "Well done!" },
        { who: "guide", text: "…Abuela says “of course they do” as if she'd never once worried about it." },
      ],
      encounter: ["gracias"],
      memory: "gracias",
    },
    idle: {
      "plaza:chela": [{ who: "chela", text: "{{¡Hasta el domingo!}} The mangoes come in March — come back then.", gloss: "See you Sunday!" }],
      "puestos:abuela": [{ who: "abuela", text: "Everything's in the bag. Let's get tortillas for the walk home." }],
    },
    afterwards: {
      "puestos:abuela": [{ who: "abuela", text: "Next week, the whole family comes for the tamalada. You'll see how many cousins you have." }],
      "puestos:pots": [{ who: "beto", text: "Two hundred and fifty. Don't tell my wife." }],
    },
    complete: {
      title: "El",
      em: "Mercado",
      text: "You filled the bag by ear, counted out pesos in Spanish, got the pilón, watched Abuela bargain — and told Don Beto “nada más, gracias.”",
      quest: { v: "Carry the clay pot home", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Plaza />,
};

export default content;
