import type { ChapterContent, StoryPanel } from "../types";
import { Stage, Sky, Sun, Ground, FY } from "../scenes";
import { Figure, Child } from "../../components/scenes/primitives";
import { Panel } from "../kit";
import { LHR, Haveli, Skyline, Charpai, Ghara, Crow } from "./art";

/* URDU · Chapter Five — پیاسا کوا. A blazing afternoon, a charpai in the shade, and the crow who wouldn't give up. */

function ChhatDopahar({ done }: { done: ReadonlySet<string> }) {
  const full = done.has("pebbles");
  return (
    <Stage>
      <Sky id="ur5a" top="#e8d0a0" mid="#f4e0b8" bottom="#f8ecd0" />
      <Sun x={800} y={90} r={60} color="#fff4c0" />
      <Skyline y={560} opacity={0.6} color="#c8906a" dome="#f4ece0" />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={i * 190 - 30} y={570 + (i % 3) * 16} width="170" height="120" fill={i % 2 ? "#c88a6a" : "#b87a5a"} />)}
      <rect x="0" y={FY - 50} width="1600" height="50" fill={LHR.brick} />
      <Ground color="#c8a080" line="#a88060" kind="tile" />
      {/* a shade cloth stretched over the charpai */}
      <path d="M300 300h520l-30 60h-460Z" fill="#e8c878" opacity="0.9" />
      {[310, 810].map((x) => <rect key={x} x={x} y={300} width="8" height={FY - 300} fill="#6b4429" />)}
      <Charpai x={380} w={380} />
      <Figure x={560} y={FY - 60} h={170} color="#2a1a12" pose="sit" />
      {/* the water tank, a crow on it, and a clay ghara */}
      <rect x={1100} y={FY - 260} width="200" height="260" rx="12" fill="#a8b0b8" />
      <Crow x={1200} y={FY - 272} s={1.2} />
      <Ghara x={1000} y={FY} s={1.1} level={full ? 1 : 0.2} />
    </Stage>
  );
}

function AanganDopahar() {
  return (
    <Stage>
      <Sky id="ur5b" top="#e8d0a0" bottom="#f8ecd0" />
      <Haveli x={-40} w={460} h={560} />
      <Haveli x={1180} w={460} h={540} tint="#a85848" />
      <rect x={420} y={FY - 480} width="760" height="480" fill={LHR.brick} />
      <Ground color="#c8b098" line="#a89078" kind="stone" />
      <Ghara x={700} y={FY} s={1.2} level={0.7} />
      <Child x={900} y={FY} h={116} color="#d8303a" />
    </Stage>
  );
}

const sky = ["#f4d890", "#e8b870"] as [string, string];

const story: StoryPanel[] = [
  {
    art: (
      <Panel id="ur5p1" sky={sky} ground="#c8a070">
        <circle cx="330" cy="50" r="30" fill="#fff4c0" />
        <Crow x={180} y={100} s={1.3} />
        <path d="M140 96q-20 -20 -10 -40M150 110q-40 -10 -60 10" stroke="#1a1a22" strokeWidth="3" fill="none" opacity="0.5" />
      </Panel>
    ),
    text: "One burning {{دوپہر}}, a {{کوا}} flew for miles and miles looking for water. He was so, so {{پیاسا}}.",
  },
  {
    art: (
      <Panel id="ur5p2" sky={sky} ground="#c8a070">
        <Ghara x={220} y={196} s={1} level={0.15} />
        <Crow x={210} y={82} s={0.9} />
      </Panel>
    ),
    text: "At last he saw a {{گھڑا}} — a clay pot — in a garden. But the water was right at the very bottom, and his beak couldn't reach it.",
  },
  {
    art: (
      <Panel id="ur5p3" sky={sky} ground="#c8a070">
        <g transform="rotate(-10 220 196)"><Ghara x={220} y={196} s={1} level={0.15} /></g>
        <Crow x={130} y={150} s={0.9} />
        <path d="M150 140l20 -10M150 150l24 0" stroke="#1a1a22" strokeWidth="3" />
      </Panel>
    ),
    text: "He tried to push it over — too heavy. He tried to peck a hole in it — too strong. He sat down and thought.",
  },
  {
    art: (
      <Panel id="ur5p4" sky={sky} ground="#c8a070">
        <Ghara x={240} y={196} s={1} level={0.4} />
        <Crow x={240} y={70} s={0.9} />
        <circle cx="258" cy="82" r="5" fill="#8a8078" />
        {[80, 100, 116, 132].map((x, i) => <circle key={x} cx={x} cy={190 - (i % 2) * 4} r="6" fill="#8a8078" />)}
      </Panel>
    ),
    text: "Then he had an idea. He picked up a {{کنکر}} — a pebble — and dropped it into the pot. Then another. And another. And another.",
  },
  {
    art: (
      <Panel id="ur5p5" sky={sky} ground="#c8a070">
        <Ghara x={220} y={196} s={1} level={1} />
        <Crow x={222} y={70} s={1} />
        <path d="M250 80q6 8 0 14" stroke="#5a8aa8" strokeWidth="3" fill="none" />
      </Panel>
    ),
    text: "Pebble by pebble, the water rose — until it reached the top. The crow drank and drank, and flew away. {{جہاں چاہ، وہاں راہ۔}} Where there's a will, there's a way.",
  },
];

