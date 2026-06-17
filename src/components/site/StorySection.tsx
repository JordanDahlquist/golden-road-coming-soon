import { FadeRise, MaskedLines, SectionEnter } from "./motion";

/**
 * Story section — founder bio.
 *
 * Asymmetric editorial portrait composition. Portrait on one side,
 * scannable text on the other. Short lines, hierarchy, one gold accent
 * on the pull-quote. Warmth without breaking the dark luxury register.
 *
 * Portrait placeholder: swap the src in the <img> below when the real
 * photo asset is ready. The container styling will remain unchanged.
 */
const StorySection = () => {
  return (
    <SectionEnter
      as="section"
      className="relative bg-background text-off-white px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-24 md:pb-32"
      amount={0.25}
    >
      <div className="mx-auto w-full max-w-[1100px]">
        {/* ── Section intro ────────────────────────────────────────── */}
        <FadeRise
          trigger="child"
          as="p"
          className="font-sans uppercase tracking-[0.2em] text-xs text-off-white/50"
        >
          MY STORY
        </FadeRise>

        <MaskedLines
          as="h2"
          trigger="in-view"
          lines={[<span key="1">The strategy behind the ledger.</span>]}
          className="mt-5 font-serif tracking-tight text-off-white"
          style={{
            fontSize: "clamp(1.875rem, 3.8vw, 3.5rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
          }}
        />

        {/* ── Two-column portrait + text ───────────────────────────── */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Portrait */}
          <FadeRise trigger="child" as="div" className="relative w-full">
            <div className="relative aspect-[3/4] w-full bg-secondary overflow-hidden rounded-sm">
              {/*
                PORTFOLIO PLACEHOLDER
                Replace the <img> below with Tracy's actual photo when available.
                The .grayscale + .sepia + .brightness treatment keeps it in the
                dark editorial register; remove or adjust the filter classes
                if the supplied image is already graded for this palette.
              */}
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23302e2c'/%3E%3C/svg%3E"
                alt="Portrait of Tracy Golden"
                className="absolute inset-0 w-full h-full object-cover grayscale sepia-[.15] brightness-[.85]"
                loading="lazy"
              />
              {/* Subtle "Portrait" affordance over the placeholder */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-sans uppercase tracking-[0.25em] text-off-white/25 text-xs">
                  Portrait
                </span>
              </div>
            </div>
          </FadeRise>

          {/* Text column */}
          <div className="flex flex-col gap-8 md:gap-10">
            {/* Lead line */}
            <FadeRise trigger="child" as="div">
              <p
                className="font-sans text-off-white/90 leading-snug"
                style={{
                  fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)",
                  lineHeight: 1.35,
                }}
              >
                I didn't learn corporate strategy from a textbook. I built it at
                the executive table.
              </p>
            </FadeRise>

            {/* Body */}
            <FadeRise trigger="child" as="div">
              <p
                className="font-sans text-off-white/70 leading-relaxed max-w-[52ch]"
                style={{
                  fontSize: "clamp(0.875rem, 1vw, 1rem)",
                }}
              >
                Twenty-five years leading finance, operations, and strategy
                inside high-stakes professional services. As a sitting CFO, I've
                steered companies through full economic cycles and turned legacy
                operations into agile, high-margin assets.
              </p>
            </FadeRise>

            {/* Pull-quote — the single gold-accented moment */}
            <FadeRise trigger="child" as="div" className="mt-2">
              <div className="flex gap-5 md:gap-6 items-start">
                {/* Thin gold rule */}
                <span
                  className="mt-3 h-12 md:h-16 w-px bg-gold shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p
                    className="font-serif italic text-off-white/90"
                    style={{
                      fontSize: "clamp(1.25rem, 1.8vw, 1.625rem)",
                      lineHeight: 1.3,
                    }}
                  >
                    Most founders are forced to choose between a backward-looking
                    accountant and a consultant who doesn't understand operations. I
                    built Golden Road to be the third option.
                  </p>
                  <p className="mt-5 font-sans text-off-white/50 text-sm leading-relaxed">
                    Tracy Golden, Founder &amp; Principal Advisory Partner
                  </p>
                </div>
              </div>
            </FadeRise>
          </div>
        </div>
      </div>
    </SectionEnter>
  );
};

export default StorySection;
