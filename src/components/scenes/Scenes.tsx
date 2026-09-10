import { Palm, House, Figure, Child, Kite, Glow, Birds, Garland, Muggu, Pot, Steam, Banyan } from "./primitives";
import "./scenes.css";

/* =========================================================
   HERO — a child at the edge of a village at golden hour.
   Built in depth layers so the parallax rig can move them
   independently: sky · hills · village · trees · foreground.
   ========================================================= */

export function HeroSky() {
  return (
    <svg className="scene-layer" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d2137" />
          <stop offset="32%" stopColor="#5a4560" />
          <stop offset="58%" stopColor="#b06b45" />
          <stop offset="78%" stopColor="#e0994c" />
          <stop offset="100%" stopColor="#f4c877" />
        </linearGradient>
        <radialGradient id="hero-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe6ab" stopOpacity="1" />
          <stop offset="30%" stopColor="#f7c96f" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#f0a94f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#hero-sky)" />
      <circle cx="1080" cy="620" r="340" fill="url(#hero-sun)" />
      <circle cx="1080" cy="620" r="58" fill="#ffeec2" opacity="0.9" />
      {/* cloud bands */}
      <g fill="#f0b271" opacity="0.28">
        <ellipse cx="380" cy="280" rx="300" ry="16" />
        <ellipse cx="620" cy="330" rx="220" ry="11" />
        <ellipse cx="1240" cy="250" rx="260" ry="14" />
        <ellipse cx="1000" cy="400" rx="340" ry="12" />
      </g>
      <Birds x={300} y={230} color="rgba(40,25,20,0.4)" />
    </svg>
  );
}

export function HeroHills() {
  return (
    <svg className="scene-layer" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path d="M0 640 C180 560 300 600 430 566 C560 532 640 470 800 500 C960 530 1040 470 1180 500 C1320 530 1460 580 1600 556 L1600 900 L0 900Z" fill="#7d5a52" opacity="0.55" />
      <path d="M0 700 C160 650 280 690 420 662 C580 630 700 600 860 634 C1020 668 1140 620 1300 650 C1420 672 1520 700 1600 686 L1600 900 L0 900Z" fill="#5c4038" opacity="0.75" />
    </svg>
  );
}

export function HeroVillage() {
  return (
    <svg className="scene-layer" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g opacity="0.95">
        <House x={120} y={790} w={200} h={96} wall="#3a2118" roof="#5e3020" roofLight="#8a4c2c" lit />
        <House x={330} y={800} w={150} h={80} wall="#331d15" roof="#552a1c" roofLight="#7d4326" />
        <House x={1180} y={796} w={230} h={104} wall="#3a2118" roof="#61321f" roofLight="#8a4c2c" lit />
        <House x={1420} y={804} w={170} h={86} wall="#331d15" roof="#552a1c" roofLight="#7d4326" lit />
      </g>
      {/* water pots by the well */}
      <Pot x={520} y={806} w={54} color="#4a2718" rim="#341a10" />
      <Pot x={568} y={810} w={40} color="#432415" rim="#301810" />
      {/* distant figures on the path */}
      <Figure x={700} y={800} h={64} color="rgba(24,14,10,0.72)" pose="walk" />
      <Figure x={742} y={802} h={58} color="rgba(24,14,10,0.66)" pose="walk" flip />
      <Glow id="hero-glow-1" x={205} y={735} r={90} color="#f0b45e" intensity={0.35} />
      <Glow id="hero-glow-2" x={1290} y={730} r={110} color="#f0b45e" intensity={0.32} />
    </svg>
  );
}

export function HeroTrees() {
  return (
    <svg className="scene-layer" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g className="sway sway--slow">
        <Palm x={210} y={830} h={330} lean={26} color="#241610" scale={1.05} />
        <Palm x={1418} y={846} h={300} lean={-30} color="#241610" />
      </g>
      <g className="sway">
        <Palm x={92} y={860} h={400} lean={18} color="#1a100b" scale={1.25} />
        <Palm x={1540} y={880} h={430} lean={-22} color="#1a100b" scale={1.3} />
      </g>
    </svg>
  );
}

