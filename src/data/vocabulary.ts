export type WordGroup = "family" | "home" | "food";

export type Word = {
  id: string;
  telugu: string;
  roman: string;
  english: string;
  group: WordGroup;
  /** where the player can first meet it */
  where: string;
};

/**
 * Chapter One vocabulary. Deliberately small: the chapter is about
 * recognising a dozen words in context, not memorising a list.
 */
export const VOCAB: Word[] = [
  { id: "neellu", telugu: "నీళ్ళు", roman: "neellu", english: "water", group: "food", where: "the glass on the desk" },
  { id: "illu", telugu: "ఇల్లు", roman: "illu", english: "home", group: "home", where: "the window" },
  { id: "pustakam", telugu: "పుస్తకం", roman: "pustakam", english: "book", group: "home", where: "the bookshelf" },
  { id: "photo", telugu: "ఫోటో", roman: "photo", english: "photo", group: "home", where: "the desk" },
  { id: "kutumbam", telugu: "కుటుంబం", roman: "kutumbam", english: "family", group: "family", where: "the hallway wall" },
  { id: "amma", telugu: "అమ్మ", roman: "amma", english: "mother", group: "family", where: "the hallway" },
  { id: "nanna", telugu: "నాన్న", roman: "nanna", english: "father", group: "family", where: "the hallway" },
  { id: "ammamma", telugu: "అమ్మమ్మ", roman: "ammamma", english: "grandmother (mother's mother)", group: "family", where: "the family album" },
  { id: "tatayya", telugu: "తాతయ్య", roman: "tatayya", english: "grandfather", group: "family", where: "the family album" },
  { id: "annam", telugu: "అన్నం", roman: "annam", english: "rice · food", group: "food", where: "the kitchen" },
  { id: "paalu", telugu: "పాలు", roman: "paalu", english: "milk", group: "food", where: "the kitchen" },
  { id: "uppu", telugu: "ఉప్పు", roman: "uppu", english: "salt", group: "food", where: "the kitchen" },
];

export const wordById = (id: string) => VOCAB.find((w) => w.id === id)!;

/** Short Telugu lines Amma uses in the chapter, with a plain gloss. */
export const PHRASES = {
  comeHere: { telugu: "ఇక్కడికి రా", roman: "ikkadiki raa", english: "come here" },
  water: { telugu: "నీళ్ళు కావాలా?", roman: "neellu kaavaalaa?", english: "do you want water?" },
  good: { telugu: "శభాష్!", roman: "shabaash!", english: "well done!" },
  thanks: { telugu: "థాంక్స్ రా", roman: "thanks raa", english: "thanks, dear" },
};
