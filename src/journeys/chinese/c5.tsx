import type { ChapterContent, StoryPanel } from "../types";
import { Stage, Sky, Stars, Ground, FY } from "../scenes";
import { Figure, Child } from "../../components/scenes/primitives";
import { Panel } from "../kit";
import { RED, Block, Mooncake, RoundTable } from "./art";

/* CHINESE · Chapter Five — 故事, Stories. On the roof under the Mid-Autumn moon: Chang'e and the jade rabbit. */

function MoonWithRabbit({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r * 2.8} fill="#f7e6b0" opacity="0.06" />
      <circle cx={x} cy={y} r={r} fill="#f7e6b0" />
      <g transform={`translate(${x} ${y}) scale(${r / 100})`} fill="#e2cc8a">
        <ellipse cx="10" cy="30" rx="36" ry="26" />
        <circle cx="40" cy="0" r="18" />
        <ellipse cx="34" cy="-34" rx="7" ry="24" />
        <ellipse cx="50" cy="-30" rx="6" ry="20" />
        {/* the pestle and mortar */}
        <rect x="-50" y="20" width="30" height="34" rx="4" />
        <rect x="-40" y="-20" width="8" height="46" transform="rotate(20 -36 0)" />
      </g>
    </g>
  );
}

function Yuanzi() {
  return (
    <Stage>
      <Sky id="zh5a" top="#0c1028" bottom="#3a3050" />
      <Stars n={40} seed={4} maxY={300} />
      <MoonWithRabbit x={800} y={200} r={90} />
      <Block x={-60} w={440} h={560} tint="#a8a094" lit />
      <Block x={1220} w={440} h={520} tint="#b0a89a" lit />
      <Ground color="#5a544c" line="#3a342c" kind="tile" />
      <RoundTable x={760} w={480} />
      <Mooncake x={720} y={FY - 150} r={18} />
      {/* the stairwell door, up to the roof */}
      <rect x={1400} y={FY - 300} width="150" height="300" fill="#3a3a40" />
      <rect x={1420} y={FY - 280} width="110" height="280" fill="#ffd98a" opacity="0.5" />
      <Figure x={560} y={FY} h={190} color="#100c14" pose="sit" />
      <Figure x={960} y={FY} h={200} color="#100c14" flip />
    </Stage>
  );
}

function Wuding({ done }: { done: ReadonlySet<string> }) {
  const told = done.has("story");
  return (
    <Stage>
      <Sky id="zh5b" top="#060a20" mid="#141a3a" bottom="#2a2a48" />
      <Stars n={120} seed={17} maxY={560} />
      <MoonWithRabbit x={1080} y={230} r={told ? 130 : 110} />
      {/* the city below: the tops of other blocks, and the sea */}
      <rect x="0" y="560" width="1600" height="60" fill="#1a2a44" />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={i * 190 - 20} y={520 + (i % 3) * 14} width="150" height="80" fill="#22222c" />)}
      {Array.from({ length: 30 }, (_, i) => <rect key={`w${i}`} x={(i * 53) % 1600} y={536 + (i % 4) * 14} width="10" height="7" fill="#ffd98a" opacity="0.7" />)}
      {/* the roof itself */}
      <rect x="0" y={FY - 70} width="1600" height="70" fill="#4a4a50" />
      <rect x="0" y={FY - 76} width="1600" height="10" fill="#6a6a70" />
      <Ground color="#5a5a60" line="#3a3a40" kind="tile" />
      {/* water tank, laundry line, the blanket */}
      <rect x={100} y={FY - 260} width="170" height="190" rx="10" fill="#6a7a8a" />
      <rect x={120} y={FY - 70} width="18" height="70" fill="#3a3a40" />
      <rect x={232} y={FY - 70} width="18" height="70" fill="#3a3a40" />
      <path d="M320 430 L700 460" stroke="#8a8a90" strokeWidth="2" />
      {[380, 480, 580].map((x, i) => <rect key={x} x={x} y={436 + i * 8} width="60" height="80" fill={["#c0392b", "#2d6ab8", "#e8e2d4"][i]} opacity="0.8" />)}
      <rect x={560} y={FY - 10} width="440" height="30" rx="6" fill={RED} opacity="0.9" />
      <Mooncake x={900} y={FY - 12} r={16} />
      <Figure x={720} y={FY} h={185} color="#0a0810" pose="sit" />
      <Child x={860} y={FY} h={104} color="#0a0810" pose="stand" />
      <rect x={1400} y={FY - 260} width="160" height="260" fill="#3a3a40" />
    </Stage>
  );
}

