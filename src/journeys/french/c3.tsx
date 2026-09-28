import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Ground, Stall, Crowd, Coin, Item, Awning, FY } from "../scenes";
import { Figure } from "../../components/scenes/primitives";
import { FR, Facade, Platane } from "./art";

/* FRENCH · Chapter Three — Le Marché. Saturday morning at the Croix-Rousse market in Lyon. */

function Boulevard({ cheese = false }: { cheese?: boolean }) {
  return (
    <Stage>
      <Sky id={cheese ? "fr3b" : "fr3a"} top="#8ab8e0" bottom="#f4ecdc" />
      <Sun x={cheese ? 1440 : 200} y={100} r={40} color="#fbe6b0" />
      {cheese ? (
        <>
          <Facade x={-40} w={460} h={560} tint={FR.lyon[1]} />
          <Facade x={1160} w={480} h={540} tint={FR.lyon[3]} />
        </>
      ) : (
        <>
          <Facade x={-40} w={440} h={560} tint={FR.lyon[0]} />
          <Facade x={600} w={420} h={600} tint={FR.lyon[2]} />
          <Facade x={1220} w={420} h={540} tint={FR.lyon[1]} />
        </>
      )}
      <Ground color="#a8a098" line="#88807a" kind="stone" />
      {cheese ? (
        <>
          {/* Madame Blanc's cheese van, awning out */}
          <rect x={420} y={FY - 330} width="620" height="330" rx="16" fill="#f4f0e6" />
          <Awning x={400} y={FY - 350} w={660} colors={["#3a5a9a", "#f4f0e6"]} />
          <Figure x={730} y={FY - 60} h={200} color="#2a1a12" flip />
          <rect x={440} y={FY - 150} width="580" height="150" fill="#e8e2d4" />
          <rect x={440} y={FY - 150} width="580" height="20" fill="#8c6240" />
          {[480, 580, 680, 780, 880, 960].map((x, i) => (
            <g key={x}>
              <ellipse cx={x} cy={FY - 164} rx={i % 2 ? 36 : 28} ry={i % 2 ? 14 : 10} fill={["#f2e2b0", "#e8c870", "#f4f0e6", "#d8b060", "#f2e8c8", "#c89a50"][i]} />
              <rect x={x - 12} y={FY - 200} width="24" height="16" fill="#1e1e22" />
            </g>
          ))}
          <Figure x={1100} y={FY} h={205} color="#3a2a24" />
          <Figure x={300} y={FY} h={200} color="#2a1a12" />
        </>
      ) : (
        <>
          <Platane x={560} h={430} />
          {/* Monsieur Paul's fruit and vegetables */}
          <Stall x={80} w={400} colors={["#3f7d55", "#f4ecdd"]} goods={[{ color: "#c0392b", kind: "round" }, { color: "#f0a060", kind: "round" }, { color: "#d8304a", kind: "round" }, { color: "#e8c870", kind: "round" }]} sign="PRIMEUR" />
          <Figure x={460} y={FY} h={205} color="#3a2a24" flip />
          <Figure x={900} y={FY} h={200} color="#2a1a12" />
          <Crowd x={1200} n={5} spread={520} seed={57} scale={0.92} />
        </>
      )}
    </Stage>
  );
}

const euro = <Coin symbol="€" />;

