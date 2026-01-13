import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, DollarSign, Briefcase } from "lucide-react";

const OutsourcingCalculator = () => {
    const [developers, setDevelopers] = useState([2]);
    const [duration, setDuration] = useState([6]); // months
    const [hourlyRate, setHourlyRate] = useState([60]); // USD

    const [inHouseCost, setInHouseCost] = useState(0);
    const [outsourcedCost, setOutsourcedCost] = useState(0);
    const [savings, setSavings] = useState(0);

    // Assumptions
    const rootedAIRate = 25; // USD/hr (Example rate for calculation)
    const hoursPerMonth = 160;

    useEffect(() => {
        const totalHours = developers[0] * hoursPerMonth * duration[0];

        // In-house cost includes overhead factor (taxes, benefits, etc ~ 1.3x)
        const inHouseTotal = totalHours * hourlyRate[0] * 1.3;

        // Outsourced cost is flat rate
        const outsourcedTotal = totalHours * rootedAIRate;

        setInHouseCost(inHouseTotal);
        setOutsourcedCost(outsourcedTotal);
        setSavings(inHouseTotal - outsourcedTotal);

    }, [developers, duration, hourlyRate]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleConsult = () => {
        const message = encodeURIComponent(`Hi, I used your Outsourcing calculator. I see I could save ${formatCurrency(savings)} on a ${duration[0]}-month project with ${developers[0]} developers.`);
        window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
    };

    return (
        <div className="bw-card p-8 md:p-12 w-full max-w-5xl mx-auto bg-gradient-to-b from-black/5 to-transparent dark:from-white/5 border border-black/10 dark:border-white/10 rounded-2xl shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Calculator className="w-6 h-6 text-black dark:text-white" />
                            <h3 className="text-2xl font-bold text-black dark:text-white">Cost Savings Calculator</h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Compare the cost of hiring local US/EU talent versus scaling with RootedAI's dedicated teams.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-black dark:text-white">Team Size (Developers)</label>
                                <span className="text-2xl font-bold text-black dark:text-white bg-black/5 dark:bg-white/10 px-3 py-1 rounded-md min-w-[3rem] text-center">
                                    {developers[0]}
                                </span>
                            </div>
                            <Slider
                                value={developers}
                                onValueChange={setDevelopers}
                                max={20}
                                min={1}
                                step={1}
                                className="py-2 cursor-pointer"
                            />
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-black dark:text-white">Project Duration (Months)</label>
                                <span className="text-2xl font-bold text-black dark:text-white bg-black/5 dark:bg-white/10 px-3 py-1 rounded-md min-w-[3rem] text-center">
                                    {duration[0]}
                                </span>
                            </div>
                            <Slider
                                value={duration}
                                onValueChange={setDuration}
                                max={24}
                                min={1}
                                step={1}
                                className="py-2 cursor-pointer"
                            />
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-black dark:text-white">Current Hourly Rate ($)</label>
                                <span className="text-2xl font-bold text-black dark:text-white bg-black/5 dark:bg-white/10 px-3 py-1 rounded-md min-w-[3rem] text-center">
                                    ${hourlyRate[0]}
                                </span>
                            </div>
                            <Slider
                                value={hourlyRate}
                                onValueChange={setHourlyRate}
                                max={200}
                                min={30}
                                step={5}
                                className="py-2 cursor-pointer"
                            />
                            <p className="text-xs text-muted-foreground">Average local cost (salary + overhead).</p>
                        </div>
                    </div>
                </div>

                <div className="relative flex flex-col justify-center">
                    <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-2xl -rotate-1 transform transition-transform" />
                    <div className="relative bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-2xl p-8 space-y-8 shadow-xl">

                        <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">Estimated Project Cost</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">In-House</p>
                                    <span className="text-xl md:text-2xl font-bold text-red-500/80 dark:text-red-400/80 font-mono line-through decoration-black/50 dark:decoration-white/50">
                                        {formatCurrency(inHouseCost)}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1">RootedAI</p>
                                    <span className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400 font-mono">
                                        {formatCurrency(outsourcedCost)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-black/10 dark:border-white/10">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">Total Savings</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 font-mono animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    {formatCurrency(savings)}
                                </span>
                            </div>
                            <p className="text-sm text-green-600/80 dark:text-green-400/80 mt-2 font-medium flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                Keep this budget for growth
                            </p>
                        </div>

                        <Button
                            onClick={handleConsult}
                            className="w-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-semibold group h-12 text-base shadow-lg hover:shadow-xl transition-all"
                        >
                            Get Our Rate Card
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <p className="text-[10px] text-muted-foreground text-center italic mt-4">
                            Note: Estimates include 30% overhead for in-house roles (taxes, benefits, office).
                            RootedAI rates vary by tech stack and seniority. Contact us for precise pricing.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OutsourcingCalculator;
