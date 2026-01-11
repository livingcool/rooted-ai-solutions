import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Cpu, CheckCircle, ArrowRight, Workflow, Gauge, BarChart3, Timer, Lock, Repeat } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";

const ProcessAutomation = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleConsultExperts = () => {
        const message = encodeURIComponent(`Hi, I'd like to consult about Process Automation for my business`);
        window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
    };

    const services = [
        {
            title: "Expert Automation Consulting",
            description: "Our process automation consulting services analyze your current workflows, identify bottlenecks, and design comprehensive automation strategies that deliver maximum efficiency gains and ROI.",
            icon: BarChart3,
        },
        {
            title: "Custom Workflow Automation",
            description: "We build bespoke automation solutions tailored to your unique business processes. From data entry to complex approval workflows, we automate repetitive tasks to free up your team for high-value work.",
            icon: Workflow,
        },
        {
            title: "RPA Implementation",
            description: "Our Robotic Process Automation (RPA) services automate rule-based tasks across multiple systems. We implement software robots that work 24/7, executing tasks with perfect accuracy and consistency.",
            icon: Repeat,
        },
        {
            title: "Document Processing Automation",
            description: "Transform document-heavy processes with our intelligent automation. We extract, validate, and process data from invoices, forms, and documents automatically using AI-powered OCR and NLP.",
            icon: Cpu,
        },
        {
            title: "Performance Monitoring",
            description: "Track automation performance with real-time dashboards and analytics. We provide comprehensive monitoring tools to measure efficiency gains, error rates, and ROI from your automation investments.",
            icon: Gauge,
        },
        {
            title: "Continuous Optimization",
            description: "Automation is an ongoing journey. We continuously analyze performance metrics, identify new automation opportunities, and refine existing automations to ensure maximum efficiency as your business evolves.",
            icon: Timer,
        },
    ];

    const benefits = [
        {
            title: "Dramatic time savings",
            description: "Save 15-20 hours per week per team member by automating repetitive tasks. Redirect human effort to strategic initiatives that drive business growth and innovation."
        },
        {
            title: "Enhanced accuracy and compliance",
            description: "Eliminate human errors in data entry, calculations, and process execution. Ensure consistent compliance with regulations and internal policies through automated validation and audit trails."
        },
        {
            title: "Improved employee satisfaction",
            description: "Free your team from soul-crushing repetitive work. Let them focus on creative, strategic tasks that leverage their unique human capabilities and drive job satisfaction."
        },
        {
            title: "Scalability without headcount",
            description: "Handle increasing workloads without proportional increases in staffing. Our automation solutions scale effortlessly to meet demand spikes and business growth."
        },
    ];

    const useCases = [
        {
            industry: "Finance & Accounting",
            example: "Automate invoice reconciliation, expense approvals, month-end closing, and financial reporting. Process hundreds of transactions in minutes instead of days.",
            metrics: "90% reduction in processing time",
        },
        {
            industry: "HR & Recruitment",
            example: "Automate candidate screening, interview scheduling, onboarding workflows, and employee data management. Handle 10x more candidates with the same team.",
            metrics: "80% faster onboarding",
        },
        {
            industry: "Customer Service",
            example: "Automate ticket routing, response generation, status updates, and escalation workflows. Provide instant responses to common queries 24/7.",
            metrics: "60% reduction in response time",
        },
        {
            industry: "Logistics & Supply Chain",
            example: "Automate order processing, shipment tracking, inventory updates, and supplier communications. Real-time visibility across your entire supply chain.",
            metrics: "95% order accuracy",
        },
        {
            industry: "Healthcare",
            example: "Automate patient registration, appointment scheduling, claims processing, and medical record updates. Ensure HIPAA compliance while reducing administrative burden.",
            metrics: "70% faster claims processing",
        },
        {
            industry: "Manufacturing",
            example: "Automate quality control reporting, production scheduling, inventory management, and maintenance workflows. Optimize production efficiency and minimize downtime.",
            metrics: "30% increase in throughput",
        },
    ];

    const process = [
        {
            title: "Process Discovery & Analysis",
            description: "We map your current processes, identify pain points, measure baseline metrics, and prioritize automation opportunities based on impact and feasibility."
        },
        {
            title: "Automation Design",
            description: "We design the optimal automation architecture, select the right tools and technologies, define integration points, and create detailed implementation plans."
        },
        {
            title: "Development & Testing",
            description: "Our team builds and rigorously tests the automation, ensuring reliability across edge cases. We involve stakeholders in UAT to validate functionality."
        },
        {
            title: "Deployment & Training",
            description: "We deploy automation to production with minimal disruption, train your team on new workflows, and provide comprehensive documentation and support materials."
        },
        {
            title: "Monitoring & Optimization",
            description: "Post-deployment, we monitor performance metrics, gather user feedback, identify optimization opportunities, and continuously improve automation efficiency."
        },
    ];

    const faqs = [
        {
            question: "What processes can be automated?",
            answer: "Almost any repetitive, rule-based process can be automated. Common candidates include data entry, report generation, email responses, invoice processing, order fulfillment, employee onboarding, and system integrations. If your team does it manually and repeatedly, it's likely automatable.",
        },
        {
            question: "How much time can automation save?",
            answer: "Time savings vary by process, but our clients typically save 15-20 hours per week per team member on automated tasks. Some processes see 90%+ reduction in processing time. We provide detailed ROI analysis during the discovery phase.",
        },
        {
            question: "Will automation replace our employees?",
            answer: "No! Automation eliminates tedious tasks, not jobs. It frees your team to focus on higher-value work that requires human judgment, creativity, and relationship-building. Most organizations redeploy staff to more strategic roles rather than reducing headcount.",
        },
        {
            question: "How long does automation implementation take?",
            answer: "Simple automations can be deployed in 1-2 weeks. Complex, multi-system automations typically take 6-12 weeks. We use agile methodologies to deliver incremental value throughout the process, so you see benefits before the full solution is complete.",
        },
        {
            question: "What happens if our process changes?",
            answer: "We design automations to be flexible and maintainable. When processes change, we can quickly update the automation. We also provide training so your team can make minor adjustments independently. Our ongoing support ensures automations evolve with your business.",
        },
        {
            question: "How do you ensure automation security?",
            answer: "Security is paramount. We implement role-based access controls, encrypt sensitive data, maintain comprehensive audit logs, and follow industry best practices. All automations undergo security review before deployment, and we provide ongoing monitoring for anomalies.",
        },
    ];

    return (
        <div className="min-h-screen relative">
            <Seo
                title="Business Process Automation Solutions"
                description="End-to-end process automation services. Save time and costs by automating repetitive tasks with RPA and intelligent workflows."
                keywords={[
                    "process automation",
                    "RPA",
                    "workflow automation",
                    "business efficiency",
                    "cost reduction",
                    "intelligent document processing",
                    "IDP",
                    "automated data entry",
                    "business process management",
                    "BPM",
                    "operational excellence",
                    "legacy system integration"
                ]}
                canonical="https://rootedai.com/services/process-automation"
                structuredData={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "Service",
                            "name": "Business Process Automation",
                            "provider": {
                                "@type": "Organization",
                                "name": "RootedAI",
                                "url": "https://rootedai.com"
                            },
                            "description": "End-to-end process automation utilizing RPA and intelligent workflows to reduce manual effort.",
                            "areaServed": "Global",
                            "catalogue": {
                                "@type": "OfferCatalog",
                                "name": "Automation Services",
                                "itemListElement": [
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Expert Automation Consulting" } },
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "RPA Implementation" } },
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Document Processing Automation" } }
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
                                <Cpu className="w-4 h-4 text-black dark:text-white" />
                                <span className="text-sm text-black/80 dark:text-white/80">Process Automation Services</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight">
                                Process Automation Solutions
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                                End-to-end automation of repetitive tasks, reducing manual effort by up to 90%. Transform your operations with intelligent automation that scales.
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
                                Comprehensive automation solutions for modern businesses
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

                {/* Use Cases Section */}
                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
                                Automation for Every Industry
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                From startups to enterprises, our expertise spans diverse sectors
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {useCases.map((useCase, index) => (
                                <TiltCard key={index} className="bw-card p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
                                    <h3 className="text-xl font-bold text-black dark:text-white mb-4">{useCase.industry}</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm mb-4">{useCase.example}</p>
                                    <div className="pt-4 border-t border-black/10 dark:border-white/10">
                                        <span className="text-xs font-semibold text-black/80 dark:text-white/80">{useCase.metrics}</span>
                                    </div>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
                                Transform Your Operations
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                How process automation drives sustainable growth
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
                                Our Approach
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                A proven methodology for successful automation
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
                                Ready to automate your business processes?
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Save 15-20 hours per week and redirect your team to high-value work
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={handleConsultExperts}
                                    size="lg"
                                    className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-semibold"
                                >
                                    Start your automation journey
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

export default ProcessAutomation;
