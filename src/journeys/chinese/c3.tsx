import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Item, FY } from "../scenes";
import { Walls, Door, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { Icon } from "../kit";
import { SC, RED, GOLD, Couplet, RoundTable } from "./art";

/* CHINESE · Chapter Three — 长寿面, Noodles by Hand. Nǎinai's birthday, and one noodle that must never be cut. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const mixCard = card(<><path d="M8 44h64q-4 34-32 34T8 44Z" fill="#f4ecdd" /><ellipse cx="40" cy="44" rx="32" ry="8" fill="#efe6d0" /><path d="M40 36q10 -20 20 -28" stroke="#8fbfd8" strokeWidth="5" fill="none" strokeLinecap="round" /></>);
const kneadCard = card(<><ellipse cx="40" cy="62" rx="30" ry="16" fill="#efe2c4" /><path d="M24 56q16 -10 32 0" stroke="#d8c8a0" strokeWidth="3" fill="none" /><rect x="6" y="76" width="68" height="8" rx="3" fill="#8c6240" /></>);
const pullCard = card(<>{[30, 38, 46, 54].map((y) => <path key={y} d={`M8 ${y}q32 ${y % 16 ? 10 : -10} 64 0`} stroke="#efe2c4" strokeWidth="4" fill="none" />)}<circle cx="8" cy="42" r="7" fill="#c9a88a" /><circle cx="72" cy="42" r="7" fill="#c9a88a" /></>);
const potCard = card(<><rect x="10" y="44" width="60" height="36" rx="6" fill="#4a4a4e" /><ellipse cx="40" cy="44" rx="30" ry="7" fill="#6a6a6e" /><path d="M24 44q8 -20 16 0q8 -20 16 0" stroke="#efe2c4" strokeWidth="3" fill="none" /><path d="M30 30q-4 -10 2 -16M48 30q4 -10 -2 -16" stroke="#f4ecdd" strokeWidth="3" fill="none" opacity="0.6" /></>);
const soupCard = card(<><path d="M8 44h64q-4 34-32 34T8 44Z" fill={RED} /><ellipse cx="40" cy="44" rx="32" ry="8" fill="#e0a860" /><path d="M20 44q10 6 20 0t20 0" stroke="#efe2c4" strokeWidth="3" fill="none" /><ellipse cx="50" cy="42" rx="7" ry="4" fill="#fff" /><circle cx="50" cy="42" r="2.5" fill="#f0b429" /><path d="M24 40l6 -3M30 42l5 -4" stroke="#4f8a3a" strokeWidth="2" /></>);

function Chufang({ done }: { done: ReadonlySet<string> }) {
  const pulled = done.has("noodles");
  return (
    <Stage>
      <Walls tint="#e8e4da" floor="#8a847c" floorLine="#6a645c" shade="#d0cabe" />
      {/* white tiles behind the stove */}
      {Array.from({ length: 36 }, (_, i) => <rect key={i} x={980 + (i % 12) * 40} y={330 + Math.floor(i / 12) * 40} width="38" height="38" fill="#f4f2ec" stroke="#d8d4ca" />)}
      {/* the window: a slice of the Yellow Sea between two buildings */}
      <rect x={300} y={200} width="300" height="220" fill="#f4efe4" />
      <rect x={312} y={212} width="276" height="196" fill="#a8c8dc" />
      <rect x={312} y={330} width="276" height="78" fill="#5a8aa8" />
      <rect x={312} y={212} width="70" height="196" fill="#d8d0c0" />
      <rect x={520} y={212} width="68" height="196" fill="#e2dccc" />
      <line x1="450" y1="212" x2="450" y2="408" stroke="#f4efe4" strokeWidth="8" />
      {/* the stove, the pot */}
      <rect x={1000} y={FY - 170} width="440" height="170" fill="#c8c0b0" />
      <rect x={1060} y={FY - 230} width="140" height="60" rx="6" fill="#4a4a4e" />
      <ellipse cx={1130} cy={FY - 230} rx="70" ry="10" fill="#6a6a6e" />
      <path d="M1110 490q-12 -24 6 -44M1150 490q12 -24 -6 -44" stroke="#f4ecdd" strokeWidth="6" fill="none" opacity="0.45" />
      <rect x={1260} y={FY - 200} width="120" height="30" rx="6" fill="#2a2a2a" />
      {/* Yéye's board */}
      <rect x={560} y={FY - 150} width="380" height="150" fill={WOOD} />
      <rect x={540} y={FY - 162} width="420" height="18" fill="#c9a06a" />
      {pulled ? (
        [0, 1, 2, 3, 4].map((i) => <path key={i} d={`M590 ${FY - 170 - i * 5}q170 ${i % 2 ? 14 : -14} 340 0`} stroke="#efe2c4" strokeWidth="4" fill="none" />)
      ) : (
        <ellipse cx={750} cy={FY - 176} rx="70" ry="20" fill="#efe2c4" />
      )}
      {/* sack of flour */}
      <path d="M170 760v-130q60 -30 120 0v130Z" fill="#efeade" />
      <text x={230} y={690} textAnchor="middle" fontFamily={SC} fontSize="30" fill={RED}>面粉</text>
      <Figure x={860} y={FY} h={205} color="#2a1a12" pose="reach" flip />
      <Door x={1450} open />
    </Stage>
  );
}

