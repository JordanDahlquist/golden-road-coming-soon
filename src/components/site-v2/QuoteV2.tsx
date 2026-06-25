import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SectionEnter, FadeRise, MaskedLines, SITE_EASE } from "@/components/site/motion";

const QUOTE_LINES = [
  "Do not go where the path may lead,",
  "go instead where there is no path",
  "and leave a trail.",
];

const QuoteV2 = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const loopsActive = useInView(sectionRef, { margin: "200px 0px 200px 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 1.02, reduce ? 1 : 1.12]);
  const bgY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 30, reduce ? 0 : -30]);

  return (
    <section
      ref={sectionRef}
      data-loops={loopsActive ? "active" : "paused"}
      className="relative overflow-hidden text-off-white"
      style={{ backgroundColor: "hsl(var(--black))" }}
    >
      <style>{`
        .quote-v2-sweep-clip {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .quote-v2-sweep {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            105deg,
            transparent 38%,
            hsl(var(--gold) / 0.16) 49%,
            hsl(var(--off-white) / 0.20) 50%,
            hsl(var(--gold) / 0.16) 51%,
            transparent 62%
          );
          mix-blend-mode: screen;
          transform: translateX(-160%);
          opacity: 0;
        }
        @media (prefers-reduced-motion: no-preference) {
          .quote-v2-sweep { animation: quoteV2Sweep 10s ease-in-out 1.8s infinite; }
          .quote-v2-glow-breathe { animation: quoteV2Breathe 9s ease-in-out infinite; }
        }
        @keyframes quoteV2Sweep {
          0%   { transform: translateX(-160%); opacity: 0; }
          4%   { opacity: 1; }
          18%  { transform: translateX(160%); opacity: 0; }
          100% { transform: translateX(160%); opacity: 0; }
        }
        @keyframes quoteV2Breathe {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 1; }
        }
        .quote-v2-loop { animation-play-state: paused; }
        [data-loops="active"] .quote-v2-loop { animation-play-state: running; }
      `}</style>

      {/* Atmospheric background — slow zoom + parallax + breathing glow */}
      <motion.div
        aria-hidden
        style={{ scale: bgScale, y: bgY, willChange: "transform" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="quote-v2-glow-breathe quote-v2-loop absolute inset-x-0 bottom-0"
          style={{
            height: "80%",
            background:
              "radial-gradient(ellipse 60% 55% at 50% 90%, hsl(var(--gold) / 0.22) 0%, hsl(var(--gold) / 0.09) 35%, transparent 70%)",
            mixBlendMode: "screen",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(110% 75% at 50% 50%, transparent 50%, rgba(22,21,21,0.7) 100%)",
          }}
        />
      </motion.div>

      <SectionEnter
        as="div"
        className="relative z-10 mx-auto flex max-w-[860px] flex-col items-center px-6 py-32 text-center md:px-12 md:py-44 lg:py-56"
      >
        {/* Oversized decorative gold quotation mark */}
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: reduce ? 0.12 : 0.14, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: SITE_EASE }}
          className="pointer-events-none absolute select-none font-serif text-gold leading-none"
          style={{
            top: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "clamp(14rem, 28vw, 26rem)",
            fontFamily: "'Cormorant Garamond', serif",
            lineHeight: 0.8,
          }}
        >
          “
        </motion.span>

        <div className="relative inline-block">
          <MaskedLines
            as="blockquote"
            trigger="in-view"
            stagger={0.16}
            delayChildren={0.25}
            lines={QUOTE_LINES}
            className="t-quote text-gold max-w-[48ch] relative z-10"
          />
          {!reduce && (
            <span aria-hidden className="quote-v2-sweep-clip">
              <span aria-hidden className="quote-v2-sweep quote-v2-loop" />
            </span>
          )}
        </div>

        <FadeRise trigger="child" className="mt-10 md:mt-12 flex flex-col items-center gap-4" delay={1.1}>
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: SITE_EASE, delay: 1.2 }}
            style={{ transformOrigin: "center" }}
            className="block h-px w-16"
          >
            <span
              className="block h-full w-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, hsl(var(--gold) / 0.8), transparent)",
              }}
            />
          </motion.span>
          <cite className="t-label text-off-white/55 not-italic">
            — Ralph Waldo Emerson
          </cite>
        </FadeRise>
      </SectionEnter>
    </section>
  );
};

export default QuoteV2;
