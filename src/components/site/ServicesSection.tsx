import { FadeRise, MaskedLines, SectionEnter } from "./motion";

/**
 * Services section — the answer to the pain.
 *
 * Two substantial offer blocks, outcome-framed, sitting on a subtle charcoal
 * surface for depth against the near-black page ground. Editorial, dense, and
 * composed. Motion is quiet enhancement via shared primitives.
 */
const ServicesSection = () => {
  return (
    <SectionEnter
      as="section"
      aria-labelledby="services-heading"
      className="relative bg-background text-off-white px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-24 md:pb-32"
      amount={0.3}
    >
      <div className="mx-auto w-full max-w-[1100px]">
        {/* ── Section intro ────────────────────────────────────────── */}
        <FadeRise
          trigger="child"
          as="p"
          className="font-sans uppercase tracking-[0.2em] text-xs text-off-white/50"
        >
          THE THIRD OPTION
        </FadeRise>

        <MaskedLines
          as="h2"
          trigger="in-view"
          lines={[
            <>Forward-looking financial leadership,</>,
            <>built to your stage.</>,
          ]}
          className="mt-5 font-serif tracking-tight text-off-white"
          style={{
            fontSize: "clamp(1.875rem, 3.8vw, 3.5rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
          }}
        />

        <FadeRise
          trigger="child"
          as="p"
          className="mt-5 md:mt-6 font-sans leading-relaxed text-off-white/70 max-w-[60ch]"
          style={{ fontSize: "clamp(1rem, 1.15vw, 1.125rem)" }}
        >
          Two ways to engage, each designed around where your company is now
          and where it needs to be in a year.
        </FadeRise>

        {/* ── Two offers ───────────────────────────────────────────── */}
        <div className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Offer One */}
          <FadeRise
            trigger="child"
            as="div"
            className="bg-secondary rounded-sm p-8 md:p-10 lg:p-12"
          >
            <p className="font-sans uppercase tracking-[0.15em] text-xs font-medium text-gold">
              ONGOING / RETAINER
            </p>

            <h3
              className="mt-4 font-serif text-off-white"
              style={{
                fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              Your CFO, without the full-time line item.
            </h3>

            <p
              className="mt-4 font-sans leading-relaxed text-off-white/70"
              style={{ fontSize: "clamp(0.9375rem, 1.1vw, 1.0625rem)" }}
            >
              Monthly financial leadership for companies that need the strategy,
              structure, and foresight of a CFO but not the overhead of hiring
              one. You get a partner in the numbers, every month, not a report
              after the fact.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Forecasting and planning you can actually steer by",
                "Board-ready reporting that tells the story, not just the totals",
                "A financial operating rhythm that scales with you",
              ].map((bullet) => (
                <li key={bullet} className="flex gap-3 items-start">
                  <span
                    className="mt-2.5 h-px w-3 shrink-0 bg-off-white/25"
                    aria-hidden="true"
                  />
                  <span
                    className="font-sans text-off-white/80 leading-relaxed"
                    style={{
                      fontSize: "clamp(0.875rem, 1vw, 1rem)",
                    }}
                  >
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </FadeRise>

          {/* Offer Two */}
          <FadeRise
            trigger="child"
            as="div"
            className="bg-secondary rounded-sm p-8 md:p-10 lg:p-12"
          >
            <p className="font-sans uppercase tracking-[0.15em] text-xs font-medium text-gold">
              STRATEGIC / ENGAGEMENT
            </p>

            <h3
              className="mt-4 font-serif text-off-white"
              style={{
                fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              The intensive that clears the ceiling.
            </h3>

            <p
              className="mt-4 font-sans leading-relaxed text-off-white/70"
              style={{ fontSize: "clamp(0.9375rem, 1.1vw, 1.0625rem)" }}
            >
              A focused engagement for a specific inflection point: a raise, a
              transformation, M&A readiness, or a planning reset. We go deep,
              build the architecture, and leave you with a system that holds.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Capital structure and cash strategy built for the next stage",
                "Finance-function modernization that removes scaling friction",
                "M&A and transaction readiness when the moment comes",
              ].map((bullet) => (
                <li key={bullet} className="flex gap-3 items-start">
                  <span
                    className="mt-2.5 h-px w-3 shrink-0 bg-off-white/25"
                    aria-hidden="true"
                  />
                  <span
                    className="font-sans text-off-white/80 leading-relaxed"
                    style={{
                      fontSize: "clamp(0.875rem, 1vw, 1rem)",
                    }}
                  >
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </FadeRise>
        </div>
      </div>
    </SectionEnter>
  );
};

export default ServicesSection;
