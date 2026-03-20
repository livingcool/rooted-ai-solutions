import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service_needed: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (error) throw error;

      // Trigger email notification
      const { error: functionError } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (functionError) {
        console.error("Error sending email notification:", functionError);
        // We don't throw here because the DB insert was successful
      }

      toast({
        title: "Message Sent",
        description: "We'll get back to you shortly.",
      });
      setFormData({ name: "", email: "", company: "", phone: "", service_needed: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 relative overflow-hidden bg-white dark:bg-[#0a0f14]">
      {/* High-Impact background glow */}
      <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-blue-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[100%] bg-purple-500/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Branding & Reactive Visual */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-black text-black dark:text-white tracking-tighter leading-tight">
                Let's <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent italic">Talk</span>
              </h2>
              <p className="text-xl text-muted-foreground font-light max-w-md">
                Fueling the next decade of enterprise intelligence. Tell us where you want to go.
              </p>
            </div>

            {/* Reactive Projector Orb */}
            <div className="relative aspect-square max-w-[300px] mx-auto lg:mx-0 group">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse group-hover:bg-blue-500/40 transition-colors" />
              <div className="relative h-full w-full glass-premium rounded-full border border-white/20 flex items-center justify-center overflow-hidden">
                {/* 3D-effect mesh background */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                
                {/* The Core Orb */}
                <div 
                  className={`w-32 h-32 rounded-full shadow-[0_0_50px_rgba(59,130,246,0.5)] transition-all duration-500 ${
                    Object.values(formData).some(v => v !== "") ? 'scale-125 bg-blue-400 rotate-45' : 'scale-100 bg-blue-600'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-white/40 to-transparent rounded-full animate-pulse" />
                </div>
                
                {/* Orbiting particles (CSS only) */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute top-4 left-1/2 w-4 h-4 bg-purple-500 rounded-full blur-sm" />
                  <div className="absolute bottom-4 left-1/2 w-3 h-3 bg-blue-400 rounded-full blur-sm" />
                </div>
              </div>
              
              <div className="mt-8 text-center lg:text-left">
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground opacity-50">
                  Core Status: {Object.values(formData).some(v => v !== "") ? 'Ready to Transmit' : 'Awaiting Input'}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Neural Console Form */}
          <div className="lg:col-span-7">
            <div className="glass-premium p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/10 dark:bg-slate-900/40 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
              
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2 group">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-blue-500 transition-colors">Personal Alias</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-transparent border-0 border-b-2 border-white/10 rounded-none h-14 text-lg focus:border-blue-500 transition-all px-0 placeholder:text-muted-foreground/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-blue-500 transition-colors">Secure Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-transparent border-0 border-b-2 border-white/10 rounded-none h-14 text-lg focus:border-blue-500 transition-all px-0 placeholder:text-muted-foreground/30"
                      placeholder="you@domain.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2 group">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-blue-500 transition-colors">Organization</label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-transparent border-0 border-b-2 border-white/10 rounded-none h-14 text-lg focus:border-blue-500 transition-all px-0 placeholder:text-muted-foreground/30"
                      placeholder="Company name"
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-blue-500 transition-colors">Primary Wave (Phone)</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-transparent border-0 border-b-2 border-white/10 rounded-none h-14 text-lg focus:border-blue-500 transition-all px-0 placeholder:text-muted-foreground/30"
                      placeholder="+1 (000) 000-0000"
                    />
                  </div>
                </div>

                <div className="space-y-2 group">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-blue-500 transition-colors">Directive (Service)</label>
                  <select
                    value={formData.service_needed}
                    onChange={(e) => setFormData({ ...formData, service_needed: e.target.value })}
                    className="w-full bg-transparent border-0 border-b-2 border-white/10 rounded-none h-14 text-lg focus:border-blue-500 focus:outline-none transition-all px-0 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-slate-900">Select objective...</option>
                    <option value="ai-safety" className="bg-slate-900">AI Safety & Compliance</option>
                    <option value="ai-agents" className="bg-slate-900">AI Agents</option>
                    <option value="process-automation" className="bg-slate-900">Process Automation</option>
                    <option value="web-solutions" className="bg-slate-900">Web Solutions</option>
                    <option value="enterprise-security" className="bg-slate-900">Enterprise Security</option>
                    <option value="outsourcing" className="bg-slate-900">Digital Outsourcing</option>
                  </select>
                </div>

                <div className="space-y-2 group">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-blue-500 transition-colors">Project Brief</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="bg-transparent border-0 border-b-2 border-white/10 rounded-none min-h-[120px] text-lg focus:border-blue-500 transition-all px-0 resize-none placeholder:text-muted-foreground/30"
                    placeholder="Describe your vision..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 rounded-2xl text-lg md:text-xl font-bold bg-black dark:bg-white dark:text-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      Initiate Contact
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;