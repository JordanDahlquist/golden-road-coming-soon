import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { SITE_EASE } from "@/lib/motion";
import { FadeRise, MaskedLines } from "./motion";
import monogram from "@/assets/logo-monogram.png";


type Testimonial = {
  name: string;
  title: string;
  quote: string;
  initials: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Jordan Dahlquist",
    title: "Co-Founder & CEO",
    quote:
      "Tracy possesses a deep understanding of financial strategies, with a knack for identifying efficiencies and streamlining operations that directly impact the bottom line.",
    initials: "JD",
  },
  {
    name: "Michael Greenberg",
    title: "Founder & CEO",
    quote:
      "She has been a trusted advisor throughout my decades-long entrepreneurial journey.",
    initials: "MG",
  },
  {
    name: "Dax Cornelius",
    title: "Co-Founder & CEO",
    quote:
      "Tracy not only underpromised and overdelivered in every aspect, she simultaneously drove me to be a better leader.",
    initials: "DC",
  },
  {
    name: "Chris Hubble",
    title: "Founder & CEO",
    quote:
      "She possesses an innate talent for understanding the broader market dynamics and industry trends, allowing her to develop innovative financial strategies that kept our organization ahead of the curve.",
    initials: "CH",
  },
  {
    name: "Shana Starr",
    title: "Co-Founder & CEO",
    quote:
      "She helped me scale my business and grow my revenue 3X in less than two years.",
    initials: "SS",
  },
  {
    name: "R. Cary Hampton",
    title: "Co-Founder",
    quote:
      "Her business acumen and cross-functional expertise made her the ideal partner for getting my business off the ground and scaling it over a multi-year period.",
    initials: "RC",
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
        {/* Monogram mark */}
        <FadeRise
          as="div"
          trigger="in-view"
          className="mb-7"
        >
          <img
            src={monogram}
            alt=""
            aria-hidden
            className="h-12 w-12 opacity-90 drop-shadow-[0_2px_12px_rgba(229,181,85,0.25)]"
          />
        </FadeRise>

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
            <>Trusted by Boards</>,
            <>and those who answer to them.</>,
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
          <p className="t-body font-semibold text-off-white leading-tight truncate">
            {t.name}
          </p>
          <p className="mt-0.5 t-body-sm text-off-white/55 truncate">
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
      <blockquote className="mt-5 t-quote text-off-white/90">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
    </motion.article>
  );
};



export default TrustSection;