const content: ChapterContent = {
  startRoom: "boulevard",
  speakers: {
    paul: { name: "Monsieur Paul", glyph: "P", tone: "guest" },
    blanc: { name: "Madame Blanc", glyph: "B", tone: "guest" },
    client: { name: "A customer", glyph: "C", tone: "guest" },
  },
  rooms: {
    boulevard: {
      id: "boulevard",
      name: "The market",
      native: "le marché",
      art: <Boulevard />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "fruit", x: 280, y: 600, label: "Fruit and veg", kind: "word", wordId: "tomates" },
        { id: "paul", x: 460, y: 560, label: "Monsieur Paul", kind: "npc" },
        { id: "mamie", x: 900, y: 560, label: "Mamie", kind: "npc" },
        { id: "crowd", x: 1200, y: 560, label: "Saturday crowd", kind: "word", wordId: "marche" },
        { id: "balconies", x: 800, y: 330, label: "Iron balconies", kind: "flavor", note: "Tall windows, iron balconies, geraniums. The Croix-Rousse buildings have extra-high ceilings — built for the giant silk looms of the 1800s." },
        { id: "next", x: 1530, y: 580, label: "Further along", kind: "exit", to: "fromagerie" },
      ],
    },
    fromagerie: {
      id: "fromagerie",
      name: "The cheese van",
      native: "la fromagerie",
      art: <Boulevard cheese />,
      spawn: { left: 240, right: 1200 },
      hotspots: [
        { id: "back", x: 70, y: 580, label: "Back", kind: "exit", to: "boulevard" },
        { id: "client", x: 300, y: 560, label: "A customer", kind: "flavor", note: "A man in a hurry, tapping his foot at the front of the queue." },
        { id: "blanc", x: 730, y: 520, label: "Madame Blanc", kind: "npc" },
        { id: "mamie", x: 1100, y: 560, label: "Mamie", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Chapitre trois · French",
      title: "Le",
      em: "Marché",
      text: "Saturday in Lyon. Mamie's flat is at the top of the Croix-Rousse hill, and every morning but Monday the boulevard below fills with stalls. She's had the same basket for forty years.",
    },
    introLines: [
      { who: "mamie", text: "{{Allez !}} The best peaches go by nine.", gloss: "Allez — come on!" },
      { who: "guide", text: "Quest: help Mamie fill her basket.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "list",
        quest: { v: "Ask Mamie what she needs", hint: "She's in the middle of the market." },
        encounter: ["marche"],
        at: { room: "boulevard", hotspot: "mamie" },
        lines: [
          { who: "mamie", text: "At the {{marché}}: {{tomates}}, {{pêches}}, {{fraises}}, and a {{melon}} — a good one.", gloss: "Tomatoes, peaches, strawberries and a melon." },
          { who: "mamie", text: "Monsieur Paul, on the left. And remember — {{bonjour}} first. Always.", gloss: "The stall with the green awning." },
        ],
        culture: ["croixrousse"],
      },
      {
        id: "pick",
        quest: { v: "Buy fruit from Monsieur Paul", hint: "The green stall on the left." },
        at: { room: "boulevard", hotspot: "paul" },
        lines: [{ who: "paul", text: "{{Bonjour, bonjour !}} Josette's grandchild! Hold the basket — I'll pick the best ones.", gloss: "Monsieur Paul, who has been choosing Mamie's fruit for twenty years." }],
        game: {
          type: "fetch",
          npc: "paul",
          kicker: "Mini-game · Le primeur",
          title: "Put what he names in the basket.",
          hint: "Nothing is labelled. Listen.",
          asks: [
            { wordId: "tomates", native: "Des tomates, bien mûres.", roman: "Des tomates, bien mûres.", english: "Tomatoes, nice and ripe." },
            { wordId: "peches", native: "Les pêches — attention !", roman: "Les pêches — attention !", english: "The peaches — careful!" },
            { wordId: "fraises", native: "Une barquette de fraises.", roman: "Une barquette de fraises.", english: "A punnet of strawberries." },
            { wordId: "melon", native: "Et un melon. Sentez-moi ça !", roman: "Et un melon. Sentez-moi ça !", english: "And a melon. Smell that!" },
          ],
          items: [
            { wordId: "tomates", label: "Red", art: <Item kind="round" color="#c0392b" /> },
            { wordId: "peches", label: "Fuzzy", art: <Item kind="round" color="#f0a060" accent="#f8d0a0" /> },
            { wordId: "fraises", label: "Small", art: <Item kind="box" color="#d8304a" accent="#3f7d55" /> },
            { wordId: "melon", label: "Heavy", art: <Item kind="round" color="#e8c870" accent="#c8d890" /> },
          ],
          done: { native: "Impeccable !", roman: "Impeccable !", english: "Perfect!" },
        },
        after: [{ who: "paul", text: "Now, the prices are on my chalkboard — but I'll read them out, and you count.", gloss: "Nobody bargains at a French market." }],
        nudges: { "boulevard:mamie": [{ who: "mamie", text: "Monsieur Paul. The fruit. {{Vas-y !}}", gloss: "Go on!" }] },
      },
      {
        id: "pay",
        quest: { v: "Pay Monsieur Paul", hint: "Count out the euros." },
        at: { room: "boulevard", hotspot: "paul" },
        encounter: ["euro"],
        lines: [{ who: "paul", text: "One at a time — count them into my hand.", gloss: "The coins say € — euros." }],
        game: {
          type: "count",
          npc: "paul",
          kicker: "Mini-game · Les euros",
          title: "Count out what he asks for.",
          hint: "Tap coins to count them out, then hand them over.",
          unit: "euros",
          coin: euro,
          rounds: [
            { native: "Les tomates : deux euros.", roman: "Les tomates : deux euros.", english: "Tomatoes: two euros.", answer: 2, wordId: "deux" },
            { native: "Les fraises : trois euros.", roman: "Les fraises : trois euros.", english: "Strawberries: three euros.", answer: 3, wordId: "trois" },
            { native: "Les pêches : cinq euros.", roman: "Les pêches : cinq euros.", english: "Peaches: five euros.", answer: 5, wordId: "cinq" },
            { native: "Le melon… dix euros. C'est un très bon melon.", roman: "Le melon… dix euros. C'est un très bon melon.", english: "The melon… ten euros. It's a very good melon.", answer: 10, wordId: "dix" },
          ],
          done: { native: "Le compte est bon !", roman: "Le compte est bon !", english: "That's exactly right!" },
        },
        after: [{ who: "mamie", text: "Now — cheese. Madame Blanc's van, further along. Watch how it's done.", gloss: "She has a look in her eye." }],
        culture: ["nobargain"],
        memory: "paid",
      },
      {
        id: "bonjour",
        quest: { v: "Buy cheese from Madame Blanc", hint: "The van further along." },
        at: { room: "fromagerie", hotspot: "blanc" },
        encounter: ["fromage", "combien"],
        lines: [
          { who: "client", text: "Un saint-marcellin. Vite.", gloss: "The man at the front. No bonjour." },
          { who: "blanc", text: "…{{Bonjour, monsieur.}}", gloss: "Madame Blanc, very slowly, very coldly. She takes a long time to find his cheese." },
          { who: "you", text: "{{Bonjour, madame !}}", gloss: "Your turn." },
          { who: "blanc", text: "{{Bonjour !}} Ah, now THAT is how you start. What would you like?", gloss: "She beams." },
          { who: "mamie", text: "A saint-marcellin. {{C'est combien ?}}", gloss: "How much is it?" },
          { who: "blanc", text: "Three euros — and I'll give you the ripest one, because your grandchild says bonjour.", gloss: "She picks one from the back. Runny. Perfect." },
        ],
        culture: ["bonjourfirst", "stmarcellin"],
        memory: "bonjour",
        nudges: {
          "fromagerie:mamie": [{ who: "mamie", text: "The cheese van. And remember…", gloss: "…bonjour first." }],
          "boulevard:mamie": [{ who: "mamie", text: "Further along! The cheese." }],
        },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Madame Blanc", hint: "She's asking the famous question." },
      lines: [{ who: "blanc", text: "She wraps the little clay dish in paper and asks the question every French shopkeeper asks, every single time." }],
      asker: "blanc",
      question: {
        native: "Et avec ceci ?",
        roman: "Et avec ceci ?",
        english: "And with this? (Anything else?)",
        choices: [
          { native: "Ce sera tout, merci !", roman: "Ce sera tout, merci !", english: "That will be all, thank you!", right: true },
          { native: "C'est combien ?", roman: "C'est combien ?", english: "How much is it?", reply: [{ who: "blanc", text: "Three euros — I just told you! Anything else?" }] },
          { native: "Bonjour !", roman: "Bonjour !", english: "Hello!", reply: [{ who: "blanc", text: "Ha! We've done bonjour, and very nicely. Anything else?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{Ce sera tout, merci !}}", gloss: "“That will be all, thank you!”" },
        { who: "blanc", text: "{{Merci à vous !}} Josette, this one's a real Lyonnais.", gloss: "Thank YOU!" },
        { who: "guide", text: "…Mamie says “of course” as if she hadn't been coaching you the whole way down the hill." },
      ],
      encounter: ["merci"],
      memory: "toutmerci",
    },
    idle: {
      "boulevard:paul": [{ who: "paul", text: "Next Saturday: the first figs. I'll keep you some." }],
      "fromagerie:mamie": [{ who: "mamie", text: "Basket's full. Home, before the cheese melts in the sun." }],
      "fromagerie:blanc": [{ who: "blanc", text: "{{Bonne journée !}}", gloss: "Have a good day!" }],
    },
    afterwards: {
      "fromagerie:mamie": [{ who: "mamie", text: "You'll come back in January? Good. There's a galette with a secret inside, and it only comes once a year." }],
    },
    complete: {
      title: "Le",
      em: "Marché",
      text: "You filled Mamie's basket by ear, counted out euros, learned that bonjour opens every door — and answered “et avec ceci ?” like a real Lyonnais.",
      quest: { v: "Carry the basket up the hill", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Boulevard />,
};

export default content;
