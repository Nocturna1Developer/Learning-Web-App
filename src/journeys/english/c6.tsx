import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, VideoCall, Table, Bonfire, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure } from "../../components/scenes/primitives";
import { Portrait } from "../kit";
import { GB, Teapot, PhoneBox, Proscenium } from "./art";

/* ENGLISH · Chapter Six — The Family. Home in America, a call to Yorkshire, and a goodbye the way Nan says it. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const brewCard = card(<Teapot x={40} y={80} s={0.9} />);
const chippyCard = card(<><path d="M14 40l52 -6l-6 46h-40Z" fill="#f4f0e6" stroke="#c8c0b0" />{[26, 34, 42, 50].map((x, i) => <rect key={x} x={x} y={30 - (i % 2) * 6} width="6" height="24" rx="2" fill="#e8c060" />)}</>);
const bonfireCard = card(<><rect width="80" height="90" fill="#141a36" /><g transform="translate(40 86) scale(0.5)"><Bonfire x={0} y={0} s={1} /></g></>);
const pantoCard = card(<g transform="scale(0.05) translate(0 100)"><Proscenium open /></g>);

function Lounge({ done }: { done: ReadonlySet<string> }) {
  return (
    <Stage>
      <Walls />
      <Door x={40} />
      <Window x={330} y={210} w={280} h={220} />
      <PhotoFrame x={690} y={240} w={140} h={110} tint={GB.navy} two />
      {/* a tiny model red phone box on the shelf, from the theatre gift shop */}
      <rect x={880} y={330} width="160" height="10" fill={WOOD} />
      <g transform="translate(960 330) scale(0.3)"><PhoneBox x={0} y={0} /></g>
      <Table x={560} w={460} />
      <VideoCall x={650} y={FY - 150 - 190} w={300} faces={done.has("call") ? 6 : 2} bgs={[GB.navy, GB.red, "#1f5a3a", "#e8b830"]} />
      <Teapot x={1040} y={FY - 150} s={0.6} />
      <rect x={1100} y={FY - 140} width="360" height="140" rx="12" fill="#3a4a6a" />
      <rect x={1100} y={FY - 200} width="360" height="74" rx="14" fill="#4a5a7a" />
      <Figure x={1250} y={FY - 20} h={190} color="#2a1a12" pose="sit" />
      <Figure x={1400} y={FY} h={205} color="#3a2a24" flip />
    </Stage>
  );
}

