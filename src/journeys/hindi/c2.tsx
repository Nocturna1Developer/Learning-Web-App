import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Ground, Crowd, Coin, Item, Bunting, Awning, FY } from "../scenes";
import { Figure, Child } from "../../components/scenes/primitives";
import { DV, LKO, Haveli, Thela } from "./art";

/* HINDI · Chapter Two — बाज़ार, The Bazaar. March in Lucknow: Aminabad with Dadi. */

function Bazaar({ deeper = false }: { deeper?: boolean }) {
  return (
    <Stage>
      <Sky id={deeper ? "hi2b" : "hi2a"} top="#e8c890" mid="#f2dcb4" bottom="#f6ead2" />
      <Sun x={deeper ? 1400 : 220} y={110} r={44} color="#fbe0a0" />
      {deeper ? (
        <>
          <Haveli x={-40} w={420} h={480} wall={LKO.wall[3]} />
          <Haveli x={1180} w={460} h={460} wall={LKO.wall[4]} />
        </>
      ) : (
        <>
          <Haveli x={-40} w={400} h={460} wall={LKO.wall[0]} />
          <Haveli x={620} w={360} h={500} wall={LKO.wall[1]} />
          <Haveli x={1240} w={400} h={440} wall={LKO.wall[2]} />
        </>
      )}
      <Ground color="#b8a080" line="#98805e" kind="dirt" />
      <Bunting y={100} sag={36} colors={["#e07a2f", "#1f4d33", "#d8a0a8", "#f0cf3a"]} />
      {deeper ? (
        <>
          {/* Hafiz sahab's chikan shop: white kurtas hanging in the doorway */}
          <rect x={300} y={FY - 380} width="520" height="380" fill="#6b4429" />
          <rect x={320} y={FY - 360} width="480" height="360" fill="#2a1a12" />
          <Awning x={290} y={FY - 400} w={540} colors={["#1f4d33", "#f4ecdd"]} />
          <rect x={430} y={FY - 460} width="260" height="46" fill="#f4ecdd" />
          <text x={560} y={FY - 428} textAnchor="middle" fontFamily={DV} fontSize="28" fill="#1f4d33">चिकन हाउस</text>
          {[350, 440, 530, 620, 710].map((x, i) => (
            <g key={x}>
              <line x1={x + 30} y1={FY - 340} x2={x + 30} y2={FY - 320} stroke="#c8c0b0" strokeWidth="2" />
              <path d={`M${x} ${FY - 320}h60l10 30l-10 -6v150h-60v-150l-10 6Z`} fill={i % 2 ? "#f4f2ec" : "#e8f0f4"} />
              <path d={`M${x + 16} ${FY - 280}q14 10 28 0M${x + 16} ${FY - 250}q14 10 28 0`} stroke="#c8d0d8" strokeWidth="2" fill="none" />
            </g>
          ))}
          <Figure x={860} y={FY} h={200} color="#2a1a12" flip />
          {/* the paan shop */}
          <rect x={1000} y={FY - 170} width="150" height="170" fill="#c0392b" />
          <rect x={1010} y={FY - 150} width="130" height="60" fill="#3f7d55" />
          <Figure x={1300} y={FY} h={205} color="#2a1a12" flip />
        </>
      ) : (
        <>
          {/* Ramesh bhaiya's thela */}
          <Thela x={120} w={380} heaps={["#c9a060", "#b8566a", "#c0392b", "#d8e24a"]} />
          <Figure x={540} y={FY} h={200} color="#3a2a24" flip />
          {/* the golgappe stall */}
          <rect x={660} y={FY - 150} width="200" height="150" fill="#d8b890" />
          <ellipse cx={700} cy={FY - 158} rx="40" ry="12" fill="#c8a060" />
          <rect x={760} y={FY - 210} width="70" height="60" rx="10" fill="#8fbfa0" opacity="0.8" />
          <Figure x={900} y={FY} h={195} color="#2a1a12" />
          <Figure x={1080} y={FY} h={205} color="#2a1a12" />
          <Child x={1150} y={FY} h={118} color="#3a2a24" />
          <Crowd x={1380} n={3} spread={260} seed={37} scale={0.92} />
        </>
      )}
    </Stage>
  );
}

const rupee = <Coin symbol="₹" />;

