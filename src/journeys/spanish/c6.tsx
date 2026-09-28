import type { ReactNode } from "react";
import type { ChapterContent } from "../types";
import { Stage, VideoCall, Table, FY } from "../scenes";
import { Walls, Door, Window, PhotoFrame, WOOD } from "../../game/rooms";
import { Figure } from "../../components/scenes/primitives";
import { Portrait } from "../kit";
import { PapelPicado, ClayPot, PICADO } from "./art";

/* SPANISH · Chapter Six — La Familia. Home again, and a goodbye that isn't one. */

const card = (c: ReactNode) => <svg viewBox="0 0 80 90" aria-hidden="true">{c}</svg>;
const pesoCard = card(<>{[26, 40, 54].map((x, i) => <circle key={x} cx={x} cy={50 + (i % 2) * 8} r="14" fill="#c9cfd4" stroke="#8a8a8a" strokeWidth="2" />)}<text x="40" y="56" textAnchor="middle" fontSize="14" fontWeight="700" fill="#4a4a4a">$</text></>);
const tamalCard = card(<>{[24, 40, 56].map((x) => <path key={x} d={`M${x - 8} 80v-44l8 -10l8 10v44Z`} fill="#e8d6a0" stroke="#c9b27a" strokeWidth="2" />)}</>);
const pinataCard = card(<g transform="translate(40 48)">{Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * Math.PI * 2 - Math.PI / 2; return <path key={i} d={`M${Math.cos(a - 0.3) * 14} ${Math.sin(a - 0.3) * 14}L${Math.cos(a) * 34} ${Math.sin(a) * 34}L${Math.cos(a + 0.3) * 14} ${Math.sin(a + 0.3) * 14}Z`} fill={PICADO[i % PICADO.length]} />; })}<circle r="16" fill="#b8642f" /></g>);
const moonCard = card(<><rect width="80" height="90" fill="#141a36" /><circle cx="40" cy="44" r="26" fill="#f4ecdd" /><g transform="translate(40 44) scale(0.24)" fill="#d6ccb6"><ellipse cx="-6" cy="22" rx="42" ry="30" /><circle cx="30" cy="-12" r="22" /><ellipse cx="28" cy="-52" rx="8" ry="28" /><ellipse cx="44" cy="-48" rx="7" ry="24" /></g></>);

function Sala({ done }: { done: ReadonlySet<string> }) {
  return (
    <Stage>
      <Walls />
      <Door x={40} />
      <Window x={330} y={210} w={300} h={220} />
      <PapelPicado x1={260} x2={1100} y={100} sag={24} n={11} />
      <PhotoFrame x={700} y={230} w={140} h={110} tint="#d2553f" two />
      <Table x={560} w={460} />
      <VideoCall x={650} y={FY - 150 - 190} w={300} faces={done.has("call") ? 5 : 2} bgs={["#e8a33d", "#2f7fa8", "#d2553f", "#3f8a5a"]} />
      {/* the sofa, the rebozo over its arm */}
      <rect x={1100} y={FY - 150} width="380" height="150" rx="12" fill="#6b3a2a" />
      <rect x={1100} y={FY - 214} width="380" height="80" rx="14" fill="#7a4432" />
      <path d={`M1100 ${FY - 150}l60 -40l30 120h-90Z`} fill="#c84a7a" opacity="0.9" />
      <Figure x={1250} y={FY - 20} h={190} color="#2a1a12" pose="sit" />
      <Figure x={1400} y={FY} h={205} color="#3a2a24" flip />
    </Stage>
  );
}

function Cuarto() {
  return (
    <Stage>
      <Walls tint="#e6e0d0" />
      <Window x={240} y={220} w={320} h={230} />
      {/* one point of the piñata, pinned to the wall */}
      <path d="M720 260l60 120h-120Z" fill="#d6457a" />
      <path d="M720 260l30 60" stroke="#f0cf3a" strokeWidth="6" />
      <circle cx="720" cy="262" r="6" fill="#c9a24a" />
      {/* the suitcase, still half packed */}
      <rect x={880} y={FY - 170} width="300" height="170" rx="12" fill="#2f7fa8" />
      <path d={`M880 ${FY - 170} l40 -90 h220 l40 90`} fill="#3a8ab8" />
      <ClayPot x={960} y={FY - 170} s={0.45} />
      {[1040, 1080, 1120].map((x, i) => <circle key={x} cx={x} cy={FY - 180} r="12" fill={["#e0508a", "#f0cf3a", "#3f7d55"][i]} />)}
      {/* the bed */}
      <rect x={60} y={FY - 150} width="420" height="150" fill="#8c6240" />
      <rect x={60} y={FY - 126} width="420" height="60" fill="#e8a33d" />
      <rect x={1240} y={FY - 420} width="240" height="420" fill={WOOD} />
      {[0, 1, 2, 3].map((r) => <rect key={r} x={1250} y={FY - 400 + r * 100} width="220" height="88" fill="#3a2718" />)}
      <Door x={1500} open />
    </Stage>
  );
}