function Keting({ done }: { done: ReadonlySet<string> }) {
  const guests = done.has("fetch");
  return (
    <Stage>
      <Walls tint="#efe6d4" />
      <Door x={40} open />
      <PhotoFrame x={420} y={250} w={180} h={130} tint={RED} two />
      <Couplet x={700} y={200} chars="福如东海" />
      <Couplet x={1060} y={200} chars="寿比南山" />
      {/* the birthday character, 寿, in gold on red */}
      <rect x={810} y={210} width="190" height="150" fill={RED} />
      <text x={905} y={318} textAnchor="middle" fontFamily={SC} fontSize="110" fill={GOLD}>寿</text>
      <RoundTable x={900} w={500} />
      {/* peach buns on a plate */}
      {[840, 880, 920, 960].map((x) => (
        <g key={x}>
          <circle cx={x} cy={FY - 180} r="18" fill="#f4ecdd" />
          <path d={`M${x} ${FY - 198}q10 8 0 18q-10 -10 0 -18Z`} fill="#e8708a" />
        </g>
      ))}
      <Figure x={660} y={FY} h={195} color="#2a1a12" pose="sit" />
      {guests && (
        <>
          <Figure x={1220} y={FY} h={210} color="#3a2a24" flip />
          <Child x={1340} y={FY} h={112} color="#2a1a12" flip />
        </>
      )}
      <rect x={1420} y={FY - 380} width="140" height="380" fill={WOOD} />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "chufang",
  speakers: {
    shushu: { name: "Shūshu", glyph: "叔", tone: "guest" },
    lele: { name: "Lèle", glyph: "乐", tone: "guest" },
  },
  rooms: {
    chufang: {
      id: "chufang",
      name: "Kitchen",
      native: "厨房",
      art: (done) => <Chufang done={done} />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "flour", x: 230, y: 660, label: "Sack of flour", kind: "word", wordId: "mianfen" },
        { id: "window", x: 450, y: 300, label: "Window", kind: "flavor", note: "Between two buildings, a slice of the Yellow Sea. Nǎinai grew up looking at exactly this." },
        { id: "board", x: 750, y: 560, label: "Yéye's board", kind: "quest" },
        { id: "yeye", x: 860, y: 540, label: "Yéye", kind: "npc" },
        { id: "stove", x: 1130, y: 520, label: "The pot", kind: "word", wordId: "tang" },
        { id: "keting", x: 1540, y: 560, label: "Living room", kind: "exit", to: "keting" },
      ],
    },
    keting: {
      id: "keting",
      name: "Living room",
      native: "客厅",
      art: (done) => <Keting done={done} />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "chufang", x: 130, y: 560, label: "Kitchen", kind: "exit", to: "chufang" },
        { id: "photo", x: 510, y: 315, label: "Old photo", kind: "word", wordId: "jia" },
        { id: "nainai", x: 660, y: 560, label: "Nǎinai", kind: "npc" },
        { id: "shou", x: 905, y: 285, label: "寿", kind: "flavor", note: "寿 (shòu) — long life. Hung up for birthdays, on both sides of it a couplet: “Fortune like the Eastern Sea, long life like the Southern Mountains.”" },
        { id: "peaches", x: 900, y: 560, label: "Peach buns", kind: "flavor", note: "Shòutáo — steamed buns shaped like peaches, pink at the tip. The peach is the fruit of long life.", culture: "peach" },
        { id: "shushu", x: 1220, y: 560, label: "Shūshu", kind: "npc", after: "fetch" },
        { id: "lele", x: 1340, y: 620, label: "Lèle", kind: "npc", after: "fetch" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "第三章 · Chinese",
      title: "Noodles",
      em: "by Hand",
      text: "It's Nǎinai's birthday. She's pretending not to know. Yéye has been in the kitchen since six, with his sleeves rolled up and the door shut.",
    },
    introLines: [
      { who: "yeye", text: "{{嘘！}} Come in, close the door. {{今天是奶奶的生日。}}", gloss: "xū! — shh! “Today is Nǎinai's birthday.”" },
      { who: "guide", text: "Quest: help Yéye make longevity noodles.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "hello",
        quest: { v: "Talk to Yéye", hint: "He's at the board in the kitchen." },
        at: { room: "chufang", hotspot: "yeye" },
        encounter: ["shengri", "mian"],
        lines: [
          { who: "yeye", text: "On your {{生日}}, you eat {{面条}}. Long noodles, for a long life.", gloss: "shēngrì — birthday. miàntiáo — noodles." },
          { who: "yeye", text: "I make them by hand. My mother taught me. Now you help. First — pass me things.", gloss: "He dusts his hands with flour." },
        ],
        nudges: { "keting:nainai": [{ who: "nainai", text: "Yéye's up to something in the kitchen. I know nothing. {{我什么都不知道。}}", gloss: "“I don't know anything.” She knows everything." }] },
      },
      {
        id: "fetch",
        quest: { v: "Pass Yéye what he needs", hint: "In the kitchen." },
        at: { room: "chufang", hotspot: "yeye" },
        lines: [{ who: "yeye", text: "Quick, before your Nǎinai comes in.", gloss: "Listen for the word." }],
        game: {
          type: "fetch",
          npc: "yeye",
          kicker: "Mini-game · 厨房",
          title: "Pass Yéye what he asks for.",
          hint: "Nothing is labelled. Listen for the word.",
          asks: [
            { wordId: "mianfen", native: "面粉。", roman: "miànfěn.", english: "Flour." },
            { wordId: "shui", native: "一点儿水。", roman: "yìdiǎnr shuǐ.", english: "A little water." },
            { wordId: "jidan", native: "鸡蛋，一个。", roman: "jīdàn, yí gè.", english: "An egg — one." },
            { wordId: "guo", native: "把锅给我。", roman: "bǎ guō gěi wǒ.", english: "Give me the pot." },
          ],
          items: [
            { wordId: "mianfen", label: "White sack", art: <Item kind="bag" color="#efeade" /> },
            { wordId: "shui", label: "Kettle", art: Icon.jug },
            { wordId: "jidan", label: "Fragile", art: <Item kind="round" color="#e8d0a8" /> },
            { wordId: "guo", label: "Heavy", art: <Item kind="bowl" color="#4a4a4e" accent="#6a6a6e" /> },
          ],
          done: { native: "好孩子！", roman: "hǎo háizi!", english: "Good kid!" },
        },
        after: [
          { who: "yeye", text: "Now the dough rests. Twenty minutes. Go see who's at the door — I heard your {{叔叔}}.", gloss: "shūshu — Dad's younger brother." },
        ],
        memory: "kitchen",
        nudges: { "keting:nainai": [{ who: "nainai", text: "Go help Yéye. I'm not looking. {{我不看。}}", gloss: "“I'm not looking.”" }] },
      },
      {
        id: "guests",
        quest: { v: "Say hello to Shūshu", hint: "In the living room." },
        at: { room: "keting", hotspot: "shushu" },
        encounter: ["shushu", "tangmei"],
        lines: [
          { who: "shushu", text: "Is this my brother's kid? So tall! {{我是你叔叔。}}", gloss: "“I'm your shūshu” — your dad's younger brother. He lives here in Yantai." },
          { who: "shushu", text: "And this is Lèle — your {{堂妹}}. Say hi, Lèle.", gloss: "tángmèi — a younger girl cousin on your dad's side. Mandarin has a word for every kind of cousin." },
          { who: "lele", text: "…Hi. Are you making the noodles? Can I pull?", gloss: "She's six, and holding a peach bun in each hand." },
          { who: "yeye", text: "{{来！}} The dough's ready!", gloss: "lái — come! From the kitchen." },
        ],
        nudges: { "chufang:yeye": [{ who: "yeye", text: "The dough's resting. Go say hello to your Shūshu." }] },
      },
      {
        id: "noodles",
        quest: { v: "Pull the noodles with Yéye", hint: "At the board in the kitchen." },
        at: { room: "chufang", hotspot: "board" },
        encounter: ["miantuan", "la"],
        lines: [
          { who: "yeye", text: "Mix. Knead the {{面团}}. {{拉}} — gently. Into the pot. Then the soup.", gloss: "miàntuán — dough. lā — pull." },
          { who: "yeye", text: "And never break it. One noodle, one long life.", gloss: "He puts your hands on the dough, under his." },
        ],
        game: {
          type: "sequence",
          kicker: "Mini-game · 长寿面",
          title: "Make the noodles, in order.",
          hint: "Tap the steps in the order Yéye showed you.",
          steps: [
            { native: "和面", roman: "huó miàn", english: "mix the flour and water", wordId: "mianfen", art: mixCard },
            { native: "揉面团", roman: "róu miàntuán", english: "knead the dough", wordId: "miantuan", art: kneadCard },
            { native: "拉面条", roman: "lā miàntiáo", english: "pull the noodle", wordId: "la", art: pullCard },
            { native: "下锅", roman: "xià guō", english: "into the pot", wordId: "guo", art: potCard },
            { native: "加汤", roman: "jiā tāng", english: "add the soup", wordId: "tang", art: soupCard },
          ],
          done: "One noodle, so long it fills the bowl — with an egg on top.",
        },
        after: [
          { who: "yeye", text: "{{很长！}} Not broken once. Now carry it to her. Both hands.", gloss: "hěn cháng — very long!" },
        ],
        culture: ["changshou"],
        memory: "noodles",
        nudges: {
          "keting:lele": [{ who: "lele", text: "Yéye's calling! The noodles!" }],
          "keting:shushu": [{ who: "shushu", text: "Go — Yéye doesn't let just anybody pull his noodles." }],
        },
      },
    ],
    ending: {
      at: { room: "keting", hotspot: "nainai" },
      quest: { v: "Bring Nǎinai her noodles", hint: "She's at the round table." },
      lines: [
        { who: "guide", text: "You set the bowl in front of Nǎinai. Everyone at the table goes quiet.", gloss: "Steam, soup, one impossibly long noodle, an egg on top." },
        { who: "yeye", text: "He leans down to you and whispers." },
      ],
      asker: "yeye",
      question: {
        native: "你想对奶奶说什么？",
        roman: "nǐ xiǎng duì nǎinai shuō shénme?",
        english: "What do you want to say to Nǎinai?",
        choices: [
          { native: "奶奶，生日快乐！", roman: "nǎinai, shēngrì kuàilè!", english: "Happy birthday, Nǎinai!", right: true },
          { native: "太贵了！", roman: "tài guì le!", english: "Too expensive!", reply: [{ who: "nainai", text: "Ha! The noodles were free, little one. Try again." }] },
          { native: "不要了，谢谢。", roman: "bú yào le, xièxie.", english: "No more, thanks.", reply: [{ who: "lele", text: "She hasn't even started eating yet!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{奶奶，生日快乐！}}", gloss: "“Happy birthday, Nǎinai!”" },
        { who: "nainai", text: "She slurps the whole noodle in one go without breaking it, and the whole table cheers.", gloss: "Then she wipes her eyes, and says it's the steam." },
        { who: "shushu", text: "{{长命百岁！}}", gloss: "cháng mìng bǎi suì — “may you live a hundred years!”" },
      ],
      encounter: ["changshoumian", "shengrikuaile", "chang"],
      memory: "birthday",
    },
    gates: [{ room: "chufang", hotspot: "keting", until: "fetch", line: { who: "yeye", text: "Not yet! If you go out there, she'll know. Help me first.", gloss: "Yéye blocks the door with a floury hand." } }],
    idle: {
      "chufang:yeye": [{ who: "yeye", text: "My mother made them for me every birthday. Now you know how." }],
      "keting:lele": [{ who: "lele", text: "Next time I'm pulling. You promised. (You didn't.)" }],
    },
    afterwards: {
      "keting:nainai": [{ who: "nainai", text: "Next week is Mid-Autumn. The whole family, one table, one moon. You'll see." }],
      "keting:shushu": [{ who: "shushu", text: "Come back for Mid-Autumn. We'll bring mooncakes — the good ones." }],
    },
    complete: {
      title: "Noodles",
      em: "by Hand",
      text: "You helped Yéye by ear, met your Shūshu and your tángmèi, pulled one unbroken longevity noodle — and wished Nǎinai a happy birthday in Mandarin.",
      quest: { v: "Have some birthday noodles", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Keting done={new Set(["guests"])} />,
};

export default content;
