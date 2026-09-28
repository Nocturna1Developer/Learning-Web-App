import type { ChapterContent } from "../types";
import { Stage, Ground, Stall, Crowd, Item, FY } from "../scenes";
import { Figure } from "../../components/scenes/primitives";

/* RUSSIAN · Chapter Three — Рынок. The covered market in St. Petersburg, where nobody lets you buy anything without tasting it first. */

const CY = "'Noto Serif', Georgia, serif";

function Hall({ honey = false }: { honey?: boolean }) {
  return (
    <Stage>
      {/* the market hall: tall arched windows, a glass roof */}
      <rect width="1600" height="900" fill="#d8cdb8" />
      {Array.from({ length: 5 }, (_, i) => (
        <g key={i}>
          <path d={`M${60 + i * 320} 520v-300q110 -110 220 0v300Z`} fill="#a8c0d0" />
          <path d={`M${60 + i * 320} 520v-300q110 -110 220 0v300Z`} fill="none" stroke="#8a7a6a" strokeWidth="8" />
          <line x1={170 + i * 320} y1={140} x2={170 + i * 320} y2={520} stroke="#8a7a6a" strokeWidth="5" />
        </g>
      ))}
      <rect x="0" y="0" width="1600" height="60" fill="#8a7a6a" />
      <Ground color="#a89a88" line="#887a68" kind="tile" />
      {honey ? (
        <>
          {/* honey row: jars in every shade of gold */}
          <rect x={160} y={FY - 170} width="700" height="170" fill="#6b4429" />
          <rect x={150} y={FY - 184} width="720" height="18" fill="#8a5a34" />
          {Array.from({ length: 12 }, (_, i) => (
            <g key={i}>
              <rect x={180 + i * 56} y={FY - 244 - (i % 2) * 8} width="42" height="60" rx="6" fill={["#e8b030", "#c8801a", "#f0cf6a", "#a8601a"][i % 4]} opacity="0.9" />
              <rect x={184 + i * 56} y={FY - 252 - (i % 2) * 8} width="34" height="10" fill="#f4f0e6" />
            </g>
          ))}
          <rect x={350} y={FY - 330} width="320" height="50" fill="#2d4a8a" />
          <text x={510} y={FY - 296} textAnchor="middle" fontFamily={CY} fontSize="30" fill="#e8c25a">МЁД · ПАСЕКА</text>
          <Figure x={940} y={FY} h={205} color="#2a1a12" flip />
          <Figure x={1200} y={FY} h={200} color="#3a2a24" />
          <Crowd x={1440} n={2} spread={160} seed={83} scale={0.9} />
        </>
      ) : (
        <>
          <Stall x={100} w={460} colors={["#2d4a8a", "#f4f0e6"]} goods={[{ color: "#f8f4ec", kind: "round" }, { color: "#c8302a", kind: "round" }, { color: "#c8a060", kind: "round" }]} sign="ТВОРОГ · ОВОЩИ" signFont={CY} />
          <Figure x={600} y={FY} h={205} color="#3a2a24" flip />
          <Figure x={900} y={FY} h={195} color="#2a1a12" />
          <Stall x={1060} w={380} colors={["#b8453a", "#f4f0e6"]} goods={[{ color: "#5a8a3a", kind: "stack" }, { color: "#8a2a4a", kind: "round" }]} sign="СОЛЕНЬЯ" signFont={CY} />
          <Crowd x={1400} n={2} spread={180} seed={79} scale={0.9} />
        </>
      )}
    </Stage>
  );
}

const apple = (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="36" r="22" fill="#c8c850" />
    <ellipse cx="24" cy="28" rx="7" ry="5" fill="#fff" opacity="0.35" />
    <path d="M32 14q2 -8 10 -10" stroke="#6b4429" strokeWidth="3" fill="none" />
  </svg>
);

