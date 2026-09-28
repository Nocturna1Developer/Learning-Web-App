import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Item, FY } from "../scenes";
import { Walls, Door, Window, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { AR, LV, Tatreez, Maamoul, Mould } from "./art";

/* ARABIC · Chapter Three — المعمول, Ma'amoul. The week before the feast: wooden moulds, three fillings, and the whole building smelling of butter. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const kneadCard = card(<><path d="M6 50h68q-4 30 -34 30T6 50Z" fill="#c9cfd4" /><ellipse cx="40" cy="50" rx="34" ry="8" fill="#a8b0b8" /><ellipse cx="40" cy="48" rx="22" ry="9" fill="#efdcae" /></>);
const fillCard = card(<><circle cx="40" cy="52" r="24" fill="#efdcae" /><circle cx="40" cy="52" r="12" fill="#6a3a1e" /><path d="M34 48q6 -6 12 0" stroke="#8a5a2e" strokeWidth="2" fill="none" /></>);
const pressCard = card(<g transform="translate(38 50) scale(0.9)"><Mould x={0} y={0} /></g>);
const trayCard = card(<><rect x="4" y="54" width="72" height="12" rx="4" fill="#9aa0a8" />{[16, 34, 52, 68].map((x, i) => <g key={x} transform={`translate(${x} 56) scale(0.4)`}><Maamoul shape={(["dome", "flat", "oval", "dome"] as const)[i]} /></g>)}</>);
const ovenCard = card(<><rect x="8" y="16" width="64" height="64" rx="6" fill="#4a4a4e" /><rect x="16" y="30" width="48" height="38" rx="4" fill="#f0a040" opacity="0.8" /><rect x="16" y="22" width="48" height="4" fill="#8a8a8e" /></>);

function Matbakh({ done }: { done: ReadonlySet<string> }) {
  const baked = done.has("moulds");
  return (
    <Stage>
      <Walls tint="#efe6d4" floor="#b8a888" floorLine="#98886a" shade="#d8ccb4" />
      <Window x={330} y={200} w={260} h={200} />
      <Tatreez x={660} y={250} w={160} h={90} />
      {/* the oven */}
      <rect x={1220} y={FY - 240} width="200" height="240" fill="#6a6a6e" />
      <rect x={1240} y={FY - 200} width="160" height="120" rx="6" fill={baked ? "#f0a040" : "#2a2a2e"} opacity="0.9" />
      {/* the table: dough, fillings, moulds, trays */}
      <rect x={440} y={FY - 150} width="640" height="18" fill={WOOD} />
      <rect x={460} y={FY - 132} width="16" height="132" fill={WOOD} />
      <rect x={1044} y={FY - 132} width="16" height="132" fill={WOOD} />
      <ellipse cx={540} cy={FY - 164} rx="60" ry="16" fill="#efdcae" />
      {["#6a3a1e", "#a87a4a", "#6a9a4a"].map((c, i) => <ellipse key={c} cx={660 + i * 70} cy={FY - 158} rx="26" ry="8" fill={c} />)}
      <Mould x={900} y={FY - 164} s={0.7} />
      <rect x={880} y={FY - 158} width="180" height="8" fill="#9aa0a8" />
      {baked && [900, 940, 980, 1020].map((x, i) => <Maamoul key={x} x={x} y={FY - 158} s={0.6} shape={(["dome", "flat", "oval", "dome"] as const)[i]} />)}
      <Figure x={380} y={FY} h={195} color="#2a1a12" pose="sit" />
      <Figure x={1140} y={FY} h={205} color="#3a2a24" flip />
      <Door x={1440} open />
    </Stage>
  );
}

