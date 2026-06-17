import type { Variants } from "framer-motion";

/**
 * Canonical site easing. All site motion uses this cubic-bezier so the
 * whole experience shares one rhythmic feel.
 */
export const SITE_EASE = [0.22, 1, 0.36, 1] as const;

/** Default timings used across primitives. */
export const SITE_DURATIONS = {
  /** Masked-line reveal (per line). */
  line: 0.9,
  /** Fade-rise items (subheads, CTAs, section elements). */
  rise: 0.6,
  /** Default stagger between siblings in a group. */
  stagger: 0.12,
} as const;

/** Default translateY (px) for fade-rise. */
export const SITE_RISE_Y = 20;

type GroupOpts = {
  delayChildren?: number;
  staggerChildren?: number;
  reduce?: boolean;
};

/** Variants for a parent that staggers children. */
export const groupVariants = ({
  delayChildren = 0,
  staggerChildren = SITE_DURATIONS.stagger,
  reduce = false,
}: GroupOpts = {}): Variants => ({
  hidden: {},
  show: {
    transition: {
      delayChildren: reduce ? 0 : delayChildren,
      staggerChildren: reduce ? 0 : staggerChildren,
    },
  },
});

type LineRevealOpts = {
  duration?: number;
  reduce?: boolean;
};

/**
 * Variants for a single line of a masked headline reveal. The line rises
 * from translateY 100% → 0 (revealed from behind an overflow-hidden mask)
 * while fading in. Pair with `groupVariants` on the parent.
 */
export const lineRevealVariants = ({
  duration = SITE_DURATIONS.line,
  reduce = false,
}: LineRevealOpts = {}): Variants => ({
  hidden: reduce ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: reduce ? 0 : duration, ease: SITE_EASE },
  },
});

type FadeRiseOpts = {
  duration?: number;
  y?: number;
  reduce?: boolean;
};

/**
 * Variants for fade + small translateY rise. Used for subheads, CTAs,
 * scroll cues, and any section element that should arrive softly.
 */
export const fadeRiseVariants = ({
  duration = SITE_DURATIONS.rise,
  y = SITE_RISE_Y,
  reduce = false,
}: FadeRiseOpts = {}): Variants => ({
  hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduce ? 0 : duration, ease: SITE_EASE },
  },
});
