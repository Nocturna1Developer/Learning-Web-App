import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, VideoCall, Table, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure } from "../../components/scenes/primitives";
import { Portrait } from "../kit";
import { Tatreez, Rakweh, Maamoul, Mould, OliveTree } from "./art";

/* ARABIC · Chapter Six — العيلة, The Family. Home again, and a call to a village where everyone talks at once. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const kaakCard = card(<><ellipse cx="40" cy="50" rx="26" ry="20" fill="none" stroke="#c8883e" strokeWidth="11" />{Array.from({ length: 10 }, (_, i) => <circle key={i} cx={40 + Math.cos(i * 0.63) * 26} cy={50 + Math.sin(i * 0.63) * 20} r="1.6" fill="#f4ecdd" />)}</>);
const maamoulCard = card(<><Maamoul x={26} y={70} s={0.8} shape="dome" /><Maamoul x={54} y={70} s={0.8} shape="oval" /></>);
const oliveCard = card(<g transform="translate(40 88) scale(0.26)"><OliveTree x={0} y={0} h={300} /></g>);
const storyCard = card(<><rect width="80" height="90" fill="#141a36" /><circle cx="60" cy="18" r="8" fill="#f4ecdd" /><rect x="10" y="66" width="60" height="10" fill="#2a4a6a" />{[20, 40, 60].map((x) => <ellipse key={x} cx={x} cy={66} rx="7" ry="3" fill="#6a6a6a" />)}<rect x="37" y="52" width="6" height="12" fill="#0a0810" /><circle cx="40" cy="49" r="3.5" fill="#0a0810" /></>);

function Salon({ done }: { done: ReadonlySet<string> }) {
  return (
    <Stage>
      <Walls tint="#efe4d0" />
      <Door x={40} />
      <Window x={330} y={210} w={280} h={220} />
      <PhotoFrame x={690} y={240} w={140} h={110} tint="#c8704a" two />
      <Tatreez x={860} y={250} w={140} h={80} />
      <Table x={560} w={460} />
      <VideoCall x={650} y={FY - 150 - 190} w={300} faces={done.has("call") ? 6 : 2} bgs={["#3f7d55", "#c8704a", "#2d4a78", "#b8252f"]} />
      <Rakweh x={1030} y={FY - 150} s={0.8} />
      <rect x={1100} y={FY - 140} width="360" height="140" rx="12" fill="#4a6a5a" />
      <rect x={1100} y={FY - 200} width="360" height="74" rx="14" fill="#5a7a6a" />
      <Figure x={1250} y={FY - 20} h={190} color="#2a1a12" pose="sit" />
      <Figure x={1400} y={FY} h={205} color="#3a2a24" flip />
    </Stage>
  );
}

function Ouda() {
  return (
    <Stage>
      <Walls tint="#e6dfd0" />
      <Window x={240} y={220} w={320} h={230} />
      {/* Teta's old mould, hung on the wall like a picture */}
      <Mould x={740} y={320} s={1.4} />
      {/* the suitcase, and a bottle of the new oil */}
      <rect x={880} y={FY - 170} width="300" height="170" rx="12" fill="#3f6a5a" />
      <path d={`M880 ${FY - 170} l40 -90 h220 l40 90`} fill="#4a7a6a" />
      <path d={`M960 ${FY - 170}v-60h24v60Z`} fill="#8a9a3a" opacity="0.85" />
      <rect x={1030} y={FY - 200} width="90" height="30" rx="6" fill="#6a7a3a" />
      <rect x={60} y={FY - 150} width="420" height="150" fill="#8c6240" />
      <rect x={60} y={FY - 126} width="420" height="60" fill="#3f7d55" />
      <rect x={1240} y={FY - 420} width="240" height="420" fill={WOOD} />
      {[0, 1, 2, 3].map((r) => <rect key={r} x={1250} y={FY - 400 + r * 100} width="220" height="88" fill="#3a2718" />)}
      <Door x={1500} open />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "ouda",
  speakers: {
    ammo: { name: "‘Ammo Walid", glyph: "و", tone: "guest" },
    karim: { name: "Karim", glyph: "ك", tone: "guest" },
    lina: { name: "Lina", glyph: "ل", tone: "guest" },
  },
  rooms: {
    ouda: {
      id: "ouda",
      name: "Your room",
      native: "أوضتك",
      art: <Ouda />,
      spawn: { left: 560, right: 1360 },
      hotspots: [
        { id: "window", x: 400, y: 460, label: "Window", kind: "word", wordId: "bayt" },
        { id: "mould", x: 760, y: 320, label: "Ma‘mūl mould", kind: "word", wordId: "alab" },
        { id: "suitcase", x: 1030, y: 620, label: "Suitcase", kind: "quest" },
        { id: "salon", x: 1540, y: 560, label: "Living room", kind: "exit", to: "salon" },
      ],
    },
    salon: {
      id: "salon",
      name: "Living room",
      native: "الصالون",
      art: (done) => <Salon done={done} />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "back", x: 130, y: 560, label: "Your room", kind: "exit", to: "ouda" },
        { id: "photo", x: 760, y: 295, label: "New photo", kind: "word", wordId: "ayle" },
        { id: "laptop", x: 800, y: 520, label: "Video call", kind: "quest" },
        { id: "teta", x: 1250, y: 560, label: "Teta", kind: "npc" },
        { id: "jiddo", x: 1400, y: 560, label: "Jiddo", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "الفصل السادس · Arabic",
      title: "The",
      em: "Family",
      text: "Home again. Sunday lunch at Teta and Jiddo's, back where it all started — except now the village is on a laptop at the end of the table, and it has a lot to say.",
    },
    introLines: [
      { who: "teta", text: "Put your bag down and come — {{الضيعة}} is calling! Everybody is there.", gloss: "The village, from the living room." },
      { who: "guide", text: "Quest: bring the village home.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "unpack",
        quest: { v: "Unpack your suitcase", hint: "In your room." },
        at: { room: "ouda", hotspot: "suitcase" },
        encounter: ["shanta", "tizkar"],
        lines: [
          { who: "guide", text: "A bottle of the new oil, wrapped in three T-shirts. A bag of Abu Fadi's za‘tar. One of Teta's old ma‘mūl moulds — a present.", gloss: "Everything in the {{شنطة}} — shanṭa, the suitcase." },
          { who: "guide", text: "Every one of them a {{تذكار}}.", gloss: "tizkār — a keepsake." },
          { who: "teta", text: "{{يلا!}} They're calling!", gloss: "yalla — come on!" },
        ],
        memory: "keepsakes",
      },
      {
        id: "call",
        quest: { v: "Join the video call", hint: "In the living room." },
        at: { room: "salon", hotspot: "laptop" },
        lines: [
          { who: "ammo", text: "{{مرحبا!}} Can you hear us? KARIM, TURN IT UP! …Hello! It's your ‘Ammo Walid!", gloss: "‘Ammo Walid — your dad's brother — and five more faces behind him." },
          { who: "khalto", text: "Everybody wave! Karim, move your head!", gloss: "Khalto, from the other side of the screen." },
          { who: "guide", text: "Arabic has one word for your dad's brother and another for your mom's. Same for aunts. Who's who?", gloss: "Put everyone in their place." },
        ],
        game: {
          type: "place",
          board: "album",
          kicker: "Mini-game · العيلة",
          title: "Who's who on the call?",
          hint: "Pick someone, then the word that fits. Is it Baba's side, or Mama's?",
          tray: "On the screen",
          done: "Everyone has a word — and the right side of the family.",
          items: [
            { wordId: "ammo", who: "Baba's brother", hint: "Walid. Shouts at the laptop. Karim's dad.", art: <Portrait />, tint: "#3f7d55" },
            { wordId: "ammto", who: "Baba's sister", hint: "Nadia. Sends voice notes that are six minutes long.", art: <Portrait />, tint: "#b8252f" },
            { wordId: "khalo", who: "Mama's brother", hint: "Sami. Makes the best za‘tar man’ūshe in the village.", art: <Portrait />, tint: "#2d4a78" },
            { wordId: "khalto", who: "Mama's sister", hint: "Rana. Helped with the ma‘mūl fillings.", art: <Portrait />, tint: "#c8704a" },
          ],
        },
        after: [{ who: "khalto", text: "Now tell us — what did you do this year? {{بالعربي!}}", gloss: "bil-‘arabi — in Arabic!" }],
        memory: "call",
        nudges: { "ouda:suitcase": [{ who: "guide", text: "The rest can wait. They're calling." }] },
      },
      {
        id: "retell",
        quest: { v: "Tell them about your year", hint: "On the call." },
        at: { room: "salon", hotspot: "laptop" },
        lines: [{ who: "guide", text: "Tell it in order — the way it happened.", gloss: "Everything you did, in Arabic." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · ذكريات",
          title: "Tell your year in order.",
          hint: "From the first morning in the souk to the last story.",
          steps: [
            { native: "الكعك بالسوق", roman: "al-ka‘ak bis-sū’", english: "ka‘ak in the souk", wordId: "kaak", art: kaakCard },
            { native: "المعمول مع تيتا", roman: "al-ma‘mūl ma‘ teta", english: "ma‘mūl with Teta", wordId: "maamoul", art: maamoulCard },
            { native: "الزيتون بالضيعة", roman: "az-zaytoon bid-ḍay‘a", english: "olives in the village", wordId: "zaytoon", art: oliveCard },
            { native: "حكاية نص نصيص", roman: "ḥkēyet nuṣ nṣēṣ", english: "the story of Nus Nsays", wordId: "hkeye", art: storyCard },
          ],
          done: "The whole year, in Arabic. For about three seconds, the whole village is completely silent. Then everyone talks at once.",
        },
        memory: "retold",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Lina", hint: "She's pushed everybody out of the way." },
      lines: [{ who: "lina", text: "Lina climbs onto ‘Ammo Walid's shoulders so her face fills the whole screen." }],
      asker: "lina",
      question: {
        native: "إيمتى راجعين؟",
        roman: "ēmta rāj‘īn?",
        english: "When are you all coming back?",
        choices: [
          { native: "قريب، إن شاء الله!", roman: "’arīb, inshalla!", english: "Soon, God willing!", right: true },
          { native: "بس هيك، شكراً.", roman: "bass hēk, shukran.", english: "That's all, thanks.", reply: [{ who: "ammo", text: "Ha! We're not Abu Fadi's shop! She asked when you're coming back!" }] },
          { native: "وإنتو بخير.", roman: "w intu bkhēr.", english: "And you too.", reply: [{ who: "karim", text: "It's not a feast day! When are you COMING?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{قريب، إن شاء الله!}}", gloss: "“Soon, God willing!”" },
        { who: "lina", text: "{{اشتقتلكن!}}", gloss: "ishta’tilkon — “I miss you all!” She says it fast and hides behind ‘Ammo Walid's head." },
        { who: "you", text: "{{وأنا كمان اشتقتلكن!}}", gloss: "“I miss you all too!”" },
        { who: "teta", text: "We don't say goodbye like strangers. We say {{مع السلامة}} — go with safety.", gloss: "ma‘ as-salāme." },
        { who: "you", text: "{{مع السلامة!}}", gloss: "“Goodbye — go safely!”" },
      ],
      encounter: ["arib", "ishtaet", "maasalame"],
      memory: "salame",
    },
    idle: {
      "salon:teta": [{ who: "teta", text: "Go on — the whole village has been waiting all week." }],
      "salon:jiddo": [{ who: "jiddo", text: "Tell them about the dabke. Tell them I was the best dancer." }],
      "ouda:suitcase": [{ who: "guide", text: "Everything's out. The mould goes on the wall." }],
    },
    afterwards: {
      "salon:teta": [{ who: "teta", text: "The whole call in Arabic. {{الله يخليلي ياك.}}", gloss: "alla ykhallīli yēk — may God keep you for me." }],
      "salon:jiddo": [{ who: "jiddo", text: "Next October, you're on the ladder. I'll hold it." }],
      "salon:laptop": [{ who: "guide", text: "The call's over. There's a new photo on the table: the whole family in the olive grove, and you in the middle." }],
    },
    complete: {
      title: "The",
      em: "Family",
      text: "Keepsakes unpacked, every ‘ammo and khālto on the right side of the family, your whole year retold in Arabic — and a goodbye that means “go safely, and come back.”",
      quest: { v: "Hang the mould on the wall", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Salon done={new Set(["call"])} />,
};

export default content;
