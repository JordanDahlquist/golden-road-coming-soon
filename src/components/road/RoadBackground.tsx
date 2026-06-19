import { motion, useReducedMotion } from "framer-motion";

/**
 * Fixed cinematic background: golden road in perspective receding to a glowing
 * horizon. Pure CSS / SVG, GPU-friendly. Brand colors only.
 *
 * Layers (back to front):
 *  1. Deep background wash (charcoal → background)
 *  2. Horizon glow (radial gold bloom at vanishing point)
 *  3. Horizon hairline
 *  4. Road plane (perspective-warped trapezoid via clip-path)
 *  5. Animated lane stripes traveling toward viewer
 *  6. Soft vignette
 */
const RoadBackground = () => {
  const reduce = useReducedMotion();

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

      {/* Horizon bloom (vanishing point) */}
      <div
        className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "85vw",
          height: "55vh",
          background:
            "radial-gradient(ellipse at center, hsl(var(--gold) / 0.55) 0%, hsl(var(--gold) / 0.18) 22%, transparent 60%)",
          filter: "blur(40px)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2"
        style={{
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

      {/* The road plane — perspective trapezoid from horizon to bottom */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "42vh",
          clipPath: "polygon(48.5% 0%, 51.5% 0%, 88% 100%, 12% 100%)",
          background:
            "linear-gradient(180deg, hsl(var(--gold) / 0.0) 0%, hsl(var(--gold) / 0.10) 14%, hsl(var(--gold) / 0.22) 55%, hsl(var(--gold) / 0.32) 100%)",
        }}
      />
      {/* Road edges (warm highlight) */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "42vh",
          background:
            "radial-gradient(ellipse 60% 100% at 50% 100%, hsl(var(--gold) / 0.18), transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Lane stripes — animated forward motion */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "42vh",
          clipPath: "polygon(49.7% 0%, 50.3% 0%, 54% 100%, 46% 100%)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 12%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 12%, black 100%)",
        }}
      >
        {!reduce && (
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, hsl(var(--gold) / 0.95) 0px, hsl(var(--gold) / 0.95) 60px, transparent 60px, transparent 140px)",
            }}
            animate={{ backgroundPositionY: ["0px", "200px"] }}
            transition={{ duration: 2.4, ease: "linear", repeat: Infinity }}
          />
        )}
        {reduce && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, hsl(var(--gold) / 0.7) 0px, hsl(var(--gold) / 0.7) 60px, transparent 60px, transparent 140px)",
            }}
          />
        )}
      </div>

      {/* Atmospheric haze across horizon to soften road meeting glow */}
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
