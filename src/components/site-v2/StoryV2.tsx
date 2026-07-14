import { motion, useReducedMotion } from "framer-motion";
import tracyPortrait from "@/assets/tracy-portrait.webp.asset.json";
import { FadeRise, MaskedLines, SectionEnter } from "@/components/site/motion";
import { SITE_EASE } from "@/lib/motion";

const StoryV2 = () => {
  const reduceMotion = useReducedMotion();

  return (
    <SectionEnter
      as="section"
      className="relative bg-background text-off-white px-6 md:px-12 lg:px-20 pt-20 md:pt-32 pb-24 md:pb-40 overflow-hidden"
      amount={0.2}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 18% 70%, hsl(var(--gold) / 0.10) 0%, transparent 60%), linear-gradient(180deg, transparent 0%, hsl(var(--charcoal-deep) / 0.35) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1180px]">
        <FadeRise trigger="child" as="p" className="t-eyebrow">
          MY STORY
        </FadeRise>

        <MaskedLines
          as="h2"
          trigger="in-view"
          lines={[<span key="1">The Strategy Behind the Ledger</span>]}
          className="mt-5 t-h2 text-off-white"
        />

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-14 lg:gap-20 items-start">
          <FadeRise
            trigger="child"
            as="div"
            className="md:col-span-5 relative w-full"
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-10 -z-10"
                style={{
                  background:
                    "radial-gradient(45% 45% at 15% 90%, hsl(var(--gold) / 0.22) 0%, transparent 70%)",
                  filter: "blur(10px)",
                }}
              />

              <div
                className="relative rounded-[14px] p-3 md:p-4"
                style={{
                  background: "hsl(var(--charcoal-deep))",
                  boxShadow:
                    "0 30px 80px -30px hsl(var(--gold) / 0.18), 0 0 0 1px hsl(var(--off-white) / 0.04) inset",
                }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-6 right-1/3 h-px bg-gold/70"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-6 bottom-1/3 left-0 w-px bg-gold/70"
                />

                <div
                  className="relative aspect-[3/4] w-full overflow-hidden rounded-[10px]"
                  style={{ background: "hsl(var(--charcoal))" }}
                >
                  <img
                    src={tracyPortrait.url}
                    alt="Portrait of Tracy Golden, Founder of Golden Road Strategies"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter:
                        "brightness(0.88) contrast(1.04) saturate(0.85) sepia(0.18)",
                    }}
                    loading="lazy"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(160deg, hsl(var(--gold) / 0.18) 0%, transparent 45%, hsl(var(--charcoal-deep) / 0.55) 100%)",
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 55%, hsl(var(--background) / 0.55) 100%)",
                    }}
                  />

                  {!reduceMotion && (
                    <motion.div
                      aria-hidden="true"
                      className="absolute inset-y-0 -left-1/3 w-1/2 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(110deg, transparent 0%, hsl(var(--gold) / 0.28) 50%, transparent 100%)",
                        
                      }}
                      initial={{ x: "-40%", opacity: 0 }}
                      whileInView={{ x: "260%", opacity: [0, 1, 0] }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 1.6,
                        ease: SITE_EASE,
                        delay: 0.25,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <FadeRise trigger="child" as="div" className="mt-10 md:mt-12">
              <div className="relative flex gap-6 md:gap-7 items-start">
                <div className="relative shrink-0 self-stretch w-px">
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 bg-gold"
                    initial={{ height: reduceMotion ? "100%" : "0%" }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.9,
                      ease: SITE_EASE,
                      delay: 0.15,
                    }}
                  />
                </div>
                <div>
                  <p className="t-card-title italic text-off-white/95">
                    Numbers tell a story, but leadership writes the script. At Golden Road Strategies, we ensure you have the financial foundation to execute your next chapter with absolute certainty.
                  </p>
                  <p className="mt-5 t-body-sm text-off-white/55 tracking-wide">
                    Tracy Golden, Founder &amp; Principal Advisory Partner
                  </p>
                </div>
              </div>
            </FadeRise>

          </FadeRise>

          <div className="md:col-span-7 flex flex-col gap-9 md:gap-11">
            <FadeRise trigger="child" as="div">
              <p className="t-h3 text-off-white">
                I didn't learn corporate strategy from a textbook; I built it at the executive table.
              </p>
            </FadeRise>

            <FadeRise trigger="child" as="div">
              <p className="t-body text-off-white/70 max-w-[60ch]">
                With 30+ years of experience leading finance, operations and corporate strategy within high-stakes professional services environments, I've served as the architect behind sustainable scale, system modernizations, and complex enterprise growth. As a seasoned Chief Financial Officer, I have navigated organizations through diverse economic cycles, restructuring legacy operations into agile, high-margin strategic assets.
              </p>
            </FadeRise>

            <FadeRise trigger="child" as="div">
              <p className="t-body text-off-white/70 max-w-[60ch]">
                Throughout my career, I noticed a consistent gap in the market. CEOs and founders possess boundless vision, but they are often forced to choose between backwards-looking accounting firms or aloof management consultants who don't understand operational reality.
              </p>
            </FadeRise>

            <FadeRise trigger="child" as="div">
              <p className="t-body text-off-white/85 max-w-[60ch]">
                I founded Golden Road Strategies to bridge that exact gap.
              </p>
            </FadeRise>

            <FadeRise trigger="child" as="div">
              <p className="t-body text-off-white/70 max-w-[60ch]">
                We provide elite, forward-looking strategic financial leadership for organizations that have outgrown traditional accounting but aren't looking for the rigid overhead of a traditional, full-time executive placement. By blending the commercial foresight of a strategic growth advisor with the fiscal discipline of a battle-tested CFO, I help modern leadership teams cut through economic noise, protect their enterprise value, and clear a predictable path to the future.
              </p>
            </FadeRise>

          </div>
        </div>
      </div>
    </SectionEnter>
  );
};

export default StoryV2;
