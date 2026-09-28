import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Sky, Stars, Ground, StringLights, Item, FY } from "../scenes";
import { Figure, Child } from "../../components/scenes/primitives";
import { Icon } from "../kit";
import { LHR, Haveli, Skyline, Charpai } from "./art";

/* URDU · Chapter Four — عید. Chaand raat on the rooftop, and Eid morning in the courtyard. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const clothesCard = card(<><path d="M22 20h36l12 16l-10 6v44h-40v-44l-10 -6Z" fill="#2f9a4a" /><path d="M34 20q6 10 12 0" fill="#f4f0e6" />{[30, 40, 50].map((x) => <circle key={x} cx={x} cy={50} r="2" fill="#e8b830" />)}</>);
const prayerCard = card(<><path d="M10 80h60v-30q-30 -40 -60 0Z" fill="#f4f0e6" /><path d="M30 80v-26q10 -14 20 0v26Z" fill="#1f5a3a" /><rect x="60" y="14" width="8" height="66" fill="#f4f0e6" /><path d="M58 14q6 -12 12 0Z" fill="#e8b830" /></>);
const bowlCard = card(<><path d="M10 46h60q-4 32 -30 32T10 46Z" fill="#f4f0e6" stroke="#c8c0b0" /><ellipse cx="40" cy="46" rx="30" ry="8" fill="#f4e8c8" /><path d="M20 46q10 -6 20 0t20 0" stroke="#e8d8a8" strokeWidth="2" fill="none" />{[30, 44, 52].map((x) => <ellipse key={x} cx={x} cy={44} rx="3" ry="2" fill="#6a3a1a" />)}</>);
const hugCard = card(<><circle cx="30" cy="26" r="9" fill="#2a1a12" /><circle cx="50" cy="26" r="9" fill="#2a1a12" /><path d="M20 38h20v44h-20ZM40 38h20v44h-20Z" fill="#2a1a12" /><path d="M24 50q16 -10 32 0" stroke="#f4f0e6" strokeWidth="3" fill="none" /></>);
const eidiCard = card(<><rect x="16" y="30" width="48" height="30" rx="3" fill="#8ab070" transform="rotate(-8 40 45)" /><rect x="20" y="36" width="48" height="30" rx="3" fill="#a8c890" transform="rotate(6 44 51)" /><circle cx="44" cy="50" r="8" fill="#e8d8a8" /></>);

function Chhat({ done }: { done: ReadonlySet<string> }) {
  const seen = done.has("chaand");
  return (
    <Stage>
      <Sky id="ur4a" top="#1a1a3a" mid="#5a3a5a" bottom="#e8906a" />
      <Stars n={30} seed={45} maxY={240} />
      {/* the thinnest crescent, low in the west */}
      <path d="M300 230a40 40 0 1 0 30 -60a32 32 0 1 1 -30 60Z" fill="#f8f0d0" opacity={seen ? 1 : 0.35} />
      <Skyline y={600} opacity={0.7} color="#6a3a3a" dome="#c8b8b0" />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={i * 190 - 30} y={610 + (i % 3) * 14} width="170" height="100" fill={i % 2 ? "#8a4a3a" : "#7a3a2e"} />)}
      <rect x="0" y={FY - 50} width="1600" height="50" fill={LHR.brickDark} />
      <Ground color="#8a6a5a" line="#6a4a3a" kind="tile" />
      <StringLights y={140} sag={50} />
      {[500, 620, 740].map((x, i) => <Figure key={x} x={x} y={FY} h={195 + (i % 2) * 10} color="#1a1216" pose={i === 1 ? "reach" : "stand"} />)}
      <Charpai x={960} w={300} />
      <Figure x={1110} y={FY - 60} h={170} color="#1a1216" pose="sit" />
      <Child x={1360} y={FY} h={112} color="#1a1216" flip />
    </Stage>
  );
}

