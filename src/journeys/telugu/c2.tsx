import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Hills, Ground, RoundTree, Well, Cow, Clouds, FY } from "../scenes";
import { Figure, Child, Palm } from "../../components/scenes/primitives";
import { T, VillageHouse, GateMuggu, TulasiKota, PaddyField, BullockCart, BrassPots } from "./art";

/* TELUGU · Chapter Two — The Village. Summer in Ammamma's village near Guntur. */

const arrow = (rot: number) => (
  <svg viewBox="0 0 80 90" aria-hidden="true">
    <circle cx="40" cy="46" r="32" fill="#2f5a3e" />
    <path d="M40 24v36M26 38l14-14 14 14" stroke="#f4ecdd" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" transform={`rotate(${rot} 40 46)`} />
  </svg>
);
const bucketDown = (
  <svg viewBox="0 0 80 90" aria-hidden="true"><line x1="40" y1="4" x2="40" y2="50" stroke="#8a6a44" strokeWidth="3" /><path d="M24 50h32l-4 30H28Z" fill="#b87333" /><path d="M40 60v22M32 74l8 8 8-8" stroke="#f4ecdd" strokeWidth="3" fill="none" /></svg>
);
const ropePull = (
  <svg viewBox="0 0 80 90" aria-hidden="true"><path d="M20 80 Q40 40 30 6" stroke="#8a6a44" strokeWidth="5" fill="none" /><circle cx="44" cy="44" r="12" fill="#2a1a12" /><path d="M40 30v-18M32 18l8-8 8 8" stroke="#d9a441" strokeWidth="4" fill="none" /></svg>
);
const pour = (
  <svg viewBox="0 0 80 90" aria-hidden="true"><path d="M18 30h26l-4 22H22Z" fill="#b87333" transform="rotate(30 30 40)" /><path d="M48 46q4 10 2 22" stroke="#8fbfd8" strokeWidth="5" fill="none" /><path d="M30 86q-10-30 10-40h20q20 10 10 40Z" fill="#c99a3e" /></svg>
);
const liftPot = (
  <svg viewBox="0 0 80 90" aria-hidden="true"><path d="M22 60q-10-26 8-38h20q18 12 8 38Z" fill="#c99a3e" /><path d="M16 70h48" stroke="#8a6520" strokeWidth="5" /><path d="M40 14V2M32 8l8-8 8 8" stroke="#d9a441" strokeWidth="4" fill="none" /></svg>
);

/* ---------------- rooms ---------------- */

function Vaakili() {
  return (
    <Stage>
      <Sky id="t2a" top="#8fc0e0" mid="#cfe0e6" bottom="#f2e2c0" />
      <Sun x={1380} y={150} r={50} />
      <Clouds seed={4} />
      <Hills y={560} color="#9ab47a" amp={50} seed={3} opacity={0.7} />
      <Palm x={120} y={FY - 40} h={380} lean={30} color="#2f5a3e" />
      <Ground color={T.earth} line={T.earthLine} />
      <VillageHouse x={380} w={560} />
      <TulasiKota x={1080} />
      <BrassPots x={220} n={2} />
      <GateMuggu x={660} />
      <RoundTree x={1330} h={420} crown="#4f8a4a" dark="#3a6e3a" />
      <Figure x={820} y={FY} h={210} color="#2a1a12" pose="stand" flip />
      {/* a clothesline with a sari drying */}
      <line x1={1180} y1={430} x2={1560} y2={410} stroke="#5a3a22" strokeWidth="2" />
      <path d="M1220 428 h120 v90 q-60 20 -120 0Z" fill="#c0392b" opacity="0.9" />
      <path d="M1220 510 q60 20 120 0 v8 q-60 20 -120 0Z" fill="#d9a441" />
    </Stage>
  );
}

