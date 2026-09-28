import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Logo } from "../components/Logo";
import { Child } from "../components/scenes/primitives";
import { STAGE_W } from "./rooms";
import { getJourney, wordIn } from "../journeys";
import { roomArt, type Beat, type Choice, type GameSpec, type Hotspot, type Journey, type Line } from "../journeys/types";
import { Native, renderSeg } from "../journeys/render";
import { useGame, supportFor, journeyStats, freshJourney } from "../state/store";
import { sfx } from "../lib/sfx";
import { speak } from "../lib/speech";
import { PlaceGame } from "./minigames/PlaceGame";
import { MemoryMatch } from "./minigames/MemoryMatch";
import { FetchGame } from "./minigames/FetchGame";
import { StoryTime } from "./minigames/StoryTime";
import { ChapterComplete } from "./ChapterComplete";
import "./game.css";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type PickChoice = { label: ReactNode; onPick: () => void };
type DLine = Line & { choices?: PickChoice[] };
type Popup = { wordId: string; isNew: boolean; n: number; out?: boolean };
type Mini = { spec: GameSpec; beat: Beat } | null;

const SPEED = 560;   // world units per second
const REACH = 130;   // how close counts as "near" a hotspot

/** Route: /app/play/:lang */
export function JourneyPlayer() {
  const { lang } = useParams();
  const j = getJourney(lang);
  if (!j) return <Navigate to="/app/play" replace />;
  return <Player key={j.id} j={j} />;
}

/* ------------------------------------------------------------------ */
/* Player                                                              */
/* ------------------------------------------------------------------ */

