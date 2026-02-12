import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight, FileText, Languages, TrendingUp, BarChart, BookOpen, Mail } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import NLPSavingsVisualizer from "@/components/NLPSavingsVisualizer";

const NLPSystems = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleConsultExperts = () => {
        const message = encodeURIComponent(`Hi, I'd like to consult about NLP Systems for my business`);
        window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
    };

    const services = [
        {
            title: "Sentiment Analysis",
            description: "Analyze customer feedback, reviews, and social media mentions to understand sentiment. Automatically categorize feedback as positive, negative, or neutral and identify trending issues.",
            icon: TrendingUp,
        },
        {
            title: "Document Processing",
            description: "Extract insights from contracts, legal documents, reports, and unstructured text. Automatically summarize long documents and identify key information with high accuracy.",
            icon: FileText,
        },
        {
            title: "Multilingual Support",
            description: "Break language barriers with automatic translation and multilingual text analysis. Support customers globally with AI-powered language understanding across 100+ languages.",
            icon: Languages,
        },
        {
            title: "Automated Reporting",
            description: "Generate comprehensive reports from data automatically. Extract key insights, create summaries, and produce weekly/monthly reports without manual effort.",
            icon: BarChart,
        },
        {
            title: "Knowledge Base Creation",
            description: "Build intelligent knowledge bases from your documents. Enable semantic search, auto-generate FAQs, and create chatbots that understand and answer complex queries.",
            icon: BookOpen,
        },
        {
            title: "Email & Communication Analysis",
            description: "Analyze email patterns, auto-categorize messages, draft responses, and extract action items. Process 1000s of communications in minutes to identify priorities and trends.",
            icon: Mail,
        },
    ];

    const useCases = [
        {
            title: "Customer Feedback Analysis",
            description: "Analyze thousands of customer reviews, support tickets, and survey responses to identify trends, common issues, and improvement opportunities.",
            metric: "Process 10,000+ reviews in minutes",
        },
        {
            title: "Contract Intelligence",
            description: "Extract key terms, obligations, and deadlines from legal contracts. Identify risks and ensure compliance across your contract portfolio.",
            metric: "95% extraction accuracy",
        },
        {
            title: "Content Moderation",
            description: "Automatically moderate user-generated content, detect toxic language, and flag inappropriate posts in real-time across your platform.",
            metric: "99% harmful content detected",
        },
        {
            title: "Market Research",
            description: "Analyze news articles, social media, and industry reports to track market trends, competitor activities, and emerging opportunities.",
            metric: "Daily insights from 1000s of sources",
        },
    ];

    const process = [
        { title: "Data Collection", description: "Gather relevant text data from your documents, feedback forms, emails, or APIs." },
        { title: "Preprocessing", description: "Clean and prepare text data, removing noise and normalizing formats for optimal processing." },
        { title: "Model Training", description: "Train or fine-tune NLP models on your specific domain and use case for maximum accuracy." },
        { title: "Deployment", description: "Deploy models to production with APIs, integrate with your systems, and enable real-time processing." },
        { title: "Monitoring", description: "Continuously monitor model performance, retrain with new data, and optimize for accuracy." },
    ];

    const faqs = [
        {
            question: "What is Natural Language Processing (NLP)?",
            answer: "NLP is a branch of Artificial Intelligence that enables computers to understand, interpret, and generate human language. It is used in applications like sentiment analysis, chatbots, and automated translation.",
        },
        {
            question: "How can NLP help my business?",
            answer: "NLP extracts value from unstructured data like emails and reviews. It automates customer support, analyzes feedback for better decision-making, and streamlines document processing.",
        },
        {
            question: "Is NLP only for English?",
            answer: "No, our NLP solutions support over 100 languages. We build multilingual systems that analyze text and communicate with customers globally.",
        },
        {
            question: "What is sentiment analysis?",
            answer: "Sentiment analysis determines the emotional tone behind words. It helps businesses understand how customers feel about their brand or products by analyzing reviews and social media.",
        },
        {
            question: "Can you build custom chatbots?",
            answer: "Yes, we develop advanced AI chatbots that go beyond simple scripts. Our bots understand context, handle complex queries, and integrate with your existing systems.",
        }
    ];

    return (
        <div className="min-h-screen relative">
            <Seo
                title="NLP Systems & Sentiment Analysis Services"
                description="Advanced Natural Language Processing solutions. Sentiment analysis, document processing, and automated reporting for your business."
                keywords={[
                    "NLP",
                    "sentiment analysis",
                    "document processing",
                    "text analysis",
                    "AI reporting",
                    "natural language processing",
                    "chatbot development",
                    "conversational AI",
                    "unstructured data analysis",
                    "text classification",
                    "LLM fine-tuning",
                    "automated insights"
                ]}
                canonical="https://www.rootedai.co.in/services/nlp-systems"
                structuredData={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "Service",
                            "name": "Natural Language Processing Systems",
                            "provider": {
                                "@type": "Organization",
                                "name": "RootedAI",
                                "url": "https://www.rootedai.co.in"
                            },
                            "description": "Advanced NLP solutions including sentiment analysis, document processing, and automated reporting.",
                            "areaServed": "Global",
                            "catalogue": {
                                "@type": "OfferCatalog",
                                "name": "NLP Services",
                                "itemListElement": [
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sentiment Analysis" } },
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Document Processing" } },
                                    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Chatbot Development" } }
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
                                <MessageSquare className="w-4 h-4 text-black dark:text-white" />
                                <span className="text-sm text-black/80 dark:text-white/80">NLP Systems</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight">
                                Natural Language Processing Systems
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                                Advanced NLP for sentiment analysis and automated reporting. Extract key insights from customer feedback and generate comprehensive reports automatically.
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
                                Our NLP Services
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
                                Process 1000s of documents in minutes with AI-powered text analysis
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

                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <NLPSavingsVisualizer />
                    </div>
                </section>

                <section className="py-24 relative overflow-hidden border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
                                Real-World Applications
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                How businesses leverage our NLP solutions
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {useCases.map((useCase, index) => (
                                <TiltCard key={index} className="bw-card p-8 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
                                    <h3 className="text-xl font-bold text-black dark:text-white mb-3">{useCase.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm mb-4">{useCase.description}</p>
                                    <div className="pt-4 border-t border-black/10 dark:border-white/10">
                                        <span className="text-xs font-semibold text-black/80 dark:text-white/80">{useCase.metric}</span>
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
                                Our Process
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
                                Unlock insights from your text data
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                                Process thousands of documents and extract actionable insights automatically
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    onClick={handleConsultExperts}
                                    size="lg"
                                    className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-semibold"
                                >
                                    Get started with NLP
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

export default NLPSystems;
