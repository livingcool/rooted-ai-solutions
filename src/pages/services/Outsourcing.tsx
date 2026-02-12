import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users, Code2, Zap, Clock, Shield, Globe, CheckCircle, TrendingUp, ArrowRight } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import OutsourcingCalculator from "@/components/OutsourcingCalculator";

const OutsourcingServicePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleContactUs = () => {
        const message = encodeURIComponent(`Hi, I'm interested in outsourcing software development to RootedAI`);
        window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
    };

    const engagementModels = [
        {
            title: "Project-Based",
            description: "Fixed scope, timeline, and budget. Perfect for well-defined projects where you need guaranteed delivery without management overhead.",
            icon: Code2,
            features: ["Clear deliverables", "Fixed pricing", "Dedicated PM", "Quality assurance", "Milestone-based payments"],
            bestFor: "MVPs, specific features, short-term fixed projects",
        },
        {
            title: "Dedicated Team",
            description: "Your remote tech team that works exclusively on your projects. You manage them directly or we manage them for you - your choice.",
            icon: Users,
            features: ["Full-time dedication", "Flexible scaling", "Direct communication", "Aligned with your culture", "Long-term knowledge retention"],
            bestFor: "Long-term development, product companies, startups",
        },
        {
            title: "Staff Augmentation",
            description: "Extend your existing team with our skilled developers on-demand. Fill skill gaps quickly without the long hiring process.",
            icon: Zap,
            features: ["Quick onboarding (< 48 hrs)", "Skill-specific expertise", "Integrate seamlessly", "Pay as you go", "Zero overhead"],
            bestFor: "Filling skill gaps, handling workload spikes, scaling quickly",
        },
    ];

    const benefits = [
        {
            icon: TrendingUp,
            title: "60% Cost Reduction",
            description: "Save significantly on hiring, infrastructure, office space, and overhead costs while maintaining Silicon Valley quality standards.",
        },
        {
            icon: Clock,
            title: "3x Faster Delivery",
            description: "Accelerate your product roadmap with experienced teams, established agile processes, and ready-to-use code libraries.",
        },
        {
            icon: Globe,
            title: "Access to Global Talent",
            description: "Don't be limited by local talent pools. Leverage our vetted network of skilled developers with expertise in the latest AI and web technologies.",
        },
        {
            icon: Shield,
            title: "Zero Risk Guarantee",
            description: "We offer complete IP protection, strict NDAs, and performance guarantees. If you're not satisfied, cancel anytime with a simple notice.",
        },
    ];

    const techStack = [
        "React & Next.js", "Node.js & Python", "AI & LLM Integration",
        "React Native & Flutter", "AWS & Google Cloud", "PostgreSQL & MongoDB"
    ];

    const faqs = [
        {
            question: "How quickly can I scale my team?",
            answer: "We typically onboard developers within 2-5 days for staff augmentation models. For dedicated teams, we can assemble a full squad within 2 weeks, depending on the specific skills required.",
        },
        {
            question: "How do you ensure code quality?",
            answer: "We follow strict coding standards, conduct regular code reviews, and use automated testing pipelines (CI/CD). Our developers are senior-level experts who follow best practices for maintainable and scalable code.",
        },
        {
            question: "What is your time zone overlap?",
            answer: "We adjust our working hours to ensure at least 4 hours of overlap with your timezone for real-time collaboration. We use async communication tools for transparent updates.",
        },
        {
            question: "Do I own the intellectual property (IP)?",
            answer: "Yes, absolutely. Under our contracts, all code, designs, and assets created during the engagement are 100% your intellectual property.",
        },
        {
            question: "What if I'm not satisfied with a developer?",
            answer: "We offer a satisfaction guarantee. If a developer doesn't meet your expectations within the trial period, we will replace them at no extra cost to ensures your project stays on track.",
        }
    ];

    return (
        <div className="min-h-screen relative">
            <Seo
                title="Software Development Outsourcing Services"
                description="Scale your team with RootedAI's expert developers. Flexible outsourcing models: project-based, dedicated teams, or staff augmentation."
                keywords={[
                    "outsourcing",
                    "software development",
                    "dedicated team",
                    "staff augmentation",
                    "remote developers",
                    "hire AI engineers",
                    "offshore development center",
                    "IT outsourcing services",
                    "React developers for hire",
                    "custom software teams",
                    "tech talent solutions"
                ]}
                canonical="https://rootedai.com/services/outsourcing"
                structuredData={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "Service",
                            "name": "Software Development Outsourcing",
                            "provider": {
                                "@type": "Organization",
                                "name": "RootedAI",
                                "url": "https://rootedai.com"
                            },
                            "description": "Flexible software development outsourcing including dedicated teams and staff augmentation.",
                            "areaServed": "Global",
                            "catalogue": {
                                "@type": "OfferCatalog",
                                "name": "Outsourcing Models",
                                "itemListElement": [
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dedicated Development Teams" } },
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Staff Augmentation" } },
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Project-based Outsourcing" } }
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
                    <div className="container mx-auto px-6 md:px-6">
                        <div className="mb-8 flex justify-center">
                            <Breadcrumbs />
                        </div>
                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-4">
                                <Users className="w-4 h-4 text-black dark:text-white" />
                                <span className="text-sm text-black/80 dark:text-white/80">Outsourcing Services</span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-bold text-black dark:text-white tracking-tight leading-[1.2] md:leading-tight">
                                Your Extended <br />
                                <span className="bg-gradient-to-r from-black via-black/90 to-black/70 dark:from-white dark:via-white/90 dark:to-white/70 bg-clip-text text-transparent">
                                    Development Team
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed px-2">
                                Stop hiring headaches. Scale instantly with our elite pre-vetted developers. Build faster, ship better, and save up to 60% on development costs.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                                <Button
                                    onClick={handleContactUs}
                                    size="lg"
                                    className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-semibold group"
                                >
                                    Build Your Team
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-12 border-b border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { number: "50+", label: "Projects Delivered" },
                                { number: "95%", label: "Client Retention" },
                                { number: "48h", label: "Avg. Onboarding" },
                                { number: "60%", label: "Cost Savings" },
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">{stat.number}</div>
                                    <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Engagement Models Section */}
                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight">
                                Engagement Models
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
                                Flexible cooperation models to suit your specific business needs
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                            {engagementModels.map((model, index) => (
                                <TiltCard key={index} className="bw-card p-8 group hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500 flex flex-col">
                                    <div className="mb-6 inline-block p-4 rounded-lg bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors w-fit">
                                        <model.icon className="w-8 h-8 text-black dark:text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-black dark:text-white mb-4 group-hover:translate-x-1 transition-transform">
                                        {model.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                                        {model.description}
                                    </p>
                                    <div className="space-y-3 mb-6 flex-1">
                                        {model.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <CheckCircle className="w-4 h-4 text-black/60 dark:text-white/60 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-muted-foreground">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-black/10 dark:border-white/10">
                                        <span className="text-xs text-muted-foreground opacity-50 block mb-1">Best for: </span>
                                        <span className="text-sm text-black/80 dark:text-white/80 font-medium">{model.bestFor}</span>
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
                                Why Outsource to RootedAI?
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                We combine technical excellence with business understanding
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 max-w-5xl mx-auto">
                            {benefits.map((benefit, index) => (
                                <TiltCard key={index} className="bw-card p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
                                    <div className="flex items-start gap-6">
                                        <div className="flex-shrink-0 p-3 rounded-lg bg-black/5 dark:bg-white/5">
                                            <benefit.icon className="w-8 h-8 text-black dark:text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-black dark:text-white mb-2">{benefit.title}</h3>
                                            <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                                        </div>
                                    </div>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tech Stack Band */}
                <section className="py-12 bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">Technologies we master</p>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                            {techStack.map((tech, i) => (
                                <span key={i} className="text-lg md:text-xl font-bold text-black/70 dark:text-white/70">{tech}</span>
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

                {/* Cost Calculator Section */}
                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <OutsourcingCalculator />
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="bw-card p-12 md:p-16 text-center bg-gradient-to-b from-black/5 to-transparent dark:from-white/5">
                            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">
                                Ready to Scale Your Team?
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Get a free consultation and project estimate. Talk to our technical team today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={handleContactUs}
                                    size="lg"
                                    className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-semibold"
                                >
                                    Schedule a Call
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
                            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> No hidden costs</span>
                                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Cancel anytime</span>
                                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> NDA protected</span>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
};

export default OutsourcingServicePage;
