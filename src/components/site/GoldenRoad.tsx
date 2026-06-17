import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GoldenRoad
 * A signature scroll-linked SVG path that draws down the page as a thin
 * gold "road". Lives as an absolute overlay inside a relatively-positioned
 * wrapper that spans from after the Hero through the Contact section.
 *
 * The parent wrapper is expected to be `relative` and set the bounds.
 */
const GOLD = "#e5b555";

const GoldenRoad = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const mobileGlowRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setup = (path: SVGPathElement | null, glow: SVGCircleElement | null) => {
      if (!path) return null;
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: reduce ? 0 : length,
      });
      if (glow) gsap.set(glow, { opacity: reduce ? 0 : 0 });
      return length;
    };

    const desktopLen = setup(pathRef.current, glowRef.current);
    const mobileLen = setup(mobilePathRef.current, mobileGlowRef.current);

    if (reduce || !wrapperRef.current) return;

    const animate = (
      path: SVGPathElement | null,
      glow: SVGCircleElement | null,
      length: number | null,
    ) => {
      if (!path || !length) return null;
      const trigger = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          const offset = length * (1 - progress);
          path.style.strokeDashoffset = String(offset);
          if (glow) {
            const point = path.getPointAtLength(length - offset);
            glow.setAttribute("cx", String(point.x));
            glow.setAttribute("cy", String(point.y));
            glow.style.opacity = progress > 0.01 && progress < 0.99 ? "1" : "0";
          }
        },
      });
      return trigger;
    };

    const t1 = animate(pathRef.current, glowRef.current, desktopLen);
    const t2 = animate(mobilePathRef.current, mobileGlowRef.current, mobileLen);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(wrapperRef.current);

    return () => {
      t1?.kill();
      t2?.kill();
      ro.disconnect();
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      {/* Desktop: winding road through negative-space column */}
      <svg
        className="absolute inset-0 hidden h-full w-full md:block"
        preserveAspectRatio="none"
        viewBox="0 0 100 1000"
        fill="none"
      >
        <defs>
          <radialGradient id="gr-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.9" />
            <stop offset="60%" stopColor={GOLD} stopOpacity="0.15" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          ref={pathRef}
          d="M 38 0
             C 38 90, 22 140, 22 220
             S 52 340, 52 430
             S 28 560, 28 650
             S 56 780, 50 870
             S 42 960, 44 1000"
          stroke={GOLD}
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.95"
        />
        <circle ref={glowRef} r="6" fill="url(#gr-glow)" opacity="0" />
      </svg>

      {/* Mobile: gentler, edge-aligned spine */}
      <svg
        className="absolute inset-0 block h-full w-full md:hidden"
        preserveAspectRatio="none"
        viewBox="0 0 100 1000"
        fill="none"
      >
        <defs>
          <radialGradient id="gr-glow-m" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.9" />
            <stop offset="60%" stopColor={GOLD} stopOpacity="0.15" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          ref={mobilePathRef}
          d="M 10 0
             C 10 200, 14 400, 12 600
             S 8 850, 10 1000"
          stroke={GOLD}
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.95"
        />
        <circle ref={mobileGlowRef} r="5" fill="url(#gr-glow-m)" opacity="0" />
      </svg>
    </div>
  );
};

export default GoldenRoad;
