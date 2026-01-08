import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Lock, Eye, FileCheck, AlertCircle, Activity, UserCheck } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { Link } from "react-router-dom";

const EnterpriseSecurity = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleConsultExperts = () => {
        const message = encodeURIComponent(`Hi, I'd like to consult about Enterprise Security for my business`);
        window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
    };

    const services = [
        {
            title: "AI-Powered Threat Detection",
            description: "Real-time anomaly detection using machine learning. Identify suspicious activities, unusual access patterns, and potential security threats before they cause damage.",
            icon: Eye,
        },
        {
            title: "Automated Security Protocols",
            description: "Implement automated incident response workflows. When threats are detected, trigger immediate protective measures including account lockdowns and alert escalations.",
            icon: AlertCircle,
        },
        {
            title: "Compliance Management",
            description: "Ensure compliance with GDPR, SOC 2, HIPAA, and industry regulations. Automated compliance monitoring, reporting, and audit trail generation.",
            icon: FileCheck,
        },
        {
            title: "Access Control & Authentication",
            description: "Multi-factor authentication, role-based access control, and zero-trust security architecture. Ensure only authorized users access sensitive resources.",
            icon: Lock,
        },
        {
            title: "Security Monitoring & SIEM",
            description: "24/7 security monitoring with intelligent event correlation. Real-time dashboards showing security posture, threats, and incidents across your infrastructure.",
            icon: Activity,
        },
        {
            title: "Identity & Access Management",
            description: "Centralized identity management across applications. Automated user provisioning, de-provisioning, and access reviews for complete control.",
            icon: UserCheck,
        },
    ];

    const features = [
        {
            title: "99.9% Uptime SLA",
            description: "Enterprise-grade infrastructure with redundancy and failover. We guarantee 99.9% uptime with comprehensive monitoring and incident response.",
        },
        {
            title: "Data Encryption",
            description: "End-to-end encryption for data in transit and at rest. AES-256 encryption standards ensuring your sensitive information is always protected.",
        },
        {
            title: "Regular Security Audits",
            description: "Quarterly penetration testing and security assessments. We proactively identify and remediate vulnerabilities before they can be exploited.",
        },
        {
            title: "Incident Response",
            description: "Dedicated security team for rapid incident response. 24/7 availability with <15 minute response time for critical security incidents.",
        },
    ];

    const threatTypes = [
        { type: "Unauthorized Access", protection: "Multi-factor authentication, IP whitelisting, behavioral analysis" },
        { type: "Data Breaches", protection: "Encryption, DLP policies, access controls, audit logging" },
        { type: "Malware & Ransomware", protection: "Real-time scanning, sandboxing, automated quarantine" },
        { type: "Phishing & Social Engineering", protection: "Email filtering, user training, link analysis" },
        { type: "DDoS Attacks", protection: "Rate limiting, WAF, CDN protection, traffic analysis" },
        { type: "Insider Threats", protection: "Behavioral monitoring, privilege management, audit trails" },
    ];

    const process = [
        { title: "Security Assessment", description: "Comprehensive audit of your current security posture, identifying vulnerabilities and compliance gaps." },
        { title: "Strategy Development", description: "Create tailored security roadmap aligned with your risk tolerance, industry requirements, and business objectives." },
        { title: "Implementation", description: "Deploy security controls, configure monitoring, and integrate with existing systems with minimal disruption." },
        { title: "Training & Awareness", description: "Train your team on security best practices, incident response procedures, and compliance requirements." },
        { title: "Continuous Monitoring", description: "24/7 monitoring, regular security assessments, and proactive threat hunting to maintain strong security posture." },
    ];

    return (
        <div className="min-h-screen relative">
            <div className="relative z-10">
                <Navigation />

                <section className="pt-32 pb-20 relative overflow-hidden border-b border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                                <Shield className="w-4 h-4 text-white" />
                                <span className="text-sm text-white/80">Enterprise Security</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                                Enterprise Security Solutions
                            </h1>
                            <p className="text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                                AI-powered threat detection and automated security protocols. Real-time anomaly detection and automated security alerts with 99.9% uptime SLA.
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
                                Our Security Services
                            </h2>
                            <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">
                                Comprehensive security solutions for modern enterprises
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
                                Threat Protection
                            </h2>
                            <p className="text-white/60 max-w-2xl mx-auto">
                                Comprehensive protection against modern threats
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {threatTypes.map((threat, index) => (
                                <TiltCard key={index} className="bw-card p-8 hover:bg-white/5 transition-all duration-500">
                                    <h3 className="text-lg font-bold text-white mb-3">{threat.type}</h3>
                                    <p className="text-white/60 text-sm">{threat.protection}</p>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 relative overflow-hidden border-b border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                                Enterprise-Grade Features
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {features.map((feature, index) => (
                                <TiltCard key={index} className="bw-card p-8 hover:bg-white/5 transition-all duration-500">
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-white/60 leading-relaxed">{feature.description}</p>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 relative overflow-hidden border-b border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                                Our Approach
                            </h2>
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
                                Secure your enterprise with AI-powered protection
                            </h2>
                            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
                                99.9% uptime SLA with 24/7 threat monitoring and automated response
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={handleConsultExperts}
                                    size="lg"
                                    className="bg-white text-black hover:bg-white/90 font-semibold"
                                >
                                    Secure your business
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

export default EnterpriseSecurity;
