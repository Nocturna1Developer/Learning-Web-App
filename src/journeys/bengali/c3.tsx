import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Ground, Stall, Crowd, Coin, Item, Awning, FY } from "../scenes";
import { Figure } from "../../components/scenes/primitives";
import { BN, TinHouse, Rickshaw } from "./art";

/* BENGALI · Chapter Three — বাজার. The town bazaar with Nana, and the serious business of choosing an ilish. */

function Bazar({ fish = false }: { fish?: boolean }) {
  return (
    <Stage>
      <Sky id={fish ? "bn3b" : "bn3a"} top="#9ac0d8" bottom="#f2e8d0" />
      <Sun x={fish ? 1420 : 200} y={100} r={44} color="#fbe0a0" />
      {fish ? (
        <>
          {/* a corrugated roof over the fish market */}
          <rect x="0" y="180" width="1600" height="30" fill="#8a9aa8" />
          {[80, 480, 880, 1280].map((x) => <rect key={x} x={x} y="210" width="16" height={FY - 210} fill="#6a7a88" />)}
          <Ground color="#8a8a88" line="#6a6a68" kind="tile" />
          {/* the ilish on a wet slab */}
          <rect x={260} y={FY - 150} width="560" height="150" fill="#6a7a88" />
          <rect x={250} y={FY - 162} width="580" height="16" fill="#9aa8b8" />
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i} transform={`translate(${300 + i * 58} ${FY - 176 - (i % 2) * 10}) rotate(${i % 2 ? 8 : -8})`}>
              <path d="M-26 0q24 -14 48 0q-24 14 -48 0Z" fill="#c8d0dc" />
              <path d="M20 0l12 -8v16Z" fill="#b8c0cc" />
              <circle cx="-16" cy="-2" r="2" fill="#2a1a12" />
            </g>
          ))}
          <text x={540} y={FY - 230} textAnchor="middle" fontFamily={BN} fontSize="40" fill="#1f6a4a">ইলিশ</text>
          <Figure x={900} y={FY} h={200} color="#2a1a12" flip />
          <Figure x={1120} y={FY} h={205} color="#2a1a12" />
          <Crowd x={1400} n={3} spread={240} seed={97} scale={0.9} />
        </>
      ) : (
        <>
          <TinHouse x={-40} w={420} h={260} wall="#d8b890" door="#c8302a" />
          <TinHouse x={1220} w={420} h={250} wall="#c8d8b8" />
          <Ground color="#b8a080" line="#98805e" kind="dirt" />
          <Awning x={420} y={FY - 330} w={520} colors={["#1f6a4a", "#f4f0e6"]} />
          <Stall x={440} w={480} colors={["#1f6a4a", "#f4f0e6"]} goods={[{ color: "#c8a060", kind: "round" }, { color: "#5a3a6a", kind: "long" }, { color: "#8ab04a", kind: "long" }, { color: "#3f8a3a", kind: "leaf" }]} />
          <Figure x={960} y={FY} h={200} color="#3a2a24" pose="sit" flip />
          <Rickshaw x={1200} s={0.9} />
          <Figure x={330} y={FY} h={205} color="#2a1a12" />
        </>
      )}
    </Stage>
  );
}

const taka = <Coin symbol="৳" />;

