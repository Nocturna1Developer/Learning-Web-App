import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Ground, Item, FY } from "../scenes";
import { Walls, Door, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { Icon } from "../kit";
import { LKO, Haveli } from "./art";

/* HINDI · Chapter Three — रसोई, The Kitchen. Chachi's rotis are always round. Yours will be, eventually. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const kneadCard = card(<><path d="M6 50h68q-4 30 -34 30T6 50Z" fill="#c9cfd4" /><ellipse cx="40" cy="50" rx="34" ry="8" fill="#a8b0b8" /><ellipse cx="40" cy="48" rx="20" ry="9" fill="#e8d6b0" /></>);
const rollCard = card(<><circle cx="40" cy="56" r="24" fill="#e8d6b0" /><rect x="6" y="36" width="68" height="10" rx="5" fill="#b8864a" transform="rotate(-18 40 41)" /></>);
const tawaCard = card(<><ellipse cx="40" cy="60" rx="32" ry="10" fill="#2a2a2a" /><ellipse cx="40" cy="56" rx="22" ry="6" fill="#e8c890" /><rect x="68" y="56" width="10" height="6" fill="#2a2a2a" /></>);
const flameCard = card(<><path d="M20 76q-4 -16 10 -24q-2 10 6 12q-2 -16 10 -24q0 14 10 18q2 -8 6 -10q6 14 -2 28Z" fill="#3a6ab8" opacity="0.9" /><ellipse cx="40" cy="38" rx="24" ry="16" fill="#e8c890" /><path d="M26 34q14 -8 28 0" stroke="#c89a50" strokeWidth="3" fill="none" /></>);
const gheeCard = card(<><circle cx="40" cy="50" r="26" fill="#e8c890" /><path d="M28 44q12 10 24 0" stroke="#f0d060" strokeWidth="6" fill="none" opacity="0.8" /><circle cx="34" cy="56" r="3" fill="#b8864a" /><circle cx="50" cy="40" r="2.5" fill="#b8864a" /></>);

function Rasoi({ done }: { done: ReadonlySet<string> }) {
  const cooked = done.has("roti");
  return (
    <Stage>
      <Walls tint="#e8e0cc" floor="#a89478" floorLine="#887458" shade="#d4c8ae" />
      {/* steel utensils on open shelves */}
      {[260, 340].map((y) => <rect key={y} x={80} y={y} width="420" height="10" fill={WOOD} />)}
      {[110, 170, 240, 310, 380, 440].map((x, i) => <circle key={x} cx={x} cy={236 + (i % 2) * 4} r={18 + (i % 3) * 5} fill="#c9cfd4" stroke="#a8b0b8" strokeWidth="2" />)}
      {[120, 200, 280, 360, 440].map((x) => <rect key={x} x={x - 16} y={296} width="32" height="44" rx="4" fill="#b8c0c8" />)}
      {/* the counter, the stove */}
      <rect x={560} y={FY - 170} width="700" height="170" fill="#8a8078" />
      <rect x={550} y={FY - 184} width="720" height="18" fill="#5a524a" />
      <ellipse cx={900} cy={FY - 196} rx="70" ry="12" fill="#2a2a2a" />
      <rect x={970} y={FY - 200} width="40" height="8" fill="#2a2a2a" />
      <path d="M1080 564q-6 -14 4 -22q0 10 6 10q-2 -14 8 -20q2 12 8 14" fill="#3a6ab8" opacity="0.85" />
      {/* the steel aata tin, the brass ghee pot */}
      <rect x={640} y={FY - 250} width="80" height="66" rx="8" fill="#c9cfd4" />
      <path d={`M1160 ${FY - 184}q-24 -50 24 -60q48 10 24 60Z`} fill="#c99a3e" />
      {/* a stack of rotis in a cloth */}
      <ellipse cx={780} cy={FY - 190} rx="46" ry="10" fill="#e0c098" />
      {cooked && [0, 1, 2, 3].map((i) => <ellipse key={i} cx={780} cy={FY - 196 - i * 5} rx="40" ry="8" fill="#e8c890" stroke="#c89a50" />)}
      <path d={`M734 ${FY - 188}q46 12 92 0`} fill="#c0392b" />
      <Figure x={1340} y={FY} h={200} color="#2a1a12" flip />
      <Figure x={480} y={FY} h={190} color="#3a2a24" pose="sit" />
      <Door x={1440} open />
    </Stage>
  );
}

