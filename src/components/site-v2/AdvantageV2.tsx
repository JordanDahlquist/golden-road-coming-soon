import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SectionEnter, FadeRise, MaskedLines } from "@/components/site/motion";
import { SITE_EASE } from "@/lib/motion";

const AdvantageV2 = () => {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement | null>(null);
  const block1Ref = useRef<HTMLDivElement | null>(null);
  const block2Ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress: s1 } = useScroll({
    target: block1Ref,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: s2 } = useScroll({
    target: block2Ref,
    offset: ["start end", "end start"],
  });

  // Gentle parallax — heading column drifts slightly slower than body.
  const head1Y = useTransform(s1, [0, 1], reduce ? [0, 0] : [40, -40]);
  const body1Y = useTransform(s1, [0, 1], reduce ? [0, 0] : [10, -10]);
  const head2Y = useTransform(s2, [0, 1], reduce ? [0, 0] : [40, -40]);
  const body2Y = useTransform(s2, [0, 1], reduce ? [0, 0] : [10, -10]);

  const igniteVariants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: reduce ? 0 : 1.1, ease: SITE_EASE, delay: reduce ? 0 : 0.35 },
    },
  } as const;

  return (
    <SectionEnter
      as="section"
      aria-label="The Golden Road Advantage"
      className="relative isolate overflow-hidden bg-background text-off-white px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-24 md:pb-32"
      amount={0.15}
    >
      {/* Background depth: charcoal-to-near-black with a very soft low gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, hsl(30 4% 9%) 0%, hsl(30 4% 6%) 100%), radial-gradient(60% 40% at 50% 110%, hsl(40 74% 62% / 0.07) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[40%]"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 100%, hsl(40 74% 62% / 0.06) 0%, transparent 70%)",
        }}
      />

      <style>{`
        /* Quiet static gold halo behind emphasized italic phrases.
           Static (not animated) to avoid per-frame repaints during scroll. */
        .adv-emph {
          text-shadow: 0 0 6px hsl(40 74% 62% / 0.18);
        }
      `}</style>

      <div className="relative mx-auto w-full max-w-6xl">
        {/* BLOCK 1 — heading left, body right */}
        <div
          ref={block1Ref}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start"
        >
          <motion.div
            style={{ y: head1Y }}
            className="md:col-span-5 md:sticky md:top-28 self-start"
          >
            <FadeRise trigger="in-view" as="p" className="t-eyebrow text-gold/80">
              THE GOLDEN ROAD ADVANTAGE
            </FadeRise>
            <FadeRise
              trigger="in-view"
              as="div"
              className="mt-6 font-serif text-gold/90 leading-none select-none"
              style={{ fontSize: "clamp(4rem, 9vw, 7.5rem)" }}
            >
              01
            </FadeRise>
            <MaskedLines
              as="h3"
              trigger="in-view"
              className="mt-6 t-h3 text-off-white"
              lines={["The Modern Approach", "to Financial Consulting"]}
            />
          </motion.div>

          <motion.div style={{ y: body1Y }} className="md:col-span-7 md:pt-4">
            <FadeRise trigger="in-view" as="p" className="t-lead text-off-white/75">
              Traditional consulting firms hand over complex, static slide decks and walk away. Traditional accountants look backward, only telling you where your money went.{" "}
              <motion.span
                variants={igniteVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                className="adv-emph inline font-serif italic text-gold"
                style={{ fontSize: "1.18em" }}
              >
                Golden Road Strategies looks forward.
              </motion.span>
            </FadeRise>

            <FadeRise trigger="in-view" as="p" className="mt-6 t-body text-off-white/65">
              Our approach brings together decades of deep corporate finance leadership and executive-level operator expertise. Having sat at the executive table and steered professional services and enterprise firms through varied economic cycles, we understand that numbers tell a story—and dictate a path. We bridge the gap between high-level operational strategy and fiscal execution, ensuring you have the road, the map, and the capital efficiency to get to your destination faster.
            </FadeRise>
          </motion.div>
        </div>

        {/* Divider — draws in on scroll */}
        <motion.div
          aria-hidden
          initial={{ scaleX: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduce ? 0 : 1.1, ease: SITE_EASE }}
          style={{ transformOrigin: "left center" }}
          className="my-20 md:my-28 h-px w-full bg-gold/40"
        />

        {/* BLOCK 2 — heading right, body left (mirrored) */}
        <div
          ref={block2Ref}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start"
        >
          <motion.div
            style={{ y: body2Y }}
            className="md:col-span-7 md:order-1 md:pt-4"
          >
            <FadeRise trigger="in-view" as="p" className="t-lead text-off-white/75">
              We don't just optimize for short-term margins—we believe in building{" "}
              <motion.span
                variants={igniteVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                className="adv-emph inline font-serif italic text-gold"
                style={{ fontSize: "1.12em" }}
              >
                resilient, future-proof organizations
              </motion.span>{" "}
              that create lasting, positive equity for stakeholders, teams, and the broader communities they serve.
            </FadeRise>
          </motion.div>

          <motion.div
            style={{ y: head2Y }}
            className="md:col-span-5 md:order-2 md:sticky md:top-28 self-start md:text-right"
          >
            <FadeRise
              trigger="in-view"
              as="div"
              className="font-serif text-gold/90 leading-none select-none"
              style={{ fontSize: "clamp(4rem, 9vw, 7.5rem)" }}
            >
              02
            </FadeRise>
            <MaskedLines
              as="h3"
              trigger="in-view"
              className="mt-6 t-h3 text-off-white"
              lines={["Our Commitment", "to Impact"]}
            />
          </motion.div>
        </div>

        {/* Closing CTA */}
        <FadeRise
          trigger="in-view"
          as="div"
          delay={0.25}
          className="mt-20 md:mt-28 flex justify-center"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gold px-9 py-4 text-charcoal text-sm font-medium tracking-[0.18em] uppercase transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {/* GPU-only glow layer — only opacity animates on hover. */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-full opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 motion-reduce:hidden"
              style={{
                background:
                  "radial-gradient(ellipse at center, hsl(40 74% 62% / 0.6) 0%, hsl(40 74% 62% / 0.2) 45%, transparent 75%)",
                filter: "blur(16px)",
              }}
            />
            <span className="relative z-10">Let's Build the Path Forward</span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full motion-reduce:hidden"
            />
          </a>
        </FadeRise>
      </div>
    </SectionEnter>
  );
};

export default AdvantageV2;
