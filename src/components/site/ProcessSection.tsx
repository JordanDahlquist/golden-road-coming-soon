import { useEffect, useRef, useState } from "react";
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
const LIFT_STEP_DESKTOP = 20;
const TOTAL_LIFT = LIFT_STEP_DESKTOP * (PHASES.length - 1); // 60px between card1 and card4
/** Number-tag circle diameter (px). Must match the rendered tag size. */
const NODE_DIAMETER = 52; // 3.25rem
const NODE_RADIUS = NODE_DIAMETER / 2;
/** Horizontal centers of the 4-col grid columns, in percent. */
const TAG_X_PCT = [12.5, 37.5, 62.5, 87.5];

/**
 * Process section — "THE ENGAGEMENT".
 *
 * Four equal-height phase cards step up left→right on desktop, joined by a
 * precise gold path whose segments terminate cleanly at each numbered node's
 * edge (entering and exiting circles, never slicing through them). Mobile
 * collapses to a single column with a centered vertical connector that runs
 * between the node edges.
 */
const ProcessSection = () => {
  const reduce = useReducedMotion() ?? false;
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, amount: 0.05 });
  const drawn = reduce || inView;

  // Measure row width so the connector geometry uses real pixels and
  // segments terminate exactly at each node's circular edge.
  const [rowWidth, setRowWidth] = useState(0);
  useEffect(() => {
    if (!rowRef.current) return;
    const ro = new ResizeObserver((entries) => {
      setRowWidth(entries[0].contentRect.width);
    });
    ro.observe(rowRef.current);
    return () => ro.disconnect();
  }, []);

  // Node centers (px) in connector-SVG coordinates. SVG sits above the cards
  // (top: -TOTAL_LIFT, height: TOTAL_LIFT). Node 0 is bottom-left (SVG y =
  // TOTAL_LIFT), node 3 is top-right (SVG y = 0). Cards translate by
  // -index*LIFT_STEP, so the tag center sits exactly on the card top.
  const nodes = TAG_X_PCT.map((pct, i) => ({
    x: (pct / 100) * rowWidth,
    y: TOTAL_LIFT - i * LIFT_STEP_DESKTOP,
  }));

  // Build three segments, each shortened by NODE_RADIUS at both ends so the
  // line enters/exits the node circles cleanly instead of slicing through.
  const segmentsD =
    rowWidth > 0
      ? nodes
          .slice(0, -1)
          .map((a, i) => {
            const b = nodes[i + 1];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const len = Math.hypot(dx, dy);
            if (len <= NODE_DIAMETER) return "";
            const ux = dx / len;
            const uy = dy / len;
            const sx = a.x + ux * NODE_RADIUS;
            const sy = a.y + uy * NODE_RADIUS;
            const ex = b.x - ux * NODE_RADIUS;
            const ey = b.y - uy * NODE_RADIUS;
            return `M ${sx.toFixed(2)} ${sy.toFixed(2)} L ${ex.toFixed(2)} ${ey.toFixed(2)}`;
          })
          .filter(Boolean)
          .join(" ")
      : "";

  return (
    <section id="process" className="scroll-mt-24 md:scroll-mt-28">
      <SectionEnter
        as="div"
        className="relative isolate overflow-hidden text-off-white px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-24 md:pb-32"
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
            {/* ─ Desktop connector: three segments, each terminating at the
                edge of its adjacent node so the path "enters" and "exits"
                each numbered circle cleanly. Lives entirely above the card
                bodies (top: -TOTAL_LIFT, height: TOTAL_LIFT). */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute hidden lg:block left-0 right-0 z-10"
              viewBox={`0 0 ${Math.max(rowWidth, 1)} ${TOTAL_LIFT}`}
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
                  <stop offset="0%" stopColor="#e5b555" stopOpacity="0.3" />
                  <stop offset="55%" stopColor="#e5b555" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#e5b555" stopOpacity="1" />
                </linearGradient>
              </defs>

              {segmentsD && (
                <motion.path
                  d={segmentsD}
                  fill="none"
                  stroke="url(#process-line-h)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
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
              )}
            </svg>

            {/* Destination glow (desktop): warm horizon above tag 04 */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute hidden lg:block"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={drawn ? { opacity: 0.7 } : { opacity: 0 }}
              transition={{
                duration: reduce ? 0 : 1.2,
                ease: SITE_EASE,
                delay: reduce ? 0 : 1.6,
              }}
              style={{
                top: `calc(-${TOTAL_LIFT}px - 110px)`,
                left: `calc(${TAG_X_PCT[3]}% - 120px)`,
                width: "240px",
                height: "240px",
                background:
                  "radial-gradient(closest-side, rgba(229,181,85,0.42) 0%, rgba(229,181,85,0.12) 45%, rgba(229,181,85,0) 75%)",
                filter: "blur(2px)",
              }}
            />

            {/* Mobile / sm connector — centered vertical hairline that draws
                top→bottom through the centered node circles. The tag bodies
                themselves are opaque (charcoal fill with gold border) so they
                visually "cap" the line at their edges. */}
            <div
              aria-hidden="true"
              className="lg:hidden absolute left-1/2 -translate-x-1/2 w-px overflow-hidden"
              style={{ top: `${NODE_RADIUS}px`, bottom: `${NODE_RADIUS}px` }}
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
                    "linear-gradient(180deg, rgba(229,181,85,0.3) 0%, rgba(229,181,85,0.95) 100%)",
                  boxShadow: "0 0 6px rgba(229,181,85,0.4)",
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-7 lg:gap-6 items-stretch">
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
  const liftPx = index * LIFT_STEP_DESKTOP;
  const initial = reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 };
  const animate = reduce
    ? { opacity: 1, y: 0 }
    : inView
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 24 };

  // Light up each tag as the connector "reaches" it.
  const lightDelay = reduce ? 0 : 0.2 + 1.8 * ((index + 0.45) / total);
  const isLast = index === total - 1;

  return (
    <div
      className="relative h-full lg:[transform:translateY(calc(var(--lift)*-1))]"
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
        className="luxe-card relative h-full rounded-xl px-6 md:px-7 pt-9 pb-7 flex flex-col items-center text-center"
        style={{
          backgroundColor: "#302e2c",
          border: "1px solid rgba(247,246,245,0.08)",
          minHeight: "260px",
        }}
      >
        {/* Number tag — straddles the top edge of the card so its center
            sits exactly on the connector line. The opaque charcoal fill
            "caps" the line; size + offset match NODE_DIAMETER constants. */}
        <motion.div
          initial={reduce ? false : { opacity: 0.45 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{
            duration: 0.5,
            ease: SITE_EASE,
            delay: lightDelay,
          }}
          className="absolute left-1/2 -translate-x-1/2 inline-flex items-center justify-center rounded-full font-serif text-gold leading-none z-20"
          style={{
            top: `-${NODE_RADIUS}px`,
            width: `${NODE_DIAMETER}px`,
            height: `${NODE_DIAMETER}px`,
            border: "1px solid rgba(229,181,85,0.65)",
            backgroundColor: "#161515",
            fontSize: "1.5rem",
            boxShadow: inView
              ? isLast
                ? "0 0 28px -2px rgba(229,181,85,0.7), 0 0 0 4px rgba(229,181,85,0.1)"
                : "0 0 18px -4px rgba(229,181,85,0.55)"
              : "none",
          }}
        >
          {phase.num}
        </motion.div>

        <h3
          className="font-sans font-semibold text-off-white"
          style={{
            fontSize: "clamp(1.0625rem, 1.3vw, 1.1875rem)",
            letterSpacing: "-0.005em",
          }}
        >
          {phase.name}
        </h3>

        <p
          className="mt-2.5 font-sans leading-relaxed text-off-white/60 max-w-[28ch]"
          style={{ fontSize: "clamp(0.875rem, 1vw, 0.9375rem)" }}
        >
          {phase.desc}
        </p>
      </motion.article>
    </div>
  );
};

export default ProcessSection;
