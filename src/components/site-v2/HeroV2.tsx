import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeRise, MaskedLines, MotionGroup, SITE_EASE } from "@/components/site/motion";
import goldenRoad from "@/assets/golden-road.png.asset.json";

const HEADLINE_DELAY = 0.35;
const LINE_DURATION = 0.9;
// After the masked line finishes revealing.
const GOLD_IGNITE_DELAY = HEADLINE_DELAY + LINE_DURATION + 0.1; // ~1.35s
const TAIL_DELAY = GOLD_IGNITE_DELAY + 0.35; // ~1.7s — subhead
const META_DELAY = TAIL_DELAY + 0.7; // meta strip last
const SCROLL_CUE_DELAY = META_DELAY + 0.15;

const HEADLINE_LINES = [
  <>
    Navigate the{" "}
    <motion.span
      className="hero-v2-gold relative inline-block"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: SITE_EASE, delay: GOLD_IGNITE_DELAY }}
    >
      future.
    </motion.span>
  </>,
];

const HeroV2 = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  // Pause continuous loops when the hero is well off-screen.
  const loopsActive = useInView(sectionRef, { margin: "200px 0px 200px 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const handoffOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);
  // Particles drift at a different rate than the bg image for parallax depth.
  const motesY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);

  return (
    <section
      ref={sectionRef}
      data-loops={loopsActive ? "active" : "paused"}
      className="relative overflow-hidden bg-background text-off-white"
      style={{ height: "100vh", maxHeight: "100vh" }}
    >
      {/* Component-scoped styles — gold word drop glow, repeating sheen, horizon line, embers. */}
      <style>{`
        .hero-v2-gold {
          color: hsl(var(--gold));
          text-shadow: 0 0 18px hsl(var(--gold) / 0.32), 0 0 36px hsl(var(--gold) / 0.14);
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
        .hero-v2-ember {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 9999px;
          pointer-events: none;
          background: hsl(var(--gold) / 0.8);
        }
        @media (prefers-reduced-motion: no-preference) {
          .hero-v2-ember {
            opacity: 0;
            animation: heroV2EmberDrift linear infinite;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-v2-ember {
            opacity: 0.45;
          }
        }
        @keyframes heroV2EmberDrift {
          0%   { transform: translateY(0); opacity: 0; }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.8; }
          100% { transform: translateY(-120vh); opacity: 0; }
        }
        /* Pause every looping element when the section is off-screen. */
        .hero-v2-loop { animation-play-state: paused; }
        [data-loops="active"] .hero-v2-loop { animation-play-state: running; }
      `}</style>

      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0"
        aria-hidden
      >
        <div className="absolute inset-0">
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
            pointerEvents: "none",
          }}
        />

        {/* Embers — parallax independent of background image. */}
        <motion.div
          style={{ y: motesY }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              className="hero-v2-ember hero-v2-loop"
              style={{
                left: `${(i * 53 + 7) % 100}%`,
                bottom: `${-10 + ((i * 17) % 30)}%`,
                animationDelay: `${(i * 1.7) % 12}s`,
                animationDuration: `${18 + (i % 5) * 4}s`,
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
        style={{ opacity: handoffOpacity }}
        className="relative z-10 h-full flex flex-col px-6 md:px-12 lg:px-20"
      >
        <div className="w-full max-w-[1400px] mx-auto h-full flex flex-col justify-between pt-20 md:pt-[100px] pb-8 md:pb-10">
          <div className="flex-1 flex flex-col justify-center min-h-0">
            <motion.div
              style={{ y: headlineY }}
              className="hero-headline-sweep relative"
            >
              <MaskedLines
                as="h1"
                lines={HEADLINE_LINES}
                delayChildren={HEADLINE_DELAY}
                stagger={0.18}
                className="t-display text-off-white max-w-[18ch]"
                lineClassName="pb-[0.15em]"
              />
              {!reduce && (
                <span aria-hidden className="hero-v2-sheen-clip">
                  {/* One-shot CSS sweep on load (global class). */}
                  <span aria-hidden className="hero-sweep" />
                  {/* Repeating sheen that re-runs every several seconds. */}
                  <span aria-hidden className="hero-v2-sheen hero-v2-loop" />
                </span>
              )}
            </motion.div>

            {/* Faint breathing gold horizon line beneath the headline. */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: reduce ? 0.5 : 1, scaleX: 1 }}
              transition={{ duration: 1.1, ease: SITE_EASE, delay: TAIL_DELAY - 0.1 }}
              style={{ transformOrigin: "left center" }}
              className="mt-6 md:mt-8 max-w-[34ch]"
            >
              <span className="hero-v2-horizon hero-v2-loop block w-full" />
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
              Southern California Based
              <span className="mx-3 text-gold/60">/</span>
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
              Southern California Based / Available Globally
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroV2;
