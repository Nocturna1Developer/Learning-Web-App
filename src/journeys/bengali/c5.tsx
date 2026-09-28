import type { ReactNode } from "react";
import type { ChapterContent, StoryPanel } from "../types";
import { Stage, Sky, Stars, Moon, Ground, FY } from "../scenes";
import { Figure, Child, Palm } from "../../components/scenes/primitives";
import { Panel } from "../kit";
import { TinHouse, BananaPlant, Lantern } from "./art";

/* BENGALI · Chapter Five — টুনটুনি. A warm night, a mat in the courtyard, and the smallest bird in Bengal. */

function Tuntuni({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse rx="12" ry="8" fill="#8ab04a" />
      <circle cx="10" cy="-6" r="6" fill="#c86a3a" />
      <path d="M15 -6l8 1l-8 2Z" fill="#3a3a3a" />
      <path d="M-10 -2l-6 -16l4 0Z" fill="#6a8a3a" />
    </g>
  );
}

function Cat({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#e8a040">
      <ellipse rx="30" ry="18" />
      <circle cx="28" cy="-18" r="14" />
      <path d="M20 -28l2 -14l8 8ZM36 -28l0 -14l-8 8Z" />
      <path d="M-28 -4q-24 -10 -20 -30" stroke="#e8a040" strokeWidth="6" fill="none" />
      <circle cx="32" cy="-20" r="2" fill="#2a1a12" />
    </g>
  );
}

