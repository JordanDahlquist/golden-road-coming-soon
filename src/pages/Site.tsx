import Hero from "@/components/site/Hero";
import LogoBar from "@/components/site/LogoBar";
import PainSection from "@/components/site/PainSection";
import ServicesSection from "@/components/site/ServicesSection";
import ExpertiseSection from "@/components/site/ExpertiseSection";
import TrustSection from "@/components/site/TrustSection";
import ProcessSection from "@/components/site/ProcessSection";
import StorySection from "@/components/site/StorySection";
import ContactSection from "@/components/site/ContactSection";

const Site = () => {
  return (
    <main className="bg-background">
      <Hero />
      <LogoBar />
      <PainSection />
      <ServicesSection />
      <ExpertiseSection />
      <TrustSection />
      <ProcessSection />
      <StorySection />
      <ContactSection />
    </main>
  );
};

export default Site;
