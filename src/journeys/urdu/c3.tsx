import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Sky, Ground, Crowd, Coin, Bunting, StringLights, FY } from "../scenes";
import { Figure } from "../../components/scenes/primitives";
import { UR, Haveli, Bangles } from "./art";

/* URDU · Chapter Three — انارکلی. The week before Eid in Anarkali Bazaar: bangles, jalebi, and Dadi's bargaining face. */

const BANGLE = { laal: "#d8303a", hara: "#2f9a4a", sunehra: "#e8b830", neela: "#2a6ad8" };
const bangleCard = (c: string): ReactNode => <svg viewBox="0 0 80 90" aria-hidden="true"><Bangles x={40} y={70} colors={[c, c, c, c, c]} s={1.1} /></svg>;

function Anarkali({ cloth = false }: { cloth?: boolean }) {
  return (
    <Stage>
      <Sky id={cloth ? "ur3b" : "ur3a"} top="#2a2a4a" mid="#6a4a6a" bottom="#e8a070" />
      <Haveli x={-40} w={420} h={520} lit />
      <Haveli x={1240} w={400} h={500} lit tint="#a85848" />
      <Ground color="#8a7a70" line="#6a5a50" kind="stone" />
      <StringLights y={120} sag={50} />
      <Bunting y={200} sag={30} colors={Object.values(BANGLE)} n={30} />
      {cloth ? (
        <>
          {/* bolts of cloth, floor to ceiling */}
          <rect x={360} y={FY - 420} width="620" height="420" fill="#3a2418" />
          {Array.from({ length: 24 }, (_, i) => <rect key={i} x={380 + (i % 8) * 74} y={FY - 400 + Math.floor(i / 8) * 90} width="64" height="80" fill={["#d8303a", "#2f9a4a", "#e8b830", "#2a6ad8", "#e8508a", "#f4f0e6", "#8a3aa8", "#f08a2a"][i % 8]} />)}
          <rect x={380} y={FY - 130} width="580" height="130" fill="#6b4429" />
          <rect x={430} y={FY - 470} width="480" height="44" fill="#1f5a3a" />
          <text x={670} y={FY - 440} textAnchor="middle" fontFamily={UR} fontSize="26" fill="#f4ecdd">چودھری کلاتھ ہاؤس</text>
          <Figure x={1040} y={FY} h={205} color="#2a1a12" flip />
          <Figure x={1180} y={FY} h={195} color="#2a1a12" />
        </>
      ) : (
        <>
          {/* the bangle stall: glittering rods of glass */}
          <rect x={360} y={FY - 300} width="360" height="300" fill="#3a2418" />
          {Array.from({ length: 8 }, (_, i) => <Bangles key={i} x={400 + i * 40} y={FY - 150} colors={Array.from({ length: 12 }, (_, k) => Object.values(BANGLE)[(i + k) % 4])} s={0.6} />)}
          <rect x={360} y={FY - 110} width="360" height="110" fill="#6b4429" />
          <Figure x={760} y={FY} h={190} color="#2a1a12" pose="sit" flip />
          {/* the jalebi stall: a huge wok of oil */}
          <rect x={900} y={FY - 130} width="240" height="130" fill="#8a8078" />
          <ellipse cx={1020} cy={FY - 134} rx="100" ry="16" fill="#2a2a2a" />
          {[960, 1010, 1060].map((x) => <circle key={x} cx={x} cy={FY - 142} r="14" fill="none" stroke="#f0a030" strokeWidth="5" />)}
          <Figure x={1170} y={FY} h={200} color="#2a1a12" flip />
          <Crowd x={1400} n={2} spread={160} seed={101} scale={0.9} />
        </>
      )}
    </Stage>
  );
}

const rupee = <Coin symbol="Rs" />;

