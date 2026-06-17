// Subtle living background for the hero: slow-drifting gold-tinted radial glow
// + faint film-grain noise overlay. GPU-only animation (transform/opacity).
// Respects prefers-reduced-motion via the .hero-glow class in index.css.

const NOISE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
      <feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/>
    </filter>
    <rect width='100%' height='100%' filter='url(#n)'/>
  </svg>`
)}`;

const HeroBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Soft gold radial glow, slow drift */}
      <div
        className="hero-glow absolute -top-[20%] -left-[15%] h-[90vw] w-[90vw] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--gold) / 0.08), transparent 70%)",
          willChange: "transform",
        }}
      />
      <div
        className="hero-glow hero-glow--alt absolute -bottom-[30%] -right-[20%] h-[80vw] w-[80vw] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--gold) / 0.06), transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Film-grain noise */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.05]"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundSize: "160px 160px",
        }}
      />

      {/* Subtle vignette to deepen edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, hsl(var(--background) / 0.6) 100%)",
        }}
      />
    </div>
  );
};

export default HeroBackground;
