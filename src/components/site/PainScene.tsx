import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Pinned, scroll-driven Pain scene.
 *
 * Structure:
 *  - Outer tall container (~280vh) defines scroll distance.
 *  - Inner sticky stage pins to viewport; scroll progress drives time.
 *
 * Phases (driven by container scrollYProgress 0 → 1):
 *  A. Compression (0.00 → 0.45): gap above headline tightens, headline rises
 *     toward the gold hairline.
 *  B. Release    (0.45 → 0.70): hairline splits & slides apart, fading;
 *     space opens above the headline.
 *  C. Resolve    (0.55 → 0.95): sub-line fades and rises into opened space.
 *
 * Reduced motion: no pinning, no scroll-tied transforms. Everything renders
 * in its final, resolved state inside normal flow.
 */
const PainScene = () => {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- Phase A: compression ---
  // Gap above headline tightens from ~22vh to ~6vh.
  const gapVh = useTransform(scrollYProgress, [0, 0.45], [22, 6]);
  const gap = useTransform(gapVh, (v) => `${v}vh`);

  // Headline rises a few percent toward the line as pressure builds.
  const headlineY = useTransform(scrollYProgress, [0, 0.45], [0, -12]);

  // --- Phase B: hairline release ---
  // Two halves of the hairline; they sit together during compression,
  // then slide apart and fade during release.
  const lineHalfWidthPct = useTransform(
    scrollYProgress,
    [0, 0.45, 0.7],
    [40, 40, 50],
  );
  const lineHalfWidth = useTransform(lineHalfWidthPct, (v) => `${v}%`);

  const lineSplitPx = useTransform(
    scrollYProgress,
    [0.45, 0.7],
    [0, 220],
  );
  const lineLeftX = useTransform(lineSplitPx, (v) => -v);
  const lineRightX = lineSplitPx;

  const lineOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.55, 0.72],
    [0.85, 0.95, 0.7, 0],
  );

  // Headline settles after release.
  const headlineYSettled: MotionValue<number> = useTransform(
    scrollYProgress,
    [0.45, 0.7],
    [-12, 0],
  );
  // Compose: use settled value after the split begins.
  const headlineYFinal = useTransform(
    [headlineY, headlineYSettled, scrollYProgress] as const,
    ([a, b, p]) => ((p as number) < 0.45 ? (a as number) : (b as number)),
  );

  // --- Phase C: resolve / sub-line ---
  const subOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.78],
    [0, 1],
  );
  const subY = useTransform(scrollYProgress, [0.55, 0.78], [16, 0]);

  // Reduced motion: render the final, resolved state in normal flow.
  if (reduce) {
    return (
      <section
        aria-labelledby="pain-heading"
        className="relative bg-background text-off-white px-6 md:px-12 lg:px-20 py-32"
      >
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="h-px w-full max-w-[640px] bg-gold/60 mb-12" />
          <h2
            id="pain-heading"
            className="font-serif tracking-tight text-off-white"
            style={{
              fontSize: "clamp(2.25rem, 6vw, 5.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            Growth isn&rsquo;t your problem.
            <br />
            Your infrastructure is.
          </h2>
          <p
            className="mt-10 font-sans leading-relaxed text-off-white/70 max-w-[52ch]"
            style={{ fontSize: "clamp(1rem, 1.2vw, 1.2rem)" }}
          >
            You&rsquo;re scaling past what your financial systems were built to
            carry. The ceiling isn&rsquo;t the market. It&rsquo;s the
            architecture underneath you.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      aria-labelledby="pain-heading"
      className="relative bg-background"
      style={{ height: "280vh" }}
    >
      {/* Pinned stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative h-full w-full flex items-center justify-center px-6 md:px-12 lg:px-20">
          <div className="w-full max-w-[1100px]">
            {/* Compression gap above the hairline */}
            <motion.div style={{ height: gap }} aria-hidden="true" />

            {/* Gold hairline: two halves meeting at center, then splitting */}
            <div
              className="relative w-full flex items-center justify-center"
              aria-hidden="true"
              style={{ height: "1px" }}
            >
              <motion.span
                className="absolute right-1/2 block h-px bg-gold"
                style={{
                  width: lineHalfWidth,
                  x: lineLeftX,
                  opacity: lineOpacity,
                  transformOrigin: "right center",
                  willChange: "transform, opacity, width",
                }}
              />
              <motion.span
                className="absolute left-1/2 block h-px bg-gold"
                style={{
                  width: lineHalfWidth,
                  x: lineRightX,
                  opacity: lineOpacity,
                  transformOrigin: "left center",
                  willChange: "transform, opacity, width",
                }}
              />
            </div>

            {/* Headline */}
            <motion.h2
              id="pain-heading"
              style={{
                y: headlineYFinal,
                fontSize: "clamp(2.25rem, 6vw, 5.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                willChange: "transform",
              }}
              className="mt-10 md:mt-14 font-serif tracking-tight text-off-white"
            >
              Growth isn&rsquo;t your problem.
              <br />
              Your infrastructure is.
            </motion.h2>

            {/* Sub-line (resolve) */}
            <motion.p
              style={{
                opacity: subOpacity,
                y: subY,
                fontSize: "clamp(1rem, 1.2vw, 1.2rem)",
                willChange: "transform, opacity",
              }}
              transition={{ ease: EASE }}
              className="mt-10 md:mt-12 font-sans leading-relaxed text-off-white/70 max-w-[52ch]"
            >
              You&rsquo;re scaling past what your financial systems were built
              to carry. The ceiling isn&rsquo;t the market. It&rsquo;s the
              architecture underneath you.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainScene;
