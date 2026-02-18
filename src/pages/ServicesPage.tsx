import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Cog, BarChart3, MessageSquare, Globe, Shield, Users, CheckCircle, Sparkles } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const services = [
    {
        title: "AI Agents",
        path: "/services/ai-agents",
        description: "Deploy autonomous digital workers that handle repetitive tasks 24/7 — from data entry and L1 support to invoicing and multi-step workflows. Our custom AI agents learn, adapt, and execute with precision.",
        icon: Bot,
        highlights: ["Custom agent development", "Multi-agent orchestration", "24/7 autonomous execution"],
        color: "from-violet-500/20 to-purple-500/10"
    },
    {
        title: "Process Automation",
        path: "/services/process-automation",
        description: "Transform manual workflows into self-running systems with RPA and intelligent automation. Reduce operational overhead by 60-80% across HR, finance, supply chain, and customer operations.",
        icon: Cog,
        highlights: ["RPA integration", "Workflow orchestration", "Legacy system modernization"],
        color: "from-blue-500/20 to-cyan-500/10"
    },
    {
        title: "Predictive Analytics",
        path: "/services/predictive-analytics",
        description: "Turn raw data into strategic advantage with ML-powered forecasting, churn prediction, risk assessment, and anomaly detection. Make data-driven decisions with confidence.",
        icon: BarChart3,
        highlights: ["Demand forecasting", "Churn prediction", "Risk assessment"],
        color: "from-emerald-500/20 to-green-500/10"
    },
    {
        title: "NLP Systems",
        path: "/services/nlp-systems",
        description: "Extract insights from unstructured data with sentiment analysis, document processing, automated reporting, and LLM fine-tuning. Understand customer intent at scale.",
        icon: MessageSquare,
        highlights: ["Sentiment analysis", "Document processing", "LLM fine-tuning"],
        color: "from-amber-500/20 to-yellow-500/10"
    },
    {
        title: "Web Solutions",
        path: "/services/web-solutions",
        description: "Build high-performance web applications with AI integration — scalable dashboards, enterprise portals, customer-facing apps, and progressive web apps (PWAs).",
        icon: Globe,
        highlights: ["Custom web apps", "Enterprise dashboards", "PWA development"],
        color: "from-rose-500/20 to-pink-500/10"
    },
    {
        title: "Enterprise Security",
        path: "/services/enterprise-security",
        description: "Protect your digital assets with AI-powered threat detection, compliance automation, vulnerability assessment, and zero-trust architecture implementation.",
        icon: Shield,
        highlights: ["AI threat detection", "Compliance automation", "Zero-trust architecture"],
        color: "from-red-500/20 to-orange-500/10"
    },
    {
        title: "IT Outsourcing",
        path: "/services/outsourcing",
        description: "Access top-tier engineering talent through flexible outsourcing — dedicated teams, staff augmentation, or project-based engagements. Scale your team without scaling overhead.",
        icon: Users,
        highlights: ["Dedicated teams", "Staff augmentation", "Project-based delivery"],
        color: "from-sky-500/20 to-indigo-500/10"
    },
];

const industries = [
    { name: "Manufacturing", desc: "Predictive maintenance, quality control, supply chain optimization" },
    { name: "Logistics", desc: "Route optimization, fleet management, demand forecasting" },
    { name: "Healthcare", desc: "Patient data analysis, diagnostic AI, operational efficiency" },
    { name: "E-Commerce", desc: "Recommendation engines, inventory automation, fraud detection" },
    { name: "Finance", desc: "Risk modeling, compliance automation, algorithmic trading" },
    { name: "Education", desc: "Adaptive learning, automated grading, student engagement" },
];

