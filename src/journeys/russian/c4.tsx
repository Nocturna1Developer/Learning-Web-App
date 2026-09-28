import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Firework, Item, FY } from "../scenes";
import { Walls, Door, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { Yolka } from "./art";

/* RUSSIAN · Chapter Four — Новый год. The biggest night of the year: the yolka, the table, Ded Moroz and the twelve chimes. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const treeCard = card(<g transform="translate(40 88) scale(0.18)"><Yolka x={0} y={0} h={440} dressed /></g>);
const saladCard = card(<><path d="M8 44h64q-4 34-32 34T8 44Z" fill="#dfe8ee" /><ellipse cx="40" cy="44" rx="32" ry="8" fill="#f4ecc8" />{[24, 34, 44, 54].map((x, i) => <rect key={x} x={x} y={38 + (i % 2) * 3} width="6" height="6" fill={["#e8a040", "#5a8a3a", "#f4f0e6", "#c8a060"][i]} />)}</>);
const frostCard = card(<><path d="M18 88l8 -56h28l8 56Z" fill="#2d4a8a" /><circle cx="40" cy="26" r="12" fill="#f4dcc0" /><path d="M28 30q12 30 24 0" fill="#f4f4f4" /><path d="M26 22q14 -20 28 0" fill="#2d4a8a" /><path d="M64 10v78" stroke="#c8c0b0" strokeWidth="3" /></>);
const clockCard = card(<><rect x="20" y="6" width="40" height="80" fill="#8a2a2a" /><circle cx="40" cy="36" r="16" fill="#f4f0e6" /><path d="M40 36v-12M40 36l8 4" stroke="#2a1a12" strokeWidth="2.5" /><path d="M30 6l10 -6l10 6" fill="#3f7d55" /></>);
const wishCard = card(<><rect x="16" y="28" width="48" height="34" fill="#f4f0e6" transform="rotate(-8 40 45)" /><path d="M24 40h30M24 48h24" stroke="#8a8a8e" strokeWidth="2" /><circle cx="60" cy="24" r="6" fill="#e8b830" /><path d="M60 14v-8M68 24h8M60 34v8M52 24h-8" stroke="#e8b830" strokeWidth="2" /></>);

function Gostinaya({ done }: { done: ReadonlySet<string> }) {
  const dressed = done.has("decorate");
  const midnight = done.has("evening");
  return (
    <Stage>
      <Walls tint="#e8dcc8" floor="#7a5a3a" floorLine="#5a3a22" shade="#d4c6ae" />
      {/* the window: snow, and fireworks over the Neva at midnight */}
      <rect x={1040} y={180} width="340" height="280" fill="#f4efe4" />
      <rect x={1052} y={192} width="316" height="256" fill="#0e1430" />
      {Array.from({ length: 18 }, (_, i) => <circle key={i} cx={1060 + ((i * 53) % 300)} cy={200 + ((i * 37) % 240)} r="3" fill="#fff" opacity="0.8" />)}
      {midnight && (
        <>
          <Firework x={1140} y={270} r={50} color="#e8b830" />
          <Firework x={1290} y={320} r={40} color="#d8302a" />
        </>
      )}
      <line x1="1210" y1="192" x2="1210" y2="448" stroke="#f4efe4" strokeWidth="8" />
      <Yolka x={300} h={480} dressed={dressed} lit={dressed} />
      {dressed && [220, 280, 360].map((x, i) => <rect key={x} x={x} y={FY - 50} width="50" height="44" fill={["#d8302a", "#2d6ab8", "#e8b830"][i]} />)}
      {/* the television with the Kremlin clock, and the long table */}
      <rect x={560} y={260} width="220" height="150" rx="8" fill="#1a1a1e" />
      <rect x={574} y={272} width="192" height="126" fill={midnight ? "#2a3a6a" : "#3a4a5a"} />
      <circle cx={670} cy={330} r="30" fill="#f4f0e6" />
      <path d="M670 330v-22M670 330v-6" stroke="#2a1a12" strokeWidth="3" />
      <rect x={560} y={FY - 150} width="560" height="18" fill={WOOD} />
      <rect x={580} y={FY - 132} width="14" height="132" fill={WOOD} />
      <rect x={1086} y={FY - 132} width="14" height="132" fill={WOOD} />
      <ellipse cx={680} cy={FY - 160} rx="60" ry="14" fill="#f4ecc8" />
      {[800, 830, 860, 845, 815].map((x, i) => <circle key={i} cx={x} cy={FY - 162 - (i > 2 ? 14 : 0)} r="12" fill="#f08a2a" />)}
      <path d={`M960 ${FY - 150}h26l-4 -44h-18Z`} fill="#f4f0e6" opacity="0.8" />
      <Figure x={720} y={FY} h={190} color="#2a1a12" pose="sit" />
      <Figure x={1000} y={FY} h={195} color="#3a2a24" pose="sit" flip />
      <Child x={500} y={FY} h={112} color="#2a1a12" />
    </Stage>
  );
}

