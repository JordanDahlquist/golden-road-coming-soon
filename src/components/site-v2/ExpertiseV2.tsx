import { motion, useReducedMotion } from "framer-motion";
import {
  LineChart,
  Briefcase,
  Wallet,
  Cpu,
  Handshake,
  ShieldCheck,
  GitBranch,
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
    feature: true,
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
                "luxe-card expertise-tile group relative flex flex-col rounded-xl border border-off-white/[0.07] bg-secondary p-6 md:p-7",
                tile.span,
                tile.feature ? "lg:p-9" : "",
              ].join(" ")}
            >
              <span
                className="absolute top-5 right-5 t-label text-gold/80"
                aria-hidden
              >
                {tile.index}
              </span>

              <div
                className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/30 text-gold/80 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-gold group-hover:border-gold/70"
                aria-hidden
              >
                <tile.icon size={18} strokeWidth={1.5} />
              </div>

              <h3 className={tile.feature ? "mt-6 t-card-title" : "mt-6 t-tile-title text-off-white"}>
                {tile.title}
              </h3>

              <p className="mt-3 t-body-sm text-off-white/60">
                {tile.line}
              </p>

              {tile.feature && (
                <span
                  aria-hidden
                  className="mt-auto pt-8 t-label text-off-white/35"
                >
                  Featured capability
                </span>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </SectionEnter>
  );
};

export default ExpertiseV2;
