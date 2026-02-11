import { Link } from "react-router-dom";
import { ArrowRight, Bot, Cog, BarChart3, MessageSquare, Globe, Shield, Users } from "lucide-react";

interface ServiceLink {
    title: string;
    path: string;
    description: string;
    icon: React.ElementType;
}

const allServices: ServiceLink[] = [
    { title: "AI Agents", path: "/services/ai-agents", description: "Autonomous digital workers for 24/7 task execution", icon: Bot },
    { title: "Process Automation", path: "/services/process-automation", description: "End-to-end workflow automation with RPA", icon: Cog },
    { title: "Predictive Analytics", path: "/services/predictive-analytics", description: "Data-driven forecasting and trend analysis", icon: BarChart3 },
    { title: "NLP Systems", path: "/services/nlp-systems", description: "Sentiment analysis, document processing, and LLM fine-tuning", icon: MessageSquare },
    { title: "Web Solutions", path: "/services/web-solutions", description: "Custom web apps, dashboards, and PWAs", icon: Globe },
    { title: "Enterprise Security", path: "/services/enterprise-security", description: "AI-powered threat detection and compliance", icon: Shield },
    { title: "IT Outsourcing", path: "/services/outsourcing", description: "Dedicated teams and staff augmentation", icon: Users },
];

interface RelatedServicesProps {
    currentPath: string;
    maxItems?: number;
}

const RelatedServices = ({ currentPath, maxItems = 3 }: RelatedServicesProps) => {
    const related = allServices.filter(s => s.path !== currentPath).slice(0, maxItems);

    return (
        <section className="py-16 border-t border-border/50">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Explore Related Services</h2>
                <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
                    Discover how our other AI solutions can complement your strategy.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {related.map((service) => (
                        <Link
                            key={service.path}
                            to={service.path}
                            className="group p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <service.icon className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="font-semibold text-lg">{service.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                {service.description}
                            </p>
                            <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                                Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        View All Services <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export { allServices };
export default RelatedServices;
