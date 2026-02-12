import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import TechStackMarquee from "@/components/TechStackMarquee";
import Seo from "@/components/Seo";
import Contact from "@/components/Contact";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Factory, Settings, Globe } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const Coimbatore = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            <Seo
                title="Best Software Company in Coimbatore | Manufacturing & Textile ERP"
                description="RootedAI delivers advanced ERP and AI automation solutions for Coimbatore's textile, foundry, and engineering industries. Scale with Engineering Intelligence."
                keywords={[
                    "Software Company in Coimbatore",
                    "Textile ERP Coimbatore",
                    "Manufacturing Software Coimbatore",
                    "Industrial Automation Coimbatore",
                    "AI Solutions Coimbatore",
                    "RootedAI Coimbatore",
                    "Web Development Coimbatore"
                ]}
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "name": "RootedAI - Coimbatore",
                    "image": "https://rootedai.co.in/og-image.png",
                    "url": "https://rootedai.co.in/locations/coimbatore",
                    "telephone": "+91-917904168521",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Coimbatore",
                        "addressRegion": "Tamil Nadu",
                        "addressCountry": "IN"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": 11.0168,
                        "longitude": 76.9558
                    },
                    "priceRange": "$$"
                }}
            />

            <div className="relative z-10">
                <Navigation />

                {/* Custom Hero for Coimbatore */}
                <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-white/5">
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-sm font-medium animate-fade-down">
                                <MapPin className="w-4 h-4" />
                                <span>Manchester of South India</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight animate-fade-up">
                                Smart Tech for <br />
                                <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                                    Coimbatore's Industry
                                </span>
                            </h1>

                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
                                From High-Speed Textile Mills to Precision Foundries.
                                We provide the "Engineering Intelligence" to automate your complex workflows.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                                <MagneticButton>
                                    <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-blue-500/25 bw-button" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                                        Get AI Consultation
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </MagneticButton>
                            </div>
                        </div>
                    </div>

                    {/* Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-20 dark:opacity-10">
                        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[100px]" />
                        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[100px]" />
                    </div>
                </section>

                <RevealOnScroll>
                    <TechStackMarquee />
                </RevealOnScroll>

                {/* Localized Features Section */}
                <section className="py-24 bg-black/5 dark:bg-white/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-5xl font-bold font-heading">Engineered for Coimbatore</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Software that speaks the language of threads, gears, and pumps.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Factory className="w-10 h-10 text-blue-500" />,
                                    title: "Textile Mill Automation",
                                    desc: "IoT-integrated dashboards to monitor spindle speed, efficiency, and worker shifts in real-time."
                                },
                                {
                                    icon: <Settings className="w-10 h-10 text-indigo-500" />,
                                    title: "Foundry & Pump ERP",
                                    desc: "Manage raw material wastage, casting batches, and quality control with precision software."
                                },
                                {
                                    icon: <Globe className="w-10 h-10 text-cyan-500" />,
                                    title: "Global Export Tech",
                                    desc: "Documentation automation and logistics tracking for export-oriented engineering units."
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-8 rounded-3xl bg-background border border-white/5 hover:border-blue-500/50 transition-colors group">
                                    <div className="mb-6 bg-blue-500/10 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className="py-24 relative">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="h-[400px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group order-2 lg:order-1">
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-0 pointer-events-none transition-opacity z-10">
                                    <span className="bg-background/80 px-4 py-2 rounded-full text-sm font-medium">Interact with Map</span>
                                </div>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.44116035882!2d76.8848332060195!3d11.014299499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1737400000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: "grayscale(1) contrast(1.2) opacity(0.8)" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="RootedAI Coimbatore Coverage"
                                    className="group-hover:filter-none transition-all duration-500"
                                ></iframe>
                            </div>

                            <div className="space-y-8 order-1 lg:order-2">
                                <h2 className="text-4xl md:text-6xl font-bold font-heading">
                                    Expanding <br />
                                    <span className="text-muted-foreground">in Kongu Region</span>
                                </h2>
                                <div className="space-y-6 text-lg text-muted-foreground">
                                    <p>
                                        Coimbatore is the heartbeat of South Indian manufacturing. RootedAI is committed to digitally transforming the Kongu region (Coimbatore, Tiruppur, Erode).
                                    </p>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                                <Settings className="w-5 h-5 text-blue-500" />
                                            </div>
                                            <span>Specialized modules for Pumps & Motors</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                                                <Globe className="w-5 h-5 text-cyan-500" />
                                            </div>
                                            <span>Remote Implementation & Support Team</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Contact />

                <div className="border-t border-white/5">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Coimbatore;
