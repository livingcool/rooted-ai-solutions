import { Code2, Users, Clock, Shield, CheckCircle, ArrowRight, Zap, Globe, TrendingUp } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { Button } from "@/components/ui/button";

const Outsourcing = () => {
    const handleContactUs = () => {
        const message = encodeURIComponent(`Hi, I'm interested in outsourcing software development to RootedAI`);
        window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
    };

    const engagementModels = [
        {
            title: "Project-Based",
            description: "Fixed scope, timeline, and budget. Perfect for well-defined projects.",
            icon: Code2,
            features: ["Clear deliverables", "Fixed pricing", "Dedicated PM", "Quality assurance"],
            bestFor: "MVPs, specific features, short-term projects",
        },
        {
            title: "Dedicated Team",
            description: "Your remote tech team that works exclusively on your projects.",
            icon: Users,
            features: ["Full-time dedication", "Flexible scaling", "Direct communication", "Your processes"],
            bestFor: "Long-term development, product companies",
        },
        {
            title: "Staff Augmentation",
            description: "Extend your existing team with our skilled developers on-demand.",
            icon: Zap,
            features: ["Quick onboarding", "Skill-specific", "Integrate seamlessly", "Pay as you go"],
            bestFor: "Filling skill gaps, scaling teams quickly",
        },
    ];

    const benefits = [
        {
            icon: TrendingUp,
            title: "60% Cost Reduction",
            description: "Save significantly on hiring, infrastructure, and overhead costs while maintaining quality.",
        },
        {
            icon: Clock,
            title: "3x Faster Delivery",
            description: "Accelerate development with experienced teams and proven processes.",
        },
        {
            icon: Globe,
            title: "Access to Global Talent",
            description: "Leverage our pool of skilled developers with expertise in latest technologies.",
        },
        {
            icon: Shield,
            title: "Zero Risk Guarantee",
            description: "IP protection, NDAs, and quality guarantees. Cancel anytime with 30-day notice.",
        },
    ];

    const whyChooseUs = [
        "Pre-vetted developers with 5+ years experience",
        "Agile methodology with 2-week sprints",
        "Daily standups and weekly demos",
        "Your timezone, your tools, your way",
        "ISO 27001 certified processes",
        "100% code ownership transfer",
    ];

    const stats = [
        { number: "50+", label: "Projects Delivered" },
        { number: "95%", label: "Client Retention" },
        { number: "24/7", label: "Support Available" },
        { number: "2 Weeks", label: "Avg. Onboarding" },
    ];

    return (
        <section id="outsourcing" className="py-24 relative overflow-hidden border-t border-black/10 dark:border-white/10">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] to-transparent dark:from-white/[0.02] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-4">
                        <Code2 className="w-4 h-4 text-black dark:text-white" />
                        <span className="text-sm text-black/80 dark:text-white/80">Software Outsourcing Services</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white tracking-tight">
                        Your Extended
                        <span className="block mt-2 bg-gradient-to-r from-black via-black/90 to-black/70 dark:from-white dark:via-white/90 dark:to-white/70 bg-clip-text text-transparent">
                            Development Team
                        </span>
                    </h2>

                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                        Stop hiring headaches. Scale instantly with our elite developers.
                        <span className="block mt-2 text-black/80 dark:text-white/80 font-medium">
                            Build faster. Ship better. Save 60% on development costs.
                        </span>
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <TiltCard key={index} className="bw-card p-6 text-center hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
                            <div className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-2">{stat.number}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </TiltCard>
                    ))}
                </div>

                {/* Engagement Models */}
                <div className="mb-20">
                    <h3 className="text-3xl font-bold text-black dark:text-white text-center mb-12">
                        Choose Your Engagement Model
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {engagementModels.map((model, index) => (
                            <TiltCard
                                key={index}
                                className="bw-card p-8 group hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500 flex flex-col"
                            >
                                <div className="mb-6 inline-block p-4 rounded-lg bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors w-fit">
                                    <model.icon className="w-8 h-8 text-black dark:text-white" />
                                </div>

                                <h4 className="text-2xl font-bold text-black dark:text-white mb-3 group-hover:translate-x-1 transition-transform">
                                    {model.title}
                                </h4>

                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {model.description}
                                </p>

                                <div className="mb-6 space-y-3">
                                    {model.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                            <span className="text-sm text-muted-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto pt-4 border-t border-black/10 dark:border-white/10">
                                    <span className="text-xs text-muted-foreground opacity-50">Best for: </span>
                                    <span className="text-xs text-black/80 dark:text-white/80 font-medium">{model.bestFor}</span>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>

                {/* Benefits Grid */}
                <div className="mb-20">
                    <h3 className="text-3xl font-bold text-black dark:text-white text-center mb-12">
                        Why Companies Choose Us
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {benefits.map((benefit, index) => (
                            <TiltCard key={index} className="bw-card p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
                                <div className="flex items-start gap-6">
                                    <div className="flex-shrink-0 p-3 rounded-lg bg-black/5 dark:bg-white/5">
                                        <benefit.icon className="w-8 h-8 text-black dark:text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-bold text-black dark:text-white mb-3">{benefit.title}</h4>
                                        <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                                    </div>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>

                {/* Why Choose Us - Checklist */}
                <div className="bw-card p-8 md:p-12 mb-12 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h3 className="text-3xl font-bold text-black dark:text-white">
                                The RootedAI Difference
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Not just another outsourcing company. We become part of your team,
                                understanding your vision and delivering excellence every sprint.
                            </p>
                            <Button
                                onClick={handleContactUs}
                                size="lg"
                                className="bw-button font-semibold group"
                            >
                                Get Started Today
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {whyChooseUs.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 group">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center group-hover:bg-black/20 dark:group-hover:bg-white/20 transition-colors">
                                        <CheckCircle className="w-4 h-4 text-black dark:text-white" />
                                    </div>
                                    <span className="text-muted-foreground group-hover:text-black dark:group-hover:text-white transition-colors">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <div className="inline-block bw-card p-8 md:p-12 bg-gradient-to-b from-black/5 to-transparent dark:from-white/5">
                        <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
                            Ready to Scale Your Development?
                        </h3>
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Get a free consultation and project estimate. Talk to our technical team today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={handleContactUs}
                                size="lg"
                                className="bw-button font-semibold"
                            >
                                Schedule a Call
                            </Button>
                            <a href="/#contact">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 w-full sm:w-auto"
                                >
                                    Send Requirements
                                </Button>
                            </a>
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                <span>No hidden costs</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                <span>Cancel anytime</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                <span>NDA protected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Outsourcing;
