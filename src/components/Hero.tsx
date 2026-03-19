import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { motion, AnimatePresence } from "framer-motion";
import ParallaxFloating from "@/components/ui/parallax-floating";

const Hero = () => {
  const words = ["Intelligence", "Automation", "Safety", "Compliance", "The Scale", "The Future"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16">
      <ParallaxFloating />
      <div className="container mx-auto px-2 relative z-10 text-center">

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold font-heading text-black dark:text-white tracking-tight leading-tight flex flex-col md:flex-row items-center justify-center gap-y-2 md:gap-y-0 gap-x-0 md:gap-x-4 mb-16 px-4">
          <span className="shrink-0">Engineering</span>
          <span className="relative inline-block min-w-[280px] md:min-w-[500px] text-center md:text-left"> {/* Fixed width container to prevent layout shift */}
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -20, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute left-0 top-0 w-full md:w-auto text-center md:text-left bg-gradient-to-r from-gray-500 via-gray-800 to-black dark:from-gray-100 dark:via-gray-300 dark:to-gray-500 bg-clip-text text-transparent whitespace-nowrap"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
            {/* Invisible placeholder using the longest word to maintain constant width and prevent "Engineering" from shifting */}
            <span className="opacity-0 block whitespace-nowrap" aria-hidden="true">Intelligence</span>
          </span>
        </h1>





        {/* Constant CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <MagneticButton>
            <Button
              size="lg"
              variant="glow"
              className="text-lg font-semibold h-14 px-8 rounded-full"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Custom Solution
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              size="lg"
              variant="outline"
              className="text-lg font-semibold h-14 px-8 rounded-full ml-4 border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
              onClick={() => window.location.href = '/services/ai-safety'}
            >
              AI Safety Audit
            </Button>
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;