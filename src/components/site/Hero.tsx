import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import HeroBackground from "./HeroBackground";

const HEADLINE_LINES = [
  "Build the financial",
  "infrastructure your next",
  "stage demands.",
];

const EASE = [0.22, 1, 0.36, 1] as const;

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

  // Headline: line-by-line masked reveal (rise from behind overflow-hidden wrapper)
  const headlineGroup: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.12,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };

  const lineReveal: Variants = {
    hidden: reduce ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: reduce ? 0 : 0.9, ease: EASE },
    },
  };

  // Tail group: subhead → CTA → scroll cue, starts after headline finishes
  // Headline timeline: delay 0.1 + 2 staggers (0.24) + last duration 0.9 ≈ 1.24s
  const tailGroup: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduce ? 0 : 1.15,
        staggerChildren: reduce ? 0 : 0.12,
      },
    },
  };

  const riseItem: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.6, ease: EASE },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-background text-off-white">
      <HeroBackground />

      {/* Barely-there nav */}
      <motion.header
        data-hero-nav
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
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
      </motion.header>

      {/* Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-7rem)] items-center px-6 md:px-12 lg:px-20 pb-32 pt-16 md:pt-24">
        <div className="w-full max-w-[1400px] mx-auto">
          <motion.h1
            variants={headlineGroup}
            initial="hidden"
            animate="show"
            className="font-serif text-off-white tracking-tight"
            style={{
              fontSize: "clamp(2.75rem, 8vw, 8rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.015em",
            }}
          >
            {HEADLINE_LINES.map((line, i) => (
              <span
                key={i}
                className="block overflow-hidden"
                data-hero-line={i}
              >
                <motion.span variants={lineReveal} className="block will-change-transform">
                  {line}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.div variants={tailGroup} initial="hidden" animate="show">
            <motion.p
              variants={riseItem}
              className="mt-8 md:mt-10 font-sans leading-relaxed text-off-white/70 max-w-[52ch]"
              style={{ fontSize: "clamp(1rem, 1.25vw, 1.25rem)" }}
            >
              Golden Road Strategies gives forward-thinking CEOs, founders, and
              boards the forward-looking CFO leadership to optimize capital,
              sharpen decisions, and clear a path to sustainable scale.
            </motion.p>

            <motion.div
              variants={riseItem}
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
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduce ? 0 : 0.6,
          delay: reduce ? 0 : 1.45,
          ease: EASE,
        }}
        className="absolute bottom-8 left-6 md:left-12 lg:left-20 z-10 flex flex-col items-start gap-3"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-off-white/40">
          Scroll
        </span>
        <span className="hero-scroll-line block h-10 w-px bg-off-white/30" />
      </motion.div>
    </section>
  );
};

export default Hero;
