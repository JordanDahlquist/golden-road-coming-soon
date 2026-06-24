import { motion, useReducedMotion } from "framer-motion";
import { RefreshCw, Target } from "lucide-react";
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
      "We design custom, long-range financial blueprints for mid-market businesses and emerging enterprises looking to scale. From capital structure optimization and profitability forecasting to defining core KPIs, we build the sustainable financial engines that drive predictable growth.",
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
      id="services"
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
          We partner with your leadership team to cut through fiscal noise, craft rigorous, data-driven frameworks, and instill the financial governance required to support aggressive enterprise growth.
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
                  willChange: "transform, opacity",
                }}
                className="luxe-card services-card group relative flex flex-col rounded-xl border border-off-white/[0.07] bg-secondary p-8 md:p-10"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/30 text-gold/80 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-gold group-hover:border-gold/70"
                    aria-hidden
                  >
                    <offer.icon size={18} strokeWidth={1.5} />
                  </span>
                </div>

                <h3 className="mt-6 t-h3 text-off-white">{offer.title}</h3>

                <p className="mt-5 t-body text-off-white/65">
                  {offer.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionEnter>
  );
};

export default ServicesV2;
