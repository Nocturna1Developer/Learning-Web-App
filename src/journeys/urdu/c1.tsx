import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Table, VideoCall, Item, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { Icon } from "../kit";
import { UR } from "./art";

/* URDU · Chapter One — پارسل. A parcel from Dadi in Lahore, and her kheer, made for the first time on a video call. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const soakCard = card(<><path d="M8 46h64q-4 32 -32 32T8 46Z" fill="#c9cfd4" /><ellipse cx="40" cy="46" rx="32" ry="8" fill="#8ab0c8" />{[28, 36, 44, 52].map((x) => <ellipse key={x} cx={x} cy={46} rx="3" ry="1.5" fill="#f4f4f0" />)}</>);
const boilCard = card(<><rect x="12" y="44" width="56" height="36" rx="6" fill="#8a8a8e" /><ellipse cx="40" cy="44" rx="28" ry="7" fill="#f8f4ec" /><path d="M30 34q-6 -10 2 -20M48 34q6 -10 -2 -20" stroke="#f4ecdd" strokeWidth="3" fill="none" /></>);
const stirCard = card(<><rect x="12" y="44" width="56" height="36" rx="6" fill="#8a8a8e" /><ellipse cx="40" cy="44" rx="28" ry="7" fill="#f4ecd8" /><path d="M54 14l-12 34" stroke="#b8864a" strokeWidth="5" /><path d="M28 44q12 6 24 0" stroke="#e8dcc0" strokeWidth="2" fill="none" /></>);
const sweetCard = card(<><rect x="12" y="44" width="56" height="36" rx="6" fill="#8a8a8e" /><ellipse cx="40" cy="44" rx="28" ry="7" fill="#f4ecd8" /><ellipse cx="30" cy="30" rx="5" ry="8" fill="#6a8a3a" /><path d="M46 20l4 16" stroke="#f4f4f4" strokeWidth="4" /></>);
const decorateCard = card(<><path d="M10 46h60q-4 32 -30 32T10 46Z" fill="#f4f0e6" stroke="#c8c0b0" /><ellipse cx="40" cy="46" rx="30" ry="8" fill="#f4ecd0" />{[28, 38, 48, 33, 44].map((x, i) => <ellipse key={i} cx={x} cy={i < 3 ? 46 : 42} rx="4" ry="2" fill="#c8a070" />)}</>);

function Darwaza({ done }: { done: ReadonlySet<string> }) {
  const open = done.has("parcel");
  return (
    <Stage>
      <Walls tint="#ece6da" />
      <Door x={40} open />
      <PhotoFrame x={300} y={240} w={120} h={140} tint="#1f5a3a" />
      <PhotoFrame x={450} y={270} w={150} h={110} tint="#b8452f" two />
      <Window x={680} y={220} w={260} h={200} />
      {/* the parcel: taped on every side, stamped three times */}
      <rect x={1000} y={FY - 150} width="220" height="150" fill="#c8a870" />
      <path d={`M1000 ${FY - 75}h220M1110 ${FY - 150}v150`} stroke="#8a6a44" strokeWidth="10" opacity="0.6" />
      {[1030, 1150].map((x, i) => <rect key={x} x={x} y={FY - 130 + i * 10} width="40" height="30" fill={i ? "#1f5a3a" : "#b8452f"} opacity="0.8" />)}
      <text x={1110} y={FY - 20} textAnchor="middle" fontFamily={UR} fontSize="22" fill="#3a2718">لاہور</text>
      {open && (
        <>
          <path d={`M1000 ${FY - 150}l-30 -40h160l20 40M1220 ${FY - 150}l30 -40h-120`} fill="#b8986a" />
          {[1040, 1080, 1120].map((x) => <ellipse key={x} cx={x} cy={FY - 170} rx="22" ry="16" fill="#f0b429" />)}
          <rect x={1150} y={FY - 200} width="40" height="30" fill="#6a8a3a" />
        </>
      )}
      <Figure x={880} y={FY} h={205} color="#2a1a12" flip />
      <Child x={620} y={FY} h={104} color="#3a2a24" />
      <Door x={1420} open />
    </Stage>
  );
}

