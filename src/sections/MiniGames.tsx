import { Reveal, RevealLines } from "../components/Reveal";
import { C, Muggu, Kite, Pot, Steam, Child, Glow } from "../components/scenes/primitives";
import "./MiniGames.css";

/* Each mini-game gets its own small piece of art rather than an icon set. */

function MarketRushArt() {
  const stalls = [
    { x: 18, awning: "#b8452f", produce: C.leafLight },
    { x: 152, awning: "#1f6b4f", produce: C.clay },
    { x: 286, awning: "#7a3a8a", produce: C.sun },
  ];
  return (
    <svg viewBox="0 0 400 260" className="mg__art" aria-hidden="true">
      <rect width="400" height="260" fill="#2a1c16" />
      <rect width="400" height="150" fill="#3a271d" />
      <Glow id="mg-mkt" x={200} y={60} r={230} color="#f0b45e" intensity={0.24} />
      {stalls.map(({ x, awning, produce }) => (
        <g key={x}>
          {/* awning with a scalloped edge */}
          <path d={`M${x} 44 L${x + 96} 44 L${x + 88} 78 L${x + 8} 78Z`} fill={awning} />
          {[0, 1, 2, 3].map((k) => (
            <path key={k} d={`M${x + 8 + k * 20} 78 q 10 12 20 0`} fill={awning} opacity="0.9" />
          ))}
          {/* poles + counter */}
          <rect x={x + 6} y={78} width="4" height="86" fill="#20140e" />
          <rect x={x + 86} y={78} width="4" height="86" fill="#20140e" />
          <rect x={x + 2} y={150} width="92" height="9" fill="#4a2c1c" />
          <rect x={x + 2} y={159} width="92" height="16" fill="#2a1a12" />
          {/* produce heaped on the counter */}
          {Array.from({ length: 10 }, (_, j) => (
            <circle
              key={j}
              cx={x + 14 + (j % 5) * 17}
              cy={144 - Math.floor(j / 5) * 12}
              r="8.5"
              fill={produce}
              opacity={0.92 - Math.floor(j / 5) * 0.1}
            />
          ))}
        </g>
      ))}
      {/* the list you are racing against */}
      <g className="mg-timer">
        <rect x="18" y="20" width="364" height="5" rx="2.5" fill="rgba(244,236,221,0.16)" />
        <rect x="18" y="20" width="364" height="5" rx="2.5" fill={C.sun} />
      </g>
      <Child x={128} y={214} h={78} color="#150d09" pose="walk" />
      <rect y="214" width="400" height="46" fill="#1a100b" />
    </svg>
  );
}

function MugguArt() {
  return (
    <svg viewBox="0 0 400 260" className="mg__art" aria-hidden="true">
      <rect width="400" height="260" fill="#3a2820" />
      <rect width="400" height="260" fill="url(#mg-muggu-grade)" />
      <defs>
        <radialGradient id="mg-muggu-grade" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#5c4034" />
          <stop offset="100%" stopColor="#2a1c16" />
        </radialGradient>
      </defs>
      <Muggu x={200} y={130} size={210} color="#f4ecdd" opacity={0.92} />
      <circle cx="200" cy="130" r="26" fill="#c8704a" opacity="0.75" />
      <circle cx="200" cy="130" r="13" fill="#d9a441" opacity="0.9" />
    </svg>
  );
}

function CookingArt() {
  return (
    <svg viewBox="0 0 400 260" className="mg__art" aria-hidden="true">
      <rect width="400" height="260" fill="#241610" />
      <Glow id="mg-cook" x={200} y={200} r={190} color="#f0a24e" intensity={0.42} />
      <Steam x={185} y={130} h={100} opacity={0.3} />
      <Steam x={215} y={136} h={80} delay={1.2} opacity={0.2} />
      <Pot x={200} y={210} w={130} color="#7d4128" rim="#4e2415" />
      <path d="M140 210 q60 26 120 0" fill="#e0803a" opacity="0.6" />
      {[{ x: 62, c: "#d9a441" }, { x: 112, c: "#b8452f" }, { x: 300, c: "#3f7d55" }, { x: 350, c: "#c8704a" }].map(({ x, c }) => (
        <g key={x}>
          <path d={`M${x - 22} 214 a22 22 0 0 1 44 0Z`} fill="#2b1a12" />
          <ellipse cx={x} cy={206} rx="17" ry="6" fill={c} />
        </g>
      ))}
      <rect y="222" width="400" height="38" fill="#170e09" />
    </svg>
  );
}

