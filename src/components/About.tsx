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
    <section id="about" className="py-24 border-t border-white/10 relative overflow-hidden" ref={sectionRef}>
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-32 h-32 border border-white/10 rounded-lg animate-float"
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
            <span className="text-xs uppercase text-white/40 font-medium tracking-[0.3em]">
              RootedAI Philosophy
            </span>
          </div>

          {/* Glowing Divider Line */}
          <div className="relative mt-6 mb-8 h-px max-w-md mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-white/10" />
            <div
              className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-2000 ${isVisible ? 'translate-x-0' : '-translate-x-full'
                }`}
              style={{
                boxShadow: '0 0 20px rgba(255,255,255,0.5)',
                filter: 'blur(2px)'
              }}
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Why We Exist
          </h2>
        </div>

        {/* Engineering Intelligence Tagline with Animation */}
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-5xl mx-auto">
            <TextScramble text="Engineering Intelligence. " />
            <span className="text-white/50">
              <TextScramble text="COMPLEXITY.SIMPLIFIED" duration={2} />
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          {/* Mission Card */}
          <div
            ref={missionRef}
            className="group relative"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <TiltCard
              className="bw-card p-8 relative overflow-hidden hover:shadow-2xl transition-all duration-500 h-full"
            >
              {/* Animated Background - Task Icons Flowing */}
              <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                <div className="animate-flow-1">
                  <FileText className="absolute w-6 h-6 text-white" style={{ top: '20%', left: '10%' }} />
                </div>
                <div className="animate-flow-2">
                  <Ticket className="absolute w-6 h-6 text-white" style={{ top: '40%', left: '15%' }} />
                </div>
                <div className="animate-flow-3">
                  <Receipt className="absolute w-6 h-6 text-white" style={{ top: '60%', left: '20%' }} />
                </div>
                <div className="animate-flow-4">
                  <MessageSquare className="absolute w-6 h-6 text-white" style={{ top: '80%', left: '10%' }} />
                </div>
                {/* AI Core Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 blur-xl animate-pulse" />
                {/* Checkmarks Exiting */}
                <div className="animate-flow-5">
                  <Check className="absolute w-6 h-6 text-green-400" style={{ top: '30%', right: '15%' }} />
                </div>
                <div className="animate-flow-6">
                  <Check className="absolute w-6 h-6 text-green-400" style={{ top: '70%', right: '20%' }} />
                </div>
              </div>

              {/* Gradient Border on Hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  animation: 'border-flow 3s linear infinite'
                }}
              />

              <div className="relative z-10 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {typeMission ? (
                      <span className="inline-block animate-type-on">Our Mission</span>
                    ) : (
                      <span className="opacity-0">Our Mission</span>
                    )}
                  </h3>
                </div>
                <p className="text-lg text-white/70 leading-relaxed font-light">
                  To{' '}
                  <span
                    className={`transition-all duration-700 ${highlightMundane
                      ? 'text-white font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-1 rounded'
                      : ''
                      }`}
                  >
                    automate the mundane
                  </span>
                  {' '}so humanity can focus on the{' '}
                  <span
                    className={`transition-all duration-700 ${highlightExtraordinary
                      ? 'text-white font-semibold bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-1 rounded'
                      : ''
                      }`}
                  >
                    extraordinary
                  </span>
                  . We don't just build software; we build autonomous systems that think and adapt.
                </p>
              </div>
            </TiltCard>
          </div>

          {/* Vision Card */}
          <div
            ref={visionRef}
            className="group relative"
            style={{ perspective: '1000px' }}
          >
            <TiltCard
              className="bw-card p-8 relative overflow-hidden hover:shadow-2xl transition-all duration-500 h-full"
            >
              {/* 3D Parallax Geometric Shapes */}
              <div
                className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute w-20 h-20 border border-white/30 rounded-lg transform rotate-12 animate-float"
                  style={{ top: '10%', right: '10%', animationDuration: '6s' }}
                />
                <div className="absolute w-16 h-16 border border-white/30 rounded-full animate-float"
                  style={{ bottom: '20%', left: '15%', animationDuration: '8s', animationDelay: '1s' }}
                />
                <div className="absolute w-24 h-24 border border-white/30 transform rotate-45 animate-float"
                  style={{ top: '50%', right: '20%', animationDuration: '10s', animationDelay: '2s' }}
                />
              </div>

              {/* Gradient Border on Hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  animation: 'border-flow 3s linear infinite'
                }}
              />

              <div className="relative z-10 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {typeVision ? (
                      <span className="inline-block animate-type-on">Our Vision</span>
                    ) : (
                      <span className="opacity-0">Our Vision</span>
                    )}
                  </h3>
                </div>
                <p className="text-lg text-white/70 leading-relaxed font-light mb-6">
                  A world where businesses run at the speed of thought, powered by AI agents that are as reliable as they are intelligent.
                </p>

                {/* Speed of Thought Line */}
                <div className="relative h-px bg-white/20 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 animate-speed-line"
                    style={{ width: '30%' }}
                  />
                  {/* Moving Nodes */}
                  <div className="absolute w-2 h-2 bg-white rounded-full animate-node-1" style={{ top: '-3px' }} />
                  <div className="absolute w-2 h-2 bg-white rounded-full animate-node-2" style={{ top: '-3px' }} />
                  <div className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full animate-node-3" style={{ top: '-2px' }} />
                </div>
                <p className="text-xs text-white/40 text-center mt-2 italic">Speed of thought ⚡</p>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-16 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 group p-3 rounded-lg hover:bg-white/5 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              style={{
                transitionDelay: `${800 + index * 100}ms`
              }}
            >
              <CheckCircle2 className="w-5 h-5 text-blue-500 group-hover:text-blue-400 transition-colors flex-shrink-0" />
              <span className="text-white/80 font-medium text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes flow-1 {
          0% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 0.5; }
          100% { transform: translate(150px, 50px); opacity: 0; }
        }
        @keyframes flow-2 {
          0% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 0.5; }
          100% { transform: translate(140px, 20px); opacity: 0; }
        }
        @keyframes flow-3 {
          0% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 0.5; }
          100% { transform: translate(130px, -20px); opacity: 0; }
        }
        @keyframes flow-4 {
          0% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 0.5; }
          100% { transform: translate(150px, -50px); opacity: 0; }
        }
        @keyframes flow-5 {
          0% { transform: translate(0, 0) scale(0); opacity: 0; }
          30% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { transform: translate(100px, 0) scale(1.2); opacity: 0; }
        }
        @keyframes flow-6 {
          0% { transform: translate(0, 0) scale(0); opacity: 0; }
          30% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { transform: translate(80px, 0) scale(1.2); opacity: 0; }
        }
        
        .animate-flow-1 { animation: flow-1 4s ease-in-out infinite; }
        .animate-flow-2 { animation: flow-2 4s ease-in-out infinite 0.5s; }
        .animate-flow-3 { animation: flow-3 4s ease-in-out infinite 1s; }
        .animate-flow-4 { animation: flow-4 4s ease-in-out infinite 1.5s; }
        .animate-flow-5 { animation: flow-5 3s ease-in-out infinite 2s; }
        .animate-flow-6 { animation: flow-6 3s ease-in-out infinite 2.5s; }
        
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