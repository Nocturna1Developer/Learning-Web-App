import type { Journey } from "./types";
import { VOCAB } from "../data/vocabulary";
import { CHAPTERS } from "../data/chapters";
import { ROOMS, HomeScenePreview } from "../game/rooms";
import { Portrait, Icon } from "./kit";
import { VillageScene, MarketScene, FestivalScene, StoriesScene, FamilyScene } from "../components/scenes/Scenes";

const CHAPTER_ART: Record<string, React.ReactNode> = {
  "family-story": <HomeScenePreview />,
  village: <VillageScene />,
  market: <MarketScene />,
  festival: <FestivalScene />,
  stories: <StoriesScene />,
  family: <FamilyScene />,
};

const ricePot = (
  <svg viewBox="0 0 80 90" aria-hidden="true">
    <path d="M8 80q6-50 32-50t32 50Z" fill="#c9cfd4" />
    <ellipse cx="40" cy="34" rx="32" ry="8" fill="#9aa3aa" />
    <ellipse cx="40" cy="30" rx="26" ry="6" fill="#f6f1e6" />
  </svg>
);

export const telugu: Journey = {
  id: "telugu",
  language: "Telugu",
  native: "తెలుగు",
  family: "A Telugu family in America",
  variety: "Telugu",
  script: "te",
  romanize: true,
  speech: "te",
  chapterName: "A Family Story",
  chapterNative: "కుటుంబం",
  subtitle: "Where the journey starts",
  synopsis:
    "An ordinary American home with a Telugu family's story quietly everywhere in it. Amma is on the phone with Ammamma, and the old family album has gone missing. Find it, put four generations back in their places, help in the kitchen — and answer Amma in Telugu without stopping to think.",
  homeLines: {
    start: "Your first journey starts at home. Somewhere in the house is a family album.",
    going: "Amma is still waiting in the living room. The album hasn't found itself.",
    done: "Chapter One is complete. Your journal is open — and the village is being built.",
  },
  words: VOCAB,
  rooms: ROOMS,
  startRoom: "bedroom",
  speakers: {
    amma: { name: "Amma", glyph: "అ", tone: "parent" },
    guide: { name: "Your journal", glyph: "✦", tone: "guide" },
    you: { name: "{name}", glyph: "", tone: "you" },
  },
  chapter: {
    intro: {
      kicker: "Chapter One · Telugu",
      title: "A Family",
      em: "Story",
      text: "A Saturday afternoon, in a house like any other on the street. Down the hall, Amma is on the phone — and she isn't speaking English.",
    },
    introLines: [
      { who: "amma", text: "{{…సరే అమ్మా, నేను తర్వాత కాల్ చేస్తాను.}}", gloss: "Amma, down the hall, on the phone with Ammamma. You caught 'amma' and 'call'. That's already something." },
      { who: "guide", text: "You already know more than you think.", gloss: "Words you've grown up hearing are in here somewhere. This house is full of them." },
      { who: "amma", text: "{name}! {{ఇక్కడికి రా}} — Ammamma wants to see the old album. Can you find it?", gloss: "“ikkadiki raa” — come here." },
      { who: "guide", text: "Quest: find the family album. Try the living room — but look around on the way.", gloss: "Walk with ← → or A D. Press E near anything that glows. Or just click it." },
    ],
    beats: [
      {
        id: "album",
        quest: { v: "Find the family album", hint: "It's somewhere in the living room. Look around on the way.", hintIn: { living: "Try the big cupboard." } },
        at: { room: "living", hotspot: "cupboard" },
        lines: [{ who: "guide", text: "Found it — the family album. But the photographs have fallen out.", gloss: "Put them back on the right pages." }],
        game: {
          type: "place",
          board: "album",
          kicker: "Mini-game · The family album",
          title: "Put everyone back where they belong.",
          hint: "The photos fell out. Pick one, then the page it belongs on. The pages are labelled in Telugu — you've met two of these words in the hallway already.",
          tray: "Loose photographs",
          done: "Four generations, one shelf. The album is whole again.",
          items: [
            { wordId: "amma", who: "Amma", hint: "Mother. On the phone in the living room right now.", art: <Portrait />, tint: "#c8704a" },
            { wordId: "nanna", who: "Nanna", hint: "Father. Asleep in front of a film, most Sundays.", art: <Portrait />, tint: "#3f7d55" },
            { wordId: "ammamma", who: "Ammamma", hint: "Amma's mother. Her lamp is in the hallway.", art: <Portrait pose="sit" />, tint: "#d9a441" },
            { wordId: "tatayya", who: "Tatayya", hint: "Grandfather. Circled every festival on the calendar.", art: <Portrait pose="sit" />, tint: "#7a3a8a" },
          ],
        },
        after: [
          { who: "guide", text: "Four family words, kept.", gloss: "Amma · Nanna · Ammamma · Tatayya — all in your journal now." },
          { who: "guide", text: "Show Amma. She's on the sofa.", gloss: "Press E near her, or click." },
        ],
        culture: ["album"],
        memory: "album",
        nudges: {
          "living:amma": [
            { who: "amma", text: "{{ఆల్బమ్ దొరికిందా?}} Have you found it?", gloss: "album dorikindaa? — did you find the album?" },
            { who: "amma", text: "Look in the cupboard. The big one, behind you.", gloss: "The almirah on the right." },
          ],
        },
      },
      {
        id: "memory",
        quest: { v: "Show Amma the album", hint: "She's on the sofa." },
        at: { room: "living", hotspot: "amma" },
        lines: [
          { who: "amma", text: "{{శభాష్!}} You put everyone in the right place.", gloss: "“shabaash” — well done." },
          { who: "amma", text: "Ammamma will love this. Now — let's see what you remember.", gloss: "A memory game, the old kind, with cards." },
        ],
        game: { type: "memory", kicker: "Mini-game · Amma's memory game", title: "Match the word to what it means.", hint: "Turn two cards. A Telugu word and its meaning belong together. Matches in a row build a combo." },
        after: [{ who: "amma", text: "{{శభాష్.}} Now come and help me in the kitchen.", gloss: "The door on the right has opened." }],
        nudges: { "living:cupboard": [{ who: "guide", text: "The album's whole again. Show Amma.", gloss: "She's on the sofa." }] },
      },
      {
        id: "kitchen",
        quest: { v: "Help Amma in the kitchen", hint: "Through the door on the right of the living room." },
        at: { room: "kitchen", hotspot: "amma" },
        lines: [{ who: "amma", text: "There you are. My hands are full — {{సహాయం చెయ్యి}}.", gloss: "sahaayam cheyyi — give me a hand." }],
        game: {
          type: "fetch",
          npc: "amma",
          kicker: "Mini-game · Help in the kitchen",
          title: "Hand Amma what she asks for.",
          hint: "She's cooking and her hands are full. Nothing on the counter has a label — listen for the word.",
          asks: [
            { wordId: "neellu", native: "నీళ్ళు కావాలి.", roman: "neellu kaavaali.", english: "I need water." },
            { wordId: "uppu", native: "ఉప్పు కావాలి.", roman: "uppu kaavaali.", english: "I need salt." },
            { wordId: "paalu", native: "పాలు కావాలి.", roman: "paalu kaavaali.", english: "I need milk." },
          ],
          items: [
            { wordId: "neellu", label: "Jug", art: Icon.jug },
            { wordId: "annam", label: "Pot", art: ricePot },
            { wordId: "paalu", label: "Carton", art: Icon.milk },
            { wordId: "uppu", label: "Jar", art: Icon.sugar },
          ],
          done: { native: "శభాష్!", roman: "shabaash!", english: "well done." },
        },
        after: [{ who: "guide", text: "Three things fetched by ear, not by label.", gloss: "Talk to Amma once more." }],
        memory: "kitchen",
        nudges: { "living:amma": [{ who: "amma", text: "Come and help me in the {{వంటిల్లు}}.", gloss: "vantillu — the kitchen. Through the door on the right." }] },
      },
    ],
    ending: {
      at: { room: "kitchen", hotspot: "amma" },
      quest: { v: "Talk to Amma", hint: "Ammamma has a question for you." },
      lines: [{ who: "amma", text: "Ammamma says {{శభాష్}}. And she asked me to ask you something.", gloss: "She's been listening the whole time." }],
      asker: "amma",
      question: {
        native: "నీళ్ళు కావాలా?",
        roman: "neellu kaavaalaa?",
        english: "Do you want water?",
        choices: [
          { native: "నీళ్ళు", roman: "Neellu.", english: "Yes please.", right: true },
          { native: "", roman: "", english: "Umm… what?", reply: [{ who: "amma", text: "Listen again. {{నీళ్ళు.}} You held it in your hand ten minutes ago.", gloss: "neellu — the jug on the counter." }] },
        ],
      },
      right: [
        { who: "you", text: "…I actually understood that.", gloss: "No translation. Just the word, and what it meant." },
        { who: "amma", text: "{{శభాష్!}} You see? You already knew." },
      ],
      encounter: ["neellu"],
      memory: "understood",
    },
    gates: [{ room: "living", hotspot: "kitchen", until: "memory", line: { who: "guide", text: "Amma's still on the sofa. Talk to her first.", gloss: "The kitchen comes after." } }],
    idle: {
      "living:cupboard": [{ who: "guide", text: "The album is back on its shelf." }],
      "living:amma": [{ who: "amma", text: "Go on — the kitchen. Ammamma's waiting on the phone." }],
    },
    afterwards: {
      "kitchen:amma": [{ who: "amma", text: "{{థాంక్స్ రా.}} Chapter Two is being built — the village is next.", gloss: "thanks raa — thanks, dear." }],
      "living:amma": [{ who: "amma", text: "Ammamma's still smiling. You made her whole week." }],
    },
    complete: {
      title: "A Family",
      em: "Story",
      text: "You found the album, helped in the kitchen, and answered Amma in Telugu without thinking about it. That last part is the whole game.",
      next: "Chapter Two — The Village — is being built.",
      quest: { v: "Say goodbye to Ammamma", hint: "Or head back to ROOTS Home." },
    },
  },
  cultureNotes: {
    lamp: { title: "The brass lamp", native: "దీపం", note: "Ammamma's lamp. Lit every evening, even in a house eleven time zones from where it was made." },
    calendar: { title: "Temple calendar", native: "పంచాంగం", note: "From a temple in Guntur. Festival days circled by hand." },
    toran: { title: "Mango-leaf toran", native: "తోరణం", note: "Strung over a doorway to welcome. The leaves are changed for festivals." },
    tulasi: { title: "Tulasi plant", native: "తులసి", note: "Kept on the windowsill, watered every morning." },
    album: { title: "The family album", native: "ఆల్బమ్", note: "Found in the cupboard. Four generations, one shelf." },
  },
  memoryNotes: {
    album: { title: "Family album assembled", note: "Amma, Nanna, Ammamma and Tatayya — placed by name, in Telugu." },
    kitchen: { title: "Helped Amma cook", note: "Water, salt, milk — fetched by ear, not by label." },
    understood: { title: "“I actually understood that.”", note: "Amma asked in Telugu. You answered in Telugu." },
  },
  chapters: CHAPTERS.map((c) => ({ n: c.n, name: c.name, native: c.telugu, subtitle: c.subtitle, body: c.body, available: c.status === "available", art: CHAPTER_ART[c.id] })),
  highlight: { native: "నీళ్ళు కావాలా?", roman: "neellu kaavaalaa?", english: "Do you want water?", context: "The last line of Chapter One. By then, you don't need the translation." },
  preview: <HomeScenePreview />,
};
