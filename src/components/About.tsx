import { useEffect, useRef, useState } from "react";
import { CheckCircle2, FileText, MessageSquare, Receipt, Ticket, Check } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import TextScramble from "@/components/ui/TextScramble";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [highlightMundane, setHighlightMundane] = useState(false);
  const [highlightExtraordinary, setHighlightExtraordinary] = useState(false);
  const [typeMission, setTypeMission] = useState(false);
  const [typeVision, setTypeVision] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  const features = [
    "Custom Neural Architectures",
    "Enterprise-Grade Security",
    "Seamless API Integration",
    "Real-time Analytics",
    "Scalable Infrastructure",
    "24/7 Automated Support"
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setTimeout(() => setTypeMission(true), 300);
          setTimeout(() => setTypeVision(true), 500);
          setTimeout(() => setHighlightMundane(true), 1200);
          setTimeout(() => setHighlightExtraordinary(true), 1800);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section id="about" className="py-24 border-t border-black/10 dark:border-white/10 relative overflow-hidden" ref={sectionRef}>
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-32 h-32 border border-black/10 dark:border-white/10 rounded-lg animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${8 + i}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Philosophy Label with Fade-Up Animation */}
        <div className="text-center mb-12">
          <div
            className={`inline-block transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            style={{ letterSpacing: '0.3em' }}
          >
            <span className="text-xs uppercase text-muted-foreground font-medium tracking-[0.3em]">
              RootedAI Philosophy
            </span>
          </div>

          {/* Glowing Divider Line */}
          <div className="relative mt-6 mb-8 h-px max-w-md mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-black/10 dark:bg-white/10" />
            <div
              className={`absolute inset-0 bg-gradient-to-r from-transparent via-black dark:via-white to-transparent transition-all duration-2000 ${isVisible ? 'translate-x-0' : '-translate-x-full'
                }`}
              style={{
                boxShadow: '0 0 20px rgba(255,255,255,0.5)',
                filter: 'blur(2px)'
              }}
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white tracking-tight">
            Why We Exist
          </h2>
        </div>

        {/* Engineering Intelligence Tagline with Animation */}
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
        >
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-5xl mx-auto">
            <TextScramble text="Engineering Intelligence. " />
            <span className="text-muted-foreground">
              <TextScramble text="COMPLEXITY.SIMPLIFIED" duration={2} />
            </span>
          </h2>
        </div>

        {/* Creative Split Reveal Section */}
        <div className="w-full max-w-7xl mx-auto h-[700px] flex flex-col md:flex-row gap-4 mb-24 rounded-[2rem] overflow-hidden relative group/container shadow-2xl">

          {/* Mission Panel */}
          <div
            className="relative flex-1 group/mission hover:flex-[3] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] bg-slate-50 dark:bg-slate-900/50 overflow-hidden flex flex-col justify-end p-8 md:p-12 border-r border-black/5 dark:border-white/5 cursor-pointer"
            onMouseEnter={() => setTypeMission(true)}
          >
            {/* Background Graphic - Scanning Grid */}
            <div className="absolute inset-0 opacity-10 group-hover/mission:opacity-30 transition-opacity duration-700">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
              <div className="absolute top-0 -left-1/2 w-full h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent skew-x-12 animate-scan" />
            </div>

            {/* Interactive Reactor Graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] transition-all duration-[1000ms] group-hover/mission:scale-125 group-hover/mission:-rotate-12 opacity-20 group-hover/mission:opacity-100">
              <div className="absolute inset-0 border-[60px] border-blue-600/10 rounded-full animate-[spin_15s_linear_infinite]" />
              <div className="absolute inset-8 border-[2px] border-blue-400/30 rounded-full animate-[spin_20s_linear_infinite_reverse] border-t-transparent border-b-transparent" />
              <div className="absolute inset-[40%] bg-blue-500/20 blur-[80px] rounded-full animate-pulse" />
              <div className="absolute inset-[45%] border-2 border-blue-500/50 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_15px_#60a5fa]" />
              </div>
            </div>

            {/* Content Display */}
            <div className="relative z-10 space-y-6 max-w-2xl group-hover/mission:translate-x-4 transition-transform duration-700">
              <h3 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-200 dark:text-slate-800 absolute -top-12 left-0 select-none group-hover/mission:text-blue-500/10 transition-colors duration-700">
                MISSION
              </h3>

              <div className="space-y-4">
                <h4 className="text-3xl font-bold text-black dark:text-white flex items-center gap-3">
                  The Core Purpose
                  <span className="h-px w-12 bg-blue-500 block group-hover/mission:w-24 transition-all duration-700" />
                </h4>

                <div className="opacity-0 group-hover/mission:opacity-100 translate-y-4 group-hover/mission:translate-y-0 transition-all duration-700 delay-150">
                  <p className="text-xl text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                    To <span className="text-blue-600 dark:text-blue-400 font-bold italic">automate the mundane</span> so humanity can focus on the <span className="text-purple-600 dark:text-purple-400 font-bold italic">extraordinary</span>. We build systems that don't just execute, but evolve.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 group-hover/mission:opacity-0 transition-opacity">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                <span className="text-xs font-mono tracking-widest text-slate-400">EXPAND REVEAL //</span>
              </div>
            </div>
          </div>

          {/* Vision Panel */}
          <div
            className="relative flex-1 group/vision hover:flex-[3] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] bg-slate-100 dark:bg-black overflow-hidden flex flex-col justify-end p-8 md:p-12 cursor-pointer"
            onMouseEnter={() => setTypeVision(true)}
          >
            {/* Background Graphic - Celestial */}
            <div className="absolute inset-0 opacity-10 group-hover/vision:opacity-40 transition-opacity duration-1000">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(168,85,247,0.15),transparent_70%)]" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-200" />
            </div>

            {/* Interactive Celestial Graphic */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] transition-all duration-[1200ms] group-hover/vision:-translate-x-12 opacity-20 group-hover/vision:opacity-100">
              <div className="absolute top-0 right-0 w-full h-full border border-purple-500/20 rounded-full scale-150 group-hover/vision:scale-100 transition-transform duration-1000" />
              <div className="absolute top-12 right-12 w-3/4 h-3/4 border border-pink-500/20 rounded-full animate-[pulse_4s_infinite]" />
              {/* Light Ray */}
              <div className="absolute top-1/2 right-0 w-[150%] h-px bg-gradient-to-l from-purple-500 via-transparent to-transparent -rotate-[15deg] blur-sm" />
            </div>

            {/* Content Display */}
            <div className="relative z-10 space-y-6 max-w-2xl ml-auto text-right group-hover/vision:-translate-x-4 transition-transform duration-700">
              <h3 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-200 dark:text-slate-900 absolute -top-12 right-0 select-none group-hover/vision:text-purple-500/10 transition-colors duration-700">
                VISION
              </h3>

              <div className="space-y-4">
                <h4 className="text-3xl font-bold text-black dark:text-white flex items-center justify-end gap-3">
                  <span className="h-px w-12 bg-purple-500 block group-hover/vision:w-24 transition-all duration-700" />
                  The Future Horizon
                </h4>

                <div className="opacity-0 group-hover/vision:opacity-100 translate-y-4 group-hover/vision:translate-y-0 transition-all duration-700 delay-150">
                  <p className="text-xl text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                    A world where businesses run at the <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text font-black italic">speed of thought</span>, powered by AI agents as reliable as they are intelligent.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 group-hover/vision:opacity-0 transition-opacity">
                <span className="text-xs font-mono tracking-widest text-slate-400">// REVEAL FUTURE</span>
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
              </div>
            </div>
          </div>

        </div>


        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-16 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 group p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              style={{
                transitionDelay: `${800 + index * 100}ms`
              }}
            >
              <CheckCircle2 className="w-5 h-5 text-blue-500 group-hover:text-blue-400 transition-colors flex-shrink-0" />
              <span className="text-black/80 dark:text-white/80 font-medium text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scan {
            0% { transform: translateX(-100%) skewX(12deg); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(200%) skewX(12deg); opacity: 0; }
        }
        
        @keyframes halo {
            0% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.2); opacity: 0.5; }
            100% { transform: scale(1); opacity: 0.3; }
        }
        
        @keyframes type-on {
          from { width: 0; opacity: 0; }
          to { width: 100%; opacity: 1; }
        }
        
        .animate-type-on {
          animation: type-on 0.6s ease-out forwards;
        }
        
        @keyframes speed-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        
        .animate-speed-line {
          animation: speed-line 2s ease-in-out infinite;
        }
        
        @keyframes node-1 {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes node-2 {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes node-3 {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        
        .animate-node-1 { animation: node-1 2s ease-in-out infinite; }
        .animate-node-2 { animation: node-2 2s ease-in-out infinite 0.7s; }
        .animate-node-3 { animation: node-3 2s ease-in-out infinite 1.4s; }
        
        @keyframes border-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default About;