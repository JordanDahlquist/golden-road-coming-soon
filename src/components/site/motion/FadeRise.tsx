import { motion, useReducedMotion } from "framer-motion";
import { useMemo, type CSSProperties, type ElementType, type ReactNode } from "react";
import { fadeRiseVariants, SITE_DURATIONS, SITE_RISE_Y } from "@/lib/motion";

type FadeRiseProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** translateY (px) the element rises from. */
  y?: number;
  /** Animation duration (s). */
  duration?: number;
  /** Delay before the animation begins (s). Ignored when used as a group child. */
  delay?: number;
  /**
   * Trigger mode:
   *  - "mount"   (default): plays on mount.
   *  - "in-view": plays when the element scrolls into view (once).
   *  - "child":   inherits from a parent variant group (no own initial/animate).
   */
  trigger?: "mount" | "in-view" | "child";
};

/**
 * Fade + small translateY primitive. Canonical site easing. Reduced motion
 * renders the final state with no transform or transition.
 *
 * As a standalone element it plays on mount (or on scroll-in). As a child
 * of a `MotionGroup`, set `trigger="child"` so the parent drives staggering.
 */
const FadeRise = ({
  children,
  as,
  className,
  style,
  y = SITE_RISE_Y,
  duration = SITE_DURATIONS.rise,
  delay,
  trigger = "mount",
}: FadeRiseProps) => {
  const reduce = useReducedMotion() ?? false;
  const Tag = (as ?? "div") as ElementType;
  const MotionTag = useMemo(() => motion(Tag), [Tag]);

  const variants = fadeRiseVariants({ duration, y, reduce });
  // Inject per-instance delay into the show transition if provided.
  const withDelay =
    delay && !reduce
      ? {
          ...variants,
          show: {
            ...(variants.show as object),
            transition: { duration, ease: [0.22, 1, 0.36, 1], delay },
          },
        }
      : variants;

  const props =
    trigger === "child"
      ? { variants: withDelay }
      : trigger === "in-view"
        ? {
            variants: withDelay,
            initial: "hidden" as const,
            whileInView: "show" as const,
            viewport: { once: true, amount: 0.4 },
          }
        : {
            variants: withDelay,
            initial: "hidden" as const,
            animate: "show" as const,
          };

  return (
    <MotionTag {...props} className={className} style={style}>
      {children}
    </MotionTag>
  );
};

export default FadeRise;
