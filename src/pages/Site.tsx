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

// Anchor-target wrappers. The id + scroll-margin lets the fixed nav land
// each section below the bar without altering section internals.
const ANCHOR_CLASS = "scroll-mt-24 md:scroll-mt-28";

const Site = () => {
  return (
    <main className="bg-background">
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
