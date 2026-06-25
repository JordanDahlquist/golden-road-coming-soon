import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeRise, MaskedLines, MotionGroup, SITE_EASE } from "@/components/site/motion";
import goldenRoad from "@/assets/golden-road.png.asset.json";

const HEADLINE_DELAY = 0.35;
const LINE_DURATION = 0.9;
// After the masked line finishes revealing.
const GOLD_IGNITE_DELAY = HEADLINE_DELAY + LINE_DURATION + 0.1; // ~1.35s
const TAIL_DELAY = GOLD_IGNITE_DELAY + 0.35; // ~1.7s — subhead
const CTA_DELAY_OFFSET = 0.18; // staggered within MotionGroup
const META_DELAY = TAIL_DELAY + 0.7; // meta strip last
const SCROLL_CUE_DELAY = META_DELAY + 0.15;

const HEADLINE_LINES = [
  <>
    Navigate the{" "}
    <motion.span
      className="hero-v2-gold inline-block"
      initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: SITE_EASE, delay: GOLD_IGNITE_DELAY }}
    >
      future.
    </motion.span>
  </>,
];

const HeroV2 = () => {
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
  // Particles drift at a different rate than the bg image for parallax depth.
  const motesY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background text-off-white"
      style={{ height: "100vh", maxHeight: "100vh" }}
    >
      {/* Component-scoped styles — gold word glow + repeating sheen + horizon line. */}
      <style>{`
        .hero-v2-gold {
          color: hsl(var(--gold));
          will-change: opacity, transform, text-shadow;
        }
        @media (prefers-reduced-motion: no-preference) {
          .hero-v2-gold {
            animation: heroV2GoldBreathe 7s ease-in-out ${GOLD_IGNITE_DELAY + 0.9}s infinite;
          }
        }
        @keyframes heroV2GoldBreathe {
          0%, 100% {
            text-shadow:
              0 0 14px hsl(var(--gold) / 0.18),
              0 0 36px hsl(var(--gold) / 0.08);
          }
          50% {
            text-shadow:
              0 0 22px hsl(var(--gold) / 0.42),
              0 0 64px hsl(var(--gold) / 0.22);
          }
        }
        .hero-v2-sheen-clip {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .hero-v2-sheen {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            105deg,
            transparent 35%,
            hsl(var(--gold) / 0.18) 48%,
            hsl(var(--off-white) / 0.22) 50%,
            hsl(var(--gold) / 0.18) 52%,
            transparent 65%
          );
          mix-blend-mode: screen;
          transform: translateX(-160%);
          opacity: 0;
        }
        @media (prefers-reduced-motion: no-preference) {
          .hero-v2-sheen {
            animation: heroV2Sheen 8.5s ease-in-out ${TAIL_DELAY + 1}s infinite;
          }
        }
        @keyframes heroV2Sheen {
          0%   { transform: translateX(-160%); opacity: 0; }
          4%   { opacity: 1; }
          14%  { transform: translateX(160%); opacity: 0; }
          100% { transform: translateX(160%); opacity: 0; }
        }
        .hero-v2-horizon {
          height: 1px;
          background: linear-gradient(
            to right,
            transparent 0%,
            hsl(var(--gold) / 0.55) 50%,
            transparent 100%
          );
          transform-origin: left center;
        }
        @media (prefers-reduced-motion: no-preference) {
          .hero-v2-horizon {
            animation: heroV2HorizonBreathe 7s ease-in-out ${TAIL_DELAY}s infinite;
          }
        }
        @keyframes heroV2HorizonBreathe {
          0%, 100% { opacity: 0.35; transform: scaleX(0.92); }
          50%      { opacity: 0.85; transform: scaleX(1); }
        }
      `}</style>

      <motion.div
        style={{ scale: bgScale, y: bgY, willChange: "transform" }}
        className="absolute inset-0"
        aria-hidden
      >
        <div className="hero-pushin absolute inset-0">
          <img
            src={goldenRoad.url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_70%] select-none scale-x-[-1]"
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

        {/* Embers — parallax independent of background image. */}
        <motion.div
          style={{ y: motesY, willChange: "transform" }}
          className="hero-motes absolute inset-0 overflow-hidden pointer-events-none"
        >
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
        </motion.div>

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
        <div className="w-full max-w-[1400px] mx-auto h-full flex flex-col justify-between pt-20 md:pt-[100px] pb-8 md:pb-10">
          <div className="flex-1 flex flex-col justify-center min-h-0">
            <motion.div
              style={{ y: headlineY, willChange: "transform" }}
              className="hero-headline-sweep relative"
            >
              <MaskedLines
                as="h1"
                lines={HEADLINE_LINES}
                delayChildren={HEADLINE_DELAY}
                stagger={0.18}
                className="t-display text-off-white max-w-[18ch]"
              />
              {/* One-shot CSS sweep on load (global class). */}
              <span aria-hidden className="hero-sweep" />
              {/* Repeating sheen that re-runs every several seconds. */}
              <span aria-hidden className="hero-v2-sheen" />
            </motion.div>

            {/* Faint breathing gold horizon line beneath the headline. */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: reduce ? 0.5 : 1, scaleX: 1 }}
              transition={{ duration: 1.1, ease: SITE_EASE, delay: TAIL_DELAY - 0.1 }}
              style={{ transformOrigin: "left center", willChange: "transform, opacity" }}
              className="mt-6 md:mt-8 max-w-[34ch]"
            >
              <span className="hero-v2-horizon block w-full" />
            </motion.div>

            <MotionGroup delayChildren={TAIL_DELAY}>
              <FadeRise
                as="p"
                trigger="child"
                className="t-lead text-off-white/65 max-w-[62ch] mt-5 md:mt-8"
              >
                Golden Road Strategies provides strategic financial leadership and enterprise advisory services. We partner with forward-thinking CEOs, Founders, and Boards to optimize capital, navigate market complexity, and build a clear, financially rigorous path to sustainable scale.
              </FadeRise>

              <FadeRise
                trigger="child"
                className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8 mt-6 md:mt-9"
              >
                <Button
                  asChild
                  size="lg"
                  className="hero-cta luxe-cta t-label w-full sm:w-auto bg-gold text-background px-8 py-5 rounded-[4px]"
                >
                  <a href="#contact">Let's Build the Path Forward.</a>
                </Button>
              </FadeRise>
            </MotionGroup>
          </div>

          <div className="flex items-end justify-between gap-6">
            <FadeRise
              as="div"
              delay={META_DELAY}
              y={10}
              className="t-label text-off-white/40"
            >
              Southern California
              <span className="mx-3 text-gold/60">|</span>
              Available Globally
            </FadeRise>

            <FadeRise
              y={14}
              delay={SCROLL_CUE_DELAY}
              className="pointer-events-none flex flex-col items-center gap-2"
            >
              <span className="t-label text-off-white/35">Scroll</span>
              <span className="hero-scroll-line block h-8 w-px bg-off-white/25" />
            </FadeRise>

            {/* Right-side spacer to keep scroll cue visually centered like V1. */}
            <div aria-hidden className="hidden md:block t-label opacity-0 select-none">
              Southern California | Available Globally
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroV2;
