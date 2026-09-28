import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Ground, Stall, Crowd, Coin, Item, Awning, FY } from "../scenes";
import { Figure } from "../../components/scenes/primitives";
import { MG, Casario } from "./art";

/* PORTUGUESE · Chapter Three — A Feira. Sunday's street market: loud, sweet, and full of jokes. */

function Feira({ flores = false }: { flores?: boolean }) {
  return (
    <Stage>
      <Sky id={flores ? "pt3b" : "pt3a"} top="#6ab0e0" bottom="#f4ead4" />
      <Sun x={flores ? 1420 : 200} y={100} r={44} color="#fbe6b0" />
      {flores ? (
        <>
          <Casario x={-40} w={460} h={300} frame={MG.frames[2]} />
          <Casario x={1180} w={460} h={290} frame={MG.frames[0]} />
        </>
      ) : (
        <>
          <Casario x={-40} w={420} h={300} frame={MG.frames[1]} />
          <Casario x={560} w={380} h={320} frame={MG.frames[3]} />
          <Casario x={1200} w={440} h={290} frame={MG.frames[2]} />
        </>
      )}
      <Ground color="#9a9088" line="#7a706a" kind="stone" />
      {flores ? (
        <>
          {/* Dona Rosa's flowers in buckets */}
          <Awning x={180} y={FY - 330} w={560} colors={["#c8452f", "#f4f0e6"]} />
          <rect x={200} y={FY - 150} width="520" height="20" fill="#8c6240" />
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <path d={`M${230 + i * 62} ${FY}l6 -90h40l6 90Z`} fill="#6a7a8a" />
              {Array.from({ length: 5 }, (_, k) => <circle key={k} cx={236 + i * 62 + k * 8} cy={FY - 110 - (k % 2) * 14} r="10" fill={["#e8508a", "#f0c030", "#f4f0e6", "#c8452f", "#9a5ab8", "#f08a2a", "#e8508a", "#f0c030"][i]} />)}
            </g>
          ))}
          <Figure x={780} y={FY} h={195} color="#2a1a12" flip />
          {/* the sugarcane press */}
          <rect x={960} y={FY - 170} width="180" height="170" fill="#2f7d4a" />
          <circle cx={1050} cy={FY - 200} r="36" fill="#8a8a8e" />
          {Array.from({ length: 6 }, (_, i) => <rect key={i} x={1150 + i * 10} y={FY - 260} width="8" height="260" fill="#9ab04a" />)}
          <Figure x={1320} y={FY} h={200} color="#3a2a24" flip />
        </>
      ) : (
        <>
          {/* Seu Jorge's fruit, the pastel stand */}
          <Stall x={80} w={440} colors={["#e8b830", "#2f7d4a"]} goods={[{ color: "#f0a030", kind: "round" }, { color: "#d8b830", kind: "stack" }, { color: "#f0d040", kind: "bunch" }, { color: "#8a4a8a", kind: "round" }]} sign="SEU JORGE" />
          <Figure x={560} y={FY} h={210} color="#3a2a24" pose="reach" flip />
          <rect x={700} y={FY - 150} width="220" height="150" fill="#c8452f" />
          <rect x={690} y={FY - 170} width="240" height="22" fill="#e8b830" />
          {[740, 800, 860].map((x) => <path key={x} d={`M${x - 26} ${FY - 176}h52l-6 -22h-40Z`} fill="#e8c070" />)}
          <Figure x={1000} y={FY} h={195} color="#2a1a12" />
          <Crowd x={1280} n={4} spread={380} seed={63} scale={0.92} />
        </>
      )}
    </Stage>
  );
}

const real = <Coin symbol="R$" color="#d9a441" />;

