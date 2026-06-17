import { FadeRise, MaskedLines, SectionEnter } from "./motion";

const PHASES = [
  {
    num: "01",
    name: "Assessment",
    desc: "We map your financial reality: the numbers, the systems, the friction. You get an honest read on what's holding the ceiling in place.",
  },
  {
    num: "02",
    name: "Planning",
    desc: "We design the architecture: the forecasting, structure, and strategy your next stage requires. You leave with a plan you can steer by.",
  },
  {
    num: "03",
    name: "Implementation",
    desc: "We build it into how the company runs: systems modernized, reporting sharpened, the financial operating rhythm in place.",
  },
  {
    num: "04",
    name: "Optimization",
    desc: "We refine as you scale, so the infrastructure keeps carrying you. The path stays clear as the company grows.",
  },
] as const;

/**
 * Process section — a four-phase engagement path.
 *
 * A connected, editorial sequence showing how working with Golden Road
 * unfolds. Horizontal progression on desktop with a thin connecting rule;
 * vertical spine on mobile. Gold on phase numbers only. Dense and composed,
 * not a busy infographic.
 */
const ProcessSection = () => {
  return (
    <SectionEnter
      as="section"
      aria-labelledby="process-heading"
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
          THE ENGAGEMENT
        </FadeRise>

        <MaskedLines
          as="h2"
          trigger="in-view"
          lines={[
            <>A clear path from where you are</>,
            <>to where you're going.</>,
          ]}
          className="mt-5 font-serif tracking-tight text-off-white"
          style={{
            fontSize: "clamp(1.875rem, 3.8vw, 3.5rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
          }}
        />

        {/* ── Four phases ──────────────────────────────────────────── */}
        {/*
          Desktop: horizontal 4-step with a thin connecting rule running
          behind the phase numbers. Mobile: vertical stack with a left spine.
        */}
        <div className="mt-14 md:mt-20 relative">
          {/* Connecting line — desktop horizontal, mobile vertical spine */}
          <div
            className="absolute hidden md:block top-[1.35rem] left-0 right-0 h-px bg-off-white/15"
            aria-hidden="true"
          />
          <div
            className="absolute md:hidden top-0 bottom-0 left-[1.35rem] w-px bg-off-white/15"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 lg:gap-8">
            {PHASES.map((phase, i) => (
              <FadeRise
                key={phase.num}
                trigger="child"
                as="div"
                className="relative"
              >
                {/* Number + name cluster */}
                <div className="flex items-start gap-4 md:block md:gap-0">
                  {/* Gold number — sits on the line on desktop, beside spine on mobile */}
                  <span
                    className="block font-serif text-gold leading-none shrink-0 md:mb-5"
                    style={{
                      fontSize: "clamp(1.75rem, 2.4vw, 2.25rem)",
                    }}
                  >
                    {phase.num}
                  </span>

                  <div className="md:pt-0">
                    <h3
                      className="font-serif text-off-white"
                      style={{
                        fontSize: "clamp(1.25rem, 1.8vw, 1.625rem)",
                        lineHeight: 1.2,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {phase.name}
                    </h3>

                    <p
                      className="mt-3 font-sans leading-relaxed text-off-white/70"
                      style={{
                        fontSize: "clamp(0.875rem, 1vw, 1rem)",
                      }}
                    >
                      {phase.desc}
                    </p>
                  </div>
                </div>
              </FadeRise>
            ))}
          </div>
        </div>
      </div>
    </SectionEnter>
  );
};

export default ProcessSection;
