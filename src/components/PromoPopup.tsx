import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-black border border-white/10 p-0 overflow-hidden">
        <div className="relative p-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white/40 hover:text-white hover:bg-transparent"
          >
            <X className="w-4 h-4" />
          </Button>

          <DialogHeader className="mb-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-white flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl font-bold text-white tracking-tight">
              Transform Your Business
            </DialogTitle>
            <p className="text-center text-white/60 mt-2 font-light">
              Start your AI journey today with our exclusive offer.
            </p>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 p-6 text-center">
              <p className="text-lg font-bold text-white mb-1">
                Enterprise AI
              </p>
              <p className="text-sm text-white/40 uppercase tracking-widest">
                At Startup Prices
              </p>
            </div>

            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/60">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                Free consultation worth $500
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                30-day money-back guarantee
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                No setup fees or hidden costs
              </li>
            </ul>

            <div className="pt-2">
              <a href="/pricing" className="block w-full">
                <Button className="w-full bw-button h-12 text-base">
                  View Pricing
                </Button>
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoPopup;
