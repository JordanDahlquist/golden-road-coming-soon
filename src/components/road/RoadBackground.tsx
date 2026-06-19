import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Fixed cinematic background: a winding golden road in perspective receding
 * to a glowing horizon. As the user scrolls, the road's vanishing point
 * gently sweeps left/right, giving the sensation of traveling forward along
 * a real winding road. Pure SVG/CSS, GPU-friendly. Brand colors only.
 *
 * No lane markers. The road surface is a clean, continuous golden path with
 * faint perspective bands and grain for material warmth.
 *
 * Reduced motion: the road is rendered statically (no winding, no animation).
 */
const RoadBackground = () => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll(); // entire page scroll

  // Vanishing point X (in SVG user units, 0-100). Gentle sine-like sweep.
  const vx = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [50, 56, 44, 55, 47, 50],
  );

  // Road path: bottom-left (12,100) curves up to vanishing point at top,
  // mirrors back down to bottom-right (88,100). Quadratic curves through
  // a single control point at mid-height aligned with the vanishing point.
  const d = useTransform(vx, (v) =>
    `M 12 100 Q ${v} 62 ${v - 1.2} 0 L ${v + 1.2} 0 Q ${v} 62 88 100 Z`,
  );

  // Horizon glow horizontal position follows the vanishing point.
  const horizonLeft = useTransform(vx, (v) => `${v}%`);

  // Static fallback values for reduced motion.
  const staticD = "M 12 100 Q 50 62 48.8 0 L 51.2 0 Q 50 62 88 100 Z";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Sky / atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 70% at 50% 58%, hsl(var(--charcoal) / 0.55) 0%, hsl(var(--background)) 60%)",
        }}
      />

      {/* Horizon bloom (follows vanishing point) */}
      <motion.div
        className="absolute top-[58%] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: reduce ? "50%" : horizonLeft,
          width: "85vw",
          height: "55vh",
          background:
            "radial-gradient(ellipse at center, hsl(var(--gold) / 0.55) 0%, hsl(var(--gold) / 0.18) 22%, transparent 60%)",
          filter: "blur(40px)",
          mixBlendMode: "screen",
        }}
      />
      <motion.div
        className="absolute top-[58%] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: reduce ? "50%" : horizonLeft,
          width: "28vw",
          height: "14vh",
          background:
            "radial-gradient(ellipse at center, hsl(var(--gold) / 0.95) 0%, hsl(var(--gold) / 0.4) 30%, transparent 70%)",
          filter: "blur(18px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Horizon hairline */}
      <div
        className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "70vw",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, hsl(var(--gold) / 0.7) 50%, transparent 100%)",
          boxShadow: "0 0 24px hsl(var(--gold) / 0.5)",
        }}
      />

      {/* The road — winding SVG path from horizon to viewer */}
      <svg
        className="absolute inset-x-0 bottom-0"
        style={{ height: "42vh", width: "100%" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="road-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0" />
            <stop offset="14%" stopColor="hsl(var(--gold))" stopOpacity="0.14" />
            <stop offset="55%" stopColor="hsl(var(--gold))" stopOpacity="0.28" />
            <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0.40" />
          </linearGradient>
          <linearGradient id="road-rim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0" />
            <stop offset="30%" stopColor="hsl(var(--gold))" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0.75" />
          </linearGradient>
          {/* Subtle surface texture via turbulence */}
          <filter id="road-texture" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.898  0 0 0 0 0.710  0 0 0 0 0.333  0 0 0 0.22 0" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
          {/* Clip future overlays (perspective bands, texture) to the road shape */}
          <clipPath id="road-clip" clipPathUnits="userSpaceOnUse">
            <motion.path d={reduce ? staticD : d} />
          </clipPath>
        </defs>

        {/* Road fill */}
        <motion.path d={reduce ? staticD : d} fill="url(#road-gold)" />

        {/* Faint perspective bands across the road, clipped to its shape.
            These are NOT center-line markers — they span the full width of
            the road and read as distance/atmosphere, not lane dividers. */}
        <g clipPath="url(#road-clip)" opacity="0.18">
          {[18, 30, 42, 54, 66, 78, 90].map((y) => (
            <rect
              key={y}
              x="0"
              y={y}
              width="100"
              height="0.25"
              fill="hsl(var(--gold))"
            />
          ))}
        </g>

        {/* Surface texture */}
        <g clipPath="url(#road-clip)" opacity="0.55">
          <rect x="0" y="0" width="100" height="100" filter="url(#road-texture)" />
        </g>

        {/* Warm rim along road edges */}
        <motion.path
          d={reduce ? staticD : d}
          fill="none"
          stroke="url(#road-rim)"
          strokeWidth="0.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Warm ground bloom beneath road (depth) */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "42vh",
          background:
            "radial-gradient(ellipse 60% 100% at 50% 100%, hsl(var(--gold) / 0.18), transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Atmospheric haze across horizon */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: "54%",
          height: "12vh",
          background:
            "linear-gradient(180deg, transparent, hsl(var(--gold) / 0.10), transparent)",
          filter: "blur(8px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, transparent 55%, hsl(var(--background) / 0.85) 100%)",
        }}
      />

      {/* Film grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.10] mix-blend-overlay">
        <filter id="road-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#road-grain)" />
      </svg>
    </div>
  );
};

export default RoadBackground;
