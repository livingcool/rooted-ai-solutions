import { motion } from "framer-motion";

const caseStudies = [
  {
    client: "Global Logistics Corp",
    challenge: "Manual invoice auditing and high error rates in processing 10k+ monthly documents.",
    solution: "Deployed autonomous AI agents to parse, validate, and reconcile invoices in real-time.",
    result: "90% Automation and $2.4M saved annually.",
    impact: "90% Automation",
    metric: "Saved $2.4M/yr",
    category: "LVO"
  },
  {
    client: "FinTech Prime",
    challenge: "Scaling compliance monitoring for thousands of transactions with zero tolerance for errors.",
    solution: "Integrated real-time AI security protocols for automated threat detection and audit trails.",
    result: "Zero breaches and 100% audit accuracy score.",
    impact: "Zero Breaches",
    metric: "100% Audit Score",
    category: "SAFETY"
  },
  {
    client: "HealthSync AI",
    challenge: "High volume of patient queries leading to long wait times and occasional hallucinations.",
    solution: "Implemented RAG-based AI agents with strict medical guardrails and context awareness.",
    result: "10x accuracy improvement and 99.9% reliable response rates.",
    impact: "10x Accuracy",
    metric: "99.9% Reliable",
    category: "NLP"
  },
  {
    client: "RetailFlow",
    challenge: "Inefficient inventory management across 500+ stores causing excessive waste.",
    solution: "Custom predictive analytics engine forecasting demand with high granularity.",
    result: "60% efficiency gain and near-zero inventory waste.",
    impact: "60% Efficiency",
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
              <div className="space-y-2 mb-4">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Solution:</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-normal leading-relaxed">{study.solution}</p>
                <p className="text-xs text-green-600 dark:text-green-400 font-bold uppercase tracking-wider mt-2">Result:</p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 italic">"{study.result}"</p>
              </div>
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