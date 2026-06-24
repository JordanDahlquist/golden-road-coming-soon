import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SITE_EASE } from "@/lib/motion";
import { FadeRise, MaskedLines, SectionEnter } from "./motion";

const PHASES = [
  {
    num: "01",
    name: "Assessment",
    desc: "We map your financial reality: the numbers, the systems, the friction. You get an honest read on what's holding the ceiling in place.",
  },
  {
    num: "02",
    name: "Planning",
    desc: "We design the architecture: the forecasting, structure, and strategy your next stage requires. You leave with a plan you can steer by.",
  },
  {
    num: "03",
    name: "Implementation",
    desc: "We build it into how the company runs: systems modernized, reporting sharpened, the financial operating rhythm in place.",
  },
  {
    num: "04",
    name: "Optimization",
    desc: "We refine as you scale, so the infrastructure keeps carrying you. The path stays clear as the company grows.",
  },
] as const;

/** Vertical lift (px) per card so the row visually climbs left-to-right. */
const LIFT_STEP_DESKTOP = 18;

/**
 * Process section — "THE ENGAGEMENT".
 *
 * Four numbered phase cards that visually ascend left-to-right, connected
 * by a thin gold line that draws in on scroll. Mobile collapses to a single
 * column with a vertical connector that still draws in.
 */
