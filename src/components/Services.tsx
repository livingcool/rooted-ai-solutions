import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Brain, Cpu, Globe, MessageSquare, Zap, Shield } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    title: "AI Agents",
    description: "Autonomous agents that handle complex workflows, from customer support to data analysis.",
    example: "E.g., Auto-respond to 80% of support tickets, route complex queries to humans",
    icon: Brain,
    metrics: "Deflect 60% of tickets before escalation",
    route: "/services/ai-agents",
  },
  {
    title: "Process Automation",
    description: "End-to-end automation of repetitive tasks, reducing manual effort by up to 90%.",
    example: "E.g., Automate invoice reconciliation and order status updates for logistics",
    icon: Cpu,
    metrics: "Save 15-20 hrs/week per team member",
    route: "/services/process-automation",
  },
  {
    title: "Web Solutions",
    description: "Dynamic, AI-integrated web environments that adapt to user behavior.",
    example: "E.g., Custom dashboards with real-time analytics and predictive insights",
    icon: Globe,
    metrics: "Deploy in 2-4 weeks",
    route: "/services/web-solutions",
  },
  {
    title: "NLP Systems",
    description: "Advanced natural language processing for sentiment analysis and automated reporting.",
    example: "E.g., Extract key insights from customer feedback and generate weekly reports",
    icon: MessageSquare,
    metrics: "Process 1000s of documents in minutes",
    route: "/services/nlp-systems",
  },
  {
    title: "Predictive Analytics",
    description: "Data-driven insights that forecast trends and optimize decision-making.",
    example: "E.g., Predict inventory demand and optimize stock levels for e-commerce",
    icon: Zap,
    metrics: "Reduce wastage by 20-30%",
    route: "/services/predictive-analytics",
  },
  {
    title: "Enterprise Security",
    description: "AI-powered threat detection and automated security protocols.",
    example: "E.g., Real-time anomaly detection and automated security alerts",
    icon: Shield,
    metrics: "99.9% uptime SLA",
    route: "/services/enterprise-security",
  },
];

const Services = () => {

  return (
    <section id="services" className="py-24 relative overflow-hidden border-t border-black/10 dark:border-white/10">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white tracking-tight">
            Our Capabilities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
            From concept to deployment, we build AI solutions that deliver measurable ROI.
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
                <div className="p-1 h-full animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <TiltCard className="bw-card h-full p-6 md:p-8 group hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-500 flex flex-col">
                    <div className="mb-6 inline-block p-3 rounded-lg bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors w-fit">
                      <service.icon className="w-8 h-8 text-black dark:text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm mb-3">
                      {service.description}
                    </p>
                    <p className="text-muted-foreground opacity-70 text-xs italic mb-3 border-l-2 border-black/20 dark:border-white/20 pl-3">
                      {service.example}
                    </p>
                    <div className="mt-auto pt-4 border-t border-black/10 dark:border-white/10">
                      <div className="text-xs font-semibold text-black/80 dark:text-white/80 mb-3">
                        {service.metrics}
                      </div>
                      <Link to={service.route}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-xs bg-black/5 dark:bg-white/5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border border-black/20 dark:border-white/20 transition-all"
                        >
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </TiltCard>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-transparent border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" />
            <CarouselNext className="static translate-y-0 bg-transparent border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" />
          </div>
        </Carousel>

        {/* Why Choose Us Section */}
        <div className="mt-32">
          <div className="bw-card p-8 md:p-16 text-center border-black/5 dark:border-white/5 bg-gradient-to-b from-black/5 to-transparent dark:from-white/5">
            <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-12">
              Why Choose RootedAI?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="text-5xl font-bold text-black dark:text-white">10x</div>
                <p className="text-muted-foreground font-medium">Faster Execution</p>
                <p className="text-xs text-muted-foreground opacity-60">vs manual processes</p>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-bold text-black dark:text-white">90%</div>
                <p className="text-muted-foreground font-medium">Error Reduction</p>
                <p className="text-xs text-muted-foreground opacity-60">in repetitive tasks</p>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-bold text-black dark:text-white">24/7</div>
                <p className="text-muted-foreground font-medium">Uptime Guarantee</p>
                <p className="text-xs text-muted-foreground opacity-60">with AI agents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;