function Veedhi({ done }: { done: ReadonlySet<string> }) {
  return (
    <Stage>
      <Sky id="t2b" top="#8fc0e0" mid="#d8e4e2" bottom="#f2e2c0" />
      <Sun x={260} y={140} r={46} />
      <Hills y={560} color="#9ab47a" amp={40} seed={6} opacity={0.6} />
      <Ground color={T.earth} line={T.earthLine} />
      <VillageHouse x={40} w={320} h={220} wall="#e9d6f0" door="#7a3a8a" />
      <VillageHouse x={1180} w={360} h={230} wall="#dcecd8" door="#b8452f" />
      <Palm x={1120} y={FY - 30} h={340} lean={-24} color="#2f5a3e" />
      <Well x={640} />
      {done.has("water") && <path d={`M${620} ${FY - 50} q-6 -30 8 -40 h24 q14 10 8 40Z`} fill="#c99a3e" />}
      <Cow x={900} s={0.9} />
      <Child x={1040} y={FY} h={116} color="#2a1a12" pose="point" flip />
    </Stage>
  );
}

function Polam() {
  return (
    <Stage>
      <Sky id="t2c" top="#7fb6dc" mid="#d6e6e0" bottom="#f5e6c2" />
      <Sun x={1300} y={170} r={52} />
      <Clouds seed={9} y={120} />
      <Hills y={500} color="#7a9a5a" amp={70} seed={2} opacity={0.8} />
      <PaddyField y={FY - 130} />
      <Ground color={T.earth} line={T.earthLine} y={FY} />
      {[180, 420, 1480].map((x, i) => <Palm key={x} x={x} y={FY - 110} h={300 + i * 30} lean={i % 2 ? -20 : 24} color="#2f5a3e" />)}
      <BullockCart x={560} />
      <Cow x={1010} s={0.8} color="#8a8580" />
      <Figure x={1200} y={FY} h={220} color="#2a1a12" pose="stand" flip />
      {/* Tatayya's towel on his shoulder and a stick */}
      <line x1={1236} y1={FY - 200} x2={1250} y2={FY} stroke="#5a3a22" strokeWidth="6" />
    </Stage>
  );
}

/* ---------------- the chapter ---------------- */

