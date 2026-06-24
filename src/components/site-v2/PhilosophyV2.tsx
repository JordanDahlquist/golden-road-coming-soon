import { SectionEnter, FadeRise } from "@/components/site/motion";

const PhilosophyV2 = () => {
  return (
    <section className="bg-background text-off-white">
      <SectionEnter
        as="div"
        className="mx-auto flex max-w-[900px] flex-col items-center px-6 py-24 text-center md:px-12 md:py-32 lg:py-40"
      >
        <FadeRise trigger="child" className="w-full">
          <div className="mx-auto mb-8 h-px w-16 bg-gold/60 md:mb-10" aria-hidden="true" />
        </FadeRise>
        <h2 className="t-h3 text-gold max-w-[30ch]">
          See further. Build smarter. Lead the way.
        </h2>
        <FadeRise
          trigger="child"
          className="mt-8 md:mt-10"
        >
          <p className="t-lead text-off-white/70 max-w-[60ch]">
            Vision without financial architecture is just a wish. In an era of economic volatility and rapid disruption, true industry leaders don't just adapt—they engineer their growth. We create clarity out of chaos, aligning operational ambition with fiscal discipline to transform enterprise vision into measurable corporate value.
          </p>
        </FadeRise>
      </SectionEnter>
    </section>
  );
};

export default PhilosophyV2;
