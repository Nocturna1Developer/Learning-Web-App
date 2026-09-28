import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, VideoCall, Table, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure } from "../../components/scenes/primitives";
import { Portrait } from "../kit";
import { SC, RED, GOLD, FuDiamond, Mooncake, Steamers } from "./art";

/* CHINESE · Chapter Six — 家, Home. Back across the ocean, and a call to the cousins in Shandong. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const baoziCard = card(<g transform="translate(40 86) scale(0.5)"><Steamers x={0} y={0} n={2} s={1} steam /></g>);
const noodleCard = card(<><path d="M8 44h64q-4 34-32 34T8 44Z" fill={RED} /><ellipse cx="40" cy="44" rx="32" ry="8" fill="#e0a860" />{[0, 1, 2].map((i) => <path key={i} d={`M16 ${42 + i * 2}q12 ${i % 2 ? 6 : -6} 24 0t24 0`} stroke="#efe2c4" strokeWidth="2.5" fill="none" />)}</>);
const mooncakeCard = card(<Mooncake x={40} y={48} r={28} />);
const moonCard = card(<><rect width="80" height="90" fill="#0c1028" /><circle cx="40" cy="44" r="26" fill="#f7e6b0" /><g transform="translate(46 50)" fill="#e2cc8a"><ellipse rx="9" ry="6" /><circle cx="7" cy="-5" r="4" /><ellipse cx="6" cy="-13" rx="1.6" ry="5" /></g></>);

function Keting({ done }: { done: ReadonlySet<string> }) {
  return (
    <Stage>
      <Walls tint="#ece2d0" shade="#d8ccb6" />
      <Door x={40} />
      <FuDiamond x={130} y={330} size={70} />
      <Window x={340} y={210} w={300} h={220} />
      <PhotoFrame x={700} y={230} w={150} h={110} tint={RED} two />
      <Table x={560} w={460} />
      <VideoCall x={650} y={FY - 150 - 190} w={300} faces={done.has("call") ? 5 : 2} bgs={[RED, "#2d6ab8", GOLD, "#3f7d55"]} />
      <rect x={1100} y={FY - 150} width="380" height="150" rx="12" fill="#3a4a5a" />
      <rect x={1100} y={FY - 214} width="380" height="80" rx="14" fill="#4a5a6a" />
      <Figure x={1250} y={FY - 20} h={190} color="#2a1a12" pose="sit" />
      <Figure x={1400} y={FY} h={205} color="#3a2a24" flip />
    </Stage>
  );
}

function Fangjian() {
  return (
    <Stage>
      <Walls tint="#e4e0d4" />
      <Window x={240} y={220} w={320} h={230} />
      {/* the paper lantern from Mid-Autumn, hanging from the lamp */}
      <line x1="740" y1="0" x2="740" y2="250" stroke="#3a2718" strokeWidth="2" />
      <ellipse cx="740" cy="300" rx="44" ry="52" fill={GOLD} />
      <rect x="720" y="244" width="40" height="10" fill={RED} />
      <rect x="720" y="348" width="40" height="10" fill={RED} />
      {/* the suitcase */}
      <rect x={880} y={FY - 170} width="300" height="170" rx="12" fill="#3a3a44" />
      <path d={`M880 ${FY - 170} l40 -90 h220 l40 90`} fill="#4a4a54" />
      <rect x={930} y={FY - 200} width="90" height="34" rx="4" fill={RED} />
      <text x={975} y={FY - 176} textAnchor="middle" fontFamily={SC} fontSize="18" fill={GOLD}>月饼</text>
      <rect x={1040} y={FY - 196} width="110" height="10" rx="4" fill="#c9a06a" />
      <rect x={60} y={FY - 150} width="420" height="150" fill="#8c6240" />
      <rect x={60} y={FY - 126} width="420" height="60" fill="#2d6ab8" />
      <rect x={1240} y={FY - 420} width="240" height="420" fill={WOOD} />
      {[0, 1, 2, 3].map((r) => <rect key={r} x={1250} y={FY - 400 + r * 100} width="220" height="88" fill="#3a2718" />)}
      <Door x={1500} open />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "fangjian",
  speakers: {
    shushu: { name: "Shūshu", glyph: "叔", tone: "guest" },
    shenshen: { name: "Shěnshen", glyph: "婶", tone: "guest" },
    lele: { name: "Lèle", glyph: "乐", tone: "guest" },
    haohao: { name: "Hàohao", glyph: "浩", tone: "guest" },
  },
  rooms: {
    fangjian: {
      id: "fangjian",
      name: "Your room",
      native: "房间",
      art: <Fangjian />,
      spawn: { left: 560, right: 1360 },
      hotspots: [
        { id: "window", x: 400, y: 460, label: "Window", kind: "word", wordId: "jia" },
        { id: "lantern", x: 740, y: 300, label: "Paper lantern", kind: "word", wordId: "denglong" },
        { id: "suitcase", x: 1030, y: 620, label: "Suitcase", kind: "quest" },
        { id: "keting", x: 1540, y: 560, label: "Living room", kind: "exit", to: "keting" },
      ],
    },
    keting: {
      id: "keting",
      name: "Living room",
      native: "客厅",
      art: (done) => <Keting done={done} />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "back", x: 130, y: 560, label: "Your room", kind: "exit", to: "fangjian" },
        { id: "fu", x: 130, y: 330, label: "The 福", kind: "word", wordId: "fu" },
        { id: "photo", x: 775, y: 285, label: "New photo", kind: "flavor", note: "A new photo on the table: everyone on the roof in Yantai, squinting into the flash, Lèle asleep in Shūshu's arms." },
        { id: "laptop", x: 800, y: 520, label: "Video call", kind: "quest" },
        { id: "nainai", x: 1250, y: 560, label: "Nǎinai", kind: "npc" },
        { id: "mama", x: 1400, y: 560, label: "Māma", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "第六章 · Chinese",
      title: "Coming",
      em: "Home",
      text: "Back across the ocean. The house is exactly where you left it, the jet lag is winning, and your suitcase still smells like Wáng Āyí's steamer.",
    },
    introLines: [
      { who: "mama", text: "Unpack, then come — Shūshu's calling from Yantai. The whole family.", gloss: "Māma, from the living room." },
      { who: "guide", text: "Quest: bring Shandong home.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "unpack",
        quest: { v: "Unpack your suitcase", hint: "In your room." },
        at: { room: "fangjian", hotspot: "suitcase" },
        encounter: ["xiangzi", "jinian"],
        lines: [
          { who: "guide", text: "A mooncake tin, empty except for crumbs. The paper lantern, folded flat. One very long chopstick from Yéye's kitchen.", gloss: "Everything in the {{箱子}} — xiāngzi, the suitcase." },
          { who: "guide", text: "Every one of them a {{纪念}}.", gloss: "jìniàn — a keepsake. Something to remember by." },
          { who: "mama", text: "{{他们打来了！}} Come!", gloss: "tāmen dǎ lái le — they're calling!" },
        ],
        memory: "keepsakes",
      },
      {
        id: "call",
        quest: { v: "Join the video call", hint: "In the living room." },
        at: { room: "keting", hotspot: "laptop" },
        lines: [
          { who: "shushu", text: "{name}! Can you see us? Everyone, wave!", gloss: "Shūshu, on the screen, much too close to the camera." },
          { who: "haohao", text: "Hi. I'm Hàohao. I was at camp. Lèle hasn't stopped talking about you.", gloss: "Lèle's big brother, fourteen, trying to look bored." },
          { who: "guide", text: "Five faces on one screen. Who's who?", gloss: "Mandarin has a different word for every kind of relative. Put everyone in their place." },
        ],
        game: {
          type: "place",
          board: "album",
          kicker: "Mini-game · 一家人",
          title: "Who's who on the call?",
          hint: "Pick someone, then the word that fits them. Mandarin cares which side of the family, and who's older.",
          tray: "On the screen",
          done: "Everyone has a word — the right one.",
          items: [
            { wordId: "shushu", who: "Bàba's younger brother", hint: "Loud. Peels apples in one long ribbon.", art: <Portrait />, tint: "#2d6ab8" },
            { wordId: "shenshen", who: "Shūshu's wife", hint: "Sent the good mooncakes. Wants to know if you ate them.", art: <Portrait />, tint: RED },
            { wordId: "tangge", who: "The older boy cousin", hint: "Fourteen. Was at camp. Pretends to be bored.", art: <Portrait child />, tint: GOLD },
            { wordId: "tangmei", who: "The younger girl cousin", hint: "Six. Asleep on the roof. Keeps half of every prize.", art: <Portrait child />, tint: "#3f7d55" },
          ],
        },
        after: [{ who: "shenshen", text: "Now tell us — what was your favourite part? {{用中文说！}}", gloss: "yòng Zhōngwén shuō — say it in Chinese!" }],
        memory: "call",
        nudges: { "fangjian:suitcase": [{ who: "guide", text: "The rest can wait. They're calling." }] },
      },
      {
        id: "retell",
        quest: { v: "Tell them about your summer", hint: "On the call." },
        at: { room: "keting", hotspot: "laptop" },
        lines: [{ who: "guide", text: "Tell it in order — the way it happened.", gloss: "Everything you did, in Mandarin." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · 回忆",
          title: "Tell your summer in order.",
          hint: "From the first morning to the last night.",
          steps: [
            { native: "早市的包子", roman: "zǎoshì de bāozi", english: "buns at the morning market", wordId: "baozi", art: baoziCard },
            { native: "奶奶的长寿面", roman: "nǎinai de chángshòu miàn", english: "Nǎinai's longevity noodles", wordId: "changshoumian", art: noodleCard },
            { native: "中秋的月饼", roman: "zhōngqiū de yuèbing", english: "Mid-Autumn mooncakes", wordId: "yuebing", art: mooncakeCard },
            { native: "嫦娥和玉兔", roman: "Cháng'é hé yùtù", english: "Chang'e and the jade rabbit", wordId: "yutu", art: moonCard },
          ],
          done: "The whole summer, in Mandarin. Shěnshen is clapping. Hàohao has stopped pretending to be bored.",
        },
        memory: "retold",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Lèle", hint: "She's pushed everyone out of the way." },
      lines: [{ who: "lele", text: "Lèle climbs onto Shūshu's lap and fills the entire screen." }],
      asker: "lele",
      question: {
        native: "你什么时候回来？",
        roman: "nǐ shénme shíhou huílai?",
        english: "When are you coming back?",
        choices: [
          { native: "明年见！", roman: "míngnián jiàn!", english: "See you next year!", right: true },
          { native: "不要了，谢谢。", roman: "bú yào le, xièxie.", english: "No more, thanks.", reply: [{ who: "shushu", text: "Ha! We're not selling apples! She asked when you're coming back." }] },
          { native: "生日快乐！", roman: "shēngrì kuàilè!", english: "Happy birthday!", reply: [{ who: "lele", text: "It's not my birthday till March! When are you coming BACK?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{明年见！}}", gloss: "“See you next year!”" },
        { who: "lele", text: "{{我想你。}}", gloss: "wǒ xiǎng nǐ — “I miss you.” She says it fast, then hides behind Shūshu." },
        { who: "you", text: "{{我也想你！}}", gloss: "“I miss you too!”" },
        { who: "nainai", text: "In Chinese we don't say goodbye. We say {{再见}} — see you again.", gloss: "zàijiàn." },
        { who: "you", text: "{{再见！}}", gloss: "“See you again!”" },
      ],
      encounter: ["mingnian", "xiangni", "zaijian"],
      memory: "zaijian",
    },
    idle: {
      "keting:mama": [{ who: "mama", text: "Go on — they've been waiting all week for this call." }],
      "keting:nainai": [{ who: "nainai", text: "Tell them about the noodles. Yéye will pretend not to be proud." }],
      "fangjian:suitcase": [{ who: "guide", text: "Everything's out. The lantern goes on the lamp." }],
    },
    afterwards: {
      "keting:nainai": [{ who: "nainai", text: "The whole call in Mandarin. {{我的好孩子。}}", gloss: "wǒ de hǎo háizi — my good child." }],
      "keting:mama": [{ who: "mama", text: "Shěnshen has already sent me a list of what to bring next summer." }],
      "keting:laptop": [{ who: "guide", text: "The call's over. Somewhere over the ocean it's already tomorrow morning — and the morning market is opening." }],
    },
    complete: {
      title: "Coming",
      em: "Home",
      text: "Keepsakes unpacked, every relative named the Mandarin way, your whole summer retold — and a goodbye that means “see you again.”",
      quest: { v: "Hang the lantern up", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Keting done={new Set(["call"])} />,
};

export default content;
