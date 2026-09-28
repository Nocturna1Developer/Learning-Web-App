import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Item, FY } from "../scenes";
import { Walls, Door, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { Icon } from "../kit";
import { Galette, Crown } from "./art";

/* FRENCH · Chapter Four — La Galette des Rois. January in Lyon, and a porcelain secret baked into a cake. */

const slice = (plate: string): ReactNode => (
  <svg viewBox="0 0 80 90" aria-hidden="true">
    <ellipse cx="40" cy="62" rx="34" ry="12" fill={plate} />
    <path d="M18 58L40 30L62 58Z" fill="#e0a850" />
    <path d="M18 58h44" stroke="#b8762e" strokeWidth="4" />
    <path d="M26 50l28 0M32 42h16" stroke="#f2d8a0" strokeWidth="2" />
  </svg>
);

function WinterWindow({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x - 12} y={y - 12} width="324" height="264" fill="#f4efe4" />
      <rect x={x} y={y} width="300" height="240" fill="#1a2240" />
      {/* Lyon rooftops, and Fourvière lit up on its hill */}
      <path d={`M${x} ${y + 170}l40 -30h60l30 20h70l40 -40h60v90H${x}Z`} fill="#2a2e44" />
      <rect x={x + 180} y={y + 60} width="50" height="44" fill="#f4ecd8" />
      <rect x={x + 222} y={y + 44} width="12" height="60" fill="#f4ecd8" />
      <rect x={x + 176} y={y + 44} width="12" height="60" fill="#f4ecd8" />
      {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={x + 20 + ((i * 47) % 260)} cy={y + 20 + ((i * 29) % 120)} r="2.5" fill="#fff" opacity="0.8" />)}
      <line x1={x + 150} y1={y} x2={x + 150} y2={y + 240} stroke="#f4efe4" strokeWidth="8" />
    </g>
  );
}

function Cuisine() {
  return (
    <Stage>
      <Walls tint="#efe6d4" floor="#8a6a4a" floorLine="#6a4a2e" />
      <WinterWindow x={300} y={200} />
      <rect x={760} y={FY - 170} width="600" height="170" fill={WOOD} />
      <rect x={750} y={FY - 184} width="620" height="18" fill="#c8c0b0" />
      <rect x={1180} y={FY - 170} width="180" height="170" fill="#4a4a4e" />
      <rect x={1196} y={FY - 150} width="148" height="90" rx="6" fill="#f0a040" opacity="0.7" />
      <Galette x={940} y={FY - 200} r={70} />
      <Figure x={1080} y={FY} h={200} color="#2a1a12" />
      <Door x={40} open />
    </Stage>
  );
}

