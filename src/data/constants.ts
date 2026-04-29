import { 
  Cpu, Zap, Globe, Brain, Shield, BarChart3 
} from "lucide-react";

export const C = {
  cream:     "#F9EFE9",
  parchment: "#F0DCC8",
  blush:     "#EDD5C0",
  amber:     "#F5E6C8",
  purple:    "#240747",
  orange:    "#F6851B",
};

export const METRICS = [
  { value: "40%",   label: "Risk Reduction",      bg: C.cream     },
  { value: "3×",    label: "Faster Deployment",   bg: C.parchment },
  { value: "150+",  label: "Automations Shipped", bg: C.blush     },
  { value: "98%",   label: "Client Retention",    bg: C.amber     },
];

export const SERVICES = [
  { icon: Cpu,       title: "AI Agents",            href: "/services/ai-agents",            bg: C.cream     },
  { icon: Zap,       title: "Process Automation",   href: "/services/process-automation",   bg: C.parchment },
  { icon: Globe,     title: "Web Solutions",         href: "/services/web-solutions",        bg: C.blush     },
  { icon: Brain,     title: "NLP Systems",           href: "/services/nlp-systems",          bg: C.amber     },
  { icon: BarChart3, title: "Predict Analytics",  href: "/services/predictive-analytics", bg: C.cream     },
  { icon: Shield,    title: "Enterprise Sec",   href: "/services/enterprise-security",  bg: C.parchment },
];
