import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Package, TrendingUp, AlertTriangle, ArrowUpRight } from "lucide-react";

const InventorySimulator = () => {
    const [annualRevenue, setAnnualRevenue] = useState([5000000]); // $5M
    const [inventoryValue, setInventoryValue] = useState([1000000]); // $1M
    const [accuracyImprovement, setAccuracyImprovement] = useState([20]); // %

    // Calculations based on industry stds
    // 1. Holding cost reduction (usually 20-30% of inventory value is holding cost)
    // Improve accuracy -> Reduce safety stock by ~half of accuracy gain
    const holdingCostRate = 0.25;
    const inventoryReduction = (accuracyImprovement[0] / 100) * 0.5 * inventoryValue[0];
    const holdingCostSavings = inventoryReduction * holdingCostRate;

    // 2. Stockout reduction (Recovered lost sales)
    // Assume 5% of revenue is lost due to stockouts currently
    // Predictive analytics reduces stockouts by ~accuracyImprovement%
    const currentLostSales = annualRevenue[0] * 0.05;
    const recoveredRevenue = currentLostSales * (accuracyImprovement[0] / 100);

    const totalBenefit = holdingCostSavings + recoveredRevenue;

    const formatMoney = (val: number) => {
        if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
        return `$${(val / 1000).toFixed(0)}k`;
    };

    const handleConsult = () => {
        const message = encodeURIComponent(`We have roughly ${formatMoney(inventoryValue[0])} in inventory. I want to see how predictive analytics can help us save ${formatMoney(totalBenefit)}/year.`);
        window.open(`https://wa.me/917904168521?text=${message}`, "_blank");
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="bg-zinc-950 text-white rounded-[2.5rem] p-6 md:p-12 border border-zinc-800/50 shadow-2xl relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/30 via-transparent to-transparent pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">

                    {/* Left: Interactive Controls */}
                    <div className="lg:col-span-5 space-y-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Forecast Impact</h2>
                            <p className="text-zinc-400">
                                Adjust parameters to simulate how better predictive accuracy impacts your bottom line.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium">Annual Revenue</label>
                                    <span className="text-sm font-mono text-zinc-300">{formatMoney(annualRevenue[0])}</span>
                                </div>
                                <Slider
                                    value={annualRevenue}
                                    onValueChange={setAnnualRevenue}
                                    max={50000000}
                                    min={500000}
                                    step={500000}
                                    className="cursor-pointer"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium">Avg. Inventory Value</label>
                                    <span className="text-sm font-mono text-zinc-300">{formatMoney(inventoryValue[0])}</span>
                                </div>
                                <Slider
                                    value={inventoryValue}
                                    onValueChange={setInventoryValue}
                                    max={10000000}
                                    min={100000}
                                    step={100000}
                                    className="cursor-pointer"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium flex items-center gap-2">
                                        Forecast Accuracy Gain
                                        <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">Target</span>
                                    </label>
                                    <span className="text-sm font-mono text-zinc-300">{accuracyImprovement[0]}%</span>
                                </div>
                                <Slider
                                    value={accuracyImprovement}
                                    onValueChange={setAccuracyImprovement}
                                    max={50}
                                    min={5}
                                    step={5}
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>

                        <Button onClick={handleConsult} className="w-full bg-white text-black hover:bg-zinc-200 h-12 text-base font-semibold rounded-xl">
                            Start Optimizing
                        </Button>
                    </div>

                    {/* Right: Data Visualization */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Card 1: Total Impact */}
                            <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-8 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300">
                                <div className="absolute top-0 right-0 p-8 opacity-20">
                                    <TrendingUp size={100} />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-indigo-200 font-medium mb-1">Total Annual Impact</p>
                                    <h3 className="text-6xl font-black tracking-tight text-white mb-2">
                                        {formatMoney(totalBenefit)}
                                    </h3>
                                    <p className="text-sm text-indigo-100/80">Increase in bottom-line profit</p>
                                </div>
                            </div>

                            {/* Card 2: Recovered Revenue */}
                            <div className="bg-zinc-900/80 rounded-3xl p-6 border border-zinc-800 hover:border-zinc-700 transition-colors">
                                <div className="bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                    <ArrowUpRight className="text-green-400" />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-1">{formatMoney(recoveredRevenue)}</h4>
                                <p className="text-xs text-zinc-400">Recovered Lost Sales</p>
                                <p className="text-[10px] text-zinc-500 mt-2 leading-tight">By preventing out-of-stock scenarios during peak demand.</p>
                            </div>

                            {/* Card 3: Reduced Holding Costs */}
                            <div className="bg-zinc-900/80 rounded-3xl p-6 border border-zinc-800 hover:border-zinc-700 transition-colors">
                                <div className="bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                    <Package className="text-blue-400" />
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-1">{formatMoney(holdingCostSavings)}</h4>
                                <p className="text-xs text-zinc-400">Holding Cost Savings</p>
                                <p className="text-[10px] text-zinc-500 mt-2 leading-tight">Lower warehousing needs and reduced spoilage/obsolescence.</p>
                            </div>
                        </div>

                        <div className="mt-8 flex items-start gap-3 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
                            <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={18} />
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                <strong>Note:</strong> Typical result for retail/manufacturing sectors. Actual ROI varies by industry, data quality, and current operational efficiency.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventorySimulator;
