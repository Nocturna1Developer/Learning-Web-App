import type { ChapterContent } from "../types";
import { Stage, Sky, Stars, Moon, Ground, Crowd, StringLights, Bonfire, Candy, FY } from "../scenes";
import { Figure, Child } from "../../components/scenes/primitives";
import { MX, PuebloHouse, PapelPicado, Candle, ClayPot, Pinata } from "./art";

/* SPANISH · Chapter Four — Las Posadas. Nine nights before Christmas; tonight, the last door opens. */

function Calle({ done }: { done: ReadonlySet<string> }) {
  const open = done.has("chela");
  return (
    <Stage>
      <Sky id="es4a" top="#1c1838" mid="#5a3a6a" bottom="#e08a5a" />
      <Stars n={40} seed={12} maxY={260} />
      <PuebloHouse x={-20} w={360} h={330} wall={MX.adobe[2]} />
      <PuebloHouse x={400} w={340} h={310} wall={MX.adobe[0]} />
      <PuebloHouse x={1180} w={440} h={340} wall={MX.adobe[5]} lit={open} />
      <Ground color={MX.cobble} line={MX.cobbleLine} kind="stone" />
      <PapelPicado x1={-20} x2={820} y={110} sag={30} n={12} />
      <PapelPicado x1={800} x2={1640} y={120} sag={26} n={12} />
      {/* the procession: neighbours with candles */}
      <Crowd x={880} n={6} spread={420} seed={51} scale={0.95} />
      {[700, 780, 860, 940, 1020].map((x, i) => <Candle key={x} x={x} y={FY - 150 - (i % 2) * 12} h={22} />)}
      <Figure x={620} y={FY} h={205} color="#2a1a12" />
      <Candle x={660} y={FY - 118} h={22} />
      <Child x={1100} y={FY} h={124} color="#2a1a12" flip />
    </Stage>
  );
}

function PatioPosada({ done }: { done: ReadonlySet<string> }) {
  const broken = done.has("pinata");
  return (
    <Stage>
      <Sky id="es4b" top="#141230" bottom="#3a2a5a" />
      <Moon x={1380} y={140} r={40} />
      <Stars n={50} seed={31} maxY={300} />
      <rect x="0" y="300" width="1600" height="460" fill="#d2553f" opacity="0.9" />
      <rect x="0" y="300" width="1600" height="20" fill={MX.tile} />
      <StringLights y={140} sag={70} />
      <StringLights y={220} sag={50} n={20} />
      <Ground color="#b8906a" line="#8a6a4a" kind="tile" />
      {/* the piñata, strung across the courtyard */}
      <path d="M0 330 Q800 360 1600 330" stroke="#6b4a1e" strokeWidth="3" fill="none" />
      <Pinata x={760} y={broken ? FY - 380 : 460} s={broken ? 0.9 : 0.9} broken={broken} />
      {broken && [700, 740, 780, 820, 860].map((x, i) => <circle key={x} cx={x} cy={FY - 8} r="8" fill={["#e0508a", "#f0cf3a", "#2d6ab8", "#3f7d55", "#e07a2f"][i]} />)}
      {/* the kids, waiting their turn */}
      <Child x={520} y={FY} h={126} color="#2a1a12" />
      <Child x={600} y={FY} h={112} color="#3a2a24" />
      <Child x={960} y={FY} h={120} color="#2a1a12" flip />
      {/* ponche on the fire */}
      <Bonfire x={1270} s={0.6} />
      <ClayPot x={1270} y={FY - 60} s={1} steam />
      <Figure x={1420} y={FY} h={200} color="#2a1a12" flip />
      <Figure x={240} y={FY} h={210} color="#3a2a24" />
    </Stage>
  );
}

const dulce = <Candy color="#e0508a" />;

