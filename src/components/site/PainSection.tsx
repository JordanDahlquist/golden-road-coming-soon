import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Clock, Filter, AlertTriangle, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SITE_EASE } from "@/lib/motion";
import { FadeRise, MaskedLines } from "./motion";

/**
 * Pain section — dense, designed, card-driven "ceiling" moment.
 *
 * Layout:
 *   1. Eyebrow "THE CEILING"
 *   2. Masked headline reveal
 *   3. Intro paragraph
 *   4. 2x2 grid of pain-point cards (charcoal surface, gold line icons,
 *      hover lift + gold edge glow)
 *   5. Closing statement with gold "ceiling" hairline pressing down
 *
 * Depth: charcoal-to-black gradient + vignette + cold tonal wash.
 * Motion: site-canonical easing, transform/opacity only.
 * Reduced motion: static, fully readable, hairline drawn statically.
 */

type PainCard = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const PAIN_CARDS: PainCard[] = [
  {
    icon: Clock,
    title: "Lagging Visibility",
    body:
      "Your numbers arrive late and only tell you what already happened. You're steering by the rear-view mirror.",
  },
  {
    icon: Filter,
    title: "Scaling Friction",
    body:
      "Every new hire, system, and decision takes more effort than the last. Growth keeps creating drag instead of leverage.",
  },
  {
    icon: AlertTriangle,
    title: "No Forward Architecture",
    body:
      "Decisions ride on spreadsheets and instinct. There's no forecasting model built to see around the next corner.",
  },
  {
    icon: Lock,
    title: "The Growth Ceiling",
    body:
      "Revenue climbs but the company stops scaling. The market isn't the limit. The financial infrastructure underneath you is.",
  },
];

const PainSection = () => {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yLead = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);
  const yStatement = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="pain-heading"
      className="relative isolate overflow-hidden text-off-white"
      style={{
        // Charcoal → near-black with a faint cold tonal cast (the tense "before").
        background:
          "linear-gradient(180deg, #1b1c1e 0%, #161616 38%, #0f0f10 100%)",
      }}
    >
      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 40%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Faint cold wash across the top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[40%]"
        style={{
          background:
            "radial-gradient(80% 100% at 50% 0%, rgba(140,160,180,0.045) 0%, rgba(140,160,180,0) 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-20 pt-28 md:pt-40 pb-28 md:pb-40">
        {/* ── Lead-in ───────────────────────────────────────────── */}
        <motion.div style={reduce ? undefined : { y: yLead }}>
          <FadeRise
            as="p"
            trigger="in-view"
            className="font-sans uppercase tracking-[0.28em] text-[11px] md:text-xs text-gold"
          >
            The Ceiling
          </FadeRise>

          <MaskedLines
            as="h2"
            trigger="in-view"
            stagger={0.08}
            lines={[
              <>You did everything right.</>,
              <>The growth still stalled.</>,
            ]}
            className="mt-6 font-serif tracking-tight text-off-white"
            style={{
              fontSize: "clamp(1.875rem, 4.4vw, 4rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
            }}
          />

          <FadeRise
            as="p"
            trigger="in-view"
            delay={0.15}
            className="mt-8 md:mt-10 font-sans leading-relaxed text-off-white/70 max-w-[58ch]"
            style={{ fontSize: "clamp(1rem, 1.2vw, 1.2rem)" }}
          >
            You hit a number. Maybe five million, maybe forty. Revenue climbs,
            but the company stops feeling like it&rsquo;s scaling. Hiring gets
            heavier. Decisions get slower. The numbers come in late and tell
            you what already happened.
          </FadeRise>
        </motion.div>

        {/* ── Pain cards (2x2) ──────────────────────────────────── */}
        <div
          id="pain-heading"
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        >
          {PAIN_CARDS.map((card, i) => (
            <PainCardItem
              key={card.title}
              card={card}
              index={i}
              reduce={reduce}
            />
          ))}
        </div>

        {/* ── Closing statement ─────────────────────────────────── */}
        <motion.div
          className="relative mt-28 md:mt-40 max-w-[920px]"
          style={reduce ? undefined : { y: yStatement }}
        >
          <CeilingLine reduce={reduce} />

          <MaskedLines
            as="h3"
            trigger="in-view"
            stagger={0.08}
            delayChildren={0.15}
            lines={[
              <>Growth isn&rsquo;t your problem.</>,
              <>Your infrastructure is.</>,
            ]}
            className="font-serif tracking-tight text-off-white"
            style={{
              fontSize: "clamp(2.25rem, 6vw, 5.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          />

          <FadeRise
            as="p"
            trigger="in-view"
            delay={0.4}
            className="mt-8 md:mt-10 font-sans leading-relaxed text-off-white/70 max-w-[56ch]"
            style={{ fontSize: "clamp(1rem, 1.2vw, 1.2rem)" }}
          >
            You&rsquo;re scaling past what your financial systems were built
            to carry. The ceiling isn&rsquo;t the market. It&rsquo;s the
            architecture underneath you.
          </FadeRise>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * Individual pain card. Charcoal surface, subtle border that warms to
 * gold on hover, soft gold edge glow + lift on hover.
 */
const PainCardItem = ({
  card,
  index,
  reduce,
}: {
  card: PainCard;
  index: number;
  reduce: boolean;
}) => {
  const Icon = card.icon;

  const initial = reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 };
  const whileInView = { opacity: 1, y: 0 };
  const hover = undefined;

  return (
    <motion.article
      initial={initial}
      whileInView={whileInView}
      whileHover={hover}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        ease: SITE_EASE,
        delay: reduce ? 0 : 0.1 + index * 0.1,
      }}
      className="luxe-card group relative rounded-xl p-6 md:p-7 lg:p-8"
      style={{
        backgroundColor: "#302e2c",
        border: "1px solid rgba(247,246,245,0.08)",
      }}
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md"
          style={{
            border: "1px solid rgba(229,181,85,0.35)",
            backgroundColor: "rgba(229,181,85,0.06)",
          }}
        >
          <Icon
            size={18}
            strokeWidth={1.5}
            className="text-gold"
          />
        </span>
        <div className="min-w-0 pt-1">
          <h3 className="font-sans font-semibold text-off-white text-[1.0625rem] md:text-[1.125rem] tracking-tight">
            {card.title}
          </h3>
          <p className="mt-2 font-sans text-off-white/60 leading-relaxed text-[0.9375rem] md:text-[0.975rem]">
            {card.body}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

/**
 * Thin gold hairline that slides in from both edges to sit above the
 * statement like a ceiling. Reduced motion: drawn statically.
 */
const CeilingLine = ({ reduce }: { reduce: boolean }) => {
  const baseStyle = {
    height: "1px",
    backgroundColor: "#e5b555",
    boxShadow:
      "0 0 8px rgba(229,181,85,0.55), 0 0 24px rgba(229,181,85,0.18)",
    willChange: "transform, opacity",
  } as const;

  if (reduce) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-x-0"
        style={{ ...baseStyle, top: "-2.5rem", opacity: 0.9 }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0"
      style={{ top: "-2.5rem" }}
    >
      <motion.span
        className="absolute left-0 top-0 block w-1/2"
        style={{ ...baseStyle, transformOrigin: "left center" }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.95 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease: SITE_EASE, delay: 0.05 }}
      />
      <motion.span
        className="absolute right-0 top-0 block w-1/2"
        style={{ ...baseStyle, transformOrigin: "right center" }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.95 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease: SITE_EASE, delay: 0.05 }}
      />
    </div>
  );
};

export default PainSection;
