import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle, ArrowRight, Users, Clock, Target, Zap, Shield, TrendingUp } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";

const AIAgents = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleConsultExperts = () => {
        const message = encodeURIComponent(`Hi, I'd like to consult about AI Agents for my business`);
        window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
    };

    const services = [
        {
            title: "Expert AI Agent Consulting",
            description: "Our AI agent consulting services offer insights and strategies to tap into autonomous AI's potential. We assess your business needs, identify automation opportunities, and craft a customized roadmap for seamless integration and maximum ROI.",
            icon: Users,
        },
        {
            title: "Custom AI Agent Development",
            description: "We specialize in building custom AI agents meticulously tailored to your specific workflows. By leveraging cutting-edge LLMs and agentic frameworks, we ensure high performance, precision, and accuracy in task execution and decision-making.",
            icon: Brain,
        },
        {
            title: "Multi-Agent Systems",
            description: "Our multi-agent orchestration services enable complex workflows where specialized agents collaborate. We design and implement agent hierarchies that work together to solve sophisticated business challenges seamlessly.",
            icon: Target,
        },
        {
            title: "AI Agent Integration",
            description: "Integrating AI agents into current workflows can be challenging, but our experienced team makes it seamless. Our integration service ensures your agents harmonize with existing infrastructure, including data migration and performance optimization.",
            icon: Zap,
        },
        {
            title: "AI Agent Monitoring & Support",
            description: "Maintaining AI agents is crucial for sustained success. Our ongoing support ensures effective management. We vigilantly monitor performance, manage updates, and troubleshoot promptly, helping your AI solutions adapt confidently.",
            icon: Shield,
        },
        {
            title: "Agent Performance Optimization",
            description: "If you already have existing AI agents, our optimization services significantly enhance performance by evaluating, identifying areas for improvements, and implementing advanced techniques for efficiency and accuracy.",
            icon: TrendingUp,
        },
    ];

    const benefits = [
        { title: "Boost cost-efficiency and profitability", description: "Streamline operations, cut down on unnecessary expenses by automating tasks, and optimize resource allocation. Our approach identifies cost-saving opportunities, ensuring every dollar delivers maximum value." },
        { title: "Data-driven insights at your fingertips", description: "Gain valuable insights with AI analytics, analyzing data to uncover trends, patterns, and optimization opportunities. Using predictive modeling, we enable proactive decision-making." },
        { title: "Run smoother operations end-to-end", description: "Operational efficiency is an ongoing journey. We optimize workflows to ensure peak efficiency, from data entry and document processing to customer inquiries and complex decision-making." },
        { title: "Scalability and adaptability", description: "Our flexible AI architecture adapts to your evolving needs, allowing you to scale operations effortlessly. Whether experiencing rapid growth or facing increased complexity, our solutions accommodate your requirements." },
    ];

    const whyChoose = [
        {
            number: "01",
            title: "Dedicated team of AI experts",
            description: "Our team comprises seasoned AI engineers and architects specializing in cutting-edge agentic AI technologies. We stay ahead of the curve, constantly experimenting with the latest advancements in autonomous systems and LLMs.",
        },
        {
            number: "02",
            title: "Versatile expertise across industries",
            description: "We've successfully delivered AI agent solutions across diverse industries. This experience has equipped us with invaluable insights into complex business challenges and the ability to customize solutions for maximum impact.",
        },
        {
            number: "03",
            title: "Customized, competitive solutions",
            description: "We don't believe in one-size-fits-all. We craft bespoke AI agents tailored to your specific data, workflows, and strategic goals. This ensures seamless integration, high-value impact, and a competitive edge.",
        },
        {
            number: "04",
            title: "Agile development for faster time-to-value",
            description: "We utilize agile methodologies for rapid development and deployment, continuously incorporating your feedback throughout the iterative process to ensure the final solution aligns perfectly with your needs.",
        },
    ];

    const process = [
        { title: "Requirements Analysis", description: "We start by understanding your business processes, pain points, and automation opportunities. This involves detailed interviews and workflow analysis to identify where AI agents can deliver maximum value." },
        { title: "Agent Architecture Design", description: "We design the agent architecture, defining agent roles, capabilities, and communication protocols. This includes selecting the right LLMs, tools, and frameworks for your specific use case." },
        { title: "Development & Training", description: "Our team develops and trains the AI agents using state-of-the-art frameworks. We implement iterative testing and refinement to ensure agents perform reliably across various scenarios." },
        { title: "Integration & Deployment", description: "We seamlessly integrate the agents into your existing systems and deploy them to production. Our deployment process ensures minimal disruption to your operations using scalable cloud platforms." },
        { title: "Monitoring & Optimization", description: "Post-deployment, we continuously monitor agent performance, making necessary adjustments to maintain optimal efficiency. This includes updating agents with new capabilities and refining decision-making logic." },
    ];

    const faqs = [
        {
            question: "What are AI agents?",
            answer: "AI agents are autonomous software systems that can perceive their environment, make decisions, and take actions to achieve specific goals. Unlike traditional automation, they can adapt to new situations, learn from interactions, and handle complex multi-step workflows with minimal human intervention.",
        },
        {
            question: "How can AI agents benefit my business?",
            answer: "AI agents can significantly reduce operational costs by automating repetitive tasks, improve decision-making through data analysis, enhance customer service with 24/7 availability, and scale operations without proportional increases in headcount. They excel at handling routine queries, data processing, and complex workflow orchestration.",
        },
        {
            question: "What's the difference between AI agents and traditional chatbots?",
            answer: "Traditional chatbots follow predefined scripts and rules, while AI agents leverage large language models and can reason, plan, and execute multi-step tasks autonomously. Agents can use tools, make API calls, retrieve information, and handle complex scenarios that would require human-like understanding and decision-making.",
        },
        {
            question: "How long does it take to develop an AI agent solution?",
            answer: "Development timelines vary based on complexity, but a typical AI agent solution takes 4-8 weeks from requirements to deployment. Simple single-agent systems can be deployed faster, while complex multi-agent orchestrations may take longer. We use agile methodologies to deliver incremental value throughout the process.",
        },
        {
            question: "Can AI agents integrate with our existing systems?",
            answer: "Yes! Our AI agents are designed to integrate seamlessly with your existing infrastructure. We support integration with CRMs, ERPs, databases, APIs, and various enterprise software through standard protocols and custom connectors. We ensure smooth data flow and minimal disruption during integration.",
        },
        {
            question: "What support do you offer post-deployment?",
            answer: "We provide comprehensive ongoing support including performance monitoring, regular updates, troubleshooting, and optimization. Our team is available to handle any issues, implement new capabilities, and ensure your AI agents continue to deliver value as your business evolves.",
        },
    ];

    return (
        <div className="min-h-screen relative">
            <Seo
                title="AI Agents Development Services"
                description="Custom AI agent development, consulting, and multi-agent systems. Automate workflows with autonomous AI agents."
                keywords={[
                    "AI agents",
                    "autonomous agents",
                    "AI consulting",
                    "multi-agent systems",
                    "business automation",
                    "smart AI assistants",
                    "agentic workflows",
                    "LLM agents",
                    "LangChain development",
                    "custom AI workforce",
                    "task automation agents"
                ]}
                canonical="https://rootedai.com/services/ai-agents"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": "AI Agents Development",
                    "provider": {
                        "@type": "Organization",
                        "name": "RootedAI",
                        "url": "https://rootedai.com"
                    },
                    "description": "Custom AI agent development, consulting, and multi-agent systems.",
                    "areaServed": "Global",
                    "hasOfferCatalog": {
                        "@type": "OfferCatalog",
                        "name": "AI Agents Services",
                        "itemListElement": [
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "Expert AI Agent Consulting"
                                }
                            },
                            {
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Service",
                                    "name": "Custom AI Agent Development"
                                }
                            }
                        ]
                    }
                }}
            />
            <div className="relative z-10">
                <Navigation />

                {/* Hero Section */}
                <section className="pt-32 pb-20 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-8 flex justify-center">
                            <Breadcrumbs />
                        </div>
                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-4">
                                <Brain className="w-4 h-4 text-black dark:text-white" />
                                <span className="text-sm text-black/80 dark:text-white/80">AI Agents Services</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight">
                                AI Agents Development Services
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                                Supercharge your business with RootedAI! Our AI agent services drive growth, efficiency, and innovation through autonomous, intelligent automation.
                            </p>
                            <Button
                                onClick={handleConsultExperts}
                                size="lg"
                                className="mt-8 bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-semibold group"
                            >
                                Consult our experts
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Our Services Section */}
                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight">
                                Our Services
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
                                Experience the power of AI agents
                            </p>
                            <p className="text-muted-foreground opacity-70 max-w-3xl mx-auto">
                                We offer AI agent development solutions to transform your business with custom autonomous systems.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service, index) => (
                                <TiltCard key={index} className="bw-card p-8 group hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
                                    <div className="mb-6 inline-block p-4 rounded-lg bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                                        <service.icon className="w-8 h-8 text-black dark:text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-black dark:text-white mb-4 group-hover:translate-x-1 transition-transform">
                                        {service.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm">
                                        {service.description}
                                    </p>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose RootedAI Section */}
                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
                                Why Choose RootedAI?
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Why RootedAI for AI agent development services
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {whyChoose.map((item, index) => (
                                <div key={index} className="flex gap-6 group">
                                    <div className="text-6xl font-bold text-black/10 dark:text-white/10 group-hover:text-black/20 dark:group-hover:text-white/20 transition-colors">
                                        {item.number}
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <h3 className="text-xl font-bold text-black dark:text-white">{item.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
                                Enhance Performance and Profitability
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                How AI agents fuel sustainable growth for your business
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {benefits.map((benefit, index) => (
                                <TiltCard key={index} className="bw-card p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle className="w-6 h-6 text-black dark:text-white flex-shrink-0 mt-1" />
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold text-black dark:text-white">{benefit.title}</h3>
                                            <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                                        </div>
                                    </div>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
                                Our Development Process
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Explore our step-by-step AI agent development approach
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto space-y-8">
                            {process.map((step, index) => (
                                <div key={index} className="flex gap-6 items-start group">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20 flex items-center justify-center text-black dark:text-white font-bold group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 space-y-2 pt-2">
                                        <h3 className="text-xl font-bold text-black dark:text-white">{step.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-muted-foreground">Got questions? We've got answers!</p>
                        </div>

                        <div className="max-w-4xl mx-auto space-y-6">
                            {faqs.map((faq, index) => (
                                <TiltCard key={index} className="bw-card p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
                                    <h3 className="text-lg font-bold text-black dark:text-white mb-3">{faq.question}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="bw-card p-12 md:p-16 text-center bg-gradient-to-b from-black/5 to-transparent dark:from-white/5">
                            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">
                                Don't just imagine the future. Start building it today.
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Transform your business with our AI agent development services
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={handleConsultExperts}
                                    size="lg"
                                    className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-semibold"
                                >
                                    Start your AI Journey
                                </Button>
                                <Link to="/#contact">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10"
                                    >
                                        Contact Us
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
};

export default AIAgents;
