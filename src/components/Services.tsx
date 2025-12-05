import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Brain, Cpu, Globe, MessageSquare, Zap, Shield } from "lucide-react";

const services = [
  {
    title: "AI Agents",
    description: "Autonomous agents that handle complex workflows, from customer support to data analysis.",
    icon: Brain,
  },
  {
    title: "Process Automation",
    description: "End-to-end automation of repetitive tasks, reducing manual effort by up to 90%.",
    icon: Cpu,
  },
  {
    title: "Web Solutions",
    description: "Dynamic, AI-integrated web environments that adapt to user behavior.",
    icon: Globe,
  },
  {
    title: "NLP Systems",
    description: "Advanced natural language processing for sentiment analysis and automated reporting.",
    icon: MessageSquare,
  },
  {
    title: "Predictive Analytics",
    description: "Data-driven insights that forecast trends and optimize decision-making.",
    icon: Zap,
  },
  {
    title: "Enterprise Security",
    description: "AI-powered threat detection and automated security protocols.",
    icon: Shield,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">

        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Our Capabilities
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">
            Comprehensive AI solutions designed to scale with your ambition.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {services.map((service, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <div className="bw-card h-full p-6 md:p-8 group hover:bg-white/5 transition-colors duration-500">
                    <div className="mb-6 inline-block p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                      {service.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-transparent border-white/20 text-white hover:bg-white hover:text-black" />
            <CarouselNext className="static translate-y-0 bg-transparent border-white/20 text-white hover:bg-white hover:text-black" />
          </div>
        </Carousel>

        {/* Why Choose Us Section */}
        <div className="mt-32">
          <div className="bw-card p-8 md:p-16 text-center border-white/5 bg-gradient-to-b from-white/5 to-transparent">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-12">
              Why Choose RootedAI?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="text-5xl font-bold text-white">10x</div>
                <p className="text-white/60 font-medium">Faster Execution</p>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-bold text-white">0%</div>
                <p className="text-white/60 font-medium">Human Error</p>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-bold text-white">24/7</div>
                <p className="text-white/60 font-medium">Uptime Guarantee</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;