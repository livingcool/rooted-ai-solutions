import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Lock, ShieldAlert, Check, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const securityModules = [
    { id: 'firewall', title: 'Next-Gen Firewall', score: 20, description: 'Block unauthorized access' },
    { id: 'ai-wAF', title: 'AI-Powered WAF', score: 25, description: 'Detect & stop complex attacks' },
    { id: '2fa', title: 'Zero-Trust Auth (MFA)', score: 15, description: 'Secure user identity' },
    { id: 'encryption', title: 'E2E Encryption', score: 20, description: 'Protect data in transit & rest' },
    { id: 'monitoring', title: '24/7 AI SOC Monitoring', score: 20, description: 'Real-time threat hunting' },
];

const SecurityRiskSimulator = () => {
    const [activeModules, setActiveModules] = useState<string[]>(['firewall']);

    const toggleModule = (id: string) => {
        setActiveModules(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    const totalScore = securityModules
        .filter(m => activeModules.includes(m.id))
        .reduce((acc, curr) => acc + curr.score, 0);

    const getRiskLevel = () => {
        if (totalScore >= 90) return { label: "Fortress", color: "text-green-500", bg: "bg-green-500", text: "Optimal security posture." };
        if (totalScore >= 60) return { label: "Secure", color: "text-blue-500", bg: "bg-blue-500", text: "Good standard protection." };
        if (totalScore >= 40) return { label: "Vulnerable", color: "text-orange-500", bg: "bg-orange-500", text: "Significant gaps detected." };
        return { label: "Critical Risk", color: "text-red-500", bg: "bg-red-500", text: "Immediate action required." };
    };

    const risk = getRiskLevel();

    const handleConsult = () => {
        const message = encodeURIComponent(`I've assessed our security needs. Our current score is ${totalScore}/100 (${risk.label}). I'd like to discuss full protection.`);
        window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-stretch">

                {/* Visual Report Card */}
                <div className="w-full md:w-1/3 bg-black dark:bg-white text-white dark:text-black rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-2">Security Score</h3>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-7xl font-black">{totalScore}</span>
                            <span className="text-xl opacity-50">/100</span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${risk.bg} animate-pulse`} />
                                <span className={`font-bold text-lg`}>{risk.label}</span>
                            </div>
                            <p className="text-sm opacity-80 leading-relaxed border-t border-white/20 dark:border-black/20 pt-4">
                                {risk.text}
                            </p>
                        </div>
                    </div>

                    {totalScore < 100 && (
                        <div className="mt-8 p-4 bg-white/10 dark:bg-black/5 rounded-xl border border-white/10 dark:border-black/10">
                            <div className="flex gap-2">
                                <AlertTriangle className="w-5 h-5 shrink-0 text-yellow-500" />
                                <p className="text-xs leading-tight">
                                    <strong>Recommendation:</strong> Enable "{securityModules.find(m => !activeModules.includes(m.id))?.title}" to improve coverage.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Background Detail */}
                    <Shield className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 dark:text-black/5" />
                </div>

                {/* Interactive Modules */}
                <div className="w-full md:w-2/3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-lg">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">Build Your Defense</h3>
                        <p className="text-muted-foreground">Select security layers to simulate their impact on your organization's safety.</p>
                    </div>

                    <div className="space-y-4">
                        {securityModules.map((module) => {
                            const isActive = activeModules.includes(module.id);
                            return (
                                <motion.button
                                    key={module.id}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => toggleModule(module.id)}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${isActive
                                            ? 'border-black dark:border-white bg-zinc-50 dark:bg-zinc-800'
                                            : 'border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg ${isActive ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'}`}>
                                            {isActive ? <Check size={18} /> : <Lock size={18} />}
                                        </div>
                                        <div>
                                            <span className={`font-bold block ${isActive ? 'text-black dark:text-white' : 'text-muted-foreground'}`}>{module.title}</span>
                                            <span className="text-xs text-muted-foreground hidden sm:block">{module.description}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-sm font-bold ${isActive ? 'text-green-600 dark:text-green-400' : 'text-zinc-300'}`}>
                                            +{module.score} pts
                                        </span>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <Button 
                            onClick={handleConsult} 
                            disabled={totalScore === 0} 
                            className="w-full sm:w-auto h-12 rounded-xl bg-black text-white dark:bg-white dark:text-black hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Audit My Infrastructure <ShieldAlert className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SecurityRiskSimulator;
