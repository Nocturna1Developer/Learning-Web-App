import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, VideoCall, Table, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure } from "../../components/scenes/primitives";
import { Portrait } from "../kit";
import { UR, Pigeon, Bangles, Crow, Ghara } from "./art";

/* URDU · Chapter Six — خاندان. Home again, a wedding invitation in the post, and a call to Lahore. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const pigeonCard = card(<><rect width="80" height="90" fill="#f0c090" /><Pigeon x={40} y={50} s={1.4} flying /></>);
const bangleCard = card(<Bangles x={40} y={72} colors={["#d8303a", "#2f9a4a", "#e8b830", "#2a6ad8", "#d8303a"]} s={1.1} />);
const eidCard = card(<><rect width="80" height="90" fill="#1a1a3a" /><path d="M30 40a14 14 0 1 0 12 -20a11 11 0 1 1 -12 20Z" fill="#f8f0d0" /><path d="M20 80h40v-14q-20 -18 -40 0Z" fill="#f4f0e6" /></>);
const crowCard = card(<><Ghara x={40} y={86} s={0.5} level={1} /><Crow x={40} y={26} s={0.8} /></>);

function Baithak({ done }: { done: ReadonlySet<string> }) {
  return (
    <Stage>
      <Walls />
      <Door x={40} />
      <Window x={330} y={210} w={280} h={220} />
      <PhotoFrame x={690} y={240} w={140} h={110} tint="#1f5a3a" two />
      {/* the wedding card, propped on the shelf */}
      <rect x={880} y={330} width="160" height="10" fill={WOOD} />
      <rect x={920} y={250} width="80" height="80" fill="#b8452f" />
      <rect x={928} y={258} width="64" height="64" fill="none" stroke="#e8b830" strokeWidth="3" />
      <text x={960} y={300} textAnchor="middle" fontFamily={UR} fontSize="18" fill="#e8b830">شادی</text>
      <Table x={560} w={460} />
      <VideoCall x={650} y={FY - 150 - 190} w={300} faces={done.has("call") ? 6 : 2} bgs={["#1f5a3a", "#b8452f", "#e8b830", "#2a6ad8"]} />
      <rect x={1100} y={FY - 140} width="360" height="140" rx="12" fill="#5a3a4a" />
      <rect x={1100} y={FY - 200} width="360" height="74" rx="14" fill="#6a4a5a" />
      <Figure x={1250} y={FY - 20} h={190} color="#2a1a12" pose="sit" />
      <Figure x={1400} y={FY} h={205} color="#3a2a24" flip />
    </Stage>
  );
}

