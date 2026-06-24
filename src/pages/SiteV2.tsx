import NavV2 from "@/components/site-v2/NavV2";
import HeroV2 from "@/components/site-v2/HeroV2";

const ANCHOR_CLASS = "scroll-mt-24 md:scroll-mt-28";

const SiteV2 = () => {
  return (
    <main className="bg-background">
      <NavV2 />
      <div id="hero" className={ANCHOR_CLASS}>
        <HeroV2 />
      </div>
      {/* Additional v2 sections will mount here in later prompts. */}
    </main>
  );
};

export default SiteV2;
