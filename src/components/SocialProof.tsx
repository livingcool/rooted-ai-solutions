import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
    <section className="py-24 relative overflow-hidden bg-white dark:bg-[#0a0f14]">
      {/* Background Data Wave */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <motion.path
            d="M0,200 C360,100 720,300 1080,200 L1440,300"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-blue-500"
            animate={{ d: ["M0,200 C360,100 720,300 1080,200 L1440,300", "M0,250 C360,150 720,350 1080,250 L1440,350", "M0,200 C360,100 720,300 1080,200 L1440,300"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="relative group"
            >
              {/* Shard Background */}
              <div className={`absolute -inset-4 bg-gradient-to-br ${stat.color} to-transparent rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700`} />
              
              <div className="relative glass-premium p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-3xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                <div className="space-y-2 md:space-y-3">
                  <div className="text-3xl md:text-6xl font-black text-black dark:text-white tracking-tighter">
                    {stat.displayValue ? (
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {stat.displayValue}
                      </span>
                    ) : (
                      <Counter value={stat.value} />
                    )}
                  </div>
                  <div className="h-1 w-12 bg-blue-500/30 rounded-full group-hover:w-20 transition-all duration-500" />
                  <p className="text-sm md:text-md text-muted-foreground uppercase tracking-[0.2em] font-bold opacity-60 group-hover:opacity-100 transition-opacity">
                    {stat.label}
                  </p>
                </div>
                
                {/* Minimalist Grid Pattern inside shard */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