function Aangan({ done }: { done: ReadonlySet<string> }) {
  const lunch = done.has("roti");
  return (
    <Stage>
      <Sky id="hi3" top="#8ab8d8" bottom="#f4e6c8" />
      <Sun x={1200} y={120} r={46} color="#fbe0a0" />
      <Haveli x={-60} w={560} h={520} wall={LKO.wall[4]} />
      <Haveli x={1100} w={560} h={520} wall={LKO.wall[0]} />
      <rect x={500} y={FY - 440} width="600" height="440" fill={LKO.wall[1]} />
      <Ground color="#c8a878" line="#a88858" kind="stone" />
      {/* the hand pump */}
      <rect x={570} y={FY - 170} width="20" height="170" fill="#3f5a4a" />
      <path d="M580 590l70 -30" stroke="#3f5a4a" strokeWidth="10" strokeLinecap="round" />
      <rect x={540} y={FY - 20} width="80" height="20" fill="#8a8a8a" />
      {/* lunch on the floor: a long mat, steel thalis */}
      <rect x={760} y={FY - 20} width="460" height="24" fill="#b8452f" />
      {lunch && [800, 900, 1000, 1100, 1180].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={FY - 24} rx="36" ry="8" fill="#c9cfd4" />
          <circle cx={x - 10} cy={FY - 28} r="8" fill="#e8b040" />
          <ellipse cx={x + 12} cy={FY - 28} rx="10" ry="5" fill="#f4f2ec" />
        </g>
      ))}
      <Child x={380} y={FY} h={116} color="#2a1a12" />
      <Figure x={1300} y={FY} h={185} color="#2a1a12" pose="sit" flip />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "rasoi",
  speakers: {
    chachi: { name: "Chachi", glyph: "चा", tone: "guest" },
    anu: { name: "Anu", glyph: "अ", tone: "guest" },
  },
  rooms: {
    rasoi: {
      id: "rasoi",
      name: "Dadi's kitchen",
      native: "रसोई",
      art: (done) => <Rasoi done={done} />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "shelves", x: 280, y: 280, label: "Steel shelves", kind: "flavor", note: "Every pot, plate and tumbler in steel, stacked by size. Chachi knows exactly where each one is, in the dark." },
        { id: "dadi", x: 480, y: 580, label: "Dadi", kind: "npc" },
        { id: "aata", x: 680, y: 520, label: "Steel tin", kind: "word", wordId: "aata" },
        { id: "tawa", x: 900, y: 540, label: "The stove", kind: "quest" },
        { id: "ghee", x: 1160, y: 520, label: "Brass pot", kind: "word", wordId: "ghee" },
        { id: "chachi", x: 1340, y: 560, label: "Chachi", kind: "npc" },
        { id: "aangan", x: 1530, y: 560, label: "Courtyard", kind: "exit", to: "aangan" },
      ],
    },
    aangan: {
      id: "aangan",
      name: "The courtyard",
      native: "आँगन",
      art: (done) => <Aangan done={done} />,
      spawn: { left: 260, right: 1200 },
      hotspots: [
        { id: "rasoi", x: 70, y: 560, label: "Kitchen", kind: "exit", to: "rasoi" },
        { id: "anu", x: 380, y: 620, label: "A girl on the step", kind: "npc" },
        { id: "pump", x: 600, y: 560, label: "Hand pump", kind: "word", wordId: "paani" },
        { id: "mat", x: 990, y: 680, label: "The long mat", kind: "quest" },
        { id: "dadi", x: 1300, y: 580, label: "Dadi", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "तीसरा अध्याय · Hindi",
      title: "The",
      em: "Kitchen",
      text: "Dadi's house in Lucknow, where Chacha's family lives too. At noon the kitchen is the loudest room in the house, and the only one that smells like this.",
    },
    introLines: [
      { who: "dadi", text: "Today you learn rotis. {{चाची}} is the best in the family — don't tell your Maa I said so.", gloss: "Chachi — your dad's brother's wife." },
      { who: "guide", text: "Quest: make a roti. A round one, ideally.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "hello",
        quest: { v: "Help Chachi in the kitchen", hint: "She's at the far end of the counter." },
        at: { room: "rasoi", hotspot: "chachi" },
        encounter: ["rasoi", "chaachi"],
        lines: [
          { who: "chachi", text: "{{आओ, बेटा!}} Welcome to my {{रसोई}}. First: pass me what I ask for.", gloss: "aao, beta — come, child. rasoi — kitchen." },
        ],
        game: {
          type: "fetch",
          npc: "chachi",
          kicker: "Mini-game · रसोई",
          title: "Pass Chachi what she asks for.",
          hint: "Nothing is labelled. Listen for the word.",
          asks: [
            { wordId: "aata", native: "आटा दो।", roman: "aata do.", english: "Give me the flour." },
            { wordId: "paani", native: "थोड़ा पानी।", roman: "thoda paani.", english: "A little water." },
            { wordId: "ghee", native: "घी कहाँ है?", roman: "ghee kahaan hai?", english: "Where's the ghee?" },
            { wordId: "belan", native: "और बेलन!", roman: "aur belan!", english: "And the rolling pin!" },
          ],
          items: [
            { wordId: "aata", label: "Steel tin", art: <Item kind="jar" color="#c9cfd4" accent="#f4ecdd" /> },
            { wordId: "paani", label: "Jug", art: Icon.jug },
            { wordId: "ghee", label: "Brass pot", art: <Item kind="jar" color="#c99a3e" accent="#f0d060" /> },
            { wordId: "belan", label: "Wooden", art: <Item kind="long" color="#b8864a" /> },
          ],
          done: { native: "बहुत बढ़िया!", roman: "bahut badhiya!", english: "Excellent!" },
        },
        after: [{ who: "chachi", text: "The dough has to rest. Go and meet Anu — she's hiding in the courtyard, pretending not to be curious about you.", gloss: "Through the door on the right." }],
        memory: "kitchen",
        nudges: { "rasoi:dadi": [{ who: "dadi", text: "Chachi needs your hands. Go on." }] },
      },
      {
        id: "anu",
        quest: { v: "Meet your cousin Anu", hint: "In the courtyard." },
        at: { room: "aangan", hotspot: "anu" },
        encounter: ["behen"],
        lines: [
          { who: "anu", text: "You're the American cousin. I'm Anu. That makes me your {{बहन}}.", gloss: "behen — sister. In Hindi, cousins are brothers and sisters too." },
          { who: "anu", text: "Mummy's rotis are always round. Mine look like maps of India. Good luck.", gloss: "She's nine, and very honest." },
        ],
        nudges: { "rasoi:chachi": [{ who: "chachi", text: "The dough's resting. Go say hello to Anu first." }] },
      },
      {
        id: "roti",
        quest: { v: "Make a roti with Chachi", hint: "At the stove in the kitchen." },
        at: { room: "rasoi", hotspot: "tawa" },
        encounter: ["roti", "tawa", "aag"],
        lines: [
          { who: "chachi", text: "Knead. Roll with the {{बेलन}}. On the {{तवा}}. Then over the {{आग}} — watch it puff. Then ghee.", gloss: "belan — rolling pin. tawa — griddle. aag — flame." },
          { who: "chachi", text: "Now you. Slowly.", gloss: "She moves your hands on the rolling pin, round and round." },
        ],
        game: {
          type: "sequence",
          kicker: "Mini-game · रोटी",
          title: "Make a roti, in order.",
          hint: "Tap the steps in the order Chachi showed you.",
          steps: [
            { native: "आटा गूँधो", roman: "aata goondho", english: "knead the dough", wordId: "aata", art: kneadCard },
            { native: "बेलन से बेलो", roman: "belan se belo", english: "roll it out", wordId: "belan", art: rollCard },
            { native: "तवे पर डालो", roman: "tave par daalo", english: "onto the tawa", wordId: "tawa", art: tawaCard },
            { native: "आग पर फुलाओ", roman: "aag par phulaao", english: "puff it on the flame", wordId: "aag", art: flameCard },
            { native: "घी लगाओ", roman: "ghee lagaao", english: "brush on ghee", wordId: "ghee", art: gheeCard },
          ],
          done: "It puffed up like a balloon! Chachi claps. Anu, in the doorway, looks impressed despite herself.",
        },
        after: [{ who: "chachi", text: "Take them out to the courtyard — everyone's sitting down for lunch.", gloss: "A stack of rotis, wrapped in a cloth. Yours is on top." }],
        culture: ["roti"],
        memory: "roti",
        nudges: {
          "aangan:anu": [{ who: "anu", text: "Mummy's calling you. Go make your map." }],
          "rasoi:chachi": [{ who: "chachi", text: "The stove, beta. Come." }],
        },
      },
      {
        id: "lunch",
        quest: { v: "Bring the rotis to lunch", hint: "The long mat in the courtyard." },
        at: { room: "aangan", hotspot: "mat" },
        encounter: ["daal", "chaawal"],
        lines: [
          { who: "guide", text: "Everyone on the floor in a line: {{दाल}}, {{चावल}}, sabzi, and your rotis in the middle.", gloss: "daal — lentils. chaawal — rice." },
          { who: "dadi", text: "Nobody eats until everyone has a plate. {{सब बैठ गए?}} Then eat.", gloss: "sab baith gaye? — is everyone sitting?" },
        ],
        culture: ["chauka"],
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Dadi", hint: "She's holding up your roti." },
      lines: [{ who: "dadi", text: "Dadi picks your roti off the top of the pile and holds it up for everyone to see." }],
      asker: "dadi",
      question: {
        native: "तुम्हारी रोटी कैसी है?",
        roman: "tumhaari roti kaisi hai?",
        english: "How's your roti?",
        choices: [
          { native: "एकदम गोल!", roman: "ekdam gol!", english: "Perfectly round!", right: true },
          { native: "बहुत महँगा!", roman: "bahut mahanga!", english: "Too expensive!", reply: [{ who: "dadi", text: "Expensive? It's free, beta! We're not in the bazaar." }] },
          { native: "दाल", roman: "daal", english: "lentils", reply: [{ who: "anu", text: "That's the daal. She's asking about your ROTI." }] },
        ],
      },
      right: [
        { who: "you", text: "{{एकदम गोल!}}", gloss: "“Perfectly round!”" },
        { who: "anu", text: "…It's a bit like Sri Lanka, actually.", gloss: "Anu, squinting." },
        { who: "dadi", text: "{{गोल है।}} I say it's round. So it's round.", gloss: "gol hai — it's round. Dadi has the final word." },
      ],
      encounter: ["gol"],
      memory: "gol",
    },
    gates: [{ room: "rasoi", hotspot: "aangan", until: "hello", line: { who: "dadi", text: "Chachi first! She's been waiting for you.", gloss: "Dadi points to the counter." } }],
    idle: {
      "rasoi:chachi": [{ who: "chachi", text: "Tomorrow is Holi. Tonight we make gujiya — two hundred of them." }],
      "aangan:anu": [{ who: "anu", text: "Tomorrow I'm getting you with the pichkaari. Just so you know." }],
    },
    afterwards: {
      "aangan:dadi": [{ who: "dadi", text: "Tomorrow is Holi. Wear something old. Something very, very old." }],
      "aangan:anu": [{ who: "anu", text: "Fine. Your roti was round. Ish." }],
    },
    complete: {
      title: "The",
      em: "Kitchen",
      text: "You helped Chachi by ear, met your cousin Anu, rolled and puffed your first roti step by step — and told Dadi it was perfectly round.",
      quest: { v: "Have another roti", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Rasoi done={new Set(["roti"])} />,
};

export default content;
