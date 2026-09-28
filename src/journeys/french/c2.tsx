import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Clouds, Hills, Ground, Item, FY } from "../scenes";
import { Figure } from "../../components/scenes/primitives";
import { FR, StoneCottage, Platane, Fontaine, Boules, Boule, Baguette } from "./art";

/* FRENCH · Chapter Two — Le Village. Summer in Mamie and Papi's village of golden stone. */

function Place({ done }: { done: ReadonlySet<string> }) {
  const cyclist = done.has("petanque");
  return (
    <Stage>
      <Sky id="fr2a" top="#7ab0dc" mid="#b8d4e6" bottom="#f4ead4" />
      <Sun x={1420} y={110} r={44} color="#fbe6b0" />
      <Clouds seed={11} opacity={0.5} y={140} />
      <Hills y={440} color="#8aa86a" amp={50} seed={4} opacity={0.8} />
      {/* the church and its bell tower */}
      <rect x={640} y={220} width="120" height="300" fill={FR.doree[1]} />
      <path d="M640 220l60 -90l60 90Z" fill={FR.tile} />
      <rect x={684} y={260} width="32" height="44" rx="16" fill="#3a3a3a" />
      <StoneCottage x={-30} w={380} h={320} />
      <StoneCottage x={820} w={360} h={300} stone={FR.doree[2]} shutter={FR.shutter[1]} />
      {/* the boulangerie */}
      <rect x={1200} y={FY - 340} width="420" height="340" fill={FR.doree[0]} />
      <rect x={1220} y={FY - 180} width="380" height="180" fill="#8a2a2a" />
      <rect x={1240} y={FY - 160} width="220" height="140" fill="#f2e8d0" opacity="0.85" />
      <rect x={1220} y={FY - 230} width="380" height="44" fill="#6a1e1e" />
      <text x={1410} y={FY - 200} textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="26" letterSpacing="4" fill="#e8c25a">BOULANGERIE</text>
      {[1270, 1320, 1370, 1420].map((x) => <Baguette key={x} x={x} y={FY - 90} s={0.5} rot={-70} />)}
      <Ground color="#c8b48a" line="#a8946a" kind="dirt" />
      <Platane x={420} h={420} />
      <Fontaine x={640} />
      <Figure x={330} y={FY} h={190} color="#2a1a12" pose="sit" />
      <rect x={290} y={FY - 60} width="120" height="10" fill="#6b4429" />
      <Figure x={1520} y={FY} h={200} color="#3a2a24" flip />
      {cyclist && (
        <g>
          <circle cx={960} cy={FY - 36} r="34" fill="none" stroke="#2a2a2e" strokeWidth="5" />
          <circle cx={1080} cy={FY - 36} r="34" fill="none" stroke="#2a2a2e" strokeWidth="5" />
          <path d="M960 724l50 -60h50l20 60M1010 664l-10 -30" stroke="#b8452f" strokeWidth="6" fill="none" />
          <Figure x={1040} y={FY - 30} h={170} color="#2a1a12" />
        </g>
      )}
    </Stage>
  );
}

