import {
  LineChart,
  Briefcase,
  Wallet,
  Cpu,
  Handshake,
  ShieldCheck,
  GitBranch,
  ArrowUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeRise, MaskedLines, SectionEnter } from "./motion";

type Tile = {
  index: string;
  title: string;
  line: string;
  icon: LucideIcon;
  /** Tailwind classes controlling bento span on lg+ (4-col grid). */
  span: string;
  feature?: boolean;
};

const TILES: Tile[] = [
  {
    index: "01",
    title: "FP&A & Forecasting",
    line: "Forward visibility you can steer by, not lagging reports.",
    icon: LineChart,
    span: "lg:col-span-2 lg:row-span-1",
  },
  {
    index: "02",
    title: "Fractional CFO Leadership",
    line: "Executive-level financial leadership without the full-time line item.",
    icon: Briefcase,
    span: "lg:col-span-2 lg:row-span-2",
    feature: true,
  },
  {
    index: "03",
    title: "Capital & Cash Strategy",
    line: "Optimize capital structure and runway for the next stage.",
    icon: Wallet,
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    index: "04",
    title: "Finance Modernization",
    line: "Systems and automation that remove scaling friction.",
    icon: Cpu,
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    index: "05",
    title: "M&A & Transaction Readiness",
    line: "Diligence-ready and transaction-ready when the moment comes.",
    icon: Handshake,
    span: "lg:col-span-2 lg:row-span-1",
  },
  {
    index: "06",
    title: "Risk & Governance",
    line: "Institutional-grade controls that protect the upside.",
    icon: ShieldCheck,
    span: "lg:col-span-2 lg:row-span-1",
  },
  {
    index: "07",
    title: "Change Management",
    line: "The bridge from vision to financial reality.",
    icon: GitBranch,
    span: "lg:col-span-2 lg:row-span-1",
    feature: true,
  },
];

/**
 * Expertise — asymmetric bento of seven capability tiles.
 *
 * Lifted charcoal surfaces on near-black, gold accents only on hover and
 * on the small index/icon, varied lg col/row spans for editorial rhythm.
 * Reuses the site motion primitives and respects reduced motion via CSS.
 */
const ExpertiseSection = () => {
  return (
    <SectionEnter
      as="section"
      aria-labelledby="expertise-heading"
      className="relative isolate overflow-hidden bg-background text-off-white px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-24 md:pb-32"
      amount={0.2}
    >
      {/* Depth wash: subtle charcoal gradient + faint gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 60% at 50% 0%, hsl(30 4% 18% / 0.55) 0%, transparent 60%), radial-gradient(60% 40% at 85% 100%, hsl(40 74% 62% / 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1180px]">
        {/* ── Section intro ───────────────────────────────────────── */}
        <FadeRise
          trigger="child"
          as="p"
          className="t-eyebrow"
        >
          EXPERTISE
        </FadeRise>

        <MaskedLines
          as="h2"
          trigger="in-view"
          lines={[<>The full range of</>, <>a modern CFO office.</>]}
          className="mt-5 t-h2 text-off-white"
        />

        <FadeRise
          trigger="child"
          as="p"
          className="mt-5 max-w-xl t-lead text-off-white/55"
        >
          Where founders get stuck, these are the levers we pull.
        </FadeRise>

        {/* ── Bento grid ──────────────────────────────────────────── */}
        <div className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(200px,auto)] gap-5 md:gap-6">
          {TILES.map((tile) => (
            <FadeRise
              key={tile.index}
              trigger="child"
              as="article"
              className={[
                "luxe-card expertise-tile group relative flex flex-col rounded-xl border border-off-white/[0.07] bg-secondary p-6 md:p-7",
                tile.span,
                tile.feature ? "lg:p-9" : "",
              ].join(" ")}
            >
              {/* Corner index */}
              <span
                className="absolute top-5 right-5 t-label text-gold/80"
                aria-hidden
              >
                {tile.index}
              </span>

              {/* Icon */}
              <div
                className="flex h-10 w-10 items-center justify-center rounded-md border border-gold/30 text-gold/80 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-gold group-hover:border-gold/70"
                aria-hidden
              >
                <tile.icon size={18} strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className={tile.feature ? "mt-6 t-card-title" : "mt-6 t-tile-title text-off-white"}>
                {tile.title}
              </h3>

              {/* Benefit line */}
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
            </FadeRise>
          ))}

          {/* Gold-accented call tile balances the 7-tile bento into 8 cells */}
          <FadeRise
            trigger="child"
            as="a"
            // @ts-expect-error framer-motion forwards arbitrary props to the element
            href="#contact"
            className={[
              "luxe-card expertise-call group relative flex flex-col justify-between rounded-xl border border-gold/40 p-6 md:p-7",
              "lg:col-span-2",
            ].join(" ")}
            style={{
              background:
                "linear-gradient(135deg, hsl(40 74% 62% / 0.08) 0%, hsl(30 4% 18% / 0.6) 60%)",
            }}
          >
            <span className="t-eyebrow">
              Not sure which you need?
            </span>
            <div className="mt-6 flex items-end justify-between gap-6">
              <h3 className="t-card-title">
                Start the conversation.
              </h3>
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden
              >
                <ArrowUpRight size={18} strokeWidth={1.5} />
              </span>
            </div>
          </FadeRise>
        </div>
      </div>

    </SectionEnter>
  );
};

export default ExpertiseSection;
