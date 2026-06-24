import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { SITE_EASE } from "@/lib/motion";
import { FadeRise, MaskedLines } from "./motion";

/**
 * Pain section — cinematic "ceiling" moment.
 *
 * Visual upgrade only; copy unchanged. The section is the emotional
 * low-point of the page:
 *   • dark charcoal-to-near-black gradient with vignette + low gold glow
 *   • masked line-by-line reveals on the two headlines
 *   • a thin gold "ceiling" hairline slides in from both edges to press
 *     down above the "Growth isn't your problem" statement
 *   • gentle parallax between headline and paragraph copy
 *
 * Reduced motion: static, fully readable, ceiling line drawn statically.
 */
const PainSection = () => {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);

  // Section-scoped scroll progress, used for gentle parallax.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // A few percent of translateY each, in opposite directions for depth.
  const yLead = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const yPara = useTransform(scrollYProgress, [0, 1], ["0%", "-2%"]);
  const yStatement = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);
  const ySub = useTransform(scrollYProgress, [0, 1], ["0%", "-1%"]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="pain-heading"
      className="relative isolate overflow-hidden text-off-white"
      style={{
        // Charcoal → near-black vertical gradient.
        background:
          "linear-gradient(180deg, #1c1b1a 0%, #161515 38%, #0f0e0e 100%)",
      }}
    >
      {/* Dark vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 40%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Low gold glow foreshadowing the road — minimal, tense */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(229,181,85,0.10) 0%, rgba(229,181,85,0.04) 35%, rgba(229,181,85,0) 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1100px] px-6 md:px-12 lg:px-20 pt-28 md:pt-40 pb-28 md:pb-40">
        {/* ── Lead-in ───────────────────────────────────────────── */}
        <motion.div style={reduce ? undefined : { y: yLead }}>
          <FadeRise
            as="p"
            trigger="in-view"
            className="font-sans uppercase tracking-[0.24em] text-xs text-off-white/50"
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
        </motion.div>

        <motion.div style={reduce ? undefined : { y: yPara }}>
          <FadeRise
            as="p"
            trigger="in-view"
            className="mt-8 md:mt-10 font-sans leading-relaxed text-off-white/70 max-w-[52ch]"
            style={{ fontSize: "clamp(1rem, 1.2vw, 1.2rem)" }}
          >
            You hit a number. Maybe five million, maybe forty. Revenue climbs,
            but the company stops feeling like it&rsquo;s scaling. Hiring gets
            heavier. Decisions get slower. The numbers come in late and tell
            you what already happened.
          </FadeRise>
        </motion.div>

        {/* ── The ceiling moment ────────────────────────────────── */}
        <motion.div
          className="relative mt-28 md:mt-40"
          style={reduce ? undefined : { y: yStatement }}
        >
          {/* The gold ceiling line, pressing down above the statement */}
          <CeilingLine reduce={reduce} />

          <MaskedLines
            as="h2"
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

          <motion.div style={reduce ? undefined : { y: ySub }}>
            <FadeRise
              as="p"
              trigger="in-view"
              delay={0.4}
              className="mt-8 md:mt-10 font-sans leading-relaxed text-off-white/70 max-w-[52ch]"
              style={{ fontSize: "clamp(1rem, 1.2vw, 1.2rem)" }}
            >
              You&rsquo;re scaling past what your financial systems were built
              to carry. The ceiling isn&rsquo;t the market. It&rsquo;s the
              architecture underneath you.
            </FadeRise>
          </motion.div>
        </motion.div>

        {/* ── Resolution + handoff (unchanged copy) ─────────────── */}
        <div className="mt-28 md:mt-40">
          <MaskedLines
            as="h3"
            trigger="in-view"
            stagger={0.08}
            lines={[
              <>The problem was never the ambition.</>,
              <>It was the architecture.</>,
            ]}
            className="font-serif tracking-tight text-off-white"
            style={{
              fontSize: "clamp(1.625rem, 3.4vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          />

          <FadeRise
            as="p"
            trigger="in-view"
            className="mt-6 md:mt-8 font-sans leading-relaxed text-off-white/70 max-w-[52ch]"
            style={{ fontSize: "clamp(1rem, 1.2vw, 1.2rem)" }}
          >
            Backward-looking accounting tells you where the money went. A
            full-time CFO is overhead you are not ready to carry. So the gap
            stays open, and every quarter you wait, the ceiling holds.
          </FadeRise>

          <FadeRise
            as="p"
            trigger="in-view"
            className="mt-12 md:mt-14 font-serif italic text-gold"
            style={{
              fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.005em",
            }}
          >
            There is a third option.
          </FadeRise>
        </div>
      </div>
    </section>
  );
};

/**
 * Thin gold hairline that slides in from both edges to sit above the
 * statement like a ceiling. Reduced motion: drawn statically.
 */
const CeilingLine = ({ reduce }: { reduce: boolean }) => {
  const common = {
    position: "absolute" as const,
    top: "-2.25rem",
    height: "1px",
    backgroundColor: "#e5b555",
    boxShadow:
      "0 0 8px rgba(229,181,85,0.55), 0 0 24px rgba(229,181,85,0.18)",
    willChange: "transform, opacity",
  };

  if (reduce) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-x-0"
        style={{ ...common, top: "-2.25rem", left: 0, right: 0, opacity: 0.9 }}
      />
    );
  }

  return (
    <div aria-hidden="true" className="absolute inset-x-0" style={{ top: "-2.25rem" }}>
      <motion.span
        style={{ ...common, top: 0, left: 0, transformOrigin: "left center" }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 0.5, opacity: 0.95 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease: SITE_EASE, delay: 0.05 }}
        className="block w-1/2"
      />
      <motion.span
        style={{ ...common, top: 0, right: 0, transformOrigin: "right center" }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 0.5, opacity: 0.95 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease: SITE_EASE, delay: 0.05 }}
        className="block w-1/2 ml-auto"
      />
    </div>
  );
};

export default PainSection;
