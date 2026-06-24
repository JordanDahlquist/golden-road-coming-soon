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
          className="font-sans uppercase tracking-[0.24em] text-[11px] md:text-xs text-gold"
        >
          EXPERTISE
        </FadeRise>

        <MaskedLines
          as="h2"
          trigger="in-view"
          lines={[<>The full range of</>, <>a modern CFO office.</>]}
          className="mt-5 font-serif tracking-tight text-off-white"
          style={{
            fontSize: "clamp(1.875rem, 4vw, 3.75rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
          }}
        />

        <FadeRise
          trigger="child"
          as="p"
          className="mt-5 max-w-xl font-sans text-off-white/55 leading-relaxed"
          style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.0625rem)" }}
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
                className="absolute top-5 right-5 font-sans text-[11px] tracking-[0.18em] text-gold/80"
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
              <h3
                className="mt-6 font-sans font-semibold text-off-white"
                style={{
                  fontSize: tile.feature
                    ? "clamp(1.25rem, 1.6vw, 1.5rem)"
                    : "clamp(1.0625rem, 1.25vw, 1.1875rem)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.005em",
                }}
              >
                {tile.title}
              </h3>

              {/* Benefit line */}
              <p
                className="mt-3 font-sans text-off-white/60 leading-relaxed"
                style={{ fontSize: "clamp(0.875rem, 0.95vw, 0.9375rem)" }}
              >
                {tile.line}
              </p>

              {tile.feature && (
                <span
                  aria-hidden
                  className="mt-auto pt-8 font-sans text-[11px] uppercase tracking-[0.22em] text-off-white/35"
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
            <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-gold">
              Not sure which you need?
            </span>
            <div className="mt-6 flex items-end justify-between gap-6">
              <h3
                className="font-serif text-off-white"
                style={{
                  fontSize: "clamp(1.375rem, 1.8vw, 1.75rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                }}
              >
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