const content: ChapterContent = {
  startRoom: "zal",
  speakers: {
    galya: { name: "Tyotya Galya", glyph: "Г", tone: "guest" },
    ivan: { name: "Ivan Petrovich", glyph: "И", tone: "guest" },
  },
  rooms: {
    zal: {
      id: "zal",
      name: "The market hall",
      native: "рынок",
      art: <Hall />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "stall", x: 320, y: 600, label: "Dairy and vegetables", kind: "word", wordId: "tvorog" },
        { id: "galya", x: 600, y: 560, label: "Tyotya Galya", kind: "npc" },
        { id: "babushka", x: 900, y: 560, label: "Babushka", kind: "npc" },
        { id: "pickles", x: 1250, y: 600, label: "Pickle barrels", kind: "flavor", note: "Barrels of pickled cucumbers, cabbage and whole red apples. The woman behind them hands you a cucumber on a fork before you can say a word." },
        { id: "windows", x: 810, y: 300, label: "Tall windows", kind: "word", wordId: "rynok" },
        { id: "next", x: 1530, y: 580, label: "The honey row", kind: "exit", to: "myod" },
      ],
    },
    myod: {
      id: "myod",
      name: "The honey row",
      native: "медовый ряд",
      art: <Hall honey />,
      spawn: { left: 240, right: 1200 },
      hotspots: [
        { id: "back", x: 70, y: 580, label: "Back", kind: "exit", to: "zal" },
        { id: "jars", x: 500, y: 520, label: "Honey jars", kind: "word", wordId: "myod" },
        { id: "ivan", x: 940, y: 560, label: "Ivan Petrovich", kind: "npc" },
        { id: "babushka", x: 1200, y: 560, label: "Babushka", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Глава третья · Russian",
      title: "The",
      em: "Market",
      text: "Back in the city for the week. Babushka's market is a huge old hall with arched windows and a glass roof — and every seller in it wants you to taste something.",
    },
    introLines: [
      { who: "babushka", text: "{{Пошли на рынок!}} Bring the bag. And an empty stomach.", gloss: "poshli na rynok — let's go to the market!" },
      { who: "guide", text: "Quest: help Babushka with her shopping.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "list",
        quest: { v: "Ask Babushka what she needs", hint: "She's in the middle of the hall." },
        at: { room: "zal", hotspot: "babushka" },
        encounter: ["rynok"],
        lines: [
          { who: "babushka", text: "At the {{рынок}}: {{творог}}, {{яблоки}}, {{картошка}} — and smetana, for your blini.", gloss: "tvorog — farmer's cheese. yabloki — apples. kartoshka — potatoes." },
          { who: "babushka", text: "Tyotya Galya, on the left. We've known each other forty years. She'll give us the good ones.", gloss: "The blue-and-white stall." },
        ],
        culture: ["kuznechny"],
      },
      {
        id: "pick",
        quest: { v: "Shop at Tyotya Galya's stall", hint: "The blue-and-white stall." },
        at: { room: "zal", hotspot: "galya" },
        lines: [{ who: "galya", text: "{{Здравствуйте!}} Is this the famous grandchild? Hold the bag, I'll fill it.", gloss: "zdravstvuyte — hello (the polite one). Tyotya Galya, round and cheerful." }],
        game: {
          type: "fetch",
          npc: "galya",
          kicker: "Mini-game · Рынок",
          title: "Put what she names in the bag.",
          hint: "Nothing is labelled. Listen.",
          asks: [
            { wordId: "tvorog", native: "Творог, свежий.", roman: "tvorog, svezhiy.", english: "Fresh tvorog." },
            { wordId: "smetana", native: "Сметана.", roman: "smetana.", english: "Sour cream." },
            { wordId: "yabloki", native: "Яблоки — антоновка!", roman: "yabloki — antonovka!", english: "Apples — the Antonovka kind!" },
            { wordId: "kartoshka", native: "И картошка.", roman: "i kartoshka.", english: "And potatoes." },
          ],
          items: [
            { wordId: "tvorog", label: "Crumbly", art: <Item kind="box" color="#f8f4ec" accent="#e8e0d0" /> },
            { wordId: "smetana", label: "Jar", art: <Item kind="jar" color="#f8f4ec" accent="#e8e0d0" /> },
            { wordId: "yabloki", label: "Green-gold", art: <Item kind="round" color="#c8c850" /> },
            { wordId: "kartoshka", label: "Dusty", art: <Item kind="round" color="#c8a060" /> },
          ],
          done: { native: "Вот и всё!", roman: "vot i vsyo!", english: "That's everything!" },
        },
        after: [{ who: "galya", text: "Now — how many of each? I'll say, you count them into the bag.", gloss: "She sells by the piece, not the kilo." }],
        nudges: { "zal:babushka": [{ who: "babushka", text: "Galya! The stall on the left. {{Иди!}}", gloss: "idi — go!" }] },
      },
      {
        id: "pay",
        quest: { v: "Count with Tyotya Galya", hint: "Count what she asks for into the bag." },
        at: { room: "zal", hotspot: "galya" },
        lines: [{ who: "galya", text: "One thing at a time. Count them into the bag.", gloss: "She's already slipped an extra apple into your pocket." }],
        game: {
          type: "count",
          npc: "galya",
          kicker: "Mini-game · Считаем",
          title: "Count out what she asks for.",
          hint: "Tap to count them into the bag, then hand it over.",
          unit: "pieces",
          coin: apple,
          rounds: [
            { native: "Два яблока — для компота.", roman: "dva yabloka — dlya kompota.", english: "Two apples — for the compote.", answer: 2, wordId: "dva" },
            { native: "Три яблока — для пирога.", roman: "tri yabloka — dlya piroga.", english: "Three apples — for the pie.", answer: 3, wordId: "tri" },
            { native: "Пять — для Дедушки.", roman: "pyat' — dlya dedushki.", english: "Five — for Dedushka.", answer: 5, wordId: "pyat" },
            { native: "И десять — на зиму!", roman: "i desyat' — na zimu!", english: "And ten — for the winter!", answer: 10, wordId: "desyat" },
          ],
          done: { native: "Правильно!", roman: "pravil'no!", english: "Correct!" },
        },
        after: [{ who: "babushka", text: "Now — honey. The honey row. And let me do the talking.", gloss: "She has a look in her eye." }],
        memory: "paid",
      },
      {
        id: "honey",
        quest: { v: "Buy honey with Babushka", hint: "The honey row." },
        at: { room: "myod", hotspot: "ivan" },
        encounter: ["myod", "skolko", "dorogo", "rubl"],
        lines: [
          { who: "ivan", text: "{{Попробуйте!}} Linden, buckwheat, clover — try, try!", gloss: "“Try it!” Ivan Petrovich hands you a tiny plastic spoon of dark honey." },
          { who: "guide", text: "Buckwheat {{мёд}}: dark, almost bitter, and then very sweet.", gloss: "myod — honey." },
          { who: "babushka", text: "{{Сколько стоит?}}", gloss: "skol'ko stoit — how much is it?" },
          { who: "ivan", text: "For you, Anna Sergeyevna? Nine hundred {{рублей}} the jar. From my own hives.", gloss: "rubley — roubles. Anna Sergeyevna is Babushka; he uses her full name, very respectfully." },
          { who: "babushka", text: "{{Дорого!}} Ivan, I bought honey from your father when you were in nappies.", gloss: "dorogo — expensive!" },
          { who: "ivan", text: "…Seven hundred. And a spoon of linden for the child.", gloss: "Babushka wins. Babushka always wins." },
        ],
        culture: ["tasting"],
        memory: "haggle",
        nudges: {
          "myod:babushka": [{ who: "babushka", text: "The honey first. {{Пойдём.}}", gloss: "poydyom — let's go." }],
          "zal:babushka": [{ who: "babushka", text: "The honey row! Further along." }],
        },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Ivan Petrovich", hint: "He's asking if you want anything else." },
      lines: [{ who: "ivan", text: "He wraps the jar in newspaper, then leans over the counter towards you." }],
      asker: "ivan",
      question: {
        native: "Что-нибудь ещё?",
        roman: "chto-nibud' yeshchyo?",
        english: "Anything else?",
        choices: [
          { native: "Нет, спасибо!", roman: "net, spasibo!", english: "No, thank you!", right: true },
          { native: "Дорого!", roman: "dorogo!", english: "Expensive!", reply: [{ who: "ivan", text: "Ha! You've been listening to your babushka. But — anything else?" }] },
          { native: "Хочу!", roman: "khochu!", english: "I want!", reply: [{ who: "ivan", text: "You want… what? Another jar? Anything else?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{Нет, спасибо!}}", gloss: "“No, thank you!”" },
        { who: "ivan", text: "{{Молодец!}} Anna Sergeyevna, this one speaks Russian!", gloss: "Well done!" },
        { who: "guide", text: "…Babushka says “of course” as if she hadn't been practising with you all week." },
      ],
      encounter: ["spasibo"],
      memory: "spasibo",
    },
    idle: {
      "zal:galya": [{ who: "galya", text: "Come back Saturday. I'll save you the best tvorog." }],
      "myod:babushka": [{ who: "babushka", text: "Everything's in the bag. Home — the tea's waiting." }],
    },
    afterwards: {
      "myod:babushka": [{ who: "babushka", text: "In winter, you come back for New Year. The yolka, the chimes, Ded Moroz — everything. Promise me." }],
      "myod:ivan": [{ who: "ivan", text: "Seven hundred. Don't tell anyone." }],
    },
    complete: {
      title: "The",
      em: "Market",
      text: "You filled Babushka's bag by ear, counted apples in Russian, tasted honey you'll never forget, watched Babushka bargain — and told Ivan Petrovich “нет, спасибо.”",
      quest: { v: "Carry the honey home", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Hall />,
};

export default content;
