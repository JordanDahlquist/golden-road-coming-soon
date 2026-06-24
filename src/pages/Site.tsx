import { useEffect } from "react";
import Hero from "@/components/site/Hero";
import KpiBand from "@/components/site/KpiBand";


import PainSection from "@/components/site/PainSection";
import ServicesSection from "@/components/site/ServicesSection";
import ExpertiseSection from "@/components/site/ExpertiseSection";
import TrustSection from "@/components/site/TrustSection";
import ProcessSection from "@/components/site/ProcessSection";
import StorySection from "@/components/site/StorySection";
import ContactSection from "@/components/site/ContactSection";
import SiteNav from "@/components/site/SiteNav";
import SiteIntro from "@/components/site/SiteIntro";

// Anchor-target wrappers. The id + scroll-margin lets the fixed nav land
// each section below the bar without altering section internals.
const ANCHOR_CLASS = "scroll-mt-24 md:scroll-mt-28";

const Site = () => {
  // Touch devices have no hover, so deliver the gold edge + glow + lift as
  // a scroll-into-view "active" moment per .luxe-card, then settle back to
  // a quiet persistent hairline. Desktop hover behavior is untouched.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (!isTouch) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".luxe-card"));
    if (!cards.length) return;
    if (reduce) {
      cards.forEach((c) => c.setAttribute("data-reveal", "settled"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          if (el.dataset.reveal) return;
          el.setAttribute("data-reveal", "active");
          window.setTimeout(() => el.setAttribute("data-reveal", "settled"), 900);
          io.unobserve(el);
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <main className="bg-background">

      <SiteIntro />
      <SiteNav />
      <div id="hero" className={ANCHOR_CLASS}>
        <Hero />
      </div>
      <KpiBand />
      <div id="pain" className={ANCHOR_CLASS}>
        <PainSection />
      </div>

      <div id="services" className={ANCHOR_CLASS}>
        <ServicesSection />
      </div>
      <div id="expertise" className={ANCHOR_CLASS}>
        <ExpertiseSection />
      </div>
      <TrustSection />
      <ProcessSection />
      <div id="story" className={ANCHOR_CLASS}>
        <StorySection />
      </div>
      <div className={ANCHOR_CLASS}>
        <ContactSection />
      </div>
    </main>
  );
};

export default Site;
