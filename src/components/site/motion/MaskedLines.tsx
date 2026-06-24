import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ElementType, ReactNode } from "react";
import {
  groupVariants,
  lineRevealVariants,
  SITE_DURATIONS,
} from "@/lib/motion";

type MaskedLinesProps = {
  /** Lines of text. Each renders inside its own overflow-hidden mask. */
  lines: ReactNode[];
  /** Wrapper element (e.g. "h1", "h2"). Defaults to "h2". */
  as?: ElementType;
  /** Class on the wrapper element. */
  className?: string;
  /** Style on the wrapper element (clamp font-size, lineHeight, etc.). */
  style?: CSSProperties;
  /** Class on each line's mask wrapper. */
  lineClassName?: string;
  /** Stagger between lines (s). */
  stagger?: number;
  /** Delay before the first line begins (s). */
  delayChildren?: number;
  /** Duration of each line's reveal (s). */
  duration?: number;
  /** Trigger on mount (default) or when the wrapper scrolls into view. */
  trigger?: "mount" | "in-view";
};

/**
 * Masked line-by-line reveal primitive. Each line rises from behind an
 * overflow-hidden wrapper (translateY 100% → 0) while fading in, using the
 * canonical site easing. Reduced motion renders the final state instantly.
 */
const MaskedLines = ({
  lines,
  as,
  className,
  style,
  lineClassName,
  stagger = SITE_DURATIONS.stagger,
  delayChildren = 0,
  duration = SITE_DURATIONS.line,
  trigger = "mount",
}: MaskedLinesProps) => {
  const reduce = useReducedMotion() ?? false;
  const Tag = (as ?? "h2") as ElementType;
  const MotionTag = useMemo(() => motion(Tag), [Tag]);

  const parent = groupVariants({
    delayChildren,
    staggerChildren: stagger,
    reduce,
  });
  const child = lineRevealVariants({ duration, reduce });

  const activate =
    trigger === "in-view"
      ? {
          initial: "hidden" as const,
          whileInView: "show" as const,
          viewport: { once: true, amount: 0.4 },
        }
      : {
          initial: "hidden" as const,
          animate: "show" as const,
        };

  return (
    <MotionTag
      variants={parent}
      {...activate}
      className={className}
      style={style}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className={`block overflow-hidden ${lineClassName ?? ""}`}
          data-masked-line={i}
        >
          <motion.span
            variants={child}
            className="block will-change-transform"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};

export default MaskedLines;
