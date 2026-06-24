import NavV2 from "@/components/site-v2/NavV2";
import HeroV2 from "@/components/site-v2/HeroV2";
import PhilosophyV2 from "@/components/site-v2/PhilosophyV2";
import QuoteV2 from "@/components/site-v2/QuoteV2";
import ServicesV2 from "@/components/site-v2/ServicesV2";
import ExpertiseV2 from "@/components/site-v2/ExpertiseV2";
import AdvantageV2 from "@/components/site-v2/AdvantageV2";
import EthosV2 from "@/components/site-v2/EthosV2";
import StoryV2 from "@/components/site-v2/StoryV2";
import ContactV2 from "@/components/site-v2/ContactV2";

const ANCHOR_CLASS = "scroll-mt-24 md:scroll-mt-28";

const SiteV2 = () => {
  return (
    <main className="bg-background">
      <NavV2 />
      <div id="hero" className={ANCHOR_CLASS}>
        <HeroV2 />
      </div>
      <PhilosophyV2 />
      <QuoteV2 />
      <div id="services" className={ANCHOR_CLASS}>
        <ServicesV2 />
      </div>
      <div id="expertise" className={ANCHOR_CLASS}>
        <ExpertiseV2 />
      </div>
      <div id="advantage" className={ANCHOR_CLASS}>
        <AdvantageV2 />
      </div>
      <EthosV2 />
      <div id="story" className={ANCHOR_CLASS}>
        <StoryV2 />
      </div>
      <ContactV2 />
    </main>
  );
};

export default SiteV2;
