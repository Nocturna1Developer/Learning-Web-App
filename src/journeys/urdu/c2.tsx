import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Clouds, Ground, Item, FY } from "../scenes";
import { Figure, Child } from "../../components/scenes/primitives";
import { Icon } from "../kit";
import { UR, LHR, Haveli, Skyline, PigeonLoft, Pigeon } from "./art";

/* URDU · Chapter Two — چھت. Summer in the walled city of Lahore: Dada's pigeons over the old rooftops. */

function Gali() {
  return (
    <Stage>
      <Sky id="ur2a" top="#e8c898" mid="#f0dcb8" bottom="#f6ecd8" />
      <Sun x={1440} y={120} r={42} color="#fbe0a0" />
      <Haveli x={-40} w={420} h={520} />
      <Haveli x={420} w={360} h={560} tint="#a85848" />
      {/* the old city gate at the end of the lane */}
      <rect x={880} y={FY - 440} width="320" height="440" fill={LHR.brickDark} />
      <path d={`M950 ${FY}v-220q90 -100 180 0v220Z`} fill="#3a2418" />
      <rect x={860} y={FY - 470} width="360" height="40" fill={LHR.brick} />
      <text x={1040} y={FY - 380} textAnchor="middle" fontFamily={UR} fontSize="30" fill="#f4ecdd">دہلی دروازہ</text>
      <Haveli x={1240} w={400} h={500} lit />
      <Ground color="#9a8070" line="#7a6050" kind="stone" />
      {/* wires criss-crossing the lane */}
      <path d="M0 200q400 60 800 10t800 30M0 260q500 40 1600 -20" stroke="#2a2a2a" strokeWidth="2" fill="none" />
      <Figure x={620} y={FY} h={190} color="#2a1a12" />
      <Child x={340} y={FY} h={112} color="#3a2a24" />
      <Figure x={1380} y={FY} h={200} color="#2a1a12" flip />
    </Stage>
  );
}

function Chhat({ done }: { done: ReadonlySet<string> }) {
  const home = done.has("count");
  return (
    <Stage>
      <Sky id="ur2b" top="#e89870" mid="#f0c090" bottom="#f8e0b8" />
      <Sun x={1300} y={420} r={50} color="#fbd07a" />
      <Clouds seed={37} opacity={0.4} y={170} color="#f8d8b8" />
      <Skyline y={560} opacity={0.85} />
      {/* rooftops of the old city, one after another */}
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={i * 190 - 30} y={570 + (i % 3) * 16} width="170" height="120" fill={i % 2 ? LHR.brick : LHR.brickDark} />)}
      <rect x="0" y={FY - 50} width="1600" height="50" fill={LHR.brick} />
      <Ground color="#a88070" line="#886050" kind="tile" />
      <PigeonLoft x={200} />
      {/* pigeons in the air, or home on the loft */}
      {home
        ? [230, 270, 310, 350].map((x) => <Pigeon key={x} x={x} y={FY - 310} s={0.9} />)
        : [[700, 200], [760, 240], [820, 190], [880, 250]].map(([x, y]) => <Pigeon key={x} x={x} y={y} s={1.1} flying />)}
      <Figure x={540} y={FY} h={200} color="#2a1a12" pose="reach" />
      {/* the boy on the next roof */}
      <rect x={1180} y={FY - 90} width="420" height="90" fill={LHR.brickDark} />
      <Child x={1360} y={FY - 90} h={116} color="#2a1a12" flip />
    </Stage>
  );
}

const pigeonCoin = <svg viewBox="0 0 64 64" aria-hidden="true"><Pigeon x={30} y={36} s={1.3} /></svg>;

