import type { ChapterContent } from "../types";
import { Stage, Sky, Stars, Ground, Item, PaperLantern, FY } from "../scenes";
import { Walls, Door, Window, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { Icon } from "../kit";
import { SC, RED, GOLD, Block, Mooncake, RoundTable, Lantern } from "./art";

/* CHINESE · Chapter Four — 中秋, Mid-Autumn. A full moon, a round table, and everyone around it. */

function Tin({ x, y, open = false }: { x: number; y: number; open?: boolean }) {
  return (
    <g>
      <rect x={x - 50} y={y - 40} width="100" height="40" rx="6" fill={RED} />
      <rect x={x - 50} y={y - 40} width="100" height="10" fill={GOLD} opacity="0.8" />
      <text x={x} y={y - 8} textAnchor="middle" fontFamily={SC} fontSize="20" fill={GOLD}>月饼</text>
      {open && <Mooncake x={x} y={y - 56} r={16} />}
    </g>
  );
}

function Keting() {
  return (
    <Stage>
      <Walls tint="#efe6d4" />
      <Window x={300} y={210} w={280} h={210} />
      <Door x={1440} open />
      <Lantern x={760} y={250} s={0.7} glow={false} />
      {/* the dining table, covered in mooncake tins */}
      <rect x={560} y={FY - 150} width="560" height="18" fill={WOOD} />
      <rect x={580} y={FY - 132} width="16" height="132" fill={WOOD} />
      <rect x={1084} y={FY - 132} width="16" height="132" fill={WOOD} />
      <Tin x={650} y={FY - 150} />
      <Tin x={770} y={FY - 150} open />
      <Tin x={890} y={FY - 150} />
      <Tin x={1010} y={FY - 150} />
      <Tin x={710} y={FY - 190} />
      <Tin x={950} y={FY - 190} />
      <Figure x={1200} y={FY} h={200} color="#2a1a12" flip />
      <Child x={430} y={FY} h={112} color="#2a1a12" />
    </Stage>
  );
}

function Yuanzi({ done }: { done: ReadonlySet<string> }) {
  const set = done.has("table");
  return (
    <Stage>
      <Sky id="zh4" top="#0e1430" mid="#2a2a50" bottom="#6a4a5a" />
      <Stars n={50} seed={21} maxY={300} />
      {/* the moon, enormous, rising between the buildings */}
      <circle cx={800} cy={250} r={320} fill="#f7e6b0" opacity="0.06" />
      <circle cx={800} cy={250} r={130} fill="#f7e6b0" />
      <circle cx={760} cy={220} r={22} fill="#eed89a" />
      <circle cx={840} cy={290} r={16} fill="#eed89a" />
      <Block x={-60} w={440} h={560} tint="#b8b0a4" lit />
      <Block x={1220} w={440} h={520} tint="#c0b8aa" lit />
      <Ground color="#6a645c" line="#4a443c" kind="tile" />
      {/* lanterns strung across, each with a riddle slip */}
      <path d="M380 200 Q800 290 1220 200" stroke="#3a2718" strokeWidth="2" fill="none" />
      {[470, 590, 710, 890, 1010, 1130].map((x, i) => (
        <g key={x}>
          <PaperLantern x={x} y={228 + Math.sin(((x - 380) / 840) * Math.PI) * 80} s={0.6} color={i % 2 ? "#c0392b" : "#d9a441"} />
          <rect x={x - 8} y={268 + Math.sin(((x - 380) / 840) * Math.PI) * 80} width="16" height="40" fill="#f4ecdd" />
        </g>
      ))}
      <RoundTable x={800} w={520} />
      {set && (
        <>
          <Mooncake x={740} y={FY - 150} r={20} />
          <Mooncake x={800} y={FY - 148} r={20} />
          <circle cx={880} cy={FY - 150} r="18" fill="#c0392b" />
          <rect x={690} y={FY - 170} width="20" height="22" rx="4" fill="#f4ecdd" />
          <rect x={920} y={FY - 170} width="20" height="22" rx="4" fill="#f4ecdd" />
        </>
      )}
      <Figure x={560} y={FY} h={190} color="#141018" pose="sit" />
      <Figure x={1040} y={FY} h={195} color="#141018" pose="sit" flip />
      <Figure x={1160} y={FY} h={210} color="#141018" flip />
      <Child x={420} y={FY} h={110} color="#141018" />
    </Stage>
  );
}

const mooncakeCoin = <svg viewBox="0 0 64 64" aria-hidden="true"><Mooncake x={32} y={32} r={28} /></svg>;

const content: ChapterContent = {
  startRoom: "keting",
  speakers: {
    shushu: { name: "Shūshu", glyph: "叔", tone: "guest" },
    lele: { name: "Lèle", glyph: "乐", tone: "guest" },
  },
  rooms: {
    keting: {
      id: "keting",
      name: "Living room",
      native: "客厅",
      art: <Keting />,
      spawn: { left: 300, right: 1300 },
      hotspots: [
        { id: "lele", x: 430, y: 620, label: "Lèle", kind: "npc" },
        { id: "lantern", x: 760, y: 250, label: "Lantern", kind: "word", wordId: "denglong" },
        { id: "boxes", x: 830, y: 560, label: "Mooncake tins", kind: "quest" },
        { id: "nainai", x: 1200, y: 560, label: "Nǎinai", kind: "npc" },
        { id: "yuanzi", x: 1530, y: 560, label: "Downstairs", kind: "exit", to: "yuanzi" },
      ],
    },
    yuanzi: {
      id: "yuanzi",
      name: "The courtyard",
      native: "院子",
      art: (done) => <Yuanzi done={done} />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "keting", x: 70, y: 560, label: "Upstairs", kind: "exit", to: "keting" },
        { id: "lele", x: 420, y: 620, label: "Lèle", kind: "npc" },
        { id: "lanterns", x: 590, y: 360, label: "Riddle lanterns", kind: "quest" },
        { id: "moon", x: 800, y: 250, label: "The moon", kind: "word", wordId: "yueliang" },
        { id: "table", x: 800, y: 580, label: "Round table", kind: "quest" },
        { id: "nainai", x: 1040, y: 560, label: "Nǎinai", kind: "npc" },
        { id: "yeye", x: 1160, y: 540, label: "Yéye", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "第四章 · Chinese",
      title: "Mid-",
      em: "Autumn",
      text: "The fifteenth day of the eighth month, and the fullest moon of the year. Half the building has been swapping mooncakes since breakfast.",
    },
    introLines: [
      { who: "nainai", text: "{{中秋节快乐！}} Come — we have boxes to pack.", gloss: "zhōngqiū jié kuàilè — happy Mid-Autumn Festival!" },
      { who: "guide", text: "Quest: get everyone to the round table by moonrise.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "boxes",
        quest: { v: "Pack the mooncake tins", hint: "On the table in the living room." },
        at: { room: "keting", hotspot: "boxes" },
        encounter: ["zhongqiu", "yuebing"],
        lines: [
          { who: "nainai", text: "At {{中秋}}, you give {{月饼}} to everyone you know. Wáng Āyí, Lǎo Lǐ, the neighbours.", gloss: "zhōngqiū — Mid-Autumn. yuèbing — mooncakes." },
          { who: "nainai", text: "I'll tell you how many for each tin. Count carefully.", gloss: "Lotus paste, red bean, and the ones with an egg yolk inside, like a little moon." },
        ],
        game: {
          type: "count",
          npc: "nainai",
          kicker: "Mini-game · 送月饼",
          title: "Pack the tins.",
          hint: "Tap mooncakes to count them, then close the tin.",
          unit: "mooncakes",
          coin: mooncakeCoin,
          rounds: [
            { native: "给乐乐两个。", roman: "gěi Lèle liǎng gè.", english: "Two for Lèle.", answer: 2, wordId: "liang" },
            { native: "王阿姨，四个。", roman: "Wáng Āyí, sì gè.", english: "Wáng Āyí: four.", answer: 4, wordId: "si" },
            { native: "老李，六个。", roman: "Lǎo Lǐ, liù gè.", english: "Lǎo Lǐ: six.", answer: 6, wordId: "liu" },
            { native: "我们家，八个！", roman: "wǒmen jiā, bā gè!", english: "Our family: eight!", answer: 8, wordId: "ba" },
          ],
          done: { native: "一个都不少！", roman: "yí gè dōu bù shǎo!", english: "Not one missing!" },
        },
        after: [{ who: "nainai", text: "Eight for us — a lucky number. Now take the tea downstairs. Yéye is setting the table.", gloss: "八 (bā) sounds like 发 (fā), to prosper." }],
        culture: ["yuebing"],
        memory: "boxes",
        nudges: {
          "keting:lele": [{ who: "lele", text: "Nǎinai says I get two. Only two. Go count them!" }],
          "keting:nainai": [{ who: "nainai", text: "The tins first, on the table." }],
        },
      },
      {
        id: "table",
        quest: { v: "Help Yéye set the round table", hint: "Downstairs in the courtyard." },
        at: { room: "yuanzi", hotspot: "table" },
        encounter: ["cha"],
        lines: [{ who: "yeye", text: "The moon's nearly up. Pass me things — quick.", gloss: "Yéye, arranging stools with great seriousness." }],
        game: {
          type: "fetch",
          npc: "yeye",
          kicker: "Mini-game · 赏月",
          title: "Pass Yéye what he asks for.",
          hint: "Listen for the word.",
          asks: [
            { wordId: "yuebing", native: "月饼放中间。", roman: "yuèbing fàng zhōngjiān.", english: "Mooncakes in the middle." },
            { wordId: "cha", native: "茶呢？", roman: "chá ne?", english: "Where's the tea?" },
            { wordId: "pingguo", native: "苹果，烟台的！", roman: "píngguǒ, Yāntái de!", english: "Apples — Yantai ones!" },
            { wordId: "denglong", native: "再挂一个灯笼。", roman: "zài guà yí gè dēnglong.", english: "Hang one more lantern." },
          ],
          items: [
            { wordId: "yuebing", label: "Round", art: <svg viewBox="0 0 80 90" aria-hidden="true"><Mooncake x={40} y={50} r={28} /></svg> },
            { wordId: "cha", label: "Hot", art: Icon.teacup },
            { wordId: "pingguo", label: "Red", art: <Item kind="round" color="#c0392b" /> },
            { wordId: "denglong", label: "Paper", art: <svg viewBox="0 0 80 90" aria-hidden="true"><ellipse cx="40" cy="48" rx="26" ry="30" fill={RED} /><rect x="28" y="14" width="24" height="8" fill={GOLD} /><rect x="28" y="74" width="24" height="8" fill={GOLD} /></svg> },
          ],
          done: { native: "齐了！", roman: "qí le!", english: "All set!" },
        },
        memory: "tuanyuan",
        nudges: {
          "yuanzi:nainai": [{ who: "nainai", text: "Help Yéye with the table first." }],
          "yuanzi:yeye": [{ who: "yeye", text: "The table, the table! The moon won't wait." }],
        },
      },
      {
        id: "moon",
        quest: { v: "Sit with Nǎinai", hint: "At the round table." },
        at: { room: "yuanzi", hotspot: "nainai" },
        encounter: ["yueliang", "yuan", "tuanyuan"],
        lines: [
          { who: "nainai", text: "Look. {{月亮圆了。}}", gloss: "yuèliang yuán le — the moon is full." },
          { who: "nainai", text: "Round moon, round table, round family. {{团圆}} — everyone together again.", gloss: "tuányuán — reunion. Tonight every family in China is trying to be in one place." },
          { who: "shushu", text: "Lèle's been at the riddle lanterns for an hour. Go help her before she cries.", gloss: "Shūshu, peeling an apple in one long ribbon." },
        ],
        culture: ["zhongqiu"],
        nudges: { "yuanzi:lele": [{ who: "lele", text: "Sit with Nǎinai first. She's been waiting all day for tonight." }] },
      },
      {
        id: "riddles",
        quest: { v: "Guess a lantern riddle with Lèle", hint: "Under the lanterns." },
        at: { room: "yuanzi", hotspot: "lanterns" },
        encounter: ["dengmi", "cai"],
        lines: [
          { who: "lele", text: "Every lantern has a {{灯谜}}. If you get one right, you win a sweet.", gloss: "dēngmí — a lantern riddle." },
          { who: "lele", text: "I can't get this one. You {{猜}}!", gloss: "cāi — guess." },
        ],
        culture: ["dengmi"],
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer the riddle", hint: "Lèle is reading it out." },
      lines: [{ who: "lele", text: "She tugs the paper slip off the lantern and reads it slowly, one character at a time." }],
      asker: "lele",
      question: {
        native: "什么东西越洗越脏？",
        roman: "shénme dōngxi yuè xǐ yuè zāng?",
        english: "What gets dirtier the more you wash with it?",
        choices: [
          { native: "水！", roman: "shuǐ!", english: "Water!", right: true },
          { native: "月饼！", roman: "yuèbing!", english: "A mooncake!", reply: [{ who: "lele", text: "You don't WASH a mooncake! …Do you?" }] },
          { native: "苹果！", roman: "píngguǒ!", english: "An apple!", reply: [{ who: "shushu", text: "Apples get cleaner when you wash them. Think again." }] },
        ],
      },
      right: [
        { who: "you", text: "{{水！}}", gloss: "“Water!” The more you wash with it, the dirtier it gets." },
        { who: "lele", text: "{{哇！}} Here — you won. Half is mine though.", gloss: "wā! She breaks the prize sweet in two." },
        { who: "guide", text: "Everyone at the table is looking up now. Nǎinai says there's a story about who lives up there." },
      ],
      encounter: ["shui"],
      memory: "riddle",
    },
    gates: [{ room: "keting", hotspot: "yuanzi", until: "boxes", line: { who: "nainai", text: "The tins first! Then downstairs.", gloss: "Nǎinai points at the table." } }],
    idle: {
      "keting:boxes": [{ who: "guide", text: "Every tin packed and tied with red string." }],
      "yuanzi:yeye": [{ who: "yeye", text: "The good stool faces the moon. That one's Nǎinai's." }],
      "yuanzi:table": [{ who: "guide", text: "Mooncakes, tea, Yantai apples. Nobody's eating yet — everyone's looking up." }],
    },
    afterwards: {
      "yuanzi:nainai": [{ who: "nainai", text: "Later, on the roof, I'll tell you who lives on the moon. My grandmother told me on this same roof." }],
      "yuanzi:lele": [{ who: "lele", text: "Next year I'm getting ALL the riddles." }],
    },
    complete: {
      title: "Mid-",
      em: "Autumn",
      text: "You packed the mooncake tins by number, set the round table by ear, watched the moon rise with the whole family — and guessed a lantern riddle in Mandarin.",
      quest: { v: "Eat a mooncake under the moon", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Yuanzi done={new Set(["table"])} />,
};

export default content;
