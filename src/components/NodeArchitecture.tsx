import { motion } from "framer-motion";
import { Shield, Search, Database, Lock } from "lucide-react";
import { useState, useEffect } from "react";

const nodes = [
  { id: "ingestion", title: "Data Ingestion", icon: <Database className="w-6 h-6" />, description: "Raw data processed through secure, encrypted channels.", x: 10, y: 50, color: "#3b82f6" },
  { id: "audit", title: "AI Safety Audit", icon: <Shield className="w-6 h-6" />, description: "Bias testing, hallucination checks, and risk modeling.", x: 50, y: 20, color: "#8b5cf6" },
  { id: "compliance", title: "Compliance Layer", icon: <Search className="w-6 h-6" />, description: "DPDP & SOC2 validation in real-time.", x: 50, y: 80, color: "#a855f7" },
  { id: "deployment", title: "Secure Deployment", icon: <Lock className="w-6 h-6" />, description: "Enterprise-grade hosting with continuous monitoring.", x: 90, y: 50, color: "#22c55e" }
];

const paths = [
  { from: "ingestion", to: "audit" },
  { from: "ingestion", to: "compliance" },
  { from: "audit", to: "deployment" },
  { from: "compliance", to: "deployment" }
];

const NodeArchitecture = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-[#030303]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-slate-950 dark:text-white">The Pipeline of Certainty</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">Our multi-layered architecture ensures every AI interaction is safe, compliant, and performant.</p>
        </div>

        <div className="relative min-h-[400px] md:h-[600px] w-full max-w-5xl mx-auto">
          {/* SVG Connector Lines - Desktop Only */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
            {paths.map((path, idx) => {
              const fromNode = nodes.find(n => n.id === path.from)!;
              const toNode = nodes.find(n => n.id === path.to)!;
              return (
                <motion.line key={idx} x1={`${fromNode.x}%`} y1={`${fromNode.y}%`} x2={`${toNode.x}%`} y2={`${toNode.y}%`} stroke="currentColor" strokeWidth="2" className="text-slate-200 dark:text-slate-800" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: idx * 0.2 }} />
              );
            })}
          </svg>

          {/* Nodes - Mixed Layout */}
          <div className="flex flex-col md:block gap-8 relative z-20">
            {nodes.map((node, idx) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="md:absolute md:-translate-x-1/2 md:-translate-y-1/2 group"
                style={{ 
                  left: isMobile ? 'auto' : `${node.x}%`, 
                  top: isMobile ? 'auto' : `${node.y}%` 
                }}
              >
                <div className="flex md:block items-center gap-4 p-4 md:p-0 rounded-2xl bg-white dark:bg-slate-900 md:bg-transparent border md:border-0 border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 md:w-20 md:h-20 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-xl group-hover:border-blue-500 transition-colors duration-500" style={{ boxShadow: `0 0 20px ${node.color}20` }}>
                    {node.icon}
                  </div>
                  <div className="md:absolute md:top-full md:left-1/2 md:-translate-x-1/2 md:mt-4 md:w-64 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:pointer-events-none md:translate-y-2 md:group-hover:translate-y-0">
                    <div className="md:bg-white md:dark:bg-slate-900 md:p-4 md:rounded-xl md:shadow-2xl md:border md:border-slate-100 md:dark:border-slate-800">
                      <p className="font-black text-xs uppercase tracking-widest text-blue-500 mb-1">{node.title}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-tight">{node.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NodeArchitecture;
