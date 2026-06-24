import { motion, useReducedMotion } from "framer-motion";
import { RefreshCw, Target, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeRise, MaskedLines, SectionEnter, SITE_EASE } from "./motion";

type Offer = {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  outcome: string;
};

const OFFERS: [Offer, Offer] = [
  {
    icon: RefreshCw,
    label: "ONGOING / RETAINER",
    title: "Your CFO, without the full-time line item.",
    description:
      "Monthly financial leadership for companies that need the strategy, structure, and foresight of a CFO but not the overhead of hiring one. You get a partner in the numbers, every month, not a report after the fact.",
    bullets: [
      "Forecasting and planning you can actually steer by",
      "Board-ready reporting that tells the story, not just the totals",
      "A financial operating rhythm that scales with you",
    ],
    outcome: "Best for $5–50M companies scaling past their current finance function.",
  },
  {
    icon: Target,
    label: "STRATEGIC / ENGAGEMENT",
    title: "The intensive that clears the ceiling.",
    description:
      "A focused engagement for a specific inflection point: a raise, a transformation, M&A readiness, or a planning reset. We go deep, build the architecture, and leave you with a system that holds.",
    bullets: [
      "Capital structure and cash strategy built for the next stage",
      "Finance-function modernization that removes scaling friction",
      "M&A and transaction readiness when the moment comes",
    ],
    outcome: "Best when one decision or moment will define the next phase.",
  },
];

/**
 * Services — two rich offer cards on a warm-low charcoal stage.
 *
 * Cards rise and separate slightly from a shared center as they enter,
 * with hover lift + soft gold edge glow. A thin gold "or" connector
 * frames the two as parallel paths on desktop. Reduced motion strips
 * all transitions and entrance offsets.
 */
const ServicesSection = () => {
  const reduce = useReducedMotion() ?? false;

  return (
    <SectionEnter
      as="section"
      aria-labelledby="services-heading"
      className="relative isolate overflow-hidden bg-background text-off-white px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-24 md:pb-32"
      amount={0.2}
    >
      {/* Depth wash — charcoal sweep with warm gold low-glow (the turn). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 60% at 50% 0%, hsl(30 4% 18% / 0.55) 0%, transparent 60%), radial-gradient(70% 50% at 50% 100%, hsl(40 74% 62% / 0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1180px]">
        {/* ── Intro ─────────────────────────────────────────────── */}
        <FadeRise
          trigger="child"
          as="p"
          className="t-eyebrow"
        >
          THE THIRD OPTION
        </FadeRise>

        <MaskedLines
          as="h2"
          trigger="in-view"
          lines={[
            <>Forward-looking financial leadership,</>,
            <>built to your stage.</>,
          ]}
          className="mt-5 t-h2 text-off-white"
        />

        <FadeRise
          trigger="child"
          as="p"
          className="mt-5 max-w-xl t-lead text-off-white/55"
        >
          Two ways to engage, each designed around where your company is now
          and where it needs to be in a year.
        </FadeRise>

        {/* ── Two offers with center "or" connector ─────────────── */}
        <div
          className="relative mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12"
          style={{ perspective: "1200px", perspectiveOrigin: "50% 40%" }}
        >
          {/* Center connector — desktop only */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-8 left-1/2 hidden md:flex -translate-x-1/2 flex-col items-center"
          >
            <span className="flex-1 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
            <span className="my-3 t-label text-gold/70">
              or
            </span>
            <span className="flex-1 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
          </div>

          {OFFERS.map((offer, i) => {
            const isLeft = i === 0;
            return (
            <motion.article
              key={offer.label}
              initial={
                reduce
                  ? { opacity: 1, rotateY: 0 }
                  : { opacity: 0, rotateY: isLeft ? -90 : 90 }
              }
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: reduce ? 0 : 0.78,
                ease: SITE_EASE,
                delay: reduce ? 0 : isLeft ? 0 : 0.3,
                opacity: {
                  duration: reduce ? 0 : 0.45,
                  ease: SITE_EASE,
                  delay: reduce ? 0 : isLeft ? 0 : 0.3,
                },
              }}
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: isLeft ? "left center" : "right center",
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
              }}
              className="luxe-card services-card group relative flex flex-col rounded-xl border border-off-white/[0.07] bg-secondary p-8 md:p-10"
            >
              {/* Icon + label */}
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/30 text-gold/80 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-gold group-hover:border-gold/70"
                  aria-hidden
                >
                  <offer.icon size={18} strokeWidth={1.5} />
                </span>
                <p className="t-eyebrow">
                  {offer.label}
                </p>
              </div>

              <h3 className="mt-6 t-h3 text-off-white">
                {offer.title}
              </h3>

              <p className="mt-5 t-body text-off-white/65">
                {offer.description}
              </p>

              {/* Divider */}
              <div className="my-7 h-px w-full bg-off-white/[0.08]" />

              <p className="t-label text-off-white/45">
                What you get
              </p>

              <ul className="mt-4 space-y-3.5">
                {offer.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold"
                      aria-hidden
                    >
                      <Check size={11} strokeWidth={2.25} />
                    </span>
                    <span className="t-body text-off-white/80">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Outcome stat line */}
              <div className="mt-auto pt-8">
                <div className="flex items-start gap-3 border-t border-gold/20 pt-5">
                  <span
                    aria-hidden
                    className="mt-2 h-px w-6 shrink-0 bg-gold/70"
                  />
                  <p className="t-body-sm italic text-gold/90">
                    {offer.outcome}
                  </p>
                </div>
              </div>
            </motion.article>
            );
          })}
        </div>
      </div>

    </SectionEnter>
  );
};

export default ServicesSection;

