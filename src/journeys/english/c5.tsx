import type { ChapterContent, StoryPanel } from "../types";
import { Stage, Crowd, StringLights, FY } from "../scenes";
import { Walls } from "../../game/rooms";
import { Figure, Child, House } from "../../components/scenes/primitives";
import { Panel } from "../kit";
import { GB, Proscenium } from "./art";

/* ENGLISH · Chapter Five — The Panto. Dick Whittington and his cat, a Dame in a ridiculous dress, and an audience that shouts back. */

function Cat({ x, y, s = 1, color = "#e8a040" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={color}>
      <ellipse rx="22" ry="13" />
      <circle cx="20" cy="-14" r="11" />
      <path d="M13 -22l2 -12l7 7ZM27 -22l0 -12l-7 7Z" />
      <path d="M-20 -2q-18 -8 -14 -26" stroke={color} strokeWidth="5" fill="none" />
      <circle cx="24" cy="-15" r="1.6" fill="#2a1a12" />
    </g>
  );
}

function Rat({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#5a5a60">
      <ellipse rx="12" ry="7" />
      <circle cx="11" cy="-3" r="5" />
      <circle cx="10" cy="-8" r="3" fill="#8a7a80" />
      <path d="M-12 0q-14 6 -18 -4" stroke="#5a5a60" strokeWidth="2" fill="none" />
    </g>
  );
}

function Foyer() {
  return (
    <Stage>
      <Walls tint="#6a1a2a" floor="#3a1a20" floorLine="#2a1018" shade="#5a1020" />
      <StringLights y={120} sag={30} n={30} />
      {/* posters for the panto */}
      {[200, 460].map((x, i) => (
        <g key={x}>
          <rect x={x} y={220} width="200" height="280" fill="#f4ecd8" stroke="#c9a24a" strokeWidth="8" />
          <text x={x + 100} y={280} textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="22" fill={GB.red}>{i ? "OH YES" : "DICK"}</text>
          <text x={x + 100} y={310} textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="22" fill={GB.red}>{i ? "IT IS!" : "WHITTINGTON"}</text>
          {i === 0 ? <Cat x={x + 100} y={420} s={1.6} /> : <path d={`M${x + 60} 460l40 -90l40 90Z`} fill="#e8508a" />}
        </g>
      ))}
      {/* the ice cream seller's tray */}
      <rect x={900} y={FY - 150} width="160" height="30" fill="#f4f0e6" />
      <path d={`M900 ${FY - 150}l80 -80l80 80`} stroke="#f4f0e6" strokeWidth="4" fill="none" />
      <Figure x={980} y={FY} h={190} color="#1a1014" />
      <Figure x={1180} y={FY} h={200} color="#1a1014" flip />
      <Figure x={1280} y={FY} h={190} color="#1a1014" flip />
      <Child x={740} y={FY} h={112} color="#1a1014" />
      {/* doors into the stalls */}
      <rect x={1420} y={FY - 330} width="160" height="330" fill="#3a1018" stroke="#c9a24a" strokeWidth="6" />
    </Stage>
  );
}

function Stalls({ done }: { done: ReadonlySet<string> }) {
  const second = done.has("interval");
  return (
    <Stage>
      <rect width="1600" height="900" fill="#1a0e14" />
      <Proscenium open />
      {/* on stage: the Dame in her enormous dress, and — in the second half — King Rat creeping behind */}
      <g transform="translate(800 690)">
        <path d="M-80 0q-20 -120 40 -180h80q60 60 40 180Z" fill="#e8508a" />
        {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={-60 + i * 17} cy={-60 + (i % 2) * 30} r="8" fill="#f0cf3a" />)}
        <circle cx="0" cy="-200" r="26" fill="#f4dcc0" />
        <path d="M-40 -216q40 -60 80 0q-10 -30 -40 -36t-40 36Z" fill="#e8b830" />
        <circle cx="-9" cy="-200" r="3" fill="#2a1a12" />
        <circle cx="9" cy="-200" r="3" fill="#2a1a12" />
        <path d="M-10 -186q10 8 20 0" stroke={GB.red} strokeWidth="3" fill="none" />
      </g>
      {second && (
        <g transform="translate(1020 690)">
          <path d="M-40 0l8 -150h64l8 150Z" fill="#3a3a44" />
          <circle cx="0" cy="-170" r="26" fill="#5a5a60" />
          <circle cx="-18" cy="-196" r="12" fill="#5a5a60" />
          <circle cx="18" cy="-196" r="12" fill="#5a5a60" />
          <path d="M-8 -170l-30 -6M8 -170l30 -6" stroke="#8a8a90" strokeWidth="2" />
          <path d="M40 -40q60 10 40 60" stroke="#5a5a60" strokeWidth="6" fill="none" />
        </g>
      )}
      <Cat x={600} y={680} s={1.8} />
      {/* the audience, from behind */}
      <Crowd x={800} n={14} spread={1500} seed={83} color="#0a0608" y={900} scale={1.1} />
      <rect x={0} y={860} width="1600" height="40" fill="#3a1018" />
    </Stage>
  );
}

