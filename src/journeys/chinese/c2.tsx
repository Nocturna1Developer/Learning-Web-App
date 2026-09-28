import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Clouds, Ground, Stall, Crowd, Coin, Item, RoundTree, FY } from "../scenes";
import { Figure } from "../../components/scenes/primitives";
import { SC, RED, Block, Steamers, Scallions } from "./art";

/* CHINESE · Chapter Two — 早市, The Morning Market. Summer in Nǎinai's hometown, Yantai, on the Shandong coast. */

function Market({ deeper = false }: { deeper?: boolean }) {
  return (
    <Stage>
      <Sky id={deeper ? "zh2b" : "zh2a"} top="#9cc4dc" mid="#d8e6ea" bottom="#f6ecd6" />
      <Sun x={deeper ? 1420 : 200} y={120} r={46} color="#fbe6b0" />
      <Clouds seed={deeper ? 13 : 6} opacity={0.5} y={140} />
      {deeper ? (
        <>
          <Block x={-40} w={420} h={560} tint="#e8e2d4" />
          <Block x={1160} w={480} h={520} tint="#f0e8d8" />
        </>
      ) : (
        <>
          <Block x={-60} w={400} h={540} />
          <Block x={560} w={380} h={600} tint="#e2dccc" />
          <Block x={1240} w={420} h={500} tint="#efe6d2" />
        </>
      )}
      <RoundTree x={deeper ? 1000 : 1120} h={340} crown="#5a8a4a" dark="#3f6e3a" />
      <Ground color="#9a948a" line="#7a746a" kind="stone" />
      {deeper ? (
        <>
          {/* Lǎo Lǐ's apples, in crates on a tricycle cart */}
          <rect x={160} y={FY - 150} width="320" height="110" fill="#8a6a44" />
          {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={180 + (i % 7) * 44} cy={FY - 160 - Math.floor(i / 7) * 30} r="20" fill={i % 3 ? "#c0392b" : "#d8603a"} />)}
          <circle cx={200} cy={FY - 30} r="30" fill="#2a2a2a" />
          <circle cx={440} cy={FY - 30} r="30" fill="#2a2a2a" />
          <rect x={250} y={FY - 230} width="140" height="36" fill="#f4ecdd" />
          <text x={320} y={FY - 203} textAnchor="middle" fontFamily={SC} fontSize="24" fill={RED}>烟台苹果</text>
          <Figure x={540} y={FY} h={205} color="#2a1a12" flip />
          {/* the jiānbing griddle */}
          <rect x={760} y={FY - 120} width="220" height="120" fill="#c8c0b0" />
          <ellipse cx={870} cy={FY - 124} rx="96" ry="14" fill="#2a2a2a" />
          <ellipse cx={870} cy={FY - 128} rx="70" ry="9" fill="#e8c878" />
          <Figure x={1040} y={FY} h={200} color="#3a2a24" />
          {/* old men and a xiàngqí board */}
          <rect x={1200} y={FY - 90} width="160" height="14" fill="#8a6a44" />
          <Figure x={1180} y={FY} h={180} color="#2a1a12" pose="sit" />
          <Figure x={1390} y={FY} h={180} color="#2a1a12" pose="sit" flip />
          <Figure x={1520} y={FY} h={205} color="#2a1a12" flip />
        </>
      ) : (
        <>
          {/* Wáng Āyí's stall: steamers, soy milk, eggs, scallions */}
          <Stall x={100} w={420} colors={[RED, "#f4ecdd"]} goods={[{ color: "#f4ecdd", kind: "round" }, { color: "#e8d6b0", kind: "round" }]} sign="王记包子" signFont={SC} />
          <Steamers x={420} y={FY - 150} n={3} s={0.8} />
          <Scallions x={170} y={FY - 150} n={7} h={220} />
          <Figure x={560} y={FY} h={200} color="#3a2a24" flip />
          <Figure x={900} y={FY} h={205} color="#2a1a12" />
          <Crowd x={1260} n={4} spread={380} seed={29} scale={0.92} />
        </>
      )}
    </Stage>
  );
}

const yuan = <Coin symbol="¥" color="#c9cfd4" ink="#4a4a4a" />;

