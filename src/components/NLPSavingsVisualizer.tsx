import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { MessageSquare, LifeBuoy, TrendingDown, ArrowRight, User } from "lucide-react";

const NLPSavingsVisualizer = () => {
    // Inputs
    const [monthlyTickets, setMonthlyTickets] = useState([2000]);
    const [ticketCost, setTicketCost] = useState([5]); // USD/ticket
    const [automationRate, setAutomationRate] = useState([60]); // %

    // Calculations
    const totalMonthlyCost = monthlyTickets[0] * ticketCost[0];
    const automatedTickets = Math.round(monthlyTickets[0] * (automationRate[0] / 100));
    const savings = automatedTickets * ticketCost[0];
    const newMonthlyCost = totalMonthlyCost - savings;

    const handleConsult = () => {
        const message = encodeURIComponent(`I'd like to automate ${automationRate[0]}% of my ${monthlyTickets[0]} monthly support tickets to save roughly $${savings.toLocaleString()}/mo.`);
        window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
    };

    return (
        <div className="w-full max-w-5xl mx-auto py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

                {/* Visualizer - Chat Bubble Style */}
                <div className="order-2 md:order-1 relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-[2rem] blur-2xl -z-10" />

                    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl space-y-8 shadow-2xl relative overflow-hidden">

                        {/* Header */}
                        <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-6">
                            <div>
                                <h3 className="text-lg font-bold">Support Cost Analysis</h3>
                                <p className="text-sm text-muted-foreground">Monthly Projection</p>
                            </div>
                            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold font-mono">
                                SAVE {automationRate[0]}%
                            </div>
                        </div>

                        {/* Bars / Visuals */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="flex items-center gap-2"><User className="w-4 h-4" /> Manual Resolution</span>
                                    <span>${(totalMonthlyCost - savings).toLocaleString()}</span>
                                </div>
                                <div className="h-14 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden flex relative">
                                    <div
                                        className="h-full bg-red-500/80 dark:bg-red-500/60 transition-all duration-500 flex items-center justify-center text-white font-bold text-xs"
                                        style={{ width: `${100 - automationRate[0]}%` }}
                                    >
                                    </div>
                                    <div
                                        className="h-full bg-zinc-200 dark:bg-zinc-800 w-full flex items-center justify-center text-xs text-muted-foreground"
                                        style={{ width: `${automationRate[0]}%` }}
                                    >
                                        Automated
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="flex items-center gap-2 text-green-600 dark:text-green-400"><TrendingDown className="w-4 h-4" /> Cost Savings</span>
                                    <span className="text-green-600 dark:text-green-400 text-xl font-bold">${savings.toLocaleString()}</span>
                                </div>
                                <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/50 rounded-xl">
                                    <p className="text-xs text-green-800 dark:text-green-300 leading-snug">
                                        By automating <strong>{automatedTickets.toLocaleString()}</strong> tickets, your team saves approx. <strong>{Math.round(automatedTickets * 0.25)} hours</strong> per month (assuming 15 mins/ticket).
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="pt-6 text-center">
                            <p className="text-sm text-muted-foreground mb-1">Projected Annual Savings</p>
                            <p className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                ${(savings * 12).toLocaleString()}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Controls - Minimalist Slider Interface */}
                <div className="order-1 md:order-2 space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                <LifeBuoy className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold">Calculate Your ROI</h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            See how much you can save by deploying an NLP-powered system to handle routine inquiries instantly.
                        </p>
                    </div>

                    <div className="space-y-8 pl-2">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="font-semibold text-sm">Monthly Support Tickets</label>
                                <span className="font-mono bg-zinc-100 dark:bg-white/10 px-2 py-1 rounded text-sm">{monthlyTickets[0]}</span>
                            </div>
                            <Slider value={monthlyTickets} onValueChange={setMonthlyTickets} max={10000} min={100} step={100} className="cursor-pointer" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="font-semibold text-sm">Avg. Cost per Ticket ($)</label>
                                <span className="font-mono bg-zinc-100 dark:bg-white/10 px-2 py-1 rounded text-sm">${ticketCost[0]}</span>
                            </div>
                            <Slider value={ticketCost} onValueChange={setTicketCost} max={50} min={1} step={1} className="cursor-pointer" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="font-semibold text-sm">Target Automation Rate (%)</label>
                                <span className="font-mono bg-zinc-100 dark:bg-white/10 px-2 py-1 rounded text-sm">{automationRate[0]}%</span>
                            </div>
                            <Slider value={automationRate} onValueChange={setAutomationRate} max={90} min={10} step={5} className="cursor-pointer" />
                            <p className="text-xs text-muted-foreground">Most NLP systems achieve 60-80% automation within 6 months.</p>
                        </div>
                    </div>

                    <Button onClick={handleConsult} size="lg" className="w-full md:w-auto mt-4 px-8 rounded-full bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90">
                        Start Automating <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default NLPSavingsVisualizer;
