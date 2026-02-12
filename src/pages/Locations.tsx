import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { MapPin, ArrowRight, Building2, Globe } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const Locations = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const locations = [
        {
            city: "Hosur",
            title: "Industrial Tech Hub",
            description: "Serving SIPCOT Phase I & II with Industrial Automation and ERP solutions.",
            link: "/hosur",
            status: "Active",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600"
        },
        {
            city: "Coimbatore",
            title: "Textile & Engineering",
            description: "ERP and AI solutions for the Manchester of South India.",
            link: "/coimbatore",
            status: "Active",
            image: "https://images.unsplash.com/photo-1565514020176-892ebda64903?auto=format&fit=crop&q=80&w=600"
        },
        {
            city: "Bangalore",
            title: "Tech Capital",
            description: "Advanced AI Agents and Enterprise SaaS development center.",
            link: "/locations/bangalore",
            status: "Coming Soon",
            image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=600"
        },
        {
            city: "Chennai",
            title: "SaaS & Logistics",
            description: "Enterprise Security and Logistics Automation hub.",
            link: "/locations/chennai",
            status: "Coming Soon",
            image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600"
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            <Seo
                title="RootedAI Locations | Serving Hosur, Coimbatore, Bangalore & Chennai"
                description="Find RootedAI offices and service areas. delivering AI and software solutions across South India's key industrial and tech hubs."
                canonical="https://www.rootedai.co.in/locations"
                keywords={["RootedAI Locations", "Software Company Hosur", "Software Company Coimbatore", "IT Company Bangalore", "Chennai SaaS"]}
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "name": "RootedAI Locations",
                    "description": "AI and software solutions across South India.",
                    "url": "https://www.rootedai.co.in/locations",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "RootedAI Hosur - Industrial Tech Hub",
                            "url": "https://www.rootedai.co.in/hosur"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "RootedAI Coimbatore - Textile & Engineering",
                            "url": "https://www.rootedai.co.in/coimbatore"
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "name": "RootedAI Bangalore - Tech Capital",
                            "url": "https://www.rootedai.co.in/locations/bangalore"
                        },
                        {
                            "@type": "ListItem",
                            "position": 4,
                            "name": "RootedAI Chennai - SaaS & Logistics",
                            "url": "https://www.rootedai.co.in/locations/chennai"
                        }
                    ]
                }}
            />

            <div className="relative z-10">
                <Navigation />

                <section className="pt-32 pb-20 relative overflow-hidden">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-8 flex justify-center">
                            <Breadcrumbs />
                        </div>
                        <div className="max-w-4xl mx-auto text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
                                Our <span className="text-primary">Global Presence</span>
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Delivering Engineering Intelligence to key industrial and technology hubs.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {locations.map((loc, index) => (
                                <TiltCard key={index} className="h-full">
                                    <div className="relative h-64 overflow-hidden group">
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                                        <img
                                            src={loc.image}
                                            alt={`${loc.city} - ${loc.title}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${loc.status === "Active"
                                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                                }`}>
                                                {loc.status}
                                            </span>
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-black/90 to-transparent">
                                            <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                                                <MapPin className="w-5 h-5 text-primary" />
                                                {loc.city}
                                            </h3>
                                            <p className="text-white/80 text-sm font-medium">{loc.title}</p>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-black/5 dark:bg-white/5 border-t border-white/10 h-[calc(100%-16rem)] flex flex-col justify-between">
                                        <p className="text-muted-foreground mb-6 leading-relaxed">
                                            {loc.description}
                                        </p>
                                        {loc.status === "Active" ? (
                                            <Link to={loc.link}>
                                                <Button className="w-full group">
                                                    Visit Location Page
                                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Button variant="outline" disabled className="w-full opacity-50 cursor-not-allowed">
                                                Coming Soon
                                            </Button>
                                        )}
                                    </div>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
};

export default Locations;
