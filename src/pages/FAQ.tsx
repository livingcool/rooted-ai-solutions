import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, MessageCircle, Shield, Cpu, Lock, MessageSquare, Users, Zap, Globe, ArrowRight } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { cn } from "@/lib/utils";

const faqData = [
  {
    category: "AI Agents",
    icon: MessageCircle,
    questions: [
      {
        id: "what-are-ai-agents",
        question: "What are AI agents and how do they work?",
        answer: "AI agents are autonomous programs that perceive their environment, reason using LLMs, and take actions to achieve goals. Unlike chatbots, they can use tools, browse the web, and execute complex multi-step workflows with minimal human intervention to solve business problems."
      },
      {
        id: "ai-agents-vs-chatbots",
        question: "What is the difference between an AI Agent and a Chatbot?",
        answer: "Chatbots are reactive and focus on conversation. AI Agents are proactive and focus on task completion. Agents have 'agency'—the ability to use external tools, manage long-term memory, and break down complex objectives into executable steps without constant user prompting."
      },
      {
        id: "ai-agent-customization",
        question: "Can these agents be customized for my specific business data?",
        answer: "Yes. We specialize in building 'Rooted' AI agents that access your private databases, documents, and APIs securely. This ensures the agent's reasoning is grounded in your company's specific knowledge, preventing hallucinations and providing highly accurate, relevant results."
      }
    ]
  },
  {
    category: "Process Automation",
    icon: Zap,
    questions: [
      {
        id: "what-is-agentic-automation",
        question: "What is AI-driven process automation?",
        answer: "AI-driven automation uses autonomous agents to handle complex, non-linear workflows that traditional RPA cannot. This includes tasks requiring decision-making, natural language understanding, and adapting to dynamic interfaces, enabling automation of end-to-end business operations like customer support or lead generation."
      },
      {
        id: "automation-roi",
        question: "How much can I save with AI automation?",
        answer: "Most enterprises see a 40-70% reduction in operational costs. By replacing manual data entry and repetitive decision-making with AI agents, you achieve 24/7 productivity, zero human error, and much faster turnaround times for critical business processes."
      },
      {
        id: "integration-time",
        question: "How long does it take to implement an automated workflow?",
        answer: "Standard workflows are deployed within 2-4 weeks. Complex enterprise integrations involving custom LLM fine-tuning or legacy system connections typically take 6-8 weeks. We follow an agile approach, delivering functional modules every 14 days."
      }
    ]
  },
  {
    category: "AI Safety & Compliance",
    icon: Shield,
    questions: [
      {
        id: "ai-safety-importance",
        question: "Why is AI safety important for my business?",
        answer: "AI safety avoids regulatory fines, reputational damage, and deployment failures. With laws like India's DPDP Act, deploying AI without safety frameworks exposes you to legal and financial risks. Our protocols protect your business while building critical user trust."
      },
      {
        id: "dpdp-compliance",
        question: "What is the Digital Personal Data Protection Act (DPDP)?",
        answer: "India's DPDP Act regulates personal data collection and processing. For AI systems processing user data, compliance is mandatory. We implement data governance, consent mechanisms, and privacy safeguards to ensure your AI meets all DPDP regulatory requirements."
      },
      {
        id: "bias-testing",
        question: "How do you test for AI bias?",
        answer: "We conduct statistical analysis and scenario testing across demographic segments and edge cases to identify unfair impacts. We then implement mitigation strategies like data rebalancing and fairness constraints to ensure your models provide equitable outcomes."
      }
    ]
  },
  {
    category: "Enterprise Security",
    icon: Lock,
    questions: [
      {
        id: "ai-security-enhancement",
        question: "How does AI enhance enterprise security?",
        answer: "AI analyzes vast datasets in real-time to detect anomalies and patterns traditional systems miss. It identifies security threats faster, enabling automated responses like instant account lockdowns or alert escalations during unauthorized access attempts."
      },
      {
        id: "data-safety",
        question: "Is my corporate data safe with RootedAI?",
        answer: "Yes. We operate with a security-first mindset, implementing zero-trust architectures, end-to-end encryption, and rigorous access controls. Your data is isolated and never used to train public models without your explicit consent."
      }
    ]
  },
  {
    category: "NLP Systems",
    icon: MessageSquare,
    questions: [
      {
        id: "what-is-nlp",
        question: "What is Natural Language Processing (NLP)?",
        answer: "NLP is an AI branch enabling computers to understand, interpret, and generate human language. It powers sentiment analysis, automated document processing, and advanced chatbots that can handle complex queries in over 100 languages."
      },
      {
        id: "nlp-business-benefits",
        question: "How can NLP systems help my business?",
        answer: "NLP extracts value from unstructured data like emails and reviews. It automates customer support, provides deep insights from feedback for better decision-making, and significantly streamlines document-heavy workflows like contract analysis."
      }
    ]
  },
  {
    category: "Predictive Analytics",
    icon: Cpu,
    questions: [
      {
        id: "what-is-predictive-analytics",
        question: "What is predictive analytics and how is it used?",
        answer: "Predictive analytics uses historical data and ML models to forecast future outcomes. Businesses use it for demand forecasting, churn prediction, and risk assessment, allowing them to optimize stock levels and reduce wastage by up to 30%."
      },
      {
        id: "prediction-accuracy",
        question: "How accurate are your AI predictions?",
        answer: "Accuracy depends on data quality, but our models typically achieve 85-95% accuracy. We continuously monitor and retrain models with fresh data to improve performance and adapt to changing market trends over time."
      }
    ]
  },
  {
    category: "Software Outsourcing",
    icon: Users,
    questions: [
      {
        id: "scaling-speed",
        question: "How quickly can I scale my development team?",
        answer: "We onboard developers within 2-5 days for staff augmentation. For dedicated teams, we can assemble a full squad of senior-level experts within 2 weeks, ensuring your project hits its milestones without hiring delays."
      },
      {
        id: "ip-ownership",
        question: "Do I own the intellectual property (IP)?",
        answer: "Absolutely. Under our contracts, all code, designs, and assets created during the engagement are 100% your intellectual property. We provide full source code access and comprehensive documentation upon delivery."
      }
    ]
  },
  {
    category: "Web Solutions",
    icon: Globe,
    questions: [
      {
        id: "ai-web-integration",
        question: "How do you integrate AI into web applications?",
        answer: "We integrate AI features like predictive dashboards, recommendation engines, and automated content generation directly into modern web frameworks. We ensure these features are responsive and provide actionable insights without sacrificing page performance."
      },
      {
        id: "web-app-timeline",
        question: "How long does it take to build a custom web app?",
        answer: "A typical MVP takes 4-8 weeks. Larger enterprise applications with complex integrations may take 3-6 months. We use an agile process, delivering functional segments every 2 weeks to ensure continuous progress."
      }
    ]
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen relative">
      <Seo 
        title="Frequently Asked Questions | RootedAI Help Center"
        description="Find answers to common questions about AI Agents, Process Automation, Safety, Security, and more. Your complete guide to RootedAI services."
        canonical="https://www.rootedai.co.in/faq"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqData.flatMap(cat => cat.questions).map(q => ({
            "@type": "Question",
            "name": q.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": q.answer
            }
          }))
        }}
      />
      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-20 border-b border-black/10 dark:border-white/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8 flex justify-center">
              <Breadcrumbs />
            </div>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white tracking-tight">
                How can we help?
              </h1>
              <p className="text-xl text-muted-foreground font-light">
                Find answers to common questions about our AI solutions and services.
              </p>
              
              <div className="max-w-xl mx-auto relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
                <input 
                  type="text"
                  placeholder="Search questions..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-20">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((category) => (
                  <div key={category.category} className="space-y-8">
                    <div className="flex items-center gap-4 pb-4 border-b border-black/10 dark:border-white/10">
                      <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5">
                        <category.icon className="w-6 h-6 text-black dark:text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-black dark:text-white">{category.category}</h2>
                    </div>

                    <div className="grid gap-4">
                      {category.questions.map((faq) => (
                        <div 
                          key={faq.id}
                          id={faq.id}
                          className={cn(
                            "bw-card overflow-hidden transition-all duration-300",
                            openItems.includes(faq.id) ? "bg-black/5 dark:bg-white/5" : "hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                          )}
                        >
                          <button 
                            onClick={() => toggleItem(faq.id)}
                            className="w-full px-8 py-6 flex items-center justify-between text-left group"
                          >
                            <span className="text-lg font-bold text-black dark:text-white group-hover:translate-x-1 transition-transform">
                              {faq.question}
                            </span>
                            <ChevronDown className={cn(
                              "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0",
                              openItems.includes(faq.id) && "rotate-180 text-black dark:text-white"
                            )} />
                          </button>
                          
                          <div className={cn(
                            "grid transition-all duration-300 ease-in-out",
                            openItems.includes(faq.id) ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          )}>
                            <div className="overflow-hidden">
                              <div className="px-8 pb-8 pt-2">
                                <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground">No questions found matching your search.</p>
                  <Button 
                    variant="ghost" 
                    className="mt-4"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Still Have Questions? */}
        <section className="py-24 border-t border-black/10 dark:border-white/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bw-card p-12 md:p-16 text-center bg-gradient-to-b from-black/5 to-transparent dark:from-white/5 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">
                Still have questions?
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                Can't find what you're looking for? Our team is ready to help you navigate your AI journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-black text-white dark:bg-white dark:text-black font-bold h-14 px-8 rounded-2xl group"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Contact Support
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 rounded-2xl font-bold border-black/10 dark:border-white/10"
                  onClick={() => window.open('https://wa.me/917904168521', '_blank')}
                >
                  Chat on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default FAQ;
