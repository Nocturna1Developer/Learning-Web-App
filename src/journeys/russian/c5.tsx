import type { ReactNode } from "react";
import type { ChapterContent, StoryPanel } from "../types";
import { Stage, FY } from "../scenes";
import { Walls, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { Panel } from "../kit";
import { Samovar, Matryoshka, Turnip } from "./art";

/* RUSSIAN · Chapter Five — Репка. A snowy afternoon, and the oldest story in the family: it takes everybody to pull out one turnip. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const personCard = (h: number, beard = false, scarf = false, child = false) =>
  card(
    <g transform="translate(40 86)">
      {child ? <Child x={0} y={0} h={h} color="#2a1a12" /> : <Figure x={0} y={0} h={h} color="#2a1a12" />}
      {beard && <path d={`M-8 ${-h * 0.8}q8 16 16 0`} fill="#f4f4f4" />}
      {scarf && <path d={`M-12 ${-h * 0.9}q12 -12 24 0l-2 8h-20Z`} fill="#c8302a" />}
    </g>,
  );
const dogCard = card(<g transform="translate(40 70)" fill="#6a4a2a"><ellipse cx="0" cy="0" rx="24" ry="12" /><circle cx="22" cy="-12" r="10" /><path d="M26 -20l6 -10l2 12Z" /><rect x="-18" y="6" width="6" height="16" /><rect x="12" y="6" width="6" height="16" /><path d="M-24 -4q-10 -10 -6 -18" stroke="#6a4a2a" strokeWidth="4" fill="none" /></g>);
const catCard = card(<g transform="translate(40 72)" fill="#3a3a3a"><ellipse cx="0" cy="0" rx="16" ry="14" /><circle cx="0" cy="-20" r="10" /><path d="M-8 -28l2 -10l6 6ZM8 -28l-2 -10l-6 6Z" /><path d="M14 4q16 -4 12 -24" stroke="#3a3a3a" strokeWidth="4" fill="none" /></g>);
const mouseCard = card(<g transform="translate(40 74)" fill="#8a8a8e"><ellipse cx="0" cy="0" rx="10" ry="7" /><circle cx="9" cy="-4" r="5" /><circle cx="8" cy="-10" r="3.5" fill="#c8a0a8" /><path d="M-10 0q-14 4 -16 -6" stroke="#8a8a8e" strokeWidth="2" fill="none" /></g>);

function Komnata() {
  return (
    <Stage>
      <Walls tint="#e2d8c4" floor="#6a4a32" floorLine="#4a2e1c" shade="#cfc2a8" />
      {/* the snowy window */}
      <rect x={1000} y={170} width="360" height="300" fill="#f4efe4" />
      <rect x={1012} y={182} width="336" height="276" fill="#c8d4e0" />
      <path d="M1012 400q84 -30 168 0t168 0v58h-336Z" fill="#f4f4f8" />
      {Array.from({ length: 26 }, (_, i) => <circle key={i} cx={1020 + ((i * 53) % 320)} cy={190 + ((i * 37) % 200)} r="3.5" fill="#fff" />)}
      <line x1="1180" y1="182" x2="1180" y2="458" stroke="#f4efe4" strokeWidth="8" />
      {/* the bookshelf with a row of matryoshkas */}
      <rect x={100} y={FY - 440} width="300" height="440" fill={WOOD} />
      {[0, 1, 2].map((r) => <rect key={r} x={112} y={FY - 420 + r * 140} width="276" height="124" fill="#3a2718" />)}
      {[150, 200, 240, 272, 298].map((x, i) => <Matryoshka key={x} x={x} y={FY - 296} s={0.9 - i * 0.14} color={i % 2 ? "#2d4a8a" : "#c8302a"} />)}
      {/* Dedushka's armchair */}
      <rect x={560} y={FY - 150} width="240" height="150" rx="20" fill="#3a5a4a" />
      <rect x={560} y={FY - 270} width="240" height="140" rx="30" fill="#4a6a5a" />
      <Figure x={680} y={FY - 10} h={190} color="#1a1210" pose="sit" />
      <Samovar x={900} y={FY - 110} s={0.7} />
      <rect x={850} y={FY - 110} width="120" height="110" fill={WOOD} />
      <rect x={1440} y={FY - 330} width="150" height="330" fill="#2a1c14" />
    </Stage>
  );
}

