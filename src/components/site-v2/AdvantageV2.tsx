import { SectionEnter, FadeRise } from "@/components/site/motion";

const AdvantageV2 = () => {
  return (
    <SectionEnter
      as="section"
      aria-label="The Golden Road Advantage"
      className="relative isolate overflow-hidden bg-background text-off-white px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-24 md:pb-32"
      amount={0.2}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 60% at 50% 0%, hsl(30 4% 18% / 0.55) 0%, transparent 60%), radial-gradient(70% 50% at 50% 100%, hsl(40 74% 62% / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[820px] text-center">
        <FadeRise trigger="child" as="p" className="t-eyebrow text-gold/80">
          THE GOLDEN ROAD ADVANTAGE
        </FadeRise>

        <FadeRise trigger="child" as="h3" className="mt-6 t-h3 text-off-white">
          The Modern Approach to Financial Consulting
        </FadeRise>

        <FadeRise trigger="child" as="p" className="mt-6 t-lead text-off-white/70">
          Traditional consulting firms hand over complex, static slide decks and walk away. Traditional accountants look backward, only telling you where your money went. Golden Road Strategies looks forward.
        </FadeRise>

        <FadeRise trigger="child" as="p" className="mt-5 t-body text-off-white/65">
          Our approach brings together decades of deep corporate finance leadership and executive-level operator expertise. Having sat at the executive table and steered professional services and enterprise firms through varied economic cycles, we understand that numbers tell a story—and dictate a path. We bridge the gap between high-level operational strategy and fiscal execution, ensuring you have the road, the map, and the capital efficiency to get to your destination faster.
        </FadeRise>

        <div
          aria-hidden
          className="mx-auto my-14 md:my-16 h-px w-24 bg-gold/40"
        />

        <FadeRise trigger="child" as="h3" className="t-h3 text-off-white">
          Our Commitment to Impact
        </FadeRise>

        <FadeRise trigger="child" as="p" className="mt-6 t-lead text-off-white/70">
          We don't just optimize for short-term margins—we believe in building resilient, future-proof organizations that create lasting, positive equity for stakeholders, teams, and the broader communities they serve.
        </FadeRise>
      </div>
    </SectionEnter>
  );
};

export default AdvantageV2;