const content: ChapterContent = {
  startRoom: "sobji",
  speakers: {
    kamal: { name: "Kamal bhai", glyph: "ক", tone: "guest" },
    machwala: { name: "The fish seller", glyph: "মা", tone: "guest" },
  },
  rooms: {
    sobji: {
      id: "sobji",
      name: "The vegetable lanes",
      native: "সবজি বাজার",
      art: <Bazar />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "nana", x: 330, y: 560, label: "Nana", kind: "npc" },
        { id: "veg", x: 680, y: 600, label: "Vegetables", kind: "word", wordId: "alu" },
        { id: "kamal", x: 960, y: 580, label: "Kamal bhai", kind: "npc" },
        { id: "rickshaw", x: 1180, y: 560, label: "Painted rickshaw", kind: "flavor", note: "A cycle-rickshaw painted with peacocks, film stars and flowers — every inch of it. Dhaka has hundreds of thousands of them; no two look alike." },
        { id: "crowd", x: 1400, y: 560, label: "Market crowd", kind: "word", wordId: "bazar" },
        { id: "next", x: 1530, y: 600, label: "The fish market", kind: "exit", to: "machbazar" },
      ],
    },
    machbazar: {
      id: "machbazar",
      name: "The fish market",
      native: "মাছের বাজার",
      art: <Bazar fish />,
      spawn: { left: 240, right: 1200 },
      hotspots: [
        { id: "back", x: 70, y: 580, label: "Back", kind: "exit", to: "sobji" },
        { id: "ilish", x: 540, y: 560, label: "The ilish slab", kind: "word", wordId: "ilish" },
        { id: "machwala", x: 900, y: 560, label: "The fish seller", kind: "npc" },
        { id: "nana", x: 1120, y: 560, label: "Nana", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "তৃতীয় অধ্যায় · Bengali",
      title: "The",
      em: "Bazaar",
      text: "Friday morning in the market town across the river. Rickshaw bells, shouting, the smell of coriander and river fish. Nana has a cloth shopping bag and a look of total concentration.",
    },
    introLines: [
      { who: "nana", text: "{{চলো, বাজারে!}} Stay close. And watch how I choose the fish.", gloss: "cholo, bajare — come on, to the bazaar!" },
      { who: "guide", text: "Quest: help Nana with the shopping.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "list",
        quest: { v: "Ask Nana what we need", hint: "He's at the edge of the lane." },
        at: { room: "sobji", hotspot: "nana" },
        encounter: ["bazar"],
        lines: [
          { who: "nana", text: "Vegetables first: {{আলু}}, {{বেগুন}}, {{লাউ}}, {{কাঁচা মরিচ}}.", gloss: "alu, begun, lau, kancha morich — potatoes, eggplant, bottle gourd, green chillies." },
          { who: "nana", text: "Kamal bhai, the green stall. He's been selling me vegetables since before your Ammu was born.", gloss: "Bhai — brother. What you call any man a little older than you." },
        ],
      },
      {
        id: "pick",
        quest: { v: "Buy vegetables from Kamal bhai", hint: "The green stall." },
        at: { room: "sobji", hotspot: "kamal" },
        lines: [{ who: "kamal", text: "{{আরে!}} The grandchild from America! Hold the bag.", gloss: "are — hey!" }],
        game: {
          type: "fetch",
          npc: "kamal",
          kicker: "Mini-game · বাজার",
          title: "Put what he names in the bag.",
          hint: "Nothing is labelled. Listen.",
          asks: [
            { wordId: "alu", native: "আগে আলু।", roman: "age alu.", english: "Potatoes first." },
            { wordId: "begun", native: "বেগুন — বড়গুলো।", roman: "begun — borogulo.", english: "Eggplants — the big ones." },
            { wordId: "lau", native: "একটা লাউ।", roman: "ekta lau.", english: "One bottle gourd." },
            { wordId: "morich", native: "আর কাঁচা মরিচ!", roman: "ar kancha morich!", english: "And green chillies!" },
          ],
          items: [
            { wordId: "alu", label: "Brown", art: <Item kind="round" color="#c8a060" /> },
            { wordId: "begun", label: "Purple", art: <Item kind="long" color="#5a3a6a" /> },
            { wordId: "lau", label: "Pale green", art: <Item kind="bottle" color="#8ab04a" /> },
            { wordId: "morich", label: "Small, green", art: <Item kind="leaf" color="#3f8a3a" /> },
          ],
          done: { native: "ঠিক আছে!", roman: "thik ache!", english: "All good!" },
        },
        after: [{ who: "kamal", text: "Now pay me — in {{টাকা}}. I'll say how much.", gloss: "taka — Bangladesh's money. The coins say ৳." }],
        nudges: { "sobji:nana": [{ who: "nana", text: "Kamal bhai! The vegetables. {{যাও।}}", gloss: "jao — go." }] },
      },
      {
        id: "pay",
        quest: { v: "Pay Kamal bhai", hint: "Count out the taka." },
        at: { room: "sobji", hotspot: "kamal" },
        encounter: ["taka"],
        lines: [{ who: "kamal", text: "One at a time. Count it into my hand.", gloss: "He winks at Nana." }],
        game: {
          type: "count",
          npc: "kamal",
          kicker: "Mini-game · টাকা",
          title: "Count out what he asks for.",
          hint: "Tap coins to count them out, then hand them over.",
          unit: "taka",
          coin: taka,
          rounds: [
            { native: "মরিচ — দুই টাকা।", roman: "morich — dui taka.", english: "Chillies: two taka.", answer: 2, wordId: "dui" },
            { native: "লাউ — তিন টাকা।", roman: "lau — tin taka.", english: "Gourd: three taka.", answer: 3, wordId: "tin" },
            { native: "বেগুন — পাঁচ টাকা।", roman: "begun — panch taka.", english: "Eggplants: five taka.", answer: 5, wordId: "panch" },
            { native: "আলু — দশ টাকা।", roman: "alu — dosh taka.", english: "Potatoes: ten taka.", answer: 10, wordId: "dosh" },
          ],
          done: { native: "একদম ঠিক!", roman: "ekdom thik!", english: "Exactly right!" },
        },
        after: [{ who: "nana", text: "Now — the {{ইলিশ}}. The most important purchase of the week. Let me do the talking.", gloss: "ilish — the hilsa, Bangladesh's national fish." }],
        memory: "paid",
      },
      {
        id: "haggle",
        quest: { v: "Choose an ilish with Nana", hint: "In the fish market." },
        at: { room: "machbazar", hotspot: "machwala" },
        encounter: ["ilish", "damkoto", "beshi"],
        lines: [
          { who: "guide", text: "Nana lifts a fish by the gills and turns it to the light. Silver, fat, a pink tinge at the gills. He nods, very slightly.", gloss: "Padma river ilish. The best." },
          { who: "nana", text: "{{দাম কত?}}", gloss: "dam koto — how much?" },
          { who: "machwala", text: "For you, Chacha? Fourteen hundred. Straight from the Padma.", gloss: "Chacha — uncle. Every fish seller calls Nana that." },
          { who: "nana", text: "{{অনেক বেশি!}} I've bought fish from your father for thirty years.", gloss: "onek beshi — much too much!" },
          { who: "machwala", text: "…Twelve hundred. And I'll cut it for you.", gloss: "Nana wins. Nana always wins." },
        ],
        culture: ["ilish", "fishmarket"],
        memory: "haggle",
        nudges: {
          "machbazar:nana": [{ who: "nana", text: "The ilish first. {{এসো।}}", gloss: "esho — come." }],
          "sobji:nana": [{ who: "nana", text: "The fish market! Further on." }],
        },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer the fish seller", hint: "He's asking if you need anything else." },
      lines: [{ who: "machwala", text: "He wraps the fish in newspaper, ties it with string, and leans over the slab towards you." }],
      asker: "machwala",
      question: {
        native: "আর কিছু লাগবে?",
        roman: "ar kichu lagbe?",
        english: "Need anything else?",
        choices: [
          { native: "না, ধন্যবাদ!", roman: "na, dhonnobad!", english: "No, thank you!", right: true },
          { native: "অনেক বেশি!", roman: "onek beshi!", english: "Too much!", reply: [{ who: "machwala", text: "Ha! You've learned from your Nana. But — anything else?" }] },
          { native: "ওপারে!", roman: "opare!", english: "To the other side!", reply: [{ who: "machwala", text: "The boat's that way! I asked if you need anything else." }] },
        ],
      },
      right: [
        { who: "you", text: "{{না, ধন্যবাদ!}}", gloss: "“No, thank you!”" },
        { who: "machwala", text: "{{বাহ!}} Chacha, the grandchild speaks Bangla!", gloss: "bah — wow!" },
        { who: "guide", text: "…Nana says “of course” as if he hadn't been practising with you every evening." },
      ],
      encounter: ["dhonnobad"],
      memory: "dhonnobad",
    },
    idle: {
      "sobji:kamal": [{ who: "kamal", text: "Come back next Friday! The mangoes are nearly ready." }],
      "machbazar:nana": [{ who: "nana", text: "Everything's in the bag. Home — Nanu will fry the ilish for lunch." }],
    },
    afterwards: {
      "machbazar:nana": [{ who: "nana", text: "On Monday it's Pohela Boishakh — the new year. Panta and ilish for breakfast. That's why we needed this fish." }],
      "machbazar:machwala": [{ who: "machwala", text: "Twelve hundred. Don't tell anyone." }],
    },
    complete: {
      title: "The",
      em: "Bazaar",
      text: "You filled Nana's bag by ear, counted out taka, watched him choose and bargain for an ilish — and told the fish seller “না, ধন্যবাদ.”",
      quest: { v: "Carry the ilish home", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Bazar />,
};

export default content;
