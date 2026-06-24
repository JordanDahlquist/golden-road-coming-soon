import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { SITE_EASE } from "@/lib/motion";
import { FadeRise, MaskedLines } from "./motion";


type Testimonial = {
  name: string;
  title: string;
  quote: string;
  initials: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Chen",
    title: "CEO, [SaaS company]",
    quote:
      "She found the levers in our financials we didn't know existed. We made our next raise from a position of clarity, not panic.",
    initials: "SC",
  },
  {
    name: "Michael Torres",
    title: "Founder & CEO, [services firm]",
    quote:
      "The first finance leader who actually understood operations. She built the architecture we needed to scale past our ceiling.",
    initials: "MT",
  },
  {
    name: "Jennifer Walsh",
    title: "Board Chair",
    quote:
      "Strategic, direct, and refreshingly honest. She tells you the truth the business needs, not the story you want to hear.",
    initials: "JW",
  },
  {
    name: "David Kim",
    title: "Founder",
    quote:
      "We went from lagging spreadsheets to forward visibility in months. Decisions got faster and the whole company felt it.",
    initials: "DK",
  },
  {
    name: "Rachel Adams",
    title: "CEO, [growth-stage company]",
    quote:
      "She gave us CFO-level leadership without the full-time overhead. Exactly the third option we'd been looking for.",
    initials: "RA",
  },
  {
    name: "Thomas Reed",
    title: "Managing Partner",
    quote:
      "Institutional-grade frameworks, delivered fast. She took friction out of our scaling and it showed in every quarter after.",
    initials: "TR",
  },
];



const TrustSection = () => {
  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="relative isolate overflow-hidden text-off-white"
      style={{
        background:
          "linear-gradient(180deg, #161515 0%, #1a1816 55%, #161515 100%)",
      }}
    >
      {/* Warm gold bleed low behind the stat strip */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%]"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 100%, rgba(229,181,85,0.10) 0%, rgba(229,181,85,0.04) 40%, rgba(229,181,85,0) 75%)",
        }}
      />
      {/* Soft vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-28 md:pb-40">
        {/* Eyebrow */}
        <FadeRise
          as="p"
          trigger="in-view"
          className="t-eyebrow"
        >
          What Clients Say
        </FadeRise>

        {/* Headline */}
        <MaskedLines
          as="h2"
          trigger="in-view"
          stagger={0.08}
          lines={[
            <>Trusted by the people</>,
            <>who answer to the board.</>,
          ]}
          className="mt-6 t-h2 text-off-white"
        />

        {/* Hidden but accessible heading anchor */}
        <span id="trust-heading" className="sr-only">
          Client testimonials and credibility
        </span>

        {/* Testimonial grid */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};


const TestimonialCard = ({ t, index }: { t: Testimonial; index: number }) => {
  const reduce = useReducedMotion() ?? false;

  const initial = reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 };
  const hover = undefined;

  return (
    <motion.article
      initial={initial}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={hover}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.7,
        ease: SITE_EASE,
        delay: reduce ? 0 : 0.08 + (index % 3) * 0.1,
      }}
      className="luxe-card group relative rounded-xl p-6 md:p-7 flex flex-col"
      style={{
        backgroundColor: "#302e2c",
        border: "1px solid rgba(247,246,245,0.08)",
      }}
    >
      {/* Identity row */}
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-sans text-sm tracking-wide text-off-white/80"
          style={{
            backgroundColor: "#26241F",
            border: "1.5px solid rgba(229,181,85,0.7)",
            boxShadow: "0 0 0 3px rgba(229,181,85,0.08)",
          }}
        >
          {t.initials}
        </span>
        <div className="min-w-0">
          <p className="font-sans font-semibold text-off-white text-[0.975rem] leading-tight truncate">
            {t.name}
          </p>
          <p className="mt-0.5 font-sans text-off-white/55 text-[0.8125rem] leading-tight truncate">
            {t.title}
          </p>
        </div>
      </div>

      {/* Stars */}
      <div className="mt-5 flex items-center gap-1" aria-label="5 out of 5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            strokeWidth={1.25}
            className="text-gold"
            fill="#e5b555"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote
        className="mt-5 font-serif italic text-off-white/90"
        style={{
          fontSize: "clamp(1.0625rem, 1.25vw, 1.1875rem)",
          lineHeight: 1.45,
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </blockquote>
    </motion.article>
  );
};



export default TrustSection;
