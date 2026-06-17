import Hero from "@/components/site/Hero";
import LogoBar from "@/components/site/LogoBar";
import PainSection from "@/components/site/PainSection";
import ServicesSection from "@/components/site/ServicesSection";
import ExpertiseSection from "@/components/site/ExpertiseSection";

const Site = () => {
  return (
    <main className="bg-background">
      <Hero />
      <LogoBar />
      <PainSection />
      <ServicesSection />
      <ExpertiseSection />
    </main>
  );
};

export default Site;
