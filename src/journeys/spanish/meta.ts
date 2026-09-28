import type { Language } from "../types";

/* SPANISH · A Mexican-American family. Six chapters, from Abuela's ofrenda to a video call with the pueblo. */

const meta: Language = {
  id: "spanish",
  lang: "es-MX",
  speech: "es",
  language: "Spanish",
  native: "Español",
  family: "A Mexican-American family",
  variety: "Spanish · Mexican",
  script: "latin",
  romanize: false,
  line: "A Mexican-American family, from Día de Muertos to Las Posadas. One Spanish-speaking world of many.",
  journeys: ["Mexican family experiences", "Mexican-American life across two homes", "Latin American traditions", "Other Spanish-speaking family stories"],
  a: "#c8503f",
  b: "#1f6b4f",
  rank: 4,
  speakers: {
    abuela: { name: "Abuela", glyph: "A", tone: "elder" },
    mama: { name: "Mamá", glyph: "M", tone: "parent" },
    guide: { name: "Your journal", glyph: "✦", tone: "guide" },
    you: { name: "{name}", glyph: "", tone: "you" },
  },
  words: [
    { id: "agua", native: "agua", roman: "agua", english: "water", group: "food", where: "the pitcher in the kitchen", ch: 1 },
    { id: "pan", native: "pan", roman: "pan", english: "bread", group: "food", where: "the basket of pan dulce", ch: 1 },
    { id: "sal", native: "sal", roman: "sal", english: "salt", group: "food", where: "the kitchen counter", ch: 1 },
    { id: "vela", native: "vela", roman: "vela", english: "candle", group: "home", where: "a box in the kitchen", ch: 1 },
    { id: "flor", native: "flor", roman: "flor", english: "flower", group: "home", where: "a pot on the patio", ch: 1 },
    { id: "casa", native: "casa", roman: "casa", english: "home · house", group: "home", where: "the living-room window", ch: 1 },
    { id: "foto", native: "foto", roman: "foto", english: "photo", group: "home", where: "the ofrenda", ch: 1 },
    { id: "familia", native: "familia", roman: "familia", english: "family", group: "family", where: "the photos on the wall", ch: 1 },
    { id: "mama", native: "mamá", roman: "mamá", english: "mom", group: "family", where: "the kitchen", ch: 1 },
    { id: "papa", native: "papá", roman: "papá", english: "dad", group: "family", where: "his guitar", ch: 1 },
    { id: "abuela", native: "abuela", roman: "abuela", english: "grandmother", group: "family", where: "the armchair", ch: 1 },
    { id: "bisabuelo", native: "bisabuelo", roman: "bisabuelo", english: "great-grandfather", group: "family", where: "the ofrenda", ch: 1 },
  ],
  cultureNotes: {
    rebozo: { title: "Abuela's rebozo", native: "rebozo", note: "A woven shawl from Michoacán. She wears it for anything that matters and folds it over the sofa in between." },
    cempasuchil: { title: "Cempasúchil", native: "cempasúchil", note: "Mexican marigolds. The name comes from Nahuatl, the language of the Aztecs. Their colour and scent are said to guide the dead home." },
    molcajete: { title: "Molcajete", native: "molcajete", note: "A three-legged bowl carved from volcanic stone, for grinding salsa. Older than Mamá." },
    ofrenda: { title: "The ofrenda", native: "ofrenda", note: "An altar of remembrance for Día de Muertos: photos, candles, flowers, water, salt, and the food the person loved." },
    papel: { title: "Papel picado", native: "papel picado", note: "Tissue paper cut into lace-like banners, strung over the ofrenda." },
  },
  memoryNotes: {
    kitchen: { title: "Helped Mamá in the kitchen", note: "Bread, water, candles, salt — passed by ear, in Spanish." },
    ofrenda: { title: "Built the ofrenda", note: "His photo at the top. Candles, marigolds and pan de muerto below." },
    story: { title: "Bisabuelo Ramón's story", note: "From a pueblo in Michoacán to a panadería on your street." },
    remember: { title: "“Es mi bisabuelo.”", note: "Abuela asked who he was. You told her — in Spanish." },
  },
  chapters: [
    {
      n: 1,
      name: "La Ofrenda",
      native: "La Ofrenda",
      subtitle: "Día de Muertos at home",
      synopsis:
        "October 31st in a Mexican-American home. Across the street, kids are trick-or-treating; in the living room, Abuela is getting the ofrenda ready for your great-grandfather. Pick the cempasúchil, help Mamá in the kitchen, build the ofrenda — and hear the story of the man in the photo.",
      homeLines: {
        start: "It's October 31st. Abuela needs help building the ofrenda.",
        going: "The ofrenda is still waiting. Abuela is in her armchair.",
        done: "The ofrenda is built and Bisabuelo Ramón has his story back. Next: El Mercado.",
      },
    },
    {
      n: 2,
      name: "El Mercado",
      native: "El Mercado",
      subtitle: "Sunday at the tianguis",
      synopsis: "Abuela takes you to the Sunday tianguis in her town in Michoacán. Ask for what's on her list, count out pesos, and find out why every stall-keeper knows her name.",
      homeLines: { start: "Abuela's ready for the tianguis. Bring the bag.", going: "The tianguis is still busy, and Abuela still has a list.", done: "The bags are full and the pesos counted. Next: the tamalada." },
    },
    {
      n: 3,
      name: "La Tamalada",
      native: "La Tamalada",
      subtitle: "Tamales take all day",
      synopsis: "Christmas week, and the whole family around one table spreading masa on corn husks. Learn the steps, keep up with Tía Lupe, and hear the stories that come out when everyone's hands are busy.",
      homeLines: { start: "The masa's ready. Tía Lupe needs another pair of hands.", going: "Tamales take all day. You're only halfway.", done: "Six dozen tamales, steaming. Next: Las Posadas." },
    },
    {
      n: 4,
      name: "Las Posadas",
      native: "Las Posadas",
      subtitle: "Nine nights before Christmas",
      synopsis: "Walk the street with the neighbours, sing the verses asking for shelter, and finally break the piñata. A tradition that turns a street into a family.",
      homeLines: { start: "The procession leaves at sundown. Grab a candle.", going: "The posada's still going. The piñata is waiting.", done: "The piñata's in pieces and the ponche is warm. Next: Los Cuentos." },
    },
    {
      n: 5,
      name: "Los Cuentos",
      native: "Los Cuentos",
      subtitle: "Stories with the lights low",
      synopsis: "The power's out, the candles are lit, and Abuela tells the old story of the rabbit in the moon.",
      homeLines: { start: "The lights are out. Abuela's lighting candles.", going: "Abuela's story isn't finished yet.", done: "Now you'll see the rabbit every full moon. Next: La Familia." },
    },
    {
      n: 6,
      name: "La Familia",
      native: "La Familia",
      subtitle: "Two homes, one family",
      synopsis: "A video call to the cousins in the pueblo, and a family photo that stretches across two countries. Use everything you've learned.",
      homeLines: { start: "The cousins are calling from Michoacán.", going: "Everyone's still on the call.", done: "Two homes, one family. You've finished the Spanish journey." },
    }
  ],
  highlight: { native: "¿Y quién es él?", roman: "", english: "And who is he?", context: "Abuela points to the photo at the top of the ofrenda. By then, you know the answer." },
};

export default meta;
