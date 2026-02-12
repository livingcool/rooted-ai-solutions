import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Globe, ArrowRight, Code, Smartphone, Database, Cloud, LineChart, Lock } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import WebProjectEstimator from "@/components/WebProjectEstimator";

const WebSolutions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleConsultExperts = () => {
        const message = encodeURIComponent(`Hi, I'd like to consult about Web Solutions for my business`);
        window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
    };

    const services = [
        {
            title: "Custom Web Development",
            description: "Build scalable, high-performance web applications tailored to your business needs. From MVPs to enterprise platforms, we deliver solutions that drive growth.",
            icon: Code,
        },
        {
            title: "AI-Integrated Dashboards",
            description: "Real-time analytics dashboards with predictive insights powered by AI. Visualize complex data, track KPIs, and make data-driven decisions with intuitive interfaces.",
            icon: LineChart,
        },
        {
            title: "Progressive Web Apps",
            description: "Build app-like experiences that work across all devices. PWAs combine the reach of the web with the functionality of native apps, delivering superior user experiences.",
            icon: Smartphone,
        },
        {
            title: "API Development & Integration",
            description: "Design and build robust RESTful APIs. Integrate third-party services, create microservices architectures, and enable seamless data flow across your tech stack.",
            icon: Database,
        },
        {
            title: "Cloud-Native Solutions",
            description: "Deploy scalable applications on AWS, Google Cloud, or Azure. We architect cloud-native solutions that auto-scale, ensuring high availability and cost efficiency.",
            icon: Cloud,
        },
        {
            title: "Security & Compliance",
            description: "Enterprise-grade security built into every solution. HTTPS, authentication, data encryption, and compliance with GDPR, SOC 2, and industry-specific regulations.",
            icon: Lock,
        },
    ];

    const techStack = [
        { category: "Frontend", technologies: "React, Next.js, TypeScript, Tailwind CSS" },
        { category: "Backend", technologies: "Node.js, Python, FastAPI, PostgreSQL" },
        { category: "AI/ML", technologies: "OpenAI, TensorFlow, PyTorch, LangChain" },
        { category: "Cloud", technologies: "AWS, Google Cloud, Vercel, Supabase" },
        { category: "DevOps", technologies: "Docker, Kubernetes, CI/CD, GitHub Actions" },
        { category: "Monitoring", technologies: "Sentry, LogRocket, Google Analytics" },
    ];

    const process = [
        { title: "Discovery & Planning", description: "Understand requirements, define scope, create wireframes, and plan technical architecture." },
        { title: "Design & Prototyping", description: "Create high-fidelity designs, build interactive prototypes, and validate with stakeholders." },
        { title: "Agile Development", description: "Build in 2-week sprints, deliver incremental features, and incorporate feedback continuously." },
        { title: "Testing & QA", description: "Comprehensive testing including unit, integration, and end-to-end tests for reliability." },
        { title: "Deployment & Launch", description: "Deploy to production with zero downtime, monitor performance, and provide launch support." },
        { title: "Maintenance & Scaling", description: "Ongoing updates, performance optimization, and scaling to meet growing demand." },
    ];

    const faqs = [
        {
            question: "What types of web solutions do you build?",
            answer: "We build a wide range of custom web solutions, including enterprise web portals, SaaS platforms, e-commerce sites, progressive web apps (PWAs), and AI-integrated dashboards. Our focus is on creating scalable, high-performance applications that drive business growth.",
        },
        {
            question: "How do you integrate AI into web applications?",
            answer: "We seamlessly integrate AI features such as predictive analytics, personalized recommendations, chatbots, and automated content generation directly into your web application. We use modern frameworks to ensure these features are responsive and add real value to the user experience.",
        },
        {
            question: "What technologies do you use?",
            answer: "We use a modern tech stack primarily focused on React, Next.js, and TypeScript for the frontend, and Node.js, Python, or Go for the backend. We leverage cloud platforms like AWS and Google Cloud for scalable infrastructure and use cutting-edge AI libraries.",
        },
        {
            question: "How long does it take to build a custom web app?",
            answer: "Timeline depends on complexity, but a typical MVP (Minimum Viable Product) takes 4-8 weeks. Larger enterprise applications may take 3-6 months. We follow an agile process, delivering regular updates and working features every 2 weeks.",
        },
        {
            question: "Do you offer post-launch support?",
            answer: "Yes, we provide comprehensive post-launch support and maintenance packages. This includes bug fixes, security updates, performance monitoring, and feature enhancements to ensure your application continues to evolve with your business.",
        }
    ];

    return (
        <div className="min-h-screen relative">
            <Seo
                title="AI-Integrated Web Solutions & Development"
                description="Custom web development with AI integration. Scalable web apps, dashboards, and PWAs built with modern tech stacks."
                keywords={[
                    "web development",
                    "AI web apps",
                    "custom dashboards",
                    "PWA",
                    "Next.js",
                    "modern web solutions",
                    "AI-integrated websites",
                    "scalable cloud architecture",
                    "React development services",
                    "enterprise web portals",
                    "full-stack development"
                ]}
                canonical="https://rootedai.com/services/web-solutions"
                structuredData={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "Service",
                            "name": "AI Integrated Web Solutions",
                            "provider": {
                                "@type": "Organization",
                                "name": "RootedAI",
                                "url": "https://rootedai.com"
                            },
                            "description": "Custom web development with AI integration. Scalable web apps, dashboards, and PWAs.",
                            "areaServed": "Global",
                            "hasOfferCatalog": {
                                "@type": "OfferCatalog",
                                "name": "Web Development Services",
                                "itemListElement": [
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Web Application Development" } },
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Dashboard Creation" } },
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "PWA Development" } }
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

                <section className="pt-32 pb-20 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-8 flex justify-center">
                            <Breadcrumbs />
                        </div>
                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-4">
                                <Globe className="w-4 h-4 text-black dark:text-white" />
                                <span className="text-sm text-black/80 dark:text-white/80">Web Solutions</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight">
                                AI-Integrated Web Solutions
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                                Dynamic, AI-integrated web environments that adapt to user behavior. Custom dashboards with real-time analytics and predictive insights.
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

                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight">
                                Our Services
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
                                Modern web solutions built with cutting-edge technology
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service, index) => (
                                <TiltCard key={index} className="bw-card p-8 group hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
                                    <div className="mb-6 inline-block p-4 rounded-lg bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                                        <service.icon className="w-8 h-8 text-black dark:text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-black dark:text-white mb-4">{service.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight">
                                Project Estimator
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
                                Configure your ideal solution to get an instant timeline estimate
                            </p>
                        </div>
                        <WebProjectEstimator />
                    </div>
                </section>

                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
                                Our Technology Stack
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                We use modern, battle-tested technologies
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {techStack.map((stack, index) => (
                                <TiltCard key={index} className="bw-card p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
                                    <h3 className="text-lg font-bold text-black dark:text-white mb-3">{stack.category}</h3>
                                    <p className="text-muted-foreground text-sm">{stack.technologies}</p>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
                                Our Development Process
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                From concept to deployment in 2-4 weeks
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

                <section className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="bw-card p-12 md:p-16 text-center bg-gradient-to-b from-black/5 to-transparent dark:from-white/5">
                            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">
                                Ready to build your web solution?
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Deploy in 2-4 weeks with our agile development approach
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={handleConsultExperts}
                                    size="lg"
                                    className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-semibold"
                                >
                                    Start your project
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

export default WebSolutions;
