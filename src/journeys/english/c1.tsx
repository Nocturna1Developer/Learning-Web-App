import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, Table, Item, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure, Child } from "../../components/scenes/primitives";
import { GB, Teapot } from "./art";

/* ENGLISH · Chapter One — A Proper Cuppa. Nan has flown in from Yorkshire, and she's gasping for a brew. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const kettleCard = card(<><path d="M20 80v-40q20 -20 40 0v40Z" fill="#c9cfd4" /><path d="M60 50q14 -4 12 -18" stroke="#c9cfd4" strokeWidth="6" fill="none" /><path d="M30 30q10 -12 20 0" stroke="#2a2a2a" strokeWidth="4" fill="none" /><path d="M36 20q-4 -8 2 -14M46 20q4 -8 -2 -14" stroke="#f4ecdd" strokeWidth="3" fill="none" /></>);
const warmCard = card(<><Teapot x={40} y={84} s={0.8} /><path d="M20 24q10 -6 20 0t20 0" stroke="#f4ecdd" strokeWidth="3" fill="none" /></>);
const bagsCard = card(<><Teapot x={40} y={84} s={0.8} /><path d="M34 24v16M48 24v16" stroke="#e8e0d0" strokeWidth="2" /><rect x="28" y="12" width="12" height="12" fill="#f4f0e6" /><rect x="42" y="12" width="12" height="12" fill="#f4f0e6" /></>);
const brewCard = card(<><Teapot x={40} y={84} s={0.8} /><circle cx="40" cy="22" r="14" fill="none" stroke="#c8c0b0" strokeWidth="3" /><path d="M40 14v8l6 4" stroke="#c8c0b0" strokeWidth="3" /></>);
const cuppaCard = card(<><path d="M18 34h40l-4 44H22Z" fill="#f4f0e6" stroke="#c8c0b0" /><path d="M21 42h34l-3 30H24Z" fill="#b8804a" /><path d="M58 44q14 4 0 22" stroke="#f4f0e6" strokeWidth="5" fill="none" /></>);

function Hall({ done }: { done: ReadonlySet<string> }) {
  const open = done.has("suitcase");
  return (
    <Stage>
      <Walls tint="#ece6da" />
      <Door x={40} open />
      <PhotoFrame x={300} y={240} w={120} h={140} tint={GB.navy} />
      <PhotoFrame x={450} y={270} w={150} h={110} tint={GB.red} two />
      <Window x={680} y={220} w={260} h={200} />
      <rect x={1180} y={FY - 150} width="190" height="150" rx="12" fill={GB.navy} />
      <rect x={1190} y={FY - 140} width="170" height="130" rx="8" fill="none" stroke="#1a2a4a" strokeWidth="3" />
      {open && (
        <>
          <path d={`M1180 ${FY - 150}l30 -80h130l30 80`} fill="#3a4a7a" />
          <rect x={1200} y={FY - 186} width="60" height="40" rx="4" fill="#8a2a3a" />
          <rect x={1270} y={FY - 180} width="70" height="30" fill="#e8b830" />
          <path d={`M1190 ${FY - 150}q40 -30 80 0`} fill="#4a7a5a" />
        </>
      )}
      <Figure x={880} y={FY} h={190} color="#2a1a12" flip />
      <Figure x={620} y={FY} h={210} color="#3a2a24" />
      <Child x={560} y={FY} h={104} color="#3a2a24" />
      <Door x={1420} open />
    </Stage>
  );
}

function Kitchen({ done }: { done: ReadonlySet<string> }) {
  const brewed = done.has("brew");
  return (
    <Stage>
      <Walls tint="#f0e8d8" floor="#9a8a70" floorLine="#7a6a50" shade="#dcd0b8" />
      <Window x={380} y={200} w={280} h={210} />
      <rect x={80} y={FY - 400} width="200" height="400" rx="10" fill="#e8ecee" />
      <rect x={250} y={FY - 330} width="10" height="80" rx="4" fill="#a8b0b8" />
      <rect x={980} y={FY - 170} width="440" height="170" fill={WOOD} />
      <rect x={970} y={FY - 184} width="460" height="18" fill="#8a8078" />
      {/* the kettle — the most important object in the house now */}
      <path d={`M1060 ${FY - 184}v-70q30 -30 60 0v70Z`} fill="#c9cfd4" />
      <path d={`M1120 ${FY - 234}q20 -6 18 -26`} stroke="#c9cfd4" strokeWidth="8" fill="none" />
      {brewed && <path d="M1080 500q-8 -18 4 -34M1100 500q8 -18 -4 -34" stroke="#f4ecdd" strokeWidth="6" fill="none" opacity="0.5" />}
      <rect x={1200} y={FY - 230} width="80" height="46" rx="6" fill={GB.red} />
      <text x={1240} y={FY - 200} textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="14" fill="#f4ecdd">BISCUITS</text>
      <Table x={480} w={420} cloth="#f4f0e6" />
      <path d={`M480 ${FY - 150}h420`} stroke={GB.navy} strokeWidth="6" strokeDasharray="14 10" />
      {brewed && (
        <>
          <Teapot x={600} y={FY - 150} s={0.9} />
          {[720, 790].map((x) => <path key={x} d={`M${x - 16} ${FY - 150}h32l-3 -34h-26Z`} fill="#f4f0e6" stroke="#c8c0b0" />)}
          {[830, 850, 870].map((x) => <circle key={x} cx={x} cy={FY - 154} r="10" fill="#d8a060" />)}
        </>
      )}
      <Figure x={1340} y={FY} h={190} color="#2a1a12" flip />
      <Figure x={420} y={FY} h={210} color="#3a2a24" />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "hall",
  rooms: {
    hall: {
      id: "hall",
      name: "Front hall",
      native: "the hall",
      art: (done) => <Hall done={done} />,
      spawn: { left: 300, right: 1300 },
      hotspots: [
        { id: "photos", x: 440, y: 320, label: "Family photos", kind: "flavor", note: "Nan and Grandad on the front at Scarborough, 1979. Grandad is holding an ice cream and looking betrayed by the wind." },
        { id: "mum", x: 620, y: 560, label: "Mum", kind: "word", wordId: "mum" },
        { id: "nan", x: 880, y: 560, label: "Nan", kind: "npc" },
        { id: "suitcase", x: 1275, y: 640, label: "Nan's suitcase", kind: "quest" },
        { id: "kitchen", x: 1510, y: 560, label: "Kitchen", kind: "exit", to: "kitchen" },
      ],
    },
    kitchen: {
      id: "kitchen",
      name: "Kitchen",
      native: "the kitchen",
      art: (done) => <Kitchen done={done} />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "hall", x: 70, y: 580, label: "Front hall", kind: "exit", to: "hall" },
        { id: "window", x: 520, y: 300, label: "Window", kind: "word", wordId: "lounge" },
        { id: "tin", x: 1240, y: 530, label: "Biscuit tin", kind: "flavor", note: "A red biscuit tin that has never, in its entire life, contained biscuits for longer than a day. Dunking is compulsory.", culture: "biscuits" },
        { id: "kettle", x: 1090, y: 520, label: "The kettle", kind: "quest" },
        { id: "nan", x: 1340, y: 560, label: "Nan", kind: "npc" },
        { id: "telly", x: 420, y: 560, label: "The telly, next door", kind: "word", wordId: "telly" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Chapter One · English",
      title: "A Proper",
      em: "Cuppa",
      text: "Mum has just come back from the airport, and Nan is here — from Yorkshire, for a whole month. She speaks English. It's just that some of it is a completely different English.",
    },
    introLines: [
      { who: "nan", text: "{{Ey up, love!}} Come here, let me have a look at you!", gloss: "“Ey up” — Yorkshire for hi there. “Love” — sweetie. Nan calls everyone love." },
      { who: "guide", text: "British English has been in this family longer than American English has. You know more of it than you think.", gloss: "Listen for Nan's words — the glosses show what they mean over here." },
      { who: "guide", text: "Quest: welcome Nan properly. Start by talking to her.", gloss: "Walk with ← → or A D. Press E near anything that glows. Or just click it." },
    ],
    beats: [
      {
        id: "eyup",
        quest: { v: "Say hello to Nan", hint: "She's in the middle of the hall." },
        at: { room: "hall", hotspot: "nan" },
        encounter: ["nan", "eyup", "love"],
        lines: [
          { who: "you", text: "{{Ey up, Nan!}}", gloss: "You've heard Mum say it on the phone a hundred times." },
          { who: "nan", text: "Ooh, listen to that! A proper Yorkshire hello. Now then — help me with my case. I've brought all sorts.", gloss: "Case — suitcase." },
        ],
        culture: ["love"],
        memory: "eyup",
      },
      {
        id: "suitcase",
        quest: { v: "Open Nan's suitcase", hint: "By the stairs." },
        at: { room: "hall", hotspot: "suitcase" },
        encounter: ["jumper", "biscuit", "crisps"],
        lines: [
          { who: "guide", text: "A hand-knitted {{jumper}}. Three packets of {{biscuits}}. Six bags of {{crisps}} in flavours you've never heard of. And eighty tea bags.", gloss: "Jumper — sweater. Biscuits — cookies. Crisps — potato chips." },
          { who: "nan", text: "Right. I've not had a decent {{brew}} since the airport. Where's your kettle?", gloss: "Brew — a cup of tea. (Not beer. Never beer.)" },
        ],
        nudges: { "hall:nan": [{ who: "nan", text: "The case, love. The good stuff's in there." }] },
      },
      {
        id: "kitchen",
        quest: { v: "Help Nan in the kitchen", hint: "Through to the kitchen." },
        at: { room: "kitchen", hotspot: "nan" },
        lines: [{ who: "nan", text: "Right, love — pass us what I ask for. {{Chop chop.}}", gloss: "Chop chop — quickly!" }],
        game: {
          type: "fetch",
          npc: "nan",
          kicker: "Mini-game · Nan's kitchen",
          title: "Pass Nan what she asks for.",
          hint: "It's all English — but is it YOUR English? Listen.",
          asks: [
            { wordId: "kettle", native: "Stick the kettle on, love.", roman: "Stick the kettle on, love.", english: "Turn on the kettle, sweetie." },
            { wordId: "jumper", native: "Pass us my jumper — it's nithering in here.", roman: "Pass us my jumper — it's nithering in here.", english: "Pass me my sweater — it's freezing in here." },
            { wordId: "biscuit", native: "And a biscuit for your Nan.", roman: "And a biscuit for your Nan.", english: "And a cookie for your grandma." },
            { wordId: "crisps", native: "Put the crisps in the cupboard, for later.", roman: "Put the crisps in the cupboard, for later.", english: "Put the potato chips in the cupboard, for later." },
          ],
          items: [
            { wordId: "kettle", label: "Shiny", art: <svg viewBox="0 0 80 90" aria-hidden="true"><path d="M20 80v-40q20 -20 40 0v40Z" fill="#c9cfd4" /><path d="M60 50q14 -4 12 -18" stroke="#c9cfd4" strokeWidth="6" fill="none" /></svg> },
            { wordId: "jumper", label: "Woolly", art: <svg viewBox="0 0 80 90" aria-hidden="true"><path d="M22 20h36l14 18l-10 6v40h-40v-40l-10 -6Z" fill="#4a7a5a" /><path d="M22 40h36M22 52h36" stroke="#3a6a4a" strokeWidth="3" /></svg> },
            { wordId: "biscuit", label: "Round, crunchy", art: <Item kind="flat" color="#d8a060" accent="#e8c080" /> },
            { wordId: "crisps", label: "Crinkly packet", art: <Item kind="bag" color="#e8b830" /> },
          ],
          done: { native: "Champion!", roman: "Champion!", english: "Excellent! (Yorkshire)" },
        },
        after: [{ who: "nan", text: "Now. I'm going to teach you to make a proper {{cuppa}}. None of this microwave business.", gloss: "Cuppa — a cup of tea." }],
        memory: "kitchen",
        nudges: { "hall:nan": [{ who: "nan", text: "Kitchen, love! I'm gasping." }] },
      },
      {
        id: "brew",
        quest: { v: "Make Nan a proper brew", hint: "At the kettle." },
        at: { room: "kitchen", hotspot: "kettle" },
        encounter: ["cuppa"],
        lines: [{ who: "nan", text: "Boil the kettle. Warm the pot. Two bags in. Let it {{brew}} — don't rush it. Then pour.", gloss: "The order matters. Nan will know." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · A proper brew",
          title: "Make a brew, in order.",
          hint: "Tap the steps in the order Nan said.",
          steps: [
            { native: "Boil the kettle", roman: "Boil the kettle", english: "boil the water", wordId: "kettle", art: kettleCard },
            { native: "Warm the pot", roman: "Warm the pot", english: "swirl hot water in the teapot", art: warmCard },
            { native: "Two bags in", roman: "Two bags in", english: "add two tea bags", art: bagsCard },
            { native: "Let it brew", roman: "Let it brew", english: "let it steep for four minutes", wordId: "brew", art: brewCard },
            { native: "Pour a cuppa", roman: "Pour a cuppa", english: "pour a cup, milk in", wordId: "cuppa", art: cuppaCard },
          ],
          done: "Strong, milky, the colour of a digestive biscuit. Nan takes one sip and closes her eyes.",
        },
        after: [{ who: "nan", text: "{{That's a proper brew, that.}} Now we dunk.", gloss: "Nan dips a biscuit in her tea for exactly two seconds. Any longer and it falls in." }],
        culture: ["tea"],
        memory: "brew",
        nudges: { "kitchen:nan": [{ who: "nan", text: "The kettle, love. It won't boil itself." }] },
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Nan", hint: "Her mug is already empty." },
      lines: [{ who: "nan", text: "Nan finishes her tea in about four gulps and holds out the mug with a hopeful face." }],
      asker: "nan",
      question: {
        native: "Fancy another brew, love?",
        roman: "Fancy another brew, love?",
        english: "Would you like another cup of tea, sweetie?",
        choices: [
          { native: "Go on, then!", roman: "Go on, then!", english: "Yes, please!", right: true },
          { native: "Is it a beer?", roman: "Is it a beer?", english: "Is it a beer?", reply: [{ who: "nan", text: "A BEER?! It's tea, love! A brew is always tea. What do they teach you over here?" }] },
          { native: "Cookies, please.", roman: "Cookies, please.", english: "Cookies, please.", reply: [{ who: "nan", text: "Cookies? Oh — biscuits! You mean biscuits. But do you want another brew?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{Go on, then!}}", gloss: "The British way of saying yes: as if you're being very slightly persuaded." },
        { who: "nan", text: "{{That's my girl — my lad — my love!}} You're a proper Yorkshire kid under all that American.", gloss: "Nan gives up on the grammar and hugs you." },
        { who: "guide", text: "The kettle goes on again. It'll be on about nine more times today." },
      ],
      encounter: ["goonthen"],
      memory: "goonthen",
    },
    gates: [{ room: "hall", hotspot: "kitchen", until: "suitcase", line: { who: "nan", text: "Hang on — my case first! I've got presents.", gloss: "Nan points at her suitcase." } }],
    idle: {
      "hall:suitcase": [{ who: "guide", text: "The suitcase is empty, except for one more emergency box of tea bags." }],
      "kitchen:kettle": [{ who: "guide", text: "The kettle's still warm. It will not be allowed to cool down for a month." }],
    },
    afterwards: {
      "kitchen:nan": [{ who: "nan", text: "This autumn, you come to us. Grandad will show you the high street. He'll tell you everything used to be cheaper." }],
    },
    complete: {
      title: "A Proper",
      em: "Cuppa",
      text: "You said “ey up” to Nan, found out biscuits are cookies and crisps are chips, made a proper brew in the right order — and said yes the British way: go on, then.",
      quest: { v: "Dunk a biscuit", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Kitchen done={new Set(["brew"])} />,
};

export default content;