function Aangan({ done }: { done: ReadonlySet<string> }) {
  const ready = done.has("sheerkhurma");
  return (
    <Stage>
      <Sky id="ur4b" top="#8ac0e0" bottom="#f4ecd8" />
      <Haveli x={-40} w={460} h={560} />
      <Haveli x={1180} w={460} h={540} tint="#a85848" />
      <rect x={420} y={FY - 480} width="760" height="480" fill={LHR.brick} />
      {Array.from({ length: 34 }, (_, r) => <line key={r} x1={420} y1={FY - 480 + r * 14} x2={1180} y2={FY - 480 + r * 14} stroke={LHR.brickDark} strokeWidth="1.5" opacity="0.5" />)}
      <Ground color="#c8b098" line="#a89078" kind="stone" />
      <StringLights y={200} sag={40} n={20} />
      {/* the long table: Dadi's big pot, glasses, bowls */}
      <rect x={520} y={FY - 150} width="560" height="18" fill="#6b4429" />
      <rect x={540} y={FY - 132} width="14" height="132" fill="#6b4429" />
      <rect x={1046} y={FY - 132} width="14" height="132" fill="#6b4429" />
      <rect x={740} y={FY - 230} width="120" height="80" rx="10" fill="#b8b8c0" />
      <ellipse cx={800} cy={FY - 230} rx="60" ry="12" fill={ready ? "#f4e8c8" : "#8a8a90"} />
      {ready && [600, 660, 940, 1000].map((x) => <path key={x} d={`M${x - 22} ${FY - 150}q22 26 44 0Z`} fill="#f4f0e6" />)}
      <Figure x={440} y={FY} h={195} color="#2f7a4a" />
      <Figure x={1120} y={FY} h={200} color="#f4f0e6" flip />
      <Child x={1240} y={FY} h={112} color="#d8303a" flip />
      <Figure x={1350} y={FY} h={205} color="#f4f0e6" flip />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "chhat",
  speakers: {
    phuppo: { name: "Phuppo", glyph: "پ", tone: "guest" },
    zara: { name: "Zara", glyph: "ز", tone: "guest" },
  },
  rooms: {
    chhat: {
      id: "chhat",
      name: "The rooftop at dusk",
      native: "چھت",
      art: (done) => <Chhat done={done} />,
      spawn: { left: 360, right: 1200 },
      hotspots: [
        { id: "moon", x: 300, y: 210, label: "The western sky", kind: "quest" },
        { id: "family", x: 620, y: 560, label: "Everyone, looking up", kind: "word", wordId: "khandan" },
        { id: "phuppo", x: 1110, y: 580, label: "Phuppo", kind: "npc" },
        { id: "zara", x: 1360, y: 620, label: "Zara", kind: "flavor", note: "Your cousin Zara, eleven, has had her new Eid outfit laid out on her bed for a week. She has checked it four times today." },
        { id: "aangan", x: 80, y: 560, label: "Down to the courtyard", kind: "exit", to: "aangan" },
      ],
    },
    aangan: {
      id: "aangan",
      name: "The courtyard, Eid morning",
      native: "آنگن",
      art: (done) => <Aangan done={done} />,
      spawn: { left: 300, right: 1100 },
      hotspots: [
        { id: "chhat", x: 70, y: 560, label: "Up to the roof", kind: "exit", to: "chhat" },
        { id: "dadi", x: 440, y: 560, label: "Dadi", kind: "npc" },
        { id: "table", x: 800, y: 580, label: "The Eid table", kind: "quest" },
        { id: "dada", x: 1120, y: 560, label: "Dada", kind: "npc", after: "eidmorning" },
        { id: "zara", x: 1240, y: 620, label: "Zara", kind: "word", wordId: "kapre" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "چوتھا باب · Urdu",
      title: "Chaand Raat and",
      em: "Eid",
      text: "The last evening of Ramzan. The whole family is up on the roof, and so is every family on every roof in the old city — everyone looking west, waiting for a line of silver thinner than a fingernail.",
    },
    introLines: [
      { who: "dada", text: "{{دیکھو، مغرب کی طرف!}} Whoever sees it first gets extra eidi.", gloss: "dekho, maghrib ki taraf — look, to the west!" },
      { who: "guide", text: "Quest: find the Eid moon.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "chaand",
        quest: { v: "Look for the moon", hint: "Low in the western sky, on the left." },
        at: { room: "chhat", hotspot: "moon" },
        encounter: ["chaandraat", "chaand", "eid"],
        lines: [
          { who: "guide", text: "There — just above the domes. A {{چاند}} so thin it's almost not there.", gloss: "chaand — moon." },
          { who: "you", text: "{{چاند نظر آ گیا!}}", gloss: "“The moon's been seen!” — and the next roof shouts it too, and the next, all the way across Lahore." },
          { who: "dada", text: "{{چاند رات}}! Tomorrow is {{عید}}.", gloss: "chaand raat — moon night, the eve of Eid." },
        ],
        culture: ["chaandraat"],
        memory: "chaandraat",
      },
      {
        id: "mehndi",
        quest: { v: "Sit with Phuppo", hint: "On the charpai." },
        at: { room: "chhat", hotspot: "phuppo" },
        encounter: ["mehndi"],
        lines: [
          { who: "phuppo", text: "Give me your hand. On chaand raat, everybody gets a little {{مہندی}}.", gloss: "mehndi — henna. Phuppo — your dad's sister. She has a cone of it like an icing bag." },
          { who: "guide", text: "A small moon on your palm, drawn in cool green paste. By morning it'll be deep orange.", gloss: "Zara has both hands covered to the elbow and cannot touch anything." },
          { who: "phuppo", text: "Now sleep. Early start. Dadi's sheer khurma won't wait.", gloss: "Down to the courtyard, in the morning." },
        ],
        nudges: { "chhat:moon": [{ who: "guide", text: "The moon's up. Phuppo is waving you over." }] },
      },
      {
        id: "sheerkhurma",
        quest: { v: "Help Dadi with the sheer khurma", hint: "Down in the courtyard." },
        at: { room: "aangan", hotspot: "dadi" },
        encounter: ["sheerkhurma"],
        lines: [{ who: "dadi", text: "{{عید مبارک، میری جان!}} Quick — before everyone comes back from the prayer. Pass me things.", gloss: "Eid Mubarak, my life! {{شیر خرما}} — sheer khurma." }],
        game: {
          type: "fetch",
          npc: "dadi",
          kicker: "Mini-game · شیر خرما",
          title: "Pass Dadi what she asks for.",
          hint: "Nothing is labelled. Listen.",
          asks: [
            { wordId: "sewaiyan", native: "سویاں۔", roman: "sewaiyan.", english: "The vermicelli." },
            { wordId: "doodh", native: "دودھ — بہت سارا۔", roman: "doodh — bohat saara.", english: "Milk — lots of it." },
            { wordId: "khajoor", native: "کھجوریں۔", roman: "khajoorein.", english: "The dates." },
            { wordId: "badam", native: "اور بادام، پستے۔", roman: "aur badam, piste.", english: "And almonds, pistachios." },
          ],
          items: [
            { wordId: "sewaiyan", label: "Thin strands", art: <Item kind="bag" color="#e8c878" /> },
            { wordId: "doodh", label: "Jug", art: Icon.jug },
            { wordId: "khajoor", label: "Brown", art: <Item kind="bowl" color="#f4f0e6" accent="#6a3a1a" /> },
            { wordId: "badam", label: "Nuts", art: <Item kind="bowl" color="#f4f0e6" accent="#c8a070" /> },
          ],
          done: { native: "واہ! بالکل ٹھیک۔", roman: "wah! bilkul theek.", english: "Wonderful! Just right." },
        },
        culture: ["sheerkhurma"],
        nudges: { "chhat:phuppo": [{ who: "phuppo", text: "It's morning! Dadi's in the courtyard." }] },
      },
      {
        id: "eidmorning",
        quest: { v: "Tell Dadi how Eid morning goes", hint: "At the Eid table." },
        at: { room: "aangan", hotspot: "table" },
        encounter: ["kapre"],
        lines: [{ who: "dadi", text: "Now — do you know the order of an Eid morning? Tell me. I'll check.", gloss: "She's already dishing out the first bowls." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · عید کی صبح",
          title: "Eid morning, in order.",
          hint: "From waking up to the best part.",
          steps: [
            { native: "نئے کپڑے", roman: "naye kapre", english: "new clothes", wordId: "kapre", art: clothesCard },
            { native: "عید کی نماز", roman: "eid ki namaz", english: "the Eid prayer", wordId: "eid", art: prayerCard },
            { native: "شیر خرما", roman: "sheer khurma", english: "sheer khurma", wordId: "sheerkhurma", art: bowlCard },
            { native: "گلے ملنا", roman: "gale milna", english: "hugging everyone", art: hugCard },
            { native: "عیدی", roman: "eidi", english: "eidi!", wordId: "eidi", art: eidiCard },
          ],
          done: "Everyone's back from the mosque, everyone's hugging everyone — right shoulder, left, right — and Dada is patting his pocket meaningfully.",
        },
        culture: ["galemilna"],
        memory: "eidmorning",
        nudges: { "aangan:dadi": [{ who: "dadi", text: "The table, jaan. Tell me the order." }] },
      },
    ],
    ending: {
      at: { room: "aangan", hotspot: "dada" },
      quest: { v: "Go to Dada", hint: "He's patting his pocket." },
      lines: [
        { who: "dada", text: "Dada hugs you — right, left, right — then takes out a crisp new banknote, folded in half, and presses it into your hand. Your {{عیدی}}.", gloss: "eidi — the gift every elder gives the children on Eid." },
        { who: "dada", text: "He waits, eyebrows up." },
      ],
      asker: "dada",
      question: {
        native: "عید مبارک!",
        roman: "eid mubarak!",
        english: "Blessed Eid!",
        choices: [
          { native: "آپ کو بھی عید مبارک!", roman: "aap ko bhi eid mubarak!", english: "Blessed Eid to you too!", right: true },
          { native: "بس، شکریہ!", roman: "bas, shukriya!", english: "That's all, thanks!", reply: [{ who: "zara", text: "That's for shops! On Eid you say it BACK!" }] },
          { native: "ضرور!", roman: "zaroor!", english: "Definitely!", reply: [{ who: "dada", text: "Definitely what, jaan? Say it with me — Eid…" }] },
        ],
      },
      right: [
        { who: "you", text: "{{آپ کو بھی عید مبارک، دادا!}}", gloss: "“Blessed Eid to you too, Dada!”" },
        { who: "dada", text: "{{خوش رہو!}} And the extra eidi — for spotting the moon first.", gloss: "khush raho — stay happy! A blessing." },
        { who: "zara", text: "EXTRA?! Dada! I saw it too! …Almost.", gloss: "It's going to be a long, loud, happy day." },
      ],
      encounter: ["eidmubarak", "eidi"],
      memory: "eidmubarak",
    },
    gates: [{ room: "chhat", hotspot: "aangan", until: "mehndi", line: { who: "phuppo", text: "Not yet! Mehndi first — it's chaand raat!", gloss: "Phuppo waves the henna cone." } }],
    idle: {
      "aangan:dadi": [{ who: "dadi", text: "Eat, eat. There are forty people coming for lunch." }],
      "chhat:phuppo": [{ who: "phuppo", text: "Don't touch anything till it dries! …You touched something." }],
    },
    afterwards: {
      "aangan:dada": [{ who: "dada", text: "This afternoon, when it's too hot to move, I'll tell you about a very thirsty crow." }],
      "aangan:dadi": [{ who: "dadi", text: "Forty people. Three pots. One Dadi. Eid Mubarak." }],
    },
    complete: {
      title: "Chaand Raat and",
      em: "Eid",
      text: "You spotted the Eid moon from the roof, got mehndi from Phuppo, helped Dadi with the sheer khurma, put Eid morning in order — and wished Dada Eid Mubarak right back.",
      quest: { v: "Count your eidi", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Aangan done={new Set(["sheerkhurma"])} />,
};

export default content;