export function HeroForeground() {
  return (
    <svg className="scene-layer" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {/* ground — warm rim where the low sun catches the ridge, then falls away */}
      <path d="M0 812 C300 792 520 826 800 818 C1080 810 1320 836 1600 820 L1600 900 L0 900Z" fill="#2c1a12" />
      <path
        d="M0 812 C300 792 520 826 800 818 C1080 810 1320 836 1600 820 L1600 828 C1320 844 1080 818 800 826 C520 834 300 800 0 820Z"
        fill="#8a5228"
        opacity="0.55"
      />
      {/* the dirt path the player is walking */}
      <path d="M690 900 C740 866 770 842 792 818 C812 842 856 868 930 900Z" fill="#3d2416" opacity="0.75" />
      <path d="M0 856 C360 840 700 872 1020 858 C1300 846 1420 868 1600 860 L1600 900 L0 900Z" fill="#150d09" />
      {/* the child, mid-stride, looking out at the village */}
      <g className="hero-child">
        <ellipse cx="806" cy="822" rx="30" ry="6" fill="rgba(0,0,0,0.4)" />
        <Child x={800} y={822} h={148} color="#120b07" pose="point" />
      </g>
      {/* grasses */}
      <g stroke="#150d09" strokeWidth="3" strokeLinecap="round" fill="none" className="sway sway--fast">
        {[40, 66, 96, 130, 1460, 1496, 1530, 1566].map((gx, i) => (
          <path key={gx} d={`M${gx} 900 C${gx - 8} 862 ${gx + 10} 846 ${gx + (i % 2 ? 4 : -6)} 812`} />
        ))}
      </g>
    </svg>
  );
}

/* =========================================================
   CHAPTER SCENES — one per world chapter
   ========================================================= */

export function VillageScene() {
  return (
    <svg className="scene-fill" viewBox="0 0 800 560" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="vil-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d3f5c" />
          <stop offset="42%" stopColor="#8f6152" />
          <stop offset="72%" stopColor="#c98a5c" />
          <stop offset="100%" stopColor="#e8b473" />
        </linearGradient>
      </defs>
      <rect width="800" height="560" fill="url(#vil-sky)" />
      <circle cx="600" cy="360" r="40" fill="#ffe0a4" opacity="0.85" />
      <path d="M0 360 C120 320 220 348 340 330 C460 312 560 340 680 326 C740 320 780 336 800 330 L800 560 L0 560Z" fill="#5e4239" opacity="0.7" />
      <House x={60} y={470} w={150} h={78} wall="#3a2118" roof="#63331f" roofLight="#8d4d2b" lit />
      <House x={250} y={482} w={130} h={68} wall="#331d15" roof="#57291b" roofLight="#7e4326" />
      <House x={560} y={476} w={170} h={82} wall="#3a2118" roof="#63331f" roofLight="#8d4d2b" lit />
      <Palm x={430} y={496} h={200} lean={16} color="#20140e" />
      <Palm x={760} y={510} h={240} lean={-18} color="#1a100b" scale={1.1} />
      <Figure x={418} y={496} h={96} color="#150d09" pose="walk" />
      <Child x={462} y={498} h={62} color="rgba(21,13,9,0.85)" pose="walk" />
      <path d="M0 492 C160 480 320 506 480 496 C620 488 700 508 800 500 L800 560 L0 560Z" fill="#241610" />
    </svg>
  );
}