const london = (
  <>
    {[40, 110, 180, 250, 320].map((x, i) => <House key={x} x={x} y={196} w={60} h={50 + (i % 3) * 16} wall="#8a6a54" roof="#5a3a2a" />)}
  </>
);

const story: StoryPanel[] = [
  {
    art: (
      <Panel id="en5p1" sky={["#9ab0c8", "#e8dcc0"]} ground="#8a7a5a">
        <path d="M0 196q200 -40 400 0" fill="none" stroke="#6a5a3a" strokeWidth="3" />
        <Child x={120} y={196} h={80} color="#2a1a12" />
        <path d="M112 128l-20 -30" stroke="#6b4429" strokeWidth="3" />
        <circle cx="90" cy="96" r="10" fill="#c8a870" />
        <g transform="translate(300 120) scale(0.5)">{london}</g>
      </Panel>
    ),
    text: "Long ago, a poor boy called Dick Whittington heard that in London the streets were paved with gold. So he walked there — all the way — with everything he owned in a bundle on a stick.",
  },
  {
    art: (
      <Panel id="en5p2" sky={["#4a4a5a", "#6a6070"]} ground="#3a3030">
        <rect x="100" y="100" width="200" height="96" fill="#5a4a40" />
        <Child x={200} y={196} h={70} color="#1a1210" />
        <Cat x={250} y={186} s={0.8} />
        <Rat x={130} y={190} s={0.8} />
        <Rat x={290} y={192} s={0.7} />
      </Panel>
    ),
    text: "The streets were mud, not gold. Dick found work in a rich merchant's kitchen and slept in an attic full of rats. So he spent his only penny on a cat — and the rats disappeared.",
  },
  {
    art: (
      <Panel id="en5p3" sky={["#e8c890", "#c8a070"]} ground="#c8a070">
        <rect x="120" y="100" width="200" height="96" fill="#e8d8b0" />
        <path d="M120 100l100 -50l100 50Z" fill="#c9a24a" />
        <Figure x={260} y={196} h={96} color="#6a2a3a" />
        <path d="M244 110l16 -14l16 14Z" fill="#e8b830" />
        <Cat x={170} y={186} s={0.9} />
        <Rat x={100} y={192} s={0.6} />
      </Panel>
    ),
    text: "The merchant's ship sailed to a faraway land where the king's palace was overrun with rats. Dick's cat went too — and caught every single one. The king paid a fortune for her.",
  },
  {
    art: (
      <Panel id="en5p4" sky={["#6a7a9a", "#c8b8a0"]} ground="#5a7a4a">
        <path d="M0 196q200 -80 400 -40v80H0Z" fill="#5a7a4a" />
        <Child x={160} y={150} h={70} color="#1a1210" />
        <g transform="translate(300 60)" stroke="#e8c870" strokeWidth="2" fill="none">
          <path d="M0 0q-10 20 0 40q10 -20 0 -40" />
          <path d="M-30 30q20 -10 30 0M30 30q-20 -10 -30 0" opacity="0.6" />
        </g>
      </Panel>
    ),
    text: "But Dick didn't know. Fed up, he ran away. On a hill outside London, he heard the church {{bells}} ringing — and they seemed to sing: “Turn again, Whittington, thrice Lord Mayor of London!”",
  },
  {
    art: (
      <Panel id="en5p5" sky={["#9ab0c8", "#e8dcc0"]} ground="#8a7a5a">
        <g transform="translate(40 120) scale(0.7)">{london}</g>
        <Figure x={250} y={196} h={110} color="#2a1a12" />
        <path d="M230 120h40v10h-40Z" fill="#c9a24a" />
        <circle cx="250" cy="150" r="6" fill="#c9a24a" />
        <Cat x={310} y={186} s={1} />
      </Panel>
    ),
    text: "He turned back — and found he was rich. He became {{Lord Mayor}} of London, three times over. And the cat? She got the best cushion in the whole city.",
  },
];

