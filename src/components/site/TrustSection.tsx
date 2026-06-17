import { FadeRise, MaskedLines, SectionEnter } from "./motion";

/* ── Testimonial placeholders ──
   Swap in real quotes + attributions here when available.
   Each object: { quote: string, attribution: string } */
const PLACEHOLDER_QUOTES = [
  {
    quote:
      "Pull-quote from a client engagement will appear here. This space is reserved for a testimonial that speaks to the outcome of our work together.",
    attribution: "Name, Title, Company",
  },
  {
    quote:
      "Pull-quote from a client engagement will appear here. This space is reserved for a testimonial that speaks to the outcome of our work together.",
    attribution: "Name, Title, Company",
  },
  {
    quote:
      "Pull-quote from a client engagement will appear here. This space is reserved for a testimonial that speaks to the outcome of our work together.",
    attribution: "Name, Title, Company",
  },
] as const;

const HIGHLIGHTS = [
  { figure: "25+", label: "years leading finance, operations, and strategy" },
  { figure: "Multiple", label: "economic cycles steered as a sitting CFO" },
  { figure: "2", label: "elite credentials earned for the modern finance era" },
] as const;

const CREDENTIALS = [
  "Sitting Chief Financial Officer, professional services",
  "Fintech leadership certification, Duke University",
  "Executive masterclass: leading in the AI age, University of Chicago",
  "Deep experience across professional services and enterprise finance",
] as const;

/**
 * Trust section — testimonials and credibility.
 *
 * Part 1: editorial pull-quote placeholders on charcoal, ready for real
 * quotes. One large gold quotation mark as the section accent.
 *
 * Part 2: a dense credibility block — stat highlights on charcoal cards plus
 * a scannable credential list. Gold sparingly, on numbers only.
 */
const TrustSection = () => {
  return (
    <section className="relative bg-background text-off-white px-6 md:px-12 lg:px-20">
      {/* ── Part 1: Testimonials ───────────────────────────────── */}
      <SectionEnter
        as="div"
        aria-label="Client testimonials"
        className="pt-16 md:pt-24 pb-20 md:pb-28"
        amount={0.25}
      >
        <div className="mx-auto w-full max-w-[1100px]">
          <FadeRise
            trigger="child"
            as="p"
            className="font-sans uppercase tracking-[0.2em] text-xs text-off-white/50"
          >
            WHAT CLIENTS SAY
          </FadeRise>

          {/* Single disciplined gold accent for the testimonials part */}
          <FadeRise
            trigger="child"
            as="span"
            className="block mt-4 font-serif text-gold leading-none select-none"
            style={{ fontSize: "clamp(3rem, 5vw, 5rem)" }}
            aria-hidden="true"
          >
            &ldquo;
          </FadeRise>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PLACEHOLDER_QUOTES.map((item, i) => (
              <FadeRise
                key={i}
                trigger="child"
                as="blockquote"
                className="bg-secondary rounded-sm p-8 md:p-10"
              >
                <p
                  className="font-serif italic text-off-white/90"
                  style={{
                    fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)",
                    lineHeight: 1.35,
                  }}
                >
                  {item.quote}
                </p>
                <cite className="mt-6 block not-italic font-sans text-off-white/50 text-sm leading-relaxed">
                  {item.attribution}
                </cite>
              </FadeRise>
            ))}
          </div>
        </div>
      </SectionEnter>

      {/* ── Part 2: Credibility ────────────────────────────────── */}
      <SectionEnter
        as="div"
        aria-label="Credentials and track record"
        className="pb-24 md:pb-32"
        amount={0.25}
      >
        <div className="mx-auto w-full max-w-[1100px]">
          <FadeRise
            trigger="child"
            as="p"
            className="font-sans uppercase tracking-[0.2em] text-xs text-off-white/50"
          >
            THE TRACK RECORD
          </FadeRise>

          <MaskedLines
            as="h2"
            trigger="in-view"
            lines={[
              <>Twenty-five years at the</>,
              <>executive table.</>,
            ]}
            className="mt-5 font-serif tracking-tight text-off-white"
            style={{
              fontSize: "clamp(1.875rem, 3.8vw, 3.5rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
            }}
          />

          {/* Stat highlights */}
          <div className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {HIGHLIGHTS.map((item) => (
              <FadeRise
                key={item.label}
                trigger="child"
                as="div"
                className="bg-secondary rounded-sm p-7 md:p-9"
              >
                <span
                  className="font-serif text-gold leading-none"
                  style={{
                    fontSize: "clamp(2rem, 3vw, 2.75rem)",
                  }}
                >
                  {item.figure}
                </span>
                <p className="mt-3 font-sans text-off-white/80 leading-snug">
                  {item.label}
                </p>
              </FadeRise>
            ))}
          </div>

          {/* Credential lines */}
          <ul className="mt-10 md:mt-12 space-y-3 max-w-[52ch]">
            {CREDENTIALS.map((line) => (
              <li key={line} className="flex gap-3 items-start">
                <span
                  className="mt-2.5 h-px w-3 shrink-0 bg-off-white/25"
                  aria-hidden="true"
                />
                <span
                  className="font-sans text-off-white/70 leading-relaxed"
                  style={{ fontSize: "clamp(0.875rem, 1vw, 1rem)" }}
                >
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </SectionEnter>
    </section>
  );
};

export default TrustSection;
