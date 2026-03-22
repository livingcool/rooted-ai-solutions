import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle, ArrowRight, Users, Clock, Target, Zap, Shield, TrendingUp } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import AgentEfficiencySimulator from "@/components/AgentEfficiencySimulator";
import ComparisonTable from "@/components/ComparisonTable";

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
            id: "what-are-ai-agents",
            question: "What are AI agents and how do they work?",
            answer: "AI agents are autonomous software systems that perceive environments, make decisions, and execute tasks to achieve goals. Unlike traditional bots, they use LLMs to reason, plan, and adapt to complex workflows with minimal human oversight, effectively serving as a digital workforce.",
        },
        {
            id: "how-ai-agents-benefit-business",
            question: "How can AI agents benefit my business operations?",
            answer: "AI agents significantly reduce operational costs by automating repetitive tasks, improving 24/7 customer service, and enabling data-driven decision-making. They help businesses scale without increasing headcount, typically saving up to 40% on operational costs through efficient workflow orchestration and error reduction.",
        },
        {
            id: "ai-agents-vs-chatbots",
            question: "What is the difference between AI agents and traditional chatbots?",
            answer: "Traditional chatbots follow rigid scripts, while AI agents use reasoning and tools to handle multi-step tasks autonomously. Agents can make API calls, retrieve live data, and plan complex actions, offering a far more sophisticated and flexible solution than standard rule-based assistants.",
        },
        {
            id: "ai-agent-development-timeline",
            question: "How long does it take to develop a custom AI agent?",
            answer: "A typical AI agent solution takes 4-8 weeks from requirements to deployment. Simple agents may be ready sooner, while complex multi-agent systems take longer. We follow agile methodologies to deliver incremental value and ensure the final solution perfectly fits your specific business needs.",
        },
        {
            id: "ai-agent-integration",
            question: "Can AI agents integrate with my existing ERP or CRM?",
            answer: "Yes, our AI agents integrate seamlessly with existing infrastructure, including CRMs, ERPs, and specialized databases. We use standard protocols and custom connectors to ensure smooth data flow and minimal disruption, allowing your new AI workforce to collaborate with your current tools.",
        },
        {
            id: "ai-agent-support",
            question: "What support is provided after deploying AI agents?",
            answer: "We provide comprehensive post-deployment support, including performance monitoring, regular LLM updates, and continuous optimization. Our team ensures your agents adapt to changing business needs and continue delivering high-value results with maximum uptime and reliability.",
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
                canonical="https://www.rootedai.co.in/services/ai-agents"
                structuredData={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "Service",
                            "name": "AI Agents Development",
                            "provider": {
                                "@type": "Organization",
                                "name": "RootedAI",
                                "url": "https://www.rootedai.co.in"
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

                {/* Comparison Section */}
                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <ComparisonTable
                            title="RootedAI Agents vs. Traditional Automation"
                            items={[
                                { feature: "Reasoning & Planning", rootedAI: true, traditional: false },
                                { feature: "Tool Usage (APIs, DBs)", rootedAI: true, traditional: "Limited" },
                                { feature: "Adaptability to Change", rootedAI: "High (LLM-based)", traditional: "Low (Rule-based)" },
                                { feature: "Error Handling", rootedAI: "Autonomous Recovery", traditional: "Manual Intervention" },
                                { feature: "Deployment Speed", rootedAI: "4-8 Weeks", traditional: "3-6 Months" },
                                { feature: "Maintenance Overhead", rootedAI: "Low (Self-healing)", traditional: "High (Script Updates)" },
                            ]}
                        />
                    </div>
                </section>

                {/* Our Services Section */}
                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight">
                                What AI Agent Services Does RootedAI Offer?
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
                                Comprehensive autonomous solutions for the modern enterprise.
                            </p>
                            <p className="text-muted-foreground opacity-70 max-w-3xl mx-auto">
                                RootedAI provides end-to-end AI agent development, from initial consulting and custom orchestration to seamless integration and ongoing performance optimization.
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

                {/* Efficiency Simulator Section */}
                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <AgentEfficiencySimulator />
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
                                <TiltCard key={index} id={faq.id} className="bw-card p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
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