const pebble = (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <ellipse cx="32" cy="36" rx="20" ry="14" fill="#8a8078" />
    <ellipse cx="26" cy="30" rx="7" ry="4" fill="#b8b0a8" opacity="0.6" />
  </svg>
);

const content: ChapterContent = {
  startRoom: "chhat",
  speakers: {
    zara: { name: "Zara", glyph: "ز", tone: "guest" },
  },
  rooms: {
    chhat: {
      id: "chhat",
      name: "The hot rooftop",
      native: "چھت",
      art: (done) => <ChhatDopahar done={done} />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "aangan", x: 80, y: 560, label: "Down to the courtyard", kind: "exit", to: "aangan" },
        { id: "dada", x: 560, y: 580, label: "Dada", kind: "npc" },
        { id: "sun", x: 800, y: 110, label: "The sun", kind: "word", wordId: "garmi" },
        { id: "ghara", x: 1000, y: 640, label: "The clay pot", kind: "quest" },
        { id: "crow", x: 1200, y: 480, label: "A crow on the tank", kind: "word", wordId: "kawwa" },
      ],
    },
    aangan: {
      id: "aangan",
      name: "The courtyard",
      native: "آنگن",
      art: <AanganDopahar />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "chhat", x: 135, y: 560, label: "Up to the roof", kind: "exit", to: "chhat" },
        { id: "gharaword", x: 700, y: 600, label: "Water pot", kind: "word", wordId: "ghara" },
        { id: "zara", x: 900, y: 620, label: "Zara", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "پانچواں باب · Urdu",
      title: "The",
      em: "Thirsty Crow",
      text: "A week after Eid. Forty-four degrees. The whole of Lahore is lying very still, and on the roof, under a shade cloth, Dada is lying stillest of all.",
    },
    introLines: [
      { who: "dada", text: "{{اُف، یہ گرمی!}} Come, sit in the shade. I'll tell you a story — it's too hot to do anything else.", gloss: "uff, yeh garmi — oof, this heat!" },
      { who: "guide", text: "Quest: listen to Dada's story.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "dopahar",
        quest: { v: "Sit with Dada", hint: "On the charpai, in the shade." },
        at: { room: "chhat", hotspot: "dada" },
        encounter: ["dopahar", "garmi"],
        lines: [
          { who: "dada", text: "In this {{گرمی}}, in the {{دوپہر}}, even the crows are thirsty. Look at that one on the tank.", gloss: "garmi — heat. dopahar — afternoon." },
          { who: "dada", text: "Go and fetch Zara. She knows this story — she'll want to correct me.", gloss: "Down in the courtyard." },
        ],
      },
      {
        id: "zara",
        quest: { v: "Fetch Zara", hint: "Down in the courtyard." },
        at: { room: "aangan", hotspot: "zara" },
        lines: [
          { who: "zara", text: "The crow story? I know it by heart. But first — my test. Everything from this whole summer!", gloss: "Zara takes this very seriously." },
        ],
        game: { type: "memory", kicker: "Mini-game · Zara's test", title: "Match the word to what it means.", hint: "Words from the rooftops, Anarkali and Eid. Matches in a row build a combo." },
        after: [{ who: "zara", text: "{{ٹھیک ہے}}, you're good. Let's go — Dada does the crow voice.", gloss: "theek hai — OK, fine." }],
        memory: "test",
        nudges: { "chhat:dada": [{ who: "dada", text: "Zara first! The courtyard." }] },
      },
      {
        id: "story",
        quest: { v: "Listen to Dada's story", hint: "Back on the charpai." },
        at: { room: "chhat", hotspot: "dada" },
        encounter: ["kahani"],
        lines: [{ who: "dada", text: "{{ایک دفعہ کا ذکر ہے…}} Once upon a time…", gloss: "ek dafa ka zikr hai — how every Urdu story begins." }],
        game: {
          type: "story",
          kicker: "A story from Dada",
          title: "The Thirsty Crow",
          native: "پیاسا کوا",
          teller: "dada",
          panels: story,
          question: {
            native: "کوے نے گھڑے میں کیا ڈالا؟",
            roman: "kawwe ne ghare mein kya daala?",
            english: "What did the crow drop into the pot?",
            choices: [
              { native: "کنکر۔", roman: "kankar.", english: "Pebbles.", right: true },
              { native: "پانی۔", roman: "pani.", english: "Water.", reply: [{ who: "zara", text: "If he HAD water he wouldn't need the pot! What did he drop in?" }] },
              { native: "جلیبی۔", roman: "jalebi.", english: "Jalebi.", reply: [{ who: "dada", text: "Jalebi! That's what YOU would drop in. What did the crow use?" }] },
            ],
          },
        },
        after: [{ who: "dada", text: "Now — show me. There's the ghara, and there's the gravel. Be the crow.", gloss: "He points at the clay pot by the tank." }],
        culture: ["pyasakawwa"],
        memory: "story",
        nudges: { "chhat:ghara": [{ who: "guide", text: "Dada hasn't told the story yet." }] },
      },
      {
        id: "pebbles",
        quest: { v: "Be the crow", hint: "The clay pot by the water tank." },
        at: { room: "chhat", hotspot: "ghara" },
        encounter: ["ghara", "kankar"],
        lines: [{ who: "zara", text: "I'll say how many. You drop them in.", gloss: "The water is a long way down." }],
        game: {
          type: "count",
          npc: "zara",
          kicker: "Mini-game · کنکر",
          title: "Drop the pebbles in.",
          hint: "Tap pebbles to count them, then drop them into the ghara.",
          unit: "pebbles",
          coin: pebble,
          rounds: [
            { native: "دو کنکر۔", roman: "do kankar.", english: "Two pebbles.", answer: 2, wordId: "do" },
            { native: "تین اور۔", roman: "teen aur.", english: "Three more.", answer: 3, wordId: "teen" },
            { native: "پانچ!", roman: "paanch!", english: "Five!", answer: 5, wordId: "paanch" },
            { native: "اور دس — دیکھو، پانی اوپر آ گیا!", roman: "aur das — dekho, pani oopar aa gaya!", english: "And ten — look, the water's at the top!", answer: 10, wordId: "das" },
          ],
          done: { native: "پانی اوپر آ گیا!", roman: "pani oopar aa gaya!", english: "The water rose!" },
        },
        after: [{ who: "guide", text: "The crow on the tank watches you very closely. Then it hops down, and drinks.", gloss: "Zara screams with delight. Dada laughs so hard the charpai creaks." }],
        memory: "pebbles",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Dada", hint: "He has one more question." },
      lines: [{ who: "dada", text: "Dada wipes his eyes and points at the crow, now sitting on the rim of the ghara like it owns it." }],
      asker: "dada",
      question: {
        native: "کوا کیسا تھا؟",
        roman: "kawwa kaisa tha?",
        english: "What was the crow like?",
        choices: [
          { native: "بہت ہوشیار!", roman: "bohat hoshiyar!", english: "Very clever!", right: true },
          { native: "بہت مہنگا!", roman: "bohat mehnga!", english: "Very expensive!", reply: [{ who: "zara", text: "He's a CROW, not a silk dupatta! What was he like?" }] },
          { native: "عید مبارک!", roman: "eid mubarak!", english: "Blessed Eid!", reply: [{ who: "dada", text: "Eid Mubarak to the crow too! But what was he like?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{بہت ہوشیار!}}", gloss: "“Very clever!”" },
        { who: "dada", text: "Clever — and patient. One pebble at a time. That's how you learn Urdu, too.", gloss: "{{جہاں چاہ، وہاں راہ}} — where there's a will, there's a way." },
        { who: "zara", text: "I would have just flown to the tap.", gloss: "Nobody listens to Zara." },
      ],
      encounter: ["hoshiyar", "kawwa", "pyasa"],
      memory: "hoshiyar",
    },
    gates: [{ room: "chhat", hotspot: "aangan", until: "dopahar", line: { who: "dada", text: "Sit with me first. In this heat, nobody runs.", gloss: "Dada pats the charpai." } }],
    idle: {
      "aangan:zara": [{ who: "zara", text: "My version has TWO crows. Dada says that's wrong. It's better." }],
      "chhat:dada": [{ who: "dada", text: "Soon you fly home. Take the crow with you. One pebble at a time." }],
    },
    afterwards: {
      "chhat:dada": [{ who: "dada", text: "When you're home, call. Tell me one new Urdu word every week. One pebble." }],
    },
    complete: {
      title: "The",
      em: "Thirsty Crow",
      text: "You fetched Zara and beat her word test, heard Dada tell the story of the thirsty crow, dropped the pebbles in yourself — and knew just how clever the crow was.",
      quest: { v: "Lie in the shade a while", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <ChhatDopahar done={new Set()} />,
};

export default content;
