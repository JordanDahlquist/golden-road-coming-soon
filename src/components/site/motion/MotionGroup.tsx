import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { groupVariants, SITE_DURATIONS } from "@/lib/motion";

type MotionGroupProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Stagger between children (s). */
  staggerChildren?: number;
  /** Delay before the first child begins (s). */
  delayChildren?: number;
  /** Trigger on mount (default) or when the group scrolls into view. */
  trigger?: "mount" | "in-view";
  /** When trigger="in-view": fraction of element that must be visible, or "some" | "all". */
  amount?: number | "some" | "all";
};

/**
 * Parent wrapper that orchestrates a staggered children animation. Children
 * should be primitives that opt in (e.g. `<FadeRise trigger="child" />` or
 * `<MaskedLines />` rendered as a sibling). Reduced motion collapses the
 * timing to 0 so children resolve to their final state instantly.
 */
const MotionGroup = ({
  children,
  as,
  className,
  style,
  staggerChildren = SITE_DURATIONS.stagger,
  delayChildren = 0,
  trigger = "mount",
  amount = 0.3,
}: MotionGroupProps) => {
  const reduce = useReducedMotion() ?? false;
  const Tag = (as ?? "div") as ElementType;
  const MotionTag = useMemo(() => motion(Tag), [Tag]);

  const variants = groupVariants({ delayChildren, staggerChildren, reduce });

  const activate =
    trigger === "in-view"
      ? {
          initial: "hidden" as const,
          whileInView: "show" as const,
          viewport: { once: true, amount },
        }
      : {
          initial: "hidden" as const,
          animate: "show" as const,
        };

  return (
    <MotionTag
      variants={variants}
      {...activate}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
};

export default MotionGroup;
