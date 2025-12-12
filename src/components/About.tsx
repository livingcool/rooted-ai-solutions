import { CheckCircle2 } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import TextScramble from "@/components/ui/TextScramble";

const About = () => {
  const features = [
    "Custom Neural Architectures",
    "Enterprise-Grade Security",
    "Seamless API Integration",
    "Real-time Analytics",
    "Scalable Infrastructure",
    "24/7 Automated Support"
  ];

  return (
    <section id="about" className="py-24 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Text Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              <TextScramble text="Engineering Intelligence." /> <br />
              <span className="text-white/50"><TextScramble text="COMPLEXITY.SIMPLIFIED" duration={2} /></span>
            </h2>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                  Our Mission
                </h3>
                <p className="text-lg text-white/60 leading-relaxed font-light">
                  To automate the mundane so humanity can focus on the extraordinary. We don't just build software; we build autonomous systems that think and adapt.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  Our Vision
                </h3>
                <p className="text-lg text-white/60 leading-relaxed font-light">
                  A world where businesses run at the speed of thought, powered by AI agents that are as reliable as they are intelligent.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 group p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 group-hover:text-blue-400 transition-colors" />
                  <span className="text-white/80 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual/Stats */}
          <div className="relative">
            <TiltCard className="bw-card p-6 md:p-12 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-5xl md:text-6xl font-bold text-white">10+</div>
                  <div className="text-xs md:text-sm uppercase tracking-widest text-white/50">Active Agents Deployed</div>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl md:text-6xl font-bold text-white">40%</div>
                  <div className="text-xs md:text-sm uppercase tracking-widest text-white/50">Avg. Cost Reduction</div>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl md:text-6xl font-bold text-white">75+</div>
                  <div className="text-xs md:text-sm uppercase tracking-widest text-white/50">AI Projects Done</div>
                </div>
              </div>
            </TiltCard>

            {/* Decorative Background Element */}
            <div className="absolute -top-10 -right-10 w-full h-full border border-white/10 rounded-xl z-0 hidden md:block"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;