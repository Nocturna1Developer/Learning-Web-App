import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Table, Item, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { Icon } from "../kit";
import { Samovar, Matryoshka } from "./art";

/* RUSSIAN · Chapter One — Блины. Babushka has flown in from St. Petersburg, and the first blin is always a lump. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const mixCard = card(<><path d="M6 46h68q-4 32 -34 32T6 46Z" fill="#dfe8ee" /><ellipse cx="40" cy="46" rx="34" ry="8" fill="#f2e2b0" /><path d="M52 20l-10 30" stroke="#8a8a8e" strokeWidth="4" /></>);
const pourCard = card(<><ellipse cx="40" cy="66" rx="30" ry="8" fill="#2a2a2e" /><rect x="68" y="62" width="12" height="6" fill="#2a2a2e" /><path d="M30 20q10 6 10 30" stroke="#f2e2b0" strokeWidth="6" fill="none" /><ellipse cx="40" cy="62" rx="18" ry="4" fill="#f2e2b0" /></>);
const flipCard = card(<><ellipse cx="40" cy="74" rx="30" ry="8" fill="#2a2a2e" /><ellipse cx="40" cy="30" rx="24" ry="8" fill="#e8c070" transform="rotate(-18 40 30)" /><path d="M20 58q-10 -20 6 -34M60 58q10 -20 -6 -34" stroke="#c8c0b0" strokeWidth="2" fill="none" strokeDasharray="3 4" /></>);
const creamCard = card(<><circle cx="40" cy="52" r="28" fill="#e8c070" /><ellipse cx="40" cy="50" rx="14" ry="10" fill="#f8f4ec" /></>);
const rollCard = card(<><rect x="14" y="44" width="52" height="22" rx="11" fill="#e8c070" /><path d="M24 44q6 11 0 22M40 44q6 11 0 22M56 44q6 11 0 22" stroke="#c89a50" strokeWidth="2" fill="none" /></>);

function Prikhozhaya({ done }: { done: ReadonlySet<string> }) {
  const open = done.has("chemodan");
  return (
    <Stage>
      <Walls tint="#ece6da" />
      <Door x={40} open />
      <PhotoFrame x={300} y={240} w={120} h={140} tint="#2d4a8a" />
      <PhotoFrame x={450} y={270} w={150} h={110} tint="#b8453a" two />
      <Window x={680} y={220} w={260} h={200} />
      {/* a fur hat on the coat hook, in June */}
      <rect x={1000} y={250} width="200" height="14" fill={WOOD} />
      <ellipse cx={1060} cy={290} rx="40" ry="26" fill="#6a5040" />
      <path d="M1140 264v120q10 20 20 0v-110" fill="#2d4a8a" />
      <rect x={1180} y={FY - 150} width="190" height="150" rx="12" fill="#8a2a2a" />
      <rect x={1190} y={FY - 140} width="170" height="130" rx="8" fill="none" stroke="#6a1a1a" strokeWidth="3" />
      {open && (
        <>
          <path d={`M1180 ${FY - 150}l30 -80h130l30 80`} fill="#9a3a3a" />
          <rect x={1210} y={FY - 184} width="36" height="44" rx="6" fill="#b8253f" />
          <rect x={1206} y={FY - 190} width="44" height="10" fill="#e8dcc8" />
          <Matryoshka x={1310} y={FY - 150} s={0.6} />
        </>
      )}
      <Figure x={880} y={FY} h={195} color="#2a1a12" flip />
      <Figure x={620} y={FY} h={210} color="#3a2a24" />
      <Child x={560} y={FY} h={104} color="#3a2a24" />
      <Door x={1420} open />
    </Stage>
  );
}

