import { FadeRise, MaskedLines, SectionEnter } from "./motion";
import PainScene from "./PainScene";

/**
 * Full editorial frame around the existing pinned Pain scene.
 *
 * Three beats:
 *  1. Lead-in (normal flow) — names the ICP's situation.
 *  2. Pinned ceiling scene (unchanged) — the cinematic moment.
 *  3. Resolution (normal flow) — cost of staying stuck + gold bridge line
 *     into services.
 *
 * Only the middle scene is pinned. The lead-in and resolution flow
 * normally and use the shared motion primitives so timing matches the
 * rest of the site. Reduced motion is handled by the primitives and by
 * PainScene itself.
 */
const PainSection = () => {
  return (
    <>
      {/* ── 1. Lead-in ───────────────────────────────────────────── */}
      <SectionEnter
        as="section"
        aria-labelledby="pain-lead-heading"
        className="relative bg-background text-off-white px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-16 md:pb-20"
        amount={0.35}
      >
        <div className="mx-auto w-full max-w-[1100px]">
          <FadeRise
            trigger="child"
            as="p"
            className="font-sans uppercase tracking-[0.2em] text-xs text-off-white/50"
          >
            The Ceiling
          </FadeRise>

          <MaskedLines
            as="h2"
            trigger="in-view"
            lines={[
              <>You did everything right.</>,
              <>The growth still stalled.</>,
            ]}
            className="mt-5 font-serif tracking-tight text-off-white"
            style={{
              fontSize: "clamp(1.875rem, 4.4vw, 4rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
            }}
          />

          <FadeRise
            trigger="child"
            as="p"
            className="mt-6 md:mt-8 font-sans leading-relaxed text-off-white/70 max-w-[52ch]"
            style={{ fontSize: "clamp(1rem, 1.2vw, 1.2rem)" }}
          >
            You hit a number. Maybe five million, maybe forty. Revenue climbs,
            but the company stops feeling like it&rsquo;s scaling. Hiring gets
            heavier. Decisions get slower. The numbers come in late and tell
            you what already happened.
          </FadeRise>
        </div>
      </SectionEnter>

      {/* ── 2. Pinned ceiling scene (unchanged) ─────────────────── */}
      <PainScene />

      {/* ── 3. Resolution + handoff ─────────────────────────────── */}
      <SectionEnter
        as="section"
        aria-labelledby="pain-resolve-heading"
        className="relative bg-background text-off-white px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-24 md:pb-32"
        amount={0.35}
      >
        <div className="mx-auto w-full max-w-[1100px]">
          <MaskedLines
            as="h3"
            trigger="in-view"
            lines={[
              <>The problem was never the ambition.</>,
              <>It was the architecture.</>,
            ]}
            className="font-serif tracking-tight text-off-white"
            style={{
              fontSize: "clamp(1.625rem, 3.4vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          />

          <FadeRise
            trigger="child"
            as="p"
            className="mt-6 md:mt-8 font-sans leading-relaxed text-off-white/70 max-w-[52ch]"
            style={{ fontSize: "clamp(1rem, 1.2vw, 1.2rem)" }}
          >
            Backward-looking accounting tells you where the money went. A
            full-time CFO is overhead you are not ready to carry. So the gap
            stays open, and every quarter you wait, the ceiling holds.
          </FadeRise>

          {/* The single deliberate gold moment of the section — the
              narrative hinge from pain into services. */}
          <FadeRise
            trigger="child"
            as="p"
            className="mt-12 md:mt-14 font-serif italic text-gold"
            style={{
              fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.005em",
            }}
          >
            There is a third option.
          </FadeRise>
        </div>
      </SectionEnter>
    </>
  );
};

export default PainSection;