function Terrain() {
  return (
    <Stage>
      <Sky id="fr2b" top="#7ab0dc" bottom="#f4ead4" />
      <Hills y={460} color="#8aa86a" amp={60} seed={9} />
      <StoneCottage x={1180} w={440} h={320} stone={FR.doree[1]} shutter={FR.shutter[2]} />
      <Ground color="#d8c8a0" line="#b8a880" kind="sand" />
      <Platane x={200} h={440} />
      <Platane x={760} h={460} />
      <Boules x={600} />
      <Figure x={420} y={FY} h={200} color="#2a1a12" />
      <Figure x={900} y={FY} h={205} color="#3a2a24" pose="reach" flip />
      <Figure x={1040} y={FY} h={190} color="#2a1a12" pose="sit" />
      <rect x={1000} y={FY - 60} width="140" height="10" fill="#6b4429" />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "place",
  speakers: {
    roux: { name: "Madame Roux", glyph: "R", tone: "guest" },
    bernard: { name: "Monsieur Bernard", glyph: "B", tone: "guest" },
    cycliste: { name: "A cyclist", glyph: "C", tone: "guest" },
  },
  rooms: {
    place: {
      id: "place",
      name: "The village square",
      native: "la place du village",
      art: (done) => <Place done={done} />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "terrain", x: 70, y: 580, label: "Pétanque ground", kind: "exit", to: "terrain" },
        { id: "papi", x: 330, y: 580, label: "Papi", kind: "npc" },
        { id: "fontaine", x: 640, y: 620, label: "Fountain", kind: "word", wordId: "fontaine" },
        { id: "clocher", x: 700, y: 280, label: "Bell tower", kind: "flavor", note: "Twelve bongs for noon. Then, a minute later, twelve more — for anyone who wasn't listening the first time.", culture: "clocher" },
        { id: "houses", x: 1000, y: 560, label: "Golden stone", kind: "word", wordId: "village" },
        { id: "cyclist", x: 1040, y: 560, label: "A lost cyclist", kind: "npc", after: "petanque" },
        { id: "boulangerie", x: 1410, y: 600, label: "Boulangerie", kind: "npc" },
      ],
    },
    terrain: {
      id: "terrain",
      name: "Under the plane trees",
      native: "le terrain de boules",
      art: <Terrain />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "boules", x: 600, y: 700, label: "The game", kind: "quest" },
        { id: "bernard", x: 900, y: 560, label: "Monsieur Bernard", kind: "npc" },
        { id: "platane", x: 760, y: 360, label: "Plane tree", kind: "flavor", note: "A plane tree, its bark peeling in patches like a map. Every square in the south of France has a row of them, and a bench under each one." },
        { id: "place", x: 1530, y: 580, label: "Back to the square", kind: "exit", to: "place" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Chapitre deux · French",
      title: "Le",
      em: "Village",
      text: "Summer. You've flown to France to stay with Mamie and Papi in their village in the hills west of Lyon — golden stone houses, one bakery, one fountain, and a church bell that rings everything twice.",
    },
    introLines: [
      { who: "papi", text: "{{Ah, te voilà !}} Just in time. We need bread, and the bakery closes at noon.", gloss: "“There you are!” Papi, from his bench by the fountain." },
      { who: "guide", text: "Quest: bring the bread home — and then go and help Papi win.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "papi",
        quest: { v: "Talk to Papi", hint: "On the bench under the plane tree." },
        at: { room: "place", hotspot: "papi" },
        encounter: ["papi", "village", "toutdroit", "gauche", "droite"],
        lines: [
          { who: "papi", text: "Welcome to the {{village}}. Mamie was born in that house. I was born in the next {{village}} — she still holds it against me.", gloss: "Papi — grandpa. The stone is golden: les pierres dorées." },
          { who: "papi", text: "The boulangerie: {{tout droit}}, past the fountain, then {{à droite}}. Not {{à gauche}} — that's the church.", gloss: "Tout droit — straight on. À droite — on the right. À gauche — on the left." },
        ],
        culture: ["pierresdorees"],
      },
      {
        id: "bread",
        quest: { v: "Buy bread at the boulangerie", hint: "Straight on, then on the right." },
        at: { room: "place", hotspot: "boulangerie" },
        encounter: ["boulangerie"],
        lines: [
          { who: "guide", text: "A bell over the door. It smells like warm butter.", gloss: "Remember: bonjour first." },
          { who: "roux", text: "{{Bonjour !}} You must be Josette's grandchild — you have her nose. Hold the bag, I'll fill it.", gloss: "Madame Roux, the baker. Josette is Mamie." },
        ],
        game: {
          type: "fetch",
          npc: "roux",
          kicker: "Mini-game · La boulangerie",
          title: "Put what she names in the bag.",
          hint: "Nothing on the counter is labelled. Listen.",
          asks: [
            { wordId: "baguette", native: "Une baguette, bien cuite.", roman: "Une baguette, bien cuite.", english: "A baguette, well done." },
            { wordId: "croissant", native: "Deux croissants.", roman: "Deux croissants.", english: "Two croissants." },
            { wordId: "painchoc", native: "Et des pains au chocolat !", roman: "Et des pains au chocolat !", english: "And some chocolate croissants!" },
          ],
          items: [
            { wordId: "baguette", label: "Long", art: <Item kind="long" color="#d8a050" /> },
            { wordId: "croissant", label: "Curved", art: <svg viewBox="0 0 80 90" aria-hidden="true"><path d="M12 62q28 -46 56 0q-10 -8 -18 -4q-10 -16 -20 0q-8 -4 -18 4Z" fill="#d8a050" /><path d="M30 50l4 10M46 50l-4 10" stroke="#b87830" strokeWidth="2.5" /></svg> },
            { wordId: "painchoc", label: "Square", art: <svg viewBox="0 0 80 90" aria-hidden="true"><rect x="14" y="36" width="52" height="34" rx="8" fill="#d8a050" /><rect x="22" y="44" width="36" height="6" rx="3" fill="#4a2a1a" /><rect x="22" y="56" width="36" height="6" rx="3" fill="#4a2a1a" /></svg> },
          ],
          done: { native: "Et voilà !", roman: "Et voilà !", english: "There you go!" },
        },
        after: [
          { who: "guide", text: "The tip of the baguette doesn't make it out of the square. It never does.", gloss: "Le quignon — the heel. It belongs to whoever carries the bread." },
          { who: "papi", text: "{{Merci !}} Now leave it with me and come — the pétanque starts at the plane trees. Bernard thinks he can beat me.", gloss: "Past the bench, to the left." },
        ],
        culture: ["boulangerie"],
        memory: "bread",
        nudges: { "place:papi": [{ who: "papi", text: "The bread first! {{Tout droit, puis à droite.}}", gloss: "Straight on, then right." }] },
      },
      {
        id: "petanque",
        quest: { v: "Keep score at pétanque", hint: "Under the plane trees, left of the square." },
        at: { room: "terrain", hotspot: "boules" },
        encounter: ["boules"],
        lines: [
          { who: "bernard", text: "A scorekeeper! Good — your Papi measures with his feet, and his feet are dishonest.", gloss: "Monsieur Bernard, Papi's oldest friend and oldest rival." },
          { who: "papi", text: "Count the {{boules}} closest to the little one — the cochonnet. Each one is a point.", gloss: "Boules — the metal balls." },
        ],
        game: {
          type: "count",
          npc: "bernard",
          kicker: "Mini-game · La pétanque",
          title: "Count the points.",
          hint: "Tap boules to count the points, then call the score.",
          unit: "points",
          coin: <Boule />,
          rounds: [
            { native: "Un point pour Papi.", roman: "Un point pour Papi.", english: "One point for Papi.", answer: 1, wordId: "un" },
            { native: "Deux points pour moi !", roman: "Deux points pour moi !", english: "Two points for me!", answer: 2, wordId: "deux" },
            { native: "Trois pour Papi…", roman: "Trois pour Papi…", english: "Three for Papi…", answer: 3, wordId: "trois" },
            { native: "Quatre ?! Il triche !", roman: "Quatre ?! Il triche !", english: "Four?! He's cheating!", answer: 4, wordId: "quatre" },
          ],
          done: { native: "Papi gagne… cette fois.", roman: "Papi gagne… cette fois.", english: "Papi wins… this time." },
        },
        after: [{ who: "papi", text: "Go and find Mamie a glass of water from the fountain — I have to gloat a little.", gloss: "Back in the square, someone with a bicycle looks very lost." }],
        culture: ["petanque"],
        memory: "petanque",
        nudges: {
          "place:papi": [{ who: "papi", text: "The game! Under the plane trees. {{À gauche !}}", gloss: "On the left!" }],
        },
      },
    ],
    ending: {
      at: { room: "place", hotspot: "cyclist" },
      quest: { v: "Help the lost cyclist", hint: "By the fountain in the square." },
      lines: [{ who: "cycliste", text: "A cyclist in full racing kit wipes her forehead and waves you over, holding a crumpled map." }],
      asker: "cycliste",
      question: {
        native: "Pardon — la boulangerie, c'est où ?",
        roman: "Pardon — la boulangerie, c'est où ?",
        english: "Excuse me — where's the bakery?",
        choices: [
          { native: "Tout droit, puis à droite !", roman: "Tout droit, puis à droite !", english: "Straight on, then on the right!", right: true },
          { native: "Quatre points !", roman: "Quatre points !", english: "Four points!", reply: [{ who: "cycliste", text: "Four points? …For what? I just want a croissant." }] },
          { native: "À gauche, l'église.", roman: "À gauche, l'église.", english: "On the left, the church.", reply: [{ who: "cycliste", text: "The church? I'm hungry, not lost in my soul! The bakery?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{Tout droit, puis à droite !}}", gloss: "“Straight on, then on the right!”" },
        { who: "cycliste", text: "{{Merci !}} You're a local, then?", gloss: "Thank you!" },
        { who: "papi", text: "(From the bench, very loudly:) {{Oui !}}", gloss: "Yes!" },
      ],
      encounter: ["toutdroit", "droite"],
      memory: "directions",
    },
    idle: {
      "place:boulangerie": [{ who: "roux", text: "Come back tomorrow. The croissants are best at seven." }],
      "terrain:bernard": [{ who: "bernard", text: "Tomorrow, revenge. Tell your Papi." }],
      "terrain:boules": [{ who: "guide", text: "The boules are cooling in the shade. Papi's still telling everyone the score." }],
    },
    afterwards: {
      "place:papi": [{ who: "papi", text: "Saturday, Mamie takes you to her market in Lyon. Bring an empty stomach — she'll make you taste everything." }],
      "place:cyclist": [{ who: "cycliste", text: "The croissant was worth the hill. Merci!" }],
    },
    complete: {
      title: "Le",
      em: "Village",
      text: "You followed Papi's directions to the boulangerie, filled the bag by ear, kept score at pétanque under the plane trees — and gave a lost cyclist directions in French.",
      quest: { v: "Eat the tip of the baguette", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Place done={new Set()} />,
};

export default content;