function Salle({ done }: { done: ReadonlySet<string> }) {
  const set = done.has("table");
  const cut = done.has("parts");
  return (
    <Stage>
      <Walls tint="#e8dcc8" floor="#7a5a3a" floorLine="#5a3a22" shade="#d4c6ae" />
      <WinterWindow x={140} y={190} />
      {/* the sideboard */}
      <rect x={1180} y={FY - 200} width="300" height="200" fill={WOOD} />
      <rect x={1196} y={FY - 184} width="130" height="170" fill="#6b4429" />
      <rect x={1334} y={FY - 184} width="130" height="170" fill="#6b4429" />
      {/* the round table, with its long cloth hanging to the floor */}
      <ellipse cx={800} cy={FY - 180} rx="300" ry="40" fill="#f4f0e6" />
      <path d={`M500 ${FY - 180}v176q300 30 600 0v-176Z`} fill="#f4f0e6" />
      <path d={`M500 ${FY - 180}q300 50 600 0`} stroke="#3a5a9a" strokeWidth="6" fill="none" />
      {set && (
        <>
          <Galette x={800} y={FY - 196} r={80} cut={cut} />
          {!cut && <Crown x={800} y={FY - 230} s={0.8} />}
          {[560, 660, 940, 1040].map((x) => <ellipse key={x} cx={x} cy={FY - 184} rx="36" ry="9" fill="#dfe8ee" stroke="#a8b0b8" />)}
        </>
      )}
      <Figure x={440} y={FY} h={190} color="#2a1a12" pose="sit" />
      <Figure x={1160} y={FY} h={195} color="#2a1a12" pose="sit" flip />
      <Child x={600} y={FY - 30} h={100} color="#3a2a24" />
      <Child x={1000} y={FY - 30} h={112} color="#3a2a24" flip />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "cuisine",
  speakers: {
    lea: { name: "Léa", glyph: "L", tone: "guest" },
    hugo: { name: "Hugo", glyph: "H", tone: "guest" },
  },
  rooms: {
    cuisine: {
      id: "cuisine",
      name: "Mamie's kitchen",
      native: "la cuisine",
      art: <Cuisine />,
      spawn: { left: 300, right: 1100 },
      hotspots: [
        { id: "salle", x: 130, y: 560, label: "Dining room", kind: "exit", to: "salle" },
        { id: "window", x: 450, y: 320, label: "Window", kind: "flavor", note: "Snow on the rooftops of Lyon, and Fourvière glowing white on its hill.", culture: "fourviere" },
        { id: "galette", x: 940, y: 540, label: "The galette", kind: "quest" },
        { id: "mamie", x: 1080, y: 560, label: "Mamie", kind: "npc" },
        { id: "oven", x: 1270, y: 620, label: "Oven", kind: "flavor", note: "Still warm. The whole flat smells of butter and almonds." },
      ],
    },
    salle: {
      id: "salle",
      name: "Dining room",
      native: "la salle à manger",
      art: (done) => <Salle done={done} />,
      spawn: { left: 300, right: 1300 },
      hotspots: [
        { id: "papi", x: 440, y: 580, label: "Papi", kind: "npc" },
        { id: "lea", x: 600, y: 620, label: "Léa", kind: "npc" },
        { id: "table", x: 800, y: 600, label: "The table", kind: "quest" },
        { id: "hugo", x: 1000, y: 620, label: "Hugo", kind: "word", wordId: "cousin" },
        { id: "sideboard", x: 1330, y: 600, label: "Sideboard", kind: "word", wordId: "assiettes" },
        { id: "cuisine", x: 1530, y: 560, label: "Kitchen", kind: "exit", to: "cuisine" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Chapitre quatre · French",
      title: "La Galette",
      em: "des Rois",
      text: "January. You're back in Lyon, and it's snowing on the rooftops. Mamie has just taken something golden out of the oven, and she's smiling like she knows a secret. She does.",
    },
    introLines: [
      { who: "mamie", text: "{{Viens voir !}} Come and see what I made.", gloss: "Viens voir — come and see!" },
      { who: "guide", text: "Quest: find out who gets the fève.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "galette",
        quest: { v: "See what Mamie made", hint: "On the kitchen counter." },
        at: { room: "cuisine", hotspot: "galette" },
        encounter: ["galette", "feve"],
        lines: [
          { who: "mamie", text: "{{La galette des rois.}} Puff pastry, almond cream — and hidden inside, one little {{fève}}.", gloss: "Galette des rois — the kings' cake, for Epiphany. Fève — a tiny porcelain charm." },
          { who: "mamie", text: "Whoever finds the fève in their slice is king — or queen — for the day. Now, help Papi set the table.", gloss: "Through the door on the left." },
        ],
        culture: ["galette"],
        nudges: { "salle:papi": [{ who: "papi", text: "Has Mamie shown you the galette? Go look, go look." }] },
      },
      {
        id: "table",
        quest: { v: "Set the table with Papi", hint: "In the dining room." },
        at: { room: "salle", hotspot: "papi" },
        lines: [{ who: "papi", text: "I'll call, you fetch. Quick — the cousins are hungry, and so am I.", gloss: "Papi, already sitting down." }],
        game: {
          type: "fetch",
          npc: "papi",
          kicker: "Mini-game · La table",
          title: "Pass Papi what he asks for.",
          hint: "Nothing is labelled. Listen for the word.",
          asks: [
            { wordId: "assiettes", native: "Les assiettes, s'il te plaît.", roman: "Les assiettes, s'il te plaît.", english: "The plates, please." },
            { wordId: "couteau", native: "Un grand couteau.", roman: "Un grand couteau.", english: "A big knife." },
            { wordId: "couronne", native: "La couronne ! On n'oublie pas la couronne.", roman: "La couronne ! On n'oublie pas la couronne.", english: "The crown! Never forget the crown." },
            { wordId: "galette", native: "Et la galette, bien sûr.", roman: "Et la galette, bien sûr.", english: "And the galette, of course." },
          ],
          items: [
            { wordId: "assiettes", label: "A stack", art: Icon.bowl },
            { wordId: "couteau", label: "Sharp", art: <Item kind="long" color="#a8b0b8" /> },
            { wordId: "couronne", label: "Gold paper", art: <svg viewBox="0 0 80 90" aria-hidden="true"><Crown x={40} y={62} s={0.9} /></svg> },
            { wordId: "galette", label: "Golden", art: <svg viewBox="0 0 80 90" aria-hidden="true"><Galette x={40} y={56} r={32} /></svg> },
          ],
          done: { native: "À table !", roman: "À table !", english: "Dinner's on!" },
        },
        after: [{ who: "papi", text: "Now — who's the youngest? The youngest goes under the table. It's the rule.", gloss: "Everyone looks at you." }],
        memory: "set",
        nudges: { "cuisine:mamie": [{ who: "mamie", text: "Papi's setting the table. Go help — he'll forget the crown." }] },
      },
      {
        id: "cousins",
        quest: { v: "Say hello to your cousins", hint: "Léa is by the table." },
        at: { room: "salle", hotspot: "lea" },
        encounter: ["cousin", "cousine"],
        lines: [
          { who: "lea", text: "I'm Léa — your {{cousine}}. That's Hugo, your {{cousin}}. He's ten and he thinks he's hilarious.", gloss: "Cousine — a girl cousin. Cousin — a boy cousin. French makes you choose." },
          { who: "hugo", text: "I AM hilarious. And you're younger than me, so you're under the table. Sorry. Not sorry.", gloss: "Hugo." },
        ],
        culture: ["table"],
        nudges: { "salle:table": [{ who: "guide", text: "Say hello to the cousins first." }] },
      },
      {
        id: "parts",
        quest: { v: "Call out the slices", hint: "Under the table." },
        at: { room: "salle", hotspot: "table" },
        encounter: ["part", "pourqui"],
        lines: [
          { who: "guide", text: "Under the tablecloth it's dark and warm and full of knees. Above you, Papi cuts the first {{part}}.", gloss: "Part — a slice, a share." },
          { who: "papi", text: "{{C'est pour qui ?}}", gloss: "Who is it for? You can't see which slice has the fève — that's the point." },
        ],
        game: {
          type: "place",
          board: "table",
          kicker: "Mini-game · Sous la table",
          title: "Who gets which slice?",
          hint: "Pick a slice, then the person you call out for it. You're under the table — you can only go by voice.",
          tray: "Papi's knife",
          done: "Every slice has a name. Nobody could have cheated.",
          items: [
            { wordId: "mamie", who: "The first slice", hint: "The cook always gets the first one.", art: slice("#dfe8ee"), tint: "#e8d4c8" },
            { wordId: "papi", who: "The second slice", hint: "He's been waiting since noon.", art: slice("#e8e0f0"), tint: "#d8d4e8" },
            { wordId: "cousine", who: "The third slice", hint: "The voice that said “your cousine.”", art: slice("#f0e8d8"), tint: "#f0dcc8" },
            { wordId: "cousin", who: "The fourth slice", hint: "The voice that thinks it's hilarious.", art: slice("#e0ecd8"), tint: "#d8e8cc" },
          ],
        },
        after: [{ who: "papi", text: "And the last one — for the one under the table. Come out!", gloss: "Everyone takes a careful bite." }],
        memory: "parts",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer the table", hint: "Somebody bit something hard." },
      lines: [{ who: "guide", text: "Crunch. Something small and hard, right in your slice. Everyone stops chewing and stares." }],
      asker: "papi",
      question: {
        native: "Qui a la fève ?",
        roman: "Qui a la fève ?",
        english: "Who has the fève?",
        choices: [
          { native: "C'est moi !", roman: "C'est moi !", english: "It's me!", right: true },
          { native: "C'est pour Papi.", roman: "C'est pour Papi.", english: "It's for Papi.", reply: [{ who: "hugo", text: "No way — it's in YOUR mouth! Say it!" }] },
          { native: "Ce sera tout, merci.", roman: "Ce sera tout, merci.", english: "That will be all, thanks.", reply: [{ who: "lea", text: "This isn't the market! Who found the fève?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{C'est moi !}}", gloss: "“It's me!” You hold up a tiny porcelain rabbit." },
        { who: "papi", text: "He puts the paper {{couronne}} on your head. {{Vive le roi !}} …{{Vive la reine !}} …Vive whoever you like!", gloss: "Long live the king! The queen! You!" },
        { who: "mamie", text: "And now the royal duty: you choose who wears the second crown. Choose wisely — Hugo is sulking.", gloss: "Mamie started collecting fèves in 1962. She has four hundred." },
      ],
      encounter: ["moi", "couronne"],
      memory: "feve",
    },
    gates: [{ room: "cuisine", hotspot: "salle", until: "galette", line: { who: "mamie", text: "Wait — come and see what I made first!", gloss: "Mamie is standing proudly by the counter." } }],
    idle: {
      "cuisine:mamie": [{ who: "mamie", text: "I made two galettes. Hugo doesn't know about the second one yet." }],
      "salle:lea": [{ who: "lea", text: "Next year I'm the youngest again. No — wait. I'm not. Oh no." }],
    },
    afterwards: {
      "salle:papi": [{ who: "papi", text: "Tonight, after dinner, I'll show you the fable I learned at school. Seventy years, and I still know every word." }],
      "salle:lea": [{ who: "lea", text: "You can keep the crown on at dinner. That's the rule. Hugo hates the rule." }],
    },
    complete: {
      title: "La Galette",
      em: "des Rois",
      text: "You set the table by ear, met your cousine and your cousin, called out every slice from under the table — and found the fève yourself.",
      quest: { v: "Wear the crown to dinner", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Salle done={new Set(["table"])} />,
};

export default content;
