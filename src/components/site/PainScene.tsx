import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SITE_EASE } from "@/lib/motion";
import { MaskedLines } from "./motion";

/**
 * Pain ceiling scene — trigger-once, normal flow (no pinning).
 *
 * When the section scrolls into view, a short sequence plays once:
 *   1. Headline rises (masked line reveal).
 *   2. Gold hairline (already visible) splits apart and fades out.
 *   3. Sub-line fades + rises into place.
 *
 * Total ≈ 1.6s. After it plays, the section holds in its final state
 * and scrolls naturally with the rest of the page.
 *
 * Reduced motion: renders the final, resolved state with no transforms
 * or transitions.
 */
const PainScene = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const play = inView;

  if (reduce) {
    return (
      <section
        aria-labelledby="pain-heading"
        className="relative bg-background text-off-white px-6 md:px-12 lg:px-20 py-24 md:py-32"
      >
        <div className="mx-auto w-full max-w-[1100px]">
          <div
            className="h-px w-full max-w-[640px] bg-gold/60 mb-10 md:mb-14"
            aria-hidden="true"
          />
          <h2
            id="pain-heading"
            className="font-serif tracking-tight text-off-white"
            style={{
              fontSize: "clamp(2.25rem, 6vw, 5.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            Growth isn&rsquo;t your problem.
            <br />
            Your infrastructure is.
          </h2>
          <p
            className="mt-8 md:mt-10 font-sans leading-relaxed text-off-white/70 max-w-[52ch]"
            style={{ fontSize: "clamp(1rem, 1.2vw, 1.2rem)" }}
          >
            You&rsquo;re scaling past what your financial systems were built to
            carry. The ceiling isn&rsquo;t the market. It&rsquo;s the
            architecture underneath you.
          </p>
        </div>
      </section>
    );
  }

  // Sequence timing (seconds)
  const T_HEADLINE = 0;     // MaskedLines fires on its own in-view trigger
  const T_SPLIT = 0.55;     // hairline splits + fades
  const T_SUB = 0.95;       // sub-line rises in

  return (
    <section
      ref={ref}
      aria-labelledby="pain-heading"
      className="relative bg-background text-off-white px-6 md:px-12 lg:px-20 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1100px]">
        {/* Gold hairline: present, then splits apart + fades */}
        <div
          className="relative w-full flex items-center justify-center mb-10 md:mb-14"
          aria-hidden="true"
          style={{ height: "1px" }}
        >
          <motion.span
            className="absolute right-1/2 block h-px bg-gold"
            initial={{ width: "40%", x: 0, opacity: 0.9 }}
            animate={play ? { width: "50%", x: -260, opacity: 0 } : undefined}
            transition={{ duration: 1.0, ease: SITE_EASE, delay: T_SPLIT }}
            style={{ transformOrigin: "right center", willChange: "transform, opacity, width" }}
          />
          <motion.span
            className="absolute left-1/2 block h-px bg-gold"
            initial={{ width: "40%", x: 0, opacity: 0.9 }}
            animate={play ? { width: "50%", x: 260, opacity: 0 } : undefined}
            transition={{ duration: 1.0, ease: SITE_EASE, delay: T_SPLIT }}
            style={{ transformOrigin: "left center", willChange: "transform, opacity, width" }}
          />
        </div>

        {/* Headline — MaskedLines triggers on its own in-view */}
        <MaskedLines
          as="h2"
          trigger="in-view"
          delayChildren={T_HEADLINE}
          lines={[
            <>Growth isn&rsquo;t your problem.</>,
            <>Your infrastructure is.</>,
          ]}
          className="font-serif tracking-tight text-off-white"
          style={{
            fontSize: "clamp(2.25rem, 6vw, 5.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
          }}
        />

        {/* Sub-line — fades/rises after the split */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={play ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: SITE_EASE, delay: T_SUB }}
          className="mt-8 md:mt-10 font-sans leading-relaxed text-off-white/70 max-w-[52ch]"
          style={{
            fontSize: "clamp(1rem, 1.2vw, 1.2rem)",
            willChange: "transform, opacity",
          }}
        >
          You&rsquo;re scaling past what your financial systems were built to
          carry. The ceiling isn&rsquo;t the market. It&rsquo;s the
          architecture underneath you.
        </motion.p>
      </div>
    </section>
  );
};

export default PainScene;
