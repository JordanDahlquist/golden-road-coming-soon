import type { CSSProperties, ElementType, ReactNode } from "react";
import MotionGroup from "./MotionGroup";
import { SITE_DURATIONS } from "@/lib/motion";

type SectionEnterProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  staggerChildren?: number;
  delayChildren?: number;
  /** Fraction of the section that must be visible before children animate. */
  amount?: number;
};

/**
 * Standard section-enter pattern. Wrap a section's content; child
 * primitives (e.g. `<FadeRise trigger="child" />`) will stagger in when
 * the section scrolls into view. Use this for any future section so the
 * site shares one consistent on-scroll arrival rhythm.
 */
const SectionEnter = ({
  children,
  as = "div",
  className,
  style,
  staggerChildren = SITE_DURATIONS.stagger,
  delayChildren = 0,
  amount = 0.3,
}: SectionEnterProps) => (
  <MotionGroup
    as={as}
    trigger="in-view"
    staggerChildren={staggerChildren}
    delayChildren={delayChildren}
    amount={amount}
    className={className}
    style={style}
  >
    {children}
  </MotionGroup>
);

export default SectionEnter;
