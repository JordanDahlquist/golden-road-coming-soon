import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SITE_EASE } from "@/lib/motion";

type RotatingWordProps = {
  words: string[];
  /** ms each word is held before swapping */
  hold?: number;
  /** ms before the first swap begins */
  startDelay?: number;
  className?: string;
  /** Optional trailing glyph (e.g. ".") that stays flush to the word as it rotates. */
  suffix?: string;
};

/**
 * Premium masked vertical-flip word rotator. The bounding box is fixed to the
 * widest word so the surrounding headline never reflows. Outgoing word rises
 * and fades; incoming word enters from below. Brand gold + subtle settle glow.
 */
const RotatingWord = ({
  words,
  hold = 2200,
  startDelay = 1800,
  className,
}: RotatingWordProps) => {
  const reduce = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const kickoff = window.setTimeout(() => setStarted(true), startDelay);
    return () => window.clearTimeout(kickoff);
  }, [reduce, startDelay]);

  useEffect(() => {
    if (reduce || !started) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, hold);
    return () => window.clearInterval(id);
  }, [reduce, started, hold, words.length]);

  if (reduce) {
    return (
      <span className={className} style={{ color: "hsl(var(--gold))" }}>
        {words[0]}
      </span>
    );
  }

  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-grid",
        verticalAlign: "baseline",
        color: "hsl(var(--gold))",
        // Reserve width for the widest word so the headline never reflows.
        // Use a hidden sizer that takes the max intrinsic width.
      }}
    >
      {/* Invisible sizer: stacks all words to claim the widest box. */}
      <span
        aria-hidden
        style={{
          gridArea: "1 / 1",
          visibility: "hidden",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {words.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>

      {/* Animated mask */}
      <span
        style={{
          gridArea: "1 / 1",
          position: "relative",
          display: "inline-block",
          overflow: "hidden",
          whiteSpace: "nowrap",
          // a touch of vertical padding so descenders aren't clipped
          paddingBottom: "0.12em",
          marginBottom: "-0.12em",
          lineHeight: "inherit",
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={words[index]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.7, ease: SITE_EASE }}
            style={{
              display: "inline-block",
              willChange: "transform, opacity",
              textShadow: "0 0 24px hsl(var(--gold) / 0.18)",
            }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
};

export default RotatingWord;
