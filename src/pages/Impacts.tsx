import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, animate, useMotionValue } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { ArrowRight, CheckCircle2, Zap, Target, TrendingUp, Cpu, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Counter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const countValue = useMotionValue(0);
  const rounded = useTransform(countValue, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    const controls = animate(countValue, numericValue, { duration: 2, ease: "easeOut" });
    return () => controls.stop();
  }, [value]);

  useEffect(() => {
    return rounded.onChange((v) => setDisplayValue(v.toString()));
  }, [rounded]);

  return <span>{displayValue}{suffix}</span>;
};

const Impacts = () => {
  const caseStudies = [
    {
      id: "voter-verification",
      category: "GOVERNMENT / NGO",
      sidebar: "WHATSAPP",
      title: "Voter Verification Automation",
      challenge: "Manual comparison of 50,000+ voter records took weeks and was error-prone.",
      breakthrough: "Automated data archaeology system to compare 2002 vs 2024 voter lists.",
      metrics: [
        { label: "Accuracy", value: "99.8%", suffix: "%", icon: <CheckCircle2 className="w-6 h-6 text-cyan-400" /> },
        { label: "Time Saved", value: "85%", suffix: "%", icon: <Zap className="w-6 h-6 text-blue-400" /> },
      ],
      result: "Completed in 3 days vs 4 weeks",
      color: "cyan",
      href: "https://www.linkedin.com/pulse/data-archaeology-comparing-2002-vs-2024-voter-lists-rootdai-bo0me/?trackingId=VFBJkwh6CiBd8GfgPZUHUw%3D%3D"
    },
    {
      id: "whatsapp-ordering",
      category: "D2C / COMMERCE",
      sidebar: "RETAIL",
      title: "WhatsApp Pet Food Ordering",
      challenge: "High drop-off in manual order taking via WhatsApp for pet food supplies.",
      breakthrough: "Autonomous agent for handling order flows, 24/7 WITHOUT human oversight.",
      metrics: [
        { label: "ROI Boost", value: "310%", suffix: "%", icon: <TrendingUp className="w-6 h-6 text-purple-400" /> },
        { label: "Response", value: "2", suffix: "s", icon: <Zap className="w-6 h-6 text-orange-400" /> },
      ],
      result: "Scaled to 1000+ orders/mo autonomously",
      color: "purple",
      href: "https://www.linkedin.com/pulse/5-critical-automation-mistakes-indian-smes-make-how-fix-them-u5tme/?trackingId=Qp1WkEtnRk2IZi0eQcpYTQ%3D%3D"
    },
    {
      id: "logistics-ai",
      category: "LOGISTICS / SCORING",
      sidebar: "SUPPLY",
      title: "Autonomous Demand Sensing",
      challenge: "Inventory forecasting lagging by 48h, causing $1.2M in quarterly overstock.",
      breakthrough: "Real-time vector-based demand mapping (COMING SOON).",
      metrics: [
        { label: "Status", value: "BETA", suffix: "", icon: <TrendingUp className="w-6 h-6 text-emerald-400" /> },
        { label: "Target", value: "45", suffix: "% ↓", icon: <Zap className="w-6 h-6 text-amber-400" /> },
      ],
      result: "Full Case Study Coming Soon",
      color: "emerald",
      href: "#",
      comingSoon: true
    }
  ];

  const globalMetrics = [
    { label: "Deployments", value: "50", suffix: "+", color: "text-white" },
    { label: "Incidents", value: "0", suffix: "", color: "text-cyan-400" },
    { label: "Accuracy", value: "99.8", suffix: "%", color: "text-white" },
    { label: "Cost Reduction", value: "40", suffix: "%", color: "text-white" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": caseStudies.map((study, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": study.title,
        "description": study.challenge,
        "url": study.href
      }
    }))
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-white selection:bg-cyan-500/30 selection:text-cyan-600 dark:selection:text-cyan-400 overflow-x-hidden transition-colors duration-500">
      <Seo 
        title="Proven AI Impacts & Case Studies" 
        description="Scalable AI solutions delivering 99.8% accuracy and 85% time savings. Explore our real-world deployments in Government, E-Commerce, and Logistics."
        keywords={["AI Case Studies", "Automation Impacts", "RootedAI Outcomes", "Voter ID Automation", "WhatsApp Business AI"]}
        structuredData={caseStudySchema}
      />
      <Navigation />
      
      {/* Hero Section with Grid Lines */}
      <div className="relative pt-40 pb-20 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#fff_70%,transparent_100%)]" />
        
        <main className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-l-2 border-cyan-500 pl-8 mb-24"
          >
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none text-slate-900 dark:text-white text-glow-cyan dark:text-glow-cyan">
              PROVEN<br />IMPACT
            </h1>
            <p className="text-xl md:text-3xl font-mono text-cyan-600 dark:text-cyan-500/80 mt-6 tracking-widest uppercase">
              // ENGINEERING OUTCOMES // NO EXCEPTIONS
            </p>
          </motion.div>

          {/* New Creative Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-px bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden mb-32 group backdrop-blur-3xl transition-colors">
            {globalMetrics.map((m, i) => (
              <div key={i} className="bg-white dark:bg-black p-8 md:p-12 relative overflow-hidden flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors duration-500 group/item">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent scale-x-0 group-hover/item:scale-x-100 transition-transform duration-700" />
                <div className={`text-5xl md:text-8xl font-black tracking-tighter mb-2 italic ${m.color === 'text-white' ? 'text-slate-900 dark:text-white' : m.color}`}>
                  <Counter value={m.value} suffix={m.suffix} />
                </div>
                <div className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-slate-500 group-hover/item:text-cyan-600 dark:group-hover/item:text-cyan-400 transition-colors">
                  {m.label}
                </div>
                <div className="absolute -bottom-10 -right-10 text-9xl font-black text-slate-900/5 dark:text-white/5 select-none pointer-events-none group-hover/item:text-cyan-500/10 transition-colors">
                  {i + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Impact Cards: Holographic Style */}
          <div className="space-y-48">
            {caseStudies.map((study, idx) => (
              <motion.div 
                key={study.id}
                id={study.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch"
              >
                {/* Horizontal Divider Line */}
                <div className="absolute -top-24 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent opacity-50" />

                {/* Sidebar Marker */}
                <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-start pt-4">
                  <span className="[writing-mode:vertical-rl] rotate-180 text-cyan-600 dark:text-cyan-500 font-mono tracking-[1em] text-[10px] uppercase opacity-40 animate-pulse">
                    RECORD_{study.sidebar}
                  </span>
                  <div className="w-[1px] h-32 bg-gradient-to-b from-cyan-500/50 to-transparent mt-8" />
                </div>

                {/* Content Area */}
                <div className="lg:col-span-11 bg-slate-50/50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 md:p-16 hover:border-cyan-500/20 transition-all duration-700 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  
                  {/* Category Label */}
                  <div className="relative mb-12 flex items-center gap-4">
                    <div className="w-8 h-px bg-cyan-500" />
                    <span className="text-xs font-mono font-black text-cyan-600 dark:text-cyan-500 tracking-[0.3em] uppercase">
                      {study.category}
                    </span>
                  </div>

                  <h2 className="relative text-4xl md:text-8xl font-black tracking-tighter leading-tight mb-16 text-slate-900 dark:text-white hover-glitch">
                    {study.title}
                  </h2>

                  <div className="relative grid md:grid-cols-2 gap-16 mb-20 border-t border-slate-200 dark:border-white/5 pt-16">
                    <div className="space-y-6">
                      <h3 className="text-xs font-mono font-black text-red-600 dark:text-red-500 tracking-widest uppercase flex items-center gap-2">
                        <Lock className="w-4 h-4" /> THE CHALLENGE //
                      </h3>
                      <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium italic leading-relaxed">
                        "{study.challenge}"
                      </p>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-xs font-mono font-black text-cyan-700 dark:text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                        <Cpu className="w-4 h-4" /> THE BREAKTHROUGH //
                      </h3>
                      <p className="text-xl md:text-2xl text-slate-800 dark:text-white font-bold leading-relaxed selection:bg-cyan-500 selection:text-white dark:selection:text-black">
                        {study.breakthrough}
                      </p>
                    </div>
                  </div>

                  {/* Metrics Bar */}
                  <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 bg-white dark:bg-white/[0.03] rounded-3xl p-10 backdrop-blur-md border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <div className="flex flex-wrap gap-16">
                      {study.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="flex flex-col group/metric">
                          <div className="flex items-center gap-4 text-4xl md:text-7xl font-black tracking-tighter group-hover/metric:text-cyan-600 dark:group-hover/metric:text-cyan-400 transition-colors">
                            {metric.icon}
                            {metric.value}{metric.suffix}
                          </div>
                          <div className="text-[10px] md:text-xs font-mono font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mt-3 pl-10 border-l border-slate-200 dark:border-white/10 group-hover/metric:border-cyan-500 transition-colors">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center md:text-right w-full md:w-auto">
                      <div className="text-lg md:text-xl font-mono text-slate-400 dark:text-white/50 mb-6 uppercase tracking-widest">
                        {study.result}
                      </div>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className={`w-full md:w-auto rounded-full px-12 h-16 text-lg font-black border-2 transition-all duration-500 uppercase tracking-widest ${
                          study.comingSoon 
                          ? 'opacity-30 border-slate-200 dark:border-white/10 text-slate-400 dark:text-white cursor-not-allowed' 
                          : 'border-cyan-500/50 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500 hover:text-white dark:hover:text-black hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]'
                        }`}
                        onClick={() => !study.comingSoon && (window.open(study.href, '_blank'))}
                        disabled={study.comingSoon}
                      >
                        {study.comingSoon ? 'LOCKED: COMING SOON' : 'DEEP DIVE SYSTEM'} {!study.comingSoon && <ArrowRight className="ml-2 w-5 h-5" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>

      {/* Global Interactive Section */}
      <section className="bg-slate-900/10 dark:bg-white/10 backdrop-blur-md text-white dark:text-black py-40 px-4 md:px-8 mt-48 selection:bg-cyan-500 selection:text-white relative transition-colors duration-700">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <Globe className="w-16 h-16 mb-8 text-cyan-400 dark:text-cyan-600 animate-spin-slow" />
          <h2 className="text-5xl md:text-9xl font-black tracking-tighter uppercase mb-6">
            GLOBAL SCALE.<br />ZERO LAG.
          </h2>
          <p className="text-xl md:text-3xl font-medium max-w-2xl mb-16 text-slate-400 dark:text-slate-600">
            Deploying intelligence across vectors. From government-grade archaeology to retail-speed automation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {caseStudies.map(s => (
              <Button 
                key={s.id} 
                variant="outline" 
                size="lg"
                className="rounded-full border-2 border-white dark:border-black font-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white transition-all duration-500 px-10 h-16"
                onClick={() => scrollToSection(s.id)}
              >
                GO_TO_{s.sidebar}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Impacts;
