import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { ArrowRight, Globe, Factory, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TiltCard from "@/components/ui/TiltCard";

const CaseStudies = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20">
            <Seo
                title="AI Case Studies | RootedAI - Global Success Stories"
                description="Explore how RootedAI empowers manufacturing in Asia and logistics in the Middle East with cutting-edge AI automation."
                canonical="https://www.rootedai.co.in/case-studies"
                keywords={["AI case studies", "manufacturing AI Asia", "logistics automation Middle East", "supply chain AI Singapore", "predictive maintenance Dubai"]}
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "AI Case Studies - RootedAI",
                    "description": "Real-world AI automation case studies from manufacturing and logistics sectors.",
                    "url": "https://www.rootedai.co.in/case-studies",
                    "publisher": {
                        "@type": "Organization",
                        "name": "RootedAI Solutions",
                        "url": "https://www.rootedai.co.in"
                    }
                }}
            />
            <Navigation />

            <main className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto space-y-20">

                {/* Header Section */}
                <section className="text-center space-y-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
                        <Globe className="w-4 h-4" />
                        <span>Global Impact</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Transforming Industries <span className="text-primary">Across Continents</span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        From manufacturing hubs in Asia to logistics centers in the Middle East, our AI agents are driving efficiency and innovation.
                    </p>
                </section>

                {/* Case Study 1: Manufacturing Asia */}
                <section id="manufacturing-asia" className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 relative z-10">
                        <div className="inline-flex items-center gap-2 text-primary font-semibold">
                            <Factory className="w-5 h-5" />
                            <span>Manufacturing Intelligence • Asia</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold">AI for Manufacturing in Asia</h2>
                        <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                            <p>
                                In the bustling industrial hubs of Singapore and Vietnam, precision and uptime are paramount. RootedAI deployed a custom suite of
                                <strong> Predictive Maintenance Agents</strong> for a leading electronics manufacturer.
                            </p>
                            <p>
                                By analyzing sensor data in real-time, our system predicted machine failures 48 hours in advance, reducing downtime by
                                <span className="text-foreground font-semibold"> 35%</span> and optimizing the supply chain for just-in-time delivery.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-card border border-border">
                                <div className="text-2xl font-bold text-primary">35%</div>
                                <div className="text-sm text-muted-foreground">Downtime Reduction</div>
                            </div>
                            <div className="p-4 rounded-lg bg-card border border-border">
                                <div className="text-2xl font-bold text-primary">24/7</div>
                                <div className="text-sm text-muted-foreground">Autonomous Monitoring</div>
                            </div>
                        </div>
                    </div>

                    <TiltCard className="h-full min-h-[400px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 rounded-2xl p-8">
                        <div className="relative w-full h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <Factory className="w-12 h-12 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold">Singapore Smart Hub</h3>
                            <p className="text-muted-foreground">Advanced IoT Integration & Anomalous Behavior Detection</p>
                        </div>
                    </TiltCard>
                </section>

                {/* Case Study 2: Logistics Middle East */}
                <section id="logistics-middle-east" className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                    <div className="md:order-2 space-y-6 relative z-10">
                        <div className="inline-flex items-center gap-2 text-primary font-semibold">
                            <Truck className="w-5 h-5" />
                            <span>Logistics Automation • Middle East</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold">Logistics Automation in Dubai</h2>
                        <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                            <p>
                                Dubai stands as a global gateway for trade. We partnered with a major logistics firm to implement
                                <strong> Autonomous Supply Chain Agents</strong> that optimize routing and inventory visibility.
                            </p>
                            <p>
                                Our solution integrated with legacy ERP systems to provide real-time tracking from port to warehouse.
                                The result was a <span className="text-foreground font-semibold">20% reduction in fuel costs</span> and faster turnover times for high-volume shipments.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-card border border-border">
                                <div className="text-2xl font-bold text-primary">20%</div>
                                <div className="text-sm text-muted-foreground">Fuel Cost Savings</div>
                            </div>
                            <div className="p-4 rounded-lg bg-card border border-border">
                                <div className="text-2xl font-bold text-primary">100%</div>
                                <div className="text-sm text-muted-foreground">Route Optimization</div>
                            </div>
                        </div>
                    </div>

                    <TiltCard className="md:order-1 h-full min-h-[400px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 rounded-2xl p-8">
                        <div className="relative w-full h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <Truck className="w-12 h-12 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold">Dubai Logistics Corridor</h3>
                            <p className="text-muted-foreground">AI-Driven Route Planning & Fleet Management</p>
                        </div>
                    </TiltCard>
                </section>

                {/* Call to Action */}
                <section className="py-20 text-center space-y-8 bg-card rounded-3xl border border-border/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl pointer-events-none" />
                    <h2 className="text-3xl font-bold relative z-10">Ready to Scale Your Operations?</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto relative z-10">
                        Whether you are in Hosur, Singapore, or Dubai, our Engineering Intelligence solutions are built to scale with you.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                        <Button size="lg" className="h-12 px-8 text-base">
                            Contact Our Global Team <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                            Download Whitepaper
                        </Button>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default CaseStudies;
