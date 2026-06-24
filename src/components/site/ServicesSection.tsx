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
          className="font-sans uppercase tracking-[0.24em] text-[11px] md:text-xs text-gold"
        >
          THE THIRD OPTION
        </FadeRise>

        <MaskedLines
          id="services-heading"
          as="h2"
          trigger="in-view"
          lines={[
            <>Forward-looking financial leadership,</>,
            <>built to your stage.</>,
          ]}
          className="mt-5 font-serif tracking-tight text-off-white"
          style={{
            fontSize: "clamp(1.875rem, 4vw, 3.75rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
          }}
        />

        <FadeRise
          trigger="child"
          as="p"
          className="mt-5 max-w-xl font-sans text-off-white/55 leading-relaxed"
          style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.0625rem)" }}
        >
          Two ways to engage, each designed around where your company is now
          and where it needs to be in a year.
        </FadeRise>

        {/* ── Two offers with center "or" connector ─────────────── */}
        <div className="relative mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {/* Center connector — desktop only */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-8 left-1/2 hidden md:flex -translate-x-1/2 flex-col items-center"
          >
            <span className="flex-1 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
            <span className="my-3 font-sans text-[10px] uppercase tracking-[0.3em] text-gold/70">
              or
            </span>
            <span className="flex-1 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
          </div>

          {OFFERS.map((offer, i) => (
            <motion.article
              key={offer.label}
              initial={
                reduce ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: i === 0 ? -24 : 24, y: 12 }
              }
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduce ? 0 : 0.8, ease: SITE_EASE, delay: reduce ? 0 : i * 0.08 }}
              className="services-card group relative flex flex-col rounded-xl border border-off-white/[0.07] bg-secondary p-8 md:p-10 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-gold/60"
            >
              {/* Icon + label */}
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/30 text-gold/80 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-gold group-hover:border-gold/70"
                  aria-hidden
                >
                  <offer.icon size={18} strokeWidth={1.5} />
                </span>
                <p className="font-sans uppercase tracking-[0.22em] text-[11px] font-medium text-gold">
                  {offer.label}
                </p>
              </div>

              <h3
                className="mt-6 font-serif text-off-white"
                style={{
                  fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.01em",
                }}
              >
                {offer.title}
              </h3>

              <p
                className="mt-5 font-sans leading-relaxed text-off-white/65"
                style={{ fontSize: "clamp(0.9375rem, 1.05vw, 1.0625rem)" }}
              >
                {offer.description}
              </p>

              {/* Divider */}
              <div className="my-7 h-px w-full bg-off-white/[0.08]" />

              <p className="font-sans uppercase tracking-[0.2em] text-[10px] text-off-white/45">
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
                    <span
                      className="font-sans text-off-white/80 leading-relaxed"
                      style={{ fontSize: "clamp(0.9rem, 1vw, 1rem)" }}
                    >
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
                  <p
                    className="font-sans italic text-gold/90 leading-snug"
                    style={{ fontSize: "clamp(0.85rem, 0.95vw, 0.95rem)" }}
                  >
                    {offer.outcome}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .services-card:hover {
          box-shadow:
            0 1px 0 0 hsl(40 74% 62% / 0.18) inset,
            0 28px 70px -32px hsl(40 74% 62% / 0.40);
        }
        @media (prefers-reduced-motion: reduce) {
          .services-card,
          .services-card * {
            transition: none !important;
          }
          .services-card:hover {
            transform: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </SectionEnter>
  );
};

export default ServicesSection;

