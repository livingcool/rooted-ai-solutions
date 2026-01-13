import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, IndianRupee, Clock } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const ROICalculator = () => {
    // State for inputs
    const [employees, setEmployees] = useState([5]);
    const [hoursPerDay, setHoursPerDay] = useState([2]);
    const [hourlyWage, setHourlyWage] = useState([500]); // in INR

    // State for results
    const [annualCost, setAnnualCost] = useState(0);
    const [savings, setSavings] = useState(0);
    const [hoursSaved, setHoursSaved] = useState(0);

    // Calculate ROI whenever inputs change
    useEffect(() => {
        const workingDays = 250; // Standard working days/year
        const efficiencyGain = 0.70; // 70% efficiency gain with automation

        const totalHoursPerYear = employees[0] * hoursPerDay[0] * workingDays;
        const totalAnnualCost = totalHoursPerYear * hourlyWage[0];

        const projectedSavings = totalAnnualCost * efficiencyGain;
        const projectedHoursSaved = totalHoursPerYear * efficiencyGain;

        setAnnualCost(totalAnnualCost);
        setSavings(projectedSavings);
        setHoursSaved(projectedHoursSaved);
    }, [employees, hoursPerDay, hourlyWage]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleConsult = () => {
        const message = encodeURIComponent(`Hi, I used your ROI calculator. I could save around ${formatCurrency(savings)} per year. I'd like to discuss automating my workflow.`);
        window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
    };

    return (
        <TiltCard className="bw-card p-8 md:p-12 w-full max-w-5xl mx-auto bg-gradient-to-b from-black/5 to-transparent dark:from-white/5 border border-black/10 dark:border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Input Section */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Calculator className="w-6 h-6 text-black dark:text-white" />
                            <h3 className="text-2xl font-bold text-black dark:text-white">Calculate Your Savings</h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            See how much manual processes are actually costing your business. Adjust the sliders to match your current operations.
                        </p>
                    </div>

                    {/* Sliders */}
                    <div className="space-y-6">
                        {/* Employees Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-black dark:text-white">Employees performing manual tasks</label>
                                <span className="text-2xl font-bold text-black dark:text-white bg-black/5 dark:bg-white/10 px-3 py-1 rounded-md min-w-[3rem] text-center">
                                    {employees[0]}
                                </span>
                            </div>
                            <Slider
                                value={employees}
                                onValueChange={setEmployees}
                                max={50}
                                min={1}
                                step={1}
                                className="py-2"
                            />
                            <p className="text-xs text-muted-foreground">Data entry, report generation, email responses, etc.</p>
                        </div>

                        {/* Hours Slider */}
                        <div className="space-y-4 pt-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-black dark:text-white">Hours spent per day (per person)</label>
                                <span className="text-2xl font-bold text-black dark:text-white bg-black/5 dark:bg-white/10 px-3 py-1 rounded-md min-w-[3rem] text-center">
                                    {hoursPerDay[0]}
                                </span>
                            </div>
                            <Slider
                                value={hoursPerDay}
                                onValueChange={setHoursPerDay}
                                max={8}
                                min={0.5}
                                step={0.5}
                                className="py-2"
                            />
                        </div>

                        {/* Hourly Wage Slider */}
                        <div className="space-y-4 pt-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-black dark:text-white">Average Hourly Cost (₹)</label>
                                <span className="text-2xl font-bold text-black dark:text-white bg-black/5 dark:bg-white/10 px-3 py-1 rounded-md min-w-[3rem] text-center">
                                    ₹{hourlyWage[0]}
                                </span>
                            </div>
                            <Slider
                                value={hourlyWage}
                                onValueChange={setHourlyWage}
                                max={5000}
                                min={100}
                                step={100}
                                className="py-2"
                            />
                            <p className="text-xs text-muted-foreground">Includes salary, benefits, and overhead.</p>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="relative flex flex-col justify-center">
                    <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-2xl -rotate-1 transform transition-transform" />
                    <div className="relative bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-2xl p-8 space-y-8 shadow-xl">

                        <div>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">Current Annual Cost</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl md:text-4xl font-bold text-red-500/80 dark:text-red-400/80 font-mono">
                                    {formatCurrency(annualCost)}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Money currently spent on repetitive tasks.</p>
                        </div>

                        <div className="pt-6 border-t border-black/10 dark:border-white/10">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">Potential Annual Savings</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 font-mono animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    {formatCurrency(savings)}
                                </span>
                            </div>
                            <p className="text-sm text-green-600/80 dark:text-green-400/80 mt-2 font-medium flex items-center gap-2">
                                <IndianRupee className="w-4 h-4" />
                                Add this back to your bottom line
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clock className="w-4 h-4 text-black/60 dark:text-white/60" />
                                    <span className="text-xs font-semibold uppercase text-muted-foreground">Hours Saved</span>
                                </div>
                                <span className="text-xl font-bold text-black dark:text-white">{Math.round(hoursSaved).toLocaleString()} hrs</span>
                            </div>
                            <div className="bg-black/5 dark:bg-white/5 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <IndianRupee className="w-4 h-4 text-black/60 dark:text-white/60" />
                                    <span className="text-xs font-semibold uppercase text-muted-foreground">ROI</span>
                                </div>
                                <span className="text-xl font-bold text-black dark:text-white">~3-6 Months</span>
                            </div>
                        </div>

                        <Button
                            onClick={handleConsult}
                            className="w-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 font-semibold group h-12 text-base shadow-lg hover:shadow-xl transition-all"
                        >
                            Start Saving Now
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </TiltCard>
    );
};

export default ROICalculator;