const sunsPanel = (
  <Panel id="zh5p1" sky={["#f0a040", "#e05a2a"]} ground="#8a4a2a">
    {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={40 + (i % 5) * 80} cy={40 + Math.floor(i / 5) * 60} r="20" fill="#fbe36a" />)}
    <path d="M40 210l30 -12l20 16l40 -10M220 214l30 -14l40 12" stroke="#5a2a1a" strokeWidth="3" fill="none" />
  </Panel>
);

const story: StoryPanel[] = [
  { art: sunsPanel, text: "Long, long ago, there were ten suns — {{十个太阳}}. They all rose at once, and the rivers dried up and the fields cracked." },
  {
    art: (
      <Panel id="zh5p2" sky={["#f0b060", "#e8804a"]} ground="#7a4a2a">
        <circle cx="330" cy="50" r="22" fill="#fbe36a" />
        <Figure x={140} y={200} h={120} color="#2a1a12" pose="reach" />
        <path d="M168 110q30 40 0 80" stroke="#2a1a12" strokeWidth="4" fill="none" />
        <path d="M168 150h110" stroke="#2a1a12" strokeWidth="2" />
        {[230, 260, 290].map((x) => <path key={x} d={`M${x} ${60 + (x % 3) * 10}l12 12`} stroke="#fbe36a" strokeWidth="4" />)}
      </Panel>
    ),
    text: "A great archer, Hòuyì, climbed the highest mountain and shot down nine of them — and left one, so the world would still have its {{太阳}}.",
  },
  {
    art: (
      <Panel id="zh5p3" sky={["#8ab0d0", "#d0c0a0"]} ground="#6a5a3a">
        <Figure x={130} y={200} h={110} color="#2a1a12" />
        <Figure x={250} y={200} h={104} color="#6a2a3a" />
        <rect x="186" y="120" width="18" height="22" rx="4" fill="#f4ecdd" />
        <circle cx="195" cy="118" r="5" fill={RED} />
      </Panel>
    ),
    text: "As a reward, the gods gave him a {{药}} — an elixir that would let one person live forever. He gave it to his wife, Chang'e, to keep safe.",
  },
  {
    art: (
      <Panel id="zh5p4" sky={["#1a1a3a", "#3a3a5a"]} ground="#2a2a3a">
        <circle cx="330" cy="50" r="30" fill="#f7e6b0" />
        <Figure x={200} y={150} h={100} color="#6a2a3a" />
        <path d="M170 160q30 30 60 0" stroke="#f4ecdd" strokeWidth="3" fill="none" opacity="0.6" />
        <Figure x={60} y={200} h={100} color="#1a1210" pose="walk" />
      </Panel>
    ),
    text: "One night, a thief broke in to steal it. To keep it from him, Chang'e drank the elixir herself — and began to {{飞}}, up and up, out of the window.",
  },
  {
    art: (
      <Panel id="zh5p5" sky={["#060818", "#1a2040"]} ground={null}>
        {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={(i * 97) % 400} cy={(i * 53) % 240} r="1.5" fill="#f4ecdd" opacity="0.7" />)}
        <circle cx="200" cy="120" r="84" fill="#f7e6b0" />
        <Figure x={170} y={170} h={80} color="#6a2a3a" />
        <g transform="translate(236 150)" fill="#f4ecdd">
          <ellipse rx="18" ry="12" />
          <circle cx="14" cy="-10" r="8" />
          <ellipse cx="12" cy="-26" rx="3" ry="10" />
          <ellipse cx="18" cy="-24" rx="3" ry="9" />
        </g>
      </Panel>
    ),
    text: "She floated all the way to the moon. She lives there still, with the {{玉兔}} — the jade rabbit — who pounds medicine beside her. And every year at Mid-Autumn, Hòuyì set out her favourite cakes under the full moon.",
  },
];