const content: ChapterContent = {
  startRoom: "cuarto",
  speakers: {
    chuy: { name: "Tío Chuy", glyph: "C", tone: "guest" },
    lupe: { name: "Tía Lupe", glyph: "L", tone: "guest" },
    lupita: { name: "Lupita", glyph: "L", tone: "guest" },
  },
  rooms: {
    cuarto: {
      id: "cuarto",
      name: "Your room",
      native: "tu cuarto",
      art: <Cuarto />,
      spawn: { left: 560, right: 1360 },
      hotspots: [
        { id: "window", x: 400, y: 460, label: "Window", kind: "word", wordId: "casa" },
        { id: "pinata", x: 720, y: 330, label: "A piñata point", kind: "word", wordId: "pinata" },
        { id: "suitcase", x: 1030, y: 620, label: "Suitcase", kind: "quest" },
        { id: "sala", x: 1540, y: 560, label: "Living room", kind: "exit", to: "sala" },
      ],
    },
    sala: {
      id: "sala",
      name: "Living room",
      native: "la sala",
      art: (done) => <Sala done={done} />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "back", x: 130, y: 560, label: "Your room", kind: "exit", to: "cuarto" },
        { id: "photo", x: 770, y: 285, label: "New photo", kind: "word", wordId: "familia" },
        { id: "laptop", x: 800, y: 520, label: "Video call", kind: "quest" },
        { id: "abuela", x: 1250, y: 560, label: "Abuela", kind: "npc" },
        { id: "mama", x: 1400, y: 560, label: "Mamá", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Capítulo seis · Spanish",
      title: "La",
      em: "Familia",
      text: "January, and home again. The house smells like it always did; the papel picado from Christmas is still up, because Abuela won't let anyone take it down yet.",
    },
    introLines: [
      { who: "mama", text: "Unpack, then come — the pueblo's calling at six. Everyone's going to be there.", gloss: "Mamá, from the living room." },
      { who: "guide", text: "Quest: bring the pueblo home.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "unpack",
        quest: { v: "Unpack your suitcase", hint: "In your room." },
        at: { room: "cuarto", hotspot: "suitcase" },
        encounter: ["maleta", "recuerdo"],
        lines: [
          { who: "guide", text: "A tiny clay pot from Don Beto. A bag of dulces, mostly empty. A cinnamon stick that makes the whole {{maleta}} smell like ponche.", gloss: "Maleta — suitcase." },
          { who: "guide", text: "Every one of them a {{recuerdo}}.", gloss: "Recuerdo — a keepsake, and a memory. Spanish uses one word for both." },
          { who: "mama", text: "{{¡Ya llamaron!}} Come, come!", gloss: "They're calling!" },
        ],
        memory: "keepsakes",
      },
      {
        id: "call",
        quest: { v: "Join the video call", hint: "In the living room." },
        at: { room: "sala", hotspot: "laptop" },
        lines: [
          { who: "lupe", text: "{name}! {{¿Cómo estás?}} Mateo, move, let them see!", gloss: "How are you? Tía Lupe, on the screen." },
          { who: "chuy", text: "¿Y yo? Nobody's introduced me! I'm the handsome one.", gloss: "Tío Chuy — Mamá's brother. You didn't meet him in the pueblo; he was working in Morelia." },
          { who: "guide", text: "Five faces on one screen. Who's who?", gloss: "Put everyone in their place." },
        ],
        game: {
          type: "place",
          board: "album",
          kicker: "Mini-game · La familia",
          title: "Who's who on the call?",
          hint: "Pick someone, then the word that fits. The labels are how you'd say it in Spanish.",
          tray: "On the screen",
          done: "Everyone has a name — and a Spanish one.",
          items: [
            { wordId: "tio", who: "Mamá's brother", hint: "Loud. Says he's the handsome one.", art: <Portrait />, tint: "#2f7fa8" },
            { wordId: "tia", who: "Mamá's big sister", hint: "Runs the tamalada. Runs everything.", art: <Portrait />, tint: "#d2553f" },
            { wordId: "primo", who: "The boy with the husks", hint: "Soaked them at six in the morning. Still not over it.", art: <Portrait child />, tint: "#e8a33d" },
            { wordId: "prima", who: "The girl with the candle", hint: "Eight. Wants to break next year's piñata.", art: <Portrait child />, tint: "#c84a7a" },
          ],
        },
        after: [{ who: "chuy", text: "So — what did you do in the pueblo? Tell us everything. {{¡En español!}}", gloss: "In Spanish!" }],
        memory: "call",
        nudges: { "cuarto:suitcase": [{ who: "guide", text: "The rest can wait. They're calling." }] },
      },
      {
        id: "retell",
        quest: { v: "Tell them about your trip", hint: "On the call." },
        at: { room: "sala", hotspot: "laptop" },
        lines: [{ who: "guide", text: "Tell it in order — the way it happened.", gloss: "Everything you did, in Spanish." }],
        game: {
          type: "sequence",
          kicker: "Mini-game · Recuerdos",
          title: "Tell your trip in order.",
          hint: "From the first Sunday to the last night.",
          steps: [
            { native: "Pesos en el tianguis", roman: "Pesos en el tianguis", english: "pesos at the tianguis", wordId: "peso", art: pesoCard },
            { native: "Tamales con Tía Lupe", roman: "Tamales con Tía Lupe", english: "tamales with Tía Lupe", wordId: "tamal", art: tamalCard },
            { native: "La piñata de la posada", roman: "La piñata de la posada", english: "the posada piñata", wordId: "pinata", art: pinataCard },
            { native: "El conejo en la luna", roman: "El conejo en la luna", english: "the rabbit in the moon", wordId: "conejo", art: moonCard },
          ],
          done: "The whole trip, in Spanish. Tía Lupe is pretending not to cry.",
        },
        memory: "retold",
      },
    ],
    ending: {
      auto: true,
      quest: { v: "Answer Lupita", hint: "She's pushed everyone out of the way." },
      lines: [{ who: "lupita", text: "Lupita shoves her whole face into the camera." }],
      asker: "lupita",
      question: {
        native: "¿Cuándo regresas?",
        roman: "¿Cuándo regresas?",
        english: "When are you coming back?",
        choices: [
          { native: "¡Muy pronto!", roman: "¡Muy pronto!", english: "Very soon!", right: true },
          { native: "Nada más, gracias.", roman: "Nada más, gracias.", english: "Nothing else, thanks.", reply: [{ who: "chuy", text: "¡Ja! This isn't the tianguis. She asked when you're coming back!" }] },
          { native: "Están muy ricos.", roman: "Están muy ricos.", english: "They're delicious.", reply: [{ who: "lupe", text: "The tamales? I know. But when are you coming back?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{¡Muy pronto!}}", gloss: "“Very soon!”" },
        { who: "lupita", text: "{{Te extraño.}}", gloss: "“I miss you.” She says it fast, then disappears from the frame." },
        { who: "you", text: "{{Yo también te extraño. ¡Un abrazo!}}", gloss: "“I miss you too. A hug!”" },
        { who: "abuela", text: "In this family we don't say goodbye. We say {{hasta pronto}}.", gloss: "See you soon." },
        { who: "you", text: "{{¡Hasta pronto!}}", gloss: "“See you soon!”" },
      ],
      encounter: ["pronto", "extranar", "abrazo", "hasta"],
      memory: "hastapronto",
    },
    idle: {
      "sala:mama": [{ who: "mama", text: "Go on — they've been waiting all week for this call." }],
      "sala:abuela": [{ who: "abuela", text: "Tell them about the rabbit. Lupita will pretend she knew it already." }],
      "cuarto:suitcase": [{ who: "guide", text: "Everything's out. The piñata point stays on the wall." }],
    },
    afterwards: {
      "sala:abuela": [{ who: "abuela", text: "You spoke Spanish with them the whole call. {{Tu bisabuelo estaría orgulloso.}}", gloss: "Your great-grandfather would be proud." }],
      "sala:mama": [{ who: "mama", text: "Tía Lupe has already texted me four times about next Christmas." }],
      "sala:laptop": [{ who: "guide", text: "The call's over. There's a new photo on the table: two countries, one family." }],
    },
    complete: {
      title: "La",
      em: "Familia",
      text: "Keepsakes unpacked, every tío and prima named, your whole trip retold in Spanish — and a goodbye that's really “see you soon.”",
      quest: { v: "Hang the new photo", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Sala done={new Set(["call"])} />,
};

export default content;
