import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Technology', href: '#tech' },
        { name: 'Showcase', href: '#projects' },
        { name: 'Company', href: '#about' },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-[1000] transition-all duration-300",
                isScrolled
                    ? "bg-black/70 backdrop-blur-[40px] border-b border-white/15 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                    : "bg-black/30 backdrop-blur-[30px] border-b border-white/10 py-6"
            )}
        >
            <div className="container-width flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="text-2xl font-bold font-heading tracking-tighter text-white group flex items-center gap-2 logo transition-transform duration-300 hover:scale-105">
                    <span className="filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                        Rooted<span className="text-neutral-400">AI</span>.
                    </span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-white/80 hover:text-white transition-all duration-300 relative group py-2"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent -translate-x-1/2 transition-all duration-300 group-hover:w-[80%]" />
                        </a>
                    ))}
                    <GradientButton variant="primary" className="text-sm px-6 py-2 cta-primary">
                        Get Started
                    </GradientButton>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 min-h-screen bg-black/95 backdrop-blur-[40px] border-t border-white/10 p-6 md:hidden flex flex-col gap-6 animate-in slide-in-from-top-4 z-[999]">
                    {navLinks.map((link, i) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-2xl font-medium text-white/80 hover:text-white border-b border-white/5 pb-4"
                            style={{ animationDelay: `${i * 100}ms` }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <GradientButton variant="primary" className="w-full mt-4 py-4 text-lg">
                        Get Started
                    </GradientButton>
                </div>
            )}
        </nav>
    );
};

export { Navigation };
