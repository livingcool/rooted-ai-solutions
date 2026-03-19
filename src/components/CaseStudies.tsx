import { useState } from "react";
import { ArrowRight, Building, TrendingDown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    title: "WhatsApp Pet Food Ordering Automation",
    clientType: "Pet Food Distributor",
    problem: "Manual order entry via WhatsApp led to 15% error rate and 2+ hour response time",
    solution: "Built AI agent to auto-parse orders, validate inventory, send confirmations",
    metric: "100% Automated",
    subMetric: "Replaced 3 data-entry staff",
    impact: "0% errors, instant confirmations",
    tags: ["WhatsApp Automation", "Order Processing"],
    link: "https://www.linkedin.com/pulse/5-critical-automation-mistakes-indian-smes-make-how-fix-them-u5tme/?trackingId=Qp1WkEtnRk2IZi0eQcpYTQ%3D%3D"
  },
  {
    title: "Voter Verification Automation",
    clientType: "Government / NGO",
    problem: "Manual comparison of 50,000+ voter records took weeks and was error-prone",
    solution: "Automated data archaeology system to compare 2002 vs 2024 voter lists",
    metric: "99.8% Accuracy",
    subMetric: "Completed in 3 days vs 4 weeks",
    impact:
      "85% time saved",
    tags: ["Government", "Data Analysis", "Verification"],
    link: "https://www.linkedin.com/pulse/data-archaeology-comparing-2002-vs-2024-voter-lists-rootdai-bo0me/?trackingId=VFBJkwh6CiBd8GfgPZUHUw%3D%3D"
  },
  {
    title: "E-Commerce Inventory Optimization",
    clientType: "Logistics Firm",
    problem: "Overstocking led to 25% wastage; understocking caused lost sales",
    solution: "Predictive ML model for demand forecasting with real-time stock alerts",
    metric: "23% Cost Saving",
    subMetric: "Reduced wastage from 25% to 7%",
    impact: "₹12L saved annually",
    tags: ["Predictive Analytics", "Supply Chain"],
    link: null
  }
];

