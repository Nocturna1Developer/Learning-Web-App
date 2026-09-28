import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, VideoCall, Table, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure, Garland } from "../../components/scenes/primitives";
import { Portrait } from "../kit";
import { Diya, Gujiya } from "./art";

/* HINDI · Chapter Six — परिवार, Family. Home again, and a call to Lucknow with one very loud uncle on it. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const golgappeCard = card(<>{[24, 40, 56].map((x, i) => <circle key={x} cx={x} cy={52 - (i % 2) * 8} r="13" fill="#e8b868" />)}<circle cx="40" cy="44" r="5" fill="#6a4a2a" /></>);
const rotiCard = card(<><circle cx="40" cy="50" r="28" fill="#e8c890" /><circle cx="30" cy="42" r="4" fill="#b8864a" /><circle cx="50" cy="58" r="3" fill="#b8864a" /><circle cx="46" cy="38" r="2.5" fill="#b8864a" /></>);
const holiCard = card(<>{["#e0304a", "#2fa84a", "#f0c828", "#2a6ae0"].map((c, i) => <circle key={c} cx={24 + (i % 2) * 32} cy={34 + Math.floor(i / 2) * 32} r="16" fill={c} opacity="0.85" />)}</>);
const khichdiCard = card(<><path d="M40 10v30" stroke="#6b4a1e" strokeWidth="2" /><path d="M24 40h32l-4 24h-24Z" fill="#8a4a2e" /><path d="M30 86q10 -18 20 0" fill="#f0a830" /></>);

function Baithak({ done }: { done: ReadonlySet<string> }) {
  return (
    <Stage>
      <Walls tint="#f2e3cc" shade="#dfcaa8" />
      <Door x={40} />
      <Window x={330} y={210} w={280} h={220} />
      <PhotoFrame x={690} y={240} w={130} h={110} tint="#7a6a5a" two />
      <Garland x1={684} x2={826} y={344} sag={12} count={10} />
      <Table x={560} w={460} />
      <VideoCall x={650} y={FY - 150 - 190} w={300} faces={done.has("call") ? 6 : 2} bgs={["#e07a2f", "#1f4d33", "#d8a0a8", "#2a6ae0"]} />
      <Diya x={1060} y={FY - 150} s={0.9} />
      <rect x={1100} y={FY - 140} width="360" height="140" rx="12" fill="#c9962f" />
      <rect x={1100} y={FY - 200} width="360" height="74" rx="14" fill="#d9a441" />
      <Figure x={1250} y={FY - 20} h={190} color="#2a1a12" pose="sit" />
      <Figure x={1400} y={FY} h={205} color="#3a2a24" flip />
    </Stage>
  );
}

function Kamra() {
  return (
    <Stage>
      <Walls tint="#ece4d4" />
      <Window x={240} y={220} w={320} h={230} />
      {/* the Holi T-shirt, framed — it will never be white again */}
      <rect x={640} y={250} width="170" height="150" fill="#f4ecdd" stroke="#3a2718" strokeWidth="8" />
      <path d="M680 290h90l16 20l-18 8v60h-86v-60l-18 -8Z" fill="#f4f2ec" />
      {["#e0304a", "#2fa84a", "#2a6ae0", "#f0c828"].map((c, i) => <circle key={c} cx={700 + i * 18} cy={320 + (i % 2) * 20} r="14" fill={c} opacity="0.7" />)}
      {/* the suitcase */}
      <rect x={880} y={FY - 170} width="300" height="170" rx="12" fill="#7a2a3a" />
      <path d={`M880 ${FY - 170} l40 -90 h220 l40 90`} fill="#8a3a4a" />
      <rect x={920} y={FY - 200} width="120" height="30" rx="4" fill="#f4f2ec" />
      <Gujiya x={1100} y={FY - 180} s={0.9} />
      <rect x={60} y={FY - 150} width="420" height="150" fill="#8c6240" />
      <rect x={60} y={FY - 126} width="420" height="60" fill="#e07a2f" />
      <rect x={1240} y={FY - 420} width="240" height="420" fill={WOOD} />
      {[0, 1, 2, 3].map((r) => <rect key={r} x={1250} y={FY - 400 + r * 100} width="220" height="88" fill="#3a2718" />)}
      <Door x={1500} open />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "kamra",
  speakers: {
    chacha: { name: "Chacha", glyph: "चा", tone: "guest" },
    bua: { name: "Bua", glyph: "बु", tone: "guest" },
    anu: { name: "Anu", glyph: "अ", tone: "guest" },
  },
  rooms: {
    kamra: {
      id: "kamra",
      name: "Your room",
      native: "कमरा",
      art: <Kamra />,
      spawn: { left: 560, right: 1360 },
      hotspots: [
        { id: "window", x: 400, y: 460, label: "Window", kind: "word", wordId: "ghar" },
        { id: "shirt", x: 725, y: 325, label: "Holi T-shirt", kind: "word", wordId: "rang" },
        { id: "suitcase", x: 1030, y: 620, label: "Suitcase", kind: "quest" },
        { id: "baithak", x: 1540, y: 560, label: "Living room", kind: "exit", to: "baithak" },
      ],
    },
    baithak: {
      id: "baithak",
      name: "Living room",
      native: "बैठक",
      art: (done) => <Baithak done={done} />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "back", x: 130, y: 560, label: "Your room", kind: "exit", to: "kamra" },
        { id: "photo", x: 755, y: 295, label: "Dada's photo", kind: "word", wordId: "dada" },
        { id: "laptop", x: 800, y: 520, label: "Video call", kind: "quest" },
        { id: "papa", x: 1250, y: 560, label: "Papa", kind: "word", wordId: "papa" },
        { id: "maa", x: 1400, y: 560, label: "Maa", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "छठा अध्याय · Hindi",
      title: "The",
      em: "Family",
      text: "Home again. The house is quiet without Dadi in it, the jet lag is winning, and there are still pink streaks in your hair from Holi.",
    },
    introLines: [
      { who: "maa", text: "Unpack, then come — Lucknow's calling at eight. Everyone's there. Even Bua, from Delhi.", gloss: "Maa, from the living room." },
      { who: "guide", text: "Quest: bring Lucknow home.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "unpack",
        quest: { v: "Unpack your suitcase", hint: "In your room." },
        at: { room: "kamra", hotspot: "suitcase" },
        encounter: ["saamaan", "yaadein"],
        lines: [
          { who: "guide", text: "Maa's chikan kurta in tissue paper. A tin of Chachi's gujiya, half gone. A T-shirt that will never be white again.", gloss: "All your {{सामान}} — saamaan, your things." },
          { who: "guide", text: "Every one of them full of {{यादें}}.", gloss: "yaadein — memories." },
          { who: "maa", text: "{{फ़ोन आया!}} Come, come!", gloss: "phone aaya — they're calling!" },
        ],
        memory: "keepsakes",
      },
      {
        id: "call",
        quest: { v: "Join the video call", hint: "In the living room." },
        at: { room: "baithak", hotspot: "laptop" },
        lines: [
          { who: "dadi", text: "{name}! {{कैसे हो, बेटा?}}", gloss: "kaise ho, beta? — how are you, child? Dadi, very close to the camera." },
          { who: "chacha", text: "WHERE IS MY FAVOURITE? Nobody told me you were leaving so soon! I was in Delhi one week and I missed everything!", gloss: "Chacha — Papa's younger brother. He doesn't have an indoor voice." },
          { who: "guide", text: "Six faces on one screen. Who's who?", gloss: "Hindi has a different word for every uncle and aunt. Put everyone in their place." },
        ],
        game: {
          type: "place",
          board: "album",
          kicker: "Mini-game · परिवार",
          title: "Who's who on the call?",
          hint: "Pick someone, then the word that fits. Hindi cares which side of the family someone is on.",
          tray: "On the screen",
          done: "Everyone has a word — and the right one.",
          items: [
            { wordId: "chaacha", who: "Papa's younger brother", hint: "Very loud. Missed everything. Will never stop mentioning it.", art: <Portrait />, tint: "#2a6ae0" },
            { wordId: "chaachi", who: "Chacha's wife", hint: "Round rotis. Two hundred gujiya.", art: <Portrait />, tint: "#e07a2f" },
            { wordId: "bua", who: "Papa's sister", hint: "Calling in from Delhi. Laughs at everything Chacha says.", art: <Portrait />, tint: "#d8a0a8" },
            { wordId: "bhaai", who: "The older boy cousin", hint: "Fifteen. Still slightly purple.", art: <Portrait child />, tint: "#1f4d33" },
            { wordId: "behen", who: "The younger girl cousin", hint: "Nine. Tested you on the roof.", art: <Portrait child />, tint: "#e0304a" },
          ],
        },
        after: [{ who: "bua", text: "Now tell us — what did you do in Lucknow? {{हिंदी में!}}", gloss: "hindi mein — in Hindi!" }],
        memory: "call",
        nudges: { "kamra:suitcase": [{ who: "guide", text: "The rest can wait. They're calling." }] },
      },
      {
        id: "retell",
        quest: { v: "Tell them about your trip", hint: "On the call." },
        at: { room: "baithak", hotspot: "laptop" },
        lines: [{ who: "guide", text: "Tell it in order — the way it happened.", gloss: "Everything you did, in Hindi." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · यादें",
          title: "Tell your trip in order.",
          hint: "From the first day to the last night.",
          steps: [
            { native: "बाज़ार के गोलगप्पे", roman: "baazaar ke golgappe", english: "golgappe in the bazaar", wordId: "golgappe", art: golgappeCard },
            { native: "चाची के साथ रोटी", roman: "chaachi ke saath roti", english: "rotis with Chachi", wordId: "roti", art: rotiCard },
            { native: "होली के रंग", roman: "holi ke rang", english: "the colours of Holi", wordId: "rang", art: holiCard },
            { native: "बीरबल की खिचड़ी", roman: "Birbal ki khichdi", english: "Birbal's khichdi", wordId: "khichdi", art: khichdiCard },
          ],
          done: "The whole trip, in Hindi. Chacha is, for once, completely silent. Then he cheers.",
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
        native: "फिर कब मिलेंगे?",
        roman: "phir kab milenge?",
        english: "When will we see each other again?",
        choices: [
          { native: "बहुत जल्दी!", roman: "bahut jaldi!", english: "Very soon!", right: true },
          { native: "बस, शुक्रिया!", roman: "bas, shukriya!", english: "That's all, thanks!", reply: [{ who: "chacha", text: "HA! We're not a shop! Dadi asked when you're coming back!" }] },
          { native: "बहुत चतुर!", roman: "bahut chatur!", english: "Very clever!", reply: [{ who: "anu", text: "Yes, we know, you're very clever. When are you COMING?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{बहुत जल्दी, दादी!}}", gloss: "“Very soon, Dadi!”" },
        { who: "anu", text: "{{तुम्हारी याद आएगी।}}", gloss: "tumhaari yaad aayegi — “I'll miss you.” She says it fast, then ducks out of the frame." },
        { who: "you", text: "{{मुझे भी तुम्हारी याद आएगी!}}", gloss: "“I'll miss you too!”" },
        { who: "dadi", text: "We don't say goodbye in this family. We say {{फिर मिलेंगे}} — we'll meet again.", gloss: "phir milenge." },
        { who: "you", text: "{{फिर मिलेंगे!}}", gloss: "“We'll meet again!”" },
      ],
      encounter: ["jaldi", "yaad", "phirmilenge"],
      memory: "phirmilenge",
    },
    idle: {
      "baithak:maa": [{ who: "maa", text: "Go on — they've been waiting all week for this call." }],
      "kamra:suitcase": [{ who: "guide", text: "Everything's out. The T-shirt goes on the wall." }],
    },
    afterwards: {
      "baithak:maa": [{ who: "maa", text: "The whole call in Hindi. Dadi will be telling the entire mohalla by tomorrow." }],
      "baithak:laptop": [{ who: "guide", text: "The call's over. In Lucknow it's already morning — and Ramesh bhaiya's cart is out." }],
    },
    complete: {
      title: "The",
      em: "Family",
      text: "Keepsakes unpacked, every chacha, chachi and bua named the Hindi way, your whole trip retold — and a goodbye that means “we'll meet again.”",
      quest: { v: "Hang up the Holi T-shirt", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Baithak done={new Set(["call"])} />,
};

export default content;