const content: ChapterContent = {
  startRoom: "gali",
  speakers: {
    ali: { name: "Ali", glyph: "ع", tone: "guest" },
  },
  rooms: {
    gali: {
      id: "gali",
      name: "The lane",
      native: "گلی",
      art: <Gali />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "haveli", x: 200, y: 400, label: "Carved balcony", kind: "word", wordId: "mohalla" },
        { id: "dadi", x: 620, y: 560, label: "Dadi", kind: "npc" },
        { id: "gate", x: 1040, y: 460, label: "Delhi Gate", kind: "flavor", note: "One of the thirteen gates of the old walled city — built so long ago that nobody's Dada remembers when. The lane on the other side leads to the Wazir Khan mosque." },
        { id: "stairs", x: 1380, y: 560, label: "Stairs to the roof", kind: "exit", to: "chhat" },
      ],
    },
    chhat: {
      id: "chhat",
      name: "The rooftop",
      native: "چھت",
      art: (done) => <Chhat done={done} />,
      spawn: { left: 400, right: 1100 },
      hotspots: [
        { id: "loft", x: 320, y: 520, label: "Pigeon loft", kind: "quest" },
        { id: "dada", x: 540, y: 560, label: "Dada", kind: "npc" },
        { id: "skyline", x: 800, y: 420, label: "Domes and minarets", kind: "flavor", note: "The domes and minarets of the old city, turning pink in the sunset. From up here you can see three hundred years of Lahore at once." },
        { id: "ali", x: 1360, y: 540, label: "The boy on the next roof", kind: "npc", after: "count" },
        { id: "gali", x: 80, y: 560, label: "Down to the lane", kind: "exit", to: "gali" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "دوسرا باب · Urdu",
      title: "The",
      em: "Rooftops",
      text: "Summer. You've flown to Lahore, to Dada and Dadi's haveli inside the old walled city — a lane so narrow you can touch both walls, and a roof that looks out over three hundred years of domes.",
    },
    introLines: [
      { who: "dadi", text: "{{آ گئے!}} Finally! Your Dada is on the roof with his pigeons. Where else.", gloss: "aa gaye — you've come!" },
      { who: "guide", text: "Quest: help Dada bring his pigeons home.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "mohalla",
        quest: { v: "Talk to Dadi", hint: "In the lane, by the haveli." },
        encounter: ["mohalla", "gali"],
        at: { room: "gali", hotspot: "dadi" },
        lines: [
          { who: "dadi", text: "This is our {{محلہ}}. Everybody in this {{گلی}} has known your Abbu since he was born. They'll all want to feed you.", gloss: "mohalla — neighbourhood. gali — lane." },
          { who: "dadi", text: "Go up — the stairs at the end. He's been waiting all afternoon.", gloss: "The stairs on the right." },
        ],
        culture: ["androon"],
      },
      {
        id: "grain",
        quest: { v: "Help Dada with the pigeons", hint: "Up on the roof." },
        at: { room: "chhat", hotspot: "dada" },
        encounter: ["dada", "chhat", "kabootar"],
        lines: [
          { who: "dada", text: "{{آؤ، آؤ!}} Welcome to my {{چھت}}. And these are my {{کبوتر}} — forty of them. Each one has a name.", gloss: "aao — come! chhat — roof. kabootar — pigeons." },
          { who: "dada", text: "They're out flying. When they come back they'll be hungry. Pass me what I need.", gloss: "He has a whistle round his neck." },
        ],
        game: {
          type: "fetch",
          npc: "dada",
          kicker: "Mini-game · کبوتر",
          title: "Pass Dada what he asks for.",
          hint: "Nothing is labelled. Listen for the word.",
          asks: [
            { wordId: "dana", native: "دانہ — وہ ڈبا۔", roman: "dana — woh dabba.", english: "Grain — that tin." },
            { wordId: "pani", native: "پانی، پیالے میں۔", roman: "pani, pyale mein.", english: "Water, in the bowl." },
            { wordId: "chawal", native: "اور کل کے چاول۔", roman: "aur kal ke chawal.", english: "And yesterday's rice." },
          ],
          items: [
            { wordId: "dana", label: "Rattly tin", art: <Item kind="jar" color="#a8b0b8" accent="#e8c878" /> },
            { wordId: "pani", label: "Clay bowl", art: Icon.jug },
            { wordId: "chawal", label: "Bowl", art: <Item kind="bowl" color="#f4f0e6" accent="#f8f8f4" /> },
          ],
          done: { native: "بہت اچھے!", roman: "bohat achhe!", english: "Very good!" },
        },
        after: [{ who: "dada", text: "Now listen. He whistles — two notes, high then low — and waves the flag on the long pole.", gloss: "Out over the rooftops, dots turn round and start to come back." }],
        culture: ["kabootar"],
        memory: "grain",
        nudges: { "gali:dadi": [{ who: "dadi", text: "Up to the roof! He's waiting." }] },
      },
      {
        id: "count",
        quest: { v: "Count the pigeons home", hint: "At the loft." },
        at: { room: "chhat", hotspot: "loft" },
        lines: [{ who: "dada", text: "Count them as they land. I'll say how many in each group. If one's missing — I'll know.", gloss: "He knows every single one." }],
        game: {
          type: "count",
          npc: "dada",
          kicker: "Mini-game · گنتی",
          title: "Count the pigeons as they land.",
          hint: "Tap a pigeon for each one Dada calls, then send them in.",
          unit: "pigeons",
          coin: pigeonCoin,
          rounds: [
            { native: "ایک — وہ سفید والا۔", roman: "ek — woh safed wala.", english: "One — the white one.", answer: 1, wordId: "ek" },
            { native: "دو!", roman: "do!", english: "Two!", answer: 2, wordId: "do" },
            { native: "تین — بھائی بہن۔", roman: "teen — bhai behen.", english: "Three — a brother and sisters.", answer: 3, wordId: "teen" },
            { native: "چار! سب آ گئے!", roman: "chaar! sab aa gaye!", english: "Four! Everyone's home!", answer: 4, wordId: "chaar" },
          ],
          done: { native: "سب گھر آ گئے!", roman: "sab ghar aa gaye!", english: "All home!" },
        },
        after: [{ who: "guide", text: "On the next roof, a boy with his own flock is waving at you across the gap.", gloss: "Every roof in the old city has somebody on it at sunset." }],
        memory: "pigeons",
        nudges: { "chhat:dada": [{ who: "dada", text: "The loft! Here they come!" }] },
      },
    ],
    ending: {
      at: { room: "chhat", hotspot: "ali" },
      quest: { v: "Wave back to the boy next door", hint: "On the next roof." },
      lines: [{ who: "ali", text: "“I'm Ali! My pigeons are faster than your Dada's!” (From the roof, Dada snorts.)", gloss: "Ali, ten, holding a pigeon like a trophy." }],
      asker: "ali",
      question: {
        native: "کل پھر ملیں؟",
        roman: "kal phir milein?",
        english: "Meet again tomorrow?",
        choices: [
          { native: "ضرور!", roman: "zaroor!", english: "Definitely!", right: true },
          { native: "ایک۔", roman: "ek.", english: "One.", reply: [{ who: "ali", text: "One what? One pigeon? Tomorrow — yes or no?" }] },
          { native: "بہت مزے دار!", roman: "bohat mazedaar!", english: "Really delicious!", reply: [{ who: "ali", text: "Delicious?! Don't let your Dada hear you talking about pigeons like that!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{ضرور!}}", gloss: "“Definitely!”" },
        { who: "ali", text: "Tomorrow, same time. Bring your fastest pigeon.", gloss: "Dada says all his pigeons are the fastest pigeon." },
        { who: "dada", text: "One day on this roof, and already a Lahori.", gloss: "The call to prayer rises from three mosques at once, and the whole city turns gold." },
      ],
      encounter: ["zaroor", "pani"],
      memory: "zaroor",
    },
    gates: [{ room: "gali", hotspot: "stairs", until: "mohalla", line: { who: "dadi", text: "Salam first! Then the roof.", gloss: "Dadi opens her arms." } }],
    idle: {
      "chhat:dada": [{ who: "dada", text: "My grandfather kept pigeons on this roof. His grandfather too. Maybe you, one day." }],
      "gali:dadi": [{ who: "dadi", text: "Next week, Anarkali — Eid shopping. Bring an empty bag and a lot of patience." }],
    },
    afterwards: {
      "chhat:dada": [{ who: "dada", text: "Next week is Eid. The whole family, this roof, the moon. You'll see." }],
      "chhat:ali": [{ who: "ali", text: "Tomorrow! Don't forget!" }],
    },
    complete: {
      title: "The",
      em: "Rooftops",
      text: "You walked the lane of the old city, fed Dada's pigeons by ear, counted them home at sunset — and made a friend on the next roof, in Urdu.",
      quest: { v: "Watch the sunset over the domes", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Chhat done={new Set()} />,
};

export default content;
