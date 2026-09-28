import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Ground, Stall, Crowd, RoundTree, Coin, Item, Bunting, FY } from "../scenes";
import { Figure, Palm } from "../../components/scenes/primitives";
import { T } from "./art";

/* TELUGU · Chapter Three — The Market. The weekly santha: language you can hold. */

const TE = "'Noto Serif Telugu', 'Nirmala UI', serif";

function Santha({ second = false }: { second?: boolean }) {
  return (
    <Stage>
      <Sky id={second ? "t3b" : "t3a"} top="#f0c878" mid="#f4dcae" bottom="#f7ecd4" />
      <Sun x={second ? 1400 : 200} y={120} r={48} color="#fbe3a0" />
      {[80, 1520].map((x, i) => <Palm key={x} x={x} y={FY - 20} h={360} lean={i ? -30 : 30} color="#3a5a3e" />)}
      <Ground color={T.earth} line={T.earthLine} />
      <Bunting y={120} sag={40} colors={["#c0392b", "#d9a441", "#2d6ab8", "#3f7d55"]} />
      {second ? (
        <>
          <Stall x={120} w={320} colors={["#7a3a8a", "#f4ecdd"]} goods={[{ color: "#6b3a1e", kind: "sack" }, { color: "#b8452f", kind: "sack" }]} sign="చింతపండు" signFont={TE} />
          <Stall x={520} w={300} colors={["#c0392b", "#e0508a"]} goods={[{ color: "#e0508a", kind: "cloth" }, { color: "#2d6ab8", kind: "cloth" }]} sign="గాజులు" signFont={TE} />
          {/* the tea stall */}
          <rect x={960} y={FY - 200} width="220" height="200" fill="#6b4429" />
          <rect x={960} y={FY - 220} width="220" height="24" fill="#3a2718" />
          <path d="M1020 480 q-10 -20 6 -34" stroke="#f4ecdd" strokeWidth="5" fill="none" opacity="0.5" className="steam" />
          <rect x={1000} y={FY - 250} width="40" height="46" rx="6" fill="#c9cfd4" />
          <Figure x={1300} y={FY} h={210} color="#2a1a12" pose="stand" flip />
          <Figure x={330} y={FY} h={200} color="#3a2a24" pose="sit" />
          <Crowd x={640} n={3} spread={260} seed={31} scale={0.92} />
        </>
      ) : (
        <>
          <Stall x={120} w={340} colors={["#d9a441", "#f4ecdd"]} goods={[{ color: "#f0b429", kind: "round" }, { color: "#e8d24a", kind: "bunch" }]} sign="పండ్లు" signFont={TE} />
          <Stall x={560} w={320} colors={["#3f7d55", "#f4ecdd"]} goods={[{ color: "#c0392b", kind: "round" }, { color: "#d8e24a", kind: "round" }, { color: "#3f7d55", kind: "leaf" }]} sign="కూరగాయలు" signFont={TE} />
          <Figure x={410} y={FY} h={200} color="#3a2a24" pose="sit" />
          <Figure x={1080} y={FY} h={210} color="#2a1a12" pose="stand" flip />
          <Crowd x={1180} n={4} spread={360} seed={17} scale={0.94} />
          <RoundTree x={1480} h={380} crown="#4f8a4a" dark="#3a6e3a" />
        </>
      )}
    </Stage>
  );
}

const rupee = <Coin symbol="₹" />;