function Bawarchikhana({ done }: { done: ReadonlySet<string> }) {
  const cooked = done.has("kheer");
  return (
    <Stage>
      <Walls tint="#f0e8d8" floor="#9a8a70" floorLine="#7a6a50" shade="#dcd0b8" />
      <Window x={380} y={200} w={280} h={210} />
      <rect x={80} y={FY - 400} width="200" height="400" rx="10" fill="#e8ecee" />
      <rect x={250} y={FY - 330} width="10" height="80" rx="4" fill="#a8b0b8" />
      <rect x={980} y={FY - 170} width="440" height="170" fill={WOOD} />
      <rect x={970} y={FY - 184} width="460" height="18" fill="#8a8078" />
      <rect x={1180} y={FY - 244} width="120" height="60" rx="8" fill="#8a8a8e" />
      <ellipse cx={1240} cy={FY - 244} rx="60" ry="10" fill={cooked ? "#f4ecd0" : "#6a6a6e"} />
      {cooked && <path d="M1220 470q-8 -18 4 -34M1260 470q8 -18 -4 -34" stroke="#f4ecdd" strokeWidth="6" fill="none" opacity="0.5" />}
      {/* Dadi on the laptop, propped against the tiles */}
      <VideoCall x={1000} y={FY - 184 - 170} w={180} faces={1} bgs={["#1f5a3a"]} />
      <Table x={480} w={420} cloth="#f4f0e6" />
      <path d={`M480 ${FY - 150}h420`} stroke="#1f5a3a" strokeWidth="6" strokeDasharray="12 10" />
      {cooked && [580, 660, 740].map((x) => (
        <g key={x}>
          <path d={`M${x - 30} ${FY - 150}q30 30 60 0Z`} fill="#f4f0e6" />
          <ellipse cx={x} cy={FY - 150} rx="30" ry="6" fill="#f4ecd0" />
          <ellipse cx={x} cy={FY - 152} rx="6" ry="2" fill="#c8a070" />
        </g>
      ))}
      <Figure x={420} y={FY} h={205} color="#3a2a24" />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "darwaza",
  rooms: {
    darwaza: {
      id: "darwaza",
      name: "Front hall",
      native: "دروازہ",
      art: (done) => <Darwaza done={done} />,
      spawn: { left: 300, right: 1300 },
      hotspots: [
        { id: "door", x: 130, y: 560, label: "Front door", kind: "word", wordId: "ghar" },
        { id: "photos", x: 440, y: 320, label: "Family photos", kind: "word", wordId: "khandan" },
        { id: "abbu", x: 880, y: 560, label: "Abbu", kind: "word", wordId: "abbu" },
        { id: "parcel", x: 1110, y: 640, label: "The parcel", kind: "quest" },
        { id: "kitchen", x: 1510, y: 560, label: "Kitchen", kind: "exit", to: "kitchen" },
      ],
    },
    kitchen: {
      id: "kitchen",
      name: "Kitchen",
      native: "باورچی خانہ",
      art: (done) => <Bawarchikhana done={done} />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "darwaza", x: 70, y: 580, label: "Front hall", kind: "exit", to: "darwaza" },
        { id: "fridge", x: 180, y: 480, label: "Fridge", kind: "word", wordId: "doodh" },
        { id: "ammi", x: 420, y: 560, label: "Ammi", kind: "npc" },
        { id: "laptop", x: 1090, y: 450, label: "Dadi, on the laptop", kind: "npc" },
        { id: "stove", x: 1240, y: 540, label: "The stove", kind: "quest" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "پہلا باب · Urdu",
      title: "The",
      em: "Parcel",
      text: "A Saturday morning. The doorbell rings, and Abbu comes back in carrying a box so heavily taped it could survive the end of the world. Every side is stamped LAHORE.",
    },
    introLines: [
      { who: "ammi", text: "{{دادی کا پارسل!}} Open it — she'll call any minute to check it arrived.", gloss: "dadi ka parcel — Dadi's parcel!" },
      { who: "guide", text: "Urdu has been in this family longer than English has. You know more of it than you think.", gloss: "Listen for it." },
      { who: "guide", text: "Quest: open the parcel from Lahore.", gloss: "Walk with ← → or A D. Press E near anything that glows. Or just click it." },
    ],
    beats: [
      {
        id: "parcel",
        quest: { v: "Open the parcel", hint: "By the stairs." },
        at: { room: "darwaza", hotspot: "parcel" },
        encounter: ["parcel", "aam", "badam"],
        lines: [
          { who: "guide", text: "Under three layers of tape: a dozen golden {{آم}} wrapped in newspaper, a bag of {{بادام}}, a jar of cardamom — and a page in Dadi's handwriting.", gloss: "aam — mangoes. badam — almonds." },
          { who: "ammi", text: "Chaunsa mangoes. The best. And that's her kheer recipe — she's never written it down for anyone before.", gloss: "The laptop is ringing in the kitchen." },
        ],
        culture: ["parcel", "mangoes"],
      },
      {
        id: "salam",
        quest: { v: "Answer Dadi's call", hint: "The laptop in the kitchen." },
        at: { room: "kitchen", hotspot: "laptop" },
        encounter: ["dadi", "salam"],
        lines: [
          { who: "you", text: "{{السلام علیکم، دادی!}}", gloss: "assalam-o-alaikum — “peace be upon you.” The greeting Ammi taught you." },
          { who: "dadi", text: "{{وعلیکم السلام، میری جان!}} Did the mangoes survive? Good. Now — we make kheer. Together.", gloss: "wa-alaikum assalam, meri jaan — and peace upon you, my life." },
        ],
        memory: "salam",
        nudges: { "kitchen:ammi": [{ who: "ammi", text: "Dadi's calling! The laptop — go!" }] },
      },
      {
        id: "fetch",
        quest: { v: "Find what the recipe needs", hint: "Ammi's reading it out." },
        at: { room: "kitchen", hotspot: "ammi" },
        lines: [{ who: "ammi", text: "Dadi's recipe says — well, you listen to her. I'll hand things out, you pass them to the counter.", gloss: "Dadi reads, very slowly, over the laptop." }],
        game: {
          type: "fetch",
          npc: "dadi",
          kicker: "Mini-game · کھیر",
          title: "Find what Dadi names.",
          hint: "Nothing on the counter is labelled. Listen for the word.",
          asks: [
            { wordId: "chawal", native: "پہلے چاول۔", roman: "pehle chawal.", english: "Rice first." },
            { wordId: "doodh", native: "دودھ — پورا ڈبا۔", roman: "doodh — poora dabba.", english: "Milk — the whole carton." },
            { wordId: "cheeni", native: "چینی۔", roman: "cheeni.", english: "Sugar." },
            { wordId: "ilaichi", native: "اور الائچی — میری بھیجی ہوئی!", roman: "aur ilaichi — meri bheji hui!", english: "And cardamom — the one I sent!" },
          ],
          items: [
            { wordId: "chawal", label: "Small grains", art: <Item kind="bag" color="#f4f4f0" /> },
            { wordId: "doodh", label: "Carton", art: Icon.milk },
            { wordId: "cheeni", label: "Tin", art: Icon.sugar },
            { wordId: "ilaichi", label: "Little jar", art: <Item kind="jar" color="#6a8a3a" accent="#c8d8a0" /> },
          ],
          done: { native: "شاباش!", roman: "shabash!", english: "Well done!" },
        },
        after: [{ who: "dadi", text: "Now to the stove. And you stir — don't let it stick. {{کھیر}} is all about patience.", gloss: "kheer — rice pudding." }],
        memory: "fetched",
        nudges: { "kitchen:laptop": [{ who: "dadi", text: "Ammi has the recipe — help her find everything." }] },
      },
      {
        id: "kheer",
        quest: { v: "Make Dadi's kheer", hint: "At the stove." },
        at: { room: "kitchen", hotspot: "stove" },
        encounter: ["kheer"],
        lines: [{ who: "dadi", text: "Soak the rice. Boil the milk. Rice in — and stir, stir, stir. Sugar and cardamom. Almonds on top. {{شروع کرو!}}", gloss: "shuru karo — start!" }],
        game: {
          type: "sequence",
          kicker: "Mini-game · دادی کی کھیر",
          title: "Make the kheer, in order.",
          hint: "Tap the steps in the order Dadi said.",
          steps: [
            { native: "چاول بھگوئیں", roman: "chawal bhigoein", english: "soak the rice", wordId: "chawal", art: soakCard },
            { native: "دودھ ابالیں", roman: "doodh ubalein", english: "boil the milk", wordId: "doodh", art: boilCard },
            { native: "چاول ڈال کر ہلاتے رہیں", roman: "chawal daal kar hilaate rahein", english: "add the rice and keep stirring", art: stirCard },
            { native: "چینی اور الائچی", roman: "cheeni aur ilaichi", english: "sugar and cardamom", wordId: "ilaichi", art: sweetCard },
            { native: "بادام سے سجائیں", roman: "badam se sajaein", english: "decorate with almonds", wordId: "badam", art: decorateCard },
          ],
          done: "An hour of stirring later: thick, creamy, smelling of cardamom. Ammi says it smells exactly like Lahore.",
        },
        culture: ["kheer"],
        memory: "kheer",
        nudges: { "kitchen:ammi": [{ who: "ammi", text: "The stove! Dadi is waiting to supervise." }] },
      },
    ],
    ending: {
      at: { room: "kitchen", hotspot: "laptop" },
      quest: { v: "Show Dadi the kheer", hint: "Hold a bowl up to the laptop." },
      lines: [{ who: "guide", text: "You hold a bowl up to the camera. Dadi leans so close to her screen that you can only see one eye." }],
      asker: "dadi",
      question: {
        native: "کھیر کیسی بنی؟",
        roman: "kheer kaisi bani?",
        english: "How did the kheer turn out?",
        choices: [
          { native: "بہت مزے دار!", roman: "bohat mazedaar!", english: "Really delicious!", right: true },
          { native: "السلام علیکم!", roman: "assalam-o-alaikum!", english: "Peace be upon you!", reply: [{ who: "dadi", text: "Wa-alaikum assalam again, jaan! But the kheer — how is it?" }] },
          { native: "دودھ۔", roman: "doodh.", english: "Milk.", reply: [{ who: "dadi", text: "Yes, there's milk IN it. How does it taste?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{بہت مزے دار!}}", gloss: "“Really delicious!”" },
        { who: "dadi", text: "{{ماشاءاللہ!}} Next time, you make it for me. In Lahore. This summer.", gloss: "mashallah — wonderful! (said with real pride)" },
        { who: "ammi", text: "She's crying a little. She'll say it's the onions. There are no onions." },
      ],
      encounter: ["mazedaar", "ammi"],
      memory: "mazedaar",
    },
    gates: [{ room: "darwaza", hotspot: "kitchen", until: "parcel", line: { who: "ammi", text: "Open the parcel first! She'll ask what was inside.", gloss: "Ammi points at the box." } }],
    idle: {
      "darwaza:parcel": [{ who: "guide", text: "The box is empty, except for newspaper from Lahore. Abbu is reading it." }],
      "kitchen:stove": [{ who: "guide", text: "The pot's clean. The kheer is in the fridge, setting. Nobody is allowed to touch it for an hour." }],
    },
    afterwards: {
      "kitchen:laptop": [{ who: "dadi", text: "This summer, you come to us. Dada will show you his pigeons. He talks to them more than he talks to me." }],
    },
    complete: {
      title: "The",
      em: "Parcel",
      text: "You opened the parcel from Lahore, greeted Dadi with salam, found the ingredients by ear, made her kheer step by step — and told her it was delicious, in Urdu.",
      quest: { v: "Eat a Chaunsa mango", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Bawarchikhana done={new Set(["kheer"])} />,
};

export default content;
