import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  animate,
} from "framer-motion";
import { SITE_EASE } from "@/lib/motion";

type Stat = {
  value: string;
  label: string;
  numeric?: { from: number; to: number; prefix?: string; suffix?: string };
  range?: { fromStart: number; toStart: number; fromEnd: number; toEnd: number; prefix?: string; suffix?: string };
};

const STATS: Stat[] = [
  {
    value: "25+",
    label: "Years leading finance & operations",
    numeric: { from: 0, to: 25, suffix: "+" },
  },
  {
    value: "Multiple",
    label: "Economic cycles navigated as a sitting CFO",
  },
  {
    value: "$5–50M",
    label: "The range where we do our best work",
    range: { fromStart: 0, toStart: 5, fromEnd: 0, toEnd: 50, prefix: "$", suffix: "M" },
  },
  {
    value: "2",
    label: "Ways to engage: retainer or strategic engagement",
    numeric: { from: 0, to: 2 },
  },
];

const KpiBand = () => {
  return (
    <section
      aria-label="Credibility at a glance"
      className="relative isolate overflow-hidden text-off-white"
      style={{
        background:
          "linear-gradient(180deg, #161515 0%, #1c1a18 50%, #161515 100%)",
        borderTop: "1px solid rgba(229,181,85,0.18)",
        borderBottom: "1px solid rgba(229,181,85,0.18)",
      }}
    >
      {/* Low warm gold glow tying back to the hero road */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(229,181,85,0.09) 0%, rgba(229,181,85,0.03) 45%, rgba(229,181,85,0) 80%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-20 py-14 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-10 lg:divide-x lg:divide-gold/20">
          {STATS.map((s, i) => (
            <div key={s.label} className="lg:px-8 first:lg:pl-0 last:lg:pr-0">
              <StatBlock stat={s} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatBlock = ({ stat, index }: { stat: Stat; index: number }) => {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.7,
        ease: SITE_EASE,
        delay: reduce ? 0 : 0.05 + index * 0.1,
      }}
      className="flex flex-col"
    >
      <span
        className={`t-stat ${
          stat.value === "$5–50M"
            ? "whitespace-nowrap text-[clamp(2rem,3.8vw,3.25rem)]"
            : ""
        }`}
      >
        {stat.numeric && !reduce ? (
          <CountUp
            from={stat.numeric.from}
            to={stat.numeric.to}
            prefix={stat.numeric.prefix}
            suffix={stat.numeric.suffix}
            play={inView}
          />
        ) : (
          stat.value
        )}
      </span>
      <span className="mt-3 md:mt-4 t-label text-off-white/60 max-w-[24ch]">
        {stat.label}
      </span>
    </motion.div>
  );
};

const CountUp = ({
  from,
  to,
  prefix = "",
  suffix = "",
  play,
}: {
  from: number;
  to: number;
  prefix?: string;
  suffix?: string;
  play: boolean;
}) => {
  const mv = useMotionValue(from);
  const rounded = useTransform(mv, (v) => `${prefix}${Math.round(v)}${suffix}`);
  const [text, setText] = useState(`${prefix}${from}${suffix}`);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setText(v));
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    if (!play) return;
    const controls = animate(mv, to, { duration: 1.6, ease: SITE_EASE });
    return () => controls.stop();
  }, [play, mv, to]);

  return <span>{text}</span>;
};

export default KpiBand;
