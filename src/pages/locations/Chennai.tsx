import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import Contact from "@/components/Contact";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Shield, Truck, BarChart } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import TechStackMarquee from "@/components/TechStackMarquee";

const Chennai = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const faqs = [
        {
            question: "Do you provide enterprise security services in Chennai?",
            answer: "Yes, we offer comprehensive cybersecurity audits, compliance management, and secure software development for enterprises in Chennai's OMR and Guindy/DLF IT parks."
        },
        {
            question: "Can you help automated logistics for Chennai ports?",
            answer: "We specialize in logistics automation, offering ticket management systems and AI-driven tracking for supply chains connected to Chennai Port and Ennore Port."
        },
        {
            question: "Do you build custom internal tools for SaaS companies?",
            answer: "Yes, we build robust internal dashboards, admin panels, and workflow automation tools to help SaaS companies in Chennai scale their operations efficiently."
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            <Seo
                title="SaaS & Enterprise Security Company in Chennai | RootedAI"
                description="RootedAI delivers enterprise security, logistics automation, and custom SaaS solutions for Chennai's growing digital landscape."
                canonical="https://www.rootedai.co.in/locations/chennai"
                keywords={[
                    "App Development Chennai",
                    "Cybersecurity Company Chennai",
                    "Logistics Software Chennai",
                    "SaaS Development Chennai",
                    "OMR IT Companies",
                    "RootedAI Chennai",
                    "Enterprise Software Chennai"
                ]}
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "name": "RootedAI - Chennai (Coming Soon)",
                    "image": "https://www.rootedai.co.in/og-image.png",
                    "url": "https://www.rootedai.co.in/locations/chennai",
                    "telephone": "+91-917904168521",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Chennai",
                        "addressRegion": "Tamil Nadu",
                        "addressCountry": "IN"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": 13.0827,
                        "longitude": 80.2707
                    },
                    "priceRange": "$$",
                    "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday"
                        ],
                        "opens": "09:00",
                        "closes": "18:00"
                    }
                }}
            />

            <div className="relative z-10">
                <Navigation />

                {/* Hero */}
                <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-white/5">
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="mb-8 flex justify-center">
                            <Breadcrumbs />
                        </div>
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-medium animate-fade-down">
                                <MapPin className="w-4 h-4" />
                                <span>Coming Soon to the SaaS Capital</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight animate-fade-up">
                                Secure Scaling for <br />
                                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-rose-500 bg-clip-text text-transparent">
                                    Chennai
                                </span>
                            </h1>

                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
                                Powerful Enterprise Security and Logistics Automation for South India's gateway.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                                <MagneticButton>
                                    <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-orange-500/25 bw-button" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                                        Partner With Us
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </MagneticButton>
                            </div>
                        </div>
                    </div>

                    {/* Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-20 dark:opacity-10">
                        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/30 rounded-full blur-[100px]" />
                        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-red-500/30 rounded-full blur-[100px]" />
                    </div>
                </section>

                <RevealOnScroll>
                    <TechStackMarquee />
                </RevealOnScroll>

                {/* Tech Focus Section */}
                <section className="py-20 bg-black/5 dark:bg-white/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-2xl border border-white/10 bg-background/50 hover:bg-background/80 transition-colors">
                                <Shield className="w-10 h-10 text-orange-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2">Enterprise Security</h3>
                                <p className="text-muted-foreground">SOC2 compliant architectures.</p>
                            </div>
                            <div className="p-8 rounded-2xl border border-white/10 bg-background/50 hover:bg-background/80 transition-colors">
                                <Truck className="w-10 h-10 text-red-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2">Logistics AI</h3>
                                <p className="text-muted-foreground">Route optimization and fleet tracking.</p>
                            </div>
                            <div className="p-8 rounded-2xl border border-white/10 bg-background/50 hover:bg-background/80 transition-colors">
                                <BarChart className="w-10 h-10 text-rose-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2">Data Analytics</h3>
                                <p className="text-muted-foreground">Predictive models for high-volume data.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map - OMR Placeholder */}
                <section className="py-20">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <div className="mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                                Future Home on OMR
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Positioning ourselves in the heart of Chennai's IT corridor.
                            </p>
                        </div>
                        <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248756.1167537626!2d80.0689!3d13.0475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1707761000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-20 bg-black/5 dark:bg-white/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
                                Chennai Enterprise FAQs
                            </h2>
                            <div className="space-y-8">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="bw-card p-6 md:p-8 rounded-2xl bg-background border border-black/10 dark:border-white/10">
                                        <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <Contact />
                <Footer />
            </div>
        </div>
    );
};

export default Chennai;
