import { Twitter, Linkedin, Instagram, ArrowUp, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative border-t border-black/10 dark:border-white/10 pt-24 pb-12 overflow-hidden">
            {/* Background enhancement */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 to-transparent dark:from-black/50 dark:to-transparent pointer-events-none -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 mb-20">
                    {/* Brand & Contact */}
                    <div className="space-y-8 md:col-span-2">
                        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="block group">
                            <div className="relative h-20 w-auto flex items-center">
                                <span className="text-3xl font-bold font-heading tracking-[0.1em] text-black dark:text-white group-hover:opacity-80 transition-opacity">
                                    ROOTED<span className="font-light">AI</span>
                                </span>
                            </div>
                        </Link>
                        <p className="text-black/60 dark:text-white/60 text-base leading-relaxed max-w-sm font-light">
                            Engineering Intelligence. Complexity Simplified. <br />
                            Building the autonomous enterprise of tomorrow.
                        </p>

                        {/* Contact Information */}
                        <div className="space-y-4 pt-4">
                            <a
                                href="https://wa.me/917904168521"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-all group w-fit"
                            >
                                <div className="p-2 rounded-full bg-black/5 dark:bg-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium">+91 7904168521</span>
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
                                <span className="text-sm">Based in India, working globally</span>
                            </div>
                        </div>

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
                        <ul className="space-y-4 text-sm text-black/60 dark:text-white/60">
                            <li><Link to="/services/ai-agents" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">AI Agents</Link></li>
                            <li><Link to="/services/process-automation" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">Automation</Link></li>
                            <li><Link to="/services/predictive-analytics" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">Analytics</Link></li>
                            <li><a href="/#case-studies" className="hover:text-black dark:hover:text-white transition-colors hover:pl-2 duration-300 block">Case Studies</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-black/10 dark:border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-black/40 dark:text-white/40 text-center md:text-left font-light tracking-wide">
                        © {new Date().getFullYear()} RootedAI Solutions. All rights reserved. <br className="hidden md:inline" />
                        Helping businesses save 40% on ops cost through AI automation.
                    </p>
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
