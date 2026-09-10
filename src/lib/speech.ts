/**
 * Speaks Telugu through the browser's own voices when one is installed;
 * silently does nothing otherwise. A nice-to-have, never a dependency.
 */

let voice: SpeechSynthesisVoice | null | undefined;

function pickVoice(): SpeechSynthesisVoice | null {
  if (voice !== undefined) return voice;
  if (typeof speechSynthesis === "undefined") return (voice = null);
  const voices = speechSynthesis.getVoices();
  voice = voices.find((v) => v.lang.toLowerCase().startsWith("te")) ?? null;
  return voice;
}

if (typeof speechSynthesis !== "undefined") {
  speechSynthesis.addEventListener?.("voiceschanged", () => { voice = undefined; });
}

export function speakTelugu(text: string) {
  try {
    const v = pickVoice();
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

export function canSpeakTelugu() {
  return !!pickVoice();
}
