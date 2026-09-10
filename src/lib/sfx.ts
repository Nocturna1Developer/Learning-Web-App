/**
 * Tiny synthesised sound palette. No audio files — everything is built from
 * oscillators at play time, so the prototype ships with zero assets and the
 * sounds stay consistent with each other.
 */

let ctx: AudioContext | null = null;
let muted = false;

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

type ToneOpts = { freq: number; dur?: number; type?: OscillatorType; gain?: number; at?: number; slideTo?: number };

function tone({ freq, dur = 0.12, type = "sine", gain = 0.08, at = 0, slideTo }: ToneOpts) {
  const c = ac();
  if (!c || muted) return;
  const t0 = c.currentTime + at;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

export const sfx = {
  setMuted(v: boolean) { muted = v; },
  isMuted() { return muted; },

  /** soft tick for hover / focus */
  tick() { tone({ freq: 880, dur: 0.05, gain: 0.03, type: "triangle" }); },

  /** interact with an object */
  interact() {
    tone({ freq: 520, dur: 0.09, type: "triangle", gain: 0.06 });
    tone({ freq: 780, dur: 0.12, type: "triangle", gain: 0.05, at: 0.07 });
  },

  /** a word lands in the journal */
  discover() {
    tone({ freq: 660, dur: 0.14, type: "sine", gain: 0.07 });
    tone({ freq: 990, dur: 0.18, type: "sine", gain: 0.06, at: 0.1 });
    tone({ freq: 1320, dur: 0.26, type: "sine", gain: 0.05, at: 0.2 });
  },

  /** card flip */
  flip() { tone({ freq: 300, dur: 0.07, type: "square", gain: 0.03, slideTo: 420 }); },

  /** correct match */
  match(combo = 1) {
    const base = 523 * Math.pow(1.06, Math.min(combo, 8));
    tone({ freq: base, dur: 0.1, type: "triangle", gain: 0.07 });
    tone({ freq: base * 1.5, dur: 0.16, type: "triangle", gain: 0.06, at: 0.09 });
  },

  /** wrong */
  miss() { tone({ freq: 220, dur: 0.18, type: "sawtooth", gain: 0.04, slideTo: 160 }); },

  /** footsteps while walking — call sparingly */
  step() { tone({ freq: 140, dur: 0.04, type: "triangle", gain: 0.025 }); },

  /** door / scene change */
  door() { tone({ freq: 240, dur: 0.22, type: "sine", gain: 0.06, slideTo: 180 }); },

  /** quest complete fanfare */
  fanfare() {
    [523, 659, 784, 1047].forEach((f, i) => tone({ freq: f, dur: 0.22, type: "triangle", gain: 0.07, at: i * 0.11 }));
    tone({ freq: 1568, dur: 0.5, type: "sine", gain: 0.05, at: 0.46 });
  },
};
