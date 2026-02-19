import { Brain, Cpu, Globe, MessageSquare, Zap, Shield, Users } from "lucide-react";
import StickyScrollReveal from "@/components/ui/sticky-scroll-reveal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "AI Safety & Compliance",
    description: "Deploy AI without the risk. Comprehensive safety audits, bias testing, and DPDP compliance.",
    example: "E.g., Ensure DPDP compliance, eliminate AI bias, maintain 99.8% accuracy",
    icon: <Shield className="w-12 h-12 text-white" />,
    metrics: "Zero compliance incidents",
    route: "/services/ai-safety",
    color: "#0f4c3a",
  },
  {
    title: "AI Agents",
    description: "Autonomous agents that handle complex workflows, from customer support to data analysis.",
    example: "E.g., Auto-respond to 80% of support tickets, route complex queries to humans",
    icon: <Brain className="w-12 h-12 text-white" />,
    metrics: "Deflect 60% of tickets",
    route: "/services/ai-agents",
    color: "#0f172a", // Slate 900
  },
  {
    title: "Process Automation",
    description: "End-to-end automation of repetitive tasks, reducing manual effort by up to 90%.",
    example: "E.g., Automate invoice reconciliation and order status updates for logistics",
    icon: <Cpu className="w-12 h-12 text-white" />,
    metrics: "Save 15-20 hrs/week",
    route: "/services/process-automation",
    color: "#1e1b4b", // Indigo 950
  },
  {
    title: "Web Solutions",
    description: "Dynamic, AI-integrated web environments that adapt to user behavior.",
    example: "E.g., Custom dashboards with real-time analytics and predictive insights",
    icon: <Globe className="w-12 h-12 text-white" />,
    metrics: "Deploy in 2-4 weeks",
    route: "/services/web-solutions",
    color: "#172554", // Blue 950
  },
  {
    title: "NLP Systems",
    description: "Advanced natural language processing for sentiment analysis and automated reporting.",
    example: "E.g., Extract key insights from customer feedback and generate weekly reports",
    icon: <MessageSquare className="w-12 h-12 text-white" />,
    metrics: "Process 1000s docs/min",
    route: "/services/nlp-systems",
    color: "#020617", // Slate 950
  },
  {
    title: "Predictive Analytics",
    description: "Data-driven insights that forecast trends and optimize decision-making.",
    example: "E.g., Predict inventory demand and optimize stock levels for e-commerce",
    icon: <Zap className="w-12 h-12 text-white" />,
    metrics: "Reduce wastage by 30%",
    route: "/services/predictive-analytics",
    color: "#0a0a0a", // Neutral 950
  },
  {
    title: "Enterprise Security",
    description: "AI-powered threat detection and automated security protocols.",
    example: "E.g., Real-time anomaly detection and automated security alerts",
    icon: <Shield className="w-12 h-12 text-white" />,
    metrics: "99.9% uptime SLA",
    route: "/services/enterprise-security",
    color: "#111827", // Gray 900
  },
  {
    title: "Outsourcing",
    description: "Scale your team instantly with our elite pre-vetted developers.",
    example: "E.g., Hire a full stack team in 48 hours for your next big project",
    icon: <Users className="w-12 h-12 text-white" />,
    metrics: "Save 60% on costs",
    route: "/services/outsourcing",
    color: "#18181b", // Zinc 950
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 relative bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6 mb-24 text-center">
        <h2 className="text-4xl md:text-7xl font-bold font-heading text-black dark:text-white tracking-tighter mb-6">
          Our Capabilities
        </h2>
        <p className="text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto font-light">
          We stack value on top of value. Scroll to explore how we engineer intelligence.
        </p>
      </div>

      <StickyScrollReveal content={services} />

      <div className="container mx-auto px-4 md:px-6 relative z-10 pb-20">
        {/* Why Choose Us Section */}
        <div className="mt-40">
          <div className="glass-premium p-10 md:p-20 text-center rounded-3xl bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
            <h3 className="text-3xl md:text-5xl font-bold font-heading text-black dark:text-white mb-16">
              Why Choose RootedAI?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
              <div className="space-y-4 group">
                <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-black to-black/50 dark:from-white dark:to-white/50 group-hover:scale-110 transition-transform duration-500">10x</div>
                <p className="text-xl text-black dark:text-white font-medium">Faster Execution</p>
                <p className="text-sm text-black/50 dark:text-white/50 uppercase tracking-widest">vs manual processes</p>
              </div>
              <div className="space-y-4 group">
                <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-black to-black/50 dark:from-white dark:to-white/50 group-hover:scale-110 transition-transform duration-500">90%</div>
                <p className="text-xl text-black dark:text-white font-medium">Error Reduction</p>
                <p className="text-sm text-black/50 dark:text-white/50 uppercase tracking-widest">in repetitive tasks</p>
              </div>
              <div className="space-y-4 group">
                <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-black to-black/50 dark:from-white dark:to-white/50 group-hover:scale-110 transition-transform duration-500">24/7</div>
                <p className="text-xl text-black dark:text-white font-medium">Uptime Guarantee</p>
                <p className="text-sm text-black/50 dark:text-white/50 uppercase tracking-widest">with AI agents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;