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
const LIFT_STEP_DESKTOP = 22;
const TOTAL_LIFT = LIFT_STEP_DESKTOP * (PHASES.length - 1); // 66px between card1 and card4

/**
 * Process section — "THE ENGAGEMENT".
 *
 * Four numbered phase cards that ascend left-to-right on desktop, connected
 * by a continuous gold hairline that draws through every tag (01 → 04) and
 * terminates in a soft "destination" glow at the top-right. Mobile collapses
 * to a single column with a centered vertical connector running through all
 * four tags.
 */
const ProcessSection = () => {
  const reduce = useReducedMotion() ?? false;
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, amount: 0.25 });
  const drawn = reduce || inView;

  // Tag centers along the 4-col grid (column centers, in % of row width).
  const TAG_X = [12.5, 37.5, 62.5, 87.5];

  return (
    <section id="process" className="scroll-mt-24 md:scroll-mt-28">
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

          {/* ── Phase row ─────────────────────────────────────────── */}
          <div
            ref={rowRef}
            className="relative mt-20 md:mt-28 lg:mt-32"
          >
            {/* ─ Desktop connector: continuous ascending gold hairline.
                Tags absolute-positioned to straddle the top edge of each
                card, so their centers sit exactly on each card's top.
                SVG spans from row_top - TOTAL_LIFT (tag4) to row_top
                (tag1), entirely ABOVE the card bodies so the line never
                gets clipped. */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute hidden lg:block left-0 right-0 z-10"
              viewBox={`0 0 100 ${TOTAL_LIFT}`}
              preserveAspectRatio="none"
              style={{
                top: `-${TOTAL_LIFT}px`,
                width: "100%",
                height: `${TOTAL_LIFT}px`,
                overflow: "visible",
              }}
            >
              <defs>
                <linearGradient id="process-line-h" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#e5b555" stopOpacity="0.25" />
                  <stop offset="55%" stopColor="#e5b555" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#e5b555" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* Ascending path through all four tag centers */}
              <motion.path
                d={`M ${TAG_X[0]} ${TOTAL_LIFT} L ${TAG_X[1]} ${TOTAL_LIFT * (2 / 3)} L ${TAG_X[2]} ${TOTAL_LIFT * (1 / 3)} L ${TAG_X[3]} 0`}
                fill="none"
                stroke="url(#process-line-h)"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                animate={drawn ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{
                  duration: reduce ? 0 : 1.8,
                  ease: SITE_EASE,
                  delay: reduce ? 0 : 0.2,
                }}
                style={{
                  filter: "drop-shadow(0 0 5px rgba(229,181,85,0.45))",
                }}
              />
            </svg>

            {/* Destination glow (desktop): warm horizon arrival above tag 04 */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute hidden lg:block"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={drawn ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: reduce ? 0 : 1.2,
                ease: SITE_EASE,
                delay: reduce ? 0 : 1.6,
              }}
              style={{
                top: `calc(-${TOTAL_LIFT}px - 120px)`,
                left: `calc(${TAG_X[3]}% - 130px)`,
                width: "260px",
                height: "260px",
                background:
                  "radial-gradient(closest-side, rgba(229,181,85,0.5) 0%, rgba(229,181,85,0.15) 45%, rgba(229,181,85,0) 75%)",
                filter: "blur(2px)",
              }}
            />


            {/* Mobile / sm connector — centered vertical, draws top→bottom */}
            <div
              aria-hidden="true"
              className="lg:hidden absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px overflow-hidden"
            >
              <motion.div
                initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
                animate={drawn ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{
                  duration: reduce ? 0 : 1.6,
                  ease: SITE_EASE,
                  delay: reduce ? 0 : 0.2,
                }}
                className="origin-top w-full h-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(229,181,85,0.25) 0%, rgba(229,181,85,0.95) 100%)",
                  boxShadow: "0 0 6px rgba(229,181,85,0.4)",
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6">
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
    </section>
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
  // Ascending lift, applied only at lg (CSS variable + lg utility).
  // index 0 (card 01) lowest → lift 0; index 3 (card 04) highest.
  const liftPx = index * LIFT_STEP_DESKTOP;
  void total;

  const initial = reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 };
  const animate = reduce
    ? { opacity: 1, y: 0 }
    : inView
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 28 };

  // Light up each tag as the connector "reaches" it.
  const lightDelay = reduce ? 0 : 0.2 + 1.8 * ((index + 0.45) / total);
  const isLast = index === total - 1;

  return (
    <div
      className="relative lg:[transform:translateY(calc(var(--lift)*-1))]"
      style={{ ["--lift" as string]: `${liftPx}px` }}
    >
      <motion.article
        initial={initial}
        animate={animate}
        transition={{
          duration: 0.75,
          ease: SITE_EASE,
          delay: reduce ? 0 : 0.15 + index * 0.12,
        }}
        className="luxe-card relative h-full rounded-xl p-6 md:p-7 flex flex-col items-center text-center"
        style={{
          backgroundColor: "#302e2c",
          border: "1px solid rgba(247,246,245,0.08)",
        }}
      >
        {/* Number tag — centered at top of card, lights gold as path reaches it */}
        <motion.div
          initial={reduce ? false : { opacity: 0.45 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{
            duration: 0.5,
            ease: SITE_EASE,
            delay: lightDelay,
          }}
          className="relative inline-flex items-center justify-center rounded-full font-serif text-gold leading-none"
          style={{
            width: "3.2rem",
            height: "3.2rem",
            border: "1px solid rgba(229,181,85,0.6)",
            backgroundColor: "#161515",
            fontSize: "1.55rem",
            boxShadow: inView
              ? isLast
                ? "0 0 28px -2px rgba(229,181,85,0.65), 0 0 0 4px rgba(229,181,85,0.08)"
                : "0 0 18px -4px rgba(229,181,85,0.5)"
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
          className="mt-3 font-sans leading-relaxed text-off-white/60 max-w-[28ch]"
          style={{ fontSize: "clamp(0.875rem, 1vw, 0.9375rem)" }}
        >
          {phase.desc}
        </p>
      </motion.article>
    </div>
  );
};

export default ProcessSection;
