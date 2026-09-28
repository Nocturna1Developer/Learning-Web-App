import type { ChapterContent } from "../types";
import { Stage, VideoCall, Table, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Kite, Muggu, Figure } from "../../components/scenes/primitives";
import { Portrait } from "../kit";

/* TELUGU · Chapter Six — The Family. Home again, and the goodbye that promises you'll come back. */

const memo = (c: React.ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const wellCard = memo(<><ellipse cx="40" cy="44" rx="28" ry="8" fill="#6b6660" /><rect x="12" y="44" width="56" height="34" fill="#8a847c" /><path d="M16 20h48M20 20v24M60 20v24" stroke="#5a3a22" strokeWidth="5" /></>);
const mangoCard = memo(<><circle cx="30" cy="52" r="16" fill="#f0b429" /><circle cx="52" cy="54" r="16" fill="#e8a020" /><path d="M40 40q4-10 12-12" stroke="#3f7d55" strokeWidth="4" fill="none" /></>);
const mugguCard = memo(<g transform="translate(40 48) scale(0.26) translate(-40 -48)"><Muggu x={40} y={48} size={200} color="#f4ecdd" /></g>);
const storyCard = memo(<><path d="M10 80 q30 -60 60 0" fill="#2a3a2a" /><rect x="36" y="44" width="8" height="36" fill="#3a2a1a" /><circle cx="60" cy="18" r="8" fill="#f4ecdd" /></>);

function Living({ done }: { done: ReadonlySet<string> }) {
  return (
    <Stage>
      <Walls tint="#e6dcc8" />
      <Door x={40} open />
      <Window x={980} y={200} w={320} h={220} tulasi />
      {/* the village, framed on the wall now */}
      <PhotoFrame x={330} y={260} w={220} h={150} tint="#b8562f" two />
      <rect x={600} y={250} width="120" height="160" fill="#f4ecdd" stroke="#3a2718" strokeWidth="8" />
      <g transform="translate(660 330) scale(0.36) translate(-660 -330)"><Muggu x={660} y={330} size={200} color="#c0392b" /></g>
      <Table x={560} w={460} />
      <VideoCall x={640} y={FY - 150 - 190} w={300} faces={done.has("tree") ? 6 : 2} />
      <rect x={1100} y={FY - 150} width="360" height="150" rx="12" fill="#1f4d33" />
      <rect x={1100} y={FY - 210} width="360" height="76" rx="14" fill="#2a6a44" />
      <Figure x={1250} y={FY - 20} h={190} color="#2a1a12" pose="sit" />
    </Stage>
  );
}

function Gadhi() {
  return (
    <Stage>
      <Walls tint="#e4dcc9" />
      <Window x={250} y={220} w={320} h={230} />
      {/* the Sankranti kite, pinned to the wall */}
      <Kite x={760} y={330} size={80} color="#c0392b" accent="#d9a441" rot={-10} tail={0.7} />
      {/* the suitcase, still half packed */}
      <rect x={880} y={FY - 170} width="300" height="170" rx="12" fill="#2d4a78" />
      <path d={`M880 ${FY - 170} l40 -90 h220 l40 90`} fill="#3a5a88" />
      {[930, 990, 1050, 1110].map((x, i) => <circle key={x} cx={x} cy={FY - 180} r="14" fill={["#c0392b", "#d9a441", "#3f7d55", "#e0508a"][i]} opacity="0.9" />)}
      <rect x={1240} y={FY - 420} width="240" height="420" fill={WOOD} />
      {[0, 1, 2, 3].map((r) => <rect key={r} x={1250} y={FY - 400 + r * 100} width="220" height="88" fill="#3a2718" />)}
      <rect x={60} y={FY - 150} width="420" height="150" fill="#8c6240" />
      <rect x={60} y={FY - 126} width="420" height="60" fill="#c8503f" />
      <Door x={1500} open />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "gadhi",
  speakers: {
    maavayya: { name: "Maavayya", glyph: "మా", tone: "guest" },
  },
  rooms: {
    gadhi: {
      id: "gadhi",
      name: "Your room",
      native: "గది",
      art: <Gadhi />,
      spawn: { left: 560, right: 1360 },
      hotspots: [
        { id: "window", x: 410, y: 460, label: "Window", kind: "word", wordId: "illu" },
        { id: "kite", x: 760, y: 330, label: "The kite", kind: "word", wordId: "gaalipatam" },
        { id: "suitcase", x: 1030, y: 620, label: "Suitcase", kind: "quest" },
        { id: "living", x: 1540, y: 560, label: "Living room", kind: "exit", to: "living" },
      ],
    },
    living: {
      id: "living",
      name: "Living room",
      native: "హాలు",
      art: (done) => <Living done={done} />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "back", x: 130, y: 560, label: "Your room", kind: "exit", to: "gadhi" },
        { id: "photo", x: 440, y: 330, label: "The village, framed", kind: "word", wordId: "ooru" },
        { id: "muggu", x: 660, y: 330, label: "Framed muggu", kind: "word", wordId: "muggu" },
        { id: "laptop", x: 790, y: 520, label: "Video call", kind: "quest" },
        { id: "amma", x: 1250, y: 560, label: "Amma", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Chapter Six · Telugu",
      title: "Where it stops",
      em: "being a game",
      text: "Home again. The house smells like it did before, the jet lag is winning, and there's still sand from the village in your shoes.",
    },
    introLines: [
      { who: "amma", text: "Unpack, then come — Ammamma's calling at six. Everyone will be there.", gloss: "Amma, from the living room." },
      { who: "guide", text: "Quest: bring the village home.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "unpack",
        quest: { v: "Unpack the suitcase", hint: "In your room." },
        at: { room: "gadhi", hotspot: "suitcase" },
        encounter: ["jnaapakam"],
        lines: [
          { who: "guide", text: "Bangles from the santha. A box of ariselu, squashed. A kite with a torn tail.", gloss: "Every one of them a {{జ్ఞాపకం}} — jnaapakam, a keepsake, a memory." },
          { who: "amma", text: "They're calling! Come, come.", gloss: "The living room." },
        ],
        memory: "keepsakes",
      },
      {
        id: "tree",
        quest: { v: "Join the video call", hint: "In the living room." },
        at: { room: "living", hotspot: "laptop" },
        lines: [
          { who: "ammamma", text: "{name}! {{బాగున్నావా?}}", gloss: "baagunnaavaa? — are you well? Ammamma, on the screen." },
          { who: "maavayya", text: "Is that my favourite? Say hello to everyone!", gloss: "Maavayya — Amma's brother — pushes his face into the camera." },
          { who: "guide", text: "Six faces on one screen. Who's who?", gloss: "Put everyone in their place." },
        ],
        game: {
          type: "place",
          board: "album",
          kicker: "Mini-game · కుటుంబం",
          title: "Who's who on the call?",
          hint: "Pick someone, then the name that fits. The names are how you'd call them in Telugu.",
          tray: "On the screen",
          done: "Everyone has a name — and a Telugu one.",
          items: [
            { wordId: "maavayya", who: "Amma's brother", hint: "Loud, funny, calls you his favourite.", art: <Portrait />, tint: "#2d6ab8" },
            { wordId: "pinni", who: "Amma's younger sister", hint: "She taught Amma to ride a bicycle.", art: <Portrait />, tint: "#e0508a" },
            { wordId: "akka", who: "Your older cousin", hint: "Twelve. Rolls her eyes at Maavayya.", art: <Portrait child />, tint: "#d9a441" },
            { wordId: "tammudu", who: "Your little cousin", hint: "Five. Keeps waving at the camera.", art: <Portrait child />, tint: "#3f7d55" },
          ],
        },
        after: [{ who: "tatayya", text: "Now tell us — what did you like best about the {{ఊరు}}?", gloss: "ooru — the village. Tatayya, squeezing into the frame." }],
        memory: "call",
        nudges: { "gadhi:suitcase": [{ who: "guide", text: "The rest can wait. They're calling." }] },
      },
      {
        id: "retell",
        quest: { v: "Tell them about your summer", hint: "On the call." },
        at: { room: "living", hotspot: "laptop" },
        lines: [{ who: "guide", text: "Tell it in order — the way it happened.", gloss: "Everything you did, in Telugu." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · జ్ఞాపకాలు",
          title: "Tell your summer in order.",
          hint: "From the first day to the last.",
          steps: [
            { native: "బావి నుంచి నీళ్ళు", roman: "baavi nunchi neellu", english: "water from the well", wordId: "baavi", art: wellCard },
            { native: "సంతలో మామిడిపండ్లు", roman: "santhalo maamidipandlu", english: "mangoes at the santha", wordId: "mamidi", art: mangoCard },
            { native: "సంక్రాంతి ముగ్గు", roman: "sankraanti muggu", english: "the Sankranti muggu", wordId: "chukkalu", art: mugguCard },
            { native: "మర్రి చెట్టు కింద కథ", roman: "marri chettu kinda katha", english: "a story under the banyan", wordId: "katha", art: storyCard },
          ],
          done: "The whole summer, in Telugu. Ammamma is wiping her eyes.",
        },
        memory: "retold",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Ammamma", hint: "She has one more question." },
      lines: [{ who: "ammamma", text: "Everyone's quiet. Ammamma leans towards the screen." }],
      asker: "ammamma",
      question: {
        native: "మళ్ళీ ఎప్పుడు వస్తావు?",
        roman: "malli eppudu vastaavu?",
        english: "When will you come again?",
        choices: [
          { native: "త్వరలో వస్తాను!", roman: "twaralo vastaanu!", english: "I'll come soon!", right: true },
          { native: "తిన్నాను", roman: "tinnaanu", english: "I've eaten", reply: [{ who: "ammamma", text: "Good! But I asked when you're coming back." }] },
          { native: "చాలు", roman: "chaalu", english: "enough", reply: [{ who: "maavayya", text: "Enough of us already? Ha! Try again." }] },
        ],
      },
      right: [
        { who: "you", text: "{{త్వరలో వస్తాను, అమ్మమ్మా!}}", gloss: "“I'll come soon, Ammamma!”" },
        { who: "guide", text: "In Telugu, you never just say goodbye. You say {{వెళ్ళొస్తాను}} — “I'll go, and come back.”", gloss: "vellostaanu. Say it." },
        { who: "you", text: "{{వెళ్ళొస్తాను!}}", gloss: "“I'll go — and I'll come back.”" },
        { who: "ammamma", text: "{{సరే. మళ్ళీ రా.}}", gloss: "sare. malli raa — okay. Come again." },
      ],
      encounter: ["twaralo", "vellostaanu", "malli"],
      memory: "vellostaanu",
    },
    idle: {
      "living:amma": [{ who: "amma", text: "Go on — they've been waiting all week for this call." }],
      "gadhi:suitcase": [{ who: "guide", text: "Everything's out. The kite stays on the wall." }],
    },
    afterwards: {
      "living:amma": [{ who: "amma", text: "You spoke to them in Telugu the whole time. Do you know how long they've waited for that?" }],
      "living:laptop": [{ who: "guide", text: "The call's over. The screen still has Ammamma's thumbprint on the camera." }],
    },
    complete: {
      title: "The",
      em: "Family",
      text: "Keepsakes unpacked, every cousin named, your whole summer retold in Telugu — and a goodbye that promises you'll come back.",
      quest: { v: "Put the kite back on the wall", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Living done={new Set(["tree"])} />,
};

export default content;
