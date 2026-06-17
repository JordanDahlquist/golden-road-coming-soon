import { SectionEnter, FadeRise } from "./motion";

/**
 * LogoBar — Social proof / selected experience section.
 *
 * Six logo slots rendered as monochrome placeholders. When real logos arrive,
 * swap each <LogoPlaceholder> for an <img> with matching grayscale/opacity
 * treatment for visual consistency.
 *
 * Reduced motion: inherits from shared motion primitives (renders final state,
 * no transforms/transitions).
 */

const LogoPlaceholder = () => (
  <div className="flex items-center justify-center w-full">
    {/* Tasteful monochrome placeholder: thin rounded rectangle with subtle "Logo" affordance */}
    <div className="w-full max-w-[140px] h-10 md:h-12 rounded-[4px] border border-off-white/20 flex items-center justify-center">
      <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-off-white/30">
        Logo
      </span>
    </div>
  </div>
);

const LogoBar = () => {
  const slots = Array.from({ length: 6 }, (_, i) => i);

  return (
    <section className="relative bg-background py-14 md:py-20 px-6 md:px-12 lg:px-20">
      <div className="mx-auto w-full max-w-[1200px]">
        <SectionEnter delayChildren={0} staggerChildren={0.1}>
          {/* Label */}
          <FadeRise trigger="child" y={16} duration={0.6}>
            <p className="text-center font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-off-white/50 mb-8 md:mb-10">
              Selected experience
            </p>
          </FadeRise>

          {/* Logo grid */}
          <FadeRise trigger="child" y={20} duration={0.6}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10 md:gap-x-10 md:gap-y-12 items-center">
              {slots.map((i) => (
                <LogoPlaceholder key={i} />
              ))}
            </div>
          </FadeRise>
        </SectionEnter>
      </div>
    </section>
  );
};

export default LogoBar;
