import type { ChapterContent } from "../types";
import { Stage, Sky, Sun, Clouds, Hills, Ground, Item, StringLights, FY } from "../scenes";
import { Figure, Child } from "../../components/scenes/primitives";
import { AR, LV, StoneHouse, OliveTree, Sack } from "./art";

/* ARABIC · Chapter Four — الضيعة, The Village. Autumn: nets under the olive trees, the press, and dabke when the work is done. */

function Karm({ done }: { done: ReadonlySet<string> }) {
  const picked = done.has("tools");
  return (
    <Stage>
      <Sky id="ar4a" top="#8ab8d8" mid="#c8dce4" bottom="#efe6d0" />
      <Sun x={1380} y={120} r={46} color="#fbe6b0" />
      <Clouds seed={8} opacity={0.5} y={160} />
      <Hills y={500} color="#a8a878" amp={70} seed={3} />
      <Hills y={560} color="#8a9a62" amp={50} seed={7} />
      {/* terraces of stone walls */}
      <path d="M0 640h1600" stroke="#c8b890" strokeWidth="14" />
      <Ground color="#a88a5a" line="#886a3e" kind="dirt" />
      <OliveTree x={300} h={330} fruit={!picked} />
      <OliveTree x={860} h={380} fruit={!picked} />
      <OliveTree x={1380} h={300} fruit={!picked} />
      {/* nets under the trees */}
      {[300, 860, 1380].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={FY - 4} rx="190" ry="18" fill="#2a6a4a" opacity="0.8" />
          {picked && Array.from({ length: 22 }, (_, i) => <ellipse key={i} cx={x - 150 + ((i * 37) % 300)} cy={FY - 8 - (i % 3) * 3} rx="5" ry="4" fill={i % 3 ? "#3a3a2a" : "#6b7a3a"} />)}
        </g>
      ))}
      {/* the ladder, Jiddo up it */}
      <path d="M760 760l60 -300M820 760l60 -300" stroke="#8a5a34" strokeWidth="8" />
      {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M${768 + i * 8} ${720 - i * 40}h58`} stroke="#8a5a34" strokeWidth="6" />)}
      <Figure x={836} y={FY - 190} h={170} color="#2a1a12" pose="reach" />
      <Figure x={560} y={FY} h={205} color="#2a1a12" />
      <Child x={1100} y={FY} h={120} color="#3a2a24" flip />
      <Figure x={1180} y={FY} h={195} color="#2a1a12" pose="reach" flip />
    </Stage>
  );
}

function Saha({ done }: { done: ReadonlySet<string> }) {
  const evening = done.has("sacks");
  return (
    <Stage>
      <Sky id={evening ? "ar4c" : "ar4b"} top={evening ? "#2a2a4a" : "#8ab8d8"} mid={evening ? "#8a5a6a" : undefined} bottom={evening ? "#f0a060" : "#efe6d0"} />
      <StoneHouse x={-40} w={400} h={360} lit={evening} />
      <StoneHouse x={1220} w={420} h={340} lit={evening} shutter="#2d6a5a" />
      {/* the press: an old stone building, a big arched door */}
      <rect x={420} y={FY - 400} width="560" height="400" fill={LV.stoneDark} />
      <path d={`M560 ${FY}v-200q140 -120 280 0v200Z`} fill="#3a2a1e" />
      <circle cx={700} cy={FY - 110} r="70" fill="#8a8078" />
      <rect x={560} y={FY - 440} width="280" height="44" fill="#3a2a1e" />
      <text x={700} y={FY - 408} textAnchor="middle" fontFamily={AR} fontSize="28" fill="#e8c25a">معصرة الضيعة</text>
      <Ground color="#b8a888" line="#98886a" kind="stone" />
      {evening && <StringLights x1={0} x2={1600} y={160} sag={60} />}
      {/* sacks waiting by the door */}
      {[1020, 1070, 1120, 1045, 1095].map((x, i) => <Sack key={i} x={x} y={FY - (i > 2 ? 60 : 0)} s={1.1} />)}
      <Figure x={900} y={FY} h={205} color="#2a1a12" />
      {evening ? (
        // the dabke line, arms linked
        [260, 330, 400, 470, 540].map((x, i) => <Figure key={x} x={x + (i % 2) * 6} y={FY} h={190 + (i % 3) * 10} color="#1e1418" />)
      ) : (
        <Figure x={320} y={FY} h={195} color="#2a1a12" pose="sit" />
      )}
    </Stage>
  );
}

const sackCoin = <svg viewBox="0 0 64 64" aria-hidden="true"><Sack x={32} y={60} s={0.95} /></svg>;

const content: ChapterContent = {
  startRoom: "karm",
  speakers: {
    karim: { name: "Karim", glyph: "ك", tone: "guest" },
    abumarwan: { name: "Abu Marwan", glyph: "م", tone: "guest" },
  },
  rooms: {
    karm: {
      id: "karm",
      name: "The olive grove",
      native: "كرم الزيتون",
      art: (done) => <Karm done={done} />,
      spawn: { left: 260, right: 1300 },
      hotspots: [
        { id: "tree", x: 300, y: 520, label: "Old olive tree", kind: "word", wordId: "shajara" },
        { id: "teta", x: 560, y: 560, label: "Teta", kind: "npc" },
        { id: "jiddo", x: 820, y: 460, label: "Jiddo, up the ladder", kind: "npc" },
        { id: "nets", x: 860, y: 740, label: "Nets", kind: "word", wordId: "shabake" },
        { id: "karim", x: 1100, y: 620, label: "Karim", kind: "npc" },
        { id: "saha", x: 1530, y: 580, label: "Down to the village", kind: "exit", to: "saha" },
      ],
    },
    saha: {
      id: "saha",
      name: "The village square",
      native: "ساحة الضيعة",
      art: (done) => <Saha done={done} />,
      spawn: { left: 240, right: 1200 },
      hotspots: [
        { id: "karm", x: 70, y: 580, label: "Up to the grove", kind: "exit", to: "karm" },
        { id: "dabke", x: 400, y: 560, label: "The square", kind: "quest" },
        { id: "press", x: 700, y: 560, label: "Olive press", kind: "word", wordId: "maasara" },
        { id: "abumarwan", x: 900, y: 560, label: "Abu Marwan", kind: "npc" },
        { id: "sacks", x: 1070, y: 620, label: "Sacks", kind: "quest" },
        { id: "house", x: 1420, y: 520, label: "Teta's old house", kind: "word", wordId: "bayt" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "الفصل الرابع · Arabic",
      title: "The",
      em: "Village",
      text: "October. You're back in the mountains — this time in Teta's village, higher up, where the family's olive trees grow on stone terraces. Everybody's here. Everybody has a job.",
    },
    introLines: [
      { who: "teta", text: "{{أهلا بالضيعة!}} Old clothes? Good. Jiddo's already up a ladder.", gloss: "ahla bid-ḍay‘a — welcome to the village!" },
      { who: "guide", text: "Quest: bring in the olive harvest.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "arrive",
        quest: { v: "Find Jiddo in the grove", hint: "He's up the ladder." },
        at: { room: "karm", hotspot: "jiddo" },
        encounter: ["daya", "shajara"],
        lines: [
          { who: "jiddo", text: "This {{شجرة}} was planted by my grandfather's grandfather. Maybe his grandfather. Nobody really knows.", gloss: "shajara — tree. Some olive trees in the Levant are over a thousand years old." },
          { who: "jiddo", text: "The whole {{ضيعة}} comes back for the harvest. Now — help me. I'll call for what I need.", gloss: "ḍay‘a — village." },
        ],
        culture: ["harvest"],
      },
      {
        id: "tools",
        quest: { v: "Hand Jiddo what he needs", hint: "At the ladder." },
        at: { room: "karm", hotspot: "jiddo" },
        encounter: ["zaytoon"],
        lines: [{ who: "jiddo", text: "I can't come down — pass things up. Listen!", gloss: "He's halfway up the ladder, a branch in one hand." }],
        game: {
          type: "fetch",
          npc: "jiddo",
          kicker: "Mini-game · القطاف",
          title: "Pass Jiddo what he calls for.",
          hint: "Nothing is labelled. Listen for the word.",
          asks: [
            { wordId: "shabake", native: "الشبكة، مدّها تحت!", roman: "ash-shabake, maddha taḥt!", english: "The net — spread it underneath!" },
            { wordId: "asa", native: "العصا.", roman: "al-‘aṣa.", english: "The stick." },
            { wordId: "sillom", native: "السلّم، بسرعة!", roman: "as-sillom, bi-sir‘a!", english: "The ladder, quick!" },
            { wordId: "salle", native: "والسلّة.", roman: "w as-salle.", english: "And the basket." },
          ],
          items: [
            { wordId: "shabake", label: "Green mesh", art: <Item kind="flat" color="#2a6a4a" accent="#4a8a6a" /> },
            { wordId: "asa", label: "Long", art: <Item kind="long" color="#8a5a34" /> },
            { wordId: "sillom", label: "Tall", art: <svg viewBox="0 0 80 90" aria-hidden="true"><path d="M24 86l10 -80M50 86l10 -80" stroke="#8a5a34" strokeWidth="5" />{[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${26 + i * 2} ${74 - i * 16}h26`} stroke="#8a5a34" strokeWidth="4" />)}</svg> },
            { wordId: "salle", label: "Woven", art: <Item kind="bag" color="#c8a060" /> },
          ],
          done: { native: "الله يعطيكن العافية!", roman: "alla ya‘ṭīkon il-‘āfye!", english: "God give you all strength!" },
        },
        after: [
          { who: "guide", text: "Jiddo shakes the branches with the stick, and the {{زيتون}} rains down onto the nets like hail.", gloss: "zaytoon — olives." },
          { who: "karim", text: "Now we carry it all down to the press. Every sack. {{يلا!}}", gloss: "Karim — your cousin, twelve, already sweating." },
        ],
        memory: "harvest",
        nudges: {
          "karm:teta": [{ who: "teta", text: "Help Jiddo, before he tries to climb higher." }],
          "karm:karim": [{ who: "karim", text: "Jiddo's shouting for you. Go!" }],
        },
      },
      {
        id: "sacks",
        quest: { v: "Weigh the sacks at the press", hint: "Down in the village square." },
        at: { room: "saha", hotspot: "sacks" },
        encounter: ["maasara"],
        lines: [{ who: "abumarwan", text: "The family's sacks! Put them on the scale — I'll tell you how many each time.", gloss: "Abu Marwan runs the {{معصرة}} — the olive press. The whole village waits for him in October." }],
        game: {
          type: "count",
          npc: "abumarwan",
          kicker: "Mini-game · الميزان",
          title: "Load the scale.",
          hint: "Tap sacks to count them onto the scale, then weigh them.",
          unit: "sacks",
          coin: sackCoin,
          rounds: [
            { native: "تنين من كرم تيتا.", roman: "tnēn min karm teta.", english: "Two from Teta's grove.", answer: 2, wordId: "tnen" },
            { native: "أربعة من عند جدو.", roman: "arba‘a min ‘and jiddo.", english: "Four from Jiddo's.", answer: 4, wordId: "arbaa" },
            { native: "ستة من عند عمو.", roman: "sitte min ‘and ‘ammo.", english: "Six from your uncle's.", answer: 6, wordId: "sitte" },
            { native: "وتمانية من الكرم الكبير!", roman: "w tmēne min al-karm al-kbīr!", english: "And eight from the big grove!", answer: 8, wordId: "tmene" },
          ],
          done: { native: "ما شاء الله، موسم منيح!", roman: "māshalla, mawsem mnīḥ!", english: "Wonderful — a good season!" },
        },
        after: [
          { who: "guide", text: "Inside, the stones grind. An hour later the first {{زيت}} comes out — cloudy, green, and so peppery it makes you cough.", gloss: "zēt — oil." },
          { who: "jiddo", text: "Dip your bread. Straight in. That's how you taste this year.", gloss: "Outside, somebody has started playing the derbakeh." },
        ],
        culture: ["press"],
        memory: "sacks",
        nudges: {
          "saha:abumarwan": [{ who: "abumarwan", text: "Bring the family's sacks over — to the scale." }],
          "saha:dabke": [{ who: "guide", text: "The square is empty. For now." }],
        },
      },
    ],
    ending: {
      at: { room: "saha", hotspot: "dabke" },
      quest: { v: "Join the dabke", hint: "In the square." },
      lines: [
        { who: "guide", text: "The string lights are on. A line of cousins, aunts and neighbours links arms, and the stamping starts. Jiddo is at the front, waving a handkerchief.", gloss: "{{دبكة}} — dabke." },
        { who: "jiddo", text: "He stops, holds out his free hand, and shouts over the drum." },
      ],
      asker: "jiddo",
      question: {
        native: "مين بدو يدبك؟",
        roman: "mīn baddo yidbok?",
        english: "Who wants to dance dabke?",
        choices: [
          { native: "أنا! يلا!", roman: "ana! yalla!", english: "Me! Let's go!", right: true },
          { native: "غالي كتير!", roman: "ghāli ktīr!", english: "Much too expensive!", reply: [{ who: "karim", text: "It's free! Dancing is free! Say yes!" }] },
          { native: "وإنتو بخير.", roman: "w intu bkhēr.", english: "And you too.", reply: [{ who: "teta", text: "That's for feast days, ya ’albi. Jiddo asked who's dancing!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{أنا! يلا!}}", gloss: "“Me! Let's go!”" },
        { who: "guide", text: "Jiddo pulls you into the line. Step, step, stamp. You get it wrong. Karim gets it wrong too, louder. Nobody cares.", gloss: "The whole square claps." },
        { who: "teta", text: "{{يا حلو!}} You dance like Jiddo when he was young. That's not entirely a compliment.", gloss: "ya ḥelo — how lovely!" },
      ],
      encounter: ["dabke", "yalla", "zeit"],
      memory: "dabke",
    },
    gates: [{ room: "karm", hotspot: "saha", until: "tools", line: { who: "teta", text: "The olives first! The press can wait for us.", gloss: "Teta points up at Jiddo." } }],
    idle: {
      "karm:karim": [{ who: "karim", text: "My arms are dead. Worth it, though." }],
      "saha:abumarwan": [{ who: "abumarwan", text: "Best oil in ten years. I say that every year. This time it's true." }],
    },
    afterwards: {
      "karm:teta": [{ who: "teta", text: "Tonight, after dinner, a story. The one my mother told me — about the smallest boy in this village." }],
      "saha:abumarwan": [{ who: "abumarwan", text: "Come back next October. The trees will be waiting." }],
    },
    complete: {
      title: "The",
      em: "Village",
      text: "You helped Jiddo bring in the olives by ear, counted the family's sacks onto the scale, tasted the first green oil — and joined the dabke line.",
      quest: { v: "Dance one more round", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Karm done={new Set()} />,
};

export default content;
