import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, ArrowRight, AlertTriangle, FileCheck, Eye, Scale, Activity, Bell } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";

const AISafety = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFreeAudit = () => {
        const message = encodeURIComponent(`Hi, I'd like to get a Free AI Safety Audit for my business`);
        window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
    };

    const services = [
        {
            title: "AI Safety Audits",
            description: "Comprehensive evaluation of your AI systems to identify risks, vulnerabilities, and compliance gaps. We assess model behavior, data handling, and deployment practices to ensure your AI operates safely and ethically.",
            icon: FileCheck,
        },
        {
            title: "Bias Testing & Mitigation",
            description: "Detect and eliminate biases in your AI models. We conduct rigorous testing across demographic segments, use cases, and edge cases to ensure fair and equitable outcomes for all users.",
            icon: Scale,
        },
        {
            title: "AI Explainability",
            description: "Make your AI decisions transparent and interpretable. We implement explainability frameworks that help you understand why your AI makes specific decisions, crucial for regulatory compliance and user trust.",
            icon: Eye,
        },
        {
            title: "DPDP Compliance",
            description: "Ensure your AI systems comply with India's Digital Personal Data Protection Act. We help you implement data governance, user consent mechanisms, and privacy-by-design principles.",
            icon: Shield,
        },
        {
            title: "Model Monitoring & Governance",
            description: "Continuous monitoring of AI model performance, drift detection, and governance workflows. We set up automated alerts, performance dashboards, and compliance reporting for ongoing safety.",
            icon: Activity,
        },
        {
            title: "AI Incident Response",
            description: "Rapid response protocols for AI failures, security breaches, or compliance violations. We establish incident management frameworks, escalation procedures, and remediation strategies.",
            icon: Bell,
        },
    ];

    const benefits = [
        { title: "Zero Compliance Incidents", description: "Deploy AI with confidence knowing you're protected from regulatory violations, fines, and reputational damage. Our frameworks have maintained a 100% compliance record across 50+ deployments." },
        { title: "Build User Trust", description: "Transparent, explainable AI builds customer confidence. Our safety protocols help you demonstrate responsible AI practices to users, investors, and regulators." },
        { title: "Reduce Deployment Risk", description: "Identify and mitigate risks before they become costly problems. Our proactive safety audits catch issues in development, saving you from expensive post-deployment fixes." },
        { title: "Future-Proof Your AI", description: "Stay ahead of evolving regulations and industry standards. Our compliance frameworks adapt to new requirements, ensuring your AI remains compliant as laws change." },
    ];

    const whyChoose = [
        {
            number: "01",
            title: "India's Leading AI Safety Experts",
            description: "We're pioneers in AI safety and compliance in India. Our team combines deep technical expertise with regulatory knowledge to deliver comprehensive safety solutions.",
        },
        {
            number: "02",
            title: "Proven Track Record",
            description: "50+ successful AI deployments with zero compliance incidents. We've helped companies across fintech, healthcare, e-commerce, and logistics deploy AI safely and responsibly.",
        },
        {
            number: "03",
            title: "DPDP Compliance Specialists",
            description: "Deep expertise in India's Digital Personal Data Protection Act. We understand the nuances of DPDP compliance and help you navigate complex regulatory requirements.",
        },
        {
            number: "04",
            title: "End-to-End Safety Framework",
            description: "From initial audits to ongoing monitoring, we provide comprehensive safety coverage. Our frameworks span the entire AI lifecycle from development to deployment and maintenance.",
        },
    ];

    const process = [
        { title: "Initial Safety Assessment", description: "We begin with a comprehensive audit of your current AI systems, data practices, and deployment processes. This includes risk assessment, compliance gap analysis, and documentation review." },
        { title: "Risk Identification & Mapping", description: "We identify potential safety risks, bias sources, and compliance vulnerabilities. Our analysis covers technical risks, regulatory requirements, and ethical considerations." },
        { title: "Safety Framework Implementation", description: "We implement safety protocols, monitoring systems, and governance workflows tailored to your specific needs. This includes bias mitigation, explainability tools, and compliance mechanisms." },
        { title: "Testing & Validation", description: "Rigorous testing across scenarios, edge cases, and demographic segments to ensure your AI performs safely and fairly. We validate compliance with DPDP and industry standards." },
        { title: "Ongoing Monitoring & Support", description: "Continuous monitoring with automated alerts, performance dashboards, and regular compliance reports. We provide ongoing support to ensure your AI remains safe and compliant." },
    ];

    const stats = [
        { number: "50+", label: "AI Deployments" },
        { number: "Zero", label: "Compliance Incidents" },
        { number: "99.8%", label: "Accuracy Maintained" },
        { number: "40%", label: "Cost Reduction" },
    ];

    const faqs = [
        {
            question: "Why is AI safety important for my business?",
            answer: "AI safety is critical to avoid regulatory fines, reputational damage, and costly deployment failures. With India's DPDP Act and increasing global AI regulations, deploying AI without proper safety frameworks exposes you to significant legal and financial risks. Our safety protocols protect your business while building user trust.",
        },
        {
            question: "What is the Digital Personal Data Protection Act (DPDP)?",
            answer: "India's DPDP Act regulates how businesses collect, process, and store personal data. For AI systems that process user data, DPDP compliance is mandatory. We help you implement data governance, consent mechanisms, and privacy safeguards to ensure your AI complies with DPDP requirements.",
        },
        {
            question: "How do you test for AI bias?",
            answer: "We conduct comprehensive bias testing across demographic segments, use cases, and edge cases. This includes statistical analysis, fairness metrics, and scenario testing to identify disparate impacts. We then implement mitigation strategies like data rebalancing, algorithm adjustments, and fairness constraints.",
        },
        {
            question: "What is AI explainability and why does it matter?",
            answer: "AI explainability refers to understanding how and why an AI system makes specific decisions. It's crucial for regulatory compliance, user trust, and debugging. We implement tools like SHAP, LIME, and attention visualization to make your AI decisions transparent and interpretable.",
        },
        {
            question: "How long does an AI safety audit take?",
            answer: "A comprehensive AI safety audit typically takes 2-4 weeks depending on the complexity of your systems. This includes initial assessment, risk analysis, compliance review, and detailed reporting with actionable recommendations.",
        },
        {
            question: "Do you offer ongoing AI safety monitoring?",
            answer: "Yes! We provide continuous monitoring with automated alerts, performance dashboards, and regular compliance reports. Our monitoring detects model drift, performance degradation, bias emergence, and compliance violations in real-time, allowing rapid response.",
        },
    ];

    return (
        <div className="min-h-screen relative">
            <Seo
                title="AI Safety & Compliance Services | DPDP Compliance India"
                description="Deploy AI without the risk. Comprehensive AI safety audits, bias testing, DPDP compliance, and model monitoring. 50+ deployments, zero compliance incidents."
                keywords={[
                    "AI safety",
                    "AI compliance India",
                    "DPDP compliance",
                    "AI bias testing",
                    "AI explainability",
                    "AI audits",
                    "responsible AI",
                    "AI governance",
                    "AI risk management",
                    "AI model monitoring",
                    "AI incident response",
                    "ethical AI"
                ]}
                canonical="https://www.rootedai.co.in/services/ai-safety"
                structuredData={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "Service",
                            "name": "AI Safety & Compliance",
                            "provider": {
                                "@type": "Organization",
                                "name": "RootedAI",
                                "url": "https://www.rootedai.co.in"
                            },
                            "description": "Comprehensive AI safety audits, bias testing, DPDP compliance, and model monitoring services.",
                            "areaServed": "India",
                            "hasOfferCatalog": {
                                "@type": "OfferCatalog",
                                "name": "AI Safety Services",
                                "itemListElement": [
                                    {
                                        "@type": "Offer",
                                        "itemOffered": {
                                            "@type": "Service",
                                            "name": "AI Safety Audits"
                                        }
                                    },
                                    {
                                        "@type": "Offer",
                                        "itemOffered": {
                                            "@type": "Service",
                                            "name": "DPDP Compliance"
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
                                <Shield className="w-4 h-4 text-black dark:text-white" />
                                <span className="text-sm text-black/80 dark:text-white/80">AI Safety & Compliance</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight">
                                Deploy AI Without the Risk
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                                Most Indian companies deploy AI with zero safety frameworks. We help you build responsible, compliant AI that protects your business and builds user trust.
                            </p>
                            <Button
                                onClick={handleFreeAudit}
                                size="lg"
                                className="mt-8 bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-semibold group"
                            >
                                Get Free AI Safety Audit
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Problem Statement */}
                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-start gap-6 mb-8">
                                <AlertTriangle className="w-12 h-12 text-black dark:text-white flex-shrink-0" />
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4 tracking-tight">
                                        The Problem: AI Without Safety is a Liability
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                                        Most Indian companies rush to deploy AI without proper safety frameworks, exposing themselves to:
                                    </p>
                                    <ul className="space-y-3 text-muted-foreground">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-black dark:text-white flex-shrink-0 mt-0.5" />
                                            <span>Regulatory fines under India's DPDP Act and global data protection laws</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-black dark:text-white flex-shrink-0 mt-0.5" />
                                            <span>Reputational damage from biased or unfair AI decisions</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-black dark:text-white flex-shrink-0 mt-0.5" />
                                            <span>Costly post-deployment fixes and downtime</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-black dark:text-white flex-shrink-0 mt-0.5" />
                                            <span>Loss of user trust and competitive advantage</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-black/5 dark:bg-white/5 p-6 rounded-lg border border-black/10 dark:border-white/10">
                                <p className="text-lg font-semibold text-black dark:text-white">
                                    RootedAI is India's leading AI safety and compliance partner. We've helped 50+ companies deploy AI responsibly with zero compliance incidents.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center space-y-2">
                                    <div className="text-4xl md:text-5xl font-bold text-black dark:text-white">{stat.number}</div>
                                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Our Services Section */}
                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight">
                                Comprehensive AI Safety Services
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
                                End-to-end safety and compliance for your AI systems
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
                                Why Choose RootedAI for AI Safety?
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                India's trusted partner for responsible AI deployment
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
                                The RootedAI Safety Advantage
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Deploy AI with confidence, build user trust, reduce risk
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
                                Our Safety Implementation Process
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Comprehensive safety from audit to ongoing monitoring
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
                            <p className="text-muted-foreground">Everything you need to know about AI safety</p>
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
                                Ready to Deploy AI Safely and Responsibly?
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Get a free AI safety audit and protect your business from compliance risks
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={handleFreeAudit}
                                    size="lg"
                                    className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-semibold"
                                >
                                    Get Free AI Safety Audit
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

export default AISafety;
