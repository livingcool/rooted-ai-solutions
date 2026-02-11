import React from 'react';
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative pt-24 pb-12 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

            <div className="container-width relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold font-heading tracking-tighter">Rooted<span className="text-neutral-500">AI</span>.</h2>
                        <p className="text-neutral-400 max-w-xs">
                            Pioneering the future of intelligence with liquid interfaces and seamless automation.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links columns */}
                    <div>
                        <h4 className="font-semibold text-white mb-6">Solutions</h4>
                        <ul className="space-y-4 text-neutral-400">
                            <li><a href="#" className="hover:text-white transition-colors">Enterprise AI</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Neural Search</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Predictive Analytics</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-neutral-400">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold text-white mb-6">Stay Updated</h4>
                        <GlassCard className="p-1.5 flex items-center">
                            <input
                                type="email"
                                placeholder="Enter email..."
                                className="bg-transparent border-none outline-none text-sm text-white px-4 placeholder:text-neutral-600 w-full"
                            />
                            <GradientButton variant="icon" className="w-8 h-8 p-0">
                                →
                            </GradientButton>
                        </GlassCard>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-600">
                    <p>© 2026 RootedAI Solutions. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-neutral-400">Privacy Policy</a>
                        <a href="#" className="hover:text-neutral-400">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export { Footer };
