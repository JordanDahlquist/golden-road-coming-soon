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
  /**
   * Visibility trigger. Defaults to "some" — any pixel of the section in view
   * fires the children. A fractional amount can be wider than the viewport on
   * mobile (tall sections), which would silently disable scroll-triggered
   * motion. "some" guarantees mobile parity with desktop.
   */
  amount?: number | "some" | "all";
};

const SectionEnter = ({
  children,
  as = "div",
  className,
  style,
  staggerChildren = SITE_DURATIONS.stagger,
  delayChildren = 0,
  amount = "some",
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
