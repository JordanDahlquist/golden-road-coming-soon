import { motion, useReducedMotion } from "framer-motion";
import {
  LineChart,
  Briefcase,
  Wallet,
  Cpu,
  Handshake,
  ShieldCheck,
  GitBranch,
  ArrowRight,
  Compass,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeRise, SectionEnter, SITE_EASE } from "@/components/site/motion";

type Tile = {
  index: string;
  title: string;
  line: string;
  icon: LucideIcon;
  span: string;
  feature?: boolean;
};

const TILES: Tile[] = [
  {
    index: "01",
    title: "Strategic Financial Planning & Analysis (FP&A)",
    line: "Designing long-term corporate growth roadmaps backed by rigorous modeling and forecasting.",
    icon: LineChart,
    span: "lg:col-span-2 lg:row-span-1",
  },
  {
    index: "02",
    title: "Fractional CFO Leadership",
    line: "Providing executive-level fiscal guidance, board reporting, and corporate governance without the full-time overhead.",
    icon: Briefcase,
    span: "lg:col-span-2 lg:row-span-2",
    feature: true,
  },
  {
    index: "03",
    title: "Enterprise Growth & Scalability Architecture",
    line: "Unlocking hidden profitability, optimizing cash flow, and identifying high-margin revenue streams.",
    icon: Wallet,
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    index: "04",
    title: "Finance Function Modernization",
    line: "Transforming legacy accounting and finance departments into modern, tech-enabled strategic assets.",
    icon: Cpu,
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    index: "05",
    title: "Risk Management & Corporate Governance",
    line: "Establishing internal controls, compliance frameworks, and corporate structures to protect enterprise value.",
    icon: ShieldCheck,
    span: "lg:col-span-2 lg:row-span-1",
  },
  {
    index: "06",
    title: "M&A Readiness & Strategic Partnerships",
    line: "Advising on financial due diligence, transaction readiness, and post-merger integration or synergy realization.",
    icon: Handshake,
    span: "lg:col-span-2 lg:row-span-1",
  },
  {
    index: "07",
    title: "Change Management & Leadership Alignment",
    line: "Bridging the gap between the CEO's vision and the organization's financial reality to ensure seamless operational transitions.",
    icon: GitBranch,
    span: "lg:col-span-2 lg:row-span-1",
  },
];

