import { Brain, Cpu, Globe, MessageSquare, Zap, Shield, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const services = [
  {
    title: "AI Safety & Compliance",
    description: "Deploy AI without risk. Full DPDP audits, zero bias.",
    icon: <Shield className="w-8 h-8" />,
    route: "/services/ai-safety",
    color: "from-emerald-500/20 to-emerald-900/20",
    borderHover: "group-hover:border-emerald-500/50",
    textHover: "group-hover:text-emerald-400",
    size: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    title: "AI Agents",
    description: "Autonomous agents mapping complex pipelines.",
    icon: <Brain className="w-8 h-8" />,
    route: "/services/ai-agents",
    color: "from-violet-500/20 to-violet-900/20",
    borderHover: "group-hover:border-violet-500/50",
    textHover: "group-hover:text-violet-400",
    size: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    title: "Process Automation",
    description: "End-to-end autonomous RPA scaling.",
    icon: <Cpu className="w-8 h-8" />,
    route: "/services/process-automation",
    color: "from-purple-500/20 to-purple-900/20",
    borderHover: "group-hover:border-purple-500/50",
    textHover: "group-hover:text-purple-400",
    size: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    title: "Web Solutions",
    description: "Dynamic responsive digital gateways.",
    icon: <Globe className="w-8 h-8" />,
    route: "/services/web-solutions",
    color: "from-amber-500/20 to-amber-900/20",
    borderHover: "group-hover:border-amber-500/50",
    textHover: "group-hover:text-amber-400",
    size: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    title: "NLP Systems",
    description: "Human-level semantic understanding.",
    icon: <MessageSquare className="w-8 h-8" />,
    route: "/services/nlp-systems",
    color: "from-rose-500/20 to-rose-900/20",
    borderHover: "group-hover:border-rose-500/50",
    textHover: "group-hover:text-rose-400",
    size: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    title: "Predictive Analytics",
    description: "Precision forecasting with ML models.",
    icon: <Zap className="w-8 h-8" />,
    route: "/services/predictive-analytics",
    color: "from-cyan-500/20 to-cyan-900/20",
    borderHover: "group-hover:border-cyan-500/50",
    textHover: "group-hover:text-cyan-400",
    size: "col-span-1 md:col-span-1 row-span-2",
  },
  {
    title: "Enterprise Security",
    description: "Military-grade automated defenses.",
    icon: <Shield className="w-8 h-8" />,
    route: "/services/enterprise-security",
    color: "from-indigo-500/20 to-indigo-900/20",
    borderHover: "group-hover:border-indigo-500/50",
    textHover: "group-hover:text-indigo-400",
    size: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    title: "Outsourcing",
    description: "Elite 10x engineering squads.",
    icon: <Users className="w-8 h-8" />,
    route: "/services/outsourcing",
    color: "from-orange-500/20 to-orange-900/20",
    borderHover: "group-hover:border-orange-500/50",
    textHover: "group-hover:text-orange-400",
    size: "col-span-1 md:col-span-1 row-span-1",
  },
];

const InteractiveServiceCard = ({ service, index }: { service: any; index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 glass-premium bg-white/50 dark:bg-black/50 p-8 hover:shadow-2xl transition-all duration-500 ${service.size} ${service.borderHover}`}
    >
      {/* Interactive Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 dark:group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Background Static Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-40 group-hover:opacity-80 transition-opacity duration-500 -z-10`} />

      <div className="relative z-10 flex flex-col h-full">
        <div className={`p-4 rounded-2xl w-fit bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 mb-6 text-slate-800 dark:text-slate-200 transition-colors ${service.textHover}`}>
          {service.icon}
        </div>
        
        <div>
          <h3 className={`text-2xl font-heading font-bold text-slate-900 dark:text-white mb-2 transition-colors ${service.textHover}`}>
            {service.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            {service.description}
          </p>
        </div>

        <div className="mt-8 flex justify-end flex-grow items-end w-full">
          <Link 
            to={service.route}
            className="group/link flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            <span>Initialize Node</span>
            <div className="w-8 h-8 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center group-hover/link:bg-violet-600 group-hover/link:border-violet-600 group-hover/link:text-white transition-all overflow-hidden relative">
              <ArrowRight className="w-4 h-4 absolute transition-transform duration-300 -translate-x-6 group-hover/link:translate-x-0" />
              <ArrowRight className="w-4 h-4 absolute transition-transform duration-300 translate-x-0 group-hover/link:translate-x-6" />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 relative bg-transparent pointer-events-none">
      <div className="container mx-auto px-4 md:px-6 mb-12 md:mb-16 text-center pointer-events-auto relative z-10">
        <h2 className="text-4xl md:text-7xl font-bold font-heading text-black dark:text-white tracking-tighter mb-6 drop-shadow-md">
          Core Capabilities
        </h2>
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-medium bg-white/50 dark:bg-black/50 p-4 rounded-full backdrop-blur-md border border-black/5 dark:border-white/5">
          Orchestrating autonomous logic architectures. Scale your enterprise beyond organic limits.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6">
          {services.map((service, i) => (
            <InteractiveServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pb-12 pointer-events-auto mt-20">
        {/* Why Choose Us Section */}
        <div className="glass-premium p-10 md:p-16 text-center rounded-[3rem] bg-white/40 dark:bg-[#030303]/40 border border-black/10 dark:border-white/10 shadow-2xl backdrop-blur-xl">
          <h3 className="text-3xl md:text-5xl font-bold font-heading text-black dark:text-white mb-12">
            The RootedAI Theorem
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/10">
            <div className="space-y-4 pt-8 md:pt-0 group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-violet-600 to-purple-600 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">10x</div>
              <p className="text-xl text-slate-900 dark:text-slate-100 font-bold uppercase tracking-widest">Velocity Output</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">exponential compounding vs manual processes</p>
            </div>
            <div className="space-y-4 pt-8 md:pt-0 group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-teal-700 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">90%</div>
              <p className="text-xl text-slate-900 dark:text-slate-100 font-bold uppercase tracking-widest">Error Mitigation</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">systematic elimination of repetitive friction</p>
            </div>
            <div className="space-y-4 pt-8 md:pt-0 group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-rose-600 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]">24/7</div>
              <p className="text-xl text-slate-900 dark:text-slate-100 font-bold uppercase tracking-widest">Autonomous Uptime</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">borderless AI agents orchestrating logic</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;