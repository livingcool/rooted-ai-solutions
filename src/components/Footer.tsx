import { Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand */}
                    <div className="space-y-6">
                        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center space-x-2 cursor-pointer group">
                            <div className="w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-110">
                                <img src="/logo.png" alt="RootedAI" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">RootedAI</span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Engineering autonomy for the modern enterprise.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://x.com/rootedai2025?s=20" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com/company/rootdai" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-white/40 hover:text-white transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                            <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Services</h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li><a href="#services" className="hover:text-white transition-colors">AI Agents</a></li>
                            <li><a href="#services" className="hover:text-white transition-colors">Automation</a></li>
                            <li><a href="#services" className="hover:text-white transition-colors">Analytics</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/40">
                        © {new Date().getFullYear()} RootedAI Solutions. All rights reserved.
                    </p>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={scrollToTop}
                        className="rounded-full hover:bg-white/10 text-white"
                    >
                        <ArrowUp className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
