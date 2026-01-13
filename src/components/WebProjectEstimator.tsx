import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Code, Globe, ShoppingCart, BarChart, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const projectTypes = [
    { id: 'corporate', name: 'Corporate Website', icon: Globe, baseTime: 4, multiplier: 1 },
    { id: 'ecommerce', name: 'E-Commerce Store', icon: ShoppingCart, baseTime: 6, multiplier: 1.5 },
    { id: 'saas', name: 'SaaS Platform', icon: Code, baseTime: 10, multiplier: 2.5 },
    { id: 'pwa', name: 'Progressive Web App', icon: Smartphone, baseTime: 8, multiplier: 1.8 },
];

const features = [
    { id: 'cms', name: 'Content Management (CMS)', time: 1, cost: 1 },
    { id: 'seo', name: 'Advanced SEO Setup', time: 0.5, cost: 1 },
    { id: 'analytics', name: 'Analytics Dashboard', time: 2, cost: 2 },
    { id: 'chat', name: 'AI Chatbot Integration', time: 1.5, cost: 2 },
    { id: 'payments', name: 'Payment Gateway', time: 1, cost: 1.5 },
    { id: 'auth', name: 'User Authentication', time: 1.5, cost: 1.5 },
];

const WebProjectEstimator = () => {
    const [selectedType, setSelectedType] = useState(projectTypes[0]);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    const toggleFeature = (id: string) => {
        setSelectedFeatures(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    const calculateEstimate = () => {
        let weeks = selectedType.baseTime;
        let complexity = selectedType.multiplier;

        features.forEach(f => {
            if (selectedFeatures.includes(f.id)) {
                weeks += f.time;
                complexity += f.cost * 0.2;
            }
        });

        return {
            minWeeks: Math.floor(weeks),
            maxWeeks: Math.ceil(weeks * 1.3),
            complexityScore: Math.min(10, Math.max(1, Math.round(complexity * 2))) // 1-10 scale
        };
    };

    const estimate = calculateEstimate();

    const handleConsult = () => {
        const featureNames = features.filter(f => selectedFeatures.includes(f.id)).map(f => f.name).join(", ");
        const message = encodeURIComponent(`Hi, I'm interested in a ${selectedType.name} with: ${featureNames || "basic features"}. Estimated timeline: ${estimate.minWeeks}-${estimate.maxWeeks} weeks.`);
        window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col lg:flex-row">

                {/* Left Panel: Configuration */}
                <div className="flex-1 p-8 md:p-12 space-y-10">
                    <div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="bg-black text-white dark:bg-white dark:text-black w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                            Select Project Type
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {projectTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type)}
                                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-start gap-4 ${selectedType.id === type.id
                                            ? 'border-black dark:border-white bg-zinc-50 dark:bg-zinc-800 ring-1 ring-black dark:ring-white'
                                            : 'border-transparent bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg ${selectedType.id === type.id ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white dark:bg-zinc-700 text-black dark:text-white'}`}>
                                        <type.icon size={20} />
                                    </div>
                                    <div>
                                        <span className="font-bold block text-sm">{type.name}</span>
                                        <span className="text-xs text-muted-foreground mt-1">Starting at {type.baseTime} weeks</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="bg-black text-white dark:bg-white dark:text-black w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                            Add Features
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {features.map((feature) => (
                                <button
                                    key={feature.id}
                                    onClick={() => toggleFeature(feature.id)}
                                    className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/30 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
                                >
                                    <span className="text-sm font-medium">{feature.name}</span>
                                    {selectedFeatures.includes(feature.id)
                                        ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        : <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400" />
                                    }
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Estimate */}
                <div className="lg:w-[400px] bg-zinc-50 dark:bg-black/40 border-l border-zinc-200 dark:border-zinc-800 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                    <div className="space-y-8 relative z-10">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Estimated Timeline</p>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={estimate.minWeeks}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-baseline gap-2"
                                >
                                    <span className="text-6xl font-black text-black dark:text-white">{estimate.minWeeks}-{estimate.maxWeeks}</span>
                                    <span className="text-xl font-medium text-muted-foreground">Weeks</span>
                                </motion.div>
                            </AnimatePresence>
                            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                                Based on typical implementation velocity for a <strong>{selectedType.name}</strong> with {selectedFeatures.length} additional integrations.
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Project Complexity</p>
                            <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${estimate.complexityScore * 10}%` }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                />
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-muted-foreground font-mono">
                                <span>Simple</span>
                                <span>Advanced</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-12">
                        <Button
                            onClick={handleConsult}
                            className="w-full h-14 text-base font-bold bg-black hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            Get Precise Quote
                        </Button>
                        <p className="text-[10px] text-center text-muted-foreground mt-4">
                            *Estimates are approximate. Final timeline depends on design revisions and third-party dependencies.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebProjectEstimator;
