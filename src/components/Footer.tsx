import { Twitter, Linkedin, Instagram, ArrowUp, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="border-t border-black/10 dark:border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand & Contact */}
                    <div className="space-y-6 md:col-span-2">
                        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center cursor-pointer group">
                            <div className="relative h-40 w-auto">
                                <img src="/logo-light.png" alt="RootedAI" className="h-full w-auto object-contain dark:hidden" />
                                <img src="/logo-dark.png" alt="RootedAI" className="hidden dark:block h-full w-auto object-contain" />
                            </div>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Automating logistics, hiring, and support for Indian SMEs and fast-growing teams.
                        </p>

                        {/* Contact Information */}
                        <div className="space-y-3">
                            <a
                                href="https://wa.me/917904168521"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-muted-foreground hover:text-black dark:hover:text-white transition-colors group"
                            >
                                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span className="text-sm">+91 7904168521</span>
                            </a>
                            <a
                                href="mailto:info@rootedai.co.in"
                                className="flex items-center gap-3 text-muted-foreground hover:text-black dark:hover:text-white transition-colors group"
                            >
                                <span className="text-sm">info@rootedai.co.in</span>
                            </a>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">Based in India, working globally</span>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex space-x-4">
                            <a href="https://x.com/rootedai2025?s=20" target="_blank" rel="noopener noreferrer" className="text-muted-foreground opacity-60 hover:text-black dark:hover:text-white hover:opacity-100 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com/company/rootdai" target="_blank" rel="noopener noreferrer" className="text-muted-foreground opacity-60 hover:text-black dark:hover:text-white hover:opacity-100 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="https://www.instagram.com/rootedai_official/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground opacity-60 hover:text-black dark:hover:text-white hover:opacity-100 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-black dark:text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><a href="/#about" className="hover:text-black dark:hover:text-white transition-colors">About</a></li>
                            <li><a href="/#careers" className="hover:text-black dark:hover:text-white transition-colors">Careers</a></li>
                            <li><a href="/#contact" className="hover:text-black dark:hover:text-white transition-colors">Contact</a></li>
                            <li><a href="/#products" className="hover:text-black dark:hover:text-white transition-colors">Products</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-black dark:text-white font-bold mb-6">Services</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link to="/services/ai-agents" className="hover:text-black dark:hover:text-white transition-colors">AI Agents</Link></li>
                            <li><Link to="/services/process-automation" className="hover:text-black dark:hover:text-white transition-colors">Automation</Link></li>
                            <li><Link to="/services/predictive-analytics" className="hover:text-black dark:hover:text-white transition-colors">Analytics</Link></li>
                            <li><a href="/#case-studies" className="hover:text-black dark:hover:text-white transition-colors">Case Studies</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-black/10 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground opacity-50 text-center md:text-left">
                        © {new Date().getFullYear()} RootedAI Solutions. All rights reserved. <br className="md:hidden" />
                        Helping businesses save 40% on ops cost through AI automation.
                    </p>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={scrollToTop}
                        className="rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white"
                    >
                        <ArrowUp className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
