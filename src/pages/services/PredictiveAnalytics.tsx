import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, TrendingUp, ShoppingCart, Users2, Factory, DollarSign, AlertTriangle } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import InventorySimulator from "@/components/InventorySimulator";

const PredictiveAnalytics = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleConsultExperts = () => {
        const message = encodeURIComponent(`Hi, I'd like to consult about Predictive Analytics for my business`);
        window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
    };

    const services = [
        {
            title: "Demand Forecasting",
            description: "Predict future demand with high accuracy using historical data and ML models. Optimize inventory levels, reduce stockouts, and minimize wastage across your supply chain.",
            icon: TrendingUp,
        },
        {
            title: "Customer Churn Prediction",
            description: "Identify customers at risk of churning before they leave. Implement proactive retention strategies based on behavioral patterns and engagement metrics.",
            icon: Users2,
        },
        {
            title: "Sales Forecasting",
            description: "Forecast revenue, identify growth opportunities, and optimize sales strategies. Make data-driven decisions about resource allocation and expansion plans.",
            icon: DollarSign,
        },
        {
            title: "Inventory Optimization",
            description: "Maintain optimal stock levels across SKUs and locations. Reduce carrying costs while ensuring product availability using predictive models.",
            icon: ShoppingCart,
        },
        {
            title: "Predictive Maintenance",
            description: "Predict equipment failures before they happen. Schedule maintenance proactively to minimize downtime and extend asset lifespan in manufacturing and operations.",
            icon: Factory,
        },
        {
            title: "Risk Assessment",
            description: "Identify and quantify business risks using predictive models. From credit risk to operational risks, make informed decisions with confidence.",
            icon: AlertTriangle,
        },
    ];

    const benefits = [
        {
            title: "Reduce wastage by 20-30%",
            description: "Optimize inventory and resource allocation by predicting demand accurately. Minimize overstock, reduce spoilage, and eliminate unnecessary procurement costs.",
        },
        {
            title: "Improve forecast accuracy",
            description: "AI models analyze complex patterns in historical data to deliver forecasts significantly more accurate than traditional methods. Typical improvements of 15-25%.",
        },
        {
            title: "Proactive decision-making",
            description: "Shift from reactive to proactive management. Anticipate challenges, identify opportunities early, and make strategic decisions with confidence.",
        },
        {
            title: "Competitive advantage",
            description: "Respond faster to market changes, optimize pricing dynamically, and outmaneuver competitors with superior market intelligence and forecasting.",
        },
    ];

    const industries = [
        {
            name: "E-commerce & Retail",
            applications: ["Demand forecasting", "Dynamic pricing", "Customer lifetime value prediction", "Recommendation systems"],
            impact: "30% reduction in stockouts",
        },
        {
            name: "Finance & Banking",
            applications: ["Credit risk assessment", "Fraud detection", "Investment forecasting", "Customer churn prediction"],
            impact: "50% improvement in risk detection",
        },
        {
            name: "Healthcare",
            applications: ["Patient readmission prediction", "Disease outbreak forecasting", "Resource optimization", "Treatment outcome prediction"],
            impact: "25% better resource utilization",
        },
        {
            name: "Manufacturing",
            applications: ["Predictive maintenance", "Quality prediction", "Production optimization", "Supply chain forecasting"],
            impact: "40% reduction in downtime",
        },
    ];

    const process = [
        { title: "Data Collection & Preparation", description: "Gather historical data from relevant sources, clean it, and engineer features that drive predictions." },
        { title: "Model Development", description: "Build and train ML models using techniques like regression, time series analysis, and deep learning based on your use case." },
        { title: "Validation & Testing", description: "Rigorously test models on holdout data, validate accuracy, and ensure reliability before deployment." },
        { title: "Deployment & Integration", description: "Deploy models to production, integrate with existing systems, and set up automated prediction pipelines." },
        { title: "Monitoring & Refinement", description: "Continuously monitor prediction accuracy, retrain models with new data, and refine to maintain performance." },
    ];

    const faqs = [
        {
            question: "What is predictive analytics?",
            answer: "Predictive analytics uses historical data, statistical algorithms, and machine learning techniques to identify the likelihood of future outcomes. It helps businesses look forward and anticipate trends and behaviors.",
        },
        {
            question: "How accurate are the predictions?",
            answer: "Accuracy depends on the quality and quantity of data available. Typically, our models achieve 80-95% accuracy. We continuously monitor and retrain models to improve performance over time.",
        },
        {
            question: "What data do I need?",
            answer: "We work with whatever data you have—sales records, customer logs, website analytics, or operational data. If you have data gaps, we can help implement data collection strategies to build a robust dataset.",
        },
        {
            question: "Can this help with inventory management?",
            answer: "Absolutely. Demand forecasting is one of the most impactful applications. By predicting sales trends, we help you optimize stock levels, reduce carrying costs, and prevent stockouts.",
        },
        {
            question: "How long does it take to see results?",
            answer: "Initial insights can often be generated within 4-6 weeks. A fully deployed production model integrated into your systems typically takes 2-3 months to build, validate, and launch.",
        }
    ];

    return (
        <div className="min-h-screen relative">
            <Seo
                title="Predictive Analytics & Forecasting Services"
                description="Data-driven predictive analytics for demand forecasting, churn prediction, and risk assessment. Optimize decisions with AI."
                keywords={[
                    "predictive analytics",
                    "demand forecasting",
                    "churn prediction",
                    "business intelligence",
                    "data insights",
                    "machine learning consulting",
                    "sales forecasting AI",
                    "risk assessment models",
                    "inventory optimization",
                    "data-driven decision making",
                    "trend analysis"
                ]}
                canonical="https://rootedai.com/services/predictive-analytics"
                structuredData={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "Service",
                            "name": "Predictive Analytics Services",
                            "provider": {
                                "@type": "Organization",
                                "name": "RootedAI",
                                "url": "https://rootedai.com"
                            },
                            "description": "Data-driven predictive analytics for demand forecasting, churn prediction, and risk assessment.",
                            "areaServed": "Global",
                            "catalogue": {
                                "@type": "OfferCatalog",
                                "name": "Analytics Services",
                                "itemListElement": [
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Demand Forecasting" } },
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Churn Prediction" } },
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Risk Assessment Models" } }
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
                                <Zap className="w-4 h-4 text-black dark:text-white" />
                                <span className="text-sm text-black/80 dark:text-white/80">Predictive Analytics</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight">
                                Predictive Analytics Solutions
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                                Data-driven insights that forecast trends and optimize decision-making. Predict inventory demand, optimize stock levels, and reduce wastage by 20-30%.
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
                                Turn data into actionable predictions
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

                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10 bg-zinc-950 dark:bg-black">
                    <div className="container mx-auto px-4 md:px-6">
                        <InventorySimulator />
                    </div>
                </section>

                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
                                Industry Applications
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Predictive analytics for every sector
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {industries.map((industry, index) => (
                                <TiltCard key={index} className="bw-card p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
                                    <h3 className="text-xl font-bold text-black dark:text-white mb-4">{industry.name}</h3>
                                    <ul className="space-y-2 mb-4">
                                        {industry.applications.map((app, i) => (
                                            <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                                                <span className="text-black/40 dark:text-white/40 mt-1">•</span>
                                                <span>{app}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-4 border-t border-black/10 dark:border-white/10">
                                        <span className="text-xs font-semibold text-black/80 dark:text-white/80">{industry.impact}</span>
                                    </div>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
                                Key Benefits
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {benefits.map((benefit, index) => (
                                <TiltCard key={index} className="bw-card p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
                                    <h3 className="text-xl font-bold text-black dark:text-white mb-3">{benefit.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
                                Our Approach
                            </h2>
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
                                Make better decisions with predictive insights
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Reduce wastage by 20-30% and optimize operations with AI-powered forecasting
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={handleConsultExperts}
                                    size="lg"
                                    className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-semibold"
                                >
                                    Start predicting the future
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

export default PredictiveAnalytics;