function Kukhnya({ done }: { done: ReadonlySet<string> }) {
  const cooked = done.has("blini");
  return (
    <Stage>
      <Walls tint="#f0e8d8" floor="#9a8a70" floorLine="#7a6a50" shade="#dcd0b8" />
      <Window x={380} y={200} w={280} h={210} />
      <rect x={80} y={FY - 400} width="200" height="400" rx="10" fill="#e8ecee" />
      <rect x={250} y={FY - 330} width="10" height="80" rx="4" fill="#a8b0b8" />
      <rect x={980} y={FY - 170} width="440" height="170" fill={WOOD} />
      <rect x={970} y={FY - 184} width="460" height="18" fill="#8a8078" />
      <ellipse cx={1150} cy={FY - 192} rx="60" ry="10" fill="#2a2a2e" />
      <rect x={1210} y={FY - 196} width="50" height="8" fill="#2a2a2e" />
      <Table x={480} w={420} cloth="#f4f0e6" />
      <path d={`M480 ${FY - 150}h420`} stroke="#b8453a" strokeWidth="6" strokeDasharray="10 8" />
      <Samovar x={820} y={FY - 150} s={0.9} />
      {cooked && (
        <>
          {Array.from({ length: 7 }, (_, i) => <ellipse key={i} cx={600} cy={FY - 156 - i * 4} rx="48" ry="8" fill="#e8c070" stroke="#c89a50" />)}
          <path d={`M680 ${FY - 150}h40l-4 -22h-32Z`} fill="#f8f4ec" />
          <rect x={560} y={FY - 216} width="30" height="20" rx="8" fill="#9a8a70" opacity="0.8" />
        </>
      )}
      <Figure x={1300} y={FY} h={195} color="#2a1a12" flip />
      <Figure x={420} y={FY} h={210} color="#3a2a24" />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "prikhozhaya",
  rooms: {
    prikhozhaya: {
      id: "prikhozhaya",
      name: "Front hall",
      native: "прихожая",
      art: (done) => <Prikhozhaya done={done} />,
      spawn: { left: 300, right: 1300 },
      hotspots: [
        { id: "door", x: 130, y: 560, label: "Front door", kind: "word", wordId: "dom" },
        { id: "photos", x: 440, y: 320, label: "Family photos", kind: "word", wordId: "semya" },
        { id: "papa", x: 620, y: 560, label: "Papa", kind: "word", wordId: "papa" },
        { id: "babushka", x: 880, y: 560, label: "Babushka", kind: "npc" },
        { id: "hat", x: 1060, y: 290, label: "Fur hat", kind: "flavor", note: "A fur hat — an ushanka — on the hook. It's June. Babushka says you never know." },
        { id: "chemodan", x: 1275, y: 640, label: "Babushka's suitcase", kind: "quest" },
        { id: "kukhnya", x: 1510, y: 560, label: "Kitchen", kind: "exit", to: "kukhnya" },
      ],
    },
    kukhnya: {
      id: "kukhnya",
      name: "Kitchen",
      native: "кухня",
      art: (done) => <Kukhnya done={done} />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "prikhozhaya", x: 70, y: 580, label: "Front hall", kind: "exit", to: "prikhozhaya" },
        { id: "fridge", x: 180, y: 480, label: "Fridge", kind: "word", wordId: "moloko" },
        { id: "mama", x: 420, y: 560, label: "Mama", kind: "word", wordId: "mama" },
        { id: "samovar", x: 820, y: 520, label: "Samovar", kind: "flavor", note: "Babushka's samovar, brass and enormous. Tea comes in a glass inside a metal holder, with a spoonful of jam instead of sugar.", culture: "chai" },
        { id: "skovoroda", x: 1150, y: 540, label: "The stove", kind: "quest" },
        { id: "babushka", x: 1300, y: 560, label: "Babushka", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Глава первая · Russian",
      title: "Babushka's",
      em: "Blini",
      text: "Papa has just come back from the airport. Babushka is here — from St. Petersburg, for the whole summer — with two suitcases, a fur hat, and very firm opinions about pancakes.",
    },
    introLines: [
      { who: "babushka", text: "{{Привет, моё солнышко!}} Come here, let me look at you!", gloss: "privet, moyo solnyshko — hi, my little sun!" },
      { who: "guide", text: "Russian has been in this family longer than English has. You know more of it than you think.", gloss: "Listen for it." },
      { who: "guide", text: "Quest: welcome Babushka properly. Start by talking to her.", gloss: "Walk with ← → or A D. Press E near anything that glows. Or just click it." },
    ],
    beats: [
      {
        id: "privet",
        quest: { v: "Greet Babushka", hint: "She's in the middle of the hall." },
        at: { room: "prikhozhaya", hotspot: "babushka" },
        encounter: ["babushka", "privet"],
        lines: [
          { who: "guide", text: "Three kisses: left cheek, right cheek, left again. Then a hug that squeezes the air out of you.", gloss: "Three is the Russian number for kisses." },
          { who: "babushka", text: "{{Как ты вырос… выросла…}} So tall! Now — my {{чемодан}}. I brought presents.", gloss: "“How you've grown” — Babushka can't decide on the grammar. Chemodan — suitcase." },
        ],
        memory: "privet",
      },
      {
        id: "chemodan",
        quest: { v: "Open Babushka's suitcase", hint: "By the stairs." },
        at: { room: "prikhozhaya", hotspot: "chemodan" },
        encounter: ["chemodan", "varenye"],
        lines: [
          { who: "guide", text: "Under the sweaters: three jars of raspberry {{варенье}} and a painted wooden doll with a doll inside, and another inside that.", gloss: "varen'ye — jam. The doll is a matryoshka." },
          { who: "babushka", text: "The jam is from our dacha. It's for the {{блины}}. To the kitchen!", gloss: "bliny — thin pancakes." },
        ],
        culture: ["matryoshka"],
        nudges: { "prikhozhaya:babushka": [{ who: "babushka", text: "The suitcase, солнышко. The presents are in there." }] },
      },
      {
        id: "batter",
        quest: { v: "Help Babushka with the batter", hint: "In the kitchen." },
        at: { room: "kukhnya", hotspot: "babushka" },
        lines: [{ who: "babushka", text: "My mother's recipe. Pass me what I ask for — {{быстро!}}", gloss: "bystro — quick!" }],
        game: {
          type: "fetch",
          npc: "babushka",
          kicker: "Mini-game · Тесто",
          title: "Pass Babushka what she asks for.",
          hint: "Nothing on the counter is labelled. Listen for the word.",
          asks: [
            { wordId: "muka", native: "Сначала мука.", roman: "snachala muka.", english: "First, the flour." },
            { wordId: "yaytsa", native: "Яйца, осторожно!", roman: "yaytsa, ostorozhno!", english: "The eggs — careful!" },
            { wordId: "moloko", native: "Молоко.", roman: "moloko.", english: "The milk." },
            { wordId: "sakhar", native: "И немного сахара.", roman: "i nemnogo sakhara.", english: "And a little sugar." },
          ],
          items: [
            { wordId: "muka", label: "Paper bag", art: <Item kind="bag" color="#f2ece0" /> },
            { wordId: "yaytsa", label: "Fragile", art: <Item kind="round" color="#e8d8b8" /> },
            { wordId: "moloko", label: "Carton", art: Icon.milk },
            { wordId: "sakhar", label: "Tin", art: Icon.sugar },
          ],
          done: { native: "Молодец!", roman: "molodets!", english: "Well done!" },
        },
        after: [{ who: "babushka", text: "Now the {{сковорода}}. Hot — very hot. Come to the stove.", gloss: "skovoroda — frying pan." }],
        memory: "batter",
        nudges: { "prikhozhaya:babushka": [{ who: "babushka", text: "{{На кухню!}} The blini won't make themselves.", gloss: "na kukhnyu — to the kitchen!" }] },
      },
      {
        id: "blini",
        quest: { v: "Make blini", hint: "At the stove." },
        at: { room: "kukhnya", hotspot: "skovoroda" },
        encounter: ["skovoroda"],
        lines: [
          { who: "babushka", text: "Mix. Pour a thin layer. Flip. Sour cream. Roll it up. {{Давай!}}", gloss: "davay — go on!" },
          { who: "guide", text: "The first one sticks to the pan and comes out in a lump.", gloss: "Babushka laughs. {{Первый блин комом!}} — “the first blin is always a lump.”" },
        ],
        game: {
          type: "sequence",
          kicker: "Mini-game · Блины",
          title: "Make a blin, in order.",
          hint: "Tap the steps in the order Babushka showed you.",
          steps: [
            { native: "Смешать тесто", roman: "smeshat' testo", english: "mix the batter", wordId: "muka", art: mixCard },
            { native: "Налить на сковороду", roman: "nalit' na skovorodu", english: "pour into the pan", wordId: "skovoroda", art: pourCard },
            { native: "Перевернуть блин", roman: "perevernut' blin", english: "flip the blin", wordId: "blin", art: flipCard },
            { native: "Намазать сметаной", roman: "namazat' smetanoy", english: "spread with sour cream", wordId: "smetana", art: creamCard },
            { native: "Свернуть", roman: "svernut'", english: "roll it up", art: rollCard },
          ],
          done: "The second one is perfect: thin, golden, lacy at the edges. Babushka claps. The first one goes to the cat.",
        },
        after: [{ who: "babushka", text: "At the end of winter we eat them all week for {{Масленица}} — round and golden, like the sun coming back after winter.", gloss: "Maslenitsa — Butter Week." }],
        culture: ["pervyblin", "maslenitsa"],
        memory: "blini",
        nudges: { "kukhnya:babushka": [{ who: "babushka", text: "The stove, солнышко. The pan's hot." }] },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Babushka", hint: "She's holding the pan." },
      lines: [{ who: "babushka", text: "You've eaten three already. Babushka is pouring the next one and raising one eyebrow at you." }],
      asker: "babushka",
      question: {
        native: "Ещё блинчик?",
        roman: "yeshchyo blinchik?",
        english: "Another little blin?",
        choices: [
          { native: "Да, пожалуйста!", roman: "da, pozhaluysta!", english: "Yes, please!", right: true },
          { native: "Привет!", roman: "privet!", english: "Hi!", reply: [{ who: "babushka", text: "Привет, привет! But do you want another blin?" }] },
          { native: "Молоко.", roman: "moloko.", english: "Milk.", reply: [{ who: "babushka", text: "Milk is IN the blin. Another one — yes or no?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{Да, пожалуйста!}}", gloss: "“Yes, please!”" },
        { who: "babushka", text: "{{Умница!}} Take two. With jam this time.", gloss: "umnitsa — clever one!" },
        { who: "guide", text: "An American kitchen, a Russian samovar, and a whole summer of blini ahead." },
      ],
      encounter: ["pozhaluysta", "blin"],
      memory: "pozhaluysta",
    },
    gates: [{ room: "prikhozhaya", hotspot: "kukhnya", until: "chemodan", line: { who: "babushka", text: "Wait — the presents first!", gloss: "Babushka points at her suitcase." } }],
    idle: {
      "prikhozhaya:chemodan": [{ who: "guide", text: "The suitcase is empty, except for a bag of sunflower seeds and a very old tram ticket." }],
      "kukhnya:skovoroda": [{ who: "guide", text: "The pan's still warm. There's batter for about forty more." }],
    },
    afterwards: {
      "kukhnya:babushka": [{ who: "babushka", text: "Next summer you come to us. To the dacha. Dedushka has been planting strawberries just for you." }],
    },
    complete: {
      title: "Babushka's",
      em: "Blini",
      text: "You greeted Babushka with three kisses, unpacked jam and a matryoshka, made the batter by ear, survived the first lumpy blin — and asked for another, politely, in Russian.",
      quest: { v: "Have tea from the samovar", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Kukhnya done={new Set(["blini"])} />,
};

export default content;
