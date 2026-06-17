import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroBackground from "./HeroBackground";
import { FadeRise, MaskedLines, MotionGroup } from "./motion";

const HEADLINE_LINES = [
  "Build the financial",
  "infrastructure your next",
  "stage demands.",
];

// Headline timeline (matches MaskedLines defaults + delayChildren below):
// delay 0.1 + 2 staggers (0.24) + last duration 0.9 ≈ 1.24s → tail starts ~1.15s.
const TAIL_DELAY = 1.15;
const SCROLL_CUE_DELAY = 1.45;

const Hero = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-tied handoff: as the hero scrolls out, gently scale down + fade
  // so it feels like it recedes and hands off to the next scene.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const handoffScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduce ? 1 : 0.96],
  );
  const handoffOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    [1, reduce ? 1 : 0],
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-background text-off-white"
    >
      <HeroBackground />

      {/* Barely-there nav: fade only (no rise) */}
      <FadeRise
        as="header"
        y={0}
        duration={0.8}
        className="relative z-20 w-full px-6 md:px-12 lg:px-20 pt-8 md:pt-10"
      >
        <a href="/" aria-label="Golden Road Strategies" className="inline-block">
          <img
            src={logo}
            alt="Golden Road Strategies"
            className="h-10 md:h-12 w-auto select-none"
            draggable={false}
          />
        </a>
      </FadeRise>

      {/* Content (scroll-tied handoff: scale + fade as hero exits) */}
      <motion.div
        style={{ scale: handoffScale, opacity: handoffOpacity, willChange: "transform, opacity" }}
        className="relative z-10 flex min-h-[calc(100vh-7rem)] items-center px-6 md:px-12 lg:px-20 pb-16 pt-12 md:pt-20"
      >
        <div className="w-full max-w-[1400px] mx-auto">
          <MaskedLines
            as="h1"
            lines={HEADLINE_LINES}
            delayChildren={0.1}
            className="font-serif text-off-white tracking-tight"
            style={{
              fontSize: "clamp(2.75rem, 8vw, 8rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.015em",
            }}
          />

          <MotionGroup delayChildren={TAIL_DELAY}>
            <FadeRise
              as="p"
              trigger="child"
              className="mt-8 md:mt-10 font-sans leading-relaxed text-off-white/70 max-w-[52ch]"
              style={{ fontSize: "clamp(1rem, 1.25vw, 1.25rem)" }}
            >
              Golden Road Strategies gives forward-thinking CEOs, founders, and
              boards the forward-looking CFO leadership to optimize capital,
              sharpen decisions, and clear a path to sustainable scale.
            </FadeRise>

            <FadeRise
              trigger="child"
              className="mt-12 md:mt-16 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8"
            >
              <Button
                asChild
                size="lg"
                className="hero-cta w-full sm:w-auto bg-gold text-background hover:bg-gold/90 font-sans uppercase tracking-[0.14em] text-xs md:text-sm px-8 py-6 rounded-[5px]"
              >
                <a href="#contact">Start the Conversation</a>
              </Button>

              <a
                href="#process"
                className="group inline-flex items-center gap-2 font-sans text-sm text-off-white/70 hover:text-off-white transition-colors"
              >
                <span className="story-link">See how it works</span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </FadeRise>
          </MotionGroup>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <FadeRise
        y={16}
        delay={SCROLL_CUE_DELAY}
        className="absolute bottom-8 left-6 md:left-12 lg:left-20 z-10 flex flex-col items-start gap-3"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-off-white/40">
          Scroll
        </span>
        <span className="hero-scroll-line block h-10 w-px bg-off-white/30" />
      </FadeRise>
    </section>
  );
};

export default Hero;
