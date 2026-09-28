import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, VideoCall, Table, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure } from "../../components/scenes/primitives";
import { Portrait } from "../kit";
import { Matryoshka, Yolka, Turnip, Jar } from "./art";

/* RUSSIAN · Chapter Six — Семья. Home again, a call to St. Petersburg, and a goodbye that means “until we meet.” */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const berryCard = card(<>{[26, 40, 54, 33, 47].map((x, i) => <circle key={i} cx={x} cy={i < 3 ? 60 : 46} r="9" fill={i % 2 ? "#e8508a" : "#d8302a"} />)}<path d="M40 30l-6 -12M40 30l6 -12" stroke="#3f7d3a" strokeWidth="3" /></>);
const honeyCard = card(<><rect x="22" y="30" width="36" height="50" rx="6" fill="#e8b030" /><rect x="20" y="22" width="40" height="10" fill="#f4f0e6" /><path d="M30 50q10 -6 20 0" stroke="#c8801a" strokeWidth="3" fill="none" /></>);
const treeCard = card(<g transform="translate(40 88) scale(0.18)"><Yolka x={0} y={0} h={440} dressed /></g>);
const turnipCard = card(<Turnip x={40} y={54} s={0.6} />);

function Gostinaya({ done }: { done: ReadonlySet<string> }) {
  return (
    <Stage>
      <Walls />
      <Door x={40} />
      <Window x={330} y={210} w={280} h={220} />
      <PhotoFrame x={690} y={240} w={140} h={110} tint="#2d4a8a" two />
      <rect x={880} y={330} width="160" height="10" fill={WOOD} />
      <Matryoshka x={920} y={330} s={0.6} />
      <Matryoshka x={970} y={330} s={0.45} color="#2d4a8a" />
      <Matryoshka x={1006} y={330} s={0.32} />
      <Table x={560} w={460} />
      <VideoCall x={650} y={FY - 150 - 190} w={300} faces={done.has("call") ? 6 : 2} bgs={["#2d4a8a", "#b8453a", "#e8c870", "#4a7a5a"]} />
      <rect x={1100} y={FY - 140} width="360" height="140" rx="12" fill="#4a3a5a" />
      <rect x={1100} y={FY - 200} width="360" height="74" rx="14" fill="#5a4a6a" />
      <Figure x={1250} y={FY - 20} h={190} color="#2a1a12" pose="sit" />
      <Figure x={1400} y={FY} h={205} color="#3a2a24" flip />
    </Stage>
  );
}

