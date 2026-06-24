import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeRise, MaskedLines, MotionGroup } from "@/components/site/motion";
import goldenRoad from "@/assets/golden-road.png.asset.json";

const HEADLINE_LINES = ["Navigate the future."];

const HEADLINE_DELAY = 0.35;
const TAIL_DELAY = 1.25;
const SCROLL_CUE_DELAY = 1.7;

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
              <span aria-hidden className="hero-sweep" />
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
                  <a href="#contact">Let's Build the Path Forward</a>
                </Button>
              </FadeRise>
            </MotionGroup>
          </div>

          <div className="flex items-end justify-center gap-6">
            <FadeRise
              y={14}
              delay={SCROLL_CUE_DELAY}
              className="pointer-events-none flex flex-col items-center gap-2"
            >
              <span className="t-label text-off-white/35">Scroll</span>
              <span className="hero-scroll-line block h-8 w-px bg-off-white/25" />
            </FadeRise>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroV2;
