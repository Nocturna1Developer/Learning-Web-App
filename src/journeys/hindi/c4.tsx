import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Ground, Bunting, FY } from "../scenes";
import { Figure, Child } from "../../components/scenes/primitives";
import { LKO, Haveli, Gulaal, Gujiya, Charpai } from "./art";

/* HINDI · Chapter Four — होली, Holi. Colours in the air, gujiya on every plate, and one line that forgives everything. */

const COLOURS = { laal: "#e0304a", hara: "#2fa84a", peela: "#f0c828", neela: "#2a6ae0" };

const tray = (c: string): ReactNode => (
  <svg viewBox="0 0 80 90" aria-hidden="true">
    <ellipse cx="40" cy="66" rx="34" ry="10" fill="#c9cfd4" />
    <path d="M14 64q26 -40 52 0Z" fill={c} />
    <circle cx="30" cy="54" r="4" fill="#fff" opacity="0.4" />
  </svg>
);

function Gali({ done }: { done: ReadonlySet<string> }) {
  const thrown = done.has("colours");
  return (
    <Stage>
      <Sky id="hi4a" top="#8ac0e0" bottom="#f8ecd8" />
      <Sun x={1420} y={110} r={44} color="#fbe0a0" />
      <Haveli x={-40} w={400} h={460} wall={LKO.wall[2]} />
      <Haveli x={520} w={380} h={480} wall={LKO.wall[3]} />
      <Haveli x={1180} w={460} h={450} wall={LKO.wall[1]} />
      <Ground color="#c0a888" line="#a08868" kind="dirt" />
      <Bunting y={96} sag={34} colors={Object.values(COLOURS)} />
      {/* colour in the air */}
      <Gulaal x={420} y={420} r={90} color={COLOURS.laal} />
      <Gulaal x={980} y={380} r={70} color={COLOURS.peela} />
      {thrown && <Gulaal x={700} y={470} r={110} color={COLOURS.hara} />}
      {thrown && <Gulaal x={1160} y={500} r={80} color={COLOURS.neela} />}
      {/* the table of gulaal trays */}
      <rect x={140} y={FY - 110} width="300" height="16" fill="#8a5a34" />
      <rect x={160} y={FY - 94} width="12" height="94" fill="#6b4429" />
      <rect x={408} y={FY - 94} width="12" height="94" fill="#6b4429" />
      {Object.values(COLOURS).map((c, i) => <path key={c} d={`M${170 + i * 70} ${FY - 110}q26 -40 52 0Z`} fill={c} />)}
      {/* kids, splashed */}
      <Child x={560} y={FY} h={118} color="#6a2a5a" />
      <Child x={640} y={FY} h={110} color="#2a4a6a" flip />
      <Figure x={820} y={FY} h={210} color="#3a2a3a" />
      <Figure x={1000} y={FY} h={200} color="#2a1a12" flip />
      {/* Sharma Aunty's doorway, spotless for now */}
      <Figure x={1300} y={FY} h={195} color="#f4f2ec" flip />
    </Stage>
  );
}

function Aangan() {
  return (
    <Stage>
      <Sky id="hi4b" top="#8ac0e0" bottom="#f4e6c8" />
      <Haveli x={-60} w={560} h={520} wall={LKO.wall[4]} />
      <Haveli x={1100} w={560} h={520} wall={LKO.wall[0]} />
      <rect x={500} y={FY - 440} width="600" height="440" fill={LKO.wall[1]} />
      <Ground color="#c8a878" line="#a88858" kind="stone" />
      <Gulaal x={800} y={200} r={60} color={COLOURS.laal} />
      {/* gujiya plates on a charpai */}
      <Charpai x={520} w={360} />
      {[580, 680, 780].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={FY - 74} rx="40" ry="9" fill="#c9cfd4" />
          <Gujiya x={x - 12} y={FY - 80} s={0.6} />
          <Gujiya x={x + 12} y={FY - 84} s={0.6} />
        </g>
      ))}
      {/* thandai */}
      <rect x={940} y={FY - 140} width="140" height="14" fill="#8a5a34" />
      {[960, 1000, 1040].map((x) => <path key={x} d={`M${x} ${FY - 180}h24l-3 40h-18Z`} fill="#f4ead8" stroke="#d8ccb6" />)}
      <Figure x={420} y={FY} h={185} color="#2a1a12" pose="sit" />
      <Figure x={1200} y={FY} h={200} color="#3a2a24" flip />
      <Child x={1320} y={FY} h={108} color="#8a2a4a" flip />
    </Stage>
  );
}

const gujiyaCoin = <svg viewBox="0 0 64 64" aria-hidden="true"><Gujiya x={32} y={40} s={0.9} /></svg>;