const content: ChapterContent = {
  startRoom: "santha",
  speakers: {
    vendor: { name: "Lakshmamma", glyph: "ల", tone: "guest" },
    spice: { name: "Subbarao garu", glyph: "సు", tone: "guest" },
  },
  rooms: {
    santha: {
      id: "santha",
      name: "The santha",
      native: "సంత",
      art: <Santha />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "mangoes", x: 240, y: 600, label: "Mangoes", kind: "word", wordId: "mamidi" },
        { id: "vendor", x: 410, y: 520, label: "Lakshmamma", kind: "npc" },
        { id: "veg", x: 720, y: 600, label: "Vegetables", kind: "word", wordId: "tomato" },
        { id: "ammamma", x: 1080, y: 560, label: "Ammamma", kind: "npc" },
        { id: "crowd", x: 1300, y: 560, label: "The crowd", kind: "word", wordId: "santha" },
        { id: "next", x: 1520, y: 580, label: "Further in", kind: "exit", to: "lopala" },
      ],
    },
    lopala: {
      id: "lopala",
      name: "Deeper in",
      native: "సంత లోపల",
      art: <Santha second />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "back", x: 80, y: 580, label: "Back", kind: "exit", to: "santha" },
        { id: "tamarind", x: 280, y: 600, label: "Tamarind", kind: "npc" },
        { id: "bangles", x: 670, y: 600, label: "Bangles", kind: "flavor", note: "Glass bangles in every colour. Ammamma buys two dozen for your cousins, and one set for you.", culture: "gaajulu" },
        { id: "tea", x: 1070, y: 560, label: "Tea stall", kind: "flavor", note: "Chai in a little steel tumbler, poured from a height so it froths. Tatayya's stop, every santha day.", culture: "tea" },
        { id: "ammamma", x: 1300, y: 560, label: "Ammamma", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Chapter Three · Telugu",
      title: "The",
      em: "Santha",
      text: "Sunday. The village fills up before sunrise — carts from the next villages, sacks of rice, pyramids of mangoes — and Ammamma has a list in her head.",
    },
    introLines: [
      { who: "ammamma", text: "Stay close. The {{సంత}} is busy on Sundays.", gloss: "santha — the weekly market." },
      { who: "guide", text: "Everything here has a name — and a price.", gloss: "Quest: help Ammamma with her shopping." },
    ],
    beats: [
      {
        id: "list",
        quest: { v: "Ask Ammamma what she needs", hint: "She's by the vegetables." },
        at: { room: "santha", hotspot: "ammamma" },
        encounter: ["santha"],
        lines: [
          { who: "ammamma", text: "We need {{మామిడిపండ్లు}}, {{టమాటాలు}}, {{అరటిపండ్లు}} and {{నిమ్మకాయలు}}.", gloss: "Mangoes, tomatoes, bananas and lemons." },
          { who: "ammamma", text: "Lakshmamma at the fruit stall is my friend. She'll give us good ones.", gloss: "The stall on the left." },
        ],
      },
      {
        id: "pick",
        quest: { v: "Pick fruit with Lakshmamma", hint: "The fruit stall on the left." },
        at: { room: "santha", hotspot: "vendor" },
        lines: [{ who: "vendor", text: "Ammamma's grandchild! {{రా, తీసుకో.}} I'll tell you what to put in the bag.", gloss: "raa, teesuko — come, take." }],
        game: {
          type: "fetch",
          npc: "vendor",
          kicker: "Mini-game · సంత",
          title: "Put what she names in the bag.",
          hint: "Nothing on the stall is labelled. Listen.",
          asks: [
            { wordId: "mamidi", native: "మామిడిపండ్లు పెట్టు.", roman: "maamidipandlu pettu.", english: "Put in the mangoes." },
            { wordId: "tomato", native: "టమాటాలు పెట్టు.", roman: "tomaataalu pettu.", english: "Put in the tomatoes." },
            { wordId: "nimma", native: "నిమ్మకాయలు కూడా.", roman: "nimmakaayalu kooda.", english: "The lemons too." },
            { wordId: "arati", native: "అరటిపండ్లు మర్చిపోకు!", roman: "aratipandlu marchipoku!", english: "Don't forget the bananas!" },
          ],
          items: [
            { wordId: "mamidi", label: "Yellow", art: <Item kind="round" color="#f0b429" /> },
            { wordId: "tomato", label: "Red", art: <Item kind="round" color="#c0392b" /> },
            { wordId: "arati", label: "Bunch", art: <Item kind="long" color="#e8d24a" /> },
            { wordId: "nimma", label: "Small", art: <Item kind="round" color="#d8e24a" /> },
          ],
          done: { native: "శభాష్!", roman: "shabaash!", english: "well done!" },
        },
        after: [{ who: "vendor", text: "Now — pay me, and I'll throw in an extra mango.", gloss: "She holds out her hand, smiling." }],
        nudges: { "santha:ammamma": [{ who: "ammamma", text: "Lakshmamma — the fruit stall. Go on." }] },
      },
      {
        id: "pay",
        quest: { v: "Pay Lakshmamma", hint: "Count out the rupees she asks for." },
        at: { room: "santha", hotspot: "vendor" },
        encounter: ["roopaayi"],
        lines: [{ who: "vendor", text: "Count it out for me. I'll say how many {{రూపాయలు}}.", gloss: "roopaayalu — rupees." }],
        game: {
          type: "count",
          npc: "vendor",
          kicker: "Mini-game · లెక్క",
          title: "Count out what she asks for.",
          hint: "Tap coins to count them out, then hand them over.",
          unit: "rupees",
          coin: rupee,
          rounds: [
            { native: "రెండు రూపాయలు.", roman: "rendu roopaayalu.", english: "Two rupees.", answer: 2, wordId: "rendu" },
            { native: "మూడు రూపాయలు.", roman: "moodu roopaayalu.", english: "Three rupees.", answer: 3, wordId: "moodu" },
            { native: "అయిదు రూపాయలు.", roman: "aidu roopaayalu.", english: "Five rupees.", answer: 5, wordId: "aidu" },
            { native: "పది రూపాయలు.", roman: "padi roopaayalu.", english: "Ten rupees.", answer: 10, wordId: "padi" },
          ],
          done: { native: "సరిపోయింది!", roman: "saripoyindi!", english: "That's exactly right!" },
        },
        after: [{ who: "ammamma", text: "Now the {{చింతపండు}}. Further in — and let me do the talking.", gloss: "chintapandu — tamarind. For the pulusu." }],
        memory: "paid",
      },
      {
        id: "haggle",
        quest: { v: "Buy tamarind with Ammamma", hint: "Further into the santha." },
        at: { room: "lopala", hotspot: "tamarind" },
        encounter: ["chintapandu", "entha"],
        lines: [
          { who: "ammamma", text: "{{ఎంత?}}", gloss: "entha? — how much?" },
          { who: "spice", text: "For you, Ammagaru? Two hundred a kilo.", gloss: "Subbarao garu, the tamarind seller." },
          { who: "ammamma", text: "{{చాలా ఎక్కువ!}} I've known you since you were a boy, Subbarao.", gloss: "chaalaa ekkuva — much too much!" },
          { who: "spice", text: "…One hundred and seventy. For you.", gloss: "Ammamma wins. She always wins." },
        ],
        culture: ["beraam"],
        memory: "haggle",
        nudges: {
          "lopala:ammamma": [{ who: "ammamma", text: "The tamarind first. Come.", gloss: "The sacks on the left." }],
          "santha:ammamma": [{ who: "ammamma", text: "Further in! The tamarind." }],
        },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Subbarao garu", hint: "He's asking if there's anything else." },
      lines: [{ who: "spice", text: "He ties the bag with string and looks at you instead of Ammamma." }],
      asker: "spice",
      question: {
        native: "ఇంకా ఏమైనా కావాలా?",
        roman: "inkaa emainaa kaavaalaa?",
        english: "Do you want anything else?",
        choices: [
          { native: "చాలు, థాంక్స్!", roman: "chaalu, thanks!", english: "That's enough, thanks!", right: true },
          { native: "పది", roman: "padi", english: "ten", reply: [{ who: "spice", text: "Ten what? Ten more kilos? Your Ammamma would faint." }] },
          { native: "ఎంత?", roman: "entha?", english: "how much?", reply: [{ who: "spice", text: "How much for what? I asked if you want anything else!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{చాలు, థాంక్స్!}}", gloss: "“That's enough, thanks!”" },
        { who: "spice", text: "{{భలే!}} She speaks Telugu, this one.", gloss: "bhale — wonderful!" },
        { who: "guide", text: "…Ammamma's pretending not to be proud. She isn't very good at it." },
      ],
      encounter: ["chaalu"],
      memory: "chaalu",
    },
    idle: {
      "santha:vendor": [{ who: "vendor", text: "Paid in full. Come back next Sunday — the mangoes will be even better." }],
      "lopala:ammamma": [{ who: "ammamma", text: "Everything's in the bag. Let's get a chai for Tatayya." }],
    },
    afterwards: {
      "lopala:ammamma": [{ who: "ammamma", text: "Next week is Sankranti. You'll see this whole village change." }],
      "lopala:tamarind": [{ who: "spice", text: "One hundred and seventy. Don't tell anyone." }],
    },
    complete: {
      title: "The",
      em: "Santha",
      text: "You filled the bag by ear, counted out rupees in Telugu, watched Ammamma bargain — and told the tamarind seller that's enough, thank you.",
      quest: { v: "Get a chai for Tatayya", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Santha />,
};

export default content;
