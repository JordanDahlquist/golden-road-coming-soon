import { ReactNode, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, MotionValue } from "framer-motion";

interface RoadStationProps {
  children: ReactNode;
  /** Total scrollable height for this station in viewport units. Default 200vh. */
  heightVh?: number;
}

/**
 * A scroll-linked "station" along the road. The child content emerges from
 * the vanishing point (small + faint), scales to a stable readable REST
 * (large, sharp, opaque) for a comfortable plateau, then recedes upward and
 * fades as the next station rises.
 *
 * Mechanism: the section reserves real scroll height (heightVh). A child is
 * sticky-pinned at viewport center while the parent scrolls past, and the
 * scale/opacity/y is driven by the parent's scroll progress.
 *
 * Timeline (scroll progress 0 → 1):
 *   0.00 – 0.22  EMERGE   scale 0.18 → 1.0, opacity 0 → 1, y +6vh → 0
 *   0.22 – 0.65  REST     scale 1.0, opacity 1, y 0  (READABLE)
 *   0.65 – 1.00  RECEDE   scale 1.0 → 1.35, opacity 1 → 0, y 0 → -10vh
 *
 * Under prefers-reduced-motion: the station renders as a normal centered
 * block in plain flow with no transforms.
 */
const RoadStation = ({ children, heightVh = 220 }: RoadStationProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const ease = [0.22, 1, 0.36, 1] as const;

  const scale = useTransform(
    scrollYProgress,
    [0.0, 0.28, 0.55, 0.85],
    [0.18, 1.0, 1.0, 1.35],
    { ease: [ease, ease, ease] as any }
  );
  const opacity = useTransform(
    scrollYProgress,
    [0.05, 0.28, 0.6, 0.85],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0.0, 0.28, 0.6, 0.85],
    ["6vh", "0vh", "0vh", "-10vh"]
  );
  const blur = useTransform(
    scrollYProgress,
    [0.0, 0.28, 0.6, 0.85],
    [10, 0, 0, 6]
  );
  const filter = useTransform(blur as MotionValue<number>, (b) => `blur(${b}px)`);

  if (reduce) {
    return (
      <section className="relative z-10 mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-24">
        <div className="w-full text-center">{children}</div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative z-10"
      style={{ height: `${heightVh}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center px-6">
        <motion.div
          style={{
            scale,
            opacity,
            y,
            filter,
            willChange: "transform, opacity, filter",
          }}
          className="mx-auto w-full max-w-3xl text-center"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default RoadStation;
