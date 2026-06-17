import Hero from "@/components/site/Hero";
import LogoBar from "@/components/site/LogoBar";
import PainSection from "@/components/site/PainSection";

const Site = () => {
  return (
    <main className="bg-background">
      <Hero />
      <LogoBar />
      <PainSection />
    </main>
  );
};

export default Site;