export function MarketScene() {
  const stalls = [
    { x: 40, c: "#b8452f" },
    { x: 230, c: "#1f6b4f" },
    { x: 420, c: "#d9a441" },
    { x: 610, c: "#7a3a8a" },
  ];
  return (
    <svg className="scene-fill" viewBox="0 0 800 560" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <rect width="800" height="560" fill="#2a1c16" />
      <rect width="800" height="300" fill="#3d2a20" />
      <Glow id="mkt-glow" x={400} y={200} r={420} color="#f0b45e" intensity={0.22} />
      {/* awnings */}
      {stalls.map(({ x, c }, i) => (
        <g key={x}>
          <path d={`M${x} 200 L${x + 165} 200 L${x + 150} 250 L${x + 15} 250Z`} fill={c} />
          {[0, 1, 2, 3].map((k) => (
            <path key={k} d={`M${x + 18 + k * 36} 250 q 16 18 32 0`} fill={c} opacity="0.85" />
          ))}
          <rect x={x + 12} y={250} width={140} height={12} fill="rgba(0,0,0,0.3)" />
          {/* produce baskets */}
          <g transform={`translate(${x + 30} 400)`}>
            <ellipse cx="24" cy="0" rx="42" ry="14" fill="#4a2c1c" />
            {Array.from({ length: 9 }, (_, j) => (
              <circle key={j} cx={2 + (j % 5) * 11} cy={-6 - Math.floor(j / 5) * 9} r="7" fill={i % 2 ? "#c8704a" : "#3f7d55"} />
            ))}
          </g>
          <rect x={x + 20} y={262} width={130} height={140} fill="#1e120c" opacity="0.5" />
        </g>
      ))}
      <Figure x={200} y={470} h={130} color="#120b07" pose="stand" />
      <Figure x={560} y={476} h={140} color="#120b07" pose="walk" flip />
      <Child x={370} y={470} h={92} color="#0f0906" pose="point" />
      <rect y={470} width="800" height="90" fill="#1a100b" />
      <Garland x1={0} x2={800} y={120} sag={26} count={22} />
    </svg>
  );
}

export function KitchenScene() {
  return (
    <svg className="scene-fill" viewBox="0 0 800 560" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <rect width="800" height="560" fill="#241610" />
      <rect width="800" height="360" fill="#332016" />
      {/* window light */}
      <g>
        <rect x={80} y={60} width={150} height={180} fill="#f2c274" opacity="0.22" />
        <path d="M80 240 L230 60 L400 60 L200 400 Z" fill="#f2c274" opacity="0.07" />
      </g>
      <Glow id="kit-glow" x={470} y={380} r={220} color="#f0a24e" intensity={0.4} />
      {/* stove + pot */}
      <rect x={380} y={420} width={200} height={60} fill="#1c110c" />
      <Pot x={480} y={420} w={120} color="#7d4128" rim="#4e2415" />
      <path d="M420 480 q60 24 120 0" fill="#e0803a" opacity="0.65" />
      <Steam x={470} y={352} h={140} opacity={0.32} />
      <Steam x={500} y={358} h={110} delay={1.4} opacity={0.22} />
      {/* grandmother seated, child beside */}
      <Figure x={300} y={480} h={150} color="#120b07" pose="sit" />
      <Child x={630} y={480} h={106} color="#120b07" pose="point" flip />
      {/* spice bowls */}
      <g>
        {[{ x: 130, c: "#d9a441" }, { x: 180, c: "#b8452f" }, { x: 230, c: "#3f7d55" }].map(({ x, c }) => (
          <g key={x}>
            <ellipse cx={x} cy={470} rx="24" ry="8" fill="#1c110c" />
            <path d={`M${x - 24} 470 a24 24 0 0 1 48 0Z`} fill="#2b1a12" />
            <ellipse cx={x} cy={462} rx="19" ry="6.5" fill={c} />
          </g>
        ))}
      </g>
      <rect y={480} width="800" height="80" fill="#170e09" />
    </svg>
  );
}

