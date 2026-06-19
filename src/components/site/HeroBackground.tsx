// Cinematic atmosphere for the hero.
// Layered, GPU-only: a low warm "golden horizon" wash bleeding up into
// the near-black, a soft cool charcoal dome from above, a faint side
// light shaft, a slow conic shimmer, fine film grain, and a deep vignette.
// All colors derive from brand tokens (gold, charcoal, background, off-white).

const NOISE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>
      <feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/>
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
      {/* Base wash: deep charcoal-to-black vertical, gives the canvas depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--charcoal) / 0.55) 0%, hsl(var(--background)) 55%, hsl(var(--background)) 100%)",
        }}
      />

      {/* Cool charcoal dome from above — pushes light to the lower half */}
      <div
        className="absolute -top-[35%] left-1/2 -translate-x-1/2 h-[110vh] w-[140vw]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, hsl(var(--charcoal) / 0.45), transparent 65%)",
        }}
      />

      {/* THE HORIZON: warm gold light bleeding up from the bottom edge. */}
      <div
        className="hero-horizon absolute -bottom-[35%] left-1/2 -translate-x-1/2 h-[120vh] w-[160vw]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, hsl(var(--gold) / 0.22) 0%, hsl(var(--gold) / 0.10) 18%, hsl(var(--gold) / 0.04) 32%, transparent 55%)",
          willChange: "transform, opacity",
        }}
      />

      {/* Secondary warm pool, off-center for asymmetry */}
      <div
        className="hero-horizon hero-horizon--alt absolute -bottom-[40%] left-[58%] h-[90vh] w-[90vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--gold) / 0.18), hsl(var(--gold) / 0.05) 45%, transparent 75%)",
          willChange: "transform, opacity",
        }}
      />

      {/* Faint cool counter-glow far upper-left for chromatic depth */}
      <div
        className="absolute -top-[20%] -left-[10%] h-[60vh] w-[60vh] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--off-white) / 0.04), transparent 70%)",
        }}
      />

      {/* Thin volumetric light shaft from upper-right, very subtle */}
      <div
        className="hero-shaft absolute top-0 right-[12%] h-[120vh] w-[40vw] origin-top"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--gold) / 0.06) 0%, hsl(var(--gold) / 0.02) 35%, transparent 70%)",
          transform: "rotate(14deg) translateY(-10%)",
          filter: "blur(40px)",
          willChange: "opacity, transform",
        }}
      />

      {/* The horizon line: a hairline of light where dark meets warm */}
      <div
        className="hero-horizon-line absolute left-0 right-0"
        style={{
          bottom: "22%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, hsl(var(--gold) / 0.0) 8%, hsl(var(--gold) / 0.35) 50%, hsl(var(--gold) / 0.0) 92%, transparent 100%)",
          boxShadow: "0 0 24px hsl(var(--gold) / 0.18)",
        }}
      />

      {/* Film grain — analog, expensive texture */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundSize: "220px 220px",
        }}
      />

      {/* Deep vignette to focus the eye */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 50%, hsl(var(--background) / 0.85) 100%)",
        }}
      />
    </div>
  );
};

export default HeroBackground;
