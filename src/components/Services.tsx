import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Brain, Cpu, Globe, MessageSquare, Zap, Shield, Users } from "lucide-react";
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
  {
    title: "Outsourcing",
    description: "Scale your team instantly with our elite pre-vetted developers.",
    example: "E.g., Hire a full stack team in 48 hours for your next big project",
    icon: Users,
    metrics: "Save 60% on development costs",
    route: "/services/outsourcing",
  },
];

const Services = () => {

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24 space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold font-heading text-black dark:text-white tracking-tight animate-fade-up">
            Our Capabilities
          </h2>
          <p className="text-black/60 dark:text-white/60 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
            From concept to deployment, we build AI solutions that deliver measurable ROI.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {services.map((service, index) => (
              <CarouselItem key={index} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <TiltCard className="glass-premium h-full p-8 md:p-10 group transition-all duration-500 flex flex-col rounded-3xl">
                    <div className="mb-8 inline-flex items-center justify-center p-4 rounded-2xl bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors w-fit shadow-inner">
                      <service.icon className="w-8 h-8 text-black dark:text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-4 group-hover:translate-x-1 transition-transform duration-300">
                      {service.title}
                    </h3>
                    <p className="text-black/70 dark:text-white/70 leading-relaxed text-base mb-6 font-light">
                      {service.description}
                    </p>
                    <div className="mb-6 pl-4 border-l-2 border-primary/20">
                      <p className="text-black/50 dark:text-white/50 text-sm italic">
                        {service.example}
                      </p>
                    </div>

                    <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/5 space-y-4">
                      <div className="text-sm font-semibold text-black dark:text-white flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500" />
                        {service.metrics}
                      </div>
                      <Link to={service.route} className="block">
                        <Button
                          variant="ghost"
                          className="w-full text-sm bg-black/5 dark:bg-white/5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border border-black/10 dark:border-white/10 rounded-xl transition-all h-12"
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
          <div className="flex justify-center gap-6 mt-12">
            <CarouselPrevious className="static translate-y-0 w-12 h-12 bg-transparent border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full" />
            <CarouselNext className="static translate-y-0 w-12 h-12 bg-transparent border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full" />
          </div>
        </Carousel>

        <div className="mt-16 text-center animate-fade-up" style={{ animationDelay: "200ms" }}>
          <p className="text-black/60 dark:text-white/60 text-lg">
            Looking to scale your team? <Link to="/services/outsourcing" className="font-medium text-black dark:text-white underline hover:text-primary transition-colors">Outsource your work with us</Link> without the hiring headaches.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-40">
          <div className="glass-premium p-10 md:p-20 text-center rounded-3xl bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
            <h3 className="text-3xl md:text-5xl font-bold font-heading text-black dark:text-white mb-16">
              Why Choose RootedAI?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
              <div className="space-y-4 group">
                <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-black to-black/50 dark:from-white dark:to-white/50 group-hover:scale-110 transition-transform duration-500">10x</div>
                <p className="text-xl text-black dark:text-white font-medium">Faster Execution</p>
                <p className="text-sm text-black/50 dark:text-white/50 uppercase tracking-widest">vs manual processes</p>
              </div>
              <div className="space-y-4 group">
                <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-black to-black/50 dark:from-white dark:to-white/50 group-hover:scale-110 transition-transform duration-500">90%</div>
                <p className="text-xl text-black dark:text-white font-medium">Error Reduction</p>
                <p className="text-sm text-black/50 dark:text-white/50 uppercase tracking-widest">in repetitive tasks</p>
              </div>
              <div className="space-y-4 group">
                <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-black to-black/50 dark:from-white dark:to-white/50 group-hover:scale-110 transition-transform duration-500">24/7</div>
                <p className="text-xl text-black dark:text-white font-medium">Uptime Guarantee</p>
                <p className="text-sm text-black/50 dark:text-white/50 uppercase tracking-widest">with AI agents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;