function Eggplant({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x} ${y}v-90`} stroke="#4a6a3a" strokeWidth="6" />
      {[-40, 30, -30, 36].map((dx, i) => <ellipse key={i} cx={x + dx * 0.8} cy={y - 40 - i * 14} rx="26" ry="12" fill="#5a8a44" transform={`rotate(${dx} ${x + dx * 0.8} ${y - 40 - i * 14})`} />)}
      <ellipse cx={x - 14} cy={y - 20} rx="9" ry="18" fill="#5a3a6a" />
    </g>
  );
}

function UthonRaat() {
  return (
    <Stage>
      <Sky id="bn5a" top="#0a0e24" mid="#1a2040" bottom="#2a2a44" />
      <Stars n={80} seed={73} maxY={420} />
      <Moon x={1240} y={150} r={48} />
      <Palm x={120} y={FY - 40} h={400} lean={20} color="#141c18" />
      <TinHouse x={220} w={460} h={240} wall="#6a5a48" lit />
      <BananaPlant x={1420} h={300} />
      <rect width="1600" height="900" fill="#0a0e24" opacity="0.3" />
      <Ground color="#5a4a38" line="#3a2e22" kind="dirt" />
      <rect x={640} y={FY - 12} width="420" height="24" fill="#c8a870" />
      <Lantern x={900} y={FY - 12} s={1.1} />
      <Figure x={760} y={FY - 10} h={180} color="#100c10" pose="sit" />
      {Array.from({ length: 24 }, (_, i) => <circle key={i} cx={(i * 131) % 1600} cy={380 + ((i * 53) % 320)} r="3" fill="#e8f080" opacity={0.5 + (i % 3) * 0.2} />)}
    </Stage>
  );
}

function Bagan() {
  return (
    <Stage>
      <Sky id="bn5b" top="#0a0e24" bottom="#2a2a44" />
      <Stars n={110} seed={29} maxY={480} />
      <Moon x={400} y={160} r={58} />
      <Palm x={1300} y={FY} h={520} lean={-10} color="#141c18" />
      <Ground color="#4a4a34" line="#343424" kind="grass" />
      {[500, 640, 780, 920].map((x) => <Eggplant key={x} x={x} y={FY} />)}
      {Array.from({ length: 36 }, (_, i) => <circle key={i} cx={(i * 97) % 1600} cy={300 + ((i * 41) % 400)} r="3.5" fill="#e8f080" opacity={0.5 + (i % 3) * 0.2} />)}
      <Child x={1080} y={FY} h={112} color="#0a0810" />
    </Stage>
  );
}

const garden = (children: ReactNode, id: string, night = false) => (
  <Panel id={id} sky={night ? ["#1a1a3a", "#3a3a5a"] : ["#9ac0d8", "#e8dcc0"]} ground="#6a7a3a">
    {children}
  </Panel>
);

const story: StoryPanel[] = [
  {
    art: garden(<><Eggplant x={200} y={196} /><Tuntuni x={190} y={130} s={1.2} /><path d="M176 140q14 14 28 0" stroke="#4a6a3a" strokeWidth="2" fill="none" /></>, "bn5p1"),
    text: "In a garden, there was a {{বেগুন}} plant — an eggplant. Among its leaves, a tiny {{টুনটুনি}} — a tailorbird — stitched her {{বাসা}}. Tailorbirds really do sew leaves together.",
  },
  {
    art: garden(<><Eggplant x={220} y={196} /><Tuntuni x={210} y={124} /><Tuntuni x={200} y={138} s={0.6} /><Tuntuni x={218} y={140} s={0.6} /><Tuntuni x={234} y={138} s={0.6} /><Cat x={90} y={180} s={1.1} /></>, "bn5p2"),
    text: "She had three little {{ছানা}}. But the household {{বিড়াল}} had seen them. “And what are you doing there, Tuntuni?”",
  },
  {
    art: garden(<><Eggplant x={250} y={196} /><g transform="rotate(30 240 126)"><Tuntuni x={240} y={126} s={1.2} /></g><Cat x={120} y={180} s={1.2} /><path d="M140 140q6 -6 12 0" stroke="#fff" strokeWidth="2" fill="none" /></>, "bn5p3"),
    text: "Tuntuni bowed very low. “প্রণাম, মহারানি!” — “Greetings, Your Majesty!” The cat was so flattered that she purred and strolled away. Every day, the same.",
  },
  {
    art: garden(<><Palm x={330} y={196} h={180} lean={-6} color="#3f6a3a" /><Tuntuni x={320} y={40} /><Tuntuni x={296} y={56} s={0.7} /><Tuntuni x={344} y={54} s={0.7} /><Tuntuni x={316} y={70} s={0.7} /><Eggplant x={160} y={196} /><Cat x={80} y={180} /></>, "bn5p4"),
    text: "The chicks grew, and their wings grew. One morning the cat came: “What are you doing, Tuntuni?” — “দূর হ, দুষ্টু বিড়াল!” — “Get lost, you wicked cat!” — and all four flew up to the top of the palm tree.",
  },
  {
    art: garden(<><Eggplant x={200} y={196} /><Cat x={180} y={130} s={1.1} /><path d="M160 110l-10 -10M200 104l6 -12M220 118l12 -6" stroke="#2a1a12" strokeWidth="3" /><Palm x={350} y={196} h={180} lean={-6} color="#3f6a3a" /><Tuntuni x={340} y={40} /></>, "bn5p5", true),
    text: "The cat leapt at the eggplant plant in a fury — and got a face full of {{কাঁটা}}. Thorns! And from the top of the palm, Tuntuni laughed and laughed.",
  },
];

const content: ChapterContent = {
  startRoom: "uthon",
  speakers: {
    rupa: { name: "Rupa", glyph: "রু", tone: "guest" },
  },
  rooms: {
    uthon: {
      id: "uthon",
      name: "The courtyard at night",
      native: "উঠোন",
      art: <UthonRaat />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "house", x: 450, y: 520, label: "Lit window", kind: "word", wordId: "raat" },
        { id: "nanu", x: 760, y: 580, label: "Nanu", kind: "npc" },
        { id: "lantern", x: 900, y: 660, label: "Lantern", kind: "flavor", note: "A hurricane lantern, hissing gently. The power is on tonight — Nanu lit it anyway. “Stories need a lantern.”" },
        { id: "moon", x: 1240, y: 150, label: "The moon", kind: "word", wordId: "chand" },
        { id: "bagan", x: 1530, y: 560, label: "The vegetable garden", kind: "exit", to: "bagan" },
      ],
    },
    bagan: {
      id: "bagan",
      name: "The vegetable garden",
      native: "বাগান",
      art: <Bagan />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "uthon", x: 70, y: 560, label: "Back to the courtyard", kind: "exit", to: "uthon" },
        { id: "fireflies", x: 400, y: 420, label: "Fireflies", kind: "word", wordId: "jonaki" },
        { id: "eggplants", x: 700, y: 640, label: "Eggplant plants", kind: "flavor", note: "A row of eggplant plants. The stems have little thorns. You'll find out why that matters." },
        { id: "rupa", x: 1080, y: 620, label: "Rupa", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "পঞ্চম অধ্যায় · Bengali",
      title: "The Tale of",
      em: "Tuntuni",
      text: "The last night in the village. After dinner, Nanu has spread a mat in the courtyard, lit a lantern and poured cha. The frogs in the pond are very loud.",
    },
    introLines: [
      { who: "nanu", text: "{{এসো, বসো।}} Where's Rupa? Get her — it's story time.", gloss: "esho, bosho — come, sit." },
      { who: "guide", text: "Quest: gather everyone for Nanu's story.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "golpo",
        quest: { v: "Talk to Nanu", hint: "On the mat." },
        at: { room: "uthon", hotspot: "nanu" },
        encounter: ["raat", "golpo"],
        lines: [
          { who: "nanu", text: "Every {{রাত}} when I was little, my Nani told me a {{গল্প}}. On this same mat, I think.", gloss: "raat — night. golpo — story." },
          { who: "nanu", text: "Rupa is in the vegetable garden, chasing fireflies. Go and get her.", gloss: "The garden, on the right." },
        ],
      },
      {
        id: "bagan",
        quest: { v: "Find Rupa in the garden", hint: "Past the banana plants." },
        at: { room: "bagan", hotspot: "rupa" },
        encounter: ["jonaki", "chand"],
        lines: [
          { who: "rupa", text: "Look — {{জোনাকি}}! And the {{চাঁদ}} is so big tonight.", gloss: "jonaki — firefly. chand — moon." },
          { who: "rupa", text: "Tuntuni? I know that story. But first — my test. Everything since you came!", gloss: "Rupa takes this very seriously." },
        ],
        game: { type: "memory", kicker: "Mini-game · Rupa's test", title: "Match the word to what it means.", hint: "Words from the village, the bazaar and the new year. Matches in a row build a combo." },
        after: [{ who: "rupa", text: "{{আচ্ছা}}, you're good. Nanu! We're coming!", gloss: "accha — OK, fine." }],
        memory: "test",
        nudges: { "uthon:nanu": [{ who: "nanu", text: "Rupa first! The garden." }] },
      },
      {
        id: "story",
        quest: { v: "Listen to Nanu's story", hint: "On the mat, by the lantern." },
        at: { room: "uthon", hotspot: "nanu" },
        lines: [{ who: "nanu", text: "{{এক ছিল টুনটুনি…}} Once there was a tailorbird…", gloss: "ek chhilo tuntuni — how the story begins." }],
        game: {
          type: "story",
          kicker: "A story from Nanu",
          title: "Tuntuni and the Cat",
          native: "টুনটুনি আর বিড়াল",
          teller: "nanu",
          panels: story,
          question: {
            native: "টুনটুনি কোথায় বাসা বানাল?",
            roman: "tuntuni kothay basa banalo?",
            english: "Where did Tuntuni build her nest?",
            choices: [
              { native: "বেগুন গাছে।", roman: "begun gachhe.", english: "In the eggplant plant.", right: true },
              { native: "পুকুরে।", roman: "pukure.", english: "In the pond.", reply: [{ who: "rupa", text: "In the POND? She'd get wet! Where was the nest?" }] },
              { native: "নৌকায়।", roman: "noukay.", english: "In a boat.", reply: [{ who: "nanu", text: "A bird in a boat! No — think of the thorns." }] },
            ],
          },
        },
        culture: ["tuntuni"],
        memory: "story",
        nudges: { "uthon:lantern": [{ who: "guide", text: "Nanu's waiting on the mat." }] },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Nanu", hint: "She wants to know what you thought of Tuntuni." },
      lines: [{ who: "nanu", text: "Rupa has fallen asleep with her head in Nanu's lap. Nanu turns the lantern down and looks at you." }],
      asker: "nanu",
      question: {
        native: "টুনটুনি কেমন ছিল?",
        roman: "tuntuni kemon chhilo?",
        english: "What was Tuntuni like?",
        choices: [
          { native: "খুব চালাক!", roman: "khub chalak!", english: "Very clever!", right: true },
          { native: "অনেক বেশি!", roman: "onek beshi!", english: "Too much!", reply: [{ who: "nanu", text: "Too much? She was the smallest bird in the garden! What was she like?" }] },
          { native: "শুভ নববর্ষ!", roman: "shubho noboborsho!", english: "Happy New Year!", reply: [{ who: "nanu", text: "Ha! That was yesterday. What was Tuntuni like?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{খুব চালাক!}}", gloss: "“Very clever!”" },
        { who: "nanu", text: "Small — and clever. That's better than big. Remember that, all the way over in America.", gloss: "{{চালাক}} — chalak, clever." },
        { who: "guide", text: "The fireflies drift over the pond. Somewhere a tailorbird is asleep in a leaf it sewed itself." },
      ],
      encounter: ["chalak", "tuntuni", "biral", "basa", "chhana", "kanta"],
      memory: "chalak",
    },
    gates: [{ room: "uthon", hotspot: "bagan", until: "golpo", line: { who: "nanu", text: "Sit with me first, sona.", gloss: "Nanu pats the mat." } }],
    idle: {
      "bagan:rupa": [{ who: "rupa", text: "I caught three fireflies. I let them go. That's the rule." }],
      "uthon:nanu": [{ who: "nanu", text: "Tomorrow you fly home. Take Tuntuni with you. Tell her to someone smaller." }],
    },
    afterwards: {
      "uthon:nanu": [{ who: "nanu", text: "Call me every Friday. I'll have another story ready. There are hundreds." }],
    },
    complete: {
      title: "The Tale of",
      em: "Tuntuni",
      text: "You found Rupa among the fireflies, beat her word test, heard the story of Tuntuni and the cat by lantern light — and knew exactly how clever she was.",
      quest: { v: "Watch the fireflies a while", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <UthonRaat />,
};

export default content;
