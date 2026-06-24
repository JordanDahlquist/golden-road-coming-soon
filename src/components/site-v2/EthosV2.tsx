import { motion, useReducedMotion } from "framer-motion";
import { Gauge, Compass, Building2, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SITE_EASE } from "@/lib/motion";
import { FadeRise, MaskedLines, SectionEnter } from "@/components/site/motion";

type EthosCard = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const ETHOS_CARDS: EthosCard[] = [
  {
    icon: Gauge,
    title: "Rigorous but Agile.",
    body:
      "We do not deal in vague abstractions or bloated, boilerplate consulting decks. We deal in financial truth, structural discipline, and velocity. In a modern economy, strategy must move as fast as the market, backed by numbers that don't lie.",
  },
  {
    icon: Compass,
    title: "Looking Forward, Not Backward.",
    body:
      "Traditional accounting looks in the rearview mirror to tell you where your capital went. We look through the windshield and turn on the highbeams. We treat the finance function not as a corporate historian, but as a strategic engine designed to fund, forecast, and navigate the future.",
  },
  {
    icon: Building2,
    title: "Vision Demands Architecture.",
    body:
      "Growth without infrastructure is chaos; ambition without capital optimization is a liability. We believe true market leadership is achieved when a bold executive vision is structurally welded to uncompromising fiscal architecture.",
  },
  {
    icon: ShieldCheck,
    title: "The Return on Resilience.",
    body:
      "We engineer for profitability, but we build for resilience. Our ultimate metric of success is the creation of enduring enterprise value that protects and elevates stakeholders, leadership teams, and the organizations they guide.",
  },
];

const EthosV2 = () => {
  const reduce = useReducedMotion() ?? false;

  return (
    <SectionEnter
      as="section"
      aria-labelledby="ethos-heading"
      className="relative isolate overflow-hidden bg-background text-off-white px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-24 md:pb-32"
      amount={0.2}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 60% at 50% 0%, hsl(30 4% 18% / 0.55) 0%, transparent 60%), radial-gradient(60% 40% at 15% 100%, hsl(40 74% 62% / 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <FadeRise as="p" trigger="in-view" className="t-eyebrow">
          OUR ETHOS
        </FadeRise>

        <MaskedLines
          as="h2"
          trigger="in-view"
          stagger={0.08}
          lines={[<>The Roadmap for Capital & Clarity</>]}
          className="mt-6 t-h2 text-off-white"
          // id consumed via aria-labelledby on section
        />

        <div id="ethos-heading" className="relative mt-20 md:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
            {ETHOS_CARDS.map((card, i) => {
              const offsetClass =
                i === 1
                  ? "md:translate-y-8"
                  : i === 2
                  ? "md:-translate-y-2"
                  : i === 3
                  ? "md:translate-y-10"
                  : "";
              return (
                <EthosCardItem
                  key={card.title}
                  card={card}
                  index={i}
                  reduce={reduce}
                  className={offsetClass}
                />
              );
            })}
          </div>
        </div>
      </div>
    </SectionEnter>
  );
};

const EthosCardItem = ({
  card,
  index,
  reduce,
  className = "",
}: {
  card: EthosCard;
  index: number;
  reduce: boolean;
  className?: string;
}) => {
  const Icon = card.icon;

  const initial = reduce
    ? { opacity: 1, y: 0, boxShadow: "0 0 0 rgba(229,181,85,0)" }
    : { opacity: 0, y: 36, boxShadow: "0 0 0 rgba(229,181,85,0)" };

  const animateInView = reduce
    ? { opacity: 1, y: 0 }
    : {
        opacity: 1,
        y: 0,
        boxShadow: [
          "0 0 0 rgba(229,181,85,0)",
          "0 0 0 1px rgba(229,181,85,0.35), 0 14px 40px -14px rgba(229,181,85,0.22)",
          "0 0 0 1px rgba(229,181,85,0.10), 0 10px 28px -18px rgba(229,181,85,0.10)",
        ],
      };

  const surface =
    "linear-gradient(160deg, #34322f 0%, #2c2a28 55%, #252321 100%)";
  const border = "1px solid rgba(247,246,245,0.07)";

  return (
    <motion.article
      initial={initial}
      whileInView={animateInView}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reduce ? 0 : 1.05,
        ease: SITE_EASE,
        delay: reduce ? 0 : 0.08 + index * 0.12,
        boxShadow: {
          duration: reduce ? 0 : 1.6,
          ease: SITE_EASE,
          delay: reduce ? 0 : 0.35 + index * 0.12,
          times: [0, 0.45, 1],
        },
      }}
      className={`group relative overflow-hidden rounded-xl p-6 md:p-7 lg:p-8 ${className}`}
      style={{
        background: surface,
        border,
        willChange: "transform, opacity, box-shadow",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(247,246,245,0) 0%, rgba(247,246,245,0.10) 50%, rgba(247,246,245,0) 100%)",
        }}
      />

      <div className="flex items-start gap-5 md:gap-6">
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center justify-center rounded-lg h-12 w-12 md:h-14 md:w-14"
          style={{
            border: "1px solid rgba(229,181,85,0.35)",
            background:
              "linear-gradient(160deg, rgba(229,181,85,0.10) 0%, rgba(229,181,85,0.02) 100%)",
          }}
        >
          <Icon size={24} strokeWidth={1.4} className="text-gold" />
        </span>
        <div className="min-w-0 pt-1">
          <h3 className="t-card-title">{card.title}</h3>
          <p className="mt-3 t-body text-off-white/65">{card.body}</p>
        </div>
      </div>
    </motion.article>
  );
};

export default EthosV2;
