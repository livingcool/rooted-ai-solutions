import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

// ----------------------------------------------------------------------------
// MCP Apps Bridge
// ----------------------------------------------------------------------------

type ToolResult = { structuredContent?: any } | null;

function useToolResult() {
    const [toolResult, setToolResult] = useState<ToolResult>(null);

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            if (event.source !== window.parent) return;
            const message = event.data;
            if (!message || message.jsonrpc !== "2.0") return;
            if (message.method === "ui/notifications/tool-result") {
                setToolResult(message.params ?? null);
            }
        };
        window.addEventListener("message", onMessage);
        return () => window.removeEventListener("message", onMessage);
    }, []);

    return toolResult;
}

function sendHostMessage(text: string) {
    window.parent.postMessage(
        {
            jsonrpc: "2.0",
            method: "ui/message",
            params: {
                role: "user",
                content: [{ type: "text", text }],
            },
        },
        "*"
    );
}

// ----------------------------------------------------------------------------
// Assets (SVG Logo)
// ----------------------------------------------------------------------------

const RootedLogo = () => (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 'R' Shape Base */}
        <path d="M20 10 H55 Q85 10 85 40 Q85 60 65 70 L90 95 H70 L50 70 H40 V95 H20 V10 Z" fill="white" />
        {/* Cutout for the leaf effect */}
        <path d="M40 30 H55 Q65 30 65 40 Q65 50 55 50 H40 V30 Z" fill="#0f172a" />
        {/* Leaf Accent */}
        <path d="M50 35 Q70 35 70 55 Q50 55 50 35" fill="white" />
    </svg>
);

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------

const StatCard = ({ value, label }: { value: string, label: string }) => (
    <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        padding: '24px 16px',
        borderRadius: '16px',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px'
    }}>
        <div style={{ fontSize: '28px', fontWeight: '800', color: 'white', lineHeight: '1' }}>{value}</div>
        <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>{label}</div>
    </div>
);

// ----------------------------------------------------------------------------
// Brand Card UI
// ----------------------------------------------------------------------------

const BrandCard = () => {
    const [view, setView] = useState<'card' | 'contact'>('card');

    if (view === 'contact') {
        return <ContactForm onBack={() => setView('card')} />;
    }

    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif',
            padding: '32px',
            background: '#0f172a', /* Dark Slate/Black Base */
            color: 'white',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.08)',
            maxWidth: '100%',
            margin: '0 auto',
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '600px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Ambient Background Gradient */}
            <div style={{
                position: 'absolute',
                top: '-40%',
                left: '-20%',
                width: '140%',
                height: '100%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%)',
                pointerEvents: 'none'
            }} />

            {/* Header / Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', position: 'relative', zIndex: 1 }}>
                <RootedLogo />
                <span style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '0.5px' }}>ROOTEDAI</span>
            </div>

            {/* Hero Text */}
            <div style={{ marginBottom: '48px', position: 'relative', zIndex: 1, flex: 1 }}>
                <h1 style={{
                    fontSize: '48px',
                    lineHeight: '1.05',
                    fontWeight: '800',
                    margin: '0 0 16px 0',
                    color: 'white',
                    letterSpacing: '-1px'
                }}>
                    Automate &<br />
                    <span style={{ color: '#94a3b8' }}>Focus on</span><br />
                    Growth
                </h1>
                <p style={{
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: '#94a3b8',
                    maxWidth: '95%',
                    margin: 0
                }}>
                    AI-powered automation that handles repetitive tasks. Let intelligent systems do the heavy lifting while your team focuses on innovation.
                </p>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '32px',
                position: 'relative',
                zIndex: 1
            }}>
                <StatCard value="90%" label="Time Saved" />
                <StatCard value="Zero" label="Errors" />
                <StatCard value="5+" label="Solutions" />
                <StatCard value="24/7" label="Active" />
            </div>

            {/* CTA Button */}
            <button
                onClick={() => setView('contact')}
                style={{
                    position: 'relative',
                    width: '100%',
                    padding: '18px',
                    background: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'black',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s ease',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '12px',
                    zIndex: 1
                }}
            >
                Automate Your Workflow
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </button>
        </div>
    );
};

// ----------------------------------------------------------------------------
// Contact Form
// ----------------------------------------------------------------------------

const ContactForm = ({ onBack }: { onBack: () => void }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendHostMessage(`Please submit this contact form:\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    };

    const inputStyle = {
        width: '100%',
        padding: '16px',
        marginBottom: '16px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        color: 'white',
        fontSize: '15px',
        boxSizing: 'border-box' as const,
        outline: 'none',
        transition: 'border-color 0.2s',
        fontFamily: 'inherit'
    };

    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif',
            padding: '32px',
            background: '#0f172a',
            color: 'white',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.08)',
            minHeight: '600px',
            maxWidth: '100%',
            margin: '0 auto',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <button onClick={onBack} style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                marginBottom: '32px',
                fontSize: '15px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                alignSelf: 'flex-start'
            }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back
            </button>

            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '12px', color: 'white' }}>Get in Touch</h2>
            <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '40px', lineHeight: '1.5' }}>
                Fill out the form below and our AI will help route your request to the right team.
            </p>

            <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={inputStyle}
                    required
                />
                <input
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={inputStyle}
                    required
                />
                <textarea
                    placeholder="How can we help you automate?"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                    required
                />

                <div style={{ flex: 1 }}></div>

                <button type="submit" style={{
                    width: '100%',
                    padding: '18px',
                    background: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'black',
                    fontWeight: '700',
                    fontSize: '16px',
                    cursor: 'pointer',
                    marginTop: '16px'
                }}>
                    Send Message
                </button>
            </form>
        </div>
    );
};

// ----------------------------------------------------------------------------
// Entry Point
// ----------------------------------------------------------------------------

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<BrandCard />);
}

export default BrandCard;
