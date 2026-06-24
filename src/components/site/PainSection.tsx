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
 * Pain section — "The Ceiling".
 *
 * Concept: weight pressing down from above. A heavy dark gradient bleeds
 * from the top edge, a thin gold ceiling hairline glows across the section,
 * and the four pain cards sit beneath it — staggered, not uniform — with
 * the fourth card ("The Growth Ceiling") as the thematic punch.
 *
 * Motion: cards rise into place with a heavy, settling feel; each card gets
 * a gold edge-glow moment on scroll-in (works on mobile, no hover required).
 * Reduced motion: static, ceiling atmosphere and gold line still present.
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

  // Ceiling weight: heavier as section enters view.
  const ceilingOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.6, 1, 1]);
  const ceilingScaleX = useTransform(scrollYProgress, [0, 0.35], [0.2, 1]);

  return (
    <section
      ref={sectionRef}
      id="pain"
      aria-labelledby="pain-heading"
      className="relative isolate overflow-hidden text-off-white"
      style={{
        // Charcoal → near-black with a faint cold tonal cast (the tense "before").
        background:
          "linear-gradient(180deg, #1b1c1e 0%, #161616 38%, #0e0e0f 100%)",
      }}
    >
      {/* ── Ceiling weight pressing down from the top ─────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[55%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 28%, rgba(0,0,0,0.18) 65%, rgba(0,0,0,0) 100%)",
        }}
      />
      {/* Cold tonal wash at the very top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[35%]"
        style={{
          background:
            "radial-gradient(75% 100% at 50% 0%, rgba(130,150,175,0.07) 0%, rgba(130,150,175,0) 70%)",
        }}
      />
      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.6) 100%)",
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

        {/* ── Cards block with gold "ceiling" line pressing down ── */}
        <div id="pain-heading" className="relative mt-20 md:mt-28">
          {/* Gold ceiling hairline + soft glow halo above the cards */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-10 md:-top-14 h-10"
            style={{ transformOrigin: "center" }}
          >
            {/* soft halo bleeding down */}
            <div
              className="absolute inset-x-0 top-0 h-10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(229,181,85,0.18) 0%, rgba(229,181,85,0.05) 45%, rgba(229,181,85,0) 100%)",
              }}
            />
            {/* the line itself */}
            <motion.div
              className="absolute inset-x-0 top-0"
              style={{
                height: "1px",
                backgroundColor: "#e5b555",
                boxShadow:
                  "0 0 10px rgba(229,181,85,0.7), 0 0 28px rgba(229,181,85,0.25)",
                transformOrigin: "center",
                scaleX: reduce ? 1 : ceilingScaleX,
                opacity: reduce ? 0.9 : ceilingOpacity,
                willChange: "transform, opacity",
              }}
            />
          </div>

          {/* 2x2 grid with staggered vertical offsets — right column sits lower */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
            {PAIN_CARDS.map((card, i) => {
              // Right column (odd index) is offset down on desktop.
              const offsetClass =
                i === 1
                  ? "md:translate-y-8"
                  : i === 2
                  ? "md:-translate-y-2"
                  : i === 3
                  ? "md:translate-y-10"
                  : "";
              return (
                <PainCardItem
                  key={card.title}
                  card={card}
                  index={i}
                  reduce={reduce}
                  emphasis={i === 3}
                  className={offsetClass}
                />
              );
            })}
          </div>
        </div>

        {/* ── Closing statement ─────────────────────────────────── */}
        <motion.div
          className="relative mt-36 md:mt-52 max-w-[920px]"
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
 * Individual pain card. Charcoal surface with subtle inner gradient,
 * larger gold icon, and a one-shot gold edge-glow on scroll-in.
 * The emphasis variant carries a stronger gold border, a richer inner
 * radial glow, and a larger title — the thematic punch of the section.
 */
const PainCardItem = ({
  card,
  index,
  reduce,
  emphasis = false,
  className = "",
}: {
  card: PainCard;
  index: number;
  reduce: boolean;
  emphasis?: boolean;
  className?: string;
}) => {
  const Icon = card.icon;

  // Settling, weighted entrance — heavier than the rest of the site.
  const initial = reduce
    ? { opacity: 1, y: 0, boxShadow: "0 0 0 rgba(229,181,85,0)" }
    : { opacity: 0, y: 36, boxShadow: "0 0 0 rgba(229,181,85,0)" };

  const animateInView = reduce
    ? { opacity: 1, y: 0 }
    : {
        opacity: 1,
        y: 0,
        // Edge-glow flash that settles into a soft resting glow.
        boxShadow: emphasis
          ? [
              "0 0 0 rgba(229,181,85,0)",
              "0 0 0 1px rgba(229,181,85,0.55), 0 18px 50px -10px rgba(229,181,85,0.35)",
              "0 0 0 1px rgba(229,181,85,0.30), 0 14px 36px -16px rgba(229,181,85,0.22)",
            ]
          : [
              "0 0 0 rgba(229,181,85,0)",
              "0 0 0 1px rgba(229,181,85,0.35), 0 14px 40px -14px rgba(229,181,85,0.22)",
              "0 0 0 1px rgba(229,181,85,0.10), 0 10px 28px -18px rgba(229,181,85,0.10)",
            ],
      };

  const surface = emphasis
    ? // Richer charcoal with a warm inner gold radial wash
      "radial-gradient(120% 90% at 80% 0%, rgba(229,181,85,0.10) 0%, rgba(229,181,85,0) 55%), linear-gradient(160deg, #36332f 0%, #2a2826 60%, #232120 100%)"
    : "linear-gradient(160deg, #34322f 0%, #2c2a28 55%, #252321 100%)";

  const border = emphasis
    ? "1px solid rgba(229,181,85,0.30)"
    : "1px solid rgba(247,246,245,0.07)";

  return (
    <motion.article
      initial={initial}
      whileInView={animateInView}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reduce ? 0 : 1.05,
        ease: SITE_EASE,
        delay: reduce ? 0 : 0.08 + index * 0.12,
        boxShadow: {
          duration: reduce ? 0 : 1.6,
          ease: SITE_EASE,
          delay: reduce ? 0 : 0.35 + index * 0.12,
          times: [0, 0.45, 1],
        },
      }}
      className={`group relative overflow-hidden rounded-xl ${
        emphasis ? "p-7 md:p-9 lg:p-10" : "p-6 md:p-7 lg:p-8"
      } ${className}`}
      style={{
        background: surface,
        border,
        willChange: "transform, opacity, box-shadow",
      }}
    >
      {/* Inner top sheen — gives depth, especially on the emphasis card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(247,246,245,0) 0%, rgba(247,246,245,0.10) 50%, rgba(247,246,245,0) 100%)",
        }}
      />

      <div className="flex items-start gap-5 md:gap-6">
        <span
          aria-hidden="true"
          className={`inline-flex shrink-0 items-center justify-center rounded-lg ${
            emphasis ? "h-14 w-14 md:h-16 md:w-16" : "h-12 w-12 md:h-14 md:w-14"
          }`}
          style={{
            border: emphasis
              ? "1px solid rgba(229,181,85,0.55)"
              : "1px solid rgba(229,181,85,0.35)",
            background: emphasis
              ? "linear-gradient(160deg, rgba(229,181,85,0.18) 0%, rgba(229,181,85,0.04) 100%)"
              : "linear-gradient(160deg, rgba(229,181,85,0.10) 0%, rgba(229,181,85,0.02) 100%)",
            boxShadow: emphasis
              ? "inset 0 0 12px rgba(229,181,85,0.12)"
              : undefined,
          }}
        >
          <Icon
            size={emphasis ? 28 : 24}
            strokeWidth={1.4}
            className="text-gold"
          />
        </span>
        <div className="min-w-0 pt-1">
          <h3
            className={`font-serif tracking-tight text-off-white ${
              emphasis
                ? "text-[1.5rem] md:text-[1.875rem]"
                : "text-[1.25rem] md:text-[1.4rem]"
            }`}
            style={{ letterSpacing: "-0.005em", lineHeight: 1.15 }}
          >
            {card.title}
          </h3>
          <p
            className={`mt-3 font-sans text-off-white/65 leading-relaxed ${
              emphasis
                ? "text-[1rem] md:text-[1.05rem]"
                : "text-[0.9375rem] md:text-[0.975rem]"
            }`}
          >
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