const content: ChapterContent = {
  startRoom: "xiang",
  speakers: {
    wang: { name: "Wáng Āyí", glyph: "王", tone: "guest" },
    laoli: { name: "Lǎo Lǐ", glyph: "李", tone: "guest" },
  },
  rooms: {
    xiang: {
      id: "xiang",
      name: "The lane",
      native: "小巷",
      art: <Market />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "scallions", x: 170, y: 520, label: "Scallions", kind: "word", wordId: "dacong" },
        { id: "steamers", x: 420, y: 480, label: "Steamers", kind: "word", wordId: "baozi" },
        { id: "wang", x: 560, y: 560, label: "Wáng Āyí", kind: "npc" },
        { id: "nainai", x: 900, y: 560, label: "Nǎinai", kind: "npc" },
        { id: "crowd", x: 1260, y: 560, label: "The crowd", kind: "word", wordId: "zaoshi" },
        { id: "next", x: 1530, y: 580, label: "Further in", kind: "exit", to: "shichang" },
      ],
    },
    shichang: {
      id: "shichang",
      name: "Deeper in",
      native: "市场里面",
      art: <Market deeper />,
      spawn: { left: 260, right: 1200 },
      hotspots: [
        { id: "back", x: 70, y: 580, label: "Back", kind: "exit", to: "xiang" },
        { id: "apples", x: 320, y: 560, label: "Apple cart", kind: "npc" },
        { id: "jianbing", x: 870, y: 600, label: "Jiānbing", kind: "flavor", note: "A crepe on a hot iron disc, an egg cracked on top, folded around a crispy cracker and a whole Shandong scallion. Nǎinai buys you one. It's the best thing you've ever eaten.", culture: "jianbing" },
        { id: "xiangqi", x: 1290, y: 620, label: "Xiàngqí game", kind: "flavor", note: "Two old men over a xiàngqí board — Chinese chess. Four more standing behind them, all giving advice. Nobody is listening." },
        { id: "nainai", x: 1040, y: 560, label: "Nǎinai", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "第二章 · Chinese",
      title: "The",
      em: "Morning Market",
      text: "Summer. You've flown across the world with Nǎinai and Yéye to her hometown, Yantai, on the Shandong coast. At six in the morning the lane behind her old building is already a market.",
    },
    introLines: [
      { who: "nainai", text: "{{快起来！}} The {{早市}} closes at nine.", gloss: "kuài qǐlai — get up, quick! zǎoshì — the morning market." },
      { who: "guide", text: "Quest: help Nǎinai buy breakfast.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "list",
        quest: { v: "Ask Nǎinai what she needs", hint: "She's in the middle of the lane." },
        at: { room: "xiang", hotspot: "nainai" },
        encounter: ["zaoshi"],
        lines: [
          { who: "nainai", text: "We need {{包子}}, {{豆浆}}, {{鸡蛋}} and {{大葱}}.", gloss: "bāozi, dòujiāng, jīdàn, dàcōng — steamed buns, soy milk, eggs and scallions." },
          { who: "nainai", text: "Wáng Āyí has sold buns on this corner for thirty years. She'll remember me.", gloss: "The stall with the steamers." },
        ],
        culture: ["zaoshi"],
      },
      {
        id: "pick",
        quest: { v: "Buy breakfast from Wáng Āyí", hint: "The stall with the steamers." },
        at: { room: "xiang", hotspot: "wang" },
        lines: [
          { who: "wang", text: "{{哎呀！}} Is that — it is! And this is your grandchild? {{来，来。}}", gloss: "āiyā! — oh my! lái, lái — come, come." },
          { who: "wang", text: "Hold the bag. I'll tell you what goes in.", gloss: "She's already talking to Nǎinai about 1974." },
        ],
        game: {
          type: "fetch",
          npc: "wang",
          kicker: "Mini-game · 早市",
          title: "Put what she names in the bag.",
          hint: "Nothing on the stall is labelled. Listen.",
          asks: [
            { wordId: "baozi", native: "包子，热的！", roman: "bāozi, rè de!", english: "Buns — hot ones!" },
            { wordId: "doujiang", native: "豆浆。", roman: "dòujiāng.", english: "Soy milk." },
            { wordId: "jidan", native: "鸡蛋，小心！", roman: "jīdàn, xiǎoxīn!", english: "Eggs — careful!" },
            { wordId: "dacong", native: "还有大葱。", roman: "hái yǒu dàcōng.", english: "And the scallions." },
          ],
          items: [
            { wordId: "baozi", label: "Steaming", art: <Item kind="round" color="#f4ecdd" accent="#e8d6b0" /> },
            { wordId: "doujiang", label: "Warm bag", art: <Item kind="bag" color="#efe6c8" /> },
            { wordId: "jidan", label: "Fragile", art: <Item kind="round" color="#e8d0a8" /> },
            { wordId: "dacong", label: "Very tall", art: <Item kind="long" color="#4f8a3a" /> },
          ],
          done: { native: "真棒！", roman: "zhēn bàng!", english: "Great!" },
        },
        after: [{ who: "wang", text: "Now pay me — in {{块}}. I'll say how many.", gloss: "kuài — what everyone calls yuan out loud." }],
        culture: ["dacong"],
        nudges: { "xiang:nainai": [{ who: "nainai", text: "Wáng Āyí. The steamers. {{去吧。}}", gloss: "qù ba — go on." }] },
      },
      {
        id: "pay",
        quest: { v: "Pay Wáng Āyí", hint: "Count out the yuan she asks for." },
        at: { room: "xiang", hotspot: "wang" },
        encounter: ["kuai"],
        lines: [{ who: "wang", text: "One thing at a time. Count it into my hand.", gloss: "The coins say ¥ — yuan." }],
        game: {
          type: "count",
          npc: "wang",
          kicker: "Mini-game · 数钱",
          title: "Count out what she asks for.",
          hint: "Tap coins to count them out, then hand them over.",
          unit: "yuan",
          coin: yuan,
          rounds: [
            { native: "大葱，两块。", roman: "dàcōng, liǎng kuài.", english: "Scallions: two yuan.", answer: 2, wordId: "liang" },
            { native: "豆浆，三块。", roman: "dòujiāng, sān kuài.", english: "Soy milk: three yuan.", answer: 3, wordId: "san" },
            { native: "包子，五块。", roman: "bāozi, wǔ kuài.", english: "Buns: five yuan.", answer: 5, wordId: "wu" },
            { native: "鸡蛋，十块。", roman: "jīdàn, shí kuài.", english: "Eggs: ten yuan.", answer: 10, wordId: "shi" },
          ],
          done: { native: "对了！", roman: "duì le!", english: "That's right!" },
        },
        after: [
          { who: "wang", text: "She slips an extra bun in the bag. {{给孩子的。}}", gloss: "gěi háizi de — for the kid." },
          { who: "nainai", text: "Now apples. Yantai apples — for Yéye. Further in. Let me do the talking.", gloss: "Everyone in Yantai says theirs are the best in China." },
        ],
        memory: "paid",
      },
      {
        id: "haggle",
        quest: { v: "Buy apples with Nǎinai", hint: "Further into the market." },
        at: { room: "shichang", hotspot: "apples" },
        encounter: ["pingguo", "duoshaoqian", "taigui"],
        lines: [
          { who: "nainai", text: "{{苹果多少钱？}}", gloss: "píngguǒ duōshao qián? — how much are the apples?" },
          { who: "laoli", text: "Twelve a jīn, Auntie. The best in Yantai.", gloss: "Lǎo Lǐ, the apple man. A jīn is half a kilo." },
          { who: "nainai", text: "{{太贵了！}} I was buying apples here before you were born.", gloss: "tài guì le — too expensive!" },
          { who: "laoli", text: "…Ten. And one free, for the little one.", gloss: "Nǎinai wins. Nǎinai always wins." },
        ],
        culture: ["apples"],
        memory: "haggle",
        nudges: {
          "shichang:nainai": [{ who: "nainai", text: "The apples first. {{走。}}", gloss: "zǒu — let's go." }],
          "xiang:nainai": [{ who: "nainai", text: "Further in! The apples." }],
        },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Lǎo Lǐ", hint: "He's asking if you want anything else." },
      lines: [{ who: "laoli", text: "He polishes the free apple on his sleeve, hands it to you, and waits." }],
      asker: "laoli",
      question: {
        native: "还要别的吗？",
        roman: "hái yào biéde ma?",
        english: "Want anything else?",
        choices: [
          { native: "不要了，谢谢！", roman: "bú yào le, xièxie!", english: "No more, thank you!", right: true },
          { native: "十块。", roman: "shí kuài.", english: "Ten yuan.", reply: [{ who: "laoli", text: "Ten yuan's the price, yes! But do you want anything else?" }] },
          { native: "多少钱？", roman: "duōshao qián?", english: "How much?", reply: [{ who: "laoli", text: "For what? I asked if you want anything else!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{不要了，谢谢！}}", gloss: "“No more, thank you!”" },
        { who: "laoli", text: "{{哟！}} Auntie, your grandkid speaks proper Mandarin!", gloss: "yō! — well!" },
        { who: "guide", text: "…Nǎinai says “of course” as if she hadn't been practising with you on the plane." },
      ],
      encounter: ["xiexie"],
      memory: "xiexie",
    },
    idle: {
      "xiang:wang": [{ who: "wang", text: "Come back tomorrow! I'll save you the hottest bun." }],
      "shichang:nainai": [{ who: "nainai", text: "Everything's in the bag. Let's eat on the way home." }],
    },
    afterwards: {
      "shichang:nainai": [{ who: "nainai", text: "Next week is my birthday. Yéye thinks I don't know he's planning noodles." }],
      "shichang:apples": [{ who: "laoli", text: "Ten a jīn. Don't tell the neighbours." }],
    },
    complete: {
      title: "The",
      em: "Morning Market",
      text: "You filled the bag by ear, counted out yuan in Mandarin, watched Nǎinai bargain for Yantai apples — and told Lǎo Lǐ “no more, thank you.”",
      quest: { v: "Eat your bāozi on the way home", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Market />,
};

export default content;
