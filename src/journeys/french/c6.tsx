import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, VideoCall, Table, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure } from "../../components/scenes/primitives";
import { Portrait } from "../kit";
import { Baguette, Galette, Crown } from "./art";

/* FRENCH · Chapter Six — La Famille. Home again, a video call to Lyon, and a goodbye that ends in kisses. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const breadCard = card(<Baguette x={40} y={50} s={0.5} />);
const cheeseCard = card(<><ellipse cx="40" cy="60" rx="30" ry="10" fill="#b8764a" /><ellipse cx="40" cy="54" rx="24" ry="9" fill="#f2e2b0" /><path d="M24 54q16 8 32 0" stroke="#e8c870" strokeWidth="3" fill="none" /></>);
const galetteCard = card(<><Galette x={40} y={62} r={30} /><Crown x={40} y={40} s={0.5} /></>);
const foxCard = card(<g transform="translate(34 64)"><ellipse rx="26" ry="10" fill="#c8602a" /><path d="M22 -6l18 -14l-2 16Z" fill="#c8602a" /><path d="M-24 -2q-16 -8 -12 10q10 2 12 -10Z" fill="#c8602a" /><path d="M36 -10l10 2l-4 6Z" fill="#f2e2a0" /></g>);

function Salon({ done }: { done: ReadonlySet<string> }) {
  return (
    <Stage>
      <Walls />
      <Door x={40} />
      <Window x={330} y={210} w={280} h={220} />
      <PhotoFrame x={690} y={240} w={140} h={110} tint="#3a5a9a" two />
      {/* the paper crown, kept on the shelf */}
      <rect x={880} y={330} width="140" height="10" fill={WOOD} />
      <Crown x={950} y={328} s={0.8} />
      <Table x={560} w={460} />
      <VideoCall x={650} y={FY - 150 - 190} w={300} faces={done.has("call") ? 5 : 2} bgs={["#3a5a9a", "#b8452f", "#e0b870", "#5a7a6a"]} />
      <rect x={1100} y={FY - 140} width="360" height="140" rx="12" fill="#3a4a6a" />
      <rect x={1100} y={FY - 200} width="360" height="74" rx="14" fill="#4a5a7a" />
      <Figure x={1250} y={FY - 20} h={190} color="#2a1a12" pose="sit" />
      <Figure x={1400} y={FY} h={205} color="#3a2a24" flip />
    </Stage>
  );
}