const ProcessSection = () => {
  const reduce = useReducedMotion() ?? false;
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, amount: 0.3 });
  const drawn = reduce || inView;

  return (
    <section
      id="process"
      className="scroll-mt-24 md:scroll-mt-28"
    >
    <SectionEnter
      as="div"
      className="relative isolate overflow-hidden text-off-white px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-28 md:pb-36"
      amount={0.2}
      style={{
        background:
          "linear-gradient(180deg, #161515 0%, #1a1816 60%, #161515 100%)",
      }}
    >
      {/* Warm gold bleed low — the hopeful climb */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          background:
            "radial-gradient(60% 55% at 65% 100%, rgba(229,181,85,0.10) 0%, rgba(229,181,85,0.035) 45%, rgba(229,181,85,0) 78%)",
        }}
      />
      {/* Soft vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 25%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px]">
        {/* Eyebrow */}
        <FadeRise
          trigger="in-view"
          as="p"
          className="font-sans uppercase tracking-[0.28em] text-[11px] md:text-xs text-gold"
        >
          THE ENGAGEMENT
        </FadeRise>

        {/* Headline */}
        <MaskedLines
          as="h2"
          trigger="in-view"
          lines={[
            <>A clear path from where you are</>,
            <>to where you're going.</>,
          ]}
          className="mt-5 font-serif tracking-tight text-off-white"
          style={{
            fontSize: "clamp(1.875rem, 4.2vw, 3.75rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
          }}
        />

        {/* Intro line */}
        <FadeRise
          trigger="in-view"
          as="p"
          className="mt-6 font-sans text-off-white/55 max-w-xl"
          style={{ fontSize: "clamp(0.9375rem, 1.05vw, 1.0625rem)" }}
        >
          Four phases, one direction. Here is how the work actually unfolds.
        </FadeRise>

        {/* ── Phase row ─────────────────────────────────────────────── */}
        <div
          ref={rowRef}
          className="relative mt-16 md:mt-24 lg:mt-28"
        >
          {/* Desktop connector — horizontal, ascending */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute hidden md:block left-0 right-0"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            style={{
              top: "1.6rem",
              width: "100%",
              height: `${LIFT_STEP_DESKTOP * 3 + 8}px`,
              overflow: "visible",
            }}
          >
            <defs>
              <linearGradient id="process-line-h" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#e5b555" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#e5b555" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#e5b555" stopOpacity="1" />
              </linearGradient>
            </defs>
            {/* Path climbs from bottom-left to top-right across 4 card columns */}
            <motion.path
              d="M 0 9 L 33 6 L 66 3 L 100 0"
              fill="none"
              stroke="url(#process-line-h)"
              strokeWidth="0.35"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              animate={drawn ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{
                duration: reduce ? 0 : 1.6,
                ease: SITE_EASE,
                delay: reduce ? 0 : 0.2,
              }}
              style={{
                filter: "drop-shadow(0 0 6px rgba(229,181,85,0.35))",
              }}
            />
          </svg>

          {/* Mobile connector — vertical */}
          <div
            aria-hidden="true"
            className="md:hidden absolute left-[1.6rem] top-2 bottom-2 w-px overflow-hidden"
          >
            <motion.div
              initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
              animate={drawn ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{
                duration: reduce ? 0 : 1.4,
                ease: SITE_EASE,
                delay: reduce ? 0 : 0.2,
              }}
              className="origin-top w-full h-full"
              style={{
                background:
                  "linear-gradient(180deg, rgba(229,181,85,0.25) 0%, rgba(229,181,85,0.9) 100%)",
                boxShadow: "0 0 6px rgba(229,181,85,0.35)",
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {PHASES.map((phase, i) => (
              <PhaseCard
                key={phase.num}
                phase={phase}
                index={i}
                total={PHASES.length}
                inView={inView}
                reduce={reduce}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionEnter>
  );
};

const PhaseCard = ({
  phase,
  index,
  total,
  inView,
  reduce,
}: {
  phase: (typeof PHASES)[number];
  index: number;
  total: number;
  inView: boolean;
  reduce: boolean;
}) => {
  // Ascending lift — leftmost lowest, rightmost highest (desktop only).
  const liftPx = (total - 1 - index) * LIFT_STEP_DESKTOP;

  const initial = reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 };
  const animate = reduce
    ? { opacity: 1, y: 0 }
    : inView
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 28 };

  const hover = reduce
    ? undefined
    : {
        y: -6,
        boxShadow:
          "0 0 0 1px rgba(229,181,85,0.55), 0 18px 40px -20px rgba(229,181,85,0.35), 0 0 28px -6px rgba(229,181,85,0.22)",
        transition: { duration: 0.4, ease: SITE_EASE },
      };

  // Light up each number tag as the connector "reaches" it.
  const lightDelay = reduce ? 0 : 0.2 + 1.6 * ((index + 0.5) / total);

  return (
    <div
      className="relative lg:transform-gpu"
      style={{ transform: `translateY(-${liftPx}px)` }}
    >
      <motion.article
        initial={initial}
        animate={animate}
        whileHover={hover}
        transition={{
          duration: 0.75,
          ease: SITE_EASE,
          delay: reduce ? 0 : 0.15 + index * 0.12,
        }}
        className="relative h-full rounded-xl p-6 md:p-7 will-change-transform flex flex-col"
        style={{
          backgroundColor: "#302e2c",
          border: "1px solid rgba(247,246,245,0.08)",
        }}
      >
        {/* Number tag */}
        <motion.div
          initial={reduce ? false : { opacity: 0.45 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{
            duration: 0.5,
            ease: SITE_EASE,
            delay: lightDelay,
          }}
          className="inline-flex items-center justify-center rounded-md font-serif text-gold leading-none"
          style={{
            width: "3.2rem",
            height: "3.2rem",
            border: "1px solid rgba(229,181,85,0.55)",
            backgroundColor: "rgba(229,181,85,0.06)",
            fontSize: "1.6rem",
            boxShadow: inView
              ? "0 0 18px -4px rgba(229,181,85,0.45)"
              : "none",
          }}
        >
          {phase.num}
        </motion.div>

        <h3
          className="mt-6 font-sans font-semibold text-off-white"
          style={{
            fontSize: "clamp(1.0625rem, 1.3vw, 1.1875rem)",
            letterSpacing: "-0.005em",
          }}
        >
          {phase.name}
        </h3>

        <p
          className="mt-3 font-sans leading-relaxed text-off-white/60"
          style={{ fontSize: "clamp(0.875rem, 1vw, 0.9375rem)" }}
        >
          {phase.desc}
        </p>
      </motion.article>
    </div>
  );
};

export default ProcessSection;