const content: ChapterContent = {
  startRoom: "gali",
  speakers: {
    ramesh: { name: "Ramesh bhaiya", glyph: "र", tone: "guest" },
    hafiz: { name: "Hafiz sahab", glyph: "ह", tone: "guest" },
  },
  rooms: {
    gali: {
      id: "gali",
      name: "The bazaar",
      native: "बाज़ार",
      art: <Bazaar />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "thela", x: 300, y: 600, label: "Vegetable cart", kind: "word", wordId: "aaloo" },
        { id: "ramesh", x: 540, y: 560, label: "Ramesh bhaiya", kind: "npc" },
        { id: "chaat", x: 760, y: 560, label: "Golgappe stall", kind: "quest" },
        { id: "haveli", x: 800, y: 380, label: "Old doorway", kind: "flavor", note: "A pointed arch and a carved wooden balcony, a hundred and fifty years old. Somebody's washing is drying on it." },
        { id: "dadi", x: 1080, y: 560, label: "Dadi", kind: "npc" },
        { id: "crowd", x: 1380, y: 560, label: "The crowd", kind: "word", wordId: "baazaar" },
        { id: "next", x: 1530, y: 580, label: "Further in", kind: "exit", to: "dukaan" },
      ],
    },
    dukaan: {
      id: "dukaan",
      name: "Deeper in",
      native: "दुकानें",
      art: <Bazaar deeper />,
      spawn: { left: 240, right: 1200 },
      hotspots: [
        { id: "back", x: 70, y: 580, label: "Back", kind: "exit", to: "gali" },
        { id: "kurtas", x: 560, y: 520, label: "Chikan shop", kind: "npc" },
        { id: "paan", x: 1075, y: 600, label: "Paan shop", kind: "flavor", note: "A paan shop: betel leaves folded around fennel, rose petals and sugar. Dadi says you're too young. Dadi says that about everything interesting." },
        { id: "dadi", x: 1300, y: 560, label: "Dadi", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "दूसरा अध्याय · Hindi",
      title: "The",
      em: "Bazaar",
      text: "March. You've flown to Lucknow with Papa for Holi, and Dadi — home again in her own city — walks faster than you've ever seen her walk.",
    },
    introLines: [
      { who: "dadi", text: "{{चलो, बाज़ार!}} Stay close to me in Aminabad.", gloss: "chalo, baazaar — come on, to the bazaar!" },
      { who: "guide", text: "Quest: help Dadi with her shopping.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "list",
        quest: { v: "Ask Dadi what she needs", hint: "She's in the middle of the lane." },
        at: { room: "gali", hotspot: "dadi" },
        encounter: ["baazaar"],
        lines: [
          { who: "dadi", text: "We need {{आलू}}, {{प्याज़}}, {{टमाटर}} and {{नींबू}}.", gloss: "aaloo, pyaaz, tamaatar, neemboo — potatoes, onions, tomatoes and lemons." },
          { who: "dadi", text: "Ramesh has had that cart since your Papa was in school. Go — tell him whose grandchild you are.", gloss: "The cart on the left." },
        ],
        culture: ["aminabad"],
      },
      {
        id: "pick",
        quest: { v: "Buy vegetables from Ramesh bhaiya", hint: "The cart on the left." },
        at: { room: "gali", hotspot: "ramesh" },
        lines: [{ who: "ramesh", text: "{{अरे!}} Dadi-ji's grandchild, all the way from America! Hold the bag.", gloss: "are! — hey!" }],
        game: {
          type: "fetch",
          npc: "ramesh",
          kicker: "Mini-game · बाज़ार",
          title: "Put what he names in the bag.",
          hint: "Nothing on the cart is labelled. Listen.",
          asks: [
            { wordId: "aaloo", native: "पहले आलू।", roman: "pehle aaloo.", english: "Potatoes first." },
            { wordId: "pyaaz", native: "अब प्याज़।", roman: "ab pyaaz.", english: "Now the onions." },
            { wordId: "neemboo", native: "नींबू भी।", roman: "neemboo bhi.", english: "Lemons too." },
            { wordId: "tamaatar", native: "और टमाटर!", roman: "aur tamaatar!", english: "And tomatoes!" },
          ],
          items: [
            { wordId: "aaloo", label: "Brown", art: <Item kind="round" color="#c9a060" /> },
            { wordId: "pyaaz", label: "Pink", art: <Item kind="round" color="#b8566a" /> },
            { wordId: "tamaatar", label: "Red", art: <Item kind="round" color="#c0392b" /> },
            { wordId: "neemboo", label: "Small", art: <Item kind="round" color="#d8e24a" /> },
          ],
          done: { native: "शाबाश!", roman: "shaabaash!", english: "Well done!" },
        },
        after: [{ who: "ramesh", text: "Now pay me — in {{रुपये}}. I'll say how many.", gloss: "rupaye — rupees." }],
        nudges: { "gali:dadi": [{ who: "dadi", text: "Ramesh — the cart. {{जाओ।}}", gloss: "jaao — go." }] },
      },
      {
        id: "pay",
        quest: { v: "Pay Ramesh bhaiya", hint: "Count out the rupees he asks for." },
        at: { room: "gali", hotspot: "ramesh" },
        encounter: ["rupaye"],
        lines: [{ who: "ramesh", text: "One thing at a time. Count it into my hand.", gloss: "The coins say ₹ — rupees." }],
        game: {
          type: "count",
          npc: "ramesh",
          kicker: "Mini-game · गिनती",
          title: "Count out what he asks for.",
          hint: "Tap coins to count them out, then hand them over.",
          unit: "rupees",
          coin: rupee,
          rounds: [
            { native: "नींबू — दो रुपये।", roman: "neemboo — do rupaye.", english: "Lemons: two rupees.", answer: 2, wordId: "do" },
            { native: "टमाटर — तीन रुपये।", roman: "tamaatar — teen rupaye.", english: "Tomatoes: three rupees.", answer: 3, wordId: "teen" },
            { native: "प्याज़ — पाँच रुपये।", roman: "pyaaz — paanch rupaye.", english: "Onions: five rupees.", answer: 5, wordId: "paanch" },
            { native: "आलू — दस रुपये।", roman: "aaloo — das rupaye.", english: "Potatoes: ten rupees.", answer: 10, wordId: "das" },
          ],
          done: { native: "बिल्कुल सही!", roman: "bilkul sahi!", english: "Exactly right!" },
        },
        after: [{ who: "dadi", text: "Good. Now — {{गोलगप्पे}}. Nobody comes to Aminabad without eating golgappe.", gloss: "The stall in the middle." }],
        memory: "paid",
      },
      {
        id: "chaat",
        quest: { v: "Eat golgappe with Dadi", hint: "The stall in the middle of the lane." },
        at: { room: "gali", hotspot: "chaat" },
        encounter: ["golgappe"],
        lines: [
          { who: "guide", text: "The man cracks a hollow puri with his thumb, fills it with potato and tangy green water, and hands it to you. One bite. The whole thing, at once.", gloss: "Dadi is watching your face." },
          { who: "dadi", text: "{{तीखा?}} Good. Now you're from Lucknow.", gloss: "teekha? — spicy?" },
          { who: "dadi", text: "Last thing: a {{चिकन}} kurta for your Maa. Further in. Let me do the talking.", gloss: "Chikan — Lucknow's white embroidery." },
        ],
        culture: ["golgappe"],
        nudges: { "gali:dadi": [{ who: "dadi", text: "Golgappe first. Then the shop." }] },
      },
      {
        id: "haggle",
        quest: { v: "Buy a kurta with Dadi", hint: "Further into the bazaar." },
        at: { room: "dukaan", hotspot: "kurtas" },
        encounter: ["kitne", "mahanga"],
        lines: [
          { who: "dadi", text: "{{यह कितने का है?}}", gloss: "yeh kitne ka hai? — how much is this?" },
          { who: "hafiz", text: "For you, Behenji? Twelve hundred. All hand-stitched.", gloss: "Hafiz sahab, whose family has sold chikan here for three generations." },
          { who: "dadi", text: "{{बहुत महँगा!}} Hafiz, I bought my wedding dupatta from your father.", gloss: "bahut mahanga — too expensive!" },
          { who: "hafiz", text: "…Nine hundred. And my father sends his salaam.", gloss: "Dadi wins. Dadi always wins." },
        ],
        culture: ["chikan", "molbhav"],
        memory: "haggle",
        nudges: {
          "dukaan:dadi": [{ who: "dadi", text: "The kurta first. {{आओ।}}", gloss: "aao — come." }],
          "gali:dadi": [{ who: "dadi", text: "Further in! The chikan shop." }],
        },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Hafiz sahab", hint: "He's asking if you need anything else." },
      lines: [{ who: "hafiz", text: "He folds the kurta into tissue paper, then leans over the counter towards you." }],
      asker: "hafiz",
      question: {
        native: "और कुछ?",
        roman: "aur kuchh?",
        english: "Anything else?",
        choices: [
          { native: "बस, शुक्रिया!", roman: "bas, shukriya!", english: "That's all, thank you!", right: true },
          { native: "दस", roman: "das", english: "ten", reply: [{ who: "hafiz", text: "Ten more kurtas? Your Dadi would never forgive me." }] },
          { native: "कितने का?", roman: "kitne ka?", english: "how much?", reply: [{ who: "hafiz", text: "How much for what? I asked if you need anything else!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{बस, शुक्रिया!}}", gloss: "“That's all, thank you!”" },
        { who: "hafiz", text: "{{वाह!}} Behenji, the child speaks like a Lucknowi!", gloss: "waah! — wonderful!" },
        { who: "guide", text: "…Dadi says “of course” as if she hadn't been practising with you all summer." },
      ],
      encounter: ["shukriya"],
      memory: "shukriya",
    },
    idle: {
      "gali:ramesh": [{ who: "ramesh", text: "Come back tomorrow! The good tomatoes come in early." }],
      "gali:chaat": [{ who: "guide", text: "Your mouth is still on fire. Worth it." }],
      "dukaan:dadi": [{ who: "dadi", text: "Everything's in the bag. Let's get home before the traffic." }],
    },
    afterwards: {
      "dukaan:dadi": [{ who: "dadi", text: "Tomorrow, the kitchen. Your Chachi will teach you rotis. Round ones, if you're lucky." }],
      "dukaan:kurtas": [{ who: "hafiz", text: "Nine hundred. Don't tell anyone." }],
    },
    complete: {
      title: "The",
      em: "Bazaar",
      text: "You filled the bag by ear, counted out rupees in Hindi, survived your first golgappa, watched Dadi bargain — and told Hafiz sahab “bas, shukriya.”",
      quest: { v: "Carry the kurta home", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Bazaar />,
};

export default content;
