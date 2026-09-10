export type Chapter = {
  n: string;
  id: string;
  name: string;
  telugu: string;
  subtitle: string;
  body: string;
  status: "available" | "soon";
  learn: string[];
};

export const CHAPTERS: Chapter[] = [
  {
    n: "01",
    id: "family-story",
    name: "A Family Story",
    telugu: "కుటుంబం",
    subtitle: "Where the journey starts",
    body: "It starts at home — a normal American home with your family's story quietly everywhere in it. Find the album, and discover you already understand more than you think.",
    status: "available",
    learn: ["Family words", "Home & kitchen", "Your first sentence"],
  },
  {
    n: "02",
    id: "village",
    name: "The Village",
    telugu: "ఊరు",
    subtitle: "Dirt lanes and tiled roofs",
    body: "A well that everyone meets at. You arrive knowing a little and have to find your way by asking.",
    status: "soon",
    learn: ["Greetings", "Directions", "Names"],
  },
  {
    n: "03",
    id: "market",
    name: "The Market",
    telugu: "సంత",
    subtitle: "Language you can hold",
    body: "Bargain for tamarind. Count change. Learn the difference between what something is called and what it's worth.",
    status: "soon",
    learn: ["Numbers", "Produce", "Asking for things"],
  },
  {
    n: "04",
    id: "festival",
    name: "The Festival",
    telugu: "సంక్రాంతి",
    subtitle: "Sankranti, from the inside",
    body: "Chalk a muggu before dawn, fly a kite until the string cuts your finger. Three days that explain a whole calendar.",
    status: "soon",
    learn: ["Festival words", "Rituals", "Seasons"],
  },
  {
    n: "05",
    id: "stories",
    name: "The Stories",
    telugu: "కథలు",
    subtitle: "Told under the banyan",
    body: "Folk tales that travelled by voice for centuries — Tenali Rama's tricks, village legends, the ones with no written source at all.",
    status: "soon",
    learn: ["Listening", "Storytelling", "Folklore"],
  },
  {
    n: "06",
    id: "family",
    name: "The Family",
    telugu: "బంధం",
    subtitle: "Where it stops being a game",
    body: "The last chapter asks you to use what you've learned on a real call, with real relatives, in real Telugu.",
    status: "soon",
    learn: ["Conversation", "Confidence", "Connection"],
  },
];
