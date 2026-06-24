import { motion, useReducedMotion } from "framer-motion";
import tracyPortrait from "@/assets/tracy-portrait.webp.asset.json";
import { FadeRise, MaskedLines, SectionEnter } from "./motion";
import { SITE_EASE } from "@/lib/motion";

/**
 * Story section — founder bio.
 *
 * Asymmetric editorial split. Framed, warmly-graded portrait on a charcoal
 * card with an asymmetric gold hairline and a soft warm glow behind it.
 * Text column: lead-in, body, gold-accented pull-quote, attribution,
 * credibility chips. All staggers respect prefers-reduced-motion.
 */
const StorySection = () => {
  const reduceMotion = useReducedMotion();

  return (
    <SectionEnter
      as="section"
      className="relative bg-background text-off-white px-6 md:px-12 lg:px-20 pt-20 md:pt-32 pb-24 md:pb-40 overflow-hidden"
      amount={0.2}
    >
      {/* ── Ambient depth ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 18% 70%, hsl(var(--gold) / 0.10) 0%, transparent 60%), linear-gradient(180deg, transparent 0%, hsl(var(--charcoal-deep) / 0.35) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1180px]">
        {/* ── Section intro ────────────────────────────────────────── */}
        <FadeRise
          trigger="child"
          as="p"
          className="t-eyebrow"
        >
          MY STORY
        </FadeRise>

        <MaskedLines
          as="h2"
          trigger="in-view"
          lines={[<span key="1">The strategy behind the ledger.</span>]}
          className="mt-5 t-h2 text-off-white"
        />

        {/* ── Two-column split ─────────────────────────────────────── */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-14 lg:gap-20 items-start">
          {/* Portrait — ~45% */}
          <FadeRise
            trigger="child"
            as="div"
            className="md:col-span-5 relative w-full"
          >
            <div className="relative">
              {/* warm glow bleed behind corner */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-10 -z-10"
                style={{
                  background:
                    "radial-gradient(45% 45% at 15% 90%, hsl(var(--gold) / 0.22) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* charcoal card */}
              <div
                className="relative rounded-[14px] p-3 md:p-4"
                style={{
                  background: "hsl(var(--charcoal-deep))",
                  boxShadow:
                    "0 30px 80px -30px hsl(var(--gold) / 0.18), 0 0 0 1px hsl(var(--off-white) / 0.04) inset",
                }}
              >
                {/* asymmetric gold hairlines (top + left) */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-6 right-1/3 h-px bg-gold/70"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-6 bottom-1/3 left-0 w-px bg-gold/70"
                />

                {/* framed portrait */}
                <div
                  className="relative aspect-[3/4] w-full overflow-hidden rounded-[10px]"
                  style={{ background: "hsl(var(--charcoal))" }}
                >
                  <img
                    src={tracyPortrait.url}
                    alt="Portrait of Tracy Golden, Founder of Golden Road Strategies"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter:
                        "brightness(0.88) contrast(1.04) saturate(0.85) sepia(0.18)",
                    }}
                    loading="lazy"
                  />
                  {/* warm grade overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 mix-blend-soft-light"
                    style={{
                      background:
                        "linear-gradient(160deg, hsl(var(--gold) / 0.18) 0%, transparent 45%, hsl(var(--charcoal-deep) / 0.55) 100%)",
                    }}
                  />
                  {/* shadow deepen bottom */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 55%, hsl(var(--background) / 0.55) 100%)",
                    }}
                  />

                  {/* one-time gold sweep on reveal */}
                  {!reduceMotion && (
                    <motion.div
                      aria-hidden="true"
                      className="absolute inset-y-0 -left-1/3 w-1/2 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(110deg, transparent 0%, hsl(var(--gold) / 0.28) 50%, transparent 100%)",
                        mixBlendMode: "screen",
                      }}
                      initial={{ x: "-40%", opacity: 0 }}
                      whileInView={{ x: "260%", opacity: [0, 1, 0] }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 1.6,
                        ease: SITE_EASE,
                        delay: 0.25,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </FadeRise>

          {/* Text column — ~55% */}
          <div className="md:col-span-7 flex flex-col gap-9 md:gap-11">
            {/* Lead line */}
            <FadeRise trigger="child" as="div">
              <p
                className="font-serif text-off-white"
                style={{
                  fontSize: "clamp(1.375rem, 2.1vw, 1.875rem)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.005em",
                }}
              >
                I didn't learn corporate strategy from a textbook. I built it at
                the executive table.
              </p>
            </FadeRise>

            {/* Body */}
            <FadeRise trigger="child" as="div">
              <p
                className="font-sans text-off-white/70 leading-relaxed max-w-[56ch]"
                style={{ fontSize: "clamp(0.9375rem, 1.05vw, 1.0625rem)" }}
              >
                Twenty-five years leading finance, operations, and strategy
                inside high-stakes professional services. As a sitting CFO, I've
                steered companies through full economic cycles and turned legacy
                operations into agile, high-margin assets.
              </p>
            </FadeRise>

            {/* Pull-quote */}
            <FadeRise trigger="child" as="div" className="mt-1">
              <div className="relative flex gap-6 md:gap-7 items-start">
                {/* animated gold vertical rule */}
                <div className="relative shrink-0 self-stretch w-px">
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 bg-gold"
                    initial={{ height: reduceMotion ? "100%" : "0%" }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.9,
                      ease: SITE_EASE,
                      delay: 0.15,
                    }}
                  />
                </div>
                <div>
                  <p
                    className="font-serif italic text-off-white/95"
                    style={{
                      fontSize: "clamp(1.25rem, 1.85vw, 1.75rem)",
                      lineHeight: 1.3,
                    }}
                  >
                    Most founders are forced to choose between a backward-looking
                    accountant and a consultant who doesn't understand
                    operations. I built Golden Road to be the third option.
                  </p>
                  <p className="mt-5 font-sans text-off-white/55 text-sm tracking-wide">
                    Tracy Golden, Founder &amp; Principal Advisory Partner
                  </p>
                </div>
              </div>
            </FadeRise>

            {/* Credibility chips */}
            <FadeRise trigger="child" as="div">
              <ul className="flex flex-wrap gap-2.5">
                {["Sitting CFO", "25+ Years", "Duke Fintech", "Chicago Booth AI"].map(
                  (chip) => (
                    <li
                      key={chip}
                      className="font-sans text-xs tracking-[0.14em] uppercase text-off-white/80 px-3.5 py-1.5 rounded-full"
                      style={{
                        border: "1px solid hsl(var(--gold) / 0.45)",
                        background: "hsl(var(--charcoal-deep) / 0.6)",
                      }}
                    >
                      {chip}
                    </li>
                  )
                )}
              </ul>
            </FadeRise>
          </div>
        </div>
      </div>
    </SectionEnter>
  );
};

export default StorySection;