const CaseStudies = () => {
  const [activeTab, setActiveTab] = useState<number | null>(0);

  const handleBookCall = () => {
    const message = encodeURIComponent("Hi, I'd like to see if you can automate my process in 7 days. Let's book a 20-min call.");
    window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
  };

  return (
    <section id="case-studies" className="py-24 border-t border-black/10 dark:border-white/10 relative overflow-hidden bg-slate-50/50 dark:bg-black">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-7xl font-black text-black dark:text-white tracking-tighter">
              PROVEN IMPACT
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg font-light border-l-2 border-blue-500 pl-4">
              We don't just build software. We engineer outcomes.
            </p>
          </div>
        </div>

        {/* Layered Spotlight Layout */}
        <div className="flex flex-col lg:flex-row h-[700px] gap-2 lg:gap-4 overflow-hidden rounded-[2.5rem]">
          {caseStudies.map((study, index) => {
            const isActive = activeTab === index;
            return (
              <div
                key={index}
                className={`relative group cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-end p-8 md:p-12 overflow-hidden
                  ${isActive ? 'flex-[3] bg-white dark:bg-slate-900 shadow-2xl scale-[1.01] z-10' : 'flex-1 bg-slate-100 dark:bg-stone-900 grayscale opacity-80'}
                `}
                onMouseEnter={() => setActiveTab(index)}
              >
                {/* Motion Graphic Overlays */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {/* Case 1: WhatsApp - Messenger Bubbles */}
                  {index === 0 && (
                    <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                      <div className="absolute top-10 left-10 w-24 h-12 bg-blue-500 rounded-2xl rounded-bl-none animate-bounce" />
                      <div className="absolute top-32 right-12 w-32 h-14 bg-green-500 rounded-2xl rounded-br-none animate-[bounce_2s_infinite]" style={{ animationDelay: '0.5s' }} />
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />
                    </div>
                  )}

                  {/* Case 2: Voter - Archeology Grid */}
                  {index === 1 && (
                    <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-20 transition-opacity">
                      <div className="absolute top-0 -left-1/4 w-[150%] h-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent skew-x-12 animate-scan" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[80%] h-[80%] border border-dashed border-purple-500/30 rounded-full animate-[spin_20s_linear_infinite]" />
                      </div>
                    </div>
                  )}

                  {/* Case 3: Inventory - Flow Chart */}
                  {index === 2 && (
                    <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-15 transition-opacity">
                      <div className="absolute bottom-0 w-full h-[30%] flex justify-around items-end">
                        <div className="w-[15%] bg-pink-500 h-[40%] animate-[grow_3s_infinite]" />
                        <div className="w-[15%] bg-pink-500 h-[70%] animate-[grow_3s_infinite]" style={{ animationDelay: '0.5s' }} />
                        <div className="w-[15%] bg-pink-500 h-[90%] animate-[grow_3s_infinite]" style={{ animationDelay: '1s' }} />
                        <div className="w-[15%] bg-pink-500 h-[60%] animate-[grow_3s_infinite]" style={{ animationDelay: '1.5s' }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Vertical Sidebar Header (Only visible when collapsed) */}
                {!isActive && (
                  <div className="absolute inset-0 flex items-center justify-center rotate-[-90deg]">
                    <span className="text-2xl font-black text-slate-400 dark:text-stone-600 whitespace-nowrap uppercase tracking-[0.5em]">
                      {study.title.split(' ')[0]}
                    </span>
                  </div>
                )}

                {/* Active Content */}
                <div className={`relative z-10 space-y-8 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

                  {/* Bold Tags & Client */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <span className="text-xs font-mono font-bold text-blue-500 bg-blue-500/10 px-3 py-1 rounded-sm uppercase tracking-widest">
                      {study.tags[0]}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-widest font-black">
                      <Building className="w-4 h-4" />
                      {study.clientType}
                    </div>
                  </div>

                  {/* High-Impact Title */}
                  <h3 className="text-4xl md:text-5xl font-black text-black dark:text-white leading-[1.1] max-w-2xl">
                    {study.title}
                  </h3>

                  {/* Detailed Problem/Solution Grid */}
                  <div className="grid md:grid-cols-2 gap-8 py-8 border-y border-black/5 dark:border-white/5">
                    <div className="space-y-3">
                      <div className="text-red-500 font-bold text-xs uppercase tracking-[0.2em]">The Challenge //</div>
                      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light italic">
                        "{study.problem}"
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="text-green-500 font-bold text-xs uppercase tracking-[0.2em]">The Breakthrough //</div>
                      <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {study.solution}
                      </p>
                    </div>
                  </div>

                  {/* Impact Stats & Link */}
                  <div className="flex flex-col md:flex-row justify-between items-end gap-8 pt-4">
                    <div className="flex gap-12">
                      <div className="space-y-1">
                        <div className="text-6xl font-black text-black dark:text-white tracking-tighter">
                          {study.metric.split(' ')[0]}
                          <span className="text-3xl ml-1">{study.metric.split(' ')[1] || ''}</span>
                        </div>
                        <div className="text-xs font-mono text-blue-500 uppercase font-black">Result: {study.metric.split(' ')[1] ? '' : 'Impact'}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xl font-bold text-slate-800 dark:text-slate-200">{study.subMetric}</div>
                        <div className="text-xs text-muted-foreground uppercase">{study.impact}</div>
                      </div>
                    </div>

                    {study.link ? (
                      <a
                        href={study.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex items-center gap-6 text-black dark:text-white hover:text-blue-500 transition-colors"
                      >
                        <span className="text-sm font-black uppercase tracking-[0.3em] border-b-2 border-transparent group-hover/btn:border-blue-500 transition-all">Deep Dive</span>
                        <div className="w-12 h-12 rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center group-hover/btn:bg-blue-500 group-hover/btn:border-blue-500 transition-all">
                          <ArrowRight className="w-5 h-5 group-hover/btn:text-white transition-colors" />
                        </div>
                      </a>
                    ) : (
                      <div className="px-6 py-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                        <span className="text-xs font-mono text-muted-foreground uppercase opacity-50 tracking-widest">Report Pending</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes grow {
           0%, 100% { transform: scaleY(1); }
           50% { transform: scaleY(1.4); }
        }
      `}</style>
    </section>
  );
};

export default CaseStudies;