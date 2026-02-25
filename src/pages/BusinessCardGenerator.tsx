import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Building2, MapPin, Phone, Mail, Globe, User } from "lucide-react";
import html2canvas from "html2canvas";
import MagneticButton from "@/components/ui/MagneticButton";

const BusinessCardGenerator = () => {
    const [formData, setFormData] = useState({
        name: "John Doe",
        title: "Chief AI Officer",
        company: "RootedAI Solutions",
        phone: "+91 98765 43210",
        email: "john.doe@rootedai.com",
        website: "www.rootedai.com",
        address: "Bangalore, India",
    });

    const cardRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDownload = async () => {
        if (!cardRef.current) return;
        try {
            setIsDownloading(true);

            // Create a temporary clone to modify for export
            const clone = cardRef.current.cloneNode(true) as HTMLElement;

            // html2canvas doesn't support oklch yet.
            // We need to inline fallback colors for elements using CSS variables or oklch directly.

            const stripOklch = (str: string) => {
                if (!str || typeof str !== 'string') return str;
                return str.replace(/oklch\([^\)]+\)/g, (match) => {
                    if (match.includes('0.65 0.2 200')) return '#6366f1';
                    if (match.includes('0.98 0 0')) return '#ffffff';
                    if (match.includes('0.25 0.02 240')) return 'rgba(255,255,255,0.1)';
                    return '#ffffff';
                });
            };

            const processNode = (node: HTMLElement) => {
                // To avoid html2canvas CSS parsing errors with oklch, we explicitly override styles
                // based on known Tailwind classes.

                // Remove root oklch-related classes that html2canvas will crash when looking up in stylesheets
                if (node.classList.contains('glass-premium')) {
                    node.classList.remove('glass-premium');
                    node.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    node.style.backdropFilter = 'blur(24px)';
                    node.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                }

                // Colors
                if (node.classList.contains('text-primary')) node.style.color = '#6366f1';
                if (node.classList.contains('text-white')) node.style.color = '#ffffff';
                if (node.classList.contains('text-gray-300')) node.style.color = '#d1d5db';
                if (node.classList.contains('text-primary/80')) node.style.color = 'rgba(99, 102, 241, 0.8)';

                // Backgrounds
                if (node.classList.contains('bg-[#050505]')) node.style.backgroundColor = '#050505';
                if (node.classList.contains('bg-white/5')) node.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                if (node.classList.contains('bg-primary/20')) node.style.backgroundColor = 'rgba(99, 102, 241, 0.2)';
                if (node.classList.contains('bg-primary/10')) node.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';

                // Borders
                if (node.classList.contains('border-white/10')) node.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                if (node.classList.contains('ring-white/10')) node.style.borderColor = 'rgba(255, 255, 255, 0.1)';

                // Gradients & complex backgrounds
                if (node.classList.contains('from-primary/50')) {
                    node.style.backgroundImage = 'linear-gradient(to right, transparent, rgba(99, 102, 241, 0.5), #6366f1)';
                }
                if (node.classList.contains('from-primary/20')) {
                    node.style.backgroundImage = 'linear-gradient(to right, rgba(99, 102, 241, 0.2), #6366f1, rgba(99, 102, 241, 0.2))';
                }

                // Strip OKLCH purely from inline styles if present
                if (node.getAttribute('style')) {
                    const styleStr = node.getAttribute('style') || '';
                    if (styleStr.includes('oklch')) {
                        node.setAttribute('style', stripOklch(styleStr));
                    }
                }

                Array.from(node.children).forEach(child => processNode(child as HTMLElement));
            };

            processNode(clone);

            // Append clone temporarily
            clone.style.position = 'absolute';
            clone.style.left = '-9999px';
            document.body.appendChild(clone);

            // Ensure the scale is high for good print/image quality
            const canvas = await html2canvas(clone, {
                scale: 4, // 4x resolution
                useCORS: true,
                backgroundColor: "#050505", // match dark theme background explicitly
                logging: false, // Turn off logging to reduce console noise
            });

            // Clean up clone
            document.body.removeChild(clone);

            const image = canvas.toDataURL("image/png", 1.0);
            const link = document.createElement("a");
            link.href = image;
            link.download = `BusinessCard_${formData.name.replace(/\s+/g, '_')}.png`;
            link.click();
        } catch (error) {
            console.error("Error downloading business card:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-16 px-4 md:px-8 bg-background relative overflow-hidden">
            {/* Background elements to match overall theme */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
                        Design Your <span className="text-gradient-silver">Business Card</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Create a custom, premium business card featuring the RootedAI aesthetic. Fill in your details below and download a high-resolution image.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left Column: Form */}
                    <div className="bg-card border border-white/5 rounded-2xl p-6 md:p-8 glass-premium">
                        <h2 className="text-2xl font-heading font-semibold mb-6">Your Details</h2>
                        <div className="space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                                        <User className="w-4 h-4 text-primary" /> Full Name
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className="bg-black/20 border-white/10 focus-visible:ring-primary/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                                        <User className="w-4 h-4 text-primary" /> Job Title
                                    </Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Chief AI Officer"
                                        className="bg-black/20 border-white/10 focus-visible:ring-primary/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-sm font-medium flex items-center gap-2">
                                    <Building2 className="w-4 h-4 text-primary" /> Company Name
                                </Label>
                                <Input
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    placeholder="RootedAI Solutions"
                                    className="bg-black/20 border-white/10 focus-visible:ring-primary/50"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-primary" /> Phone Number
                                    </Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+91 98765 43210"
                                        className="bg-black/20 border-white/10 focus-visible:ring-primary/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-primary" /> Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="john@rootedai.com"
                                        className="bg-black/20 border-white/10 focus-visible:ring-primary/50"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="website" className="text-sm font-medium flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-primary" /> Website
                                    </Label>
                                    <Input
                                        id="website"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        placeholder="www.rootedai.com"
                                        className="bg-black/20 border-white/10 focus-visible:ring-primary/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address" className="text-sm font-medium flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-primary" /> Location
                                    </Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Bangalore, India"
                                        className="bg-black/20 border-white/10 focus-visible:ring-primary/50"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                            <MagneticButton>
                                <Button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="bw-button group flex items-center gap-2"
                                >
                                    {isDownloading ? (
                                        <span className="animate-pulse">Generating...</span>
                                    ) : (
                                        <>
                                            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                                            Download High-Res Card
                                        </>
                                    )}
                                </Button>
                            </MagneticButton>
                        </div>
                    </div>

                    {/* Right Column: Live Preview */}
                    <div className="flex flex-col items-center justify-center sticky top-24">
                        <h2 className="text-xl font-medium mb-6 text-muted-foreground">Live Preview</h2>

                        {/* 
              Business Card Container 
              Standard Size: 3.5" x 2" -> Aspect Ratio ~ 1.75
              Width: 600px Height: 343px (approx to fit nicely)
            */}
                        <div className="relative w-full max-w-[600px] aspect-[1.75] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">

                            {/* This is the DOM element that html2canvas will capture */}
                            <div
                                ref={cardRef}
                                className="absolute inset-0 bg-[#050505] text-white overflow-hidden p-8 flex flex-col justify-between"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                {/* --- Background Netted Design (CSS Pattern) --- */}
                                {/* 
                   We use CSS radial gradients to create a dot matrix / networked look 
                   similar to HeroBackground, but static for export safety.
                */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
                                    style={{
                                        backgroundImage: `
                      radial-gradient(circle at center, rgba(160, 160, 160, 0.15) 1px, transparent 1px)
                    `,
                                        backgroundSize: '24px 24px',
                                    }}
                                />

                                {/* Glow Overlay */}
                                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-primary/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                                {/* --- Card Content --- */}
                                <div className="relative z-10 flex justify-between items-start">
                                    <div>
                                        <h2 className="font-heading font-bold text-3xl tracking-wide mb-1 text-white uppercase" style={{ wordSpacing: '4px' }}>
                                            {formData.name || 'Your Name'}
                                        </h2>
                                        <p className="font-sans text-primary font-medium tracking-wider text-sm uppercase">
                                            {formData.title || 'Your Title'}
                                        </p>
                                    </div>

                                    {/* Subtle Logo/Monogram Area */}
                                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center glass-premium">
                                        <span className="font-heading font-bold text-xl text-primary">
                                            {formData.company ? formData.company.charAt(0).toUpperCase() : 'R'}
                                        </span>
                                    </div>
                                </div>

                                <div className="relative z-10 flex justify-between items-end mt-auto">

                                    {/* Contact Info */}
                                    <div className="space-y-2.5 font-sans">
                                        {formData.phone && (
                                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                                <Phone className="w-4 h-4 text-primary/80" />
                                                <span className="tracking-wide">{formData.phone}</span>
                                            </div>
                                        )}
                                        {formData.email && (
                                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                                <Mail className="w-4 h-4 text-primary/80" />
                                                <span className="tracking-wide">{formData.email}</span>
                                            </div>
                                        )}
                                        {formData.website && (
                                            <div className="flex items-center gap-3 text-sm text-gray-300">
                                                <Globe className="w-4 h-4 text-primary/80" />
                                                <span className="tracking-wide">{formData.website}</span>
                                            </div>
                                        )}
                                        {formData.address && (
                                            <div className="flex items-center gap-3 text-sm text-gray-300 pt-1">
                                                <MapPin className="w-4 h-4 text-primary/80" />
                                                <span className="tracking-wide">{formData.address}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Company Branding */}
                                    <div className="text-right">
                                        <p className="font-heading font-bold text-xl tracking-tight text-white mb-1">
                                            {formData.company || 'Company'}
                                        </p>
                                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/50 to-primary rounded-full" />
                                    </div>
                                </div>

                                {/* Accent Line Bottom */}
                                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary/20 via-primary to-primary/20 opacity-80" />
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground mt-4 text-center max-w-[400px]">
                            The preview above represents exactly how your card will look when exported. Resolution will be scaled up automatically for high-quality printing.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessCardGenerator;
