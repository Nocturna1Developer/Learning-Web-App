import type { ChapterContent, StoryPanel } from "../types";
import { Stage, Sky, Stars, Moon, Hills, Ground, FY } from "../scenes";
import { Walls, Window, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { Panel } from "../kit";
import { LV, StoneHouse, OliveTree, Tatreez, Rakweh } from "./art";

/* ARABIC · Chapter Five — حكايات, Stories. After dinner in the village: Nus Nsays, the smallest boy, and the ghoula. */

function Dar() {
  return (
    <Stage>
      <Walls tint="#d8c8a8" floor="#8a6a4a" floorLine="#6a4a2e" shade="#c4b490" />
      <rect width="1600" height="900" fill="#1a1020" opacity="0.35" />
      <Window x={1080} y={220} w={240} h={180} />
      <rect x={1080} y={220} width="240" height="180" fill="#0a0c20" opacity="0.8" />
      {/* the floor cushions along the wall, a low table with tea and seeds */}
      <rect x={200} y={FY - 90} width="820" height="90" fill="#6a2a2a" />
      <Tatreez x={220} y={FY - 150} w={180} h={60} />
      <Tatreez x={420} y={FY - 150} w={180} h={60} c="#2d4a78" />
      <Tatreez x={620} y={FY - 150} w={180} h={60} />
      <Tatreez x={820} y={FY - 150} w={180} h={60} c="#3f7d55" />
      <rect x={560} y={FY - 40} width="220" height="14" fill={WOOD} />
      <Rakweh x={620} y={FY - 40} s={0.9} />
      {[680, 710, 740].map((x) => <rect key={x} x={x} y={FY - 60} width="16" height="20" rx="3" fill="#f4ecdd" />)}
      {/* the oil lamp */}
      <circle cx={900} cy={FY - 220} r="120" fill="url(#lamp-glow)" />
      <rect x={890} y={FY - 214} width="20" height="40" fill="#c99a3e" />
      <path d={`M900 ${FY - 216}q8 -16 0 -30q-8 14 0 30Z`} fill="#ffb347" />
      <Figure x={440} y={FY - 20} h={180} color="#1a1210" pose="sit" />
      <Child x={700} y={FY - 30} h={100} color="#1a1210" />
      <rect x={1440} y={FY - 330} width="150" height="330" fill="#2a1c14" />
    </Stage>
  );
}

function Barra() {
  return (
    <Stage>
      <Sky id="ar5" top="#060a22" mid="#141a3c" bottom="#2a2a4a" />
      <Stars n={130} seed={33} maxY={520} />
      <Moon x={1200} y={170} r={54} />
      <Hills y={560} color="#141a2a" amp={80} seed={5} />
      {/* village lights down the valley */}
      {Array.from({ length: 24 }, (_, i) => <circle key={i} cx={(i * 71) % 1600} cy={590 + (i % 4) * 12} r="3" fill="#ffd98a" opacity="0.8" />)}
      <StoneHouse x={-60} w={420} h={360} lit />
      <OliveTree x={1380} h={300} fruit={false} />
      <rect width="1600" height="900" fill="#060a22" opacity="0.3" />
      <Ground color="#4a4458" line="#342e40" kind="stone" />
      <path d="M380 640h1100" stroke={LV.stoneDark} strokeWidth="10" opacity="0.4" />
      <Child x={760} y={FY} h={118} color="#0a0810" />
      <Child x={860} y={FY} h={106} color="#0a0810" flip />
    </Stage>
  );
}

const story: StoryPanel[] = [
  {
    art: (
      <Panel id="ar5p1" sky={["#e8c890", "#c8a070"]} ground="#8a6a4a">
        <Figure x={110} y={196} h={120} color="#2a1a12" />
        <Child x={200} y={196} h={96} color="#3a2a24" />
        <Child x={260} y={196} h={84} color="#3a2a24" />
        <Child x={320} y={196} h={44} color="#3a2a24" />
      </Panel>
    ),
    text: "In a village just like this one, a mother had three sons. The youngest was so {{زغير}} — so small — that everybody called him Nus Nsays: Half-Half.",
  },
  {
    art: (
      <Panel id="ar5p2" sky={["#0a0c20", "#1a2040"]} ground="#1a2a1a">
        {[40, 120, 330, 380].map((x) => <path key={x} d={`M${x} 196v-60l-24 30M${x} 160l20 -26`} stroke="#0a120a" strokeWidth="8" fill="none" />)}
        <rect x="220" y="130" width="70" height="66" fill="#2a2018" />
        <rect x="244" y="150" width="20" height="18" fill="#ffd07a" />
        <Child x={120} y={196} h={70} color="#0a0810" />
        <Child x={150} y={196} h={60} color="#0a0810" />
        <Child x={172} y={196} h={34} color="#0a0810" />
      </Panel>
    ),
    text: "One day the brothers went to gather firewood, and when {{ليل}} came they were lost. Far off in the forest, they saw one lit window, and knocked.",
  },
  {
    art: (
      <Panel id="ar5p3" sky={["#2a1a14", "#4a2a1a"]} ground="#2a1a10">
        <circle cx="300" cy="80" r="60" fill="#ffd07a" opacity="0.15" />
        <Figure x={300} y={196} h={130} color="#3a1a2a" />
        <path d="M280 92q20 12 40 0" stroke="#e8e0d0" strokeWidth="3" fill="none" />
        {[70, 130].map((x) => <ellipse key={x} cx={x} cy={186} rx="30" ry="10" fill="#1a1008" />)}
        <Child x={190} y={196} h={34} color="#0a0810" />
        <circle cx="196" cy="168" r="2" fill="#f4ecdd" />
      </Panel>
    ),
    text: "An old woman opened the door, smiling far too widely. “Come in, sleep here.” She was a {{غولة}} — a ghoula. The big brothers fell straight asleep. Nus Nsays kept one eye open.",
  },
  {
    art: (
      <Panel id="ar5p4" sky={["#0a0c20", "#1a2040"]} ground="#1a2a1a">
        <rect y="176" width="400" height="30" fill="#2a4a6a" />
        <Child x={80} y={196} h={70} color="#0a0810" />
        <Child x={120} y={196} h={60} color="#0a0810" />
        <Child x={160} y={196} h={34} color="#0a0810" />
        <Figure x={340} y={196} h={130} color="#3a1a2a" pose="walk" flip />
      </Panel>
    ),
    text: "At midnight he heard her sharpening a knife. He shook his brothers awake, and they climbed out of the window and ran — all the way to the {{نهر}}, the river, with the ghoula behind them.",
  },
  {
    art: (
      <Panel id="ar5p5" sky={["#1a2040", "#3a4a6a"]} ground={null}>
        <rect y="150" width="400" height="90" fill="#2a4a6a" />
        {[80, 150, 220, 290].map((x) => <ellipse key={x} cx={x} cy={160} rx="24" ry="8" fill="#6a6a6a" />)}
        <Child x={290} y={156} h={34} color="#0a0810" />
        <path d="M60 200q30 -20 60 0q30 20 60 0" stroke="#8ab0d0" strokeWidth="3" fill="none" />
        <circle cx="90" cy="206" r="16" fill="#6a6a6a" />
      </Panel>
    ),
    text: "Nus Nsays was so light he hopped across on the stepping stones. “Ghoula! Hold on to that big rock and pull yourself over!” She grabbed it — it rolled — SPLASH — and the river carried her away. After that, nobody called him “only half” again. He was the {{شاطر}} one.",
  },
];

const content: ChapterContent = {
  startRoom: "dar",
  speakers: {
    karim: { name: "Karim", glyph: "ك", tone: "guest" },
    lina: { name: "Lina", glyph: "ل", tone: "guest" },
  },
  rooms: {
    dar: {
      id: "dar",
      name: "The village house",
      native: "الدار",
      art: <Dar />,
      spawn: { left: 300, right: 1300 },
      hotspots: [
        { id: "teta", x: 440, y: 580, label: "Teta", kind: "npc" },
        { id: "rakweh", x: 620, y: 700, label: "Coffee pot", kind: "word", wordId: "ahwe" },
        { id: "lamp", x: 900, y: 540, label: "Oil lamp", kind: "flavor", note: "An old brass oil lamp. There's electricity in the village now, but Teta lights this for stories. “Stories don't work under a light bulb.”" },
        { id: "window", x: 1200, y: 310, label: "Window", kind: "word", wordId: "lel" },
        { id: "barra", x: 1515, y: 560, label: "The terrace", kind: "exit", to: "barra" },
      ],
    },
    barra: {
      id: "barra",
      name: "The terrace",
      native: "البرّا",
      art: <Barra />,
      spawn: { left: 400, right: 1300 },
      hotspots: [
        { id: "house", x: 150, y: 520, label: "Back inside", kind: "exit", to: "dar" },
        { id: "karim", x: 760, y: 620, label: "Karim", kind: "npc" },
        { id: "lina", x: 860, y: 620, label: "Lina", kind: "flavor", note: "Your cousin Lina, seven, counting stars out loud. She's up to four hundred. She's skipped a few." },
        { id: "moon", x: 1200, y: 170, label: "The moon", kind: "word", wordId: "amar" },
        { id: "lights", x: 600, y: 600, label: "Village lights", kind: "word", wordId: "daya" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "الفصل الخامس · Arabic",
      title: "Stories after",
      em: "Dinner",
      text: "After dinner in the village house. Tea, roasted seeds, an oil lamp on the table. The grown-ups call it a sahra — the long evening when nobody goes to bed.",
    },
    introLines: [
      { who: "teta", text: "Where are the children? Bring them in from the terrace — I have a story.", gloss: "Teta, settling onto the cushions." },
      { who: "guide", text: "Quest: gather everyone for Teta's story.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "sahra",
        quest: { v: "Talk to Teta", hint: "On the cushions." },
        at: { room: "dar", hotspot: "teta" },
        encounter: ["lel"],
        lines: [
          { who: "teta", text: "At {{ليل}}, in the village, there was no television. There were stories.", gloss: "lēl — night." },
          { who: "teta", text: "Go and get Karim and Lina from the terrace. Tell them Teta's telling Nus Nsays. They'll come running.", gloss: "The door on the right." },
        ],
        culture: ["sahra"],
      },
      {
        id: "stars",
        quest: { v: "Fetch your cousins", hint: "Out on the terrace." },
        at: { room: "barra", hotspot: "karim" },
        encounter: ["amar", "njum"],
        lines: [
          { who: "karim", text: "Look at the {{نجوم}}! You can't see this many in the city. And the {{قمر}} — nearly full.", gloss: "njūm — stars. ’amar — moon." },
          { who: "karim", text: "Nus Nsays? OK — but first I'm testing you. Everything from this whole trip.", gloss: "Karim takes this very seriously." },
        ],
        game: { type: "memory", kicker: "Mini-game · Karim's test", title: "Match the word to what it means.", hint: "Words from the souk, the ma‘mūl and the harvest. Matches in a row build a combo." },
        after: [{ who: "karim", text: "{{ماشي}}, you're good. Lina! Teta's telling Nus Nsays!", gloss: "māshi — OK, fine. Lina is already running." }],
      },
      {
        id: "story",
        quest: { v: "Listen to Teta's story", hint: "Back inside, on the cushions." },
        at: { room: "dar", hotspot: "teta" },
        encounter: ["hkeye"],
        lines: [{ who: "teta", text: "{{كان يا ما كان…}} There was, and there was not, in the oldest of times…", gloss: "kān ya mā kān — how every Arabic story begins." }],
        game: {
          type: "story",
          kicker: "A story from Teta",
          title: "Nus Nsays and the Ghoula",
          native: "نص نصيص والغولة",
          teller: "teta",
          panels: story,
          question: {
            native: "مين كان أشطر واحد؟",
            roman: "mīn kān ashṭar wāḥed?",
            english: "Who was the cleverest?",
            choices: [
              { native: "نص نصيص", roman: "nuṣ nṣēṣ", english: "Nus Nsays", right: true },
              { native: "الغولة", roman: "al-ghūle", english: "The ghoula", reply: [{ who: "karim", text: "The ghoula? She grabbed a ROLLING ROCK. Who tricked her?" }] },
              { native: "الخي الكبير", roman: "al-khayy al-kbīr", english: "The big brother", reply: [{ who: "teta", text: "The big brother slept through everything! Who stayed awake?" }] },
            ],
          },
        },
        culture: ["nussnsays"],
        memory: "nussnsays",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Teta", hint: "She wants to know what you thought." },
      lines: [{ who: "teta", text: "Lina is asleep against Teta's arm. Teta turns the lamp down and looks at you and Karim." }],
      asker: "teta",
      question: {
        native: "عجبتكن الحكاية؟",
        roman: "‘ajabetkon il-ḥkēye?",
        english: "Did you like the story?",
        choices: [
          { native: "كتير حلوة!", roman: "ktīr ḥelwe!", english: "It was lovely!", right: true },
          { native: "غالي كتير!", roman: "ghāli ktīr!", english: "Much too expensive!", reply: [{ who: "karim", text: "Stories are free! Did you LIKE it?" }] },
          { native: "أنا! يلا!", roman: "ana! yalla!", english: "Me! Let's go!", reply: [{ who: "teta", text: "Go where? It's midnight. Did you like the story?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{كتير حلوة، تيتا!}}", gloss: "“It was lovely, Teta!”" },
        { who: "teta", text: "My mother told it to me, on these same cushions. Now it's yours. Tell it to somebody one day.", gloss: "She kisses the top of your head." },
        { who: "guide", text: "Somewhere out in the dark, a dog barks, and Karim pretends it doesn't scare him." },
      ],
      encounter: ["helwe", "zghir", "ghoule", "nahr", "shater"],
      memory: "helwe",
    },
    gates: [{ room: "dar", hotspot: "barra", until: "sahra", line: { who: "teta", text: "Come and sit with me first.", gloss: "Teta pats the cushion next to her." } }],
    idle: {
      "barra:karim": [{ who: "karim", text: "I'm not scared of ghoulas. …Is the door locked?" }],
      "dar:teta": [{ who: "teta", text: "Soon you go home. But the stories come with you." }],
    },
    afterwards: {
      "dar:teta": [{ who: "teta", text: "When you're home, call. Every Sunday. I'll tell you another one." }],
      "barra:karim": [{ who: "karim", text: "Nus Nsays is basically me. Small. Clever. Obviously." }],
    },
    complete: {
      title: "Stories after",
      em: "Dinner",
      text: "You gathered the cousins under the stars, beat Karim's word test, heard Nus Nsays outwit the ghoula by lamplight — and told Teta her story was lovely.",
      quest: { v: "Sit a while longer", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Dar />,
};

export default content;
