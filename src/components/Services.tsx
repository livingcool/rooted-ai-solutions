import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Brain, Cpu, Globe, MessageSquare, Zap, Shield, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "AI Agents",
      description: "Autonomous agents that handle complex workflows, from customer support to data analysis.",
      example: "E.g., Auto-respond to 80% of support tickets",
      icon: Brain,
      route: "/services/ai-agents",
    },
    {
      title: "Process Automation",
      description: "End-to-end automation of repetitive tasks, reducing manual effort by up to 90%.",
      example: "E.g., Automate invoice reconciliation",
      icon: Cpu,
      route: "/services/process-automation",
    },
    {
      title: "Web Solutions",
      description: "Dynamic, AI-integrated web environments that adapt to user behavior.",
      example: "E.g., Custom dashboards with real-time analytics",
      icon: Globe,
      route: "/services/web-solutions",
    },
    {
      title: "NLP Systems",
      description: "Advanced natural language processing for sentiment analysis and automated reporting.",
      example: "E.g., Extract insights from customer feedback",
      icon: MessageSquare,
      route: "/services/nlp-systems",
    },
    {
      title: "Predictive Analytics",
      description: "Data-driven insights that forecast trends and optimize decision-making.",
      example: "E.g., Predict inventory demand",
      icon: Zap,
      route: "/services/predictive-analytics",
    },
    {
      title: "Enterprise Security",
      description: "AI-powered threat detection and automated security protocols.",
      example: "E.g., Real-time anomaly detection",
      icon: Shield,
      route: "/services/enterprise-security",
    }
  ];

  return (
    <section id="services" ref={sectionRef} className="services-section py-32 relative overflow-hidden"
      style={{ background: 'radial-gradient(circle at center, rgba(20,20,20,1), rgba(0,0,0,1))' }}>

      <div className="container-width relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-500 mb-6">
            Our Services
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-xl font-light">
            From concept to deployment, we build AI solutions that deliver measurable ROI.
          </p>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="service-card group">
              <div className="service-icon group-hover:text-white text-white/90">
                <service.icon size={36} strokeWidth={1.5} />
              </div>

              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>

              <div className="mb-6 pl-4 border-l border-white/20">
                <p className="text-white/40 text-sm italic">{service.example}</p>
              </div>

              <Link to={service.route} className="service-link">
                Learn More
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-white/20 to-transparent">
            <div className="bg-black/80 backdrop-blur-md rounded-full px-8 py-4 border border-white/10">
              <p className="text-white/70">
                Looking to scale your team? <Link to="/services/outsourcing" className="text-white font-semibold hover:underline">Outsource with us</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;