function Bedroom() {
  return (
    <Stage>
      <Walls tint="#e6e2d4" />
      <Window x={240} y={220} w={320} h={230} />
      {/* the panto programme and a woolly hat on the shelf */}
      <rect x={640} y={330} width="200" height="12" fill={WOOD} />
      <rect x={670} y={250} width="60" height="80" fill={GB.red} />
      <path d="M760 330q0 -40 30 -40t30 40Z" fill="#b8303a" />
      <circle cx={790} cy={286} r="8" fill="#f4f0e6" />
      <rect x={880} y={FY - 170} width="300" height="170" rx="12" fill={GB.navy} />
      <path d={`M880 ${FY - 170} l40 -90 h220 l40 90`} fill="#3a4a7a" />
      <rect x={930} y={FY - 200} width="80" height="30" fill="#e8b830" />
      <rect x={60} y={FY - 150} width="420" height="150" fill="#8c6240" />
      <rect x={60} y={FY - 126} width="420" height="60" fill={GB.red} />
      <rect x={1240} y={FY - 420} width="240" height="420" fill={WOOD} />
      {[0, 1, 2, 3].map((r) => <rect key={r} x={1250} y={FY - 400 + r * 100} width="220" height="88" fill="#3a2718" />)}
      <Door x={1500} open />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "bedroom",
  speakers: {
    auntie: { name: "Auntie Jo", glyph: "J", tone: "guest" },
    uncle: { name: "Uncle Dave", glyph: "D", tone: "guest" },
    ellie: { name: "Ellie", glyph: "E", tone: "guest" },
  },
  rooms: {
    bedroom: {
      id: "bedroom",
      name: "Your room",
      native: "your room",
      art: <Bedroom />,
      spawn: { left: 560, right: 1360 },
      hotspots: [
        { id: "programme", x: 700, y: 290, label: "Panto programme", kind: "word", wordId: "panto" },
        { id: "hat", x: 790, y: 300, label: "Woolly hat", kind: "word", wordId: "woollyhat" },
        { id: "suitcase", x: 1030, y: 620, label: "Suitcase", kind: "quest" },
        { id: "lounge", x: 1540, y: 560, label: "Living room", kind: "exit", to: "lounge" },
      ],
    },
    lounge: {
      id: "lounge",
      name: "Living room",
      native: "the lounge",
      art: (done) => <Lounge done={done} />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "back", x: 130, y: 560, label: "Your room", kind: "exit", to: "bedroom" },
        { id: "photo", x: 760, y: 295, label: "New photo", kind: "flavor", note: "A new photo: the whole family in the park on Bonfire Night, lit orange from one side, everyone in a woolly hat." },
        { id: "teapot", x: 1040, y: 540, label: "Nan's teapot", kind: "word", wordId: "brew" },
        { id: "laptop", x: 800, y: 520, label: "Video call", kind: "quest" },
        { id: "mum", x: 1250, y: 560, label: "Mum", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Chapter Six · English",
      title: "The",
      em: "Family",
      text: "Home in America. The kettle came with you — Nan insisted — and you've caught yourself saying “ta” to the mailman twice already.",
    },
    introLines: [
      { who: "mum", text: "Unpack, then come — Yorkshire's calling. Everyone's at Nan's for Sunday dinner.", gloss: "Mum, from the lounge." },
      { who: "guide", text: "Quest: bring Yorkshire home.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "unpack",
        quest: { v: "Unpack your suitcase", hint: "In your room." },
        at: { room: "bedroom", hotspot: "suitcase" },
        encounter: ["souvenir"],
        lines: [
          { who: "guide", text: "A woolly hat with a bobble. The panto programme, signed by the Dame. Two hundred tea bags — Nan's orders.", gloss: "Every one of them a {{keepsake}}." },
          { who: "mum", text: "They're calling! Come on, love!", gloss: "Mum has started saying “love” again. Nan's influence." },
        ],
        memory: "keepsakes",
      },
      {
        id: "call",
        quest: { v: "Join the video call", hint: "In the lounge." },
        at: { room: "lounge", hotspot: "laptop" },
        lines: [
          { who: "nan", text: "{{Ey up, love!}} Can you hear us? Dave, stop fiddling with it!", gloss: "Nan, very close to the camera." },
          { who: "uncle", text: "I'm not fiddling, I'm fixing! …Hiya! It's your Uncle Dave!", gloss: "Mum's brother. Ellie's dad." },
          { who: "guide", text: "Six faces round Nan's table. English only has one word for every aunt — and one for every uncle. Easy. Except…", gloss: "…Yorkshire has one more." },
        ],
        game: {
          type: "place",
          board: "album",
          kicker: "Mini-game · The family",
          title: "Who's who on the call?",
          hint: "Pick someone, then the word Nan would use.",
          tray: "On the screen",
          done: "Everyone's in their place — and you know what “our kid” means.",
          items: [
            { wordId: "auntie", who: "Mum's sister", hint: "Auntie Jo. Made the trifle.", art: <Portrait />, tint: GB.navy },
            { wordId: "uncle", who: "Mum's brother", hint: "Uncle Dave. Fiddling. Fixing.", art: <Portrait />, tint: GB.red },
            { wordId: "cousin", who: "The girl who tested you", hint: "Ellie. Ten. Knows everything.", art: <Portrait child />, tint: "#e8b830" },
            { wordId: "ourkid", who: "What Ellie calls her little brother", hint: "Jack. Six. Sticky from the trifle.", art: <Portrait child />, tint: "#1f5a3a" },
          ],
        },
        after: [
          { who: "ellie", text: "Our kid — that's Jack. It means brother. Or sister. It means “the one in our family.” Obviously.", gloss: "{{Our kid}} — Northern English for your brother or sister." },
          { who: "auntie", text: "Now tell us everything, love. The British version.", gloss: "Auntie Jo, holding a trifle up to the camera." },
        ],
        memory: "call",
        nudges: { "bedroom:suitcase": [{ who: "guide", text: "The rest can wait. They're calling." }] },
      },
      {
        id: "retell",
        quest: { v: "Tell them about your autumn", hint: "On the call." },
        at: { room: "lounge", hotspot: "laptop" },
        lines: [{ who: "guide", text: "Tell it in order — the way it happened.", gloss: "Using Nan's words." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · Keepsakes",
          title: "Tell your autumn in order.",
          hint: "From the first brew to the last panto.",
          steps: [
            { native: "A proper brew", roman: "A proper brew", english: "Nan's cup of tea", wordId: "brew", art: brewCard },
            { native: "Chips from the chippy", roman: "Chips from the chippy", english: "fries from the fish-and-chip shop", wordId: "chippy", art: chippyCard },
            { native: "Bonfire Night", roman: "Bonfire Night", english: "November 5th", wordId: "bonfirenight", art: bonfireCard },
            { native: "The panto", roman: "The panto", english: "the Christmas pantomime", wordId: "panto", art: pantoCard },
          ],
          done: "The whole autumn, British-style. Grandad, off-screen, shouts “OH YES IT WAS!”",
        },
        memory: "retold",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Ellie", hint: "She's grabbed the laptop." },
      lines: [{ who: "ellie", text: "Ellie carries the laptop into the kitchen, away from everyone, and props it against the kettle." }],
      asker: "ellie",
      question: {
        native: "When are you coming back?",
        roman: "When are you coming back?",
        english: "When are you coming back?",
        choices: [
          { native: "Soon — I promise!", roman: "Soon — I promise!", english: "Soon — I promise!", right: true },
          { native: "Oh yes he is!", roman: "Oh yes he is!", english: "Oh yes he is!", reply: [{ who: "ellie", text: "Ha! Save it for next year's panto. When are you COMING?" }] },
          { native: "Go on, then!", roman: "Go on, then!", english: "Yes, please!", reply: [{ who: "ellie", text: "Go on then WHAT? That's not an answer! When?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{Soon — I promise!}}", gloss: "“Soon — I promise!”" },
        { who: "ellie", text: "{{Miss you loads.}}", gloss: "“I miss you so much.” She says it fast and looks at the ceiling." },
        { who: "you", text: "{{Miss you loads too!}}", gloss: "“I miss you too!”" },
        { who: "nan", text: "(Squeezing into the frame:) We don't say goodbye in Yorkshire, love. We say {{ta-ra}}.", gloss: "Ta-ra — bye, see you soon." },
        { who: "you", text: "{{Ta-ra, Nan!}}", gloss: "“Bye, Nan — see you soon!”" },
      ],
      encounter: ["missyou", "tara", "ourkid"],
      memory: "tara",
    },
    idle: {
      "lounge:mum": [{ who: "mum", text: "Go on — Nan's been sat in front of that laptop since her dinner." }],
      "bedroom:suitcase": [{ who: "guide", text: "Everything's out. The woolly hat goes on the hook by the door." }],
    },
    afterwards: {
      "lounge:mum": [{ who: "mum", text: "You said “ta-ra.” Nan's going to tell the whole high street." }],
      "lounge:laptop": [{ who: "guide", text: "The call's over. In Yorkshire it's already evening — and someone is definitely putting the kettle on." }],
    },
    complete: {
      title: "The",
      em: "Family",
      text: "Keepsakes unpacked, Auntie, Uncle, your cousin and “our kid” all named, your whole autumn told the British way — and a goodbye that's really a ta-ra.",
      quest: { v: "Put the kettle on", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Lounge done={new Set(["call"])} />,
};

export default content;
