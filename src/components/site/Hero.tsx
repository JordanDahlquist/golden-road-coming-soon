import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeRise, MaskedLines, MotionGroup } from "./motion";
import goldenRoad from "@/assets/golden-road.png.asset.json";

const HEADLINE_LINES = [
  "Build the financial",
  "infrastructure your",
  "next stage demands.",
];

const EYEBROW_DELAY = 0.05;
const HEADLINE_DELAY = 0.35;
const TAIL_DELAY = 1.55;
const META_DELAY = 1.95;
const SCROLL_CUE_DELAY = 2.1;

const Hero = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

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
      className="relative overflow-hidden bg-background text-off-white"
      style={{ height: "100vh", maxHeight: "100vh" }}
    >
      <motion.div
        style={{ scale: bgScale, y: bgY, willChange: "transform" }}
        className="absolute inset-0"
        aria-hidden
      >
        <div className="hero-pushin absolute inset-0">
          <img
            src={goldenRoad.url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_70%] select-none"
            draggable={false}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(22,21,21,0.90) 0%, rgba(22,21,21,0.60) 32%, rgba(22,21,21,0.22) 56%, rgba(22,21,21,0) 74%)",
          }}
        />
        <div
          className="hero-horizon-breathe absolute inset-x-0"
          style={{
            top: "38%",
            height: "62%",
            background:
              "radial-gradient(ellipse 70% 55% at 50% 75%, hsl(var(--gold) / 0.32) 0%, hsl(var(--gold) / 0.14) 28%, hsl(var(--gold) / 0.05) 52%, transparent 75%)",
            mixBlendMode: "screen",
            willChange: "opacity, transform",
            pointerEvents: "none",
          }}
        />
        <div className="hero-motes absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="hero-mote"
              style={{
                left: `${(i * 53 + 7) % 100}%`,
                bottom: `${-10 + ((i * 17) % 30)}%`,
                animationDelay: `${(i * 1.7) % 12}s`,
                animationDuration: `${18 + (i % 5) * 4}s`,
                opacity: 0.18 + ((i % 3) * 0.06),
                width: i % 4 === 0 ? "2px" : "1.5px",
                height: i % 4 === 0 ? "2px" : "1.5px",
              }}
            />
          ))}
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              "linear-gradient(to top, rgba(22,21,21,0.7) 0%, rgba(22,21,21,0) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 55%, rgba(22,21,21,0) 55%, rgba(22,21,21,0.55) 100%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity: handoffOpacity, willChange: "opacity" }}
        className="relative z-10 h-full flex flex-col px-6 md:px-12 lg:px-20"
      >
        <div
          className="w-full max-w-[1400px] mx-auto h-full flex flex-col justify-between"
          style={{ paddingTop: "100px", paddingBottom: "40px" }}
        >
          <div className="flex-1 flex flex-col justify-center min-h-0">
            {/* Headline, subhead, CTA */}
            <motion.div
              style={{ y: headlineY, willChange: "transform" }}
              className="hero-headline-sweep relative"
            >
              <MaskedLines
                as="h1"
                lines={HEADLINE_LINES}
                delayChildren={HEADLINE_DELAY}
                stagger={0.18}
                className="font-serif text-off-white tracking-tight max-w-[18ch]"
                style={{
                  fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.018em",
                  fontWeight: 300,
                }}
              />
              <span aria-hidden className="hero-sweep" />
            </motion.div>

            <MotionGroup delayChildren={TAIL_DELAY}>
              <FadeRise
                as="p"
                trigger="child"
                className="font-sans leading-relaxed text-off-white/65 max-w-[54ch]"
                style={{
                  fontSize: "clamp(1.05rem, 1.25vw, 1.25rem)",
                  fontWeight: 300,
                  marginTop: "32px",
                }}
              >
                Golden Road Strategies gives forward-thinking CEOs, founders, and
                boards the forward-looking CFO leadership to optimize capital,
                sharpen decisions, and clear a path to sustainable scale.
              </FadeRise>

              <FadeRise
                trigger="child"
                className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8"
                style={{ marginTop: "36px" }}
              >
                <Button
                  asChild
                  size="lg"
                  className="hero-cta w-full sm:w-auto bg-gold text-background hover:bg-gold/90 font-sans uppercase tracking-[0.18em] text-xs md:text-sm px-8 py-5 rounded-[4px]"
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

          {/* BOTTOM — meta + scroll cue */}
          <div className="flex items-end justify-between gap-6">
            <FadeRise
              as="div"
              delay={META_DELAY}
              y={10}
              className="font-sans uppercase text-[10px] tracking-[0.28em] text-off-white/40"
            >
              Southern California
              <span className="mx-3 text-off-white/25">/</span>
              Available Globally
            </FadeRise>

            <FadeRise
              y={14}
              delay={SCROLL_CUE_DELAY}
              className="pointer-events-none flex flex-col items-center gap-2"
            >
              <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-off-white/35">
                Scroll
              </span>
              <span className="hero-scroll-line block h-8 w-px bg-off-white/25" />
            </FadeRise>

            <FadeRise
              as="div"
              delay={META_DELAY}
              y={10}
              className="hidden md:block font-sans uppercase text-[10px] tracking-[0.28em] text-off-white/40 text-right"
            >
              Referral-led practice
              <span className="mx-3 text-off-white/25">·</span>
              Est. of a 25-year career
            </FadeRise>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
