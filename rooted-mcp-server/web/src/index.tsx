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
            // Security check: ensure message is from parent
            if (event.source !== window.parent) return;

            const message = event.data;
            if (!message || message.jsonrpc !== "2.0") return;

            // Update UI state when we receive a tool result
            if (message.method === "ui/notifications/tool-result") {
                setToolResult(message.params ?? null);
            }
        };

        window.addEventListener("message", onMessage);
        // Request initial context or signal readiness if needed
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
// Brand Card UI
// ----------------------------------------------------------------------------

const BrandCard = () => {
    const [view, setView] = useState<'card' | 'contact'>('card');

    if (view === 'contact') {
        return <ContactForm onBack={() => setView('card')} />;
    }

    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            padding: '24px',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: 'white',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            maxWidth: '100%',
            margin: '0 auto',
            boxSizing: 'border-box'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    margin: '0 0 8px 0',
                    background: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    RootedAI Solutions
                </h1>
                <p style={{
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    opacity: 0.7,
                    margin: 0
                }}>
                    Engineering Intelligence
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '24px'
            }}>
                <StatCard value="90%" label="Time Saved" />
                <StatCard value="Global" label="Reach" />
                <StatCard value="2-4 Wk" label="Delivery" />
                <StatCard value="24/7" label="Support" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <ServiceBadge>AI Agents & Automation</ServiceBadge>
                <ServiceBadge>Enterprise Security</ServiceBadge>
                <ServiceBadge>Predictive Analytics</ServiceBadge>
            </div>

            <button
                onClick={() => setView('contact')}
                style={{
                    marginTop: '24px',
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                }}
            >
                Contact Our Team
            </button>
        </div>
    );
};

const ContactForm = ({ onBack }: { onBack: () => void }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendHostMessage(`Please submit this contact form:\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '12px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '6px',
        color: 'white',
        fontSize: '14px',
        boxSizing: 'border-box' as const
    };

    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            padding: '24px',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: 'white',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            maxWidth: '100%',
            margin: '0 auto',
            boxSizing: 'border-box'
        }}>
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', marginBottom: '16px', fontSize: '14px' }}>
                ← Back
            </button>

            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#00C9FF' }}>Get in Touch</h2>
            <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '20px' }}>Tell us how we can help you.</p>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={inputStyle}
                    required
                />
                <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={inputStyle}
                    required
                />
                <textarea
                    placeholder="How can we help?"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, minHeight: '80px', fontFamily: 'inherit' }}
                    required
                />

                <button type="submit" style={{
                    width: '100%',
                    padding: '12px',
                    background: 'linear-gradient(90deg, #00C9FF 0%, #0088CC 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginTop: '8px'
                }}>
                    Send Message
                </button>
            </form>
        </div>
    );
};

const StatCard = ({ value, label }: { value: string, label: string }) => (
    <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '12px',
        borderRadius: '8px',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#00C9FF' }}>{value}</div>
        <div style={{ fontSize: '10px', opacity: 0.6, textTransform: 'uppercase' }}>{label}</div>
    </div>
);

const ServiceBadge = ({ children }: { children: React.ReactNode }) => (
    <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#92FE9D' }}></div>
        {children}
    </div>
);

// ----------------------------------------------------------------------------
// Entry Point (Dual Mode)
// ----------------------------------------------------------------------------

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<BrandCard />);
}

export default BrandCard;
