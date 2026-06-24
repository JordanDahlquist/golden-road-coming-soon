import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import logo from "@/assets/logo.png";

/**
 * Premium one-shot intro overlay for /site.
 * - Plays once per session (sessionStorage flag).
 * - Crosshair guide lines draw in, logo resolves at center, then the logo
 *   morphs precisely into the nav logo position while the overlay fades.
 * - Respects prefers-reduced-motion: renders nothing.
 * - GPU-only transforms/opacity. ~2s total.
 */

const FLAG = "grs_intro_played_v1";
const EASE = [0.22, 1, 0.36, 1] as const;

const SiteIntro = () => {
  const [mounted, setMounted] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [overlayFading, setOverlayFading] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);
  const controls = useAnimation();

  // Decide synchronously whether to render at all.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const played = sessionStorage.getItem(FLAG);
    if (played || reduce) {
      // mark played so nav logo isn't hidden, ensure scroll unlocked
      sessionStorage.setItem(FLAG, "1");
      document.documentElement.classList.remove("intro-active");
      document.body.style.overflow = "";
      setRemoved(true);
      return;
    }
    // Activate intro: hide nav logo + lock scroll.
    document.documentElement.classList.add("intro-active");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sessionStorage.setItem(FLAG, "1");
    setMounted(true);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.documentElement.classList.remove("intro-active");
    };
  }, []);

  // Run the timeline once the overlay is mounted.
  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    const run = async () => {
      // wait for layout + initial line/logo reveal (~1300ms)
      await new Promise((r) => setTimeout(r, 1300));
      if (cancelled) return;
      // Measure target nav logo and morph
      const target = document.getElementById("nav-logo");
      const el = logoRef.current;
      if (target && el) {
        const t = target.getBoundingClientRect();
        const c = el.getBoundingClientRect();
        const scale = t.height / c.height;
        const dx = t.left + t.width / 2 - (c.left + c.width / 2);
        const dy = t.top + t.height / 2 - (c.top + c.height / 2);
        // Start overlay fade in parallel with morph
        setOverlayFading(true);
        await controls.start({
          x: dx,
          y: dy,
          scale,
          transition: { duration: 0.65, ease: EASE },
        });
      } else {
        setOverlayFading(true);
        await new Promise((r) => setTimeout(r, 400));
      }
      if (cancelled) return;
      // Reveal nav logo, then remove overlay
      document.documentElement.classList.remove("intro-active");
      await new Promise((r) => setTimeout(r, 60));
      if (cancelled) return;
      document.body.style.overflow = "";
      setRemoved(true);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [mounted, controls]);

  if (removed || !mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ willChange: "opacity" }}
    >
      {/* Background panel (fades on resolve) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: overlayFading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="absolute inset-0"
        style={{ backgroundColor: "#161515" }}
      />

      {/* Crosshair guides */}
      <div
        className="absolute inset-0"
        style={{
          opacity: overlayFading ? 0 : 1,
          transition: "opacity 500ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* horizontal */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="absolute left-0 right-0 top-1/2 h-px"
          style={{
            backgroundColor: "#e5b555",
            opacity: 0.35,
            transformOrigin: "50% 50%",
          }}
        />
        {/* vertical */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          className="absolute top-0 bottom-0 left-1/2 w-px"
          style={{
            backgroundColor: "#e5b555",
            opacity: 0.25,
            transformOrigin: "50% 50%",
          }}
        />
        {/* faint charcoal frame */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className="absolute inset-6 md:inset-10 border border-off-white/5"
        />
      </div>

      {/* Centered logo that morphs to nav position */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 8 }}
          animate={controls}
          onAnimationStart={() => {
            // first animate-in
          }}
          style={{ transformOrigin: "50% 50%", willChange: "transform, opacity" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.4 }}
          >
            <div className="relative">
              <img
                ref={logoRef}
                src={logo}
                alt=""
                draggable={false}
                className="h-12 md:h-16 w-auto select-none"
                style={{ display: "block" }}
              />
              {/* Gold sweep */}
              <motion.div
                initial={{ x: "-110%", opacity: 0 }}
                animate={{ x: "120%", opacity: [0, 0.7, 0] }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3"
                style={{
                  background:
                    "linear-gradient(100deg, transparent 0%, rgba(229,181,85,0.45) 50%, transparent 100%)",
                  mixBlendMode: "screen",
                  filter: "blur(6px)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SiteIntro;
