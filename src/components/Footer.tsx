import { Twitter, Linkedin, Instagram, ArrowUp, Phone, Mail, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative border-t border-black/10 dark:border-white/10 pt-24 pb-32 md:pb-12 overflow-hidden">
            {/* Background enhancement */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 to-transparent dark:from-black/50 dark:to-transparent pointer-events-none -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-20">
                    {/* Brand & Contact */}
                    <div className="space-y-8 lg:col-span-2">
                        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="block group">
                            <div className="relative h-20 w-auto flex items-center">
                                <img 
                                    src="/images/Darkmode logo.png" 
                                    alt="RootedAI Logo" 
                                    className="h-12 w-auto object-contain mr-3"
                                />
                                <span className="text-3xl font-bold font-heading tracking-tight text-black dark:text-white group-hover:opacity-80 transition-opacity">
                                    Rooted<span className="text-violet-600 dark:text-violet-400">AI</span>
                                </span>
                            </div>
                        </Link>
                        <p className="text-black/60 dark:text-white/60 text-base leading-relaxed max-w-sm font-light">
                            Engineering Intelligence. Complexity Simplified. <br />
                            Building the autonomous enterprise of tomorrow.
                        </p>

                        {/* Contact Information - AIO Optimized NAP */}
                        <address className="space-y-4 pt-4 not-italic">
                            <a
                                href="https://wa.me/917904168521"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-all group w-fit"
                            >
                                <div className="p-2 rounded-full bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium">+91 7904 168 521</span>
                            </a>
                            <a
                                href="mailto:info@rootedai.co.in"
                                className="flex items-center gap-4 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-all group w-fit"
                            >
                                <div className="p-2 rounded-full bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium">info@rootedai.co.in</span>
                            </a>
                            <div className="flex items-center gap-4 text-black/60 dark:text-white/60">
                                <div className="p-2 rounded-full bg-black/5 dark:bg-white/5">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span className="text-sm">Hosur, Tamil Nadu, IN 635109 (Global Headquarters)</span>
                            </div>
                        </address>

                        {/* Social Media */}
                        <div className="flex space-x-4 pt-2">
                            {[
                                { Icon: Twitter, href: "https://x.com/rootedai2025?s=20" },
                                { Icon: Linkedin, href: "https://www.linkedin.com/company/rootdai" },
                                { Icon: Instagram, href: "https://www.instagram.com/rootedai_official/" }
                            ].map(({ Icon, href }, idx) => (
                                <a
                                    key={idx}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all hover:scale-110"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-lg font-bold text-black dark:text-white mb-8">Company</h4>
                        <ul className="space-y-4 text-sm text-black/60 dark:text-white/60">
                            <li><a href="/#about" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">About</a></li>
                            <li><a href="/#careers" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">Careers</a></li>
                            <li><a href="/#contact" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">Contact</a></li>
                            <li><a href="/#products" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">Products</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-black dark:text-white mb-8">Services</h4>
                        <ul className="space-y-3 text-sm text-black/60 dark:text-white/60">
                            <li><Link to="/services/ai-safety" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">AI Safety & Compliance</Link></li>
                            <li><Link to="/services/ai-agents" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">AI Agents</Link></li>
                            <li><Link to="/services/process-automation" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">Process Automation</Link></li>
                            <li><Link to="/services/predictive-analytics" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">Predictive Analytics</Link></li>
                            <li><Link to="/services/nlp-systems" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">NLP Systems</Link></li>
                            <li><Link to="/services/web-solutions" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">Web Solutions</Link></li>
                            <li><Link to="/services/enterprise-security" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">Enterprise Security</Link></li>
                            <li><Link to="/services/outsourcing" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">IT Outsourcing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-black dark:text-white mb-8">Resources</h4>
                        <ul className="space-y-4 text-sm text-black/60 dark:text-white/60">
                            <li><Link to="/blog" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">Blog</Link></li>
                            <li><Link to="/case-studies" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">Case Studies</Link></li>
                            <li><Link to="/pricing" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">Pricing</Link></li>
                            <li><a href="https://portal.rootedai.co.in" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block font-medium underline underline-offset-4 decoration-violet-500/30">Internal Employee Portal</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-black dark:text-white mb-8">Locations</h4>
                        <ul className="space-y-3 text-sm text-black/60 dark:text-white/60">
                            <li><Link to="/locations/hosur" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">Hosur</Link></li>
                            <li><Link to="/locations/coimbatore" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">Coimbatore</Link></li>
                            <li><Link to="/locations/bangalore" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">Bangalore</Link></li>
                            <li><Link to="/locations/chennai" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">Chennai</Link></li>
                            <li><Link to="/locations" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block font-semibold mt-4">View All Locations</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-black/10 dark:border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-black/40 dark:text-white/40 text-center md:text-left font-light tracking-wide">
                        © {new Date().getFullYear()} RootedAI Solutions. All rights reserved. <br className="hidden md:inline" />
                        Helping businesses save 40% on ops cost through AI automation.
                    </p>

                    {/* GoodFirms Recognition */}
                    <a
                        href="https://www.goodfirms.co/company/rootedai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all group"
                    >
                        <span className="flex items-center gap-0.5 text-[#FFD700]">
                            <Star className="w-3 h-3 fill-current" />
                            <Star className="w-3 h-3 fill-current" />
                            <Star className="w-3 h-3 fill-current" />
                            <Star className="w-3 h-3 fill-current" />
                            <Star className="w-3 h-3 fill-current" />
                        </span>
                        <span className="text-xs text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white transition-colors font-medium">
                            Recognized on <span className="font-bold">GoodFirms</span>
                        </span>
                    </a>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={scrollToTop}
                        className="rounded-full h-12 w-12 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white border border-black/5 dark:border-white/5"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
