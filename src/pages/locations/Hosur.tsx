import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import TechStackMarquee from "@/components/TechStackMarquee";
import Seo from "@/components/Seo";
import Contact from "@/components/Contact";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Factory, Cpu, History } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const Hosur = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            <Seo
                title="Top Software Company in Hosur | Industrial Automation & AI"
                description="RootedAI is the leading software and industrial automation provider in Hosur SIPCOT, delivering AI agents, ERP systems, and manufacturing intelligence."
                canonical="https://www.rootedai.co.in/hosur"
                keywords={[
                    "Software Company in Hosur",
                    "Industrial Automation Hosur",
                    "SIPCOT Hosur IT Companies",
                    "Manufacturing ERP Hosur",
                    "AI Solutions Hosur",
                    "RootedAI Hosur",
                    "Web Design Hosur"
                ]}
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "name": "RootedAI - Hosur",
                    "image": "https://www.rootedai.co.in/og-image.png",
                    "url": "https://www.rootedai.co.in/hosur",
                    "telephone": "+91-917904168521",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "SIPCOT Industrial Complex",
                        "addressLocality": "Hosur",
                        "addressRegion": "Tamil Nadu",
                        "postalCode": "635126",
                        "addressCountry": "IN"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": 12.7409,
                        "longitude": 77.8253
                    },
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
                    },
                    "priceRange": "$$"
                }}
            />

            <div className="relative z-10">
                <Navigation />

                {/* Custom Hero for Hosur */}
                <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-white/5">
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-fade-down">
                                <MapPin className="w-4 h-4" />
                                <span>Serving SIPCOT I & II, Hosur</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight animate-fade-up">
                                Transforming Hosur's <br />
                                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    Industrial Hub
                                </span>
                            </h1>

                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
                                We bring Silicon Valley-grade Engineering Intelligence to Hosur's manufacturing sector.
                                Move beyond basic ERPs to autonomous AI agents and predictive maintenance.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                                <MagneticButton>
                                    <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                                        Schedule Site Visit
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </MagneticButton>
                                <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full bg-background/50 backdrop-blur-sm" asChild>
                                    <a href="tel:+91917904168521">Call Our Hosur Team</a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-20 dark:opacity-10">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[100px]" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px]" />
                    </div>
                </section>

                <RevealOnScroll>
                    <TechStackMarquee />
                </RevealOnScroll>

                {/* Localized Features Section */}
                <section className="py-24 bg-black/5 dark:bg-white/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-5xl font-bold font-heading">Solutions for Hosur's Industries</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Tailored software solutions for Automobile, Engineering, and Manufacturing units in Hosur.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Factory className="w-10 h-10 text-primary" />,
                                    title: "Smart Factory ERP",
                                    desc: "Custom ERP systems that integrate with your machinery. Track production, inventory, and wastage in real-time."
                                },
                                {
                                    icon: <Cpu className="w-10 h-10 text-purple-500" />,
                                    title: "Industrial AI Agents",
                                    desc: "Automate purchase orders, vendor communications, and logistics planning with autonomous AI agents."
                                },
                                {
                                    icon: <History className="w-10 h-10 text-pink-500" />,
                                    title: "Legacy Modernization",
                                    desc: "Upgrade your old VB/tally systems to modern cloud-based secure software without losing historical data."
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-8 rounded-3xl bg-background border border-white/5 hover:border-primary/50 transition-colors group">
                                    <div className="mb-6 bg-primary/5 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
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
                            <div className="space-y-8">
                                <h2 className="text-4xl md:text-6xl font-bold font-heading">
                                    Visit Our <br />
                                    <span className="text-muted-foreground">Digital HQ</span>
                                </h2>
                                <div className="space-y-6 text-lg text-muted-foreground">
                                    <p>
                                        While we operate digitally, our roots are deeply embedded in Hosur's industrial landscape. We understand the specific challenges of SIPCOT industries.
                                    </p>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                                <MapPin className="w-5 h-5 text-green-500" />
                                            </div>
                                            <span>Serving all SIPCOT Phases (I, II) & Belagondapalli</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                                <History className="w-5 h-5 text-blue-500" />
                                            </div>
                                            <span>24/7 On-Call Support for Production Critical Systems</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="h-[400px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                                {/* Overlay for interaction hint */}
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-0 pointer-events-none transition-opacity z-10">
                                    <span className="bg-background/80 px-4 py-2 rounded-full text-sm font-medium">Interact with Map</span>
                                </div>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124440.08630663435!2d77.74768340798732!3d12.741097449574889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae71e549da7319%3A0xe549cd97b539cdd1!2sHosur%2C%20Tamil%20Nadu!5e1!3m2!1sen!2sin!4v1737400000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: "grayscale(1) contrast(1.2) opacity(0.8)" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="RootedAI Hosur Location"
                                    className="group-hover:filter-none transition-all duration-500"
                                ></iframe>
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

export default Hosur;
