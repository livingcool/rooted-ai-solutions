import { useState } from "react";
import { X, ArrowRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GoodFirmsBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-black text-white relative z-[130] border-b border-white/10"
                >
                    <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-4 text-xs md:text-sm font-medium relative">
                        {/* Content */}
                        <a
                            href="https://www.goodfirms.co/company/rootedai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
                        >
                            <span className="flex items-center gap-1 text-[#FFD700]">
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                            </span>
                            <span>
                                Recognized as a Company on <span className="font-bold underline">GoodFirms</span>
                            </span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </a>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute right-2 md:right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
                            aria-label="Close banner"
                        >
                            <X className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GoodFirmsBanner;
