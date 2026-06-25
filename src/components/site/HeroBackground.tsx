// Cinematic atmosphere for the hero.
// Layered, GPU-only: a rich warm "golden horizon" bloom rising up into
// the near-black, a soft cool charcoal dome from above, a volumetric
// light shaft, fine film grain, and a soft vignette around the edges.
// All colors derive from brand tokens (gold, charcoal, background, off-white).

const NOISE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
      <feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.7 0'/>
    </filter>
    <rect width='100%' height='100%' filter='url(#n)'/>
  </svg>`,
)}`;

const HeroBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Base wash: cool charcoal at top → background mid → warmed black at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--charcoal) / 0.85) 0%, hsl(var(--background)) 45%, hsl(220 4% 6%) 100%)",
        }}
      />

      {/* THE HORIZON: warm gold bloom rising up from the bottom — the signature */}
      <div
        className="hero-horizon absolute -bottom-[20%] left-1/2 -translate-x-1/2 h-[110vh] w-[170vw]"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 100%, hsl(var(--gold) / 0.45) 0%, hsl(var(--gold) / 0.24) 18%, hsl(var(--gold) / 0.11) 36%, hsl(var(--gold) / 0.04) 55%, transparent 75%)",
          willChange: "transform, opacity",
        }}
      />

      {/* Concentrated warm core — the "sun behind the ridge" */}
      <div
        className="hero-horizon hero-horizon--alt absolute -bottom-[18%] left-[55%] -translate-x-1/2 h-[70vh] w-[80vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--gold) / 0.36), hsl(var(--gold) / 0.12) 45%, transparent 75%)",
          willChange: "transform, opacity",
          filter: "blur(10px)",
        }}
      />

      {/* Volumetric light shaft from upper-right */}
      <div
        className="hero-shaft absolute -top-[10%] right-[8%] h-[130vh] w-[45vw] origin-top"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--gold) / 0.12) 0%, hsl(var(--gold) / 0.05) 40%, transparent 75%)",
          transform: "rotate(16deg)",
          filter: "blur(10px)",
          willChange: "opacity, transform",
        }}
      />

      {/* Faint cool counter-glow upper-left for chromatic depth */}
      <div
        className="absolute -top-[15%] -left-[10%] h-[70vh] w-[70vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--off-white) / 0.05), transparent 70%)",
        }}
      />

      {/* Horizon hairline — the seam where dark meets warm */}
      <div
        className="hero-horizon-line absolute left-0 right-0"
        style={{
          bottom: "26%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, hsl(var(--gold) / 0.5) 50%, transparent 100%)",
          boxShadow: "0 0 40px hsl(var(--gold) / 0.35)",
        }}
      />

      {/* Film grain — analog texture */}
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundSize: "240px 240px",
        }}
      />

      {/* Soft edge vignette — frames the canvas without killing the bloom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 75% at 50% 55%, transparent 60%, hsl(var(--background) / 0.7) 100%)",
        }}
      />
    </div>
  );
};

export default HeroBackground;
