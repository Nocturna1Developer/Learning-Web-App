import type { Language } from "../types";

/* HINDI · Devanagari · A Hindi-speaking family from Lucknow. */

const meta: Language = {
  id: "hindi",
  lang: "hi",
  speech: "hi",
  language: "Hindi",
  native: "हिन्दी",
  family: "A Hindi-speaking family from Lucknow",
  variety: "Hindi · Devanagari script",
  script: "hi",
  romanize: true,
  line: "A family from Lucknow, from Dadi's summer visit to Holi in her city — with room for every region's differences.",
  journeys: ["Family conversations", "Food and festivals", "Music and stories", "Regional traditions"],
  a: "#e07a2f",
  b: "#1f4d33",
  rank: 3,
  speakers: {
    dadi: { name: "Dadi", glyph: "दा", tone: "elder" },
    maa: { name: "Maa", glyph: "माँ", tone: "parent" },
    guide: { name: "Your journal", glyph: "✦", tone: "guide" },
    you: { name: "{name}", glyph: "", tone: "you" },
  },
  words: [
    { id: "paani", native: "पानी", roman: "paani", english: "water", group: "food", where: "the kitchen tap", ch: 1 },
    { id: "doodh", native: "दूध", roman: "doodh", english: "milk", group: "food", where: "the fridge", ch: 1 },
    { id: "cheeni", native: "चीनी", roman: "cheeni", english: "sugar", group: "food", where: "Maa's jar", ch: 1 },
    { id: "chai", native: "चाय", roman: "chai", english: "tea", group: "food", where: "the kitchen", ch: 1 },
    { id: "adrak", native: "अदरक", roman: "adrak", english: "ginger", group: "food", where: "the kitchen", ch: 1 },
    { id: "ghar", native: "घर", roman: "ghar", english: "home · house", group: "home", where: "the living-room window", ch: 1 },
    { id: "chashma", native: "चश्मा", roman: "chashma", english: "glasses", group: "home", where: "Dadi's room", ch: 1 },
    { id: "kahaani", native: "कहानी", roman: "kahaani", english: "story", group: "home", where: "Dadi's storybook", ch: 1 },
    { id: "maa", native: "माँ", roman: "maa", english: "mom", group: "family", where: "the kitchen", ch: 1 },
    { id: "papa", native: "पापा", roman: "papa", english: "dad", group: "family", where: "his cricket match", ch: 1 },
    { id: "dadi", native: "दादी", roman: "daadi", english: "grandma (dad's mother)", group: "family", where: "the living room", ch: 1 },
    { id: "dada", native: "दादा", roman: "daada", english: "grandpa (dad's father)", group: "family", where: "the photo over the sofa", ch: 1 },
    { id: "parivaar", native: "परिवार", roman: "parivaar", english: "family", group: "family", where: "the photos in Dadi's room", ch: 1 },
  ],
  cultureNotes: {
    pranam: { title: "Touching an elder's feet", native: "पैर छूना", note: "A greeting of respect in many North Indian families. The elder answers with a blessing — जीते रहो, live long." },
    mithai: { title: "Mithai from Lucknow", native: "मिठाई", note: "Sweets carried across an ocean in a suitcase. Every visiting grandparent's first priority." },
    chai: { title: "Masala chai", native: "चाय", note: "Boiled, not steeped: water, ginger, tea, milk, sugar. Every family does it slightly differently, and every family is right." },
    dabba: { title: "Masala dabba", native: "मसालेदानी", note: "A round steel tin with seven small cups of spice inside." },
    blockprint: { title: "Block-print bedspread", note: "Printed by hand with carved wooden blocks in Jaipur." },
    diya: { title: "The diya", native: "दिया", note: "A small brass lamp Dadi lights every evening, wherever she is." },
    panchatantra: { title: "The Panchatantra", native: "पंचतंत्र", note: "A collection of animal fables around two thousand years old. The monkey and the crocodile is one of the best known." },
  },
  memoryNotes: {
    chai: { title: "Made chai for Dadi", note: "Water, ginger, milk, sugar — added in Hindi, in the right order." },
    glasses: { title: "Found Dadi's glasses", note: "On top of her head. Every single time." },
    story: { title: "The monkey and the crocodile", note: "Dadi's story — a clever monkey and a very hungry river." },
    answered: { title: "“बहुत अच्छी, दादी!”", note: "Dadi asked how you liked her story. You told her — in Hindi." },
  },
  chapters: [
    {
      n: 1,
      name: "Dadi's Here",
      native: "दादी आईं",
      subtitle: "The first day of summer",
      synopsis:
        "Dadi has flown in from Lucknow for the whole summer. Greet her the way she was greeted as a girl, make her chai the way she likes it, find the glasses she's lost again — and settle in for her story about a monkey, a crocodile and a very sweet heart.",
      homeLines: {
        start: "Dadi's just arrived from Lucknow. She's waiting in the living room.",
        going: "Dadi's still waiting — for chai, for her glasses, for a story.",
        done: "Dadi's story is told, and she's promised another tomorrow. Next: the bazaar in Lucknow.",
      },
    },
    {
      n: 2,
      name: "The Bazaar",
      native: "बाज़ार",
      subtitle: "Chaat and bargaining",
      synopsis: "In Lucknow with Dadi. Follow her through the bazaar: count rupees, taste golgappe, and learn how to say “too expensive” like you mean it.",
      homeLines: { start: "Dadi's got her handbag. The bazaar is waiting.", going: "Dadi's still bargaining. Keep up.", done: "Bags full, chaat eaten. Next: Dadi's kitchen." },
    },
    {
      n: 3,
      name: "The Kitchen",
      native: "रसोई",
      subtitle: "Round rotis, eventually",
      synopsis: "Dadi's kitchen in Lucknow. Knead the dough, roll a roti, puff it on the flame — until one of them is actually round.",
      homeLines: { start: "Dadi's put out the rolling pin.", going: "The dough's ready. The rotis aren't.", done: "One round roti. Just one. Next: Holi." },
    },
    {
      n: 4,
      name: "Holi",
      native: "होली",
      subtitle: "The festival of colours",
      synopsis: "Gulal in every colour, water balloons, gujiya on a plate — learn the colours by throwing them, and why nobody minds going home a little pink.",
      homeLines: { start: "The courtyard's full. Everyone has gulal.", going: "There's still someone who isn't pink yet.", done: "Every colour, everywhere. Next: stories." },
    },
    {
      n: 5,
      name: "Stories",
      native: "कहानियाँ",
      subtitle: "Akbar and Birbal",
      synopsis: "On the rooftop after Holi, Dadi tells the story of Birbal's khichdi — the clever minister who cooked a pot of rice to teach an emperor a lesson.",
      homeLines: { start: "Dadi's on the rooftop with her chai.", going: "Birbal's khichdi still isn't cooked.", done: "Birbal wins again. Next: family." },
    },
    {
      n: 6,
      name: "Family",
      native: "परिवार",
      subtitle: "The call home",
      synopsis: "Home again. A video call to Lucknow — Chachi, the cousins, and one very loud uncle. Put names to everyone in the family, in Hindi.",
      homeLines: { start: "The whole Lucknow family is calling.", going: "Everyone's still talking at once.", done: "Everyone has a name now. You've finished the Hindi journey." },
    }
  ],
  highlight: { native: "कहानी कैसी लगी?", roman: "kahaani kaisi lagi?", english: "How did you like the story?", context: "Dadi asks after her story. You answer without looking anything up." },
};

export default meta;
