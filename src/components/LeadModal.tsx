
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ReCAPTCHA from 'react-google-recaptcha';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const C = {
  cream: "#F9EFE9",
  purple: "#240747",
  orange: "#F6851B",
  parchment: "#F0DCC8",
};

export default function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA verification");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      service_needed: formData.get('service_needed') as string,
      message: formData.get('message') as string,
    };

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([data]);

      if (error) throw error;

      setSuccess(true);
      toast.success("Deployment Request Received");
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2500);
    } catch (error: any) {
      toast.error(error.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(36, 7, 71, 0.4)', backdropFilter: 'blur(8px)' }}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="nb-tile"
            style={{
              width: '100%',
              maxWidth: '560px',
              background: C.cream,
              position: 'relative',
              zIndex: 1,
              padding: 0,
              overflow: 'hidden'
            }}
          >
            {/* Header / Tab Styling */}
            <div style={{ background: C.purple, padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldCheck size={18} color={C.orange} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: C.cream, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
                  Discovery Terminal
                </span>
              </div>
              <button
                onClick={onClose}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={20} color={C.cream} />
              </button>
            </div>

            <div style={{ padding: '2.5rem' }}>
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '2rem 0' }}
                >
                  <CheckCircle2 size={64} color={C.orange} style={{ margin: '0 auto 1.5rem' }} />
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: C.purple, marginBottom: '1rem' }}>Transmission Successful.</h2>
                  <p style={{ fontFamily: 'var(--font-sans)', color: C.purple, opacity: 0.7 }}>Our engineering team will review your deployment parameters and reach out within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={labelStyle}>Full Name*</label>
                      <input name="name" required style={inputStyle} placeholder="Operational Lead" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={labelStyle}>Work Email*</label>
                      <input name="email" type="email" required style={inputStyle} placeholder="lead@company.ai" />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={labelStyle}>Contact Phone</label>
                      <input name="phone" style={inputStyle} placeholder="+1 (555) 000-0000" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <label style={labelStyle}>Service Required</label>
                      <select name="service_needed" style={selectStyle}>
                        <option value="Machine Perception">Machine Perception</option>
                        <option value="Edge Deployment">Edge Deployment</option>
                        <option value="Process Flow">Process Flow</option>
                        <option value="AI Safety">Safety Protocols</option>
                        <option value="Other">Custom Request</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={labelStyle}>Company Name</label>
                    <input name="company" style={inputStyle} placeholder="Organization ID" />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={labelStyle}>Mission Description*</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      style={{ ...inputStyle, resize: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                      onChange={(token) => setCaptchaToken(token)}
                      theme="light"
                    />
                  </div>

                  <motion.button
                    whileHover={{ y: -4, boxShadow: `8px 8px 0 ${C.purple}` }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    type="submit"
                    style={{
                      background: C.orange,
                      color: C.purple,
                      border: `3px solid ${C.purple}`,
                      borderRadius: '12px',
                      padding: '1.2rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      marginTop: '1rem',
                      cursor: loading ? 'wait' : 'pointer',
                      transition: 'box-shadow 0.2s ease',
                      boxShadow: `4px 4px 0 ${C.purple}`
                    }}
                  >
                    {loading ? "Transmitting..." : "Initiate Discovery"}
                    <Send size={18} />
                  </motion.button>

                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: C.purple, opacity: 0.4, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Secure Connection Established — Data encrypted
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.65rem',
  textTransform: 'uppercase',
  fontWeight: 700,
  color: C.purple,
  opacity: 0.6,
  letterSpacing: '0.1em'
};

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.5)',
  border: `2px solid ${C.purple}`,
  borderRadius: '8px',
  padding: '0.75rem 1rem',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9rem',
  color: C.purple,
  outline: 'none',
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23240747' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 1rem center',
  paddingRight: '2.5rem'
};