const content: ChapterContent = {
  startRoom: "foyer",
  speakers: {
    ellie: { name: "Ellie", glyph: "E", tone: "guest" },
    dame: { name: "Dame Trott", glyph: "D", tone: "guest" },
  },
  rooms: {
    foyer: {
      id: "foyer",
      name: "The theatre foyer",
      native: "the foyer",
      art: <Foyer />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "posters", x: 300, y: 360, label: "Panto posters", kind: "word", wordId: "panto" },
        { id: "ellie", x: 740, y: 620, label: "Ellie", kind: "npc" },
        { id: "icecream", x: 980, y: 540, label: "Ice cream seller", kind: "flavor", note: "Tiny tubs of vanilla ice cream with a little wooden spoon in the lid. In Britain, this is what the interval is for." },
        { id: "grandad", x: 1180, y: 560, label: "Grandad", kind: "npc" },
        { id: "stalls", x: 1500, y: 560, label: "Into the theatre", kind: "exit", to: "stalls" },
      ],
    },
    stalls: {
      id: "stalls",
      name: "The stalls",
      native: "the stalls",
      art: (done) => <Stalls done={done} />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "foyer", x: 70, y: 560, label: "Back to the foyer", kind: "exit", to: "foyer" },
        { id: "cat", x: 600, y: 600, label: "The cat (someone in a costume)", kind: "flavor", note: "A person in a very furry cat costume, doing extremely good cat impressions. The children in the front row are losing their minds." },
        { id: "stage", x: 800, y: 480, label: "The stage", kind: "quest" },
        { id: "dame", x: 820, y: 400, label: "The Dame", kind: "word", wordId: "dame" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Chapter Five · English",
      title: "The",
      em: "Panto",
      text: "December. The town theatre is packed with families in Christmas jumpers. Nan has a whistle. Grandad has a bag of sweets he is pretending not to have. It's panto season.",
    },
    introLines: [
      { who: "nan", text: "You've never been to a panto? Oh, love. You're going to have to shout. A lot.", gloss: "Panto — pantomime: a silly Christmas musical play." },
      { who: "guide", text: "Quest: survive your first panto.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "tickets",
        quest: { v: "Find Grandad with the tickets", hint: "In the foyer." },
        at: { room: "foyer", hotspot: "grandad" },
        encounter: ["panto", "stalls"],
        lines: [
          { who: "grandad", text: "Five tickets. {{The stalls}}, row F. Close enough to get sprayed with water — they always spray the front rows.", gloss: "The stalls — the downstairs seats." },
          { who: "grandad", text: "Rule one of {{panto}}: when the baddie creeps up, you shout. Rule two: there are no other rules. In we go!", gloss: "The doors into the theatre, on the right." },
        ],
        culture: ["panto"],
      },
      {
        id: "story",
        quest: { v: "Watch the first half", hint: "Inside, in the stalls." },
        at: { room: "stalls", hotspot: "stage" },
        encounter: ["dame"],
        lines: [{ who: "dame", text: "HELLO, BOYS AND GIRLS! I'm {{the Dame}} — Dame Trott — and have I got a story for YOU!", gloss: "The Dame — the panto's funny lady, always played by a man, in the most ridiculous dresses." }],
        game: {
          type: "story",
          kicker: "The first half",
          title: "Dick Whittington",
          native: "Dick Whittington and His Cat",
          teller: "dame",
          panels: story,
          question: {
            native: "So — who made Dick rich?",
            roman: "So — who made Dick rich?",
            english: "Who made Dick rich?",
            choices: [
              { native: "His cat!", roman: "His cat!", english: "His cat!", right: true },
              { native: "The rats!", roman: "The rats!", english: "The rats!", reply: [{ who: "dame", text: "The RATS?! Boo! Hiss! Try again, pet!" }] },
              { native: "The Dame!", roman: "The Dame!", english: "The Dame!", reply: [{ who: "dame", text: "Ooh, I wish, darling! But no — who caught all those rats?" }] },
            ],
          },
        },
        culture: ["whittington"],
        memory: "story",
        nudges: { "foyer:ellie": [{ who: "ellie", text: "It's starting! Go in!" }] },
      },
      {
        id: "interval",
        quest: { v: "Find Ellie in the interval", hint: "Back in the foyer." },
        at: { room: "foyer", hotspot: "ellie" },
        encounter: ["interval"],
        lines: [
          { who: "ellie", text: "It's the {{interval}} — ice cream time! While we eat, I'm testing you. All the words since you came!", gloss: "Interval — intermission." },
        ],
        game: { type: "memory", kicker: "Mini-game · Ellie's test", title: "Match the word to what it means.", hint: "British words from the whole autumn — and what they mean in America. Matches in a row build a combo." },
        after: [{ who: "ellie", text: "Not bad for a Yank. Come on — second half! King Rat's coming back.", gloss: "Yank — an American. Affectionately. Mostly." }],
        memory: "test",
        nudges: { "stalls:stage": [{ who: "guide", text: "The curtain's down — it's the interval. Ellie's in the foyer." }] },
      },
    ],
    ending: {
      at: { room: "stalls", hotspot: "stage" },
      quest: { v: "Watch the second half", hint: "Back in the stalls." },
      lines: [
        { who: "guide", text: "The Dame is singing, very badly. And behind her, on tiptoe, a huge grey King Rat is creeping up with a sack.", gloss: "Four hundred people take a deep breath." },
        { who: "dame", text: "What's that, boys and girls? Someone behind me? Don't be silly!", gloss: "She doesn't turn around. She never turns around." },
      ],
      asker: "dame",
      question: {
        native: "He's not behind me! Oh no he isn't!",
        roman: "He's not behind me! Oh no he isn't!",
        english: "He's not behind me! Oh no he isn't!",
        choices: [
          { native: "Oh yes he is!", roman: "Oh yes he is!", english: "Oh yes he is!", right: true },
          { native: "Go on, then!", roman: "Go on, then!", english: "Yes, please!", reply: [{ who: "dame", text: "Go on, then? Go on WHAT, darling? Is there somebody behind me?" }] },
          { native: "That's everything, ta!", roman: "That's everything, ta!", english: "That's everything, thanks!", reply: [{ who: "ellie", text: "It's not the chippy! SHOUT!" }] },
        ],
      },
      right: [
        { who: "you", text: "{{OH YES HE IS!}}", gloss: "You, Ellie, Nan, Grandad and four hundred strangers, at the top of your lungs." },
        { who: "dame", text: "Where?! …Behind me?", gloss: "The whole theatre: {{HE'S BEHIND YOU!}}" },
        { who: "guide", text: "The Dame spins round. King Rat leaps away. The cat chases him off the stage. Nan blows her whistle so hard the people in row E turn round." },
      ],
      encounter: ["ohyesheis", "behindyou", "lordmayor", "bells"],
      memory: "ohyes",
    },
    gates: [{ room: "foyer", hotspot: "stalls", until: "tickets", line: { who: "nan", text: "Grandad's got the tickets! Find Grandad first.", gloss: "Nan is already unwrapping a sweet." } }],
    idle: {
      "foyer:grandad": [{ who: "grandad", text: "Best one I've seen since 1987. I say that every year." }],
      "stalls:stage": [{ who: "guide", text: "The curtain's down. Somebody's still laughing three rows back." }],
    },
    afterwards: {
      "foyer:ellie": [{ who: "ellie", text: "You're flying home next week. Will you call? Every Sunday? Promise?" }],
      "stalls:stage": [{ who: "dame", text: "Ta-ra, boys and girls! Mind how you go!" }],
    },
    complete: {
      title: "The",
      em: "Panto",
      text: "You sat in the stalls, heard the story of Dick Whittington and his cat, beat Ellie's word test in the interval — and told the Dame exactly where King Rat was.",
      quest: { v: "Hum the panto songs all the way home", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Stalls done={new Set(["interval"])} />,
};

export default content;
