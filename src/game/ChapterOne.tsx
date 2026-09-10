import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Child } from "../components/scenes/primitives";
import { ROOMS, STAGE_W, type Hotspot } from "./rooms";
import { VOCAB, wordById, PHRASES } from "../data/vocabulary";
import { useGame, supportFor, type SceneId } from "../state/store";
import { sfx } from "../lib/sfx";
import { speakTelugu } from "../lib/speech";
import { MemoryMatch } from "./minigames/MemoryMatch";
import { FamilyAlbum } from "./minigames/FamilyAlbum";
import { KitchenQuest } from "./minigames/KitchenQuest";
import { ChapterComplete } from "./ChapterComplete";
import "./game.css";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type Speaker = "amma" | "guide" | "you";
type Choice = { label: ReactNode; onPick: () => void };
type Line = { who: Speaker; text: ReactNode; gloss?: string; choices?: Choice[] };

type Popup = { wordId: string; isNew: boolean; n: number; out?: boolean };
type Mini = "album" | "memory" | "kitchen" | null;

const SPEED = 560;           // world units per second
const REACH = 130;           // how close counts as "near" a hotspot
const WHO = { amma: { name: "Amma", glyph: "అ" }, guide: { name: "Your journal", glyph: "✦" }, you: { name: "You", glyph: "" } };

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function ChapterOne() {
  const { progress, stats, dispatch } = useGame();
  const navigate = useNavigate();
  const flags = progress.flags;

  const [room, setRoom] = useState<SceneId>(progress.scene);
  const roomDef = ROOMS[room];

  // player
  const [px, setPx] = useState(roomDef.spawn.left);
  const [dir, setDir] = useState<1 | -1>(1);
  const [walking, setWalking] = useState(false);
  const target = useRef<{ x: number; then?: () => void } | null>(null);
  const keys = useRef<Set<string>>(new Set());
  const pxRef = useRef(px);
  pxRef.current = px;

  // UI
  const [phase, setPhase] = useState<"intro" | "play" | "complete">(flags.chapterComplete ? "play" : flags.intro ? "play" : "intro");
  const [lines, setLines] = useState<Line[]>([]);
  const [popup, setPopup] = useState<Popup | null>(null);
  const popupTimers = useRef<number[]>([]);
  const [toast, setToast] = useState<{ text: string; out?: boolean } | null>(null);
  const [mini, setMini] = useState<Mini>(null);
  const [transition, setTransition] = useState<"" | "is-leaving" | "is-entering">("is-entering");
  const [near, setNear] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set());

  const busy = lines.length > 0 || !!mini || phase !== "play";
  const support = useCallback((id: string) => supportFor(progress.encounters[id] ?? 0), [progress.encounters]);

  /* ---------------- helpers ---------------- */

  const say = useCallback((...ls: Line[]) => setLines((q) => [...q, ...ls]), []);
  const showToast = useCallback((text: string) => {
    setToast({ text });
    setTimeout(() => setToast((t) => (t ? { ...t, out: true } : t)), 2200);
    setTimeout(() => setToast(null), 2600);
  }, []);

  const encounter = useCallback((wordId: string) => {
    const n = (progress.encounters[wordId] ?? 0) + 1;
    const isNew = n === 1;
    dispatch({ type: "encounter", wordId });
    popupTimers.current.forEach(clearTimeout);
    setPopup({ wordId, isNew, n });
    speakTelugu(wordById(wordId).telugu);
    if (isNew) sfx.discover(); else sfx.interact();
    popupTimers.current = [
      window.setTimeout(() => setPopup((p) => (p ? { ...p, out: true } : p)), 2600),
      window.setTimeout(() => setPopup(null), 3000),
    ];
  }, [dispatch, progress.encounters]);

  const goTo = useCallback((to: SceneId) => {
    sfx.door();
    setTransition("is-leaving");
    setTimeout(() => {
      const cameFromRight = ROOMS[to].hotspots.some((h) => h.kind === "exit" && h.to === room && h.x > STAGE_W / 2);
      setRoom(to);
      dispatch({ type: "scene", scene: to });
      setPx(cameFromRight ? ROOMS[to].spawn.right : ROOMS[to].spawn.left);
      setDir(cameFromRight ? -1 : 1);
      setTransition("is-entering");
      setTimeout(() => setTransition(""), 650);
      if (to === "kitchen") dispatch({ type: "culture", item: "toran" });
    }, 450);
  }, [dispatch, room]);

  /* ---------------- intro ---------------- */

  const beginIntro = () => {
    setPhase("play");
    dispatch({ type: "flag", flag: "intro" });
    say(
      { who: "amma", text: <><span className="telugu">…సరే అమ్మా, నేను తర్వాత కాల్ చేస్తాను.</span></>, gloss: "Amma, down the hall, on the phone with Ammamma. You caught 'amma' and 'call'. That's already something." },
      { who: "guide", text: "You already know more than you think.", gloss: "Words you've grown up hearing are in here somewhere. This house is full of them." },
      { who: "amma", text: <>Maya! <span className="telugu">ఇక్కడికి రా</span> — Ammamma wants to see the old album. Can you find it?</>, gloss: `"${PHRASES.comeHere.roman}" — come here.` },
      { who: "guide", text: "Quest: find the family album. Try the living room — but look around on the way.", gloss: "Walk with ← → or A D. Press E near anything that glows. Or just click it." },
    );
  };

  /* ---------------- interactions ---------------- */

  const interact = useCallback((h: Hotspot) => {
    if (busy) return;
    setDone((d) => new Set([...d, `${room}:${h.id}`]));

    switch (h.kind) {
      case "word": {
        encounter(h.wordId!);
        if (h.id === "window") dispatch({ type: "culture", item: "tulasi" });
        break;
      }
      case "flavor": {
        sfx.interact();
        showToast(h.note ?? h.label);
        if (h.id === "lamp") dispatch({ type: "culture", item: "lamp" });
        if (h.id === "calendar") dispatch({ type: "culture", item: "calendar" });
        break;
      }
      case "exit": {
        if (h.to === "kitchen" && !flags.memoryDone) {
          sfx.miss();
          say({ who: "guide", text: "Amma's still on the sofa. Talk to her first.", gloss: "The kitchen comes after." });
          return;
        }
        goTo(h.to!);
        break;
      }
      case "quest": {
        if (h.id === "cupboard") {
          if (flags.albumDone) { showToast("The album is back on its shelf."); sfx.interact(); return; }
          sfx.discover();
          dispatch({ type: "flag", flag: "albumFound" });
          dispatch({ type: "culture", item: "album" });
          say({ who: "guide", text: "Found it — the family album. But the photographs have fallen out.", gloss: "Put them back on the right pages." });
          setTimeout(() => setMini("album"), 100);
        }
        break;
      }
      case "npc": {
        sfx.interact();
        if (room === "living") {
          if (!flags.albumFound) {
            say(
              { who: "amma", text: <><span className="telugu">ఆల్బమ్ దొరికిందా?</span> Have you found it?</>, gloss: "album dorikindaa? — did you find the album?" },
              { who: "amma", text: "Look in the cupboard. The big one, behind you.", gloss: "The almirah on the right." },
            );
          } else if (!flags.albumDone) {
            say({ who: "amma", text: "Put the photos back first, then show me.", gloss: "The album is still in pieces." });
          } else if (!flags.memoryDone) {
            say(
              { who: "amma", text: <><span className="telugu">శభాష్!</span> You put everyone in the right place.</>, gloss: `"${PHRASES.good.roman}" — well done.` },
              { who: "amma", text: "Ammamma will love this. Now — let's see what you remember.", gloss: "A memory game, the old kind, with cards." },
            );
            // The game opens after the lines are read (see onDialogueEnd).
          } else if (!flags.kitchenDone) {
            say({ who: "amma", text: <>Good. Now come and help me in the <span className="telugu">వంటిల్లు</span>.</>, gloss: "vantillu — the kitchen. It's through the door on the right." });
          } else {
            say({ who: "amma", text: "Go and tell Ammamma what you found. She's still on the line.", gloss: "The chapter is done — the phone is in the kitchen." });
          }
        } else if (room === "kitchen") {
          if (!flags.kitchenDone) {
            say({ who: "amma", text: <>There you are. My hands are full — <span className="telugu">సహాయం చెయ్యి</span>.</>, gloss: "sahaayam cheyyi — give me a hand." });
          } else if (!flags.chapterComplete) {
            runEnding();
          } else {
            say({ who: "amma", text: <><span className="telugu">థాంక్స్ రా.</span> Chapter Two is being built — the village is next.</>, gloss: `"${PHRASES.thanks.roman}" — thanks, dear.` });
          }
        }
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busy, room, flags, encounter, dispatch, goTo, say, showToast]);

  const pendingAfterDialogue = useRef<(() => void) | null>(null);

  // What happens when the last dialogue line is dismissed.
  const onDialogueEnd = useCallback(() => {
    const fn = pendingAfterDialogue.current;
    pendingAfterDialogue.current = null;
    if (fn) { fn(); return; }
    if (room === "living" && flags.albumDone && !flags.memoryDone && !mini) {
      setTimeout(() => setMini("memory"), 150);
    }
    if (room === "kitchen" && !flags.kitchenDone && !mini) {
      setTimeout(() => setMini("kitchen"), 150);
    }
  }, [room, flags, mini]);

  const advance = useCallback(() => {
    setLines((q) => {
      if (q.length === 0) return q;
      if (q[0].choices) return q; // choices must be picked
      const next = q.slice(1);
      if (next.length === 0) setTimeout(onDialogueEnd, 0);
      return next;
    });
  }, [onDialogueEnd]);

  /* ---------------- ending ---------------- */

  const runEnding = () => {
    say(
      { who: "amma", text: <>Ammamma says <span className="telugu">శభాష్</span>. And she asked me to ask you something.</>, gloss: "She's been listening the whole time." },
      {
        who: "amma",
        text: <span className="telugu">{PHRASES.water.telugu}</span>,
        gloss: support("neellu") > 0 ? `${PHRASES.water.roman} — ${PHRASES.water.english}` : PHRASES.water.roman,
        choices: [
          {
            label: <><span className="telugu">నీళ్ళు</span> — Neellu. Yes please.</>,
            onPick: () => {
              sfx.match(4);
              dispatch({ type: "encounter", wordId: "neellu" });
              setLines([
                { who: "you", text: "…I actually understood that.", gloss: "No translation. Just the word, and what it meant." },
                { who: "amma", text: <><span className="telugu">{PHRASES.good.telugu}</span> You see? You already knew.</>, gloss: `"${PHRASES.good.roman}"` },
              ]);
              pendingAfterDialogue.current = () => {
                dispatch({ type: "flag", flag: "chapterComplete" });
                dispatch({ type: "memory", item: "understood" });
                sfx.fanfare();
                setPhase("complete");
              };
            },
          },
          {
            label: "Umm… what?",
            onPick: () => {
              sfx.miss();
              setLines([
                { who: "amma", text: <>Listen again. <span className="telugu">నీళ్ళు.</span> You held it in your hand ten minutes ago.</>, gloss: "neellu — the jug on the counter." },
              ]);
              pendingAfterDialogue.current = () => runEnding();
            },
          },
        ],
      },
    );
  };

  /* ---------------- mini-game completions ---------------- */

  const finishAlbum = useCallback(() => {
    setMini(null);
    dispatch({ type: "flag", flag: "albumDone" });
    dispatch({ type: "memory", item: "album" });
    say(
      { who: "guide", text: "Four family words, kept.", gloss: "Amma · Nanna · Ammamma · Tatayya — all in your journal now." },
      { who: "guide", text: "Show Amma. She's on the sofa.", gloss: "Press E near her, or click." },
    );
  }, [dispatch, say]);

  const finishMemory = useCallback((best: number) => {
    setMini(null);
    dispatch({ type: "flag", flag: "memoryDone" });
    dispatch({ type: "combo", combo: best });
    say(
      { who: "amma", text: <>{best >= 3 ? <>A combo of {best}! </> : null}<span className="telugu">శభాష్.</span> Now come and help me in the kitchen.</>, gloss: "The door on the right has opened." },
    );
  }, [dispatch, say]);

  const finishKitchen = useCallback(() => {
    setMini(null);
    dispatch({ type: "flag", flag: "kitchenDone" });
    dispatch({ type: "memory", item: "kitchen" });
    say({ who: "guide", text: "Three things fetched by ear, not by label.", gloss: "Talk to Amma once more." });
  }, [dispatch, say]);

  /* ---------------- movement loop ---------------- */

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let stepTimer = 0;
    const loop = (t: number) => {
      // Cap the step so a stalled tab doesn't teleport the player when it wakes.
      const dt = Math.min(0.2, (t - last) / 1000);
      last = t;
      let x = pxRef.current;
      let moving = false;
      if (!busy) {
        const k = keys.current;
        const left = k.has("ArrowLeft") || k.has("a") || k.has("A");
        const right = k.has("ArrowRight") || k.has("d") || k.has("D");
        if (left !== right) {
          target.current = null;
          const d = right ? 1 : -1;
          x = Math.max(80, Math.min(STAGE_W - 80, x + d * SPEED * dt));
          setDir(d);
          moving = true;
        } else if (target.current) {
          const tx = target.current.x;
          const d = tx > x ? 1 : -1;
          const step = SPEED * dt;
          if (Math.abs(tx - x) <= step) {
            x = tx;
            const then = target.current.then;
            target.current = null;
            if (then) setTimeout(then, 40);
          } else {
            x += d * step;
            setDir(d);
            moving = true;
          }
        }
      }
      if (x !== pxRef.current) { pxRef.current = x; setPx(x); }
      setWalking(moving);
      if (moving) {
        stepTimer += dt;
        if (stepTimer > 0.34) { stepTimer = 0; sfx.step(); }
      }
      // nearest hotspot
      let best: string | null = null;
      let bestD = REACH;
      for (const h of roomDef.hotspots) {
        const d = Math.abs(h.x - x);
        if (d < bestD) { bestD = d; best = h.id; }
      }
      setNear(best);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [busy, roomDef]);

  /* ---------------- keyboard ---------------- */

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (!mini) navigate("/app"); return; }
      if (["ArrowLeft", "ArrowRight", "a", "d", "A", "D"].includes(e.key)) { keys.current.add(e.key); e.preventDefault(); }
      if (e.key === "e" || e.key === "E" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (phase === "intro") { beginIntro(); return; }
        if (lines.length) { advance(); return; }
        if (mini) return;
        const h = roomDef.hotspots.find((s) => s.id === near);
        if (h) interact(h);
      }
    };
    const up = (e: KeyboardEvent) => keys.current.delete(e.key);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, lines.length, mini, near, roomDef, interact, advance, navigate]);

  /* ---------------- pointer ---------------- */

  const walkTo = (x: number, then?: () => void) => {
    if (busy) return;
    const tx = Math.max(80, Math.min(STAGE_W - 80, x));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Reduced motion: no walking animation — arrive at once.
      setDir(tx > pxRef.current ? 1 : -1);
      pxRef.current = tx;
      setPx(tx);
      if (then) setTimeout(then, 40);
      return;
    }
    target.current = { x: tx, then };
  };

  const onHotspotClick = (h: Hotspot) => {
    if (busy) return;
    sfx.tick();
    if (Math.abs(h.x - pxRef.current) <= REACH) interact(h);
    else walkTo(h.x + (h.x > pxRef.current ? -70 : 70), () => interact(h));
  };

  const onStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (busy) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * STAGE_W;
    walkTo(x);
  };

  /* ---------------- derived ---------------- */

  const quest = useMemo(() => {
    if (flags.chapterComplete) return { k: "Chapter complete", v: "Say goodbye to Ammamma", hint: "Or head back to ROOTS Home." };
    if (!flags.albumFound) return { k: "Quest", v: "Find the family album", hint: room === "living" ? "Try the big cupboard." : "It's somewhere in the living room. Look around on the way." };
    if (!flags.albumDone) return { k: "Quest", v: "Put the album back together", hint: "The cupboard, in the living room." };
    if (!flags.memoryDone) return { k: "Quest", v: "Show Amma the album", hint: "She's on the sofa." };
    if (!flags.kitchenDone) return { k: "Quest", v: "Help Amma in the kitchen", hint: "Through the door on the right of the living room." };
    return { k: "Quest", v: "Talk to Amma", hint: "Ammamma has a question for you." };
  }, [flags, room]);

  const line = lines[0];
  const popWord = popup ? wordById(popup.wordId) : null;
  const popSupport = popup ? supportFor(popup.n) : 1;

  /* ---------------- render ---------------- */

  return (
    <div className="game">
      <div className="game__viewport">
        <div className={`game__stage ${transition}`} onClick={onStageClick}>
          {roomDef.art}

          {/* hotspots */}
          <div className="game__layer game__layer--hot">
            {roomDef.hotspots.map((h) => {
              const isDone = done.has(`${room}:${h.id}`) || (h.kind === "word" && !!progress.encounters[h.wordId!]);
              const isNear = near === h.id;
              return (
                <button
                  key={h.id}
                  className={`hotspot hotspot--${h.kind} ${isNear ? "is-near" : ""} ${isDone && h.kind !== "exit" && h.kind !== "npc" ? "is-done" : ""}`}
                  style={{ left: `${(h.x / STAGE_W) * 100}%`, top: `${(h.y / 900) * 100}%` }}
                  onClick={(e) => { e.stopPropagation(); onHotspotClick(h); }}
                  aria-label={h.label}
                  disabled={busy}
                >
                  <span className="hotspot__ring" />
                  <span className="hotspot__dot" />
                  <span className="hotspot__label"><kbd>E</kbd>{h.label}</span>
                </button>
              );
            })}
          </div>

          {/* player */}
          <div className={`player ${walking ? "player--walking" : ""} ${dir === -1 ? "player--flip" : ""}`} style={{ left: `${(px / STAGE_W) * 100}%` }} aria-hidden="true">
            <span className="player__shadow" />
            <svg viewBox="-42 -130 84 134">
              <g className="player__body">
                <Child x={0} y={0} h={122} color="#1a0f09" pose={walking ? "walk" : "stand"} />
              </g>
            </svg>
          </div>

        </div>
      </div>

      <p className="game__rotate" aria-hidden="true">Turn your phone sideways for the best view.</p>

      {/* ---- overlays: anchored to the viewport, not the stage ---- */}
      <div className="game__overlays">
          {/* word popup */}
          {popup && popWord && (
            <div className={`wordpop ${popup.out ? "wordpop--out" : ""}`} aria-live="polite">
              {popup.isNew && <span className="wordpop__new">New word · added to journal</span>}
              <span className="wordpop__telugu">{popWord.telugu}</span>
              <span className="wordpop__roman" style={{ opacity: 0.3 + popSupport * 0.7 }}>{popWord.roman}</span>
              <span className="wordpop__english" style={{ opacity: popSupport }}>{popWord.english}</span>
              {popSupport === 0 && <span className="wordpop__meta">You don't need the translation any more.</span>}
            </div>
          )}

          {toast && <div className={`toast ${toast.out ? "toast--out" : ""}`} role="status">{toast.text}</div>}

          {/* HUD */}
          <div className="hud">
            <div className="hud__top">
              <div className="hud__left">
                <span className="hud__chip"><span className="telugu">{roomDef.telugu}</span> {roomDef.name}</span>
                <span className="hud__chip">{stats.discovered.length} / {VOCAB.length} words</span>
              </div>
              <div className="hud__right">
                <button className="hud__chip" onClick={(e) => { e.stopPropagation(); navigate("/app/journal"); }}>Journal</button>
                <button className="hud__chip" onClick={(e) => { e.stopPropagation(); navigate("/app"); }} aria-label="Exit to ROOTS Home">
                  <Logo markOnly size={14} /> Exit
                </button>
              </div>
            </div>
            <div className="quest" aria-live="polite">
              <span className="quest__k">{quest.k}</span>
              <span className="quest__v">{quest.v}</span>
              <span className="quest__hint">{quest.hint}</span>
            </div>
            <div className="hud__controls" aria-hidden="true">
              <span><kbd>←</kbd><kbd>→</kbd>walk</span>
              <span><kbd>E</kbd>interact</span>
              <span><kbd>Esc</kbd>exit</span>
            </div>
          </div>

          {/* dialogue */}
          {line && (
            <div className="dialogue" onClick={(e) => { e.stopPropagation(); advance(); }} role="dialog" aria-live="polite">
              <span className={`dialogue__portrait dialogue__portrait--${line.who}`} aria-hidden="true">{WHO[line.who].glyph || progress.playerName.slice(0, 1)}</span>
              <div className="dialogue__body">
                <span className="dialogue__who">{line.who === "you" ? progress.playerName : WHO[line.who].name}</span>
                <p className="dialogue__text">{line.text}</p>
                {line.gloss && <p className="dialogue__gloss">{line.gloss}</p>}
                {line.choices ? (
                  <div className="dialogue__choices">
                    {line.choices.map((c, i) => (
                      <button key={i} className="dialogue__choice" onClick={(e) => { e.stopPropagation(); c.onPick(); }}>{c.label}</button>
                    ))}
                  </div>
                ) : (
                  <span className="dialogue__next">Continue →</span>
                )}
              </div>
            </div>
          )}

          {/* intro card */}
          {phase === "intro" && (
            <div className="cinematic" onClick={(e) => { e.stopPropagation(); beginIntro(); }}>
              <div className="cinematic__inner">
                <p className="cinematic__k">Chapter One · Telugu</p>
                <h1 className="cinematic__title">A Family <em>Story</em></h1>
                <p className="cinematic__text">
                  A Saturday afternoon, in a house like any other on the street. Down the hall, Amma is on the phone —
                  and she isn&rsquo;t speaking English.
                </p>
                <span className="dialogue__next">Press E or click to begin →</span>
              </div>
            </div>
          )}

          {/* mini-games */}
          {mini === "album" && <FamilyAlbum support={support} onDiscover={(id) => dispatch({ type: "encounter", wordId: id })} onComplete={finishAlbum} />}
          {mini === "memory" && <MemoryMatch words={VOCAB.filter((w) => progress.encounters[w.id]).concat(VOCAB).filter((w, i, a) => a.indexOf(w) === i)} support={support} onComplete={finishMemory} />}
          {mini === "kitchen" && <KitchenQuest support={support} onEncounter={(id) => dispatch({ type: "encounter", wordId: id })} onComplete={finishKitchen} />}

          {phase === "complete" && (
            <ChapterComplete
              words={stats.discovered.length}
              family={stats.family.length}
              culture={progress.culture.length}
              memories={progress.memories.length}
              onJournal={() => navigate("/app/journal")}
              onHome={() => navigate("/app")}
            />
          )}
      </div>
    </div>
  );
}