const faqs = [
    {
        question: "What types of AI solutions does RootedAI offer?",
        answer: "RootedAI offers seven core AI services: AI Agent Development, Process Automation, Predictive Analytics, NLP Systems, Web Solutions, Enterprise Security, and IT Outsourcing. Each service is tailored to your specific business needs."
    },
    {
        question: "How long does it take to implement an AI solution?",
        answer: "Implementation timelines vary by complexity. Simple AI agents and automation workflows can be deployed in 2-4 weeks. Complex multi-agent systems and predictive analytics platforms typically take 6-12 weeks. We provide a detailed timeline during the initial consultation."
    },
    {
        question: "Do you work with businesses outside India?",
        answer: "Yes, RootedAI works with businesses globally. We have active projects in Singapore, Dubai, and across the Asia-Pacific region. Our team operates remotely and can support clients in any timezone."
    },
    {
        question: "What is the typical ROI of AI automation?",
        answer: "Our clients typically see 40-80% reduction in operational costs within the first year. For example, our manufacturing AI solutions achieved 35% downtime reduction in Asia, and our logistics automation in Dubai delivered 20% fuel cost savings."
    },
    {
        question: "Can RootedAI integrate with our existing systems?",
        answer: "Absolutely. We specialize in integrating AI solutions with legacy ERP systems, CRMs, databases, and third-party APIs. Our agents are designed to work alongside your existing infrastructure, not replace it."
    },
];

import useGeoLocation from "@/hooks/useGeoLocation";

