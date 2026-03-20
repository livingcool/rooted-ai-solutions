import { motion } from "framer-motion";

const caseStudies = [
  {
    client: "Global Logistics Corp",
    impact: "90% Automation",
    description: "Replaced manual invoice auditing with AI agents.",
    metric: "Saved $2.4M/yr",
    category: "LVO"
  },
  {
    client: "FinTech Prime",
    impact: "Zero Breaches",
    description: "Implemented real-time compliance monitoring.",
    metric: "100% Audit Score",
    category: "SAFETY"
  },
  {
    client: "HealthSync AI",
    impact: "10x Accuracy",
    description: "Reduced patient query hallucinations.",
    metric: "99.9% Reliable",
    category: "NLP"
  },
  {
    client: "RetailFlow",
    impact: "60% Efficiency",
    description: "Automated inventory predictions across 500 stores.",
    metric: "Near-Zero Waste",
    category: "PREDICTIVE"
  }
];

const CaseStudies = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <p className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-black mb-4">
          // RECENT DEPLOYMENTS
        </p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
          Real Impact, Real Speed.
        </h2>
      </div>

      <div className="flex relative items-center">
        {/* Infinite Marquee Loop */}
        <div className="flex gap-6 animate-logo-slide whitespace-nowrap">
          {[...caseStudies, ...caseStudies].map((study, idx) => (
            <div 
              key={idx}
              className="flex-shrink-0 w-[300px] md:w-[400px] p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-colors duration-500"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono p-1 px-2 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                  {study.category}
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">{study.impact}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">{study.client}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 whitespace-normal">{study.description}</p>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-xs font-black tracking-widest text-slate-900 dark:text-white uppercase">{study.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;