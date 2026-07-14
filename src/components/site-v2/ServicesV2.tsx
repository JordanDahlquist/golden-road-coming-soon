import { motion, useReducedMotion } from "framer-motion";
import { RefreshCw, Target, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeRise, MaskedLines, SectionEnter, SITE_EASE } from "@/components/site/motion";

type Offer = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const OFFERS: [Offer, Offer] = [
  {
    icon: RefreshCw,
    title: "Strategic Planning & Capital Optimization",
    description:
      "We design custom, long-range financial blueprints for small to mid-market businesses and emerging enterprises looking to scale. From capital structure optimization and profitability forecasting to defining core KPIs, we build the sustainable financial engines that drive predictable growth.",
  },
  {
    icon: Target,
    title: "Fractional CFO & Operational Modernization",
    description:
      "We provide high-impact, fractional CFO-level leadership to streamline corporate governance, enhance risk management, and guide financial transformation. By modernizing your systems, data flows, and finance infrastructure, we empower your team to execute with absolute agility.",
  },
];

const ServicesV2 = () => {
  const reduce = useReducedMotion() ?? false;

  return (
    <SectionEnter
      as="section"
      aria-labelledby="services-heading"
      className="relative isolate overflow-hidden bg-background text-off-white px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-24 md:pb-32"
      amount={0.2}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 60% at 50% 0%, hsl(30 4% 18% / 0.55) 0%, transparent 60%), radial-gradient(70% 50% at 50% 100%, hsl(40 74% 62% / 0.10) 0%, transparent 70%)",
        }}
      />

      <style>{`
        .svc-sheen {
          transform: translateX(-200%) skewX(-12deg);
          opacity: 0;
        }
        @keyframes svc-sheen {
          0%   { transform: translateX(-200%) skewX(-12deg); opacity: 0; }
          20%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translateX(500%) skewX(-12deg); opacity: 0; }
        }
        .svc-sheen-anim {
          animation: svc-sheen 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
        }
        @media (prefers-reduced-motion: reduce) {
          .svc-sheen, .svc-sheen-anim { animation: none; opacity: 0; }
        }
      `}</style>

      <div className="relative mx-auto w-full max-w-[1180px]">
        <FadeRise trigger="child" as="p" className="t-eyebrow">
          SERVICES
        </FadeRise>

        <MaskedLines
          as="h2"
          trigger="in-view"
          lines={[<>Financial Architects & Strategic Advisors</>]}
          className="mt-5 t-h2 text-off-white"
        />

        <FadeRise
          trigger="child"
          as="p"
          className="mt-5 max-w-xl t-lead text-off-white/55"
        >
          We partner with your leadership team to cut through fiscal noise, craft rigorous, data-driven frameworks, and instill the financial governance required to enhance and support strategic enterprise growth.
        </FadeRise>

        <div
          className="relative mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12"
          style={{ perspective: "1200px", perspectiveOrigin: "50% 40%" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-8 left-1/2 hidden md:flex -translate-x-1/2 flex-col items-center"
          >
            <span className="flex-1 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
            <span className="my-3 t-label text-gold/70">or</span>
            <span className="flex-1 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
          </div>

          {OFFERS.map((offer, i) => {
            const isLeft = i === 0;
            const index = i === 0 ? "01" : "02";
            return (
              <motion.article
                key={offer.title}
                initial={
                  reduce
                    ? { opacity: 1, rotateY: 0 }
                    : { opacity: 0, rotateY: isLeft ? -88 : 88 }
                }
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: reduce ? 0 : 0.78,
                  ease: SITE_EASE,
                  delay: reduce ? 0 : isLeft ? 0 : 0.3,
                  opacity: {
                    duration: reduce ? 0 : 0.45,
                    ease: SITE_EASE,
                    delay: reduce ? 0 : isLeft ? 0 : 0.3,
                  },
                }}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: isLeft ? "left center" : "right center",
                }}
                onViewportEnter={(e) => {
                  const el = (e?.target as HTMLElement | undefined) ?? null;
                  el?.querySelector<HTMLElement>(".svc-sheen")?.classList.add("svc-sheen-anim");
                }}
                className="luxe-card services-card group relative flex flex-col overflow-hidden rounded-xl border border-off-white/[0.07] bg-secondary p-8 md:p-10"
              >
                {/* Gold corner accents */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-0 left-0 h-10 w-10 border-t border-l border-gold/40 rounded-tl-xl"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 border-b border-r border-gold/40 rounded-br-xl"
                />

                {/* Sheen sweep */}
                {!reduce && (
                  <span
                    aria-hidden
                    className="svc-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-gold/15 to-transparent"
                  />
                )}

                {/* Index numeral */}
                <div
                  aria-hidden
                  className="font-serif leading-none text-gold/85 select-none"
                  style={{ fontSize: "clamp(2.75rem, 5vw, 4rem)" }}
                >
                  {index}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/30 text-gold/80 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-gold group-hover:border-gold/70"
                    aria-hidden
                  >
                    <offer.icon size={18} strokeWidth={1.5} />
                  </span>
                </div>

                <h3 className="mt-6 t-h3 text-off-white">{offer.title}</h3>

                <div aria-hidden className="mt-5 h-px w-16 bg-gold/50" />

                <p className="mt-5 t-body text-off-white/65">
                  {offer.description}
                </p>

                <div className="mt-8 pt-2">
                  <a
                    href="#contact"
                    className="group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gold px-7 py-3 text-charcoal text-xs font-medium tracking-[0.18em] uppercase transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {/* GPU-only glow layer — only opacity animates on hover. */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-3 rounded-full opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:opacity-100 motion-reduce:hidden"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, hsl(40 74% 62% / 0.55) 0%, hsl(40 74% 62% / 0.18) 45%, transparent 75%)",
                        filter: "blur(10px)",
                      }}
                    />
                    <span className="relative z-10">Let's Build the Path Forward</span>
                    <ArrowRight size={14} strokeWidth={2} className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0.5" />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-full motion-reduce:hidden"
                    />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionEnter>
  );
};

export default ServicesV2;
