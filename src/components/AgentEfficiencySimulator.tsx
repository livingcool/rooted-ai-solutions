import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Zap, Clock } from "lucide-react";

const AgentEfficiencySimulator = () => {
    const [taskVolume, setTaskVolume] = useState([1000]); // tasks per month
    const [timePerTask, setTimePerTask] = useState([15]); // minutes
    const [hourlyCost, setHourlyCost] = useState([500]); // INR/hr or USD depending on context (using INR to match other parts or generic)
    // Let's use a dual display or neutral currency symbol if unsure, but ROICalculator used INR. Let's use generic numbers or assume INR for consistency with previous calculator.
    // Actually the previous one used INR. Let's stick to INR for consistency or make it generic. The Outsourcing one used USD.
    // Given "RootedAI" is likely Indian based (looking at address in index.html footer), but serving global?
    // ROICalculator used INR. Outsourcing usually targets foreign clients (USD).
    // Let's use INR here as it's "AI Agents" likely for any business. Or just "Cost".
    // I will use INR to match the ROI calculator found in ProcessAutomation.

    const [manualCost, setManualCost] = useState(0);
    const [agentCost, setAgentCost] = useState(0);
    const [hoursSaved, setHoursSaved] = useState(0);

    useEffect(() => {
        const totalMinutes = taskVolume[0] * timePerTask[0];
        const totalHours = totalMinutes / 60;

        const manualTotal = totalHours * hourlyCost[0];
        // Assume Agent cost is ~90% cheaper or fixed platform fee + small token cost.
        // Let's approximate Agent cost as 10% of manual for "Software + API" costs.
        const agentTotal = manualTotal * 0.10;

        setManualCost(manualTotal);
        setAgentCost(agentTotal);
        setHoursSaved(totalHours);

    }, [taskVolume, timePerTask, hourlyCost]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleConsult = () => {
        const message = encodeURIComponent(`Hi, I'm interested in AI Agents. I have about ${taskVolume[0]} tasks/month that take ${timePerTask[0]} mins each.`);
        window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
    };

    return (
        <div className="bw-card p-8 md:p-12 w-full max-w-5xl mx-auto bg-gradient-to-b from-black/5 to-transparent dark:from-white/5 border border-black/10 dark:border-white/10 rounded-2xl shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Bot className="w-6 h-6 text-black dark:text-white" />
                            <h3 className="text-2xl font-bold text-black dark:text-white">Agent Efficiency Simulator</h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Estimate the impact of deploying AI Agents for high-volume repetitive tasks.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-black dark:text-white">Monthly Task Volume</label>
                                <span className="text-2xl font-bold text-black dark:text-white bg-black/5 dark:bg-white/10 px-3 py-1 rounded-md min-w-[3rem] text-center">
                                    {taskVolume[0]}
                                </span>
                            </div>
                            <Slider
                                value={taskVolume}
                                onValueChange={setTaskVolume}
                                max={10000}
                                min={100}
                                step={100}
                                className="py-2 cursor-pointer"
                            />
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-black dark:text-white">Avg. Time per Task (Mins)</label>
                                <span className="text-2xl font-bold text-black dark:text-white bg-black/5 dark:bg-white/10 px-3 py-1 rounded-md min-w-[3rem] text-center">
                                    {timePerTask[0]}
                                </span>
                            </div>
                            <Slider
                                value={timePerTask}
                                onValueChange={setTimePerTask}
                                max={120}
                                min={1}
                                step={1}
                                className="py-2 cursor-pointer"
                            />
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-black dark:text-white">Manual Processing Cost/Hr (₹)</label>
                                <span className="text-2xl font-bold text-black dark:text-white bg-black/5 dark:bg-white/10 px-3 py-1 rounded-md min-w-[3rem] text-center">
                                    ₹{hourlyCost[0]}
                                </span>
                            </div>
                            <Slider
                                value={hourlyCost}
                                onValueChange={setHourlyCost}
                                max={5000}
                                min={100}
                                step={100}
                                className="py-2 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                <div className="relative flex flex-col justify-center">
                    <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-2xl -rotate-1 transform transition-transform" />
                    <div className="relative bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-2xl p-8 space-y-8 shadow-xl">

                        <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">Efficiency Gain</p>
                            <div className="flex items-center gap-4">
                                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                                    <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <span className="text-3xl font-bold text-black dark:text-white">{Math.round(hoursSaved).toLocaleString()}</span>
                                    <p className="text-sm text-muted-foreground">Hours reclaimed per month</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-black/10 dark:border-white/10">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">Projected Monthly Cost</p>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">Current Manual</p>
                                    <span className="text-xl font-bold text-red-500/80 line-through">
                                        {formatCurrency(manualCost)}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground mb-1">With AI Agents</p>
                                    <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                                        {formatCurrency(agentCost)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleConsult}
                            className="w-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-semibold group h-12 text-base shadow-lg hover:shadow-xl transition-all"
                        >
                            Build My Agents
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <p className="text-[10px] text-muted-foreground text-center italic mt-4">
                            Note: Values are illustrative. AI Agent costs depend on query complexity, model used (GPT-4 vs simpler), and infrastructure.
                            Efficiency gains typically range from 80-95%.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentEfficiencySimulator;
