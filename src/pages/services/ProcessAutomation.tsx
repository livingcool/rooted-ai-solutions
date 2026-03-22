import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Cpu, CheckCircle, ArrowRight, Workflow, Gauge, BarChart3, Timer, Lock, Repeat } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import ComparisonTable from "@/components/ComparisonTable";
import ROICalculator from "@/components/ROICalculator";

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
            id: "what-processes-can-be-automated",
            question: "What business processes can be automated?",
            answer: "Any repetitive, rule-based task can be automated. Common examples include data entry, report generation, invoice processing, order fulfillment, and employee onboarding. If your team manually repeats a process, it's a prime candidate for automation to save time and reduce errors.",
        },
        {
            id: "automation-time-savings",
            question: "How much time can my business save with automation?",
            answer: "Most clients save 15-20 hours per week per team member. Some processes achieve a 90%+ reduction in manual effort. We provide a detailed ROI analysis during discovery to identify exactly where automation will deliver the highest time and cost savings for your business.",
        },
        {
            id: "automation-replacing-employees",
            question: "Will process automation replace my current employees?",
            answer: "No, automation eliminates tedious tasks, not people. It frees your team to focus on high-value work requiring human judgment and creativity. Organizations typically redeploy staff to strategic roles, increasing overall productivity and job satisfaction without reducing necessary headcount.",
        },
        {
            id: "automation-implementation-time",
            question: "How long does it take to implement process automation?",
            answer: "Simple automations deploy in 1-2 weeks, while complex multi-system integrations take 6-12 weeks. We use agile methodologies to deliver incremental value, ensuring you see operational benefits quickly while we build out the full, end-to-end automated solution.",
        },
        {
            id: "automation-process-changes",
            question: "What happens if our business processes change later?",
            answer: "Our automations are designed for flexibility. When processes evolve, we can quickly update the logic. We also provide training so your team can handle minor adjustments independently. Our ongoing support ensures your automation infrastructure scales and adapts alongside your business growth.",
        },
        {
            id: "automation-security",
            question: "How do you ensure the security of automated processes?",
            answer: "Security is built-in. We implement role-based access controls, data encryption, and comprehensive audit logs. All automations undergo rigorous security reviews before deployment and are monitored 24/7 for anomalies, ensuring your data and operations remain protected and compliant.",
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
                canonical="https://www.rootedai.co.in/services/process-automation"
                structuredData={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "Service",
                            "name": "Business Process Automation",
                            "provider": {
                                "@type": "Organization",
                                "name": "RootedAI",
                                "url": "https://www.rootedai.co.in"
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

                {/* Comparison Section */}
                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <ComparisonTable
                            title="RootedAI Automation vs. Standard RPA"
                            items={[
                                { feature: "Cognitive Decision Making", rootedAI: true, traditional: false },
                                { feature: "Unstructured Data Handling", rootedAI: true, traditional: "Poor" },
                                { feature: "Integration Complexity", rootedAI: "Low (API-first)", traditional: "High (UI-based)" },
                                { feature: "Processing Speed", rootedAI: "Real-time", traditional: "Batch/Delayed" },
                                { feature: "Cost Recovery (ROI)", rootedAI: "3-6 Months", traditional: "12-18 Months" },
                                { feature: "System Resilience", rootedAI: "High", traditional: "Fragile" },
                            ]}
                        />
                    </div>
                </section>

                {/* Our Services Section */}
                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight">
                                What Process Automation Services Does RootedAI Provide?
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
                                Scalable automation solutions for complex enterprise workflows.
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

                {/* ROI Calculator Section */}
                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <ROICalculator />
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