function Player({ j }: { j: Journey }) {
  const { progress, dispatch } = useGame();
  const navigate = useNavigate();
  const ch = j.chapter;
  const name = progress.playerName;
  const jp = progress.journeys[j.id] ?? freshJourney(j.id);
  const done = useMemo(() => new Set(jp.done), [jp.done]);
  const stats = journeyStats(j, jp);
  const beat = ch.beats.find((b) => !done.has(b.id));
  const complete = done.has("complete");

  useEffect(() => { dispatch({ type: "activate", j: j.id }); }, [dispatch, j.id]);

  const [room, setRoom] = useState(() => (j.rooms[jp.scene] ? jp.scene : j.startRoom));
  const roomDef = j.rooms[room];
  const hotspots = useMemo(
    () => roomDef.hotspots.filter((h) => (!h.after || done.has(h.after)) && (!h.before || !done.has(h.before))),
    [roomDef, done],
  );

  // player
  const [px, setPx] = useState(roomDef.spawn.left);
  const [dir, setDir] = useState<1 | -1>(1);
  const [walking, setWalking] = useState(false);
  const target = useRef<{ x: number; then?: () => void } | null>(null);
  const keys = useRef<Set<string>>(new Set());
  const pxRef = useRef(px);
  pxRef.current = px;
  const hotRef = useRef(hotspots);
  hotRef.current = hotspots;

  // UI
  const [phase, setPhase] = useState<"intro" | "play" | "complete">(done.has("intro") ? "play" : "intro");
  const [lines, setLines] = useState<DLine[]>([]);
  const [hintOpen, setHintOpen] = useState(false);
  const [popup, setPopup] = useState<Popup | null>(null);
  const popupTimers = useRef<number[]>([]);
  const [toast, setToast] = useState<{ text: string; out?: boolean } | null>(null);
  const [mini, setMini] = useState<Mini>(null);
  const [transition, setTransition] = useState<"" | "is-leaving" | "is-entering">("is-entering");
  const [near, setNear] = useState<string | null>(null);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const pending = useRef<(() => void) | null>(null);

  const busy = lines.length > 0 || !!mini || phase !== "play";
  const support = useCallback((id: string) => supportFor(jp.encounters[id] ?? 0), [jp.encounters]);

  /* ---------------- helpers ---------------- */

  /** Show lines; run `then` once the last one is dismissed. */
  const sayThen = useCallback((ls: DLine[], then: (() => void) | null) => {
    pending.current = then;
    setHintOpen(false);
    setLines(ls);
  }, []);

  const showToast = useCallback((text: string) => {
    setToast({ text });
    setTimeout(() => setToast((t) => (t ? { ...t, out: true } : t)), 2200);
    setTimeout(() => setToast(null), 2600);
  }, []);

  const encounter = useCallback((wordId: string) => {
    const n = (jp.encounters[wordId] ?? 0) + 1;
    dispatch({ type: "encounter", j: j.id, wordId });
    popupTimers.current.forEach(clearTimeout);
    setPopup({ wordId, isNew: n === 1, n });
    speak(wordIn(j, wordId).native, j.speech);
    if (n === 1) sfx.discover(); else sfx.interact();
    popupTimers.current = [
      window.setTimeout(() => setPopup((p) => (p ? { ...p, out: true } : p)), 2600),
      window.setTimeout(() => setPopup(null), 3000),
    ];
  }, [dispatch, j, jp.encounters]);

  const goTo = useCallback((to: string) => {
    sfx.door();
    setTransition("is-leaving");
    setTimeout(() => {
      const back = j.rooms[to].hotspots.find((h) => h.kind === "exit" && h.to === room);
      const fromRight = !!back && back.x > STAGE_W / 2;
      setRoom(to);
      dispatch({ type: "scene", j: j.id, scene: to });
      setPx(fromRight ? j.rooms[to].spawn.right : j.rooms[to].spawn.left);
      setDir(fromRight ? -1 : 1);
      setTransition("is-entering");
      setTimeout(() => setTransition(""), 650);
    }, 450);
  }, [dispatch, j, room]);

  /* ---------------- story flow ---------------- */

  const finish = useCallback(() => {
    dispatch({ type: "done", j: j.id, beat: "complete" });
    dispatch({ type: "memory", j: j.id, item: ch.ending.memory });
    sfx.fanfare();
    setPhase("complete");
  }, [ch.ending.memory, dispatch, j.id]);

  const choiceLabel = useCallback((c: Choice) => (
    <>
      {c.native && <Native j={j}>{c.native}</Native>}
      {j.romanize && c.roman && c.roman !== c.native && <span className="choice__roman">{c.roman}</span>}
      {!c.native && <span>{c.english}</span>}
    </>
  ), [j]);

  const askQuestion = useCallback(() => {
    const e = ch.ending;
    const q = e.question;
    const ask: DLine = {
      who: e.asker,
      text: `{{${q.native}}}`,
      gloss: j.romanize ? q.roman : undefined,
      hint: q.english,
      choices: q.choices.map((c) => ({
        label: choiceLabel(c),
        onPick: () => {
          if (c.right) {
            sfx.match(4);
            e.encounter?.forEach((id) => dispatch({ type: "encounter", j: j.id, wordId: id }));
            sayThen(e.right, finish);
          } else {
            sfx.miss();
            sayThen(c.reply ?? [{ who: e.asker, text: "Listen again." }], () => sayThen([ask], null));
          }
        },
      })),
    };
    speak(q.native, j.speech);
    sayThen([ask], null);
  }, [ch.ending, choiceLabel, dispatch, finish, j, sayThen]);

  const runEnding = useCallback(() => {
    if (ch.ending.lines.length) sayThen(ch.ending.lines, askQuestion);
    else askQuestion();
  }, [askQuestion, ch.ending.lines, sayThen]);

  const completeBeat = useCallback((b: Beat) => {
    dispatch({ type: "done", j: j.id, beat: b.id });
    b.culture?.forEach((item) => dispatch({ type: "culture", j: j.id, item }));
    if (b.memory) dispatch({ type: "memory", j: j.id, item: b.memory });
    const isLast = ch.beats[ch.beats.length - 1].id === b.id;
    const then = isLast && ch.ending.auto ? runEnding : null;
    if (b.after?.length) sayThen(b.after, then);
    else if (then) then();
  }, [ch.beats, ch.ending.auto, dispatch, j.id, runEnding, sayThen]);

  const runBeat = useCallback((b: Beat) => {
    if (b.encounter?.length) {
      encounter(b.encounter[0]);
      b.encounter.slice(1).forEach((id) => dispatch({ type: "encounter", j: j.id, wordId: id }));
    }
    const next = () => (b.game ? setMini({ spec: b.game, beat: b }) : completeBeat(b));
    if (b.lines?.length) sayThen(b.lines, next);
    else next();
  }, [completeBeat, dispatch, encounter, j.id, sayThen]);

  const onGameDone = useCallback((best?: number) => {
    if (!mini) return;
    const b = mini.beat;
    setMini(null);
    if (best) dispatch({ type: "combo", j: j.id, combo: best });
    completeBeat(b);
  }, [completeBeat, dispatch, j.id, mini]);

  const beginIntro = () => {
    setPhase("play");
    dispatch({ type: "done", j: j.id, beat: "intro" });
    sayThen(ch.introLines, null);
  };

  // A reload between the last beat and the final question: pick the ending back up.
  const resumed = useRef(false);
  useEffect(() => {
    if (resumed.current || phase !== "play" || beat || complete || lines.length || mini) return;
    resumed.current = true;
    if (ch.ending.auto) runEnding();
  }, [beat, ch.ending.auto, complete, lines.length, mini, phase, runEnding]);

  /* ---------------- interactions ---------------- */

  const interact = (h: Hotspot) => {
    if (busy) return;
    const key = `${room}:${h.id}`;
    setTouched((d) => new Set([...d, key]));
    if (h.culture) dispatch({ type: "culture", j: j.id, item: h.culture });

    switch (h.kind) {
      case "word":
        encounter(h.wordId!);
        return;
      case "flavor":
        sfx.interact();
        showToast(h.note ?? h.label);
        return;
      case "exit": {
        const gate = ch.gates?.find((g) => g.room === room && g.hotspot === h.id && !done.has(g.until));
        if (gate) { sfx.miss(); sayThen([gate.line], null); return; }
        goTo(h.to!);
        return;
      }
      default: {
        sfx.interact();
        const fallback = (ls?: Line[]) => (ls ? sayThen(ls, null) : showToast("Not yet."));
        if (complete) return fallback(ch.afterwards?.[key] ?? ch.idle?.[key]);
        if (beat) {
          if (beat.at.room === room && beat.at.hotspot === h.id) return runBeat(beat);
          return fallback(beat.nudges?.[key] ?? ch.idle?.[key]);
        }
        const at = ch.ending.at;
        if (at && at.room === room && at.hotspot === h.id) return runEnding();
        return fallback(ch.idle?.[key]);
      }
    }
  };

  const advance = () => {
    if (!lines.length || lines[0].choices) return;
    const rest = lines.slice(1);
    setHintOpen(false);
    setLines(rest);
    if (!rest.length) {
      const fn = pending.current;
      pending.current = null;
      fn?.();
    }
  };

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
      let best: string | null = null;
      let bestD = REACH;
      for (const h of hotRef.current) {
        const d = Math.abs(h.x - x);
        if (d < bestD) { bestD = d; best = h.id; }
      }
      setNear(best);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [busy]);

  /* ---------------- keyboard ---------------- */

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (!mini) navigate("/app"); return; }
      if (mini) return;
      if (["ArrowLeft", "ArrowRight", "a", "d", "A", "D"].includes(e.key)) { keys.current.add(e.key); e.preventDefault(); }
      if (e.key === "e" || e.key === "E" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (phase === "intro") { beginIntro(); return; }
        if (lines.length) { advance(); return; }
        const h = hotRef.current.find((s) => s.id === near);
        if (h) interact(h);
      }
    };
    const up = (e: KeyboardEvent) => keys.current.delete(e.key);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  });

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
    walkTo(((e.clientX - r.left) / r.width) * STAGE_W);
  };

  /* ---------------- derived ---------------- */

  const quest = complete
    ? { k: "Chapter complete", ...ch.complete.quest }
    : beat
    ? { k: "Quest", v: beat.quest.v, hint: beat.quest.hintIn?.[room] ?? beat.quest.hint }
    : { k: "Quest", ...ch.ending.quest };

  const line = lines[0];
  const speaker = line ? j.speakers[line.who] ?? { name: line.who, glyph: "", tone: "guide" as const } : null;
  const popWord = popup ? wordIn(j, popup.wordId) : null;
  const popSupport = popup ? supportFor(popup.n) : 1;

  const memoryWords = useMemo(
    () => j.words.filter((w) => jp.encounters[w.id]).concat(j.words).filter((w, i, a) => a.indexOf(w) === i),
    // Only reshuffle when the game opens, not on every encounter mid-game.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mini?.beat.id],
  );

  /* ---------------- render ---------------- */

  return (
    <div className="game" lang="en">
      <div className="game__viewport">
        <div className={`game__stage ${transition}`} onClick={onStageClick}>
          {roomArt(roomDef, done)}

          <div className="game__layer game__layer--hot">
            {hotspots.map((h) => {
              const isDone = touched.has(`${room}:${h.id}`) || (h.kind === "word" && !!jp.encounters[h.wordId!]);
              return (
                <button
                  key={h.id}
                  className={`hotspot hotspot--${h.kind} ${near === h.id ? "is-near" : ""} ${isDone && h.kind !== "exit" && h.kind !== "npc" ? "is-done" : ""}`}
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
        {popup && popWord && (
          <div className={`wordpop ${popup.out ? "wordpop--out" : ""}`} aria-live="polite">
            {popup.isNew && <span className="wordpop__new">New word · added to journal</span>}
            <Native j={j} className="wordpop__native">{popWord.native}</Native>
            {j.romanize && <span className="wordpop__roman" style={{ opacity: 0.3 + popSupport * 0.7 }}>{popWord.roman}</span>}
            <span className="wordpop__english" style={{ opacity: popSupport }}>{popWord.english}</span>
            {popSupport === 0 && <span className="wordpop__meta">You don't need the translation any more.</span>}
          </div>
        )}

        {toast && <div className={`toast ${toast.out ? "toast--out" : ""}`} role="status">{toast.text}</div>}

        <div className="hud">
          <div className="hud__top">
            <div className="hud__left">
              <span className="hud__chip"><Native j={j}>{roomDef.native}</Native> {roomDef.name}</span>
              <span className="hud__chip">{stats.discovered.length} / {j.words.length} words</span>
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
            <span className="quest__v">{renderSeg(quest.v, j, name)}</span>
            <span className="quest__hint">{quest.hint}</span>
          </div>
          <div className="hud__controls" aria-hidden="true">
            <span><kbd>←</kbd><kbd>→</kbd>walk</span>
            <span><kbd>E</kbd>interact</span>
            <span><kbd>Esc</kbd>exit</span>
          </div>
        </div>

        {line && speaker && (
          <div className="dialogue" onClick={(e) => { e.stopPropagation(); advance(); }} role="dialog" aria-live="polite">
            <span className={`dialogue__portrait dialogue__portrait--${speaker.tone ?? "guide"}`} aria-hidden="true">
              {line.who === "you" ? name.slice(0, 1) : speaker.glyph}
            </span>
            <div className="dialogue__body">
              <span className="dialogue__who">{speaker.name.replace("{name}", name)}</span>
              <p className="dialogue__text">{renderSeg(line.text, j, name)}</p>
              {line.gloss && <p className="dialogue__gloss">{renderSeg(line.gloss, j, name)}</p>}
              {line.hint && (
                <button className={`dialogue__hint ${hintOpen ? "is-open" : ""}`} onClick={(e) => { e.stopPropagation(); setHintOpen(true); }}>
                  {hintOpen ? line.hint : "Need a hint?"}
                </button>
              )}
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

        {phase === "intro" && (
          <div className="cinematic" onClick={(e) => { e.stopPropagation(); beginIntro(); }}>
            <div className="cinematic__inner">
              <p className="cinematic__k">{ch.intro.kicker}</p>
              <h1 className="cinematic__title">{ch.intro.title} <em>{ch.intro.em}</em></h1>
              <p className="cinematic__family">{j.family} · {j.variety}</p>
              <p className="cinematic__text">{ch.intro.text}</p>
              <span className="dialogue__next">Press E or click to begin →</span>
            </div>
          </div>
        )}

        {mini?.spec.type === "place" && (
          <PlaceGame spec={mini.spec} j={j} support={support} onDiscover={(id) => dispatch({ type: "encounter", j: j.id, wordId: id })} onComplete={() => onGameDone()} />
        )}
        {mini?.spec.type === "memory" && (
          <MemoryMatch spec={mini.spec} j={j} words={memoryWords} support={support} onComplete={(best) => onGameDone(best)} />
        )}
        {mini?.spec.type === "fetch" && (
          <FetchGame spec={mini.spec} j={j} support={support} onEncounter={(id) => dispatch({ type: "encounter", j: j.id, wordId: id })} onComplete={() => onGameDone()} />
        )}
        {mini?.spec.type === "story" && <StoryTime spec={mini.spec} j={j} name={name} onComplete={() => onGameDone()} />}

        {phase === "complete" && (
          <ChapterComplete
            kicker={`Chapter complete · ${j.language}`}
            title={ch.complete.title}
            em={ch.complete.em}
            text={ch.complete.text}
            next={ch.complete.next}
            words={stats.discovered.length}
            family={stats.family.length}
            culture={jp.culture.length}
            memories={jp.memories.length}
            onJournal={() => navigate("/app/journal")}
            onHome={() => navigate("/app")}
          />
        )}
      </div>
    </div>
  );
}