function Prikhozhaya({ done }: { done: ReadonlySet<string> }) {
  const arrived = done.has("dedmoroz");
  return (
    <Stage>
      <Walls tint="#e4dccb" />
      <Door x={700} open={arrived} />
      <rect x={200} y={250} width="200" height="14" fill={WOOD} />
      {[230, 290, 350].map((x, i) => <path key={x} d={`M${x} 264v110q12 18 24 0v-100`} fill={["#2d4a8a", "#b8453a", "#3a3a3a"][i]} />)}
      {/* felt boots by the door */}
      {[250, 300].map((x) => <path key={x} d={`M${x} ${FY}v-80h30v60h24v20Z`} fill="#6a6a6a" />)}
      {arrived && (
        <>
          <g transform={`translate(790 ${FY})`}>
            <path d="M-60 0l20 -170h80l20 170Z" fill="#b8302a" />
            <path d="M-60 0h120" stroke="#f4f4f4" strokeWidth="14" />
            <circle cx="0" cy="-190" r="26" fill="#f4dcc0" />
            <path d="M-26 -186q26 70 52 0" fill="#f4f4f4" />
            <path d="M-30 -200q30 -40 60 0Z" fill="#b8302a" />
            <path d="M-30 -200h60" stroke="#f4f4f4" strokeWidth="8" />
            <path d="M90 -260v260" stroke="#c8c0b0" strokeWidth="6" />
            <circle cx="90" cy="-266" r="12" fill="#a8d0f0" />
          </g>
          <g transform={`translate(960 ${FY})`}>
            <path d="M-40 0l14 -130h52l14 130Z" fill="#8ab8e0" />
            <circle cx="0" cy="-146" r="20" fill="#f4dcc0" />
            <path d="M-20 -154q20 -30 40 0" fill="#f4f4f4" />
            <path d="M-18 -140q-8 60 -6 100" stroke="#e8c870" strokeWidth="8" fill="none" />
          </g>
          <path d={`M620 ${FY}q-20 -60 20 -80q60 -10 70 30q10 40 -30 50Z`} fill="#b8302a" />
        </>
      )}
      <Child x={560} y={FY} h={112} color="#2a1a12" />
      <Door x={1420} open />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "gostinaya",
  speakers: {
    sasha: { name: "Sasha", glyph: "С", tone: "guest" },
    dedmoroz: { name: "Ded Moroz", glyph: "Д", tone: "guest" },
  },
  rooms: {
    gostinaya: {
      id: "gostinaya",
      name: "Living room",
      native: "гостиная",
      art: (done) => <Gostinaya done={done} />,
      spawn: { left: 480, right: 1200 },
      hotspots: [
        { id: "yolka", x: 300, y: 520, label: "The yolka", kind: "quest" },
        { id: "sasha", x: 500, y: 620, label: "Sasha", kind: "npc" },
        { id: "tv", x: 670, y: 330, label: "Television", kind: "word", wordId: "kuranty" },
        { id: "babushka", x: 720, y: 580, label: "Babushka", kind: "npc" },
        { id: "table", x: 840, y: 560, label: "The New Year table", kind: "quest" },
        { id: "window", x: 1210, y: 320, label: "Snowy window", kind: "word", wordId: "sneg" },
        { id: "prikhozhaya", x: 1520, y: 560, label: "Front hall", kind: "exit", to: "prikhozhaya" },
      ],
    },
    prikhozhaya: {
      id: "prikhozhaya",
      name: "Front hall",
      native: "прихожая",
      art: (done) => <Prikhozhaya done={done} />,
      spawn: { left: 400, right: 1300 },
      hotspots: [
        { id: "boots", x: 280, y: 680, label: "Felt boots", kind: "flavor", note: "Valenki — felt boots, for the kind of snow that's outside tonight. Dedushka's pair is older than Mama." },
        { id: "door", x: 790, y: 560, label: "Front door", kind: "quest" },
        { id: "gostinaya", x: 1510, y: 560, label: "Living room", kind: "exit", to: "gostinaya" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Глава четвёртая · Russian",
      title: "New",
      em: "Year",
      text: "December 31st, back in St. Petersburg. Snow up to the windowsills, a tree that smells of the forest, and a table that has been in preparation since Tuesday. Nobody will sleep before two.",
    },
    introLines: [
      { who: "babushka", text: "{{С наступающим!}} Come, the tree is naked. Help me!", gloss: "“Happy almost-New Year!” — what people say before midnight." },
      { who: "guide", text: "Quest: get everything ready before the twelfth chime.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "yolka",
        quest: { v: "Talk to Babushka", hint: "She's at the table." },
        at: { room: "gostinaya", hotspot: "babushka" },
        encounter: ["novyygod", "yolka"],
        lines: [
          { who: "babushka", text: "{{Новый год}} is the biggest night of the year. Bigger than birthdays. Bigger than anything.", gloss: "Novyy god — New Year." },
          { who: "babushka", text: "First, the {{ёлка}}. Sasha has the box of decorations. Go.", gloss: "yolka — the New Year tree." },
        ],
        culture: ["novyygod"],
      },
      {
        id: "decorate",
        quest: { v: "Decorate the yolka with Sasha", hint: "The tree by the window." },
        at: { room: "gostinaya", hotspot: "yolka" },
        lines: [{ who: "sasha", text: "I'm Sasha — your cousin. I'm in charge of decorations. You hand, I hang.", gloss: "Sasha is eleven and extremely organised." }],
        game: {
          type: "fetch",
          npc: "sasha",
          kicker: "Mini-game · Ёлка",
          title: "Pass Sasha what she asks for.",
          hint: "Nothing in the box is labelled. Listen.",
          asks: [
            { wordId: "girlyanda", native: "Сначала гирлянда.", roman: "snachala girlyanda.", english: "The lights first." },
            { wordId: "shariki", native: "Шарики!", roman: "shariki!", english: "The baubles!" },
            { wordId: "mandariny", native: "Мандарины — на стол.", roman: "mandariny — na stol.", english: "Tangerines — onto the table." },
            { wordId: "zvezda", native: "И звезда — на самый верх!", roman: "i zvezda — na samyy verkh!", english: "And the star — right on top!" },
          ],
          items: [
            { wordId: "girlyanda", label: "Tangled", art: <svg viewBox="0 0 80 90" aria-hidden="true"><path d="M8 40q16 20 32 0t32 0M8 60q16 20 32 0t32 0" stroke="#3a3a3a" strokeWidth="2" fill="none" />{[16, 32, 48, 64].map((x, i) => <circle key={x} cx={x} cy={i % 2 ? 44 : 52} r="5" fill="#ffd07a" />)}</svg> },
            { wordId: "shariki", label: "Shiny", art: <svg viewBox="0 0 80 90" aria-hidden="true">{[[26, 50, "#d8302a"], [52, 44, "#2d6ab8"], [40, 66, "#e8b830"]].map(([x, y, c]) => <g key={c as string}><circle cx={x as number} cy={y as number} r="13" fill={c as string} /><rect x={(x as number) - 4} y={(y as number) - 18} width="8" height="6" fill="#c8c0b0" /></g>)}</svg> },
            { wordId: "mandariny", label: "Orange", art: <Item kind="round" color="#f08a2a" /> },
            { wordId: "zvezda", label: "Pointy", art: <svg viewBox="0 0 80 90" aria-hidden="true"><path d="M40 12l9 20h22l-18 13l7 22l-20 -13l-20 13l7 -22l-18 -13h22Z" fill="#d8302a" /></svg> },
          ],
          done: { native: "Красота!", roman: "krasota!", english: "Beautiful!" },
        },
        after: [{ who: "sasha", text: "Ten o'clock… Listen! Someone's knocking. It's HIM.", gloss: "The front hall." }],
        memory: "yolka",
        nudges: { "gostinaya:babushka": [{ who: "babushka", text: "The yolka first! Sasha's waiting." }] },
      },
      {
        id: "dedmoroz",
        quest: { v: "Open the door", hint: "In the front hall." },
        at: { room: "prikhozhaya", hotspot: "door" },
        encounter: ["dedmoroz", "podarki"],
        lines: [
          { who: "dedmoroz", text: "{{Здравствуйте, дети!}} Is this where the good children live?", gloss: "A huge man in a long red coat, a white beard to his belt, a staff with an icicle on top. Beside him, Snegurochka — the Snow Maiden." },
          { who: "sasha", text: "(Whispering:) It's Uncle Misha from upstairs. Don't say anything.", gloss: "It's absolutely Uncle Misha." },
          { who: "dedmoroz", text: "{{Подарки}} — but only for a poem or a song!", gloss: "podarki — presents. You have to earn them. Sasha recites a whole poem. You hum loudly." },
        ],
        culture: ["dedmoroz"],
        nudges: { "gostinaya:sasha": [{ who: "sasha", text: "The door! Quick!" }] },
      },
      {
        id: "evening",
        quest: { v: "Get the table ready for midnight", hint: "Back in the living room." },
        at: { room: "gostinaya", hotspot: "table" },
        encounter: ["olivye"],
        lines: [{ who: "babushka", text: "Five minutes to midnight. Tell me — have we done everything, in the right order?", gloss: "A salad bowl the size of a steering wheel: {{оливье}}." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · Новогодняя ночь",
          title: "The New Year's Eve, in order.",
          hint: "From the afternoon to midnight.",
          steps: [
            { native: "Нарядить ёлку", roman: "naryadit' yolku", english: "decorate the tree", wordId: "yolka", art: treeCard },
            { native: "Нарезать оливье", roman: "narezat' olivye", english: "make the Olivier salad", wordId: "olivye", art: saladCard },
            { native: "Встретить Деда Мороза", roman: "vstretit' Deda Moroza", english: "welcome Ded Moroz", wordId: "dedmoroz", art: frostCard },
            { native: "Слушать куранты", roman: "slushat' kuranty", english: "listen to the chimes", wordId: "kuranty", art: clockCard },
            { native: "Загадать желание", roman: "zagadat' zhelaniye", english: "make a wish", wordId: "zhelanie", art: wishCard },
          ],
          done: "The Kremlin clock appears on the television. Everyone stands up. Somebody turns the volume all the way up.",
        },
        culture: ["olivye", "kuranty"],
        memory: "evening",
        nudges: { "gostinaya:babushka": [{ who: "babushka", text: "Back to the table — it's nearly midnight!" }] },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Count the chimes", hint: "It's the twelfth." },
      lines: [{ who: "guide", text: "…nine… ten… eleven… Everyone holds their breath. Twelve." }],
      asker: "babushka",
      question: {
        native: "Двенадцать! Что кричим?",
        roman: "dvenadtsat'! chto krichim?",
        english: "Twelve! What do we shout?",
        choices: [
          { native: "С Новым годом!", roman: "s Novym godom!", english: "Happy New Year!", right: true },
          { native: "Нет, спасибо!", roman: "net, spasibo!", english: "No, thank you!", reply: [{ who: "sasha", text: "NO? It's New Year! Shout it!" }] },
          { native: "Хочу!", roman: "khochu!", english: "I want!", reply: [{ who: "babushka", text: "You want — the New Year! So SAY it!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{С Новым годом!}}", gloss: "“Happy New Year!” — you and the whole building, and the whole city." },
        { who: "babushka", text: "{{С новым счастьем!}} Now — everybody out on the balcony!", gloss: "“With new happiness!” — the other half of the greeting." },
        { who: "guide", text: "Fireworks over the frozen Neva. Somebody's playing an accordion downstairs. It's one in the morning, and nobody is going to bed." },
      ],
      encounter: ["novyygod", "zhelanie"],
      memory: "snovym",
    },
    gates: [{ room: "gostinaya", hotspot: "prikhozhaya", until: "decorate", line: { who: "babushka", text: "The tree first! Then you can run around.", gloss: "Babushka points at the bare yolka." } }],
    idle: {
      "gostinaya:sasha": [{ who: "sasha", text: "I wrote my wish on paper. I'm not telling you. It's about a dog." }],
      "prikhozhaya:door": [{ who: "guide", text: "Ded Moroz has gone to visit the next flat. He's taking the stairs very slowly. Uncle Misha has a bad knee." }],
    },
    afterwards: {
      "gostinaya:babushka": [{ who: "babushka", text: "Tomorrow, when it snows, Dedushka will tell you the oldest story in our family. About a turnip." }],
    },
    complete: {
      title: "New",
      em: "Year",
      text: "You decorated the yolka by ear, met Ded Moroz (definitely not Uncle Misha), put the whole evening in order — and shouted “С Новым годом!” on the twelfth chime.",
      quest: { v: "Go out on the balcony for the fireworks", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Gostinaya done={new Set(["decorate"])} />,
};

export default content;
