import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Gauge, Compass, Building2, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeRise, MaskedLines, SectionEnter, SITE_EASE } from "@/components/site/motion";

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
  const sectionRef = useRef<HTMLDivElement | null>(null);
  // Pause looping breathing glows when the section is off-screen.
  const loopsActive = useInView(sectionRef, { margin: "200px 0px 200px 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax: background glow rises a bit faster than the cards.
  const glowY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["8%", "-12%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["3%", "-3%"]);
  const headlineY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["2%", "-2%"]);

  return (
    <section
      ref={sectionRef}
      data-loops={loopsActive ? "active" : "paused"}
      aria-labelledby="ethos-heading"
      className="relative isolate overflow-hidden text-off-white"
      style={{
        background:
          "linear-gradient(180deg, #1a1817 0%, #141312 50%, #0f0e0d 100%)",
      }}
    >
    <SectionEnter
      as="div"
      className="relative px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-24 md:pb-32"
      amount={0.2}
    >
      {/* Component-scoped keyframes */}
      <style>{`
        .ethos-headline-sheen, .ethos-sheen {
          transform: translateX(-200%) skewX(-12deg);
          opacity: 0;
        }
        @keyframes ethos-headline-sheen {
          0%   { transform: translateX(-200%) skewX(-12deg); opacity: 0; }
          15%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translateX(500%) skewX(-12deg); opacity: 0; }
        }
        .ethos-headline-sheen-anim {
          animation: ethos-headline-sheen 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both;
        }
        @keyframes ethos-card-sheen {
          0%   { transform: translateX(-200%) skewX(-14deg); opacity: 0; }
          20%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translateX(500%) skewX(-14deg); opacity: 0; }
        }
        .ethos-card-sheen-anim {
          animation: ethos-card-sheen 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
        }
        @keyframes ethos-rule-draw {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        .ethos-rule-draw-anim {
          transform-origin: center;
          animation: ethos-rule-draw 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both;
        }
        @keyframes ethos-icon-breathe {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 1; }
        }
        .ethos-icon-glow {
          position: absolute;
          inset: -6px;
          border-radius: 0.75rem;
          pointer-events: none;
          background: radial-gradient(
            ellipse at center,
            rgba(229,181,85,0.55) 0%,
            rgba(229,181,85,0.18) 45%,
            transparent 75%
          );
          filter: blur(10px);
          
          opacity: 0;
        }
        @media (prefers-reduced-motion: no-preference) {
          .ethos-icon-glow {
            animation: ethos-icon-breathe 5.5s ease-in-out infinite;
          }
        }
        /* Pause looping animations when section is off-screen. */
        .ethos-v2-loop { animation-play-state: paused; }
        [data-loops="active"] .ethos-v2-loop { animation-play-state: running; }
        @media (prefers-reduced-motion: reduce) {
          .ethos-headline-sheen-anim,
          .ethos-card-sheen-anim,
          .ethos-rule-draw-anim,
          .ethos-icon-glow { animation: none !important; }
          .ethos-rule-draw-anim { transform: scaleX(1); opacity: 1; }
        }
      `}</style>

      {/* Parallax background glow — gold light rising from below */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          y: glowY,
          background:
            "radial-gradient(70% 45% at 50% 95%, hsl(40 74% 62% / 0.12) 0%, transparent 70%), radial-gradient(55% 35% at 50% 60%, hsl(40 74% 62% / 0.04) 0%, transparent 75%)",
        }}
      />

      {/* Soft vignette for focus */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <motion.div style={{ y: headlineY }}>
          <FadeRise as="p" trigger="in-view" className="t-eyebrow">
            OUR ETHOS
          </FadeRise>

          <div className="relative inline-block overflow-hidden">
            <MaskedLines
              as="h2"
              trigger="in-view"
              stagger={0.08}
              lines={[<>The Roadmap for Capital & Clarity</>]}
              className="relative mt-6 t-h2 text-off-white overflow-hidden"
            />
            {/* Headline sheen */}
            {!reduce && (
              <motion.span
                aria-hidden
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                onViewportEnter={(e) => {
                  const el = (e?.target as HTMLElement | undefined) ?? null;
                  el?.classList.add("ethos-headline-sheen-anim");
                }}
                className="ethos-headline-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-gold/20 to-transparent"
              />
            )}
          </div>

          {/* Drawn gold hairline accent */}
          <motion.span
            aria-hidden
            initial={reduce ? false : { opacity: 0 }}
            whileInView={reduce ? undefined : { opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            onViewportEnter={(e) => {
              const el = (e?.target as HTMLElement | undefined) ?? null;
              el?.classList.add("ethos-rule-draw-anim");
            }}
            className="mt-6 block h-px w-40 md:w-56 bg-gradient-to-r from-transparent via-gold/60 to-transparent"
          />
        </motion.div>

        <motion.div
          id="ethos-heading"
          className="relative mt-20 md:mt-24"
          style={{ y: cardsY }}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7"
            style={{ perspective: "1400px", perspectiveOrigin: "50% 30%" }}
          >
            {ETHOS_CARDS.map((card, i) => (
              <EthosCardItem
                key={card.title}
                card={card}
                index={i}
                reduce={reduce}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </SectionEnter>
    </section>
  );
};

const EthosCardItem = ({
  card,
  index,
  reduce,
}: {
  card: EthosCard;
  index: number;
  reduce: boolean;
}) => {
  const Icon = card.icon;

  const surface =
    "linear-gradient(160deg, #34322f 0%, #2c2a28 55%, #252321 100%)";

  return (
    <motion.article
      initial={
        reduce
          ? { opacity: 1, rotateX: 0, y: 0 }
          : { opacity: 0, rotateX: -28, y: 24 }
      }
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduce ? 0 : 0.95,
        ease: SITE_EASE,
        delay: reduce ? 0 : 0.12 + index * 0.14,
      }}
      onViewportEnter={(e) => {
        const el = (e?.target as HTMLElement | undefined) ?? null;
        el?.querySelector<HTMLElement>(".ethos-sheen")?.classList.add("ethos-card-sheen-anim");
      }}
      style={{
        background: surface,
        border: "1px solid rgba(247,246,245,0.07)",
        transformStyle: "preserve-3d",
        transformOrigin: "center top",
      }}
      className="luxe-card group relative overflow-hidden rounded-xl p-6 md:p-7 lg:p-8"
    >
      {/* Top hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(247,246,245,0) 0%, rgba(247,246,245,0.10) 50%, rgba(247,246,245,0) 100%)",
        }}
      />

      {/* One-time gold sheen sweep on entrance */}
      {!reduce && (
        <span
          aria-hidden
          className="ethos-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-gold/15 to-transparent"
        />
      )}

      <div className="flex items-start gap-5 md:gap-6">
        <span
          aria-hidden="true"
          className="relative inline-flex shrink-0 items-center justify-center rounded-lg h-12 w-12 md:h-14 md:w-14"
          style={{
            border: "1px solid rgba(229,181,85,0.35)",
            background:
              "linear-gradient(160deg, rgba(229,181,85,0.10) 0%, rgba(229,181,85,0.02) 100%)",
          }}
        >
          {/* Separate blurred glow layer — only opacity animates. */}
          <span aria-hidden="true" className="ethos-icon-glow ethos-v2-loop" />
          <Icon size={24} strokeWidth={1.4} className="relative text-gold" />
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
