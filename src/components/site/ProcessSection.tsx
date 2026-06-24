import { motion, useReducedMotion } from "framer-motion";
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

/**
 * Process section — "THE ENGAGEMENT".
 *
 * Clean and simple: four equal cards in an even row (4 cols desktop,
 * 2x2 tablet, 1 col mobile). A straight gold hairline runs across behind
 * the number circles connecting them at the same height. No diagonals,
 * no offsets, no staggering of card positions.
 */
const ProcessSection = () => {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative isolate overflow-hidden bg-background text-off-white"
    >
      {/* Soft gold horizon glow at the bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          background:
            "radial-gradient(70% 100% at 50% 100%, rgba(229,181,85,0.07) 0%, rgba(229,181,85,0) 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-20 py-28 md:py-40">
        {/* Header */}
        <SectionEnter>
          <FadeRise
            as="p"
            trigger="in-view"
            className="t-eyebrow"
          >
            The Engagement
          </FadeRise>

          <MaskedLines
            as="h2"
            trigger="in-view"

            stagger={0.08}
            lines={[
              <>A clear path from where you are</>,
              <>to where you&rsquo;re going.</>,
            ]}
            className="mt-6 t-h2 text-off-white"
          />

          <FadeRise
            as="p"
            trigger="in-view"
            delay={0.15}
            className="mt-8 md:mt-10 t-lead text-off-white/70 max-w-[58ch]"
          >
            Every engagement follows the same disciplined arc: understand the
            terrain, design the route, build the infrastructure, refine as you
            scale.
          </FadeRise>
        </SectionEnter>

        {/* ── Cards row with straight connector ──────────────── */}
        <div className="relative mt-20 md:mt-28">
          {/* Desktop horizontal connector — sits behind the number circles */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute hidden lg:block"
            style={{
              left: "calc(12.5% )",
              right: "calc(12.5% )",
              // Number circle (h-12 = 48px) center aligned with top padding of card (p-8 = 32px)
              top: "calc(2rem + 1.5rem)",
              height: "1px",
            }}
          >
            <motion.div
              className="absolute inset-0 origin-left"
              style={{
                backgroundColor: "#e5b555",
                boxShadow:
                  "0 0 6px rgba(229,181,85,0.55), 0 0 18px rgba(229,181,85,0.18)",
                willChange: "transform",
              }}
              initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduce ? 0 : 1.4, ease: SITE_EASE, delay: 0.2 }}
            />
          </div>

          {/* Mobile/tablet single-column vertical connector */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute lg:hidden md:hidden block"
            style={{
              // Card p-7 (28px) + half of number circle (24px) = 52px from card top.
              // Sits behind the column of number circles on mobile stacked layout.
              left: "calc(1.75rem + 1.5rem)",
              top: "1rem",
              bottom: "1rem",
              width: "1px",
            }}
          >
            <motion.div
              className="absolute inset-0 origin-top"
              style={{
                backgroundColor: "#e5b555",
                boxShadow:
                  "0 0 6px rgba(229,181,85,0.45), 0 0 16px rgba(229,181,85,0.15)",
                opacity: 0.85,
                willChange: "transform",
              }}
              initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduce ? 0 : 1.6, ease: SITE_EASE, delay: 0.2 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-7 items-stretch">
            {PHASES.map((phase, i) => (
              <PhaseCard
                key={phase.num}
                num={phase.num}
                name={phase.name}
                desc={phase.desc}
                index={i}
                reduce={reduce}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PhaseCard = ({
  num,
  name,
  desc,
  index,
  reduce,
}: {
  num: string;
  name: string;
  desc: string;
  index: number;
  reduce: boolean;
}) => {
  const initial = reduce
    ? { opacity: 1, y: 0, boxShadow: "0 0 0 rgba(229,181,85,0)" }
    : { opacity: 0, y: 28, boxShadow: "0 0 0 rgba(229,181,85,0)" };

  const animateInView = reduce
    ? { opacity: 1, y: 0 }
    : {
        opacity: 1,
        y: 0,
        boxShadow: [
          "0 0 0 rgba(229,181,85,0)",
          "0 0 0 1px rgba(229,181,85,0.40), 0 14px 36px -14px rgba(229,181,85,0.25)",
          "0 0 0 1px rgba(229,181,85,0.10), 0 10px 28px -18px rgba(229,181,85,0.10)",
        ],
      };

  return (
    <motion.article
      initial={initial}
      whileInView={animateInView}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reduce ? 0 : 0.9,
        ease: SITE_EASE,
        delay: reduce ? 0 : 0.1 + index * 0.12,
        boxShadow: {
          duration: reduce ? 0 : 1.5,
          ease: SITE_EASE,
          delay: reduce ? 0 : 0.35 + index * 0.12,
          times: [0, 0.45, 1],
        },
      }}
      whileHover={
        reduce
          ? undefined
          : {
              y: -4,
              boxShadow:
                "0 0 0 1px rgba(229,181,85,0.30), 0 18px 40px -16px rgba(229,181,85,0.25)",
              transition: { duration: 0.35, ease: SITE_EASE },
            }
      }
      className="luxe-card group relative flex h-full flex-col rounded-xl p-7 lg:p-8"
      style={{
        backgroundColor: "#302e2c",
        border: "1px solid rgba(247,246,245,0.07)",
        willChange: "transform, opacity, box-shadow",
      }}
    >
      {/* Number circle — sits on the connector line */}
      <span
        aria-hidden="true"
        className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full font-serif text-[1.05rem]"
        style={{
          backgroundColor: "#302e2c",
          color: "#e5b555",
          border: "1px solid rgba(229,181,85,0.55)",
          boxShadow:
            "0 0 0 4px #302e2c, 0 0 14px rgba(229,181,85,0.25)",
          letterSpacing: "0.02em",
        }}
      >
        {num}
      </span>

      <h3
        className="mt-6 font-serif tracking-tight text-off-white"
        style={{
          fontSize: "clamp(1.375rem, 1.8vw, 1.625rem)",
          lineHeight: 1.15,
          letterSpacing: "-0.005em",
        }}
      >
        {name}
      </h3>

      <p className="mt-3 font-sans text-[0.95rem] leading-relaxed text-off-white/65">
        {desc}
      </p>
    </motion.article>
  );
};

export default ProcessSection;
