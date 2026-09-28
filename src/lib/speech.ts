/**
 * Speaks a phrase through the browser's own voices when one is installed for
 * that language; silently does nothing otherwise. A nice-to-have, never a
 * dependency.
 */

const cache = new Map<string, SpeechSynthesisVoice | null>();

function pickVoice(lang: string): SpeechSynthesisVoice | null {
  if (typeof speechSynthesis === "undefined") return null;
  if (cache.has(lang)) return cache.get(lang)!;
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null; // not loaded yet — don't cache the miss
  const v = voices.find((x) => x.lang.toLowerCase().startsWith(lang.toLowerCase())) ?? null;
  cache.set(lang, v);
  return v;
}

if (typeof speechSynthesis !== "undefined") {
  speechSynthesis.addEventListener?.("voiceschanged", () => cache.clear());
}

export function speak(text: string, lang: string) {
  try {
    const v = pickVoice(lang);
    if (!v) return false;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.voice = v;
    u.lang = v.lang;
    u.rate = 0.85;
    speechSynthesis.speak(u);
    return true;
  } catch {
    return false;
  }
}