function Daraj() {
  return (
    <Stage>
      <Walls tint="#e2d6be" floor="#a89878" floorLine="#887858" shade="#cfc2a6" />
      {/* the landing: stairs going up and down, two neighbours' doors */}
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={60 + i * 34} y={FY - 40 - i * 40} width="120" height="40" fill="#c8b890" />)}
      <rect x={560} y={FY - 330} width="190" height="330" fill="#6b4429" />
      <rect x={576} y={FY - 314} width="158" height="150" fill="#7a5234" />
      <circle cx={726} cy={FY - 160} r="6" fill="#c9a24a" />
      <text x={655} y={FY - 346} textAnchor="middle" fontFamily={AR} fontSize="24" fill="#3a2718">عائلة حداد</text>
      <rect x={1060} y={FY - 330} width="190" height="330" fill="#3f6a7a" />
      <rect x={1076} y={FY - 314} width="158" height="150" fill="#4a7a8a" />
      <circle cx={1226} cy={FY - 160} r="6" fill="#c9a24a" />
      {/* a pot of basil by the door, a string of lights for the feast */}
      <path d={`M1300 ${FY}l10 -60h60l10 60Z`} fill="#b8642f" />
      <circle cx={1340} cy={FY - 90} r="34" fill="#3f7d55" />
      <path d="M520 120 Q900 170 1300 120" stroke="#3a2718" strokeWidth="2" fill="none" />
      {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={540 + i * 48} cy={128 + Math.sin((i / 15) * Math.PI) * 26} r="7" fill="#ffd07a" />)}
      <Child x={880} y={FY} h={118} color="#2a1a12" />
      <rect x={846} y={FY - 90} width="70" height="10" rx="4" fill="#9aa0a8" />
      <rect x={1440} y={FY - 330} width="140" height="330" fill={LV.stoneDark} />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "matbakh",
  speakers: {
    immgeorges: { name: "Imm Georges", glyph: "ج", tone: "guest" },
  },
  rooms: {
    matbakh: {
      id: "matbakh",
      name: "Teta's kitchen",
      native: "المطبخ",
      art: (done) => <Matbakh done={done} />,
      spawn: { left: 280, right: 1200 },
      hotspots: [
        { id: "teta", x: 380, y: 580, label: "Teta", kind: "npc" },
        { id: "dough", x: 540, y: 560, label: "Bowl of dough", kind: "word", wordId: "ajine" },
        { id: "tatreez", x: 740, y: 295, label: "Tatreez", kind: "flavor", note: "A cushion cover Teta's mother embroidered. It's hung on the wall now, because it's too good to sit on." },
        { id: "table", x: 820, y: 560, label: "The moulds", kind: "quest" },
        { id: "khalto", x: 1140, y: 560, label: "Khalto", kind: "npc" },
        { id: "oven", x: 1320, y: 560, label: "Oven", kind: "word", wordId: "forn" },
        { id: "daraj", x: 1530, y: 560, label: "The landing", kind: "exit", to: "daraj" },
      ],
    },
    daraj: {
      id: "daraj",
      name: "The landing",
      native: "الدرج",
      art: <Daraj />,
      spawn: { left: 400, right: 1300 },
      hotspots: [
        { id: "stairs", x: 200, y: 560, label: "Stairs", kind: "flavor", note: "Four floors of neighbours. By tonight, every one of them will have eaten Teta's ma‘mūl." },
        { id: "haddad", x: 655, y: 540, label: "The Haddads' door", kind: "flavor", note: "The Haddads are away visiting their son in Montreal. Teta will save them a box anyway." },
        { id: "door", x: 1155, y: 540, label: "Imm Georges's door", kind: "quest" },
        { id: "matbakh", x: 1510, y: 560, label: "Back to the kitchen", kind: "exit", to: "matbakh" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "الفصل الثالث · Arabic",
      title: "Cookies for",
      em: "the Feast",
      text: "Three days before the feast. Every kitchen in the building is baking the same thing, and the stairwell smells of butter and orange blossom.",
    },
    introLines: [
      { who: "teta", text: "{{العيد بعد تلات أيام!}} Wash your hands. Today you learn ma‘mūl.", gloss: "al-‘īd ba‘d tlēt iyyām — the feast is in three days!" },
      { who: "guide", text: "Quest: fill three trays of ma‘mūl.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "hello",
        quest: { v: "Talk to Teta", hint: "She's sitting at the end of the table." },
        at: { room: "matbakh", hotspot: "teta" },
        encounter: ["eid", "maamoul"],
        lines: [
          { who: "teta", text: "For the {{عيد}}, we make {{معمول}}. Every family in the building — Muslim, Christian, everybody. Same cookies, same moulds.", gloss: "‘īd — the feast. ma‘mūl — filled semolina cookies." },
          { who: "teta", text: "Your {{خالتو}} came to help. She'll tell you what to fetch.", gloss: "khālto — your mom's sister." },
        ],
        culture: ["maamoul"],
      },
      {
        id: "fillings",
        quest: { v: "Help Khalto with the fillings", hint: "She's by the oven." },
        at: { room: "matbakh", hotspot: "khalto" },
        encounter: ["khalto"],
        lines: [{ who: "khalto", text: "{{أهلين!}} Quick, pass me things. Teta is watching us both.", gloss: "ahlēn — hi! She winks." }],
        game: {
          type: "fetch",
          npc: "khalto",
          kicker: "Mini-game · الحشوة",
          title: "Pass Khalto what she asks for.",
          hint: "Nothing is labelled. Listen for the word.",
          asks: [
            { wordId: "smid", native: "السميد.", roman: "as-smīd.", english: "The semolina." },
            { wordId: "tamr", native: "التمر.", roman: "at-tamr.", english: "The dates." },
            { wordId: "joz", native: "الجوز، لو سمحت.", roman: "al-jōz, law samaḥt.", english: "The walnuts, please." },
            { wordId: "fostoq", native: "والفستق!", roman: "w al-fosto’!", english: "And the pistachios!" },
          ],
          items: [
            { wordId: "smid", label: "Sack", art: <Item kind="bag" color="#efdcae" /> },
            { wordId: "tamr", label: "Sticky", art: <Item kind="bowl" color="#f4ecdd" accent="#6a3a1e" /> },
            { wordId: "joz", label: "Crunchy", art: <Item kind="bowl" color="#f4ecdd" accent="#a87a4a" /> },
            { wordId: "fostoq", label: "Green", art: <Item kind="bowl" color="#f4ecdd" accent="#6a9a4a" /> },
          ],
          done: { native: "عفارم!", roman: "‘afārem!", english: "Well done!" },
        },
        after: [{ who: "khalto", text: "Now the {{قالب}}. Teta's moulds are older than me. Be gentle.", gloss: "’ālab — a mould. Carved wood." }],
        memory: "fillings",
        nudges: { "matbakh:teta": [{ who: "teta", text: "Khalto first — the fillings." }] },
      },
      {
        id: "moulds",
        quest: { v: "Press ma‘mūl with Teta", hint: "At the moulds on the table." },
        at: { room: "matbakh", hotspot: "table" },
        encounter: ["alab"],
        lines: [
          { who: "teta", text: "Look at the shapes. Dates go in the flat round ones. Walnuts in the domes. Pistachios in the long ones. That way, you know what's inside before you bite.", gloss: "In Teta's kitchen, anyway. Every family argues about it." },
          { who: "teta", text: "Knead. Fill. Press. Tap it out on the tray. Into the oven.", gloss: "She taps a mould on the table edge, and a perfect cookie drops out." },
        ],
        game: {
          type: "sequence",
          kicker: "Mini-game · المعمول",
          title: "Make ma‘mūl, in order.",
          hint: "Tap the steps in the order Teta showed you.",
          steps: [
            { native: "عجن العجينة", roman: "‘ajn al-‘ajīne", english: "knead the dough", wordId: "ajine", art: kneadCard },
            { native: "حشي بالتمر", roman: "ḥashi bit-tamr", english: "fill it with dates", wordId: "tamr", art: fillCard },
            { native: "كبس بالقالب", roman: "kabs bil-’ālab", english: "press it in the mould", wordId: "alab", art: pressCard },
            { native: "عالصينية", roman: "‘aṣ-ṣēniyye", english: "onto the tray", wordId: "seniyye", art: trayCard },
            { native: "عالفرن", roman: "‘al-forn", english: "into the oven", wordId: "forn", art: ovenCard },
          ],
          done: "Three trays, golden at the edges. Khalto dusts them with sugar like snow.",
        },
        after: [
          { who: "teta", text: "The first plate always goes to the {{جيران}}. Take this to Imm Georges, across the landing.", gloss: "jīrān — neighbours." },
        ],
        culture: ["moulds"],
        memory: "maamoul",
        nudges: {
          "matbakh:teta": [{ who: "teta", text: "The moulds, {{يا قلبي}}. Come.", gloss: "ya ’albi — my heart." }],
          "matbakh:khalto": [{ who: "khalto", text: "Teta's waiting for you at the moulds." }],
        },
      },
    ],
    ending: {
      at: { room: "daraj", hotspot: "door" },
      quest: { v: "Take ma‘mūl to Imm Georges", hint: "Across the landing." },
      lines: [
        { who: "guide", text: "You knock with your elbow — both hands are on the plate. The door flies open before you've finished knocking.", gloss: "Imm Georges has clearly been watching through the peephole." },
        { who: "immgeorges", text: "Ma‘mūl from Imm Nabil! And carried by the grandchild!" },
      ],
      asker: "immgeorges",
      question: {
        native: "كل عام وإنتو بخير!",
        roman: "kell ‘ām w intu bkhēr!",
        english: "May every year find you well!",
        choices: [
          { native: "وإنتو بخير!", roman: "w intu bkhēr!", english: "And you too!", right: true },
          { native: "قديش؟", roman: "addēsh?", english: "How much?", reply: [{ who: "immgeorges", text: "How much?! They're a gift, ya ’albi! Try again — I said happy feast!" }] },
          { native: "بس هيك، شكراً.", roman: "bass hēk, shukran.", english: "That's all, thanks.", reply: [{ who: "immgeorges", text: "Ha! I'm not a shop. It's a feast greeting — answer it!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{وإنتو بخير!}}", gloss: "“And you too!”" },
        { who: "immgeorges", text: "She takes the plate, disappears, and comes back with a plate of her own ma‘mūl. {{هيدي لتيتا.}}", gloss: "hayde la-teta — this is for Teta. The plate is never returned empty." },
        { who: "guide", text: "By tonight, the same plate will have gone up and down the stairs six times." },
      ],
      encounter: ["bkhair", "jiran"],
      memory: "bkhair",
    },
    gates: [{ room: "matbakh", hotspot: "daraj", until: "moulds", line: { who: "teta", text: "Where are you going? The ma‘mūl won't make itself!", gloss: "Teta points at the table." } }],
    idle: {
      "matbakh:khalto": [{ who: "khalto", text: "Your mama never had the patience for the moulds. You're better than her already. Don't tell her." }],
      "matbakh:table": [{ who: "guide", text: "Three trays, cooling. Nobody is allowed to touch them. Everybody has touched them." }],
    },
    afterwards: {
      "matbakh:teta": [{ who: "teta", text: "In autumn we go up to the village for the olives. You'll come? Good. You'll need old shoes." }],
      "matbakh:khalto": [{ who: "khalto", text: "{{كل عام وإنتو بخير!}} Save me the pistachio ones.", gloss: "Happy feast!" }],
    },
    complete: {
      title: "Cookies for",
      em: "the Feast",
      text: "You fetched the fillings by ear, pressed ma‘mūl in Teta's old moulds step by step, carried the first plate to the neighbours — and answered the feast greeting the right way.",
      quest: { v: "Steal one ma‘mūl from the tray", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Matbakh done={new Set(["moulds"])} />,
};

export default content;
