import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Hero = () => {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.15, delayChildren: reduce ? 0 : 0.1 },
    },
  };

  const item: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative min-h-screen bg-background text-off-white flex flex-col">
      {/* Slim header bar */}
      <header className="w-full px-6 md:px-12 lg:px-20 pt-8 md:pt-10">
        <a href="/" aria-label="Golden Road Strategies" className="inline-block">
          <img
            src={logo}
            alt="Golden Road Strategies"
            className="h-10 md:h-12 w-auto select-none"
            draggable={false}
          />
        </a>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-3xl"
        >
          <motion.h1
            variants={item}
            className="font-serif text-off-white text-5xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5rem] leading-[1.05] tracking-tight"
          >
            Build the financial infrastructure your next stage demands.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 md:mt-10 font-sans text-base md:text-lg leading-relaxed text-off-white/70 max-w-[55ch]"
          >
            Golden Road Strategies gives forward-thinking CEOs, founders, and boards
            the forward-looking CFO leadership to optimize capital, sharpen
            decisions, and clear a path to sustainable scale.
          </motion.p>

          <motion.div variants={item} className="mt-10 md:mt-12 flex flex-col items-start gap-5">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-gold text-background hover:bg-gold/90 font-sans tracking-wide px-8 py-6 text-sm uppercase rounded-none"
            >
              <a href="#contact">Start the Conversation</a>
            </Button>

            <a
              href="#process"
              className="group inline-flex items-center gap-2 font-sans text-sm text-off-white/70 hover:text-off-white transition-colors"
            >
              <span className="story-link">See how it works</span>
              <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
