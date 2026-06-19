import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GoldenRoad
 * A signature scroll-linked SVG path that draws as the user scrolls.
 * Confined to the empty right-side column (~60–85% viewport on desktop,
 * ~75–90% on mobile) so it never crosses left-anchored body copy.
 */
const GOLD = "#e5b555";

// Smooth winding path, viewBox 400 x 3000, hand-authored S-curves.
const ROAD_D = `M 200 0
  C 200 200, 120 380, 160 560
  S 280 900, 220 1120
  S 120 1480, 180 1700
  S 300 2060, 230 2280
  S 140 2640, 200 3000`;

// Mobile: gentler horizontal travel, hugs the right edge.
const ROAD_D_MOBILE = `M 300 0
  C 300 220, 260 460, 290 700
  S 340 1180, 300 1420
  S 250 1900, 295 2140
  S 330 2620, 300 3000`;

const GoldenRoad = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const mobileDotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setup = (path: SVGPathElement | null, dot: SVGCircleElement | null) => {
      if (!path) return null;
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: reduce ? 0 : length,
      });
      if (dot) gsap.set(dot, { opacity: 0 });
      return length;
    };

    const desktopLen = setup(pathRef.current, dotRef.current);
    const mobileLen = setup(mobilePathRef.current, mobileDotRef.current);

    if (reduce || !wrapperRef.current) return;

    const animate = (
      path: SVGPathElement | null,
      dot: SVGCircleElement | null,
      length: number | null,
    ) => {
      if (!path || !length) return null;
      return ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          const offset = length * (1 - progress);
          path.style.strokeDashoffset = String(offset);
          if (dot) {
            const point = path.getPointAtLength(length - offset);
            dot.setAttribute("cx", String(point.x));
            dot.setAttribute("cy", String(point.y));
            dot.style.opacity = progress > 0.005 && progress < 0.995 ? "1" : "0";
          }
        },
      });
    };

    const t1 = animate(pathRef.current, dotRef.current, desktopLen);
    const t2 = animate(mobilePathRef.current, mobileDotRef.current, mobileLen);

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
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      {/* Desktop: confined to right column ~60%–85% of viewport */}
      <svg
        className="absolute top-0 hidden h-full md:block"
        style={{ left: "60%", width: "25%" }}
        preserveAspectRatio="none"
        viewBox="0 0 400 3000"
        fill="none"
      >
        <defs>
          <filter id="gr-glow" x="-50%" y="-2%" width="200%" height="104%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        {/* Soft continuous glow under the stroke */}
        <path
          d={ROAD_D}
          stroke={GOLD}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.35"
          filter="url(#gr-glow)"
          style={{
            strokeDasharray: "var(--gr-dash)",
            strokeDashoffset: "var(--gr-offset)",
          }}
          ref={(el) => {
            // mirror dash offset of main path via inline binding
            if (el && pathRef.current) {
              const sync = () => {
                el.style.strokeDasharray = pathRef.current!.style.strokeDasharray;
                el.style.strokeDashoffset = pathRef.current!.style.strokeDashoffset;
                requestAnimationFrame(sync);
              };
              sync();
            }
          }}
        />
        {/* Main hairline */}
        <path
          ref={pathRef}
          d={ROAD_D}
          stroke={GOLD}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.95"
        />
        {/* Leading dot with glow */}
        <circle
          ref={dotRef}
          r="5"
          fill={GOLD}
          opacity="0"
          filter="url(#gr-glow)"
        />
        <circle
          r="2.5"
          fill={GOLD}
          opacity="0"
          ref={(el) => {
            if (el && dotRef.current) {
              const sync = () => {
                el.setAttribute("cx", dotRef.current!.getAttribute("cx") ?? "0");
                el.setAttribute("cy", dotRef.current!.getAttribute("cy") ?? "0");
                el.style.opacity = dotRef.current!.style.opacity;
                requestAnimationFrame(sync);
              };
              sync();
            }
          }}
        />
      </svg>

      {/* Mobile: hugs right edge ~75–90% of viewport */}
      <svg
        className="absolute top-0 block h-full md:hidden"
        style={{ left: "75%", width: "15%" }}
        preserveAspectRatio="none"
        viewBox="0 0 400 3000"
        fill="none"
      >
        <defs>
          <filter id="gr-glow-m" x="-50%" y="-2%" width="200%" height="104%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <path
          d={ROAD_D_MOBILE}
          stroke={GOLD}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.3"
          filter="url(#gr-glow-m)"
          ref={(el) => {
            if (el && mobilePathRef.current) {
              const sync = () => {
                el.style.strokeDasharray = mobilePathRef.current!.style.strokeDasharray;
                el.style.strokeDashoffset = mobilePathRef.current!.style.strokeDashoffset;
                requestAnimationFrame(sync);
              };
              sync();
            }
          }}
        />
        <path
          ref={mobilePathRef}
          d={ROAD_D_MOBILE}
          stroke={GOLD}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.95"
        />
        <circle
          ref={mobileDotRef}
          r="5"
          fill={GOLD}
          opacity="0"
          filter="url(#gr-glow-m)"
        />
      </svg>
    </div>
  );
};

export default GoldenRoad;