export function FestivalScene() {
  return (
    <svg className="scene-fill" viewBox="0 0 800 560" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="fest-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2d4a78" />
          <stop offset="60%" stopColor="#8ba0c0" />
          <stop offset="100%" stopColor="#e8c896" />
        </linearGradient>
      </defs>
      <rect width="800" height="560" fill="url(#fest-sky)" />
      <g className="kite-drift">
        <Kite x={140} y={130} size={54} color="#b8452f" accent="#d9a441" rot={-14} />
      </g>
      <g className="kite-drift kite-drift--b">
        <Kite x={620} y={100} size={46} color="#1f6b4f" accent="#ecc873" rot={22} />
      </g>
      <g className="kite-drift kite-drift--c">
        <Kite x={400} y={190} size={34} color="#7a3a8a" accent="#e2a07f" rot={8} />
      </g>
      <Birds x={480} y={70} color="rgba(20,17,12,0.35)" />
      <path d="M0 400 C160 380 300 404 460 392 C600 382 700 402 800 394 L800 560 L0 560Z" fill="#6b4a3a" />
      <House x={0} y={410} w={160} h={70} wall="#3a2118" roof="#63331f" roofLight="#8d4d2b" />
      <House x={640} y={412} w={170} h={76} wall="#3a2118" roof="#63331f" roofLight="#8d4d2b" />
      <Garland x1={140} x2={640} y={330} sag={30} count={18} />
      <Muggu x={400} y={480} size={190} color="#f4ecdd" opacity={0.85} />
      <Child x={210} y={472} h={104} color="#150d09" pose="point" />
      <Figure x={600} y={472} h={104} color="#150d09" pose="stand" flip />
      <rect y={520} width="800" height="40" fill="#3a2a20" opacity="0.5" />
    </svg>
  );
}

export function StoriesScene() {
  return (
    <svg className="scene-fill" viewBox="0 0 800 560" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="story-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1428" />
          <stop offset="65%" stopColor="#1b2540" />
          <stop offset="100%" stopColor="#33324a" />
        </linearGradient>
      </defs>
      <rect width="800" height="560" fill="url(#story-sky)" />
      {Array.from({ length: 40 }, (_, i) => {
        const sx = (i * 137) % 800;
        const sy = (i * 61) % 320;
        return <circle key={i} cx={sx} cy={sy} r={i % 7 === 0 ? 1.8 : 1} fill="#f4ecdd" opacity={0.25 + (i % 5) * 0.12} />;
      })}
      <g className="twinkle">
        {[[120, 60], [420, 40], [660, 210], [250, 180], [760, 90]].map(([sx, sy]) => (
          <circle key={sx} cx={sx} cy={sy} r="2" fill="#f4ecdd" opacity="0.85" />
        ))}
      </g>
      <circle cx="660" cy="110" r="42" fill="#f4ecdd" opacity="0.9" />
      <circle cx="644" cy="100" r="42" fill="#0d1428" opacity="0.95" />
      <Banyan x={280} y={470} w={640} color="#0a0d16" />
      <Glow id="story-fire" x={420} y={470} r={140} color="#f0a24e" intensity={0.5} />
      <path d="M410 470 q10 -30 10 -40 q12 16 8 40Z" fill="#f2b45c" />
      <Figure x={330} y={480} h={112} color="#070a12" pose="sit" />
      <Figure x={480} y={480} h={86} color="#070a12" pose="sit" flip />
      <Figure x={530} y={480} h={80} color="#070a12" pose="sit" flip />
      <path d="M0 480 C200 468 420 492 620 480 C700 476 760 486 800 482 L800 560 L0 560Z" fill="#070a12" />
    </svg>
  );
}

