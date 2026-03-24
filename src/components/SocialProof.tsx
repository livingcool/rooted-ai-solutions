import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Counter = ({ value }: { value: string }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    let start = 0;
    const end = numericValue;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <span>
      {numericValue % 1 === 0 ? Math.floor(count) : count.toFixed(1)}
      {suffix}
    </span>
  );
};

const stats = [
  { value: "50+", label: "Deployments", color: "from-blue-500/20" },
  { value: "0", label: "Incidents", color: "from-green-500/20", displayValue: "Zero" },
  { value: "99.8%", label: "Accuracy", color: "from-purple-500/20" },
  { value: "40%", label: "Cost Reduction", color: "from-orange-500/20" },
];

const SocialProof = () => {
  return (
    <section className="py-8 md:py-12 relative overflow-hidden bg-transparent">
      {/* Background Data Wave - More subtle */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <motion.path
            d="M0,200 C360,100 720,300 1080,200 L1440,300"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-primary"
            animate={{ d: ["M0,200 C360,100 720,300 1080,200 L1440,300", "M0,250 C360,150 720,350 1080,250 L1440,350", "M0,200 C360,100 720,300 1080,200 L1440,300"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="relative group h-full"
            >
              <div className="relative h-full p-4 md:p-6 transition-all duration-500">
                <div className="space-y-1.5 md:space-y-2 relative z-10">
                  <div className="text-2xl md:text-5xl font-black text-black dark:text-white tracking-tighter transition-transform duration-500 group-hover:scale-105 origin-left">
                    {stat.displayValue ? (
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {stat.displayValue}
                      </span>
                    ) : (
                      <Counter value={stat.value} />
                    )}
                  </div>
                  <div className="h-0.5 w-8 bg-primary/30 rounded-full group-hover:w-16 transition-all duration-700" />
                  <p className="text-[10px] md:text-xs text-slate-600 dark:text-slate-400 uppercase tracking-[0.25em] font-bold transition-opacity">
                    {stat.label}
                  </p>
                </div>
                
                {/* Glow Effect on Hover */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl md:rounded-[2rem] pointer-events-none",
                  "bg-gradient-to-br from-primary/5 to-transparent"
                )} />

                {/* Animated scan line */}
                <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent -translate-x-full group-hover:animate-scan pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
