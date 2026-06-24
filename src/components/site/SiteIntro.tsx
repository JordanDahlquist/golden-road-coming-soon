import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import logo from "@/assets/logo.png";

/**
 * Premium one-shot intro overlay for /site.
 * Visually mirrors the coming-soon page (src/pages/Index.tsx): identical
 * gradient overlay, gold accent lines, centered lettermark, and gold divider.
 * Animates them in, holds briefly, then resolves by fading the accents and
 * morphing the centered logo precisely into the nav logo position.
 *
 * - Plays once per session (sessionStorage flag).
 * - Respects prefers-reduced-motion (renders nothing).
 * - GPU-only transforms/opacity. ~2s total.
 */

const FLAG = "grs_intro_played_v1";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SiteIntro = () => {
  const [mounted, setMounted] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [resolving, setResolving] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);
  const logoControls = useAnimation();

  // Decide synchronously whether to render at all.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const played = sessionStorage.getItem(FLAG);
    if (played || reduce) {
      sessionStorage.setItem(FLAG, "1");
      document.documentElement.classList.remove("intro-active");
      document.body.style.overflow = "";
      setRemoved(true);
      return;
    }
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

  // Run the resolve timeline once mounted.
  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    const run = async () => {
      // Let the in-state play, then hold (~1.3s total before resolve)
      await new Promise((r) => setTimeout(r, 1300));
      if (cancelled) return;

      // Measure morph target (the nav logo, hidden via .intro-active)
      const target = document.getElementById("nav-logo");
      const el = logoRef.current;
      setResolving(true);
      if (target && el) {
        const t = target.getBoundingClientRect();
        const c = el.getBoundingClientRect();
        const scale = t.height / c.height;
        const dx = t.left + t.width / 2 - (c.left + c.width / 2);
        const dy = t.top + t.height / 2 - (c.top + c.height / 2);
        await logoControls.start({
          x: dx,
          y: dy,
          scale,
          transition: { duration: 0.7, ease: EASE },
        });
      } else {
        await new Promise((r) => setTimeout(r, 500));
      }
      if (cancelled) return;
      // Hand off to the real nav logo, then strip overlay
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
  }, [mounted, logoControls]);

  if (removed || !mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] pointer-events-none"
    >
      {/* Base near-black + gradient overlay, fades on resolve */}
      <motion.div
        className="absolute inset-0 bg-background"
        initial={{ opacity: 1 }}
        animate={{ opacity: resolving ? 0 : 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-deep via-background to-charcoal opacity-80" />

        {/* Animated gold accent lines (same positions/gradients as Index.tsx) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: resolving ? 0 : 1 }}
            transition={{ duration: resolving ? 0.5 : 0.6, delay: resolving ? 0 : 0.05, ease: EASE }}
          />
          <motion.div
            className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: resolving ? 0 : 1 }}
            transition={{ duration: resolving ? 0.5 : 0.6, delay: resolving ? 0 : 0.15, ease: EASE }}
          />
          <motion.div
            className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: resolving ? 0 : 1 }}
            transition={{ duration: resolving ? 0.5 : 0.6, delay: resolving ? 0 : 0.25, ease: EASE }}
          />
        </div>

        {/* Bottom accent */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: resolving ? 0 : 1 }}
          transition={{ duration: resolving ? 0.5 : 0.7, delay: resolving ? 0 : 0.4, ease: EASE }}
        />
      </motion.div>

      {/* Centered logo + divider (logo morphs to nav on resolve) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          className="mb-16"
          initial={{ y: 0, scale: 1, x: 0 }}
          animate={logoControls}
          onUpdate={() => {}}
          style={{ willChange: "transform, opacity", transformOrigin: "50% 50%" }}
        >
          {/* Run the entrance via a nested motion to keep `logoControls` free for morph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <img
              ref={logoRef}
              src={logo}
              alt=""
              draggable={false}
              className="w-72 sm:w-96 md:w-[480px] h-auto select-none"
            />
          </motion.div>
        </motion.div>

        {/* Gold divider, fades out on resolve */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-gold to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{
            width: 96,
            opacity: resolving ? 0 : 1,
          }}
          transition={{
            width: { duration: 0.6, delay: 0.3, ease: EASE },
            opacity: resolving
              ? { duration: 0.4, ease: EASE }
              : { duration: 0.6, delay: 0.3, ease: EASE },
          }}
        />
      </div>
    </div>
  );
};

export default SiteIntro;