function Kamra() {
  return (
    <Stage>
      <Walls tint="#e6e2d4" />
      <Window x={240} y={220} w={320} h={230} />
      <rect x={640} y={330} width="200" height="12" fill={WOOD} />
      <Bangles x={700} y={326} colors={["#d8303a", "#2f9a4a", "#e8b830", "#2a6ad8", "#d8303a", "#2f9a4a"]} s={0.9} />
      <Ghara x={790} y={330} s={0.4} />
      <rect x={880} y={FY - 170} width="300" height="170" rx="12" fill="#1f5a3a" />
      <path d={`M880 ${FY - 170} l40 -90 h220 l40 90`} fill="#2a6a4a" />
      <rect x={930} y={FY - 200} width="90" height="30" fill="#e8b830" />
      <rect x={60} y={FY - 150} width="420" height="150" fill="#8c6240" />
      <rect x={60} y={FY - 126} width="420" height="60" fill="#1f5a3a" />
      <rect x={1240} y={FY - 420} width="240" height="420" fill={WOOD} />
      {[0, 1, 2, 3].map((r) => <rect key={r} x={1250} y={FY - 400 + r * 100} width="220" height="88" fill="#3a2718" />)}
      <Door x={1500} open />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "kamra",
  speakers: {
    chacha: { name: "Chacha", glyph: "چ", tone: "guest" },
    phuppo: { name: "Phuppo", glyph: "پ", tone: "guest" },
    zara: { name: "Zara", glyph: "ز", tone: "guest" },
  },
  rooms: {
    kamra: {
      id: "kamra",
      name: "Your room",
      native: "کمرہ",
      art: <Kamra />,
      spawn: { left: 560, right: 1360 },
      hotspots: [
        { id: "window", x: 400, y: 460, label: "Window", kind: "word", wordId: "ghar" },
        { id: "bangles", x: 700, y: 300, label: "Glass bangles", kind: "word", wordId: "choorian" },
        { id: "suitcase", x: 1030, y: 620, label: "Suitcase", kind: "quest" },
        { id: "baithak", x: 1540, y: 560, label: "Living room", kind: "exit", to: "baithak" },
      ],
    },
    baithak: {
      id: "baithak",
      name: "Living room",
      native: "بیٹھک",
      art: (done) => <Baithak done={done} />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "back", x: 130, y: 560, label: "Your room", kind: "exit", to: "kamra" },
        { id: "photo", x: 760, y: 295, label: "New photo", kind: "word", wordId: "khandan" },
        { id: "card", x: 960, y: 290, label: "Wedding card", kind: "word", wordId: "shaadi" },
        { id: "laptop", x: 800, y: 520, label: "Video call", kind: "quest" },
        { id: "ammi", x: 1250, y: 560, label: "Ammi", kind: "npc" },
        { id: "abbu", x: 1400, y: 560, label: "Abbu", kind: "word", wordId: "abbu" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "چھٹا باب · Urdu",
      title: "The",
      em: "Family",
      text: "Home again. The house is quiet, the jet lag is winning — and this morning, a thick red envelope arrived from Lahore, covered in gold.",
    },
    introLines: [
      { who: "ammi", text: "Unpack, then come — Lahore's calling. And open that envelope! It's for all of us.", gloss: "Ammi, from the living room." },
      { who: "guide", text: "Quest: bring Lahore home.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "unpack",
        quest: { v: "Unpack your suitcase", hint: "In your room." },
        at: { room: "kamra", hotspot: "suitcase" },
        encounter: ["yaadgaar"],
        lines: [
          { who: "guide", text: "Green and red glass bangles, wrapped in a dupatta. A box of Bashir's jalebi, now one solid block. A tiny clay ghara Dada bought you in the lane.", gloss: "Every one of them a {{یادگار}} — yaadgaar, a keepsake." },
          { who: "ammi", text: "{{فون آیا!}} Come, come — and bring the envelope!", gloss: "phone aaya — they're calling!" },
        ],
        memory: "keepsakes",
      },
      {
        id: "call",
        quest: { v: "Join the video call", hint: "In the living room." },
        at: { room: "baithak", hotspot: "laptop" },
        encounter: ["shaadi"],
        lines: [
          { who: "dadi", text: "{name}! {{السلام علیکم، میری جان!}} Did the card come? Zara's {{شادی}}— no, not Zara, she's eleven — Zara's big brother Hamza's wedding! December!", gloss: "shaadi — wedding. Dadi, very excited, on the screen." },
          { who: "chacha", text: "Let me see them! Move, Amma, you're blocking the whole camera!", gloss: "Chacha — Abbu's younger brother. Zara and Hamza's father." },
          { who: "guide", text: "Six faces on one screen. Urdu has a different word for every aunt and uncle — and it depends which side they're on.", gloss: "Put everyone in their place." },
        ],
        game: {
          type: "place",
          board: "album",
          kicker: "Mini-game · خاندان",
          title: "Who's who on the call?",
          hint: "Pick someone, then the word that fits. Is it Abbu's side, or Ammi's?",
          tray: "On the screen",
          done: "Everyone has the right word — and the right side of the family.",
          items: [
            { wordId: "chacha", who: "Abbu's brother", hint: "Zara's father. Blocking the camera.", art: <Portrait />, tint: "#1f5a3a" },
            { wordId: "phuppo", who: "Abbu's sister", hint: "Gave you mehndi on chaand raat.", art: <Portrait />, tint: "#b8452f" },
            { wordId: "mamoon", who: "Ammi's brother", hint: "Calling from Karachi. Very loud laugh.", art: <Portrait />, tint: "#2a6ad8" },
            { wordId: "khala", who: "Ammi's sister", hint: "Sent the silk for your Eid clothes.", art: <Portrait />, tint: "#e8b830" },
          ],
        },
        after: [{ who: "phuppo", text: "Now tell us everything. {{اردو میں!}}", gloss: "urdu mein — in Urdu!" }],
        culture: ["rishte"],
        memory: "call",
        nudges: { "kamra:suitcase": [{ who: "guide", text: "The rest can wait. They're calling." }] },
      },
      {
        id: "retell",
        quest: { v: "Tell them about your summer", hint: "On the call." },
        at: { room: "baithak", hotspot: "laptop" },
        lines: [{ who: "guide", text: "Tell it in order — the way it happened.", gloss: "Everything you did, in Urdu." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · یادیں",
          title: "Tell your summer in order.",
          hint: "From the first sunset to the hottest afternoon.",
          steps: [
            { native: "دادا کے کبوتر", roman: "dada ke kabootar", english: "Dada's pigeons", wordId: "kabootar", art: pigeonCard },
            { native: "انارکلی کی چوڑیاں", roman: "anarkali ki choorian", english: "bangles from Anarkali", wordId: "choorian", art: bangleCard },
            { native: "عید کا چاند", roman: "eid ka chaand", english: "the Eid moon", wordId: "chaand", art: eidCard },
            { native: "پیاسا کوا", roman: "pyasa kawwa", english: "the thirsty crow", wordId: "kawwa", art: crowCard },
          ],
          done: "The whole summer, in Urdu. Dada, somewhere off-screen, is telling everyone about the pigeons again.",
        },
        memory: "retold",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Dadi", hint: "She has one more question." },
      lines: [{ who: "dadi", text: "Everyone goes quiet. Dadi leans towards the screen." }],
      asker: "dadi",
      question: {
        native: "پھر کب ملاقات ہوگی؟",
        roman: "phir kab mulaqat hogi?",
        english: "When will we meet again?",
        choices: [
          { native: "بہت جلد، ان شاء اللہ!", roman: "bohat jald, inshallah!", english: "Very soon, God willing!", right: true },
          { native: "بہت ہوشیار!", roman: "bohat hoshiyar!", english: "Very clever!", reply: [{ who: "zara", text: "Yes, the crow was clever. When are you COMING?" }] },
          { native: "بس، شکریہ!", roman: "bas, shukriya!", english: "That's all, thanks!", reply: [{ who: "chacha", text: "Ha! We're not Chaudhry's cloth shop! When are you coming?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{بہت جلد، ان شاء اللہ! شادی پر!}}", gloss: "“Very soon, God willing! At the wedding!”" },
        { who: "zara", text: "{{تمہاری یاد آئے گی۔}}", gloss: "tumhari yaad aaye gi — “I'll miss you.” She says it fast, then hides behind Chacha." },
        { who: "you", text: "{{مجھے بھی آپ سب کی یاد آئے گی!}}", gloss: "“I'll miss all of you too!”" },
        { who: "dadi", text: "Then we don't say goodbye. We say {{اللہ حافظ}} — God keep you — until December.", gloss: "Allah hafiz." },
        { who: "you", text: "{{اللہ حافظ!}}", gloss: "“God keep you!”" },
      ],
      encounter: ["jald", "yaad", "allahhafiz"],
      memory: "allahhafiz",
    },
    idle: {
      "baithak:ammi": [{ who: "ammi", text: "Go on — Dadi's been sitting in front of that screen since Fajr." }],
      "kamra:suitcase": [{ who: "guide", text: "Everything's out. The bangles go on the shelf, next to the little ghara." }],
    },
    afterwards: {
      "baithak:ammi": [{ who: "ammi", text: "The whole call in Urdu. Dadi is going to tell the entire mohalla — twice." }],
      "baithak:laptop": [{ who: "guide", text: "The call's over. In Lahore, it's sunset, and forty pigeons are coming home." }],
    },
    complete: {
      title: "The",
      em: "Family",
      text: "Keepsakes unpacked, chacha, phuppo, mamoon and khala all on the right side of the family, your whole summer retold in Urdu — and a wedding in December to come back for.",
      quest: { v: "Put the wedding card on the shelf", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Baithak done={new Set(["call"])} />,
};

export default content;