const ServicesPage = () => {
    const { city, country, loading } = useGeoLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleContact = () => {
        const message = encodeURIComponent("Hi, I'd like to learn more about RootedAI's services.");
        window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
            <Seo
                title="AI Services & Solutions | RootedAI - Enterprise AI Automation"
                description="Explore RootedAI's full suite of AI services: AI Agents, Process Automation, Predictive Analytics, NLP, Web Solutions, Enterprise Security, and IT Outsourcing. Trusted by businesses in India, Singapore, and Dubai."
                keywords={[
                    "AI services",
                    "enterprise AI solutions",
                    "AI automation company",
                    "AI agents development",
                    "business process automation",
                    "predictive analytics services",
                    "NLP solutions",
                    "AI web development",
                    "enterprise security AI",
                    "IT outsourcing India",
                    "AI consulting Singapore",
                    "AI solutions Dubai",
                    "machine learning services",
                    "RPA automation services"
                ]}
                canonical="https://www.rootedai.co.in/services"
                structuredData={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "WebPage",
                            "name": "AI Services & Solutions - RootedAI",
                            "description": "Full suite of AI services including agents, automation, analytics, NLP, web, security, and outsourcing.",
                            "url": "https://www.rootedai.co.in/services",
                            "publisher": {
                                "@type": "Organization",
                                "name": "RootedAI Solutions",
                                "url": "https://www.rootedai.co.in"
                            }
                        },
                        {
                            "@type": "ItemList",
                            "itemListElement": services.map((s, i) => ({
                                "@type": "ListItem",
                                "position": i + 1,
                                "name": s.title,
                                "url": `https://www.rootedai.co.in${s.path}`
                            }))
                        },
                        {
                            "@type": "FAQPage",
                            "mainEntity": faqs.map(faq => ({
                                "@type": "Question",
                                "name": faq.question,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": faq.answer
                                }
                            }))
                        }
                    ]
                }}
            />
            <Navigation />

            <main className="pt-24 pb-16">
                {/* Hero Section */}
                <section className="px-4 md:px-8 max-w-7xl mx-auto text-center py-16 md:py-24 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent rounded-3xl pointer-events-none" />
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 dark:bg-white/5 text-black/80 dark:text-white/80 border border-black/10 dark:border-white/10 text-sm font-medium mb-8 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <span>7 Specialized AI Services</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                            AI Solutions for <br />
                            <span className="text-gradient-silver">
                                {loading ? "Modern Enterprises" : (city ? `Enterprises in ${city}` : (country ? `Enterprises in ${country}` : "Modern Enterprises"))}
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                            From autonomous agents to predictive analytics, we build the intelligent infrastructure
                            that helps enterprises reduce costs by 40%, automate operations, and scale globally.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button onClick={handleContact} size="lg" className="h-12 px-8 text-base">
                                Book a Strategy Call <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <Link to="/case-studies">
                                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                                    View Case Studies
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Services Grid — The Pillar Content */}
                <section className="px-4 md:px-8 max-w-7xl mx-auto py-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our AI Services</h2>
                    <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
                        Each service is a deep specialization — click through to explore detailed capabilities, use cases, FAQs, and pricing guidance.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <Link key={service.path} to={service.path} className="group">
                                <TiltCard className={`h-full p-8 rounded-2xl border border-border/50 bg-gradient-to-br ${service.color} hover:border-primary/30 hover:shadow-xl transition-all duration-300`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 rounded-xl bg-background/80 border border-border/30">
                                            <service.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-bold">{service.title}</h3>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-2 mb-6">
                                        {service.highlights.map((h, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                                        Explore {service.title} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </TiltCard>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Comparison Table */}
                <section className="px-4 md:px-8 max-w-7xl mx-auto py-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Service Comparison</h2>
                    <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
                        Find the right solution for your needs at a glance.
                    </p>
                    <div className="overflow-x-auto rounded-2xl border border-border/50">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-muted/50">
                                    <th className="text-left p-4 font-semibold">Service</th>
                                    <th className="text-left p-4 font-semibold">Best For</th>
                                    <th className="text-left p-4 font-semibold">Timeline</th>
                                    <th className="text-left p-4 font-semibold">Impact</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/30">
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="p-4 font-medium"><Link to="/services/ai-agents" className="text-primary hover:underline">AI Agents</Link></td>
                                    <td className="p-4 text-muted-foreground">Repetitive task elimination</td>
                                    <td className="p-4">2-6 weeks</td>
                                    <td className="p-4 text-primary font-medium">60-80% effort reduction</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="p-4 font-medium"><Link to="/services/process-automation" className="text-primary hover:underline">Process Automation</Link></td>
                                    <td className="p-4 text-muted-foreground">End-to-end workflow efficiency</td>
                                    <td className="p-4">4-8 weeks</td>
                                    <td className="p-4 text-primary font-medium">40-60% cost savings</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="p-4 font-medium"><Link to="/services/predictive-analytics" className="text-primary hover:underline">Predictive Analytics</Link></td>
                                    <td className="p-4 text-muted-foreground">Data-driven decision making</td>
                                    <td className="p-4">6-12 weeks</td>
                                    <td className="p-4 text-primary font-medium">25-40% better forecasting</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="p-4 font-medium"><Link to="/services/nlp-systems" className="text-primary hover:underline">NLP Systems</Link></td>
                                    <td className="p-4 text-muted-foreground">Unstructured data insights</td>
                                    <td className="p-4">4-10 weeks</td>
                                    <td className="p-4 text-primary font-medium">90% faster processing</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="p-4 font-medium"><Link to="/services/web-solutions" className="text-primary hover:underline">Web Solutions</Link></td>
                                    <td className="p-4 text-muted-foreground">AI-integrated web apps</td>
                                    <td className="p-4">4-12 weeks</td>
                                    <td className="p-4 text-primary font-medium">3x user engagement</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="p-4 font-medium"><Link to="/services/enterprise-security" className="text-primary hover:underline">Enterprise Security</Link></td>
                                    <td className="p-4 text-muted-foreground">Threat detection & compliance</td>
                                    <td className="p-4">3-8 weeks</td>
                                    <td className="p-4 text-primary font-medium">99.9% threat detection</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="p-4 font-medium"><Link to="/services/outsourcing" className="text-primary hover:underline">IT Outsourcing</Link></td>
                                    <td className="p-4 text-muted-foreground">Scaling engineering teams</td>
                                    <td className="p-4">1-2 weeks</td>
                                    <td className="p-4 text-primary font-medium">50% cost reduction</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Industries Served */}
                <section className="px-4 md:px-8 max-w-7xl mx-auto py-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Industries We Serve</h2>
                    <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
                        Deep domain expertise across sectors that matter most.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {industries.map((ind) => (
                            <div key={ind.name} className="p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/20 transition-colors">
                                <h3 className="font-bold text-lg mb-2">{ind.name}</h3>
                                <p className="text-sm text-muted-foreground">{ind.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="px-4 md:px-8 max-w-4xl mx-auto py-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
                        Common questions about our AI services and solutions.
                    </p>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="p-6 rounded-2xl border border-border/50 bg-card">
                                <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="px-4 md:px-8 max-w-5xl mx-auto py-16">
                    <div className="text-center py-16 px-8 bg-card rounded-3xl border border-border/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/5 blur-3xl pointer-events-none" />
                        <h2 className="text-3xl md:text-4xl font-bold relative z-10 mb-4">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto relative z-10 mb-8">
                            Join 50+ enterprises saving 40% on operational costs through AI automation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <Button onClick={handleContact} size="lg" className="h-12 px-8 text-base">
                                Book a Free Strategy Call <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <Link to="/pricing">
                                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                                    View Pricing
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div >
    );
};

export default ServicesPage;