const content: ChapterContent = {
  startRoom: "yuanzi",
  speakers: {
    lele: { name: "Lèle", glyph: "乐", tone: "guest" },
  },
  rooms: {
    yuanzi: {
      id: "yuanzi",
      name: "The courtyard",
      native: "院子",
      art: <Yuanzi />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "nainai", x: 560, y: 560, label: "Nǎinai", kind: "npc" },
        { id: "moon", x: 800, y: 200, label: "The moon", kind: "word", wordId: "yueliang" },
        { id: "table", x: 760, y: 580, label: "Mooncakes", kind: "word", wordId: "yuebing" },
        { id: "yeye", x: 960, y: 540, label: "Yéye", kind: "npc" },
        { id: "stairs", x: 1475, y: 560, label: "Stairs to the roof", kind: "exit", to: "wuding" },
      ],
    },
    wuding: {
      id: "wuding",
      name: "The roof",
      native: "屋顶",
      art: (done) => <Wuding done={done} />,
      spawn: { left: 400, right: 1300 },
      hotspots: [
        { id: "tank", x: 185, y: 520, label: "Water tank", kind: "flavor", note: "Every roof in the neighbourhood has one. Nǎinai used to hide behind this one when she was Lèle's age." },
        { id: "nainai", x: 720, y: 600, label: "Nǎinai", kind: "npc" },
        { id: "lele", x: 860, y: 620, label: "Lèle", kind: "npc" },
        { id: "moon", x: 1080, y: 230, label: "The moon", kind: "quest" },
        { id: "sky", x: 400, y: 150, label: "Stars", kind: "word", wordId: "xingxing" },
        { id: "down", x: 1480, y: 560, label: "Downstairs", kind: "exit", to: "yuanzi" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "第五章 · Chinese",
      title: "Stories on",
      em: "the Roof",
      text: "Mid-Autumn night, after dinner. The table is all peel and crumbs. Nǎinai has a blanket over her arm and is heading for the stairs.",
    },
    introLines: [
      { who: "nainai", text: "{{走，上屋顶。}} The moon is better from up there.", gloss: "zǒu, shàng wūdǐng — come, up to the roof." },
      { who: "guide", text: "Quest: go up to the roof with Nǎinai.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "up",
        quest: { v: "Talk to Nǎinai", hint: "At the table in the courtyard." },
        at: { room: "yuanzi", hotspot: "nainai" },
        encounter: ["wuding"],
        lines: [
          { who: "nainai", text: "When I was little, we took our mooncakes up to the {{屋顶}} and stayed until we fell asleep.", gloss: "wūdǐng — the roof." },
          { who: "nainai", text: "Lèle's already up there. Go — I'm slower on stairs than I was.", gloss: "The stairwell door, on the right." },
        ],
        culture: ["roof"],
        nudges: { "yuanzi:yeye": [{ who: "yeye", text: "Nǎinai's going up to the roof. Go with her — I'll clear the table." }] },
      },
      {
        id: "stars",
        quest: { v: "Find Lèle on the roof", hint: "Up the stairs." },
        at: { room: "wuding", hotspot: "lele" },
        encounter: ["xingxing", "tian"],
        lines: [
          { who: "lele", text: "Look at all the {{星星}}! There are never this many in the city.", gloss: "xīngxing — stars." },
          { who: "lele", text: "While we wait for Nǎinai — I'm testing you. Everything from this whole {{天}}!", gloss: "tiān — day, and sky. Same word." },
        ],
        game: { type: "memory", kicker: "Mini-game · Lèle's test", title: "Match the word to what it means.", hint: "Words from the market, the noodles and Mid-Autumn. Matches in a row build a combo." },
        after: [{ who: "lele", text: "{{好吧}}, you're good. Nǎinai's here! Nǎinai, tell the moon story!", gloss: "hǎo ba — fine." }],
        nudges: { "wuding:nainai": [{ who: "nainai", text: "Catch my breath first. Go keep Lèle company." }] },
      },
      {
        id: "story",
        quest: { v: "Listen to Nǎinai's story", hint: "On the blanket." },
        at: { room: "wuding", hotspot: "nainai" },
        encounter: ["gushi"],
        lines: [{ who: "nainai", text: "{{一个很老的故事。}} My grandmother told it to me, up here.", gloss: "yí gè hěn lǎo de gùshi — a very old story." }],
        game: {
          type: "story",
          kicker: "A story from Nǎinai",
          title: "Chang'e and the Jade Rabbit",
          native: "嫦娥奔月",
          teller: "nainai",
          panels: story,
          question: {
            native: "谁飞到了月亮上？",
            roman: "shéi fēi dào le yuèliang shàng?",
            english: "Who flew to the moon?",
            choices: [
              { native: "嫦娥", roman: "Cháng'é", english: "Chang'e", right: true },
              { native: "后羿", roman: "Hòuyì", english: "Hòuyì", reply: [{ who: "nainai", text: "Hòuyì stayed on earth, looking up. Who drank the elixir?" }] },
              { native: "乐乐", roman: "Lèle", english: "Lèle", reply: [{ who: "lele", text: "I'm RIGHT HERE. Who flew away?" }] },
            ],
          },
        },
        after: [{ who: "nainai", text: "Now look up. Carefully. Who can you see?", gloss: "She points at the moon." }],
        culture: ["change"],
        memory: "moonstory",
      },
    ],
    ending: {
      at: { room: "wuding", hotspot: "moon" },
      quest: { v: "Look for them on the moon", hint: "Up in the sky." },
      lines: [
        { who: "guide", text: "The moon is so bright it throws shadows on the roof. In the grey patches, if you squint…", gloss: "A rabbit, with a pestle. And maybe, just maybe, a lady." },
      ],
      asker: "nainai",
      question: {
        native: "月亮上有谁？",
        roman: "yuèliang shàng yǒu shéi?",
        english: "Who's on the moon?",
        choices: [
          { native: "嫦娥和玉兔！", roman: "Cháng'é hé yùtù!", english: "Chang'e and the jade rabbit!", right: true },
          { native: "十个太阳！", roman: "shí gè tàiyáng!", english: "Ten suns!", reply: [{ who: "nainai", text: "Ten suns? Hòuyì took care of those. Who's on the moon?" }] },
          { native: "王阿姨！", roman: "Wáng Āyí!", english: "Wáng Āyí!", reply: [{ who: "lele", text: "Wáng Āyí is downstairs eating OUR mooncakes. Who's on the moon?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{嫦娥和玉兔！}}", gloss: "“Chang'e and the jade rabbit!”" },
        { who: "nainai", text: "Wherever you are — at home, across the ocean — it's the same moon. Look at it, and think of us.", gloss: "{{千里共婵娟}} — “a thousand miles apart, we share the same moon.” A line from a poem." },
        { who: "guide", text: "Lèle has fallen asleep on the blanket. Nobody moves for a long time." },
      ],
      encounter: ["change", "yutu", "yao", "fei", "taiyang"],
      memory: "moon",
    },
    gates: [{ room: "yuanzi", hotspot: "stairs", until: "up", line: { who: "nainai", text: "Wait for me! Talk to me first.", gloss: "Nǎinai is folding the blanket." } }],
    idle: {
      "wuding:lele": [{ who: "lele", text: "The rabbit's making medicine. For Chang'e. Obviously." }],
      "yuanzi:yeye": [{ who: "yeye", text: "I've heard the story. Six hundred times. Go on up." }],
    },
    afterwards: {
      "wuding:nainai": [{ who: "nainai", text: "Soon we fly home. But the moon comes with us — remember." }],
      "wuding:lele": [{ who: "lele", text: "Zzz…" }],
    },
    complete: {
      title: "Stories on",
      em: "the Roof",
      text: "You climbed to the roof, beat Lèle's word test, heard the legend of Chang'e and the jade rabbit — and found them both on the moon.",
      quest: { v: "Stay on the roof a while", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Wuding done={new Set(["story"])} />,
};

export default content;
