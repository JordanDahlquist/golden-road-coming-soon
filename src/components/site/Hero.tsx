import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeRise, MaskedLines, MotionGroup } from "./motion";
import heroRoad from "@/assets/hero-road.png.asset.json";

const HEADLINE_LINES = [
  "Build the financial",
  "infrastructure your",
  "next stage demands.",
];

// Timing — canonical easing cubic-bezier(0.22, 1, 0.36, 1).
const EYEBROW_DELAY = 0.05;
const HEADLINE_DELAY = 0.35;
const TAIL_DELAY = 1.55;
const META_DELAY = 1.95;
const SCROLL_CUE_DELAY = 2.1;

const Hero = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-tied handoff + headline parallax (cinematic recede).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const handoffOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-background text-off-white pt-20 md:pt-24"
    >
      {/* Cinematic full-bleed background image with parallax */}
      <motion.div
        style={{ scale: bgScale, y: bgY, willChange: "transform" }}
        className="absolute inset-0"
        aria-hidden
      >
        <img
          src={heroRoad.url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_70%] select-none"
          draggable={false}
        />
        {/* Top-down scrim for headline legibility in the dark upper zone */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(22,21,21,0.90) 0%, rgba(22,21,21,0.60) 32%, rgba(22,21,21,0.22) 56%, rgba(22,21,21,0) 74%)",
          }}
        />
        {/* Soft bottom scrim behind meta strip */}
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "linear-gradient(to top, rgba(22,21,21,0.7) 0%, rgba(22,21,21,0) 100%)",
          }}
        />
        {/* Side vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 55%, rgba(22,21,21,0) 55%, rgba(22,21,21,0.55) 100%)",
          }}
        />
      </motion.div>

      {/* Foreground content */}
      <motion.div
        style={{ opacity: handoffOpacity, willChange: "opacity" }}
        className="relative z-10 flex min-h-[calc(100vh-7rem)] flex-col px-6 md:px-12 lg:px-20 pb-20 pt-16 md:pt-24 lg:pt-32"
      >
        <div className="w-full max-w-[1400px] mx-auto flex-1 flex flex-col justify-start pt-4 md:pt-8">
          {/* Eyebrow */}
          <FadeRise
            as="div"
            delay={EYEBROW_DELAY}
            y={12}
            className="mb-10 md:mb-14 flex items-center gap-4"
          >
            <span
              aria-hidden
              className="hero-eyebrow-rule block h-px w-10 md:w-14 bg-gold/70"
            />
            <span className="font-sans uppercase text-[10px] md:text-[11px] tracking-[0.32em] text-off-white/55">
              Golden Road Strategies — Fractional CFO &amp; Strategic Finance
            </span>
          </FadeRise>

          {/* Headline with subtle parallax */}
          <motion.div style={{ y: headlineY, willChange: "transform" }}>
            <MaskedLines
              as="h1"
              lines={HEADLINE_LINES}
              delayChildren={HEADLINE_DELAY}
              stagger={0.18}
              className="font-serif text-off-white tracking-tight max-w-[18ch]"
              style={{
                fontSize: "clamp(2.9rem, 8.6vw, 8.5rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.022em",
                fontWeight: 300,
              }}
            />
          </motion.div>

          <MotionGroup delayChildren={TAIL_DELAY}>
            <FadeRise
              as="p"
              trigger="child"
              className="mt-10 md:mt-14 font-sans leading-[1.7] text-off-white/65 max-w-[54ch]"
              style={{ fontSize: "clamp(1rem, 1.2vw, 1.2rem)", fontWeight: 300 }}
            >
              Golden Road Strategies gives forward-thinking CEOs, founders, and
              boards the forward-looking CFO leadership to optimize capital,
              sharpen decisions, and clear a path to sustainable scale.
            </FadeRise>

            <FadeRise
              trigger="child"
              className="mt-12 md:mt-16 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10"
            >
              <Button
                asChild
                size="lg"
                className="hero-cta w-full sm:w-auto bg-gold text-background hover:bg-gold/90 font-sans uppercase tracking-[0.18em] text-xs md:text-sm px-9 py-6 rounded-[4px]"
              >
                <a href="#contact">Start the Conversation</a>
              </Button>

              <a
                href="#process"
                className="group inline-flex items-center gap-2 font-sans uppercase tracking-[0.22em] text-[11px] text-off-white/55 hover:text-off-white transition-colors"
              >
                <span>See how it works</span>
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
              </a>
            </FadeRise>
          </MotionGroup>
        </div>

        {/* Bottom meta strip — editorial footer of the hero */}
        <FadeRise
          as="div"
          delay={META_DELAY}
          y={10}
          className="relative z-10 mt-auto pt-10 flex items-end justify-between gap-6"
        >
          <div className="font-sans uppercase text-[10px] tracking-[0.28em] text-off-white/40">
            Southern California
            <span className="mx-3 text-off-white/25">/</span>
            Available Globally
          </div>
          <div className="hidden md:block font-sans uppercase text-[10px] tracking-[0.28em] text-off-white/40 text-right">
            Referral-led practice
            <span className="mx-3 text-off-white/25">·</span>
            Est. of a 25-year career
          </div>
        </FadeRise>
      </motion.div>

      {/* Scroll cue — center bottom, refined */}
      <FadeRise
        y={14}
        delay={SCROLL_CUE_DELAY}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-off-white/35">
          Scroll
        </span>
        <span className="hero-scroll-line block h-12 w-px bg-off-white/25" />
      </FadeRise>
    </section>
  );
};

export default Hero;
