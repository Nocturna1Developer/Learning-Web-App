import type { Journey } from "./types";
import { telugu } from "./telugu";
import { spanish } from "./spanish";
import { chinese } from "./chinese";
import { hindi } from "./hindi";
import { arabic } from "./arabic";

/** Display order everywhere. Telugu first — it's where ROOTS started. */
export const JOURNEY_ORDER = ["telugu", "spanish", "chinese", "hindi", "arabic"] as const;

export const JOURNEYS: Record<string, Journey> = { telugu, spanish, chinese, hindi, arabic };

export const journeyList = (): Journey[] => JOURNEY_ORDER.map((id) => JOURNEYS[id]);

export const getJourney = (id: string | undefined): Journey | undefined => (id ? JOURNEYS[id] : undefined);

export const wordIn = (j: Journey, id: string) => j.words.find((w) => w.id === id)!;