const content: ChapterContent = {
  startRoom: "vaakili",
  speakers: {
    chinni: { name: "Chinni", glyph: "చి", tone: "guest" },
  },
  rooms: {
    vaakili: {
      id: "vaakili",
      name: "Ammamma's house",
      native: "వాకిలి",
      art: <Vaakili />,
      spawn: { left: 240, right: 1400 },
      hotspots: [
        { id: "pots", x: 250, y: 640, label: "Brass pots", kind: "flavor", note: "Brass bindelu, polished till they shine. The water stays cool in them all afternoon." },
        { id: "arugu", x: 470, y: 690, label: "Arugu", kind: "flavor", note: "The arugu — the raised platform in front of the house. Every evening, the whole street ends up sitting on someone's.", culture: "arugu" },
        { id: "muggu", x: 660, y: 800, label: "Muggu", kind: "flavor", note: "Ammamma drew this muggu before sunrise, in rice flour. The ants eat it; that's part of the point.", culture: "muggu" },
        { id: "ammamma", x: 820, y: 560, label: "Ammamma", kind: "npc" },
        { id: "tulasi", x: 1080, y: 560, label: "Tulasi kota", kind: "flavor", note: "The tulasi kota — the tulasi plant grown in its own little shrine in the yard." },
        { id: "vepa", x: 1330, y: 440, label: "Neem tree", kind: "word", wordId: "vepa" },
        { id: "veedhi", x: 1520, y: 580, label: "The lane", kind: "exit", to: "veedhi" },
      ],
    },
    veedhi: {
      id: "veedhi",
      name: "The lane",
      native: "వీధి",
      art: (done) => <Veedhi done={done} />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "vaakili", x: 110, y: 580, label: "Ammamma's house", kind: "exit", to: "vaakili" },
        { id: "ooru", x: 380, y: 560, label: "Neighbours", kind: "word", wordId: "ooru" },
        { id: "well", x: 640, y: 560, label: "Well", kind: "quest" },
        { id: "aavu", x: 900, y: 600, label: "Cow", kind: "word", wordId: "aavu" },
        { id: "chinni", x: 1040, y: 580, label: "Chinni", kind: "npc" },
        { id: "polam", x: 1520, y: 580, label: "Towards the fields", kind: "exit", to: "polam" },
      ],
    },
    polam: {
      id: "polam",
      name: "The fields",
      native: "పొలం",
      art: <Polam />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "veedhi", x: 110, y: 580, label: "Back to the lane", kind: "exit", to: "veedhi" },
        { id: "field", x: 380, y: 620, label: "Paddy", kind: "word", wordId: "polam" },
        { id: "cart", x: 690, y: 620, label: "Bullock cart", kind: "flavor", note: "Tatayya's bullock cart. The wheels were made by the same carpenter who made his father's.", culture: "cart" },
        { id: "tatayya", x: 1200, y: 560, label: "Tatayya", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Chapter Two · Telugu",
      title: "The",
      em: "Village",
      text: "The summer holidays. Two flights, a long car ride from the airport, and then a dirt lane lined with palms — Ammamma's village, near Guntur.",
    },
    introLines: [
      { who: "ammamma", text: "{{వచ్చేశావా!}} {name}!", gloss: "vachchesaavaa! — you've come! Ammamma, at the gate." },
      { who: "guide", text: "In the village, you greet an elder with folded hands.", gloss: "Say hello the village way." },
      { who: "guide", text: "Quest: settle in at Ammamma's.", gloss: "Walk with ← → or A D. Press E near anything that glows. Or just click it." },
    ],
    beats: [
      {
        id: "greet",
        quest: { v: "Greet Ammamma", hint: "She's at the gate." },
        at: { room: "vaakili", hotspot: "ammamma" },
        encounter: ["namaskaram"],
        lines: [
          { who: "you", text: "{{నమస్కారం, అమ్మమ్మా.}}", gloss: "namaskaaram — hello, with folded hands." },
          { who: "ammamma", text: "{{రా రా, లోపలికి రా.}} Look how you've grown!", gloss: "raa raa, lopaliki raa — come, come inside." },
          { who: "ammamma", text: "First — the house needs {{నీళ్ళు}}. Bring some from the {{బావి}}.", gloss: "neellu — water; baavi — the well, in the lane." },
        ],
        culture: ["namaskaram"],
      },
      {
        id: "water",
        quest: { v: "Draw water from the well", hint: "In the lane, past the gate." },
        at: { room: "veedhi", hotspot: "well" },
        encounter: ["baavi"],
        lines: [{ who: "guide", text: "The {{బావి}}. The rope is rough; the water is very cold.", gloss: "baavi — well. Ammamma calls the steps from the gate." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · బావి",
          title: "Draw water the way Ammamma does.",
          hint: "Put the steps in order. The steps are in Telugu — listen to how they sound.",
          steps: [
            { native: "బకెట్ దించు", roman: "bucket dinchu", english: "lower the bucket", art: bucketDown },
            { native: "తాడు లాగు", roman: "taadu laagu", english: "pull the rope", wordId: "taadu", art: ropePull },
            { native: "బిందెలో పొయ్యి", roman: "bindelo poyyi", english: "pour it into the pot", wordId: "binde", art: pour },
            { native: "బిందె ఎత్తు", roman: "binde ettu", english: "lift the pot", art: liftPot },
          ],
          done: "One full binde. Heavy, and you didn't spill any.",
        },
        after: [
          { who: "ammamma", text: "{{శభాష్!}} Now go and find Tatayya. He's in the fields.", gloss: "Chinni next door knows the way. Ask her." },
        ],
        memory: "well",
        nudges: {
          "vaakili:ammamma": [{ who: "ammamma", text: "{{నీళ్ళు}} first, then we talk.", gloss: "The well is in the lane." }],
          "veedhi:chinni": [{ who: "chinni", text: "Are you Ammamma's grandchild from America? {{నమస్కారం!}}", gloss: "Chinni, from next door. She's been waiting to meet you." }],
        },
      },
      {
        id: "directions",
        quest: { v: "Ask Chinni the way to the fields", hint: "She's in the lane, by the cow." },
        at: { room: "veedhi", hotspot: "chinni" },
        lines: [
          { who: "chinni", text: "Tatayya? Easy. {{ముందుకు వెళ్ళు, ఎడమకి తిరుగు, తర్వాత కుడికి.}}", gloss: "munduku vellu, edamaki thirugu, tarvaata kudiki." },
          { who: "guide", text: "She said it fast. Which way first?", gloss: "Put Chinni's directions in order." },
        ],
        game: {
          type: "sequence",
          kicker: "Mini-game · దారి",
          title: "Follow Chinni's directions.",
          hint: "Chinni said: munduku, edamaki, tarvaata kudiki. Tap the turns in her order.",
          steps: [
            { native: "ముందుకు", roman: "munduku", english: "straight ahead", wordId: "munduku", art: arrow(0) },
            { native: "ఎడమ", roman: "edama", english: "left", wordId: "edama", art: arrow(-90) },
            { native: "కుడి", roman: "kudi", english: "right", wordId: "kudi", art: arrow(90) },
          ],
          done: "Straight, left, right. The fields are through there.",
        },
        after: [{ who: "chinni", text: "{{సరే!}} See you at the santha on Sunday.", gloss: "sare — okay! The market." }],
        memory: "directions",
        nudges: { "vaakili:ammamma": [{ who: "ammamma", text: "Chinni knows the way. Ask her." }] },
      },
    ],
    ending: {
      at: { room: "polam", hotspot: "tatayya" },
      quest: { v: "Find Tatayya", hint: "In the fields." },
      lines: [
        { who: "tatayya", text: "{name}! You walked all the way here on your own?", gloss: "Tatayya, leaning on his stick, grinning." },
        { who: "tatayya", text: "Then you must be hungry. Tell me —", gloss: "He asks the question every Telugu grandparent asks." },
      ],
      asker: "tatayya",
      question: {
        native: "అన్నం తిన్నావా?",
        roman: "annam tinnaavaa?",
        english: "Have you eaten?",
        choices: [
          { native: "తిన్నాను, తాతయ్యా.", roman: "tinnaanu, tatayyaa.", english: "I've eaten, Tatayya.", right: true },
          { native: "ఎడమ", roman: "edama", english: "left", reply: [{ who: "tatayya", text: "Left? I asked if you'd eaten, not which way!" }] },
          { native: "ఆవు", roman: "aavu", english: "cow", reply: [{ who: "tatayya", text: "The cow has eaten, yes. What about you?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{తిన్నాను, తాతయ్యా.}}", gloss: "“I've eaten, Tatayya.”" },
        { who: "tatayya", text: "{{మంచిది.}} Now come — I'll show you the buffaloes.", gloss: "manchidi — good." },
        { who: "guide", text: "…In Telugu, “have you eaten?” is how people say “I care about you”." },
      ],
      encounter: ["annam"],
      memory: "tinnava",
    },
    gates: [{ room: "veedhi", hotspot: "polam", until: "directions", line: { who: "guide", text: "You don't know the way yet. Ask Chinni.", gloss: "She's standing by the cow." } }],
    idle: {
      "vaakili:ammamma": [{ who: "ammamma", text: "Go on, Tatayya's waiting for you." }],
      "veedhi:well": [{ who: "guide", text: "Ammamma's pots are full for today." }],
      "veedhi:chinni": [{ who: "chinni", text: "Straight, left, right! You'll get there." }],
    },
    afterwards: {
      "polam:tatayya": [{ who: "tatayya", text: "Tomorrow is santha day. Your Ammamma will take you. Bring a bag — she buys a lot." }],
      "vaakili:ammamma": [{ who: "ammamma", text: "Tatayya says you walked there by yourself! {{శభాష్.}}", gloss: "shabaash." }],
      "veedhi:chinni": [{ who: "chinni", text: "Sunday — the santha! Don't forget." }],
    },
    complete: {
      title: "The",
      em: "Village",
      text: "You greeted Ammamma the village way, drew water from the well, found your way by asking — and answered Tatayya's question like you'd always known it.",
      quest: { v: "Stay in the fields a while", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Vaakili />,
};

export default content;