function Kukhnya() {
  return (
    <Stage>
      <Walls tint="#f0e8d8" floor="#9a8a70" floorLine="#7a6a50" shade="#dcd0b8" />
      <rect x={300} y={200} width="280" height="220" fill="#f4efe4" />
      <rect x={312} y={212} width="256" height="196" fill="#c8d4e0" />
      {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={320 + ((i * 47) % 240)} cy={220 + ((i * 29) % 180)} r="3" fill="#fff" />)}
      <rect x={880} y={FY - 170} width="480" height="170" fill={WOOD} />
      <rect x={870} y={FY - 184} width="500" height="18" fill="#8a8078" />
      <ellipse cx={1000} cy={FY - 194} rx="50" ry="12" fill="#b8453a" />
      <Figure x={1180} y={FY} h={195} color="#2a1a12" flip />
      <Child x={700} y={FY} h={116} color="#2a1a12" />
      <rect x={40} y={FY - 330} width="150" height="330" fill="#2a1c14" />
    </Stage>
  );
}

const field = (children: ReactNode, id: string) => (
  <Panel id={id} sky={["#9ac0d8", "#e8dcc0"]} ground="#6a5a3a">
    {children}
  </Panel>
);

const story: StoryPanel[] = [
  {
    art: field(<><Turnip x={200} y={170} s={1.3} /><Figure x={90} y={196} h={110} color="#2a1a12" /><path d="M82 110q8 16 16 0" fill="#f4f4f4" /></>, "ru5p1"),
    text: "“{{Посадил дед репку.}}” Grandpa planted a turnip. And it grew, and grew — {{большая-пребольшая}}. Big. Enormously big.",
  },
  {
    art: field(<><Turnip x={280} y={170} s={1.3} /><Figure x={200} y={196} h={110} color="#2a1a12" pose="reach" /><path d="M192 110q8 16 16 0" fill="#f4f4f4" /></>, "ru5p2"),
    text: "Grandpa took hold of the leaves. He pulled and pulled — “{{тянет-потянет}}” — but he couldn't pull it out. So he called Grandma.",
  },
  {
    art: field(<><Turnip x={320} y={170} s={1.2} /><Figure x={250} y={196} h={106} color="#2a1a12" pose="reach" /><Figure x={190} y={196} h={100} color="#3a2a24" pose="reach" /><Child x={130} y={196} h={70} color="#2a1a12" /></>, "ru5p3"),
    text: "Grandma held on to Grandpa, and they pulled and pulled… nothing. Grandma called their {{внучка}} — their granddaughter. Still nothing.",
  },
  {
    art: field(<><Turnip x={340} y={170} s={1.1} /><Figure x={280} y={196} h={100} color="#2a1a12" pose="reach" /><Figure x={228} y={196} h={96} color="#3a2a24" pose="reach" /><Child x={180} y={196} h={70} color="#2a1a12" /><g transform="translate(130 190)" fill="#6a4a2a"><ellipse rx="20" ry="10" /><circle cx="18" cy="-10" r="8" /></g><g transform="translate(80 192)" fill="#3a3a3a"><ellipse rx="12" ry="10" /><circle cy="-14" r="7" /></g></>, "ru5p4"),
    text: "The granddaughter called the {{собака}}, Zhuchka. Zhuchka called the {{кошка}}. They pulled and pulled — and the turnip didn't move an inch.",
  },
  {
    art: field(<><Turnip x={330} y={120} s={1.1} /><g transform="rotate(-14 200 196)"><Figure x={260} y={196} h={96} color="#2a1a12" /><Figure x={214} y={196} h={92} color="#3a2a24" /><Child x={172} y={196} h={66} color="#2a1a12" /></g><g transform="translate(120 192)" fill="#6a4a2a"><ellipse rx="18" ry="9" /></g><g transform="translate(80 192)" fill="#3a3a3a"><ellipse rx="11" ry="9" /></g><g transform="translate(52 194)" fill="#8a8a8e"><ellipse rx="7" ry="5" /><circle cx="6" cy="-4" r="3.5" /></g></>, "ru5p5"),
    text: "At last the cat called the {{мышка}} — the littlest mouse. Mouse held cat, cat held dog, dog held granddaughter, granddaughter held Grandma, Grandma held Grandpa — they all pulled {{вместе}}… and OUT came the turnip!",
  },
];

