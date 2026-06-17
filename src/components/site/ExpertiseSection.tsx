import { FadeRise, MaskedLines, SectionEnter } from "./motion";

const EXPERTISE = [
  {
    title: "FP&A & Forecasting",
    line: "Plans and models you can steer by, not just report on.",
  },
  {
    title: "Fractional CFO Leadership",
    line: "Executive financial judgment in the room, every month.",
  },
  {
    title: "Scalability Architecture",
    line: "The financial infrastructure to carry the next stage.",
  },
  {
    title: "Finance-Function Modernization",
    line: "Legacy finance turned into a tech-enabled asset.",
  },
  {
    title: "Risk & Governance",
    line: "Controls and structure that protect enterprise value.",
  },
  {
    title: "M&A Readiness",
    line: "Diligence-ready, transaction-ready, when the moment comes.",
  },
  {
    title: "Change Management",
    line: "The bridge from vision to financial reality.",
  },
] as const;

/**
 * Expertise section — a bento-style grid of capability areas.
 *
 * Editorial asymmetry on desktop: varied cell spans across a 12-column grid.
 * Charcoal surfaces on black ground, one disciplined gold accent per cell
 * (a small index number), type-driven hierarchy. Quiet staggered fade-rise
 * via shared primitives. Reduced-motion aware.
 */
const ExpertiseSection = () => {
  const spans = [
    "col-span-1 md:col-span-1 lg:col-span-7",
    "col-span-1 md:col-span-1 lg:col-span-5",
    "col-span-1 md:col-span-1 lg:col-span-4",
    "col-span-1 md:col-span-1 lg:col-span-4",
    "col-span-1 md:col-span-1 lg:col-span-4",
    "col-span-1 md:col-span-1 lg:col-span-6",
    "col-span-1 md:col-span-1 lg:col-span-6",
  ] as const;

  return (
    <SectionEnter
      as="section"
      aria-labelledby="expertise-heading"
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
          AREAS OF EXPERTISE
        </FadeRise>

        <MaskedLines
          as="h2"
          trigger="in-view"
          lines={[
            <>Depth across every part</>,
            <>of the finance function.</>,
          ]}
          className="mt-5 font-serif tracking-tight text-off-white"
          style={{
            fontSize: "clamp(1.875rem, 3.8vw, 3.5rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
          }}
        />

        {/* ── Bento grid ───────────────────────────────────────────── */}
        <div className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5 lg:gap-6">
          {EXPERTISE.map((item, i) => (
            <FadeRise
              key={item.title}
              trigger="child"
              as="div"
              className={`${spans[i]} bg-secondary rounded-sm p-7 md:p-9 lg:p-10`}
            >
              <span
                className="font-sans text-gold font-medium"
                style={{ fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3
                className="mt-3 font-serif text-off-white"
                style={{
                  fontSize: "clamp(1.25rem, 1.9vw, 1.75rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.005em",
                }}
              >
                {item.title}
              </h3>

              <p
                className="mt-3 font-sans leading-relaxed text-off-white/70"
                style={{
                  fontSize: "clamp(0.875rem, 1vw, 1rem)",
                }}
              >
                {item.line}
              </p>
            </FadeRise>
          ))}
        </div>
      </div>
    </SectionEnter>
  );
};

export default ExpertiseSection;