const content: ChapterContent = {
  startRoom: "rua",
  speakers: {
    jorge: { name: "Seu Jorge", glyph: "J", tone: "guest" },
    rosa: { name: "Dona Rosa", glyph: "R", tone: "guest" },
  },
  rooms: {
    rua: {
      id: "rua",
      name: "The feira",
      native: "a feira",
      art: <Feira />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "fruit", x: 300, y: 600, label: "Fruit stall", kind: "word", wordId: "manga" },
        { id: "jorge", x: 560, y: 560, label: "Seu Jorge", kind: "npc" },
        { id: "pastel", x: 810, y: 580, label: "Pastel stand", kind: "quest" },
        { id: "vovo", x: 1000, y: 560, label: "Vovó", kind: "npc" },
        { id: "crowd", x: 1280, y: 560, label: "Sunday crowd", kind: "word", wordId: "feira" },
        { id: "next", x: 1530, y: 580, label: "Further along", kind: "exit", to: "flores" },
      ],
    },
    flores: {
      id: "flores",
      name: "The flower stall",
      native: "as flores",
      art: <Feira flores />,
      spawn: { left: 240, right: 1200 },
      hotspots: [
        { id: "back", x: 70, y: 580, label: "Back", kind: "exit", to: "rua" },
        { id: "rosa", x: 460, y: 600, label: "Dona Rosa's flowers", kind: "npc" },
        { id: "cana", x: 1050, y: 560, label: "Sugarcane press", kind: "flavor", note: "Long green stalks fed through a clanking iron press, and out comes caldo de cana — sugarcane juice, with a squeeze of lime. Vovó buys you a glass.", culture: "pastel" },
        { id: "vovo", x: 1320, y: 560, label: "Vovó", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Capítulo três · Portuguese",
      title: "A",
      em: "Feira",
      text: "Sunday. One whole street is closed to cars and full of striped awnings, and every seller is shouting — prices, jokes, compliments to passing grandmothers. Vovó has her shopping trolley and a list.",
    },
    introLines: [
      { who: "vovo", text: "{{Vem!}} The best mangoes are gone by ten.", gloss: "Vem — come!" },
      { who: "guide", text: "Quest: help Vovó with the shopping.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "list",
        quest: { v: "Ask Vovó what she needs", hint: "She's in the middle of the street." },
        at: { room: "rua", hotspot: "vovo" },
        encounter: ["feira"],
        lines: [
          { who: "vovo", text: "At the {{feira}}: {{manga}}, {{abacaxi}}, {{banana}} and {{maracujá}}.", gloss: "Mango, pineapple, banana and passion fruit." },
          { who: "vovo", text: "Seu Jorge, on the left. He'll try to make you laugh so you buy more. It works.", gloss: "The yellow-and-green stall." },
        ],
        culture: ["feira"],
      },
      {
        id: "pick",
        quest: { v: "Buy fruit from Seu Jorge", hint: "The yellow-and-green stall." },
        at: { room: "rua", hotspot: "jorge" },
        lines: [{ who: "jorge", text: "{{Olha a manga, olha a manga!}} Dona Lurdes's grandchild! Hold the bag, I'll fill it.", gloss: "“Look at the mangoes!” He's been shouting it since six." }],
        game: {
          type: "fetch",
          npc: "jorge",
          kicker: "Mini-game · A feira",
          title: "Put what he names in the bag.",
          hint: "Nothing on the stall is labelled. Listen.",
          asks: [
            { wordId: "manga", native: "Manga, docinha!", roman: "Manga, docinha!", english: "Mangoes — sweet ones!" },
            { wordId: "abacaxi", native: "Um abacaxi.", roman: "Um abacaxi.", english: "A pineapple." },
            { wordId: "maracuja", native: "Maracujá, pro suco.", roman: "Maracujá, pro suco.", english: "Passion fruit, for juice." },
            { wordId: "banana", native: "E uma penca de banana!", roman: "E uma penca de banana!", english: "And a bunch of bananas!" },
          ],
          items: [
            { wordId: "manga", label: "Orange-red", art: <Item kind="round" color="#f0a030" accent="#c8452f" /> },
            { wordId: "abacaxi", label: "Spiky", art: <svg viewBox="0 0 80 90" aria-hidden="true"><ellipse cx="40" cy="60" rx="20" ry="26" fill="#d8b830" /><path d="M28 50l24 20M52 50l-24 20M28 64l24 -14" stroke="#a88a20" strokeWidth="2" /><path d="M40 34l-12 -22M40 34l0 -26M40 34l12 -22" stroke="#3f7d55" strokeWidth="5" /></svg> },
            { wordId: "banana", label: "Curved", art: <Item kind="long" color="#f0d040" /> },
            { wordId: "maracuja", label: "Wrinkly", art: <Item kind="round" color="#8a4a8a" /> },
          ],
          done: { native: "Beleza!", roman: "Beleza!", english: "Great!" },
        },
        after: [{ who: "jorge", text: "Now pay me — in {{reais}}. I'll say how much.", gloss: "Real, reais — Brazil's money. The coins say R$." }],
        nudges: { "rua:vovo": [{ who: "vovo", text: "Seu Jorge! The fruit. {{Vai!}}", gloss: "Go!" }] },
      },
      {
        id: "pay",
        quest: { v: "Pay Seu Jorge", hint: "Count out the reais." },
        at: { room: "rua", hotspot: "jorge" },
        encounter: ["real"],
        lines: [{ who: "jorge", text: "One at a time. Count it into my hand — and no cheating, I'm watching!", gloss: "He winks." }],
        game: {
          type: "count",
          npc: "jorge",
          kicker: "Mini-game · Os reais",
          title: "Count out what he asks for.",
          hint: "Tap coins to count them out, then hand them over.",
          unit: "reais",
          coin: real,
          rounds: [
            { native: "As bananas: dois reais.", roman: "As bananas: dois reais.", english: "Bananas: two reais.", answer: 2, wordId: "dois" },
            { native: "O maracujá: três reais.", roman: "O maracujá: três reais.", english: "Passion fruit: three reais.", answer: 3, wordId: "tres" },
            { native: "O abacaxi: cinco reais.", roman: "O abacaxi: cinco reais.", english: "The pineapple: five reais.", answer: 5, wordId: "cinco" },
            { native: "As mangas: dez reais.", roman: "As mangas: dez reais.", english: "The mangoes: ten reais.", answer: 10, wordId: "dez" },
          ],
          done: { native: "Certinho!", roman: "Certinho!", english: "Exactly right!" },
        },
        after: [
          { who: "jorge", text: "He tosses one extra mango in the bag. {{Pra criança!}}", gloss: "For the kid!" },
          { who: "vovo", text: "Now — a {{pastel}}. Nobody leaves the feira without one.", gloss: "The red stand in the middle." },
        ],
        memory: "paid",
      },
      {
        id: "pastel",
        quest: { v: "Eat a pastel with Vovó", hint: "The red stand in the middle." },
        at: { room: "rua", hotspot: "pastel" },
        encounter: ["pastel"],
        lines: [
          { who: "guide", text: "A crackling, bubbly rectangle of fried pastry, straight from the oil, full of melted cheese. It's as big as your face.", gloss: "Pastel — Brazil's market lunch." },
          { who: "vovo", text: "Last thing — flowers, for the church. Further along. And let me do the talking.", gloss: "She has a look in her eye." },
        ],
        nudges: { "rua:vovo": [{ who: "vovo", text: "Pastel first. Then flowers." }] },
      },
      {
        id: "haggle",
        quest: { v: "Buy flowers with Vovó", hint: "Further along the feira." },
        at: { room: "flores", hotspot: "rosa" },
        encounter: ["quanto", "caro"],
        lines: [
          { who: "vovo", text: "{{Quanto custa?}}", gloss: "How much is it?" },
          { who: "rosa", text: "For you, Dona Lurdes? Twenty reais the bunch.", gloss: "Dona Rosa, the flower seller." },
          { who: "vovo", text: "{{Tá caro!}} Rosa, I bought flowers for your wedding from your mother.", gloss: "Tá caro — that's expensive!" },
          { who: "rosa", text: "…Fifteen. And one flower for the little one, of course.", gloss: "Vovó wins. Vovó always wins." },
        ],
        culture: ["pechinchar"],
        memory: "haggle",
        nudges: {
          "flores:vovo": [{ who: "vovo", text: "The flowers first. {{Vem.}}", gloss: "Come." }],
          "rua:vovo": [{ who: "vovo", text: "Further along! The flowers." }],
        },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Dona Rosa", hint: "She's asking if you want anything else." },
      lines: [{ who: "rosa", text: "She tucks a single yellow flower behind your ear, wraps the bunch in newspaper, and leans towards you." }],
      asker: "rosa",
      question: {
        native: "Mais alguma coisa?",
        roman: "Mais alguma coisa?",
        english: "Anything else?",
        choices: [
          { native: "É só isso, valeu!", roman: "É só isso, valeu!", english: "That's all, thanks!", right: true },
          { native: "Tá caro!", roman: "Tá caro!", english: "That's expensive!", reply: [{ who: "rosa", text: "Ha! You've been watching your Vovó. But — anything else?" }] },
          { native: "Vamos!", roman: "Vamos!", english: "Let's go!", reply: [{ who: "rosa", text: "Go where? I asked if you want anything else!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{É só isso, valeu!}}", gloss: "“That's all, thanks!” — valeu is the easy, friendly thank-you." },
        { who: "rosa", text: "{{Que gracinha!}} Dona Lurdes, your grandchild speaks Portuguese!", gloss: "How sweet!" },
        { who: "guide", text: "…Vovó says “claro” — of course — as if she hadn't been practising with you every night." },
      ],
      encounter: ["valeu"],
      memory: "valeu",
    },
    idle: {
      "rua:jorge": [{ who: "jorge", text: "{{Olha o abacaxi!}} Come back next Sunday!" }],
      "flores:vovo": [{ who: "vovo", text: "Everything's in the trolley. Home, before the sun gets strong." }],
    },
    afterwards: {
      "flores:vovo": [{ who: "vovo", text: "In June, the festa junina. The whole town in straw hats. You'll need a checked shirt." }],
      "flores:rosa": [{ who: "rosa", text: "Fifteen. Don't tell anybody." }],
    },
    complete: {
      title: "A",
      em: "Feira",
      text: "You filled the bag by ear, counted out reais, ate a pastel as big as your face, watched Vovó bargain for flowers — and told Dona Rosa “é só isso, valeu!”",
      quest: { v: "Carry the flowers home", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Feira />,
};

export default content;
