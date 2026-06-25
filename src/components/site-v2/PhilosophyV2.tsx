import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SectionEnter, FadeRise, MaskedLines, SITE_EASE } from "@/components/site/motion";

const PhilosophyV2 = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const loopsActive = useInView(sectionRef, { margin: "200px 0px 200px 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Glow drifts at a different (slower) rate than text — parallax depth.
  const glowY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40]);
  const textY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -20, reduce ? 0 : 20]);

  return (
    <section
      ref={sectionRef}
      data-loops={loopsActive ? "active" : "paused"}
      className="relative overflow-hidden bg-background text-off-white"
    >
      <style>{`
        .phil-v2-sweep-clip {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .phil-v2-sweep {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            105deg,
            transparent 38%,
            hsl(var(--gold) / 0.18) 49%,
            hsl(var(--off-white) / 0.22) 50%,
            hsl(var(--gold) / 0.18) 51%,
            transparent 62%
          );
          mix-blend-mode: screen;
          transform: translateX(-160%);
          opacity: 0;
        }
        @media (prefers-reduced-motion: no-preference) {
          .phil-v2-sweep { animation: philV2Sweep 9s ease-in-out 1.6s infinite; }
        }
        @keyframes philV2Sweep {
          0%   { transform: translateX(-160%); opacity: 0; }
          4%   { opacity: 1; }
          18%  { transform: translateX(160%); opacity: 0; }
          100% { transform: translateX(160%); opacity: 0; }
        }
        .phil-v2-loop { animation-play-state: paused; }
        [data-loops="active"] .phil-v2-loop { animation-play-state: running; }
      `}</style>

      {/* Soft golden-road glow + vignette */}
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "70%",
            background:
              "radial-gradient(ellipse 65% 60% at 50% 95%, hsl(var(--gold) / 0.18) 0%, hsl(var(--gold) / 0.08) 35%, transparent 70%)",
            mixBlendMode: "screen",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 50%, transparent 55%, rgba(22,21,21,0.55) 100%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10"
      >
        <SectionEnter
          as="div"
          className="mx-auto flex max-w-[900px] flex-col items-center px-6 py-24 text-center md:px-12 md:py-32 lg:py-40"
        >
          <FadeRise trigger="child" className="w-full">
            <motion.div
              className="mx-auto mb-8 h-px w-16 bg-gold/60 md:mb-10 origin-center"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, ease: SITE_EASE, delay: 0.1 }}
              aria-hidden="true"
            />
          </FadeRise>

          <div className="relative inline-block">
            <MaskedLines
              as="h2"
              trigger="in-view"
              stagger={0.18}
              delayChildren={0.2}
              lines={[
                <span key="a" className="text-gold">See further.</span>,
                <span key="b" className="text-gold">Build smarter.</span>,
                <span key="c" className="text-gold">Lead the way.</span>,
              ]}
              className="t-h3 text-gold max-w-[30ch]"
            />
            {!reduce && (
              <span aria-hidden className="phil-v2-sweep-clip">
                <span aria-hidden className="phil-v2-sweep phil-v2-loop" />
              </span>
            )}
          </div>

          <FadeRise trigger="child" className="mt-8 md:mt-10" delay={0.9}>
            <p className="t-lead text-off-white/70 max-w-[60ch]">
              Vision without financial architecture is just a wish. In an era of economic volatility and rapid disruption, true industry leaders don't just adapt—they engineer their growth. We create clarity out of chaos, aligning operational ambition with fiscal discipline to transform enterprise vision into measurable corporate value.
            </p>
          </FadeRise>

          <motion.div
            aria-hidden
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: reduce ? 0.6 : 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: SITE_EASE, delay: 1.1 }}
            style={{ transformOrigin: "center" }}
            className="mt-10 md:mt-12 h-px w-40 max-w-full"
          >
            <span
              className="block h-full w-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, hsl(var(--gold) / 0.7), transparent)",
              }}
            />
          </motion.div>
        </SectionEnter>
      </motion.div>
    </section>
  );
};

export default PhilosophyV2;