const content: ChapterContent = {
  startRoom: "komnata",
  speakers: {
    sasha: { name: "Sasha", glyph: "С", tone: "guest" },
  },
  rooms: {
    komnata: {
      id: "komnata",
      name: "Dedushka's room",
      native: "комната",
      art: <Komnata />,
      spawn: { left: 480, right: 1300 },
      hotspots: [
        { id: "shelf", x: 250, y: 440, label: "Matryoshkas", kind: "flavor", note: "Five matryoshkas in a row, biggest to smallest. Dedushka has been adding one every New Year since 1972. There are more inside.", culture: "matryoshka" },
        { id: "dedushka", x: 680, y: 560, label: "Dedushka", kind: "npc" },
        { id: "samovar", x: 900, y: 560, label: "Samovar", kind: "flavor", note: "The samovar is on. It's always on in winter. Dedushka takes his tea with three sugars and a slice of lemon and denies both." },
        { id: "window", x: 1180, y: 320, label: "Snowy window", kind: "word", wordId: "sneg" },
        { id: "kukhnya", x: 1515, y: 560, label: "Kitchen", kind: "exit", to: "kukhnya" },
      ],
    },
    kukhnya: {
      id: "kukhnya",
      name: "Kitchen",
      native: "кухня",
      art: <Kukhnya />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "komnata", x: 115, y: 560, label: "Dedushka's room", kind: "exit", to: "komnata" },
        { id: "window", x: 440, y: 310, label: "Window", kind: "word", wordId: "dom" },
        { id: "sasha", x: 700, y: 620, label: "Sasha", kind: "npc" },
        { id: "babushka", x: 1180, y: 560, label: "Babushka", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Глава пятая · Russian",
      title: "The",
      em: "Turnip",
      text: "The second of January. Everyone is full, the snow hasn't stopped for two days, and Dedushka has decided it's the right afternoon for a story.",
    },
    introLines: [
      { who: "dedushka", text: "{{Иди сюда.}} Sit. I'll tell you the first story I ever heard.", gloss: "idi syuda — come here." },
      { who: "guide", text: "Quest: listen to Dedushka's tale.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "skazka",
        quest: { v: "Talk to Dedushka", hint: "In his armchair." },
        at: { room: "komnata", hotspot: "dedushka" },
        encounter: ["skazka", "sneg"],
        lines: [
          { who: "dedushka", text: "On a day like this, with {{снег}} up to the windows, you need a {{сказка}}.", gloss: "sneg — snow. skazka — a fairy tale." },
          { who: "dedushka", text: "Go and get Sasha from the kitchen. She'll say she's too old for it. She isn't.", gloss: "The door on the right." },
        ],
        culture: ["repka"],
      },
      {
        id: "sasha",
        quest: { v: "Get Sasha from the kitchen", hint: "Through the door on the right." },
        at: { room: "kukhnya", hotspot: "sasha" },
        lines: [
          { who: "sasha", text: "Репка? I've heard it a hundred times. …Fine. But first — I'm testing you. Everything since the summer.", gloss: "Sasha takes this very seriously." },
        ],
        game: { type: "memory", kicker: "Mini-game · Sasha's test", title: "Match the word to what it means.", hint: "Words from the dacha, the market and New Year. Matches in a row build a combo." },
        after: [{ who: "sasha", text: "{{Ладно}}, you're good. Let's go — Dedushka does the voices.", gloss: "ladno — OK, fine." }],
        memory: "test",
        nudges: { "komnata:dedushka": [{ who: "dedushka", text: "Sasha first! The kitchen." }] },
      },
      {
        id: "story",
        quest: { v: "Listen to Dedushka's tale", hint: "Back in his armchair." },
        at: { room: "komnata", hotspot: "dedushka" },
        encounter: ["repka", "bolshaya", "vnuchka", "sobaka", "koshka"],
        lines: [{ who: "dedushka", text: "{{Жили-были…}} Once upon a time, there lived a grandpa…", gloss: "zhili-byli — how every Russian tale begins." }],
        game: {
          type: "story",
          kicker: "A tale from Dedushka",
          title: "The Turnip",
          native: "Репка",
          teller: "dedushka",
          panels: story,
          question: {
            native: "Кто позвал мышку?",
            roman: "kto pozval myshku?",
            english: "Who called the mouse?",
            choices: [
              { native: "Кошка.", roman: "koshka.", english: "The cat.", right: true },
              { native: "Дедушка.", roman: "dedushka.", english: "Grandpa.", reply: [{ who: "sasha", text: "Grandpa was at the FRONT! Who was right before the mouse?" }] },
              { native: "Репка.", roman: "repka.", english: "The turnip.", reply: [{ who: "dedushka", text: "The turnip didn't call anybody. It just sat there, being enormous. Who called the mouse?" }] },
            ],
          },
        },
        memory: "repka",
      },
      {
        id: "chain",
        quest: { v: "Tell the chain back to Dedushka", hint: "He wants to hear it from you." },
        at: { room: "komnata", hotspot: "dedushka" },
        lines: [{ who: "dedushka", text: "Now you tell it. Who held on to who? In order!", gloss: "Every Russian child can do this at four years old. Sasha is timing you." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · Тянут-потянут",
          title: "Who joined the chain, in order?",
          hint: "From the turnip backwards: who came first, and who came last?",
          steps: [
            { native: "дедка", roman: "dedka", english: "grandpa", wordId: "dedushka", art: personCard(76, true) },
            { native: "бабка", roman: "babka", english: "grandma", wordId: "babushka", art: personCard(72, false, true) },
            { native: "внучка", roman: "vnuchka", english: "granddaughter", wordId: "vnuchka", art: personCard(60, false, false, true) },
            { native: "Жучка", roman: "Zhuchka", english: "the dog", wordId: "sobaka", art: dogCard },
            { native: "кошка", roman: "koshka", english: "the cat", wordId: "koshka", art: catCard },
            { native: "мышка", roman: "myshka", english: "the mouse", wordId: "myshka", art: mouseCard },
          ],
          done: "Sasha stops her timer. She won't say what it says. It was fast.",
        },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Dedushka", hint: "He has one last question." },
      lines: [{ who: "dedushka", text: "Dedushka leans forward in his armchair and taps your knee." }],
      asker: "dedushka",
      question: {
        native: "Кто помог больше всех?",
        roman: "kto pomog bol'she vsekh?",
        english: "Who helped the most?",
        choices: [
          { native: "Мышка!", roman: "myshka!", english: "The mouse!", right: true },
          { native: "Дедушка!", roman: "dedushka!", english: "Grandpa!", reply: [{ who: "dedushka", text: "I'd like to say yes. But he pulled for pages and nothing happened. Who made the difference?" }] },
          { native: "Репка!", roman: "repka!", english: "The turnip!", reply: [{ who: "sasha", text: "The turnip was the PROBLEM. Who helped?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{Мышка!}}", gloss: "“The mouse!”" },
        { who: "dedushka", text: "{{Правильно.}} Everybody {{тянут}}, all together — {{вместе}} — but the smallest one is the one who finishes it. Remember that.", gloss: "pravil'no — right. tyanut — they pull. vmeste — together." },
        { who: "sasha", text: "…That's actually a good story. Don't tell anyone I said that." },
      ],
      encounter: ["myshka", "tyanut", "vmeste"],
      memory: "myshka",
    },
    gates: [{ room: "komnata", hotspot: "kukhnya", until: "skazka", line: { who: "dedushka", text: "Sit with me first.", gloss: "Dedushka pats the arm of his chair." } }],
    idle: {
      "kukhnya:babushka": [{ who: "babushka", text: "He's told that story to three generations now. It gets longer every time." }],
      "komnata:dedushka": [{ who: "dedushka", text: "Soon you fly home. But you take Repka with you. Tell it to someone smaller than you." }],
    },
    afterwards: {
      "komnata:dedushka": [{ who: "dedushka", text: "Next time: Kolobok. The runaway bun. You'll like him more than he deserves." }],
      "kukhnya:sasha": [{ who: "sasha", text: "Will you call? From America? Every week? Promise?" }],
    },
    complete: {
      title: "The",
      em: "Turnip",
      text: "You fetched Sasha, beat her word test, heard Dedushka tell Репка, told the whole chain back in order — and knew the smallest one mattered most.",
      quest: { v: "Have tea from the samovar", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Komnata />,
};

export default content;
