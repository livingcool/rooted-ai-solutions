import { CheckCircle2 } from "lucide-react";

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
              Engineering Intelligence. <br />
              <span className="text-white/50">COMPLEXITY.SIMPLIFIED</span>
            </h2>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              RootedAI is a strategic automation partner for forward-thinking enterprises.
              We move beyond simple chatbots to deploy autonomous agents that understand context,
              execute complex workflows, and drive tangible business outcomes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <CheckCircle2 className="w-5 h-5 text-white group-hover:text-white/80 transition-colors" />
                  <span className="text-white/80 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual/Stats */}
          <div className="relative">
            <div className="bw-card p-8 md:p-12 relative z-10">
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
            </div>

            {/* Decorative Background Element */}
            <div className="absolute -top-10 -right-10 w-full h-full border border-white/10 rounded-xl z-0 hidden md:block"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;