function KiteArt() {
  return (
    <svg viewBox="0 0 400 260" className="mg__art" aria-hidden="true">
      <defs>
        <linearGradient id="mg-kite-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2d4a78" />
          <stop offset="100%" stopColor="#e0bd8e" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#mg-kite-sky)" />
      <g className="kite-drift"><Kite x={110} y={80} size={44} color="#b8452f" accent="#d9a441" rot={-16} tail={0.55} /></g>
      <g className="kite-drift kite-drift--b"><Kite x={290} y={62} size={38} color="#1f6b4f" accent="#ecc873" rot={20} tail={0.5} /></g>
      <g className="kite-drift kite-drift--c"><Kite x={205} y={120} size={28} color="#7a3a8a" accent="#e2a07f" rot={6} tail={0.4} /></g>
      <path d="M0 210 C90 200 180 216 280 208 C340 204 380 214 400 210 L400 260 L0 260Z" fill="#3c2a20" />
      <Child x={90} y={232} h={62} color="#1a120c" pose="point" />
      <Child x={320} y={234} h={56} color="#1a120c" pose="point" flip />
    </svg>
  );
}

const GAMES = [
  {
    name: "Market Rush",
    telugu: "సంత",
    mechanic: "Timed collection",
    body: "A shopping list, read aloud in Telugu, and a market that doesn't wait. Grab the right ingredients before the stalls close.",
    teaches: "Food nouns · numbers · listening speed",
    art: <MarketRushArt />,
  },
  {
    name: "Muggu",
    telugu: "ముగ్గు",
    mechanic: "Pattern drawing",
    body: "Chalk a continuous line around a grid of dots without lifting your finger or crossing your own path — the way it's done at dawn on the doorstep.",
    teaches: "Symmetry · festival tradition · patience",
    art: <MugguArt />,
  },
  {
    name: "Cooking",
    telugu: "వంట",
    mechanic: "Sequence & timing",
    body: "Temper the mustard seeds until they pop. Add in the order she taught you. Get it wrong and the dish tells you, honestly.",
    teaches: "Verbs · ingredients · family recipes",
    art: <CookingArt />,
  },
  {
    name: "Kite Flying",
    telugu: "గాలిపటం",
    mechanic: "Wind & tension",
    body: "Read the wind, let out line, and cross strings with a rival on the next rooftop. Sankranti's real competitive sport.",
    teaches: "Direction words · festival ritual · timing",
    art: <KiteArt />,
  },
];

export function MiniGames() {
  return (
    <section className="surface section grain" data-surface="dark">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Reveal><span className="eyebrow">Mini-games</span></Reveal>
            <RevealLines className="display display--xl" lines={["Learning hides", <>inside the <em>fun</em>.</>]} />
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              Each one is designed to be replayed for its own sake. What it teaches is a
              by-product of being good at it.
            </p>
          </Reveal>
        </div>

        <div className="mgs">
          {GAMES.map((g, i) => (
            <Reveal key={g.name} delay={(i % 2) * 0.1} className="mg-wrap" amount={0.12}>
              <article className="mg">
                <div className="mg__media">
                  {g.art}
                  <div className="mg__media-grade" />
                  <span className="mg__mechanic">{g.mechanic}</span>
                </div>
                <div className="mg__body">
                  <div className="mg__head">
                    <h3 className="display display--md">{g.name}</h3>
                    <span className="mg__telugu telugu">{g.telugu}</span>
                  </div>
                  <p className="mg__text">{g.body}</p>
                  <p className="mg__teaches"><span>Teaches</span> {g.teaches}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