const content: ChapterContent = {
  startRoom: "choori",
  speakers: {
    choorewala: { name: "The bangle seller", glyph: "چ", tone: "guest" },
    halwai: { name: "Bashir, the jalebi man", glyph: "ب", tone: "guest" },
    chaudhry: { name: "Chaudhry sahab", glyph: "چ", tone: "guest" },
  },
  rooms: {
    choori: {
      id: "choori",
      name: "Bangle lane",
      native: "انارکلی",
      art: <Anarkali />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "dadi", x: 200, y: 560, label: "Dadi", kind: "npc" },
        { id: "bangles", x: 540, y: 480, label: "Bangle stall", kind: "npc" },
        { id: "wok", x: 1020, y: 560, label: "Jalebi stall", kind: "npc" },
        { id: "crowd", x: 1400, y: 560, label: "The crowd", kind: "word", wordId: "bazaar" },
        { id: "next", x: 1530, y: 600, label: "The cloth shops", kind: "exit", to: "kapra" },
      ],
    },
    kapra: {
      id: "kapra",
      name: "The cloth shop",
      native: "کپڑے کی دکان",
      art: <Anarkali cloth />,
      spawn: { left: 240, right: 1200 },
      hotspots: [
        { id: "back", x: 70, y: 580, label: "Back", kind: "exit", to: "choori" },
        { id: "cloth", x: 670, y: 440, label: "Bolts of cloth", kind: "flavor", note: "Lawn, silk, chiffon — every colour you've ever seen and several you haven't. Chaudhry sahab can throw a bolt so it unrolls perfectly across the counter." },
        { id: "chaudhry", x: 1040, y: 560, label: "Chaudhry sahab", kind: "npc" },
        { id: "dadi", x: 1180, y: 560, label: "Dadi", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "تیسرا باب · Urdu",
      title: "Eid Shopping in",
      em: "Anarkali",
      text: "Three days before Eid, and the whole of Lahore seems to be in Anarkali Bazaar. Lights strung over the lane, music from four shops at once, and Dadi moving through it like a ship.",
    },
    introLines: [
      { who: "dadi", text: "{{میرے ساتھ رہنا!}} If you get lost in Anarkali, you stay lost till Eid.", gloss: "mere saath rehna — stay with me!" },
      { who: "guide", text: "Quest: help Dadi with the Eid shopping.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "list",
        quest: { v: "Ask Dadi what we need", hint: "At the start of the lane." },
        at: { room: "choori", hotspot: "dadi" },
        encounter: ["bazaar"],
        lines: [
          { who: "dadi", text: "Bangles for every girl in the family. Jalebi, because I said so. And cloth for Eid — the good kind.", gloss: "Anarkali — one of the oldest bazaars in all of South Asia." },
          { who: "dadi", text: "First, the bangles. Tell the man what colours — he'll pick the best.", gloss: "The glittering stall." },
        ],
        culture: ["anarkali"],
      },
      {
        id: "bangles",
        quest: { v: "Choose bangles for Eid", hint: "The glittering stall." },
        at: { room: "choori", hotspot: "bangles" },
        encounter: ["choorian"],
        lines: [{ who: "choorewala", text: "{{چوڑیاں}} for Eid? Dadi-ji's grandchild! I'll call the colour, you pick the set.", gloss: "choorian — glass bangles." }],
        game: {
          type: "fetch",
          npc: "choorewala",
          kicker: "Mini-game · چوڑیاں",
          title: "Pick the colour he calls.",
          hint: "The sets aren't labelled. Listen.",
          asks: [
            { wordId: "laal", native: "لال — پھوپھو کے لیے۔", roman: "laal — phuppo ke liye.", english: "Red — for Phuppo." },
            { wordId: "hara", native: "ہرا — عید کا رنگ!", roman: "hara — eid ka rang!", english: "Green — the colour of Eid!" },
            { wordId: "sunehra", native: "سنہرا — دادی کے لیے۔", roman: "sunehra — dadi ke liye.", english: "Gold — for Dadi." },
            { wordId: "neela", native: "اور نیلا!", roman: "aur neela!", english: "And blue!" },
          ],
          items: [
            { wordId: "laal", label: "", art: bangleCard(BANGLE.laal) },
            { wordId: "hara", label: "", art: bangleCard(BANGLE.hara) },
            { wordId: "sunehra", label: "", art: bangleCard(BANGLE.sunehra) },
            { wordId: "neela", label: "", art: bangleCard(BANGLE.neela) },
          ],
          done: { native: "واہ! کیا انتخاب ہے!", roman: "wah! kya intekhab hai!", english: "Wow! What a choice!" },
        },
        after: [{ who: "dadi", text: "Now — jalebi. Bashir has been frying jalebi at that corner for forty years.", gloss: "The stall with the enormous wok." }],
        culture: ["choorian"],
        memory: "bangles",
        nudges: { "choori:dadi": [{ who: "dadi", text: "The bangles first! The glittering stall." }] },
      },
      {
        id: "jalebi",
        quest: { v: "Buy jalebi from Bashir", hint: "The stall with the big wok." },
        at: { room: "choori", hotspot: "wok" },
        encounter: ["jalebi", "rupay"],
        lines: [
          { who: "halwai", text: "Hot {{جلیبی}} — straight from the oil! Pay me in {{روپے}} — count them out.", gloss: "jalebi — spirals of batter, fried and soaked in syrup. rupay — rupees." },
        ],
        game: {
          type: "count",
          npc: "halwai",
          kicker: "Mini-game · روپے",
          title: "Count out what he asks for.",
          hint: "Tap coins to count them out, then hand them over.",
          unit: "rupees",
          coin: rupee,
          rounds: [
            { native: "ایک پاؤ — دو روپے۔", roman: "ek pao — do rupay.", english: "A quarter-kilo: two rupees.", answer: 2, wordId: "do" },
            { native: "آدھا کلو — تین روپے۔", roman: "aadha kilo — teen rupay.", english: "Half a kilo: three rupees.", answer: 3, wordId: "teen" },
            { native: "سموسے — پانچ روپے۔", roman: "samose — paanch rupay.", english: "Samosas: five rupees.", answer: 5, wordId: "paanch" },
            { native: "پورا کلو — دس روپے!", roman: "poora kilo — das rupay!", english: "A whole kilo: ten rupees!", answer: 10, wordId: "das" },
          ],
          done: { native: "بالکل ٹھیک!", roman: "bilkul theek!", english: "Exactly right!" },
        },
        after: [{ who: "dadi", text: "Eat one — hot, standing up, that's the rule. Then the cloth. Further in. Let me do the talking.", gloss: "The syrup runs down your wrist." }],
        culture: ["jalebi"],
        memory: "paid",
        nudges: { "choori:dadi": [{ who: "dadi", text: "Jalebi next! Bashir's stall." }] },
      },
      {
        id: "haggle",
        quest: { v: "Buy Eid cloth with Dadi", hint: "The cloth shops, further in." },
        at: { room: "kapra", hotspot: "chaudhry" },
        encounter: ["kitne", "mehnga"],
        lines: [
          { who: "dadi", text: "{{یہ کتنے کا ہے؟}}", gloss: "yeh kitne ka hai — how much is this?" },
          { who: "chaudhry", text: "For you, Begum sahiba? Two thousand. Pure silk, from Faisalabad.", gloss: "Chaudhry sahab, who has sold Dadi cloth since her own wedding." },
          { who: "dadi", text: "{{بہت مہنگا!}} Chaudhry, I remember when you were sweeping this shop.", gloss: "bohat mehnga — much too expensive!" },
          { who: "chaudhry", text: "…Fifteen hundred. And a dupatta for the child. Eid Mubarak in advance.", gloss: "Dadi wins. Dadi always wins." },
        ],
        nudges: {
          "kapra:dadi": [{ who: "dadi", text: "The cloth first. {{آؤ۔}}", gloss: "aao — come." }],
          "choori:dadi": [{ who: "dadi", text: "Further in! The cloth shops." }],
        },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Chaudhry sahab", hint: "He's asking if you want anything else." },
      lines: [{ who: "chaudhry", text: "He folds the silk into a paper parcel, ties it with string, and leans over the counter towards you." }],
      asker: "chaudhry",
      question: {
        native: "اور کچھ؟",
        roman: "aur kuchh?",
        english: "Anything else?",
        choices: [
          { native: "بس، شکریہ!", roman: "bas, shukriya!", english: "That's all, thank you!", right: true },
          { native: "بہت مہنگا!", roman: "bohat mehnga!", english: "Too expensive!", reply: [{ who: "chaudhry", text: "Ha! One Dadi is enough, thank you. Anything else?" }] },
          { native: "ضرور!", roman: "zaroor!", english: "Definitely!", reply: [{ who: "chaudhry", text: "Definitely… what? Another bolt? Anything else?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{بس، شکریہ!}}", gloss: "“That's all, thank you!”" },
        { who: "chaudhry", text: "{{ماشاءاللہ!}} Begum sahiba, the child speaks proper Lahori Urdu!", gloss: "mashallah — how wonderful!" },
        { who: "guide", text: "…Dadi says “of course” as if she hadn't been practising with you every night on the roof." },
      ],
      encounter: ["shukriya"],
      memory: "shukriya",
    },
    idle: {
      "choori:bangles": [{ who: "choorewala", text: "Come back on chaand raat! Everyone comes for bangles on chaand raat." }],
      "choori:wok": [{ who: "halwai", text: "One more? No? …One more." }],
      "kapra:dadi": [{ who: "dadi", text: "Everything's in the bag. Home — before the crowds get worse. They'll get worse." }],
    },
    afterwards: {
      "kapra:dadi": [{ who: "dadi", text: "In three days, if the moon is seen — Eid. Tonight, pray for clear skies." }],
      "kapra:chaudhry": [{ who: "chaudhry", text: "Fifteen hundred. Tell nobody." }],
    },
    complete: {
      title: "Eid Shopping in",
      em: "Anarkali",
      text: "You chose Eid bangles by colour, counted out rupees for hot jalebi, watched Dadi bargain for silk — and told Chaudhry sahab “bas, shukriya.”",
      quest: { v: "Eat the last jalebi", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Anarkali />,
};

export default content;
