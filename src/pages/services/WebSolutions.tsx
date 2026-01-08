import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Globe, ArrowRight, Code, Smartphone, Database, Cloud, LineChart, Lock } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { Link } from "react-router-dom";

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

    return (
        <div className="min-h-screen relative">
            <div className="relative z-10">
                <Navigation />

                <section className="pt-32 pb-20 relative overflow-hidden border-b border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                                <Globe className="w-4 h-4 text-white" />
                                <span className="text-sm text-white/80">Web Solutions</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                                AI-Integrated Web Solutions
                            </h1>
                            <p className="text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                                Dynamic, AI-integrated web environments that adapt to user behavior. Custom dashboards with real-time analytics and predictive insights.
                            </p>
                            <Button
                                onClick={handleConsultExperts}
                                size="lg"
                                className="mt-8 bg-white text-black hover:bg-white/90 font-semibold group"
                            >
                                Consult our experts
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="py-24 relative overflow-hidden border-b border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                                Our Services
                            </h2>
                            <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">
                                Modern web solutions built with cutting-edge technology
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service, index) => (
                                <TiltCard key={index} className="bw-card p-8 group hover:bg-white/5 transition-all duration-500">
                                    <div className="mb-6 inline-block p-4 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                                        <service.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                                    <p className="text-white/60 leading-relaxed text-sm">{service.description}</p>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 relative overflow-hidden border-b border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                                Our Technology Stack
                            </h2>
                            <p className="text-white/60 max-w-2xl mx-auto">
                                We use modern, battle-tested technologies
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {techStack.map((stack, index) => (
                                <TiltCard key={index} className="bw-card p-8 hover:bg-white/5 transition-all duration-500">
                                    <h3 className="text-lg font-bold text-white mb-3">{stack.category}</h3>
                                    <p className="text-white/60 text-sm">{stack.technologies}</p>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 relative overflow-hidden border-b border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                                Our Development Process
                            </h2>
                            <p className="text-white/60 max-w-2xl mx-auto">
                                From concept to deployment in 2-4 weeks
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto space-y-8">
                            {process.map((step, index) => (
                                <div key={index} className="flex gap-6 items-start group">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white font-bold group-hover:bg-white group-hover:text-black transition-all">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 space-y-2 pt-2">
                                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                                        <p className="text-white/60 leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 relative overflow-hidden">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="bw-card p-12 md:p-16 text-center bg-gradient-to-b from-white/5 to-transparent">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Ready to build your web solution?
                            </h2>
                            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
                                Deploy in 2-4 weeks with our agile development approach
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={handleConsultExperts}
                                    size="lg"
                                    className="bg-white text-black hover:bg-white/90 font-semibold"
                                >
                                    Start your project
                                </Button>
                                <Link to="/#contact">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white/20 text-white hover:bg-white/10"
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