function Komnata() {
  return (
    <Stage>
      <Walls tint="#e6e0d2" />
      <Window x={240} y={220} w={320} h={230} />
      {/* a paper snowflake taped to the wall */}
      <g transform="translate(730 300)" stroke="#9ab8d8" strokeWidth="5">
        {[0, 60, 120].map((a) => <line key={a} x1={-44} y1={0} x2={44} y2={0} transform={`rotate(${a})`} />)}
      </g>
      <rect x={880} y={FY - 170} width="300" height="170" rx="12" fill="#8a2a2a" />
      <path d={`M880 ${FY - 170} l40 -90 h220 l40 90`} fill="#9a3a3a" />
      <Jar x={960} y={FY - 170} s={0.7} />
      <Matryoshka x={1080} y={FY - 170} s={0.5} />
      <rect x={60} y={FY - 150} width="420" height="150" fill="#8c6240" />
      <rect x={60} y={FY - 126} width="420" height="60" fill="#2d4a8a" />
      <rect x={1240} y={FY - 420} width="240" height="420" fill={WOOD} />
      {[0, 1, 2, 3].map((r) => <rect key={r} x={1250} y={FY - 400 + r * 100} width="220" height="88" fill="#3a2718" />)}
      <Door x={1500} open />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "komnata",
  speakers: {
    dyadya: { name: "Dyadya Kolya", glyph: "К", tone: "guest" },
    tyotya: { name: "Tyotya Lena", glyph: "Л", tone: "guest" },
    sasha: { name: "Sasha", glyph: "С", tone: "guest" },
    petya: { name: "Petya", glyph: "П", tone: "guest" },
  },
  rooms: {
    komnata: {
      id: "komnata",
      name: "Your room",
      native: "твоя комната",
      art: <Komnata />,
      spawn: { left: 560, right: 1360 },
      hotspots: [
        { id: "window", x: 400, y: 460, label: "Window", kind: "word", wordId: "dom" },
        { id: "snowflake", x: 730, y: 300, label: "Paper snowflake", kind: "word", wordId: "sneg" },
        { id: "suitcase", x: 1030, y: 620, label: "Suitcase", kind: "quest" },
        { id: "gostinaya", x: 1540, y: 560, label: "Living room", kind: "exit", to: "gostinaya" },
      ],
    },
    gostinaya: {
      id: "gostinaya",
      name: "Living room",
      native: "гостиная",
      art: (done) => <Gostinaya done={done} />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "back", x: 130, y: 560, label: "Your room", kind: "exit", to: "komnata" },
        { id: "photo", x: 760, y: 295, label: "New photo", kind: "word", wordId: "semya" },
        { id: "dolls", x: 960, y: 300, label: "Matryoshkas", kind: "flavor", note: "Three matryoshkas on the shelf — a present from Dedushka. The smallest one is the size of your fingernail and doesn't open. You checked." },
        { id: "laptop", x: 800, y: 520, label: "Video call", kind: "quest" },
        { id: "mama", x: 1250, y: 560, label: "Mama", kind: "npc" },
        { id: "papa", x: 1400, y: 560, label: "Papa", kind: "word", wordId: "papa" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Глава шестая · Russian",
      title: "The",
      em: "Family",
      text: "Home again. The house is warm and very quiet after St. Petersburg, the jet lag is winning, and there's still a tangerine from New Year in your coat pocket.",
    },
    introLines: [
      { who: "mama", text: "Unpack, then come — St. Petersburg is calling. Everyone's at Babushka's.", gloss: "Mama, from the living room." },
      { who: "guide", text: "Quest: bring St. Petersburg home.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "unpack",
        quest: { v: "Unpack your suitcase", hint: "In your room." },
        at: { room: "komnata", hotspot: "suitcase" },
        encounter: ["chemodan", "pamyat"],
        lines: [
          { who: "guide", text: "A jar of Babushka's raspberry jam, wrapped in a scarf. A matryoshka. A paper snowflake Sasha cut out for you.", gloss: "All in the {{чемодан}}." },
          { who: "guide", text: "Dedushka said it when he gave you the doll: {{на память}}.", gloss: "na pamyat' — “for memory”: something to remember by." },
          { who: "mama", text: "{{Звонят!}} Come, come!", gloss: "zvonyat — they're calling!" },
        ],
        memory: "keepsakes",
      },
      {
        id: "call",
        quest: { v: "Join the video call", hint: "In the living room." },
        at: { room: "gostinaya", hotspot: "laptop" },
        lines: [
          { who: "babushka", text: "{name}! {{Привет, солнышко!}} Can you hear us? Kolya, don't block the camera!", gloss: "Babushka, on the screen." },
          { who: "dyadya", text: "I'm not blocking, I'm HOSTING.", gloss: "Dyadya Kolya — Mama's brother. Sasha and Petya's dad." },
          { who: "guide", text: "Six faces around Babushka's table. Who's who?", gloss: "In Russian, your cousins are your brother and sister. Put everyone in their place." },
        ],
        game: {
          type: "place",
          board: "album",
          kicker: "Mini-game · Семья",
          title: "Who's who on the call?",
          hint: "Pick someone, then the word that fits. Cousins in Russian are often just “brother” and “sister.”",
          tray: "On the screen",
          done: "Everyone has a name — and a Russian one.",
          items: [
            { wordId: "dyadya", who: "Mama's brother", hint: "Kolya. Is hosting. Loudly.", art: <Portrait />, tint: "#2d4a8a" },
            { wordId: "tyotya", who: "Dyadya Kolya's wife", hint: "Lena. Made the Olivier salad.", art: <Portrait />, tint: "#b8453a" },
            { wordId: "brat", who: "The boy cousin", hint: "Petya. Fourteen. Missed New Year with the flu.", art: <Portrait child />, tint: "#4a7a5a" },
            { wordId: "sestra", who: "The girl cousin", hint: "Sasha. In charge of decorations, and timers.", art: <Portrait child />, tint: "#e8c870" },
          ],
        },
        after: [{ who: "tyotya", text: "So — tell us everything. {{По-русски!}}", gloss: "po-russki — in Russian!" }],
        memory: "call",
        nudges: { "komnata:suitcase": [{ who: "guide", text: "The rest can wait. They're calling." }] },
      },
      {
        id: "retell",
        quest: { v: "Tell them about your year", hint: "On the call." },
        at: { room: "gostinaya", hotspot: "laptop" },
        lines: [{ who: "guide", text: "Tell it in order — the way it happened.", gloss: "Everything you did, in Russian." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · На память",
          title: "Tell your year in order.",
          hint: "From the summer at the dacha to the snowy afternoon.",
          steps: [
            { native: "Клубника на даче", roman: "klubnika na dache", english: "strawberries at the dacha", wordId: "klubnika", art: berryCard },
            { native: "Мёд на рынке", roman: "myod na rynke", english: "honey at the market", wordId: "myod", art: honeyCard },
            { native: "Ёлка на Новый год", roman: "yolka na Novyy god", english: "the New Year tree", wordId: "yolka", art: treeCard },
            { native: "Сказка про репку", roman: "skazka pro repku", english: "the tale of the turnip", wordId: "repka", art: turnipCard },
          ],
          done: "The whole year, in Russian. Dedushka, somewhere off-screen, starts telling Репка again. Everyone lets him.",
        },
        memory: "retold",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Sasha", hint: "She's taken over the laptop." },
      lines: [{ who: "sasha", text: "Sasha carries the laptop into the kitchen so she can talk to you without Petya listening." }],
      asker: "sasha",
      question: {
        native: "Когда ты приедешь?",
        roman: "kogda ty priyedesh'?",
        english: "When will you come?",
        choices: [
          { native: "Скоро!", roman: "skoro!", english: "Soon!", right: true },
          { native: "Мышка!", roman: "myshka!", english: "The mouse!", reply: [{ who: "sasha", text: "Yes, yes, the mouse helped the most. When are you COMING?" }] },
          { native: "Нет, спасибо.", roman: "net, spasibo.", english: "No, thank you.", reply: [{ who: "petya", text: "(Off-screen:) Ha! She's not selling honey!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{Скоро!}}", gloss: "“Soon!”" },
        { who: "sasha", text: "{{Я скучаю.}}", gloss: "“I miss you.” She says it quickly and looks at the ceiling." },
        { who: "you", text: "{{Я тоже скучаю!}}", gloss: "“I miss you too!”" },
        { who: "babushka", text: "(Back in the frame:) In this family, we don't say goodbye. We say {{до встречи}} — until we meet.", gloss: "do vstrechi." },
        { who: "you", text: "{{До встречи!}}", gloss: "“Until we meet!”" },
      ],
      encounter: ["skoro", "skuchayu", "dovstrechi"],
      memory: "dovstrechi",
    },
    idle: {
      "gostinaya:mama": [{ who: "mama", text: "Go on — Babushka's been sitting in front of that laptop since breakfast." }],
      "komnata:suitcase": [{ who: "guide", text: "Everything's out. The snowflake goes on the wall." }],
    },
    afterwards: {
      "gostinaya:mama": [{ who: "mama", text: "The whole call in Russian. Babushka is going to tell the entire market on Saturday." }],
      "gostinaya:laptop": [{ who: "guide", text: "The call's over. In St. Petersburg it's already night, and it's snowing again." }],
    },
    complete: {
      title: "The",
      em: "Family",
      text: "Keepsakes unpacked, дядя, тётя, брат and сестра all named, your whole year retold in Russian — and a goodbye that means “until we meet.”",
      quest: { v: "Put the matryoshkas on the shelf", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Gostinaya done={new Set(["call"])} />,
};

export default content;
