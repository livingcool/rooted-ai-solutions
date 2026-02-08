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
      setFormData({ name: "", email: "", message: "" });
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
    <section id="contact" className="py-24 border-t border-black/10 dark:border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight">
            Let's Talk
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            Ready to automate your operations?
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-muted-foreground opacity-60 uppercase tracking-widest">Name</label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-muted-foreground focus:border-black/40 dark:focus:border-white/40 focus:bg-black/10 dark:focus:bg-white/10 focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 transition-all duration-300 h-12"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-muted-foreground opacity-60 uppercase tracking-widest">Email</label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-muted-foreground focus:border-black/40 dark:focus:border-white/40 focus:bg-black/10 dark:focus:bg-white/10 focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 transition-all duration-300 h-12"
                placeholder="Enter your email"
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                title="Please enter a valid email address"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-muted-foreground opacity-60 uppercase tracking-widest">Message</label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-muted-foreground focus:border-black/40 dark:focus:border-white/40 focus:bg-black/10 dark:focus:bg-white/10 focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 transition-all duration-300 min-h-[150px] resize-none"
                placeholder="Tell us about your project"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bw-button h-14 text-lg"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Send Message
                  <Send className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;