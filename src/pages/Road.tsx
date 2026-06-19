import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import heroRoad from "@/assets/hero-road.png.asset.json";

/**
 * /road — "Stations on the Golden Road"
 * A single sticky stage with a cinematic road background. Content emerges
 * from the horizon/vanishing point, scales to a readable resting state,
 * then fades as the next station rises. Native scroll, transform/opacity only.
 */

// Horizon / vanishing point inside the viewport.
// x: horizontal center of the road. y: where the bright horizon sits
// after object-position center 65% is applied (a bit below middle).
const HORIZON_X = "50%";
const HORIZON_Y = "62%";
// Offset of horizon from the resting box center (which sits at 50% / 50%).
// Used as the transform-origin so scaling happens FROM the horizon.
const ORIGIN = `${HORIZON_X} calc(50% + 12vh)`;

const EASE = [0.22, 1, 0.36, 1] as const;

type StationProps = {
  progress: MotionValue<number>;
  // Scroll-progress windows (0..1) for emerge / rest / fade.
  emerge: [number, number];
  rest: [number, number];
  fade: [number, number];
  children: React.ReactNode;
};

const Station = ({ progress, emerge, rest, fade, children }: StationProps) => {
  const scale = useTransform(
    progress,
    [emerge[0], emerge[1], rest[0], rest[1], fade[0], fade[1]],
    [0.05, 1, 1, 1, 1, 1.35],
  );
  const opacity = useTransform(
    progress,
    [
      emerge[0],
      emerge[0] + (emerge[1] - emerge[0]) * 0.6,
      rest[0],
      rest[1],
      fade[1],
    ],
    [0, 1, 1, 1, 0],
  );

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/2 text-center will-change-transform"
      style={{
        scale,
        opacity,
        transformOrigin: ORIGIN,
      }}
    >
      {children}
    </motion.div>
  );
};

const StaticStack = () => (
  <main className="relative min-h-screen bg-[#161515] text-[#f7f6f5]">
    <img
      src={heroRoad.url}
      alt=""
      className="fixed inset-0 h-full w-full object-cover opacity-60"
    />
    <div className="relative z-10 mx-auto flex max-w-2xl flex-col gap-24 px-6 py-32">
      <Section1Content />
      <Section2Content />
    </div>
  </main>
);

const Section1Content = () => (
  <>
    <p
      className="mb-6 text-[11px] uppercase tracking-[0.4em] text-[#f7f6f5]/65"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      Golden Road Strategies
    </p>
    <h1
      className="mb-8 text-balance text-5xl leading-[1.05] md:text-7xl"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
        letterSpacing: "-0.02em",
        color: "#f7f6f5",
      }}
    >
      Build the financial infrastructure your next stage demands.
    </h1>
    <p
      className="mx-auto mb-10 max-w-xl text-base md:text-lg"
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 300,
        color: "rgba(247,246,245,0.8)",
      }}
    >
      Forward-looking strategic finance leadership for founders, CEOs, and
      boards ready to break through their growth ceiling.
    </p>
    <a
      href="#contact"
      className="inline-flex items-center justify-center rounded-none border px-8 py-4 text-[11px] uppercase tracking-[0.28em] transition-colors duration-500"
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 500,
        borderColor: "#e5b555",
        background: "#e5b555",
        color: "#161515",
      }}
    >
      Start the Conversation
    </a>
  </>
);

const Section2Content = () => (
  <>
    <p
      className="mb-6 text-[11px] uppercase tracking-[0.4em]"
      style={{ fontFamily: "Montserrat, sans-serif", color: "#e5b555" }}
    >
      The Ceiling
    </p>
    <h2
      className="mb-8 text-balance text-4xl leading-[1.08] md:text-6xl"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 300,
        letterSpacing: "-0.02em",
        color: "#f7f6f5",
      }}
    >
      You did everything right. The growth still stalled.
    </h2>
    <p
      className="mx-auto max-w-xl text-base md:text-lg"
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontWeight: 300,
        color: "rgba(247,246,245,0.8)",
      }}
    >
      Revenue climbs, the team scales, the calendar fills. Yet decisions get
      made on lagging data, the financial architecture wasn't built for this
      stage, and the next level keeps slipping out of reach.
    </p>
  </>
);

const Road = () => {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Gentle forward travel: background scales up across the whole scroll.
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  if (reduced) return <StaticStack />;

  return (
    <main className="relative bg-[#161515] text-[#f7f6f5]">
      {/* Tall scroll container drives the sticky stage */}
      <div ref={containerRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Background road, gentle forward push */}
          <motion.img
            src={heroRoad.url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{
              scale: bgScale,
              objectPosition: "center 65%",
              transformOrigin: `${HORIZON_X} ${HORIZON_Y}`,
            }}
          />
          {/* Subtle top scrim so headlines stay legible in the upper area */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[55%]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(22,21,21,0.78) 0%, rgba(22,21,21,0.35) 60%, rgba(22,21,21,0) 100%)",
            }}
          />
          {/* Soft vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 60%, rgba(22,21,21,0) 45%, rgba(22,21,21,0.55) 100%)",
            }}
          />

          {/* Stations */}
          <Station
            progress={scrollYProgress}
            emerge={[0.02, 0.18]}
            rest={[0.18, 0.4]}
            fade={[0.4, 0.52]}
          >
            <Section1Content />
          </Station>

          <Station
            progress={scrollYProgress}
            emerge={[0.5, 0.68]}
            rest={[0.68, 0.9]}
            fade={[0.9, 1.0]}
          >
            <Section2Content />
          </Station>
        </div>
      </div>
    </main>
  );
};

export default Road;