function Chambre() {
  return (
    <Stage>
      <Walls tint="#e8e2d4" />
      <Window x={240} y={220} w={320} h={230} />
      {/* Papi's old schoolbook, propped on the shelf */}
      <rect x={640} y={330} width="200" height="12" fill={WOOD} />
      <rect x={690} y={250} width="80" height="80" fill="#8a2a2a" />
      <rect x={698} y={258} width="64" height="10" fill="#e8c25a" opacity="0.8" />
      {/* the suitcase */}
      <rect x={880} y={FY - 170} width="300" height="170" rx="12" fill="#3a5a9a" />
      <path d={`M880 ${FY - 170} l40 -90 h220 l40 90`} fill="#4a6aa8" />
      <ellipse cx={980} cy={FY - 180} rx="36" ry="12" fill="#e87aa0" />
      <rect x={1040} y={FY - 200} width="34" height="40" rx="5" fill="#b8253f" />
      <rect x={60} y={FY - 150} width="420" height="150" fill="#8c6240" />
      <rect x={60} y={FY - 126} width="420" height="60" fill="#b8452f" />
      <rect x={1240} y={FY - 420} width="240" height="420" fill={WOOD} />
      {[0, 1, 2, 3].map((r) => <rect key={r} x={1250} y={FY - 400 + r * 100} width="220" height="88" fill="#3a2718" />)}
      <Door x={1500} open />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "chambre",
  speakers: {
    tonton: { name: "Tonton Marc", glyph: "M", tone: "guest" },
    tata: { name: "Tata Claire", glyph: "C", tone: "guest" },
    lea: { name: "Léa", glyph: "L", tone: "guest" },
    hugo: { name: "Hugo", glyph: "H", tone: "guest" },
  },
  rooms: {
    chambre: {
      id: "chambre",
      name: "Your room",
      native: "ta chambre",
      art: <Chambre />,
      spawn: { left: 560, right: 1360 },
      hotspots: [
        { id: "window", x: 400, y: 460, label: "Window", kind: "word", wordId: "maison" },
        { id: "book", x: 730, y: 290, label: "Papi's schoolbook", kind: "word", wordId: "livre" },
        { id: "suitcase", x: 1030, y: 620, label: "Suitcase", kind: "quest" },
        { id: "salon", x: 1540, y: 560, label: "Living room", kind: "exit", to: "salon" },
      ],
    },
    salon: {
      id: "salon",
      name: "Living room",
      native: "le salon",
      art: (done) => <Salon done={done} />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "back", x: 130, y: 560, label: "Your room", kind: "exit", to: "chambre" },
        { id: "photo", x: 760, y: 295, label: "New photo", kind: "word", wordId: "famille" },
        { id: "crown", x: 950, y: 310, label: "Paper crown", kind: "word", wordId: "couronne" },
        { id: "laptop", x: 800, y: 520, label: "Video call", kind: "quest" },
        { id: "maman", x: 1250, y: 560, label: "Maman", kind: "npc" },
        { id: "papa", x: 1400, y: 560, label: "Papa", kind: "word", wordId: "papa" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Chapitre six · French",
      title: "La",
      em: "Famille",
      text: "Home again. The house is warm and quiet and very un-French, the jet lag is winning, and there's still a porcelain fève in your pocket.",
    },
    introLines: [
      { who: "maman", text: "Unpack, then come — Lyon's calling at noon. Everybody's at Mamie's for Sunday lunch.", gloss: "Maman, from the living room. It's six in the evening there." },
      { who: "guide", text: "Quest: bring Lyon home.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "unpack",
        quest: { v: "Unpack your suitcase", hint: "In your room." },
        at: { room: "chambre", hotspot: "suitcase" },
        encounter: ["valise", "souvenir"],
        lines: [
          { who: "guide", text: "A bag of pink pralines. A jar of Mamie's apricot jam wrapped in a sweater. The paper crown, only slightly crushed.", gloss: "All in the {{valise}}." },
          { who: "guide", text: "Every one of them a {{souvenir}}.", gloss: "Souvenir — in French, it doesn't just mean a keepsake. It means a memory." },
          { who: "maman", text: "{{Ils appellent !}} Come, come!", gloss: "They're calling!" },
        ],
        memory: "keepsakes",
      },
      {
        id: "call",
        quest: { v: "Join the video call", hint: "In the living room." },
        at: { room: "salon", hotspot: "laptop" },
        lines: [
          { who: "mamie", text: "{name} ! {{Coucou !}} Can you hear us? Marc, move, you're in front of everybody!", gloss: "Coucou — hi there! Mamie, on the screen." },
          { who: "tonton", text: "I'm the handsome one. Nobody listens to me, but I'm the handsome one.", gloss: "Tonton Marc — Maman's brother. Léa and Hugo's dad." },
          { who: "guide", text: "Five faces around Mamie's table. Who's who?", gloss: "Put everyone in their place." },
        ],
        game: {
          type: "place",
          board: "album",
          kicker: "Mini-game · La famille",
          title: "Who's who on the call?",
          hint: "Pick someone, then the word that fits. French cousins come in two words.",
          tray: "On the screen",
          done: "Everyone has a name — and a French one.",
          items: [
            { wordId: "tonton", who: "Maman's brother", hint: "Marc. Claims to be the handsome one.", art: <Portrait />, tint: "#3a5a9a" },
            { wordId: "tata", who: "Tonton Marc's wife", hint: "Claire. Laughs at everything Marc says, eventually.", art: <Portrait />, tint: "#b8452f" },
            { wordId: "cousine", who: "The girl who knew the fable", hint: "Léa. Tested you in the snow.", art: <Portrait child />, tint: "#e0b870" },
            { wordId: "cousin", who: "The boy who's hilarious", hint: "Hugo. Still sulking about the fève.", art: <Portrait child />, tint: "#5a7a6a" },
          ],
        },
        after: [{ who: "tata", text: "So — tell us everything. {{En français !}}", gloss: "In French!" }],
        memory: "call",
        nudges: { "chambre:suitcase": [{ who: "guide", text: "The rest can wait. They're calling." }] },
      },
      {
        id: "retell",
        quest: { v: "Tell them about your year", hint: "On the call." },
        at: { room: "salon", hotspot: "laptop" },
        lines: [{ who: "guide", text: "Tell it in order — the way it happened.", gloss: "Everything you did, in French." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · Souvenirs",
          title: "Tell your year in order.",
          hint: "From the first summer morning to the snowy night.",
          steps: [
            { native: "La baguette du village", roman: "La baguette du village", english: "the village baguette", wordId: "baguette", art: breadCard },
            { native: "Le fromage au marché", roman: "Le fromage au marché", english: "cheese at the market", wordId: "fromage", art: cheeseCard },
            { native: "La fève dans la galette", roman: "La fève dans la galette", english: "the fève in the galette", wordId: "feve", art: galetteCard },
            { native: "Le corbeau et le renard", roman: "Le corbeau et le renard", english: "the crow and the fox", wordId: "renard", art: foxCard },
          ],
          done: "The whole year, in French. Papi starts reciting the fable. Everybody tells him to stop. He doesn't.",
        },
        memory: "retold",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Léa", hint: "She's pushed everyone out of the way." },
      lines: [{ who: "lea", text: "Léa picks up the laptop and carries it into the kitchen so she can talk to you alone." }],
      asker: "lea",
      question: {
        native: "Tu reviens quand ?",
        roman: "Tu reviens quand ?",
        english: "When are you coming back?",
        choices: [
          { native: "Bientôt !", roman: "Bientôt !", english: "Soon!", right: true },
          { native: "Ce sera tout, merci.", roman: "Ce sera tout, merci.", english: "That will be all, thanks.", reply: [{ who: "hugo", text: "Ha! It's not the cheese van! (From somewhere off-screen.)" }] },
          { native: "Le renard était malin.", roman: "Le renard était malin.", english: "The fox was clever.", reply: [{ who: "lea", text: "Yes, yes, the fox. But when are you coming BACK?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{Bientôt !}}", gloss: "“Soon!”" },
        { who: "lea", text: "{{Tu me manques.}}", gloss: "“I miss you” — literally, “you are missing from me.” She says it fast." },
        { who: "you", text: "{{Toi aussi, tu me manques !}}", gloss: "“I miss you too!”" },
        { who: "mamie", text: "(Squeezing back into the frame:) {{Gros bisous, mon cœur !}} In this family we don't say goodbye. We say {{à bientôt}}.", gloss: "Big kisses — and see you soon." },
        { who: "you", text: "{{Bisous ! À bientôt !}}", gloss: "“Kisses! See you soon!”" },
      ],
      encounter: ["bientot", "manques", "bisous", "abientot"],
      memory: "abientot",
    },
    idle: {
      "salon:maman": [{ who: "maman", text: "Go on — Mamie's been sitting in front of that laptop for an hour." }],
      "chambre:suitcase": [{ who: "guide", text: "Everything's out. The crown goes on the shelf." }],
    },
    afterwards: {
      "salon:maman": [{ who: "maman", text: "The whole call in French. Mamie is going to phone every single one of her friends tonight." }],
      "salon:laptop": [{ who: "guide", text: "The call's over. On the other side of the ocean, it's already dark — and someone is finishing the galette." }],
    },
    complete: {
      title: "La",
      em: "Famille",
      text: "Keepsakes unpacked, Tonton, Tata and both cousins named, your whole year retold in French — and a goodbye that ends in bisous and à bientôt.",
      quest: { v: "Put the crown on the shelf", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Salon done={new Set(["call"])} />,
};

export default content;