const content: ChapterContent = {
  startRoom: "aangan",
  speakers: {
    chachi: { name: "Chachi", glyph: "चा", tone: "guest" },
    anu: { name: "Anu", glyph: "अ", tone: "guest" },
    rohan: { name: "Rohan bhaiya", glyph: "रो", tone: "guest" },
    sharma: { name: "Sharma Aunty", glyph: "श", tone: "guest" },
  },
  rooms: {
    aangan: {
      id: "aangan",
      name: "The courtyard",
      native: "आँगन",
      art: <Aangan />,
      spawn: { left: 260, right: 1200 },
      hotspots: [
        { id: "dadi", x: 420, y: 580, label: "Dadi", kind: "npc" },
        { id: "plates", x: 680, y: 620, label: "Gujiya plates", kind: "quest" },
        { id: "thandai", x: 1000, y: 560, label: "Thandai", kind: "flavor", note: "Cold milk with almonds, fennel, rose and saffron. Chachi pours you a glass — the children's version, she says, very firmly.", culture: "thandai" },
        { id: "chachi", x: 1200, y: 560, label: "Chachi", kind: "npc" },
        { id: "anu", x: 1320, y: 620, label: "Anu", kind: "word", wordId: "behen" },
        { id: "gali", x: 1530, y: 560, label: "The lane", kind: "exit", to: "gali" },
      ],
    },
    gali: {
      id: "gali",
      name: "The lane",
      native: "गली",
      art: (done) => <Gali done={done} />,
      spawn: { left: 260, right: 1200 },
      hotspots: [
        { id: "aangan", x: 70, y: 560, label: "Courtyard", kind: "exit", to: "aangan" },
        { id: "trays", x: 290, y: 600, label: "Colour trays", kind: "word", wordId: "gulaal" },
        { id: "kids", x: 600, y: 620, label: "Splashed kids", kind: "word", wordId: "pichkaari" },
        { id: "rohan", x: 820, y: 540, label: "Rohan bhaiya", kind: "npc" },
        { id: "sharma", x: 1300, y: 560, label: "Sharma Aunty", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "चौथा अध्याय · Hindi",
      title: "Colours of",
      em: "Holi",
      text: "The morning after the Holika bonfire. Everybody is wearing their oldest clothes. Nobody is safe, and everybody knows it.",
    },
    introLines: [
      { who: "anu", text: "{{होली है!}} You're still clean. That's not going to last.", gloss: "holi hai! — it's Holi!" },
      { who: "guide", text: "Quest: celebrate your first Holi.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "rang",
        quest: { v: "Go to Dadi", hint: "She's sitting in the courtyard." },
        at: { room: "aangan", hotspot: "dadi" },
        encounter: ["holi", "rang", "gulaal"],
        lines: [
          { who: "dadi", text: "Come here. The first {{रंग}} is from your Dadi.", gloss: "rang — colour." },
          { who: "guide", text: "She presses a pinch of red {{गुलाल}} to each of your cheeks, very gently. Then she laughs like a girl.", gloss: "gulaal — coloured powder." },
          { who: "dadi", text: "{{होली मुबारक!}} Now help Chachi — two hundred gujiya don't hand themselves out.", gloss: "holi mubaarak — happy Holi!" },
        ],
        culture: ["holi"],
      },
      {
        id: "gujiya",
        quest: { v: "Hand out gujiya with Chachi", hint: "The plates on the charpai." },
        at: { room: "aangan", hotspot: "plates" },
        encounter: ["gujiya"],
        lines: [{ who: "chachi", text: "Every house in the lane gets a plate. I'll say how many {{गुजिया}} on each.", gloss: "gujiya — sweet, crescent-shaped dumplings. Made last night, all two hundred." }],
        game: {
          type: "count",
          npc: "chachi",
          kicker: "Mini-game · गुजिया",
          title: "Fill the plates.",
          hint: "Tap gujiya to count them onto the plate, then send it off.",
          unit: "gujiya",
          coin: gujiyaCoin,
          rounds: [
            { native: "अनु के लिए दो।", roman: "Anu ke liye do.", english: "Two for Anu.", answer: 2, wordId: "do" },
            { native: "शर्मा आंटी के लिए चार।", roman: "Sharma Aunty ke liye chaar.", english: "Four for Sharma Aunty.", answer: 4, wordId: "chaar" },
            { native: "पड़ोसियों के लिए छह।", roman: "padosiyon ke liye chhah.", english: "Six for the neighbours.", answer: 6, wordId: "chhah" },
            { native: "रोहन के दोस्तों के लिए दस!", roman: "Rohan ke doston ke liye das!", english: "Ten for Rohan's friends!", answer: 10, wordId: "das" },
          ],
          done: { native: "सबको मिल गई!", roman: "sabko mil gayi!", english: "Everyone's got some!" },
        },
        after: [{ who: "chachi", text: "Rohan's out in the lane with the colours. Go — and take a pichkaari. You'll need it.", gloss: "A pichkaari — a water squirter." }],
        culture: ["gujiya"],
        memory: "gujiya",
        nudges: {
          "aangan:chachi": [{ who: "chachi", text: "The plates, beta. On the charpai." }],
          "aangan:dadi": [{ who: "dadi", text: "Chachi's gujiya — go help." }],
        },
      },
      {
        id: "colours",
        quest: { v: "Find Rohan in the lane", hint: "Out through the gate." },
        at: { room: "gali", hotspot: "rohan" },
        encounter: ["bhaai", "pichkaari"],
        lines: [
          { who: "rohan", text: "Finally! I'm Rohan — your {{भाई}}. Cousin-brother. Same thing.", gloss: "bhaai — brother. He's fifteen and already purple from the neck up." },
          { who: "rohan", text: "Quick — reload me! Pass me whatever colour I shout.", gloss: "He's holding a {{पिचकारी}} and a look of total war." },
        ],
        game: {
          type: "fetch",
          npc: "rohan",
          kicker: "Mini-game · रंग",
          title: "Pass Rohan the colour he shouts.",
          hint: "The trays aren't labelled. Listen.",
          asks: [
            { wordId: "laal", native: "लाल!", roman: "laal!", english: "Red!" },
            { wordId: "hara", native: "हरा, जल्दी!", roman: "hara, jaldi!", english: "Green, quick!" },
            { wordId: "neela", native: "नीला!", roman: "neela!", english: "Blue!" },
            { wordId: "peela", native: "अब पीला!", roman: "ab peela!", english: "Now yellow!" },
          ],
          items: [
            { wordId: "laal", label: "", art: tray(COLOURS.laal) },
            { wordId: "hara", label: "", art: tray(COLOURS.hara) },
            { wordId: "peela", label: "", art: tray(COLOURS.peela) },
            { wordId: "neela", label: "", art: tray(COLOURS.neela) },
          ],
          done: { native: "ज़बरदस्त!", roman: "zabardast!", english: "Awesome!" },
        },
        after: [
          { who: "rohan", text: "Your turn. Aim for— wait, not at Sharma Aunty, she's in WHITE—", gloss: "Too late." },
        ],
        memory: "colours",
        nudges: { "gali:sharma": [{ who: "sharma", text: "{{होली मुबारक, बेटा!}} Don't you dare. This sari is new.", gloss: "Happy Holi, child!" }] },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Sharma Aunty", hint: "She's standing very still." },
      lines: [{ who: "sharma", text: "Sharma Aunty stands in her doorway, dripping green, blinking at you. The whole lane goes silent." }],
      asker: "sharma",
      question: {
        native: "अरे! यह क्या किया?",
        roman: "are! yeh kya kiya?",
        english: "Hey! What have you done?",
        choices: [
          { native: "बुरा न मानो, होली है!", roman: "bura na maano, holi hai!", english: "Don't be upset — it's Holi!", right: true },
          { native: "बहुत महँगा!", roman: "bahut mahanga!", english: "Too expensive!", reply: [{ who: "sharma", text: "Yes, it WAS an expensive sari! That's not an apology!" }] },
          { native: "एकदम गोल!", roman: "ekdam gol!", english: "Perfectly round!", reply: [{ who: "rohan", text: "Round?! Say the Holi line! Quick!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{बुरा न मानो, होली है!}}", gloss: "“Don't be upset — it's Holi!”" },
        { who: "sharma", text: "She stares at you — and then she laughs, and grabs a fistful of blue off the tray.", gloss: "You are now also blue." },
        { who: "rohan", text: "{{होली है!}} You're one of us now.", gloss: "The whole lane cheers." },
      ],
      encounter: ["laal", "hara", "peela", "neela"],
      memory: "holi",
    },
    gates: [{ room: "aangan", hotspot: "gali", until: "gujiya", line: { who: "chachi", text: "Not yet! The gujiya first, then you can go get soaked.", gloss: "Chachi hands you a plate." } }],
    idle: {
      "aangan:dadi": [{ who: "dadi", text: "When I was a girl we made the colours ourselves, from flowers. Tesu flowers, bright orange." }],
      "gali:rohan": [{ who: "rohan", text: "Reload! Reload!" }],
      "gali:sharma": [{ who: "sharma", text: "Blue AND green. Well. It's Holi." }],
    },
    afterwards: {
      "aangan:dadi": [{ who: "dadi", text: "Tonight, on the roof, I'll tell you a story about a very clever man and a pot of khichdi." }],
      "aangan:chachi": [{ who: "chachi", text: "Wash before dinner! …It won't all come off. It never does." }],
    },
    complete: {
      title: "Colours of",
      em: "Holi",
      text: "You got your first colour from Dadi, filled the gujiya plates by number, reloaded Rohan by shouting colours — and talked your way out of trouble with Sharma Aunty, the Holi way.",
      quest: { v: "Try to wash the colour off", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Gali done={new Set(["colours"])} />,
};

export default content;