const content: ChapterContent = {
  startRoom: "calle",
  speakers: {
    chela: { name: "Doña Chela", glyph: "C", tone: "guest" },
    lupita: { name: "Lupita", glyph: "L", tone: "guest" },
    mateo: { name: "Mateo", glyph: "M", tone: "guest" },
  },
  rooms: {
    calle: {
      id: "calle",
      name: "The street",
      native: "la calle",
      art: (done) => <Calle done={done} />,
      spawn: { left: 240, right: 1300 },
      hotspots: [
        { id: "door1", x: 70, y: 600, label: "First door", kind: "quest" },
        { id: "door2", x: 480, y: 600, label: "Second door", kind: "quest" },
        { id: "abuela", x: 620, y: 560, label: "Abuela", kind: "npc" },
        { id: "procession", x: 880, y: 560, label: "The procession", kind: "word", wordId: "vecino" },
        { id: "lupita", x: 1100, y: 620, label: "A girl with a candle", kind: "npc" },
        { id: "chela", x: 1260, y: 600, label: "Doña Chela's door", kind: "quest" },
        { id: "patio", x: 1520, y: 560, label: "Into the courtyard", kind: "exit", to: "patio" },
      ],
    },
    patio: {
      id: "patio",
      name: "Doña Chela's courtyard",
      native: "el patio",
      art: (done) => <PatioPosada done={done} />,
      spawn: { left: 300, right: 1200 },
      hotspots: [
        { id: "calle", x: 70, y: 560, label: "The street", kind: "exit", to: "calle" },
        { id: "chela", x: 240, y: 560, label: "Doña Chela", kind: "npc" },
        { id: "kids", x: 560, y: 620, label: "The kids", kind: "quest" },
        { id: "pinata", x: 760, y: 440, label: "The piñata", kind: "quest" },
        { id: "ponche", x: 1270, y: 580, label: "Ponche", kind: "flavor", note: "Guava, sugarcane and cinnamon, simmering in the clay pot Abuela bought from Don Beto. Chela ladles it into mugs with a whole cinnamon stick.", culture: "ponche" },
        { id: "abuela", x: 1420, y: 560, label: "Abuela", kind: "npc" },
      ],
    },
  },
  script: {
    intro: {
      kicker: "Capítulo cuatro · Spanish",
      title: "Las",
      em: "Posadas",
      text: "December 24th, the last of nine nights. At sundown the whole street walks together, door to door, asking for a place to stay — the way Mary and Joseph did.",
    },
    introLines: [
      { who: "abuela", text: "{{Toma tu vela.}} And stay with the singing.", gloss: "Take your candle." },
      { who: "guide", text: "Quest: walk the posada until a door opens.", gloss: "Walk with ← → or A D. Press E near anything that glows." },
    ],
    beats: [
      {
        id: "vela",
        quest: { v: "Light your candle with Abuela", hint: "She's in the middle of the street." },
        at: { room: "calle", hotspot: "abuela" },
        encounter: ["noche", "calle", "posada"],
        lines: [
          { who: "abuela", text: "Every {{noche}} for nine nights, the whole {{calle}} asks for {{posada}} — for shelter.", gloss: "Noche — night. Calle — street. Posada — shelter, an inn." },
          { who: "abuela", text: "The first houses always say no. That's part of it. Go knock — the first door.", gloss: "On the far left." },
        ],
        culture: ["posadas"],
      },
      {
        id: "door1",
        quest: { v: "Knock at the first door", hint: "The blue house, on the far left." },
        at: { room: "calle", hotspot: "door1" },
        encounter: ["cantar", "puerta"],
        lines: [
          { who: "guide", text: "The whole street starts to {{cantar}}:", gloss: "Cantar — to sing." },
          { who: "abuela", text: "{{En el nombre del cielo, os pido posada…}}", gloss: "“In the name of heaven, I ask you for shelter…”" },
          { who: "guide", text: "From behind the {{puerta}}, voices sing back: {{Aquí no es mesón. Sigan adelante.}}", gloss: "“This isn't an inn. Keep going.” The door stays shut." },
        ],
        nudges: { "calle:abuela": [{ who: "abuela", text: "The first door, {{cariño}}. Go on.", gloss: "Cariño — sweetheart." }] },
      },
      {
        id: "walk",
        quest: { v: "Walk with Lupita", hint: "The girl with the candle." },
        at: { room: "calle", hotspot: "lupita" },
        encounter: ["vecino"],
        lines: [
          { who: "lupita", text: "{{Soy Lupita.}} Mateo's sister. Your cousin too! Walk with me — I'll test you.", gloss: "She's eight, and very sure of herself." },
          { who: "lupita", text: "Everyone on this street is a {{vecino}}. Even the grumpy ones.", gloss: "Vecino — neighbour." },
        ],
        game: { type: "memory", kicker: "Mini-game · Lupita's test", title: "Match the word to what it means.", hint: "Words from the tianguis, the tamalada and tonight. Matches in a row build a combo." },
        after: [{ who: "lupita", text: "{{¡No está mal!}} Now the second door. They'll say no too.", gloss: "Not bad!" }],
        nudges: {
          "calle:door2": [{ who: "guide", text: "Lupita is waving at you from down the street." }],
          "calle:abuela": [{ who: "abuela", text: "That's your prima Lupita. Go walk with her." }],
        },
      },
      {
        id: "door2",
        quest: { v: "Knock at the second door", hint: "The yellow house." },
        at: { room: "calle", hotspot: "door2" },
        lines: [
          { who: "guide", text: "Another verse, another answer through the wood: {{No se puede abrir.}}", gloss: "“We can't open.” Somebody inside is laughing." },
          { who: "lupita", text: "The next one's Doña Chela's. She always opens.", gloss: "The pink house at the end." },
        ],
      },
      {
        id: "chela",
        quest: { v: "Knock at Doña Chela's door", hint: "The pink house at the end of the street." },
        at: { room: "calle", hotspot: "chela" },
        lines: [
          { who: "guide", text: "The last verse. The whole street sings it together — louder than before.", gloss: "Then the door swings open, and light falls on the street." },
          { who: "chela", text: "{{¡Entren, santos peregrinos!}}", gloss: "“Come in, holy pilgrims!” — the verse that ends every posada." },
          { who: "mateo", text: "The piñata! {{¡Vamos!}}", gloss: "Let's go! Into the courtyard." },
        ],
        nudges: { "calle:lupita": [{ who: "lupita", text: "Doña Chela's! The pink one!" }] },
      },
      {
        id: "pinata",
        quest: { v: "Take your turn at the piñata", hint: "In Doña Chela's courtyard." },
        at: { room: "patio", hotspot: "pinata" },
        encounter: ["pinata", "estrella", "dulces"],
        lines: [
          { who: "guide", text: "A seven-pointed {{estrella}}, bobbing on a rope. Somebody ties a scarf over your eyes.", gloss: "Estrella — star." },
          { who: "lupita", text: "{{¡Dale, dale, dale! No pierdas el tino…}}", gloss: "“Hit it, hit it, hit it! Don't lose your aim…” — everyone sings." },
          { who: "guide", text: "Third swing. CRACK. It rains {{dulces}}.", gloss: "Dulces — sweets. Every kid in the courtyard dives." },
        ],
        culture: ["pinata"],
        nudges: { "patio:chela": [{ who: "chela", text: "The piñata's waiting for you, {{cariño}}. Go!" }] },
      },
      {
        id: "share",
        quest: { v: "Share out the sweets", hint: "The kids are counting." },
        at: { room: "patio", hotspot: "kids" },
        lines: [{ who: "mateo", text: "You broke it, so you share it. That's the rule. {{Tres}} for me, OK?", gloss: "Every kid is watching your hands." }],
        game: {
          type: "count",
          npc: "lupita",
          kicker: "Mini-game · Los dulces",
          title: "Share out the sweets.",
          hint: "Tap sweets to count them out, then hand them over.",
          unit: "dulces",
          coin: dulce,
          rounds: [
            { native: "Tres para Mateo.", roman: "Tres para Mateo.", english: "Three for Mateo.", answer: 3, wordId: "tres" },
            { native: "Cuatro para mí.", roman: "Cuatro para mí.", english: "Four for me.", answer: 4, wordId: "cuatro" },
            { native: "Cinco para Sofi.", roman: "Cinco para Sofi.", english: "Five for Sofi.", answer: 5, wordId: "cinco" },
            { native: "Y seis para ti.", roman: "Y seis para ti.", english: "And six for you.", answer: 6, wordId: "seis" },
          ],
          done: { native: "¡Justo! Nadie se queja.", roman: "¡Justo! Nadie se queja.", english: "Fair! Nobody's complaining." },
        },
        after: [{ who: "lupita", text: "Six for you? …Fine. You broke it.", gloss: "Abuela's calling you over for ponche." }],
        memory: "sweets",
        nudges: { "patio:abuela": [{ who: "abuela", text: "Share the dulces first. Then ponche." }] },
      },
    ],
    ending: {
      at: { room: "patio", hotspot: "abuela" },
      quest: { v: "Have ponche with Abuela", hint: "By the fire." },
      lines: [
        { who: "abuela", text: "She hands you a mug of {{ponche}}, cinnamon stick and all.", gloss: "Warm fruit punch, from the pot we bought at the tianguis." },
        { who: "abuela", text: "Her candle's burned down to a stub. She hasn't stopped smiling since the first door." },
      ],
      asker: "abuela",
      question: {
        native: "¿Te gustó tu primera posada?",
        roman: "¿Te gustó tu primera posada?",
        english: "Did you like your first posada?",
        choices: [
          { native: "¡Sí, me encantó!", roman: "¡Sí, me encantó!", english: "Yes, I loved it!", right: true },
          { native: "Dulces.", roman: "Dulces.", english: "Sweets.", reply: [{ who: "abuela", text: "Yes, yes, you got the most dulces. But did you like it?" }] },
          { native: "Es de noche.", roman: "Es de noche.", english: "It's night-time.", reply: [{ who: "abuela", text: "It is! Past your bedtime, too. But did you like it?" }] },
        ],
      },
      right: [
        { who: "you", text: "{{¡Sí, me encantó!}}", gloss: "“Yes, I loved it!”" },
        { who: "abuela", text: "{{A mí también.}} Every year, since I was smaller than Lupita.", gloss: "Me too." },
        { who: "guide", text: "Midnight bells from the parroquia. Somebody starts singing again." },
      ],
      encounter: ["ponche"],
      memory: "encanto",
    },
    gates: [{ room: "calle", hotspot: "patio", until: "chela", line: { who: "abuela", text: "Not yet — nobody goes in until a door opens for us.", gloss: "Keep knocking." } }],
    idle: {
      "calle:door1": [{ who: "guide", text: "Still shut. Someone inside is humming the verse." }],
      "calle:door2": [{ who: "guide", text: "Still shut. You can smell tamales through the keyhole." }],
      "patio:pinata": [{ who: "guide", text: "Only the rope left, and one sad point of the star." }],
      "patio:chela": [{ who: "chela", text: "{{¡Feliz Navidad!}} There's more ponche — don't be shy.", gloss: "Merry Christmas!" }],
    },
    afterwards: {
      "patio:abuela": [{ who: "abuela", text: "Tomorrow we sleep late. Tomorrow night — if the power holds — I'll tell you a story." }],
      "patio:kids": [{ who: "lupita", text: "Next year I'm breaking it. On the first swing." }],
    },
    complete: {
      title: "Las",
      em: "Posadas",
      text: "You sang for shelter door to door, broke the star piñata, shared the sweets fairly in Spanish — and told Abuela you loved your first posada.",
      quest: { v: "Finish your ponche", hint: "Or head back to ROOTS Home." },
    },
  },
  preview: <Calle done={new Set(["chela"])} />,
};

export default content;
