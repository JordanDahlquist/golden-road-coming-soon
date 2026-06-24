import { SectionEnter, FadeRise } from "@/components/site/motion";

const QuoteV2 = () => {
  return (
    <section className="bg-background text-off-white">
      <SectionEnter
        as="div"
        className="mx-auto flex max-w-[720px] flex-col items-center px-6 py-24 text-center md:px-12 md:py-32 lg:py-40"
      >
        <FadeRise trigger="child" className="w-full">
          <span className="t-display text-gold/25 leading-none" aria-hidden="true">
            "
          </span>
        </FadeRise>
        <FadeRise trigger="child" className="-mt-4 md:-mt-6">
          <blockquote className="t-quote text-gold max-w-[48ch]">
            Do not go where the path may lead, go instead where there is no path and leave a trail.
          </blockquote>
        </FadeRise>
        <FadeRise trigger="child" className="mt-8 md:mt-10">
          <cite className="t-label text-off-white/50 not-italic">
            — Ralph Waldo Emerson
          </cite>
        </FadeRise>
      </SectionEnter>
    </section>
  );
};

export default QuoteV2;