const ExpertiseV2 = () => {
  const reduce = useReducedMotion() ?? false;

  const flipInitial = reduce
    ? { opacity: 1, rotateY: 0 }
    : { opacity: 0, rotateY: -80 };
  const flipAnimate = { opacity: 1, rotateY: 0 };
  const flipTransition = (i: number) => ({
    duration: reduce ? 0 : 0.72,
    ease: SITE_EASE,
    delay: reduce ? 0 : i * 0.13,
    opacity: {
      duration: reduce ? 0 : 0.45,
      ease: SITE_EASE,
      delay: reduce ? 0 : i * 0.13,
    },
  });
  const flipStyle = {
    transformStyle: "preserve-3d" as const,
    transformOrigin: "left center",
    willChange: "transform, opacity",
  };
  const viewport = { once: true, amount: 0.15 };

  // CTA tile enters last
  const ctaIndex = TILES.length;

  return (
    <SectionEnter
      as="section"
      aria-labelledby="expertise-heading"
      className="relative isolate overflow-hidden bg-background text-off-white px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-24 md:pb-32"
      amount={0.2}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 60% at 50% 0%, hsl(30 4% 18% / 0.55) 0%, transparent 60%), radial-gradient(60% 40% at 85% 100%, hsl(40 74% 62% / 0.07) 0%, transparent 70%)",
        }}
      />

      <style>{`
        @keyframes exp-feature-glow {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.7; }
        }
        .exp-feature-sheen {
          transform: translateX(-200%) skewX(-14deg);
          opacity: 0;
        }
        @keyframes exp-feature-sheen {
          0%   { transform: translateX(-200%) skewX(-14deg); opacity: 0; }
          8%   { opacity: 1; }
          22%  { transform: translateX(500%) skewX(-14deg); opacity: 0; }
          100% { transform: translateX(500%) skewX(-14deg); opacity: 0; }
        }
        .exp-feature-glow {
          animation: exp-feature-glow 6s ease-in-out infinite;
        }
        .exp-feature-sheen {
          animation: exp-feature-sheen 7s cubic-bezier(0.22, 1, 0.36, 1) 1.2s infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .exp-feature-glow, .exp-feature-sheen { animation: none; opacity: 0; }
        }
      `}</style>

      <div className="relative mx-auto w-full max-w-[1180px]">
        <FadeRise trigger="child" as="p" className="t-eyebrow">
          KEY AREAS OF EXPERTISE
        </FadeRise>

        <div
          className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(200px,auto)] gap-5 md:gap-6"
          style={{ perspective: "1200px", perspectiveOrigin: "50% 40%" }}
        >
          {TILES.map((tile, i) => (
            <motion.article
              key={tile.index}
              initial={flipInitial}
              whileInView={flipAnimate}
              viewport={viewport}
              transition={flipTransition(i)}
              style={flipStyle}
              className={[
                "luxe-card expertise-tile group relative flex flex-col overflow-hidden rounded-xl p-6 md:p-7",
                tile.span,
                tile.feature
                  ? "lg:p-9 border border-gold/45 bg-gradient-to-br from-secondary via-secondary to-[hsl(40_55%_18%/0.55)]"
                  : "border border-off-white/[0.07] bg-secondary",
              ].join(" ")}
            >
              {tile.feature && (
                <>
                  <span
                    aria-hidden
                    className="exp-feature-glow pointer-events-none absolute -inset-px rounded-xl"
                    style={{
                      background:
                        "radial-gradient(80% 60% at 30% 0%, hsl(40 74% 62% / 0.18) 0%, transparent 70%)",
                    }}
                  />
                  {!reduce && (
                    <span
                      aria-hidden
                      className="exp-feature-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-gold/12 to-transparent"
                    />
                  )}
                  <span
                    aria-hidden
                    className="absolute top-5 left-5 h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_2px_hsl(40_74%_62%/0.55)]"
                  />
                </>
              )}

              <FadeRise
                trigger="in-view"
                as="span"
                delay={i * 0.13 + 0.2}
                className="absolute top-5 right-5 t-label text-gold/85"
              >
                <span aria-hidden>{tile.index}</span>
              </FadeRise>

              <div
                className="relative flex h-10 w-10 items-center justify-center rounded-md border border-gold/30 text-gold/80 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-gold group-hover:border-gold/70"
                aria-hidden
              >
                <tile.icon size={18} strokeWidth={1.5} />
              </div>

              <h3 className={"relative " + (tile.feature ? "mt-6 t-card-title" : "mt-6 t-tile-title text-off-white")}>
                {tile.title}
              </h3>

              <p className="relative mt-3 t-body-sm text-off-white/60">
                {tile.line}
              </p>
            </motion.article>
          ))}

          {/* 8th cell — CTA tile */}
          <motion.article
            initial={flipInitial}
            whileInView={flipAnimate}
            viewport={viewport}
            transition={flipTransition(ctaIndex)}
            style={flipStyle}
            className="luxe-card expertise-tile group relative flex flex-col items-start justify-between overflow-hidden rounded-xl border border-gold/30 bg-gradient-to-br from-secondary to-[hsl(40_55%_16%/0.45)] p-6 md:p-7 lg:col-span-2 lg:row-span-1"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/50 text-gold transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-gold/80"
              aria-hidden
            >
              <Compass size={18} strokeWidth={1.5} />
            </div>

            <a
              href="#contact"
              className="group/btn relative mt-6 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gold px-7 py-3 text-charcoal text-xs font-medium tracking-[0.18em] uppercase shadow-[0_10px_30px_-12px_hsl(40_74%_62%/0.55)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-12px_hsl(40_74%_62%/0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="relative z-10">Let's Build the Path Forward</span>
              <ArrowRight size={14} strokeWidth={2} className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0.5" />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-full motion-reduce:hidden"
              />
            </a>
          </motion.article>
        </div>
      </div>
    </SectionEnter>
  );
};

export default ExpertiseV2;