export function FamilyScene() {
  return (
    <svg className="scene-fill" viewBox="0 0 800 560" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="fam-door" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe6b4" />
          <stop offset="55%" stopColor="#f0b45e" />
          <stop offset="100%" stopColor="#d98b3c" />
        </linearGradient>
        <linearGradient id="fam-wallg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a3d2c" />
          <stop offset="100%" stopColor="#2b1a12" />
        </linearGradient>
      </defs>
      <rect width="800" height="560" fill="url(#fam-wallg)" />

      {/* a wide doorway, filled with late light — the figures read against it */}
      <path d="M232 560 L232 214 a168 168 0 0 1 336 0 L568 560Z" fill="url(#fam-door)" />
      <path d="M232 560 L232 214 a168 168 0 0 1 336 0 L568 560Z" fill="#fff3d2" opacity="0.28" />
      {/* frame of the doorway */}
      <path
        d="M214 560 L214 214 a186 186 0 0 1 372 0 L586 560 L568 560 L568 214 a168 168 0 0 0-336 0 L232 560Z"
        fill="#1d120c"
      />
      {/* light thrown across the floor */}
      <path d="M232 498 L568 498 L688 560 L112 560Z" fill="#f2c274" opacity="0.2" />

      {/* garland strung across the opening */}
      <Garland x1={228} x2={572} y={218} sag={26} count={17} />

      {/* three generations, backlit inside the doorway */}
      <Figure x={318} y={504} h={196} color="#20130c" pose="stand" />
      <Figure x={492} y={504} h={172} color="#20130c" pose="sit" flip />
      <Child x={404} y={504} h={132} color="#1a0f09" pose="stand" />

      {/* the phone they are all leaning toward */}
      <rect x={432} y={396} width={30} height={44} rx="4" fill="#fff1c8" opacity="0.9" transform="rotate(-10 447 418)" />
      <Glow id="fam-screen" x={447} y={418} r={58} color="#ffe6ab" intensity={0.55} />

      {/* floor */}
      <rect y={504} width="800" height="56" fill="#170f09" />
      <rect y={499} width="800" height="6" fill="#4a3020" />
    </svg>
  );
}

/* =========================================================
   CTA — night sky over the village, roots below
   ========================================================= */

export function CtaScene() {
  return (
    <svg className="scene-layer" viewBox="0 0 1600 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="cta-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0e1c" />
          <stop offset="46%" stopColor="#1e2036" />
          <stop offset="76%" stopColor="#42304a" />
          <stop offset="100%" stopColor="#8a5540" />
        </linearGradient>
      </defs>
      <rect width="1600" height="800" fill="url(#cta-sky)" />
      {Array.from({ length: 60 }, (_, i) => (
        <circle
          key={i}
          cx={(i * 233) % 1600}
          cy={(i * 97) % 480}
          r={i % 8 === 0 ? 1.9 : 1}
          fill="#f4ecdd"
          opacity={0.2 + (i % 5) * 0.13}
        />
      ))}
      <g className="twinkle">
        {[[220, 90], [640, 150], [1100, 60], [1380, 240], [880, 300]].map(([sx, sy]) => (
          <circle key={sx} cx={sx} cy={sy} r="2.1" fill="#f4ecdd" opacity="0.85" />
        ))}
      </g>
      <Glow id="cta-glow" x={860} y={750} r={620} color="#e08b4c" intensity={0.5} />
      {/* distant ridge, then the village in silhouette against the last light */}
      <path d="M0 742 C240 726 420 748 640 738 C880 728 1020 748 1260 738 C1420 732 1520 746 1600 742 L1600 800 L0 800Z" fill="#1c1219" />
      <g>
        <Palm x={160} y={756} h={300} lean={20} color="#150e14" scale={1} />
        <Palm x={1450} y={758} h={320} lean={-24} color="#150e14" scale={1.05} />
        <House x={300} y={752} w={160} h={70} wall="#1a1017" roof="#291a26" lit />
        <House x={1140} y={754} w={180} h={76} wall="#1a1017" roof="#291a26" lit />
        <House x={560} y={756} w={120} h={56} wall="#170e14" roof="#241620" />
        <Figure x={820} y={756} h={54} color="#150e14" pose="walk" />
        <Child x={860} y={756} h={38} color="#150e14" pose="walk" />
      </g>
      <path d="M0 782 C320 770 640 796 960 786 C1240 778 1400 794 1600 788 L1600 800 L0 800Z" fill="#0d0908" />
    </svg>
  );
}
